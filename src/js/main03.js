import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// 控制3d物体的移动和缩放


// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)

scnen.add(camera)


// 创建集合体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);


// 修改物体的位置
// cube.position.set(0, 5, 0)

// 缩放
cube.scale.set(1, 2, 1)

// 旋转 Math.PI=180°
cube.rotation.set(Math.PI / 4, 0, 0)

scnen.add(cube);

// 初始化
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)



// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scnen.add(axesHelper);

function animation(time) {
    // console.log(time);
    let t = time / 1000 % 5

    cube.position.x = t * 1
    cube.rotation.x = t * 1

    // if (cube.position.x > 5) {
    //     cube.position.x = 0
    // }

    // 渲染
    renderer.render(scnen, camera)
    // 下一帧的时候调用 render函数
    requestAnimationFrame(animation)
}

animation()
