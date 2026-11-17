'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface TravelGlobeProps {
  className?: string;
  style?: React.CSSProperties;
}

// Exact Gabriel Beaugonin production dial parameters
const GLOBE_DIALS = {
  showGlobe: true,
  displacementScale: 0.04,
  normalScale: 2.1,
  ambientIntensity: 1.1,
  keyLightIntensity: 2.0,
  keyLightX: -4,
  keyLightY: 3,
  keyLightZ: 5,
  sphereScale: 0.6,
  cameraZ: 2.8,
  cameraFov: 45,
  rotationSpeed: 0.2,
  initRotationX: 0.2,
  initRotationY: 2.2,
};

const PLANE_DIALS = {
  scale: 0.06,
  orbitRadius: 1.3,
  orbitSpeed: 0.4,
  orbitTilt: 0.2,
  orbitTiltZ: 0.1,
  tiltZDriftSpeed: 0.16,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  bankAmount: 0.35,
  bankSpeed: 1.2,
  bankResponse: 2.6,
  smoothing: 20,
  speedSmoothingBoost: 1.1,
  scrollBoostStrength: 1.1,
  scrollBoostDecay: 1.5,
  scrollBoostMax: 15,
  scrollKickStrength: 2,
  scrollKickDecay: 10,
  shadowOpacity: 0.35,
  shadowSize: 0.15,
  shadowBlur: 0.8,
};

// Global cache variables matching Gabriel Beaugonin's runtime vectors
const vecB = new THREE.Vector3();
const vecA = new THREE.Vector3();
const vecLe = new THREE.Vector3();
const vecF = new THREE.Vector3();
const vecD = new THREE.Vector3();
const matN = new THREE.Matrix4();
const quatP = new THREE.Quaternion();
const quatIe = new THREE.Quaternion();
const quatCe = new THREE.Quaternion();
const eulerQe = new THREE.Euler();
const vecShadow = new THREE.Vector3();

// Exact mathematical flight calculation (Gabriel Beaugonin function `ue`)
function updateFlightKinematics({
  planeGroup,
  shadowMesh,
  shadowMaterial,
  params,
  angle,
  bank,
  smoothingAlpha = 1,
}: {
  planeGroup: THREE.Group;
  shadowMesh: THREE.Mesh | null;
  shadowMaterial: THREE.ShaderMaterial;
  params: typeof PLANE_DIALS;
  angle: number;
  bank: number;
  smoothingAlpha?: number;
}) {
  const h = params.orbitRadius;
  const l = params.orbitTilt;
  const i = params.orbitTiltZ - angle * params.tiltZDriftSpeed;

  const d = Math.cos(angle) * h;
  const g = Math.sin(angle) * h;
  const v = g * Math.sin(l);
  const E = g * Math.cos(l);
  const y = d * Math.cos(i) - v * Math.sin(i);
  const S = d * Math.sin(i) + v * Math.cos(i);

  vecB.set(y, S, E);
  planeGroup.position.copy(vecB);

  // Tangent flight velocity vector
  const k = -Math.sin(angle) * h;
  const u = Math.cos(angle) * h;
  const c = u * Math.sin(l);
  const x = u * Math.cos(l);
  const R = k * Math.cos(i) - c * Math.sin(i);
  const w = k * Math.sin(i) + c * Math.cos(i);

  vecA.set(R, w, x).normalize();
  vecLe.copy(vecB).normalize();
  quatCe.setFromAxisAngle(vecA, bank);
  vecF.copy(vecLe).applyQuaternion(quatCe).normalize();

  vecD.copy(vecB).add(vecA);
  matN.lookAt(vecB, vecD, vecF);
  quatP.setFromRotationMatrix(matN);
  quatIe.setFromEuler(eulerQe.set(params.rotateX, params.rotateY, params.rotateZ));
  quatP.multiply(quatIe);

  if (smoothingAlpha >= 0.999) {
    planeGroup.quaternion.copy(quatP);
  } else {
    planeGroup.quaternion.slerp(quatP, smoothingAlpha);
  }

  if (!shadowMesh) return;

  // Surface drop shadow projection
  vecShadow.copy(vecB).normalize();
  shadowMesh.position.copy(vecShadow).multiplyScalar(1.005);

  vecD.copy(vecA).addScaledVector(vecShadow, -vecA.dot(vecShadow)).normalize();
  vecF.crossVectors(vecD, vecShadow).normalize();
  matN.makeBasis(vecF, vecD, vecShadow);
  shadowMesh.quaternion.setFromRotationMatrix(matN);

  const L = vecB.length() - 1;
  const Z = params.shadowSize * (1 + L * 1.5);
  shadowMesh.scale.setScalar(Z);
  shadowMaterial.uniforms.uOpacity.value = params.shadowOpacity * Math.max(0, 1 - L * 0.8);
  shadowMaterial.uniforms.uBlur.value = params.shadowBlur;
}

