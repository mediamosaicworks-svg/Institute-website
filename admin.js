const KEY = 'mosaicSiteDataV3';
const ONLINE = location.protocol.startsWith('http') && location.pathname.toLowerCase().endsWith('.php');
const defaults = {
  settings:{name:'Mosaic Works Institute',logo:'assets/mosaic-works-logo.png',phone:'917217216035',email:'mediamosaicworks@gmail.com',instagram:'https://www.instagram.com/mosaic_works_institute/',facebook:'https://www.facebook.com/share/1VC8kk6S8E/',website:'https://mosaicworksinstitute.in',address:'Shop No. 16, Second Floor, Agarwal Market, Mahaveer Chowk, South Civil Lines, Muzaffarnagar, Uttar Pradesh 251001',locality:'Muzaffarnagar',region:'Uttar Pradesh',pincode:'251001',googleBusiness:''},
  banners:[{type:'image',src:'assets/hero-students.png',title:"Don't just learn.|*Create.* Showcase.|Move forward.",description:'Industry-focused training in Animation, Motion Graphics, Video Editing and Graphic Design—with live projects and placement support.'}],
  studentStory:{quote:'I learned more than software here—I learned how to *think.* My portfolio secured my first interview.',name:'Priya Kumari',meta:'Graphic Design Batch · 2025',initials:'PK',videoLabel:'MOSAIC WORKS STUDENT REVIEW',videoUrl:'',thumbnail:'',duration:'01:24',statOne:'50+',statOneLabel:'Industry mentors',statTwo:'4.9/5',statTwoLabel:'Student rating'},
  content:{bodyFont:'Manrope',headingFont:'Manrope',admissionsLabel:'Admissions Open · 2026 Batch',coursesButton:'Explore Courses',placementButton:'Placement Stories',coursesHeading:'Skills that work.|A *portfolio* that speaks.',coursesIntro:'Structured courses, mentor feedback and real-world briefs—from beginner to job-ready.',portfolioHeading:'Learned here.|*Created their own.*',portfolioIntro:'Selected student projects across editing, motion, animation and visual design.',placementsHeading:'Where talent met|*the right opportunity.*',placementsIntro:'Our learners have built careers in studios, agencies and content teams.',aboutHeading:'Less classroom.|More *creative studio.*',contactHeading:'Your creative career|*starts here.*',contactIntro:'Book a free counselling session. We will help you choose the right course and career path.',localHeading:'Graphic Design,|*Motion Graphics* and|Video Editing Courses in Muzaffarnagar',localIntro:'Mosaic Works Institute provides project-based graphic design, video editing, animation, VFX and motion graphics training in Muzaffarnagar.',course1Title:'Motion Graphics|& Animation',course1Desc:'After Effects, 2D/3D motion, title design and visual storytelling.',course2Title:'Video Editing|& Post Production',course2Desc:'Editing grammar, colour, sound and workflows from long-form videos to reels.',course3Title:'Graphic Design|& Branding',course3Desc:'Typography, identity, social creatives and print-ready brand systems.',course4Title:'3D Animation|& Visualisation',course4Desc:'Modelling, lighting, materials, animation and cinematic rendering.'},
  portfolio:[{type:'image',src:'assets/hero-students.png',title:'Neon City — Title Sequence',student:'Aarav Sharma',category:'Motion Graphics'}],
  students:[
    {name:'Aarav Sharma',role:'Motion Designer',type:'motion',company:'PixelCraft Studios · Noida',salary:'₹5.4 LPA'},
    {name:'Mehak Kaur',role:'Video Editor',type:'video',company:'Framebox Media · Delhi',salary:'₹4.8 LPA'},
    {name:'Rohan Patel',role:'Graphic Designer',type:'design',company:'BrandMint · Gurugram',salary:'₹4.5 LPA'},
    {name:'Sana Naqvi',role:'Jr. Animator',type:'motion',company:'ToonWorks · Mumbai',salary:'₹5.1 LPA'},
    {name:'Vishal Gupta',role:'Content Editor',type:'video',company:'Creator House · Jaipur',salary:'₹4.2 LPA'},
    {name:'Ananya Das',role:'Brand Designer',type:'design',company:'Studio North · Bengaluru',salary:'₹5.6 LPA'}
  ]
};
defaults.studentReviews=[cloneSafe(defaults.studentStory)];
defaults.coursePages={
  motion:{title:'Motion Graphics Course in Muzaffarnagar',eyebrow:'After Effects · Motion Design · Muzaffarnagar',description:'Turn type, shapes, images and ideas into professional motion through structured After Effects practice and portfolio projects.',introTitle:'A motion graphics institute near you, built around projects',intro:'At Mosaic Works Institute in Muzaffarnagar, learners study After Effects, motion principles and visual storytelling in a classroom studio environment.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['After Effects workflow','Keyframes, easing and graph editor','Typography and logo animation','Masks, mattes and compositing','Sound sync and export settings','Motion design portfolio']},
  video:{title:'Professional Video Editing Course in Muzaffarnagar',eyebrow:'Premiere Pro · CapCut · Muzaffarnagar',description:'Learn editing grammar, story, sound, colour and export workflows through reels, YouTube, promotional and wedding-video projects.',introTitle:'Video editing classes near you',intro:'Mosaic Works Institute provides project-led video editing training in Muzaffarnagar for beginners, creators, wedding editors and aspiring professionals.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Instagram reels and short-form editing','YouTube video editing','Wedding highlight editing','Promotional and interview videos','Premiere Pro and CapCut workflows','Titles and basic After Effects integration']},
  graphic:{title:'Graphic Design Course in Muzaffarnagar',eyebrow:'Photoshop · Illustrator · CorelDRAW',description:'Learn graphic design, branding, typography, social media creatives and portfolio development with classroom-based practical training.',introTitle:'Graphic designing classes near you',intro:'Mosaic Works Institute offers classroom-based graphic designing training at Mahaveer Chowk, Muzaffarnagar for beginners, 12th-pass students, freelancers and career switchers.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Admission Open',topics:['Typography, colour and composition','Logo design and branding','Photoshop, CorelDRAW and Illustrator','Social media creatives','Print layouts and brochure design','Portfolio and freelancing preparation']},
  animation3d:{title:'3D Animation & Visualisation Course in Muzaffarnagar',eyebrow:'3D Animation · Visualisation · Coming Soon',description:'Our 3D animation and visualisation course page is coming soon. Contact Mosaic Works Institute for batch updates and counselling.',introTitle:'3D Animation course coming soon',intro:'This programme is being prepared for students interested in modelling, lighting, materials, animation and cinematic rendering.',mediaUrl:'',mediaType:'image',thumbnail:'assets/hero-students.png',status:'Coming Soon',topics:['3D modelling fundamentals','Lighting and materials','Animation basics','Cinematic rendering','Portfolio planning','Batch details coming soon']}
};
function cloneSafe(value){return JSON.parse(JSON.stringify(value))}
const clone = value => JSON.parse(JSON.stringify(value));
let pendingImageJobs = 0;
let data = window.ONLINE_SITE_DATA ? clone(window.ONLINE_SITE_DATA) : null;
if (!data) { try { data=JSON.parse(localStorage.getItem(KEY)); } catch {} }
if (!data) data=clone(defaults);
if (!data.banners) data.banners=clone(defaults.banners);
data.studentStory={...defaults.studentStory,...(data.studentStory||{})};
if(!data.studentReviews)data.studentReviews=[data.studentStory];
data.studentReviews=data.studentReviews.slice(0,10).map(review=>({...defaults.studentStory,...review}));
if (!data.portfolio) data.portfolio=clone(defaults.portfolio);
if (!data.students) data.students=[];
data.content={...defaults.content,...(data.content||{})};
data.coursePages=data.coursePages||clone(defaults.coursePages);
Object.keys(defaults.coursePages).forEach(key=>{data.coursePages[key]={...defaults.coursePages[key],...(data.coursePages[key]||{})}});

