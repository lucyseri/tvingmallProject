'use strict';


const gallery = document.querySelector('.gallery');
const galleryUl = gallery.querySelector('ul');
const galleryUlLi = galleryUl.querySelectorAll('li');

const items=document.querySelector('.items');
const itemsUl=items.querySelector('ul');
const itemsUlLi=itemsUl.querySelectorAll('li');

const gap1 = galleryUlLi[3].offsetLeft - galleryUlLi[2].offsetLeft;
const gap2 = galleryUlLi[2].offsetLeft - galleryUlLi[0].offsetLeft;


const arrBg = [];

//1. background
for (let i = 0; i < galleryUlLi.length; i++) {
  arrBg.push(`url(img/b${i}.jpg) no-repeat 50%/cover`);
  galleryUlLi[i].style.background = arrBg[i]
}


//2. autogallery & 해당 items에 배경색 주기
let i = 1;

function autoGallery() {
  i++;

  const goto = (-i * gap1) + 'px';

  if (i <= 1) {
    gallery.style.left = "-" + galleryUlLi[4].offsetLeft + "px";
    gallery.style.transition = 0 + "ms";

    i = galleryUlLi.length - 2;
  } else if (i > galleryUlLi.length - 2) {

    gallery.style.left = "-" + gap2 + "px";
    gallery.style.transition = 0 + "ms";

    i = 2;
    setTimeout(autoGallery, 0);

  } else {
    gallery.style.left = goto;
    gallery.style.transition = 300 + "ms";
  }

  itemsUlLi.forEach((el, idx)=>{
    let startNum=i-2;
    if(i==galleryUlLi.length-2){
      startNum=0;
    }
    if(startNum==idx){
      el.classList.add('on');
    }else{
      el.classList.remove('on');
    }
  })
}

let setIn = setInterval(autoGallery, 3000);

(() => {
  autoGallery()
})();


itemsUl.addEventListener('mouseover', itemEvent);
itemsUl.addEventListener('mouseout', itemEvent);
itemsUl.addEventListener('click', itemEvent);

function itemEvent(e){
  if(e.type=='mouseover'){
    itemsUlLi.forEach((el, idx)=>{
      if(el==e.target){
        clearInterval(setIn)
      }
    })
  }else if(e.type=='mouseout'){
    itemsUlLi.forEach((el, idx)=>{
      if(el==e.target){
        setIn=setInterval(autoGallery, 3000);
      }
    })
  }else if(e.type=='click'){
    itemsUlLi.forEach((el, idx)=>{
      if(el==e.target){
        el.classList.add('on')

          let idx2=idx+2;

          const goto = (-idx2 * gap1) + 'px';

          gallery.style.left = goto;
          gallery.style.transition = 300 + "ms";

        if(idx2>itemsUlLi.length-1){
          idx2=idx+2;
        }

          i=idx2;

      }else{
        el.classList.remove('on')
      }
    })
  }
};

const leftArrow = document.querySelector('span.left')
const rightArrow = document.querySelector('span.right')

const slideGallery = document.querySelector('.slide-gallery');
const slideGalleryUl = slideGallery.querySelector('ul');
const slideGalleryUlLi = slideGalleryUl.querySelectorAll('li');

const sec2Items = document.querySelector('.sec2-items');
const sec2ItemsUl = sec2Items.querySelector('ul');
const sec2ItemsUlLi = sec2ItemsUl.querySelectorAll('li');

function sec2Go(num){
  const sec2gap = slideGalleryUlLi[5].offsetLeft - slideGalleryUlLi[0].offsetLeft;
  const sec2goto = (-num * sec2gap) + 'px';
  slideGallery.style.left = sec2goto;
  slideGallery.style.transition = 'all 0.3s';
}

//sec2
let i2 = 0;

leftArrow.addEventListener('click', () => {
  if (i2 >= 2) i2 = -1;

  i2++;

  sec2Go(i2);

})
rightArrow.addEventListener('click', () => {
  if (i2 <= 0) i2 = 3;

  i2--;

  sec2Go(i2);

})


sec2ItemsUl.addEventListener('click', (e) => {
  sec2ItemsUlLi.forEach((el, idx) => {
    if (el == e.target) {
      el.classList.add('on');

      const sec2gap = slideGalleryUlLi[4].offsetLeft - slideGalleryUlLi[0].offsetLeft;
      const sec2goto = (-idx * sec2gap) + 'px';
      slideGallery.style.left = sec2goto;
      slideGallery.style.transition = 'all 0.3s';

    } else {
      el.classList.remove('on');
    }
  })
})

const sec4=document.querySelector('.section.sec4');
const sec4ArrowLeft=sec4.querySelector('span.arrow.left')
const sec4ArrowRight=sec4.querySelector('span.arrow.right')

const sec4Thum=document.querySelector('.thum-icon')
const sec4ThumUl=sec4Thum.querySelector('ul');
const sec4ThumUlLi=sec4ThumUl.querySelectorAll('li');

const poster=document.querySelector('.poster');
const rightCon=document.querySelectorAll('.right-con');

sec4ArrowLeft.addEventListener('click', ()=>{

  const sec4Gap=sec4ThumUlLi[1].offsetLeft-sec4ThumUlLi[0].offsetLeft;
  const sec4Goto=(-sec4Gap) + 'px';
  sec4Thum.style.left=sec4Goto;
})
sec4ArrowRight.addEventListener('click', ()=>{

  sec4Thum.style.left=0;
})

sec4ThumUl.addEventListener('click', (e)=>{
  const parentTarget=e.target.parentElement;
  console.log(parentTarget)

  sec4ThumUlLi.forEach((el, idx)=>{
    if(el==parentTarget){
      poster.style.background=`url(../../img/poster${idx}.jpg) no-repeat 50%/cover`;
      
      rightCon.forEach((el2, idx2)=>{
        if(idx2==idx){
          el2.classList.add('click');
        }else{
          
          el2.classList.remove('click');
        }
      })
      
    }

  })

  
})