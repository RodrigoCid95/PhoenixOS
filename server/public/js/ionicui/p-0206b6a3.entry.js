import{r as s,h as t,H as i}from"./p-27fd00b4.js";import{m as o}from"./p-69d71620.js";import{g as r}from"./p-c5fce703.js";import{u as e}from"./p-38cf7875.js";import"./p-add30d46.js";import"./p-22318485.js";import"./p-f1f22152.js";import"./p-be7dc084.js";let n=class{constructor(t){s(this,t),this.onClick=()=>o.toggle(this.menu),this.visible=!1,this.menu=void 0,this.autoHide=!0}connectedCallback(){this.visibilityChanged()}async visibilityChanged(){this.visible=await e(this.menu)}render(){const s=r(this),o=this.autoHide&&!this.visible;return t(i,{onClick:this.onClick,"aria-hidden":o?"true":null,class:{[s]:!0,"menu-toggle-hidden":o}},t("slot",null))}};n.style=":host(.menu-toggle-hidden){display:none}";export{n as ion_menu_toggle}