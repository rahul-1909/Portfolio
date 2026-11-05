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

    // Camera: positioned so globe (radius 1.0) fills the frame naturally
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    // Grazing directional light from top-left
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(-4.5, 5.5, 3.8);
    scene.add(dirLight);

    // Soft hemisphere fill for light grey shadows without harsh specular
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0d0cc, 1.3);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // High-res elevation bump texture
    const textureLoader = new THREE.TextureLoader();
    const bumpMap = textureLoader.load('/assets/earth_bump.jpg', (tex) => {
      tex.needsUpdate = true;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    });
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.ClampToEdgeWrapping;

    // Globe Mesh: SphereGeometry(1, 256, 256) with displacement & bump map in #ECEBE7
    const globeRadius = 1.0;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 256, 256);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xECEBE7,
      roughness: 0.92,
      metalness: 0.02,
      displacementMap: bumpMap,
      displacementScale: 0.05,
      bumpMap: bumpMap,
      bumpScale: 0.15,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);

    // Recognizable Airliner (#7C7C7C)
    const airplaneGroup = new THREE.Group();
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x7C7C7C,
      roughness: 0.55,
      metalness: 0.2,
    });
    const darkPodMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.6,
    });

    // 1. Slender Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.24, 16);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, planeMat);
    airplaneGroup.add(fuselage);

    // 2. Streamlined Nose Cone
    const noseGeo = new THREE.ConeGeometry(0.022, 0.07, 16);
    noseGeo.rotateX(-Math.PI / 2);
    noseGeo.translate(0, 0, 0.155);
    const nose = new THREE.Mesh(noseGeo, planeMat);
    airplaneGroup.add(nose);

    // 3. Swept Wings
    // Left swept wing
    const leftWingShape = new THREE.Shape();
    leftWingShape.moveTo(0, 0);
    leftWingShape.lineTo(-0.16, -0.07);
    leftWingShape.lineTo(-0.16, -0.10);
    leftWingShape.lineTo(0, -0.04);
    leftWingShape.closePath();
    const wingExtrude = { depth: 0.005, bevelEnabled: false };
    const leftWingGeo = new THREE.ExtrudeGeometry(leftWingShape, wingExtrude);
    leftWingGeo.rotateX(Math.PI / 2);
    leftWingGeo.translate(0, 0.002, 0.04);
    const leftWing = new THREE.Mesh(leftWingGeo, planeMat);
    airplaneGroup.add(leftWing);

    // Right swept wing
    const rightWingShape = new THREE.Shape();
    rightWingShape.moveTo(0, 0);
    rightWingShape.lineTo(0.16, -0.07);
    rightWingShape.lineTo(0.16, -0.10);
    rightWingShape.lineTo(0, -0.04);
    rightWingShape.closePath();
    const rightWingGeo = new THREE.ExtrudeGeometry(rightWingShape, wingExtrude);
    rightWingGeo.rotateX(Math.PI / 2);
    rightWingGeo.translate(0, 0.002, 0.04);
    const rightWing = new THREE.Mesh(rightWingGeo, planeMat);
    airplaneGroup.add(rightWing);

    // 4. Two Engine Pods under wings
    const engineGeo = new THREE.CylinderGeometry(0.010, 0.010, 0.05, 12);
    engineGeo.rotateX(Math.PI / 2);

    const leftEngine = new THREE.Mesh(engineGeo, darkPodMat);
    leftEngine.position.set(-0.075, -0.014, 0.01);
    airplaneGroup.add(leftEngine);

    const rightEngine = new THREE.Mesh(engineGeo, darkPodMat);
    rightEngine.position.set(0.075, -0.014, 0.01);
    airplaneGroup.add(rightEngine);

    // 5. Vertical Tail Fin
    const tailFinShape = new THREE.Shape();
    tailFinShape.moveTo(0, 0);
    tailFinShape.lineTo(0, 0.065);
    tailFinShape.lineTo(-0.035, 0.065);
    tailFinShape.lineTo(-0.065, 0);
    tailFinShape.closePath();
    const tailFinGeo = new THREE.ExtrudeGeometry(tailFinShape, { depth: 0.004, bevelEnabled: false });
    tailFinGeo.rotateY(Math.PI / 2);
    tailFinGeo.translate(0.002, 0.01, -0.06);
    const tailFin = new THREE.Mesh(tailFinGeo, planeMat);
    airplaneGroup.add(tailFin);

    // 6. Horizontal Stabilizers
    const hStabGeo = new THREE.BoxGeometry(0.11, 0.004, 0.03);
    hStabGeo.translate(0, 0.01, -0.11);
    const hStab = new THREE.Mesh(hStabGeo, planeMat);
    airplaneGroup.add(hStab);

    scene.add(airplaneGroup);

    // Initial orientation & orbit parameters
    let rotX = 0.22;
    let rotY = 1.35;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let velX = 0;
    let velY = 0;

    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    // Orbit: 1.25x radius
    const orbitRadius = globeRadius * 1.25;
    const orbitInclination = 0.42;
    let flightAngle = 1.35;

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

    // Update airplane position with gentle bank
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
      airplaneGroup.rotateZ(-0.32); // gentle bank towards globe center
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
          targetRotY += 0.0016;
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
        flightAngle += 0.010;
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
      leftWingGeo.dispose();
      rightWingGeo.dispose();
      engineGeo.dispose();
      tailFinGeo.dispose();
      hStabGeo.dispose();
      planeMat.dispose();
      darkPodMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[340px] max-w-[440px] max-h-[440px] aspect-square mx-auto cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
      aria-label="Interactive 3D Earth Globe with orbiting aircraft. Drag to rotate."
      role="img"
    />
  );
};
