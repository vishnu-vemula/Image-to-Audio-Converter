function init(){
    gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

}

function HideBrowserScrollbar() {
  let scrollHide = document.createElement("style");
  scrollHide.innerHTML = `body::-webkit-scrollbar {display: none;}`;
  document.head.appendChild(scrollHide);
}
init()

var tl=gsap.timeline({
    scrollTrigger: {
        trigger: ".page h1",
        scroller: ".main",
        // markers:true,
        start: "top 30%",
        end: "top 0",
        scrub: 3
    }
})
tl.to('.page h1',{
 x:-100,
},'anim')
tl.to('.page h2',{
    x:100,
   },'anim')
   
tl.to('.page video',{
    width:'90%'
    
},'anim')

var tl2=gsap.timeline({
    scrollTrigger: {
        trigger: ".page ",
        scroller: ".main",
        // markers:true,
        start: "top -127%",
        end: "top -130%",
        scrub: 3
    }
})
tl2.to('.main',{
    backgroundColor:'#fff',
   
})

init()
var cursor=document.querySelector('.cursor')
var main=document.querySelector('.main')

main.addEventListener('mousemove',(dets)=>{
    cursor.style.left=dets.x+10+'px'
    cursor.style.top=dets.y+10+'px'
})

var tl3=gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -200%",
        end: "top -210%",
        scrub: 3
    }
})

tl3.to('.main',{
    backgroundColor:'#000',
    color:'#fff'
})

var boxselect=document.querySelectorAll('.box');
boxselect.forEach(
    function(element){
        element.addEventListener('mouseenter',()=>{
          var att= element.getAttribute('data-image')
          cursor.style.width='300px'
          cursor.style.borderRadius='0'
          cursor.style.height='300px'
          cursor.style.background=`url(${att})`
          cursor.style.opacity='100%'
        })
        element.addEventListener('mouseleave',()=>{
            // element.style.backgroundColor='black'
            cursor.style.width='10px'
          cursor.style.borderRadius='50%'
          cursor.style.height='10px'
          cursor.style.background=none
          cursor.style.opacity=0

        })
    }
);
var purple=document.querySelector('#purple')
var navheads=document.querySelectorAll('.navelem');
navheads.forEach(
    function(element){
        element.addEventListener('mouseenter',()=>{
            purple.style.opacity=0.9
            purple.style.display='block'
            cursor.style.width='100px'
            cursor.style.height='100px'
            


        })
        element.addEventListener('mouseleave',()=>{
            purple.style.opacity=0
            purple.style.display='none'
            cursor.style.width='10px'
            cursor.style.height='10px'
        })
    }
)