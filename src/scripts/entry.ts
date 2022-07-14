import { TCanvas } from './three/TCanvas';

class App {
	private canvas: TCanvas

	constructor() {
		const parentNode = document.querySelector('body')!
		this.canvas = new TCanvas(parentNode)
		this.addEvents()
	}

	private addEvents = () => {
		window.addEventListener('beforeunload', () => {
			this.dispose()
		})
	}

	private dispose = () => {
		this.canvas.dispose()
	}
}

new App()
