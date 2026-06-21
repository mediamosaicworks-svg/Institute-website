const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-header nav');
if (location.protocol === 'file:') document.querySelector('a[href="admin.php"]')?.setAttribute('href','admin.html');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

let savedSiteData = window.ONLINE_SITE_DATA || null;
if (!savedSiteData) { try { savedSiteData = JSON.parse(localStorage.getItem('mosaicSiteDataV3')); } catch {} }
if (savedSiteData) {
  const s = savedSiteData.settings || {};
  if(s.logo)document.querySelectorAll('.site-logo').forEach(logo=>logo.src=s.logo);
  document.querySelectorAll('.brand-name').forEach(el => el.innerHTML = `${(s.name || 'CREA8 Academy').replace(/ Academy$/i,'')}<br><small>ACADEMY</small>`);
  document.getElementById('footerName').textContent = s.name || 'Mosaic Works Institute';
  const locality = s.locality || 'Muzaffarnagar';
  document.title = `Motion Graphics, Animation & Video Editing Course in ${locality} | ${s.name || 'Mosaic Works Institute'}`;
  const phone = (s.phone || '919876543210').replace(/\D/g,'');
  const contactPhone = document.getElementById('contactPhone'); contactPhone.href = `tel:+${phone}`; contactPhone.textContent = `+${phone}`;
  const contactEmail = document.getElementById('contactEmail'); contactEmail.href = `mailto:${s.email}`; contactEmail.textContent = s.email;
  document.getElementById('contactAddress').textContent=[s.address,s.locality,s.region,s.pincode].filter(Boolean).join(', ') || 'Muzaffarnagar, Uttar Pradesh';
  document.querySelectorAll('.instagram,.footer-instagram').forEach(el => el.href = s.instagram || '#');
  document.querySelectorAll('.facebook,.footer-facebook').forEach(el => el.href = s.facebook || '#');
  document.querySelectorAll('.whatsapp').forEach(el => el.href = `https://wa.me/${phone}?text=${encodeURIComponent('Hi, I would like course details.')}`);
  if (savedSiteData.students?.length) {
    const colors = ['purple','orange','green','blue','pink','yellow'];
    document.querySelector('.placement-grid').innerHTML = savedSiteData.students.map((st,i) => {
      const initials = st.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
      const portrait = st.photo ? `<div class="portrait has-photo" style="background-image:url('${st.photo}')"></div>` : `<div class="portrait ${colors[i%colors.length]}">${initials}</div>`;
      return `<article class="placement-card reveal" data-type="${st.type || 'design'}">${portrait}<div><span>${st.role || ''}</span><h3>${st.name || ''}</h3><p>${st.company || ''}</p></div><strong>${st.salary || ''}</strong></article>`;
    }).join('');
  }
}

