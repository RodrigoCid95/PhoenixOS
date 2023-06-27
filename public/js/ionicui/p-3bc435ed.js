import{e as o,w as s}from"./p-27fd00b4.js";import{a as t,s as r}from"./p-09c49e1c.js";import{c as a}from"./p-22318485.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const e=()=>{const e=window;e.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(e.innerWidth/2,e.innerHeight/2);if(!o)return;const n=t(o);n&&new Promise((o=>a(n,o))).then((()=>{s((async()=>{n.style.setProperty("--overflow","hidden"),await r(n,300),n.style.removeProperty("--overflow")}))}))}))}))};export{e as startStatusTap}