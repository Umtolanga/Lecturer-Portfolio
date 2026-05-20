/* ═══════════════════════════════════════════════ 

   1. PARTICLE SYSTEM 

═══════════════════════════════════════════════ */ 

(function(){ 

  const cv=document.getElementById('particles-canvas'),ctx=cv.getContext('2d'); 

  let W,H,pts=[]; 

  const COL=['#00c8ff','#a020f0','#7b2fff','#fff']; 

  function rsz(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;} 

  function rnd(a,b){return a+Math.random()*(b-a);} 

  function P(){this.reset();} 

  P.prototype.reset=function(){this.x=rnd(0,W);this.y=rnd(0,H);this.r=rnd(.8,3.2);this.vx=rnd(-.35,.35);this.vy=rnd(-.35,.35);this.a=rnd(.2,.8);this.c=COL[0|rnd(0,COL.length)];this.life=rnd(60,200);this.age=0;}; 

  for(let i=0;i<90;i++){const p=new P();p.age=0|rnd(0,p.life);pts.push(p);} 

  function draw(){ 

    ctx.clearRect(0,0,W,H); 

    pts.forEach(p=>{ 

      const pr=p.age/p.life,fade=pr<.1?pr/.1:pr>.9?(1-pr)/.1:1; 

      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.c;ctx.globalAlpha=p.a*fade;ctx.fill();ctx.globalAlpha=1; 

      pts.forEach(q=>{const dx=q.x-p.x,dy=q.y-p.y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=p.c;ctx.globalAlpha=.08*(1-d/100)*fade;ctx.lineWidth=.5;ctx.stroke();ctx.globalAlpha=1;}}); 

      p.x+=p.vx;p.y+=p.vy;p.age++;if(p.age>=p.life)p.reset(); 

    }); 

    requestAnimationFrame(draw); 

  } 

  rsz();draw();window.addEventListener('resize',rsz); 

})(); 

 

/* ═══════════════════════════════════════════════ 

   2. TYPING EFFECT 

═══════════════════════════════════════════════ */ 

(function(){ 

  const phrases=['Lecturer · Belgium Campus','Passionate Educator & Mentor','Industry-Experienced Developer','Building Future-Ready Developers','Turning Students Into Professionals']; 

  const el=document.getElementById('typing-text'); 

  let pi=0,ci=0,del=false,wait=0; 

  function tick(){ 

    const ph=phrases[pi];if(wait>0){wait--;setTimeout(tick,50);return;} 

    if(!del){el.innerHTML=ph.slice(0,ci+1)+'<span class="cursor"></span>';ci++;if(ci===ph.length){del=true;wait=40;}setTimeout(tick,65);} 

    else{el.innerHTML=ph.slice(0,ci-1)+'<span class="cursor"></span>';ci--;if(ci===0){del=false;pi=(pi+1)%phrases.length;wait=5;}setTimeout(tick,35);} 

  }tick(); 

})(); 

 

/* ═══════════════════════════════════════════════ 

   3. SCROLL REVEAL 

═══════════════════════════════════════════════ */ 

new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}}),{threshold:.12}) 

  .observe && document.querySelectorAll('.reveal').forEach(el=>{ 

    new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}}),{threshold:.12}).observe(el); 

  }); 

 

/* ═══════════════════════════════════════════════ 

   4. NAV 

═══════════════════════════════════════════════ */ 

window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>60)); 

(function(){ 

  const btn=document.getElementById('hamburger'),links=document.getElementById('nav-links'); 

  btn.onclick=()=>{btn.classList.toggle('open');links.classList.toggle('open');}; 

  links.querySelectorAll('a').forEach(a=>a.onclick=()=>{btn.classList.remove('open');links.classList.remove('open');}); 

})(); 

 

/* ═══════════════════════════════════════════════ 

   5. FLIP CARDS 

═══════════════════════════════════════════════ */ 

document.querySelectorAll('.flip-card').forEach(c=>{ 

  c.onclick=()=>c.classList.toggle('flipped'); 

  c.onkeypress=e=>{if(e.key==='Enter'||e.key===' ')c.classList.toggle('flipped');}; 

}); 

 

/* ═══════════════════════════════════════════════ 

   6. FUN FACTS 

═══════════════════════════════════════════════ */ 

