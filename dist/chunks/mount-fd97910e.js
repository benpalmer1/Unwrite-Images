var n,u,i$1,t$1,o,f={},e$1=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s$1(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(g);}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s$1({},o)).__v=i,t=$(f,o,i,l.__n,void 0!==f.ownerSVGElement,null!=o.__h?[r]:null,u,null==r?_(o):r,o.__h),j(u,o),t!=r&&w(o)));});}function m(n,l,u,i,t,o,r,c,s,h){var y,d,w,k,g,m,b,A=i&&i.__k||e$1,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type)A[y]=void 0;else for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null;}g=$(n,k,w=w||f,t,o,r,c,s,h),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),s=x(n,k,w,A,r,g,s),h||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w));}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&L(A[y],A[y]);if(b)for(y=0;y<b.length;y++)I(b[y],b[++y],b[++y]);}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else {for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r;}return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i);}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px";}function C(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?N:z,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function z(l){this.l[l.type+!1](n.event?n.event(l):l);}function N(l){this.l[l.type+!0](n.event?n.event(l):l);}function T(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&T(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)));}function $(l,u,i,t,o,r,f,e,c){var a,h,v,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(g,x):(u.__c=h=new d(g,x),h.constructor=P,h.render=M),b&&b.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s$1({},h.__s)),s$1(h.__s,P.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,h.__h.length&&f.push(h),T(u,e,l);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,w);});}h.context=x,h.props=g,h.state=h.__s,(a=n.__r)&&a(u),h.__d=!1,h.__v=u,h.__P=l,a=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=s$1(s$1({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(w=h.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),k&&(h.__E=h.__=null),h.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i);}return u.__e}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function H(n,l,u,i,t,o,r,c){var s,a,h,v,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1;}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else {if(null!=o&&(o=e$1.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===n.innerHTML)||(n.innerHTML=v&&v.__html||""));}A(n,d,p,t,c),v?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1));}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o);}function M(n,l,u){return this.constructor(n,u)}function O(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=h(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e$1.slice.call(u.childNodes):null,c,i||f,t),j(c,l);}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l;}throw n}},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s$1({},this.state),"function"==typeof n&&(n=n(s$1({},u),this.props)),n&&s$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this));},d.prototype.render=p,u=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f;

/** Creates a function ref that assigns its value to a given property of an object.
 *  @example
 *  // element is stored as `this.foo` when rendered.
 *  <div ref={linkRef(this, 'foo')} />
 */
function linkRef(obj, name) {
    const refName = `$$ref_${name}`;
    let ref = obj[refName];
    if (!ref) {
        ref = obj[refName] = (c) => {
            obj[name] = c;
        };
    }
    return ref;
}

const app = "_app_13ky7_1";
const drop = "_drop_13ky7_21";
const appLoader = "_app-loader_13ky7_121";

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

var logoWithText = "../assets/logo-99b7d28c.svg";

var githubLogo = "../assets/github-logo-eaea4a88.svg";

var largePhoto = "../assets/demo-large-photo-a6b23f7b.jpg";

var artwork = "../assets/demo-artwork-c444f915.jpg";

var deviceScreen = "../assets/demo-device-screen-b9d088e8.png";

var largePhotoIcon = "../assets/icon-demo-large-photo-18da387a.jpg";

var artworkIcon = "../assets/icon-demo-artwork-9eba1655.jpg";

var deviceScreenIcon = "../assets/icon-demo-device-screen-5d52d8b9.jpg";

var smallSectionAsset = "../assets/small-db1eae6f.svg";

var simpleSectionAsset = "../assets/simple-258b6ed5.svg";

var secureSectionAsset = "../assets/secure-a66bbdfe.svg";

var logoIcon = "../assets/icon-demo-logo-326ed9b6.png";