if (ONLINE) {
  document.getElementById('modeLabel').textContent='Online mode';
  document.querySelector('.status').classList.add('online');
} else {
  document.getElementById('modeLabel').textContent='GitHub Pages mode';
}

const contentGroups=[
  {title:'Hero Buttons',fields:[['admissionsLabel','Admissions label'],['coursesButton','Courses button'],['placementButton','Placement button']]},
  {title:'Courses Section',fields:[['coursesHeading','Section heading'],['coursesIntro','Section description'],['course1Title','Course 1 title'],['course1Desc','Course 1 description'],['course2Title','Course 2 title'],['course2Desc','Course 2 description'],['course3Title','Course 3 title'],['course3Desc','Course 3 description'],['course4Title','Course 4 title'],['course4Desc','Course 4 description']]},
  {title:'Portfolio & Placements',fields:[['portfolioHeading','Portfolio heading'],['portfolioIntro','Portfolio description'],['placementsHeading','Placements heading'],['placementsIntro','Placements description']]},
  {title:'About & Contact',fields:[['aboutHeading','About heading'],['contactHeading','Contact heading'],['contactIntro','Contact description'],['localHeading','Local SEO heading'],['localIntro','Local SEO description']]}
];
const contentFields=document.getElementById('contentFields');
contentGroups.forEach(group=>{const box=document.createElement('div');box.className='content-group';box.innerHTML=`<h3>${group.title}</h3>`;group.fields.forEach(([key,label])=>{const field=document.createElement('label');field.textContent=label;const input=document.createElement(data.content[key]?.length>80?'textarea':'input');input.dataset.contentKey=key;input.value=data.content[key]||'';if(input.tagName==='TEXTAREA')input.rows=3;input.addEventListener('input',()=>data.content[key]=input.value);field.append(input);box.append(field)});contentFields.append(box)});
document.getElementById('bodyFont').value=data.content.bodyFont;document.getElementById('headingFont').value=data.content.headingFont;
document.getElementById('bodyFont').addEventListener('change',event=>data.content.bodyFont=event.target.value);document.getElementById('headingFont').addEventListener('change',event=>data.content.headingFont=event.target.value);

