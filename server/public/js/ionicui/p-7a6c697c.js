import{c as o}from"./p-f1f22152.js";import{g as t}from"./p-1d074b74.js";import"./p-be7dc084.js";import"./p-22318485.js";import"./p-27fd00b4.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i=(i,r)=>{var a,n,p;const s="back"===r.direction,e=r.leavingEl,c=t(r.enteringEl),b=c.querySelector("ion-toolbar"),l=o();if(l.addElement(c).fill("both").beforeRemoveClass("ion-page-invisible"),s?l.duration((null!==(a=r.duration)&&void 0!==a?a:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):l.duration((null!==(n=r.duration)&&void 0!==n?n:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),b){const t=o();t.addElement(b),l.addAnimation(t)}if(e&&s){l.duration((null!==(p=r.duration)&&void 0!==p?p:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const i=o();i.addElement(t(e)).onFinish((o=>{1===o&&i.elements.length>0&&i.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),l.addAnimation(i)}return l};export{i as mdTransitionAnimation}