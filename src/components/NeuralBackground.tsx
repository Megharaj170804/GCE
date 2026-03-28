import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NeuralBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines between particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.2,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * particlesCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const linePos = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce
        if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

        // Connect lines
        for (let j = i + 1; j < particlesCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 1.5) {
            linePos[lineIdx++] = positions[i * 3];
            linePos[lineIdx++] = positions[i * 3 + 1];
            linePos[lineIdx++] = positions[i * 3 + 2];
            linePos[lineIdx++] = positions[j * 3];
            linePos[lineIdx++] = positions[j * 3 + 1];
            linePos[lineIdx++] = positions[j * 3 + 2];
          }
        }
      }

      // Clear remaining lines
      for (let k = lineIdx; k < linePos.length; k++) {
        linePos[k] = 0;
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;

      points.rotation.y += 0.001;
      lines.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-space-black" />;
};
