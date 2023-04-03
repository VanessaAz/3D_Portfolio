import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { PointLight } from 'three' 


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)

renderer.render (scene, camera)
const goldTexture = new THREE.TextureLoader().load('/gold.jpg')

const geometry = new THREE.TorusGeometry(6.2, 1.4, 12, 100)
const material = new THREE.MeshPhongMaterial( {map: goldTexture} )
const torus = new THREE.Mesh( geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)


const controls = new OrbitControls(camera, renderer.domElement)


function addStar(){

  const geometry = new THREE.SphereGeometry(0.4, 4, 4)
  const material = new THREE.MeshStandardMaterial( { map: goldTexture })
  const star = new THREE.Mesh( geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 150 ) )
  star.position.set(x,y,z)
  scene.add(star)

}

Array(300).fill().forEach(addStar)



//Box

const colorTexture = new THREE.TextureLoader().load('/color_texture.jpg')

const color = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: colorTexture})
)

scene.add(color)


const color2 = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: colorTexture})
)

scene.add(color2)

color2.position.z = 0
color2.position.setX(-25)
color2.position.setY(-5)

//Rings


const ring1 = new THREE.Mesh(
  new THREE.TorusGeometry(6.2, 1.4, 12, 100),
  new THREE.MeshPhongMaterial( { map: goldTexture, })
  )

scene.add(ring1)

ring1.position.z = 30
ring1.position.setX(-10)
ring1.position.setY(6)

const ring2 = new THREE.Mesh(
  new THREE.TorusGeometry(6.2, 1.4, 12, 100),
  new THREE.MeshPhongMaterial( { map: goldTexture })
)

scene.add(ring2)

ring2.position.z = 30
ring2.position.setX(50)
ring2.position.setY(-10)


const ring3 = new THREE.Mesh(
  new THREE.TorusGeometry(5, 1.4, 12, 100),
  new THREE.MeshPhongMaterial( { map: goldTexture })
)

scene.add(ring3)

ring3.position.z = 30
ring3.position.setX(20)


function moveCamera(){

  const t = document.body.getBoundingClientRect().top
  ring1.rotation.x += 0.05
  ring1.rotation.y += 0.075
  ring1.rotation.z += 0.05

  ring2.rotation.x += 0.025
  ring2.rotation.y += 0.05
  ring2.rotation.z += 0.025

  ring3.rotation.x += 0.05
  ring3.rotation.y += 0.075
  ring3.rotation.z += 0.05

  color.rotation.y += 0.01
  color.rotation.z += 0.01

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002

}

document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  color.rotation.x += 0.002;
  color.rotation.y += 0.005;
  color.rotation.z += 0.001;

controls.update()

  renderer.render( scene, camera)
}

animate()