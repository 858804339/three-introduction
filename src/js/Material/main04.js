import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import img from "../../assets/img/m.jpg"
import mAlpha from "../../assets/img/m-alpha.jpg"
//目标：透明纹理

// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)

scnen.add(camera)

// 导入纹理
const textureLoader = new THREE.TextureLoader()
const text = textureLoader.load(img)
// 黑透白白不透
const textalpha = textureLoader.load(mAlpha)



// 创建集合体
// 立方体
const geometry = new THREE.BoxBufferGeometry(1, 2.3, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ffff00", map: text, alphaMap: textalpha, transparent: true ,side:THREE.DoubleSide});
const cube = new THREE.Mesh(geometry, material);
scnen.add(cube);

// 平面
const pl = new THREE.PlaneBufferGeometry(1,2.3)
const plcube = new THREE.Mesh(pl, material);
plcube.position.x = 3
scnen.add(plcube);







// 初始化
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scnen.add(axesHelper);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

function animation() {
    // 渲染
    renderer.render(scnen, camera)
    // 下一帧的时候调用 render函数
    requestAnimationFrame(animation)
}

animation()
