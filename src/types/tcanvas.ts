import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export type Assets = {
	[key in string]: { data?: THREE.Texture | GLTF; encoding?: boolean; flipY?: boolean; path: string }
}
