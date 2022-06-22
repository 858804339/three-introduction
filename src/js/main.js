import * as THREE from 'three'

// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)

scnen.add(camera)


// 创建集合体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scnen.add( cube );

// 初始化
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(render.domElement )

// 渲染
render.render(scnen ,camera)