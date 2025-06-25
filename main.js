// ROUTING SETUP
const routes = {
  '/': `<h2>Home</h2>
        <p>Welcome to <strong>Firzy</strong>…</p>`,
  '/about': `<h2>About Firzy</h2>
            <p>Firzy is run by a 12-year-old…</p>`,
  '/projects': `<h2>Projects</h2>
               <ul>
                 <li>🛠️ Password Generator</li>
                 <li>🎨 Color Picker Tool</li>
               </ul>`,
  '/contact': `<h2>Contact</h2>
              <p>Email: <a href="mailto:firzy.hq@gmail.com">
              firzy.hq@gmail.com</a></p>`
};

function router(path=location.pathname) {
  document.getElementById('app').innerHTML = routes[path] || '<h2>404</h2>';
  document.querySelectorAll('nav a[data-link]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href')===path);
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

window.addEventListener('popstate',()=>router());
document.addEventListener('DOMContentLoaded',()=>{
  // start routing
  router();
  document.body.addEventListener('click', navigate);

  // HELLO ANIMATION
  const greetings = [
    {t:'Hello',    f:'Roboto'},
    {t:'Hola',     f:'Amatic SC'},
    {t:'Bonjour',  f:'Playfair Display'},
    {t:'Hallo',    f:'Orbitron'},
    {t:'Ciao',     f:'Pacifico'},
    {t:'こんにちは', f:'Indie Flower'},
    {t:'안녕하세요', f:'Courier Prime'},
    {t:'مرحبا',    f:'Quicksand'},
    {t:'नमस्ते',    f:'Anton'},
    {t:'Привет',   f:'Lobster'},
  ];
  const overlay = document.getElementById('intro-overlay');
  const hello = document.getElementById('hello-text');
  let i=0;

  function cycle() {
    const {t,f} = greetings[i];
    hello.style.fontFamily = `'${f}', sans-serif`;
    hello.textContent = t;
    hello.classList.add('show');
    setTimeout(()=>{
      hello.classList.remove('show');
      i = (i+1)%greetings.length;
    }, 1800);
  }

  // start cycling every 2s
  cycle();
  const interval = setInterval(cycle, 2000);

  // after all 10 shown, fade out overlay
  setTimeout(()=>{
    clearInterval(interval);
    overlay.classList.add('hidden');
  }, greetings.length * 2000 + 800);
});
