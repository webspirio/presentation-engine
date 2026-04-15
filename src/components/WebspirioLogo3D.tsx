import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { SVGLoader } from 'three-stdlib'

const FILL_PATH_DS: string[] = [
  'M163.822 117.235C164.603 116.471 165.322 115.546 165.981 114.459C163.857 114.602 161.741 114.788 159.633 115.016L153.82 115.643C141.639 116.843 129.46 118.071 117.283 119.327C113.015 119.765 108.835 120.471 104.744 121.444C103.98 121.672 103.235 121.874 102.508 122.051C101.649 122.262 100.909 122.481 100.287 122.707C93.805 125.061 87.8451 128.088 82.4073 131.786C77.5565 135.086 72.9894 139.185 68.7061 144.082C67.3876 145.588 66.0918 147.274 64.8187 149.139C62.0027 153.256 59.9657 156.7 58.7077 159.472C56.4528 164.441 54.9088 168.663 54.0759 172.138C53.0056 176.603 52.3421 180.096 52.0853 182.617C51.8026 185.389 51.658 187.837 51.6516 189.959C51.6106 200.201 51.617 214.881 51.671 234.001C51.6818 237.75 51.6947 241.496 51.7098 245.236C53.3239 242.034 69.7149 215.862 72.3927 212.031C74.3909 209.17 76.7613 206.312 79.5039 203.457L79.1997 202.252C79.1759 202.15 79.1986 202.061 79.2676 201.983C82.1829 198.735 84.768 195.785 87.0229 193.13C88.3629 191.552 89.8011 189.984 91.3375 188.424C92.3992 187.344 94.0122 185.716 96.1765 183.541C103.112 176.564 109.112 170.707 114.176 165.97C115.911 164.347 117.444 162.865 118.776 161.523C122.72 157.546 126.727 153.53 130.797 149.475C132.696 147.58 134.219 146.085 135.367 144.99C139.435 141.106 143.004 137.648 146.074 134.616C147.703 133.011 149.923 131.027 151.645 129.302C155.682 125.26 159.741 121.237 163.822 117.235Z',
  'M166.906 40.6875C166.155 41.4091 165.403 42.1075 164.65 42.7826C163.668 43.6646 162.914 44.3566 162.387 44.8588C155.355 51.5724 149.192 57.4232 143.899 62.4109C142.237 63.9744 140.689 65.446 139.254 66.8259C112.998 92.075 97.2194 107.356 91.9197 112.669C88.2427 116.359 84.3975 120.177 80.3839 124.122C77.5291 126.926 74.8425 129.721 71.8356 132.753C70.871 133.725 69.8536 134.637 68.7833 135.487C68.697 135.555 68.6862 135.633 68.751 135.721C68.874 135.886 69.0358 136.001 69.2365 136.066C67.6181 137.467 66.0806 138.943 64.6241 140.494C59.1086 146.368 54.5739 152.824 51.02 159.863C49.8741 162.131 48.5147 165.18 46.9416 169.009C45.7246 171.98 44.3047 175.972 42.6821 180.985C41.2255 185.491 38.703 193.519 35.1145 205.066C33.5738 210.018 32.4474 213.763 31.7353 216.301C31.7029 216.415 31.6792 216.414 31.6641 216.298C31.5821 215.623 31.5497 214.94 31.567 214.25C31.6663 209.931 31.7127 205.501 31.7062 200.958C31.6803 182.676 31.7137 168.343 31.8065 157.961C31.8238 155.804 31.8313 153.695 31.8292 151.634C31.8033 136.27 31.7903 128.568 31.7903 128.528C31.8011 127.633 31.8313 125.861 31.881 123.211C31.9155 121.392 32.0137 119.619 32.1755 117.891C33.5975 102.556 38.6199 88.7339 47.2427 76.4248C53.8435 67 62.2979 59.6027 72.6059 54.233C76.8267 52.0345 81.2449 50.3086 85.8605 49.0553C89.6453 48.0278 93.0871 47.3073 96.1858 46.8937C96.7468 46.8199 98.4353 46.6237 101.251 46.3051C103.202 46.0857 104.889 45.919 106.314 45.805C110.036 45.5054 114.622 45.0877 120.073 44.5518C121.825 44.3788 128.901 43.808 141.3 42.8396C149.81 42.175 158.346 41.4576 166.906 40.6875Z',
  'M197.831 106.084C197.761 106.734 197.743 107.179 197.775 107.42C198.393 111.806 198.56 116.21 198.277 120.633C197.859 127.146 196.743 133.446 194.93 139.533C192.988 146.053 190.036 152.214 186.075 158.016C184.978 159.624 183.495 161.465 181.624 163.542C175.131 170.749 167.163 175.361 157.721 177.378C156.191 177.705 154.055 178.003 151.315 178.271C139.473 179.431 132.187 180.147 129.457 180.42C127.578 180.607 126.09 180.793 124.994 180.977C124.005 181.141 123.017 181.296 122.029 181.442C120.736 181.632 119.747 181.796 119.061 181.936C103.561 185.041 90.3742 192.218 79.5009 203.466L79.1966 202.26C79.1729 202.159 79.1955 202.069 79.2646 201.991C82.1798 198.744 84.7649 195.793 87.0199 193.139C88.3599 191.561 89.7981 189.992 91.3345 188.433C92.3961 187.353 94.0091 185.725 96.1734 183.55C103.109 176.572 109.109 170.715 114.173 165.979C115.908 164.356 117.441 162.874 118.773 161.532C122.717 157.555 126.724 153.539 130.794 149.483C132.693 147.589 134.216 146.094 135.364 144.999C139.432 141.115 143.001 137.656 146.071 134.624C147.699 133.02 149.92 131.036 151.642 129.311C155.679 125.268 159.738 121.246 163.819 117.243C164.6 116.479 165.319 115.554 165.977 114.468C168.813 114.164 171.653 113.859 174.497 113.553C176.016 113.391 177.439 113.194 178.766 112.964C180.582 112.651 182.644 112.322 184.417 111.838C187.434 111.017 190.355 109.907 193.179 108.508C194.133 108.036 195.578 107.269 197.513 106.207C197.617 106.15 197.723 106.109 197.831 106.084Z',
  'M197.842 106.084C197.734 106.109 197.629 106.15 197.525 106.207C195.589 107.269 194.145 108.036 193.191 108.508C190.366 109.907 187.446 111.017 184.429 111.838C182.655 112.322 180.594 112.651 178.778 112.964C177.451 113.194 176.028 113.391 174.508 113.553C171.664 113.859 168.825 114.164 165.989 114.468C163.866 114.612 161.75 114.797 159.642 115.025C155.786 115.44 153.848 115.649 153.829 115.651C141.648 116.852 129.469 118.08 117.292 119.335C113.024 119.774 108.844 120.48 104.753 121.452C103.555 121.149 102.325 121.147 101.063 121.447C98.6244 122.023 96.2011 122.653 93.793 123.339C87.313 125.179 81.381 127.805 75.9972 131.216C74.0336 132.461 71.7808 134.083 69.2389 136.081C69.0382 136.015 68.8763 135.9 68.7533 135.736C68.6886 135.647 68.6994 135.569 68.7857 135.502C69.856 134.651 70.8734 133.74 71.838 132.767C74.8449 129.735 77.5315 126.941 80.3863 124.137C84.3999 120.191 88.2451 116.373 91.9221 112.683C97.2218 107.37 113 92.0895 139.257 66.8404C140.692 65.4605 142.24 63.9889 143.902 62.4255C149.195 57.4377 155.358 51.587 162.39 44.8733C162.916 44.3711 163.671 43.6791 164.653 42.7971C165.406 42.122 166.158 41.4236 166.909 40.702C167.452 40.6282 168.03 40.5586 168.64 40.4931C171.238 40.2083 174.235 39.8771 177.632 39.4994C181.635 39.0521 186.508 37.9349 192.252 36.1478C197.701 34.4515 203.004 31.831 208.161 28.2864C213.735 24.4548 218.403 19.8468 222.167 14.4624C222.984 13.2914 223.648 12.1109 224.157 10.9209C224.259 10.6846 224.358 10.6857 224.455 10.9241C224.464 10.9473 224.465 11.0264 224.458 11.1614C224.406 12.44 224.378 13.3779 224.374 13.975C224.234 30.5904 224.123 40.7442 224.041 44.4365C223.894 50.9455 223.523 56.4566 222.927 60.9696C222.273 65.9216 221.173 70.769 219.626 75.5121C218.178 79.9492 216.54 83.786 214.712 87.0226C213.439 89.278 211.838 91.6844 209.909 94.2416C208.726 95.8113 207.329 97.4159 205.717 99.0553C203.298 101.518 200.755 103.766 198.088 105.8C197.987 105.876 197.905 105.97 197.842 106.084Z',
]

