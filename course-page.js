const courseDefaults={
  motion:{title:'Motion Graphics Course in Muzaffarnagar',eyebrow:'After Effects · Motion Design · Muzaffarnagar',description:'Turn type, shapes, images and ideas into professional motion through structured After Effects practice and portfolio projects.',bannerUrl:'',bannerPosition:'center center',introTitle:'A motion graphics institute near you, built around projects',intro:'At Mosaic Works Institute in Muzaffarnagar, learners study After Effects, motion principles and visual storytelling in a classroom studio environment.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['After Effects workflow','Keyframes, easing and graph editor','Typography and logo animation','Masks, mattes and compositing','Sound sync and export settings','Motion design portfolio']},
  video:{title:'Professional Video Editing Course in Muzaffarnagar',eyebrow:'Premiere Pro · CapCut · Muzaffarnagar',description:'Learn editing grammar, story, sound, colour and export workflows through reels, YouTube, promotional and wedding-video projects.',bannerUrl:'',bannerPosition:'center center',introTitle:'Video editing classes near you',intro:'Mosaic Works Institute provides project-led video editing training in Muzaffarnagar for beginners, creators, wedding editors and aspiring professionals.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Instagram reels and short-form editing','YouTube video editing','Wedding highlight editing','Promotional and interview videos','Premiere Pro and CapCut workflows','Titles and basic After Effects integration']},
  graphic:{title:'Graphic Design Course in Muzaffarnagar',eyebrow:'Photoshop · Illustrator · CorelDRAW',description:'Learn graphic design, branding, typography, social media creatives and portfolio development with classroom-based practical training.',bannerUrl:'',bannerPosition:'center center',introTitle:'Graphic designing classes near you',intro:'Mosaic Works Institute offers classroom-based graphic designing training at Mahaveer Chowk, Muzaffarnagar for beginners, 12th-pass students, freelancers and career switchers.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Typography, colour and composition','Logo design and branding','Photoshop, CorelDRAW and Illustrator','Social media creatives','Print layouts and brochure design','Portfolio and freelancing preparation']},
  animation:{title:'Animation Course in Muzaffarnagar for Creative Careers',eyebrow:'Animation Institute · Muzaffarnagar',description:'Learn animation fundamentals, visual storytelling and production workflows through practical projects, portfolio guidance and career support.',bannerUrl:'',bannerPosition:'center center',introTitle:'Looking for an animation institute near you?',intro:'Mosaic Works Institute offers classroom-based animation training at Mahaveer Chowk, Muzaffarnagar, with project work, mentor feedback and portfolio guidance.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Animation principles and storyboarding','2D motion and character basics','3D modelling, lighting and animation foundations','Showreel and portfolio development','Freelance and interview preparation']},
  animation3d:{title:'3D Animation & Visualisation Course in Muzaffarnagar',eyebrow:'3D Animation · Visualisation · Coming Soon',description:'Our 3D animation and visualisation course page is coming soon. Contact Mosaic Works Institute for batch updates and counselling.',bannerUrl:'',bannerPosition:'center center',introTitle:'3D Animation course coming soon',intro:'This programme is being prepared for students interested in modelling, lighting, materials, animation and cinematic rendering.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Coming Soon',topics:['3D modelling fundamentals','Lighting and materials','Animation basics','Cinematic rendering','Portfolio planning','Batch details coming soon']}
};
const clean=value=>String(value||'').replace(/[<>]/g,'');
function isDriveFolder(url){return /drive\.google\.com\/(?:drive\/)?folders\//i.test(String(url||''))}
function driveFileId(url){const raw=String(url||'').trim();const d=raw.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/)||raw.match(/[?&]id=([A-Za-z0-9_-]+)/);return d?.[1]||''}
function driveImage(id){return `https://drive.google.com/uc?export=view&id=${id}`}
function mediaEmbed(url){const raw=String(url||'').trim();if(!raw)return {type:'none'};if(isDriveFolder(raw))return {type:'folder',src:raw};const d=driveFileId(raw);if(d)return {type:'iframe',src:`https://drive.google.com/file/d/${d}/preview`,image:driveImage(d)};const y=raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]+)/);if(y)return {type:'iframe',src:`https://www.youtube.com/embed/${y[1]}`};return {type:'direct',src:raw}}
function courseMediaNotice(link){return `<div class="course-media-note"><strong>Drive folder link display nahi hota.</strong><p>Folder ke andar exact file open karke Share > Anyone with link > Copy link lagao.</p>${link?`<a href="${clean(link)}" target="_blank" rel="noopener">Open Drive folder</a>`:''}</div>`}
function renderCoursePage(){
  const key=document.body.dataset.coursePage||'motion';
  const saved=(window.ONLINE_SITE_DATA||window.MOSAIC_SITE_DATA)?.coursePages?.[key]||{};
  const course={...courseDefaults[key],...saved};
  document.title=clean(course.title)+' | Mosaic Works Institute';
  const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=clean(course.description);
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=clean(value)};
  set('courseEyebrow',course.eyebrow);set('courseTitle',course.title);set('courseDescription',course.description);set('courseIntroTitle',course.introTitle);set('courseIntro',course.intro);set('courseStatus',course.status);
  const hero=document.querySelector('.seo-hero');
  if(hero&&course.bannerUrl){
    hero.style.backgroundImage=`linear-gradient(90deg,rgba(17,18,17,.96) 0%,rgba(17,18,17,.82) 42%,rgba(17,18,17,.42) 100%),url('${clean(course.bannerUrl)}')`;
    hero.style.backgroundSize='cover';
    hero.style.backgroundPosition=clean(course.bannerPosition||'center center');
  }
  const list=document.getElementById('courseTopics');if(list)list.innerHTML=(course.topics||[]).filter(Boolean).map(item=>`<li>${clean(item)}</li>`).join('');
  const media=document.getElementById('courseMedia');
  if(media){
    const embed=mediaEmbed(course.mediaUrl);
    if(embed.type==='folder')media.innerHTML=courseMediaNotice(embed.src);
    else if(embed.type==='iframe')media.innerHTML=`<iframe src="${embed.src}" title="${clean(course.title)} media" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    else if(course.mediaUrl&&course.mediaType==='video')media.innerHTML=`<video src="${clean(embed.src||course.mediaUrl)}" controls preload="metadata" playsinline poster="${clean(course.thumbnail)}"></video>`;
    else if(course.mediaUrl&&course.mediaType==='image'&&driveFileId(course.mediaUrl))media.innerHTML=`<img src="${clean(driveImage(driveFileId(course.mediaUrl)))}" alt="${clean(course.title)}">`;
    else {const thumbId=driveFileId(course.thumbnail);media.innerHTML=`<img src="${clean(thumbId?driveImage(thumbId):(course.thumbnail||'assets/hero-students.png'))}" alt="${clean(course.title)}">`;}
  }
}
renderCoursePage();