const form=document.getElementById('settingsForm');
Object.entries(data.settings).forEach(([key,value])=>{if(form.elements[key])form.elements[key].value=value});
document.getElementById('adminLogoPreview').src=data.settings.logo||'assets/mosaic-works-logo.png';
document.getElementById('logoInput').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;if(!file.type.startsWith('image/')){alert('Choose a PNG, JPG or WebP image for the logo.');return}const apply=url=>{data.settings.logo=url;document.getElementById('adminLogoPreview').src=url};if(ONLINE){try{apply((await uploadToServer(file)).url)}catch(error){alert(error.message)}}else localImage(file,apply)});
const list=document.getElementById('studentList');
const studentTemplate=document.getElementById('studentTemplate');

async function uploadToServer(file) {
  const body=new FormData(); body.append('file',file);
  const response=await fetch('api.php?action=upload',{method:'POST',body});
  const result=await response.json();
  if(!response.ok || !result.ok) throw new Error(result.error || 'Upload failed');
  return result;
}

function localImage(file, callback) {
  pendingImageJobs++;
  const finish=value=>{pendingImageJobs=Math.max(0,pendingImageJobs-1);callback(value)};
  const fail=message=>{pendingImageJobs=Math.max(0,pendingImageJobs-1);alert(message)};
  const readFile=blob=>{const reader=new FileReader();reader.onload=()=>finish(reader.result);reader.onerror=()=>fail('Unable to read this image. Please use JPG, PNG or WebP.');reader.readAsDataURL(blob)};
  if(file.size<=900000){readFile(file);return}
  const image=new Image();
  const objectUrl=URL.createObjectURL(file);
  image.onload=()=>{
    const maxSide=1600;
    const scale=Math.min(1,maxSide/Math.max(image.width,image.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(image.width*scale));
    canvas.height=Math.max(1,Math.round(image.height*scale));
    canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
    canvas.toBlob(blob=>{
      URL.revokeObjectURL(objectUrl);
      if(!blob){fail('Unable to optimise this image. Please use JPG, PNG or WebP.');return}
      if(blob.size>1400000){fail('This image is still too large. Please choose a smaller image.');return}
      readFile(blob);
    },'image/webp',0.8);
  };
  image.onerror=()=>{URL.revokeObjectURL(objectUrl);fail('Unable to read this image. Please use JPG, PNG or WebP.')};
  image.src=objectUrl;
}

function renderStudents(){
  list.innerHTML='';
  data.students.forEach((student,index)=>{
    const card=studentTemplate.content.firstElementChild.cloneNode(true);card.dataset.index=index;
    card.querySelectorAll('[data-field]').forEach(input=>{input.value=student[input.dataset.field]||'';input.addEventListener('input',()=>student[input.dataset.field]=input.value)});
    const preview=card.querySelector('.photo-preview');
    if(student.photo){preview.style.backgroundImage=`url(${student.photo})`;preview.textContent=''}
    card.querySelector('.photo-input').addEventListener('change',async event=>{
      const file=event.target.files[0];if(!file)return;
      if(!file.type.startsWith('image/')){alert('Choose an image for the student photo.');return}
      const apply=url=>{student.photo=url;preview.style.backgroundImage=`url(${url})`;preview.textContent=''};
      if(ONLINE){try{preview.textContent='UPLOADING…';apply((await uploadToServer(file)).url)}catch(error){preview.textContent='PHOTO';alert(error.message)}}else localImage(file,apply);
    });
    card.querySelector('.delete-btn').addEventListener('click',()=>{if(confirm('Delete this student?')){data.students.splice(index,1);renderStudents()}});
    list.append(card);
  });
}
renderStudents();

const bannerList=document.getElementById('bannerList');
const bannerTemplate=document.getElementById('bannerTemplate');
function updateBannerPreview(card,banner){
  const preview=card.querySelector('.banner-preview');preview.innerHTML='';preview.style.backgroundImage='';
  if(!banner.src){preview.textContent='MEDIA PREVIEW';return}
  if(banner.type==='video'){const video=document.createElement('video');video.src=banner.src;video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;preview.append(video)}
  else preview.style.backgroundImage=`url(${banner.src})`;
}
function renderBanners(){
  bannerList.innerHTML='';
  data.banners.forEach((banner,index)=>{
    const card=bannerTemplate.content.firstElementChild.cloneNode(true);card.querySelector('.banner-number').textContent=index+1;
    card.querySelectorAll('[data-banner-field]').forEach(input=>{input.value=banner[input.dataset.bannerField]||'';input.addEventListener('input',()=>{banner[input.dataset.bannerField]=input.value;updateBannerPreview(card,banner)})});
    card.querySelector('.banner-file').accept='image/*,video/mp4,video/webm';
    card.querySelector('.banner-file').addEventListener('change',async event=>{
      const file=event.target.files[0];if(!file)return;
      const apply=(url,type)=>{banner.type=type;banner.src=url;card.querySelector('[data-banner-field="type"]').value=type;card.querySelector('[data-banner-field="src"]').value=url;updateBannerPreview(card,banner)};
      if(ONLINE){try{card.querySelector('.banner-preview').textContent='UPLOADING…';const result=await uploadToServer(file);apply(result.url,result.type)}catch(error){alert(error.message);updateBannerPreview(card,banner)}}
      else if(file.type.startsWith('image/'))localImage(file,url=>apply(url,'image'));else alert('Enter a video URL or path in Local Mode. Direct uploads work with online hosting.');
    });
    card.querySelector('.delete-banner').addEventListener('click',()=>{if(data.banners.length===1){alert('At least one banner is required.');return}data.banners.splice(index,1);renderBanners()});
    updateBannerPreview(card,banner);bannerList.append(card);
  });
}
renderBanners();

const portfolioList=document.getElementById('portfolioList');
const portfolioTemplate=document.getElementById('portfolioTemplate');
function updateWorkPreview(card,work){const preview=card.querySelector('.work-preview');preview.innerHTML='';preview.style.backgroundImage='';preview.style.backgroundSize='cover';preview.style.backgroundPosition='center';if(!work.src){preview.textContent='WORK';return}if(work.type==='video'&&work.thumbnail)preview.style.backgroundImage=`url(${work.thumbnail})`;else if(work.type==='video'){const video=document.createElement('video');video.src=work.src;video.muted=true;video.controls=true;video.playsInline=true;preview.append(video)}else preview.style.backgroundImage=`url(${work.src})`}
function renderPortfolio(){portfolioList.innerHTML='';data.portfolio.forEach((work,index)=>{const card=portfolioTemplate.content.firstElementChild.cloneNode(true);card.querySelectorAll('[data-work-field]').forEach(input=>{input.value=work[input.dataset.workField]||'';input.addEventListener('input',()=>{work[input.dataset.workField]=input.value;updateWorkPreview(card,work)})});card.querySelector('.work-input').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;const apply=(url,type)=>{work.src=url;work.type=type;card.querySelector('[data-work-field="src"]').value=url;card.querySelector('[data-work-field="type"]').value=type;updateWorkPreview(card,work)};if(ONLINE){try{card.querySelector('.work-preview').textContent='UPLOADING…';const result=await uploadToServer(file);apply(result.url,result.type)}catch(error){alert(error.message);updateWorkPreview(card,work)}}else if(file.type.startsWith('image/'))localImage(file,url=>apply(url,'image'));else alert('Enter a video URL or path in Local Mode. Direct uploads work with online hosting.')});card.querySelector('.thumbnail-input').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;if(!file.type.startsWith('image/')){alert('Choose an image for the video thumbnail.');return}const apply=url=>{work.thumbnail=url;card.querySelector('[data-work-field="thumbnail"]').value=url;updateWorkPreview(card,work)};if(ONLINE){try{apply((await uploadToServer(file)).url)}catch(error){alert(error.message)}}else localImage(file,apply)});card.querySelector('.delete-work').addEventListener('click',()=>{if(confirm('Delete this portfolio project?')){data.portfolio.splice(index,1);renderPortfolio()}});updateWorkPreview(card,work);portfolioList.append(card)})}
renderPortfolio();

