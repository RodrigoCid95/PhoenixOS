import{r as t,h as o,H as i,c as n}from"./p-27fd00b4.js";import{b as e,a as s,r as a,g as c,t as d}from"./p-22318485.js";import{c as r}from"./p-63eaf01a.js";import{c as h,g as l}from"./p-c5fce703.js";let p=class{constructor(o){t(this,o),this.updateListener=()=>this.updateState(!1),this.setItemDefaults=()=>{const t=this.getSlottedHeaderIonItem();t&&(t.button=!0,t.detail=!1,void 0===t.lines&&(t.lines="full"))},this.getSlottedHeaderIonItem=()=>{const{headerEl:t}=this;if(!t)return;const o=t.querySelector("slot");return o&&void 0!==o.assignedElements?o.assignedElements().find((t=>"ION-ITEM"===t.tagName)):void 0},this.setAria=(t=!1)=>{const o=this.getSlottedHeaderIonItem();if(!o)return;const i=c(o).querySelector("button");i&&i.setAttribute("aria-expanded",`${t}`)},this.slotToggleIcon=()=>{const t=this.getSlottedHeaderIonItem();if(!t)return;const{toggleIconSlot:o,toggleIcon:i}=this;if(t.querySelector(".ion-accordion-toggle-icon"))return;const n=document.createElement("ion-icon");n.slot=o,n.lazy=!1,n.classList.add("ion-accordion-toggle-icon"),n.icon=i,n.setAttribute("aria-hidden","true"),t.appendChild(n)},this.expandAccordion=(t=!1)=>{const{contentEl:o,contentElWrapper:i}=this;t||void 0===o||void 0===i?this.state=4:4!==this.state&&(void 0!==this.currentRaf&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?e((()=>{this.state=8,this.currentRaf=e((async()=>{const t=i.offsetHeight,n=d(o,2e3);o.style.setProperty("max-height",`${t}px`),await n,this.state=4,o.style.removeProperty("max-height")}))})):this.state=4)},this.collapseAccordion=(t=!1)=>{const{contentEl:o}=this;t||void 0===o?this.state=1:1!==this.state&&(void 0!==this.currentRaf&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?this.currentRaf=e((async()=>{o.style.setProperty("max-height",`${o.offsetHeight}px`),e((async()=>{const t=d(o,2e3);this.state=2,await t,this.state=1,o.style.removeProperty("max-height")}))})):this.state=1)},this.shouldAnimate=()=>"undefined"!=typeof window&&(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!(!h.get("animated",!0)||this.accordionGroupEl&&!this.accordionGroupEl.animated)),this.updateState=async(t=!1)=>{const o=this.accordionGroupEl,i=this.value;if(!o)return;const n=o.value;if(Array.isArray(n)?n.includes(i):n===i)this.expandAccordion(t),this.isNext=this.isPrevious=!1;else{this.collapseAccordion(t);const o=this.getNextSibling(),i=null==o?void 0:o.value;void 0!==i&&(this.isPrevious=Array.isArray(n)?n.includes(i):n===i);const e=this.getPreviousSibling(),s=null==e?void 0:e.value;void 0!==s&&(this.isNext=Array.isArray(n)?n.includes(s):n===s)}},this.getNextSibling=()=>{if(!this.el)return;const t=this.el.nextElementSibling;return"ION-ACCORDION"===(null==t?void 0:t.tagName)?t:void 0},this.getPreviousSibling=()=>{if(!this.el)return;const t=this.el.previousElementSibling;return"ION-ACCORDION"===(null==t?void 0:t.tagName)?t:void 0},this.state=1,this.isNext=!1,this.isPrevious=!1,this.value="ion-accordion-"+m++,this.disabled=!1,this.readonly=!1,this.toggleIcon=r,this.toggleIconSlot="end"}valueChanged(){this.updateState()}connectedCallback(){var t;const o=this.accordionGroupEl=null===(t=this.el)||void 0===t?void 0:t.closest("ion-accordion-group");o&&(this.updateState(!0),s(o,"ionValueChange",this.updateListener))}disconnectedCallback(){const t=this.accordionGroupEl;t&&a(t,"ionValueChange",this.updateListener)}componentDidLoad(){this.setItemDefaults(),this.slotToggleIcon(),e((()=>{this.setAria(4===this.state||8===this.state)}))}toggleExpanded(){const{accordionGroupEl:t,value:o,state:i}=this;t&&t.requestAccordionToggle(o,1===i||2===i)}render(){const{disabled:t,readonly:n}=this,e=l(this),s=4===this.state||8===this.state,a=s?"header expanded":"header",c=s?"content expanded":"content";return this.setAria(s),o(i,{class:{[e]:!0,"accordion-expanding":8===this.state,"accordion-expanded":4===this.state,"accordion-collapsing":2===this.state,"accordion-collapsed":1===this.state,"accordion-next":this.isNext,"accordion-previous":this.isPrevious,"accordion-disabled":t,"accordion-readonly":n,"accordion-animated":this.shouldAnimate()}},o("div",{onClick:()=>this.toggleExpanded(),id:"header",part:a,"aria-controls":"content",ref:t=>this.headerEl=t},o("slot",{name:"header"})),o("div",{id:"content",part:c,role:"region","aria-labelledby":"header",ref:t=>this.contentEl=t},o("div",{id:"content-wrapper",ref:t=>this.contentElWrapper=t},o("slot",{name:"content"}))))}static get delegatesFocus(){return!0}get el(){return n(this)}static get watchers(){return{value:["valueChanged"]}}},m=0;p.style={ios:":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}",md:":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{transition:none !important}}"};export{p as ion_accordion}