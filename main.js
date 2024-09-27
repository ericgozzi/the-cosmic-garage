import './style.css'

import * as THREE from 'three'
import { FontLoader, OrbitControls, ThreeMFLoader } from 'three/examples/jsm/Addons.js'; 
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#bg')

//Set the SCENE, CAMERA and RENDERER
//SCENE
const scene = new THREE.Scene();

//CAMERA
const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const viewFrustum1 = 0.1;
const viewFrustum2 = 1000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, viewFrustum1 , viewFrustum2)

// camera position
const boom = new THREE.Group()
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);
boom.add(camera);

//RENDERER SETTINGS
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// orbit contorls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;




//OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - OBJECTS - 
//define geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//define material
const material = new THREE.MeshStandardMaterial({color: 0x44646e});
//create mesh with geometry and material
const torus = new THREE.Mesh(geometry, material);
torus.name = 'torus';
//add to mesh to the scene
scene.add(torus)

//add stars
const numberOfStars = 200;
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star); 
}
Array(200).fill().forEach(addStar);


//add moon
const moonTexture = new THREE.TextureLoader().load('./assets/moonTexture.jpg')
const moonNormal = new THREE.TextureLoader().load('./assets/moonNormalMap.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
    normalScale: new THREE.Vector2(0,0.6)
  })
);
moon.position.z = -15;
moon.position.x = 15;
moon.position.y = 20;

moon.name = 'moon'
scene.add(moon)

//add orange
let orangeObj;
var gltfLoader = new GLTFLoader();
var url = './assets/orange.glb';
gltfLoader.load(url, (glb) => {
  const object = glb.scene;
  object.scale.set(100, 100, 100);
  object.position.set(-2.5, -3, 6);
  const group = new THREE.Group();
  group.add(object);
  group.position.set(-10, 15, 0);
  group.name = 'orange';
  scene.add(group);
  orangeObj = group;
});

 const orangeSphere = new THREE.SphereGeometry(4, 32, 16)
 const orangeSphereMaterial = new THREE.ShadowMaterial()
 const orange = new THREE.Mesh(orangeSphere, orangeSphereMaterial);
 orange.position.set(-10, 15, 0);
 orange.name = 'orange';
 scene.add(orange);





  //add concrete moon
let concMoonObj;
gltfLoader = new GLTFLoader();
url = './assets/concrete-moon.glb';
gltfLoader.load(url, (glb) => {
  const object = glb.scene;
  object.scale.set(3.5, 3.5, 3.5);
  object.position.set(0, 0, 0);
  const group = new THREE.Group();
  group.add(object);
  group.position.set(15, -15, 0);
  group.name = 'concreteMoon';
  scene.add(group);
  concMoonObj = group;
});

 const concreteMoonSphere = new THREE.SphereGeometry(5, 32, 16)
 const concreteMoonSphereMaterial = new THREE.ShadowMaterial()
 //const concreteMoonSphereMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
 const concreteMoon = new THREE.Mesh(concreteMoonSphere, concreteMoonSphereMaterial);
 concreteMoon.position.set(15, -15, 0);
 concreteMoon.name = 'concrete';
 scene.add(concreteMoon);


//add fan
let fanObj;
gltfLoader = new GLTFLoader();
url = './assets/fan.glb';
gltfLoader.load(url, (glb) => {
  const object = glb.scene;
  object.scale.set(3,3,3);
  object.position.set(0, 0, 0);
  const group = new THREE.Group();
  group.add(object);
  group.position.set(-15, 0, 15);
  group.name = 'fan';
  scene.add(group);
  fanObj = group;
});



 const fanSphere = new THREE.SphereGeometry(5, 32, 16)
 const fanSphereMaterial = new THREE.ShadowMaterial()
 //const fanSphereMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
 const fan = new THREE.Mesh(fanSphere, fanSphereMaterial);
 fan.position.set(-15, 0, 15);
 fan.name = 'fan';
 scene.add(fan);



 const pickableObjects = [orange, torus, moon, concreteMoon, fan]

//GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - GENERAL SCENE - 

//BACKGROUND TEXTURE
const spaceTexture = new THREE.TextureLoader().load('./assets/spaceTexture.jpg')
scene.background = spaceTexture;
scene.backgroundIntensity = 0.1;

//ADD LIGHTS
//dambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//moon light
const moonLight = new THREE.PointLight(0xffffff);
moonLight.position.set(8,20,-10)
moonLight.power = 1000;
scene.add(moonLight);

