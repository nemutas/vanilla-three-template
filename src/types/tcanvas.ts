export type Assets = {
	[key in string]: { data?: THREE.Texture | THREE.Group; encoding?: boolean; flipY?: boolean; path: string }
}
