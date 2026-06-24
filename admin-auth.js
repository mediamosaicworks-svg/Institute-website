const ADMIN_SESSION_KEY = 'mosaicWorksAdminSession';
const ADMIN_HASH = 'a22e6f5ff385c7c0abd3cd17b432a516464d549be87bce58f6f92796d239d9c8';

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function unlockAdmin() {
  document.body.classList.remove('admin-locked');
  document.body.classList.add('admin-unlocked');
}

if (sessionStorage.getItem(ADMIN_SESSION_KEY) === 'ok') {
  unlockAdmin();
}

window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');
  const logout = document.getElementById('adminLogout');
  const error = document.getElementById('adminLoginError');

  loginForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const user = document.getElementById('adminUser')?.value.trim() || '';
    const pass = document.getElementById('adminPass')?.value || '';
    const enteredHash = await sha256(`${user}:${pass}`);

    if (enteredHash === ADMIN_HASH) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'ok');
      unlockAdmin();
      loginForm.reset();
      if (error) error.textContent = '';
      return;
    }

    if (error) error.textContent = 'Wrong admin ID or password.';
  });

  logout?.addEventListener('click', event => {
    event.preventDefault();
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    location.reload();
  });
});
