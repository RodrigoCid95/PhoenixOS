import{w as o}from"./p-be7dc084.js";import{b as r}from"./p-22318485.js";import{a as t}from"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const e=(t,e,i)=>{let n,s;void 0!==o&&"MutationObserver"in o&&(n=new MutationObserver((o=>{for(const t of o)for(const o of t.addedNodes)if(o.nodeType===Node.ELEMENT_NODE&&o.slot===e)return i(),void r((()=>c(o)))})),n.observe(t,{childList:!0}));const c=o=>{var r;s&&(s.disconnect(),s=void 0),s=new MutationObserver((o=>{i();for(const r of o)for(const o of r.removedNodes)o.nodeType===Node.ELEMENT_NODE&&o.slot===e&&d()})),s.observe(null!==(r=o.parentElement)&&void 0!==r?r:o,{subtree:!0,childList:!0})},d=()=>{s&&(s.disconnect(),s=void 0)};return{destroy:()=>{n&&(n.disconnect(),n=void 0),d()}}},i=(o,r,e)=>{const i=null==o?0:o.toString().length,s=n(i,r);if(void 0===e)return s;try{return e(i,r)}catch(o){return t("Exception in provided `counterFormatter`.",o),s}},n=(o,r)=>`${o} / ${r}`;
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */export{e as c,i as g}