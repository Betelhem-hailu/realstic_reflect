import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
let sphereCamera;

function init() {

  camera.position.set(0, 400, 1000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  let urls = [
    'posx.jpg', 'negx.jpg',
    'posy.jpg', 'negy.jpg',
    'posz.jpg', 'negz.jpg',
  ];

  let loader = new THREE.CubeTextureLoader();
  scene.background = loader.load(urls); 

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

  sphereCamera = new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
  sphereCamera.position.set(0, 100, 0);
  scene.add(sphereCamera);

  let sphereMaterial = new THREE.MeshBasicMaterial( {envMap: cubeRenderTarget.texture} );


  let sphereGeo = new THREE.SphereGeometry(350, 50, 50);
  let sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
  sphere.position.set(0,100,0);
  scene.add(sphere);

  render()
}

function render(){
  renderer.render(scene, camera);
  sphereCamera.update(renderer, scene);
  requestAnimationFrame(render); 
}
init()