const coursePageList=document.getElementById('coursePageList');
const coursePageTemplate=document.getElementById('coursePageTemplate');
const courseMeta={
  motion:{label:'Motion Graphics & Animation',url:'motion-graphics-course-muzaffarnagar.html'},
  video:{label:'Video Editing & Post Production',url:'video-editing-course-muzaffarnagar.html'},
  graphic:{label:'Graphic Design & Branding',url:'graphic-design-course-muzaffarnagar.html'},
  animation3d:{label:'3D Animation & Visualisation',url:'three-d-animation-course-muzaffarnagar.html'}
};
function renderCoursePages(){
  if(!coursePageList||!coursePageTemplate)return;
  coursePageList.innerHTML='';
  Object.entries(courseMeta).forEach(([key,meta])=>{
    const course=data.coursePages[key];
    const card=coursePageTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector('.course-page-name').textContent=meta.label;
    card.querySelector('.view-course-link').href=meta.url;
    card.querySelectorAll('[data-course-field]').forEach(input=>{
      const field=input.dataset.courseField;
      input.value=field==='topicsText'?(course.topics||[]).join('\n'):(course[field]||'');
      input.addEventListener('input',()=>{
        if(field==='topicsText')course.topics=input.value.split('\n').map(x=>x.trim()).filter(Boolean);
        else course[field]=input.value;
      });
    });
    coursePageList.append(card);
  });
}
renderCoursePages();

