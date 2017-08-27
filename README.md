# generator-browser-node-module [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/marcofugaro/generator-browser-node-module.svg)](https://greenkeeper.io/)

> Scaffold out a library for both the browser and node

The boilerplate repo is [here](https://github.com/marcofugaro/browser-node-module-boilerplate).

This generator is inspired from [sindresorhus/generator-nm](https://github.com/sindresorhus/generator-nm).

The scaffolding is similar, it adds support for shipping your code to the browser using Rollup as a bundler.

[Here is a great read about the choice of using rollup for libraries.](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)

## Install

```bash
npm install -g yo
npm install -g generator-browser-node-module
```

## Usage

```bash
yo browser-node-module
```
or just
```bash
yo
```
and select `browser-node-module`.

## License

MIT © [Marco Fugaro](marcofugaro.it)


[travis-image]: https://travis-ci.org/marcofugaro/generator-browser-node-module.svg?branch=master
[travis-url]: https://travis-ci.org/marcofugaro/generator-browser-node-module
[daviddm-image]: https://david-dm.org/marcofugaro/generator-browser-node-module.svg
[daviddm-url]: https://david-dm.org/marcofugaro/generator-browser-node-module
[daviddm-dev-image]: https://david-dm.org/marcofugaro/generator-browser-node-module/dev-status.svg
[daviddm-dev-url]: https://david-dm.org/marcofugaro/generator-browser-node-module/?type=dev
