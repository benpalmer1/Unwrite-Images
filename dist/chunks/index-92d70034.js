import { a as appendCss, h, d, l as linkRef, p } from './mount-fd97910e.js';
import { g as getContainOffsets, w as wrap } from './util-b67af3de.js';

const compress = "_compress_105bw_1";
const options = "_options_105bw_43";
const options1Theme = "_options-1-theme_105bw_85";
const options2Theme = "_options-2-theme_105bw_111";
const options1 = "_options-1_105bw_85 _options_105bw_43 _options-1-theme_105bw_85";
const options2 = "_options-2_105bw_111 _options_105bw_43 _options-2-theme_105bw_111";
const multiPanel = "_multi-panel_105bw_161";
const back = "_back_105bw_211 unbutton";
const backBlob = "_back-blob_105bw_237";
const backX = "_back-x_105bw_295";

var css$d = "._compress_105bw_1{width:100%;height:100%;contain:strict;display:grid;grid-template-rows:max-content 1fr;grid-template-areas:\"header\" \"opts\";--options-radius:7px}@media (min-width:600px){._compress_105bw_1{grid-template-rows:max-content 1fr;grid-template-columns:max-content 1fr max-content;grid-template-areas:\"header header header\" \"optsLeft viewportOpts optsRight\"}}._options_105bw_43{position:relative;color:#fff;font-size:1.2rem;max-width:400px;margin:0 auto;width:calc(100% - 60px);max-height:100%;overflow:hidden;grid-area:opts;display:grid;grid-template-rows:1fr max-content;align-content:end;align-self:end}@media (min-width:600px){._options_105bw_43{width:300px;margin:0}}._options-1-theme_105bw_85{--main-theme-color:var(--pink);--hot-theme-color:var(--hot-pink);--header-text-color:var(--white);--scroller-radius:var(--options-radius) var(--options-radius) 0 0;--rotate-copyoverbutton-angle:90deg}@media (min-width:600px){._options-1-theme_105bw_85{--scroller-radius:0 var(--options-radius) var(--options-radius) 0;--rotate-copyoverbutton-angle:0deg}}._options-2-theme_105bw_111{--main-theme-color:var(--blue);--hot-theme-color:var(--deep-blue);--header-text-color:var(--dark-text);--scroller-radius:var(--options-radius) var(--options-radius) 0 0;--rotate-copyoverbutton-angle:-90deg}@media (min-width:600px){._options-2-theme_105bw_111{--scroller-radius:var(--options-radius) 0 0 var(--options-radius);--rotate-copyoverbutton-angle:180deg}}._options-1_105bw_85{grid-area:optsLeft}._options-2_105bw_111{grid-area:optsRight}._multi-panel_105bw_161{position:relative;display:flex;flex-flow:column;overflow:hidden}._multi-panel_105bw_161>:first-child{order:2;margin-bottom:10px}._multi-panel_105bw_161>:nth-child(2){order:1}._multi-panel_105bw_161>:nth-child(3){order:4}._multi-panel_105bw_161>:nth-child(4){order:3}._back_105bw_211{position:relative;grid-area:header;margin:9px;justify-self:start;align-self:start}._back_105bw_211>svg{width:47px;overflow:visible}._back_105bw_211:focus ._back-blob_105bw_237{stroke:var(--deep-blue);stroke-width:5px;animation:_strokePulse_105bw_1 .5s ease forwards}@media (min-width:600px){._back_105bw_211{margin:14px}._back_105bw_211>svg{width:58px}}@keyframes _strokePulse_105bw_1{0%{stroke-width:8px}to{stroke-width:5px}}._back-blob_105bw_237{fill:var(--hot-pink);opacity:.77}._back-x_105bw_295{fill:var(--white)}";

appendCss(css$d);

/** Replace the contents of a canvas with the given data */
function drawDataToCanvas(canvas, data) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw Error('Canvas not initialized');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(data, 0, 0);
}
/**
 * Encode some image data in a given format using the browser's encoders
 *
 * @param {ImageData} data
 * @param {string} type A mime type, eg image/jpeg.
 * @param {number} [quality] Between 0-1.
 */
async function canvasEncode(data, type, quality) {
    const canvas = document.createElement('canvas');
    canvas.width = data.width;
    canvas.height = data.height;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw Error('Canvas not initialized');
    ctx.putImageData(data, 0, 0);
    let blob;
    if ('toBlob' in canvas) {
        blob = await new Promise((r) => canvas.toBlob(r, type, quality));
    }
    else {
        // Welcome to Edge.
        // TypeScript thinks `canvas` is 'never', so it needs casting.
        const dataUrl = canvas.toDataURL(type, quality);
        const result = /data:([^;]+);base64,(.*)$/.exec(dataUrl);
        if (!result)
            throw Error('Data URL reading failed');
        const outputType = result[1];
        const binaryStr = atob(result[2]);
        const data = new Uint8Array(binaryStr.length);
        for (let i = 0; i < data.length; i += 1) {
            data[i] = binaryStr.charCodeAt(i);
        }
        blob = new Blob([data], { type: outputType });
    }
    if (!blob)
        throw Error('Encoding failed');
    return blob;
}
function drawableToImageData(drawable, opts = {}) {
    const { width = drawable.width, height = drawable.height, sx = 0, sy = 0, sw = drawable.width, sh = drawable.height, } = opts;
    // Make canvas same size as image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // Draw image onto canvas
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('Could not create canvas context');
    ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
}
function builtinResize(data, sx, sy, sw, sh, dw, dh, method) {
    const canvasSource = document.createElement('canvas');
    canvasSource.width = data.width;
    canvasSource.height = data.height;
    drawDataToCanvas(canvasSource, data);
    const canvasDest = document.createElement('canvas');
    canvasDest.width = dw;
    canvasDest.height = dh;
    const ctx = canvasDest.getContext('2d');
    if (!ctx)
        throw new Error('Could not create canvas context');
    if (method === 'pixelated') {
        ctx.imageSmoothingEnabled = false;
    }
    else {
        ctx.imageSmoothingQuality = method;
    }
    ctx.drawImage(canvasSource, sx, sy, sw, sh, 0, 0, dw, dh);
    return ctx.getImageData(0, 0, dw, dh);
}
/**
 * Test whether <canvas> can encode to a particular type.
 */
async function canvasEncodeTest(mimeType) {
    try {
        const blob = await canvasEncode(new ImageData(1, 1), mimeType);
        // According to the spec, the blob should be null if the format isn't supported…
        if (!blob)
            return false;
        // …but Safari & Firefox fall back to PNG, so we need to check the mime type.
        return blob.type === mimeType;
    }
    catch (err) {
        return false;
    }
}

/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** If render engine is Safari */
const isSafari = /Safari\//.test(navigator.userAgent) &&
    !/Chrom(e|ium)\//.test(navigator.userAgent);
/**
 * Compare two objects, returning a boolean indicating if
 * they have the same properties and strictly equal values.
 */
function shallowEqual(one, two) {
    for (const i in one)
        if (one[i] !== two[i])
            return false;
    for (const i in two)
        if (!(i in one))
            return false;
    return true;
}
async function decodeImage$1(url) {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    const loaded = new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(Error('Image loading error'));
    });
    if (img.decode) {
        // Nice off-thread way supported in Safari/Chrome.
        // Safari throws on decode if the source is SVG.
        // https://bugs.webkit.org/show_bug.cgi?id=188347
        await img.decode().catch(() => null);
    }
    // Always await loaded, as we may have bailed due to the Safari bug above.
    await loaded;
    return img;
}
/** Caches results from canDecodeImageType */
const canDecodeCache = new Map();
/**
 * Tests whether the browser supports a particular image mime type.
 *
 * @param type Mimetype
 * @example await canDecodeImageType('image/avif')
 */
function canDecodeImageType(type) {
    if (!canDecodeCache.has(type)) {
        const resultPromise = (async () => {
            const picture = document.createElement('picture');
            const img = document.createElement('img');
            const source = document.createElement('source');
            source.srcset = 'data:,x';
            source.type = type;
            picture.append(source, img);
            // Wait a single microtick just for the `img.currentSrc` to get populated.
            await 0;
            // At this point `img.currentSrc` will contain "data:,x" if format is supported and ""
            // otherwise.
            return !!img.currentSrc;
        })();
        canDecodeCache.set(type, resultPromise);
    }
    return canDecodeCache.get(type);
}
function blobToArrayBuffer(blob) {
    return new Response(blob).arrayBuffer();
}
function blobToText(blob) {
    return new Response(blob).text();
}
const magicNumberMapInput = [
    [/^%PDF-/, 'application/pdf'],
    [/^GIF87a/, 'image/gif'],
    [/^GIF89a/, 'image/gif'],
    [/^\x89PNG\x0D\x0A\x1A\x0A/, 'image/png'],
    [/^\xFF\xD8\xFF/, 'image/jpeg'],
    [/^BM/, 'image/bmp'],
    [/^I I/, 'image/tiff'],
    [/^II*/, 'image/tiff'],
    [/^MM\x00*/, 'image/tiff'],
    [/^RIFF....WEBPVP8[LX ]/s, 'image/webp'],
    [/^\xF4\xFF\x6F/, 'image/webp2'],
    [/^\x00\x00\x00 ftypavif\x00\x00\x00\x00/, 'image/avif'],
    [/^\xff\x0a/, 'image/jxl'],
    [/^\x00\x00\x00\x0cJXL \x0d\x0a\x87\x0a/, 'image/jxl'],
    [/^qoif/, 'image/qoi'],
];
const magicNumberToMimeType = new Map(magicNumberMapInput);
async function sniffMimeType(blob) {
    const firstChunk = await blobToArrayBuffer(blob.slice(0, 16));
    const firstChunkString = Array.from(new Uint8Array(firstChunk))
        .map((v) => String.fromCodePoint(v))
        .join('');
    for (const [detector, mimeType] of magicNumberToMimeType) {
        if (detector.test(firstChunkString)) {
            return mimeType;
        }
    }
    return '';
}
async function blobToImg(blob) {
    const url = URL.createObjectURL(blob);
    try {
        return await decodeImage$1(url);
    }
    finally {
        URL.revokeObjectURL(url);
    }
}
async function builtinDecode(signal, blob) {
    assertSignal(signal);
    // Prefer createImageBitmap as it's the off-thread option for Firefox.
    const drawable = await abortable(signal, 'createImageBitmap' in self ? createImageBitmap(blob) : blobToImg(blob));
    return drawableToImageData(drawable);
}
/**
 * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
 * @param defaultVal Value to return if 'field' doesn't exist.
 */
function inputFieldValueAsNumber(field, defaultVal = 0) {
    if (!field)
        return defaultVal;
    return Number(inputFieldValue(field));
}
/**
 * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
 * @param defaultVal Value to return if 'field' doesn't exist.
 */
function inputFieldCheckedAsNumber(field, defaultVal = 0) {
    if (!field)
        return defaultVal;
    return Number(inputFieldChecked(field));
}
/**
 * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
 * @param defaultVal Value to return if 'field' doesn't exist.
 */
function inputFieldChecked(field, defaultVal = false) {
    if (!field)
        return defaultVal;
    return field.checked;
}
/**
 * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
 * @param defaultVal Value to return if 'field' doesn't exist.
 */
function inputFieldValue(field, defaultVal = '') {
    if (!field)
        return defaultVal;
    return field.value;
}
/**
 * Creates a promise that resolves when the user types the konami code.
 */
function konami() {
    return new Promise((resolve) => {
        // Keycodes for: ↑ ↑ ↓ ↓ ← → ← → B A
        const expectedPattern = '38384040373937396665';
        let rollingPattern = '';
        const listener = (event) => {
            rollingPattern += event.keyCode;
            rollingPattern = rollingPattern.slice(-expectedPattern.length);
            if (rollingPattern === expectedPattern) {
                window.removeEventListener('keydown', listener);
                resolve();
            }
        };
        window.addEventListener('keydown', listener);
    });
}
async function transitionHeight(el, opts) {
    const { from = el.getBoundingClientRect().height, to = el.getBoundingClientRect().height, duration = 1000, easing = 'ease-in-out', } = opts;
    if (from === to || duration === 0) {
        el.style.height = to + 'px';
        return;
    }
    el.style.height = from + 'px';
    // Force a style calc so the browser picks up the start value.
    getComputedStyle(el).transform;
    el.style.transition = `height ${duration}ms ${easing}`;
    el.style.height = to + 'px';
    return new Promise((resolve) => {
        const listener = (event) => {
            if (event.target !== el)
                return;
            el.style.transition = '';
            el.removeEventListener('transitionend', listener);
            el.removeEventListener('transitioncancel', listener);
            resolve();
        };
        el.addEventListener('transitionend', listener);
        el.addEventListener('transitioncancel', listener);
    });
}
/**
 * Simple event listener that prevents the default.
 */
function preventDefault(event) {
    event.preventDefault();
}
/**
 * Throw an abort error if a signal is aborted.
 */
function assertSignal(signal) {
    if (signal.aborted)
        throw new DOMException('AbortError', 'AbortError');
}
/**
 * Take a signal and promise, and returns a promise that rejects with an AbortError if the abort is
 * signalled, otherwise resolves with the promise.
 */
async function abortable(signal, promise) {
    assertSignal(signal);
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            signal.addEventListener('abort', () => reject(new DOMException('AbortError', 'AbortError')));
        }),
    ]);
}

const label$9 = 'AVIF';
const mimeType$9 = 'image/avif';
const extension$9 = 'avif';
const defaultOptions$c = {
    quality: 50,
    qualityAlpha: -1,
    denoiseLevel: 0,
    tileColsLog2: 0,
    tileRowsLog2: 0,
    speed: 6,
    subsample: 1,
    chromaDeltaQ: false,
    sharpness: 0,
    tune: 0 /* auto */,
    enableSharpYUV: false,
};

var avifEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$9,
    mimeType: mimeType$9,
    extension: extension$9,
    defaultOptions: defaultOptions$c
});

const label$8 = 'Browser GIF';
const mimeType$8 = 'image/gif';
const extension$8 = 'gif';
const defaultOptions$b = {};

var browserGIFEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$8,
    mimeType: mimeType$8,
    extension: extension$8,
    defaultOptions: defaultOptions$b
});

const label$7 = 'Browser JPEG';
const mimeType$7 = 'image/jpeg';
const extension$7 = 'jpg';
const defaultOptions$a = { quality: 0.75 };

var browserJPEGEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$7,
    mimeType: mimeType$7,
    extension: extension$7,
    defaultOptions: defaultOptions$a
});

const label$6 = 'Browser PNG';
const mimeType$6 = 'image/png';
const extension$6 = 'png';
const defaultOptions$9 = {};

var browserPNGEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$6,
    mimeType: mimeType$6,
    extension: extension$6,
    defaultOptions: defaultOptions$9
});

const label$5 = 'JPEG XL (beta)';
const mimeType$5 = 'image/jxl';
const extension$5 = 'jxl';
const defaultOptions$8 = {
    effort: 7,
    quality: 75,
    progressive: false,
    epf: -1,
    lossyPalette: false,
    decodingSpeedTier: 0,
    photonNoiseIso: 0,
    lossyModular: false,
};

var jxlEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$5,
    mimeType: mimeType$5,
    extension: extension$5,
    defaultOptions: defaultOptions$8
});

const label$4 = 'MozJPEG';
const mimeType$4 = 'image/jpeg';
const extension$4 = 'jpg';
const defaultOptions$7 = {
    quality: 75,
    baseline: false,
    arithmetic: false,
    progressive: true,
    optimize_coding: true,
    smoothing: 0,
    color_space: 3 /* YCbCr */,
    quant_table: 3,
    trellis_multipass: false,
    trellis_opt_zero: false,
    trellis_opt_table: false,
    trellis_loops: 1,
    auto_subsample: true,
    chroma_subsample: 2,
    separate_chroma_quality: false,
    chroma_quality: 75,
};

var mozJPEGEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$4,
    mimeType: mimeType$4,
    extension: extension$4,
    defaultOptions: defaultOptions$7
});

const label$3 = 'OxiPNG';
const mimeType$3 = 'image/png';
const extension$3 = 'png';
const defaultOptions$6 = {
    level: 2,
    interlace: false,
};

var oxiPNGEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$3,
    mimeType: mimeType$3,
    extension: extension$3,
    defaultOptions: defaultOptions$6
});

const label$2 = 'QOI';
const mimeType$2 = 'image/qoi';
const extension$2 = 'qoi';
const defaultOptions$5 = {};

var qoiEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$2,
    mimeType: mimeType$2,
    extension: extension$2,
    defaultOptions: defaultOptions$5
});

const label$1 = 'WebP';
const mimeType$1 = 'image/webp';
const extension$1 = 'webp';
// These come from struct WebPConfig in encode.h.
const defaultOptions$4 = {
    quality: 75,
    target_size: 0,
    target_PSNR: 0,
    method: 4,
    sns_strength: 50,
    filter_strength: 60,
    filter_sharpness: 0,
    filter_type: 1,
    partitions: 0,
    segments: 4,
    pass: 1,
    show_compressed: 0,
    preprocessing: 0,
    autofilter: 0,
    partition_limit: 0,
    alpha_compression: 1,
    alpha_filtering: 1,
    alpha_quality: 100,
    lossless: 0,
    exact: 0,
    image_hint: 0,
    emulate_jpeg_size: 0,
    thread_level: 0,
    low_memory: 0,
    near_lossless: 100,
    use_delta_palette: 0,
    use_sharp_yuv: 0,
};

var webPEncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label$1,
    mimeType: mimeType$1,
    extension: extension$1,
    defaultOptions: defaultOptions$4
});

const label = 'WebP v2 (unstable)';
const mimeType = 'image/webp2';
const extension = 'wp2';
const defaultOptions$3 = {
    quality: 75,
    alpha_quality: 75,
    effort: 5,
    pass: 1,
    sns: 50,
    uv_mode: 3 /* UVModeAuto */,
    csp_type: 0 /* kYCoCg */,
    error_diffusion: 0,
    use_random_matrix: false,
};

var wp2EncoderMeta = /*#__PURE__*/Object.freeze({
    __proto__: null,
    label: label,
    mimeType: mimeType,
    extension: extension,
    defaultOptions: defaultOptions$3
});

const optionsScroller = "_options-scroller_rjr20_1";
const optionsTitle = "_options-title_rjr20_27";
const originalImage = "_original-image_rjr20_59";
const optionTextFirst = "_option-text-first_rjr20_69";
const optionToggle = "_option-toggle_rjr20_85";
const optionReveal = "_option-reveal_rjr20_103 _option-toggle_rjr20_85";
const optionOneCell = "_option-one-cell_rjr20_135";
const sectionEnabler = "_section-enabler_rjr20_147 _option-toggle_rjr20_85";
const optionsSection = "_options-section_rjr20_161";
const textField = "_text-field_rjr20_169";
const titleAndButtons = "_title-and-buttons_rjr20_191";
const copyOverButton = "_copy-over-button_rjr20_243 _title-button_rjr20_207 unbutton";
const saveButton = "_save-button_rjr20_275 _title-button_rjr20_207 unbutton";
const importButton = "_import-button_rjr20_277 _title-button_rjr20_207 unbutton";
const buttonOpacity = "_button-opacity_rjr20_303";

const checkbox$2 = "_checkbox_j00rc_1";
const realCheckbox$2 = "_real-checkbox_j00rc_53";
const icon = "_icon_j00rc_67";
const checked = "_checked_j00rc_79";
const disabled = "_disabled_j00rc_87";

var css$c = "._checkbox_j00rc_1{display:inline-block;position:relative;--size:17px}._checkbox_j00rc_1:before{content:\"\";position:absolute;top:50%;left:50%;width:200%;height:200%;background-color:var(--main-theme-color);border-radius:999px;opacity:.25;transform:translate(-50%,-50%) scale(0);transition-property:transform;transition-duration:.25s}._checkbox_j00rc_1:focus-within:before{transform:translate(-50%,-50%) scale(1)}._real-checkbox_j00rc_53{top:0;position:absolute;opacity:0;pointer-events:none}._icon_j00rc_67{display:block;width:var(--size);height:var(--size)}._checked_j00rc_79{fill:var(--main-theme-color)}._disabled_j00rc_87{fill:var(--dark-gray)}";

appendCss(css$c);

const Icon = (props) => (
// @ts-ignore - TS bug https://github.com/microsoft/TypeScript/issues/16019
h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props }));
const ToggleAliasingIcon = (props) => (h(Icon, { ...props },
    h("circle", { cx: "12", cy: "12", r: "8", fill: "none", stroke: "currentColor", "stroke-width": "2" })));
const ToggleAliasingActiveIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M12 3h5v2h2v2h2v5h-2V9h-2V7h-2V5h-3V3M21 12v5h-2v2h-2v2h-5v-2h3v-2h2v-2h2v-3h2M12 21H7v-2H5v-2H3v-5h2v3h2v2h2v2h3v2M3 12V7h2V5h2V3h5v2H9v2H7v2H5v3H3" })));
const ToggleBackgroundIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.9 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z" })));
const ToggleBackgroundActiveIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8a2 2 0 0 0-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2a2 2 0 0 0-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.9 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8a2 2 0 0 0 2-2h-2v2zM5 7H3v12c0 1.1.9 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z" })));
const RotateIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M15.6 5.5L11 1v3a8 8 0 0 0 0 16v-2a6 6 0 0 1 0-12v4l4.5-4.5zm4.3 5.5a8 8 0 0 0-1.6-3.9L17 8.5c.5.8.9 1.6 1 2.5h2zM13 17.9v2a8 8 0 0 0 3.9-1.6L15.5 17c-.8.5-1.6.9-2.5 1zm3.9-2.4l1.4 1.4A8 8 0 0 0 20 13h-2c-.1.9-.5 1.7-1 2.5z" })));
const AddIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })));
const RemoveIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M19 13H5v-2h14v2z" })));
const UncheckedIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M21.3 2.7v18.6H2.7V2.7h18.6m0-2.7H2.7A2.7 2.7 0 0 0 0 2.7v18.6A2.7 2.7 0 0 0 2.7 24h18.6a2.7 2.7 0 0 0 2.7-2.7V2.7A2.7 2.7 0 0 0 21.3 0z" })));
const CheckedIcon = (props) => (h(Icon, { ...props },
    h("path", { d: "M21.3 0H2.7A2.7 2.7 0 0 0 0 2.7v18.6A2.7 2.7 0 0 0 2.7 24h18.6a2.7 2.7 0 0 0 2.7-2.7V2.7A2.7 2.7 0 0 0 21.3 0zm-12 18.7L2.7 12l1.8-1.9L9.3 15 19.5 4.8l1.8 1.9z" })));
const Arrow = () => (h("svg", { viewBox: "0 -1.95 9.8 9.8" },
    h("path", { d: "M8.2.2a1 1 0 011.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4A1 1 0 011.6.2l3.3 3.3L8.2.2z" })));
const DownloadIcon = () => (h("svg", { viewBox: "0 0 23.9 24.9" },
    h("path", { d: "M6.6 2.7h-4v13.2h2.7A2.7 2.7 0 018 18.6a2.7 2.7 0 002.6 2.6h2.7a2.7 2.7 0 002.6-2.6 2.7 2.7 0 012.7-2.7h2.6V2.7h-4a1.3 1.3 0 110-2.7h4A2.7 2.7 0 0124 2.7v18.5a2.7 2.7 0 01-2.7 2.7H2.7A2.7 2.7 0 010 21.2V2.7A2.7 2.7 0 012.7 0h4a1.3 1.3 0 010 2.7zm4 7.4V1.3a1.3 1.3 0 112.7 0v8.8L15 8.4a1.3 1.3 0 011.9 1.8l-4 4a1.3 1.3 0 01-1.9 0l-4-4A1.3 1.3 0 019 8.4z" })));
