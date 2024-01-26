# Instalation

If you encounter errors to run the app caused by sharp, delete the package-lock.json and run `npm install --cpu=wasm32 sharp`.

## Adicional

- Trying to import images can throw Content Security Policy errors ([See Here](https://stackoverflow.com/questions/70132291/electron-content-security-policy-error-when-connecting-to-my-api)).

- You'll probably need node.js polyfills to import node packages on preload.js files ([See Here](https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5)).

- How to load images for webpack bundler [See Here](https://www.debugandrelease.com/how-to-load-images-in-electron-applications/).
