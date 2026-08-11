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
