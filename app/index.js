const Generator = require('yeoman-generator')
const _ = require('lodash')
const superb = require('superb')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const isScoped = require('is-scoped')

const slugifyPackageName = name => isScoped(name) ? name : _.kebabCase(name)
const getRepoName = name => isScoped(name) ? name.split('/')[1] : name

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)

		this.option('org', {
			type: 'string',
			desc: 'Publish to a GitHub organization account'
		})
	}

	init() {
		return this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: _.kebabCase(this.appname),
			filter: prompt => slugifyPackageName(prompt),
		}, {
			name: 'moduleDescription',
			message: 'What is your module description?',
			default: `My ${superb()} module`,
		}, {
      name: 'keywords',
      message: 'What are the package keywords? (comma to split)',
      filter: prompt => return prompt.split(/\s*,\s*/g),
    }, {
			name: 'moduleField',
      type: 'confirm',
			message: 'Do you wish to support pkg.module? (Will you lib have multiple exports?)',
      default: false,
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: prompt => prompt.length > 0 ? true : 'You have to provide a username',
			when: () => !this.options.org,
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: prompt => prompt.length > 0 ? true : 'You have to provide a website URL',
			filter: prompt => normalizeUrl(prompt),
		}, {
			name: 'useYarn',
      type: 'confirm',
			message: 'Would you like to use Yarn in place of npm?',
      default: true,
      store: true,
		}]).then((props) => {
			this.templateVariables = {
				moduleName: props.moduleName,
				moduleDescription: props.moduleDescription,
				camelModuleName: _.camelCase(repoName),
        keywords: _.uniq(props.keywords),
        moduleField: props.moduleField,
				githubUsername: this.options.org || props.githubUsername,
				repoName: getRepoName(props.moduleName),
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: props.website,
				humanizedWebsite: humanizeUrl(props.website),
        useYarn: props.useYarn,
			}

			this.fs.copyTpl(
        `${this.templatePath()}/**`,
        this.destinationPath(),
        this.templateVariables,
        null,
        { globOptions: { dot: true } }
      )
		})
	}

  git() {
		this.spawnCommandSync('git', ['init'])
	}

	install() {
    if (this.templateVariables.useYarn) {
      this.yarnInstall()
    } else {
      this.npmInstall()
    }
		// this.installDependencies({bower: false})
	}
}
