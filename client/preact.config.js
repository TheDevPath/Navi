module.exports = function(config, env, helpers) {
	if (!env.production) {
		config.devServer.proxy = [
			{
				path: '/api/**',
				target: 'http://localhost:8081'
			}
		];
	}
};
