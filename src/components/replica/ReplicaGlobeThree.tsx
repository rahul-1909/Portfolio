import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ReplicaGlobeThree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const width = mount.clientWidth || 380;
    const height = mount.clientHeight || 380;

    // Scene
    const scene = new THREE.Scene();

    // Camera: positioned comfortably so globe & aircraft orbit are 100% within view
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    // Lighting: Grazing directional key light from top-left + soft hemisphere fill
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight.position.set(-6, 7, 5);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc8c6c0, 1.3);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Textures: High-res Earth Editorial & Bump
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/assets/earth_editorial.jpg', (tex) => {
      tex.needsUpdate = true;
      if (prefersReducedMotion) renderer.render(scene, camera);
    });
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    const bumpMap = textureLoader.load('/assets/earth_bump.jpg', (tex) => {
      tex.needsUpdate = true;
    });
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.ClampToEdgeWrapping;

    // 1. Globe Mesh: Perfectly Smooth, Round Relief Sphere with Distinct Continents
    const globeRadius = 1.0;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 96, 96);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.18,
      roughness: 0.88,
      metalness: 0.02,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);

    // 2. Beautiful Commercial Airliner Model (Twin-Engine Passenger Jet)
    const airplaneGroup = new THREE.Group();

    // Aircraft Materials
    const airframeMat = new THREE.MeshStandardMaterial({
      color: 0xE8E7E4,
      roughness: 0.35,
      metalness: 0.15,
    });
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xC5C8CE,
      roughness: 0.40,
      metalness: 0.25,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1A1C20,
      roughness: 0.20,
      metalness: 0.60,
    });

    // Root Group oriented: Forward Nose = +Z, Aft Tail = -Z, Right Wing = +X, Left Wing = -X, Dorsal Fin = +Y
    const plane = new THREE.Group();

    // A. Main Fuselage (cylindrical passenger cabin)
    const cabinGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.32, 20);
    cabinGeo.rotateX(Math.PI / 2);
    cabinGeo.translate(0, 0, 0);
    const cabin = new THREE.Mesh(cabinGeo, airframeMat);
    plane.add(cabin);

    // B. Aerodynamic Streamlined Nose Cone
    const noseGeo = new THREE.ConeGeometry(0.032, 0.11, 20);
    noseGeo.rotateX(-Math.PI / 2);
    noseGeo.translate(0, 0, 0.215);
    const nose = new THREE.Mesh(noseGeo, airframeMat);
    plane.add(nose);

    // C. Cockpit Windshield Band (dark curved visor)
    const visorGeo = new THREE.BoxGeometry(0.040, 0.016, 0.026);
    visorGeo.translate(0, 0.023, 0.19);
    const visor = new THREE.Mesh(visorGeo, darkMat);
    plane.add(visor);

    // D. Tapered Tail Cone
    const tailConeGeo = new THREE.CylinderGeometry(0.032, 0.010, 0.18, 20);
    tailConeGeo.rotateX(Math.PI / 2);
    tailConeGeo.translate(0, 0.007, -0.25);
    const tailCone = new THREE.Mesh(tailConeGeo, airframeMat);
    plane.add(tailCone);

    // E. Realistic Swept-Back Main Wings (Span: ~0.60, 30-deg sweep, slight dihedral)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.07); // root leading edge (+Z)
    wingShape.lineTo(0.30, -0.10); // tip leading edge
    wingShape.lineTo(0.30, -0.14); // tip trailing edge
    wingShape.lineTo(0, -0.06); // root trailing edge (-Z)
    wingShape.closePath();

    const wingExtrude = { depth: 0.006, bevelEnabled: false };

    // Right Swept Wing
    const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrude);
    rightWingGeo.rotateX(Math.PI / 2);
    rightWingGeo.translate(0, -0.006, 0.02);
    const rightWing = new THREE.Mesh(rightWingGeo, wingMat);
    plane.add(rightWing);

    // Left Swept Wing (mirrored)
    const leftWingShape = new THREE.Shape();
    leftWingShape.moveTo(0, 0.07);
    leftWingShape.lineTo(-0.30, -0.10);
    leftWingShape.lineTo(-0.30, -0.14);
    leftWingShape.lineTo(0, -0.06);
    leftWingShape.closePath();

    const leftWingGeo = new THREE.ExtrudeGeometry(leftWingShape, wingExtrude);
    leftWingGeo.rotateX(Math.PI / 2);
    leftWingGeo.translate(0, -0.006, 0.02);
    const leftWing = new THREE.Mesh(leftWingGeo, wingMat);
    plane.add(leftWing);

    // Winglets (upturned tips)
    const makeWinglet = (xPos: number) => {
      const geo = new THREE.BoxGeometry(0.004, 0.038, 0.022);
      geo.translate(xPos, 0.020, -0.10);
      return new THREE.Mesh(geo, wingMat);
    };
    plane.add(makeWinglet(0.30));
    plane.add(makeWinglet(-0.30));

    // F. Twin Underwing Turbofan Jet Engines
    const makeEnginePod = (xPos: number) => {
      const engine = new THREE.Group();

      // Nacelle body
      const nacelleGeo = new THREE.CylinderGeometry(0.016, 0.014, 0.085, 16);
      nacelleGeo.rotateX(Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, airframeMat);
      engine.add(nacelle);

      // Intake face (dark hollow circle)
      const intakeGeo = new THREE.CircleGeometry(0.014, 16);
      intakeGeo.translate(0, 0, 0.043);
      const intake = new THREE.Mesh(intakeGeo, darkMat);
      engine.add(intake);

      // Exhaust cone
      const exhaustGeo = new THREE.ConeGeometry(0.009, 0.024, 16);
      exhaustGeo.rotateX(Math.PI / 2);
      exhaustGeo.translate(0, 0, -0.052);
      const exhaust = new THREE.Mesh(exhaustGeo, darkMat);
      engine.add(exhaust);

      // Pylon
      const pylonGeo = new THREE.BoxGeometry(0.004, 0.018, 0.035);
      pylonGeo.translate(0, 0.016, 0);
      const pylon = new THREE.Mesh(pylonGeo, wingMat);
      engine.add(pylon);

      engine.position.set(xPos, -0.028, 0.035);
      return engine;
    };

    plane.add(makeEnginePod(0.115));
    plane.add(makeEnginePod(-0.115));

    // G. Swept-Back Vertical Stabilizer (Tail Fin extending UP along +Y, swept toward -Z)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0); // bottom forward (-Z = -0.16)
    finShape.lineTo(-0.08, 0.13); // top forward (slanted back)
    finShape.lineTo(-0.12, 0.13); // top aft
    finShape.lineTo(-0.10, 0); // bottom aft
    finShape.closePath();

    const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.005, bevelEnabled: false });
    // In YZ plane
    finGeo.rotateY(Math.PI / 2);
    finGeo.translate(0.0025, 0.025, -0.18);
    const fin = new THREE.Mesh(finGeo, airframeMat);
    plane.add(fin);

    // H. Swept-Back Horizontal Stabilizers (Rear Wings)
    const makeTailStab = (isRight: boolean) => {
      const sign = isRight ? 1 : -1;
      const sShape = new THREE.Shape();
      sShape.moveTo(0, 0.025);
      sShape.lineTo(sign * 0.11, -0.045);
      sShape.lineTo(sign * 0.11, -0.070);
      sShape.lineTo(0, -0.020);
      sShape.closePath();

      const geo = new THREE.ExtrudeGeometry(sShape, { depth: 0.004, bevelEnabled: false });
      geo.rotateX(Math.PI / 2);
      geo.translate(0, 0.018, -0.28);
      return new THREE.Mesh(geo, wingMat);
    };

    plane.add(makeTailStab(true));
    plane.add(makeTailStab(false));

    // Scale airliner model for clear, prominent silhouette
    plane.scale.set(0.92, 0.92, 0.92);
    airplaneGroup.add(plane);
    scene.add(airplaneGroup);

    // Orbit parameters
    const orbitRadius = globeRadius * 1.34;
    const orbitInclination = 0.38;
    let flightAngle = 1.35;

    // Initial globe orientation
    let rotX = 0.22;
    let rotY = 1.60;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let velX = 0;
    let velY = 0;

    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

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

    // Performance Observer
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

    // Smoothly update aircraft flight along circular inclined orbit
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
      // lookAt aligns local +Z with velocity vector
      airplaneGroup.lookAt(nx, ny, nz);
      // Bank 25 degrees toward the globe center
      airplaneGroup.rotateZ(-0.35);
    };

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

        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;

        globeMesh.rotation.x = rotX;
        globeMesh.rotation.y = rotY;

        flightAngle += 0.009;
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
      earthTexture.dispose();
      bumpMap.dispose();
      cabinGeo.dispose();
      noseGeo.dispose();
      visorGeo.dispose();
      tailConeGeo.dispose();
      rightWingGeo.dispose();
      leftWingGeo.dispose();
      finGeo.dispose();
      airframeMat.dispose();
      wingMat.dispose();
      darkMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] max-w-[420px] max-h-[420px] aspect-square mx-auto cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
      aria-label="Interactive 3D Earth Globe with orbiting passenger airliner. Drag to rotate."
      role="img"
    />
  );
};
