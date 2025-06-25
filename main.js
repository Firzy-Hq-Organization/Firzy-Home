// Dynamic routing
const routes = {
  '/': `
    <h2>Home</h2>
    <p>Welcome to <strong>Firzy</strong>, a youth-driven brand built with courage, code, and creativity.</p>
  `,
  '/about': `
    <h2>About Firzy</h2>
    <p>Firzy is run by a 12-year-old who believes the internet should be raw, honest, and full of energy. It’s not a company — it’s a mindset.</p>
  `,
  '/projects': `
    <h2>Projects</h2>
    <ul>
      <li>🛠️ Password Generator</li>
      <li>🎨 Color Picker Tool</li>
      <li>📁 Firzy Tools Page (coming soon)</li>
    </ul>
  `,
  '/contact': `
    <h2>Contact</h2>
    <p>Email: <a href="mailto:firzy.hq@gmail.com">firzy.hq@gmail.com</a></p>
  `
};

function router(path = window.location.pathname) {
  const content = routes[path] || `<h2>404</h2><p>Page not found.</p>`;
  document.getElementById('app').innerHTML = content;

  document.querySelectorAll('nav a[data-link]').forEach(link => {
    const linkPath = link.getAttribute('href');
    link.classList.toggle('active', linkPath === path);
  });
}

function navigate(event) {
  const link = event.target.closest('[data-link]');
  if (link) {
    event.preventDefault();
    const path = link.getAttribute('href');
    history.pushState({}, '', path);
    router(path);
  }
}

window.addEventListener('popstate', () => router());
document.addEventListener('DOMContentLoaded', () => {
  router();
  document.body.addEventListener('click', navigate);

  // Hello animation logic
  const greetings = [
    { text: 'Hello', font: 'Roboto' },
    { text: 'Hola', font: 'Amatic SC' },
    { text: 'Bonjour', font: 'Playfair Display' },
    { text: 'Hallo', font: 'Orbitron' },
    { text: 'Ciao', font: 'Pacifico' },
    { text: 'こんにちは', font: 'Indie Flower' },
    { text: '안녕하세요', font: 'Courier Prime' },
    { text: 'مرحبا', font: 'Quicksand' },
    { text: 'नमस्ते', font: 'Anton' },
    { text: 'Привет', font: 'Lobster' },
  ];

  const helloEl = document.getElementById('hello-text');
  let i = 0;

  function showNextGreeting() {
    const { text, font } = greetings[i];
    helloEl.classList.remove('show');
    setTimeout(() => {
      helloEl.textContent = text;
      helloEl.style.fontFamily = `'${font}', sans-serif`;
      helloEl.classList.add('show');
      i = (i + 1) % greetings.length;
    }, 300);
  }

  showNextGreeting();
  setInterval(showNextGreeting, 2500);
});
