/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface ThreeLogoCanvasProps {
  className?: string; // Additional Tailwind styling if needed
  size?: number; // Size in pixels
  interactive?: boolean; // Follow mouse movements
  autoRotate?: boolean; // Slower float loop rotation
  glowingSpotlight?: boolean; // Spotlight glint animation
  spinningDemo?: boolean; // Perfect 360 loop animation for social media export
  scaleFactor?: number; // Zoom multiplier for asset adjustment
  primaryLightColor?: string; // Hex color string for direct light 1
  secondaryLightColor?: string; // Hex color string for direct light 2
  ambientIntensity?: number; // Ambient background light strength
  spotlightIntensity?: number; // Floating spotlight spot strength
  cameraZ?: number; // Custom camera distance along Z-axis
  showText?: boolean; // Support toggleable 3D typography
  assetMode?: string; // Custom asset mode (e.g. "full" or "D", "O", "N", ...)
  forceFrontSnap?: boolean; // Force front snap look for export quality
}

// ==========================================
// PROCEDURAL 3D VECTOR TYPOGRAPHY ENGINE
// ==========================================
function createLetterShape(char: string): THREE.Shape {
  const shape = new THREE.Shape();
  if (char === "D") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(4, 10);
    shape.quadraticCurveTo(8, 10, 8, 5);
    shape.quadraticCurveTo(8, 0, 4, 0);
    shape.closePath();
    
    const hole = new THREE.Path();
    hole.moveTo(2, 2);
    hole.lineTo(2, 8);
    hole.lineTo(4, 8);
    hole.quadraticCurveTo(6, 8, 6, 5);
    hole.quadraticCurveTo(6, 2, 4, 2);
    hole.closePath();
    shape.holes.push(hole);
  } else if (char === "O") {
    shape.absellipse(4.5, 5, 4.5, 5, 0, Math.PI * 2, false, 0);
    const hole = new THREE.Path();
    hole.absellipse(4.5, 5, 2.3, 3.2, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole);
  } else if (char === "N") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(2.2, 10);
    shape.lineTo(6, 2.8);
    shape.lineTo(6, 10);
    shape.lineTo(8.2, 10);
    shape.lineTo(8.2, 0);
    shape.lineTo(6, 0);
    shape.lineTo(2.2, 7.2);
    shape.lineTo(2.2, 0);
    shape.closePath();
  } else if (char === "M") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(2.2, 10);
    shape.lineTo(4.8, 3.8);
    shape.lineTo(7.4, 10);
    shape.lineTo(9.6, 10);
    shape.lineTo(9.6, 0);
    shape.lineTo(7.6, 0);
    shape.lineTo(7.6, 6.8);
    shape.lineTo(4.8, 1.2);
    shape.lineTo(2, 6.8);
    shape.lineTo(2, 0);
    shape.closePath();
  } else if (char === "A") {
    shape.moveTo(0, 0);
    shape.lineTo(3.4, 10);
    shape.lineTo(6.2, 10);
    shape.lineTo(9.6, 0);
    shape.lineTo(7.4, 0);
    shape.lineTo(6.4, 3.2);
    shape.lineTo(3.2, 3.2);
    shape.lineTo(2.2, 0);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(4.8, 8);
    hole.lineTo(3.7, 4.8);
    hole.lineTo(5.9, 4.8);
    hole.closePath();
    shape.holes.push(hole);
  } else if (char === "Y") {
    shape.moveTo(0, 10);
    shape.lineTo(2.4, 10);
    shape.lineTo(4.8, 5);
    shape.lineTo(7.2, 10);
    shape.lineTo(9.6, 10);
    shape.lineTo(5.8, 4);
    shape.lineTo(5.8, 0);
    shape.lineTo(3.8, 0);
    shape.lineTo(3.8, 4);
    shape.closePath();
  } else if (char === "E") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(7, 10);
    shape.lineTo(7, 8.2);
    shape.lineTo(2.2, 8.2);
    shape.lineTo(2.2, 6);
    shape.lineTo(6.2, 6);
    shape.lineTo(6.2, 4.2);
    shape.lineTo(2.2, 4.2);
    shape.lineTo(2.2, 1.8);
    shape.lineTo(7, 1.8);
    shape.lineTo(7, 0);
    shape.closePath();
  } else if (char === "I") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(2.2, 10);
    shape.lineTo(2.2, 0);
    shape.closePath();
  } else if (char === "T") {
    shape.moveTo(2.8, 0);
    shape.lineTo(2.8, 8.2);
    shape.lineTo(0, 8.2);
    shape.lineTo(0, 10);
    shape.lineTo(7.8, 10);
    shape.lineTo(7.8, 8.2);
    shape.lineTo(5, 8.2);
    shape.lineTo(5, 0);
    shape.closePath();
  } else if (char === "C") {
    shape.moveTo(6.8, 1.8);
    shape.lineTo(6.8, 0);
    shape.quadraticCurveTo(0, 0, 0, 5);
    shape.quadraticCurveTo(0, 10, 6.8, 10);
    shape.lineTo(6.8, 8.2);
    shape.quadraticCurveTo(2.2, 8.2, 2.2, 5);
    shape.quadraticCurveTo(2.2, 1.8, 6.8, 1.8);
    shape.closePath();
  } else if (char === "H") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(2.2, 10);
    shape.lineTo(2.2, 6);
    shape.lineTo(6.2, 6);
    shape.lineTo(6.2, 10);
    shape.lineTo(8.4, 10);
    shape.lineTo(8.4, 0);
    shape.lineTo(6.2, 0);
    shape.lineTo(6.2, 4.2);
    shape.lineTo(2.2, 4.2);
    shape.lineTo(2.2, 0);
    shape.closePath();
  } else if (char === "&") {
    shape.moveTo(0, 0);
    shape.lineTo(3, 3);
    shape.lineTo(5, 0);
    shape.lineTo(7.5, 0);
    shape.lineTo(4, 4.5);
    shape.lineTo(6.5, 10);
    shape.lineTo(4, 10);
    shape.lineTo(2.2, 6);
    shape.lineTo(0, 10);
    shape.lineTo(0, 7.5);
    shape.lineTo(1.5, 5);
    shape.lineTo(0, 2.5);
    shape.closePath();
  } else if (char === "R") {
    shape.moveTo(0, 0);
    shape.lineTo(0, 10);
    shape.lineTo(5, 10);
    shape.quadraticCurveTo(8, 10, 8, 7);
    shape.quadraticCurveTo(8, 4.5, 5, 4.5);
    shape.lineTo(8, 0);
    shape.lineTo(5.5, 0);
    shape.lineTo(2.8, 4.5);
    shape.lineTo(2, 4.5);
    shape.lineTo(2, 0);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(2, 6.3);
    hole.lineTo(2, 8.2);
    hole.lineTo(4.5, 8.2);
    hole.quadraticCurveTo(6, 8.2, 6, 7.25);
    hole.quadraticCurveTo(6, 6.3, 4.5, 6.3);
    hole.closePath();
    shape.holes.push(hole);
  }
  return shape;
}

