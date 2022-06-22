import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

// 监听画面的变化，更新渲染


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
// 设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。必须在你的动画循环里调用.update()。
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scnen.add(axesHelper);


// 设置时钟
const clock = new THREE.Clock()

// gsap 设置动画

let gposition = gsap.to(cube.position, {
    x: 5, duration: 5, ease: "power2.inOut",
    // 设置触发次数
    repeat: 2,
    // 往返运动
    yoyo: true,
    // 延迟运动
    delay: 1,
    onComplete: () => {
        console.log('动画结束');
    },
    onStart: () => {
        console.log('动画开始');
    }
})
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, repeat: -1, })

window.addEventListener('dblclick', () => {
    if (gposition.isActive()) {
        // 暂停
        gposition.pause()
    } else {
        // 继续
        gposition.resume()
    }
})



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