const intro = "_intro_epfhz_1 abs-fill";
const blobCanvas = "_blob-canvas_epfhz_23 abs-fill";
const hide = "_hide_epfhz_35";
const main = "_main_epfhz_43";
const logoContainer = "_logo-container_epfhz_71";
const logo = "_logo_epfhz_71";
const loadImg = "_load-img_epfhz_91";
const blobSvg = "_blob-svg_epfhz_105 abs-fill";
const loadImgContent = "_load-img-content_epfhz_127";
const loadBtn = "_load-btn_epfhz_161 unbutton";
const loadIcon = "_load-icon_epfhz_169";
const pasteBtn = "_paste-btn_epfhz_185 unbutton";
const demosContainer = "_demos-container_epfhz_199";
const topWave = "_top-wave_epfhz_211";
const mainWave = "_main-wave_epfhz_225";
const subWave = "_sub-wave_epfhz_233";
const bottomWave = "_bottom-wave_epfhz_241";
const info = "_info_epfhz_249";
const infoContainer = "_info-container_epfhz_269";
const infoContent = "_info-content_epfhz_279";
const infoTitle = "_info-title_epfhz_319";
const infoCaption = "_info-caption_epfhz_331";
const infoTextWrapper = "_info-text-wrapper_epfhz_365";
const infoImgWrapper = "_info-img-wrapper_epfhz_397";
const infoImg = "_info-img_epfhz_397";
const infoWave = "_info-wave_epfhz_437";
const footer = "_footer_epfhz_445";
const footerContainer = "_footer-container_epfhz_455";
const footerWave = "_footer-wave_epfhz_465";
const contentPadding = "_content-padding_epfhz_473";
const footerPadding = "_footer-padding_epfhz_481";
const footerItems = "_footer-items_epfhz_489";
const footerLink = "_footer-link_epfhz_519";
const footerLinkWithLogo = "_footer-link-with-logo_epfhz_529 _footer-link_epfhz_519";
const installBtn = "_install-btn_epfhz_567 unbutton";
const demoTitle = "_demo-title_epfhz_593";
const demos$1 = "_demos_epfhz_199";
const demoContainer = "_demo-container_epfhz_647";
const demoSize = "_demo-size_epfhz_661";
const demoIconContainer = "_demo-icon-container_epfhz_679";
const demoIcon = "_demo-icon_epfhz_679";
const demoLoader = "_demo-loader_epfhz_699 abs-fill";
const dropText = "_drop-text_epfhz_725";

/** Start points, for the shape we use in prerender */
const startBlobs = [
    [
        [-0.232, -1.029, 0.073, -1.029, 0.377, -1.029],
        [0.565, -1.098, 0.755, -0.86, 0.945, -0.622],
        [0.917, -0.01, 0.849, 0.286, 0.782, 0.583],
        [0.85, 0.687, 0.576, 0.819, 0.302, 0.951],
        [-0.198, 1.009, -0.472, 0.877, -0.746, 0.745],
        [-0.98, 0.513, -1.048, 0.216, -1.116, -0.08],
        [-0.964, -0.395, -0.774, -0.633, -0.584, -0.871],
    ],
    [
        [-0.505, -1.109, -0.201, -1.109, 0.104, -1.109],
        [0.641, -0.684, 0.831, -0.446, 1.02, -0.208],
        [1.041, 0.034, 0.973, 0.331, 0.905, 0.628],
        [0.734, 0.794, 0.46, 0.926, 0.186, 1.058],
        [-0.135, 0.809, -0.409, 0.677, -0.684, 0.545],
        [-0.935, 0.404, -1.002, 0.108, -1.07, -0.189],
        [-0.883, -0.402, -0.693, -0.64, -0.503, -0.878],
    ],
    [
        [-0.376, -1.168, -0.071, -1.168, 0.233, -1.168],
        [0.732, -0.956, 0.922, -0.718, 1.112, -0.48],
        [1.173, 0.027, 1.105, 0.324, 1.038, 0.621],
        [0.707, 0.81, 0.433, 0.943, 0.159, 1.075],
        [-0.096, 1.135, -0.37, 1.003, -0.644, 0.871],
        [-0.86, 0.457, -0.927, 0.161, -0.995, -0.136],
        [-0.87, -0.516, -0.68, -0.754, -0.49, -0.992],
    ],
    [
        [-0.309, -0.998, -0.004, -0.998, 0.3, -0.998],
        [0.535, -0.852, 0.725, -0.614, 0.915, -0.376],
        [1.05, -0.09, 0.982, 0.207, 0.915, 0.504],
        [0.659, 0.807, 0.385, 0.939, 0.111, 1.071],
        [-0.178, 1.048, -0.452, 0.916, -0.727, 0.784],
        [-0.942, 0.582, -1.009, 0.285, -1.077, -0.011],
        [-1.141, -0.335, -0.951, -0.573, -0.761, -0.811],
    ],
];

