import{k as l}from"./p-22318485.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const a=a=>{const n=a;let r;return{hasLegacyControl:()=>{if(void 0===r){const a=void 0!==n.label||o(n),t=n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")&&null===n.shadowRoot,e=l(n);r=!0===n.legacy||!a&&!t&&null!==e}return r}}},o=l=>!!(null!==l.shadowRoot&&(n.includes(l.tagName)&&null!==l.querySelector('[slot="label"]')||r.includes(l.tagName)&&""!==l.textContent)),n=["ION-RANGE"],r=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"];export{a as c}