import './style';
import App from './components/app';

/**
 * Register service worker anytime the main app component runs
 */
if ('serviceWorker' in navigator) {
    // register only when window load event fires to minimize performance on mobile devices
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

export default App;
