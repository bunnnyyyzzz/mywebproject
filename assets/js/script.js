// Subtle floating petals and stars
(function(){
  const wrap = document.getElementById('petals-wrap');
  if(!wrap) return;
  const symbols = ['✨','🌙','🦋','🌸'];
  const count = 14;
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    const size = 10 + Math.random()*22;
    el.style.fontSize = size + 'px';
    el.style.left = Math.random()*100 + '%';
    el.style.top = (Math.random()*40 - 10) + '%';
    el.style.opacity = 0.55 + Math.random()*0.45;
    wrap.appendChild(el);
    // animate down slowly
    const duration = 20000 + Math.random()*30000;
    const delay = Math.random()*5000;
    el.animate([
      { transform: `translateY(0) rotate(0deg)` },
      { transform: `translateY(${60 + Math.random()*40}vh) rotate(${Math.random()*720}deg)` }
    ], { duration, iterations: Infinity, direction: 'normal', easing:'linear', delay });
  }
})();