const SwapIcon = () => (h("svg", { viewBox: "0 0 18 14" },
    h("path", { d: "M5.5 3.6v6.8L2.1 7l3.4-3.4M7 0L0 7l7 7V0zm4 0v14l7-7-7-7z" })));
const SaveIcon = () => (h("svg", { viewBox: "0 0 24 24" },
    h("g", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" },
        h("path", { d: "M12.501 20.93c-.866.25-1.914-.166-2.176-1.247a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.074.26 1.49 1.296 1.252 2.158M19 22v-6m3 3l-3-3l-3 3" }),
        h("path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" }))));
const ImportIcon = () => (h("svg", { viewBox: "0 0 24 24" },
    h("g", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" },
        h("path", { d: "M12.52 20.924c-.87.262-1.93-.152-2.195-1.241a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.088.264 1.502 1.323 1.242 2.192M19 16v6m3-3l-3 3l-3-3" }),
        h("path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" }))));

class Checkbox extends d {
    render(props) {
        return (h("div", { class: checkbox$2 },
            props.checked ? (props.disabled ? (h(CheckedIcon, { class: `${icon} ${disabled}` })) : (h(CheckedIcon, { class: `${icon} ${checked}` }))) : (h(UncheckedIcon, { class: icon })),
            h("input", { class: realCheckbox$2, type: "checkbox", ...props })));
    }
}

const childrenExiting = "_children-exiting_nmxuz_1";

var css$b = "._children-exiting_nmxuz_1>*{pointer-events:none}";

appendCss(css$b);

class Expander extends d {
    static getDerivedStateFromProps(props, state) {
        if (!props.children && state.children) {
            return { children: props.children, outgoingChildren: state.children };
        }
        if (props.children !== state.children) {
            return { children: props.children, outgoingChildren: undefined };
        }
        return null;
    }
    async componentDidUpdate(_, previousState) {
        let heightFrom;
        let heightTo;
        if (previousState.children && !this.state.children) {
            heightFrom = this.base.getBoundingClientRect().height;
            heightTo = 0;
        }
        else if (!previousState.children && this.state.children) {
            heightFrom = 0;
            heightTo = this.base.getBoundingClientRect().height;
        }
        else {
            return;
        }
        this.base.style.overflow = 'hidden';
        await transitionHeight(this.base, {
            duration: 300,
            from: heightFrom,
            to: heightTo,
        });
        // Unset the height & overflow, so element changes do the right thing.
        this.base.style.height = '';
        this.base.style.overflow = '';
        this.setState({ outgoingChildren: undefined });
    }
    render({}, { children, outgoingChildren }) {
        return (h("div", { class: outgoingChildren ? childrenExiting : '' }, outgoingChildren || children));
    }
}

const select = "_select_kqeu1_1";
const builtinSelect = "_builtin-select_kqeu1_9";
const arrow$1 = "_arrow_kqeu1_37";
const large = "_large_kqeu1_57";

var css$a = "._select_kqeu1_1{position:relative}._builtin-select_kqeu1_9{background:var(--black);border-radius:4px;font:inherit;padding:7px 25px 7px 10px;-webkit-appearance:none;-moz-appearance:none;border:none;color:#fff;width:100%}._arrow_kqeu1_37{position:absolute;right:8px;top:50%;transform:translateY(-50%);fill:#fff;width:10px;pointer-events:none}._large_kqeu1_57{padding:10px 35px 10px 10px;background:var(--dark-gray)}._large_kqeu1_57 ._arrow_kqeu1_37{right:13px}";

appendCss(css$a);

class Select extends d {
    render(props) {
        const { large: large$1, ...otherProps } = props;
        return (h("div", { class: select },
            h("select", { class: `${builtinSelect} ${large$1 ? large : ''}`, ...otherProps }),
            h("div", { class: arrow$1 },
                h(Arrow, null))));
    }
}

const range = "_range_ozfiq_1";
const labelText = "_label-text_ozfiq_15";
const rangeWcContainer = "_range-wc-container_ozfiq_23";
const rangeWc = "_range-wc_ozfiq_23";
const textInput = "_text-input_ozfiq_45";

var css$9 = "._range_ozfiq_1{position:relative;z-index:0;display:grid;grid-template-columns:1fr auto}._label-text_ozfiq_15{color:#fff}._range-wc-container_ozfiq_23{position:relative;z-index:1;grid-row:2/3;grid-column:1/3}._range-wc_ozfiq_23{width:100%}._text-input_ozfiq_45{grid-row:1/2;grid-column:2/3;text-align:right;background:transparent;color:inherit;font:inherit;border:none;padding:2px 5px;box-sizing:border-box;text-decoration:underline;text-decoration-style:dotted;text-decoration-color:var(--main-theme-color);text-underline-position:under;width:54px;position:relative;left:5px}._text-input_ozfiq_45:focus{background:#fff;color:#000}._text-input_ozfiq_45{-moz-appearance:textfield}._text-input_ozfiq_45::-webkit-inner-spin-button,._text-input_ozfiq_45::-webkit-outer-spin-button{-moz-appearance:none;-webkit-appearance:none;margin:0}";

appendCss(css$9);

const input = "_input_r0fjl_59";
const thumb$1 = "_thumb_r0fjl_75";
const thumbWrapper = "_thumb-wrapper_r0fjl_107";
const valueDisplay = "_value-display_r0fjl_127";
const touchActive = "_touch-active_r0fjl_203";

var css$8 = "range-input{position:relative;display:flex;height:18px;width:130px;margin:2px;font:inherit;line-height:16px;overflow:visible}range-input[disabled]{filter:grayscale(1)}range-input:before{content:\"\";display:block;position:absolute;top:8px;left:0;width:100%;height:2px;border-radius:1px;background:linear-gradient(var(--main-theme-color),var(--main-theme-color)) 0/var(--value-percent,0) 100% no-repeat var(--medium-light-gray)}._input_r0fjl_59{position:relative;width:100%;padding:0;margin:0;opacity:0}._thumb_r0fjl_75{pointer-events:none;position:absolute;bottom:3px;left:0;margin-left:-6px;background:var(--main-theme-color);border-radius:50%;width:12px;height:12px}range-input:focus-within ._thumb_r0fjl_75{outline:2px solid #fff}._thumb-wrapper_r0fjl_107{position:absolute;left:6px;right:6px;bottom:0;height:0;overflow:visible;transform:translate(var(--value-percent,0))}._value-display_r0fjl_127{position:absolute;box-sizing:border-box;left:0;bottom:3px;width:32px;height:62px;text-align:center;padding:8px 3px 0;margin:0 0 0 -16px;transform-origin:50% 90%;opacity:.0001;transform:scale(.2);color:#fff;font:inherit;font-size:calc(100% - var(--value-width, 3)/5*0.2em);text-overflow:clip;text-shadow:0 -.5px 0 rgba(0,0,0,.4);transition:all .2s ease;transition-property:opacity,transform;will-change:transform;pointer-events:none;overflow:hidden}._value-display_r0fjl_127>svg{position:absolute;top:0;left:0;width:100%;height:100%;fill:var(--main-theme-color)}._value-display_r0fjl_127>span{position:relative}._touch-active_r0fjl_203+._thumb-wrapper_r0fjl_107 ._value-display_r0fjl_127{opacity:1;transform:scale(1)}._touch-active_r0fjl_203+._thumb-wrapper_r0fjl_107 ._thumb_r0fjl_75{box-shadow:0 1px 3px rgba(0,0,0,.5)}";

appendCss(css$8);

const RETARGETED_EVENTS = ['focus', 'blur'];
const UPDATE_EVENTS = ['input', 'change'];
const REFLECTED_PROPERTIES = [
    'name',
    'min',
    'max',
    'step',
    'value',
    'disabled',
];
const REFLECTED_ATTRIBUTES = [
    'name',
    'min',
    'max',
    'step',
    'value',
    'disabled',
];
function getPrecision(value) {
    const afterDecimal = value.split('.')[1];
    return afterDecimal ? afterDecimal.length : 0;
}
class RangeInputElement extends HTMLElement {
    constructor() {
        super();
        this._ignoreChange = false;
        this._retargetEvent = (event) => {
            event.stopImmediatePropagation();
            const retargetted = new Event(event.type, event);
            this.dispatchEvent(retargetted);
        };
        this._update = () => {
            // Not connected?
            if (!this._valueDisplay)
                return;
            const value = Number(this.value) || 0;
            const min = Number(this.min) || 0;
            const max = Number(this.max) || 100;
            const percent = (100 * (value - min)) / (max - min);
            const displayValue = this._getDisplayValue(value);
            this._valueDisplay.textContent = displayValue;
            this.style.setProperty('--value-percent', percent + '%');
            this.style.setProperty('--value-width', '' + displayValue.length);
        };
        this._input = document.createElement('input');
        this._input.type = 'range';
        this._input.className = input;
        let activePointer;
        // Not using pointer-tracker here due to https://bugs.webkit.org/show_bug.cgi?id=219636.
        this.addEventListener('pointerdown', (event) => {
            if (activePointer)
                return;
            activePointer = event.pointerId;
            this._input.classList.add(touchActive);
            const pointerUp = (event) => {
                if (event.pointerId !== activePointer)
                    return;
                activePointer = undefined;
                this._input.classList.remove(touchActive);
                window.removeEventListener('pointerup', pointerUp);
                window.removeEventListener('pointercancel', pointerUp);
            };
            window.addEventListener('pointerup', pointerUp);
            window.addEventListener('pointercancel', pointerUp);
        });
        for (const event of RETARGETED_EVENTS) {
            this._input.addEventListener(event, this._retargetEvent, true);
        }
        for (const event of UPDATE_EVENTS) {
            this._input.addEventListener(event, this._update, true);
        }
    }
    static get observedAttributes() {
        return REFLECTED_ATTRIBUTES;
    }
    connectedCallback() {
        if (this.contains(this._input))
            return;
        this.innerHTML =
            `<div class="${thumbWrapper}">` +
                `<div class="${thumb$1}"></div>` +
                `<div class="${valueDisplay}"><svg width="32" height="62"><path d="M27.3 27.3C25 29.6 17 35.8 17 43v3c0 3 2.5 5 3.2 5.8a6 6 0 1 1-8.5 0C12.6 51 15 49 15 46v-3c0-7.2-8-13.4-10.3-15.7A16 16 0 0 1 16 0a16 16 0 0 1 11.3 27.3z"/></svg><span></span></div>` +
                '</div>';
        this.insertBefore(this._input, this.firstChild);
        this._valueDisplay = this.querySelector('.' + valueDisplay + ' > span');
        // Set inline styles (this is useful when used with frameworks which might clear inline styles)
        this._update();
    }
    get labelPrecision() {
        return this.getAttribute('label-precision') || '';
    }
    set labelPrecision(precision) {
        this.setAttribute('label-precision', precision);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (this._ignoreChange)
            return;
        if (newValue === null) {
            this._input.removeAttribute(name);
        }
        else {
            this._input.setAttribute(name, newValue);
        }
        this._reflectAttributes();
        this._update();
    }
    _getDisplayValue(value) {
        if (value >= 10000)
            return (value / 1000).toFixed(1) + 'k';
        const labelPrecision = Number(this.labelPrecision) || getPrecision(this.step) || 0;
        return labelPrecision
            ? value.toFixed(labelPrecision)
            : Math.round(value).toString();
    }
    _reflectAttributes() {
        this._ignoreChange = true;
        for (const attributeName of REFLECTED_ATTRIBUTES) {
            if (this._input.hasAttribute(attributeName)) {
                this.setAttribute(attributeName, this._input.getAttribute(attributeName));
            }
            else {
                this.removeAttribute(attributeName);
            }
        }
        this._ignoreChange = false;
    }
}
for (const prop of REFLECTED_PROPERTIES) {
    Object.defineProperty(RangeInputElement.prototype, prop, {
        get() {
            return this._input[prop];
        },
        set(val) {
            this._input[prop] = val;
            this._reflectAttributes();
            this._update();
        },
    });
}
customElements.define('range-input', RangeInputElement);

class Range extends d {
    constructor() {
        super(...arguments);
        this.onTextInput = (event) => {
            const input = event.target;
            const value = input.value.trim();
            if (!value)
                return;
            this.rangeWc.value = input.value;
            this.rangeWc.dispatchEvent(new InputEvent('input', {
                bubbles: event.bubbles,
            }));
        };
        this.onTextFocus = () => {
            this.setState({ textFocused: true });
        };
        this.onTextBlur = () => {
            this.setState({ textFocused: false });
        };
    }
    render(props, state) {
        const { children, ...otherProps } = props;
        const { value, min, max, step } = props;
        const textValue = state.textFocused ? this.inputEl.value : value;
        return (h("label", { class: range },
            h("span", { class: labelText }, children),
            h("div", { class: rangeWcContainer },
                h("range-input", { ref: linkRef(this, 'rangeWc'), class: rangeWc, ...otherProps })),
            h("input", { ref: linkRef(this, 'inputEl'), type: "number", class: textInput, value: textValue, min: min, max: max, step: step, onInput: this.onTextInput, onFocus: this.onTextFocus, onBlur: this.onTextBlur })));
    }
}

var t,r=(function(t,r){t.exports=function(t,r,e,n,o){for(r=r.split?r.split("."):r,n=0;n<r.length;n++)t=t?t[r[n]]:o;return t===o?e:t};}(t={path:void 0,exports:{},require:function(t,r){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),t.exports);function linkState(t,e,n){var o=e.split("."),u=t.__lsc||(t.__lsc={});return u[e+n]||(u[e+n]=function(e){for(var u=e&&e.target||this,i={},c=i,s="string"==typeof n?r(e,n):u&&u.nodeName?u.type.match(/^che|rad/)?u.checked:u.value:e,a=0;a<o.length-1;a++)c=c[o[a]]||(c[o[a]]=!a&&t.state[o[a]]||{});c[o[a]]=s,t.setState(i);})}

const checkbox$1 = "_checkbox_18gq6_1";
const arrow = "_arrow_18gq6_11";
const realCheckbox$1 = "_real-checkbox_18gq6_39";

var css$7 = "._checkbox_18gq6_1{display:inline-block;position:relative}._arrow_18gq6_11{width:10px;height:10px;fill:var(--white);transition:transform .2s ease;transform:rotate(-90deg)}._arrow_18gq6_11 svg{width:100%;height:100%;display:block}._real-checkbox_18gq6_39{top:0;position:absolute;opacity:0;pointer-events:none}._real-checkbox_18gq6_39:checked+._arrow_18gq6_11{transform:none}";

appendCss(css$7);

class Revealer extends d {
    render(props) {
        return (h("div", { class: checkbox$1 },
            h("input", { class: realCheckbox$1, type: "checkbox", ...props }),
            h("div", { class: arrow },
                h(Arrow, null))));
    }
}

const encode$9 = (signal, workerBridge, imageData, options) => workerBridge.avifEncode(signal, imageData, options);
/**
 * AVIF quality ranges from 0 (worst) to 100 (lossless).
 * Since lossless is a separate checkbox, we cap user-inputted quality at 99
 *
 * AVIF speed ranges from 0 (slowest) to 10 (fastest).
 * We display it as 'effort' to the user since it conveys the speed-size tradeoff
 * much better: speed = 10 - effort
 */
const MAX_QUALITY = 100;
const MAX_EFFORT = 10;
class Options$9 extends d {
    constructor() {
        super(...arguments);
        // The rest of the defaults are set in getDerivedStateFromProps
        this.state = {
            showAdvanced: false,
        };
        this._inputChangeCallbacks = new Map();
        this._inputChange = (prop, type) => {
            // Cache the callback for performance
            if (!this._inputChangeCallbacks.has(prop)) {
                this._inputChangeCallbacks.set(prop, (event) => {
                    const formEl = event.target;
                    const newVal = type === 'boolean'
                        ? 'checked' in formEl
                            ? formEl.checked
                            : !!formEl.value
                        : type === 'number'
                            ? Number(formEl.value)
                            : formEl.value;
                    const newState = {
                        [prop]: newVal,
                    };
                    const optionState = {
                        ...this.state,
                        ...newState,
                    };
                    const newOptions = {
                        quality: optionState.lossless ? MAX_QUALITY : optionState.quality,
                        qualityAlpha: optionState.lossless || !optionState.separateAlpha
                            ? -1 // Set qualityAlpha to quality
                            : optionState.alphaQuality,
                        // Always set to 4:4:4 if lossless
                        subsample: optionState.lossless ? 3 : optionState.subsample,
                        tileColsLog2: optionState.tileCols,
                        tileRowsLog2: optionState.tileRows,
                        speed: MAX_EFFORT - optionState.effort,
                        chromaDeltaQ: optionState.chromaDeltaQ,
                        sharpness: optionState.sharpness,
                        denoiseLevel: optionState.denoiseLevel,
                        tune: optionState.tune,
                        enableSharpYUV: optionState.enableSharpYUV,
                    };
                    // Updating options, so we don't recalculate in getDerivedStateFromProps.
                    newState.options = newOptions;
                    this.setState(
                    // It isn't clear to me why I have to cast this :)
                    newState);
                    this.props.onChange(newOptions);
                });
            }
            return this._inputChangeCallbacks.get(prop);
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.options && shallowEqual(state.options, props.options)) {
            return null;
        }
        const { options } = props;
        const lossless = options.quality === MAX_QUALITY &&
            (options.qualityAlpha == -1 || options.qualityAlpha == MAX_QUALITY) &&
            options.subsample == 3;
        const separateAlpha = options.qualityAlpha !== -1;
        // Create default form state from options
        return {
            options,
            lossless,
            quality: lossless ? defaultOptions$c.quality : options.quality,
            separateAlpha,
            alphaQuality: separateAlpha ? options.qualityAlpha : options.quality,
            subsample: options.subsample,
            tileRows: options.tileRowsLog2,
            tileCols: options.tileColsLog2,
            effort: MAX_EFFORT - options.speed,
            chromaDeltaQ: options.chromaDeltaQ,
            sharpness: options.sharpness,
            denoiseLevel: options.denoiseLevel,
            tune: options.tune,
            enableSharpYUV: options.enableSharpYUV,
        };
    }
    render(_, { effort, lossless, alphaQuality, separateAlpha, quality, showAdvanced, subsample, tileCols, tileRows, chromaDeltaQ, sharpness, denoiseLevel, tune, enableSharpYUV, }) {
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionToggle },
                "Lossless",
                h(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
            h(Expander, null, !lossless && (h("div", { class: optionOneCell },
                h(Range, { min: "0", max: MAX_QUALITY - 1, value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")))),
            h("label", { class: optionReveal },
                h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                "Advanced settings"),
            h(Expander, null, showAdvanced && (h("div", null,
                h(Expander, null, !lossless && (h("div", null,
                    h("label", { class: optionTextFirst },
                        "Subsample chroma:",
                        h(Select, { value: subsample, onChange: this._inputChange('subsample', 'number') },
                            h("option", { value: "0" }, "4:0:0"),
                            h("option", { value: "1" }, "4:2:0"),
                            h("option", { value: "2" }, "4:2:2"),
                            h("option", { value: "3" }, "4:4:4"))),
                    h(Expander, null, subsample === 1 && (h("label", { class: optionToggle },
                        "Sharp YUV Downsampling",
                        h(Checkbox, { checked: enableSharpYUV, onChange: this._inputChange('enableSharpYUV', 'boolean') })))),
                    h("label", { class: optionToggle },
                        "Separate alpha quality",
                        h(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })),
                    h(Expander, null, separateAlpha && (h("div", { class: optionOneCell },
                        h(Range, { min: "0", max: MAX_QUALITY - 1, value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number') }, "Alpha quality:")))),
                    h("label", { class: optionToggle },
                        "Extra chroma compression",
                        h(Checkbox, { checked: chromaDeltaQ, onChange: this._inputChange('chromaDeltaQ', 'boolean') })),
                    h("div", { class: optionOneCell },
                        h(Range, { min: "0", max: "7", value: sharpness, onInput: this._inputChange('sharpness', 'number') }, "Sharpness:")),
                    h("div", { class: optionOneCell },
                        h(Range, { min: "0", max: "50", value: denoiseLevel, onInput: this._inputChange('denoiseLevel', 'number') }, "Noise synthesis:")),
                    h("label", { class: optionTextFirst },
                        "Tuning:",
                        h(Select, { value: tune, onChange: this._inputChange('tune', 'number') },
                            h("option", { value: 0 /* auto */ }, "Auto"),
                            h("option", { value: 1 /* psnr */ }, "PSNR"),
                            h("option", { value: 2 /* ssim */ }, "SSIM")))))),
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "6", value: tileRows, onInput: this._inputChange('tileRows', 'number') }, "Log2 of tile rows:")),
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "6", value: tileCols, onInput: this._inputChange('tileCols', 'number') }, "Log2 of tile cols:"))))),
            h("div", { class: optionOneCell },
                h(Range, { min: "0", max: MAX_EFFORT, value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
    }
}

var avifEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$9,
    Options: Options$9
});

const featureTest = () => canvasEncodeTest(mimeType$8);
const encode$8 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$8);

var browserGIFEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    featureTest: featureTest,
    encode: encode$8
});

function qualityOption(opts = {}) {
    const { min = 0, max = 100, step = 1 } = opts;
    class QualityOptions extends d {
        constructor() {
            super(...arguments);
            this.onChange = (event) => {
                const el = event.currentTarget;
                this.props.onChange({ quality: Number(el.value) });
            };
        }
        render({ options }) {
            return (h("div", { class: optionsSection },
                h("div", { class: optionOneCell },
                    h(Range, { name: "quality", min: min, max: max, step: step || 'any', value: options.quality, onInput: this.onChange }, "Quality:"))));
        }
    }
    return QualityOptions;
}

const encode$7 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$7, options.quality);
const Options$8 = qualityOption({ min: 0, max: 1, step: 0.01 });

var browserJPEGEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$7,
    Options: Options$8
});

const encode$6 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$6);

var browserPNGEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$6
});

