var n,u,i$1,t$1,f={},e$1=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s$1(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(g);}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s$1({},o)).__v=i,t=$(f,o,i,l.__n,void 0!==f.ownerSVGElement,null!=o.__h?[r]:null,u,null==r?_(o):r,o.__h),j(u,o),t!=r&&w(o)));});}function m(n,l,u,i,t,o,r,c,s,h){var y,d,w,k,g,m,b,A=i&&i.__k||e$1,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type)A[y]=void 0;else for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null;}g=$(n,k,w=w||f,t,o,r,c,s,h),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),s=x(n,k,w,A,r,g,s),h||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w));}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&L(A[y],A[y]);if(b)for(y=0;y<b.length;y++)I(b[y],b[++y],b[++y]);}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else {for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r;}return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i);}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px";}function C(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?N:z,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function z(l){this.l[l.type+!1](n.event?n.event(l):l);}function N(l){this.l[l.type+!0](n.event?n.event(l):l);}function T(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&T(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)));}function $(l,u,i,t,o,r,f,e,c){var a,h,v,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(g,x):(u.__c=h=new d(g,x),h.constructor=P,h.render=M),b&&b.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s$1({},h.__s)),s$1(h.__s,P.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,h.__h.length&&f.push(h),T(u,e,l);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,w);});}h.context=x,h.props=g,h.state=h.__s,(a=n.__r)&&a(u),h.__d=!1,h.__v=u,h.__P=l,a=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=s$1(s$1({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(w=h.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),k&&(h.__E=h.__=null),h.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i);}return u.__e}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function H(n,l,u,i,t,o,r,c){var s,a,h,v,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1;}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else {if(null!=o&&(o=e$1.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===n.innerHTML)||(n.innerHTML=v&&v.__html||""));}A(n,d,p,t,c),v?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1));}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o);}function M(n,l,u){return this.constructor(n,u)}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l;}throw n}},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s$1({},this.state),"function"==typeof n&&(n=n(s$1({},u),this.props)),n&&s$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this));},d.prototype.render=p,u=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;

var css$2 = "._app_13ky7_1{position:absolute;left:0;top:0;contain:strict}._app_13ky7_1,._drop_13ky7_21{width:100%;height:100%;overflow:hidden}._drop_13ky7_21{touch-action:none}._drop_13ky7_21:after{content:\"\";position:absolute;display:block;left:10px;top:10px;right:10px;bottom:10px;background-color:rgba(0,0,0,.1);border:2px dashed #fff;border-color:var(--pink);border-radius:10px;opacity:0;transform:scale(.95);transition:all .2s ease-in;transition-property:transform,opacity;pointer-events:none}._drop_13ky7_21.drop-valid:after{opacity:1;transform:scale(1);transition-timing-function:ease-out}._option-pair_13ky7_89{display:flex;justify-content:flex-end;width:100%;height:100%}._option-pair_13ky7_89._horizontal_13ky7_101{justify-content:space-between;align-items:flex-end}._option-pair_13ky7_89._vertical_13ky7_111{flex-direction:column}._app-loader_13ky7_121{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);--size:225px;--stroke-width:26px}";

function appendCss(css) {
    if (false) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
  }

appendCss(css$2);