const SKETCH_PATH_DS: string[] = [
  'M197.842 106.084C197.734 106.109 197.629 106.15 197.525 106.207C195.589 107.269 194.145 108.036 193.191 108.508C190.366 109.907 187.446 111.017 184.429 111.838C182.655 112.322 180.594 112.651 178.778 112.964C177.451 113.194 176.028 113.391 174.508 113.553C171.664 113.859 168.825 114.164 165.989 114.468',
  'M165.986 114.438C163.863 114.581 161.747 114.767 159.639 114.995C155.783 115.41 153.845 115.619 153.826 115.621C141.645 116.822 129.466 118.05 117.289 119.305C113.021 119.744 108.841 120.45 104.75 121.422',
  'M69.2351 136.066C69.0345 136.001 68.8726 135.886 68.7496 135.721C68.6849 135.633 68.6957 135.555 68.782 135.487C69.8523 134.637 70.8697 133.725 71.8343 132.753C74.8412 129.721 77.5277 126.926 80.3826 124.122C84.3961 120.177 88.2414 116.359 91.9184 112.669C97.218 107.356 112.996 92.075 139.253 66.8259C140.688 65.446 142.236 63.9744 143.898 62.4109C149.191 57.4232 155.354 51.5724 162.386 44.8588C162.912 44.3566 163.667 43.6646 164.648 42.7826C165.402 42.1075 166.154 41.4091 166.905 40.6875',
  'M79.5106 203.436L79.2064 202.23C79.1826 202.129 79.2053 202.039 79.2743 201.961C82.1896 198.714 84.7747 195.763 87.0296 193.109C88.3697 191.531 89.8079 189.962 91.3442 188.403C92.4059 187.323 94.0189 185.695 96.1832 183.52C103.119 176.542 109.118 170.685 114.183 165.948C115.918 164.326 117.451 162.844 118.782 161.502C122.727 157.525 126.734 153.508 130.804 149.453C132.703 147.559 134.226 146.064 135.374 144.969C139.441 141.084 143.011 137.626 146.081 134.594C147.709 132.99 149.93 131.005 151.652 129.281C155.689 125.238 159.748 121.216 163.828 117.213C164.609 116.449 165.329 115.524 165.987 114.438',
]

