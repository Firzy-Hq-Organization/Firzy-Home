const routes = {
  '/': `
    <div class="card">
      <h2>Welcome to Firzy</h2>
      <p>This is Firzy — a youth-led creative tech project. Smart ideas, simple design, and bold moves.</p>
    </div>
  `,
  '/about': `
    <div class="card">
      <h2>About Firzy</h2>
      <p>Started by a 12-year-old with a passion for design and freedom. Firzy isn’t a company, it’s a creative rebellion.</p>
    </div>
  `,
  '/projects': `
    <div class="card">
      <h2>Projects</h2>
      <ul>
        <li>🛠️ Password Generator</li>
        <li>🎨 Color Picker</li>
        <li>📁 Firzy Tools (coming soon)</li>
      </ul>
    </div>
  `,
  '/contact': `
    <div class="card">
      <h2>Contact</h2>
      <p>Have questions? Email <a href="mailto:firzy.hq@gmail.com">firzy.hq@gmail.com</a></p>
    </div>
  `
};

function router(path = location.pathname) {
  document.getElementById('app').innerHTML = routes[path] || '<div class="card"><h2>404</h2><p>Page not found.</p></div>';
  document.querySelectorAll('nav a[data-link]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path);
  });
}

function navigate(e) {
  const link = e.target.closest('[data-link]');
  if (!link) return;
  e.preventDefault();
  const to = link.getAttribute('href');
  history.pushState({}, '', to);
  router(to);
}

window.addEventListener('popstate', () => router());

document.addEventListener('DOMContentLoaded', () => {
  router();
  document.body.addEventListener('click', navigate);

  // INTRO ANIMATION
  const greetings = [
    { t: 'Hello', f: 'Roboto' },
    { t: 'Hola', f: 'Amatic SC' },
    { t: 'Bonjour', f: 'Playfair Display' },
    { t: 'Hallo', f: 'Orbitron' },
    { t: 'Ciao', f: 'Pacifico' },
    { t: 'こんにちは', f: 'Indie Flower' },
    { t: '안녕하세요', f: 'Courier Prime' },
    { t: 'مرحبا', f: 'Quicksand' },
    { t: 'नमस्ते', f: 'Anton' },
    { t: 'Привет', f: 'Lobster' }
  ];

  const overlay = document.getElementById('intro-overlay');
  const hello = document.getElementById('hello-text');
  let i = 0;

  function cycleHello() {
    const { t, f } = greetings[i];
    hello.classList.remove('show');
    setTimeout(() => {
      hello.textContent = t;
      hello.style.fontFamily = `'${f}', sans-serif`;
      hello.classList.add('show');
      i = (i + 1) % greetings.length;
    }, 200);
  }

  cycleHello();
  const interval = setInterval(cycleHello, 1200); // faster speed

  // End after all greetings
  setTimeout(() => {
    clearInterval(interval);
    overlay.classList.add('hidden');
  }, greetings.length * 1200 + 500);
});