const encode$5 = (signal, workerBridge, imageData, options) => workerBridge.jxlEncode(signal, imageData, options);
class Options$7 extends d {
    constructor() {
        super(...arguments);
        // The rest of the defaults are set in getDerivedStateFromProps
        this.state = {
            lossless: false,
        };
        this._inputChangeCallbacks = new Map();
        this._inputChange = (prop, type) => {
            // Cache the callback for performance
            if (!this._inputChangeCallbacks.has(prop)) {
                this._inputChangeCallbacks.set(prop, (event) => {
                    const formEl = event.target;
                    const newVal = type === 'boolean'
                        ? 'checked' in formEl
                            ? formEl.checked
                            : !!formEl.value
                        : Number(formEl.value);
                    const newState = {
                        [prop]: newVal,
                    };
                    const optionState = {
                        ...this.state,
                        ...newState,
                    };
                    const newOptions = {
                        effort: optionState.effort,
                        quality: optionState.lossless ? 100 : optionState.quality,
                        progressive: optionState.progressive,
                        epf: optionState.autoEdgePreservingFilter
                            ? -1
                            : optionState.edgePreservingFilter,
                        lossyPalette: optionState.lossless ? optionState.slightLoss : false,
                        decodingSpeedTier: optionState.decodingSpeedTier,
                        photonNoiseIso: optionState.photonNoiseIso,
                        lossyModular: optionState.quality < 7 ? true : optionState.alternativeLossy,
                    };
                    // Updating options, so we don't recalculate in getDerivedStateFromProps.
                    newState.options = newOptions;
                    this.setState(newState);
                    this.props.onChange(newOptions);
                });
            }
            return this._inputChangeCallbacks.get(prop);
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.options && shallowEqual(state.options, props.options)) {
            return null;
        }
        const { options } = props;
        // Create default form state from options
        return {
            options,
            effort: options.effort,
            quality: options.quality,
            progressive: options.progressive,
            edgePreservingFilter: options.epf === -1 ? 2 : options.epf,
            lossless: options.quality === 100,
            slightLoss: options.lossyPalette,
            autoEdgePreservingFilter: options.epf === -1,
            decodingSpeedTier: options.decodingSpeedTier,
            photonNoiseIso: options.photonNoiseIso,
            alternativeLossy: options.lossyModular,
        };
    }
    render({}, { effort, quality, progressive, edgePreservingFilter, lossless, slightLoss, autoEdgePreservingFilter, decodingSpeedTier, photonNoiseIso, alternativeLossy, }) {
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionToggle },
                "Lossless",
                h(Checkbox, { name: "lossless", checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
            h(Expander, null, lossless && (h("label", { class: optionToggle },
                "Slight loss",
                h(Checkbox, { name: "slightLoss", checked: slightLoss, onChange: this._inputChange('slightLoss', 'boolean') })))),
            h(Expander, null, !lossless && (h("div", null,
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "99.9", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")),
                h("label", { class: optionToggle },
                    "Alternative lossy mode",
                    h(Checkbox, { checked: quality < 7 ? true : alternativeLossy, disabled: quality < 7, onChange: this._inputChange('alternativeLossy', 'boolean') })),
                h("label", { class: optionToggle },
                    "Auto edge filter",
                    h(Checkbox, { checked: autoEdgePreservingFilter, onChange: this._inputChange('autoEdgePreservingFilter', 'boolean') })),
                h(Expander, null, !autoEdgePreservingFilter && (h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "3", value: edgePreservingFilter, onInput: this._inputChange('edgePreservingFilter', 'number') }, "Edge preserving filter:")))),
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "4", value: decodingSpeedTier, onInput: this._inputChange('decodingSpeedTier', 'number') }, "Optimise for decoding speed (worse compression):")),
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "50000", step: "100", value: photonNoiseIso, onInput: this._inputChange('photonNoiseIso', 'number') }, "Noise equivalent to ISO:"))))),
            h("label", { class: optionToggle },
                "Progressive rendering",
                h(Checkbox, { name: "progressive", checked: progressive, onChange: this._inputChange('progressive', 'boolean') })),
            h("div", { class: optionOneCell },
                h(Range, { min: "1", max: "9", value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
    }
}

var jxlEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$5,
    Options: Options$7
});

function encode$4(signal, workerBridge, imageData, options) {
    return workerBridge.mozjpegEncode(signal, imageData, options);
}
class Options$6 extends d {
    constructor() {
        super(...arguments);
        this.state = {
            showAdvanced: false,
        };
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const { options } = this.props;
            const newOptions = {
                // Copy over options the form doesn't currently care about, eg arithmetic
                ...this.props.options,
                // And now stuff from the form:
                // .checked
                baseline: inputFieldChecked(form.baseline, options.baseline),
                progressive: inputFieldChecked(form.progressive, options.progressive),
                optimize_coding: inputFieldChecked(form.optimize_coding, options.optimize_coding),
                trellis_multipass: inputFieldChecked(form.trellis_multipass, options.trellis_multipass),
                trellis_opt_zero: inputFieldChecked(form.trellis_opt_zero, options.trellis_opt_zero),
                trellis_opt_table: inputFieldChecked(form.trellis_opt_table, options.trellis_opt_table),
                auto_subsample: inputFieldChecked(form.auto_subsample, options.auto_subsample),
                separate_chroma_quality: inputFieldChecked(form.separate_chroma_quality, options.separate_chroma_quality),
                // .value
                quality: inputFieldValueAsNumber(form.quality, options.quality),
                chroma_quality: inputFieldValueAsNumber(form.chroma_quality, options.chroma_quality),
                chroma_subsample: inputFieldValueAsNumber(form.chroma_subsample, options.chroma_subsample),
                smoothing: inputFieldValueAsNumber(form.smoothing, options.smoothing),
                color_space: inputFieldValueAsNumber(form.color_space, options.color_space),
                quant_table: inputFieldValueAsNumber(form.quant_table, options.quant_table),
                trellis_loops: inputFieldValueAsNumber(form.trellis_loops, options.trellis_loops),
            };
            this.props.onChange(newOptions);
        };
    }
    render({ options }, { showAdvanced }) {
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("div", { class: optionOneCell },
                h(Range, { name: "quality", min: "0", max: "100", value: options.quality, onInput: this.onChange }, "Quality:")),
            h("label", { class: optionReveal },
                h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                "Advanced settings"),
            h(Expander, null, showAdvanced ? (h("div", null,
                h("label", { class: optionTextFirst },
                    "Channels:",
                    h(Select, { name: "color_space", value: options.color_space, onChange: this.onChange },
                        h("option", { value: 1 /* GRAYSCALE */ }, "Grayscale"),
                        h("option", { value: 2 /* RGB */ }, "RGB"),
                        h("option", { value: 3 /* YCbCr */ }, "YCbCr"))),
                h(Expander, null, options.color_space === 3 /* YCbCr */ ? (h("div", null,
                    h("label", { class: optionToggle },
                        "Auto subsample chroma",
                        h(Checkbox, { name: "auto_subsample", checked: options.auto_subsample, onChange: this.onChange })),
                    h(Expander, null, options.auto_subsample ? null : (h("div", { class: optionOneCell },
                        h(Range, { name: "chroma_subsample", min: "1", max: "4", value: options.chroma_subsample, onInput: this.onChange }, "Subsample chroma by:")))),
                    h("label", { class: optionToggle },
                        "Separate chroma quality",
                        h(Checkbox, { name: "separate_chroma_quality", checked: options.separate_chroma_quality, onChange: this.onChange })),
                    h(Expander, null, options.separate_chroma_quality ? (h("div", { class: optionOneCell },
                        h(Range, { name: "chroma_quality", min: "0", max: "100", value: options.chroma_quality, onInput: this.onChange }, "Chroma quality:"))) : null))) : null),
                h("label", { class: optionToggle },
                    "Pointless spec compliance",
                    h(Checkbox, { name: "baseline", checked: options.baseline, onChange: this.onChange })),
                h(Expander, null, options.baseline ? null : (h("label", { class: optionToggle },
                    "Progressive rendering",
                    h(Checkbox, { name: "progressive", checked: options.progressive, onChange: this.onChange })))),
                h(Expander, null, options.baseline ? (h("label", { class: optionToggle },
                    "Optimize Huffman table",
                    h(Checkbox, { name: "optimize_coding", checked: options.optimize_coding, onChange: this.onChange }))) : null),
                h("div", { class: optionOneCell },
                    h(Range, { name: "smoothing", min: "0", max: "100", value: options.smoothing, onInput: this.onChange }, "Smoothing:")),
                h("label", { class: optionTextFirst },
                    "Quantization:",
                    h(Select, { name: "quant_table", value: options.quant_table, onChange: this.onChange },
                        h("option", { value: "0" }, "JPEG Annex K"),
                        h("option", { value: "1" }, "Flat"),
                        h("option", { value: "2" }, "MSSIM-tuned Kodak"),
                        h("option", { value: "3" }, "ImageMagick"),
                        h("option", { value: "4" }, "PSNR-HVS-M-tuned Kodak"),
                        h("option", { value: "5" }, "Klein et al"),
                        h("option", { value: "6" }, "Watson et al"),
                        h("option", { value: "7" }, "Ahumada et al"),
                        h("option", { value: "8" }, "Peterson et al"))),
                h("label", { class: optionToggle },
                    "Trellis multipass",
                    h(Checkbox, { name: "trellis_multipass", checked: options.trellis_multipass, onChange: this.onChange })),
                h(Expander, null, options.trellis_multipass ? (h("label", { class: optionToggle },
                    "Optimize zero block runs",
                    h(Checkbox, { name: "trellis_opt_zero", checked: options.trellis_opt_zero, onChange: this.onChange }))) : null),
                h("label", { class: optionToggle },
                    "Optimize after trellis quantization",
                    h(Checkbox, { name: "trellis_opt_table", checked: options.trellis_opt_table, onChange: this.onChange })),
                h("div", { class: optionOneCell },
                    h(Range, { name: "trellis_loops", min: "1", max: "50", value: options.trellis_loops, onInput: this.onChange }, "Trellis quantization passes:")))) : null)));
    }
}

var mozJPEGEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$4,
    Options: Options$6
});

async function encode$3(signal, workerBridge, imageData, options) {
    return workerBridge.oxipngEncode(signal, imageData, options);
}
class Options$5 extends d {
    constructor() {
        super(...arguments);
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const options = {
                level: inputFieldValueAsNumber(form.level),
                interlace: inputFieldChecked(form.interlace),
            };
            this.props.onChange(options);
        };
    }
    render({ options }) {
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionToggle },
                "Interlace",
                h(Checkbox, { name: "interlace", checked: options.interlace, onChange: this.onChange })),
            h("div", { class: optionOneCell },
                h(Range, { name: "level", min: "0", max: "6", step: "1", value: options.level, onInput: this.onChange }, "Effort:"))));
    }
}

var oxiPNGEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$3,
    Options: Options$5
});

function encode$2(signal, workerBridge, imageData, options) {
    return workerBridge.qoiEncode(signal, imageData, options);
}

var qoiEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$2
});

const encode$1 = (signal, workerBridge, imageData, options) => workerBridge.webpEncode(signal, imageData, options);
// From kLosslessPresets in config_enc.c
// The format is [method, quality].
const losslessPresets = [
    [0, 0],
    [1, 20],
    [2, 25],
    [3, 30],
    [3, 50],
    [4, 50],
    [4, 75],
    [4, 90],
    [5, 90],
    [6, 100],
];
const losslessPresetDefault = 6;
function determineLosslessQuality(quality, method) {
    const index = losslessPresets.findIndex(([presetMethod, presetQuality]) => presetMethod === method && presetQuality === quality);
    if (index !== -1)
        return index;
    // Quality doesn't match one of the presets.
    // This can happen when toggling 'lossless'.
    return losslessPresetDefault;
}
class Options$4 extends d {
    constructor() {
        super(...arguments);
        this.state = {
            showAdvanced: false,
        };
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const lossless = inputFieldCheckedAsNumber(form.lossless);
            const { options } = this.props;
            const losslessPresetValue = inputFieldValueAsNumber(form.lossless_preset, determineLosslessQuality(options.quality, options.method));
            const newOptions = {
                // Copy over options the form doesn't care about, eg emulate_jpeg_size
                ...options,
                // And now stuff from the form:
                lossless,
                // Special-cased inputs:
                // In lossless mode, the quality is derived from the preset.
                quality: lossless
                    ? losslessPresets[losslessPresetValue][1]
                    : inputFieldValueAsNumber(form.quality, options.quality),
                // In lossless mode, the method is derived from the preset.
                method: lossless
                    ? losslessPresets[losslessPresetValue][0]
                    : inputFieldValueAsNumber(form.method_input, options.method),
                image_hint: inputFieldCheckedAsNumber(form.image_hint, options.image_hint)
                    ? 3 /* WEBP_HINT_GRAPH */
                    : 0 /* WEBP_HINT_DEFAULT */,
                // .checked
                exact: inputFieldCheckedAsNumber(form.exact, options.exact),
                alpha_compression: inputFieldCheckedAsNumber(form.alpha_compression, options.alpha_compression),
                autofilter: inputFieldCheckedAsNumber(form.autofilter, options.autofilter),
                filter_type: inputFieldCheckedAsNumber(form.filter_type, options.filter_type),
                use_sharp_yuv: inputFieldCheckedAsNumber(form.use_sharp_yuv, options.use_sharp_yuv),
                // .value
                near_lossless: 100 -
                    inputFieldValueAsNumber(form.near_lossless, 100 - options.near_lossless),
                alpha_quality: inputFieldValueAsNumber(form.alpha_quality, options.alpha_quality),
                alpha_filtering: inputFieldValueAsNumber(form.alpha_filtering, options.alpha_filtering),
                sns_strength: inputFieldValueAsNumber(form.sns_strength, options.sns_strength),
                filter_strength: inputFieldValueAsNumber(form.filter_strength, options.filter_strength),
                filter_sharpness: 7 -
                    inputFieldValueAsNumber(form.filter_sharpness, 7 - options.filter_sharpness),
                pass: inputFieldValueAsNumber(form.pass, options.pass),
                preprocessing: inputFieldValueAsNumber(form.preprocessing, options.preprocessing),
                segments: inputFieldValueAsNumber(form.segments, options.segments),
                partitions: inputFieldValueAsNumber(form.partitions, options.partitions),
            };
            this.props.onChange(newOptions);
        };
    }
    _losslessSpecificOptions(options) {
        return (h("div", { key: "lossless" },
            h("div", { class: optionOneCell },
                h(Range, { name: "lossless_preset", min: "0", max: "9", value: determineLosslessQuality(options.quality, options.method), onInput: this.onChange }, "Effort:")),
            h("div", { class: optionOneCell },
                h(Range, { name: "near_lossless", min: "0", max: "100", value: '' + (100 - options.near_lossless), onInput: this.onChange }, "Slight loss:")),
            h("label", { class: optionToggle },
                "Discrete tone image",
                h(Checkbox, { name: "image_hint", checked: options.image_hint === 3 /* WEBP_HINT_GRAPH */, onChange: this.onChange }))));
    }
    _lossySpecificOptions(options) {
        const { showAdvanced } = this.state;
        return (h("div", { key: "lossy" },
            h("div", { class: optionOneCell },
                h(Range, { name: "method_input", min: "0", max: "6", value: options.method, onInput: this.onChange }, "Effort:")),
            h("div", { class: optionOneCell },
                h(Range, { name: "quality", min: "0", max: "100", step: "0.1", value: options.quality, onInput: this.onChange }, "Quality:")),
            h("label", { class: optionReveal },
                h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                "Advanced settings"),
            h(Expander, null, showAdvanced ? (h("div", null,
                h("label", { class: optionToggle },
                    "Compress alpha",
                    h(Checkbox, { name: "alpha_compression", checked: !!options.alpha_compression, onChange: this.onChange })),
                h("div", { class: optionOneCell },
                    h(Range, { name: "alpha_quality", min: "0", max: "100", value: options.alpha_quality, onInput: this.onChange }, "Alpha quality:")),
                h("div", { class: optionOneCell },
                    h(Range, { name: "alpha_filtering", min: "0", max: "2", value: options.alpha_filtering, onInput: this.onChange }, "Alpha filter quality:")),
                h("label", { class: optionToggle },
                    "Auto adjust filter strength",
                    h(Checkbox, { name: "autofilter", checked: !!options.autofilter, onChange: this.onChange })),
                h(Expander, null, options.autofilter ? null : (h("div", { class: optionOneCell },
                    h(Range, { name: "filter_strength", min: "0", max: "100", value: options.filter_strength, onInput: this.onChange }, "Filter strength:")))),
                h("label", { class: optionToggle },
                    "Strong filter",
                    h(Checkbox, { name: "filter_type", checked: !!options.filter_type, onChange: this.onChange })),
                h("div", { class: optionOneCell },
                    h(Range, { name: "filter_sharpness", min: "0", max: "7", value: 7 - options.filter_sharpness, onInput: this.onChange }, "Filter sharpness:")),
                h("label", { class: optionToggle },
                    "Sharp RGB\u2192YUV conversion",
                    h(Checkbox, { name: "use_sharp_yuv", checked: !!options.use_sharp_yuv, onChange: this.onChange })),
                h("div", { class: optionOneCell },
                    h(Range, { name: "pass", min: "1", max: "10", value: options.pass, onInput: this.onChange }, "Passes:")),
                h("div", { class: optionOneCell },
                    h(Range, { name: "sns_strength", min: "0", max: "100", value: options.sns_strength, onInput: this.onChange }, "Spatial noise shaping:")),
                h("label", { class: optionTextFirst },
                    "Preprocess:",
                    h(Select, { name: "preprocessing", value: options.preprocessing, onChange: this.onChange },
                        h("option", { value: "0" }, "None"),
                        h("option", { value: "1" }, "Segment smooth"),
                        h("option", { value: "2" }, "Pseudo-random dithering"))),
                h("div", { class: optionOneCell },
                    h(Range, { name: "segments", min: "1", max: "4", value: options.segments, onInput: this.onChange }, "Segments:")),
                h("div", { class: optionOneCell },
                    h(Range, { name: "partitions", min: "0", max: "3", value: options.partitions, onInput: this.onChange }, "Partitions:")))) : null)));
    }
    render({ options }) {
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionToggle },
                "Lossless",
                h(Checkbox, { name: "lossless", checked: !!options.lossless, onChange: this.onChange })),
            options.lossless
                ? this._losslessSpecificOptions(options)
                : this._lossySpecificOptions(options),
            h("label", { class: optionToggle },
                "Preserve transparent data",
                h(Checkbox, { name: "exact", checked: !!options.exact, onChange: this.onChange }))));
    }
}

var webPEncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode$1,
    Options: Options$4
});

