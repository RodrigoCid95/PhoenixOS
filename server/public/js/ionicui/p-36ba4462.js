import{h as t}from"./p-22318485.js";import{i as o}from"./p-506221fe.js";import{createGesture as r}from"./p-0b857c77.js";import"./p-6396c013.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const s=(s,e,n,c,a)=>{const p=s.ownerDocument.defaultView;let i=o(s);const m=t=>i?-t.deltaX:t.deltaX;return r({el:s,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>(i=o(s),(t=>{const{startX:o}=t;return i?o>=p.innerWidth-50:o<=50})(t)&&e()),onStart:n,onMove:t=>{const o=m(t);c(o/p.innerWidth)},onEnd:o=>{const r=m(o),s=p.innerWidth,e=r/s,n=(t=>i?-t.velocityX:t.velocityX)(o),c=n>=0&&(n>.2||r>s/2),f=(c?1-e:e)*s;let h=0;if(f>5){const t=f/Math.abs(n);h=Math.min(t,540)}a(c,e<=0?.01:t(0,e,.9999),h)}})};export{s as createSwipeBackGesture}