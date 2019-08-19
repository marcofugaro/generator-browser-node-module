# generator-browser-node-module [![Build Status][travis-image]][travis-url]
> Scaffold out a library for both the browser and node

The boilerplate repo is [here](https://github.com/marcofugaro/browser-node-module-boilerplate).

This generator is inspired from [sindresorhus/generator-nm](https://github.com/sindresorhus/generator-nm).

The scaffolding is similar, it adds support for shipping your code to the browser using Rollup as a bundler.

[Here is a great read about the choice of using rollup for libraries.](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)

## Usage

First make sure you're in your project folder (`mkdir my-awesome-project && cd my-awesome-project/`), then run

```bash
npm init yo browser-node-module
```

This command will use `npx` to fetch the latest version of the generator and use it.

[travis-image]: https://travis-ci.org/marcofugaro/generator-browser-node-module.svg?branch=master
[travis-url]: https://travis-ci.org/marcofugaro/generator-browser-node-module
