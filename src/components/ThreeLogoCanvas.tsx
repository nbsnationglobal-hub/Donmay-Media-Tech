/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
}

export default function ThreeLogoCanvas({
  className = "",
  size = 300,
  interactive = true,
  autoRotate = true,
  glowingSpotlight = true,
  spinningDemo = false,
  scaleFactor = 1.0,
  primaryLightColor = "#00F0FF",
  secondaryLightColor = "#FFA012",
  ambientIntensity = 2.5,
  spotlightIntensity = 22,
  cameraZ = 70,
}: ThreeLogoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

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
    rendererRef.current = renderer;

    // Attach to DOM
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // Camera Configuration
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    camera.position.z = cameraZ;

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
    // Shift slightly left to visually balance the text/symbol centering
    logoGroup.position.set(0, 0, 0);

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

    group.add(logoGroup);
    scene.add(group);

    // Global scale multiplier
    group.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // 6. LIGHTING FRAMEWORK
    const ambientLight = new THREE.AmbientLight(0x5566aa, ambientIntensity * 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(new THREE.Color(primaryLightColor), 3.5);
    dirLight1.position.set(-50, 60, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(new THREE.Color(secondaryLightColor), 2.5);
    dirLight2.position.set(50, -30, 30);
    scene.add(dirLight2);

    // Front-left shoulder strong bright white light to directly illuminate paths
    const frontWhiteLight = new THREE.DirectionalLight(0xffffff, 2.5);
    frontWhiteLight.position.set(-35, 25, 80);
    scene.add(frontWhiteLight);

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

    window.addEventListener("mousemove", handleMouseMove);

    // 8. ANIMATED RENDER LOOP
    let clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow idle organic floating translation / oscillation loop
      if (autoRotate && !spinningDemo) {
        group.rotation.y = Math.sin(elapsedTime * 0.6) * 0.15;
        group.rotation.x = Math.cos(elapsedTime * 0.4) * 0.08;
        group.position.y = Math.sin(elapsedTime * 1.2) * 1.5;
      }

      // Smooth mouse interaction lag/spring
      if (interactive && !spinningDemo) {
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.1;
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.1;
        group.rotation.y += mouse.current.x;
        group.rotation.x -= mouse.current.y;
      }

      // Continuous Spotlight Reveal glint tracking circle
      if (glowingSpotlight) {
        spotlight.position.x = Math.sin(elapsedTime * 1.5) * 40;
        spotlight.position.y = Math.cos(elapsedTime * 1.5) * 40;
      }

      // 360-degree perfect reveal sweep loop for export recorder
      if (spinningDemo) {
        // Perfect 5s periodic rotation
        // 5 seconds total duration means 1 full rotation is elapsedTime * (2*Pi / 5)
        const duration = 5.0;
        const angle = (elapsedTime * (Math.PI * 2)) / duration;
        group.rotation.y = angle;
        group.rotation.x = Math.sin(angle) * 0.1; // modest look up and down
        group.position.y = Math.sin(elapsedTime * 1.2) * 0.5;

        // Spotlight circles around
        spotlight.position.x = Math.cos(elapsedTime * 1.5) * 35;
        spotlight.position.y = Math.sin(elapsedTime * 1.5) * 35;
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
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
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