class SlideOnScroll extends d {
    componentDidMount() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const base = this.base;
        let wasOutOfView = false;
        this.observer = new IntersectionObserver((entries, observer) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    wasOutOfView = true;
                    base.style.opacity = '0';
                    return;
                }
                // Only transition in if the element was at some point out of view.
                if (wasOutOfView) {
                    base.style.opacity = '';
                    base.animate({ offset: 0, opacity: '0', transform: 'translateY(40px)' }, { duration: 300, easing: 'ease' });
                }
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });
        this.observer.observe(base);
    }
    componentWillUnmount() {
        // Have to manually disconnect due to memory leaks in browsers.
        // One day we'll be able to remove this, and the private property.
        // https://twitter.com/jaffathecake/status/1405437361643790337
        if (this.observer)
            this.observer.disconnect();
    }
    render({ children }) {
        return h("div", null, children);
    }
}

const demos = [
    {
        description: 'Large photo',
        size: '2.8MB',
        filename: 'photo.jpg',
        url: largePhoto,
        iconUrl: largePhotoIcon,
    },
    {
        description: 'Artwork',
        size: '2.9MB',
        filename: 'art.jpg',
        url: artwork,
        iconUrl: artworkIcon,
    },
    {
        description: 'Device screen',
        size: '1.6MB',
        filename: 'pixel3.png',
        url: deviceScreen,
        iconUrl: deviceScreenIcon,
    },
    {
        description: 'SVG icon',
        size: '13KB',
        filename: 'logo.svg',
        url: logoWithText,
        iconUrl: logoIcon,
    },
];
const blobAnimImport = matchMedia('(prefers-reduced-motion: reduce)').matches
    ? undefined
    : import('./index-bdadb524.js');
