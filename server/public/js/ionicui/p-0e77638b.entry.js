import{r as t,d as o,w as i,h as a,H as r,c as e}from"./p-27fd00b4.js";import{a as s,i as n,d,r as h,f as p,p as l}from"./p-09c49e1c.js";import{C as c,a as m,d as b}from"./p-41d99575.js";import{g as f,h as u,b as v,d as w,n as x}from"./p-22318485.js";import{p as g}from"./p-28e84784.js";import{w as k}from"./p-be7dc084.js";import{G as y,a as A,B as D,b as B,s as Y,d as M,h as E,e as j,f as C}from"./p-1a6557eb.js";import{g as S}from"./p-0e4de1d0.js";import{d as O,w as P}from"./p-1d074b74.js";import{g as $,c as T}from"./p-c5fce703.js";import{KEYBOARD_DID_OPEN as z}from"./p-5627b71a.js";import{c as I}from"./p-f1f22152.js";import{g as W}from"./p-2f802871.js";import{createGesture as L}from"./p-0b857c77.js";import"./p-add30d46.js";import"./p-7e6e551b.js";import"./p-6396c013.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var R;!function(t){t.Dark="DARK",t.Light="LIGHT",t.Default="DEFAULT"}(R||(R={}));const N={getEngine(){var t;return(null===(t=null==k?void 0:k.Capacitor)||void 0===t?void 0:t.isPluginAvailable("StatusBar"))&&(null==k?void 0:k.Capacitor.Plugins.StatusBar)},supportsDefaultStatusBarStyle(){var t;return!!(null===(t=null==k?void 0:k.Capacitor)||void 0===t?void 0:t.PluginHeaders)},setStyle(t){const o=this.getEngine();o&&o.setStyle(t)},getStyle:async function(){const t=this.getEngine();if(!t)return R.Default;const{style:o}=await t.getInfo();return o}},K=(t,o)=>{if(1===o)return 0;const i=1/(1-o);return t*i+-o*i},V=()=>{!k||k.innerWidth>=768||!N.supportsDefaultStatusBarStyle()||N.setStyle({style:R.Dark})},F=(t=R.Default)=>{!k||k.innerWidth>=768||!N.supportsDefaultStatusBarStyle()||N.setStyle({style:t})},G=async(t,o)=>{"function"==typeof t.canDismiss&&await t.canDismiss(void 0,y)&&(o.isRunning()?o.onFinish((()=>{t.dismiss(void 0,"handler")}),{oneTimeCallback:!0}):t.dismiss(void 0,"handler"))},_=t=>.00255275*2.71828**(-14.9619*t)-1.00255*2.71828**(-.0380968*t)+1,H=(t,o)=>u(400,t/Math.abs(1.1*o),500),Z=t=>{const{currentBreakpoint:o,backdropBreakpoint:i}=t,a=void 0===i||i<o,r=a?`calc(var(--backdrop-opacity) * ${o})`:"0",e=I("backdropAnimation").fromTo("opacity",0,r);return a&&e.beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),{wrapperAnimation:I("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-100*o}%)`}]),backdropAnimation:e}},U=t=>{const{currentBreakpoint:o,backdropBreakpoint:i}=t,a=`calc(var(--backdrop-opacity) * ${K(o,i)})`,r=[{offset:0,opacity:a},{offset:1,opacity:0}],e=[{offset:0,opacity:a},{offset:i,opacity:0},{offset:1,opacity:0}],s=I("backdropAnimation").keyframes(0!==i?e:r);return{wrapperAnimation:I("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-100*o}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:s}},q=(t,o)=>{const{presentingEl:i,currentBreakpoint:a}=o,r=f(t),{wrapperAnimation:e,backdropAnimation:s}=void 0!==a?Z(o):{backdropAnimation:I().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:I().fromTo("transform","translateY(100vh)","translateY(0vh)")};s.addElement(r.querySelector("ion-backdrop")),e.addElement(r.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const n=I("entering-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(e);if(i){const t=window.innerWidth<768,o="ION-MODAL"===i.tagName&&void 0!==i.presentingElement,a=f(i),r=I().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),d=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",a=`translateY(${o?"-10px":t}) scale(0.93)`;r.afterStyles({transform:a}).beforeAddWrite((()=>d.style.setProperty("background-color","black"))).addElement(i).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:a,borderRadius:"10px 10px 0 0"}]),n.addAnimation(r)}else if(n.addAnimation(s),o){const t=`translateY(-10px) scale(${o?.93:1})`;r.afterStyles({transform:t}).addElement(a.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:t}]);const i=I().afterStyles({transform:t}).addElement(a.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:t}]);n.addAnimation([r,i])}else e.fromTo("opacity","0","1")}else n.addAnimation(s);return n},J=(t,o,i=500)=>{const{presentingEl:a,currentBreakpoint:r}=o,e=f(t),{wrapperAnimation:s,backdropAnimation:n}=void 0!==r?U(o):{backdropAnimation:I().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:I().fromTo("transform","translateY(0vh)","translateY(100vh)")};n.addElement(e.querySelector("ion-backdrop")),s.addElement(e.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const d=I("leaving-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(i).addAnimation(s);if(a){const t=window.innerWidth<768,o="ION-MODAL"===a.tagName&&void 0!==a.presentingElement,i=f(a),r=I().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish((t=>{1===t&&(a.style.setProperty("overflow",""),Array.from(e.querySelectorAll("ion-modal")).filter((t=>void 0!==t.presentingElement)).length<=1&&e.style.setProperty("background-color",""))})),e=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",i=`translateY(${o?"-10px":t}) scale(0.93)`;r.addElement(a).keyframes([{offset:0,filter:"contrast(0.85)",transform:i,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),d.addAnimation(r)}else if(d.addAnimation(n),o){const t=`translateY(-10px) scale(${o?.93:1})`;r.addElement(i.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:t},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);const a=I().addElement(i.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:t},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);d.addAnimation([r,a])}else s.fromTo("opacity","1","0")}else d.addAnimation(n);return d},Q=(t,o)=>{const{currentBreakpoint:i}=o,a=f(t),{wrapperAnimation:r,backdropAnimation:e}=void 0!==i?Z(o):{backdropAnimation:I().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:I().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}])};return e.addElement(a.querySelector("ion-backdrop")),r.addElement(a.querySelector(".modal-wrapper")),I().addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([e,r])},X=(t,o)=>{const{currentBreakpoint:i}=o,a=f(t),{wrapperAnimation:r,backdropAnimation:e}=void 0!==i?U(o):{backdropAnimation:I().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:I().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}])};return e.addElement(a.querySelector("ion-backdrop")),r.addElement(a.querySelector(".modal-wrapper")),I().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([e,r])};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */let tt=class{constructor(i){t(this,i),this.didPresent=o(this,"ionModalDidPresent",7),this.willPresent=o(this,"ionModalWillPresent",7),this.willDismiss=o(this,"ionModalWillDismiss",7),this.didDismiss=o(this,"ionModalDidDismiss",7),this.ionBreakpointDidChange=o(this,"ionBreakpointDidChange",7),this.didPresentShorthand=o(this,"didPresent",7),this.willPresentShorthand=o(this,"willPresent",7),this.willDismissShorthand=o(this,"willDismiss",7),this.didDismissShorthand=o(this,"didDismiss",7),this.ionMount=o(this,"ionMount",7),this.triggerController=A(),this.coreDelegate=c(),this.isSheetModal=!1,this.inheritedAttributes={},this.inline=!1,this.gestureAnimationDismissing=!1,this.onHandleClick=()=>{const{sheetTransition:t,handleBehavior:o}=this;"cycle"===o&&void 0===t&&this.moveToNextBreakpoint()},this.onBackdropTap=()=>{const{sheetTransition:t}=this;void 0===t&&this.dismiss(void 0,D)},this.onLifecycle=t=>{const o=this.usersElement,i=ot[t.type];if(o&&i){const a=new CustomEvent(i,{bubbles:!1,cancelable:!1,detail:t.detail});o.dispatchEvent(a)}},this.presented=!1,this.hasController=!1,this.overlayIndex=void 0,this.delegate=void 0,this.keyboardClose=!0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.breakpoints=void 0,this.initialBreakpoint=void 0,this.backdropBreakpoint=0,this.handle=void 0,this.handleBehavior="none",this.component=void 0,this.componentProps=void 0,this.cssClass=void 0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.presentingElement=void 0,this.htmlAttributes=void 0,this.isOpen=!1,this.trigger=void 0,this.keepContentsMounted=!1,this.canDismiss=!0}onIsOpenChange(t,o){!0===t&&!1===o?this.present():!1===t&&!0===o&&this.dismiss()}triggerChanged(){const{trigger:t,el:o,triggerController:i}=this;t&&i.addClickListener(o,t)}breakpointsChanged(t){void 0!==t&&(this.sortedBreakpoints=t.sort(((t,o)=>t-o)))}connectedCallback(){const{el:t}=this;B(t),this.triggerChanged()}disconnectedCallback(){this.triggerController.removeClickListener()}componentWillLoad(){const{breakpoints:t,initialBreakpoint:o,el:i}=this,a=this.isSheetModal=void 0!==t&&void 0!==o;this.inheritedAttributes=w(i,["aria-label","role"]),a&&(this.currentBreakpoint=this.initialBreakpoint),void 0===t||void 0===o||t.includes(o)||g("Your breakpoints array must include the initialBreakpoint value."),Y(i)}componentDidLoad(){!0===this.isOpen&&v((()=>this.present())),this.breakpointsChanged(this.breakpoints)}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const o=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:o,delegate:this.workingDelegate=o?this.delegate||this.coreDelegate:this.delegate}}async checkCanDismiss(t,o){const{canDismiss:i}=this;return"function"==typeof i?i(t,o):i}async present(){if(this.presented)return;const{presentingElement:t,el:o}=this;void 0!==this.currentTransition&&await this.currentTransition,this.currentBreakpoint=this.initialBreakpoint;const{inline:a,delegate:r}=this.getDelegate(!0);this.usersElement=await m(r,o,this.component,["ion-page"],this.componentProps,a),this.ionMount.emit(),x(o)?await O(this.usersElement):this.keepContentsMounted||await P(),i((()=>this.el.classList.add("show-modal"))),this.currentTransition=M(this,"modalEnter",q,Q,{presentingEl:t,currentBreakpoint:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint}),"undefined"!=typeof window&&(this.keyboardOpenCallback=()=>{this.gesture&&(this.gesture.enable(!1),v((()=>{this.gesture&&this.gesture.enable(!0)})))},window.addEventListener(z,this.keyboardOpenCallback));const e=void 0!==t;e&&"ios"===$(this)&&(this.statusBarStyle=await N.getStyle(),V()),await this.currentTransition,this.isSheetModal?this.initSheetGesture():e&&this.initSwipeToClose(),this.currentTransition=void 0}initSwipeToClose(){var t;if("ios"!==$(this))return;const{el:o}=this,i=this.leaveAnimation||T.get("modalLeave",J),a=this.animation=i(o,{presentingEl:this.presentingElement});if(!p(o))return void l(o);const r=null!==(t=this.statusBarStyle)&&void 0!==t?t:R.Default;this.gesture=((t,o,i,a)=>{const r=.5,e=t.offsetHeight;let p=!1,l=!1,c=null,m=null,b=!0,v=0;const w=L({el:t,gestureName:"modalSwipeToClose",gesturePriority:39,direction:"y",threshold:10,canStart:t=>{const o=t.event.target;if(null===o||!o.closest)return!0;if(c=s(o),c){if(n(c)){const t=f(c);m=t.querySelector(".inner-scroll")}else m=c;return!c.querySelector("ion-refresher")&&0===m.scrollTop}return null===o.closest("ion-footer")},onStart:i=>{const{deltaY:a}=i;b=!c||!n(c)||c.scrollY,l=void 0!==t.canDismiss&&!0!==t.canDismiss,a>0&&c&&d(c),o.progressStart(!0,p?1:0)},onMove:t=>{const{deltaY:a}=t;a>0&&c&&d(c);const s=t.deltaY/e,n=s>=0&&l,h=n?.2:.9999,p=n?_(s/h):s,m=u(1e-4,p,h);o.progressStep(m),m>=r&&v<r?F(i):m<r&&v>=r&&V(),v=m},onEnd:i=>{const s=i.velocityY,n=i.deltaY/e,d=n>=0&&l,m=d?.2:.9999,f=d?_(n/m):n,v=u(1e-4,f,m),x=!d&&(i.deltaY+1e3*s)/e>=r;let g=x?-.001:.001;x?(o.easing("cubic-bezier(0.32, 0.72, 0, 1)"),g+=W([0,0],[.32,.72],[0,1],[1,1],v)[0]):(o.easing("cubic-bezier(1, 0, 0.68, 0.28)"),g+=W([0,0],[1,0],[.68,.28],[1,1],v)[0]);const k=H(x?n*e:(1-v)*e,s);p=x,w.enable(!1),c&&h(c,b),o.onFinish((()=>{x||w.enable(!0)})).progressEnd(x?1:0,g,k),d&&v>m/4?G(t,o):x&&a()}});return w})(o,a,r,(()=>{this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{await this.dismiss(void 0,y),this.gestureAnimationDismissing=!1}))})),this.gesture.enable(!0)}initSheetGesture(){const{wrapperEl:t,initialBreakpoint:o,backdropBreakpoint:i}=this;if(!t||void 0===o)return;const a=this.enterAnimation||T.get("modalEnter",q),r=this.animation=a(this.el,{presentingEl:this.presentingElement,currentBreakpoint:o,backdropBreakpoint:i});r.progressStart(!0,1);const{gesture:e,moveSheetToBreakpoint:s}=((t,o,i,a,r,e,s=[],n,d,h)=>{const p={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:0!==r?[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-r,opacity:0},{offset:1,opacity:0}]:[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}]},l=t.querySelector("ion-content"),c=i.clientHeight;let m=a,b=0,f=!1;const w=e.childAnimations.find((t=>"wrapperAnimation"===t.id)),x=e.childAnimations.find((t=>"backdropAnimation"===t.id)),g=s[s.length-1],k=s[0],y=()=>{t.style.setProperty("pointer-events","auto"),o.style.setProperty("pointer-events","auto"),t.classList.remove("ion-disable-focus-trap")},A=()=>{t.style.setProperty("pointer-events","none"),o.style.setProperty("pointer-events","none"),t.classList.add("ion-disable-focus-trap")};w&&x&&(w.keyframes([...p.WRAPPER_KEYFRAMES]),x.keyframes([...p.BACKDROP_KEYFRAMES]),e.progressStart(!0,1-m),m>r?y():A()),l&&m!==g&&(l.scrollY=!1);const D=o=>{const{breakpoint:i,canDismiss:a,breakpointOffset:n}=o,c=a&&0===i,b=c?m:i,f=0!==b;return m=0,w&&x&&(w.keyframes([{offset:0,transform:`translateY(${100*n}%)`},{offset:1,transform:`translateY(${100*(1-b)}%)`}]),x.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${K(1-n,r)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${K(b,r)})`}]),e.progressStep(0)),B.enable(!1),c?G(t,e):f||d(),new Promise((t=>{e.onFinish((()=>{f?w&&x?v((()=>{w.keyframes([...p.WRAPPER_KEYFRAMES]),x.keyframes([...p.BACKDROP_KEYFRAMES]),e.progressStart(!0,1-b),m=b,h(m),l&&m===s[s.length-1]&&(l.scrollY=!0),m>r?y():A(),B.enable(!0),t()})):(B.enable(!0),t()):t()}),{oneTimeCallback:!0}).progressEnd(1,0,500)}))},B=L({el:i,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:t=>{const o=t.event.target.closest("ion-content");return m=n(),1!==m||!o},onStart:()=>{f=void 0!==t.canDismiss&&!0!==t.canDismiss&&0===k,l&&(l.scrollY=!1),v((()=>{t.focus()})),e.progressStart(!0,1-m)},onMove:t=>{const o=s.length>1?1-s[1]:void 0,i=1-m+t.deltaY/c,a=void 0!==o&&i>=o&&f,r=a?.95:.9999,n=a&&void 0!==o?o+_((i-o)/(r-o)):i;b=u(1e-4,n,r),e.progressStep(b)},onEnd:t=>{const o=m-(t.deltaY+350*t.velocityY)/c,i=s.reduce(((t,i)=>Math.abs(i-o)<Math.abs(t-o)?i:t));D({breakpoint:i,breakpointOffset:b,canDismiss:f})}});return{gesture:B,moveSheetToBreakpoint:D}})(this.el,this.backdropEl,t,o,i,r,this.sortedBreakpoints,(()=>{var t;return null!==(t=this.currentBreakpoint)&&void 0!==t?t:0}),(()=>this.sheetOnDismiss()),(t=>{this.currentBreakpoint!==t&&(this.currentBreakpoint=t,this.ionBreakpointDidChange.emit({breakpoint:t}))}));this.gesture=e,this.moveSheetToBreakpoint=s,this.gesture.enable(!0)}sheetOnDismiss(){this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{this.currentBreakpoint=0,this.ionBreakpointDidChange.emit({breakpoint:this.currentBreakpoint}),await this.dismiss(void 0,y),this.gestureAnimationDismissing=!1}))}async dismiss(t,o){var a;if(this.gestureAnimationDismissing&&o!==y)return!1;if("handler"!==o&&!await this.checkCanDismiss(t,o))return!1;const{presentingElement:r}=this;void 0!==r&&"ios"===$(this)&&F(this.statusBarStyle),"undefined"!=typeof window&&this.keyboardOpenCallback&&(window.removeEventListener(z,this.keyboardOpenCallback),this.keyboardOpenCallback=void 0),void 0!==this.currentTransition&&await this.currentTransition;const e=E.get(this)||[];this.currentTransition=j(this,t,o,"modalLeave",J,X,{presentingEl:r,currentBreakpoint:null!==(a=this.currentBreakpoint)&&void 0!==a?a:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});const s=await this.currentTransition;if(s){const{delegate:t}=this.getDelegate();await b(t,this.usersElement),i((()=>this.el.classList.remove("show-modal"))),this.animation&&this.animation.destroy(),this.gesture&&this.gesture.destroy(),e.forEach((t=>t.destroy()))}return this.currentBreakpoint=void 0,this.currentTransition=void 0,this.animation=void 0,s}onDidDismiss(){return C(this.el,"ionModalDidDismiss")}onWillDismiss(){return C(this.el,"ionModalWillDismiss")}async setCurrentBreakpoint(t){if(!this.isSheetModal)return void g("setCurrentBreakpoint is only supported on sheet modals.");if(!this.breakpoints.includes(t))return void g(`Attempted to set invalid breakpoint value ${t}. Please double check that the breakpoint value is part of your defined breakpoints.`);const{currentBreakpoint:o,moveSheetToBreakpoint:i,canDismiss:a,breakpoints:r}=this;o!==t&&i&&(this.sheetTransition=i({breakpoint:t,breakpointOffset:1-o,canDismiss:void 0!==a&&!0!==a&&0===r[0]}),await this.sheetTransition,this.sheetTransition=void 0)}async getCurrentBreakpoint(){return this.currentBreakpoint}async moveToNextBreakpoint(){const{breakpoints:t,currentBreakpoint:o}=this;if(!t||null==o)return!1;const i=t.filter((t=>0!==t)),a=i.indexOf(o),r=i[(a+1)%i.length];return await this.setCurrentBreakpoint(r),!0}render(){const{handle:t,isSheetModal:o,presentingElement:i,htmlAttributes:e,handleBehavior:s,inheritedAttributes:n}=this,d=!1!==t&&o,h=$(this),p=void 0!==i&&"ios"===h,l="cycle"===s;return a(r,Object.assign({"no-router":!0,tabindex:"-1"},e,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[h]:!0,"modal-default":!p&&!o,"modal-card":p,"modal-sheet":o,"overlay-hidden":!0},S(this.cssClass)),onIonBackdropTap:this.onBackdropTap,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),a("ion-backdrop",{ref:t=>this.backdropEl=t,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),"ios"===h&&a("div",{class:"modal-shadow"}),a("div",Object.assign({role:"dialog"},n,{"aria-modal":"true",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:t=>this.wrapperEl=t}),d&&a("button",{class:"modal-handle",tabIndex:l?0:-1,"aria-label":"Activate to adjust the size of the dialog overlaying the screen",onClick:l?this.onHandleClick:void 0,part:"handle"}),a("slot",null)))}get el(){return e(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}}};const ot={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};tt.style={ios:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:flex;position:absolute;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;transform:translateZ(0);border:0;background:var(--ion-color-step-350, #c0c0be);cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-card) .modal-wrapper,:host-context([dir=rtl]).modal-card .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}@supports selector(:dir(rtl)){:host(.modal-card) .modal-wrapper:dir(rtl){border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}}:host(.modal-card){--backdrop-opacity:0;--width:100%;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{box-shadow:none}:host(.modal-card) .modal-shadow{box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-sheet) .modal-wrapper,:host-context([dir=rtl]).modal-sheet .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}@supports selector(:dir(rtl)){:host(.modal-sheet) .modal-wrapper:dir(rtl){border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}}',md:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:flex;position:absolute;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;transform:translateZ(0);border:0;background:var(--ion-color-step-350, #c0c0be);cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{transform:translate3d(0,  40px,  0);opacity:0.01}'};export{tt as ion_modal}