function t(t,e,i){const s=Array.from(t);let r;if(""===e)return r=s.filter(t=>"file"===t.kind),i?r:[r[0]];const n=e.toLowerCase().split(",").map(t=>t.split("/").map(t=>t.trim())).filter(t=>2===t.length);return r=r=s.filter(t=>{if("file"!==t.kind)return !1;const[e,i]=t.type.toLowerCase().split("/").map(t=>t.trim());for(const[t,s]of n)if(e===t&&("*"===s||i===s))return !0;return !1}),!1===i&&(r=[r[0]]),r}function e(e,i,s){const r=[];return t(e.items,i,s).forEach(t=>{const e=t.getAsFile();null!==e&&r.push(e);}),r}class i extends Event{constructor(t,e){var s,r;super(t,e),(s=this)instanceof(r=i)||Object.setPrototypeOf(s,r.prototype),this._files=e.files,this._action=e.action;}get action(){return this._action}get files(){return this._files}}class s extends HTMLElement{constructor(){super(),this._dragEnterCount=0,this._onDragEnter=this._onDragEnter.bind(this),this._onDragLeave=this._onDragLeave.bind(this),this._onDrop=this._onDrop.bind(this),this._onPaste=this._onPaste.bind(this),this.addEventListener("dragover",t=>t.preventDefault()),this.addEventListener("drop",this._onDrop),this.addEventListener("dragenter",this._onDragEnter),this.addEventListener("dragend",()=>this._reset()),this.addEventListener("dragleave",this._onDragLeave),this.addEventListener("paste",this._onPaste);}get accept(){return this.getAttribute("accept")||""}set accept(t){this.setAttribute("accept",t);}get multiple(){return this.getAttribute("multiple")}set multiple(t){this.setAttribute("multiple",t||"");}_onDragEnter(e){if(this._dragEnterCount+=1,this._dragEnterCount>1)return;if(null===e.dataTransfer)return void this.classList.add("drop-invalid");const i=t(e.dataTransfer.items,this.accept,null!==this.multiple);this.classList.add(!e.dataTransfer||!e.dataTransfer.items.length||void 0!==i[0]?"drop-valid":"drop-invalid");}_onDragLeave(){this._dragEnterCount-=1,0===this._dragEnterCount&&this._reset();}_onDrop(t){if(t.preventDefault(),null===t.dataTransfer)return;this._reset();const s=e(t.dataTransfer,this.accept,null!==this.multiple);void 0!==s&&this.dispatchEvent(new i("filedrop",{action:"drop",files:s}));}_onPaste(t){if(!t.clipboardData)return;const s=e(t.clipboardData,this.accept,void 0!==this.multiple);void 0!==s&&this.dispatchEvent(new i("filedrop",{action:"paste",files:s}));}_reset(){this._dragEnterCount=0,this.classList.remove("drop-valid"),this.classList.remove("drop-invalid");}}customElements.define("file-drop",s);

const snackbar = "_snackbar_gd4zh_21";
const text = "_text_gd4zh_109";
const button = "_button_gd4zh_121";

var css$1 = "snack-bar{display:block;position:fixed;left:0;bottom:0;width:100%;height:0;overflow:visible}._snackbar_gd4zh_21{position:fixed;display:flex;box-sizing:border-box;left:50%;bottom:24px;width:344px;margin-left:-172px;background:#2a2a2a;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,.5);transform-origin:center;color:#eee;z-index:100;cursor:default;will-change:transform;animation:_snackbar-show_gd4zh_1 .3s ease 1 forwards}._snackbar_gd4zh_21[aria-hidden=true]{animation:_snackbar-hide_gd4zh_1 .3s ease 1 forwards}@keyframes _snackbar-show_gd4zh_1{0%{opacity:0;transform:scale(.5)}}@keyframes _snackbar-hide_gd4zh_1{to{opacity:0;transform:translateY(100%)}}@media (max-width:400px){._snackbar_gd4zh_21{width:100%;bottom:0;left:0;margin-left:0;border-radius:0}}._text_gd4zh_109{flex:1 1 auto;padding:16px;font-size:100%}._button_gd4zh_121{position:relative;flex:0 1 auto;padding:8px;height:100%;margin:auto 8px auto -8px;min-width:5em;background:none;border:none;border-radius:3px;color:#90ee90;font-weight:inherit;letter-spacing:.05em;font-size:100%;text-transform:uppercase;text-align:center;cursor:pointer;overflow:hidden;transition:background-color .2s ease;outline:none;text-decoration:none}._button_gd4zh_121:hover{background-color:rgba(0,0,0,.15)}._button_gd4zh_121:focus:before{content:\"\";position:absolute;left:50%;top:50%;width:120%;height:0;padding:0 0 120%;margin:-60% 0 0 -60%;background:hsla(0,0%,100%,.1);border-radius:50%;transform-origin:center;will-change:transform;animation:_focus-ring_gd4zh_1 .3s ease-out 1 forwards;pointer-events:none}@keyframes _focus-ring_gd4zh_1{0%{transform:scale(.01)}}";