const heroBanners = savedSiteData?.banners?.length ? savedSiteData.banners : [{type:'image',src:'assets/hero-students.png',title:"Don't just learn.|*Create.* Showcase.|Move forward.",description:'Industry-focused training in Animation, Motion Graphics, Video Editing and Graphic Design—with live projects and placement support.'}];
const cleanText = text => String(text || '').replace(/[<>]/g, '');
const formatTitle = text => cleanText(text).split('|').map(line => line.replace(/\*([^*]+)\*/g,'<em>$1</em>')).join('<br>');
if(savedSiteData?.content){
  const c=savedSiteData.content;
  const allowedFonts=['Manrope','Poppins','Montserrat','Hind','Mukta','Georgia'];
  if(allowedFonts.includes(c.bodyFont))document.documentElement.style.setProperty('--body-font',c.bodyFont);
  if(allowedFonts.includes(c.headingFont))document.documentElement.style.setProperty('--heading-font',c.headingFont);
  const rich={coursesHeading:'.courses .section-head h2',portfolioHeading:'.portfolio .section-head h2',placementsHeading:'.placements .section-head h2',aboutHeading:'.about .section-head h2',contactHeading:'.contact h2',localHeading:'.local-intro h2',course1Title:'.course-card:nth-child(1) h3',course2Title:'.course-card:nth-child(2) h3',course3Title:'.course-card:nth-child(3) h3',course4Title:'.course-card:nth-child(4) h3'};
  const plain={coursesIntro:'.courses .section-head>p',portfolioIntro:'.portfolio .section-head>p',placementsIntro:'.placements .section-head>p',contactIntro:'.contact-copy>p',localIntro:'.local-intro>p',course1Desc:'.course-card:nth-child(1)>p',course2Desc:'.course-card:nth-child(2)>p',course3Desc:'.course-card:nth-child(3)>p',course4Desc:'.course-card:nth-child(4)>p'};
  Object.entries(rich).forEach(([key,selector])=>{if(c[key]&&document.querySelector(selector))document.querySelector(selector).innerHTML=formatTitle(c[key])});
  Object.entries(plain).forEach(([key,selector])=>{if(c[key]&&document.querySelector(selector))document.querySelector(selector).textContent=c[key]});
  if(c.admissionsLabel)document.querySelector('.eyebrow').innerHTML=`<span></span>${cleanText(c.admissionsLabel)}`;
  if(c.coursesButton)document.querySelector('.hero-actions .btn-primary').innerHTML=`${cleanText(c.coursesButton)} <span>↗</span>`;
  if(c.placementButton)document.querySelector('.hero-actions .text-link').innerHTML=`<span class="play">▶</span> ${cleanText(c.placementButton)}`;
}
if (savedSiteData?.portfolio?.length) {
  document.getElementById('portfolioGrid').innerHTML=savedSiteData.portfolio.map((work,index)=>{
    const media=work.type==='video'&&work.thumbnail?`<img src="${cleanText(work.thumbnail)}" alt="${cleanText(work.title)} video thumbnail" loading="lazy"><span class="video-badge">▶ VIDEO PROJECT</span>`:work.type==='video'?`<video src="${cleanText(work.src)}" muted playsinline preload="metadata"></video><span class="video-badge">▶ VIDEO PROJECT</span>`:`<img src="${cleanText(work.src)}" alt="${cleanText(work.title)}" loading="lazy">`;
    return `<article class="portfolio-card ${index===0?'wide':''} reveal" data-work-type="${cleanText(work.type)}" data-work-src="${cleanText(work.src)}" data-work-title="${cleanText(work.title)}" data-work-student="${cleanText(work.student)}" data-work-category="${cleanText(work.category)}"><div class="portfolio-media">${media}</div><div class="portfolio-info"><div><span>${cleanText(work.category)}</span><h3>${cleanText(work.title)}</h3><p>By ${cleanText(work.student)}</p></div><b>${String(index+1).padStart(2,'0')}</b></div></article>`;
  }).join('');
}
const lightbox=document.getElementById('portfolioLightbox'),lightboxStage=document.getElementById('lightboxStage');
document.querySelectorAll('.portfolio-card').forEach(card=>{
  const media=card.querySelector('.portfolio-media');
  if(!card.dataset.workSrc){const asset=media.querySelector('img,video');card.dataset.workSrc=asset?.getAttribute('src')||'';card.dataset.workType=asset?asset.tagName==='VIDEO'?'video':'image':'html';card.dataset.workTitle=card.querySelector('h3')?.textContent||'';card.dataset.workStudent=(card.querySelector('.portfolio-info p')?.textContent||'').replace(/^By /,'');card.dataset.workCategory=card.querySelector('.portfolio-info span')?.textContent||''}
  media.insertAdjacentHTML('beforeend','<button class="expand-work" aria-label="View project in full screen">⛶</button>');
  media.setAttribute('tabindex','0');media.setAttribute('role','button');
  const open=()=>{if(card.dataset.workType==='html'){const clone=media.cloneNode(true);clone.querySelector('.expand-work')?.remove();clone.removeAttribute('tabindex');lightboxStage.innerHTML='';lightboxStage.append(clone)}else lightboxStage.innerHTML=card.dataset.workType==='video'?`<video src="${card.dataset.workSrc}" controls autoplay playsinline></video>`:`<img src="${card.dataset.workSrc}" alt="${card.dataset.workTitle}">`;document.getElementById('lightboxTitle').textContent=card.dataset.workTitle;document.getElementById('lightboxStudent').textContent=`By ${card.dataset.workStudent}`;document.getElementById('lightboxCategory').textContent=card.dataset.workCategory;lightbox.hidden=false;document.body.classList.add('lightbox-open');lightbox.querySelector('.lightbox-close').focus()};
  media.addEventListener('click',open);media.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
});
function closeLightbox(){lightbox.hidden=true;lightboxStage.innerHTML='';document.body.classList.remove('lightbox-open')}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!lightbox.hidden)closeLightbox()});