const storyForm=document.getElementById('storyForm');
const reviewList=document.getElementById('reviewList');
const reviewTemplate=document.getElementById('reviewTemplate');
const addReview=document.getElementById('addReview');
function renderReviews(){
  if(!reviewList||!reviewTemplate)return;
  reviewList.innerHTML='';
  data.studentReviews.forEach((review,index)=>{
    const card=reviewTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector('.review-number').textContent=index+1;
    card.querySelectorAll('[data-review-field]').forEach(input=>{
      const field=input.dataset.reviewField;
      input.value=review[field]||'';
      input.addEventListener('input',()=>{review[field]=input.value});
    });
    card.querySelector('.delete-review').addEventListener('click',()=>{
      if(data.studentReviews.length===1){alert('At least 1 review is required.');return}
      if(confirm('Delete this review video?')){data.studentReviews.splice(index,1);renderReviews()}
    });
    reviewList.append(card);
  });
}
if(addReview)addReview.addEventListener('click',()=>{
  if(data.studentReviews.length>=10){alert('Maximum 10 review videos add kar sakte ho.');return}
  data.studentReviews.push({...defaults.studentStory,name:'New Student',initials:'NS',meta:'Graphic Design Batch · 2026',quote:'Student review quote here.',videoUrl:'',thumbnail:''});
  renderReviews();
});
renderReviews();
function syncStory(){data.studentReviews=data.studentReviews.slice(0,10).map(review=>({...defaults.studentStory,...review}));data.studentStory=data.studentReviews[0]||clone(defaults.studentStory)}
const storyButton=document.createElement('button');
storyButton.type='button';storyButton.dataset.tab='story';storyButton.textContent='▶ Review Video';
document.querySelector('.sidebar nav button[data-tab="banners"]')?.after(storyButton);