const encode = (signal, workerBridge, imageData, options) => workerBridge.wp2Encode(signal, imageData, options);
class Options$3 extends d {
    constructor() {
        super(...arguments);
        // Other state is set in getDerivedStateFromProps
        this.state = {
            lossless: false,
            slightLoss: 0,
            quality: defaultOptions$3.quality,
            showAdvanced: false,
        };
        this._inputChangeCallbacks = new Map();
        this._inputChange = (prop, type) => {
            // Cache the callback for performance
            if (!this._inputChangeCallbacks.has(prop)) {
                this._inputChangeCallbacks.set(prop, (event) => {
                    const formEl = event.target;
                    const newVal = type === 'boolean'
                        ? 'checked' in formEl
                            ? formEl.checked
                            : !!formEl.value
                        : Number(formEl.value);
                    const newState = {
                        [prop]: newVal,
                    };
                    const optionState = {
                        ...this.state,
                        ...newState,
                    };
                    const newOptions = {
                        effort: optionState.effort,
                        quality: optionState.lossless
                            ? 100 - optionState.slightLoss
                            : optionState.quality,
                        alpha_quality: optionState.separateAlpha
                            ? optionState.alphaQuality
                            : optionState.quality,
                        pass: optionState.passes,
                        sns: optionState.sns,
                        uv_mode: optionState.uvMode,
                        csp_type: optionState.colorSpace,
                        error_diffusion: optionState.errorDiffusion,
                        use_random_matrix: optionState.useRandomMatrix,
                    };
                    // Updating options, so we don't recalculate in getDerivedStateFromProps.
                    newState.options = newOptions;
                    this.setState(newState);
                    this.props.onChange(newOptions);
                });
            }
            return this._inputChangeCallbacks.get(prop);
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.options && shallowEqual(state.options, props.options)) {
            return null;
        }
        const { options } = props;
        const modifyState = {
            options,
            effort: options.effort,
            alphaQuality: options.alpha_quality,
            passes: options.pass,
            sns: options.sns,
            uvMode: options.uv_mode,
            colorSpace: options.csp_type,
            errorDiffusion: options.error_diffusion,
            useRandomMatrix: options.use_random_matrix,
            separateAlpha: options.quality !== options.alpha_quality,
        };
        // If quality is > 95, it's lossless with slight loss
        if (options.quality > 95) {
            modifyState.lossless = true;
            modifyState.slightLoss = 100 - options.quality;
        }
        else {
            modifyState.quality = options.quality;
            modifyState.lossless = false;
        }
        return modifyState;
    }
    render({}, { effort, alphaQuality, passes, quality, sns, uvMode, lossless, slightLoss, colorSpace, errorDiffusion, useRandomMatrix, separateAlpha, showAdvanced, }) {
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionToggle },
                "Lossless",
                h(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
            h(Expander, null, lossless && (h("div", { class: optionOneCell },
                h(Range, { min: "0", max: "5", step: "0.1", value: slightLoss, onInput: this._inputChange('slightLoss', 'number') }, "Slight loss:")))),
            h(Expander, null, !lossless && (h("div", null,
                h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "95", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")),
                h("label", { class: optionToggle },
                    "Separate alpha quality",
                    h(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })),
                h(Expander, null, separateAlpha && (h("div", { class: optionOneCell },
                    h(Range, { min: "0", max: "100", step: "1", value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number') }, "Alpha Quality:")))),
                h("label", { class: optionReveal },
                    h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                    "Advanced settings"),
                h(Expander, null, showAdvanced && (h("div", null,
                    h("div", { class: optionOneCell },
                        h(Range, { min: "1", max: "10", step: "1", value: passes, onInput: this._inputChange('passes', 'number') }, "Passes:")),
                    h("div", { class: optionOneCell },
                        h(Range, { min: "0", max: "100", step: "1", value: sns, onInput: this._inputChange('sns', 'number') }, "Spatial noise shaping:")),
                    h("div", { class: optionOneCell },
                        h(Range, { min: "0", max: "100", step: "1", value: errorDiffusion, onInput: this._inputChange('errorDiffusion', 'number') }, "Error diffusion:")),
                    h("label", { class: optionTextFirst },
                        "Subsample chroma:",
                        h(Select, { value: uvMode, onInput: this._inputChange('uvMode', 'number') },
                            h("option", { value: 3 /* UVModeAuto */ }, "Auto"),
                            h("option", { value: 0 /* UVModeAdapt */ }, "Vary"),
                            h("option", { value: 1 /* UVMode420 */ }, "Half"),
                            h("option", { value: 2 /* UVMode444 */ }, "Off"))),
                    h("label", { class: optionTextFirst },
                        "Color space:",
                        h(Select, { value: colorSpace, onInput: this._inputChange('colorSpace', 'number') },
                            h("option", { value: 0 /* kYCoCg */ }, "YCoCg"),
                            h("option", { value: 1 /* kYCbCr */ }, "YCbCr"),
                            h("option", { value: 3 /* kYIQ */ }, "YIQ"))),
                    h("label", { class: optionToggle },
                        "Random matrix",
                        h(Checkbox, { checked: useRandomMatrix, onChange: this._inputChange('useRandomMatrix', 'boolean') })))))))),
            h("div", { class: optionOneCell },
                h(Range, { min: "0", max: "9", step: "1", value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
    }
}

var wp2EncoderEntry = /*#__PURE__*/Object.freeze({
    __proto__: null,
    encode: encode,
    Options: Options$3
});

const defaultOptions$2 = {
    zx: 0,
    maxNumColors: 256,
    dither: 1.0,
};

/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const workerResizeMethods = [
    'triangle',
    'catrom',
    'mitchell',
    'lanczos3',
    'hqx',
];
const defaultOptions$1 = {
    // Width and height will always default to the image size.
    // This is set elsewhere.
    width: 1,
    height: 1,
    // This will be set to 'vector' if the input is SVG.
    method: 'lanczos3',
    fitMethod: 'stretch',
    premultiply: true,
    linearRGB: true,
};

const defaultOptions = {
    rotate: 0,
};

// This file is autogenerated by lib/feature-plugin.js
const encoderMap = {
    avif: { meta: avifEncoderMeta, ...avifEncoderEntry },
    browserGIF: { meta: browserGIFEncoderMeta, ...browserGIFEncoderEntry },
    browserJPEG: { meta: browserJPEGEncoderMeta, ...browserJPEGEncoderEntry },
    browserPNG: { meta: browserPNGEncoderMeta, ...browserPNGEncoderEntry },
    jxl: { meta: jxlEncoderMeta, ...jxlEncoderEntry },
    mozJPEG: { meta: mozJPEGEncoderMeta, ...mozJPEGEncoderEntry },
    oxiPNG: { meta: oxiPNGEncoderMeta, ...oxiPNGEncoderEntry },
    qoi: { meta: qoiEncoderMeta, ...qoiEncoderEntry },
    webP: { meta: webPEncoderMeta, ...webPEncoderEntry },
    wp2: { meta: wp2EncoderMeta, ...wp2EncoderEntry },
};
const defaultProcessorState = {
    quantize: { enabled: false, ...defaultOptions$2 },
    resize: { enabled: false, ...defaultOptions$1 },
};
const defaultPreprocessorState = {
    rotate: defaultOptions,
};

class Pointer {
    constructor(nativePointer) {
        /** Unique ID for this pointer */
        this.id = -1;
        this.nativePointer = nativePointer;
        this.pageX = nativePointer.pageX;
        this.pageY = nativePointer.pageY;
        this.clientX = nativePointer.clientX;
        this.clientY = nativePointer.clientY;
        if (self.Touch && nativePointer instanceof Touch) {
            this.id = nativePointer.identifier;
        }
        else if (isPointerEvent(nativePointer)) {
            // is PointerEvent
            this.id = nativePointer.pointerId;
        }
    }
    /**
     * Returns an expanded set of Pointers for high-resolution inputs.
     */
    getCoalesced() {
        if ('getCoalescedEvents' in this.nativePointer) {
            const events = this.nativePointer
                .getCoalescedEvents()
                .map((p) => new Pointer(p));
            // Firefox sometimes returns an empty list here. I'm not sure it's doing the right thing.
            // https://github.com/w3c/pointerevents/issues/409
            if (events.length > 0)
                return events;
        }
        return [this];
    }
}
const isPointerEvent = (event) => 'pointerId' in event;
const isTouchEvent = (event) => 'changedTouches' in event;
const noop = () => { };
/**
 * Track pointers across a particular element
 */
class PointerTracker {
    /**
     * Track pointers across a particular element
     *
     * @param element Element to monitor.
     * @param options
     */
    constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false, } = {}) {
        this._element = _element;
        /**
         * State of the tracked pointers when they were pressed/touched.
         */
        this.startPointers = [];
        /**
         * Latest state of the tracked pointers. Contains the same number of pointers, and in the same
         * order as this.startPointers.
         */
        this.currentPointers = [];
        /**
         * Firefox has a bug where touch-based pointer events have a `buttons` of 0, when this shouldn't
         * happen. https://bugzilla.mozilla.org/show_bug.cgi?id=1729440
         *
         * Usually we treat `buttons === 0` as no-longer-pressed. This set allows us to exclude these
         * buggy Firefox events.
         */
        this._excludeFromButtonsCheck = new Set();
        /**
         * Listener for mouse/pointer starts.
         *
         * @param event This will only be a MouseEvent if the browser doesn't support pointer events.
         */
        this._pointerStart = (event) => {
            if (isPointerEvent(event) && event.buttons === 0) {
                // This is the buggy Firefox case. See _excludeFromButtonsCheck.
                this._excludeFromButtonsCheck.add(event.pointerId);
            }
            else if (!(event.buttons & 1 /* LeftMouseOrTouchOrPenDown */)) {
                return;
            }
            const pointer = new Pointer(event);
            // If we're already tracking this pointer, ignore this event.
            // This happens with mouse events when multiple buttons are pressed.
            if (this.currentPointers.some((p) => p.id === pointer.id))
                return;
            if (!this._triggerPointerStart(pointer, event))
                return;
            // Add listeners for additional events.
            // The listeners may already exist, but no harm in adding them again.
            if (isPointerEvent(event)) {
                const capturingElement = event.target && 'setPointerCapture' in event.target
                    ? event.target
                    : this._element;
                capturingElement.setPointerCapture(event.pointerId);
                this._element.addEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
                this._element.addEventListener('pointerup', this._pointerEnd);
                this._element.addEventListener('pointercancel', this._pointerEnd);
            }
            else {
                // MouseEvent
                window.addEventListener('mousemove', this._move);
                window.addEventListener('mouseup', this._pointerEnd);
            }
        };
        /**
         * Listener for touchstart.
         * Only used if the browser doesn't support pointer events.
         */
        this._touchStart = (event) => {
            for (const touch of Array.from(event.changedTouches)) {
                this._triggerPointerStart(new Pointer(touch), event);
            }
        };
        /**
         * Listener for pointer/mouse/touch move events.
         */
        this._move = (event) => {
            if (!isTouchEvent(event) &&
                (!isPointerEvent(event) ||
                    !this._excludeFromButtonsCheck.has(event.pointerId)) &&
                event.buttons === 0 /* None */) {
                // This happens in a number of buggy cases where the browser failed to deliver a pointerup
                // or pointercancel. If we see the pointer moving without any buttons down, synthesize an end.
                // https://github.com/w3c/pointerevents/issues/407
                // https://github.com/w3c/pointerevents/issues/408
                this._pointerEnd(event);
                return;
            }
            const previousPointers = this.currentPointers.slice();
            const changedPointers = isTouchEvent(event)
                ? Array.from(event.changedTouches).map((t) => new Pointer(t))
                : [new Pointer(event)];
            const trackedChangedPointers = [];
            for (const pointer of changedPointers) {
                const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
                if (index === -1)
                    continue; // Not a pointer we're tracking
                trackedChangedPointers.push(pointer);
                this.currentPointers[index] = pointer;
            }
            if (trackedChangedPointers.length === 0)
                return;
            this._moveCallback(previousPointers, trackedChangedPointers, event);
        };
        /**
         * Call the end callback for this pointer.
         *
         * @param pointer Pointer
         * @param event Related event
         */
        this._triggerPointerEnd = (pointer, event) => {
            // Main button still down?
            // With mouse events, you get a mouseup per mouse button, so the left button might still be down.
            if (!isTouchEvent(event) &&
                event.buttons & 1 /* LeftMouseOrTouchOrPenDown */) {
                return false;
            }
            const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
            // Not a pointer we're interested in?
            if (index === -1)
                return false;
            this.currentPointers.splice(index, 1);
            this.startPointers.splice(index, 1);
            this._excludeFromButtonsCheck.delete(pointer.id);
            // The event.type might be a 'move' event due to workarounds for weird mouse behaviour.
            // See _move for details.
            const cancelled = !(event.type === 'mouseup' ||
                event.type === 'touchend' ||
                event.type === 'pointerup');
            this._endCallback(pointer, event, cancelled);
            return true;
        };
        /**
         * Listener for mouse/pointer ends.
         *
         * @param event This will only be a MouseEvent if the browser doesn't support pointer events.
         */
        this._pointerEnd = (event) => {
            if (!this._triggerPointerEnd(new Pointer(event), event))
                return;
            if (isPointerEvent(event)) {
                if (this.currentPointers.length)
                    return;
                this._element.removeEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
                this._element.removeEventListener('pointerup', this._pointerEnd);
                this._element.removeEventListener('pointercancel', this._pointerEnd);
            }
            else {
                // MouseEvent
                window.removeEventListener('mousemove', this._move);
                window.removeEventListener('mouseup', this._pointerEnd);
            }
        };
        /**
         * Listener for touchend.
         * Only used if the browser doesn't support pointer events.
         */
        this._touchEnd = (event) => {
            for (const touch of Array.from(event.changedTouches)) {
                this._triggerPointerEnd(new Pointer(touch), event);
            }
        };
        this._startCallback = start;
        this._moveCallback = move;
        this._endCallback = end;
        this._rawUpdates = rawUpdates && 'onpointerrawupdate' in window;
        // Add listeners
        if (self.PointerEvent && !avoidPointerEvents) {
            this._element.addEventListener('pointerdown', this._pointerStart);
        }
        else {
            this._element.addEventListener('mousedown', this._pointerStart);
            this._element.addEventListener('touchstart', this._touchStart);
            this._element.addEventListener('touchmove', this._move);
            this._element.addEventListener('touchend', this._touchEnd);
            this._element.addEventListener('touchcancel', this._touchEnd);
        }
    }
    /**
     * Remove all listeners.
     */
    stop() {
        this._element.removeEventListener('pointerdown', this._pointerStart);
        this._element.removeEventListener('mousedown', this._pointerStart);
        this._element.removeEventListener('touchstart', this._touchStart);
        this._element.removeEventListener('touchmove', this._move);
        this._element.removeEventListener('touchend', this._touchEnd);
        this._element.removeEventListener('touchcancel', this._touchEnd);
        this._element.removeEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
        this._element.removeEventListener('pointerup', this._pointerEnd);
        this._element.removeEventListener('pointercancel', this._pointerEnd);
        window.removeEventListener('mousemove', this._move);
        window.removeEventListener('mouseup', this._pointerEnd);
    }
    /**
     * Call the start callback for this pointer, and track it if the user wants.
     *
     * @param pointer Pointer
     * @param event Related event
     * @returns Whether the pointer is being tracked.
     */
    _triggerPointerStart(pointer, event) {
        if (!this._startCallback(pointer, event))
            return false;
        this.currentPointers.push(pointer);
        this.startPointers.push(pointer);
        return true;
    }
}

var css$6 = "pinch-zoom{display:block;overflow:hidden;touch-action:none;--scale:1;--x:0;--y:0}pinch-zoom>*{transform:translate(var(--x),var(--y)) scale(var(--scale));transform-origin:0 0;will-change:transform}";

appendCss(css$6);

function getDistance(a, b) {
    if (!b)
        return 0;
    return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}
function getMidpoint(a, b) {
    if (!b)
        return a;
    return {
        clientX: (a.clientX + b.clientX) / 2,
        clientY: (a.clientY + b.clientY) / 2,
    };
}
function getAbsoluteValue(value, max) {
    if (typeof value === 'number')
        return value;
    if (value.trimRight().endsWith('%')) {
        return (max * parseFloat(value)) / 100;
    }
    return parseFloat(value);
}
// I'd rather use DOMMatrix/DOMPoint here, but the browser support isn't good enough.
// Given that, better to use something everything supports.
let cachedSvg;
function getSVG() {
    return (cachedSvg ||
        (cachedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
}
function createMatrix() {
    return getSVG().createSVGMatrix();
}
function createPoint() {
    return getSVG().createSVGPoint();
}
const MIN_SCALE = 0.01;
const MAX_SCALE = 100000;
class PinchZoom extends HTMLElement {
    constructor() {
        super();
        // Current transform.
        this._transform = createMatrix();
        // Watch for children changes.
        // Note this won't fire for initial contents,
        // so _stageElChange is also called in connectedCallback.
        new MutationObserver(() => this._stageElChange()).observe(this, {
            childList: true,
        });
        // Watch for pointers
        const pointerTracker = new PointerTracker(this, {
            start: (pointer, event) => {
                // We only want to track 2 pointers at most
                if (pointerTracker.currentPointers.length === 2 ||
                    !this._positioningEl) {
                    return false;
                }
                event.preventDefault();
                return true;
            },
            move: (previousPointers) => {
                this._onPointerMove(previousPointers, pointerTracker.currentPointers);
            },
            // Unfortunately Safari on iOS has a bug where pointer event capturing
            // doesn't work in some cases, and we hit those cases due to our event
            // retargeting in pinch-zoom.
            // https://bugs.webkit.org/show_bug.cgi?id=220196
            avoidPointerEvents: isSafari,
        });
        this.addEventListener('wheel', (event) => this._onWheel(event));
    }
    connectedCallback() {
        this._stageElChange();
    }
    get x() {
        return this._transform.e;
    }
    get y() {
        return this._transform.f;
    }
    get scale() {
        return this._transform.a;
    }
    /**
     * Change the scale, adjusting x/y by a given transform origin.
     */
    scaleTo(scale, opts = {}) {
        let { originX = 0, originY = 0 } = opts;
        const { relativeTo = 'content', allowChangeEvent = false } = opts;
        const relativeToEl = relativeTo === 'content' ? this._positioningEl : this;
        // No content element? Fall back to just setting scale
        if (!relativeToEl || !this._positioningEl) {
            this.setTransform({ scale, allowChangeEvent });
            return;
        }
        const rect = relativeToEl.getBoundingClientRect();
        originX = getAbsoluteValue(originX, rect.width);
        originY = getAbsoluteValue(originY, rect.height);
        if (relativeTo === 'content') {
            originX += this.x;
            originY += this.y;
        }
        else {
            const currentRect = this._positioningEl.getBoundingClientRect();
            originX -= currentRect.left;
            originY -= currentRect.top;
        }
        this._applyChange({
            allowChangeEvent,
            originX,
            originY,
            scaleDiff: scale / this.scale,
        });
    }
    /**
     * Update the stage with a given scale/x/y.
     */
    setTransform(opts = {}) {
        const { scale = this.scale, allowChangeEvent = false } = opts;
        let { x = this.x, y = this.y } = opts;
        // If we don't have an element to position, just set the value as given.
        // We'll check bounds later.
        if (!this._positioningEl) {
            this._updateTransform(scale, x, y, allowChangeEvent);
            return;
        }
        // Get current layout
        const thisBounds = this.getBoundingClientRect();
        const positioningElBounds = this._positioningEl.getBoundingClientRect();
        // Not displayed. May be disconnected or display:none.
        // Just take the values, and we'll check bounds later.
        if (!thisBounds.width || !thisBounds.height) {
            this._updateTransform(scale, x, y, allowChangeEvent);
            return;
        }
        // Create points for _positioningEl.
        let topLeft = createPoint();
        topLeft.x = positioningElBounds.left - thisBounds.left;
        topLeft.y = positioningElBounds.top - thisBounds.top;
        let bottomRight = createPoint();
        bottomRight.x = positioningElBounds.width + topLeft.x;
        bottomRight.y = positioningElBounds.height + topLeft.y;
        // Calculate the intended position of _positioningEl.
        const matrix = createMatrix()
            .translate(x, y)
            .scale(scale)
            // Undo current transform
            .multiply(this._transform.inverse());
        topLeft = topLeft.matrixTransform(matrix);
        bottomRight = bottomRight.matrixTransform(matrix);
        // Ensure _positioningEl can't move beyond out-of-bounds.
        // Correct for x
        if (topLeft.x > thisBounds.width) {
            x += thisBounds.width - topLeft.x;
        }
        else if (bottomRight.x < 0) {
            x += -bottomRight.x;
        }
        // Correct for y
        if (topLeft.y > thisBounds.height) {
            y += thisBounds.height - topLeft.y;
        }
        else if (bottomRight.y < 0) {
            y += -bottomRight.y;
        }
        this._updateTransform(scale, x, y, allowChangeEvent);
    }
    /**
     * Update transform values without checking bounds. This is only called in setTransform.
     */
    _updateTransform(scale, x, y, allowChangeEvent) {
        // Avoid scaling to zero
        if (scale < MIN_SCALE)
            return;
        // Avoid scaling to very large values
        if (scale > MAX_SCALE)
            return;
        // Return if there's no change
        if (scale === this.scale && x === this.x && y === this.y)
            return;
        this._transform.e = x;
        this._transform.f = y;
        this._transform.d = this._transform.a = scale;
        this.style.setProperty('--x', this.x + 'px');
        this.style.setProperty('--y', this.y + 'px');
        this.style.setProperty('--scale', this.scale + '');
        if (allowChangeEvent) {
            const event = new Event('change', { bubbles: true });
            this.dispatchEvent(event);
        }
    }
    /**
     * Called when the direct children of this element change.
     * Until we have have shadow dom support across the board, we
     * require a single element to be the child of <pinch-zoom>, and
     * that's the element we pan/scale.
     */
    _stageElChange() {
        this._positioningEl = undefined;
        if (this.children.length === 0)
            return;
        this._positioningEl = this.children[0];
        if (this.children.length > 1) {
            console.warn('<pinch-zoom> must not have more than one child.');
        }
        // Do a bounds check
        this.setTransform({ allowChangeEvent: true });
    }
    _onWheel(event) {
        if (!this._positioningEl)
            return;
        event.preventDefault();
        const currentRect = this._positioningEl.getBoundingClientRect();
        let { deltaY } = event;
        const { ctrlKey, deltaMode } = event;
        if (deltaMode === 1) {
            // 1 is "lines", 0 is "pixels"
            // Firefox uses "lines" for some types of mouse
            deltaY *= 15;
        }
        const zoomingOut = deltaY > 0;
        // ctrlKey is true when pinch-zooming on a trackpad.
        const divisor = ctrlKey ? 100 : 300;
        // when zooming out, invert the delta and the ratio to keep zoom stable
        const ratio = 1 - (zoomingOut ? -deltaY : deltaY) / divisor;
        const scaleDiff = zoomingOut ? 1 / ratio : ratio;
        this._applyChange({
            scaleDiff,
            originX: event.clientX - currentRect.left,
            originY: event.clientY - currentRect.top,
            allowChangeEvent: true,
        });
    }
    _onPointerMove(previousPointers, currentPointers) {
        if (!this._positioningEl)
            return;
        // Combine next points with previous points
        const currentRect = this._positioningEl.getBoundingClientRect();
        // For calculating panning movement
        const prevMidpoint = getMidpoint(previousPointers[0], previousPointers[1]);
        const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);
        // Midpoint within the element
        const originX = prevMidpoint.clientX - currentRect.left;
        const originY = prevMidpoint.clientY - currentRect.top;
        // Calculate the desired change in scale
        const prevDistance = getDistance(previousPointers[0], previousPointers[1]);
        const newDistance = getDistance(currentPointers[0], currentPointers[1]);
        const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
        this._applyChange({
            originX,
            originY,
            scaleDiff,
            panX: newMidpoint.clientX - prevMidpoint.clientX,
            panY: newMidpoint.clientY - prevMidpoint.clientY,
            allowChangeEvent: true,
        });
    }
    /** Transform the view & fire a change event */
    _applyChange(opts = {}) {
        const { panX = 0, panY = 0, originX = 0, originY = 0, scaleDiff = 1, allowChangeEvent = false, } = opts;
        const matrix = createMatrix()
            // Translate according to panning.
            .translate(panX, panY)
            // Scale about the origin.
            .translate(originX, originY)
            // Apply current translate
            .translate(this.x, this.y)
            .scale(scaleDiff)
            .translate(-originX, -originY)
            // Apply current scale.
            .scale(this.scale);
        // Convert the transform into basic translate & scale.
        this.setTransform({
            allowChangeEvent,
            scale: matrix.a,
            x: matrix.e,
            y: matrix.f,
        });
    }
}
customElements.define('pinch-zoom', PinchZoom);

const twoUpHandle = "_two-up-handle_ovnjk_35";
const scrubber = "_scrubber_ovnjk_83";
const arrowLeft = "_arrow-left_ovnjk_115";
const arrowRight = "_arrow-right_ovnjk_123";

var css$5 = "two-up{display:grid;position:relative;--split-point:0;--track-color:rgba(0,0,0,0.6);--thumb-background:var(--black);--thumb-color:var(--accent-color);--thumb-size:62px;--bar-size:9px;--bar-touch-size:30px}two-up>*{grid-area:1/1}two-up[legacy-clip-compat]>:not(._two-up-handle_ovnjk_35){position:absolute}._two-up-handle_ovnjk_35{touch-action:none;position:relative;width:var(--bar-touch-size);transform:translateX(var(--split-point)) translateX(-50%);will-change:transform;cursor:ew-resize}._two-up-handle_ovnjk_35:before{content:\"\";display:block;height:100%;width:var(--bar-size);margin:0 auto;background:var(--track-color)}._scrubber_ovnjk_83{display:grid;align-content:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:var(--thumb-size);height:var(--thumb-size);background:var(--thumb-background);border-radius:var(--thumb-size);color:var(--thumb-color);box-sizing:border-box;padding:0 calc(var(--thumb-size)*0.24)}._arrow-left_ovnjk_115{fill:var(--pink)}._arrow-right_ovnjk_123{fill:var(--blue)}two-up[orientation=vertical] ._two-up-handle_ovnjk_35{width:auto;height:var(--bar-touch-size);transform:translateY(var(--split-point)) translateY(-50%);cursor:ns-resize}two-up[orientation=vertical] ._two-up-handle_ovnjk_35:before{width:auto;height:var(--bar-size);box-shadow:inset 0 calc(var(--bar-size)/2) 0 rgba(0,0,0,.1),0 1px 4px rgba(0,0,0,.4);margin:calc(var(--bar-touch-size)/2 - var(--bar-size)/2) 0 0 0}two-up[orientation=vertical] ._scrubber_ovnjk_83{box-shadow:1px 0 4px rgba(0,0,0,.1);transform:translate(-50%,-50%) rotate(-90deg)}two-up>:first-child:not(._two-up-handle_ovnjk_35){-webkit-clip-path:inset(0 calc(100% - var(--split-point)) 0 0);clip-path:inset(0 calc(100% - var(--split-point)) 0 0)}two-up>:nth-child(2):not(._two-up-handle_ovnjk_35){-webkit-clip-path:inset(0 0 0 var(--split-point));clip-path:inset(0 0 0 var(--split-point))}two-up[orientation=vertical]>:first-child:not(._two-up-handle_ovnjk_35){-webkit-clip-path:inset(0 0 calc(100% - var(--split-point)) 0);clip-path:inset(0 0 calc(100% - var(--split-point)) 0)}two-up[orientation=vertical]>:nth-child(2):not(._two-up-handle_ovnjk_35){-webkit-clip-path:inset(var(--split-point) 0 0 0);clip-path:inset(var(--split-point) 0 0 0)}@supports not ((clip-path:inset(0 0 0 0)) or (-webkit-clip-path:inset(0 0 0 0))){two-up[legacy-clip-compat]>:first-child:not(._two-up-handle_ovnjk_35){clip:rect(auto var(--split-point) auto auto)}two-up[legacy-clip-compat]>:nth-child(2):not(._two-up-handle_ovnjk_35){clip:rect(auto auto auto var(--split-point))}two-up[orientation=vertical][legacy-clip-compat]>:first-child:not(._two-up-handle_ovnjk_35){clip:rect(auto auto var(--split-point) auto)}two-up[orientation=vertical][legacy-clip-compat]>:nth-child(2):not(._two-up-handle_ovnjk_35){clip:rect(var(--split-point) auto auto auto)}}";

appendCss(css$5);

const legacyClipCompatAttr = 'legacy-clip-compat';
const orientationAttr = 'orientation';
/**
 * A split view that the user can adjust. The first child becomes
 * the left-hand side, and the second child becomes the right-hand side.
 */
class TwoUp extends HTMLElement {
    constructor() {
        super();
        this._handle = document.createElement('div');
        /**
         * The position of the split in pixels.
         */
        this._position = 0;
        /**
         * The position of the split in %.
         */
        this._relativePosition = 0.5;
        /**
         * The value of _position when the pointer went down.
         */
        this._positionOnPointerStart = 0;
        /**
         * Has connectedCallback been called yet?
         */
        this._everConnected = false;
        // KeyDown event handler
        this._onKeyDown = (event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.closest('input'))
                return;
            if (event.code === 'Digit1' || event.code === 'Numpad1') {
                this._position = 0;
                this._relativePosition = 0;
                this._setPosition();
            }
            else if (event.code === 'Digit2' || event.code === 'Numpad2') {
                const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
                const bounds = this.getBoundingClientRect();
                this._position = bounds[dimensionAxis] / 2;
                this._relativePosition = this._position / bounds[dimensionAxis] / 2;
                this._setPosition();
            }
            else if (event.code === 'Digit3' || event.code === 'Numpad3') {
                const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
                const bounds = this.getBoundingClientRect();
                this._position = bounds[dimensionAxis];
                this._relativePosition = this._position / bounds[dimensionAxis];
                this._setPosition();
            }
        };
        this._handle.className = twoUpHandle;
        // Watch for children changes.
        // Note this won't fire for initial contents,
        // so _childrenChange is also called in connectedCallback.
        new MutationObserver(() => this._childrenChange()).observe(this, {
            childList: true,
        });
        // Watch for pointers on the handle.
        const pointerTracker = new PointerTracker(this._handle, {
            start: (_, event) => {
                // We only want to track 1 pointer.
                if (pointerTracker.currentPointers.length === 1)
                    return false;
                event.preventDefault();
                this._positionOnPointerStart = this._position;
                return true;
            },
            move: () => {
                this._pointerChange(pointerTracker.startPointers[0], pointerTracker.currentPointers[0]);
            },
        });
    }
    static get observedAttributes() {
        return [orientationAttr];
    }
    connectedCallback() {
        this._childrenChange();
        // prettier-ignore
        this._handle.innerHTML =
            `<div class="${scrubber}">${`<svg viewBox="0 0 27 20">${`<path class="${arrowLeft}" d="M9.6 0L0 9.6l9.6 9.6z"/>` +
                `<path class="${arrowRight}" d="M17 19.2l9.5-9.6L16.9 0z"/>`}</svg>
      `}</div>`;
        // Watch for element size changes.
        this._resizeObserver = new ResizeObserver(() => this._resetPosition());
        this._resizeObserver.observe(this);
        window.addEventListener('keydown', this._onKeyDown);
        if (!this._everConnected) {
            this._resetPosition();
            this._everConnected = true;
        }
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this._onKeyDown);
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }
    attributeChangedCallback(name) {
        if (name === orientationAttr) {
            this._resetPosition();
        }
    }
    _resetPosition() {
        // Set the initial position of the handle.
        requestAnimationFrame(() => {
            const bounds = this.getBoundingClientRect();
            const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
            this._position = bounds[dimensionAxis] * this._relativePosition;
            this._setPosition();
        });
    }
    /**
     * If true, this element works in browsers that don't support clip-path (Edge).
     * However, this means you'll have to set the height of this element manually.
     */
    get legacyClipCompat() {
        return this.hasAttribute(legacyClipCompatAttr);
    }
    set legacyClipCompat(val) {
        if (val) {
            this.setAttribute(legacyClipCompatAttr, '');
        }
        else {
            this.removeAttribute(legacyClipCompatAttr);
        }
    }
    /**
     * Split vertically rather than horizontally.
     */
    get orientation() {
        const value = this.getAttribute(orientationAttr);
        // This mirrors the behaviour of input.type, where setting just sets the attribute, but getting
        // returns the value only if it's valid.
        if (value && value.toLowerCase() === 'vertical')
            return 'vertical';
        return 'horizontal';
    }
    set orientation(val) {
        this.setAttribute(orientationAttr, val);
    }
    /**
     * Called when element's child list changes
     */
    _childrenChange() {
        // Ensure the handle is the last child.
        // The CSS depends on this.
        if (this.lastElementChild !== this._handle) {
            this.appendChild(this._handle);
        }
    }
    /**
     * Called when a pointer moves.
     */
    _pointerChange(startPoint, currentPoint) {
        const pointAxis = this.orientation === 'vertical' ? 'clientY' : 'clientX';
        const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
        const bounds = this.getBoundingClientRect();
        this._position =
            this._positionOnPointerStart +
                (currentPoint[pointAxis] - startPoint[pointAxis]);
        // Clamp position to element bounds.
        this._position = Math.max(0, Math.min(this._position, bounds[dimensionAxis]));
        this._relativePosition = this._position / bounds[dimensionAxis];
        this._setPosition();
    }
    _setPosition() {
        this.style.setProperty('--split-point', `${this._position}px`);
    }
}
customElements.define('two-up', TwoUp);

const output = "_output_1shiz_1";
const altBackground = "_alt-background_1shiz_31";
const twoUp = "_two-up_1shiz_41 abs-fill";
const pinchZoom = "_pinch-zoom_1shiz_49 abs-fill";
const pinchTarget = "_pinch-target_1shiz_65";
const controls = "_controls_1shiz_83";
const buttonGroup = "_button-group_1shiz_135";
const button = "_button_1shiz_135";
const zoom = "_zoom_1shiz_149";
const firstButton = "_first-button_1shiz_219 _button_1shiz_135";
const lastButton = "_last-button_1shiz_229 _button_1shiz_135";
const zoomValue = "_zoom-value_1shiz_291";
const pixelated = "_pixelated_1shiz_329";

var css$4 = "._output_1shiz_1{display:contents}._output_1shiz_1:before{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;background:#000;opacity:.8;transition:opacity .5s ease}._output_1shiz_1._alt-background_1shiz_31:before{opacity:0}._pinch-zoom_1shiz_49{outline:none;display:flex;justify-content:center;align-items:center}._pinch-target_1shiz_65{will-change:auto;flex-shrink:0}._controls_1shiz_83{display:flex;justify-content:center;overflow:hidden;flex-wrap:wrap;contain:content;grid-area:header;align-self:center;padding:9px 66px;position:relative;gap:6px;pointer-events:none}._controls_1shiz_83>*{pointer-events:auto}@media (min-width:860px){._controls_1shiz_83{padding:9px;flex-wrap:wrap-reverse;grid-area:viewportOpts;align-self:end}}._button-group_1shiz_135{display:flex;position:relative;z-index:100}._button_1shiz_135,._zoom_1shiz_149{display:flex;align-items:center;box-sizing:border-box;background-color:rgba(29,29,29,.92);border:1px solid rgba(0,0,0,.67);border-right-width:0;line-height:1.1;white-space:nowrap;height:39px;padding:0 8px;font-size:1.2rem;cursor:pointer}._button_1shiz_135:focus-visible,._zoom_1shiz_149:focus-visible{box-shadow:0 0 0 2px #fff;outline:none;z-index:1}._button_1shiz_135{color:#fff;margin:0}._button_1shiz_135:hover{background:rgba(50,50,50,.92)}._button_1shiz_135._active_1shiz_207{background:rgba(72,72,72,.92);color:#fff}._first-button_1shiz_219{border-radius:6px 0 0 6px}._last-button_1shiz_229{border-radius:0 6px 6px 0;border-right-width:1px}._zoom_1shiz_149{cursor:text;width:7rem;font:inherit;text-align:center;justify-content:center}._zoom_1shiz_149:focus{box-shadow:inset 0 1px 4px rgba(0,0,0,.2),0 0 0 2px #fff}span._zoom_1shiz_149{color:#939393;font-size:.8rem;line-height:1.2;font-weight:100}input._zoom_1shiz_149{text-indent:3px}._zoom-value_1shiz_291,input._zoom_1shiz_149{font-size:1.2rem;letter-spacing:.05rem;font-weight:700;color:#fff}._zoom-value_1shiz_291{margin:0 3px 0 0;padding:0 2px;border-bottom:1px dashed #999}._buttons-no-wrap_1shiz_311{display:flex;pointer-events:none}._buttons-no-wrap_1shiz_311>*{pointer-events:auto}._pixelated_1shiz_329{image-rendering:crisp-edges;image-rendering:pixelated}";

appendCss(css$4);

function cleanSetOrMerge(source, keys, toSetOrMerge, merge) {
    const splitKeys = Array.isArray(keys) ? keys : ('' + keys).split('.');
    // Going off road in terms of types, otherwise TypeScript doesn't like the access-by-index.
    // The assumptions in this code break if the object contains things which aren't arrays or
    // plain objects.
    let last = copy(source);
    const newObject = last;
    const lastIndex = splitKeys.length - 1;
    for (const [i, key] of splitKeys.entries()) {
        if (i !== lastIndex) {
            // Copy everything along the path.
            last = last[key] = copy(last[key]);
        }
        else {
            // Merge or set.
            last[key] = merge
                ? Object.assign(copy(last[key]), toSetOrMerge)
                : toSetOrMerge;
        }
    }
    return newObject;
}
function copy(source) {
    // Some type cheating here, as TypeScript can't infer between generic types.
    if (Array.isArray(source))
        return [...source];
    return { ...source };
}
/**
 * @param source Object to copy from.
 * @param keys Path to modify, eg "foo.bar.baz".
 * @param toMerge A value to merge into the value at the path.
 */
function cleanMerge(source, keys, toMerge) {
    return cleanSetOrMerge(source, keys, toMerge, true);
}
/**
 * @param source Object to copy from.
 * @param keys Path to modify, eg "foo.bar.baz".
 * @param newValue A value to set at the path.
 */
function cleanSet(source, keys, newValue) {
    return cleanSetOrMerge(source, keys, newValue, false);
}

const scaleToOpts = {
    originX: '50%',
    originY: '50%',
    relativeTo: 'container',
    allowChangeEvent: true,
};
class Output extends d {
    constructor() {
        super(...arguments);
        this.state = {
            scale: 1,
            editingScale: false,
            altBackground: false,
            aliasing: false,
        };
        this.retargetedEvents = new WeakSet();
        this.toggleAliasing = () => {
            this.setState((state) => ({
                aliasing: !state.aliasing,
            }));
        };
        this.toggleBackground = () => {
            this.setState({
                altBackground: !this.state.altBackground,
            });
        };
        this.zoomIn = () => {
            if (!this.pinchZoomLeft)
                throw Error('Missing pinch-zoom element');
            this.pinchZoomLeft.scaleTo(this.state.scale * 1.25, scaleToOpts);
        };
        this.zoomOut = () => {
            if (!this.pinchZoomLeft)
                throw Error('Missing pinch-zoom element');
            this.pinchZoomLeft.scaleTo(this.state.scale / 1.25, scaleToOpts);
        };
        this.onRotateClick = () => {
            const { preprocessorState: inputProcessorState } = this.props;
            if (!inputProcessorState)
                return;
            const newState = cleanSet(inputProcessorState, 'rotate.rotate', (inputProcessorState.rotate.rotate + 90) % 360);
            this.props.onPreprocessorChange(newState);
        };
        this.onScaleValueFocus = () => {
            this.setState({ editingScale: true }, () => {
                if (this.scaleInput) {
                    // Firefox unfocuses the input straight away unless I force a style
                    // calculation here. I have no idea why, but it's late and I'm quite
                    // tired.
                    getComputedStyle(this.scaleInput).transform;
                    this.scaleInput.focus();
                }
            });
        };
        this.onScaleInputBlur = () => {
            this.setState({ editingScale: false });
        };
        this.onScaleInputChanged = (event) => {
            const target = event.target;
            const percent = parseFloat(target.value);
            if (isNaN(percent))
                return;
            if (!this.pinchZoomLeft)
                throw Error('Missing pinch-zoom element');
            this.pinchZoomLeft.scaleTo(percent / 100, scaleToOpts);
        };
        this.onPinchZoomLeftChange = (event) => {
            if (!this.pinchZoomRight || !this.pinchZoomLeft) {
                throw Error('Missing pinch-zoom element');
            }
            this.setState({
                scale: this.pinchZoomLeft.scale,
            });
            this.pinchZoomRight.setTransform({
                scale: this.pinchZoomLeft.scale,
                x: this.pinchZoomLeft.x,
                y: this.pinchZoomLeft.y,
            });
        };
        /**
         * We're using two pinch zoom elements, but we want them to stay in sync. When one moves, we
         * update the position of the other. However, this is tricky when it comes to multi-touch, when
         * one finger is on one pinch-zoom, and the other finger is on the other. To overcome this, we
         * redirect all relevant pointer/touch/mouse events to the first pinch zoom element.
         *
         * @param event Event to redirect
         */
        this.onRetargetableEvent = (event) => {
            const targetEl = event.target;
            if (!this.pinchZoomLeft)
                throw Error('Missing pinch-zoom element');
            // If the event is on the handle of the two-up, let it through,
            // unless it's a wheel event, in which case always let it through.
            if (event.type !== 'wheel' && targetEl.closest(`.${twoUpHandle}`))
                return;
            // If we've already retargeted this event, let it through.
            if (this.retargetedEvents.has(event))
                return;
            // Stop the event in its tracks.
            event.stopImmediatePropagation();
            event.preventDefault();
            // Clone the event & dispatch
            // Some TypeScript trickery needed due to https://github.com/Microsoft/TypeScript/issues/3841
            const clonedEvent = new event.constructor(event.type, event);
            this.retargetedEvents.add(clonedEvent);
            this.pinchZoomLeft.dispatchEvent(clonedEvent);
            // Unfocus any active element on touchend. This fixes an issue on (at least) Android Chrome,
            // where the software keyboard is hidden, but the input remains focused, then after interaction
            // with this element the keyboard reappears for NO GOOD REASON. Thanks Android.
            if (event.type === 'touchend' &&
                document.activeElement &&
                document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        };
    }
    componentDidMount() {
        const leftDraw = this.leftDrawable();
        const rightDraw = this.rightDrawable();
        // Reset the pinch zoom, which may have an position set from the previous view, after pressing
        // the back button.
        this.pinchZoomLeft.setTransform({
            allowChangeEvent: true,
            x: 0,
            y: 0,
            scale: 1,
        });
        if (this.canvasLeft && leftDraw) {
            drawDataToCanvas(this.canvasLeft, leftDraw);
        }
        if (this.canvasRight && rightDraw) {
            drawDataToCanvas(this.canvasRight, rightDraw);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const prevLeftDraw = this.leftDrawable(prevProps);
        const prevRightDraw = this.rightDrawable(prevProps);
        const leftDraw = this.leftDrawable();
        const rightDraw = this.rightDrawable();
        const sourceFileChanged = 
        // Has the value become (un)defined?
        !!this.props.source !== !!prevProps.source ||
            // Or has the file changed?
            (this.props.source &&
                prevProps.source &&
                this.props.source.file !== prevProps.source.file);
        const oldSourceData = prevProps.source && prevProps.source.preprocessed;
        const newSourceData = this.props.source && this.props.source.preprocessed;
        const pinchZoom = this.pinchZoomLeft;
        if (sourceFileChanged) {
            // New image? Reset the pinch-zoom.
            pinchZoom.setTransform({
                allowChangeEvent: true,
                x: 0,
                y: 0,
                scale: 1,
            });
        }
        else if (oldSourceData &&
            newSourceData &&
            oldSourceData !== newSourceData) {
            // Since the pinch zoom transform origin is the top-left of the content, we need to flip
            // things around a bit when the content size changes, so the new content appears as if it were
            // central to the previous content.
            const scaleChange = 1 - pinchZoom.scale;
            const oldXScaleOffset = (oldSourceData.width / 2) * scaleChange;
            const oldYScaleOffset = (oldSourceData.height / 2) * scaleChange;
            pinchZoom.setTransform({
                allowChangeEvent: true,
                x: pinchZoom.x - oldXScaleOffset + oldYScaleOffset,
                y: pinchZoom.y - oldYScaleOffset + oldXScaleOffset,
            });
        }
        if (leftDraw && leftDraw !== prevLeftDraw && this.canvasLeft) {
            drawDataToCanvas(this.canvasLeft, leftDraw);
        }
        if (rightDraw && rightDraw !== prevRightDraw && this.canvasRight) {
            drawDataToCanvas(this.canvasRight, rightDraw);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (!shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState));
    }
    leftDrawable(props = this.props) {
        return props.leftCompressed || (props.source && props.source.preprocessed);
    }
    rightDrawable(props = this.props) {
        return props.rightCompressed || (props.source && props.source.preprocessed);
    }
    render({ mobileView, leftImgContain, rightImgContain, source }, { scale, editingScale, altBackground: altBackground$1, aliasing }) {
        const leftDraw = this.leftDrawable();
        const rightDraw = this.rightDrawable();
        // To keep position stable, the output is put in a square using the longest dimension.
        const originalImage = source && source.preprocessed;
        return (h(p, null,
            h("div", { class: `${output} ${altBackground$1 ? altBackground : ''}` },
                h("two-up", { "legacy-clip-compat": true, class: twoUp, orientation: mobileView ? 'vertical' : 'horizontal', 
                    // Event redirecting. See onRetargetableEvent.
                    onTouchStartCapture: this.onRetargetableEvent, onTouchEndCapture: this.onRetargetableEvent, onTouchMoveCapture: this.onRetargetableEvent, onPointerDownCapture: 
                    // We avoid pointer events in our PinchZoom due to a Safari bug.
                    // That means we also need to avoid them here too, else we end up preventing the fallback mouse events.
                    isSafari ? undefined : this.onRetargetableEvent, onMouseDownCapture: this.onRetargetableEvent, onWheelCapture: this.onRetargetableEvent },
                    h("pinch-zoom", { class: pinchZoom, onChange: this.onPinchZoomLeftChange, ref: linkRef(this, 'pinchZoomLeft') },
                        h("canvas", { class: `${pinchTarget} ${aliasing ? pixelated : ''}`, ref: linkRef(this, 'canvasLeft'), width: leftDraw && leftDraw.width, height: leftDraw && leftDraw.height, style: {
                                width: originalImage ? originalImage.width : '',
                                height: originalImage ? originalImage.height : '',
                                objectFit: leftImgContain ? 'contain' : '',
                            } })),
                    h("pinch-zoom", { class: pinchZoom, ref: linkRef(this, 'pinchZoomRight') },
                        h("canvas", { class: `${pinchTarget} ${aliasing ? pixelated : ''}`, ref: linkRef(this, 'canvasRight'), width: rightDraw && rightDraw.width, height: rightDraw && rightDraw.height, style: {
                                width: originalImage ? originalImage.width : '',
                                height: originalImage ? originalImage.height : '',
                                objectFit: rightImgContain ? 'contain' : '',
                            } })))),
            h("div", { class: controls },
                h("div", { class: buttonGroup },
                    h("button", { class: firstButton, onClick: this.zoomOut },
                        h(RemoveIcon, null)),
                    editingScale ? (h("input", { type: "number", step: "1", min: "1", max: "1000000", ref: linkRef(this, 'scaleInput'), class: zoom, value: Math.round(scale * 100), onInput: this.onScaleInputChanged, onBlur: this.onScaleInputBlur })) : (h("span", { class: zoom, tabIndex: 0, onFocus: this.onScaleValueFocus },
                        h("span", { class: zoomValue }, Math.round(scale * 100)),
                        "%")),
                    h("button", { class: lastButton, onClick: this.zoomIn },
                        h(AddIcon, null))),
                h("div", { class: buttonGroup },
                    h("button", { class: firstButton, onClick: this.onRotateClick, title: "Rotate" },
                        h(RotateIcon, null)),
                    !isSafari && (h("button", { class: button, onClick: this.toggleAliasing, title: "Toggle smoothing" }, aliasing ? (h(ToggleAliasingActiveIcon, null)) : (h(ToggleAliasingIcon, null)))),
                    h("button", { class: lastButton, onClick: this.toggleBackground, title: "Toggle background" }, altBackground$1 ? (h(ToggleBackgroundActiveIcon, null)) : (h(ToggleBackgroundIcon, null)))))));
    }
}

var css$3 = "._options-scroller_rjr20_1{--horizontal-padding:15px;border-radius:var(--scroller-radius);overflow:hidden}@media (min-width:600px){._options-scroller_rjr20_1{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}}._options-title_rjr20_27{background-color:var(--main-theme-color);color:var(--header-text-color);margin:0;padding:10px var(--horizontal-padding);font-weight:700;font-size:1.4rem;border-bottom:1px solid var(--off-black);transition:all .3s ease-in-out;transition-property:background-color,color;position:sticky;top:0;z-index:1}._original-image_rjr20_59 ._options-title_rjr20_27{background-color:var(--black);color:var(--white)}._option-text-first_rjr20_69{grid-template-columns:87px 1fr}._option-text-first_rjr20_69,._option-toggle_rjr20_85{display:grid;align-items:center;gap:.7em;padding:10px var(--horizontal-padding)}._option-toggle_rjr20_85{cursor:pointer;grid-template-columns:1fr auto}._option-reveal_rjr20_103{grid-template-columns:auto 1fr;gap:1em;border-top:1px solid hsla(0,0%,100%,.26666666666666666);transition-property:background-color;transition-duration:.25s}._option-reveal_rjr20_103:focus-within,._option-reveal_rjr20_103:hover{background-color:hsla(0,0%,100%,.13333333333333333)}._option-one-cell_rjr20_135{display:grid;grid-template-columns:1fr;padding:10px var(--horizontal-padding)}._section-enabler_rjr20_147{background:var(--dark-gray);padding:15px var(--horizontal-padding);border-bottom:1px solid var(--off-black)}._options-section_rjr20_161{background:var(--off-black)}._text-field_rjr20_169{background-color:var(--black);color:var(--white);font:inherit;border:none;padding:6px 6px 6px 10px;width:100%;box-sizing:border-box;border-radius:4px}._title-and-buttons_rjr20_191{grid-template-columns:1fr;grid-auto-columns:max-content;grid-auto-flow:column;display:grid;gap:.8rem}._title-button_rjr20_207 svg{--size:20px;display:block;width:var(--size);height:var(--size)}._cli-button_rjr20_227 svg{stroke:var(--header-text-color)}._copy-over-button_rjr20_243{transform:rotate(var(--rotate-copyoverbutton-angle))}._copy-over-button_rjr20_243 svg{fill:var(--header-text-color)}._copy-over-button_rjr20_243:focus{outline:var(--header-text-color) solid 2px;outline-offset:.25em}._import-button_rjr20_277 svg,._save-button_rjr20_275 svg{stroke:var(--header-text-color)}._import-button_rjr20_277:focus,._save-button_rjr20_275:focus{outline:var(--header-text-color) solid 2px;outline-offset:.25em}._button-opacity_rjr20_303{pointer-events:none;cursor:not-allowed}._button-opacity_rjr20_303 svg{opacity:.5}";

appendCss(css$3);

const checkbox = "_checkbox_5how8_1";
const track = "_track_5how8_11";
const thumb = "_thumb_5how8_35";
const thumbTrack = "_thumb-track_5how8_79";
const realCheckbox = "_real-checkbox_5how8_87";

var css$2 = "._checkbox_5how8_1{display:inline-block;position:relative}._track_5how8_11{--thumb-size:14px;background:var(--black);border-radius:1000px;width:24px;padding:3px calc(var(--thumb-size)/2 + 3px)}._checkbox_5how8_1:focus-within ._track_5how8_11{outline:2px solid #fff}._thumb_5how8_35{position:relative;width:var(--thumb-size);height:var(--thumb-size);background:var(--less-light-gray);border-radius:100%;transform:translateX(calc(var(--thumb-size)/-2));overflow:hidden}._thumb_5how8_35:before{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;background:var(--main-theme-color);opacity:0;transition:opacity .2s ease}._thumb-track_5how8_79{transition:transform .2s ease}._real-checkbox_5how8_87{top:0;position:absolute;opacity:0;pointer-events:none}._real-checkbox_5how8_87:checked+._track_5how8_11 ._thumb-track_5how8_79{transform:translateX(100%)}._real-checkbox_5how8_87:checked+._track_5how8_11 ._thumb_5how8_35:before{opacity:1}";

appendCss(css$2);

class Toggle extends d {
    render(props) {
        return (h("div", { class: checkbox },
            h("input", { class: realCheckbox, type: "checkbox", ...props }),
            h("div", { class: track },
                h("div", { class: thumbTrack },
                    h("div", { class: thumb })))));
    }
}

const konamiPromise = konami();
class Options$2 extends d {
    constructor() {
        super(...arguments);
        this.state = { extendedSettings: false };
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const { options } = this.props;
            const newOptions = {
                zx: inputFieldValueAsNumber(form.zx, options.zx),
                maxNumColors: inputFieldValueAsNumber(form.maxNumColors, options.maxNumColors),
                dither: inputFieldValueAsNumber(form.dither),
            };
            this.props.onChange(newOptions);
        };
    }
    componentDidMount() {
        konamiPromise.then(() => {
            this.setState({ extendedSettings: true });
        });
    }
    render({ options }, { extendedSettings }) {
        return (h("form", { class: optionsSection, onSubmit: preventDefault },
            h(Expander, null, extendedSettings ? (h("label", { class: optionTextFirst },
                "Type:",
                h(Select, { name: "zx", value: '' + options.zx, onChange: this.onChange },
                    h("option", { value: "0" }, "Standard"),
                    h("option", { value: "1" }, "ZX")))) : null),
            h(Expander, null, options.zx ? null : (h("div", { class: optionOneCell },
                h(Range, { name: "maxNumColors", min: "2", max: "256", value: options.maxNumColors, onInput: this.onChange }, "Colors:")))),
            h("div", { class: optionOneCell },
                h(Range, { name: "dither", min: "0", max: "1", step: "0.01", value: options.dither, onInput: this.onChange }, "Dithering:"))));
    }
}

/**
 * Return whether a set of options are worker resize options.
 *
 * @param opts
 */
function isWorkerOptions(opts) {
    return workerResizeMethods.includes(opts.method);
}
function browserResize(data, opts) {
    let sx = 0;
    let sy = 0;
    let sw = data.width;
    let sh = data.height;
    if (opts.fitMethod === 'contain') {
        ({ sx, sy, sw, sh } = getContainOffsets(sw, sh, opts.width, opts.height));
    }
    return builtinResize(data, sx, sy, sw, sh, opts.width, opts.height, opts.method.slice('browser-'.length));
}
function vectorResize(data, opts) {
    let sx = 0;
    let sy = 0;
    let sw = data.width;
    let sh = data.height;
    if (opts.fitMethod === 'contain') {
        ({ sx, sy, sw, sh } = getContainOffsets(sw, sh, opts.width, opts.height));
    }
    return drawableToImageData(data, {
        sx,
        sy,
        sw,
        sh,
        width: opts.width,
        height: opts.height,
    });
}
async function resize(signal, source, options, workerBridge) {
    if (options.method === 'vector') {
        if (!source.vectorImage)
            throw Error('No vector image available');
        return vectorResize(source.vectorImage, options);
    }
    if (isWorkerOptions(options)) {
        return workerBridge.resize(signal, source.preprocessed, options);
    }
    return browserResize(source.preprocessed, options);
}
const sizePresets = [0.25, 0.3333, 0.5, 1, 2, 3, 4];
class Options$1 extends d {
    constructor(props) {
        super(props);
        this.state = {
            maintainAspect: true,
        };
        this.presetWidths = {};
        this.presetHeights = {};
        this.onChange = () => {
            this.reportOptions();
        };
        this.onWidthInput = () => {
            if (this.state.maintainAspect) {
                const width = inputFieldValueAsNumber(this.form.width);
                this.form.height.value = Math.round(width / this.getAspect());
            }
            this.reportOptions();
        };
        this.onHeightInput = () => {
            if (this.state.maintainAspect) {
                const height = inputFieldValueAsNumber(this.form.height);
                this.form.width.value = Math.round(height * this.getAspect());
            }
            this.reportOptions();
        };
        this.onPresetChange = (event) => {
            const select = event.target;
            if (select.value === 'custom')
                return;
            const multiplier = Number(select.value);
            this.form.width.value =
                Math.round(this.props.inputWidth * multiplier) + '';
            this.form.height.value =
                Math.round(this.props.inputHeight * multiplier) + '';
            this.reportOptions();
        };
        this.generatePresetValues(props.inputWidth, props.inputHeight);
    }
    reportOptions() {
        const form = this.form;
        const width = form.width;
        const height = form.height;
        const { options } = this.props;
        if (!width.checkValidity() || !height.checkValidity())
            return;
        const newOptions = {
            width: inputFieldValueAsNumber(width),
            height: inputFieldValueAsNumber(height),
            method: form.resizeMethod.value,
            premultiply: inputFieldChecked(form.premultiply, true),
            linearRGB: inputFieldChecked(form.linearRGB, true),
            // Casting, as the formfield only returns the correct values.
            fitMethod: inputFieldValue(form.fitMethod, options.fitMethod),
        };
        this.props.onChange(newOptions);
    }
    getAspect() {
        return this.props.inputWidth / this.props.inputHeight;
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.maintainAspect && this.state.maintainAspect) {
            this.form.height.value = Math.round(Number(this.form.width.value) / this.getAspect());
            this.reportOptions();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.inputWidth !== nextProps.inputWidth ||
            this.props.inputHeight !== nextProps.inputHeight) {
            this.generatePresetValues(nextProps.inputWidth, nextProps.inputHeight);
        }
    }
    generatePresetValues(width, height) {
        for (const preset of sizePresets) {
            this.presetWidths[preset] = Math.round(width * preset);
            this.presetHeights[preset] = Math.round(height * preset);
        }
    }
    getPreset() {
        const { width, height } = this.props.options;
        for (const preset of sizePresets) {
            if (width === this.presetWidths[preset] &&
                height === this.presetHeights[preset])
                return preset;
        }
        return 'custom';
    }
    render({ options, isVector }, { maintainAspect }) {
        return (h("form", { ref: linkRef(this, 'form'), class: optionsSection, onSubmit: preventDefault },
            h("label", { class: optionTextFirst },
                "Method:",
                h(Select, { name: "resizeMethod", value: options.method, onChange: this.onChange },
                    isVector && h("option", { value: "vector" }, "Vector"),
                    h("option", { value: "lanczos3" }, "Lanczos3"),
                    h("option", { value: "mitchell" }, "Mitchell"),
                    h("option", { value: "catrom" }, "Catmull-Rom"),
                    h("option", { value: "triangle" }, "Triangle (bilinear)"),
                    h("option", { value: "hqx" }, "hqx (pixel art)"),
                    h("option", { value: "browser-pixelated" }, "Browser pixelated"),
                    h("option", { value: "browser-low" }, "Browser low quality"),
                    h("option", { value: "browser-medium" }, "Browser medium quality"),
                    h("option", { value: "browser-high" }, "Browser high quality"))),
            h("label", { class: optionTextFirst },
                "Preset:",
                h(Select, { value: this.getPreset(), onChange: this.onPresetChange },
                    sizePresets.map((preset) => (h("option", { value: preset },
                        preset * 100,
                        "%"))),
                    h("option", { value: "custom" }, "Custom"))),
            h("label", { class: optionTextFirst },
                "Width:",
                h("input", { required: true, class: textField, name: "width", type: "number", min: "1", value: '' + options.width, onInput: this.onWidthInput })),
            h("label", { class: optionTextFirst },
                "Height:",
                h("input", { required: true, class: textField, name: "height", type: "number", min: "1", value: '' + options.height, onInput: this.onHeightInput })),
            h(Expander, null,
                isWorkerOptions(options) ? (h("label", { class: optionToggle },
                    "Premultiply alpha channel",
                    h(Checkbox, { name: "premultiply", checked: options.premultiply, onChange: this.onChange }))) : null,
                isWorkerOptions(options) ? (h("label", { class: optionToggle },
                    "Linear RGB",
                    h(Checkbox, { name: "linearRGB", checked: options.linearRGB, onChange: this.onChange }))) : null),
            h("label", { class: optionToggle },
                "Maintain aspect ratio",
                h(Checkbox, { name: "maintainAspect", checked: maintainAspect, onChange: linkState(this, 'maintainAspect') })),
            h(Expander, null, maintainAspect ? null : (h("label", { class: optionTextFirst },
                "Fit method:",
                h(Select, { name: "fitMethod", value: options.fitMethod, onChange: this.onChange },
                    h("option", { value: "stretch" }, "Stretch"),
                    h("option", { value: "contain" }, "Contain")))))));
    }
}

const supportedEncoderMapP = (async () => {
    const supportedEncoderMap = {
        ...encoderMap,
    };
    // Filter out entries where the feature test fails
    await Promise.all(Object.entries(encoderMap).map(async ([encoderName, details]) => {
        if ('featureTest' in details && !(await details.featureTest())) {
            delete supportedEncoderMap[encoderName];
        }
    }));
    return supportedEncoderMap;
})();
class Options extends d {
    constructor() {
        super();
        this.state = {
            supportedEncoderMap: undefined,
            leftSideSettings: localStorage.getItem('leftSideSettings'),
            rightSideSettings: localStorage.getItem('rightSideSettings'),
        };
        this.setLeftSideSettings = () => {
            this.setState({
                leftSideSettings: localStorage.getItem('leftSideSettings'),
            });
        };
        this.setRightSideSettings = () => {
            this.setState({
                rightSideSettings: localStorage.getItem('rightSideSettings'),
            });
        };
        this.onEncoderTypeChange = (event) => {
            const el = event.currentTarget;
            // The select element only has values matching encoder types,
            // so 'as' is safe here.
            const type = el.value;
            this.props.onEncoderTypeChange(this.props.index, type);
        };
        this.onProcessorEnabledChange = (event) => {
            const el = event.currentTarget;
            const processor = el.name.split('.')[0];
            this.props.onProcessorOptionsChange(this.props.index, cleanSet(this.props.processorState, `${processor}.enabled`, el.checked));
        };
        this.onQuantizerOptionsChange = (opts) => {
            this.props.onProcessorOptionsChange(this.props.index, cleanMerge(this.props.processorState, 'quantize', opts));
        };
        this.onResizeOptionsChange = (opts) => {
            this.props.onProcessorOptionsChange(this.props.index, cleanMerge(this.props.processorState, 'resize', opts));
        };
        this.onEncoderOptionsChange = (newOptions) => {
            this.props.onEncoderOptionsChange(this.props.index, newOptions);
        };
        this.onCopyToOtherSideClick = () => {
            this.props.onCopyToOtherSideClick(this.props.index);
        };
        this.onSaveSideSettingClick = () => {
            this.props.onSaveSideSettingsClick(this.props.index);
        };
        this.onImportSideSettingsClick = () => {
            this.props.onImportSideSettingsClick(this.props.index);
        };
        supportedEncoderMapP.then((supportedEncoderMap) => this.setState({ supportedEncoderMap }));
    }
    componentDidMount() {
        // Changing the state when side setting is stored in localstorage
        window.addEventListener('leftSideSettings', this.setLeftSideSettings);
        window.addEventListener('rightSideSettings', this.setRightSideSettings);
    }
    componentWillUnmount() {
        window.removeEventListener('leftSideSettings', this.setLeftSideSettings);
        window.removeEventListener('removeSideSettings', this.setRightSideSettings);
    }
    render({ source, encoderState, processorState }, { supportedEncoderMap }) {
        const encoder = encoderState && encoderMap[encoderState.type];
        const EncoderOptionComponent = encoder && 'Options' in encoder ? encoder.Options : undefined;
        return (h("div", { class: optionsScroller +
                ' ' +
                (encoderState ? '' : originalImage) },
            h(Expander, null, !encoderState ? null : (h("div", null,
                h("h3", { class: optionsTitle },
                    h("div", { class: titleAndButtons },
                        "Edit",
                        h("button", { class: copyOverButton, title: "Copy settings to other side", onClick: this.onCopyToOtherSideClick },
                            h(SwapIcon, null)),
                        h("button", { class: saveButton, title: "Save side settings", onClick: this.onSaveSideSettingClick },
                            h(SaveIcon, null)),
                        h("button", { class: importButton +
                                ' ' +
                                (!this.state.leftSideSettings && this.props.index === 0
                                    ? buttonOpacity
                                    : '') +
                                ' ' +
                                (!this.state.rightSideSettings && this.props.index === 1
                                    ? buttonOpacity
                                    : ''), title: "Import saved side settings", onClick: this.onImportSideSettingsClick, disabled: 
                            // Disabled if this side's settings haven't been saved
                            (!this.state.leftSideSettings &&
                                this.props.index === 0) ||
                                (!this.state.rightSideSettings && this.props.index === 1) },
                            h(ImportIcon, null)))),
                h("label", { class: sectionEnabler },
                    "Resize",
                    h(Toggle, { name: "resize.enable", checked: !!processorState.resize.enabled, onChange: this.onProcessorEnabledChange })),
                h(Expander, null, processorState.resize.enabled ? (h(Options$1, { isVector: Boolean(source && source.vectorImage), inputWidth: source ? source.preprocessed.width : 1, inputHeight: source ? source.preprocessed.height : 1, options: processorState.resize, onChange: this.onResizeOptionsChange })) : null),
                h("label", { class: sectionEnabler },
                    "Reduce palette",
                    h(Toggle, { name: "quantize.enable", checked: !!processorState.quantize.enabled, onChange: this.onProcessorEnabledChange })),
                h(Expander, null, processorState.quantize.enabled ? (h(Options$2, { options: processorState.quantize, onChange: this.onQuantizerOptionsChange })) : null)))),
            h("h3", { class: optionsTitle }, "Compress"),
            h("section", { class: `${optionOneCell} ${optionsSection}` }, supportedEncoderMap ? (h(Select, { value: encoderState ? encoderState.type : 'identity', onChange: this.onEncoderTypeChange, large: true },
                h("option", { value: "identity" }, `Original Image ${this.props.source ? `(${this.props.source.file.name})` : ''}`),
                Object.entries(supportedEncoderMap).map(([type, encoder]) => (h("option", { value: type }, encoder.meta.label))))) : (h(Select, { large: true },
                h("option", null, "Loading\u2026")))),
            h(Expander, null, EncoderOptionComponent && (h(EncoderOptionComponent, { options: 
                // Casting options, as encoderOptionsComponentMap[encodeData.type] ensures
                // the correct type, but typescript isn't smart enough.
                encoderState.options, onChange: this.onEncoderOptionsChange })))));
    }
}

const SIZE = 5;
class ResultCache {
    constructor() {
        this._entries = [];
    }
    add(entry) {
        // Add the new entry to the start
        this._entries.unshift(entry);
        // Remove the last entry if we're now bigger than SIZE
        if (this._entries.length > SIZE)
            this._entries.pop();
    }
    match(preprocessed, processorState, encoderState) {
        const matchingIndex = this._entries.findIndex((entry) => {
            // Check for quick exits:
            if (entry.preprocessed !== preprocessed)
                return false;
            if (entry.encoderState.type !== encoderState.type)
                return false;
            // Check that each set of options in the preprocessor are the same
            for (const prop in processorState) {
                if (!shallowEqual(processorState[prop], entry.processorState[prop])) {
                    return false;
                }
            }
            // Check detailed encoder options
            if (!shallowEqual(encoderState.options, entry.encoderState.options)) {
                return false;
            }
            return true;
        });
        if (matchingIndex === -1)
            return undefined;
        const matchingEntry = this._entries[matchingIndex];
        if (matchingIndex !== 0) {
            // Move the matched result to 1st position (LRU)
            this._entries.splice(matchingIndex, 1);
            this._entries.unshift(matchingEntry);
        }
        return { ...matchingEntry };
    }
}

const panelHeading = "_panel-heading_156to_1";
const panelContent = "_panel-content_156to_7";

var css$1 = "._panel-content_156to_7{height:0;overflow:auto}._panel-content_156to_7[aria-expanded=true]{height:auto}";

appendCss(css$1);

const openOneOnlyAttr = 'open-one-only';
function getClosestHeading(el) {
    // Look for the child of multi-panel, but stop at interactive elements like links & buttons
    const closestEl = el.closest('multi-panel > *, a, button');
    if (closestEl && closestEl.classList.contains(panelHeading)) {
        return closestEl;
    }
    return undefined;
}
async function close(heading) {
    const content = heading.nextElementSibling;
    // if there is no content, nothing to expand
    if (!content)
        return;
    const from = content.getBoundingClientRect().height;
    heading.removeAttribute('content-expanded');
    content.setAttribute('aria-expanded', 'false');
    // Wait a microtask so other calls to open/close can get the final sizes.
    await null;
    await transitionHeight(content, {
        from,
        to: 0,
        duration: 300,
    });
    content.style.height = '';
}
async function open(heading) {
    const content = heading.nextElementSibling;
    // if there is no content, nothing to expand
    if (!content)
        return;
    const from = content.getBoundingClientRect().height;
    heading.setAttribute('content-expanded', '');
    content.setAttribute('aria-expanded', 'true');
    const to = content.getBoundingClientRect().height;
    // Wait a microtask so other calls to open/close can get the final sizes.
    await null;
    await transitionHeight(content, {
        from,
        to,
        duration: 300,
    });
    content.style.height = '';
}
/**
 * A multi-panel view that the user can add any number of 'panels'.
 * 'a panel' consists of two elements. Even index element becomes heading,
 * and odd index element becomes the expandable content.
 */
class MultiPanel extends HTMLElement {
    static get observedAttributes() {
        return [openOneOnlyAttr];
    }
    constructor() {
        super();
        // add EventListeners
        this.addEventListener('click', this._onClick);
        this.addEventListener('keydown', this._onKeyDown);
        // Watch for children changes.
        new MutationObserver(() => this._childrenChange()).observe(this, {
            childList: true,
        });
    }
    connectedCallback() {
        this._childrenChange();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === openOneOnlyAttr && newValue === null) {
            this._closeAll({ exceptFirst: true });
        }
    }
    // Click event handler
    _onClick(event) {
        const el = event.target;
        const heading = getClosestHeading(el);
        if (!heading)
            return;
        this._toggle(heading);
    }
    // KeyDown event handler
    _onKeyDown(event) {
        const selectedEl = document.activeElement;
        const heading = getClosestHeading(selectedEl);
        // if keydown event is not on heading element, ignore
        if (!heading)
            return;
        // if something inside of heading has focus, ignore
        if (selectedEl !== heading)
            return;
        // don’t handle modifier shortcuts used by assistive technology.
        if (event.altKey)
            return;
        let newHeading;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                newHeading = this._prevHeading();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                newHeading = this._nextHeading();
                break;
            case 'Home':
                newHeading = this._firstHeading();
                break;
            case 'End':
                newHeading = this._lastHeading();
                break;
            // this has 3 cases listed to support IEs and FF before 37
            case 'Enter':
            case ' ':
            case 'Spacebar':
                this._toggle(heading);
                break;
            // Any other key press is ignored and passed back to the browser.
            default:
                return;
        }
        event.preventDefault();
        if (newHeading) {
            selectedEl.setAttribute('tabindex', '-1');
            newHeading.setAttribute('tabindex', '0');
            newHeading.focus();
        }
    }
    _toggle(heading) {
        if (!heading)
            return;
        // toggle expanded and aria-expanded attributes
        if (heading.hasAttribute('content-expanded')) {
            close(heading);
        }
        else {
            if (this.openOneOnly)
                this._closeAll();
            open(heading);
        }
    }
    _closeAll(options = {}) {
        const { exceptFirst = false } = options;
        let els = [...this.children].filter((el) => el.matches('[content-expanded]'));
        if (exceptFirst) {
            els = els.slice(1);
        }
        for (const el of els)
            close(el);
    }
    // children of multi-panel should always be even number (heading/content pair)
    _childrenChange() {
        let preserveTabIndex = false;
        let heading = this.firstElementChild;
        while (heading) {
            const content = heading.nextElementSibling;
            const randomId = Math.random().toString(36).substr(2, 9);
            // if at the end of this loop, runout of element for content,
            // it means it has odd number of elements. log error and set heading to end the loop.
            if (!content) {
                console.error('<multi-panel> requires an even number of element children.');
                break;
            }
            // When odd number of elements were inserted in the middle,
            // what was heading before may become content after the insertion.
            // Remove classes and attributes to prepare for this change.
            heading.classList.remove(panelContent);
            content.classList.remove(panelHeading);
            heading.removeAttribute('aria-expanded');
            heading.removeAttribute('content-expanded');
            // If appreciable, remove tabindex from content which used to be header.
            content.removeAttribute('tabindex');
            // Assign heading and content classes
            heading.classList.add(panelHeading);
            content.classList.add(panelContent);
            // Assign ids and aria-X for heading/content pair.
            heading.id = `panel-heading-${randomId}`;
            heading.setAttribute('aria-controls', `panel-content-${randomId}`);
            content.id = `panel-content-${randomId}`;
            content.setAttribute('aria-labelledby', `panel-heading-${randomId}`);
            // If tabindex 0 is assigned to a heading, flag to preserve tab index position.
            // Otherwise, make sure tabindex -1 is set to heading elements.
            if (heading.getAttribute('tabindex') === '0') {
                preserveTabIndex = true;
            }
            else {
                heading.setAttribute('tabindex', '-1');
            }
            // It's possible that the heading & content expanded attributes are now out of sync. Resync
            // them using the heading as the source of truth.
            content.setAttribute('aria-expanded', heading.hasAttribute('content-expanded') ? 'true' : 'false');
            // next sibling of content = next heading
            heading = content.nextElementSibling;
        }
        // if no flag, make 1st heading as tabindex 0 (otherwise keep previous tab index position).
        if (!preserveTabIndex && this.firstElementChild) {
            this.firstElementChild.setAttribute('tabindex', '0');
        }
        // In case we're openOneOnly, and an additional open item has been added:
        if (this.openOneOnly)
            this._closeAll({ exceptFirst: true });
    }
    // returns heading that is before currently selected one.
    _prevHeading() {
        // activeElement would be the currently selected heading
        // 2 elements before that would be the previous heading unless it is the first element.
        if (this.firstElementChild === document.activeElement) {
            return this.firstElementChild;
        }
        // previous Element of active Element is previous Content,
        // previous Element of previous Content is previousHeading
        const previousContent = document.activeElement.previousElementSibling;
        if (previousContent) {
            return previousContent.previousElementSibling;
        }
    }
    // returns heading that is after currently selected one.
    _nextHeading() {
        // activeElement would be the currently selected heading
        // 2 elemements after that would be the next heading.
        const nextContent = document.activeElement.nextElementSibling;
        if (nextContent) {
            return nextContent.nextElementSibling;
        }
    }
    // returns first heading in multi-panel.
    _firstHeading() {
        // first element is always first heading
        return this.firstElementChild;
    }
    // returns last heading in multi-panel.
    _lastHeading() {
        // if the last element is heading, return last element
        const lastEl = this.lastElementChild;
        if (lastEl && lastEl.classList.contains(panelHeading)) {
            return lastEl;
        }
        // otherwise return 2nd from the last
        const lastContent = this.lastElementChild;
        if (lastContent) {
            return lastContent.previousElementSibling;
        }
    }
    /**
     * If true, only one panel can be open at once. When one opens, others close.
     */
    get openOneOnly() {
        return this.hasAttribute(openOneOnlyAttr);
    }
    set openOneOnly(val) {
        if (val) {
            this.setAttribute(openOneOnlyAttr, '');
        }
        else {
            this.removeAttribute(openOneOnlyAttr);
        }
    }
}
customElements.define('multi-panel', MultiPanel);

const expandArrow = "_expand-arrow_126nv_85";
const fileSize = "_file-size_126nv_137";
const bubble = "_bubble_126nv_143";
const bubbleInner = "_bubble-inner_126nv_191";
const unit = "_unit_126nv_219";
const typeLabel = "_type-label_126nv_227";
const sizeInfo = "_size-info_126nv_239";
const percentInfo = "_percent-info_126nv_277";
const bigArrow = "_big-arrow_126nv_311";
const percentOutput = "_percent-output_126nv_337";
const sizeDirection = "_size-direction_126nv_373";
const sizeValue = "_size-value_126nv_395";
const percentChar = "_percent-char_126nv_407";
const download = "_download_126nv_423";
const downloadBlobs = "_download-blobs_126nv_491";
const downloadIcon = "_download-icon_126nv_515";
const downloadDisable = "_download-disable_126nv_557 _download_126nv_423";
const resultsLeft = "_results-left_126nv_581 _results_126nv_51";
const resultsRight = "_results-right_126nv_589 _results_126nv_51";
const isOriginal = "_is-original_126nv_689";

var css = "@font-face{font-family:Roboto Mono Numbers;font-style:normal;font-weight:700;src:url(\"data:font/woff;base64,d09GRgABAAAAAAkEAA0AAAAACygAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABMAAAADYAAAA2kxWCFk9TLzIAAAFoAAAAYAAAAGCY9cGQU1RBVAAAAcgAAABEAAAAROXczCxjbWFwAAACDAAAADwAAAA8AFsAbWdhc3AAAAJIAAAACAAAAAgAAAAQZ2x5ZgAAAlAAAASiAAAF7GtBYvxoZWFkAAAG9AAAADYAAAA2ATacDmhoZWEAAAcsAAAAJAAAACQKsQEqaG10eAAAB1AAAAAaAAAAGgb1AeRsb2NhAAAHbAAAABoAAAAaCBgG1W1heHAAAAeIAAAAIAAAACAAKwE6bmFtZQAAB6gAAAE7AAACbDvbXDhwb3N0AAAI5AAAACAAAAAg/20AZQABAAAACgAyADQABERGTFQAGmN5cmwAJGdyZWsAJGxhdG4AJAAEAAAAAP//AAAAAAAAAAAAAAAAAAQEzQK8AAUAAAWaBTMAAAEfBZoFMwAAA9EAZgIAAAAAAAAJAAAAAAAA4AAC/xAAIFsAAAAgAAAAAEdPT0cAIAAgADkIYv3VAAAIYgIrIAABn08BAAAEOgWwAAAAIAABAAEAAQAIAAIAAAAUAAIAAAAkAAJ3Z2h0AQAAAGl0YWwBCwABAAQAEAABAAAAAAEQArwAAAADAAEAAgERAAAAAAABAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACgAAAAGAAQAAQACACAAOf//AAAAIAAw////4f/SAAEAAAAAAAAAAQAB//8AD3icjZRLbBtVFIbv9SsihTROMh7P056M37FrJ54ZO/Y4sT12/IidOCl9JU3bxGneSaPS0CLBolC6i5AAKYukCEQrqFBaQ0ok1AqEVCQ2bGCRAgKEKpAogQVigdTYYSZeYBEhMaure4/u/P93/nOBGizv/qqJaT8DGHCBMAAxPWez22xsq65Op0P0LQbUYPB3CAFBgBzH85yy8ncou6i+RalhW5V6O2xpQTSxeKSrtDB/O9IVl7oipfmFUiQSK49juDHldUkobVJhmDHt9WeNCKqCV1QueHJ5K5POZtOZreXK9eWtdCabzaS3oNZk9r018KyVZQmSXRqsRAYu2iysw9k6EYdmysQACNYBUAvaEtABMKpntYhVrxYOlq/CRW3ppz+uPH4byDU9AGiS2vuyMzDKM1BQxPO1/pgaP8ienTqIaJLly7ApdcHl9IidoffOXfhESmQhSlPkkWBbCsdIBDXmAhXnD7A183I0+lL69LVgsKs3FlsfDZ800SYSJ3LtTI/DOSZWdB8rOs7sbmvSso6czBep/VsVHs/UYK7qs/8frSy8sdI5zJhbKZI6KvgKFG2uPDqcTL4/Mnc3kegjKepEhCsQBJmKRu/Mja9HoxloMJNExuXPY8pHHBPVgw9wgng67M3hFE3hWMo1s+bn/J0B4c2J0JS7LWHAkk7nsHdilef4EMe/esIRRQ1GEsNTbe5enGYAUCm50YzJvagHDUqCGIgyekbvl5EH9OqPKj+X1w6oRqDh5s4jKBIqSv3aTuhW5T4Uf4S/+coPFUJLMqEe+QYfAIdRYZ9RGRNj+DcjhUszwzOr3zdaUFR0RoZomkKNWH9weKm+8rv6SCJx+9Tzm6IYEoOdN6az502sStp5oPoi0EgdONBgY9nRUHjCanVNnT57TRCCfZJUGntms7tbsjXB6Lbsa1pWldXeA3YQlX2xrZo6nQpB9jWr2qC6qmw/3N9ffu9Ifc76YWV7ZORUKh67t7R4p7s74ee41Sn/catNRJ9IiuGbC42VbW6AJGmaJAvtvkGaZhqcGNWjvffc7Fzl6/XZF77K54/lJWlzpriRkPqNzS3t2PDrPB+qoE6LdTwcLlosTofDfqkwSHc0I6jCNil3J1GdlBjPIAxkNIkdqPq2/Dm0apHVh4/98iiBedlrl5xRL0iB03JlbfT2HKO6f9b7o6qu9VuT1P/a15iSka53i8V3xEiCIrCMhz8im+2NxzemJj+Ix3oFHx63OiXMzP5lIsjcIW+OoMw0QeR9vjxJ0BSGonGX/KYYjShqiLe5JCOKazzFlb1HilspCmNOexTFUm7PrDi5xvGK2rXJvisdpKcJ6WTc0+VSRz9JUgRODHIdBUpBThVUeXcGxykKxzMed0YeEDnnaSXho7t/arwyHQeIAXCWlYfYEhCaeH4fpSqZALIHq3mfbaR6AHPNyKfQMDR0VOqObp5f3JBDFxD4N6baBxkTh9RHhOD1V4QCTuAkjufbPX0UxTxpx4nYd79cnJ2BlltnXvymv//4QE/P3ZnJjXg8pz/4lAXRFS67D/nglx6bbSIYnHTYvQ6H41KhaOKbWwzgbxq6UxkAAAABAAAAAwAA+7NEP18PPPUACwgAAAAAAMTwES4AAAAA2tg/q/wF/dUGRwhiAAEACQACAAAAAAAAAAEAAAhi/dUAAATN/AX+hgZHAAEAAAAAAAAAAAAAAAAAAAABBM0AAAAAAI0ArQBGAGAAOwB1AGkARQBtAGEAAAAAAAAAAABcAG4AsgEiAUMBjgHxAgQCkwL2AAAAAQAAAAwAsQAWAIcABQABAAAAAAAAAAAAAAAAAAMAAXicfZG9TgJBFIW/ESQajdHGwsJsZbRgwb9GG39iCImiUaKdyYq4YFjWwBLji/ggxtoHoPSJPDs7qzSYmztz5s6cc+bOAIu8U8AU54FPZYYNq1pleIY5xg4X2OPb4SKeKTk8y5rZcLjEujlyeImmuc+wkZf5cHhB+Mvh5T99s6L6mFNiXnhjQJeQDgkeO1TZZl+oqUpb87VOPSgTpceFxr5FV+LFPOtMyzKPGWnuqDZgqPWmVUzkMOSAiiKUT3piJD1frJjIVmNFSE9KT1Y9EaNi1XPfyLluTbnNibLHI7vSrdo4pMaloiY0yckZ5V/OtP7y/VvdK+2oa3e8CY//dfPus95fbfgEqgTqPX1b375VqN2e1Fuq9OXTtt2fU9f/nNHgRmNZ/5K63mk3/6u6MnDMhlWK0vUPUDBdTwAAAwAAAAAAAP9qAGQAAAABAAAAAAAAAAAAAAAAAAAAAA==\") format(\"woff\")}@keyframes _action-enter_126nv_1{0%{transform:rotate(-90deg);opacity:0;animation-timing-function:ease-out}}@keyframes _action-leave_126nv_1{0%{transform:rotate(0deg);opacity:1;animation-timing-function:ease-out}}._results_126nv_51{--download-overflow-size:9px;background:rgba(0,0,0,.67);border-radius:5px;display:grid;grid-template-columns:max-content [bubble] 1fr [download] max-content}@media (min-width:600px){._results_126nv_51{--download-overflow-size:30px;background:none;border-radius:none;grid-template-columns:[download] auto [bubble] 1fr;align-items:center;margin-bottom:calc(var(--download-overflow-size)/2)}}._expand-arrow_126nv_85{fill:var(--white);transform:rotate(180deg);margin:0 1rem;align-self:center}@media (min-width:600px){._expand-arrow_126nv_85{display:none}}:focus ._expand-arrow_126nv_85{fill:var(--main-theme-color)}[content-expanded] ._expand-arrow_126nv_85{transform:none}._expand-arrow_126nv_85 svg{display:block;--size:15px;width:var(--size);height:var(--size)}._bubble_126nv_143{align-self:center}@media (min-width:600px){._bubble_126nv_143{position:relative;width:max-content;grid-row:1;grid-column:bubble}._bubble_126nv_143:before{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;border-image-source:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='186.5' height='280.3'%3E%3Cpath fill='rgba(30,31,29,0.69)' d='M181.5 0H16.4a5 5 0 00-5 5v134L0 146.5h11.4v128.8a5 5 0 005 5h165.1a5 5 0 005-5V5a5 5 0 00-5-5z'/%3E%3Cpath fill='rgba(0,0,0,0.23)' d='M16.4 1a4 4 0 00-4 4v134.5l-.5.3-8.6 5.7h9v129.8a4 4 0 004 4h165.2a4 4 0 004-4V5a4 4 0 00-4-4H16.4m0-1h165.1a5 5 0 015 5v270.3a5 5 0 01-5 5H16.4a5 5 0 01-5-5V146.5H0l11.4-7.5V5a5 5 0 015-5z'/%3E%3C/svg%3E\");border-image-slice:12 12 12 17 fill;border-image-width:12px 12px 12px 17px;border-image-repeat:repeat}}._bubble-inner_126nv_191{display:grid;grid-template-columns:[size-info] 1fr [percent-info] auto}@media (min-width:600px){._bubble-inner_126nv_191{position:relative;--main-padding:1px;--speech-padding:2.1rem;padding:var(--main-padding) var(--main-padding) var(--main-padding) var(--speech-padding);gap:.9rem}}._unit_126nv_219{color:var(--main-theme-color)}@media (min-width:600px){._type-label_126nv_227{display:none}}._size-info_126nv_239{background:var(--dark-gray);border-radius:19px;align-self:center;grid-column:size-info;grid-row:1;justify-self:start;padding:.6rem 1.2rem;margin:.4rem 0}@media (min-width:600px){._size-info_126nv_239{border-radius:none;background:none;padding:0;margin:0}}._percent-info_126nv_277{align-self:center;margin-left:1rem;margin-right:.3rem}@media (min-width:600px){._percent-info_126nv_277{margin:0;display:grid;--arrow-width:16px;grid-template-columns:[arrow] var(--arrow-width) [data] auto;grid-column:percent-info;grid-row:1;--shadow-direction:-1px;filter:drop-shadow(var(--shadow-direction) 0 0 rgba(0,0,0,.67))}}._big-arrow_126nv_311{display:none}@media (min-width:600px){._big-arrow_126nv_311{display:block;width:100%;fill:var(--main-theme-color);grid-column:arrow;grid-row:1;align-self:stretch}}._percent-output_126nv_337{grid-column:data;grid-row:1;display:grid;grid-template-columns:auto auto auto;line-height:1}@media (min-width:600px){._percent-output_126nv_337{background:var(--main-theme-color);--radius:4px;border-radius:0 var(--radius) var(--radius) 0;--padding-arrow-side:0.6rem;--padding-other-side:1.1rem;padding:.7rem var(--padding-other-side);padding-left:var(--padding-arrow-side)}}._size-direction_126nv_373{font-weight:700;align-self:center;font-family:sans-serif;opacity:.76;text-shadow:0 2px rgba(0,0,0,.3);font-size:1.5rem;position:relative;top:3px}._size-value_126nv_395{font-family:Roboto Mono Numbers;font-size:2.6rem;text-shadow:0 2px rgba(0,0,0,.3)}._percent-char_126nv_407{align-self:start;position:relative;top:4px;opacity:.76;margin-left:.2rem}._download_126nv_423{--size:59px;width:calc(var(--size) + var(--download-overflow-size));height:calc(var(--size) + var(--download-overflow-size));position:relative;grid-row:1;grid-column:download;margin:calc(var(--download-overflow-size)/-2) 0;margin-right:calc(var(--download-overflow-size)/-3);display:grid;align-items:center;justify-items:center;align-self:center}@media (min-width:600px){._download_126nv_423{--size:63px}}._download_126nv_423 loading-spinner{grid-area:1/1;position:relative;--color:var(--white);--size:21px;top:0;left:1px}@media (min-width:600px){._download_126nv_423 loading-spinner{top:-1px;left:2px;--size:28px}}._download-blobs_126nv_491{position:absolute;top:0;left:0;width:100%;height:100%}._download-blobs_126nv_491 path{fill:var(--hot-theme-color);opacity:.7}._download-icon_126nv_515{grid-area:1/1}._download-icon_126nv_515 svg{--size:19px;width:var(--size);height:var(--size);fill:var(--white);position:relative;top:3px;left:1px;animation:_action-enter_126nv_1 .2s}@media (min-width:600px){._download-icon_126nv_515 svg{--size:27px;top:2px;left:2px}}._download-disable_126nv_557{pointer-events:none}._download-disable_126nv_557 ._download-icon_126nv_515 svg{opacity:0;transform:rotate(90deg);animation:_action-leave_126nv_1 .2s}@media (min-width:600px){._results-right_126nv_589{grid-template-columns:[bubble] 1fr [download] auto}}@media (min-width:600px){._results-right_126nv_589 ._bubble_126nv_143{justify-self:end}._results-right_126nv_589 ._bubble_126nv_143:before{transform:scaleX(-1)}}._results-right_126nv_589 ._download_126nv_423{margin-left:calc(var(--download-overflow-size)/-3);margin-right:0}@media (min-width:600px){._results-right_126nv_589 ._bubble-inner_126nv_191{padding:var(--main-padding) var(--speech-padding) var(--main-padding) var(--main-padding);grid-template-columns:[percent-info] auto [size-info] 1fr}}@media (min-width:600px){._results-right_126nv_589 ._percent-info_126nv_277{grid-template-columns:[data] auto [arrow] var(--arrow-width);--shadow-direction:1px}}@media (min-width:600px){._results-right_126nv_589 ._percent-output_126nv_337{border-radius:var(--radius) 0 0 var(--radius);padding-left:var(--padding-other-side);padding-right:var(--padding-arrow-side)}}._results-right_126nv_589 ._big-arrow_126nv_311{transform:scaleX(-1)}._is-original_126nv_689 ._big-arrow_126nv_311{fill:transparent}._is-original_126nv_689 ._percent-output_126nv_337{background:none}._is-original_126nv_689 ._download-blobs_126nv_491 path{fill:var(--black)}._is-original_126nv_689 ._unit_126nv_219{color:var(--white);opacity:.76}";

appendCss(css);

// Based on https://www.npmjs.com/package/pretty-bytes
// Modified so the units are returned separately.
const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
function prettyBytes(number) {
    const isNegative = number < 0;
    const prefix = isNegative ? '-' : '';
    if (isNegative)
        number = -number;
    if (number < 1)
        return { value: prefix + number, unit: UNITS[0] };
    const exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);
    return {
        unit: UNITS[exponent],
        value: prefix + (number / Math.pow(1000, exponent)).toPrecision(3),
    };
}

const loadingReactionDelay = 500;
class Results extends d {
    constructor() {
        super(...arguments);
        this.state = {
            showLoadingState: this.props.loading,
        };
        /** The timeout ID between entering the loading state, and changing UI */
        this.loadingTimeoutId = 0;
        this.onDownload = () => {
            // GA can’t do floats. So we round to ints. We're deliberately rounding to nearest kilobyte to
            // avoid cases where exact image sizes leak something interesting about the user.
            Math.round(this.props.source.file.size / 1024);
            Math.round(this.props.imageFile.size / 1024);
            // No analytics
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loading && !this.props.loading) {
            // Just stopped loading
            clearTimeout(this.loadingTimeoutId);
            this.setState({ showLoadingState: false });
        }
        else if (!prevProps.loading && this.props.loading) {
            // Just started loading
            this.loadingTimeoutId = self.setTimeout(() => this.setState({ showLoadingState: true }), loadingReactionDelay);
        }
    }
    render({ source, imageFile, downloadUrl, flipSide, typeLabel: typeLabel$1 }, { showLoadingState }) {
        const prettySize = imageFile && prettyBytes(imageFile.size);
        const isOriginal$1 = !source || !imageFile || source.file === imageFile;
        let diff;
        let percent;
        if (source && imageFile) {
            diff = imageFile.size / source.file.size;
            const absolutePercent = Math.round(Math.abs(diff) * 100);
            percent = diff > 1 ? absolutePercent - 100 : 100 - absolutePercent;
        }
        return (h("div", { class: (flipSide ? resultsRight : resultsLeft) +
                ' ' +
                (isOriginal$1 ? isOriginal : '') },
            h("div", { class: expandArrow },
                h(Arrow, null)),
            h("div", { class: bubble },
                h("div", { class: bubbleInner },
                    h("div", { class: sizeInfo },
                        h("div", { class: fileSize }, prettySize ? (h(p, null,
                            prettySize.value,
                            ' ',
                            h("span", { class: unit }, prettySize.unit),
                            h("span", { class: typeLabel },
                                " ",
                                typeLabel$1))) : ('…'))),
                    h("div", { class: percentInfo },
                        h("svg", { viewBox: "0 0 1 2", class: bigArrow, preserveAspectRatio: "none" },
                            h("path", { d: "M1 0v2L0 1z" })),
                        h("div", { class: percentOutput },
                            diff && diff !== 1 && (h("span", { class: sizeDirection }, diff < 1 ? '↓' : '↑')),
                            h("span", { class: sizeValue }, percent || 0),
                            h("span", { class: percentChar }, "%"))))),
            h("a", { class: showLoadingState ? downloadDisable : download, href: downloadUrl, download: imageFile ? imageFile.name : '', title: "Download", onClick: this.onDownload },
                h("svg", { class: downloadBlobs, viewBox: "0 0 89.6 86.9" },
                    h("title", null, "Download"),
                    h("path", { d: "M27.3 72c-8-4-15.6-12.3-16.9-21-1.2-8.7 4-17.8 10.5-26s14.4-15.6 24-16 21.2 6 28.6 16.5c7.4 10.5 10.8 25 6.6 34S64.1 71.8 54 73.6c-10.2 2-18.7 2.3-26.7-1.6z" }),
                    h("path", { d: "M19.8 24.8c4.3-7.8 13-15 21.8-15.7 8.7-.8 17.5 4.8 25.4 11.8 7.8 6.9 14.8 15.2 14.7 24.9s-7.1 20.7-18 27.6c-10.8 6.8-25.5 9.5-34.2 4.8S18.1 61.6 16.7 51.4c-1.3-10.3-1.3-18.8 3-26.6z" })),
                h("div", { class: downloadIcon },
                    h(DownloadIcon, null)),
                showLoadingState && h("loading-spinner", null))));
    }
}

// This file is autogenerated by lib/feature-plugin.js
const methodNames = [
    "avifDecode",
    "jxlDecode",
    "qoiDecode",
    "webpDecode",
    "wp2Decode",
    "avifEncode",
    "jxlEncode",
    "mozjpegEncode",
    "oxipngEncode",
    "qoiEncode",
    "webpEncode",
    "wp2Encode",
    "rotate",
    "quantize",
    "resize"
];

var workerURL = "index-de00e23e.js";

/** How long the worker should be idle before terminating. */
const workerTimeout = 10000;
class WorkerBridge {
    constructor() {
        this._queue = Promise.resolve();
    }
    _terminateWorker() {
        if (!this._worker)
            return;
        this._worker.terminate();
        this._worker = undefined;
        this._workerApi = undefined;
    }
    _startWorker() {
        this._worker = new Worker(workerURL);
        this._workerApi = wrap(this._worker);
    }
}
for (const methodName of methodNames) {
    WorkerBridge.prototype[methodName] = function (signal, ...args) {
        this._queue = this._queue
            // Ignore any errors in the queue
            .catch(() => { })
            .then(async () => {
            if (signal.aborted)
                throw new DOMException('AbortError', 'AbortError');
            clearTimeout(this._workerTimeout);
            if (!this._worker)
                this._startWorker();
            const onAbort = () => this._terminateWorker();
            signal.addEventListener('abort', onAbort);
            return abortable(signal, 
            // @ts-ignore - TypeScript can't figure this out
            this._workerApi[methodName](...args)).finally(() => {
                // No longer care about aborting - this task is complete.
                signal.removeEventListener('abort', onAbort);
                // Start a timer to clear up the worker.
                this._workerTimeout = setTimeout(() => {
                    this._terminateWorker();
                }, workerTimeout);
            });
        });
        return this._queue;
    };
}
var WorkerBridge$1 = WorkerBridge;

async function decodeImage(signal, blob, workerBridge) {
    assertSignal(signal);
    const mimeType = await abortable(signal, sniffMimeType(blob));
    const canDecode = await abortable(signal, canDecodeImageType(mimeType));
    try {
        if (!canDecode) {
            if (mimeType === 'image/avif') {
                return await workerBridge.avifDecode(signal, blob);
            }
            if (mimeType === 'image/webp') {
                return await workerBridge.webpDecode(signal, blob);
            }
            if (mimeType === 'image/jxl') {
                return await workerBridge.jxlDecode(signal, blob);
            }
            if (mimeType === 'image/webp2') {
                return await workerBridge.wp2Decode(signal, blob);
            }
            if (mimeType === 'image/qoi') {
                return await workerBridge.qoiDecode(signal, blob);
            }
        }
        // Otherwise fall through and try built-in decoding for a laugh.
        return await builtinDecode(signal, blob);
    }
    catch (err) {
        if (err instanceof Error && err.name === 'AbortError')
            throw err;
        console.log(err);
        throw Error("Couldn't decode image");
    }
}
async function preprocessImage(signal, data, preprocessorState, workerBridge) {
    assertSignal(signal);
    let processedData = data;
    if (preprocessorState.rotate.rotate !== 0) {
        processedData = await workerBridge.rotate(signal, processedData, preprocessorState.rotate);
    }
    return processedData;
}
async function processImage(signal, source, processorState, workerBridge) {
    assertSignal(signal);
    let result = source.preprocessed;
    if (processorState.resize.enabled) {
        result = await resize(signal, source, processorState.resize, workerBridge);
    }
    if (processorState.quantize.enabled) {
        result = await workerBridge.quantize(signal, result, processorState.quantize);
    }
    return result;
}
async function compressImage(signal, image, encodeData, sourceFilename, workerBridge) {
    assertSignal(signal);
    const encoder = encoderMap[encodeData.type];
    const compressedData = await encoder.encode(signal, workerBridge, image, 
    // The type of encodeData.options is enforced via the previous line
    encodeData.options);
    // This type ensures the image mimetype is consistent with our mimetype sniffer
    const type = encoder.meta.mimeType;
    return new File([compressedData], sourceFilename.replace(/.[^.]*$/, `.${encoder.meta.extension}`), { type });
}
function stateForNewSourceData(state) {
    let newState = { ...state };
    for (const i of [0, 1]) {
        // Ditch previous encodings
        const downloadUrl = state.sides[i].downloadUrl;
        if (downloadUrl)
            URL.revokeObjectURL(downloadUrl);
        newState = cleanMerge(state, `sides.${i}`, {
            preprocessed: undefined,
            file: undefined,
            downloadUrl: undefined,
            data: undefined,
            encodedSettings: undefined,
        });
    }
    return newState;
}
async function processSvg(signal, blob) {
    assertSignal(signal);
    // Firefox throws if you try to draw an SVG to canvas that doesn't have width/height.
    // In Chrome it loads, but drawImage behaves weirdly.
    // This function sets width/height if it isn't already set.
    const parser = new DOMParser();
    const text = await abortable(signal, blobToText(blob));
    const document = parser.parseFromString(text, 'image/svg+xml');
    const svg = document.documentElement;
    if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
        return blobToImg(blob);
    }
    const viewBox = svg.getAttribute('viewBox');
    if (viewBox === null)
        throw Error('SVG must have width/height or viewBox');
    const viewboxParts = viewBox.split(/\s+/);
    svg.setAttribute('width', viewboxParts[2]);
    svg.setAttribute('height', viewboxParts[3]);
    const serializer = new XMLSerializer();
    const newSource = serializer.serializeToString(document);
    return abortable(signal, blobToImg(new Blob([newSource], { type: 'image/svg+xml' })));
}
/**
 * If two processors are disabled, they're considered equivalent, otherwise
 * equivalence is based on ===
 */
