import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import App from './App';
import Leaderboard from './pages/Leaderboard';
import { MetaProvider } from '@solidjs/meta';
import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !root) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? <div id="root"></div>'
  );
}

render(
  () => (
    <MetaProvider>
    <Router>
      <Route path="/" component={App} />
      <Route path="/leaderboard" component={Leaderboard} />
    </Router>
    </MetaProvider>
  ),
  root
);
