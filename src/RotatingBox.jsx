import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class RotatingBox extends Component {
  componentDidMount() {
    const width = this.rotatingBox.clientWidth;
    const height = this.rotatingBox.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.setSize(width, height);
    this.rotatingBox.appendChild(this.renderer.domElement);
    this.initializeCamera();

    const loader = new THREE.TextureLoader();

    const material = [
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-1.jpg')
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-2.jpg')
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-3.jpg')
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-4.jpg')
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-5.jpg')
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load('img/flower-6.jpg')
      })
    ];
    // var material = new THREE.MeshBasicMaterial({ color: '#bada55' });
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.animate(this);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.rotatingBox.removeChild(this.renderer.domElement);
  }

  initializeCamera = () => {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;
  };

  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  render() {
    return (
      <div
        style={{ width: '100vw', height: '100vh' }}
        ref={rotatingBox => {
          this.rotatingBox = rotatingBox;
        }}
      />
    );
  }
}

export default RotatingBox;
