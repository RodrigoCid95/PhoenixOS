import{r as s,h as i,H as r,c as e}from"./p-27fd00b4.js";import{E as n}from"./p-7cd46e24.js";import{c as t,g as o,a as h}from"./p-c5fce703.js";import{s as a}from"./p-3773f7d4.js";import{n as c,o as l}from"./p-df74be15.js";import{S as d}from"./p-565a0d83.js";let f=class{constructor(i){s(this,i),this.customHTMLEnabled=t.get("innerHTMLTemplatesEnabled",n),this.pullingIcon=void 0,this.pullingText=void 0,this.refreshingSpinner=void 0,this.refreshingText=void 0}componentWillLoad(){if(void 0===this.pullingIcon){const s=o(this),i=void 0!==this.el.style.webkitOverflowScrolling?"lines":l;this.pullingIcon=t.get("refreshingIcon","ios"===s&&h("mobile")?t.get("spinner",i):"circular")}if(void 0===this.refreshingSpinner){const s=o(this);this.refreshingSpinner=t.get("refreshingSpinner",t.get("spinner","ios"===s?"lines":"circular"))}}renderPullingText(){const{customHTMLEnabled:s,pullingText:r}=this;return s?i("div",{class:"refresher-pulling-text",innerHTML:a(r)}):i("div",{class:"refresher-pulling-text"},r)}renderRefreshingText(){const{customHTMLEnabled:s,refreshingText:r}=this;return s?i("div",{class:"refresher-refreshing-text",innerHTML:a(r)}):i("div",{class:"refresher-refreshing-text"},r)}render(){const s=this.pullingIcon,e=null!=s&&void 0!==d[s],n=o(this);return i(r,{class:n},i("div",{class:"refresher-pulling"},this.pullingIcon&&e&&i("div",{class:"refresher-pulling-icon"},i("div",{class:"spinner-arrow-container"},i("ion-spinner",{name:this.pullingIcon,paused:!0}),"md"===n&&"circular"===this.pullingIcon&&i("div",{class:"arrow-container"},i("ion-icon",{icon:c,"aria-hidden":"true"})))),this.pullingIcon&&!e&&i("div",{class:"refresher-pulling-icon"},i("ion-icon",{icon:this.pullingIcon,lazy:!1,"aria-hidden":"true"})),void 0!==this.pullingText&&this.renderPullingText()),i("div",{class:"refresher-refreshing"},this.refreshingSpinner&&i("div",{class:"refresher-refreshing-icon"},i("ion-spinner",{name:this.refreshingSpinner})),void 0!==this.refreshingText&&this.renderRefreshingText()))}get el(){return e(this)}};export{f as ion_refresher_content}