document.querySelectorAll('.sidebar nav button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.sidebar nav .active').classList.remove('active');btn.classList.add('active');document.querySelector('.panel.active').classList.remove('active');document.getElementById(btn.dataset.tab).classList.add('active');document.querySelector('.sidebar').classList.remove('open')}));
document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
document.getElementById('addStudent').addEventListener('click',()=>{if(data.students.length>=50){alert('You can add up to 50 students.');return}data.students.push({name:'New Student',role:'Job Role',type:'design',company:'Company · City',salary:'₹0 LPA'});renderStudents()});
document.getElementById('addBanner').addEventListener('click',()=>{if(data.banners.length>=3){alert('You can add up to 3 banners.');return}data.banners.push({type:'image',src:'assets/hero-students.png',title:'New Banner Text',description:'Enter the banner description here.'});renderBanners()});
document.getElementById('addPortfolio').addEventListener('click',()=>{if(data.portfolio.length>=12){alert('Keep up to 12 portfolio projects for a smooth website.');return}data.portfolio.push({type:'image',src:'assets/hero-students.png',title:'New Project',student:'Student Name',category:'Course'});renderPortfolio()});

async function saveAll(button){
  if(pendingImageJobs){alert('Image is still processing. Wait for its preview, then click Save again.');return}
  data.settings={...data.settings,...Object.fromEntries(new FormData(form))};
  syncStory();
  button.disabled=true;button.textContent='Saving…';
  try{
    if(ONLINE){const response=await fetch('api.php?action=save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error||'Save failed')}
    else localStorage.setItem(KEY,JSON.stringify(data));
    const toast=document.querySelector('.toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200);
  }catch(error){alert(error.message||'Unable to save changes.')}finally{button.disabled=false;button.textContent=button.dataset.save==='students'?'Save Placements':button.dataset.save==='banners'?'Save Banners':button.dataset.save==='portfolio'?'Save Portfolio':button.dataset.save==='story'?'Save Review Video':button.dataset.save==='content'?'Save Page Content':'Save Changes'}
}
document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>saveAll(btn)));

document.getElementById('downloadSiteData').addEventListener('click',()=>{
  if(pendingImageJobs){alert('Image is still processing. Wait for its preview, then download again.');return}
  data.settings={...data.settings,...Object.fromEntries(new FormData(form))};
  syncStory();
  localStorage.setItem(KEY,JSON.stringify(data));
  const fileContent=`// Published from the Mosaic Works admin panel.\nwindow.ONLINE_SITE_DATA = ${JSON.stringify(data,null,2)};\n`;
  const blob=new Blob([fileContent],{type:'text/javascript;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;
  link.download='site-data.js';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
