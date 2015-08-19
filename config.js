module.exports = {

	port: 8888,

	healtUrl: '/healt/',

	deploysBaseUrl: '/deploy/',

	deploys: [
		{
			url: 'frontend',
			dir: '/root/icloth-dev-server/dev/icloth-frontend-react',
			branch: 'master',
			afterDeploy: {
				script: '/root/deploy_scripts/frontend.sh'
			}
		}
	]

}