import{w as o}from"./p-be7dc084.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var i;!function(o){o.Body="body",o.Ionic="ionic",o.Native="native",o.None="none"}(i||(i={}));const n={getEngine(){var i;return(null===(i=null==o?void 0:o.Capacitor)||void 0===i?void 0:i.isPluginAvailable("Keyboard"))&&(null==o?void 0:o.Capacitor.Plugins.Keyboard)},getResizeMode(){const o=this.getEngine();return(null==o?void 0:o.getResizeMode)?o.getResizeMode().catch((o=>{if("UNIMPLEMENTED"!==o.code)throw o})):Promise.resolve(void 0)}};export{n as K,i as a}