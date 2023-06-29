import{r as t,d as i,h as s,c as a}from"./p-27fd00b4.js";import{g as e}from"./p-2f802871.js";import{a as o,d as h}from"./p-41d99575.js";import{s as n,n as r}from"./p-22318485.js";import{t as l}from"./p-1d074b74.js";import{g as c,c as d}from"./p-c5fce703.js";let m=class{constructor(s){t(this,s),this.ionNavWillLoad=i(this,"ionNavWillLoad",7),this.ionNavWillChange=i(this,"ionNavWillChange",3),this.ionNavDidChange=i(this,"ionNavDidChange",3),this.gestureOrAnimationInProgress=!1,this.mode=c(this),this.delegate=void 0,this.animated=!0,this.animation=void 0,this.swipeHandler=void 0}swipeHandlerChanged(){this.gesture&&this.gesture.enable(void 0!==this.swipeHandler)}async connectedCallback(){const t=()=>{this.gestureOrAnimationInProgress=!0,this.swipeHandler&&this.swipeHandler.onStart()};this.gesture=(await import("./p-36ba4462.js")).createSwipeBackGesture(this.el,(()=>!this.gestureOrAnimationInProgress&&!!this.swipeHandler&&this.swipeHandler.canStart()),(()=>t()),(t=>{var i;return null===(i=this.ani)||void 0===i?void 0:i.progressStep(t)}),((t,i,s)=>{if(this.ani){this.ani.onFinish((()=>{this.gestureOrAnimationInProgress=!1,this.swipeHandler&&this.swipeHandler.onEnd(t)}),{oneTimeCallback:!0});let a=t?-.001:.001;t?a+=e([0,0],[.32,.72],[0,1],[1,1],i)[0]:(this.ani.easing("cubic-bezier(1, 0, 0.68, 0.28)"),a+=e([0,0],[1,0],[.68,.28],[1,1],i)[0]),this.ani.progressEnd(t?1:0,a,s)}else this.gestureOrAnimationInProgress=!1})),this.swipeHandlerChanged()}componentWillLoad(){this.ionNavWillLoad.emit()}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}async commit(t,i,s){const a=await this.lock();let e=!1;try{e=await this.transition(t,i,s)}catch(t){console.error(t)}return a(),e}async setRouteId(t,i,s,a){return{changed:await this.setRoot(t,i,{duration:"root"===s?0:void 0,direction:"back"===s?"back":"forward",animationBuilder:a}),element:this.activeEl}}async getRouteId(){const t=this.activeEl;return t?{id:t.tagName,element:t,params:this.activeParams}:void 0}async setRoot(t,i,s){if(this.activeComponent===t&&n(i,this.activeParams))return!1;const a=this.activeEl,e=await o(this.delegate,this.el,t,["ion-page","ion-page-invisible"],i);return this.activeComponent=t,this.activeEl=e,this.activeParams=i,await this.commit(e,a,s),await h(this.delegate,a),!0}async transition(t,i,s={}){if(i===t)return!1;this.ionNavWillChange.emit();const{el:a,mode:e}=this,o=this.animated&&d.getBoolean("animated",!0),h=s.animationBuilder||this.animation||d.get("navAnimation");return await l(Object.assign(Object.assign({mode:e,animated:o,enteringEl:t,leavingEl:i,baseEl:a,deepWait:r(a),progressCallback:s.progressAnimation?t=>{void 0===t||this.gestureOrAnimationInProgress?this.ani=t:(this.gestureOrAnimationInProgress=!0,t.onFinish((()=>{this.gestureOrAnimationInProgress=!1,this.swipeHandler&&this.swipeHandler.onEnd(!1)}),{oneTimeCallback:!0}),t.progressEnd(0,0,0))}:void 0},s),{animationBuilder:h})),this.ionNavDidChange.emit(),!0}async lock(){const t=this.waitPromise;let i;return this.waitPromise=new Promise((t=>i=t)),void 0!==t&&await t,i}render(){return s("slot",null)}get el(){return a(this)}static get watchers(){return{swipeHandler:["swipeHandlerChanged"]}}};m.style=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}";export{m as ion_router_outlet}