function create3DWord(text: string, size: number, height: number, material: THREE.Material | THREE.Material[]): THREE.Group {
  const wordGroup = new THREE.Group();
  let currentX = 0;
  const scale = size / 10;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === " ") {
      currentX += 4.5 * scale;
      continue;
    }

    const shape = createLetterShape(char);
    const extrudeSettings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.18 * scale,
      bevelThickness: 0.18 * scale,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.scale(scale, scale, 1);
    
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(currentX, 0, 0);
    wordGroup.add(mesh);

    let width = 8.2;
    if (char === "I") width = 2.2;
    else if (char === "T" || char === "C" || char === "Y") width = 7.5;
    else if (char === "M") width = 9.6;
    else if (char === "&") width = 7.5;
    
    currentX += (width + 2) * scale;
  }
  return wordGroup;
}

export default function ThreeLogoCanvas({
  className = "",
  size = 300,
  interactive = true,
  spinningDemo = false,
  autoRotate = !spinningDemo,
  glowingSpotlight = true,
  scaleFactor = 1.0,
  primaryLightColor = "#00F0FF",
  secondaryLightColor = "#FFA012",
  ambientIntensity = 2.5,
  spotlightIntensity = 22,
  cameraZ = 70,
  showText = false,
  assetMode = "full",
  forceFrontSnap = false,
}: ThreeLogoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  // Synchronize forceFrontSnap in a ref to keep it dynamic and avoid re-instantiating WebGL
  const forceFrontSnapRef = useRef(forceFrontSnap);
  useEffect(() => {
    forceFrontSnapRef.current = forceFrontSnap;
  }, [forceFrontSnap]);

  // Expose canvas for media capture/snapshots if needed
  useEffect(() => {
    if (!containerRef.current) return;

    // 1. WEBGL CAPABILITY SAFEGUARD
    let gl: WebGLRenderingContext | null = null;
    try {
      const testCanvas = document.createElement("canvas");
      gl = (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch (e) {
      console.warn("WebGL not supported by client device.", e);
    }

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // 2. SCENE SETUP
    const width = size;
    const height = size;
    const scene = new THREE.Scene();

    // Transparent slate background to allow layout blending
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true, // Crucial for taking snapshots or recording
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    if (assetMode && assetMode !== "full") {
      renderer.setClearColor(0x040714, 1.0);
    } else {
      renderer.setClearColor(0x000000, 0.0);
    }
    rendererRef.current = renderer;

    // Attach to DOM
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // Camera Configuration
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    camera.position.z = cameraZ;

    // OrbitControls Setup - explicitly target the true center of the scene
    let controls: OrbitControls | null = null;
    if (interactive && !spinningDemo) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false; // Prevent hijack of page scrolls
      controls.target.set(0, 0, 0);
      controls.update();
    }

    // 3. GRADIENT COMPONENT TEXTURE GENERATORS
    // Soundwave EQ bars linear gradient (Cyan/Blue -> Yellow/Gold)
    const eqCanvas = document.createElement("canvas");
    eqCanvas.width = 1;
    eqCanvas.height = 128;
    const eqCtx = eqCanvas.getContext("2d");
    if (eqCtx) {
      const grad = eqCtx.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0, "#00F0FF");
      grad.addColorStop(0.35, "#00A2FF");
      grad.addColorStop(1, "#FFA012");
      eqCtx.fillStyle = grad;
      eqCtx.fillRect(0, 0, 1, 128);
    }
    const eqTexture = new THREE.CanvasTexture(eqCanvas);

    // Blue "D" Arc gradient
    const blueCanvas = document.createElement("canvas");
    blueCanvas.width = 1;
    blueCanvas.height = 128;
    const blueCtx = blueCanvas.getContext("2d");
    if (blueCtx) {
      const grad = blueCtx.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0, "#00F0FF");
      grad.addColorStop(1, "#0055FF");
      blueCtx.fillStyle = grad;
      blueCtx.fillRect(0, 0, 1, 128);
    }
    const blueTexture = new THREE.CanvasTexture(blueCanvas);

    // Gold "M" right leg gradient
    const goldCanvas = document.createElement("canvas");
    goldCanvas.width = 1;
    goldCanvas.height = 128;
    const goldCtx = goldCanvas.getContext("2d");
    if (goldCtx) {
      const grad = goldCtx.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0, "#FFEB3B");
      grad.addColorStop(1, "#FF8A00");
      goldCtx.fillStyle = grad;
      goldCtx.fillRect(0, 0, 1, 128);
    }
    const goldTexture = new THREE.CanvasTexture(goldCanvas);

    // 4. METALLIC MATERIALS
    const eqMaterial = new THREE.MeshStandardMaterial({
      map: eqTexture,
      metalness: 0.9,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    const blueMaterial = new THREE.MeshStandardMaterial({
      map: blueTexture,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      map: goldTexture,
      metalness: 0.9,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFEB3B,
      emissive: 0xFFEB3B,
      emissiveIntensity: 1.2,
      metalness: 0.1,
      roughness: 0.1,
    });

    // 5. GEOMETRY BUILDERS
    const group = new THREE.Group();

    // Center adjustment group
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 0, 0);

    let letterMesh: THREE.Group | null = null;

    if (assetMode && assetMode !== "full") {
      // Create a smooth horizontal gradient canvas for the letter face
      const letterFaceCanvas = document.createElement("canvas");
      letterFaceCanvas.width = 256;
      letterFaceCanvas.height = 1;
      const faceCtx = letterFaceCanvas.getContext("2d");
      if (faceCtx) {
        const grad = faceCtx.createLinearGradient(0, 0, 256, 0);
        grad.addColorStop(0, "#00E5FF"); // Energy-Cyan
        grad.addColorStop(1, "#0052FF"); // Tech-Blue
        faceCtx.fillStyle = grad;
        faceCtx.fillRect(0, 0, 256, 1);
      }
      const letterFaceTexture = new THREE.CanvasTexture(letterFaceCanvas);

      const letterFaceMaterial = new THREE.MeshStandardMaterial({
        map: letterFaceTexture,
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1.5,
      });

      // Render the single bold, capitalized 3D letter
      letterMesh = create3DWord(assetMode.toUpperCase(), 24.0, 6.0, [letterFaceMaterial, goldMaterial]);
      logoGroup.add(letterMesh);
    } else {
      // a. Equalizer Bars (Capsules for perfect round 3D look)
      const eqParams = [
        { x: -31, h: 28 },
        { x: -24, h: 44 },
        { x: -17, h: 60 },
        { x: -10, h: 36 },
      ];

      eqParams.forEach((param) => {
        // Capsules are centered on origin, length is the cylindrical height, radius is thickness
        const radius = 1.95;
        const length = param.h - radius * 2;
        const eqGeom = new THREE.CapsuleGeometry(radius, length, 8, 24);
        const eqMesh = new THREE.Mesh(eqGeom, eqMaterial);
        eqMesh.position.set(param.x, 0, 0);
        logoGroup.add(eqMesh);
      });

      // b. Big "D" Arc Tube Shape
      // Let's create a perfect curve for stroke D
      const dPoints = [
        new THREE.Vector3(5, 14, 0),
        new THREE.Vector3(12, 14, 0),
        new THREE.Vector3(26, 8, 0),
        new THREE.Vector3(29, 0, 0),
        new THREE.Vector3(26, -8, 0),
        new THREE.Vector3(12, -14, 0),
        new THREE.Vector3(5, -14, 0),
      ];
      const dCurve = new THREE.CatmullRomCurve3(dPoints);
      const dTubeGeom = new THREE.TubeGeometry(dCurve, 64, 2.5, 16, false);
      const dMesh = new THREE.Mesh(dTubeGeom, blueMaterial);
      logoGroup.add(dMesh);

      // c. Futuristic "M" Left Leg Curve Tube
      const mLeftPoints = [
        new THREE.Vector3(8, -14, 0),
        new THREE.Vector3(8, 2, 0),
        new THREE.Vector3(16, -6, 0),
      ];
      const mLeftCurve = new THREE.CatmullRomCurve3(mLeftPoints);
      const mLeftGeom = new THREE.TubeGeometry(mLeftCurve, 32, 2.1, 16, false);
      const mLeftMesh = new THREE.Mesh(mLeftGeom, blueMaterial);
      logoGroup.add(mLeftMesh);

      // d. Futuristic "M" Right Leg Curve Tube
      const mRightPoints = [
        new THREE.Vector3(16, -6, 0),
        new THREE.Vector3(24, 2, 0),
        new THREE.Vector3(24, -14, 0),
      ];
      const mRightCurve = new THREE.CatmullRomCurve3(mRightPoints);
      const mRightGeom = new THREE.TubeGeometry(mRightCurve, 32, 2.1, 16, false);
      const mRightMesh = new THREE.Mesh(mRightGeom, goldMaterial);
      logoGroup.add(mRightMesh);

      // e. Central Interactive Glowing Circle Node
      const sphereGeom = new THREE.SphereGeometry(2.7, 32, 32);
      const sphereMesh = new THREE.Mesh(sphereGeom, sphereMaterial);
      sphereMesh.position.set(16, -6, 0.4); // Push slightly forward (Z-axis) to pop
      logoGroup.add(sphereMesh);

      // f. 3D Text Lockup if requested
      if (showText) {
        // Create 'DONMAY' group
        const donmayMesh = create3DWord("DONMAY", 13.5, 3.2, blueMaterial);
        donmayMesh.position.set(38, 1.8, 0);
        logoGroup.add(donmayMesh);

        // Create 'MEDIA & TECH' group below it
        const mediaTechMesh = create3DWord("MEDIA & TECH", 6.2, 1.6, goldMaterial);
        mediaTechMesh.position.set(38, -11.5, 0);
        logoGroup.add(mediaTechMesh);
      }
    }

    // Dynamic auto-centering centroid adjustment
    const box = new THREE.Box3().setFromObject(logoGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    logoGroup.children.forEach((child) => {
      child.position.sub(center);
    });

    group.add(logoGroup);
    scene.add(group);

    // Global scale multiplier
    group.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // 6. LIGHTING FRAMEWORK
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity * 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(new THREE.Color(primaryLightColor), 3.5);
    dirLight1.position.set(-50, 60, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(new THREE.Color(secondaryLightColor), 2.5);
    dirLight2.position.set(50, -30, 30);
    scene.add(dirLight2);

    // Front-left shoulder strong bright white light to directly illuminate paths
    const frontWhiteLight = new THREE.DirectionalLight(0xffffff, 2.5);
    frontWhiteLight.position.set(-60, 60, 150);
    scene.add(frontWhiteLight);

    // Camera light that tracks with the camera view to keep text faces bright
    const cameraLight = new THREE.DirectionalLight(0xffffff, 2.8);
    cameraLight.position.set(0, 0, 10);
    camera.add(cameraLight);
    scene.add(camera);

    const spotlight = new THREE.SpotLight(0xffffff, spotlightIntensity);
    spotlight.position.set(0, 0, 80);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.8;
    spotlight.decay = 1.0;
    scene.add(spotlight);

    // 7. RESPONSIVE EVENT HANDLERS
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || spinningDemo) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current.targetX = x * 0.45; // limit tilt angle
      mouse.current.targetY = y * 0.45;
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);

    // 8. ANIMATED RENDER LOOP
    let clock = new THREE.Clock();
    let lastForceFrontSnap = forceFrontSnapRef.current;

    const tick = () => {
      const currentForceFrontSnap = forceFrontSnapRef.current;
      if (lastForceFrontSnap && !currentForceFrontSnap) {
        // Just transitioned from preparation/flat prep to active recording animation sequence.
        // Restart the clock to guarantee the captured stream begins exactly at frame 0.0s.
        clock.getElapsedTime();
        clock.start();
      }
      lastForceFrontSnap = currentForceFrontSnap;

      const elapsedTime = clock.getElapsedTime();

      // Update OrbitControls if active
      if (controls && !spinningDemo) {
        controls.update();
      }

      // 1. Base rotation and position (idle slo-float)
      let baseRotY = 0;
      let baseRotX = 0;
      let basePosY = 0;

      if (autoRotate && !spinningDemo) {
        baseRotY = Math.sin(elapsedTime * 0.6) * 0.15;
        baseRotX = Math.cos(elapsedTime * 0.4) * 0.08;
        basePosY = Math.sin(elapsedTime * 1.2) * 1.5;
      }

      // 2. Mouse interactive tilt (smooth spring-damping)
      if (interactive && !spinningDemo) {
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.1;
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.1;
        
        // Directly set properties to hold a safe range and guarantee readability
        group.rotation.y = baseRotY + mouse.current.x;
        group.rotation.x = baseRotX - mouse.current.y;
        group.position.y = basePosY;
      } else if (!spinningDemo) {
        // Safe lock flat-faced
        group.rotation.y = baseRotY;
        group.rotation.x = baseRotX;
        group.position.y = basePosY;
      }

      // Continuous Spotlight Reveal glint tracking circle
      if (glowingSpotlight) {
        spotlight.position.x = Math.sin(elapsedTime * 1.5) * 40;
        spotlight.position.y = Math.cos(elapsedTime * 1.5) * 40;
      }

      // 360-degree perfect reveal sweep loop for export recorder
      if (spinningDemo) {
        const duration = 5.0;
        // Periodic time t wrapped around duration to guarantee loop safety
        const t = elapsedTime % duration;
        const startCamZ = assetMode !== "full" ? 400 : cameraZ;

        if (assetMode !== "full" && letterMesh) {
          letterMesh.rotation.set(0, 0, 0);
        }

        if (t === 0 || elapsedTime === 0) {
          // Exact flat-facing readability alignment at Frame 0 / timestamp 0:00
          group.rotation.set(0, 0, 0);
          group.position.set(0, 0, 0);
          camera.position.set(0, 0, startCamZ);
        } else if (t < 1.0) {
          // Seconds 0.0 – 1.0: Gentle elegant tilt-reveal
          const p = t; // normalized 0.0 to 1.0
          const smoothP = Math.sin((p * Math.PI) / 2);
          
          group.rotation.x = smoothP * 0.18; // gentle pitch forward
          group.rotation.y = smoothP * 0.25; // gentle horizontal twist
          group.rotation.z = 0;
          group.position.y = 0;

          camera.position.z = startCamZ - smoothP * 30; // camera moves in slightly
          camera.position.x = 0;
          camera.position.y = 0;
        } else if (t < 3.5) {
          // Seconds 1.0 – 3.5: Execute controlled floating oscillation and horizontal rotation sweep
          const p = (t - 1.0) / 2.5; // normalized 0.0 to 1.0
          
          // Floating oscillation (vertical float wave)
          const oscillation = Math.sin(p * Math.PI * 2) * 2.5;
          group.position.y = oscillation;

          // Minor horizontal sweep and tilt (starting from values at end of phase 1)
          group.rotation.x = 0.18 + Math.sin(p * Math.PI) * 0.12;
          group.rotation.y = 0.25 - p * 0.8; // sweeps from 0.25 down to -0.55
          group.rotation.z = Math.sin(p * Math.PI) * 0.04;

          camera.position.z = (startCamZ - 30) + Math.sin(p * Math.PI) * 15;
          camera.position.x = Math.sin(p * Math.PI) * 20;
          camera.position.y = Math.cos(p * Math.PI) * 5;
        } else {
          // Seconds 3.5 – 5.0 (Phase 3): Smoothly interpolate (LERP) coordinates back to 0,0,0
          const p = (t - 3.5) / 1.5; // normalized 0.0 to 1.0
          const easeP = (1.0 - Math.cos(p * Math.PI)) / 2.0; // Cosine smooth ease-back

          group.rotation.x = (1.0 - easeP) * 0.18;
          group.rotation.y = (1.0 - easeP) * (-0.55);
          group.rotation.z = 0;
          group.position.y = 0;

          // LERP camera position back to exactly startCamZ
          camera.position.z = THREE.MathUtils.lerp(startCamZ - 30, startCamZ, easeP);
          camera.position.x = THREE.MathUtils.lerp(20, 0, easeP);
          camera.position.y = THREE.MathUtils.lerp(5, 0, easeP);
        }

        camera.lookAt(0, 0, 0);

        // Spotlight circles around
        spotlight.position.x = Math.cos(elapsedTime * 1.5) * 35;
        spotlight.position.y = Math.sin(elapsedTime * 1.5) * 35;
      }

      // 4. Force strict face-forward calibration for STILL or snapshot triggers
      if (forceFrontSnapRef.current) {
        if (assetMode && assetMode !== "full") {
          if (letterMesh) {
            letterMesh.rotation.set(0, 0, 0);
          }
          group.rotation.set(0, 0, 0);
          group.position.set(0, 0, 0);
          camera.position.set(0, 0, 400);
        } else {
          group.rotation.set(0, 0, 0);
          group.position.set(0, 0, 0);
          camera.position.set(0, 0, cameraZ);
        }
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width || size, height || size);
      }
    });
    resizeObserver.observe(containerRef.current);

    // Cleanup resources
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      if (controls) {
        controls.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      eqTexture.dispose();
      blueTexture.dispose();
      goldTexture.dispose();

      // Dispose of all geometries and materials recursively
      group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });
    };
  }, [
    size,
    interactive,
    autoRotate,
    glowingSpotlight,
    spinningDemo,
    scaleFactor,
    primaryLightColor,
    secondaryLightColor,
    ambientIntensity,
    spotlightIntensity,
    cameraZ,
    showText,
    assetMode,
  ]);

  // SVG Fallback for low-spec/WebGL-restricted devices or contexts
  if (!hasWebGL) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
      >
        <defs>
          <linearGradient id="blueYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="35%" stopColor="#00A2FF" />
            <stop offset="100%" stopColor="#FFA012" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEB3B" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>
        </defs>
        <g>
          <rect x="8" y="24" width="4.2" height="32" rx="2.1" fill="url(#blueYellowGrad)" />
          <rect x="15.5" y="14" width="4.2" height="52" rx="2.1" fill="url(#blueYellowGrad)" />
          <rect x="23" y="4" width="4.2" height="72" rx="2.1" fill="url(#blueYellowGrad)" />
          <rect x="30.5" y="18" width="4.2" height="44" rx="2.1" fill="url(#blueYellowGrad)" />
          <path
            d="M 46 22 H 54 C 66.5 22, 77 30, 77 40 C 77 50, 66.5 58, 54 58 H 46"
            fill="none"
            stroke="url(#blueGrad)"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path d="M 50 58 V 34 L 60 46" fill="none" stroke="url(#blueGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 60 46 L 70 34 V 58" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="46" r="3.2" fill="#FFEB3B" stroke="#040714" strokeWidth="1.2" />
        </g>
      </svg>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden rounded ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