export const TravelGlobe: React.FC<TravelGlobeProps> = ({
  className = "w-full h-full",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Perspective Camera matching Gabriel Beaugonin
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(GLOBE_DIALS.cameraFov, width / height, 0.1, 100);
    camera.position.set(0, 0, GLOBE_DIALS.cameraZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Exact Lighting
    const ambientLight = new THREE.AmbientLight(0xfaf8f5, GLOBE_DIALS.ambientIntensity);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, GLOBE_DIALS.keyLightIntensity);
    keyLight.position.set(GLOBE_DIALS.keyLightX, GLOBE_DIALS.keyLightY, GLOBE_DIALS.keyLightZ);
    scene.add(keyLight);

    // 3. Root Scale Group (sphereScale = 0.6)
    const rootGroup = new THREE.Group();
    rootGroup.scale.setScalar(GLOBE_DIALS.sphereScale);
    scene.add(rootGroup);

    // 4. Globe Sphere Group (Ve)
    const globeSpinGroup = new THREE.Group();
    globeSpinGroup.rotation.x = GLOBE_DIALS.initRotationX;
    globeSpinGroup.rotation.y = GLOBE_DIALS.initRotationY;
    rootGroup.add(globeSpinGroup);

    // Textures with anisotropic filtering
    const textureLoader = new THREE.TextureLoader();
    const displaceMap = textureLoader.load('/3d/textures/earth-displace.3e2227dc.webp');
    const normalMap = textureLoader.load('/3d/textures/earth-normal.5c47061b.webp');

    displaceMap.colorSpace = THREE.NoColorSpace;
    normalMap.colorSpace = THREE.NoColorSpace;
    displaceMap.wrapS = THREE.RepeatWrapping;
    displaceMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    displaceMap.minFilter = THREE.LinearMipmapLinearFilter;
    displaceMap.magFilter = THREE.LinearFilter;
    normalMap.minFilter = THREE.LinearMipmapLinearFilter;
    normalMap.magFilter = THREE.LinearFilter;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const anisotropyVal = Math.min(8, maxAnisotropy);
    displaceMap.anisotropy = anisotropyVal;
    normalMap.anisotropy = anisotropyVal;

    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xf0eeeb,
      specular: 0x000000,
      shininess: 0,
      displacementMap: displaceMap,
      displacementScale: GLOBE_DIALS.displacementScale,
      displacementBias: 0,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(GLOBE_DIALS.normalScale, GLOBE_DIALS.normalScale),
    });

    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeSpinGroup.add(globeMesh);

    // 5. Plane Group & Exact Shadow Mesh (He)
    const shadowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      uniforms: {
        uOpacity: { value: PLANE_DIALS.shadowOpacity },
        uBlur: { value: PLANE_DIALS.shadowBlur },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        uniform float uBlur;
        varying vec2 vUv;
        void main() {
          vec2 uv = (vUv - vec2(0.5)) * 2.0;

          // Fuselage body
          float body = length(uv * vec2(3.5, 1.0)) - 0.3;

          // Swept main wings
          vec2 wuv = vec2(uv.x, uv.y - 0.05);
          float wings = length(wuv * vec2(0.65, 5.0)) - 0.3;

          // Tail horizontal stabilizer
          vec2 tuv = vec2(uv.x, uv.y + 0.38);
          float tail = length(tuv * vec2(1.8, 8.0)) - 0.25;

          float k = 0.1;
          float d = -k * log(exp(-body / k) + exp(-wings / k) + exp(-tail / k));

          float alpha = smoothstep(uBlur, -uBlur * 0.75, d) * uOpacity;
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        }
      `,
    });

    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMaterial);
    rootGroup.add(shadowMesh);

    const planeGroup = new THREE.Group();
    planeGroup.scale.setScalar(PLANE_DIALS.scale);
    rootGroup.add(planeGroup);

    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0xf0eeeb,
      specular: 0x888888,
      shininess: 18,
      flatShading: false,
    });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/3d/models/plane.f4eb2d12.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = planeMaterial;
          }
        });
        planeGroup.add(model);
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn('Fallback plane:', err);
        const geom = new THREE.ConeGeometry(0.5, 1.8, 4);
        geom.rotateX(Math.PI / 2);
        const mesh = new THREE.Mesh(geom, planeMaterial);
        planeGroup.add(mesh);
        setIsLoaded(true);
      }
    );

    // 6. Kinematic State (planeAngle, planeTime, planeBank, scrollBoost, scrollKick)
    let planeAngle = 0;
    let planeTime = 0;
    let planeBank = 0;

    // Initial position
    updateFlightKinematics({
      planeGroup,
      shadowMesh,
      shadowMaterial,
      params: PLANE_DIALS,
      angle: planeAngle,
      bank: planeBank,
      smoothingAlpha: 1.0,
    });

    // 7. Animation Loop: Constant smooth orbit speed (independent of scrolling)
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Slow planetary axial rotation
      globeSpinGroup.rotation.y += delta * GLOBE_DIALS.rotationSpeed;

      // Constant flight speed — independent of page scrolling speed
      planeTime += delta;
      const currentSpeed = PLANE_DIALS.orbitSpeed;
      const smoothingFactor = PLANE_DIALS.smoothing;

      planeAngle += delta * currentSpeed;

      const targetBank = Math.sin(planeTime * PLANE_DIALS.bankSpeed) * PLANE_DIALS.bankAmount;
      planeBank += (targetBank - planeBank) * (1 - Math.exp(-PLANE_DIALS.bankResponse * delta));

      const smoothingAlpha = 1 - Math.exp(-smoothingFactor * delta);
      updateFlightKinematics({
        planeGroup,
        shadowMesh,
        shadowMaterial,
        params: PLANE_DIALS,
        angle: planeAngle,
        bank: planeBank,
        smoothingAlpha,
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 8. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      shadowMaterial.dispose();
      planeMaterial.dispose();
      displaceMap.dispose();
      normalMap.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-default select-none pointer-events-none transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={style}
      aria-hidden="true"
    />
  );
};
