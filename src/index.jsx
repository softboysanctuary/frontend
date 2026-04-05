import { render } from 'solid-js/web';
import './index.css';

import App from './App.jsx';

const root = document.getElementById('root');

if (import.meta.env.DEV && !root) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? <div id="root"></div>'
  );
}

render(() => <App />, root);
