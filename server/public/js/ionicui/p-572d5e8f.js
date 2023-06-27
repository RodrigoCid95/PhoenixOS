import{c as t}from"./p-f1f22152.js";import{g as n}from"./p-1d074b74.js";import"./p-be7dc084.js";import"./p-22318485.js";import"./p-27fd00b4.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=t=>document.querySelector(`${t}.ion-cloned-element`),a=t=>t.shadowRoot||t,e=t=>{const n="ION-TABS"===t.tagName?t:t.querySelector("ion-tabs"),o="ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";if(null!=n){const t=n.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");return null!=t?t.querySelector(o):null}return t.querySelector(o)},s=(t,n)=>{const o="ION-TABS"===t.tagName?t:t.querySelector("ion-tabs");let a=[];if(null!=o){const t=o.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");null!=t&&(a=t.querySelectorAll("ion-buttons"))}else a=t.querySelectorAll("ion-buttons");for(const t of a){const o=t.closest("ion-header"),a=o&&!o.classList.contains("header-collapse-condense-inactive"),e=t.querySelector("ion-back-button"),s=t.classList.contains("buttons-collapse"),r="start"===t.slot||""===t.slot;if(null!==e&&r&&(s&&a&&n||!s))return e}return null},r=(n,e,s,r,l,i)=>{const c=e?`calc(100% - ${i.right+4}px)`:i.left-4+"px",p=e?"7px":"-7px",f=e?"-4px":"4px",d=e?"-4px":"4px",$=e?"right":"left",b=e?"left":"right",u=s?[{offset:0,opacity:1,transform:`translate3d(${f}, ${i.top-46}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${p}, ${l.top-40}px, 0) scale(2.1)`}]:[{offset:0,opacity:0,transform:`translate3d(${p}, ${l.top-40}px, 0) scale(2.1)`},{offset:1,opacity:1,transform:`translate3d(${f}, ${i.top-46}px, 0) scale(1)`}],m=s?[{offset:0,opacity:1,transform:`translate3d(${d}, ${i.top-46}px, 0) scale(1)`},{offset:.2,opacity:0,transform:`translate3d(${d}, ${i.top-41}px, 0) scale(0.6)`},{offset:1,opacity:0,transform:`translate3d(${d}, ${i.top-41}px, 0) scale(0.6)`}]:[{offset:0,opacity:0,transform:`translate3d(${d}, ${i.top-41}px, 0) scale(0.6)`},{offset:1,opacity:1,transform:`translate3d(${d}, ${i.top-46}px, 0) scale(1)`}],y=t(),X=t(),x=o("ion-back-button"),h=a(x).querySelector(".button-text"),g=a(x).querySelector("ion-icon");x.text=r.text,x.mode=r.mode,x.icon=r.icon,x.color=r.color,x.disabled=r.disabled,x.style.setProperty("display","block"),x.style.setProperty("position","fixed"),X.addElement(g),y.addElement(h),y.beforeStyles({"transform-origin":`${$} center`}).beforeAddWrite((()=>{r.style.setProperty("display","none"),x.style.setProperty($,c)})).afterAddWrite((()=>{r.style.setProperty("display",""),x.style.setProperty("display","none"),x.style.removeProperty($)})).keyframes(u),X.beforeStyles({"transform-origin":`${b} center`}).keyframes(m),n.addAnimation([y,X])},l=(n,a,e,s,r,l)=>{const i=a?`calc(100% - ${r.right}px)`:`${r.left}px`,c=a?"-18px":"18px",p=a?"right":"left",f=e?[{offset:0,opacity:0,transform:`translate3d(${c}, ${l.top-4}px, 0) scale(0.49)`},{offset:.1,opacity:0},{offset:1,opacity:1,transform:`translate3d(0, ${r.top-2}px, 0) scale(1)`}]:[{offset:0,opacity:.99,transform:`translate3d(0, ${r.top-2}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${c}, ${l.top-4}px, 0) scale(0.5)`}],d=o("ion-title"),$=t();d.innerText=s.innerText,d.size=s.size,d.color=s.color,$.addElement(d),$.beforeStyles({"transform-origin":`${p} center`,height:"46px",display:"",position:"relative",[p]:i}).beforeAddWrite((()=>{s.style.setProperty("display","none")})).afterAddWrite((()=>{s.style.setProperty("display",""),d.style.setProperty("display","none")})).keyframes(f),n.addAnimation($)},i=(o,i)=>{var c;try{const p="cubic-bezier(0.32,0.72,0,1)",f="opacity",d="transform",$="0%",b=.8,u="rtl"===o.ownerDocument.dir,m=u?"-99.5%":"99.5%",y=u?"33%":"-33%",X=i.enteringEl,x=i.leavingEl,h="back"===i.direction,g=X.querySelector(":scope > ion-content"),v=X.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),k=X.querySelectorAll(":scope > ion-header > ion-toolbar"),w=t(),T=t();if(w.addElement(X).duration((null!==(c=i.duration)&&void 0!==c?c:0)||540).easing(i.easing||p).fill("both").beforeRemoveClass("ion-page-invisible"),x&&null!=o){const n=t();n.addElement(o),w.addAnimation(n)}if(g||0!==k.length||0!==v.length?(T.addElement(g),T.addElement(v)):T.addElement(X.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),w.addAnimation(T),h?T.beforeClearStyles([f]).fromTo("transform",`translateX(${y})`,`translateX(${$})`).fromTo(f,b,1):T.beforeClearStyles([f]).fromTo("transform",`translateX(${m})`,`translateX(${$})`),g){const n=a(g).querySelector(".transition-effect");if(n){const o=n.querySelector(".transition-cover"),a=n.querySelector(".transition-shadow"),e=t(),s=t(),r=t();e.addElement(n).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),s.addElement(o).beforeClearStyles([f]).fromTo(f,0,.1),r.addElement(a).beforeClearStyles([f]).fromTo(f,.03,.7),e.addAnimation([s,r]),T.addAnimation([e])}}const j=X.querySelector("ion-header.header-collapse-condense"),{forward:A,backward:B}=((t,n,o,a,i)=>{const c=s(a,o),p=e(i),f=e(a),d=s(i,o),$=null!==c&&null!==p&&!o,b=null!==f&&null!==d&&o;if($){const a=p.getBoundingClientRect(),e=c.getBoundingClientRect();l(t,n,o,p,a,e),r(t,n,o,c,a,e)}else if(b){const a=f.getBoundingClientRect(),e=d.getBoundingClientRect();l(t,n,o,f,a,e),r(t,n,o,d,a,e)}return{forward:$,backward:b}})(w,u,h,X,x);if(k.forEach((n=>{const o=t();o.addElement(n),w.addAnimation(o);const e=t();e.addElement(n.querySelector("ion-title"));const s=t(),r=Array.from(n.querySelectorAll("ion-buttons,[menuToggle]")),l=n.closest("ion-header"),i=null==l?void 0:l.classList.contains("header-collapse-condense-inactive");let c;c=r.filter(h?t=>{const n=t.classList.contains("buttons-collapse");return n&&!i||!n}:t=>!t.classList.contains("buttons-collapse")),s.addElement(c);const p=t();p.addElement(n.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));const d=t();d.addElement(a(n).querySelector(".toolbar-background"));const b=t(),X=n.querySelector("ion-back-button");if(X&&b.addElement(X),o.addAnimation([e,s,p,d,b]),s.fromTo(f,.01,1),p.fromTo(f,.01,1),h)i||e.fromTo("transform",`translateX(${y})`,`translateX(${$})`).fromTo(f,.01,1),p.fromTo("transform",`translateX(${y})`,`translateX(${$})`),b.fromTo(f,.01,1);else if(j||e.fromTo("transform",`translateX(${m})`,`translateX(${$})`).fromTo(f,.01,1),p.fromTo("transform",`translateX(${m})`,`translateX(${$})`),d.beforeClearStyles([f,"transform"]),(null==l?void 0:l.translucent)?d.fromTo("transform",u?"translateX(-100%)":"translateX(100%)","translateX(0px)"):d.fromTo(f,.01,"var(--opacity)"),A||b.fromTo(f,.01,1),X&&!A){const n=t();n.addElement(a(X).querySelector(".button-text")).fromTo("transform",u?"translateX(-100px)":"translateX(100px)","translateX(0px)"),o.addAnimation(n)}})),x){const o=t(),e=x.querySelector(":scope > ion-content"),s=x.querySelectorAll(":scope > ion-header > ion-toolbar"),r=x.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");if(e||0!==s.length||0!==r.length?(o.addElement(e),o.addElement(r)):o.addElement(x.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),w.addAnimation(o),h){o.beforeClearStyles([f]).fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)");const t=n(x);w.afterAddWrite((()=>{"normal"===w.getDirection()&&t.style.setProperty("display","none")}))}else o.fromTo("transform",`translateX(${$})`,`translateX(${y})`).fromTo(f,1,b);if(e){const n=a(e).querySelector(".transition-effect");if(n){const a=n.querySelector(".transition-cover"),e=n.querySelector(".transition-shadow"),s=t(),r=t(),l=t();s.addElement(n).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),r.addElement(a).beforeClearStyles([f]).fromTo(f,.1,0),l.addElement(e).beforeClearStyles([f]).fromTo(f,.7,.03),s.addAnimation([r,l]),o.addAnimation([s])}}s.forEach((n=>{const o=t();o.addElement(n);const e=t();e.addElement(n.querySelector("ion-title"));const s=t(),r=n.querySelectorAll("ion-buttons,[menuToggle]"),l=n.closest("ion-header"),i=null==l?void 0:l.classList.contains("header-collapse-condense-inactive"),c=Array.from(r).filter((t=>{const n=t.classList.contains("buttons-collapse");return n&&!i||!n}));s.addElement(c);const p=t(),b=n.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");b.length>0&&p.addElement(b);const m=t();m.addElement(a(n).querySelector(".toolbar-background"));const X=t(),x=n.querySelector("ion-back-button");if(x&&X.addElement(x),o.addAnimation([e,s,p,X,m]),w.addAnimation(o),X.fromTo(f,.99,0),s.fromTo(f,.99,0),p.fromTo(f,.99,0),h){if(i||e.fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)").fromTo(f,.99,0),p.fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)"),m.beforeClearStyles([f,"transform"]),(null==l?void 0:l.translucent)?m.fromTo("transform","translateX(0px)",u?"translateX(-100%)":"translateX(100%)"):m.fromTo(f,"var(--opacity)",0),x&&!B){const n=t();n.addElement(a(x).querySelector(".button-text")).fromTo("transform",`translateX(${$})`,`translateX(${(u?-124:124)+"px"})`),o.addAnimation(n)}}else i||e.fromTo("transform",`translateX(${$})`,`translateX(${y})`).fromTo(f,.99,0).afterClearStyles([d,f]),p.fromTo("transform",`translateX(${$})`,`translateX(${y})`).afterClearStyles([d,f]),X.afterClearStyles([f]),e.afterClearStyles([f]),s.afterClearStyles([f])}))}return w}catch(t){throw t}};export{i as iosTransitionAnimation,a as shadow}