let banner=document.querySelector('.banner'),
ul=banner.querySelector('.list');
let left=0;
let btn_left=document.querySelector('.left_btn'),
    btn_right=document.querySelector(".right_btn");
let width=400;
let timer=null;
let bannerEvent=function bannerEvent(){
    timer=setInterval(()=>{
        left-=400;
        console.log(left);
        if(left==-2400){
            
            left=0;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${left}px)`;
        let l = ul.offsetHeight;
        left-=400;
        ul.style.transition = 'transform 1s';
        ul.style.transform = `translateX(${left}px)`;
        }else{
            ul.style.transition = 'transform 1s';
        ul.style.transform = `translateX(${left}px)`;
        }
    },2000);
}
bannerEvent();
banner.onmouseenter=function(){
    clearInterval(timer);
}
banner.onmouseleave=function(){
    bannerEvent();
}
btn_left.onclick=function(){
    if(left==0){
        left=-2000;
        ul.style.transition = 'null';
        ul.style.transform = `translateX(${left}px)`;
        l = ul.offsetHeight;
    }
    left+=400;
        ul.style.transition = 'transform 1s';
        ul.style.transform = `translateX(${left}px)`;
}
btn_right.onclick=function(){
    if(left==-2000){
        left=-0;
        ul.style.transition = 'null';
        ul.style.transform = `translateX(${left}px)`;
        l = ul.offsetHeight;
    }
    console.log(left);
    left-=400;
        ul.style.transition = 'transform 1s';
        ul.style.transform = `translateX(${left}px)`;
}