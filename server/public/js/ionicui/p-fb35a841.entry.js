import{r as o,d as t,h as s,H as i,c as a}from"./p-27fd00b4.js";import{c as r,h as e}from"./p-0e4de1d0.js";import{g as n}from"./p-c5fce703.js";let l=class{constructor(s){o(this,s),this.ionCollapsedClick=t(this,"ionCollapsedClick",7),this.breadcrumbsInit=()=>{this.setBreadcrumbSeparator(),this.setMaxItems()},this.resetActiveBreadcrumb=()=>{const o=this.getBreadcrumbs().find((o=>o.active));o&&this.activeChanged&&(o.active=!1)},this.setMaxItems=()=>{const{itemsAfterCollapse:o,itemsBeforeCollapse:t,maxItems:s}=this,i=this.getBreadcrumbs();for(const o of i)o.showCollapsedIndicator=!1,o.collapsed=!1;void 0!==s&&i.length>s&&t+o<=s&&i.forEach(((s,a)=>{a===t&&(s.showCollapsedIndicator=!0),a>=t&&a<i.length-o&&(s.collapsed=!0)}))},this.setBreadcrumbSeparator=()=>{const{itemsAfterCollapse:o,itemsBeforeCollapse:t,maxItems:s}=this,i=this.getBreadcrumbs(),a=i.find((o=>o.active));for(const r of i){const e=void 0!==s&&0===o?r===i[t]:r===i[i.length-1];r.last=e,r.separator=void 0!==r.separator?r.separator:!e||void 0,!a&&e&&(r.active=!0,this.activeChanged=!0)}},this.getBreadcrumbs=()=>Array.from(this.el.querySelectorAll("ion-breadcrumb")),this.slotChanged=()=>{this.resetActiveBreadcrumb(),this.breadcrumbsInit()},this.collapsed=void 0,this.activeChanged=void 0,this.color=void 0,this.maxItems=void 0,this.itemsBeforeCollapse=1,this.itemsAfterCollapse=1}onCollapsedClick(o){const t=this.getBreadcrumbs().filter((o=>o.collapsed));this.ionCollapsedClick.emit(Object.assign(Object.assign({},o.detail),{collapsedBreadcrumbs:t}))}maxItemsChanged(){this.resetActiveBreadcrumb(),this.breadcrumbsInit()}componentWillLoad(){this.breadcrumbsInit()}render(){const{color:o,collapsed:t}=this,a=n(this);return s(i,{class:r(o,{[a]:!0,"in-toolbar":e("ion-toolbar",this.el),"in-toolbar-color":e("ion-toolbar[color]",this.el),"breadcrumbs-collapsed":t})},s("slot",{onSlotchange:this.slotChanged}))}get el(){return a(this)}static get watchers(){return{maxItems:["maxItemsChanged"],itemsBeforeCollapse:["maxItemsChanged"],itemsAfterCollapse:["maxItemsChanged"]}}};l.style={ios:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:0;padding-bottom:0;justify-content:center}",md:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0}"};export{l as ion_breadcrumbs}