module.exports = function(config, env, helpers) {
	if (!env.production) {
		config.devServer.proxy = [
			{
				path: '/**',
				target: 'http://localhost:8081'
			}
		];
	}
};

const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'app/css/**.css',
      'app/**.html',
      'app/images/**.*',
      'app/js/**.js'
    ],
    stripPrefix: 'app/',
    runtimeCaching: [{
      urlPattern: /this\\.is\\.a\\.regex/,
      handler: 'networkFirst'
    }]
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}