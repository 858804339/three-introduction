import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import img from "../../assets/img/R-C.jpg"
// 纹理属性

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

// 纹理偏移
// text.offset.x = 0.5
// text.offset.y = 0.5
// 纹理旋转 
// 设置旋转中心点
// text.center.set(0.5, 0.5)
// 旋转45度
// text.rotation = Math.PI / 4
// 纹理是否重复
// text.repeat.set(2, 3)
// 设置重复模式
// text.wrapS = THREE.MirroredRepeatWrapping; //镜像重复
// text.wrapT = THREE.ReinhardToneMapping; //水平重复


// 创建集合体
const geometry = new THREE.BoxBufferGeometry(1, 2.3, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ffff00", map: text });
const cube = new THREE.Mesh(geometry, material);
scnen.add(cube);




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
