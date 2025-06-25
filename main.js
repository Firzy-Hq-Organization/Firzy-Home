const routes = {
  '/': `
    <div class="card">
      <h2>Welcome to Firzy</h2>
      <p>Firzy is a young, honest tech vision. Real, raw, and ready to grow.</p>
    </div>
  `,
  '/about': `
    <div class="card">
      <h2>About Firzy</h2>
      <p>Created by Fariz — 12, fearless, and future-minded. This isn’t about startups. It’s about voice, design, and pushing boundaries.</p>
    </div>
  `,
  '/projects': `
    <div class="card">
      <h2>Projects</h2>
      <p>Still cooking. No public projects yet.</p>
    </div>
  `,
  '/contact': `
    <div class="card">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:firzy.hq@gmail.com">firzy.hq@gmail.com</a></p>
    </div>
  `
};

function router(path = location.pathname) {
  const app = document.getElementById('app');
  app.style.animation = 'none';
  void app.offsetWidth;
  app.style.animation = '';
  app.innerHTML = routes[path] || '<div class="card"><h2>404</h2><p>Page not found.</p></div>';

  document.querySelectorAll('nav a[data-link]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path);
  });
}

function navigate(e) {
  const link = e.target.closest('[data-link]');
  if (!link) return;
  e.preventDefault();
  history.pushState({}, '', link.getAttribute('href'));
  router(link.getAttribute('href'));
}

window.addEventListener('popstate', () => router());

document.addEventListener('DOMContentLoaded', () => {
  router();
  document.body.addEventListener('click', navigate);

  // Hello Intro
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

  const hello = document.getElementById('hello-text');
  const overlay = document.getElementById('intro-overlay');

  let i = 0;

  function type(text, font, done) {
    hello.style.fontFamily = `'${font}', sans-serif`;
    hello.textContent = '';
    let j = 0;
    const interval = setInterval(() => {
      hello.textContent = text.slice(0, j++);
      if (j > text.length) {
        clearInterval(interval);
        setTimeout(done, 200);
      }
    }, 50);
  }

  function playNext() {
    if (i >= greetings.length) {
      overlay.classList.add('hidden');
    } else {
      const { t, f } = greetings[i++];
      type(t, f, playNext);
    }
  }

  playNext();

  // Ambient Canvas
  const canvas = document.getElementById('ambient');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,255,0.2)';
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();
});
