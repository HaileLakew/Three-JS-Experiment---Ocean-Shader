import { useFrame } from '@react-three/fiber'
import {useEffect, useRef, useState } from 'react'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import * as THREE from 'three'

import {GUI} from 'lil-gui'

export default function Oceans() {
    let mesh = useRef();


        let [uniforms, setUniforms] = useState({
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uTime: { value: 0 },
        uBigWavesSpeed: { value: 0.75 },
        uDepthColor: { value: new THREE.Color('#186691') },
        uSurfaceColor: { value: new THREE.Color('#9bd8ff') },
        uColorOffset: { value: 0.2 },
        uColorMultiplier: { value: 5 },
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },
        ebbAndFlow: 0.15
    })
      
    useEffect(() => {
        const gui = new GUI()
        gui.add(uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation').onChange((value) => {setUniforms({...uniforms, uBigWavesElevation: { value: value}});})
        gui.add(uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX').onChange((value) => {setUniforms({...uniforms, uBigWavesFrequency: { value: {x: value, y: uniforms.uBigWavesFrequency.value.y}}});})
        gui.add(uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY').onChange((value) => {setUniforms({...uniforms, uBigWavesFrequency: { value: {y: value, x: uniforms.uBigWavesFrequency.value.x}}});})
        gui.add(uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed').onChange((value) => {setUniforms({...uniforms, uBigWavesSpeed: { value: value}});})
        gui.add(uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset').onChange((value) => {setUniforms({...uniforms, uColorOffset: { value: value}});})
        gui.add(uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier').onChange((value) => {setUniforms({...uniforms, uColorMultiplier: { value: value}});})
        gui.add(uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation').onChange((value) => {setUniforms({...uniforms, uSmallWavesElevation: { value: value}});})
        gui.add(uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency').onChange((value) => {setUniforms({...uniforms, uSmallWavesFrequency: { value: value}});})
        gui.add(uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed').onChange((value) => {setUniforms({...uniforms, uSmallWavesSpeed: { value: value}});})
        gui.add(uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations').onChange((value) => {setUniforms({...uniforms, uSmallIterations: { value: value}});})
    })

    useFrame(({clock})=>{
        mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
    
        mesh.current.position.set(
            Math.sin(clock.elapsedTime) * mesh.current.material.uniforms.ebbAndFlow,
            Math.sin(clock.elapsedTime) * mesh.current.material.uniforms.ebbAndFlow,
            Math.sin(clock.elapsedTime) * mesh.current.material.uniforms.ebbAndFlow
        )

        mesh.current.rotation.z += clock.elapsedTime * .00002;
    })

    return(
        <mesh ref={mesh} rotation-x={- Math.PI * 0.5}>
            <planeGeometry args={[3, 3, 512, 512]}/>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}