appendCss(css$1);

// So it doesn't cause an error when running in node
const HTMLEl$1 = (HTMLElement);
function createSnack(message, options) {
    const { timeout = 0, actions = ['dismiss'] } = options;
    const el = document.createElement('div');
    el.className = snackbar;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.setAttribute('aria-hidden', 'false');
    const text$1 = document.createElement('div');
    text$1.className = text;
    text$1.textContent = message;
    el.appendChild(text$1);
    const result = new Promise((resolve) => {
        let timeoutId;
        // Add action buttons
        for (const action of actions) {
            const button$1 = document.createElement('button');
            button$1.className = button;
            button$1.textContent = action;
            button$1.addEventListener('click', () => {
                clearTimeout(timeoutId);
                resolve(action);
            });
            el.appendChild(button$1);
        }
        // Add timeout
        if (timeout) {
            timeoutId = self.setTimeout(() => resolve(''), timeout);
        }
    });
    return [el, result];
}
class SnackBarElement extends HTMLEl$1 {
    constructor() {
        super(...arguments);
        this._snackbars = [];
        this._processingQueue = false;
    }
    /**
     * Show a snackbar. Returns a promise for the name of the action clicked, or an empty string if no
     * action is clicked.
     */
    showSnackbar(message, options = {}) {
        return new Promise((resolve) => {
            this._snackbars.push([message, options, resolve]);
            if (!this._processingQueue)
                this._processQueue();
        });
    }
    async _processQueue() {
        this._processingQueue = true;
        while (this._snackbars[0]) {
            const [message, options, resolver] = this._snackbars[0];
            const [el, result] = createSnack(message, options);
            // Pass the result back to the original showSnackbar call.
            resolver(result);
            this.appendChild(el);
            // Wait for the user to click an action, or for the snack to timeout.
            await result;
            // Transition the snack away.
            el.setAttribute('aria-hidden', 'true');
            await new Promise((resolve) => {
                el.addEventListener('animationend', () => resolve());
            });
            el.remove();
            this._snackbars.shift();
        }
        this._processingQueue = false;
    }
}
customElements.define('snack-bar', SnackBarElement);

const spinnerCircle = "_spinner-circle_1x9ri_155";
const spinnerGapPatch = "_spinner-gap-patch_1x9ri_195";
const spinnerCircleClipper = "_spinner-circle-clipper_1x9ri_227";
const spinnerLeft = "_spinner-left_1x9ri_245";
const spinnerRight = "_spinner-right_1x9ri_257";
const spinnerContainer = "_spinner-container_1x9ri_281";
const spinnerLayer = "_spinner-layer_1x9ri_299";

