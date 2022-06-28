import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import img from "../../assets/img/m.jpg"
import mAlpha from "../../assets/img/m-alpha.jpg"
import mAO from "../../assets/img/m-AO.jpg"
import mDis from "../../assets/img/m-dis.jpg"
//目标：凹凸贴图（黑-白） 需要设置构造器后面的几个参数

// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scnen.add(camera)



// 增加环境光
const light = new THREE.AmbientLight(0xffffff, 0.6); // soft white light
scnen.add( light );
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10)
scnen.add(directionalLight);




// 导入纹理
const textureLoader = new THREE.TextureLoader()
const text = textureLoader.load(img)
// 凹凸贴图
const textdis = textureLoader.load(mDis)



// 创建集合体
// 立方体  .side : Integer定义将要渲染哪一面 - 正面，背面或两者
const geometry = new THREE.BoxBufferGeometry(1, 2.3, 1);
const material = new THREE.MeshStandardMaterial({ color: "#ffff00",side: THREE.DoubleSide, map: text, displacementMap: textdis, displacementScale: 0.05 });
const cube = new THREE.Mesh(geometry, material);
scnen.add(cube);

// 平面
const pl = new THREE.PlaneBufferGeometry(1, 2.3, 200, 200)
const plcube = new THREE.Mesh(pl, material);
plcube.position.x = 2
scnen.add(plcube);

// 设置第二组uv
pl.setAttribute('uv2', new THREE.BufferAttribute(pl.attributes.uv.array, 2))
geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))




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
