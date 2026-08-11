const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("done"), 500);
});

$("#year").textContent = new Date().getFullYear();

const glow = $("#cursorGlow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const nav = $("#nav");
$("#menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const progress = $("#scrollProgress");
const topBtn = $("#topBtn");
function scrollUI(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / max * 100) + "%";
  topBtn.classList.toggle("show", scrollY > 600);
}
window.addEventListener("scroll", scrollUI, {passive:true});
topBtn.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
$$(".reveal").forEach((el,i) => {
  el.style.transitionDelay = `${Math.min(i * 35, 240)}ms`;
  observer.observe(el);
});

const sections = $$("main section[id]");
const links = $$("#navLinks a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => sectionObserver.observe(s));

const words = ["alive.", "useful.", "beautiful.", "scalable.", "memorable."];
let wi=0, ci=0, deleting=false;
const typed=$("#typed");
function typeLoop(){
  const word=words[wi];
  typed.textContent=deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  if(!deleting && ci===word.length){ deleting=true; setTimeout(typeLoop,1200); return; }
  if(deleting && ci===0){ deleting=false; wi=(wi+1)%words.length; }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
setTimeout(typeLoop, 900);

$$(".tilt").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(700px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

$$(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12, y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

const character=$("#character");
window.addEventListener("pointermove", e=>{
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  character.style.marginLeft = `${x*10}px`;
  character.style.marginTop = `${y*8}px`;
});

$("#contactForm").addEventListener("submit", e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const subject=encodeURIComponent("Portfolio enquiry for Raman Kumar");
  const body=encodeURIComponent(`Hi Raman,\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\n\nProject details:\n${data.get("message")}\n\nRegards,\n${data.get("name")}`);
  window.location.href=`mailto:raman.kumar07707@gmail.com?subject=${subject}&body=${body}`;
  $("#formNote").textContent="Opening your email app…";
});

document.addEventListener("keydown", e=>{
  if(e.key==="Escape") nav.classList.remove("open");
});

/* ===== PREMIUM V2 INTERACTIONS ===== */
const canvas=document.getElementById("particleCanvas"), ctx=canvas.getContext("2d");
let particles=[], mouse={x:innerWidth/2,y:innerHeight/2};
function resizeCanvas(){canvas.width=innerWidth;canvas.height=innerHeight}
resizeCanvas(); addEventListener("resize",resizeCanvas);
for(let i=0;i<55;i++) particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22});
addEventListener("pointermove",e=>mouse={x:e.clientX,y:e.clientY});
function particlesLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;
    const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<130){p.x+=dx/d*.25;p.y+=dy/d*.25}
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(139,92,246,.35)";ctx.fill();
  });
  requestAnimationFrame(particlesLoop);
}
particlesLoop();

const terminalText=document.getElementById("terminalText");
const terminalLines=["Building digital experiences...","Connecting APIs + databases...","Shipping AI-powered workflows...","Crafting clean interfaces...","Turning ideas into products..."];
let tl=0,tc=0;
function terminalLoop(){
  const word=terminalLines[tl];
  terminalText.textContent=word.slice(0,tc++);
  if(tc>word.length){tl=(tl+1)%terminalLines.length;tc=0;setTimeout(terminalLoop,700);return}
  setTimeout(terminalLoop,42);
}
terminalLoop();

const palette=document.getElementById("commandPalette");
function openPalette(){palette.classList.add("open");document.body.style.overflow="hidden"}
function closePalette(){palette.classList.remove("open");document.body.style.overflow=""}
addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openPalette()}
  if(e.key.toLowerCase()==="k"&&!e.ctrlKey&&!e.metaKey&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA")openPalette();
  if(e.key==="Escape")closePalette();
});
palette.addEventListener("click",e=>{
  const btn=e.target.closest("[data-go]");
  if(btn){closePalette();document.querySelector(btn.dataset.go)?.scrollIntoView({behavior:"smooth"})}
  if(e.target===palette)closePalette();
});
