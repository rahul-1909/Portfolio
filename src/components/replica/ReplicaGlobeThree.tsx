import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ReplicaGlobeThree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const width = mount.clientWidth || 380;
    const height = mount.clientHeight || 380;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    // Lighting (Spec: soft directional from top-left, hemisphere fill so shadows are light grey, no specular)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.9);
    dirLight.position.set(-4, 5, 4);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd2d2d0, 1.4);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Texture Loader for Earth Bump Map
    const textureLoader = new THREE.TextureLoader();
    const bumpMap = textureLoader.load('/assets/earth_bump.jpg', (tex) => {
      tex.needsUpdate = true;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    });
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.ClampToEdgeWrapping;

    // Globe Mesh: Matte grey sphere (MeshStandardMaterial, color #E4E4E2, roughness 1.0)
    const globeRadius = 1.85;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 96, 96);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xE4E4E2,
      roughness: 0.95,
      metalness: 0.0,
      bumpMap: bumpMap,
      bumpScale: 0.12,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);

    // Airplane construction (low-poly grey aircraft matching Gabriel's site)
    const airplaneGroup = new THREE.Group();
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xC8C8C8,
      roughness: 0.7,
      metalness: 0.1,
    });
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.5,
    });

    // Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.42, 12);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, planeMat);
    airplaneGroup.add(fuselage);

    // Nose Cone
    const noseGeo = new THREE.ConeGeometry(0.04, 0.12, 12);
    noseGeo.rotateX(-Math.PI / 2);
    noseGeo.translate(0, 0, 0.26);
    const nose = new THREE.Mesh(noseGeo, cockpitMat);
    airplaneGroup.add(nose);

    // Wings
    const wingGeo = new THREE.BoxGeometry(0.48, 0.012, 0.1);
    wingGeo.translate(0, 0, 0.02);
    const wings = new THREE.Mesh(wingGeo, planeMat);
    airplaneGroup.add(wings);

    // Tail fin
    const tailFinGeo = new THREE.BoxGeometry(0.012, 0.1, 0.06);
    tailFinGeo.translate(0, 0.05, -0.16);
    const tailFin = new THREE.Mesh(tailFinGeo, planeMat);
    airplaneGroup.add(tailFin);

    // Tail wing
    const tailWingGeo = new THREE.BoxGeometry(0.18, 0.008, 0.04);
    tailWingGeo.translate(0, 0, -0.16);
    const tailWing = new THREE.Mesh(tailWingGeo, planeMat);
    airplaneGroup.add(tailWing);

    scene.add(airplaneGroup);

    // Initial rotation & orbit setup
    let rotX = 0.2;
    let rotY = 1.4;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let velX = 0;
    let velY = 0;

    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    // Orbit parameters for the airplane
    const orbitRadius = globeRadius + 0.32;
    const orbitInclination = 0.45; // Inclined orbital plane
    // Initial flight angle so the airplane is positioned in the upper-front view (like reference screenshot 3)
    let flightAngle = 1.25;

    // Pointer Interaction Handlers
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      mount.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      velY = dx * 0.006;
      velX = dy * 0.006;

      targetRotY += velY;
      targetRotX += velX;
      targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      mount.releasePointerCapture?.(e.pointerId);
    };

    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerUp);

    // Window Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Visibility / Intersection Observer for performance
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Update airplane position helper
    const updateAirplane = (angle: number) => {
      const currentAngle = angle;
      const nextAngle = angle + 0.02;

      const px = orbitRadius * Math.cos(currentAngle);
      const pz = orbitRadius * Math.sin(currentAngle) * Math.cos(orbitInclination);
      const py = orbitRadius * Math.sin(currentAngle) * Math.sin(orbitInclination);

      const nx = orbitRadius * Math.cos(nextAngle);
      const nz = orbitRadius * Math.sin(nextAngle) * Math.cos(orbitInclination);
      const ny = orbitRadius * Math.sin(nextAngle) * Math.sin(orbitInclination);

      airplaneGroup.position.set(px, py, pz);
      airplaneGroup.lookAt(nx, ny, nz);
      airplaneGroup.rotateZ(-0.35);
    };

    // Set initial position
    updateAirplane(flightAngle);
    globeMesh.rotation.x = rotX;
    globeMesh.rotation.y = rotY;

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (!prefersReducedMotion) {
        if (!isDragging) {
          // Slow continuous rotation on Y axis
          targetRotY += 0.0018;
          velX *= 0.92;
          velY *= 0.92;
          targetRotX += velX;
          targetRotY += velY;
        }

        // Smooth damping
        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;

        globeMesh.rotation.x = rotX;
        globeMesh.rotation.y = rotY;

        // Orbit Airplane
        flightAngle += 0.012;
        updateAirplane(flightAngle);
      }

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      updateAirplane(flightAngle);
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerUp);

      sphereGeo.dispose();
      sphereMat.dispose();
      bumpMap.dispose();
      fuselageGeo.dispose();
      noseGeo.dispose();
      wingGeo.dispose();
      tailFinGeo.dispose();
      tailWingGeo.dispose();
      planeMat.dispose();
      cockpitMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[320px] max-w-[440px] max-h-[440px] aspect-square mx-auto cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
      aria-label="Interactive 3D Earth Globe with orbiting aircraft. Drag to rotate."
      role="img"
    />
  );
};