//orange light
const orangeLight = new THREE.PointLight(0xffffff);
orangeLight.position.set(-5, 20, 0)
orangeLight.power = 1000;
scene.add(orangeLight);


//torus light
const trousLight = new THREE.PointLight(0xffffff);
trousLight.position.set(0, 0, 0)
trousLight.power = 1000;
scene.add(trousLight);

//concrete moon light
const concreteMoonLight = new THREE.PointLight(0xffffff);
concreteMoonLight.position.set(23, -15, 0)
concreteMoonLight.power = 1000;
scene.add(concreteMoonLight);

//fan light
const fanLight = new THREE.PointLight(0xffffff);
fanLight.position.set(-15, 0, 23)
fanLight.power = 3000;
scene.add(fanLight);



//light helpers
const lightHelperMoon = new THREE.PointLightHelper(moonLight)
const lightHelperOrange = new THREE.PointLightHelper(orangeLight)
//scene.add(lightHelperMoon, lightHelperOrange)


//GRID HELPER
 const gridHelper = new THREE.GridHelper(200, 50);
 //scene.add(gridHelper);








// PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - PICKER CLASS - 
  class PickHelper{
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
    }

    pick(normalizedPosition, pickableObjects, camera, time){
      //restore the color if there is a picked object
      document.documentElement.style.cursor = 'default';
      //cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      //get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(pickableObjects);
      if(intersectedObjects.length){
        document.documentElement.style.cursor = 'pointer';
      }
    }


    pickHyperlink(normalizedPosition, pickableObjects, camera){
      //restore the color if there is a picked object
      if(this.pickedObject){
        this.pickedObject = undefined;
      }
      //cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      //get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(pickableObjects);
      if(intersectedObjects.length){
        //pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        //HYPERLINKS
        if(this.pickedObject.name.toLowerCase() == 'moon'){window.open("https://en.wikipedia.org/wiki/Moon")};
        if(this.pickedObject.name.toLowerCase() == 'torus'){window.open("https://en.wikipedia.org/wiki/Torus")};
        if(this.pickedObject.name.toLowerCase() == 'orange'){window.open("https://syntheticfood.tumblr.com/")};
        if(this.pickedObject.name.toLowerCase() == 'concrete'){window.open("https://concrete-rhapsody.netlify.app/")};
        if(this.pickedObject.name.toLowerCase() == 'fan'){window.open("https://smorgasbordic-factory.netlify.app/")};

      }
    }
  }





// EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - EVENTS - 
  const pickPosition = {x: 0, y: 0};
  clearPickPosition();


  function getCanvasRelativePosition(event){
    const rect = canvas.getBoundingClientRect();
    return{
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
  }


  function setPickPosition(event){
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2-1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;
  }


  function clearPickPosition(){
      // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }


  function openHyperlink(){
    pickHelper.pickHyperlink(pickPosition, pickableObjects, camera)
    clearPickPosition;
  }

  window.addEventListener('click', openHyperlink);
  window.addEventListener('mousemove', setPickPosition);
  window.addEventListener('mouseout', clearPickPosition);
  window.addEventListener('mouseleave', clearPickPosition);

  window.addEventListener('touchstart', (event) => {
    openHyperlink;
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
  }, {passive: false});

  window.addEventListener('touchend', openHyperlink);

  
  window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
  });


  function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  window.addEventListener( 'resize', onWindowResize );


 



// RENDER FUNCTION RENDER FUNCTION RENDER FUNCTIONRENDER FUNCTIONRENDER FUNCTION

  const pickHelper = new PickHelper();
  let theta = 0;
  let radius = 40;

  function render(time){
    requestAnimationFrame(render);
    time *= 0.001;


    theta += 0.1;


    //camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    //camera.lookAt( scene.position );
    boom.rotation.y += 0.003;
    camera.updateMatrixWorld();

    //animations scripts

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01

    moon.rotation.y += 0.005;

    try{
    orangeObj.rotation.x += 0.005;
    orangeObj.rotation.y += 0.004;
    orangeObj.rotation.z += 0.003;
    }catch{}

    try{
      concMoonObj.rotation.x += 0.000;
      concMoonObj.rotation.y += 0.01;
      concMoonObj.rotation.z += 0.000;
    }catch{}

    try{
      fanObj.rotation.x += 0.000;
      fanObj.rotation.y += 0.00;
      fanObj.rotation.z += 0.05;
    }catch{}
    
   

    pickHelper.pick(pickPosition, pickableObjects, camera, time);
    
    //update controls
    controls.update()
    // render the scene
    renderer.render(scene, camera);
  }
render();