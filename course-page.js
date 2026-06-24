const courseDefaults={
  motion:{title:'Motion Graphics Course in Muzaffarnagar',eyebrow:'After Effects · Motion Design · Muzaffarnagar',description:'Turn type, shapes, images and ideas into professional motion through structured After Effects practice and portfolio projects.',introTitle:'A motion graphics institute near you, built around projects',intro:'At Mosaic Works Institute in Muzaffarnagar, learners study After Effects, motion principles and visual storytelling in a classroom studio environment.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['After Effects workflow','Keyframes, easing and graph editor','Typography and logo animation','Masks, mattes and compositing','Sound sync and export settings','Motion design portfolio']},
  video:{title:'Professional Video Editing Course in Muzaffarnagar',eyebrow:'Premiere Pro · CapCut · Muzaffarnagar',description:'Learn editing grammar, story, sound, colour and export workflows through reels, YouTube, promotional and wedding-video projects.',introTitle:'Video editing classes near you',intro:'Mosaic Works Institute provides project-led video editing training in Muzaffarnagar for beginners, creators, wedding editors and aspiring professionals.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Instagram reels and short-form editing','YouTube video editing','Wedding highlight editing','Promotional and interview videos','Premiere Pro and CapCut workflows','Titles and basic After Effects integration']},
  graphic:{title:'Graphic Design Course in Muzaffarnagar',eyebrow:'Photoshop · Illustrator · CorelDRAW',description:'Learn graphic design, branding, typography, social media creatives and portfolio development with classroom-based practical training.',introTitle:'Graphic designing classes near you',intro:'Mosaic Works Institute offers classroom-based graphic designing training at Mahaveer Chowk, Muzaffarnagar for beginners, 12th-pass students, freelancers and career switchers.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Typography, colour and composition','Logo design and branding','Photoshop, CorelDRAW and Illustrator','Social media creatives','Print layouts and brochure design','Portfolio and freelancing preparation']},
  animation3d:{title:'3D Animation & Visualisation Course in Muzaffarnagar',eyebrow:'3D Animation · Visualisation · Coming Soon',description:'Our 3D animation and visualisation course page is coming soon. Contact Mosaic Works Institute for batch updates and counselling.',introTitle:'3D Animation course coming soon',intro:'This programme is being prepared for students interested in modelling, lighting, materials, animation and cinematic rendering.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Coming Soon',topics:['3D modelling fundamentals','Lighting and materials','Animation basics','Cinematic rendering','Portfolio planning','Batch details coming soon']}
};
const clean=value=>String(value||'').replace(/[<>]/g,'');
function driveEmbed(url){const raw=String(url||'').trim();const d=raw.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([A-Za-z0-9_-]+)/)||raw.match(/[?&]id=([A-Za-z0-9_-]+)/);if(d)return `https://drive.google.com/file/d/${d[1]}/preview`;const y=raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]+)/);if(y)return `https://www.youtube.com/embed/${y[1]}`;return ''}
function renderCoursePage(){
  const key=document.body.dataset.coursePage||'motion';
  const saved=(window.ONLINE_SITE_DATA||window.MOSAIC_SITE_DATA)?.coursePages?.[key]||{};
  const course={...courseDefaults[key],...saved};
  document.title=clean(course.title)+' | Mosaic Works Institute';
  const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=clean(course.description);
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=clean(value)};
  set('courseEyebrow',course.eyebrow);set('courseTitle',course.title);set('courseDescription',course.description);set('courseIntroTitle',course.introTitle);set('courseIntro',course.intro);set('courseStatus',course.status);
  const list=document.getElementById('courseTopics');if(list)list.innerHTML=(course.topics||[]).filter(Boolean).map(item=>`<li>${clean(item)}</li>`).join('');
  const media=document.getElementById('courseMedia');
  if(media){
    const embed=driveEmbed(course.mediaUrl);
    if(embed)media.innerHTML=`<iframe src="${embed}" title="${clean(course.title)} media" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    else if(course.mediaUrl&&course.mediaType==='video')media.innerHTML=`<video src="${clean(course.mediaUrl)}" controls preload="metadata" playsinline poster="${clean(course.thumbnail)}"></video>`;
    else media.innerHTML=`<img src="${clean(course.thumbnail||'assets/hero-students.png')}" alt="${clean(course.title)}">`;
  }
}
renderCoursePage();
