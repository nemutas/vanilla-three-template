import * as THREE from 'three';
import { publicPath } from '../utils';
import planeFrag from './shader/planeFrag.glsl';
import planeVert from './shader/planeVert.glsl';
import { Assets, TCanvasBase } from './TCanvasBase';

export class TCanvas extends TCanvasBase {
	private assets: Assets = {
		background: { encoding: true, path: publicPath('/assets/wlop1.jpg') },
		texture: { path: publicPath('/assets/wlop2.jpg') }
	}

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.loadAssets(this.assets).then(() => {
			this.setScene()
			this.setModel()
			this.setResizeCallback()
			this.animate(this.update)
		})
	}

	private setScene = () => {
		this.camera.position.z = 2
		this.setOrbitControls()
		this.scene.background = this.coveredBackgroundTexture(this.assets.background.data as THREE.Texture)
	}

	private setResizeCallback = () => {
		this.resizeCallback = () => {
			this.coveredBackgroundTexture(this.assets.background.data as THREE.Texture)
		}
	}

	private setModel = () => {
		const texture = this.assets.texture.data as THREE.Texture

		const geometry = new THREE.PlaneGeometry()
		const aspect = geometry.parameters.width / geometry.parameters.height
		const material = new THREE.ShaderMaterial({
			uniforms: {
				u_texture: { value: texture },
				u_uvScale: { value: this.calcCoveredTextureScale(texture, aspect) }
			},
			vertexShader: planeVert,
			fragmentShader: planeFrag,
			side: THREE.DoubleSide
		})
		const mesh = new THREE.Mesh(geometry, material)
		this.scene.add(mesh)
	}

	private update = () => {}
}
