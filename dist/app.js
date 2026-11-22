const projects = [
 {id:'legenta',name:'Legenta',summary:'Core banking product workspace.',description:'Legenta is a core banking product workspace that is still in development. The live preview may require an account.',stack:['Angular'],source:'https://legenta.netlify.app/#/',credit:'Live preview; still in development and may be access restricted.',steps:['Workspace','In progress'],visualLabel:'CORE BANKING PRODUCT',visualNote:'Development preview · Access may be restricted',tone:'mint',status:'In development',featured:true},
 {id:'jumia',name:'Jumia Vendor Center',summary:'Seller operations, KYC and settlement workflows.',description:'A platform for Jumia sellers to manage their stores, orders, account statements and settlements. It supports seller verification workflows, including KYC review, approvals and revocation.',stack:['Angular','Angular Material','Java','Keycloak','PostgreSQL','Redis','Kafka'],source:'https://vendorcenter.jumia.com/sign-in',credit:'Public Jumia Vendor Center sign-in screen',pics:['jumia.jpg'],tone:'apricot',featured:true},
 {id:'medusa',name:'Medusa Merchant',summary:'Merchant payments, terminals and payment routing.',description:'A 3Line platform for managing merchants and terminals, reviewing payment activity and configuring payment routing. The backend for the version shown in this portfolio used Apache Fineract for wallet management.',stack:['Java','Spring Boot','MySQL','RabbitMQ','Apache Fineract'],source:'https://play.google.com/store/apps/details?id=com.threeline.medusa_merchant.app',credit:'Public app imagery from 3Line’s Google Play listing; the interface may differ from the version described.',pics:['medusa-1.png','medusa-2.png'],tone:'mint',featured:true},
 {id:'hydrogen',name:'Hydrogen Payments',summary:'Merchant services across a web portal and mobile app.',description:'Merchant and terminal management software built by 3Line for Hydrogen Payments. Backend APIs supported both the web portal and the merchant app, including payment operations and processor selection. This earlier platform preceded Medusa Merchant.',stack:['Java','Spring'],source:'https://dashboard.hydrogenpay.com/',credit:'Public Hydrogen Business app imagery for product context; it may differ from the earlier platform described.',pics:['hydrogen-0.png','hydrogen-1.png'],tone:'lilac'},
 {id:'insurance',name:'TrustInInsuranceNow',summary:'An insurer marketplace for policies and claims.',description:'An insurance marketplace in development. It is designed for insurers to list products, customers to buy coverage, and both sides to handle policy issuance and claims.',stack:['React','Java','Spring Boot','PostgreSQL','Redis'],source:'https://www.trustininsurancenow.com/',credit:'Public landing page preview; the marketplace is in development.',pics:['insurance.jpg'],tone:'sky'},
 {id:'management',name:'Jumia Vendor Management',summary:'Internal tools for vendor operations and support.',description:'A staff platform for reviewing vendor orders, account statements and payment information, and resolving operational issues. It supports staff workflows around payments without serving as the settlement engine.',stack:['Angular','Angular Material','Java','Keycloak','PostgreSQL','Redis','Kafka'],credit:'Workflow illustration. Staff screens are not public.',steps:['Orders','Statements','Payment review'],tone:'sand'}
];
const gallery=document.querySelector('#gallery');
const detail=document.querySelector('#detail');
const projectDetail=document.querySelector('#project-detail');
const theme=document.querySelector('#theme');
const renderVisual=p=>'<div class="visual '+p.tone+'" aria-hidden="true">'+(p.pics?.length?p.pics.map((f,i)=>'<img loading="'+(p.id==='jumia'?'eager':'lazy')+'" src="media/'+f+'" alt="" data-image="'+i+'">').join(''):'<div class="workflow"><span>'+(p.visualLabel||'VENDOR OPERATIONS')+'</span><div>'+p.steps.map(s=>'<b>'+s+'</b>').join('')+'</div><small>'+(p.visualNote||'Workflow illustration')+'</small></div>')+'</div>';
const visibleProjects=document.body.dataset.page==='home'?projects.filter(p=>p.featured):projects;
if(gallery)for(const p of visibleProjects){
 const card=document.createElement('button');
 card.type='button';card.className='project';card.dataset.project=p.id;card.setAttribute('aria-haspopup','dialog');
 card.innerHTML=renderVisual(p)+'<span class="caption"><strong>'+p.name+'</strong><span>'+p.summary+'</span>'+(p.status?'<span class="project-status">'+p.status+'</span>':'')+'</span>';
 gallery.append(card);
 card.addEventListener('click',()=>{
  projectDetail.innerHTML='<h2 id="project-title">'+p.name+'</h2><p>'+p.description+'</p>'+(p.status?'<p class="project-status-detail">'+p.status+'</p>':'')+renderVisual(p)+'<p class="credit">'+p.credit+'</p><h3>Technology</h3><ul class="stack">'+p.stack.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+(p.source?'<a class="source" href="'+p.source+'">View public product page ↗</a>':'');
  detail.showModal();
 });
}
if(detail){
 document.querySelector('#close').addEventListener('click',()=>detail.close());
 detail.addEventListener('click',e=>{if(e.target===detail)detail.close();});
}
const currentPath=window.location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.bar nav a').forEach(link=>{
 if(new URL(link.href).pathname.split('/').pop()===currentPath)link.setAttribute('aria-current','page');
});
function setTheme(dark){
 document.documentElement.dataset.theme=dark?'dark':'light';
 theme.setAttribute('aria-pressed',String(dark));
 theme.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
 theme.querySelector('span').textContent=dark?'☼':'◐';
}
try{setTheme(localStorage.getItem('emmanuel-theme')==='dark');}catch{setTheme(false);}
theme.addEventListener('click',()=>{
 const dark=theme.getAttribute('aria-pressed')!=='true';
 setTheme(dark);
 try{localStorage.setItem('emmanuel-theme',dark?'dark':'light');}catch{}
});

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const skillsTrack=document.querySelector('#skills-track');
const skillsToggle=document.querySelector('#skills-motion-toggle');
if(skillsTrack&&skillsToggle&&!reducedMotion){
 const skillsGroup=skillsTrack.querySelector('.skills-group');
 if(skillsGroup){
  const repeatedGroup=skillsGroup.cloneNode(true);
  repeatedGroup.removeAttribute('id');
  repeatedGroup.setAttribute('aria-hidden','true');
  repeatedGroup.setAttribute('inert','');
  skillsTrack.append(repeatedGroup);
  document.body.classList.add('skills-marquee-ready');
  skillsToggle.addEventListener('click',()=>{
   const paused=document.body.classList.toggle('skills-paused');
   skillsToggle.setAttribute('aria-pressed',String(paused));
   skillsToggle.textContent=paused?'Resume':'Pause';
   skillsToggle.setAttribute('aria-label',paused?'Resume tools animation':'Pause tools animation');
  });
 }
}else if(skillsToggle){
 skillsToggle.hidden=true;
}
const revealTargets=document.querySelectorAll('.hero-copy,.hero-art,.hero-bottom,.section-heading,.page-intro,.project,.experience-inner > .eyebrow,.experience-row,.about-aside,.about-copy,.about-page-content,.domain-section,.skills-group:not([aria-hidden="true"]) .skill-item,.writing-page-heading,.contact-page,.opensource-project,.articles li,.footer-inner > div:first-child,.footer-links,.footer-base');
if(!reducedMotion&&'IntersectionObserver' in window){
 document.body.classList.add('motion-enabled');
 revealTargets.forEach((element,index)=>{
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay',`${Math.min(index%4*70,210)}ms`);
 });
 const revealObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(entry.isIntersecting){
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
   }
  }
 },{threshold:0.14,rootMargin:'0px 0px -5% 0px'});
 revealTargets.forEach(element=>revealObserver.observe(element));
}

const progressBar=document.querySelector('.scroll-progress');
let progressFrame=0;
function updateScrollProgress(){
 const scrollableHeight=document.documentElement.scrollHeight-window.innerHeight;
 const progress=scrollableHeight>0?window.scrollY/scrollableHeight:0;
 progressBar.style.transform=`scaleX(${Math.min(1,Math.max(0,progress))})`;
 progressFrame=0;
}
if(!reducedMotion){
 window.addEventListener('scroll',()=>{
  if(!progressFrame)progressFrame=requestAnimationFrame(updateScrollProgress);
 },{passive:true});
 window.addEventListener('resize',updateScrollProgress);
 updateScrollProgress();
}
