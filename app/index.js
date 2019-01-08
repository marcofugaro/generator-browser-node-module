'use strict'
const Generator = require('yeoman-generator')
const _ = require('lodash')
const superb = require('superb')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const isScoped = require('is-scoped')

const slugifyPackageName = name => isScoped(name) ? name : _.kebabCase(name)
const getRepoName = name => isScoped(name) ? name.split('/')[1] : name

module.exports = class extends Generator {
	init() {
		return this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: _.kebabCase(this.appname),
			filter: prompt => slugifyPackageName(prompt),
		}, {
			name: 'moduleDescription',
			message: 'What is your module description?',
			default: `My ${superb.random()} module`,
		}, {
      name: 'keywords',
      message: 'What are the package keywords? (comma to split)',
      default: '',
      filter: prompt => prompt.split(/\s*,\s*/g),
    }, {
			name: 'moduleField',
      type: 'confirm',
			message: 'Will you lib have multiple exports? (Do you wish to support pkg.module?)',
      default: false,
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username (or organization)?',
			store: true,
			validate: prompt => prompt.length > 0 ? true : 'You have to provide a username',
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			filter: prompt => prompt ? humanizeUrl(normalizeUrl(prompt)) : null,
		}, {
			name: 'yarn',
      type: 'confirm',
			message: 'Would you like to use Yarn in place of npm?',
      default: true,
      store: true,
		}]).then((props) => {
      let moduleName = props.moduleName
      const moduleDescription = props.moduleDescription
      let keywords = props.keywords
      const moduleField = props.moduleField
      const githubUsername = props.githubUsername
      let website = props.website
      const yarn = props.yarn

      // these are the filters, workaround for issue https://github.com/yeoman/yeoman-test/issues/29
      if (process.env.NODE_ENV === 'test') {
        moduleName = slugifyPackageName(moduleName)
        keywords = keywords.split(/\s*,\s*/g)
        website = website ? humanizeUrl(normalizeUrl(website)) : null
      }

      const repoName = getRepoName(moduleName)
      const camelModuleName =  _.camelCase(repoName)

			this.templateVariables = {
				moduleName,
				moduleDescription,
				camelModuleName,
        keywords,
        moduleField,
				githubUsername,
				repoName,
				name: this.user.git.name(),
				email: this.user.git.email(),
				website,
        yarn,
			}

			this.fs.copyTpl(
        `${this.templatePath()}/**`,
        this.destinationPath(),
        this.templateVariables
      )

      const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to))
      const rm = (file) => this.fs.delete(this.destinationPath(file))

      mv('babelrc', '.babelrc')
      mv('editorconfig', '.editorconfig')
			mv('gitattributes', '.gitattributes')
			mv('gitignore', '.gitignore')
			mv('travis.yml', '.travis.yml')
			mv('_package.json', 'package.json')

      rm('.yo-rc.json')
		})
	}

  git() {
		this.spawnCommandSync('git', ['init'])
	}

	install() {
    if (this.templateVariables.yarn) {
      this.yarnInstall()
    } else {
      this.npmInstall()
    }
	}
}
