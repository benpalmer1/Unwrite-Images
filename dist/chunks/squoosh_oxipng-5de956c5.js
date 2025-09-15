/**
 * Copyright 2021 Google Inc. All Rights Reserved.
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

// Note: we use `wasm_bindgen_worker_`-prefixed message types to make sure
// we can handle bundling into other files, which might happen to have their
// own `postMessage`/`onmessage` communication channels.
//
// If we didn't take that into the account, we could send much simpler signals
// like just `0` or whatever, but the code would be less resilient.

function waitForMsgType(target, type) {
  return new Promise((resolve) => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data == null || data.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

waitForMsgType(self, 'wasm_bindgen_worker_init').then(async (data) => {
  // # Note 1
  // Our JS should have been generated in
  // `[out-dir]/snippets/wasm-bindgen-rayon-[hash]/workerHelpers.js`,
  // resolve the main module via `../../..`.
  //
  // This might need updating if the generated structure changes on wasm-bindgen
  // side ever in the future, but works well with bundlers today. The whole
  // point of this crate, after all, is to abstract away unstable features
  // and temporary bugs so that you don't need to deal with them in your code.
  //
  // # Note 2
  // This could be a regular import, but then some bundlers complain about
  // circular deps.
  //
  // Dynamic import could be cheap if this file was inlined into the parent,
  // which would require us just using `../../..` in `new Worker` below,
  // but that doesn't work because wasm-pack unconditionally adds
  // "sideEffects":false (see below).
  //
  // OTOH, even though it can't be inlined, it should be still reasonably
  // cheap since the requested file is already in cache (it was loaded by
  // the main thread).
  const pkg = await Promise.resolve().then(function () {
    return squoosh_oxipng;
  });
  await pkg.default(data.module, data.memory);
  postMessage({ type: 'wasm_bindgen_worker_ready' });
  pkg.wbg_rayon_start_worker(data.receiver);
});

async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    module,
    memory,
    receiver: builder.receiver(),
  };

  try {
    await Promise.all(
      Array.from({ length: builder.numThreads() }, () => {
        // Self-spawn into a new Worker.
        //
        // TODO: while `new URL('...', import.meta.url) becomes a semi-standard
        // way to get asset URLs relative to the module across various bundlers
        // and browser, ideally we should switch to `import.meta.resolve`
        // once it becomes a standard.
        //
        // Note: we could use `../../..` as the URL here to inline workerHelpers.js
        // into the parent entry instead of creating another split point -
        // this would be preferable from optimization perspective -
        // however, Webpack then eliminates all message handler code
        // because wasm-pack produces "sideEffects":false in package.json
        // unconditionally.
        //
        // The only way to work around that is to have side effect code
        // in an entry point such as Worker file itself.
        const worker = new Worker(
          new URL('workerHelpers-9c95fbb5.js', import.meta.url),
          {
            type: 'module',
          },
        );
        worker.postMessage(workerInit);
        return waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      }),
    );
    builder.build();
  } finally {
    builder.free();
  }
}

let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.__wbindgen_export_0.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.__wbindgen_export_0.buffer);
  }
  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.__wbindgen_export_0.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.__wbindgen_export_0.buffer);
  }
  return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8ClampedArray} data
 * @param {number} width
 * @param {number} height
 * @param {number} level
 * @param {boolean} interlace
 * @returns {Uint8Array}
 */
function optimise(data, width, height, level, interlace) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.optimise(retptr, ptr0, len0, width, height, level, interlace);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
function initThreadPool(num_threads) {
  var ret = wasm.initThreadPool(num_threads);
  return takeObject(ret);
}

/**
 * @param {number} receiver
 */
function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}

/**
 */
class wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.ptr = ptr;

    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;

    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
  }
  /**
   * @returns {number}
   */
  numThreads() {
    var ret = wasm.wbg_rayon_poolbuilder_numThreads(this.ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  receiver() {
    var ret = wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
    return ret;
  }
  /**
   */
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.ptr);
  }
}

async function load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn(
            '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
            e,
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

async function init(input, maybe_memory) {
  if (typeof input === 'undefined') {
    input = new URL(
      '../assets/squoosh_oxipng_bg-5c8fadb7.wasm',
      import.meta.url,
    );
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_module = function () {
    var ret = init.__wbindgen_wasm_module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function () {
    var ret = wasm.__wbindgen_export_0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_startWorkers_914655bb4d5bb5e1 = function (
    arg0,
    arg1,
    arg2,
  ) {
    var ret = startWorkers(
      takeObject(arg0),
      takeObject(arg1),
      wbg_rayon_PoolBuilder.__wrap(arg2),
    );
    return addHeapObject(ret);
  };

  if (
    typeof input === 'string' ||
    (typeof Request === 'function' && input instanceof Request) ||
    (typeof URL === 'function' && input instanceof URL)
  ) {
    input = fetch(input);
  }

  imports.wbg.memory =
    maybe_memory ||
    new WebAssembly.Memory({ initial: 17, maximum: 16384, shared: true });

  const { instance, module } = await load(await input, imports);

  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  wasm.__wbindgen_start();
  return wasm;
}

var squoosh_oxipng = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  optimise: optimise,
  initThreadPool: initThreadPool,
  wbg_rayon_start_worker: wbg_rayon_start_worker,
  wbg_rayon_PoolBuilder: wbg_rayon_PoolBuilder,
  default: init,
});

export {
  init as default,
  initThreadPool,
  optimise,
  wbg_rayon_PoolBuilder,
  wbg_rayon_start_worker,
};
//# sourceMappingURL=squoosh_oxipng-5de956c5.js.map