function processorStateEquivalent(a, b) {
    // Quick exit
    if (a === b)
        return true;
    // All processors have the same keys
    for (const key of Object.keys(a)) {
        // If both processors are disabled, they're the same.
        if (!a[key].enabled && !b[key].enabled)
            continue;
        if (a !== b)
            return false;
    }
    return true;
}
const loadingIndicator = '⏳ ';
const originalDocumentTitle = document.title;
function updateDocumentTitle(loadingFileInfo) {
    const { loading, filename } = loadingFileInfo;
    let title = '';
    if (loading)
        title += loadingIndicator;
    if (filename)
        title += filename + ' - ';
    title += originalDocumentTitle;
    document.title = title;
}
class Compress extends d {
    constructor(props) {
        super(props);
        this.widthQuery = window.matchMedia('(max-width: 599px)');
        this.state = {
            source: undefined,
            loading: false,
            preprocessorState: defaultPreprocessorState,
            // Tasking catched side settings if available otherwise taking default settings
            sides: [
                localStorage.getItem('leftSideSettings')
                    ? {
                        ...JSON.parse(localStorage.getItem('leftSideSettings')),
                        loading: false,
                    }
                    : {
                        latestSettings: {
                            processorState: defaultProcessorState,
                            encoderState: undefined,
                        },
                        loading: false,
                    },
                localStorage.getItem('rightSideSettings')
                    ? {
                        ...JSON.parse(localStorage.getItem('rightSideSettings')),
                        loading: false,
                    }
                    : {
                        latestSettings: {
                            processorState: defaultProcessorState,
                            encoderState: {
                                type: 'mozJPEG',
                                options: encoderMap.mozJPEG.meta.defaultOptions,
                            },
                        },
                        loading: false,
                    },
            ],
            mobileView: this.widthQuery.matches,
        };
        this.encodeCache = new ResultCache();
        // One for each side
        this.workerBridges = [new WorkerBridge$1(), new WorkerBridge$1()];
        /** Abort controller for actions that impact both sites, like source image decoding and preprocessing */
        this.mainAbortController = new AbortController();
        // And again one for each side
        this.sideAbortControllers = [new AbortController(), new AbortController()];
        this.onMobileWidthChange = () => {
            this.setState({ mobileView: this.widthQuery.matches });
        };
        this.onEncoderTypeChange = (index, newType) => {
            this.setState({
                sides: cleanSet(this.state.sides, `${index}.latestSettings.encoderState`, newType === 'identity'
                    ? undefined
                    : {
                        type: newType,
                        options: encoderMap[newType].meta.defaultOptions,
                    }),
            });
        };
        this.onProcessorOptionsChange = (index, options) => {
            this.setState({
                sides: cleanSet(this.state.sides, `${index}.latestSettings.processorState`, options),
            });
        };
        this.onEncoderOptionsChange = (index, options) => {
            this.setState({
                sides: cleanSet(this.state.sides, `${index}.latestSettings.encoderState.options`, options),
            });
        };
        this.onCopyToOtherClick = async (index) => {
            const otherIndex = index ? 0 : 1;
            const oldSettings = this.state.sides[otherIndex];
            const newSettings = { ...this.state.sides[index] };
            // Create a new object URL for the new settings. This avoids both sides sharing a URL, which
            // means it can be safely revoked without impacting the other side.
            if (newSettings.file) {
                newSettings.downloadUrl = URL.createObjectURL(newSettings.file);
            }
            this.setState({
                sides: cleanSet(this.state.sides, otherIndex, newSettings),
            });
            const result = await this.props.showSnack('Settings copied across', {
                timeout: 5000,
                actions: ['undo', 'dismiss'],
            });
            if (result !== 'undo')
                return;
            this.setState({
                sides: cleanSet(this.state.sides, otherIndex, oldSettings),
            });
        };
        /**
         * This function saves encodedSettings and latestSettings of
         * particular side in browser local storage
         * @param index : (0|1)
         * @returns
         */
        this.onSaveSideSettingsClick = async (index) => {
            if (index === 0) {
                const leftSideSettings = JSON.stringify({
                    encodedSettings: this.state.sides[index].encodedSettings,
                    latestSettings: this.state.sides[index].latestSettings,
                });
                localStorage.setItem('leftSideSettings', leftSideSettings);
                // Firing an event when we save side settings in localstorage
                window.dispatchEvent(new CustomEvent('leftSideSettings'));
                await this.props.showSnack('Left side settings saved', {
                    timeout: 1500,
                    actions: ['dismiss'],
                });
                return;
            }
            if (index === 1) {
                const rightSideSettings = JSON.stringify({
                    encodedSettings: this.state.sides[index].encodedSettings,
                    latestSettings: this.state.sides[index].latestSettings,
                });
                localStorage.setItem('rightSideSettings', rightSideSettings);
                // Firing an event when we save side settings in localstorage
                window.dispatchEvent(new CustomEvent('rightSideSettings'));
                await this.props.showSnack('Right side settings saved', {
                    timeout: 1500,
                    actions: ['dismiss'],
                });
                return;
            }
        };
        /**
         * This function sets the side state with catched localstorage
         * value as per side index provided
         * @param index : (0|1)
         * @returns
         */
        this.onImportSideSettingsClick = async (index) => {
            const leftSideSettingsString = localStorage.getItem('leftSideSettings');
            const rightSideSettingsString = localStorage.getItem('rightSideSettings');
            if (index === 0 && leftSideSettingsString) {
                const oldLeftSideSettings = this.state.sides[index];
                const newLeftSideSettings = {
                    ...this.state.sides[index],
                    ...JSON.parse(leftSideSettingsString),
                };
                this.setState({
                    sides: cleanSet(this.state.sides, index, newLeftSideSettings),
                });
                const result = await this.props.showSnack('Left side settings imported', {
                    timeout: 3000,
                    actions: ['undo', 'dismiss'],
                });
                if (result === 'undo') {
                    this.setState({
                        sides: cleanSet(this.state.sides, index, oldLeftSideSettings),
                    });
                }
                return;
            }
            if (index === 1 && rightSideSettingsString) {
                const oldRightSideSettings = this.state.sides[index];
                const newRightSideSettings = {
                    ...this.state.sides[index],
                    ...JSON.parse(rightSideSettingsString),
                };
                this.setState({
                    sides: cleanSet(this.state.sides, index, newRightSideSettings),
                });
                const result = await this.props.showSnack('Right side settings imported', {
                    timeout: 3000,
                    actions: ['undo', 'dismiss'],
                });
                if (result === 'undo') {
                    this.setState({
                        sides: cleanSet(this.state.sides, index, oldRightSideSettings),
                    });
                }
                return;
            }
        };
        this.onPreprocessorChange = async (preprocessorState) => {
            const source = this.state.source;
            if (!source)
                return;
            const oldRotate = this.state.preprocessorState.rotate.rotate;
            const newRotate = preprocessorState.rotate.rotate;
            const orientationChanged = oldRotate % 180 !== newRotate % 180;
            this.setState((state) => ({
                loading: true,
                preprocessorState,
                // Flip resize values if orientation has changed
                sides: !orientationChanged
                    ? state.sides
                    : state.sides.map((side) => {
                        const currentResizeSettings = side.latestSettings.processorState.resize;
                        const resizeSettings = {
                            width: currentResizeSettings.height,
                            height: currentResizeSettings.width,
                        };
                        return cleanMerge(side, 'latestSettings.processorState.resize', resizeSettings);
                    }),
            }));
        };
        /** The in-progress job for each side (processing and encoding) */
        this.activeSideJobs = [undefined, undefined];
        this.widthQuery.addListener(this.onMobileWidthChange);
        this.sourceFile = props.file;
        this.queueUpdateImage({ immediate: true });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.file !== this.props.file) {
            this.sourceFile = nextProps.file;
            this.queueUpdateImage({ immediate: true });
        }
    }
    componentWillUnmount() {
        updateDocumentTitle({ loading: false });
        this.widthQuery.removeListener(this.onMobileWidthChange);
        this.mainAbortController.abort();
        for (const controller of this.sideAbortControllers) {
            controller.abort();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        var _a;
        const wasLoading = prevState.loading ||
            prevState.sides[0].loading ||
            prevState.sides[1].loading;
        const isLoading = this.state.loading ||
            this.state.sides[0].loading ||
            this.state.sides[1].loading;
        const sourceChanged = prevState.source !== this.state.source;
        if (wasLoading !== isLoading || sourceChanged) {
            updateDocumentTitle({
                loading: isLoading,
                filename: (_a = this.state.source) === null || _a === void 0 ? void 0 : _a.file.name,
            });
        }
        this.queueUpdateImage();
    }
    /**
     * Debounce the heavy lifting of updateImage.
     * Otherwise, the thrashing causes jank, and sometimes crashes iOS Safari.
     */
    queueUpdateImage({ immediate } = {}) {
        // Call updateImage after this delay, unless queueUpdateImage is called
        // again, in which case the timeout is reset.
        const delay = 100;
        clearTimeout(this.updateImageTimeout);
        if (immediate) {
            this.updateImage();
        }
        else {
            this.updateImageTimeout = setTimeout(() => this.updateImage(), delay);
        }
    }
    /**
     * Perform image processing.
     *
     * This function is a monster, but I didn't want to break it up, because it
     * never gets partially called. Instead, it looks at the current state, and
     * decides which steps can be skipped, and which can be cached.
     */
    async updateImage() {
        const currentState = this.state;
        // State of the last completed job, or ongoing job
        const latestMainJobState = this.activeMainJob || {
            file: currentState.source && currentState.source.file,
            preprocessorState: currentState.encodedPreprocessorState,
        };
        const latestSideJobStates = currentState.sides.map((side, i) => this.activeSideJobs[i] || {
            processorState: side.encodedSettings && side.encodedSettings.processorState,
            encoderState: side.encodedSettings && side.encodedSettings.encoderState,
        });
        // State for this job
        const mainJobState = {
            file: this.sourceFile,
            preprocessorState: currentState.preprocessorState,
        };
        const sideJobStates = currentState.sides.map((side) => ({
            // If there isn't an encoder selected, we don't process either
            processorState: side.latestSettings.encoderState
                ? side.latestSettings.processorState
                : defaultProcessorState,
            encoderState: side.latestSettings.encoderState,
        }));
        // Figure out what needs doing:
        const needsDecoding = latestMainJobState.file != mainJobState.file;
        const needsPreprocessing = needsDecoding ||
            latestMainJobState.preprocessorState !== mainJobState.preprocessorState;
        const sideWorksNeeded = latestSideJobStates.map((latestSideJob, i) => {
            const needsProcessing = needsPreprocessing ||
                !latestSideJob.processorState ||
                // If we're going to or from 'original image' we should reprocess
                !!latestSideJob.encoderState !== !!sideJobStates[i].encoderState ||
                !processorStateEquivalent(latestSideJob.processorState, sideJobStates[i].processorState);
            return {
                processing: needsProcessing,
                encoding: needsProcessing ||
                    latestSideJob.encoderState !== sideJobStates[i].encoderState,
            };
        });
        let jobNeeded = false;
        // Abort running tasks & cycle the controllers
        if (needsDecoding || needsPreprocessing) {
            this.mainAbortController.abort();
            this.mainAbortController = new AbortController();
            jobNeeded = true;
            this.activeMainJob = mainJobState;
        }
        for (const [i, sideWorkNeeded] of sideWorksNeeded.entries()) {
            if (sideWorkNeeded.processing || sideWorkNeeded.encoding) {
                this.sideAbortControllers[i].abort();
                this.sideAbortControllers[i] = new AbortController();
                jobNeeded = true;
                this.activeSideJobs[i] = sideJobStates[i];
            }
        }
        if (!jobNeeded)
            return;
        const mainSignal = this.mainAbortController.signal;
        const sideSignals = this.sideAbortControllers.map((ac) => ac.signal);
        let decoded;
        let vectorImage;
        // Handle decoding
        if (needsDecoding) {
            try {
                assertSignal(mainSignal);
                this.setState({
                    source: undefined,
                    loading: true,
                });
                // Special-case SVG. We need to avoid createImageBitmap because of
                // https://bugs.chromium.org/p/chromium/issues/detail?id=606319.
                // Also, we cache the HTMLImageElement so we can perform vector resizing later.
                if (mainJobState.file.type.startsWith('image/svg+xml')) {
                    vectorImage = await processSvg(mainSignal, mainJobState.file);
                    decoded = drawableToImageData(vectorImage);
                }
                else {
                    decoded = await decodeImage(mainSignal, mainJobState.file, 
                    // Either worker is good enough here.
                    this.workerBridges[0]);
                }
                // Set default resize values
                this.setState((currentState) => {
                    if (mainSignal.aborted)
                        return {};
                    const sides = currentState.sides.map((side) => {
                        const resizeState = {
                            width: decoded.width,
                            height: decoded.height,
                            method: vectorImage ? 'vector' : 'lanczos3',
                            // Disable resizing, to make it clearer to the user that something changed here
                            enabled: false,
                        };
                        return cleanMerge(side, 'latestSettings.processorState.resize', resizeState);
                    });
                    return { sides };
                });
            }
            catch (err) {
                if (err instanceof Error && err.name === 'AbortError')
                    return;
                this.props.showSnack(`Source decoding error: ${err}`);
                throw err;
            }
        }
        else {
            ({ decoded, vectorImage } = currentState.source);
        }
        let source;
        // Handle preprocessing
        if (needsPreprocessing) {
            try {
                assertSignal(mainSignal);
                this.setState({
                    loading: true,
                });
                const preprocessed = await preprocessImage(mainSignal, decoded, mainJobState.preprocessorState, 
                // Either worker is good enough here.
                this.workerBridges[0]);
                source = {
                    decoded,
                    vectorImage,
                    preprocessed,
                    file: mainJobState.file,
                };
                // Update state for process completion, including intermediate render
                this.setState((currentState) => {
                    if (mainSignal.aborted)
                        return {};
                    let newState = {
                        ...currentState,
                        loading: false,
                        source,
                        encodedPreprocessorState: mainJobState.preprocessorState,
                        sides: currentState.sides.map((side) => {
                            if (side.downloadUrl)
                                URL.revokeObjectURL(side.downloadUrl);
                            const newSide = {
                                ...side,
                                // Intermediate render
                                data: preprocessed,
                                processed: undefined,
                                encodedSettings: undefined,
                            };
                            return newSide;
                        }),
                    };
                    newState = stateForNewSourceData(newState);
                    return newState;
                });
            }
            catch (err) {
                if (err instanceof Error && err.name === 'AbortError')
                    return;
                this.setState({ loading: false });
                this.props.showSnack(`Preprocessing error: ${err}`);
                throw err;
            }
        }
        else {
            source = currentState.source;
        }
        // That's the main part of the job done.
        this.activeMainJob = undefined;
        // Allow side jobs to happen in parallel
        sideWorksNeeded.forEach(async (sideWorkNeeded, sideIndex) => {
            try {
                // If processing is true, encoding is always true.
                if (!sideWorkNeeded.encoding)
                    return;
                const signal = sideSignals[sideIndex];
                const jobState = sideJobStates[sideIndex];
                const workerBridge = this.workerBridges[sideIndex];
                let file;
                let data;
                let processed = undefined;
                // If there's no encoder state, this is "original image", which also
                // doesn't allow processing.
                if (!jobState.encoderState) {
                    file = source.file;
                    data = source.preprocessed;
                }
                else {
                    const cacheResult = this.encodeCache.match(source.preprocessed, jobState.processorState, jobState.encoderState);
                    if (cacheResult) {
                        ({ file, processed, data } = cacheResult);
                    }
                    else {
                        // Set loading state for this side
                        this.setState((currentState) => {
                            if (signal.aborted)
                                return {};
                            const sides = cleanMerge(currentState.sides, sideIndex, {
                                loading: true,
                            });
                            return { sides };
                        });
                        if (sideWorkNeeded.processing) {
                            processed = await processImage(signal, source, jobState.processorState, workerBridge);
                            // Update state for process completion, including intermediate render
                            this.setState((currentState) => {
                                if (signal.aborted)
                                    return {};
                                const currentSide = currentState.sides[sideIndex];
                                const side = {
                                    ...currentSide,
                                    processed,
                                    // Intermediate render
                                    data: processed,
                                    encodedSettings: {
                                        ...currentSide.encodedSettings,
                                        processorState: jobState.processorState,
                                    },
                                };
                                const sides = cleanSet(currentState.sides, sideIndex, side);
                                return { sides };
                            });
                        }
                        else {
                            processed = currentState.sides[sideIndex].processed;
                        }
                        file = await compressImage(signal, processed, jobState.encoderState, source.file.name, workerBridge);
                        data = await decodeImage(signal, file, workerBridge);
                        this.encodeCache.add({
                            data,
                            processed,
                            file,
                            preprocessed: source.preprocessed,
                            encoderState: jobState.encoderState,
                            processorState: jobState.processorState,
                        });
                    }
                }
                this.setState((currentState) => {
                    if (signal.aborted)
                        return {};
                    const currentSide = currentState.sides[sideIndex];
                    if (currentSide.downloadUrl) {
                        URL.revokeObjectURL(currentSide.downloadUrl);
                    }
                    const side = {
                        ...currentSide,
                        data,
                        file,
                        downloadUrl: URL.createObjectURL(file),
                        loading: false,
                        processed,
                        encodedSettings: {
                            processorState: jobState.processorState,
                            encoderState: jobState.encoderState,
                        },
                    };
                    const sides = cleanSet(currentState.sides, sideIndex, side);
                    return { sides };
                });
                this.activeSideJobs[sideIndex] = undefined;
            }
            catch (err) {
                if (err instanceof Error && err.name === 'AbortError')
                    return;
                this.setState((currentState) => {
                    const sides = cleanMerge(currentState.sides, sideIndex, {
                        loading: false,
                    });
                    return { sides };
                });
                this.props.showSnack(`Processing error: ${err}`);
                throw err;
            }
        });
    }
    render({ onBack }, { loading, sides, source, mobileView, preprocessorState }) {
        const [leftSide, rightSide] = sides;
        const [leftImageData, rightImageData] = sides.map((i) => i.data);
        const options$1 = sides.map((side, index) => (h(Options, { index: index, source: source, mobileView: mobileView, processorState: side.latestSettings.processorState, encoderState: side.latestSettings.encoderState, onEncoderTypeChange: this.onEncoderTypeChange, onEncoderOptionsChange: this.onEncoderOptionsChange, onProcessorOptionsChange: this.onProcessorOptionsChange, onCopyToOtherSideClick: this.onCopyToOtherClick, onSaveSideSettingsClick: this.onSaveSideSettingsClick, onImportSideSettingsClick: this.onImportSideSettingsClick })));
        const results = sides.map((side, index) => (h(Results, { downloadUrl: side.downloadUrl, imageFile: side.file, source: source, loading: loading || side.loading, flipSide: mobileView || index === 1, typeLabel: side.latestSettings.encoderState
                ? encoderMap[side.latestSettings.encoderState.type].meta.label
                : `${side.file ? `${side.file.name}` : 'Original Image'}` })));
        // For rendering, we ideally want the settings that were used to create the
        // data, not the latest settings.
        const leftDisplaySettings = leftSide.encodedSettings || leftSide.latestSettings;
        const rightDisplaySettings = rightSide.encodedSettings || rightSide.latestSettings;
        const leftImgContain = leftDisplaySettings.processorState.resize.enabled &&
            leftDisplaySettings.processorState.resize.fitMethod === 'contain';
        const rightImgContain = rightDisplaySettings.processorState.resize.enabled &&
            rightDisplaySettings.processorState.resize.fitMethod === 'contain';
        return (h("div", { class: compress },
            h(Output, { source: source, mobileView: mobileView, leftCompressed: leftImageData, rightCompressed: rightImageData, leftImgContain: leftImgContain, rightImgContain: rightImgContain, preprocessorState: preprocessorState, onPreprocessorChange: this.onPreprocessorChange }),
            h("button", { class: back, onClick: onBack },
                h("svg", { viewBox: "0 0 61 53.3" },
                    h("title", null, "Back"),
                    h("path", { class: backBlob, d: "M0 25.6c-.5-7.1 4.1-14.5 10-19.1S23.4.1 32.2 0c8.8 0 19 1.6 24.4 8s5.6 17.8 1.7 27a29.7 29.7 0 01-20.5 18c-8.4 1.5-17.3-2.6-24.5-8S.5 32.6.1 25.6z" }),
                    h("path", { class: backX, d: "M41.6 17.1l-2-2.1-8.3 8.2-8.2-8.2-2 2 8.2 8.3-8.3 8.2 2.1 2 8.2-8.1 8.3 8.2 2-2-8.2-8.3z" }))),
            mobileView ? (h("div", { class: options },
                h("multi-panel", { class: multiPanel, "open-one-only": true },
                    h("div", { class: options1Theme }, results[0]),
                    h("div", { class: options1Theme }, options$1[0]),
                    h("div", { class: options2Theme }, results[1]),
                    h("div", { class: options2Theme }, options$1[1])))) : ([
                h("div", { class: options1, key: "options1" },
                    options$1[0],
                    results[0]),
                h("div", { class: options2, key: "options2" },
                    options$1[1],
                    results[1]),
            ])));
    }
}

export { Compress as default };
//# sourceMappingURL=index-92d70034.js.map
