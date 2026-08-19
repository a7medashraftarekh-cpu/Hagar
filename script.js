(function(){
  const cvs = document.getElementById('confetti');
  const ctx = cvs.getContext('2d');
  let W, H, particles = [];

  function resize(){
    W = cvs.width = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  function Particle(x,y,color){
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 1.3) * 8;
    this.gravity = 0.2;
    this.color = color;
    this.size = Math.random() * 8 + 3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.3;
    this.life = 1;
    this.decay = Math.random() * 0.008 + 0.004;
  }

  Particle.prototype.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.rotSpeed;
    this.life -= this.decay;
  };

  Particle.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  };

  const colors = ['#e74c3c','#3498db','#2ecc71','#f1c40f','#9b59b6','#e67e22','#ff6b9d','#00d2ff'];

  function spawn(count, cx, cy){
    for(let i=0;i<count;i++){
      particles.push(
        new Particle(
          cx ?? W/2,
          cy ?? H/4,
          colors[Math.floor(Math.random()*colors.length)]
        )
      );
    }
  }

  spawn(120);

  window.burst = function(){
    spawn(180, W/2, H/3);
  };

  let pulsing = false;

  window.togglePulse = function(){
    const card = document.querySelector('.card');
    pulsing = !pulsing;
    card.style.animation = pulsing
      ? 'float 1.5s ease-in-out infinite, pulseCard 0.5s ease infinite'
      : 'float 7s ease-in-out infinite';
  };

  const wishes = [
    'يارب تبقي أحسن دكتورة في مصر 🇪🇬',
    'هجر = سعادة = حب = حياة ❤️',
    'كل سنة وانتي أجمل بنت في الدنيا 🌍',
    'ربنا يديم الضحكة على وشك 😄',
    'السنة دي هتكون سنة تفوق ونجاح 🎓',
    'مفيش حد زيك في الدنيا كلها 🌟'
  ];

  window.addWish = function(){
    const card = document.querySelector('.card');
    const div = document.createElement('div');
    div.className = 'msg';
    div.style.animation = 'fadeIn 0.6s ease';
    div.innerHTML =
      '<span class="hl">دعوة جديدة:</span> ' +
      wishes[Math.floor(Math.random()*wishes.length)];

    const actions = document.querySelector('.actions');
    card.insertBefore(div, actions);
  };

  function loop(){
    ctx.clearRect(0,0,W,H);

    for(let i=particles.length-1;i>=0;i--){
      particles[i].update();
      particles[i].draw();

      if(particles[i].life <= 0){
        particles.splice(i,1);
      }
    }

    if(particles.length < 50){
      spawn(15, Math.random()*W, H+10);
    }

    requestAnimationFrame(loop);
  }

  loop();

  for(let i=0;i<10;i++){
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (3 + i*10) + '%';
    b.style.background = colors[i % colors.length];
    b.style.animationDelay = (i*1.5) + 's';
    b.style.animationDuration = (12 + Math.random()*10) + 's';
    document.body.appendChild(b);
  }

  function updateCountdown(){
    const now = new Date();
    const next = new Date(now.getFullYear(), 7, 20, 0, 0, 0);

    if(next < now){
      next.setFullYear(next.getFullYear()+1);
    }

    const diff = next - now;

    document.getElementById('days').textContent = Math.floor(diff/86400000);
    document.getElementById('hours').textContent = Math.floor((diff%86400000)/3600000);
    document.getElementById('mins').textContent = Math.floor((diff%3600000)/60000);
    document.getElementById('secs').textContent = Math.floor((diff%60000)/1000);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
