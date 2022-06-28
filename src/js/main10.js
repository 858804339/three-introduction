import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"
import gsap from "gsap"

// 打造酷炫的三角形


// 1.创建场景
const scnen = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)

scnen.add(camera)

for (let i = 0; i < 50; i++) {
    // 创建集合体
    const geometry = new THREE.BufferGeometry();

    const positionArr = new Float32Array(9)

    for (let j = 1; j <= 9; j++) {
        positionArr[j] = Math.random() * 10 - 5
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positionArr, 3))

    let color = new THREE.Color(Math.random(), Math.random(), Math.random())

    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .4 });

    const mash = new THREE.Mesh(geometry, material)
    scnen.add(mash)

}











// 初始化
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)



// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。必须在你的动画循环里调用.update()。
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scnen.add(axesHelper);


function animation() {
    controls.update()
    // 渲染
    renderer.render(scnen, camera)
    // 下一帧的时候调用 render函数
    requestAnimationFrame(animation)
}

animation()



window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()

    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})


// 双击控制全屏
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement)
        //  让画布去请去  进入全屏
        renderer.domElement.requestFullscreen()
    // 直接请求document 退出全屏
    else document.exitFullscreen()
})