document.querySelectorAll('.fact-card').forEach(card=>{ 

  function tog(){const w=card.classList.contains('active');document.querySelectorAll('.fact-card').forEach(c=>c.classList.remove('active'));if(!w)card.classList.add('active');} 

  card.onclick=tog;card.onkeypress=e=>{if(e.key==='Enter'||e.key===' ')tog();}; 

}); 

 

/* ═══════════════════════════════════════════════ 

   7. QUOTE CAROUSEL 

═══════════════════════════════════════════════ */ 

(function(){ 

  const items=document.querySelectorAll('.quote-item'),dots=document.getElementById('quote-dots'); 

  let cur=0,timer; 

  items.forEach((_,i)=>{const d=document.createElement('div');d.className='quote-dot'+(i===0?' active':'');d.onclick=()=>go(i);dots.appendChild(d);}); 

  function go(n){items[cur].classList.remove('active');dots.children[cur].classList.remove('active');cur=(n+items.length)%items.length;items[cur].classList.add('active');dots.children[cur].classList.add('active');} 

  timer=setInterval(()=>go(cur+1),4500); 

  const qs=document.querySelector('.quote-stage'); 

  qs.onmouseenter=()=>clearInterval(timer); 

  qs.onmouseleave=()=>{timer=setInterval(()=>go(cur+1),4500);}; 

})(); 

 

/* ═══════════════════════════════════════════════ 

   8. DISCO FLOOR 

═══════════════════════════════════════════════ */ 

(function(){ 

  const floor=document.getElementById('disco-tiles'); 

  const COLS=['rgba(0,200,255,','rgba(160,32,240,','rgba(0,255,153,','rgba(255,48,96,','rgba(255,200,0,','rgba(100,150,255,']; 

  const tiles=[]; 

  for(let i=0;i<24;i++){ 

    const t=document.createElement('div');t.className='d-tile'; 

    const c=COLS[i%COLS.length];t.style.background=c+'0.05)'; 

    floor.appendChild(t);tiles.push({el:t,c}); 

  } 

  setInterval(()=>{ 

    const i=0|Math.random()*24,t=tiles[i]; 

    t.el.style.background=t.c+'0.55)';t.el.style.boxShadow='inset 0 0 20px '+t.c+'0.75)'; 

    setTimeout(()=>{t.el.style.background=t.c+'0.05)';t.el.style.boxShadow='none';},160+Math.random()*180); 

  },75); 

})(); 

 

/* ═══════════════════════════════════════════════ 

   9. MUSIC NOTES 

═══════════════════════════════════════════════ */ 

const NOTES=['♩','♪','♫','♬','🎵','🎶']; 

const NCOLS=['#00c8ff','#a020f0','#00ff99','#ff3060']; 

function spawnNotes(n){ 

  for(let i=0;i<n;i++) setTimeout(()=>{ 

    const el=document.createElement('div');el.className='music-note'; 

    el.textContent=NOTES[0|Math.random()*NOTES.length]; 

    el.style.cssText=`left:${25+Math.random()*50}%;top:${30+Math.random()*25}%;color:${NCOLS[0|Math.random()*NCOLS.length]};text-shadow:0 0 10px currentColor`; 

    document.body.appendChild(el);setTimeout(()=>el.remove(),2000); 

  },i*130); 

} 

 

/* ═══════════════════════════════════════════════ 

   10. HD CANVAS DANCER 

   Full skeletal character rendered entirely on 

   HTML Canvas 2D. Each joint is a pivot point; 

   limbs are drawn as rounded pill shapes with 

   colour shading. Eight unique dance routines 

   drive the joint angles via smooth sin/cos 

   functions, lerped for fluid transitions. 

═══════════════════════════════════════════════ */ 

