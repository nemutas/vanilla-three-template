import * as THREE from 'three';
import { Assets } from '../../types/tcanvas';
import { publicPath } from '../utils';
import planeFrag from './shader/planeFrag.glsl';
import planeVert from './shader/planeVert.glsl';
import { TCanvasBase } from './TCanvasBase';

export class TCanvas extends TCanvasBase {
	private assets: Assets = {
		background: { encoding: true, path: publicPath('/assets/background.jpg') }
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
		const geometry = new THREE.PlaneGeometry()
		const material = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: planeVert,
			fragmentShader: planeFrag,
			side: THREE.DoubleSide
		})
		const mesh = new THREE.Mesh(geometry, material)
		this.scene.add(mesh)
	}

	private update = () => {}
}
