import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

import px from "../../assets/img/px.jpg"
import nx from "../../assets/img/nx.jpg"
import py from "../../assets/img/py.jpg"
import ny from "../../assets/img/ny.jpg"
import pz from "../../assets/img/pz.jpg"
import nz from "../../assets/img/nz.jpg"

// 加载hdr环境图 素材下载： https://polyhaven.com/hdris

const rgbeload = new RGBELoader()
// dist/text/hdr
rgbeload.loadAsync('text/alps_field_4k.hdr').then(text => {
    text.mapping = THREE.EquirectangularReflectionMapping
    scnen.background = text
    scnen.environment = text
})

//目标：环境贴图 

// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scnen.add(camera)

const cubeLoader = new THREE.CubeTextureLoader()
const envMap = cubeLoader.load([
    px,
    nx,
    py,
    ny,
    pz,
    nz
]);
// 给环境添加背景
// scnen.background = envMap
// 给环境所以的物体添加环境贴图
// scnen.environment = envMap

const geometry = new THREE.SphereBufferGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({ metalness: .7, roughness: 0.1, /*envMap: envMap */ });
const sphere = new THREE.Mesh(geometry, material);
scnen.add(sphere);









// 增加环境光
const light = new THREE.AmbientLight(0xffffff, 0.6); // soft white light
scnen.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10)
scnen.add(directionalLight);


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