(function(){ 

  const cv=document.getElementById('dancer-canvas'); 

  const ctx=cv.getContext('2d'); 

  const CW=220,CH=460; 

 

  /* ── palette ── */ 

  const SK='#f5c9a0',SKD='#e0a87a',SKDD='#c9935a'; 

  const HR='#1c0d02',HRL='#2a1405'; 

  const SH='#1a1e50',SHL='#252b72',SHHL='rgba(100,120,200,0.28)'; 

  const PN='#0d1030',PNL='#141840'; 

  const SHO='#111',SHOL='#232323'; 

  const TIE='#00c8ff',GLS='#00c8ff',GLSF='rgba(0,200,255,0.08)'; 

  const NB='#00c8ff',NP='#a020f0'; 

 

  /* ── lerp ── */ 

  const lerp=(a,b,t)=>a+(b-a)*t; 

 

  /* ── live joint state ── */ 

  const S={ 

    bodyX:0,bodyY:0,bodyR:0,bodyScaleY:1, 

    headR:0, 

    lSR:0.28,lER:0.22,lHR:0,lKR:0.04,lFR:0,lWR:0, 

    rSR:-0.28,rER:0.22,rHR:0,rKR:0.04,rFR:0,rWR:0, 

  }; 

 

  /* ── dance definitions: (t) => target joints ── */ 

  const dances={ 

    idle:t=>({ 

      bodyY:Math.sin(t*1.9)*4.5,bodyR:Math.sin(t*.95)*.02, 

      headR:Math.sin(t*1.1)*.055, 

      lSR:0.28+Math.sin(t*1.9)*.06,rSR:-0.28+Math.sin(t*1.9+1)*.06, 

      lER:0.22,rER:0.22, 

      lHR:0.05,rHR:-0.05,lKR:0.04,rKR:0.04,lFR:0,rFR:0, 

    }), 

 

    robot:t=>{ 

      /* 4-step beat pattern at 4 beats/sec */ 

      const b=Math.floor(t*4)%4; 

      const hR=[0,-.28,0,.28]; 

      const lS=[0.28,-1.15,0.28,0.28],rS=[-.28,-.28,-.28,1.15]; 

      const lE=[0.2,1.45,0.2,0.2],rE=[0.2,0.2,0.2,1.45]; 

      const lH=[0,.32,0,-.1],rH=[0,-.1,0,.32]; 

      const lK=[.04,.65,.04,.04],rK=[.04,.04,.04,.65]; 

      return {bodyY:[0,-10,0,0][b],bodyR:0,headR:hR[b], 

        lSR:lS[b],rSR:rS[b],lER:lE[b],rER:rE[b], 

        lHR:lH[b],rHR:rH[b],lKR:lK[b],rKR:rK[b],lFR:0,rFR:0}; 

    }, 

 

    floss:t=>{ 

      /* arms swing hard left-right alternating, hips follow */ 

      const ph=t*3.2,sw=Math.sin(ph); 

      return { 

        bodyY:Math.abs(sw)*-9,bodyR:sw*.13,headR:-sw*.09, 

        lSR:-1.05+sw*.85,rSR:1.05+sw*.85, 

        lER:0.45-sw*.28,rER:0.45+sw*.28, 

        lWR:sw*.35,rWR:-sw*.35, 

        lHR:Math.sin(ph+Math.PI)*.2,rHR:Math.sin(ph)*.2, 

        lKR:Math.max(0,Math.sin(ph+.5))*.32,rKR:Math.max(0,Math.sin(ph+.5+Math.PI))*.32, 

        lFR:.06,rFR:.06, 

      }; 

    }, 

 

    wave:t=>{ 

      /* whole body sways & arms rise like a wave */ 

      const ph=t*2.1; 

      return { 

        bodyX:Math.sin(ph)*11,bodyY:Math.sin(ph*2)*7,bodyR:Math.sin(ph)*.19,headR:-Math.sin(ph)*.15, 

        lSR:-1.25+Math.sin(ph+1)*.55,rSR:1.25+Math.sin(ph)*.55, 

        lER:0.85+Math.sin(ph)*.42,rER:0.85-Math.sin(ph)*.42, 

        lHR:Math.sin(ph+.5)*.24,rHR:Math.sin(ph+.5+Math.PI)*.24, 

        lKR:Math.max(0,Math.sin(ph+1))*.38,rKR:Math.max(0,Math.sin(ph+1+Math.PI))*.38, 

        lFR:Math.sin(ph)*.11,rFR:-Math.sin(ph)*.11, 

      }; 

    }, 

 

    moonwalk:t=>{ 

      /* weight shift + gliding legs + body lean */ 

      const ph=t*2.6,st=Math.sin(ph); 

      return { 

        bodyX:Math.sin(ph*.5)*9,bodyY:Math.abs(st)*-6,bodyR:-.09, 

        headR:.07, 

        lSR:0.2+st*.14,rSR:-0.2-st*.14, 

        lER:0.32,rER:0.32, 

        lHR:st*.42,rHR:-st*.42, 

        lKR:Math.max(0,Math.sin(ph+.45))*.72,rKR:Math.max(0,-Math.sin(ph+.45))*.72, 

        lFR:Math.sin(ph)*.28,rFR:-Math.sin(ph)*.28, 

      }; 

    }, 

 

    salsa:t=>{ 

      /* hip sway + alternating arm raises, quick step */ 

      const ph=t*3.1,hip=Math.sin(ph); 

      return { 

        bodyX:hip*13,bodyY:Math.abs(hip)*-7,bodyR:hip*.11,headR:-hip*.13, 

        lSR:-.85+Math.cos(ph)*.72,rSR:.85+Math.cos(ph+Math.PI)*.52, 

        lER:0.65+Math.sin(ph)*.32,rER:0.65-Math.sin(ph)*.32, 

        lHR:hip*.3,rHR:-hip*.3, 

        lKR:Math.max(0,Math.sin(ph+.3))*.42,rKR:Math.max(0,-Math.sin(ph+.3))*.42, 

        lFR:hip*.17,rFR:-hip*.17, 

      }; 

    }, 

 

    jump:t=>{ 

      /* sinusoidal jump arc with tuck in air */ 

      const ph=t*2.3,arc=Math.sin(ph); 

      const air=arc>0,h=Math.max(0,arc)*60,tuck=air?arc:0; 

      return { 

        bodyY:-h,bodyR:Math.sin(ph)*.04,headR:Math.sin(ph)*.06, 

        lSR:-1.35+tuck*.42,rSR:1.35-tuck*.42, 

        lER:0.38+tuck*.32,rER:0.38+tuck*.32, 

        lHR:-tuck*.48,rHR:tuck*.48, 

        lKR:tuck*.75,rKR:tuck*.75, 

        lFR:tuck*.32,rFR:-tuck*.32, 

        bodyScaleY:air?1:Math.max(.84,1-Math.abs(arc)*.18), 

      }; 

    }, 

 

    headbang:t=>{ 

      /* fast head whip, raised fists, body bounce */ 

      const ph=t*6.2,bang=Math.sin(ph); 

      return { 

        bodyY:Math.abs(bang)*-14,bodyR:bang*.055,headR:bang*.6, 

        lSR:-1.05+Math.sin(ph*.5)*.3,rSR:1.05+Math.sin(ph*.5)*.3, 

        lER:1.15+Math.sin(ph)*.42,rER:1.15-Math.sin(ph)*.42, 

        lHR:Math.sin(ph*.5)*.13,rHR:-Math.sin(ph*.5)*.13, 

        lKR:Math.max(0,bang)*.28,rKR:Math.max(0,-bang)*.28, 

        lFR:0,rFR:0, 

      }; 

    }, 

  }; 

 

  /* ── drawing helpers ── */ 

  function pill(x,y,w,h,fill,stroke,sw=0){ 

    const r=w/2; 

    ctx.beginPath(); 

    ctx.moveTo(x-r,y);ctx.lineTo(x-r,y+h-r); 

    ctx.arc(x,y+h-r,r,Math.PI,0,false); 

    ctx.lineTo(x+r,y);ctx.arc(x,y,r,0,Math.PI,false); 

    ctx.closePath(); 

    if(fill){ctx.fillStyle=fill;ctx.fill();} 

    if(stroke&&sw){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();} 

  } 

  function ell(cx,cy,rx,ry,fill,stroke,sw=1.5,rot=0){ 

    ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2); 

    if(fill){ctx.fillStyle=fill;ctx.fill();} 

    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();} 

  } 

  function rr(x,y,w,h,r,fill,stroke,sw=0){ 

    ctx.beginPath();ctx.roundRect(x,y,w,h,[r]); 

    if(fill){ctx.fillStyle=fill;ctx.fill();} 

    if(stroke&&sw){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();} 

  } 

 

  /* ── draw full character from state S ── */ 

  function draw(){ 

    ctx.clearRect(0,0,CW,CH); 

 

    /* ground shadow */ 

    const sH=CH-75; 

    ctx.save();ctx.translate(CW/2,sH); 

    const ss=Math.max(0.3,1+S.bodyY/80); 

    ctx.scale(ss,0.22*ss); 

    ell(0,0,38,38,'rgba(0,200,255,0.2)'); 

    ctx.restore(); 

 

    ctx.save(); 

    ctx.translate(CW/2+S.bodyX, sH+S.bodyY); 

    ctx.scale(1,S.bodyScaleY||1); 

    ctx.rotate(S.bodyR||0); 

 

    /* ── RIGHT LEG (behind, drawn first) ── */ 

    ctx.save(); 

    ctx.translate(13,0);ctx.rotate(S.rHR||0); 

    /* thigh */ 

    pill(0,0,21,72,PN); 

    /* knee glow */ 

    ell(0,72,5,5,'rgba(0,200,255,0.25)'); 

    ctx.translate(0,72);ctx.rotate(S.rKR||0); 

    /* shin */ 

    pill(0,0,19,64,PNL); 

    ctx.save(); 

    ctx.translate(0,64);ctx.rotate(S.rFR||0); 

    rr(-9,0,27,13,5,SHO);rr(-8,2,13,8,3,SHOL); 

    ctx.restore(); 

    ctx.restore(); 

 

    /* ── LEFT LEG (front) ── */ 

    ctx.save(); 

    ctx.translate(-13,0);ctx.rotate(S.lHR||0); 

    pill(0,0,21,72,PNL); 

    ell(0,72,5,5,'rgba(160,32,240,0.25)'); 

    ctx.translate(0,72);ctx.rotate(S.lKR||0); 

    pill(0,0,19,64,PN); 

    ctx.save(); 

    ctx.translate(0,64);ctx.rotate(S.lFR||0); 

    rr(-17,0,27,13,5,SHO);rr(-16,2,13,8,3,SHOL); 

    ctx.restore(); 

    ctx.restore(); 

 

    /* ── TORSO ── */ 

    ctx.save();ctx.translate(-32,-118); 

    rr(0,0,64,118,18,SH); 

    rr(5,5,54,108,14,SHHL); 

    /* collar */ 

    ctx.beginPath();ctx.moveTo(32,0);ctx.lineTo(20,30);ctx.lineTo(30,22);ctx.lineTo(32,26);ctx.closePath();ctx.fillStyle='#0d1122';ctx.fill(); 

    ctx.beginPath();ctx.moveTo(32,0);ctx.lineTo(44,30);ctx.lineTo(34,22);ctx.lineTo(32,26);ctx.closePath();ctx.fillStyle='#0d1122';ctx.fill(); 

    /* tie */ 

    ctx.beginPath();ctx.moveTo(32,24);ctx.lineTo(26,70);ctx.lineTo(32,64);ctx.lineTo(38,70);ctx.closePath();ctx.fillStyle=TIE;ctx.globalAlpha=.9;ctx.fill();ctx.globalAlpha=1; 

    /* tie knot */ 

    ctx.beginPath();ctx.moveTo(28,21);ctx.lineTo(36,21);ctx.lineTo(34,29);ctx.lineTo(30,29);ctx.closePath();ctx.fillStyle='#0099bb';ctx.fill(); 

    /* circuits */ 

    ctx.strokeStyle='rgba(0,200,255,0.35)';ctx.lineWidth=1.2;ctx.lineCap='round'; 

    ctx.beginPath();ctx.moveTo(9,38);ctx.lineTo(20,38);ctx.lineTo(20,55);ctx.lineTo(12,55);ctx.stroke(); 

    ctx.fillStyle='rgba(0,200,255,0.55)';ctx.beginPath();ctx.arc(12,55,2.8,0,Math.PI*2);ctx.fill(); 

    ctx.strokeStyle='rgba(160,32,240,0.35)'; 

    ctx.beginPath();ctx.moveTo(55,38);ctx.lineTo(44,38);ctx.lineTo(44,55);ctx.lineTo(52,55);ctx.stroke(); 

    ctx.fillStyle='rgba(160,32,240,0.55)';ctx.beginPath();ctx.arc(52,55,2.8,0,Math.PI*2);ctx.fill(); 

    /* belt */ 

    rr(0,110,64,10,4,'#0a0c1e'); 

    rr(24,112,16,6,2,'rgba(0,200,255,0.55)'); 

    ctx.restore(); 

 

    /* ── RIGHT ARM ── */ 

    ctx.save();ctx.translate(32,-104);ctx.rotate(S.rSR||0); 

    ell(0,0,12,10,SHL); 

    pill(0,0,18,56,SH); 

    ell(0,56,6,6,'rgba(0,200,255,0.22)'); 

    ctx.translate(0,56);ctx.rotate(S.rER||0); 

    pill(0,0,15,48,SK); 

    rr(-8,39,16,8,3,'rgba(0,200,255,0.65)'); 

    ctx.translate(0,48);ctx.rotate(S.rWR||0); 

    ell(0,0,10,8,SK); 

    for(let f=-1;f<=1;f++){rr(f*3.5-2,0,4,11,2,SKD);} 

    ctx.restore(); 

 

    /* ── LEFT ARM ── */ 

    ctx.save();ctx.translate(-32,-104);ctx.rotate(S.lSR||0); 

    ell(0,0,12,10,SHL); 

    pill(0,0,18,56,SHL); 

    ell(0,56,6,6,'rgba(160,32,240,0.22)'); 

    ctx.translate(0,56);ctx.rotate(S.lER||0); 

    pill(0,0,15,48,SK); 

    rr(-8,39,16,8,3,'rgba(160,32,240,0.65)'); 

    ctx.translate(0,48);ctx.rotate(S.lWR||0); 

    ell(0,0,10,8,SK); 

    for(let f=-1;f<=1;f++){rr(f*3.5-2,0,4,11,2,SKD);} 

    ctx.restore(); 

 

    /* ── NECK ── */ 

    ctx.save();ctx.translate(-10,-122);rr(0,0,20,24,8,SKD);ctx.restore(); 

 

    /* ── HEAD ── */ 

    ctx.save();ctx.translate(0,-146);ctx.rotate(S.headR||0); 

 

    /* skull */ 

    ell(0,0,42,46,SK); 

    ell(-30,6,14,22,'rgba(200,130,80,0.09)'); 

    ell(30,6,14,22,'rgba(200,130,80,0.09)'); 

    ell(0,-24,24,14,'rgba(255,228,196,0.14)'); 

    /* hair back */ 

    ell(0,-30,42,22,HR);ctx.fillRect(-42,-30,84,22); 

    /* hair top */ 

    ctx.beginPath();ctx.moveTo(-42,-22);ctx.bezierCurveTo(-44,-52,-32,-60,0,-62);ctx.bezierCurveTo(32,-60,44,-52,42,-22);ctx.fillStyle=HRL;ctx.fill(); 

    rr(-43,-18,12,30,5,HR);rr(31,-18,12,30,5,HR); 

    /* ears */ 

    ell(-44,2,8,13,SKD);ell(-43,2,5,9,SKDD); 

    ell(44,2,8,13,SKD);ell(43,2,5,9,SKDD); 

    /* eye whites */ 

    ell(-17,0,13,14,'#fff');ell(17,0,13,14,'#fff'); 

    /* irises */ 

    ell(-16,1,9,10,'#3b2010');ell(16,1,9,10,'#3b2010'); 

    /* pupils */ 

    ell(-16,2,5,5.5,'#050200');ell(16,2,5,5.5,'#050200'); 

    /* shines */ 

    ell(-13,-1,3,3,'#fff');ctx.globalAlpha=.85;ctx.fill();ctx.globalAlpha=1; 

    ell(19,-1,3,3,'#fff'); 

    ell(-17,4,1.4,1.4,'#fff');ctx.globalAlpha=.38;ctx.fill();ctx.globalAlpha=1; 

    ell(15,4,1.4,1.4,'#fff');ctx.globalAlpha=.38;ctx.fill();ctx.globalAlpha=1; 

    /* eyebrows */ 

    ctx.strokeStyle=HR;ctx.lineWidth=3.8;ctx.lineCap='round'; 

    ctx.beginPath();ctx.moveTo(-30,-16);ctx.quadraticCurveTo(-17,-24,-4,-18);ctx.stroke(); 

    ctx.beginPath();ctx.moveTo(30,-16);ctx.quadraticCurveTo(17,-24,4,-18);ctx.stroke(); 

    /* nose bridge */ 

    ctx.beginPath();ctx.moveTo(-5,7);ctx.lineTo(-7,20);ctx.quadraticCurveTo(0,25,7,20);ctx.lineTo(5,7);ctx.fillStyle=SKD;ctx.fill(); 

    ell(0,21,7.5,5.5,'#d09060'); 

    ell(-5.5,22,3.2,2.4,'rgba(160,85,45,0.52)');ell(5.5,22,3.2,2.4,'rgba(160,85,45,0.52)'); 

    /* upper lip */ 

    ctx.beginPath();ctx.moveTo(-17,32);ctx.bezierCurveTo(-8,27,0,28,0,28);ctx.bezierCurveTo(0,28,8,27,17,32);ctx.fillStyle='#e08060';ctx.fill(); 

    /* lower lip */ 

    ctx.beginPath();ctx.moveTo(-17,32);ctx.bezierCurveTo(-8,41,0,42,0,42);ctx.bezierCurveTo(0,42,8,41,17,32);ctx.fillStyle='#c07050';ctx.fill(); 

    ctx.beginPath();ctx.moveTo(-17,32);ctx.lineTo(17,32);ctx.strokeStyle='rgba(140,60,30,0.45)';ctx.lineWidth=1;ctx.stroke(); 

    /* beard */ 

    ell(0,38,28,11,'rgba(28,13,2,0.26)');ell(0,44,20,8,'rgba(28,13,2,0.16)'); 

    /* glasses */ 

    rr(-33,-11,26,21,8,GLSF,GLS,2.3);rr(7,-11,26,21,8,GLSF,GLS,2.3); 

    ctx.beginPath();ctx.moveTo(-7,0);ctx.lineTo(7,0);ctx.strokeStyle=GLS;ctx.lineWidth=2.3;ctx.stroke(); 

    ctx.beginPath();ctx.moveTo(-33,0);ctx.lineTo(-46,3);ctx.strokeStyle=GLS;ctx.lineWidth=1.9;ctx.globalAlpha=.8;ctx.stroke();ctx.globalAlpha=1; 

    ctx.beginPath();ctx.moveTo(33,0);ctx.lineTo(46,3);ctx.strokeStyle=GLS;ctx.lineWidth=1.9;ctx.globalAlpha=.8;ctx.stroke();ctx.globalAlpha=1; 

    ell(-25,-6,5,3,'rgba(255,255,255,0.17)',null,0,-0.4);ell(15,-6,5,3,'rgba(255,255,255,0.17)',null,0,-0.4); 

 

    ctx.restore(); // head 

    ctx.restore(); // whole character 

  } 

 

  /* ── animation loop ── */ 

  let dance='idle',elapsed=0,lastT=null,speed=1; 

  function lerpS(tgt){ 

    const f=0.19; 

    Object.keys(tgt).forEach(k=>{ 

      if(S[k]===undefined)S[k]=k==='bodyScaleY'?1:0; 

      S[k]=lerp(S[k],tgt[k],f); 

    }); 

    /* reset keys not in target */ 

    ['bodyX','bodyScaleY'].forEach(k=>{ 

      if(tgt[k]===undefined)S[k]=lerp(S[k],k==='bodyScaleY'?1:0,.1); 

    }); 

  } 

  function loop(now){ 

    if(!lastT)lastT=now; 

    const dt=Math.min((now-lastT)/1000,.05);lastT=now; 

    elapsed+=dt*speed; 

    lerpS(dances[dance](elapsed)); 

    draw(); 

    requestAnimationFrame(loop); 

  } 

  requestAnimationFrame(loop); 

 

  /* ── buttons ── */ 

  const btns=document.querySelectorAll('.d-btn'); 

  const lbl=document.getElementById('df-label'); 

  const DC={idle:'#00c8ff',robot:'#aaffee',floss:'#cc00ff',wave:'#00ff99',moonwalk:'#ffffaa',salsa:'#ff6666',jump:'#ffaaff',headbang:'#ff3060'}; 

  btns.forEach(b=>b.addEventListener('click',()=>{ 

    const d=b.dataset.dance;if(d===dance)return; 

    dance=d;elapsed=0; 

    lbl.textContent=b.dataset.label; 

    const c=DC[d]||'#00c8ff';lbl.style.color=c;lbl.style.textShadow=`0 0 14px ${c},0 0 40px ${c}`; 

    btns.forEach(x=>x.classList.remove('active'));b.classList.add('active'); 

    spawnNotes(5); 

  })); 

 

  /* ── speed ── */ 

  const sld=document.getElementById('df-spd'),sv=document.getElementById('df-spd-val'); 

  sld.addEventListener('input',()=>{speed=parseFloat(sld.value);sv.textContent=speed.toFixed(1)+'×';}); 

 

  /* ── keyboard 1–8 ── */ 

  const KM={'1':'idle','2':'robot','3':'floss','4':'wave','5':'moonwalk','6':'salsa','7':'jump','8':'headbang'}; 

  document.addEventListener('keydown',e=>{ if(KM[e.key]){const b=document.querySelector(`.d-btn[data-dance="${KM[e.key]}"]`);if(b)b.click();} }); 

 

  setInterval(()=>{if(dance!=='idle')spawnNotes(2);},3500); 

})(); 