var css = "@keyframes _spinner-left-spin_1x9ri_1{0%{transform:rotate(130deg)}50%{transform:rotate(-5deg)}to{transform:rotate(130deg)}}@keyframes _spinner-right-spin_1x9ri_1{0%{transform:rotate(-130deg)}50%{transform:rotate(5deg)}to{transform:rotate(-130deg)}}@keyframes _spinner-fade-out_1x9ri_1{to{opacity:0}}@keyframes _spinner-container-rotate_1x9ri_1{to{transform:rotate(1turn)}}@keyframes _spinner-fill-unfill-rotate_1x9ri_1{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(3turn)}}loading-spinner{--size:28px;--color:#4285f4;--stroke-width:3px;--delay:300ms;pointer-events:none;display:inline-block;position:relative;width:var(--size);height:var(--size);border-color:var(--color)}loading-spinner ._spinner-circle_1x9ri_155{position:absolute;top:0;left:0;right:0;bottom:0;box-sizing:border-box;height:100%;width:200%;border:var(--stroke-width) solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%}loading-spinner ._spinner-gap-patch_1x9ri_195{position:absolute;box-sizing:border-box;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}loading-spinner ._spinner-gap-patch_1x9ri_195 ._spinner-circle_1x9ri_155{width:1000%;left:-450%}loading-spinner ._spinner-circle-clipper_1x9ri_227{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}loading-spinner ._spinner-left_1x9ri_245 ._spinner-circle_1x9ri_155{border-right-color:transparent!important;transform:rotate(129deg);animation:_spinner-left-spin_1x9ri_1 1333ms cubic-bezier(.4,0,.2,1) infinite both}loading-spinner ._spinner-right_1x9ri_257 ._spinner-circle_1x9ri_155{left:-100%;border-left-color:transparent!important;transform:rotate(-129deg);animation:_spinner-right-spin_1x9ri_1 1333ms cubic-bezier(.4,0,.2,1) infinite both}loading-spinner._spinner-fadeout_1x9ri_273{animation:_spinner-fade-out_1x9ri_1 .4s cubic-bezier(.4,0,.2,1) forwards}loading-spinner ._spinner-container_1x9ri_281{width:100%;height:100%;border-color:inherit;animation:_spinner-container-rotate_1x9ri_1 1568ms linear infinite}loading-spinner ._spinner-layer_1x9ri_299{position:absolute;width:100%;height:100%;border-color:inherit;animation:_spinner-fill-unfill-rotate_1x9ri_1 5332ms cubic-bezier(.4,0,.2,1) infinite both}";

appendCss(css);

// So it doesn't cause an error when running in node
const HTMLEl = (HTMLElement);
/**
 * A simple spinner. This custom element has no JS API. Just put it in the document, and it'll
 * spin. You can configure the following using CSS custom properties:
 *
 * --size: Size of the spinner element (it's always square). Default: 28px.
 * --color: Color of the spinner. Default: #4285f4.
 * --stroke-width: Width of the stroke of the spinner. Default: 3px.
 * --delay: Once the spinner enters the DOM, how long until it shows. This prevents the spinner
 *          appearing on the screen for short operations. Default: 300ms.
 */
class LoadingSpinner extends HTMLEl {
    constructor() {
        super(...arguments);
        this._delayTimeout = 0;
    }
    disconnectedCallback() {
        this.style.display = 'none';
        clearTimeout(this._delayTimeout);
    }
    connectedCallback() {
        this.style.display = 'none';
        // prettier-ignore
        this.innerHTML = '' +
            `<div class="${spinnerContainer}">` +
            `<div class="${spinnerLayer}">` +
            `<div class="${spinnerCircleClipper} ${spinnerLeft}">` +
            `<div class="${spinnerCircle}"></div>` +
            '</div>' +
            `<div class="${spinnerGapPatch}">` +
            `<div class="${spinnerCircle}"></div>` +
            '</div>' +
            `<div class="${spinnerCircleClipper} ${spinnerRight}">` +
            `<div class="${spinnerCircle}"></div>` +
            '</div>' +
            '</div>' +
            '</div>';
        const delayStr = getComputedStyle(this).getPropertyValue('--delay').trim();
        let delayNum = parseFloat(delayStr);
        // If seconds…
        if (/\ds$/.test(delayStr)) {
            // Convert to ms.
            delayNum *= 1000;
        }
        this._delayTimeout = self.setTimeout(() => {
            this.style.display = '';
        }, delayNum);
    }
}
customElements.define('loading-spinner', LoadingSpinner);

matchMedia('(prefers-reduced-motion: reduce)').matches
    ? undefined
    : import('./chunks/index-8a87570b.js');
navigator.clipboard && navigator.clipboard.read;

import('./chunks/index-95bcfd82.js');
Promise.resolve({
        offliner: () => { },
        getSharedImage: async () => undefined,
    })
    ;

export { appendCss as a, d, h, p };
//# sourceMappingURL=mount.js.map
