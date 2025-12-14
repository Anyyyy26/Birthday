/* ---------- SCREEN FLOW ---------- */
const pages = [
  'screen-greet',
  'screen-intro',
  'screen-night',
  'screen-collage',
  'screen-envelope',
  'screen-final'
];

function show(id) {
  pages.forEach(p => {
    const el = document.getElementById(p);
    if (el) el.classList.toggle('active', p === id);
  });
}

/* Auto greet → intro */
setTimeout(() => show('screen-intro'), 4000);

/* ---------- BUTTONS ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const btnLets = document.getElementById('btn-lets');
  const btnLight = document.getElementById('btn-light');
  const btnOpen = document.getElementById('btn-open');

  if(btnLets) btnLets.onclick = () => show('screen-night');

  if(btnLight) btnLight.onclick = () => {
    document.body.classList.add('light-on'); // rose-golden bg
    playMusic();
    show('screen-collage');
    startCollage();
  };

  if(btnOpen) btnOpen.onclick = () => show('screen-final');
});

/* ---------- AUDIO ---------- */
const audioEl = document.getElementById('bg-audio');
function playMusic(){
  audioEl.src = 'audio/music.mp3'; // make sure this file exists
  audioEl.volume = 0.8;
  audioEl.play().catch(err=>{
    console.warn('Audio blocked until user interaction', err);
  });
}

/* ---------- IMAGES ---------- */
const zoomImg = document.getElementById('zoomImg');
const images = []; 

// preload images (must exist in /images)
for(let i=1;i<=24;i++){
  images.push(`images/img${i}.jpg`);
}

/* ---------- COLLAGE ---------- */
function startCollage(){
  let index = 0;

  function next(){
    if(index >= images.length){
      show('screen-envelope');
      return;
    }

    zoomImg.style.opacity = 0;
    zoomImg.style.transform = 'scale(1)';

    const img = new Image();
    img.src = images[index];

    img.onload = () => {
      zoomImg.src = img.src;
      zoomImg.style.opacity = 1;
      zoomImg.style.transform = 'scale(1.15)';
      index++;
      setTimeout(next, 4000);
    };

    img.onerror = () => {
      index++; // skip missing image
      next();
    };
  }

  next();
}