type LayerConfig = {
  color: string
  metalness: number
  roughness: number
  zOffset: number
  clearcoat?: number
  clearcoatRoughness?: number
}

const LAYER_CONFIGS: LayerConfig[] = [
  { color: '#007595', metalness: 0.35, roughness: 0.42, zOffset: 0 },
  { color: '#00a5c7', metalness: 0.4, roughness: 0.35, zOffset: 0.08 },
  { color: '#00b8db', metalness: 0.4, roughness: 0.32, zOffset: 0.16 },
  {
    color: '#8df5ff',
    metalness: 0.25,
    roughness: 0.25,
    zOffset: 0.24,
    clearcoat: 0.4,
    clearcoatRoughness: 0.18,
  },
]

const LAYER_ENTRANCE = [1.1, 1.28, 1.46, 1.64]
const SKETCH_ENTRANCE = [0.3, 0.42, 0.54, 0.66]
const SKETCH_DRAW_DURATION = 0.9
const MESH_MATERIALIZE_DURATION = 0.8
const SKETCH_FADE_START = 2.3
const SKETCH_FADE_DURATION = 0.8

const SKETCH_BASE_OPACITY = { core: 1, glow: 0.8, halo: 0.45 }

function parseFirstPath(d: string): THREE.ShapePath | null {
  const loader = new SVGLoader()
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="${d}"/></svg>`
  const result = loader.parse(wrapped)
  return result.paths[0] ?? null
}

function buildExtrudeGeometry(d: string): THREE.ExtrudeGeometry {
  const path = parseFirstPath(d)
  const shapes = path ? SVGLoader.createShapes(path) : []
  const geom = new THREE.ExtrudeGeometry(shapes, {
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.6,
    bevelSegments: 8,
    curveSegments: 72,
  })
  geom.scale(1, -1, 1)
  geom.translate(-128, 128, 0)
  geom.computeVertexNormals()
  return geom
}

function buildLineGeometry(d: string, samplesPerSub = 240): THREE.BufferGeometry {
  const path = parseFirstPath(d)
  const positions: number[] = []
  if (path) {
    for (const sub of path.subPaths) {
      const pts = sub.getSpacedPoints(samplesPerSub)
      for (const p of pts) {
        positions.push(p.x, -p.y + 256, 0)
      }
    }
  }
  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.translate(-128, -128, 0)
  return geom
}

function buildEnvMap(): THREE.DataTexture {
  const data = new Uint8Array([
    5, 51, 69, 255,
    5, 51, 69, 255,
    0, 211, 242, 255,
    0, 211, 242, 255,
  ])
  const tex = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

interface LogoSceneProps {
  isActive: boolean
  reducedMotion: boolean
}

function LogoScene({ isActive, reducedMotion }: LogoSceneProps) {
  const envMap = useMemo(() => buildEnvMap(), [])

  const extrudeGeoms = useMemo(
    () => FILL_PATH_DS.map((d) => buildExtrudeGeometry(d)),
    [],
  )
  const lineGeoms = useMemo(
    () => SKETCH_PATH_DS.map((d) => buildLineGeometry(d)),
    [],
  )

  const meshRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null])
  const groupRef = useRef<THREE.Group>(null)
  const elapsedRef = useRef(0)

  const lineObjects = useMemo(() => {
    return lineGeoms.map((geom) => {
      const coreMat = new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
      })
      const glowMat = new THREE.LineBasicMaterial({
        color: '#53eafd',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      })
      const haloMat = new THREE.LineBasicMaterial({
        color: '#00d3f2',
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      })
      const core = new THREE.Line(geom, coreMat)
      const glow = new THREE.Line(geom.clone(), glowMat)
      const halo = new THREE.Line(geom.clone(), haloMat)
      core.renderOrder = 20
      glow.renderOrder = 19
      halo.renderOrder = 18
      return { core, glow, halo, coreMat, glowMat, haloMat }
    })
  }, [lineGeoms])

  const lineVertexCounts = useMemo(
    () => lineGeoms.map((g) => g.attributes.position.count),
    [lineGeoms],
  )

  useFrame((_, dt) => {
    if (reducedMotion) {
      meshRefs.current.forEach((m) => {
        if (!m) return
        m.scale.setScalar(1)
        const mat = m.material as THREE.MeshPhysicalMaterial
        mat.opacity = 1
        if (mat.transparent) {
          mat.transparent = false
          mat.needsUpdate = true
        }
      })
      lineObjects.forEach((pair) => {
        pair.coreMat.opacity = 0
        pair.glowMat.opacity = 0
        pair.haloMat.opacity = 0
      })
      if (groupRef.current) {
        groupRef.current.rotation.set(0.16, 0, 0)
      }
      return
    }

    if (!isActive) {
      elapsedRef.current = 0
      meshRefs.current.forEach((m) => {
        if (!m) return
        m.scale.setScalar(0.96)
        const mat = m.material as THREE.MeshPhysicalMaterial
        if (!mat.transparent) {
          mat.transparent = true
          mat.needsUpdate = true
        }
        mat.opacity = 0
      })
      lineObjects.forEach((pair) => {
        pair.core.geometry.setDrawRange(0, 0)
        pair.glow.geometry.setDrawRange(0, 0)
        pair.halo.geometry.setDrawRange(0, 0)
        pair.coreMat.opacity = SKETCH_BASE_OPACITY.core
        pair.glowMat.opacity = SKETCH_BASE_OPACITY.glow
        pair.haloMat.opacity = SKETCH_BASE_OPACITY.halo
      })
      return
    }

    elapsedRef.current += dt
    const t = elapsedRef.current

    const fadeT = Math.max(0, (t - SKETCH_FADE_START) / SKETCH_FADE_DURATION)
    const fadeProgress = Math.min(1, fadeT)
    const fadeEased = 1 - Math.pow(1 - fadeProgress, 3)
    const sketchAlpha = 1 - fadeEased

    for (let i = 0; i < 4; i++) {
      const pair = lineObjects[i]
      const localT = Math.max(0, (t - SKETCH_ENTRANCE[i]) / SKETCH_DRAW_DURATION)
      const progress = Math.min(1, localT)
      const eased = 1 - Math.pow(1 - progress, 3)
      const count = Math.floor(eased * lineVertexCounts[i])
      pair.core.geometry.setDrawRange(0, count)
      pair.glow.geometry.setDrawRange(0, count)
      pair.halo.geometry.setDrawRange(0, count)
      /* eslint-disable react-hooks/immutability -- imperative three.js material opacity update */
      pair.coreMat.opacity = SKETCH_BASE_OPACITY.core * sketchAlpha
      pair.glowMat.opacity = SKETCH_BASE_OPACITY.glow * sketchAlpha
      pair.haloMat.opacity = SKETCH_BASE_OPACITY.halo * sketchAlpha
      /* eslint-enable react-hooks/immutability */
    }

    for (let i = 0; i < 4; i++) {
      const mesh = meshRefs.current[i]
      if (!mesh) continue
      const localT = Math.max(0, (t - LAYER_ENTRANCE[i]) / MESH_MATERIALIZE_DURATION)
      const progress = Math.min(1, localT)
      const eased = 1 - Math.pow(1 - progress, 3)
      const mat = mesh.material as THREE.MeshPhysicalMaterial
      mat.opacity = eased
      mesh.scale.setScalar(0.96 + eased * 0.04)
      if (eased >= 1 && mat.transparent) {
        mat.transparent = false
        mat.needsUpdate = true
      }
    }

    if (groupRef.current) {
      const idleT = Math.max(0, t - 2.3)
      const wobble = Math.sin((idleT / 9) * Math.PI * 2) * 0.18
      const pitch = Math.sin((idleT / 11) * Math.PI * 2) * 0.06
      groupRef.current.rotation.y = wobble
      groupRef.current.rotation.x = 0.16 + pitch
    }
  })

  return (
    <>
      <ambientLight intensity={0.22} color="#8df5ff" />
      <directionalLight position={[-4, 6, 8]} intensity={1.4} color="#aef2ff" />
      <directionalLight position={[6, -3, 4]} intensity={0.5} color="#0591b0" />
      <pointLight
        position={[0, 0, -80]}
        intensity={220}
        color="#53eafd"
        distance={320}
        decay={1.8}
      />

      <group ref={groupRef} scale={0.5} rotation={[0.16, 0, 0]}>
        {extrudeGeoms.map((geom, i) => {
          const cfg = LAYER_CONFIGS[i]
          return (
            <mesh
              key={`fill-${i}`}
              ref={(m) => {
                meshRefs.current[i] = m
              }}
              geometry={geom}
              position={[0, 0, cfg.zOffset]}
              scale={0.96}
              renderOrder={i}
            >
              <meshPhysicalMaterial
                color={cfg.color}
                metalness={cfg.metalness}
                roughness={cfg.roughness}
                clearcoat={cfg.clearcoat ?? 0}
                clearcoatRoughness={cfg.clearcoatRoughness ?? 0}
                envMap={envMap}
                envMapIntensity={0.8}
                transparent
                depthWrite
                opacity={0}
              />
            </mesh>
          )
        })}

        {lineObjects.map((pair, i) => (
          <group key={`edges-${i}`} position={[0, 0, 32]}>
            <primitive object={pair.halo} />
            <primitive object={pair.glow} />
            <primitive object={pair.core} />
          </group>
        ))}
      </group>
    </>
  )
}

interface WebspirioLogo3DProps {
  isActive: boolean
  className?: string
}

export function WebspirioLogo({ isActive, className }: WebspirioLogo3DProps) {
  const reduce = useReducedMotion() ?? false

  return (
    <div className={className} aria-label="Webspirio" role="img">
      <Canvas
        camera={{ position: [0, 0, 260], fov: 28 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <LogoScene isActive={isActive} reducedMotion={reduce} />
      </Canvas>
    </div>
  )
}

export default WebspirioLogo
