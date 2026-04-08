// Make API easier to maintain, by using a lib.
const DEBUG = false;
const BASE_URL = 'https://api.softboy.site';

// Log things pretty
const log = (method, message, type = 'info', data = null) => {
  if (!DEBUG) return;
  const colors = { info: '#6366f1', success: '#22c55e', error: '#ef4444' };

  console.groupCollapsed(
    `%c[API] ${method} - ${type.toUpperCase()}`,
    `color: white; background: ${colors[type]}; padding: 2px 6px; border-radius: 4px; font-weight: bold;`
  );
  console.log(`Message: ${message}`);
  if (data) console.log('Data:', data);
  console.groupEnd();
};

// Fetch wrapper to handle basics
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    if (!response.ok) {
      log(endpoint, `Request failed with status ${response.status}`, 'error');
      return null;
    }

    const data = await response.json();
    log(endpoint, 'Request successful', 'success', data);
    return data;
  } catch (err) {
    log(endpoint, 'Network or Parsing Error', 'error', err);
    return null;
  }
}

export const api = {
  // Fetch current user profile
  async getMe() {
    return await request('/auth/me');
  },

  // Handle the Discord OAuth logic
  loginWithDiscord() {
    const config = { width: 500, height: 750 };
    const left = window.screenX + (window.outerWidth - config.width) / 2;
    const top = window.screenY + (window.outerHeight - config.height) / 2;

    log('Auth', 'Opening Discord OAuth Popup', 'info', {
      url: `${BASE_URL}/auth/discord`,
    });

    const popup = window.open(
      `${BASE_URL}/auth/discord`,
      'discord-auth',
      `width=${config.width},height=${config.height},left=${left},top=${top},scrollbars=yes,status=no`
    );

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      log('Auth', 'Popup was blocked or failed to open', 'error');
    }

    return popup;
  },

  // fetch stats
  async getStats() {
    return await request('/api/stats');
  },
};
