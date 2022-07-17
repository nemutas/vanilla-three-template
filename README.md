# About
This is a [Three.js](https://threejs.org/) development environment template using [Vite](https://ja.vitejs.dev/).<br>
keywords：Vite / TypeScript / Three.js / GLSL

https://nemutas.github.io/vanilla-three-template/

# How to use
1. clone this repositry.
```
gh repo clone nemutas/vanilla-three-template
```

2. install package using npm.
```
npm i
```

3. replacing text in files.

`package.json`
```.json
"name": "<your project name>",
"homepage": "https://<your github account>.github.io/<your repositry name>/",
```
`vite.config.ts`
```.ts
base: mode === 'development' ? '/' : '/<your repositry name>/',
```

# Install
```
npm create vite@latest <project name> -- --template vanilla-ts
```
```
npm i three lil-gui ress gsap
```
```
npm i -D @types/three vite-plugin-glsl sass gh-pages
```
