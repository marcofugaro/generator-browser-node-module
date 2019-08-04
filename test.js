import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'

let generator

test.beforeEach(async () => {
	await pify(helpers.testDirectory)(path.join(__dirname, 'tmp'))
	generator = helpers.createGenerator('browser-node-module:app', ['../app'], null, { skipInstall: true })
  generator.run = pify(generator.run.bind(generator))
})

test.serial('generates expected files', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'testModule',
		githubUsername: 'test',
	})

	await generator.run()

	assert.file([
    '.git',
    'src/index.js',
    'test/index.js',
		'.babelrc',
		'.editorconfig',
		'.gitattributes',
		'.gitignore',
		'.travis.yml',
		'LICENSE',
		'package.json',
		'README.md',
		'rollup.config.js',
	])
})

test.serial('uses the prompted description', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'testModule',
		moduleDescription: 'foo',
		githubUsername: 'test',
	})

	await generator.run()

  assert.jsonFileContent('package.json', { description: 'foo' })
	assert.fileContent('README.md', /> foo/)
})

test.serial('defaults to superb description', async () => {
	helpers.mockPrompt(generator, {
		moduleName: '@testa/test',
		githubUsername: 'test',
	})

	await generator.run()

	assert.fileContent('package.json', /"description": "My .+ module",/)
	assert.fileContent('README.md', /> My .+ module/)
})

test.serial('keywords are separated correctly', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'testModule',
    githubUsername: 'test',
    keywords: 'some, random, keywords',
  })

  await generator.run()

  assert.jsonFileContent('package.json', { keywords: ['some', 'random', 'keywords'] })
})

test.serial('yarn option works', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'testModule',
    githubUsername: 'test',
    yarn: true,
  })

  await generator.run()

  assert.fileContent('.travis.yml', /yarn: true/)
  assert.fileContent('.travis.yml', /yarn build/)
  assert.fileContent('.travis.yml', /yarn test/)
})

test.serial('moduleField option works', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'testModule',
    githubUsername: 'test',
    website: 'test.com',
    moduleField: true,
  })

  await generator.run()

  assert.fileContent('package.json', /"module":/)
  assert.fileContent('rollup.config.js', /format: 'es'/)
})
