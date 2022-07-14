import * as THREE from 'three';
import { Assets } from '../../types/tcanvas';
import { getExtension, publicPath } from '../utils';
import planeFrag from './shader/planeFrag.glsl';
import planeVert from './shader/planeVert.glsl';
import { TCanvasBase } from './TCanvasBase';

export class TCanvas extends TCanvasBase {
	private assets: Assets = {
		background: { encoding: true, path: publicPath('/assets/background.jpg') }
	}

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.loadAssets().then(() => {
			this.setScene()
			this.setModel()
			this.setResizeCallback()
			this.animate(this.update)
		})
	}

	private loadAssets = async () => {
		const textureLoader = new THREE.TextureLoader()

		await Promise.all(
			Object.values(this.assets).map(async v => {
				const extension = getExtension(v.path)

				if (['jpg', 'png'].includes(extension)) {
					const texture = await textureLoader.loadAsync(v.path)
					v.encoding && (texture.encoding = THREE.sRGBEncoding)
					v.flipY !== undefined && (texture.flipY = v.flipY)
					v.data = texture
				}
			})
		)
	}

	private setScene = () => {
		this.camera.position.z = 2
		this.setOrbitControlsDamping()
		const background = this.assets.background.data as THREE.Texture
		this.scene.background = this.coveredBackgroundTexture(background)
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