const seoSettings=savedSiteData?.settings||{};
if(seoSettings.name){
  const place=seoSettings.locality||'Muzaffarnagar';
  const description=`${seoSettings.name} in ${place} offers practical Motion Graphics, Animation, Video Editing, Graphic Design and 3D Animation courses with portfolio development and placement support.`;
  document.getElementById('seoDescription').content=description;
  document.querySelector('meta[property="og:title"]').content=`Motion Graphics & Animation Institute in ${place} | ${seoSettings.name}`;
  document.querySelector('meta[property="og:description"]').content=description;
  if(seoSettings.website){const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=seoSettings.website.replace(/\/$/,'')+'/';document.head.append(canonical);const ogUrl=document.createElement('meta');ogUrl.setAttribute('property','og:url');ogUrl.content=canonical.href;document.head.append(ogUrl)}
  const schema={ '@context':'https://schema.org','@type':['EducationalOrganization','LocalBusiness'],name:seoSettings.name,description,url:seoSettings.website||undefined,telephone:seoSettings.phone?`+${String(seoSettings.phone).replace(/\D/g,'')}`:undefined,email:seoSettings.email||undefined,image:seoSettings.website?seoSettings.website.replace(/\/$/,'')+'/assets/mosaic-works-logo.png':undefined,address:{'@type':'PostalAddress',streetAddress:seoSettings.address||undefined,addressLocality:place,addressRegion:seoSettings.region||'Uttar Pradesh',postalCode:seoSettings.pincode||undefined,addressCountry:'IN'},areaServed:place,sameAs:[seoSettings.instagram,seoSettings.facebook,seoSettings.googleBusiness].filter(Boolean),hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative Media Courses',itemListElement:['Graphic Design Course','Photoshop Course','CorelDRAW Course','Adobe Illustrator Course','Canva Course','Video Editing Course','Adobe Premiere Pro Course','CapCut Editing Course','Motion Graphics Course','After Effects Course','2D Animation Course','3D Animation Course','VFX Course'].map(name=>({'@type':'Offer',itemOffered:{'@type':'Course',name,provider:{'@type':'EducationalOrganization',name:seoSettings.name}}}))}};
  const schemaScript=document.createElement('script');schemaScript.type='application/ld+json';schemaScript.textContent=JSON.stringify(schema);document.head.append(schemaScript);
}
const slider = document.getElementById('heroSlider'), dots = document.getElementById('sliderDots');
slider.innerHTML = heroBanners.map((b,i) => `<div class="hero-slide ${i===0?'active':''}">${b.type==='video'?`<video class="hero-image" src="${cleanText(b.src)}" muted loop autoplay playsinline></video>`:`<img class="hero-image" src="${cleanText(b.src)}" alt="Institute banner ${i+1}">`}</div>`).join('');
dots.innerHTML = heroBanners.map((_,i)=>`<button class="${i===0?'active':''}" aria-label="Banner ${i+1}" data-slide="${i}"></button>`).join('');
let currentSlide = 0, slideTimer;
function showSlide(index){currentSlide=(index+heroBanners.length)%heroBanners.length;document.querySelectorAll('.hero-slide').forEach((el,i)=>el.classList.toggle('active',i===currentSlide));dots.querySelectorAll('button').forEach((el,i)=>el.classList.toggle('active',i===currentSlide));document.getElementById('heroTitle').innerHTML=formatTitle(heroBanners[currentSlide].title);document.getElementById('heroDescription').textContent=heroBanners[currentSlide].description || '';clearInterval(slideTimer);if(heroBanners.length>1)slideTimer=setInterval(()=>showSlide(currentSlide+1),6500)}
dots.addEventListener('click',e=>{if(e.target.dataset.slide)showSlide(Number(e.target.dataset.slide))});
document.getElementById('prevSlide').addEventListener('click',()=>showSlide(currentSlide-1));document.getElementById('nextSlide').addEventListener('click',()=>showSlide(currentSlide+1));
if(heroBanners.length<2)document.querySelector('.slider-controls').hidden=true;showSlide(0);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('visible');
  observer.unobserve(entry.target);
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el = entry.target, target = Number(el.dataset.count), start = performance.now();
  const tick = now => { const p = Math.min((now-start)/1200, 1); el.textContent = Math.floor(target * (1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick); counterObserver.unobserve(el);
}), { threshold: .7 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

document.querySelectorAll('.filter-row button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('.filter-row .active').classList.remove('active'); btn.classList.add('active');
  document.querySelectorAll('.placement-card').forEach(card => card.classList.toggle('hidden', btn.dataset.filter !== 'all' && card.dataset.type !== btn.dataset.filter));
}));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

document.getElementById('enquiryForm').addEventListener('submit', e => {
  e.preventDefault(); const data = new FormData(e.currentTarget);
  const message = `Hi Mosaic Works Institute, my name is ${data.get('name')}. I would like information about the ${data.get('course')} course. My number is ${data.get('phone')}.`;
  const waPhone = (savedSiteData?.settings?.phone || '919876543210').replace(/\D/g,'');
  document.querySelector('.toast').classList.add('show');
  setTimeout(() => { document.querySelector('.toast').classList.remove('show'); window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener'); }, 500);
});