const supportsClipboardAPI = navigator.clipboard && navigator.clipboard.read;
async function getImageClipboardItem(items) {
    for (const item of items) {
        const type = item.types.find((type) => type.startsWith('image/'));
        if (type)
            return item.getType(type);
    }
}
class Intro extends d {
    constructor() {
        super(...arguments);
        this.state = {
            showBlobSVG: true,
        };
        this.installingViaButton = false;
        this.onFileChange = (event) => {
            const fileInput = event.target;
            const file = fileInput.files && fileInput.files[0];
            if (!file)
                return;
            this.fileInput.value = '';
            this.props.onFile(file);
        };
        this.onOpenClick = () => {
            this.fileInput.click();
        };
        this.onDemoClick = async (index, event) => {
            try {
                this.setState({ fetchingDemoIndex: index });
                const demo = demos[index];
                const blob = await fetch(demo.url).then((r) => r.blob());
                const file = new File([blob], demo.filename, { type: blob.type });
                this.props.onFile(file);
            }
            catch (err) {
                this.setState({ fetchingDemoIndex: undefined });
                this.props.showSnack("Couldn't fetch demo image");
            }
        };
        this.onBeforeInstallPromptEvent = (event) => {
            // Don't show the mini-infobar on mobile
            event.preventDefault();
            // Save the beforeinstallprompt event so it can be called later.
            this.setState({ beforeInstallEvent: event });
            // No analytics
        };
        this.onInstallClick = async (event) => {
            // Get the deferred beforeinstallprompt event
            const beforeInstallEvent = this.state.beforeInstallEvent;
            // If there's no deferred prompt, bail.
            if (!beforeInstallEvent)
                return;
            this.installingViaButton = true;
            // Show the browser install prompt
            beforeInstallEvent.prompt();
            // Wait for the user to accept or dismiss the install prompt
            const { outcome } = await beforeInstallEvent.userChoice;
            // No analytics
            // If the prompt was dismissed, we aren't going to install via the button.
            if (outcome === 'dismissed') {
                this.installingViaButton = false;
            }
        };
        this.onAppInstalled = () => {
            // We don't need the install button, if it's shown
            this.setState({ beforeInstallEvent: undefined });
            // Don't log analytics if page is not visible
            if (document.hidden)
                return;
            // Clear the install method property
            this.installingViaButton = false;
        };
        this.onPasteClick = async () => {
            let clipboardItems;
            try {
                clipboardItems = await navigator.clipboard.read();
            }
            catch (err) {
                this.props.showSnack(`No permission to access clipboard`);
                return;
            }
            const blob = await getImageClipboardItem(clipboardItems);
            if (!blob) {
                this.props.showSnack(`No image found in the clipboard`);
                return;
            }
            this.props.onFile(new File([blob], 'image.unknown'));
        };
    }
    componentDidMount() {
        // Listen for beforeinstallprompt events, indicating Unwrite Images is installable.
        window.addEventListener('beforeinstallprompt', this.onBeforeInstallPromptEvent);
        // Listen for the appinstalled event, indicating Unwrite Images has been installed.
        window.addEventListener('appinstalled', this.onAppInstalled);
        if (blobAnimImport) {
            blobAnimImport.then((module) => {
                this.setState({
                    showBlobSVG: false,
                }, () => module.startBlobAnim(this.blobCanvas));
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPromptEvent);
        window.removeEventListener('appinstalled', this.onAppInstalled);
    }
    render({}, { fetchingDemoIndex, beforeInstallEvent, showBlobSVG }) {
        return (h("div", { class: intro },
            h("input", { class: hide, ref: linkRef(this, 'fileInput'), type: "file", onChange: this.onFileChange }),
            h("div", { class: main },
                (h("canvas", { ref: linkRef(this, 'blobCanvas'), class: blobCanvas })),
                h("h1", { class: logoContainer },
                    h("img", { class: logo, src: logoWithText, alt: "Unwrite Images", width: "539", height: "162" })),
                h("div", { class: loadImg },
                    showBlobSVG && (h("svg", { class: blobSvg, viewBox: "-1.25 -1.25 2.5 2.5", preserveAspectRatio: "xMidYMid slice" }, startBlobs.map((points) => (h("path", { d: points
                            .map((point, i) => {
                            const nextI = i === points.length - 1 ? 0 : i + 1;
                            let d = '';
                            if (i === 0) {
                                d += `M${point[2]} ${point[3]}`;
                            }
                            return (d +
                                `C${point[4]} ${point[5]} ${points[nextI][0]} ${points[nextI][1]} ${points[nextI][2]} ${points[nextI][3]}`);
                        })
                            .join('') }))))),
                    h("div", { class: loadImgContent, style: { visibility: '' } },
                        h("button", { class: loadBtn, onClick: this.onOpenClick },
                            h("svg", { viewBox: "0 0 24 24", class: loadIcon },
                                h("path", { d: "M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" }))),
                        h("div", null,
                            h("span", { class: dropText }, "Drop "),
                            "OR",
                            ' ',
                            supportsClipboardAPI ? (h("button", { class: pasteBtn, onClick: this.onPasteClick }, "Paste")) : ('Paste'))))),
            h("div", { class: demosContainer },
                h("svg", { viewBox: "0 0 1920 140", class: topWave },
                    h("path", { d: "M1920 0l-107 28c-106 29-320 85-533 93-213 7-427-36-640-50s-427 0-533 7L0 85v171h1920z", class: subWave }),
                    h("path", { d: "M0 129l64-26c64-27 192-81 320-75 128 5 256 69 384 64 128-6 256-80 384-91s256 43 384 70c128 26 256 26 320 26h64v96H0z", class: mainWave })),
                h("div", { class: contentPadding },
                    h("p", { class: demoTitle },
                        "Or ",
                        h("strong", null, "try one"),
                        " of these:"),
                    h("ul", { class: demos$1 }, demos.map((demo, i) => (h("li", null,
                        h("button", { class: "unbutton", onClick: (event) => this.onDemoClick(i, event) },
                            h("div", { class: demoContainer },
                                h("div", { class: demoIconContainer },
                                    h("img", { class: demoIcon, src: demo.iconUrl, alt: demo.description }),
                                    fetchingDemoIndex === i && (h("div", { class: demoLoader },
                                        h("loading-spinner", null)))),
                                h("div", { class: demoSize }, demo.size))))))))),
            h("div", { class: bottomWave },
                h("svg", { viewBox: "0 0 1920 79", class: topWave },
                    h("path", { d: "M0 59l64-11c64-11 192-34 320-43s256-5 384 4 256 23 384 34 256 21 384 14 256-30 320-41l64-11v94H0z", class: infoWave }))),
            h("section", { class: info },
                h("div", { class: infoContainer },
                    h(SlideOnScroll, null,
                        h("div", { class: infoContent },
                            h("div", { class: infoTextWrapper },
                                h("h2", { class: infoTitle }, "Small"),
                                h("p", { class: infoCaption }, "Smaller images mean faster load times. Unwrite Images can reduce file size while maintaining high quality.")),
                            h("div", { class: infoImgWrapper },
                                h("img", { class: infoImg, src: smallSectionAsset, alt: "silhouette of a large 1.4 megabyte image shrunk into a smaller 80 kilobyte image", width: "536", height: "522" })))))),
            h("section", { class: info },
                h("div", { class: infoContainer },
                    h(SlideOnScroll, null,
                        h("div", { class: infoContent },
                            h("div", { class: infoTextWrapper },
                                h("h2", { class: infoTitle }, "Simple"),
                                h("p", { class: infoCaption }, "Open your image, inspect the differences, then save instantly. Feeling adventurous? Adjust the settings for even smaller files.")),
                            h("div", { class: infoImgWrapper },
                                h("img", { class: infoImg, src: simpleSectionAsset, alt: "grid of multiple shrunk images displaying various options", width: "538", height: "384" })))))),
            h("section", { class: info },
                h("div", { class: infoContainer },
                    h(SlideOnScroll, null,
                        h("div", { class: infoContent },
                            h("div", { class: infoTextWrapper },
                                h("h2", { class: infoTitle }, "Secure"),
                                h("p", { class: infoCaption }, "Worried about privacy? Images never leave your device since Unwrite Images does all the work locally.")),
                            h("div", { class: infoImgWrapper },
                                h("img", { class: infoImg, src: secureSectionAsset, alt: "silhouette of a cloud with a 'no' symbol on top", width: "498", height: "333" })))))),
            h("footer", { class: footer },
                h("div", { class: footerContainer },
                    h("svg", { viewBox: "0 0 1920 79", class: topWave },
                        h("path", { d: "M0 59l64-11c64-11 192-34 320-43s256-5 384 4 256 23 384 34 256 21 384 14 256-30 320-41l64-11v94H0z", class: footerWave })),
                    h("div", { class: footerPadding },
                        h("footer", { class: footerItems },
                            h("a", { class: footerLink, href: "https://unwrite.co/images/privacy" }, "Privacy"),
                            h("a", { class: footerLinkWithLogo, href: "https://github.com/benpalmer1/Unwrite-Images" },
                                h("img", { src: githubLogo, alt: "", width: "10", height: "10" }),
                                "Source on Github"))))),
            beforeInstallEvent && (h("button", { class: installBtn, onClick: this.onInstallClick }, "Install"))));
    }
}

const ROUTE_EDITOR = '/editor';
const compressPromise = import('./index-92d70034.js');
const swBridgePromise = Promise.resolve({
        offliner: () => { },
        getSharedImage: async () => undefined,
    })
    ;
function back() {
    window.history.back();
}
class App extends d {
    constructor() {
        super();
        this.state = {
            awaitingShareTarget: new URL(location.href).searchParams.has('share-target'),
            isEditorOpen: false,
            file: undefined,
            Compress: undefined,
        };
        this.onFileDrop = ({ files }) => {
            if (!files || files.length === 0)
                return;
            const file = files[0];
            this.openEditor();
            this.setState({ file });
        };
        this.onIntroPickFile = (file) => {
            this.openEditor();
            this.setState({ file });
        };
        this.showSnack = (message, options = {}) => {
            if (!this.snackbar)
                throw Error('Snackbar missing');
            return this.snackbar.showSnackbar(message, options);
        };
        this.onPopState = () => {
            this.setState({ isEditorOpen: location.pathname === ROUTE_EDITOR });
        };
        this.openEditor = () => {
            if (this.state.isEditorOpen)
                return;
            // Change path, but preserve query string.
            const editorURL = new URL(location.href);
            editorURL.pathname = ROUTE_EDITOR;
            history.pushState(null, '', editorURL.href);
            this.setState({ isEditorOpen: true });
        };
        compressPromise
            .then((module) => {
            this.setState({ Compress: module.default });
        })
            .catch(() => {
            this.showSnack('Failed to load app');
        });
        swBridgePromise.then(async ({ offliner, getSharedImage }) => {
            offliner(this.showSnack);
            if (!this.state.awaitingShareTarget)
                return;
            const file = await getSharedImage();
            // Remove the ?share-target from the URL
            history.replaceState('', '', '/');
            this.openEditor();
            this.setState({ file, awaitingShareTarget: false });
        });
        // Since iOS 10, Apple tries to prevent disabling pinch-zoom. This is great in theory, but
        // really breaks things on Squoosh, as you can easily end up zooming the UI when you mean to
        // zoom the image. Once you've done this, it's really difficult to undo. Anyway, this seems to
        // prevent it.
        document.body.addEventListener('gesturestart', (event) => {
            event.preventDefault();
        });
        window.addEventListener('popstate', this.onPopState);
    }
    render({}, { file, isEditorOpen, Compress, awaitingShareTarget }) {
        const showSpinner = awaitingShareTarget || (isEditorOpen && !Compress);
        return (h("div", { class: app },
            h("file-drop", { onfiledrop: this.onFileDrop, class: drop },
                showSpinner ? (h("loading-spinner", { class: appLoader })) : isEditorOpen ? (Compress && (h(Compress, { file: file, showSnack: this.showSnack, onBack: back }))) : (h(Intro, { onFile: this.onIntroPickFile, showSnack: this.showSnack })),
                h("snack-bar", { ref: linkRef(this, 'snackbar') }))));
    }
}

// Mount the Unwrite Images app into a provided root element and return an unmount disposer.
function mountUnwriteImages(root, options = {}) {
    // Apply optional theme override
    const { theme = 'inherit', cdnBase, version } = options;
    if (theme && theme !== 'inherit') {
        root.setAttribute('data-unwrite-images-theme', theme);
    }
    // Set CDN configuration if provided
    if (typeof window !== 'undefined') {
        if (cdnBase)
            window.UNWRITE_IMAGES_CDN = cdnBase;
        if (version)
            window.UNWRITE_IMAGES_VERSION = version;
    }
    O(h(App, null), root);
    // Return disposer to unmount
    return () => {
        // Preact unmount via rendering null into the same root
        // Cast is to satisfy TS older preact types
        O(null, root);
        if (theme && theme !== 'inherit') {
            root.removeAttribute('data-unwrite-images-theme');
        }
    };
}

export { appendCss as a, loadImg as b, d, h, linkRef as l, mountUnwriteImages as m, p, startBlobs as s };
//# sourceMappingURL=mount-fd97910e.js.map
