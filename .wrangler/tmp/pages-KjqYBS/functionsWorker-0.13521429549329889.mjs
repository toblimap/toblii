var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../.wrangler/tmp/bundle-LN7Zhz/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  "../.wrangler/tmp/bundle-LN7Zhz/checked-fetch.js"() {
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// ../node_modules/hono/dist/compose.js
var compose;
var init_compose = __esm({
  "../node_modules/hono/dist/compose.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
      return (context, next) => {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
          if (i <= index) {
            throw new Error("next() called multiple times");
          }
          index = i;
          let res;
          let isError = false;
          let handler;
          if (middleware[i]) {
            handler = middleware[i][0][0];
            context.req.routeIndex = i;
          } else {
            handler = i === middleware.length && next || void 0;
          }
          if (handler) {
            try {
              res = await handler(context, () => dispatch(i + 1));
            } catch (err) {
              if (err instanceof Error && onError) {
                context.error = err;
                res = await onError(err, context);
                isError = true;
              } else {
                throw err;
              }
            }
          } else {
            if (context.finalized === false && onNotFound) {
              res = await onNotFound(context);
            }
          }
          if (res && (context.finalized === false || isError)) {
            context.res = res;
          }
          return context;
        }
        __name(dispatch, "dispatch");
      };
    }, "compose");
  }
});

// ../node_modules/hono/dist/http-exception.js
var init_http_exception = __esm({
  "../node_modules/hono/dist/http-exception.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
  }
});

// ../node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT;
var init_constants = __esm({
  "../node_modules/hono/dist/request/constants.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
  }
});

// ../node_modules/hono/dist/utils/body.js
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var parseBody, handleParsingAllValues, handleParsingNestedValues;
var init_body = __esm({
  "../node_modules/hono/dist/utils/body.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_request();
    parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
      const { all = false, dot = false } = options;
      const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
      const contentType = headers.get("Content-Type");
      if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
        return parseFormData(request, { all, dot });
      }
      return {};
    }, "parseBody");
    __name(parseFormData, "parseFormData");
    __name(convertFormDataToBodyData, "convertFormDataToBodyData");
    handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
      if (form[key] !== void 0) {
        if (Array.isArray(form[key])) {
          ;
          form[key].push(value);
        } else {
          form[key] = [form[key], value];
        }
      } else {
        if (!key.endsWith("[]")) {
          form[key] = value;
        } else {
          form[key] = [value];
        }
      }
    }, "handleParsingAllValues");
    handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
      if (/(?:^|\.)__proto__\./.test(key)) {
        return;
      }
      let nestedForm = form;
      const keys = key.split(".");
      keys.forEach((key2, index) => {
        if (index === keys.length - 1) {
          nestedForm[key2] = value;
        } else {
          if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
            nestedForm[key2] = /* @__PURE__ */ Object.create(null);
          }
          nestedForm = nestedForm[key2];
        }
      });
    }, "handleParsingNestedValues");
  }
});

// ../node_modules/hono/dist/utils/url.js
var splitPath, splitRoutingPath, extractGroupsFromPath, replaceGroupMarks, patternCache, getPattern, tryDecode, tryDecodeURI, getPath, getPathNoStrict, mergePath, checkOptionalParameter, _decodeURI, _getQueryParam, getQueryParam, getQueryParams, decodeURIComponent_;
var init_url = __esm({
  "../node_modules/hono/dist/utils/url.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    splitPath = /* @__PURE__ */ __name((path) => {
      const paths = path.split("/");
      if (paths[0] === "") {
        paths.shift();
      }
      return paths;
    }, "splitPath");
    splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
      const { groups, path } = extractGroupsFromPath(routePath);
      const paths = splitPath(path);
      return replaceGroupMarks(paths, groups);
    }, "splitRoutingPath");
    extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
      const groups = [];
      path = path.replace(/\{[^}]+\}/g, (match3, index) => {
        const mark = `@${index}`;
        groups.push([mark, match3]);
        return mark;
      });
      return { groups, path };
    }, "extractGroupsFromPath");
    replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = paths.length - 1; j >= 0; j--) {
          if (paths[j].includes(mark)) {
            paths[j] = paths[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      return paths;
    }, "replaceGroupMarks");
    patternCache = {};
    getPattern = /* @__PURE__ */ __name((label, next) => {
      if (label === "*") {
        return "*";
      }
      const match3 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      if (match3) {
        const cacheKey = `${label}#${next}`;
        if (!patternCache[cacheKey]) {
          if (match3[2]) {
            patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match3[1], new RegExp(`^${match3[2]}(?=/${next})`)] : [label, match3[1], new RegExp(`^${match3[2]}$`)];
          } else {
            patternCache[cacheKey] = [label, match3[1], true];
          }
        }
        return patternCache[cacheKey];
      }
      return null;
    }, "getPattern");
    tryDecode = /* @__PURE__ */ __name((str, decoder) => {
      try {
        return decoder(str);
      } catch {
        return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match3) => {
          try {
            return decoder(match3);
          } catch {
            return match3;
          }
        });
      }
    }, "tryDecode");
    tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
    getPath = /* @__PURE__ */ __name((request) => {
      const url = request.url;
      const start = url.indexOf("/", url.indexOf(":") + 4);
      let i = start;
      for (; i < url.length; i++) {
        const charCode = url.charCodeAt(i);
        if (charCode === 37) {
          const queryIndex = url.indexOf("?", i);
          const hashIndex = url.indexOf("#", i);
          const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
          const path = url.slice(start, end);
          return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
        } else if (charCode === 63 || charCode === 35) {
          break;
        }
      }
      return url.slice(start, i);
    }, "getPath");
    getPathNoStrict = /* @__PURE__ */ __name((request) => {
      const result = getPath(request);
      return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
    }, "getPathNoStrict");
    mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
      if (rest.length) {
        sub = mergePath(sub, ...rest);
      }
      return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
    }, "mergePath");
    checkOptionalParameter = /* @__PURE__ */ __name((path) => {
      if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
        return null;
      }
      const segments = path.split("/");
      const results = [];
      let basePath = "";
      segments.forEach((segment) => {
        if (segment !== "" && !/\:/.test(segment)) {
          basePath += "/" + segment;
        } else if (/\:/.test(segment)) {
          if (/\?/.test(segment)) {
            if (results.length === 0 && basePath === "") {
              results.push("/");
            } else {
              results.push(basePath);
            }
            const optionalSegment = segment.replace("?", "");
            basePath += "/" + optionalSegment;
            results.push(basePath);
          } else {
            basePath += "/" + segment;
          }
        }
      });
      return results.filter((v, i, a) => a.indexOf(v) === i);
    }, "checkOptionalParameter");
    _decodeURI = /* @__PURE__ */ __name((value) => {
      if (!/[%+]/.test(value)) {
        return value;
      }
      if (value.indexOf("+") !== -1) {
        value = value.replace(/\+/g, " ");
      }
      return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
    }, "_decodeURI");
    _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
      let encoded;
      if (!multiple && key && !/[%+]/.test(key)) {
        let keyIndex2 = url.indexOf("?", 8);
        if (keyIndex2 === -1) {
          return void 0;
        }
        if (!url.startsWith(key, keyIndex2 + 1)) {
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        while (keyIndex2 !== -1) {
          const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
          if (trailingKeyCode === 61) {
            const valueIndex = keyIndex2 + key.length + 2;
            const endIndex = url.indexOf("&", valueIndex);
            return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
          } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
            return "";
          }
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        encoded = /[%+]/.test(url);
        if (!encoded) {
          return void 0;
        }
      }
      const results = {};
      encoded ??= /[%+]/.test(url);
      let keyIndex = url.indexOf("?", 8);
      while (keyIndex !== -1) {
        const nextKeyIndex = url.indexOf("&", keyIndex + 1);
        let valueIndex = url.indexOf("=", keyIndex);
        if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
          valueIndex = -1;
        }
        let name = url.slice(
          keyIndex + 1,
          valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
        );
        if (encoded) {
          name = _decodeURI(name);
        }
        keyIndex = nextKeyIndex;
        if (name === "") {
          continue;
        }
        let value;
        if (valueIndex === -1) {
          value = "";
        } else {
          value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
          if (encoded) {
            value = _decodeURI(value);
          }
        }
        if (multiple) {
          if (!(results[name] && Array.isArray(results[name]))) {
            results[name] = [];
          }
          ;
          results[name].push(value);
        } else {
          results[name] ??= value;
        }
      }
      return key ? results[key] : results;
    }, "_getQueryParam");
    getQueryParam = _getQueryParam;
    getQueryParams = /* @__PURE__ */ __name((url, key) => {
      return _getQueryParam(url, key, true);
    }, "getQueryParams");
    decodeURIComponent_ = decodeURIComponent;
  }
});

// ../node_modules/hono/dist/request.js
var tryDecodeURIComponent, HonoRequest;
var init_request = __esm({
  "../node_modules/hono/dist/request.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_http_exception();
    init_constants();
    init_body();
    init_url();
    tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
    HonoRequest = class {
      static {
        __name(this, "HonoRequest");
      }
      /**
       * `.raw` can get the raw Request object.
       *
       * @see {@link https://hono.dev/docs/api/request#raw}
       *
       * @example
       * ```ts
       * // For Cloudflare Workers
       * app.post('/', async (c) => {
       *   const metadata = c.req.raw.cf?.hostMetadata?
       *   ...
       * })
       * ```
       */
      raw;
      #validatedData;
      // Short name of validatedData
      #matchResult;
      routeIndex = 0;
      /**
       * `.path` can get the pathname of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#path}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const pathname = c.req.path // `/about/me`
       * })
       * ```
       */
      path;
      bodyCache = {};
      constructor(request, path = "/", matchResult = [[]]) {
        this.raw = request;
        this.path = path;
        this.#matchResult = matchResult;
        this.#validatedData = {};
      }
      param(key) {
        return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
      }
      #getDecodedParam(key) {
        const paramKey = this.#matchResult[0][this.routeIndex][1][key];
        const param = this.#getParamValue(paramKey);
        return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
      }
      #getAllDecodedParams() {
        const decoded = {};
        const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
        for (const key of keys) {
          const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
          if (value !== void 0) {
            decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
          }
        }
        return decoded;
      }
      #getParamValue(paramKey) {
        return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
      }
      query(key) {
        return getQueryParam(this.url, key);
      }
      queries(key) {
        return getQueryParams(this.url, key);
      }
      header(name) {
        if (name) {
          return this.raw.headers.get(name) ?? void 0;
        }
        const headerData = {};
        this.raw.headers.forEach((value, key) => {
          headerData[key] = value;
        });
        return headerData;
      }
      async parseBody(options) {
        return this.bodyCache.parsedBody ??= await parseBody(this, options);
      }
      #cachedBody = /* @__PURE__ */ __name((key) => {
        const { bodyCache, raw: raw2 } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw2[key]();
      }, "#cachedBody");
      /**
       * `.json()` can parse Request body of type `application/json`
       *
       * @see {@link https://hono.dev/docs/api/request#json}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.json()
       * })
       * ```
       */
      json() {
        return this.#cachedBody("text").then((text) => JSON.parse(text));
      }
      /**
       * `.text()` can parse Request body of type `text/plain`
       *
       * @see {@link https://hono.dev/docs/api/request#text}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.text()
       * })
       * ```
       */
      text() {
        return this.#cachedBody("text");
      }
      /**
       * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
       *
       * @see {@link https://hono.dev/docs/api/request#arraybuffer}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.arrayBuffer()
       * })
       * ```
       */
      arrayBuffer() {
        return this.#cachedBody("arrayBuffer");
      }
      /**
       * Parses the request body as a `Blob`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.blob();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#blob
       */
      blob() {
        return this.#cachedBody("blob");
      }
      /**
       * Parses the request body as `FormData`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.formData();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#formdata
       */
      formData() {
        return this.#cachedBody("formData");
      }
      /**
       * Adds validated data to the request.
       *
       * @param target - The target of the validation.
       * @param data - The validated data to add.
       */
      addValidatedData(target, data) {
        this.#validatedData[target] = data;
      }
      valid(target) {
        return this.#validatedData[target];
      }
      /**
       * `.url()` can get the request url strings.
       *
       * @see {@link https://hono.dev/docs/api/request#url}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const url = c.req.url // `http://localhost:8787/about/me`
       *   ...
       * })
       * ```
       */
      get url() {
        return this.raw.url;
      }
      /**
       * `.method()` can get the method name of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#method}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const method = c.req.method // `GET`
       * })
       * ```
       */
      get method() {
        return this.raw.method;
      }
      get [GET_MATCH_RESULT]() {
        return this.#matchResult;
      }
      /**
       * `.matchedRoutes()` can return a matched route in the handler
       *
       * @deprecated
       *
       * Use matchedRoutes helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#matchedroutes}
       *
       * @example
       * ```ts
       * app.use('*', async function logger(c, next) {
       *   await next()
       *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
       *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
       *     console.log(
       *       method,
       *       ' ',
       *       path,
       *       ' '.repeat(Math.max(10 - path.length, 0)),
       *       name,
       *       i === c.req.routeIndex ? '<- respond from here' : ''
       *     )
       *   })
       * })
       * ```
       */
      get matchedRoutes() {
        return this.#matchResult[0].map(([[, route]]) => route);
      }
      /**
       * `routePath()` can retrieve the path registered within the handler
       *
       * @deprecated
       *
       * Use routePath helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#routepath}
       *
       * @example
       * ```ts
       * app.get('/posts/:id', (c) => {
       *   return c.json({ path: c.req.routePath })
       * })
       * ```
       */
      get routePath() {
        return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
      }
    };
  }
});

// ../node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase, raw, resolveCallback;
var init_html = __esm({
  "../node_modules/hono/dist/utils/html.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    HtmlEscapedCallbackPhase = {
      Stringify: 1,
      BeforeStream: 2,
      Stream: 3
    };
    raw = /* @__PURE__ */ __name((value, callbacks) => {
      const escapedString = new String(value);
      escapedString.isEscaped = true;
      escapedString.callbacks = callbacks;
      return escapedString;
    }, "raw");
    resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
      if (typeof str === "object" && !(str instanceof String)) {
        if (!(str instanceof Promise)) {
          str = str.toString();
        }
        if (str instanceof Promise) {
          str = await str;
        }
      }
      const callbacks = str.callbacks;
      if (!callbacks?.length) {
        return Promise.resolve(str);
      }
      if (buffer) {
        buffer[0] += str;
      } else {
        buffer = [str];
      }
      const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
        (res) => Promise.all(
          res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
        ).then(() => buffer[0])
      );
      if (preserveCallbacks) {
        return raw(await resStr, callbacks);
      } else {
        return resStr;
      }
    }, "resolveCallback");
  }
});

// ../node_modules/hono/dist/context.js
var TEXT_PLAIN, setDefaultContentType, createResponseInstance, Context;
var init_context = __esm({
  "../node_modules/hono/dist/context.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_request();
    init_html();
    TEXT_PLAIN = "text/plain; charset=UTF-8";
    setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
      return {
        "Content-Type": contentType,
        ...headers
      };
    }, "setDefaultContentType");
    createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
    Context = class {
      static {
        __name(this, "Context");
      }
      #rawRequest;
      #req;
      /**
       * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
       *
       * @see {@link https://hono.dev/docs/api/context#env}
       *
       * @example
       * ```ts
       * // Environment object for Cloudflare Workers
       * app.get('*', async c => {
       *   const counter = c.env.COUNTER
       * })
       * ```
       */
      env = {};
      #var;
      finalized = false;
      /**
       * `.error` can get the error object from the middleware if the Handler throws an error.
       *
       * @see {@link https://hono.dev/docs/api/context#error}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   await next()
       *   if (c.error) {
       *     // do something...
       *   }
       * })
       * ```
       */
      error;
      #status;
      #executionCtx;
      #res;
      #layout;
      #renderer;
      #notFoundHandler;
      #preparedHeaders;
      #matchResult;
      #path;
      /**
       * Creates an instance of the Context class.
       *
       * @param req - The Request object.
       * @param options - Optional configuration options for the context.
       */
      constructor(req, options) {
        this.#rawRequest = req;
        if (options) {
          this.#executionCtx = options.executionCtx;
          this.env = options.env;
          this.#notFoundHandler = options.notFoundHandler;
          this.#path = options.path;
          this.#matchResult = options.matchResult;
        }
      }
      /**
       * `.req` is the instance of {@link HonoRequest}.
       */
      get req() {
        this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
        return this.#req;
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#event}
       * The FetchEvent associated with the current request.
       *
       * @throws Will throw an error if the context does not have a FetchEvent.
       */
      get event() {
        if (this.#executionCtx && "respondWith" in this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no FetchEvent");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#executionctx}
       * The ExecutionContext associated with the current request.
       *
       * @throws Will throw an error if the context does not have an ExecutionContext.
       */
      get executionCtx() {
        if (this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no ExecutionContext");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#res}
       * The Response object for the current request.
       */
      get res() {
        return this.#res ||= createResponseInstance(null, {
          headers: this.#preparedHeaders ??= new Headers()
        });
      }
      /**
       * Sets the Response object for the current request.
       *
       * @param _res - The Response object to set.
       */
      set res(_res) {
        if (this.#res && _res) {
          _res = createResponseInstance(_res.body, _res);
          for (const [k, v] of this.#res.headers.entries()) {
            if (k === "content-type") {
              continue;
            }
            if (k === "set-cookie") {
              const cookies = this.#res.headers.getSetCookie();
              _res.headers.delete("set-cookie");
              for (const cookie of cookies) {
                _res.headers.append("set-cookie", cookie);
              }
            } else {
              _res.headers.set(k, v);
            }
          }
        }
        this.#res = _res;
        this.finalized = true;
      }
      /**
       * `.render()` can create a response within a layout.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   return c.render('Hello!')
       * })
       * ```
       */
      render = /* @__PURE__ */ __name((...args) => {
        this.#renderer ??= (content) => this.html(content);
        return this.#renderer(...args);
      }, "render");
      /**
       * Sets the layout for the response.
       *
       * @param layout - The layout to set.
       * @returns The layout function.
       */
      setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
      /**
       * Gets the current layout for the response.
       *
       * @returns The current layout function.
       */
      getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
      /**
       * `.setRenderer()` can set the layout in the custom middleware.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```tsx
       * app.use('*', async (c, next) => {
       *   c.setRenderer((content) => {
       *     return c.html(
       *       <html>
       *         <body>
       *           <p>{content}</p>
       *         </body>
       *       </html>
       *     )
       *   })
       *   await next()
       * })
       * ```
       */
      setRenderer = /* @__PURE__ */ __name((renderer) => {
        this.#renderer = renderer;
      }, "setRenderer");
      /**
       * `.header()` can set headers.
       *
       * @see {@link https://hono.dev/docs/api/context#header}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      header = /* @__PURE__ */ __name((name, value, options) => {
        if (this.finalized) {
          this.#res = createResponseInstance(this.#res.body, this.#res);
        }
        const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
        if (value === void 0) {
          headers.delete(name);
        } else if (options?.append) {
          headers.append(name, value);
        } else {
          headers.set(name, value);
        }
      }, "header");
      status = /* @__PURE__ */ __name((status) => {
        this.#status = status;
      }, "status");
      /**
       * `.set()` can set the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   c.set('message', 'Hono is hot!!')
       *   await next()
       * })
       * ```
       */
      set = /* @__PURE__ */ __name((key, value) => {
        this.#var ??= /* @__PURE__ */ new Map();
        this.#var.set(key, value);
      }, "set");
      /**
       * `.get()` can use the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   const message = c.get('message')
       *   return c.text(`The message is "${message}"`)
       * })
       * ```
       */
      get = /* @__PURE__ */ __name((key) => {
        return this.#var ? this.#var.get(key) : void 0;
      }, "get");
      /**
       * `.var` can access the value of a variable.
       *
       * @see {@link https://hono.dev/docs/api/context#var}
       *
       * @example
       * ```ts
       * const result = c.var.client.oneMethod()
       * ```
       */
      // c.var.propName is a read-only
      get var() {
        if (!this.#var) {
          return {};
        }
        return Object.fromEntries(this.#var);
      }
      #newResponse(data, arg, headers) {
        const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
        if (typeof arg === "object" && "headers" in arg) {
          const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
          for (const [key, value] of argHeaders) {
            if (key.toLowerCase() === "set-cookie") {
              responseHeaders.append(key, value);
            } else {
              responseHeaders.set(key, value);
            }
          }
        }
        if (headers) {
          for (const [k, v] of Object.entries(headers)) {
            if (typeof v === "string") {
              responseHeaders.set(k, v);
            } else {
              responseHeaders.delete(k);
              for (const v2 of v) {
                responseHeaders.append(k, v2);
              }
            }
          }
        }
        const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
        return createResponseInstance(data, { status, headers: responseHeaders });
      }
      newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
      /**
       * `.body()` can return the HTTP response.
       * You can set headers with `.header()` and set HTTP status code with `.status`.
       * This can also be set in `.text()`, `.json()` and so on.
       *
       * @see {@link https://hono.dev/docs/api/context#body}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *   // Set HTTP status code
       *   c.status(201)
       *
       *   // Return the response body
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
      /**
       * `.text()` can render text as `Content-Type:text/plain`.
       *
       * @see {@link https://hono.dev/docs/api/context#text}
       *
       * @example
       * ```ts
       * app.get('/say', (c) => {
       *   return c.text('Hello!')
       * })
       * ```
       */
      text = /* @__PURE__ */ __name((text, arg, headers) => {
        return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
          text,
          arg,
          setDefaultContentType(TEXT_PLAIN, headers)
        );
      }, "text");
      /**
       * `.json()` can render JSON as `Content-Type:application/json`.
       *
       * @see {@link https://hono.dev/docs/api/context#json}
       *
       * @example
       * ```ts
       * app.get('/api', (c) => {
       *   return c.json({ message: 'Hello!' })
       * })
       * ```
       */
      json = /* @__PURE__ */ __name((object, arg, headers) => {
        return this.#newResponse(
          JSON.stringify(object),
          arg,
          setDefaultContentType("application/json", headers)
        );
      }, "json");
      html = /* @__PURE__ */ __name((html, arg, headers) => {
        const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
        return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
      }, "html");
      /**
       * `.redirect()` can Redirect, default status code is 302.
       *
       * @see {@link https://hono.dev/docs/api/context#redirect}
       *
       * @example
       * ```ts
       * app.get('/redirect', (c) => {
       *   return c.redirect('/')
       * })
       * app.get('/redirect-permanently', (c) => {
       *   return c.redirect('/', 301)
       * })
       * ```
       */
      redirect = /* @__PURE__ */ __name((location, status) => {
        const locationString = String(location);
        this.header(
          "Location",
          // Multibyes should be encoded
          // eslint-disable-next-line no-control-regex
          !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
        );
        return this.newResponse(null, status ?? 302);
      }, "redirect");
      /**
       * `.notFound()` can return the Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/context#notfound}
       *
       * @example
       * ```ts
       * app.get('/notfound', (c) => {
       *   return c.notFound()
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name(() => {
        this.#notFoundHandler ??= () => createResponseInstance();
        return this.#notFoundHandler(this);
      }, "notFound");
    };
  }
});

// ../node_modules/hono/dist/router.js
var METHOD_NAME_ALL, METHOD_NAME_ALL_LOWERCASE, METHODS, MESSAGE_MATCHER_IS_ALREADY_BUILT, UnsupportedPathError;
var init_router = __esm({
  "../node_modules/hono/dist/router.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    METHOD_NAME_ALL = "ALL";
    METHOD_NAME_ALL_LOWERCASE = "all";
    METHODS = ["get", "post", "put", "delete", "options", "patch"];
    MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
    UnsupportedPathError = class extends Error {
      static {
        __name(this, "UnsupportedPathError");
      }
    };
  }
});

// ../node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER;
var init_constants2 = __esm({
  "../node_modules/hono/dist/utils/constants.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    COMPOSED_HANDLER = "__COMPOSED_HANDLER";
  }
});

// ../node_modules/hono/dist/hono-base.js
var notFoundHandler, errorHandler, Hono;
var init_hono_base = __esm({
  "../node_modules/hono/dist/hono-base.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_compose();
    init_context();
    init_router();
    init_constants2();
    init_url();
    notFoundHandler = /* @__PURE__ */ __name((c) => {
      return c.text("404 Not Found", 404);
    }, "notFoundHandler");
    errorHandler = /* @__PURE__ */ __name((err, c) => {
      if ("getResponse" in err) {
        const res = err.getResponse();
        return c.newResponse(res.body, res);
      }
      console.error(err);
      return c.text("Internal Server Error", 500);
    }, "errorHandler");
    Hono = class _Hono {
      static {
        __name(this, "_Hono");
      }
      get;
      post;
      put;
      delete;
      options;
      patch;
      all;
      on;
      use;
      /*
        This class is like an abstract class and does not have a router.
        To use it, inherit the class and implement router in the constructor.
      */
      router;
      getPath;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      _basePath = "/";
      #path = "/";
      routes = [];
      constructor(options = {}) {
        const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
        allMethods.forEach((method) => {
          this[method] = (args1, ...args) => {
            if (typeof args1 === "string") {
              this.#path = args1;
            } else {
              this.#addRoute(method, this.#path, args1);
            }
            args.forEach((handler) => {
              this.#addRoute(method, this.#path, handler);
            });
            return this;
          };
        });
        this.on = (method, path, ...handlers) => {
          for (const p of [path].flat()) {
            this.#path = p;
            for (const m of [method].flat()) {
              handlers.map((handler) => {
                this.#addRoute(m.toUpperCase(), this.#path, handler);
              });
            }
          }
          return this;
        };
        this.use = (arg1, ...handlers) => {
          if (typeof arg1 === "string") {
            this.#path = arg1;
          } else {
            this.#path = "*";
            handlers.unshift(arg1);
          }
          handlers.forEach((handler) => {
            this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
          });
          return this;
        };
        const { strict, ...optionsWithoutStrict } = options;
        Object.assign(this, optionsWithoutStrict);
        this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
      }
      #clone() {
        const clone = new _Hono({
          router: this.router,
          getPath: this.getPath
        });
        clone.errorHandler = this.errorHandler;
        clone.#notFoundHandler = this.#notFoundHandler;
        clone.routes = this.routes;
        return clone;
      }
      #notFoundHandler = notFoundHandler;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      errorHandler = errorHandler;
      /**
       * `.route()` allows grouping other Hono instance in routes.
       *
       * @see {@link https://hono.dev/docs/api/routing#grouping}
       *
       * @param {string} path - base Path
       * @param {Hono} app - other Hono instance
       * @returns {Hono} routed Hono instance
       *
       * @example
       * ```ts
       * const app = new Hono()
       * const app2 = new Hono()
       *
       * app2.get("/user", (c) => c.text("user"))
       * app.route("/api", app2) // GET /api/user
       * ```
       */
      route(path, app2) {
        const subApp = this.basePath(path);
        app2.routes.map((r) => {
          let handler;
          if (app2.errorHandler === errorHandler) {
            handler = r.handler;
          } else {
            handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
            handler[COMPOSED_HANDLER] = r.handler;
          }
          subApp.#addRoute(r.method, r.path, handler);
        });
        return this;
      }
      /**
       * `.basePath()` allows base paths to be specified.
       *
       * @see {@link https://hono.dev/docs/api/routing#base-path}
       *
       * @param {string} path - base Path
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * const api = new Hono().basePath('/api')
       * ```
       */
      basePath(path) {
        const subApp = this.#clone();
        subApp._basePath = mergePath(this._basePath, path);
        return subApp;
      }
      /**
       * `.onError()` handles an error and returns a customized Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#error-handling}
       *
       * @param {ErrorHandler} handler - request Handler for error
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.onError((err, c) => {
       *   console.error(`${err}`)
       *   return c.text('Custom Error Message', 500)
       * })
       * ```
       */
      onError = /* @__PURE__ */ __name((handler) => {
        this.errorHandler = handler;
        return this;
      }, "onError");
      /**
       * `.notFound()` allows you to customize a Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#not-found}
       *
       * @param {NotFoundHandler} handler - request handler for not-found
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.notFound((c) => {
       *   return c.text('Custom 404 Message', 404)
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name((handler) => {
        this.#notFoundHandler = handler;
        return this;
      }, "notFound");
      /**
       * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
       *
       * @see {@link https://hono.dev/docs/api/hono#mount}
       *
       * @param {string} path - base Path
       * @param {Function} applicationHandler - other Request Handler
       * @param {MountOptions} [options] - options of `.mount()`
       * @returns {Hono} mounted Hono instance
       *
       * @example
       * ```ts
       * import { Router as IttyRouter } from 'itty-router'
       * import { Hono } from 'hono'
       * // Create itty-router application
       * const ittyRouter = IttyRouter()
       * // GET /itty-router/hello
       * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
       *
       * const app = new Hono()
       * app.mount('/itty-router', ittyRouter.handle)
       * ```
       *
       * @example
       * ```ts
       * const app = new Hono()
       * // Send the request to another application without modification.
       * app.mount('/app', anotherApp, {
       *   replaceRequest: (req) => req,
       * })
       * ```
       */
      mount(path, applicationHandler, options) {
        let replaceRequest;
        let optionHandler;
        if (options) {
          if (typeof options === "function") {
            optionHandler = options;
          } else {
            optionHandler = options.optionHandler;
            if (options.replaceRequest === false) {
              replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
            } else {
              replaceRequest = options.replaceRequest;
            }
          }
        }
        const getOptions = optionHandler ? (c) => {
          const options2 = optionHandler(c);
          return Array.isArray(options2) ? options2 : [options2];
        } : (c) => {
          let executionContext = void 0;
          try {
            executionContext = c.executionCtx;
          } catch {
          }
          return [c.env, executionContext];
        };
        replaceRequest ||= (() => {
          const mergedPath = mergePath(this._basePath, path);
          const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
          return (request) => {
            const url = new URL(request.url);
            url.pathname = url.pathname.slice(pathPrefixLength) || "/";
            return new Request(url, request);
          };
        })();
        const handler = /* @__PURE__ */ __name(async (c, next) => {
          const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
          if (res) {
            return res;
          }
          await next();
        }, "handler");
        this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
        return this;
      }
      #addRoute(method, path, handler) {
        method = method.toUpperCase();
        path = mergePath(this._basePath, path);
        const r = { basePath: this._basePath, path, method, handler };
        this.router.add(method, path, [handler, r]);
        this.routes.push(r);
      }
      #handleError(err, c) {
        if (err instanceof Error) {
          return this.errorHandler(err, c);
        }
        throw err;
      }
      #dispatch(request, executionCtx, env, method) {
        if (method === "HEAD") {
          return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
        }
        const path = this.getPath(request, { env });
        const matchResult = this.router.match(method, path);
        const c = new Context(request, {
          path,
          matchResult,
          env,
          executionCtx,
          notFoundHandler: this.#notFoundHandler
        });
        if (matchResult[0].length === 1) {
          let res;
          try {
            res = matchResult[0][0][0][0](c, async () => {
              c.res = await this.#notFoundHandler(c);
            });
          } catch (err) {
            return this.#handleError(err, c);
          }
          return res instanceof Promise ? res.then(
            (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
          ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
        }
        const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
        return (async () => {
          try {
            const context = await composed(c);
            if (!context.finalized) {
              throw new Error(
                "Context is not finalized. Did you forget to return a Response object or `await next()`?"
              );
            }
            return context.res;
          } catch (err) {
            return this.#handleError(err, c);
          }
        })();
      }
      /**
       * `.fetch()` will be entry point of your app.
       *
       * @see {@link https://hono.dev/docs/api/hono#fetch}
       *
       * @param {Request} request - request Object of request
       * @param {Env} Env - env Object
       * @param {ExecutionContext} - context of execution
       * @returns {Response | Promise<Response>} response of request
       *
       */
      fetch = /* @__PURE__ */ __name((request, ...rest) => {
        return this.#dispatch(request, rest[1], rest[0], request.method);
      }, "fetch");
      /**
       * `.request()` is a useful method for testing.
       * You can pass a URL or pathname to send a GET request.
       * app will return a Response object.
       * ```ts
       * test('GET /hello is ok', async () => {
       *   const res = await app.request('/hello')
       *   expect(res.status).toBe(200)
       * })
       * ```
       * @see https://hono.dev/docs/api/hono#request
       */
      request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
        }
        input = input.toString();
        return this.fetch(
          new Request(
            /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
            requestInit
          ),
          Env,
          executionCtx
        );
      }, "request");
      /**
       * `.fire()` automatically adds a global fetch event listener.
       * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
       * @deprecated
       * Use `fire` from `hono/service-worker` instead.
       * ```ts
       * import { Hono } from 'hono'
       * import { fire } from 'hono/service-worker'
       *
       * const app = new Hono()
       * // ...
       * fire(app)
       * ```
       * @see https://hono.dev/docs/api/hono#fire
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
       * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
       */
      fire = /* @__PURE__ */ __name(() => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
        });
      }, "fire");
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/matcher.js
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match22 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match22;
  return match22(method, path);
}
var emptyParam;
var init_matcher = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/matcher.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router();
    emptyParam = [];
    __name(match, "match");
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/node.js
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var LABEL_REG_EXP_STR, ONLY_WILDCARD_REG_EXP_STR, TAIL_WILDCARD_REG_EXP_STR, PATH_ERROR, regExpMetaChars, Node;
var init_node = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/node.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    LABEL_REG_EXP_STR = "[^/]+";
    ONLY_WILDCARD_REG_EXP_STR = ".*";
    TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
    PATH_ERROR = /* @__PURE__ */ Symbol();
    regExpMetaChars = new Set(".\\+*[^]$()");
    __name(compareKey, "compareKey");
    Node = class _Node {
      static {
        __name(this, "_Node");
      }
      #index;
      #varIndex;
      #children = /* @__PURE__ */ Object.create(null);
      insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
        if (tokens.length === 0) {
          if (this.#index !== void 0) {
            throw PATH_ERROR;
          }
          if (pathErrorCheckOnly) {
            return;
          }
          this.#index = index;
          return;
        }
        const [token, ...restTokens] = tokens;
        const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
        let node;
        if (pattern) {
          const name = pattern[1];
          let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
          if (name && pattern[2]) {
            if (regexpStr === ".*") {
              throw PATH_ERROR;
            }
            regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
            if (/\((?!\?:)/.test(regexpStr)) {
              throw PATH_ERROR;
            }
          }
          node = this.#children[regexpStr];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[regexpStr] = new _Node();
            if (name !== "") {
              node.#varIndex = context.varIndex++;
            }
          }
          if (!pathErrorCheckOnly && name !== "") {
            paramMap.push([name, node.#varIndex]);
          }
        } else {
          node = this.#children[token];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[token] = new _Node();
          }
        }
        node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
      }
      buildRegExpStr() {
        const childKeys = Object.keys(this.#children).sort(compareKey);
        const strList = childKeys.map((k) => {
          const c = this.#children[k];
          return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
        });
        if (typeof this.#index === "number") {
          strList.unshift(`#${this.#index}`);
        }
        if (strList.length === 0) {
          return "";
        }
        if (strList.length === 1) {
          return strList[0];
        }
        return "(?:" + strList.join("|") + ")";
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie;
var init_trie = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/trie.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_node();
    Trie = class {
      static {
        __name(this, "Trie");
      }
      #context = { varIndex: 0 };
      #root = new Node();
      insert(path, index, pathErrorCheckOnly) {
        const paramAssoc = [];
        const groups = [];
        for (let i = 0; ; ) {
          let replaced = false;
          path = path.replace(/\{[^}]+\}/g, (m) => {
            const mark = `@\\${i}`;
            groups[i] = [mark, m];
            i++;
            replaced = true;
            return mark;
          });
          if (!replaced) {
            break;
          }
        }
        const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
        for (let i = groups.length - 1; i >= 0; i--) {
          const [mark] = groups[i];
          for (let j = tokens.length - 1; j >= 0; j--) {
            if (tokens[j].indexOf(mark) !== -1) {
              tokens[j] = tokens[j].replace(mark, groups[i][1]);
              break;
            }
          }
        }
        this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
        return paramAssoc;
      }
      buildRegExp() {
        let regexp = this.#root.buildRegExpStr();
        if (regexp === "") {
          return [/^$/, [], []];
        }
        let captureIndex = 0;
        const indexReplacementMap = [];
        const paramReplacementMap = [];
        regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
          if (handlerIndex !== void 0) {
            indexReplacementMap[++captureIndex] = Number(handlerIndex);
            return "$()";
          }
          if (paramIndex !== void 0) {
            paramReplacementMap[Number(paramIndex)] = ++captureIndex;
            return "";
          }
          return "";
        });
        return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/router.js
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes2) {
  const trie = new Trie();
  const handlerData = [];
  if (routes2.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes2.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var nullMatcher, wildcardRegExpCache, RegExpRouter;
var init_router2 = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/router.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router();
    init_url();
    init_matcher();
    init_node();
    init_trie();
    nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
    wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
    __name(buildWildcardRegExp, "buildWildcardRegExp");
    __name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
    __name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
    __name(findMiddleware, "findMiddleware");
    RegExpRouter = class {
      static {
        __name(this, "RegExpRouter");
      }
      name = "RegExpRouter";
      #middleware;
      #routes;
      constructor() {
        this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
        this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
      }
      add(method, path, handler) {
        const middleware = this.#middleware;
        const routes2 = this.#routes;
        if (!middleware || !routes2) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        if (!middleware[method]) {
          ;
          [middleware, routes2].forEach((handlerMap) => {
            handlerMap[method] = /* @__PURE__ */ Object.create(null);
            Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
              handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
            });
          });
        }
        if (path === "/*") {
          path = "*";
        }
        const paramCount = (path.match(/\/:/g) || []).length;
        if (/\*$/.test(path)) {
          const re = buildWildcardRegExp(path);
          if (method === METHOD_NAME_ALL) {
            Object.keys(middleware).forEach((m) => {
              middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
            });
          } else {
            middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
          }
          Object.keys(middleware).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              Object.keys(middleware[m]).forEach((p) => {
                re.test(p) && middleware[m][p].push([handler, paramCount]);
              });
            }
          });
          Object.keys(routes2).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              Object.keys(routes2[m]).forEach(
                (p) => re.test(p) && routes2[m][p].push([handler, paramCount])
              );
            }
          });
          return;
        }
        const paths = checkOptionalParameter(path) || [path];
        for (let i = 0, len = paths.length; i < len; i++) {
          const path2 = paths[i];
          Object.keys(routes2).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              routes2[m][path2] ||= [
                ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
              ];
              routes2[m][path2].push([handler, paramCount - len + i + 1]);
            }
          });
        }
      }
      match = match;
      buildAllMatchers() {
        const matchers = /* @__PURE__ */ Object.create(null);
        Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
          matchers[method] ||= this.#buildMatcher(method);
        });
        this.#middleware = this.#routes = void 0;
        clearWildcardRegExpCache();
        return matchers;
      }
      #buildMatcher(method) {
        const routes2 = [];
        let hasOwnRoute = method === METHOD_NAME_ALL;
        [this.#middleware, this.#routes].forEach((r) => {
          const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
          if (ownRoute.length !== 0) {
            hasOwnRoute ||= true;
            routes2.push(...ownRoute);
          } else if (method !== METHOD_NAME_ALL) {
            routes2.push(
              ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
            );
          }
        });
        if (!hasOwnRoute) {
          return null;
        } else {
          return buildMatcherFromPreprocessedRoutes(routes2);
        }
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var init_prepared_router = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/prepared-router.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router();
    init_matcher();
    init_router2();
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/index.js
var init_reg_exp_router = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router2();
    init_prepared_router();
  }
});

// ../node_modules/hono/dist/router/smart-router/router.js
var SmartRouter;
var init_router3 = __esm({
  "../node_modules/hono/dist/router/smart-router/router.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router();
    SmartRouter = class {
      static {
        __name(this, "SmartRouter");
      }
      name = "SmartRouter";
      #routers = [];
      #routes = [];
      constructor(init) {
        this.#routers = init.routers;
      }
      add(method, path, handler) {
        if (!this.#routes) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        this.#routes.push([method, path, handler]);
      }
      match(method, path) {
        if (!this.#routes) {
          throw new Error("Fatal error");
        }
        const routers = this.#routers;
        const routes2 = this.#routes;
        const len = routers.length;
        let i = 0;
        let res;
        for (; i < len; i++) {
          const router = routers[i];
          try {
            for (let i2 = 0, len2 = routes2.length; i2 < len2; i2++) {
              router.add(...routes2[i2]);
            }
            res = router.match(method, path);
          } catch (e) {
            if (e instanceof UnsupportedPathError) {
              continue;
            }
            throw e;
          }
          this.match = router.match.bind(router);
          this.#routers = [router];
          this.#routes = void 0;
          break;
        }
        if (i === len) {
          throw new Error("Fatal error");
        }
        this.name = `SmartRouter + ${this.activeRouter.name}`;
        return res;
      }
      get activeRouter() {
        if (this.#routes || this.#routers.length !== 1) {
          throw new Error("No active router has been determined yet.");
        }
        return this.#routers[0];
      }
    };
  }
});

// ../node_modules/hono/dist/router/smart-router/index.js
var init_smart_router = __esm({
  "../node_modules/hono/dist/router/smart-router/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router3();
  }
});

// ../node_modules/hono/dist/router/trie-router/node.js
var emptyParams, hasChildren, Node2;
var init_node2 = __esm({
  "../node_modules/hono/dist/router/trie-router/node.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router();
    init_url();
    emptyParams = /* @__PURE__ */ Object.create(null);
    hasChildren = /* @__PURE__ */ __name((children) => {
      for (const _ in children) {
        return true;
      }
      return false;
    }, "hasChildren");
    Node2 = class _Node2 {
      static {
        __name(this, "_Node");
      }
      #methods;
      #children;
      #patterns;
      #order = 0;
      #params = emptyParams;
      constructor(method, handler, children) {
        this.#children = children || /* @__PURE__ */ Object.create(null);
        this.#methods = [];
        if (method && handler) {
          const m = /* @__PURE__ */ Object.create(null);
          m[method] = { handler, possibleKeys: [], score: 0 };
          this.#methods = [m];
        }
        this.#patterns = [];
      }
      insert(method, path, handler) {
        this.#order = ++this.#order;
        let curNode = this;
        const parts = splitRoutingPath(path);
        const possibleKeys = [];
        for (let i = 0, len = parts.length; i < len; i++) {
          const p = parts[i];
          const nextP = parts[i + 1];
          const pattern = getPattern(p, nextP);
          const key = Array.isArray(pattern) ? pattern[0] : p;
          if (key in curNode.#children) {
            curNode = curNode.#children[key];
            if (pattern) {
              possibleKeys.push(pattern[1]);
            }
            continue;
          }
          curNode.#children[key] = new _Node2();
          if (pattern) {
            curNode.#patterns.push(pattern);
            possibleKeys.push(pattern[1]);
          }
          curNode = curNode.#children[key];
        }
        curNode.#methods.push({
          [method]: {
            handler,
            possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
            score: this.#order
          }
        });
        return curNode;
      }
      #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
        for (let i = 0, len = node.#methods.length; i < len; i++) {
          const m = node.#methods[i];
          const handlerSet = m[method] || m[METHOD_NAME_ALL];
          const processedSet = {};
          if (handlerSet !== void 0) {
            handlerSet.params = /* @__PURE__ */ Object.create(null);
            handlerSets.push(handlerSet);
            if (nodeParams !== emptyParams || params && params !== emptyParams) {
              for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
                const key = handlerSet.possibleKeys[i2];
                const processed = processedSet[handlerSet.score];
                handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
                processedSet[handlerSet.score] = true;
              }
            }
          }
        }
      }
      search(method, path) {
        const handlerSets = [];
        this.#params = emptyParams;
        const curNode = this;
        let curNodes = [curNode];
        const parts = splitPath(path);
        const curNodesQueue = [];
        const len = parts.length;
        let partOffsets = null;
        for (let i = 0; i < len; i++) {
          const part = parts[i];
          const isLast = i === len - 1;
          const tempNodes = [];
          for (let j = 0, len2 = curNodes.length; j < len2; j++) {
            const node = curNodes[j];
            const nextNode = node.#children[part];
            if (nextNode) {
              nextNode.#params = node.#params;
              if (isLast) {
                if (nextNode.#children["*"]) {
                  this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
                }
                this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
              } else {
                tempNodes.push(nextNode);
              }
            }
            for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
              const pattern = node.#patterns[k];
              const params = node.#params === emptyParams ? {} : { ...node.#params };
              if (pattern === "*") {
                const astNode = node.#children["*"];
                if (astNode) {
                  this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
                  astNode.#params = params;
                  tempNodes.push(astNode);
                }
                continue;
              }
              const [key, name, matcher] = pattern;
              if (!part && !(matcher instanceof RegExp)) {
                continue;
              }
              const child = node.#children[key];
              if (matcher instanceof RegExp) {
                if (partOffsets === null) {
                  partOffsets = new Array(len);
                  let offset = path[0] === "/" ? 1 : 0;
                  for (let p = 0; p < len; p++) {
                    partOffsets[p] = offset;
                    offset += parts[p].length + 1;
                  }
                }
                const restPathString = path.substring(partOffsets[i]);
                const m = matcher.exec(restPathString);
                if (m) {
                  params[name] = m[0];
                  this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
                  if (hasChildren(child.#children)) {
                    child.#params = params;
                    const componentCount = m[0].match(/\//)?.length ?? 0;
                    const targetCurNodes = curNodesQueue[componentCount] ||= [];
                    targetCurNodes.push(child);
                  }
                  continue;
                }
              }
              if (matcher === true || matcher.test(part)) {
                params[name] = part;
                if (isLast) {
                  this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
                  if (child.#children["*"]) {
                    this.#pushHandlerSets(
                      handlerSets,
                      child.#children["*"],
                      method,
                      params,
                      node.#params
                    );
                  }
                } else {
                  child.#params = params;
                  tempNodes.push(child);
                }
              }
            }
          }
          const shifted = curNodesQueue.shift();
          curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
        }
        if (handlerSets.length > 1) {
          handlerSets.sort((a, b) => {
            return a.score - b.score;
          });
        }
        return [handlerSets.map(({ handler, params }) => [handler, params])];
      }
    };
  }
});

// ../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter;
var init_router4 = __esm({
  "../node_modules/hono/dist/router/trie-router/router.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_url();
    init_node2();
    TrieRouter = class {
      static {
        __name(this, "TrieRouter");
      }
      name = "TrieRouter";
      #node;
      constructor() {
        this.#node = new Node2();
      }
      add(method, path, handler) {
        const results = checkOptionalParameter(path);
        if (results) {
          for (let i = 0, len = results.length; i < len; i++) {
            this.#node.insert(method, results[i], handler);
          }
          return;
        }
        this.#node.insert(method, path, handler);
      }
      match(method, path) {
        return this.#node.search(method, path);
      }
    };
  }
});

// ../node_modules/hono/dist/router/trie-router/index.js
var init_trie_router = __esm({
  "../node_modules/hono/dist/router/trie-router/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_router4();
  }
});

// ../node_modules/hono/dist/hono.js
var Hono2;
var init_hono = __esm({
  "../node_modules/hono/dist/hono.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_hono_base();
    init_reg_exp_router();
    init_smart_router();
    init_trie_router();
    Hono2 = class extends Hono {
      static {
        __name(this, "Hono");
      }
      /**
       * Creates an instance of the Hono class.
       *
       * @param options - Optional configuration options for the Hono instance.
       */
      constructor(options = {}) {
        super(options);
        this.router = options.router ?? new SmartRouter({
          routers: [new RegExpRouter(), new TrieRouter()]
        });
      }
    };
  }
});

// ../node_modules/hono/dist/index.js
var init_dist = __esm({
  "../node_modules/hono/dist/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_hono();
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/handler.js
var handle;
var init_handler = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/handler.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_context();
    init_http_exception();
    handle = /* @__PURE__ */ __name((app2) => (eventContext) => {
      return app2.fetch(
        eventContext.request,
        { ...eventContext.env, eventContext },
        {
          waitUntil: eventContext.waitUntil,
          passThroughOnException: eventContext.passThroughOnException,
          props: {}
        }
      );
    }, "handle");
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/conninfo.js
var init_conninfo = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/conninfo.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/index.js
var init_cloudflare_pages = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_handler();
    init_conninfo();
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
  }
});

// ../node_modules/bcryptjs/index.js
function randomBytes(len) {
  try {
    return crypto.getRandomValues(new Uint8Array(len));
  } catch {
  }
  try {
    return import_crypto.default.randomBytes(len);
  } catch {
  }
  if (!randomFallback) {
    throw Error(
      "Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative"
    );
  }
  return randomFallback(len);
}
function setRandomFallback(random) {
  randomFallback = random;
}
function genSaltSync(rounds, seed_length) {
  rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof rounds !== "number")
    throw Error(
      "Illegal arguments: " + typeof rounds + ", " + typeof seed_length
    );
  if (rounds < 4) rounds = 4;
  else if (rounds > 31) rounds = 31;
  var salt = [];
  salt.push("$2b$");
  if (rounds < 10) salt.push("0");
  salt.push(rounds.toString());
  salt.push("$");
  salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
  return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
  if (typeof seed_length === "function")
    callback = seed_length, seed_length = void 0;
  if (typeof rounds === "function") callback = rounds, rounds = void 0;
  if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
  else if (typeof rounds !== "number")
    throw Error("illegal arguments: " + typeof rounds);
  function _async(callback2) {
    nextTick(function() {
      try {
        callback2(null, genSaltSync(rounds));
      } catch (err) {
        callback2(err);
      }
    });
  }
  __name(_async, "_async");
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}
function hashSync(password, salt) {
  if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof salt === "number") salt = genSaltSync(salt);
  if (typeof password !== "string" || typeof salt !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
  return _hash(password, salt);
}
function hash(password, salt, callback, progressCallback) {
  function _async(callback2) {
    if (typeof password === "string" && typeof salt === "number")
      genSalt(salt, function(err, salt2) {
        _hash(password, salt2, callback2, progressCallback);
      });
    else if (typeof password === "string" && typeof salt === "string")
      _hash(password, salt, callback2, progressCallback);
    else
      nextTick(
        callback2.bind(
          this,
          Error("Illegal arguments: " + typeof password + ", " + typeof salt)
        )
      );
  }
  __name(_async, "_async");
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}
function safeStringCompare(known, unknown) {
  var diff = known.length ^ unknown.length;
  for (var i = 0; i < known.length; ++i) {
    diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
  }
  return diff === 0;
}
function compareSync(password, hash2) {
  if (typeof password !== "string" || typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof hash2);
  if (hash2.length !== 60) return false;
  return safeStringCompare(
    hashSync(password, hash2.substring(0, hash2.length - 31)),
    hash2
  );
}
function compare(password, hashValue, callback, progressCallback) {
  function _async(callback2) {
    if (typeof password !== "string" || typeof hashValue !== "string") {
      nextTick(
        callback2.bind(
          this,
          Error(
            "Illegal arguments: " + typeof password + ", " + typeof hashValue
          )
        )
      );
      return;
    }
    if (hashValue.length !== 60) {
      nextTick(callback2.bind(this, null, false));
      return;
    }
    hash(
      password,
      hashValue.substring(0, 29),
      function(err, comp) {
        if (err) callback2(err);
        else callback2(null, safeStringCompare(comp, hashValue));
      },
      progressCallback
    );
  }
  __name(_async, "_async");
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}
function getRounds(hash2) {
  if (typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof hash2);
  return parseInt(hash2.split("$")[2], 10);
}
function getSalt(hash2) {
  if (typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof hash2);
  if (hash2.length !== 60)
    throw Error("Illegal hash length: " + hash2.length + " != 60");
  return hash2.substring(0, 29);
}
function truncates(password) {
  if (typeof password !== "string")
    throw Error("Illegal arguments: " + typeof password);
  return utf8Length(password) > 72;
}
function utf8Length(string) {
  var len = 0, c = 0;
  for (var i = 0; i < string.length; ++i) {
    c = string.charCodeAt(i);
    if (c < 128) len += 1;
    else if (c < 2048) len += 2;
    else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
      ++i;
      len += 4;
    } else len += 3;
  }
  return len;
}
function utf8Array(string) {
  var offset = 0, c1, c2;
  var buffer = new Array(utf8Length(string));
  for (var i = 0, k = string.length; i < k; ++i) {
    c1 = string.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
      c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
      ++i;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return buffer;
}
function base64_encode(b, len) {
  var off = 0, rs = [], c1, c2;
  if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
  while (off < len) {
    c1 = b[off++] & 255;
    rs.push(BASE64_CODE[c1 >> 2 & 63]);
    c1 = (c1 & 3) << 4;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c2 = b[off++] & 255;
    c1 |= c2 >> 4 & 15;
    rs.push(BASE64_CODE[c1 & 63]);
    c1 = (c2 & 15) << 2;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c2 = b[off++] & 255;
    c1 |= c2 >> 6 & 3;
    rs.push(BASE64_CODE[c1 & 63]);
    rs.push(BASE64_CODE[c2 & 63]);
  }
  return rs.join("");
}
function base64_decode(s, len) {
  var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
  if (len <= 0) throw Error("Illegal len: " + len);
  while (off < slen - 1 && olen < len) {
    code = s.charCodeAt(off++);
    c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s.charCodeAt(off++);
    c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c2 == -1) break;
    o = c1 << 2 >>> 0;
    o |= (c2 & 48) >> 4;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c3 == -1) break;
    o = (c2 & 15) << 4 >>> 0;
    o |= (c3 & 60) >> 2;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o = (c3 & 3) << 6 >>> 0;
    o |= c4;
    rs.push(String.fromCharCode(o));
    ++olen;
  }
  var res = [];
  for (off = 0; off < olen; off++) res.push(rs[off].charCodeAt(0));
  return res;
}
function _encipher(lr, off, P, S) {
  var n, l = lr[off], r = lr[off + 1];
  l ^= P[0];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[1];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[2];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[3];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[4];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[5];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[6];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[7];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[8];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[9];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[10];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[11];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[12];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[13];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[14];
  n = S[l >>> 24];
  n += S[256 | l >> 16 & 255];
  n ^= S[512 | l >> 8 & 255];
  n += S[768 | l & 255];
  r ^= n ^ P[15];
  n = S[r >>> 24];
  n += S[256 | r >> 16 & 255];
  n ^= S[512 | r >> 8 & 255];
  n += S[768 | r & 255];
  l ^= n ^ P[16];
  lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
  lr[off + 1] = l;
  return lr;
}
function _streamtoword(data, offp) {
  for (var i = 0, word = 0; i < 4; ++i)
    word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
  return { key: word, offp };
}
function _key(key, P, S) {
  var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
  for (i = 0; i < plen; i += 2)
    lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
  for (i = 0; i < slen; i += 2)
    lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
function _ekskey(data, key, P, S) {
  var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
  offp = 0;
  for (i = 0; i < plen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
  for (i = 0; i < slen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
function _crypt(b, salt, rounds, callback, progressCallback) {
  var cdata = C_ORIG.slice(), clen = cdata.length, err;
  if (rounds < 4 || rounds > 31) {
    err = Error("Illegal number of rounds (4-31): " + rounds);
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.length !== BCRYPT_SALT_LEN) {
    err = Error(
      "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN
    );
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  rounds = 1 << rounds >>> 0;
  var P, S, i = 0, j;
  if (typeof Int32Array === "function") {
    P = new Int32Array(P_ORIG);
    S = new Int32Array(S_ORIG);
  } else {
    P = P_ORIG.slice();
    S = S_ORIG.slice();
  }
  _ekskey(salt, b, P, S);
  function next() {
    if (progressCallback) progressCallback(i / rounds);
    if (i < rounds) {
      var start = Date.now();
      for (; i < rounds; ) {
        i = i + 1;
        _key(b, P, S);
        _key(salt, P, S);
        if (Date.now() - start > MAX_EXECUTION_TIME) break;
      }
    } else {
      for (i = 0; i < 64; i++)
        for (j = 0; j < clen >> 1; j++) _encipher(cdata, j << 1, P, S);
      var ret = [];
      for (i = 0; i < clen; i++)
        ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
      if (callback) {
        callback(null, ret);
        return;
      } else return ret;
    }
    if (callback) nextTick(next);
  }
  __name(next, "next");
  if (typeof callback !== "undefined") {
    next();
  } else {
    var res;
    while (true) if (typeof (res = next()) !== "undefined") return res || [];
  }
}
function _hash(password, salt, callback, progressCallback) {
  var err;
  if (typeof password !== "string" || typeof salt !== "string") {
    err = Error("Invalid string / salt: Not a string");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  var minor, offset;
  if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
    err = Error("Invalid salt version: " + salt.substring(0, 2));
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
  else {
    minor = salt.charAt(2);
    if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
      err = Error("Invalid salt revision: " + salt.substring(2, 4));
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    offset = 4;
  }
  if (salt.charAt(offset + 2) > "$") {
    err = Error("Missing salt rounds");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
  password += minor >= "a" ? "\0" : "";
  var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
  function finish(bytes) {
    var res = [];
    res.push("$2");
    if (minor >= "a") res.push(minor);
    res.push("$");
    if (rounds < 10) res.push("0");
    res.push(rounds.toString());
    res.push("$");
    res.push(base64_encode(saltb, saltb.length));
    res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
    return res.join("");
  }
  __name(finish, "finish");
  if (typeof callback == "undefined")
    return finish(_crypt(passwordb, saltb, rounds));
  else {
    _crypt(
      passwordb,
      saltb,
      rounds,
      function(err2, bytes) {
        if (err2) callback(err2, null);
        else callback(null, finish(bytes));
      },
      progressCallback
    );
  }
}
function encodeBase64(bytes, length) {
  return base64_encode(bytes, length);
}
function decodeBase64(string, length) {
  return base64_decode(string, length);
}
var import_crypto, randomFallback, nextTick, BASE64_CODE, BASE64_INDEX, BCRYPT_SALT_LEN, GENSALT_DEFAULT_LOG2_ROUNDS, BLOWFISH_NUM_ROUNDS, MAX_EXECUTION_TIME, P_ORIG, S_ORIG, C_ORIG, bcryptjs_default;
var init_bcryptjs = __esm({
  "../node_modules/bcryptjs/index.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    import_crypto = __toESM(require_crypto(), 1);
    randomFallback = null;
    __name(randomBytes, "randomBytes");
    __name(setRandomFallback, "setRandomFallback");
    __name(genSaltSync, "genSaltSync");
    __name(genSalt, "genSalt");
    __name(hashSync, "hashSync");
    __name(hash, "hash");
    __name(safeStringCompare, "safeStringCompare");
    __name(compareSync, "compareSync");
    __name(compare, "compare");
    __name(getRounds, "getRounds");
    __name(getSalt, "getSalt");
    __name(truncates, "truncates");
    nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
    __name(utf8Length, "utf8Length");
    __name(utf8Array, "utf8Array");
    BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
    BASE64_INDEX = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    __name(base64_encode, "base64_encode");
    __name(base64_decode, "base64_decode");
    BCRYPT_SALT_LEN = 16;
    GENSALT_DEFAULT_LOG2_ROUNDS = 10;
    BLOWFISH_NUM_ROUNDS = 16;
    MAX_EXECUTION_TIME = 100;
    P_ORIG = [
      608135816,
      2242054355,
      320440878,
      57701188,
      2752067618,
      698298832,
      137296536,
      3964562569,
      1160258022,
      953160567,
      3193202383,
      887688300,
      3232508343,
      3380367581,
      1065670069,
      3041331479,
      2450970073,
      2306472731
    ];
    S_ORIG = [
      3509652390,
      2564797868,
      805139163,
      3491422135,
      3101798381,
      1780907670,
      3128725573,
      4046225305,
      614570311,
      3012652279,
      134345442,
      2240740374,
      1667834072,
      1901547113,
      2757295779,
      4103290238,
      227898511,
      1921955416,
      1904987480,
      2182433518,
      2069144605,
      3260701109,
      2620446009,
      720527379,
      3318853667,
      677414384,
      3393288472,
      3101374703,
      2390351024,
      1614419982,
      1822297739,
      2954791486,
      3608508353,
      3174124327,
      2024746970,
      1432378464,
      3864339955,
      2857741204,
      1464375394,
      1676153920,
      1439316330,
      715854006,
      3033291828,
      289532110,
      2706671279,
      2087905683,
      3018724369,
      1668267050,
      732546397,
      1947742710,
      3462151702,
      2609353502,
      2950085171,
      1814351708,
      2050118529,
      680887927,
      999245976,
      1800124847,
      3300911131,
      1713906067,
      1641548236,
      4213287313,
      1216130144,
      1575780402,
      4018429277,
      3917837745,
      3693486850,
      3949271944,
      596196993,
      3549867205,
      258830323,
      2213823033,
      772490370,
      2760122372,
      1774776394,
      2652871518,
      566650946,
      4142492826,
      1728879713,
      2882767088,
      1783734482,
      3629395816,
      2517608232,
      2874225571,
      1861159788,
      326777828,
      3124490320,
      2130389656,
      2716951837,
      967770486,
      1724537150,
      2185432712,
      2364442137,
      1164943284,
      2105845187,
      998989502,
      3765401048,
      2244026483,
      1075463327,
      1455516326,
      1322494562,
      910128902,
      469688178,
      1117454909,
      936433444,
      3490320968,
      3675253459,
      1240580251,
      122909385,
      2157517691,
      634681816,
      4142456567,
      3825094682,
      3061402683,
      2540495037,
      79693498,
      3249098678,
      1084186820,
      1583128258,
      426386531,
      1761308591,
      1047286709,
      322548459,
      995290223,
      1845252383,
      2603652396,
      3431023940,
      2942221577,
      3202600964,
      3727903485,
      1712269319,
      422464435,
      3234572375,
      1170764815,
      3523960633,
      3117677531,
      1434042557,
      442511882,
      3600875718,
      1076654713,
      1738483198,
      4213154764,
      2393238008,
      3677496056,
      1014306527,
      4251020053,
      793779912,
      2902807211,
      842905082,
      4246964064,
      1395751752,
      1040244610,
      2656851899,
      3396308128,
      445077038,
      3742853595,
      3577915638,
      679411651,
      2892444358,
      2354009459,
      1767581616,
      3150600392,
      3791627101,
      3102740896,
      284835224,
      4246832056,
      1258075500,
      768725851,
      2589189241,
      3069724005,
      3532540348,
      1274779536,
      3789419226,
      2764799539,
      1660621633,
      3471099624,
      4011903706,
      913787905,
      3497959166,
      737222580,
      2514213453,
      2928710040,
      3937242737,
      1804850592,
      3499020752,
      2949064160,
      2386320175,
      2390070455,
      2415321851,
      4061277028,
      2290661394,
      2416832540,
      1336762016,
      1754252060,
      3520065937,
      3014181293,
      791618072,
      3188594551,
      3933548030,
      2332172193,
      3852520463,
      3043980520,
      413987798,
      3465142937,
      3030929376,
      4245938359,
      2093235073,
      3534596313,
      375366246,
      2157278981,
      2479649556,
      555357303,
      3870105701,
      2008414854,
      3344188149,
      4221384143,
      3956125452,
      2067696032,
      3594591187,
      2921233993,
      2428461,
      544322398,
      577241275,
      1471733935,
      610547355,
      4027169054,
      1432588573,
      1507829418,
      2025931657,
      3646575487,
      545086370,
      48609733,
      2200306550,
      1653985193,
      298326376,
      1316178497,
      3007786442,
      2064951626,
      458293330,
      2589141269,
      3591329599,
      3164325604,
      727753846,
      2179363840,
      146436021,
      1461446943,
      4069977195,
      705550613,
      3059967265,
      3887724982,
      4281599278,
      3313849956,
      1404054877,
      2845806497,
      146425753,
      1854211946,
      1266315497,
      3048417604,
      3681880366,
      3289982499,
      290971e4,
      1235738493,
      2632868024,
      2414719590,
      3970600049,
      1771706367,
      1449415276,
      3266420449,
      422970021,
      1963543593,
      2690192192,
      3826793022,
      1062508698,
      1531092325,
      1804592342,
      2583117782,
      2714934279,
      4024971509,
      1294809318,
      4028980673,
      1289560198,
      2221992742,
      1669523910,
      35572830,
      157838143,
      1052438473,
      1016535060,
      1802137761,
      1753167236,
      1386275462,
      3080475397,
      2857371447,
      1040679964,
      2145300060,
      2390574316,
      1461121720,
      2956646967,
      4031777805,
      4028374788,
      33600511,
      2920084762,
      1018524850,
      629373528,
      3691585981,
      3515945977,
      2091462646,
      2486323059,
      586499841,
      988145025,
      935516892,
      3367335476,
      2599673255,
      2839830854,
      265290510,
      3972581182,
      2759138881,
      3795373465,
      1005194799,
      847297441,
      406762289,
      1314163512,
      1332590856,
      1866599683,
      4127851711,
      750260880,
      613907577,
      1450815602,
      3165620655,
      3734664991,
      3650291728,
      3012275730,
      3704569646,
      1427272223,
      778793252,
      1343938022,
      2676280711,
      2052605720,
      1946737175,
      3164576444,
      3914038668,
      3967478842,
      3682934266,
      1661551462,
      3294938066,
      4011595847,
      840292616,
      3712170807,
      616741398,
      312560963,
      711312465,
      1351876610,
      322626781,
      1910503582,
      271666773,
      2175563734,
      1594956187,
      70604529,
      3617834859,
      1007753275,
      1495573769,
      4069517037,
      2549218298,
      2663038764,
      504708206,
      2263041392,
      3941167025,
      2249088522,
      1514023603,
      1998579484,
      1312622330,
      694541497,
      2582060303,
      2151582166,
      1382467621,
      776784248,
      2618340202,
      3323268794,
      2497899128,
      2784771155,
      503983604,
      4076293799,
      907881277,
      423175695,
      432175456,
      1378068232,
      4145222326,
      3954048622,
      3938656102,
      3820766613,
      2793130115,
      2977904593,
      26017576,
      3274890735,
      3194772133,
      1700274565,
      1756076034,
      4006520079,
      3677328699,
      720338349,
      1533947780,
      354530856,
      688349552,
      3973924725,
      1637815568,
      332179504,
      3949051286,
      53804574,
      2852348879,
      3044236432,
      1282449977,
      3583942155,
      3416972820,
      4006381244,
      1617046695,
      2628476075,
      3002303598,
      1686838959,
      431878346,
      2686675385,
      1700445008,
      1080580658,
      1009431731,
      832498133,
      3223435511,
      2605976345,
      2271191193,
      2516031870,
      1648197032,
      4164389018,
      2548247927,
      300782431,
      375919233,
      238389289,
      3353747414,
      2531188641,
      2019080857,
      1475708069,
      455242339,
      2609103871,
      448939670,
      3451063019,
      1395535956,
      2413381860,
      1841049896,
      1491858159,
      885456874,
      4264095073,
      4001119347,
      1565136089,
      3898914787,
      1108368660,
      540939232,
      1173283510,
      2745871338,
      3681308437,
      4207628240,
      3343053890,
      4016749493,
      1699691293,
      1103962373,
      3625875870,
      2256883143,
      3830138730,
      1031889488,
      3479347698,
      1535977030,
      4236805024,
      3251091107,
      2132092099,
      1774941330,
      1199868427,
      1452454533,
      157007616,
      2904115357,
      342012276,
      595725824,
      1480756522,
      206960106,
      497939518,
      591360097,
      863170706,
      2375253569,
      3596610801,
      1814182875,
      2094937945,
      3421402208,
      1082520231,
      3463918190,
      2785509508,
      435703966,
      3908032597,
      1641649973,
      2842273706,
      3305899714,
      1510255612,
      2148256476,
      2655287854,
      3276092548,
      4258621189,
      236887753,
      3681803219,
      274041037,
      1734335097,
      3815195456,
      3317970021,
      1899903192,
      1026095262,
      4050517792,
      356393447,
      2410691914,
      3873677099,
      3682840055,
      3913112168,
      2491498743,
      4132185628,
      2489919796,
      1091903735,
      1979897079,
      3170134830,
      3567386728,
      3557303409,
      857797738,
      1136121015,
      1342202287,
      507115054,
      2535736646,
      337727348,
      3213592640,
      1301675037,
      2528481711,
      1895095763,
      1721773893,
      3216771564,
      62756741,
      2142006736,
      835421444,
      2531993523,
      1442658625,
      3659876326,
      2882144922,
      676362277,
      1392781812,
      170690266,
      3921047035,
      1759253602,
      3611846912,
      1745797284,
      664899054,
      1329594018,
      3901205900,
      3045908486,
      2062866102,
      2865634940,
      3543621612,
      3464012697,
      1080764994,
      553557557,
      3656615353,
      3996768171,
      991055499,
      499776247,
      1265440854,
      648242737,
      3940784050,
      980351604,
      3713745714,
      1749149687,
      3396870395,
      4211799374,
      3640570775,
      1161844396,
      3125318951,
      1431517754,
      545492359,
      4268468663,
      3499529547,
      1437099964,
      2702547544,
      3433638243,
      2581715763,
      2787789398,
      1060185593,
      1593081372,
      2418618748,
      4260947970,
      69676912,
      2159744348,
      86519011,
      2512459080,
      3838209314,
      1220612927,
      3339683548,
      133810670,
      1090789135,
      1078426020,
      1569222167,
      845107691,
      3583754449,
      4072456591,
      1091646820,
      628848692,
      1613405280,
      3757631651,
      526609435,
      236106946,
      48312990,
      2942717905,
      3402727701,
      1797494240,
      859738849,
      992217954,
      4005476642,
      2243076622,
      3870952857,
      3732016268,
      765654824,
      3490871365,
      2511836413,
      1685915746,
      3888969200,
      1414112111,
      2273134842,
      3281911079,
      4080962846,
      172450625,
      2569994100,
      980381355,
      4109958455,
      2819808352,
      2716589560,
      2568741196,
      3681446669,
      3329971472,
      1835478071,
      660984891,
      3704678404,
      4045999559,
      3422617507,
      3040415634,
      1762651403,
      1719377915,
      3470491036,
      2693910283,
      3642056355,
      3138596744,
      1364962596,
      2073328063,
      1983633131,
      926494387,
      3423689081,
      2150032023,
      4096667949,
      1749200295,
      3328846651,
      309677260,
      2016342300,
      1779581495,
      3079819751,
      111262694,
      1274766160,
      443224088,
      298511866,
      1025883608,
      3806446537,
      1145181785,
      168956806,
      3641502830,
      3584813610,
      1689216846,
      3666258015,
      3200248200,
      1692713982,
      2646376535,
      4042768518,
      1618508792,
      1610833997,
      3523052358,
      4130873264,
      2001055236,
      3610705100,
      2202168115,
      4028541809,
      2961195399,
      1006657119,
      2006996926,
      3186142756,
      1430667929,
      3210227297,
      1314452623,
      4074634658,
      4101304120,
      2273951170,
      1399257539,
      3367210612,
      3027628629,
      1190975929,
      2062231137,
      2333990788,
      2221543033,
      2438960610,
      1181637006,
      548689776,
      2362791313,
      3372408396,
      3104550113,
      3145860560,
      296247880,
      1970579870,
      3078560182,
      3769228297,
      1714227617,
      3291629107,
      3898220290,
      166772364,
      1251581989,
      493813264,
      448347421,
      195405023,
      2709975567,
      677966185,
      3703036547,
      1463355134,
      2715995803,
      1338867538,
      1343315457,
      2802222074,
      2684532164,
      233230375,
      2599980071,
      2000651841,
      3277868038,
      1638401717,
      4028070440,
      3237316320,
      6314154,
      819756386,
      300326615,
      590932579,
      1405279636,
      3267499572,
      3150704214,
      2428286686,
      3959192993,
      3461946742,
      1862657033,
      1266418056,
      963775037,
      2089974820,
      2263052895,
      1917689273,
      448879540,
      3550394620,
      3981727096,
      150775221,
      3627908307,
      1303187396,
      508620638,
      2975983352,
      2726630617,
      1817252668,
      1876281319,
      1457606340,
      908771278,
      3720792119,
      3617206836,
      2455994898,
      1729034894,
      1080033504,
      976866871,
      3556439503,
      2881648439,
      1522871579,
      1555064734,
      1336096578,
      3548522304,
      2579274686,
      3574697629,
      3205460757,
      3593280638,
      3338716283,
      3079412587,
      564236357,
      2993598910,
      1781952180,
      1464380207,
      3163844217,
      3332601554,
      1699332808,
      1393555694,
      1183702653,
      3581086237,
      1288719814,
      691649499,
      2847557200,
      2895455976,
      3193889540,
      2717570544,
      1781354906,
      1676643554,
      2592534050,
      3230253752,
      1126444790,
      2770207658,
      2633158820,
      2210423226,
      2615765581,
      2414155088,
      3127139286,
      673620729,
      2805611233,
      1269405062,
      4015350505,
      3341807571,
      4149409754,
      1057255273,
      2012875353,
      2162469141,
      2276492801,
      2601117357,
      993977747,
      3918593370,
      2654263191,
      753973209,
      36408145,
      2530585658,
      25011837,
      3520020182,
      2088578344,
      530523599,
      2918365339,
      1524020338,
      1518925132,
      3760827505,
      3759777254,
      1202760957,
      3985898139,
      3906192525,
      674977740,
      4174734889,
      2031300136,
      2019492241,
      3983892565,
      4153806404,
      3822280332,
      352677332,
      2297720250,
      60907813,
      90501309,
      3286998549,
      1016092578,
      2535922412,
      2839152426,
      457141659,
      509813237,
      4120667899,
      652014361,
      1966332200,
      2975202805,
      55981186,
      2327461051,
      676427537,
      3255491064,
      2882294119,
      3433927263,
      1307055953,
      942726286,
      933058658,
      2468411793,
      3933900994,
      4215176142,
      1361170020,
      2001714738,
      2830558078,
      3274259782,
      1222529897,
      1679025792,
      2729314320,
      3714953764,
      1770335741,
      151462246,
      3013232138,
      1682292957,
      1483529935,
      471910574,
      1539241949,
      458788160,
      3436315007,
      1807016891,
      3718408830,
      978976581,
      1043663428,
      3165965781,
      1927990952,
      4200891579,
      2372276910,
      3208408903,
      3533431907,
      1412390302,
      2931980059,
      4132332400,
      1947078029,
      3881505623,
      4168226417,
      2941484381,
      1077988104,
      1320477388,
      886195818,
      18198404,
      3786409e3,
      2509781533,
      112762804,
      3463356488,
      1866414978,
      891333506,
      18488651,
      661792760,
      1628790961,
      3885187036,
      3141171499,
      876946877,
      2693282273,
      1372485963,
      791857591,
      2686433993,
      3759982718,
      3167212022,
      3472953795,
      2716379847,
      445679433,
      3561995674,
      3504004811,
      3574258232,
      54117162,
      3331405415,
      2381918588,
      3769707343,
      4154350007,
      1140177722,
      4074052095,
      668550556,
      3214352940,
      367459370,
      261225585,
      2610173221,
      4209349473,
      3468074219,
      3265815641,
      314222801,
      3066103646,
      3808782860,
      282218597,
      3406013506,
      3773591054,
      379116347,
      1285071038,
      846784868,
      2669647154,
      3771962079,
      3550491691,
      2305946142,
      453669953,
      1268987020,
      3317592352,
      3279303384,
      3744833421,
      2610507566,
      3859509063,
      266596637,
      3847019092,
      517658769,
      3462560207,
      3443424879,
      370717030,
      4247526661,
      2224018117,
      4143653529,
      4112773975,
      2788324899,
      2477274417,
      1456262402,
      2901442914,
      1517677493,
      1846949527,
      2295493580,
      3734397586,
      2176403920,
      1280348187,
      1908823572,
      3871786941,
      846861322,
      1172426758,
      3287448474,
      3383383037,
      1655181056,
      3139813346,
      901632758,
      1897031941,
      2986607138,
      3066810236,
      3447102507,
      1393639104,
      373351379,
      950779232,
      625454576,
      3124240540,
      4148612726,
      2007998917,
      544563296,
      2244738638,
      2330496472,
      2058025392,
      1291430526,
      424198748,
      50039436,
      29584100,
      3605783033,
      2429876329,
      2791104160,
      1057563949,
      3255363231,
      3075367218,
      3463963227,
      1469046755,
      985887462
    ];
    C_ORIG = [
      1332899944,
      1700884034,
      1701343084,
      1684370003,
      1668446532,
      1869963892
    ];
    __name(_encipher, "_encipher");
    __name(_streamtoword, "_streamtoword");
    __name(_key, "_key");
    __name(_ekskey, "_ekskey");
    __name(_crypt, "_crypt");
    __name(_hash, "_hash");
    __name(encodeBase64, "encodeBase64");
    __name(decodeBase64, "decodeBase64");
    bcryptjs_default = {
      setRandomFallback,
      genSaltSync,
      genSalt,
      hashSync,
      hash,
      compareSync,
      compare,
      getRounds,
      getSalt,
      truncates,
      encodeBase64,
      decodeBase64
    };
  }
});

// ../node_modules/h3-js/dist/browser/h3-js.es.js
function createError(messages, errCode, meta) {
  var hasValue = meta && "value" in meta;
  var err = new Error((messages[errCode] || UNKNOWN_ERROR_MSG) + " (code: " + errCode + (hasValue ? ", value: " + meta.value : "") + ")");
  err.code = errCode;
  return err;
}
function H3LibraryError(errCode, value) {
  var meta = arguments.length === 2 ? {
    value
  } : {};
  return createError(H3_ERROR_MSGS, errCode, meta);
}
function JSBindingError(errCode, value) {
  var meta = arguments.length === 2 ? {
    value
  } : {};
  return createError(JS_ERROR_MESSAGES, errCode, meta);
}
function throwIfError(errCode) {
  if (errCode !== 0) {
    throw H3LibraryError(errCode);
  }
}
function validateH3Index(h3Index) {
  if (!h3Index) {
    throw JSBindingError(E_NULL_INDEX);
  }
  return h3Index;
}
function validateArrayLength(length) {
  if (length > MAX_JS_ARRAY_LENGTH) {
    throw JSBindingError(E_ARRAY_LENGTH, length);
  }
  return length;
}
function h3IndexToSplitLong(h3Index) {
  if (Array.isArray(h3Index) && h3Index.length === 2 && Number.isInteger(h3Index[0]) && Number.isInteger(h3Index[1])) {
    return h3Index;
  }
  if (typeof h3Index !== "string" || INVALID_HEXIDECIMAL_CHAR.test(h3Index)) {
    return [0, 0];
  }
  var upper = parseInt(h3Index.substring(0, h3Index.length - 8), BASE_16);
  var lower = parseInt(h3Index.substring(h3Index.length - 8), BASE_16);
  return [lower, upper];
}
function hexFrom32Bit(num) {
  if (num >= 0) {
    return num.toString(BASE_16);
  }
  num = num & 2147483647;
  var tempStr = zeroPad(8, num.toString(BASE_16));
  var topNum = (parseInt(tempStr[0], BASE_16) + 8).toString(BASE_16);
  tempStr = topNum + tempStr.substring(1);
  return tempStr;
}
function splitLongToH3Index(lower, upper) {
  return hexFrom32Bit(upper) + zeroPad(8, hexFrom32Bit(lower));
}
function zeroPad(fullLen, numStr) {
  var numZeroes = fullLen - numStr.length;
  var outStr = "";
  for (var i = 0; i < numZeroes; i++) {
    outStr += "0";
  }
  outStr = outStr + numStr;
  return outStr;
}
function readH3IndexFromPointer(cAddress, offset) {
  if (offset === void 0) offset = 0;
  var lower = libh3.getValue(cAddress + SZ_H3INDEX * offset, "i32");
  var upper = libh3.getValue(cAddress + SZ_H3INDEX * offset + SZ_INT, "i32");
  return upper ? splitLongToH3Index(lower, upper) : null;
}
function readInt64AsDoubleFromPointer(cAddress) {
  return H3.readInt64AsDoubleFromPointer(cAddress);
}
function readArrayOfH3Indexes(cAddress, maxCount) {
  var out = [];
  for (var i = 0; i < maxCount; i++) {
    var h3Index = readH3IndexFromPointer(cAddress, i);
    if (h3Index !== null) {
      out.push(h3Index);
    }
  }
  return out;
}
function latLngToCell(lat, lng, res) {
  var latLng = libh3._malloc(SZ_LATLNG);
  libh3.HEAPF64.set([lat, lng].map(degsToRads), latLng / SZ_DBL);
  var h3Index = libh3._malloc(SZ_H3INDEX);
  try {
    throwIfError(H3.latLngToCell(latLng, res, h3Index));
    return validateH3Index(readH3IndexFromPointer(h3Index));
  } finally {
    libh3._free(h3Index);
    libh3._free(latLng);
  }
}
function gridDisk(h3Index, ringSize) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var countPtr = libh3._malloc(SZ_INT64);
  try {
    throwIfError(H3.maxGridDiskSize(ringSize, countPtr));
    var count = validateArrayLength(readInt64AsDoubleFromPointer(countPtr));
    var hexagons = libh3._calloc(count, SZ_H3INDEX);
    try {
      throwIfError(H3.gridDisk(lower, upper, ringSize, hexagons));
      return readArrayOfH3Indexes(hexagons, count);
    } finally {
      libh3._free(hexagons);
    }
  } finally {
    libh3._free(countPtr);
  }
}
function degsToRads(deg) {
  return deg * Math.PI / 180;
}
var libh3, NUMBER, H3_ERROR, BOOLEAN, H3_LOWER, H3_UPPER, RESOLUTION, POINTER, BINDINGS, E_SUCCESS, E_FAILED, E_DOMAIN, E_LATLNG_DOMAIN, E_RES_DOMAIN, E_CELL_INVALID, E_DIR_EDGE_INVALID, E_UNDIR_EDGE_INVALID, E_VERTEX_INVALID, E_PENTAGON, E_DUPLICATE_INPUT, E_NOT_NEIGHBORS, E_RES_MISMATCH, E_MEMORY_ALLOC, E_MEMORY_BOUNDS, E_OPTION_INVALID, E_INDEX_INVALID, E_BASE_CELL_DOMAIN, E_DIGIT_DOMAIN, E_DELETED_DIGIT, H3_ERROR_MSGS, E_UNKNOWN_UNIT, E_ARRAY_LENGTH, E_NULL_INDEX, JS_ERROR_MESSAGES, UNKNOWN_ERROR_MSG, H3, BASE_16, SZ_INT, SZ_DBL, SZ_INT64, SZ_H3INDEX, SZ_LATLNG, SZ_CELLBOUNDARY, SZ_GEOPOLYGON, SZ_GEOLOOP, SZ_LINKED_GEOPOLYGON, SZ_COORDIJ, MAX_JS_ARRAY_LENGTH, INVALID_HEXIDECIMAL_CHAR, UPPER_BIT_DIVISOR;
var init_h3_js_es = __esm({
  "../node_modules/h3-js/dist/browser/h3-js.es.js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    libh3 = (function(libh32) {
      libh32 = libh32 || {};
      var Module = typeof libh32 !== "undefined" ? libh32 : {};
      var moduleOverrides = {};
      var key;
      for (key in Module) {
        if (Module.hasOwnProperty(key)) {
          moduleOverrides[key] = Module[key];
        }
      }
      var arguments_ = [];
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      __name(locateFile, "locateFile");
      var readAsync;
      {
        if (typeof document !== "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
        } else {
          scriptDirectory = "";
        }
        readAsync = /* @__PURE__ */ __name(function readAsync2(url, onload, onerror) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = /* @__PURE__ */ __name(function xhr_onload() {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            var data = tryParseAsDataURI(url);
            if (data) {
              onload(data.buffer);
              return;
            }
            onerror();
          }, "xhr_onload");
          xhr.onerror = onerror;
          xhr.send(null);
        }, "readAsync");
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.warn.bind(console);
      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module[key] = moduleOverrides[key];
        }
      }
      moduleOverrides = null;
      if (Module["arguments"]) {
        arguments_ = Module["arguments"];
      }
      var tempRet0 = 0;
      var setTempRet0 = /* @__PURE__ */ __name(function(value) {
        tempRet0 = value;
      }, "setTempRet0");
      var getTempRet0 = /* @__PURE__ */ __name(function() {
        return tempRet0;
      }, "getTempRet0");
      var GLOBAL_BASE = 8;
      function setValue(ptr, value, type, noSafe) {
        type = type || "i8";
        if (type.charAt(type.length - 1) === "*") {
          type = "i32";
        }
        switch (type) {
          case "i1":
            HEAP8[ptr >> 0] = value;
            break;
          case "i8":
            HEAP8[ptr >> 0] = value;
            break;
          case "i16":
            HEAP16[ptr >> 1] = value;
            break;
          case "i32":
            HEAP32[ptr >> 2] = value;
            break;
          case "i64":
            tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
            break;
          case "float":
            HEAPF32[ptr >> 2] = value;
            break;
          case "double":
            HEAPF64[ptr >> 3] = value;
            break;
          default:
            abort("invalid type for setValue: " + type);
        }
      }
      __name(setValue, "setValue");
      function getValue(ptr, type, noSafe) {
        type = type || "i8";
        if (type.charAt(type.length - 1) === "*") {
          type = "i32";
        }
        switch (type) {
          case "i1":
            return HEAP8[ptr >> 0];
          case "i8":
            return HEAP8[ptr >> 0];
          case "i16":
            return HEAP16[ptr >> 1];
          case "i32":
            return HEAP32[ptr >> 2];
          case "i64":
            return HEAP32[ptr >> 2];
          case "float":
            return HEAPF32[ptr >> 2];
          case "double":
            return HEAPF64[ptr >> 3];
          default:
            abort("invalid type for getValue: " + type);
        }
        return null;
      }
      __name(getValue, "getValue");
      var ABORT = false;
      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed: " + text);
        }
      }
      __name(assert, "assert");
      function getCFunc(ident) {
        var func = Module["_" + ident];
        assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
        return func;
      }
      __name(getCFunc, "getCFunc");
      function ccall(ident, returnType, argTypes, args, opts) {
        var toC = {
          "string": /* @__PURE__ */ __name(function(str) {
            var ret2 = 0;
            if (str !== null && str !== void 0 && str !== 0) {
              var len = (str.length << 2) + 1;
              ret2 = stackAlloc(len);
              stringToUTF8(str, ret2, len);
            }
            return ret2;
          }, "string"),
          "array": /* @__PURE__ */ __name(function(arr) {
            var ret2 = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret2);
            return ret2;
          }, "array")
        };
        function convertReturnValue(ret2) {
          if (returnType === "string") {
            return UTF8ToString(ret2);
          }
          if (returnType === "boolean") {
            return Boolean(ret2);
          }
          return ret2;
        }
        __name(convertReturnValue, "convertReturnValue");
        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        if (args) {
          for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
              if (stack === 0) {
                stack = stackSave();
              }
              cArgs[i] = converter(args[i]);
            } else {
              cArgs[i] = args[i];
            }
          }
        }
        var ret = func.apply(null, cArgs);
        ret = convertReturnValue(ret);
        if (stack !== 0) {
          stackRestore(stack);
        }
        return ret;
      }
      __name(ccall, "ccall");
      function cwrap(ident, returnType, argTypes, opts) {
        argTypes = argTypes || [];
        var numericArgs = argTypes.every(function(type) {
          return type === "number";
        });
        var numericRet = returnType !== "string";
        if (numericRet && numericArgs && !opts) {
          return getCFunc(ident);
        }
        return function() {
          return ccall(ident, returnType, argTypes, arguments, opts);
        };
      }
      __name(cwrap, "cwrap");
      var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
      function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (u8Array[endPtr] && !(endPtr >= endIdx)) {
          ++endPtr;
        }
        if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = u8Array[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = u8Array[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = u8Array[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str;
      }
      __name(UTF8ArrayToString, "UTF8ArrayToString");
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      __name(UTF8ToString, "UTF8ToString");
      function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) {
          return 0;
        }
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) {
              break;
            }
            outU8Array[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) {
              break;
            }
            outU8Array[outIdx++] = 192 | u >> 6;
            outU8Array[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) {
              break;
            }
            outU8Array[outIdx++] = 224 | u >> 12;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) {
              break;
            }
            outU8Array[outIdx++] = 240 | u >> 18;
            outU8Array[outIdx++] = 128 | u >> 12 & 63;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63;
          }
        }
        outU8Array[outIdx] = 0;
        return outIdx - startIdx;
      }
      __name(stringToUTF8Array, "stringToUTF8Array");
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      __name(stringToUTF8, "stringToUTF8");
      var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : void 0;
      function writeArrayToMemory(array, buffer2) {
        HEAP8.set(array, buffer2);
      }
      __name(writeArrayToMemory, "writeArrayToMemory");
      function alignUp(x, multiple) {
        if (x % multiple > 0) {
          x += multiple - x % multiple;
        }
        return x;
      }
      __name(alignUp, "alignUp");
      var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      __name(updateGlobalBufferAndViews, "updateGlobalBufferAndViews");
      var DYNAMIC_BASE = 5271536, DYNAMICTOP_PTR = 28624;
      var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 33554432;
      if (Module["buffer"]) {
        buffer = Module["buffer"];
      } else {
        buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
      }
      INITIAL_TOTAL_MEMORY = buffer.byteLength;
      updateGlobalBufferAndViews(buffer);
      HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback();
            continue;
          }
          var func = callback.func;
          if (typeof func === "number") {
            if (callback.arg === void 0) {
              Module["dynCall_v"](func);
            } else {
              Module["dynCall_vi"](func, callback.arg);
            }
          } else {
            func(callback.arg === void 0 ? null : callback.arg);
          }
        }
      }
      __name(callRuntimeCallbacks, "callRuntimeCallbacks");
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") {
            Module["preRun"] = [Module["preRun"]];
          }
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      __name(preRun, "preRun");
      function initRuntime() {
        callRuntimeCallbacks(__ATINIT__);
      }
      __name(initRuntime, "initRuntime");
      function preMain() {
        callRuntimeCallbacks(__ATMAIN__);
      }
      __name(preMain, "preMain");
      function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") {
            Module["postRun"] = [Module["postRun"]];
          }
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      __name(postRun, "postRun");
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      __name(addOnPreRun, "addOnPreRun");
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      __name(addOnPostRun, "addOnPostRun");
      var Math_abs = Math.abs;
      var Math_ceil = Math.ceil;
      var Math_floor = Math.floor;
      var Math_min = Math.min;
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
      }
      __name(addRunDependency, "addRunDependency");
      function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      __name(removeRunDependency, "removeRunDependency");
      Module["preloadedImages"] = {};
      Module["preloadedAudios"] = {};
      var memoryInitializer = null;
      var dataURIPrefix = "data:application/octet-stream;base64,";
      function isDataURI(filename) {
        return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
      }
      __name(isDataURI, "isDataURI");
      var tempDouble;
      var tempI64;
      memoryInitializer = "data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAAAQAAAAQAAAADAAAABgAAAAUAAAACAAAAAAAAAAIAAAADAAAAAQAAAAQAAAAGAAAAAAAAAAUAAAADAAAABgAAAAQAAAAFAAAAAAAAAAEAAAACAAAABAAAAAUAAAAGAAAAAAAAAAIAAAADAAAAAQAAAAUAAAACAAAAAAAAAAEAAAADAAAABgAAAAQAAAAGAAAAAAAAAAUAAAACAAAAAQAAAAQAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAIAAAADAAAAAAAAAAAAAAACAAAAAAAAAAEAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAYAAAAAAAAABQAAAAAAAAAAAAAABAAAAAUAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAYAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAAAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAAAAAAAQAAAAMAAAAEAAAABQAAAAYAAAAAAAAAAQAAAAIAAAAEAAAABQAAAAYAAAAAAAAAAQAAAAIAAAADAAAABQAAAAYAAAAAAAAAAQAAAAIAAAADAAAABAAAAAYAAAAAAAAAAQAAAAIAAAADAAAABAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAgAAAAIAAAAAAAAAAAAAAAYAAAAAAAAAAwAAAAIAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAFAAAABAAAAAAAAAABAAAAAAAAAAAAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAYAAAAAAAAABAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAgAAAAQAAAADAAAACAAAAAEAAAAHAAAABgAAAAkAAAAAAAAAAwAAAAIAAAACAAAABgAAAAoAAAALAAAAAAAAAAEAAAAFAAAAAwAAAA0AAAABAAAABwAAAAQAAAAMAAAAAAAAAAQAAAB/AAAADwAAAAgAAAADAAAAAAAAAAwAAAAFAAAAAgAAABIAAAAKAAAACAAAAAAAAAAQAAAABgAAAA4AAAALAAAAEQAAAAEAAAAJAAAAAgAAAAcAAAAVAAAACQAAABMAAAADAAAADQAAAAEAAAAIAAAABQAAABYAAAAQAAAABAAAAAAAAAAPAAAACQAAABMAAAAOAAAAFAAAAAEAAAAHAAAABgAAAAoAAAALAAAAGAAAABcAAAAFAAAAAgAAABIAAAALAAAAEQAAABcAAAAZAAAAAgAAAAYAAAAKAAAADAAAABwAAAANAAAAGgAAAAQAAAAPAAAAAwAAAA0AAAAaAAAAFQAAAB0AAAADAAAADAAAAAcAAAAOAAAAfwAAABEAAAAbAAAACQAAABQAAAAGAAAADwAAABYAAAAcAAAAHwAAAAQAAAAIAAAADAAAABAAAAASAAAAIQAAAB4AAAAIAAAABQAAABYAAAARAAAACwAAAA4AAAAGAAAAIwAAABkAAAAbAAAAEgAAABgAAAAeAAAAIAAAAAUAAAAKAAAAEAAAABMAAAAiAAAAFAAAACQAAAAHAAAAFQAAAAkAAAAUAAAADgAAABMAAAAJAAAAKAAAABsAAAAkAAAAFQAAACYAAAATAAAAIgAAAA0AAAAdAAAABwAAABYAAAAQAAAAKQAAACEAAAAPAAAACAAAAB8AAAAXAAAAGAAAAAsAAAAKAAAAJwAAACUAAAAZAAAAGAAAAH8AAAAgAAAAJQAAAAoAAAAXAAAAEgAAABkAAAAXAAAAEQAAAAsAAAAtAAAAJwAAACMAAAAaAAAAKgAAAB0AAAArAAAADAAAABwAAAANAAAAGwAAACgAAAAjAAAALgAAAA4AAAAUAAAAEQAAABwAAAAfAAAAKgAAACwAAAAMAAAADwAAABoAAAAdAAAAKwAAACYAAAAvAAAADQAAABoAAAAVAAAAHgAAACAAAAAwAAAAMgAAABAAAAASAAAAIQAAAB8AAAApAAAALAAAADUAAAAPAAAAFgAAABwAAAAgAAAAHgAAABgAAAASAAAANAAAADIAAAAlAAAAIQAAAB4AAAAxAAAAMAAAABYAAAAQAAAAKQAAACIAAAATAAAAJgAAABUAAAA2AAAAJAAAADMAAAAjAAAALgAAAC0AAAA4AAAAEQAAABsAAAAZAAAAJAAAABQAAAAiAAAAEwAAADcAAAAoAAAANgAAACUAAAAnAAAANAAAADkAAAAYAAAAFwAAACAAAAAmAAAAfwAAACIAAAAzAAAAHQAAAC8AAAAVAAAAJwAAACUAAAAZAAAAFwAAADsAAAA5AAAALQAAACgAAAAbAAAAJAAAABQAAAA8AAAALgAAADcAAAApAAAAMQAAADUAAAA9AAAAFgAAACEAAAAfAAAAKgAAADoAAAArAAAAPgAAABwAAAAsAAAAGgAAACsAAAA+AAAALwAAAEAAAAAaAAAAKgAAAB0AAAAsAAAANQAAADoAAABBAAAAHAAAAB8AAAAqAAAALQAAACcAAAAjAAAAGQAAAD8AAAA7AAAAOAAAAC4AAAA8AAAAOAAAAEQAAAAbAAAAKAAAACMAAAAvAAAAJgAAACsAAAAdAAAARQAAADMAAABAAAAAMAAAADEAAAAeAAAAIQAAAEMAAABCAAAAMgAAADEAAAB/AAAAPQAAAEIAAAAhAAAAMAAAACkAAAAyAAAAMAAAACAAAAAeAAAARgAAAEMAAAA0AAAAMwAAAEUAAAA2AAAARwAAACYAAAAvAAAAIgAAADQAAAA5AAAARgAAAEoAAAAgAAAAJQAAADIAAAA1AAAAPQAAAEEAAABLAAAAHwAAACkAAAAsAAAANgAAAEcAAAA3AAAASQAAACIAAAAzAAAAJAAAADcAAAAoAAAANgAAACQAAABIAAAAPAAAAEkAAAA4AAAARAAAAD8AAABNAAAAIwAAAC4AAAAtAAAAOQAAADsAAABKAAAATgAAACUAAAAnAAAANAAAADoAAAB/AAAAPgAAAEwAAAAsAAAAQQAAACoAAAA7AAAAPwAAAE4AAABPAAAAJwAAAC0AAAA5AAAAPAAAAEgAAABEAAAAUAAAACgAAAA3AAAALgAAAD0AAAA1AAAAMQAAACkAAABRAAAASwAAAEIAAAA+AAAAKwAAADoAAAAqAAAAUgAAAEAAAABMAAAAPwAAAH8AAAA4AAAALQAAAE8AAAA7AAAATQAAAEAAAAAvAAAAPgAAACsAAABUAAAARQAAAFIAAABBAAAAOgAAADUAAAAsAAAAVgAAAEwAAABLAAAAQgAAAEMAAABRAAAAVQAAADEAAAAwAAAAPQAAAEMAAABCAAAAMgAAADAAAABXAAAAVQAAAEYAAABEAAAAOAAAADwAAAAuAAAAWgAAAE0AAABQAAAARQAAADMAAABAAAAALwAAAFkAAABHAAAAVAAAAEYAAABDAAAANAAAADIAAABTAAAAVwAAAEoAAABHAAAAWQAAAEkAAABbAAAAMwAAAEUAAAA2AAAASAAAAH8AAABJAAAANwAAAFAAAAA8AAAAWAAAAEkAAABbAAAASAAAAFgAAAA2AAAARwAAADcAAABKAAAATgAAAFMAAABcAAAANAAAADkAAABGAAAASwAAAEEAAAA9AAAANQAAAF4AAABWAAAAUQAAAEwAAABWAAAAUgAAAGAAAAA6AAAAQQAAAD4AAABNAAAAPwAAAEQAAAA4AAAAXQAAAE8AAABaAAAATgAAAEoAAAA7AAAAOQAAAF8AAABcAAAATwAAAE8AAABOAAAAPwAAADsAAABdAAAAXwAAAE0AAABQAAAARAAAAEgAAAA8AAAAYwAAAFoAAABYAAAAUQAAAFUAAABeAAAAZQAAAD0AAABCAAAASwAAAFIAAABgAAAAVAAAAGIAAAA+AAAATAAAAEAAAABTAAAAfwAAAEoAAABGAAAAZAAAAFcAAABcAAAAVAAAAEUAAABSAAAAQAAAAGEAAABZAAAAYgAAAFUAAABXAAAAZQAAAGYAAABCAAAAQwAAAFEAAABWAAAATAAAAEsAAABBAAAAaAAAAGAAAABeAAAAVwAAAFMAAABmAAAAZAAAAEMAAABGAAAAVQAAAFgAAABIAAAAWwAAAEkAAABjAAAAUAAAAGkAAABZAAAAYQAAAFsAAABnAAAARQAAAFQAAABHAAAAWgAAAE0AAABQAAAARAAAAGoAAABdAAAAYwAAAFsAAABJAAAAWQAAAEcAAABpAAAAWAAAAGcAAABcAAAAUwAAAE4AAABKAAAAbAAAAGQAAABfAAAAXQAAAE8AAABaAAAATQAAAG0AAABfAAAAagAAAF4AAABWAAAAUQAAAEsAAABrAAAAaAAAAGUAAABfAAAAXAAAAE8AAABOAAAAbQAAAGwAAABdAAAAYAAAAGgAAABiAAAAbgAAAEwAAABWAAAAUgAAAGEAAAB/AAAAYgAAAFQAAABnAAAAWQAAAG8AAABiAAAAbgAAAGEAAABvAAAAUgAAAGAAAABUAAAAYwAAAFAAAABpAAAAWAAAAGoAAABaAAAAcQAAAGQAAABmAAAAUwAAAFcAAABsAAAAcgAAAFwAAABlAAAAZgAAAGsAAABwAAAAUQAAAFUAAABeAAAAZgAAAGUAAABXAAAAVQAAAHIAAABwAAAAZAAAAGcAAABbAAAAYQAAAFkAAAB0AAAAaQAAAG8AAABoAAAAawAAAG4AAABzAAAAVgAAAF4AAABgAAAAaQAAAFgAAABnAAAAWwAAAHEAAABjAAAAdAAAAGoAAABdAAAAYwAAAFoAAAB1AAAAbQAAAHEAAABrAAAAfwAAAGUAAABeAAAAcwAAAGgAAABwAAAAbAAAAGQAAABfAAAAXAAAAHYAAAByAAAAbQAAAG0AAABsAAAAXQAAAF8AAAB1AAAAdgAAAGoAAABuAAAAYgAAAGgAAABgAAAAdwAAAG8AAABzAAAAbwAAAGEAAABuAAAAYgAAAHQAAABnAAAAdwAAAHAAAABrAAAAZgAAAGUAAAB4AAAAcwAAAHIAAABxAAAAYwAAAHQAAABpAAAAdQAAAGoAAAB5AAAAcgAAAHAAAABkAAAAZgAAAHYAAAB4AAAAbAAAAHMAAABuAAAAawAAAGgAAAB4AAAAdwAAAHAAAAB0AAAAZwAAAHcAAABvAAAAcQAAAGkAAAB5AAAAdQAAAH8AAABtAAAAdgAAAHEAAAB5AAAAagAAAHYAAAB4AAAAbAAAAHIAAAB1AAAAeQAAAG0AAAB3AAAAbwAAAHMAAABuAAAAeQAAAHQAAAB4AAAAeAAAAHMAAAByAAAAcAAAAHkAAAB3AAAAdgAAAHkAAAB0AAAAeAAAAHcAAAB1AAAAcQAAAHYAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAABAAAABQAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAACAAAABQAAAAEAAAAAAAAA/////wEAAAAAAAAAAwAAAAQAAAACAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAMAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAFAAAAAQAAAAAAAAAAAAAAAQAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAADAAAAAAAAAAAAAAABAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAADAAAABQAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAEAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAFAAAABQAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAABAAAAAwAAAAAAAAAAAAAAAQAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAQAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAADAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAABQAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAwAAAAAAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAwAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAwAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAFAAAAAAAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAAAQAAAAAAAAABAAAAAAAAAAAAAAABAAAAAwAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAADAAAAAwAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAFAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAFAAAAAAAAAAAAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAEAAAADAAAAAQAAAAAAAAABAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAAAQAAAAAAAAABAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAUAAAABAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAABAAAAAUAAAABAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAIAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAADAAAAAQAAAAAAAAABAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAD/////AQAAAAAAAAADAAAABAAAAAIAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAFAAAAAAAAAAAAAAAFAAAABQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAUAAAABAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAEAAAD//////////wEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAACAAAAAAAAAAAAAAABAAAAAgAAAAYAAAAEAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAKAAAAAgAAAAAAAAAAAAAAAQAAAAEAAAAFAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAACAAAAAAAAAAAAAAABAAAAAwAAAAcAAAAGAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAABwAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAADgAAAAIAAAAAAAAAAAAAAAEAAAAAAAAACQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAMAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAIAAAAAAAAAAAAAAAEAAAAEAAAACAAAAAoAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAACQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAgAAAAAAAAAAAAAAAQAAAAsAAAAPAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAOAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAIAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAgAAAAAAAAAAAAAAAQAAAAwAAAAQAAAADAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAADwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAACAAAAAAAAAAAAAAABAAAACgAAABMAAAAIAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAACQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAIAAAAAAAAAAAAAAAEAAAANAAAAEQAAAA0AAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAARAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAACAAAAAAAAAAAAAAABAAAADgAAABIAAAAPAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAADwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABIAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAATAAAAAgAAAAAAAAAAAAAAAQAAAP//////////EwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAASAAAAAAAAABgAAAAAAAAAIQAAAAAAAAAeAAAAAAAAACAAAAADAAAAMQAAAAEAAAAwAAAAAwAAADIAAAADAAAACAAAAAAAAAAFAAAABQAAAAoAAAAFAAAAFgAAAAAAAAAQAAAAAAAAABIAAAAAAAAAKQAAAAEAAAAhAAAAAAAAAB4AAAAAAAAABAAAAAAAAAAAAAAABQAAAAIAAAAFAAAADwAAAAEAAAAIAAAAAAAAAAUAAAAFAAAAHwAAAAEAAAAWAAAAAAAAABAAAAAAAAAAAgAAAAAAAAAGAAAAAAAAAA4AAAAAAAAACgAAAAAAAAALAAAAAAAAABEAAAADAAAAGAAAAAEAAAAXAAAAAwAAABkAAAADAAAAAAAAAAAAAAABAAAABQAAAAkAAAAFAAAABQAAAAAAAAACAAAAAAAAAAYAAAAAAAAAEgAAAAEAAAAKAAAAAAAAAAsAAAAAAAAABAAAAAEAAAADAAAABQAAAAcAAAAFAAAACAAAAAEAAAAAAAAAAAAAAAEAAAAFAAAAEAAAAAEAAAAFAAAAAAAAAAIAAAAAAAAABwAAAAAAAAAVAAAAAAAAACYAAAAAAAAACQAAAAAAAAATAAAAAAAAACIAAAADAAAADgAAAAEAAAAUAAAAAwAAACQAAAADAAAAAwAAAAAAAAANAAAABQAAAB0AAAAFAAAAAQAAAAAAAAAHAAAAAAAAABUAAAAAAAAABgAAAAEAAAAJAAAAAAAAABMAAAAAAAAABAAAAAIAAAAMAAAABQAAABoAAAAFAAAAAAAAAAEAAAADAAAAAAAAAA0AAAAFAAAAAgAAAAEAAAABAAAAAAAAAAcAAAAAAAAAGgAAAAAAAAAqAAAAAAAAADoAAAAAAAAAHQAAAAAAAAArAAAAAAAAAD4AAAADAAAAJgAAAAEAAAAvAAAAAwAAAEAAAAADAAAADAAAAAAAAAAcAAAABQAAACwAAAAFAAAADQAAAAAAAAAaAAAAAAAAACoAAAAAAAAAFQAAAAEAAAAdAAAAAAAAACsAAAAAAAAABAAAAAMAAAAPAAAABQAAAB8AAAAFAAAAAwAAAAEAAAAMAAAAAAAAABwAAAAFAAAABwAAAAEAAAANAAAAAAAAABoAAAAAAAAAHwAAAAAAAAApAAAAAAAAADEAAAAAAAAALAAAAAAAAAA1AAAAAAAAAD0AAAADAAAAOgAAAAEAAABBAAAAAwAAAEsAAAADAAAADwAAAAAAAAAWAAAABQAAACEAAAAFAAAAHAAAAAAAAAAfAAAAAAAAACkAAAAAAAAAKgAAAAEAAAAsAAAAAAAAADUAAAAAAAAABAAAAAQAAAAIAAAABQAAABAAAAAFAAAADAAAAAEAAAAPAAAAAAAAABYAAAAFAAAAGgAAAAEAAAAcAAAAAAAAAB8AAAAAAAAAMgAAAAAAAAAwAAAAAAAAADEAAAADAAAAIAAAAAAAAAAeAAAAAwAAACEAAAADAAAAGAAAAAMAAAASAAAAAwAAABAAAAADAAAARgAAAAAAAABDAAAAAAAAAEIAAAADAAAANAAAAAMAAAAyAAAAAAAAADAAAAAAAAAAJQAAAAMAAAAgAAAAAAAAAB4AAAADAAAAUwAAAAAAAABXAAAAAwAAAFUAAAADAAAASgAAAAMAAABGAAAAAAAAAEMAAAAAAAAAOQAAAAEAAAA0AAAAAwAAADIAAAAAAAAAGQAAAAAAAAAXAAAAAAAAABgAAAADAAAAEQAAAAAAAAALAAAAAwAAAAoAAAADAAAADgAAAAMAAAAGAAAAAwAAAAIAAAADAAAALQAAAAAAAAAnAAAAAAAAACUAAAADAAAAIwAAAAMAAAAZAAAAAAAAABcAAAAAAAAAGwAAAAMAAAARAAAAAAAAAAsAAAADAAAAPwAAAAAAAAA7AAAAAwAAADkAAAADAAAAOAAAAAMAAAAtAAAAAAAAACcAAAAAAAAALgAAAAMAAAAjAAAAAwAAABkAAAAAAAAAJAAAAAAAAAAUAAAAAAAAAA4AAAADAAAAIgAAAAAAAAATAAAAAwAAAAkAAAADAAAAJgAAAAMAAAAVAAAAAwAAAAcAAAADAAAANwAAAAAAAAAoAAAAAAAAABsAAAADAAAANgAAAAMAAAAkAAAAAAAAABQAAAAAAAAAMwAAAAMAAAAiAAAAAAAAABMAAAADAAAASAAAAAAAAAA8AAAAAwAAAC4AAAADAAAASQAAAAMAAAA3AAAAAAAAACgAAAAAAAAARwAAAAMAAAA2AAAAAwAAACQAAAAAAAAAQAAAAAAAAAAvAAAAAAAAACYAAAADAAAAPgAAAAAAAAArAAAAAwAAAB0AAAADAAAAOgAAAAMAAAAqAAAAAwAAABoAAAADAAAAVAAAAAAAAABFAAAAAAAAADMAAAADAAAAUgAAAAMAAABAAAAAAAAAAC8AAAAAAAAATAAAAAMAAAA+AAAAAAAAACsAAAADAAAAYQAAAAAAAABZAAAAAwAAAEcAAAADAAAAYgAAAAMAAABUAAAAAAAAAEUAAAAAAAAAYAAAAAMAAABSAAAAAwAAAEAAAAAAAAAASwAAAAAAAABBAAAAAAAAADoAAAADAAAAPQAAAAAAAAA1AAAAAwAAACwAAAADAAAAMQAAAAMAAAApAAAAAwAAAB8AAAADAAAAXgAAAAAAAABWAAAAAAAAAEwAAAADAAAAUQAAAAMAAABLAAAAAAAAAEEAAAAAAAAAQgAAAAMAAAA9AAAAAAAAADUAAAADAAAAawAAAAAAAABoAAAAAwAAAGAAAAADAAAAZQAAAAMAAABeAAAAAAAAAFYAAAAAAAAAVQAAAAMAAABRAAAAAwAAAEsAAAAAAAAAOQAAAAAAAAA7AAAAAAAAAD8AAAADAAAASgAAAAAAAABOAAAAAwAAAE8AAAADAAAAUwAAAAMAAABcAAAAAwAAAF8AAAADAAAAJQAAAAAAAAAnAAAAAwAAAC0AAAADAAAANAAAAAAAAAA5AAAAAAAAADsAAAAAAAAARgAAAAMAAABKAAAAAAAAAE4AAAADAAAAGAAAAAAAAAAXAAAAAwAAABkAAAADAAAAIAAAAAMAAAAlAAAAAAAAACcAAAADAAAAMgAAAAMAAAA0AAAAAAAAADkAAAAAAAAALgAAAAAAAAA8AAAAAAAAAEgAAAADAAAAOAAAAAAAAABEAAAAAwAAAFAAAAADAAAAPwAAAAMAAABNAAAAAwAAAFoAAAADAAAAGwAAAAAAAAAoAAAAAwAAADcAAAADAAAAIwAAAAAAAAAuAAAAAAAAADwAAAAAAAAALQAAAAMAAAA4AAAAAAAAAEQAAAADAAAADgAAAAAAAAAUAAAAAwAAACQAAAADAAAAEQAAAAMAAAAbAAAAAAAAACgAAAADAAAAGQAAAAMAAAAjAAAAAAAAAC4AAAAAAAAARwAAAAAAAABZAAAAAAAAAGEAAAADAAAASQAAAAAAAABbAAAAAwAAAGcAAAADAAAASAAAAAMAAABYAAAAAwAAAGkAAAADAAAAMwAAAAAAAABFAAAAAwAAAFQAAAADAAAANgAAAAAAAABHAAAAAAAAAFkAAAAAAAAANwAAAAMAAABJAAAAAAAAAFsAAAADAAAAJgAAAAAAAAAvAAAAAwAAAEAAAAADAAAAIgAAAAMAAAAzAAAAAAAAAEUAAAADAAAAJAAAAAMAAAA2AAAAAAAAAEcAAAAAAAAAYAAAAAAAAABoAAAAAAAAAGsAAAADAAAAYgAAAAAAAABuAAAAAwAAAHMAAAADAAAAYQAAAAMAAABvAAAAAwAAAHcAAAADAAAATAAAAAAAAABWAAAAAwAAAF4AAAADAAAAUgAAAAAAAABgAAAAAAAAAGgAAAAAAAAAVAAAAAMAAABiAAAAAAAAAG4AAAADAAAAOgAAAAAAAABBAAAAAwAAAEsAAAADAAAAPgAAAAMAAABMAAAAAAAAAFYAAAADAAAAQAAAAAMAAABSAAAAAAAAAGAAAAAAAAAAVQAAAAAAAABXAAAAAAAAAFMAAAADAAAAZQAAAAAAAABmAAAAAwAAAGQAAAADAAAAawAAAAMAAABwAAAAAwAAAHIAAAADAAAAQgAAAAAAAABDAAAAAwAAAEYAAAADAAAAUQAAAAAAAABVAAAAAAAAAFcAAAAAAAAAXgAAAAMAAABlAAAAAAAAAGYAAAADAAAAMQAAAAAAAAAwAAAAAwAAADIAAAADAAAAPQAAAAMAAABCAAAAAAAAAEMAAAADAAAASwAAAAMAAABRAAAAAAAAAFUAAAAAAAAAXwAAAAAAAABcAAAAAAAAAFMAAAAAAAAATwAAAAAAAABOAAAAAAAAAEoAAAADAAAAPwAAAAEAAAA7AAAAAwAAADkAAAADAAAAbQAAAAAAAABsAAAAAAAAAGQAAAAFAAAAXQAAAAEAAABfAAAAAAAAAFwAAAAAAAAATQAAAAEAAABPAAAAAAAAAE4AAAAAAAAAdQAAAAQAAAB2AAAABQAAAHIAAAAFAAAAagAAAAEAAABtAAAAAAAAAGwAAAAAAAAAWgAAAAEAAABdAAAAAQAAAF8AAAAAAAAAWgAAAAAAAABNAAAAAAAAAD8AAAAAAAAAUAAAAAAAAABEAAAAAAAAADgAAAADAAAASAAAAAEAAAA8AAAAAwAAAC4AAAADAAAAagAAAAAAAABdAAAAAAAAAE8AAAAFAAAAYwAAAAEAAABaAAAAAAAAAE0AAAAAAAAAWAAAAAEAAABQAAAAAAAAAEQAAAAAAAAAdQAAAAMAAABtAAAABQAAAF8AAAAFAAAAcQAAAAEAAABqAAAAAAAAAF0AAAAAAAAAaQAAAAEAAABjAAAAAQAAAFoAAAAAAAAAaQAAAAAAAABYAAAAAAAAAEgAAAAAAAAAZwAAAAAAAABbAAAAAAAAAEkAAAADAAAAYQAAAAEAAABZAAAAAwAAAEcAAAADAAAAcQAAAAAAAABjAAAAAAAAAFAAAAAFAAAAdAAAAAEAAABpAAAAAAAAAFgAAAAAAAAAbwAAAAEAAABnAAAAAAAAAFsAAAAAAAAAdQAAAAIAAABqAAAABQAAAFoAAAAFAAAAeQAAAAEAAABxAAAAAAAAAGMAAAAAAAAAdwAAAAEAAAB0AAAAAQAAAGkAAAAAAAAAdwAAAAAAAABvAAAAAAAAAGEAAAAAAAAAcwAAAAAAAABuAAAAAAAAAGIAAAADAAAAawAAAAEAAABoAAAAAwAAAGAAAAADAAAAeQAAAAAAAAB0AAAAAAAAAGcAAAAFAAAAeAAAAAEAAAB3AAAAAAAAAG8AAAAAAAAAcAAAAAEAAABzAAAAAAAAAG4AAAAAAAAAdQAAAAEAAABxAAAABQAAAGkAAAAFAAAAdgAAAAEAAAB5AAAAAAAAAHQAAAAAAAAAcgAAAAEAAAB4AAAAAQAAAHcAAAAAAAAAcgAAAAAAAABwAAAAAAAAAGsAAAAAAAAAZAAAAAAAAABmAAAAAAAAAGUAAAADAAAAUwAAAAEAAABXAAAAAwAAAFUAAAADAAAAdgAAAAAAAAB4AAAAAAAAAHMAAAAFAAAAbAAAAAEAAAByAAAAAAAAAHAAAAAAAAAAXAAAAAEAAABkAAAAAAAAAGYAAAAAAAAAdQAAAAAAAAB5AAAABQAAAHcAAAAFAAAAbQAAAAEAAAB2AAAAAAAAAHgAAAAAAAAAXwAAAAEAAABsAAAAAQAAAHIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAGAAAAAgAAAAUAAAABAAAABAAAAAAAAAAAAAAABQAAAAMAAAABAAAABgAAAAQAAAACAAAAAAAAAH6iBfbytuk/Gq6akm/58z/Xrm0Liez0P5doSdOpSwRAWs602ULg8D/dT7Rcbo/1v1N1RQHFNOM/g9Snx7HW3L8HWsP8Q3jfP6VwOLosutk/9rjk1YQcxj+gnmKMsNn6P/HDeuPFY+M/YHwDjqKhB0Ci19/fCVrbP4UxKkDWOP6/pvljWa09tL9wi7wrQXjnv/Z6yLImkM2/3yTlOzY14D+m+WNZrT20PzwKVQnrQwNA9nrIsiaQzT/g40rFrRQFwPa45NWEHMa/kbslHEZq97/xw3rjxWPjv4cLC2SMBci/otff3wla27+rKF5oIAv0P1N1RQHFNOO/iDJPGyWHBUAHWsP8Q3jfvwQf/by16gXAfqIF9vK26b8XrO0Vh0r+v9eubQuJ7PS/BxLrA0ZZ479azrTZQuDwv1MK1EuItPw/yscgV9Z6FkAwHBR2WjQMQJNRzXsQ5vY/GlUHVJYKF0DONuFv2lMNQNCGZ28QJfk/0WUwoIL36D8ggDOMQuATQNqMOeAy/wZAWFYOYM+M2z/LWC4uH3oSQDE+LyTsMgRAkJzhRGWFGEDd4soovCQQQKqk0DJMEP8/rGmNdwOLBUAW2X/9xCbjP4hu3dcqJhNAzuYItRvdB0CgzW3zJW/sPxotm/Y2TxRAQAk9XmdDDEC1Kx9MKgT3P1M+NctcghZAFVqcLlb0C0Bgzd3sB2b2P77mZDPUWhZAFROHJpUGCEDAfma5CxXtPz1DWq/zYxRAmhYY5824F0DOuQKWSbAOQNCMqrvu3fs/L6DR22K2wT9nAAxPBU8RQGiN6mW43AFAZhu25b633D8c1YgmzowSQNM25BRKWARArGS08/lNxD+LFssHwmMRQLC5aNcxBgJABL9HT0WRF0CjCmJmOGEOQHsuaVzMP/s/TWJCaGGwBUCeu1PAPLzjP9nqN9DZOBNAKE4JcydbCkCGtbd1qjPzP8dgm9U8jhVAtPeKTkVwDkCeCLss5l37P401XMPLmBdAFd29VMVQDUBg0yA55h75Pz6odcYLCRdApBM4rBrkAkDyAVWgQxbRP4XDMnK20hFAymLlF7EmzD8GUgo9XBHlP3lbK7T9COc/k+OhPthhy7+YGEpnrOvCPzBFhLs15u4/epbqB6H4uz9IuuLF5svev6lzLKY31es/CaQ0envF5z8ZY0xlUADXv7zaz7HYEuI/CfbK1sn16T8uAQfWwxLWPzKn/YuFN94/5KdbC1AFu793fyCSnlfvPzK2y4doAMY/NRg5t1/X6b/shq4QJaHDP5yNIAKPOeI/vpn7BSE30r/X4YQrO6nrv78Ziv/Thto/DqJ1Y6+y5z9l51NaxFrlv8QlA65HOLS/86dxiEc96z+Hj0+LFjneP6LzBZ8LTc2/DaJ1Y6+y579l51NaxFrlP8QlA65HOLQ/8qdxiEc967+Jj0+LFjnev6LzBZ8LTc0/1qdbC1AFuz93fyCSnlfvvzK2y4doAMa/NRg5t1/X6T/vhq4QJaHDv5yNIAKPOeK/wJn7BSE30j/W4YQrO6nrP78Ziv/Thtq/CaQ0envF578XY0xlUADXP7zaz7HYEuK/CvbK1sn16b8rAQfWwxLWvzKn/YuFN96/zWLlF7EmzL8GUgo9XBHlv3lbK7T9COe/kOOhPthhyz+cGEpnrOvCvzBFhLs15u6/c5bqB6H4u79IuuLF5sveP6lzLKY31eu/AQAAAP////8HAAAA/////zEAAAD/////VwEAAP////9hCQAA/////6dBAAD/////kcsBAP/////3kAwA/////8H2VwAAAAAAAAAAAAAAAAACAAAA/////w4AAAD/////YgAAAP////+uAgAA/////8ISAAD/////ToMAAP////8ilwMA/////+4hGQD/////gu2vAAAAAAAAAAAAAAAAAAAAAAACAAAA//////////8BAAAAAwAAAP//////////////////////////////////////////////////////////////////////////AQAAAAAAAAACAAAA////////////////AwAAAP//////////////////////////////////////////////////////////////////////////AQAAAAAAAAACAAAA////////////////AwAAAP//////////////////////////////////////////////////////////////////////////AQAAAAAAAAACAAAA////////////////AwAAAP//////////////////////////////////////////////////////////AgAAAP//////////AQAAAAAAAAD/////////////////////AwAAAP////////////////////////////////////////////////////8DAAAA/////////////////////wAAAAD/////////////////////AQAAAP///////////////wIAAAD///////////////////////////////8DAAAA/////////////////////wAAAAD///////////////8CAAAAAQAAAP////////////////////////////////////////////////////8DAAAA/////////////////////wAAAAD///////////////8CAAAAAQAAAP////////////////////////////////////////////////////8DAAAA/////////////////////wAAAAD///////////////8CAAAAAQAAAP////////////////////////////////////////////////////8DAAAA/////////////////////wAAAAD///////////////8CAAAAAQAAAP////////////////////////////////////////////////////8BAAAAAgAAAP///////////////wAAAAD/////////////////////AwAAAP////////////////////////////////////////////////////8BAAAAAgAAAP///////////////wAAAAD/////////////////////AwAAAP////////////////////////////////////////////////////8BAAAAAgAAAP///////////////wAAAAD/////////////////////AwAAAP////////////////////////////////////////////////////8BAAAAAgAAAP///////////////wAAAAD/////////////////////AwAAAP///////////////////////////////wIAAAD///////////////8BAAAA/////////////////////wAAAAD/////////////////////AwAAAP////////////////////////////////////////////////////8DAAAA/////////////////////wAAAAABAAAA//////////8CAAAA//////////////////////////////////////////////////////////8DAAAA////////////////AgAAAAAAAAABAAAA//////////////////////////////////////////////////////////////////////////8DAAAA////////////////AgAAAAAAAAABAAAA//////////////////////////////////////////////////////////////////////////8DAAAA////////////////AgAAAAAAAAABAAAA//////////////////////////////////////////////////////////////////////////8DAAAAAQAAAP//////////AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAACAAAAAAAAAAIAAAABAAAAAQAAAAIAAAACAAAAAAAAAAUAAAAFAAAAAAAAAAIAAAACAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAgAAAAEAAAACAAAAAgAAAAIAAAAAAAAABQAAAAYAAAAAAAAAAgAAAAIAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAAAAAACAAAAAQAAAAMAAAACAAAAAgAAAAAAAAAFAAAABwAAAAAAAAACAAAAAgAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAACAAAAAAAAAAIAAAABAAAABAAAAAIAAAACAAAAAAAAAAUAAAAIAAAAAAAAAAIAAAACAAAAAwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAIAAAAAAAAAAgAAAAEAAAAAAAAAAgAAAAIAAAAAAAAABQAAAAkAAAAAAAAAAgAAAAIAAAADAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAgAAAAIAAAAAAAAAAwAAAA4AAAACAAAAAAAAAAIAAAADAAAAAAAAAAAAAAACAAAAAgAAAAMAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAACAAAAAgAAAAAAAAADAAAACgAAAAIAAAAAAAAAAgAAAAMAAAABAAAAAAAAAAIAAAACAAAAAwAAAAcAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAIAAAACAAAAAAAAAAMAAAALAAAAAgAAAAAAAAACAAAAAwAAAAIAAAAAAAAAAgAAAAIAAAADAAAACAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAgAAAAIAAAAAAAAAAwAAAAwAAAACAAAAAAAAAAIAAAADAAAAAwAAAAAAAAACAAAAAgAAAAMAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAACAAAAAgAAAAAAAAADAAAADQAAAAIAAAAAAAAAAgAAAAMAAAAEAAAAAAAAAAIAAAACAAAAAwAAAAoAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAIAAAACAAAAAAAAAAMAAAAGAAAAAgAAAAAAAAACAAAAAwAAAA8AAAAAAAAAAgAAAAIAAAADAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAgAAAAIAAAAAAAAAAwAAAAcAAAACAAAAAAAAAAIAAAADAAAAEAAAAAAAAAACAAAAAgAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAACAAAAAgAAAAAAAAADAAAACAAAAAIAAAAAAAAAAgAAAAMAAAARAAAAAAAAAAIAAAACAAAAAwAAAA0AAAAAAAAAAAAAAAAAAAAAAAAACAAAAAIAAAACAAAAAAAAAAMAAAAJAAAAAgAAAAAAAAACAAAAAwAAABIAAAAAAAAAAgAAAAIAAAADAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAAgAAAAIAAAAAAAAAAwAAAAUAAAACAAAAAAAAAAIAAAADAAAAEwAAAAAAAAACAAAAAgAAAAMAAAAPAAAAAAAAAAAAAAAAAAAAAAAAABAAAAACAAAAAAAAAAIAAAABAAAAEwAAAAIAAAACAAAAAAAAAAUAAAAKAAAAAAAAAAIAAAACAAAAAwAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAIAAAAAAAAAAgAAAAEAAAAPAAAAAgAAAAIAAAAAAAAABQAAAAsAAAAAAAAAAgAAAAIAAAADAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAgAAAAAAAAACAAAAAQAAABAAAAACAAAAAgAAAAAAAAAFAAAADAAAAAAAAAACAAAAAgAAAAMAAAASAAAAAAAAAAAAAAAAAAAAAAAAABMAAAACAAAAAAAAAAIAAAABAAAAEQAAAAIAAAACAAAAAAAAAAUAAAANAAAAAAAAAAIAAAACAAAAAwAAABMAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAIAAAAAAAAAAgAAAAEAAAASAAAAAgAAAAIAAAAAAAAABQAAAA4AAAAAAAAAAgAAAAIAAAADAAAAAgAAAAEAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAIAAAABAAAAAAAAAAEAAAACAAAAAQAAAAAAAAACAAAAAAAAAAUAAAAEAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAFAAAABAAAAAAAAAABAAAABQAAAAQAAAAAAAAABQAAAAAAAAACAAAAAQAAAAAAAAABAAAAAgAAAAAAAAAAAAAAAgAAAAEAAAAAAAAAAQAAAAIAAAABAAAAAAAAAAIAAAACAAAAAAAAAAEAAAAAAAAAAAAAAAUAAAAEAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAFAAAABAAAAAAAAAABAAAABQAAAAQAAAAAAAAABQAAAAUAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAAAAAAAAQAAAAAAAAAAAAA6B6FaUp9QQTPXMuL4myJBraiDfBwx9UBYJseitzTIQOL5if9jqZtAnXX+Z+ycb0C3pucbhRBCQG8wJBYqpRRAlWbDCzCY5z/eFWBUEve6P/+qo4Q50Y4/D9YM3iCcYT8fcA2QJSA0P4ADxu0qAAc/BNcGolVJ2j5d9FACqwquPh9z7MthtI9CSUSYJke/YUJQ/64OyjU0Qpi0+HCmFQdCm3GfIVdh2kHsJ11kAyauQYC3UDFJOoFBSJsFV1OwU0FK5fcxX4AmQWhy/zZIt/lACqaCPsBjzUDbdUNIScugQMYQlVJ4MXNANiuq8GTvRUDxTXnulxEZQFZ8QX5kpuw/qmG/JwYFlEAluh3Q6DB+QKn4vyNq0GZAKOXekas+UUB8xabXXhI6QG63C2pLtSNAdDBtyNfLDUDyOcu67ID2P0rCMvRXAeE/Ki2TSVyzyT9Dk+8Sz2uzP5J+w5ARWp0/NQAoOiMuhj9YnP+RyMJwPxgW7TvQVFk/KgsLYF0kQz9g5dAC6IwzQcgHPVvDex1B1XjppodHBkHJq3OMM9fwQNvcmJ7wddlAInGPpQs/w0BRobq5EBmtQJZ2ai7n+ZVAtv2G5E+bgECG+gIfKBlpQK5f8jdI91JAL39sL/WpPEB8rGxhDqklQK6yUf43XhBAxL9y/tK8+D86XyZpgrHiPwAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////AAAAAP////8AAAAAAAAAAAAAAAABAAAAAAAAAAAAAAD/////AAAAAAAAAAABAAAAAQAAAAAAAAAAAAAA/////wAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAP////8FAAAABQAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////wAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////8AAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAFAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////AAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAAAAAAEAAAAAAAAABQAAAAEAAAABAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAQABAAABAQAAAAAAAQAAAAEAAAABAAEAAAAAAAAAAAAAAAAAAAAAquJYWJZl+D9jaeZNtj/zPwwdI9KqaeO/qGefXwdHdz+q4lhYlmX4P+OrlPMN3PI/DB0j0qpp47+7SQLV4VIEQKriWFiWZfg/r2kma3tz8T82eQmLqNIGwMRIWXMqSvo/fcCszPux9j+jara6ozTwP6hnn18HR3c/MSoKLequ8r+SabgA2nj0P7jBLbDOHO8/1Ym/ICfH4T+6lxjvlFXHv73m373LRPU/0vXyDVxo7T+ToKRHJXMAQF/33578aPE/pAyy64tD9T8+U/hCvyruPwxv8Y7YYwLAuXYr8NAiCEB4+LDK0Sn0P1Qeuy4j+eo/OMx50n7K7L+TrGB/nyf8v5ehC2fbYPM/aXMKexiT6z8mFRIMjg/zP7yUVwGGBNw/E6opHERf8z/z0wR2g9DqPw4pBpcOhvu/NbA29uWAA8DMaTExyXzyP02biiQ+Ruk/S8jz2/FKBEB1pzZnpbb9P7pQU4wLfPI//7ZcQXeG6D9CqEQvAYoIwDB2VB6sSgRAVyv8H5We8T+EHWF8XNPmPzB2wT8Nrrg/SEi+cX+w4L8of+GtdSDxP1sjk5AdouU/6ZjOVru13r8K0obqI6bxvwVbdNXyhfA/w5GG024n5z+rwmtMzP8BwLw9pSX49QXABe/2uQxP8D+b6wCzCvXkP7uGT87fK+Q/pz/JWw4coj+qoBf2J0nwP/yE3PUo0+I/vFJeHcaC+D96luSIqvntP/bf8sHUYu8/gZNN41mL4z9bhOqVOF4FwO6lmAh1hQhAbCVxbdhk7z+1C8NdDcfiPwG36x/0OQBAx0WJ76c2+D9nlSHXANfuP2HlfZ3gqOE/EwnVlVPg9r96+oHzEH//v5bXzdT1Auw/DM3GwLsA4D9p/8uoKcr+v+U9x5DQVAPAehjSdghb7D9sc1IetODgP8MVwwB1pu6/azPk6OGe978W8t/TUc3rP+0QMvYfP+A/RsG/QpSE8D+l3uwScxzgPwQaifgujuw/k1Vti1I43z8MAwLnSh0GQH5nYnwwZgJAiGUzWC5s6j8WyyI/BbLgPw4iUapGeQJAB3W+imnp/j9BLWR4ssrpP2t+gG5Pstk/cpBsfm6DCMCOpU9dOZsFQEv8nFypHeo/ehJ6i+6S2D9jqlGEmarLv7STC5TRiOa/bC+x8WZD6D9H3yUkWpDZP8gZvmCMuQLAreY19/eRBsCoPOc8UzzpP6KI/QV+y9g/t/MoboyWzT+Hv5q3Zu3Mvy2xROCT4uY/9gQitMMg1T9abAqhWMDkv1oLTavoUfG/PMUJP9CD5j+fHRX3t6fSPz7W2gk6bvs/WRnuHwqN9D8YFturGCTmP1EZczv0b9I/5t4exabB5D/1ESLh5fTEP9X2z6SYweQ/6lv3I2zT0D9zkRGNUNMAQKoSvc4EIfs/Xggt8wQI5T+mJHHg/w/SP4lhT/9t8vQ/DrZ/DbwH7D+XlhbYZrjkP34LIpFt6c4/lwfp8fLX9L+j96CTTf76v3WdNhEv9uM/d8c3o4lV0D/vFdCHVcsFwAHeDq0F1QhApbYqcZiN5D9KoilqByXLPwX0/diA0vq/0fo0GxnxAMBbaTkvlCzjP/RrFrWXrMs/UYTrky7jA0DB9f4FiZYAQEGAk/3QzeE/r/TeqE8t0D/OqjlsnPbvvz8RKU8JOfW/smSEbK/O4T8MzuyPm3DDP/rFtctq9gZAfb1EVEaSA0Dts5dVInnhP18SFMc79MM/7y34cw6LAMDFrRJsZO0DwC2KLvLSYuA/hx5wcUHewz+49SnK/4ruPyeS0PX9a+E/ZxaaLvvZ3z8WPu5T2QS8Pygo4RIvMqa/BJ0Kqsd0279cKW4ay8jdP3b05bmZ364/10/qtdxk2r+Bcz6CDMvpv54qOw+Amdw/qLV71pW7sT/YKc80nIPUP8OfIaBJ77G/LyTuD1un2z+diYu8efWzP1wU7ACkfwjAZroyPL1yBkAmv3lKJJbbPysKSE4W+p0/dIgqY79TA8ATLTOQ3tsGwJ2zweD/Xdg/XO/jXeFUaL8VW2qLFKfov1cA9Aa6XfK/tIa7YGgI2T+f3hu/sxqPv2nXdPpf3Pc/jkw8Jbda8j+tT/z8tGPVP1yBHpJd35k/KYvYOy1s8j/yz+kCQjPrP9+agH7x59g/PZfJ9aBhpr/rDKzvYBb+PwtkiaGCt/c/vb1mVr+f1T/JIHwHc8Govw7aeF6+9vG/Xv7kD6fp979isYioQYHVP7AIQZuSFrG/3z1AdUTnAUDN3XY9O7f9P0AdQ9ljYNQ/dJANJPTOrb8kLECUiiPlP4yF7UgmStA/9xGmXxCG1T9qZzix4W2zv2SGJRJVrPe/Fh9a2M/B/b8IexzFCoPSP9y1QFD2bLe/Q86cWLJe/b+mOOfYm78BwOTjkPAGE9E/8aPCUKu/ub9pPZyLCiUGwBA7Mev/BQlALOmrlRi+0j+AMJ/dKULBv7iLtL6a6QRAEMDV/yajAUDa62dE3crJP1P70RgBUbq/38hVnR6esT/s1tG10Z/Ov/zLwalHPss/dTS9NKTXx78nMcRzCIEHQAabxDsAmQRA0tyLK3gSyT+Aui7nOhDGv5Gs58z3WgHATN3forJuBMCAui7nOhDGP9Lciyt4Esm/WAJyHQ4c7z8UP5HFIs3iP3U0vTSk18c//MvBqUc+y7+cvv8HLg/Kvy1I/mHsI+K/U/vRGAFRuj/a62dE3crJv8p+WV8KlQjAuQ/nOP43B0CAMJ/dKULBPyzpq5UYvtK/ZoU+VoLh4L9etLlRUfvtv/GjwlCrv7k/5OOQ8AYT0b9DfT9FhufXPwUX8hJp+4u/3LVAUPZstz8IexzFCoPSv9+L609E5fQ/q9Fz7X2J7T9qZzix4W2zP/cRpl8QhtW/vtNilqGX+j8MOy7QJoL0P3SQDST0zq0/QB1D2WNg1L8IIjSvGNkDwGB8Jou2GAfAsAhBm5IWsT9isYioQYHVvyS9D3zb6uy/gnwRa7uM9L/JIHwHc8GoP729Zla/n9W/CsAHJZwmAEDEW6OYT1r6Pz2XyfWgYaY/35qAfvHn2L83Tdy4lS30vxf2/gZ0jPq/XIEekl3fmb+tT/z8tGPVvybPr2zJ1/+/K7mJ0ypVAsCf3hu/sxqPPwCGu2BoCNm/5oITrpZn+r+UDUyDP+n/v1zv413hVGg/nbPB4P9d2L9MlmkxNvgCQMtZlKE85v8/KwpIThb6nb8mv3lKJJbbv8+SZsTvOOc/pQCIIOYw0j+diYu8efWzvy8k7g9bp9u/kxYDa+pKtD9XlYvA8HnVv6i1e9aVu7G/nio7D4CZ3L/WR6rNh5EGwCkgQweBkghAdvTluZnfrr9cKW4ay8jdvxbjhr1f1QVAR5C0MzivAkAWPu5T2QS8v2cWmi772d+/cKj4lzLJCEBx2QJfYrMFQIcecHFB3sO/LYou8tJi4L+jr7lhO38BwIcI0Nb7xgTAXxIUxzv0w7/ts5dVInnhv0T+l8DZLfE/MP3FoFvS5D8MzuyPm3DDv7JkhGyvzuG/tzhzRIRc0b9Ovv3/0z7mv6/03qhPLdC/m4CT/dDN4b9dwjU5VCQBQBBJX1ntCv0/9GsWtZesy79baTkvlCzjv1mjYgEz++S/oW6KnOQW8b9KoilqByXLv6W2KnGYjeS/SmaKz3Vx9z+BZB5yxGHwP3fHN6OJVdC/dZ02ES/2478PuaBjLrXaP4/JU81pPaO/fgsikW3pzr+XlhbYZrjkv4tSn7YDbP0/f2LnFKlF9z+mJHHg/w/Sv14ILfMECOW/mfg4qYhR/b+OP+RQDCACwOpb9yNs09C/1fbPpJjB5L9pN2WOVZ3wv3hHy9nxIve/URlzO/Rv0r8YFturGCTmv1d1/KKR8QPA8gsy9qzSB8CfHRX3t6fSvzzFCT/Qg+a/EYStnrzV9r/2QJqI7Lb9v/YEIrTDINW/LbFE4JPi5r/7kQEs5fEDQHunnf4GeQBAooj9BX7L2L+oPOc8Uzzpv+ydYY2SSAfAL4HK6CRTB0BH3yUkWpDZv2wvsfFmQ+i/Ik0Yzruh6T8fM3LoGoDUP3oSeovukti/S/ycXKkd6r9rEv+7UWcHQCRIQe/GfwNAa36Abk+y2b9BLWR4ssrpv9KT87qa0bM/FTyktw823L8WyyI/BbLgv4hlM1gubOq/DizMp9Ki6r8b5ckdjVrzv5NVbYtSON+/BBqJ+C6O7L/dUBFqgyXYv00Wh18r7+q/7RAy9h8/4L8W8t/TUc3rv4RM5DKx3wDAfvWIj94aBcBsc1IetODgv3oY0nYIW+y/oGcTFF54AUDkJqS/FKX6PwzNxsC7AOC/ltfN1PUC7L+5Wrz/zHnzP6688w2rNOc/YeV9neCo4b9nlSHXANfuvw9RsxKjY/s/1V8GteXE8j+1C8NdDcfiv2wlcW3YZO+/IOywaA7Q8b9bFP+4Tg36v4GTTeNZi+O/9t/ywdRi77+tRc3yFR7eP2bkcHXJkLO//ITc9SjT4r+qoBf2J0nwv2YHKoswwfm/iQcLspCjAcCb6wCzCvXkvwXv9rkMT/C/YkuwYAMXBMApCNUai9kIwMORhtNuJ+e/BVt01fKF8L+ZqWEfvIjsP6h693QZYNk/WyOTkB2i5b8of+GtdSDxvwpaaulDSwVADMQAX+lOAECEHWF8XNPmv1cr/B+VnvG/XyFG6opcCMD/mtR32/UEQP+2XEF3hui/ulBTjAt88r/imfCfRP+yP9zbvtc8XeO/TZuKJD5G6b/MaTExyXzyvxiTQeElXOO/rbJRQVGN9L/z0wR2g9DqvxOqKRxEX/O/FDGCEei99j9x8zV4VYTmP2lzCnsYk+u/l6ELZ9tg878pRXacaDT/v3k6GZRqoQXAVB67LiP56r94+LDK0Sn0vwO6pZ9b7wFAvK0nKVcc9j8+U/hCvyruv6QMsuuLQ/W/FPhKFYv46j8MyxaDTOW/v9L18g1caO2/vebfvctE9b/7GD8ZrF3xv3gx1AR9bQDAuMEtsM4c77+SabgA2nj0v5xKFIwxsATArKNSBaKsB0Cjara6ozTwv33ArMz7sfa/dF2U0FcWCcDxL357DJX/P69pJmt7c/G/quJYWJZl+L/YntVJlnrSP4sRLzXM+fe/46uU8w3c8r+q4lhYlmX4v85lu5+QRwRAsI0H/WU8479jaeZNtj/zv6riWFiWZfi/sI0H/WU847/OZbufkEcEQHAoPUBrnss/9exKzDtFtT88wM8kax+gP9OqeKeAYog/MW0ItiZvcj+ph+smvt5bP2lCaV5dEUU/StaUmQDaLz+kK9y22BMYP0O3whZuMwI/IIbgZGWE6z7UkjYaEM3UPuezxwa9cr8+LybxRMnFpz6E1N8DbPiRPsYjySMvK3s+//////8fAAj//////zMQCP////9/MiAI/////28yMAj/////YzJACP///z9iMlAI////N2IyYAj///8zYjJwCP//vzNiMoAI//+rM2IykAj/f6szYjKgCP8PqzNiMrAI/wOrM2IywAi/A6szYjLQCJ8DqzNiMuAImQOrM2Iy8Aj//////z8PCP//////Kx8I/////38pLwj/////Pyk/CP////85KU8I////PzgpXwj///8POClvCP///w44KX8I//8fDjgpjwj//w8OOCmfCP9/DQ44Ka8I/w8NDjgpvwj/DQ0OOCnPCP8MDQ44Kd8IxwwNDjgp7wjEDA0OOCn/CAcAAAAHAAAAAQAAAAIAAAAEAAAAAwAAAAAAAAAAAAAABwAAAAMAAAABAAAAAgAAAAUAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAACAAAAAQAAAAMAAAAOAAAABgAAAAsAAAACAAAABwAAAAEAAAAYAAAABQAAAAoAAAABAAAABgAAAAAAAAAmAAAABwAAAAwAAAADAAAACAAAAAIAAAAxAAAACQAAAA4AAAAAAAAABQAAAAQAAAA6AAAACAAAAA0AAAAEAAAACQAAAAMAAAA/AAAACwAAAAYAAAAPAAAACgAAABAAAABIAAAADAAAAAcAAAAQAAAACwAAABEAAABTAAAACgAAAAUAAAATAAAADgAAAA8AAABhAAAADQAAAAgAAAARAAAADAAAABIAAABrAAAADgAAAAkAAAASAAAADQAAABMAAAB1AAAADwAAABMAAAARAAAAEgAAABAAAAAGAAAAAgAAAAMAAAAFAAAABAAAAAAAAAAAAAAAAAAAAAYAAAACAAAAAwAAAAEAAAAFAAAABAAAAAAAAAAAAAAABwAAAAUAAAADAAAABAAAAAEAAAAAAAAAAgAAAAAAAAACAAAAAwAAAAEAAAAFAAAABAAAAAYAAAAAAAAAAAAAABgtRFT7Ifk/GC1EVPsh+b8YLURU+yEJQBgtRFT7IQnAYWxnb3MuYwBoM05laWdoYm9yUm90YXRpb25zAGNvb3JkaWprLmMAX3VwQXA3Q2hlY2tlZABfdXBBcDdyQ2hlY2tlZABkaXJlY3RlZEVkZ2UuYwBkaXJlY3RlZEVkZ2VUb0JvdW5kYXJ5AGFkamFjZW50RmFjZURpclt0bXBGaWprLmZhY2VdW2ZpamsuZmFjZV0gPT0gS0kAZmFjZWlqay5jAF9mYWNlSWprUGVudFRvQ2VsbEJvdW5kYXJ5AGFkamFjZW50RmFjZURpcltjZW50ZXJJSksuZmFjZV1bZmFjZTJdID09IEtJAF9mYWNlSWprVG9DZWxsQm91bmRhcnkAaDNJbmRleC5jAGNvbXBhY3RDZWxscwBsYXRMbmdUb0NlbGwAY2VsbFRvQ2hpbGRQb3MAdmFsaWRhdGVDaGlsZFBvcwBsYXRMbmcuYwBjZWxsQXJlYVJhZHMyAHBvbHlnb24tPm5leHQgPT0gTlVMTABsaW5rZWRHZW8uYwBhZGROZXdMaW5rZWRQb2x5Z29uAG5leHQgIT0gTlVMTABsb29wICE9IE5VTEwAYWRkTmV3TGlua2VkTG9vcABwb2x5Z29uLT5maXJzdCA9PSBOVUxMAGFkZExpbmtlZExvb3AAY29vcmQgIT0gTlVMTABhZGRMaW5rZWRDb29yZABsb29wLT5maXJzdCA9PSBOVUxMAGlubmVyTG9vcHMgIT0gTlVMTABub3JtYWxpemVNdWx0aVBvbHlnb24AYmJveGVzICE9IE5VTEwAY2FuZGlkYXRlcyAhPSBOVUxMAGZpbmRQb2x5Z29uRm9ySG9sZQBjYW5kaWRhdGVCQm94ZXMgIT0gTlVMTAByZXZEaXIgIT0gSU5WQUxJRF9ESUdJVABsb2NhbGlqLmMAY2VsbFRvTG9jYWxJamsAYmFzZUNlbGwgIT0gb3JpZ2luQmFzZUNlbGwAIShvcmlnaW5PblBlbnQgJiYgaW5kZXhPblBlbnQpAGJhc2VDZWxsID09IG9yaWdpbkJhc2VDZWxsAGJhc2VDZWxsICE9IElOVkFMSURfQkFTRV9DRUxMAGxvY2FsSWprVG9DZWxsACFfaXNCYXNlQ2VsbFBlbnRhZ29uKGJhc2VDZWxsKQBiYXNlQ2VsbFJvdGF0aW9ucyA+PSAwAGdyaWRQYXRoQ2VsbHMAcG9seWZpbGwuYwBpdGVyU3RlcFBvbHlnb25Db21wYWN0ADAAdmVydGV4LmMAdmVydGV4Um90YXRpb25zAGNlbGxUb1ZlcnRleABncmFwaC0+YnVja2V0cyAhPSBOVUxMAHZlcnRleEdyYXBoLmMAaW5pdFZlcnRleEdyYXBoAG5vZGUgIT0gTlVMTABhZGRWZXJ0ZXhOb2Rl";
      var tempDoublePtr = 28640;
      function demangle(func) {
        return func;
      }
      __name(demangle, "demangle");
      function demangleAll(text) {
        var regex = /\b__Z[\w\d_]+/g;
        return text.replace(regex, function(x) {
          var y = demangle(x);
          return x === y ? x : y + " [" + x + "]";
        });
      }
      __name(demangleAll, "demangleAll");
      function jsStackTrace() {
        var err2 = new Error();
        if (!err2.stack) {
          try {
            throw new Error(0);
          } catch (e) {
            err2 = e;
          }
          if (!err2.stack) {
            return "(no stack trace available)";
          }
        }
        return err2.stack.toString();
      }
      __name(jsStackTrace, "jsStackTrace");
      function stackTrace() {
        var js = jsStackTrace();
        if (Module["extraStackTrace"]) {
          js += "\n" + Module["extraStackTrace"]();
        }
        return demangleAll(js);
      }
      __name(stackTrace, "stackTrace");
      function ___assert_fail(condition, filename, line, func) {
        abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
      }
      __name(___assert_fail, "___assert_fail");
      function _emscripten_get_heap_size() {
        return HEAP8.length;
      }
      __name(_emscripten_get_heap_size, "_emscripten_get_heap_size");
      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
      }
      __name(_emscripten_memcpy_big, "_emscripten_memcpy_big");
      function ___setErrNo(value) {
        if (Module["___errno_location"]) {
          HEAP32[Module["___errno_location"]() >> 2] = value;
        }
        return value;
      }
      __name(___setErrNo, "___setErrNo");
      function abortOnCannotGrowMemory(requestedSize) {
        abort("OOM");
      }
      __name(abortOnCannotGrowMemory, "abortOnCannotGrowMemory");
      function emscripten_realloc_buffer(size) {
        try {
          var newBuffer = new ArrayBuffer(size);
          if (newBuffer.byteLength != size) {
            return;
          }
          new Int8Array(newBuffer).set(HEAP8);
          _emscripten_replace_memory(newBuffer);
          updateGlobalBufferAndViews(newBuffer);
          return 1;
        } catch (e) {
        }
      }
      __name(emscripten_realloc_buffer, "emscripten_realloc_buffer");
      function _emscripten_resize_heap(requestedSize) {
        var oldSize = _emscripten_get_heap_size();
        var PAGE_MULTIPLE = 16777216;
        var LIMIT = 2147483648 - PAGE_MULTIPLE;
        if (requestedSize > LIMIT) {
          return false;
        }
        var MIN_TOTAL_MEMORY = 16777216;
        var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
        while (newSize < requestedSize) {
          if (newSize <= 536870912) {
            newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
          } else {
            newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
          }
        }
        var replacement = emscripten_realloc_buffer(newSize);
        if (!replacement) {
          return false;
        }
        return true;
      }
      __name(_emscripten_resize_heap, "_emscripten_resize_heap");
      var decodeBase642 = typeof atob === "function" ? atob : function(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
          }
        } while (i < input.length);
        return output;
      };
      function intArrayFromBase64(s) {
        try {
          var decoded = decodeBase642(s);
          var bytes = new Uint8Array(decoded.length);
          for (var i = 0; i < decoded.length; ++i) {
            bytes[i] = decoded.charCodeAt(i);
          }
          return bytes;
        } catch (_) {
          throw new Error("Converting base64 string to bytes failed.");
        }
      }
      __name(intArrayFromBase64, "intArrayFromBase64");
      function tryParseAsDataURI(filename) {
        if (!isDataURI(filename)) {
          return;
        }
        return intArrayFromBase64(filename.slice(dataURIPrefix.length));
      }
      __name(tryParseAsDataURI, "tryParseAsDataURI");
      var asmGlobalArg = {
        "Math": Math,
        "Int8Array": Int8Array,
        "Int32Array": Int32Array,
        "Uint8Array": Uint8Array,
        "Float32Array": Float32Array,
        "Float64Array": Float64Array
      };
      var asmLibraryArg = {
        "a": abort,
        "b": setTempRet0,
        "c": getTempRet0,
        "d": ___assert_fail,
        "e": ___setErrNo,
        "f": _emscripten_get_heap_size,
        "g": _emscripten_memcpy_big,
        "h": _emscripten_resize_heap,
        "i": abortOnCannotGrowMemory,
        "j": demangle,
        "k": demangleAll,
        "l": emscripten_realloc_buffer,
        "m": jsStackTrace,
        "n": stackTrace,
        "o": tempDoublePtr,
        "p": DYNAMICTOP_PTR
      };
      var asm = (
        /** @suppress {uselessCode} */
        (function(global, env, buffer2) {
          "almost asm";
          var a = new global.Int8Array(buffer2), b = new global.Int32Array(buffer2), c = new global.Uint8Array(buffer2), d = new global.Float32Array(buffer2), e = new global.Float64Array(buffer2), f = env.o | 0, g = env.p | 0, p = global.Math.floor, q = global.Math.abs, r = global.Math.sqrt, s = global.Math.pow, t = global.Math.cos, u = global.Math.sin, v = global.Math.tan, w = global.Math.acos, x = global.Math.asin, y = global.Math.atan, z = global.Math.atan2, A = global.Math.ceil, B = global.Math.imul, C = global.Math.min, D = global.Math.max, E = global.Math.clz32, G = env.b, H = env.c, I = env.d, J = env.e, K = env.f, L = env.g, M = env.h, N = env.i, T = 28656;
          function W(newBuffer) {
            a = new Int8Array(newBuffer);
            c = new Uint8Array(newBuffer);
            b = new Int32Array(newBuffer);
            d = new Float32Array(newBuffer);
            e = new Float64Array(newBuffer);
            buffer2 = newBuffer;
            return true;
          }
          __name(W, "W");
          function X(a2) {
            a2 = a2 | 0;
            var b2 = 0;
            b2 = T;
            T = T + a2 | 0;
            T = T + 15 & -16;
            return b2 | 0;
          }
          __name(X, "X");
          function Y() {
            return T | 0;
          }
          __name(Y, "Y");
          function Z(a2) {
            a2 = a2 | 0;
            T = a2;
          }
          __name(Z, "Z");
          function _(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            T = a2;
          }
          __name(_, "_");
          function $(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0;
            if ((a2 | 0) < 0) {
              c2 = 2;
              return c2 | 0;
            }
            if ((a2 | 0) > 13780509) {
              c2 = xc(15, c2) | 0;
              return c2 | 0;
            } else {
              d2 = ((a2 | 0) < 0) << 31 >> 31;
              f2 = Pd(a2 | 0, d2 | 0, 3, 0) | 0;
              e2 = H() | 0;
              d2 = Jd(a2 | 0, d2 | 0, 1, 0) | 0;
              d2 = Pd(f2 | 0, e2 | 0, d2 | 0, H() | 0) | 0;
              d2 = Jd(d2 | 0, H() | 0, 1, 0) | 0;
              a2 = H() | 0;
              b[c2 >> 2] = d2;
              b[c2 + 4 >> 2] = a2;
              c2 = 0;
              return c2 | 0;
            }
            return 0;
          }
          __name($, "$");
          function aa(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            return ba(a2, b2, c2, d2, 0) | 0;
          }
          __name(aa, "aa");
          function ba(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0;
            j = T;
            T = T + 16 | 0;
            h = j;
            if (!(ca(a2, c2, d2, e2, f2) | 0)) {
              e2 = 0;
              T = j;
              return e2 | 0;
            }
            do {
              if ((d2 | 0) >= 0) {
                if ((d2 | 0) > 13780509) {
                  g2 = xc(15, h) | 0;
                  if (g2 | 0) {
                    break;
                  }
                  i = h;
                  h = b[i >> 2] | 0;
                  i = b[i + 4 >> 2] | 0;
                } else {
                  g2 = ((d2 | 0) < 0) << 31 >> 31;
                  k = Pd(d2 | 0, g2 | 0, 3, 0) | 0;
                  i = H() | 0;
                  g2 = Jd(d2 | 0, g2 | 0, 1, 0) | 0;
                  g2 = Pd(k | 0, i | 0, g2 | 0, H() | 0) | 0;
                  g2 = Jd(g2 | 0, H() | 0, 1, 0) | 0;
                  i = H() | 0;
                  b[h >> 2] = g2;
                  b[h + 4 >> 2] = i;
                  h = g2;
                }
                _d(e2 | 0, 0, h << 3 | 0) | 0;
                if (f2 | 0) {
                  _d(f2 | 0, 0, h << 2 | 0) | 0;
                  g2 = da(a2, c2, d2, e2, f2, h, i, 0) | 0;
                  break;
                }
                g2 = Id(h, 4) | 0;
                if (!g2) {
                  g2 = 13;
                } else {
                  k = da(a2, c2, d2, e2, g2, h, i, 0) | 0;
                  Hd(g2);
                  g2 = k;
                }
              } else {
                g2 = 2;
              }
            } while (0);
            k = g2;
            T = j;
            return k | 0;
          }
          __name(ba, "ba");
          function ca(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0;
            q2 = T;
            T = T + 16 | 0;
            o = q2;
            p2 = q2 + 8 | 0;
            n = o;
            b[n >> 2] = a2;
            b[n + 4 >> 2] = c2;
            if ((d2 | 0) < 0) {
              p2 = 2;
              T = q2;
              return p2 | 0;
            }
            g2 = e2;
            b[g2 >> 2] = a2;
            b[g2 + 4 >> 2] = c2;
            g2 = (f2 | 0) != 0;
            if (g2) {
              b[f2 >> 2] = 0;
            }
            if (Kb(a2, c2) | 0) {
              p2 = 9;
              T = q2;
              return p2 | 0;
            }
            b[p2 >> 2] = 0;
            a: do {
              if ((d2 | 0) >= 1) {
                if (g2) {
                  l = 1;
                  k = 0;
                  m = 0;
                  n = 1;
                  g2 = a2;
                  while (1) {
                    if (!(k | m)) {
                      g2 = ea(g2, c2, 4, p2, o) | 0;
                      if (g2 | 0) {
                        break a;
                      }
                      c2 = o;
                      g2 = b[c2 >> 2] | 0;
                      c2 = b[c2 + 4 >> 2] | 0;
                      if (Kb(g2, c2) | 0) {
                        g2 = 9;
                        break a;
                      }
                    }
                    g2 = ea(g2, c2, b[26800 + (m << 2) >> 2] | 0, p2, o) | 0;
                    if (g2 | 0) {
                      break a;
                    }
                    c2 = o;
                    g2 = b[c2 >> 2] | 0;
                    c2 = b[c2 + 4 >> 2] | 0;
                    a2 = e2 + (l << 3) | 0;
                    b[a2 >> 2] = g2;
                    b[a2 + 4 >> 2] = c2;
                    b[f2 + (l << 2) >> 2] = n;
                    a2 = k + 1 | 0;
                    h = (a2 | 0) == (n | 0);
                    i = m + 1 | 0;
                    j = (i | 0) == 6;
                    if (Kb(g2, c2) | 0) {
                      g2 = 9;
                      break a;
                    }
                    n = n + (j & h & 1) | 0;
                    if ((n | 0) > (d2 | 0)) {
                      g2 = 0;
                      break;
                    } else {
                      l = l + 1 | 0;
                      k = h ? 0 : a2;
                      m = h ? j ? 0 : i : m;
                    }
                  }
                } else {
                  l = 1;
                  k = 0;
                  m = 0;
                  n = 1;
                  g2 = a2;
                  while (1) {
                    if (!(k | m)) {
                      g2 = ea(g2, c2, 4, p2, o) | 0;
                      if (g2 | 0) {
                        break a;
                      }
                      c2 = o;
                      g2 = b[c2 >> 2] | 0;
                      c2 = b[c2 + 4 >> 2] | 0;
                      if (Kb(g2, c2) | 0) {
                        g2 = 9;
                        break a;
                      }
                    }
                    g2 = ea(g2, c2, b[26800 + (m << 2) >> 2] | 0, p2, o) | 0;
                    if (g2 | 0) {
                      break a;
                    }
                    c2 = o;
                    g2 = b[c2 >> 2] | 0;
                    c2 = b[c2 + 4 >> 2] | 0;
                    a2 = e2 + (l << 3) | 0;
                    b[a2 >> 2] = g2;
                    b[a2 + 4 >> 2] = c2;
                    a2 = k + 1 | 0;
                    h = (a2 | 0) == (n | 0);
                    i = m + 1 | 0;
                    j = (i | 0) == 6;
                    if (Kb(g2, c2) | 0) {
                      g2 = 9;
                      break a;
                    }
                    n = n + (j & h & 1) | 0;
                    if ((n | 0) > (d2 | 0)) {
                      g2 = 0;
                      break;
                    } else {
                      l = l + 1 | 0;
                      k = h ? 0 : a2;
                      m = h ? j ? 0 : i : m;
                    }
                  }
                }
              } else {
                g2 = 0;
              }
            } while (0);
            p2 = g2;
            T = q2;
            return p2 | 0;
          }
          __name(ca, "ca");
          function da(a2, c2, d2, e2, f2, g2, h, i) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            h = h | 0;
            i = i | 0;
            var j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0;
            q2 = T;
            T = T + 16 | 0;
            o = q2 + 8 | 0;
            p2 = q2;
            j = Rd(a2 | 0, c2 | 0, g2 | 0, h | 0) | 0;
            l = H() | 0;
            m = e2 + (j << 3) | 0;
            r2 = m;
            s2 = b[r2 >> 2] | 0;
            r2 = b[r2 + 4 >> 2] | 0;
            k = (s2 | 0) == (a2 | 0) & (r2 | 0) == (c2 | 0);
            if (!((s2 | 0) == 0 & (r2 | 0) == 0 | k)) {
              do {
                j = Jd(j | 0, l | 0, 1, 0) | 0;
                j = Qd(j | 0, H() | 0, g2 | 0, h | 0) | 0;
                l = H() | 0;
                m = e2 + (j << 3) | 0;
                s2 = m;
                r2 = b[s2 >> 2] | 0;
                s2 = b[s2 + 4 >> 2] | 0;
                k = (r2 | 0) == (a2 | 0) & (s2 | 0) == (c2 | 0);
              } while (!((r2 | 0) == 0 & (s2 | 0) == 0 | k));
            }
            j = f2 + (j << 2) | 0;
            if (k ? (b[j >> 2] | 0) <= (i | 0) : 0) {
              s2 = 0;
              T = q2;
              return s2 | 0;
            }
            s2 = m;
            b[s2 >> 2] = a2;
            b[s2 + 4 >> 2] = c2;
            b[j >> 2] = i;
            if ((i | 0) >= (d2 | 0)) {
              s2 = 0;
              T = q2;
              return s2 | 0;
            }
            k = i + 1 | 0;
            b[o >> 2] = 0;
            j = ea(a2, c2, 2, o, p2) | 0;
            switch (j | 0) {
              case 9: {
                n = 9;
                break;
              }
              case 0: {
                j = p2;
                j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                if (!j) {
                  n = 9;
                }
                break;
              }
              default:
            }
            a: do {
              if ((n | 0) == 9) {
                b[o >> 2] = 0;
                j = ea(a2, c2, 3, o, p2) | 0;
                switch (j | 0) {
                  case 9:
                    break;
                  case 0: {
                    j = p2;
                    j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                    if (j | 0) {
                      break a;
                    }
                    break;
                  }
                  default:
                    break a;
                }
                b[o >> 2] = 0;
                j = ea(a2, c2, 1, o, p2) | 0;
                switch (j | 0) {
                  case 9:
                    break;
                  case 0: {
                    j = p2;
                    j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                    if (j | 0) {
                      break a;
                    }
                    break;
                  }
                  default:
                    break a;
                }
                b[o >> 2] = 0;
                j = ea(a2, c2, 5, o, p2) | 0;
                switch (j | 0) {
                  case 9:
                    break;
                  case 0: {
                    j = p2;
                    j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                    if (j | 0) {
                      break a;
                    }
                    break;
                  }
                  default:
                    break a;
                }
                b[o >> 2] = 0;
                j = ea(a2, c2, 4, o, p2) | 0;
                switch (j | 0) {
                  case 9:
                    break;
                  case 0: {
                    j = p2;
                    j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                    if (j | 0) {
                      break a;
                    }
                    break;
                  }
                  default:
                    break a;
                }
                b[o >> 2] = 0;
                j = ea(a2, c2, 6, o, p2) | 0;
                switch (j | 0) {
                  case 9:
                    break;
                  case 0: {
                    j = p2;
                    j = da(b[j >> 2] | 0, b[j + 4 >> 2] | 0, d2, e2, f2, g2, h, k) | 0;
                    if (j | 0) {
                      break a;
                    }
                    break;
                  }
                  default:
                    break a;
                }
                s2 = 0;
                T = q2;
                return s2 | 0;
              }
            } while (0);
            s2 = j;
            T = q2;
            return s2 | 0;
          }
          __name(da, "da");
          function ea(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0;
            if (d2 >>> 0 > 6) {
              f2 = 1;
              return f2 | 0;
            }
            m = (b[e2 >> 2] | 0) % 6 | 0;
            b[e2 >> 2] = m;
            if ((m | 0) > 0) {
              g2 = 0;
              do {
                d2 = $a(d2) | 0;
                g2 = g2 + 1 | 0;
              } while ((g2 | 0) < (b[e2 >> 2] | 0));
            }
            m = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            l = m & 127;
            if (l >>> 0 > 121) {
              f2 = 5;
              return f2 | 0;
            }
            j = Sb(a2, c2) | 0;
            g2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            g2 = g2 & 15;
            a: do {
              if (!g2) {
                k = 8;
              } else {
                while (1) {
                  h = (15 - g2 | 0) * 3 | 0;
                  i = Td(a2 | 0, c2 | 0, h | 0) | 0;
                  H() | 0;
                  i = i & 7;
                  if ((i | 0) == 7) {
                    c2 = 5;
                    break;
                  }
                  p2 = (Yb(g2) | 0) == 0;
                  g2 = g2 + -1 | 0;
                  n = Ud(7, 0, h | 0) | 0;
                  c2 = c2 & ~(H() | 0);
                  o = Ud(b[(p2 ? 432 : 16) + (i * 28 | 0) + (d2 << 2) >> 2] | 0, 0, h | 0) | 0;
                  h = H() | 0;
                  d2 = b[(p2 ? 640 : 224) + (i * 28 | 0) + (d2 << 2) >> 2] | 0;
                  a2 = o | a2 & ~n;
                  c2 = h | c2;
                  if (!d2) {
                    d2 = 0;
                    break a;
                  }
                  if (!g2) {
                    k = 8;
                    break a;
                  }
                }
                return c2 | 0;
              }
            } while (0);
            if ((k | 0) == 8) {
              p2 = b[848 + (l * 28 | 0) + (d2 << 2) >> 2] | 0;
              o = Ud(p2 | 0, 0, 45) | 0;
              a2 = o | a2;
              c2 = H() | 0 | c2 & -1040385;
              d2 = b[4272 + (l * 28 | 0) + (d2 << 2) >> 2] | 0;
              if ((p2 & 127 | 0) == 127) {
                p2 = Ud(b[848 + (l * 28 | 0) + 20 >> 2] | 0, 0, 45) | 0;
                c2 = H() | 0 | c2 & -1040385;
                d2 = b[4272 + (l * 28 | 0) + 20 >> 2] | 0;
                a2 = Ub(p2 | a2, c2) | 0;
                c2 = H() | 0;
                b[e2 >> 2] = (b[e2 >> 2] | 0) + 1;
              }
            }
            i = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            i = i & 127;
            b: do {
              if (!(oa(i) | 0)) {
                if ((d2 | 0) > 0) {
                  g2 = 0;
                  do {
                    a2 = Ub(a2, c2) | 0;
                    c2 = H() | 0;
                    g2 = g2 + 1 | 0;
                  } while ((g2 | 0) != (d2 | 0));
                }
              } else {
                c: do {
                  if ((Sb(a2, c2) | 0) == 1) {
                    if ((l | 0) != (i | 0)) {
                      if (ua(i, b[7696 + (l * 28 | 0) >> 2] | 0) | 0) {
                        a2 = Wb(a2, c2) | 0;
                        h = 1;
                        c2 = H() | 0;
                        break;
                      } else {
                        I(27795, 26864, 533, 26872);
                      }
                    }
                    switch (j | 0) {
                      case 3: {
                        a2 = Ub(a2, c2) | 0;
                        c2 = H() | 0;
                        b[e2 >> 2] = (b[e2 >> 2] | 0) + 1;
                        h = 0;
                        break c;
                      }
                      case 5: {
                        a2 = Wb(a2, c2) | 0;
                        c2 = H() | 0;
                        b[e2 >> 2] = (b[e2 >> 2] | 0) + 5;
                        h = 0;
                        break c;
                      }
                      case 0: {
                        p2 = 9;
                        return p2 | 0;
                      }
                      default: {
                        p2 = 1;
                        return p2 | 0;
                      }
                    }
                  } else {
                    h = 0;
                  }
                } while (0);
                if ((d2 | 0) > 0) {
                  g2 = 0;
                  do {
                    a2 = Tb(a2, c2) | 0;
                    c2 = H() | 0;
                    g2 = g2 + 1 | 0;
                  } while ((g2 | 0) != (d2 | 0));
                }
                if ((l | 0) != (i | 0)) {
                  if (!(pa(i) | 0)) {
                    if ((h | 0) != 0 | (Sb(a2, c2) | 0) != 5) {
                      break;
                    }
                    b[e2 >> 2] = (b[e2 >> 2] | 0) + 1;
                    break;
                  }
                  switch (m & 127) {
                    case 8:
                    case 118:
                      break b;
                    default:
                  }
                  if ((Sb(a2, c2) | 0) != 3) {
                    b[e2 >> 2] = (b[e2 >> 2] | 0) + 1;
                  }
                }
              }
            } while (0);
            b[e2 >> 2] = ((b[e2 >> 2] | 0) + d2 | 0) % 6 | 0;
            p2 = f2;
            b[p2 >> 2] = a2;
            b[p2 + 4 >> 2] = c2;
            p2 = 0;
            return p2 | 0;
          }
          __name(ea, "ea");
          function fa(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            if (!(ga(a2, b2, c2, d2) | 0)) {
              d2 = 0;
              return d2 | 0;
            }
            _d(d2 | 0, 0, c2 * 48 | 0) | 0;
            d2 = ha(a2, b2, c2, d2) | 0;
            return d2 | 0;
          }
          __name(fa, "fa");
          function ga(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0;
            p2 = T;
            T = T + 16 | 0;
            n = p2;
            o = p2 + 8 | 0;
            m = n;
            b[m >> 2] = a2;
            b[m + 4 >> 2] = c2;
            if ((d2 | 0) < 0) {
              o = 2;
              T = p2;
              return o | 0;
            }
            if (!d2) {
              o = e2;
              b[o >> 2] = a2;
              b[o + 4 >> 2] = c2;
              o = 0;
              T = p2;
              return o | 0;
            }
            b[o >> 2] = 0;
            a: do {
              if (!(Kb(a2, c2) | 0)) {
                f2 = 0;
                m = a2;
                do {
                  a2 = ea(m, c2, 4, o, n) | 0;
                  if (a2 | 0) {
                    break a;
                  }
                  c2 = n;
                  m = b[c2 >> 2] | 0;
                  c2 = b[c2 + 4 >> 2] | 0;
                  f2 = f2 + 1 | 0;
                  if (Kb(m, c2) | 0) {
                    a2 = 9;
                    break a;
                  }
                } while ((f2 | 0) < (d2 | 0));
                l = e2;
                b[l >> 2] = m;
                b[l + 4 >> 2] = c2;
                l = d2 + -1 | 0;
                k = 0;
                a2 = 1;
                do {
                  f2 = 26800 + (k << 2) | 0;
                  if ((k | 0) == 5) {
                    h = b[f2 >> 2] | 0;
                    g2 = 0;
                    f2 = a2;
                    while (1) {
                      a2 = n;
                      a2 = ea(b[a2 >> 2] | 0, b[a2 + 4 >> 2] | 0, h, o, n) | 0;
                      if (a2 | 0) {
                        break a;
                      }
                      if ((g2 | 0) != (l | 0)) {
                        j = n;
                        i = b[j >> 2] | 0;
                        j = b[j + 4 >> 2] | 0;
                        a2 = e2 + (f2 << 3) | 0;
                        b[a2 >> 2] = i;
                        b[a2 + 4 >> 2] = j;
                        if (!(Kb(i, j) | 0)) {
                          a2 = f2 + 1 | 0;
                        } else {
                          a2 = 9;
                          break a;
                        }
                      } else {
                        a2 = f2;
                      }
                      g2 = g2 + 1 | 0;
                      if ((g2 | 0) >= (d2 | 0)) {
                        break;
                      } else {
                        f2 = a2;
                      }
                    }
                  } else {
                    h = n;
                    j = b[f2 >> 2] | 0;
                    i = 0;
                    f2 = a2;
                    g2 = b[h >> 2] | 0;
                    h = b[h + 4 >> 2] | 0;
                    while (1) {
                      a2 = ea(g2, h, j, o, n) | 0;
                      if (a2 | 0) {
                        break a;
                      }
                      h = n;
                      g2 = b[h >> 2] | 0;
                      h = b[h + 4 >> 2] | 0;
                      a2 = e2 + (f2 << 3) | 0;
                      b[a2 >> 2] = g2;
                      b[a2 + 4 >> 2] = h;
                      a2 = f2 + 1 | 0;
                      if (Kb(g2, h) | 0) {
                        a2 = 9;
                        break a;
                      }
                      i = i + 1 | 0;
                      if ((i | 0) >= (d2 | 0)) {
                        break;
                      } else {
                        f2 = a2;
                      }
                    }
                  }
                  k = k + 1 | 0;
                } while (k >>> 0 < 6);
                a2 = n;
                a2 = ((m | 0) == (b[a2 >> 2] | 0) ? (c2 | 0) == (b[a2 + 4 >> 2] | 0) : 0) ? 0 : 9;
              } else {
                a2 = 9;
              }
            } while (0);
            o = a2;
            T = p2;
            return o | 0;
          }
          __name(ga, "ga");
          function ha(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
            m = T;
            T = T + 16 | 0;
            h = m;
            if (!d2) {
              b[e2 >> 2] = a2;
              b[e2 + 4 >> 2] = c2;
              e2 = 0;
              T = m;
              return e2 | 0;
            }
            do {
              if ((d2 | 0) >= 0) {
                if ((d2 | 0) > 13780509) {
                  f2 = xc(15, h) | 0;
                  if (f2 | 0) {
                    break;
                  }
                  g2 = h;
                  f2 = b[g2 >> 2] | 0;
                  g2 = b[g2 + 4 >> 2] | 0;
                } else {
                  f2 = ((d2 | 0) < 0) << 31 >> 31;
                  l = Pd(d2 | 0, f2 | 0, 3, 0) | 0;
                  g2 = H() | 0;
                  f2 = Jd(d2 | 0, f2 | 0, 1, 0) | 0;
                  f2 = Pd(l | 0, g2 | 0, f2 | 0, H() | 0) | 0;
                  f2 = Jd(f2 | 0, H() | 0, 1, 0) | 0;
                  g2 = H() | 0;
                  l = h;
                  b[l >> 2] = f2;
                  b[l + 4 >> 2] = g2;
                }
                k = Id(f2, 8) | 0;
                if (!k) {
                  f2 = 13;
                } else {
                  l = Id(f2, 4) | 0;
                  if (!l) {
                    Hd(k);
                    f2 = 13;
                    break;
                  }
                  f2 = da(a2, c2, d2, k, l, f2, g2, 0) | 0;
                  if (f2 | 0) {
                    Hd(k);
                    Hd(l);
                    break;
                  }
                  c2 = b[h >> 2] | 0;
                  h = b[h + 4 >> 2] | 0;
                  if ((h | 0) > 0 | (h | 0) == 0 & c2 >>> 0 > 0) {
                    f2 = 0;
                    i = 0;
                    j = 0;
                    do {
                      a2 = k + (i << 3) | 0;
                      g2 = b[a2 >> 2] | 0;
                      a2 = b[a2 + 4 >> 2] | 0;
                      if (!((g2 | 0) == 0 & (a2 | 0) == 0) ? (b[l + (i << 2) >> 2] | 0) == (d2 | 0) : 0) {
                        n = e2 + (f2 << 3) | 0;
                        b[n >> 2] = g2;
                        b[n + 4 >> 2] = a2;
                        f2 = f2 + 1 | 0;
                      }
                      i = Jd(i | 0, j | 0, 1, 0) | 0;
                      j = H() | 0;
                    } while ((j | 0) < (h | 0) | (j | 0) == (h | 0) & i >>> 0 < c2 >>> 0);
                  }
                  Hd(k);
                  Hd(l);
                  f2 = 0;
                }
              } else {
                f2 = 2;
              }
            } while (0);
            n = f2;
            T = m;
            return n | 0;
          }
          __name(ha, "ha");
          function ia(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0;
            i = T;
            T = T + 16 | 0;
            g2 = i;
            h = i + 8 | 0;
            f2 = (Kb(a2, c2) | 0) == 0;
            f2 = f2 ? 1 : 2;
            while (1) {
              b[h >> 2] = 0;
              k = (ea(a2, c2, f2, h, g2) | 0) == 0;
              j = g2;
              if (k & ((b[j >> 2] | 0) == (d2 | 0) ? (b[j + 4 >> 2] | 0) == (e2 | 0) : 0)) {
                a2 = 4;
                break;
              }
              f2 = f2 + 1 | 0;
              if (f2 >>> 0 >= 7) {
                f2 = 7;
                a2 = 4;
                break;
              }
            }
            if ((a2 | 0) == 4) {
              T = i;
              return f2 | 0;
            }
            return 0;
          }
          __name(ia, "ia");
          function ja(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0;
            i = T;
            T = T + 48 | 0;
            f2 = i + 16 | 0;
            g2 = i + 8 | 0;
            h = i;
            d2 = _c(d2) | 0;
            if (d2 | 0) {
              h = d2;
              T = i;
              return h | 0;
            }
            k = a2;
            j = b[k + 4 >> 2] | 0;
            d2 = g2;
            b[d2 >> 2] = b[k >> 2];
            b[d2 + 4 >> 2] = j;
            Zc(g2, f2);
            d2 = Ha(f2, c2, h) | 0;
            if (!d2) {
              c2 = b[g2 >> 2] | 0;
              g2 = b[a2 + 8 >> 2] | 0;
              if ((g2 | 0) > 0) {
                f2 = b[a2 + 12 >> 2] | 0;
                d2 = 0;
                do {
                  c2 = (b[f2 + (d2 << 3) >> 2] | 0) + c2 | 0;
                  d2 = d2 + 1 | 0;
                } while ((d2 | 0) < (g2 | 0));
              }
              d2 = h;
              f2 = b[d2 >> 2] | 0;
              d2 = b[d2 + 4 >> 2] | 0;
              g2 = ((c2 | 0) < 0) << 31 >> 31;
              if ((d2 | 0) < (g2 | 0) | (d2 | 0) == (g2 | 0) & f2 >>> 0 < c2 >>> 0) {
                d2 = h;
                b[d2 >> 2] = c2;
                b[d2 + 4 >> 2] = g2;
                d2 = g2;
              } else {
                c2 = f2;
              }
              j = Jd(c2 | 0, d2 | 0, 12, 0) | 0;
              k = H() | 0;
              d2 = h;
              b[d2 >> 2] = j;
              b[d2 + 4 >> 2] = k;
              d2 = e2;
              b[d2 >> 2] = j;
              b[d2 + 4 >> 2] = k;
              d2 = 0;
            }
            k = d2;
            T = i;
            return k | 0;
          }
          __name(ja, "ja");
          function ka(a2, c2, d2, f2, g2, h, i) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            h = h | 0;
            i = i | 0;
            var j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0, E2 = 0, F = 0, G2 = 0, I2 = 0, J2 = 0, K2 = 0, L2 = 0, M2 = 0;
            I2 = T;
            T = T + 64 | 0;
            D2 = I2 + 48 | 0;
            E2 = I2 + 32 | 0;
            F = I2 + 24 | 0;
            x2 = I2 + 8 | 0;
            y2 = I2;
            k = b[a2 >> 2] | 0;
            if ((k | 0) <= 0) {
              G2 = 0;
              T = I2;
              return G2 | 0;
            }
            z2 = a2 + 4 | 0;
            A2 = D2 + 8 | 0;
            B2 = E2 + 8 | 0;
            C2 = x2 + 8 | 0;
            j = 0;
            v2 = 0;
            while (1) {
              l = b[z2 >> 2] | 0;
              u2 = l + (v2 << 4) | 0;
              b[D2 >> 2] = b[u2 >> 2];
              b[D2 + 4 >> 2] = b[u2 + 4 >> 2];
              b[D2 + 8 >> 2] = b[u2 + 8 >> 2];
              b[D2 + 12 >> 2] = b[u2 + 12 >> 2];
              if ((v2 | 0) == (k + -1 | 0)) {
                b[E2 >> 2] = b[l >> 2];
                b[E2 + 4 >> 2] = b[l + 4 >> 2];
                b[E2 + 8 >> 2] = b[l + 8 >> 2];
                b[E2 + 12 >> 2] = b[l + 12 >> 2];
              } else {
                u2 = l + (v2 + 1 << 4) | 0;
                b[E2 >> 2] = b[u2 >> 2];
                b[E2 + 4 >> 2] = b[u2 + 4 >> 2];
                b[E2 + 8 >> 2] = b[u2 + 8 >> 2];
                b[E2 + 12 >> 2] = b[u2 + 12 >> 2];
              }
              k = Ia(D2, E2, f2, F) | 0;
              a: do {
                if (!k) {
                  k = F;
                  l = b[k >> 2] | 0;
                  k = b[k + 4 >> 2] | 0;
                  if ((k | 0) > 0 | (k | 0) == 0 & l >>> 0 > 0) {
                    t2 = 0;
                    u2 = 0;
                    b: while (1) {
                      K2 = 1 / (+(l >>> 0) + 4294967296 * +(k | 0));
                      M2 = +e[D2 >> 3];
                      k = Kd(l | 0, k | 0, t2 | 0, u2 | 0) | 0;
                      L2 = +(k >>> 0) + 4294967296 * +(H() | 0);
                      J2 = +(t2 >>> 0) + 4294967296 * +(u2 | 0);
                      e[x2 >> 3] = K2 * (M2 * L2) + K2 * (+e[E2 >> 3] * J2);
                      e[C2 >> 3] = K2 * (+e[A2 >> 3] * L2) + K2 * (+e[B2 >> 3] * J2);
                      k = Zb(x2, f2, y2) | 0;
                      if (k | 0) {
                        j = k;
                        break;
                      }
                      s2 = y2;
                      r2 = b[s2 >> 2] | 0;
                      s2 = b[s2 + 4 >> 2] | 0;
                      o = Rd(r2 | 0, s2 | 0, c2 | 0, d2 | 0) | 0;
                      m = H() | 0;
                      k = i + (o << 3) | 0;
                      n = k;
                      l = b[n >> 2] | 0;
                      n = b[n + 4 >> 2] | 0;
                      c: do {
                        if ((l | 0) == 0 & (n | 0) == 0) {
                          w2 = k;
                          G2 = 16;
                        } else {
                          p2 = 0;
                          q2 = 0;
                          while (1) {
                            if ((p2 | 0) > (d2 | 0) | (p2 | 0) == (d2 | 0) & q2 >>> 0 > c2 >>> 0) {
                              j = 1;
                              break b;
                            }
                            if ((l | 0) == (r2 | 0) & (n | 0) == (s2 | 0)) {
                              break c;
                            }
                            k = Jd(o | 0, m | 0, 1, 0) | 0;
                            o = Qd(k | 0, H() | 0, c2 | 0, d2 | 0) | 0;
                            m = H() | 0;
                            q2 = Jd(q2 | 0, p2 | 0, 1, 0) | 0;
                            p2 = H() | 0;
                            k = i + (o << 3) | 0;
                            n = k;
                            l = b[n >> 2] | 0;
                            n = b[n + 4 >> 2] | 0;
                            if ((l | 0) == 0 & (n | 0) == 0) {
                              w2 = k;
                              G2 = 16;
                              break;
                            }
                          }
                        }
                      } while (0);
                      if ((G2 | 0) == 16 ? (G2 = 0, !((r2 | 0) == 0 & (s2 | 0) == 0)) : 0) {
                        q2 = w2;
                        b[q2 >> 2] = r2;
                        b[q2 + 4 >> 2] = s2;
                        q2 = h + (b[g2 >> 2] << 3) | 0;
                        b[q2 >> 2] = r2;
                        b[q2 + 4 >> 2] = s2;
                        q2 = g2;
                        q2 = Jd(b[q2 >> 2] | 0, b[q2 + 4 >> 2] | 0, 1, 0) | 0;
                        r2 = H() | 0;
                        s2 = g2;
                        b[s2 >> 2] = q2;
                        b[s2 + 4 >> 2] = r2;
                      }
                      t2 = Jd(t2 | 0, u2 | 0, 1, 0) | 0;
                      u2 = H() | 0;
                      k = F;
                      l = b[k >> 2] | 0;
                      k = b[k + 4 >> 2] | 0;
                      if (!((k | 0) > (u2 | 0) | (k | 0) == (u2 | 0) & l >>> 0 > t2 >>> 0)) {
                        l = 1;
                        break a;
                      }
                    }
                    l = 0;
                  } else {
                    l = 1;
                  }
                } else {
                  l = 0;
                  j = k;
                }
              } while (0);
              v2 = v2 + 1 | 0;
              if (!l) {
                G2 = 21;
                break;
              }
              k = b[a2 >> 2] | 0;
              if ((v2 | 0) >= (k | 0)) {
                j = 0;
                G2 = 21;
                break;
              }
            }
            if ((G2 | 0) == 21) {
              T = I2;
              return j | 0;
            }
            return 0;
          }
          __name(ka, "ka");
          function la(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0, E2 = 0, F = 0, G2 = 0, I2 = 0, J2 = 0, K2 = 0;
            K2 = T;
            T = T + 112 | 0;
            F = K2 + 80 | 0;
            j = K2 + 72 | 0;
            G2 = K2;
            I2 = K2 + 56 | 0;
            f2 = _c(d2) | 0;
            if (f2 | 0) {
              J2 = f2;
              T = K2;
              return J2 | 0;
            }
            k = a2 + 8 | 0;
            J2 = Gd((b[k >> 2] << 5) + 32 | 0) | 0;
            if (!J2) {
              J2 = 13;
              T = K2;
              return J2 | 0;
            }
            $c(a2, J2);
            f2 = _c(d2) | 0;
            if (!f2) {
              D2 = a2;
              E2 = b[D2 + 4 >> 2] | 0;
              f2 = j;
              b[f2 >> 2] = b[D2 >> 2];
              b[f2 + 4 >> 2] = E2;
              Zc(j, F);
              f2 = Ha(F, c2, G2) | 0;
              if (!f2) {
                f2 = b[j >> 2] | 0;
                g2 = b[k >> 2] | 0;
                if ((g2 | 0) > 0) {
                  h = b[a2 + 12 >> 2] | 0;
                  d2 = 0;
                  do {
                    f2 = (b[h + (d2 << 3) >> 2] | 0) + f2 | 0;
                    d2 = d2 + 1 | 0;
                  } while ((d2 | 0) != (g2 | 0));
                  d2 = f2;
                } else {
                  d2 = f2;
                }
                f2 = G2;
                g2 = b[f2 >> 2] | 0;
                f2 = b[f2 + 4 >> 2] | 0;
                h = ((d2 | 0) < 0) << 31 >> 31;
                if ((f2 | 0) < (h | 0) | (f2 | 0) == (h | 0) & g2 >>> 0 < d2 >>> 0) {
                  f2 = G2;
                  b[f2 >> 2] = d2;
                  b[f2 + 4 >> 2] = h;
                  f2 = h;
                } else {
                  d2 = g2;
                }
                D2 = Jd(d2 | 0, f2 | 0, 12, 0) | 0;
                E2 = H() | 0;
                f2 = G2;
                b[f2 >> 2] = D2;
                b[f2 + 4 >> 2] = E2;
                f2 = 0;
              } else {
                D2 = 0;
                E2 = 0;
              }
              if (!f2) {
                d2 = Id(D2, 8) | 0;
                if (!d2) {
                  Hd(J2);
                  J2 = 13;
                  T = K2;
                  return J2 | 0;
                }
                i = Id(D2, 8) | 0;
                if (!i) {
                  Hd(J2);
                  Hd(d2);
                  J2 = 13;
                  T = K2;
                  return J2 | 0;
                }
                B2 = F;
                b[B2 >> 2] = 0;
                b[B2 + 4 >> 2] = 0;
                B2 = a2;
                C2 = b[B2 + 4 >> 2] | 0;
                f2 = j;
                b[f2 >> 2] = b[B2 >> 2];
                b[f2 + 4 >> 2] = C2;
                f2 = ka(j, D2, E2, c2, F, d2, i) | 0;
                a: do {
                  if (!f2) {
                    b: do {
                      if ((b[k >> 2] | 0) > 0) {
                        h = a2 + 12 | 0;
                        g2 = 0;
                        while (1) {
                          f2 = ka((b[h >> 2] | 0) + (g2 << 3) | 0, D2, E2, c2, F, d2, i) | 0;
                          g2 = g2 + 1 | 0;
                          if (f2 | 0) {
                            break;
                          }
                          if ((g2 | 0) >= (b[k >> 2] | 0)) {
                            break b;
                          }
                        }
                        Hd(d2);
                        Hd(i);
                        Hd(J2);
                        break a;
                      }
                    } while (0);
                    if ((E2 | 0) > 0 | (E2 | 0) == 0 & D2 >>> 0 > 0) {
                      _d(i | 0, 0, D2 << 3 | 0) | 0;
                    }
                    C2 = F;
                    B2 = b[C2 + 4 >> 2] | 0;
                    c: do {
                      if ((B2 | 0) > 0 | (B2 | 0) == 0 & (b[C2 >> 2] | 0) >>> 0 > 0) {
                        y2 = d2;
                        z2 = i;
                        A2 = d2;
                        B2 = i;
                        C2 = d2;
                        f2 = d2;
                        v2 = d2;
                        w2 = i;
                        x2 = i;
                        d2 = i;
                        d: while (1) {
                          r2 = 0;
                          s2 = 0;
                          t2 = 0;
                          u2 = 0;
                          g2 = 0;
                          h = 0;
                          while (1) {
                            i = G2;
                            j = i + 56 | 0;
                            do {
                              b[i >> 2] = 0;
                              i = i + 4 | 0;
                            } while ((i | 0) < (j | 0));
                            c2 = y2 + (r2 << 3) | 0;
                            k = b[c2 >> 2] | 0;
                            c2 = b[c2 + 4 >> 2] | 0;
                            if (ca(k, c2, 1, G2, 0) | 0) {
                              i = G2;
                              j = i + 56 | 0;
                              do {
                                b[i >> 2] = 0;
                                i = i + 4 | 0;
                              } while ((i | 0) < (j | 0));
                              i = Id(7, 4) | 0;
                              if (i | 0) {
                                da(k, c2, 1, G2, i, 7, 0, 0) | 0;
                                Hd(i);
                              }
                            }
                            q2 = 0;
                            while (1) {
                              p2 = G2 + (q2 << 3) | 0;
                              o = b[p2 >> 2] | 0;
                              p2 = b[p2 + 4 >> 2] | 0;
                              e: do {
                                if ((o | 0) == 0 & (p2 | 0) == 0) {
                                  i = g2;
                                  j = h;
                                } else {
                                  l = Rd(o | 0, p2 | 0, D2 | 0, E2 | 0) | 0;
                                  k = H() | 0;
                                  i = e2 + (l << 3) | 0;
                                  c2 = i;
                                  j = b[c2 >> 2] | 0;
                                  c2 = b[c2 + 4 >> 2] | 0;
                                  if (!((j | 0) == 0 & (c2 | 0) == 0)) {
                                    m = 0;
                                    n = 0;
                                    do {
                                      if ((m | 0) > (E2 | 0) | (m | 0) == (E2 | 0) & n >>> 0 > D2 >>> 0) {
                                        break d;
                                      }
                                      if ((j | 0) == (o | 0) & (c2 | 0) == (p2 | 0)) {
                                        i = g2;
                                        j = h;
                                        break e;
                                      }
                                      i = Jd(l | 0, k | 0, 1, 0) | 0;
                                      l = Qd(i | 0, H() | 0, D2 | 0, E2 | 0) | 0;
                                      k = H() | 0;
                                      n = Jd(n | 0, m | 0, 1, 0) | 0;
                                      m = H() | 0;
                                      i = e2 + (l << 3) | 0;
                                      c2 = i;
                                      j = b[c2 >> 2] | 0;
                                      c2 = b[c2 + 4 >> 2] | 0;
                                    } while (!((j | 0) == 0 & (c2 | 0) == 0));
                                  }
                                  if ((o | 0) == 0 & (p2 | 0) == 0) {
                                    i = g2;
                                    j = h;
                                    break;
                                  }
                                  ac(o, p2, I2) | 0;
                                  if (ad(a2, J2, I2) | 0) {
                                    n = Jd(g2 | 0, h | 0, 1, 0) | 0;
                                    h = H() | 0;
                                    m = i;
                                    b[m >> 2] = o;
                                    b[m + 4 >> 2] = p2;
                                    g2 = z2 + (g2 << 3) | 0;
                                    b[g2 >> 2] = o;
                                    b[g2 + 4 >> 2] = p2;
                                    g2 = n;
                                  }
                                  i = g2;
                                  j = h;
                                }
                              } while (0);
                              q2 = q2 + 1 | 0;
                              if (q2 >>> 0 >= 7) {
                                break;
                              } else {
                                g2 = i;
                                h = j;
                              }
                            }
                            r2 = Jd(r2 | 0, s2 | 0, 1, 0) | 0;
                            s2 = H() | 0;
                            t2 = Jd(t2 | 0, u2 | 0, 1, 0) | 0;
                            u2 = H() | 0;
                            h = F;
                            g2 = b[h >> 2] | 0;
                            h = b[h + 4 >> 2] | 0;
                            if (!((u2 | 0) < (h | 0) | (u2 | 0) == (h | 0) & t2 >>> 0 < g2 >>> 0)) {
                              break;
                            } else {
                              g2 = i;
                              h = j;
                            }
                          }
                          if ((h | 0) > 0 | (h | 0) == 0 & g2 >>> 0 > 0) {
                            g2 = 0;
                            h = 0;
                            do {
                              u2 = y2 + (g2 << 3) | 0;
                              b[u2 >> 2] = 0;
                              b[u2 + 4 >> 2] = 0;
                              g2 = Jd(g2 | 0, h | 0, 1, 0) | 0;
                              h = H() | 0;
                              u2 = F;
                              t2 = b[u2 + 4 >> 2] | 0;
                            } while ((h | 0) < (t2 | 0) | ((h | 0) == (t2 | 0) ? g2 >>> 0 < (b[u2 >> 2] | 0) >>> 0 : 0));
                          }
                          u2 = F;
                          b[u2 >> 2] = i;
                          b[u2 + 4 >> 2] = j;
                          if ((j | 0) > 0 | (j | 0) == 0 & i >>> 0 > 0) {
                            q2 = d2;
                            r2 = x2;
                            s2 = C2;
                            t2 = w2;
                            u2 = z2;
                            d2 = v2;
                            x2 = f2;
                            w2 = A2;
                            v2 = q2;
                            f2 = r2;
                            C2 = B2;
                            B2 = s2;
                            A2 = t2;
                            z2 = y2;
                            y2 = u2;
                          } else {
                            break c;
                          }
                        }
                        Hd(A2);
                        Hd(B2);
                        Hd(J2);
                        f2 = 1;
                        break a;
                      } else {
                        f2 = i;
                      }
                    } while (0);
                    Hd(J2);
                    Hd(d2);
                    Hd(f2);
                    f2 = 0;
                  } else {
                    Hd(d2);
                    Hd(i);
                    Hd(J2);
                  }
                } while (0);
                J2 = f2;
                T = K2;
                return J2 | 0;
              }
            }
            Hd(J2);
            J2 = f2;
            T = K2;
            return J2 | 0;
          }
          __name(la, "la");
          function ma(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            l = T;
            T = T + 176 | 0;
            j = l;
            if ((c2 | 0) < 1) {
              xd(d2, 0, 0);
              k = 0;
              T = l;
              return k | 0;
            }
            i = a2;
            i = Td(b[i >> 2] | 0, b[i + 4 >> 2] | 0, 52) | 0;
            H() | 0;
            xd(d2, (c2 | 0) > 6 ? c2 : 6, i & 15);
            i = 0;
            while (1) {
              e2 = a2 + (i << 3) | 0;
              e2 = bc(b[e2 >> 2] | 0, b[e2 + 4 >> 2] | 0, j) | 0;
              if (e2 | 0) {
                break;
              }
              e2 = b[j >> 2] | 0;
              if ((e2 | 0) > 0) {
                h = 0;
                do {
                  g2 = j + 8 + (h << 4) | 0;
                  h = h + 1 | 0;
                  e2 = j + 8 + (((h | 0) % (e2 | 0) | 0) << 4) | 0;
                  f2 = Cd(d2, e2, g2) | 0;
                  if (!f2) {
                    Bd(d2, g2, e2) | 0;
                  } else {
                    Ad(d2, f2) | 0;
                  }
                  e2 = b[j >> 2] | 0;
                } while ((h | 0) < (e2 | 0));
              }
              i = i + 1 | 0;
              if ((i | 0) >= (c2 | 0)) {
                e2 = 0;
                k = 13;
                break;
              }
            }
            if ((k | 0) == 13) {
              T = l;
              return e2 | 0;
            }
            yd(d2);
            k = e2;
            T = l;
            return k | 0;
          }
          __name(ma, "ma");
          function na(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0;
            g2 = T;
            T = T + 32 | 0;
            e2 = g2;
            f2 = g2 + 16 | 0;
            a2 = ma(a2, c2, f2) | 0;
            if (a2 | 0) {
              d2 = a2;
              T = g2;
              return d2 | 0;
            }
            b[d2 >> 2] = 0;
            b[d2 + 4 >> 2] = 0;
            b[d2 + 8 >> 2] = 0;
            a2 = zd(f2) | 0;
            if (a2 | 0) {
              do {
                c2 = Fc(d2) | 0;
                do {
                  Gc(c2, a2) | 0;
                  h = a2 + 16 | 0;
                  b[e2 >> 2] = b[h >> 2];
                  b[e2 + 4 >> 2] = b[h + 4 >> 2];
                  b[e2 + 8 >> 2] = b[h + 8 >> 2];
                  b[e2 + 12 >> 2] = b[h + 12 >> 2];
                  Ad(f2, a2) | 0;
                  a2 = Dd(f2, e2) | 0;
                } while ((a2 | 0) != 0);
                a2 = zd(f2) | 0;
              } while ((a2 | 0) != 0);
            }
            yd(f2);
            a2 = Ic(d2) | 0;
            if (!a2) {
              h = 0;
              T = g2;
              return h | 0;
            }
            Hc(d2);
            h = a2;
            T = g2;
            return h | 0;
          }
          __name(na, "na");
          function oa(a2) {
            a2 = a2 | 0;
            if (a2 >>> 0 > 121) {
              a2 = 0;
              return a2 | 0;
            }
            a2 = b[7696 + (a2 * 28 | 0) + 16 >> 2] | 0;
            return a2 | 0;
          }
          __name(oa, "oa");
          function pa(a2) {
            a2 = a2 | 0;
            return (a2 | 0) == 4 | (a2 | 0) == 117 | 0;
          }
          __name(pa, "pa");
          function qa(a2) {
            a2 = a2 | 0;
            return b[11120 + ((b[a2 >> 2] | 0) * 216 | 0) + ((b[a2 + 4 >> 2] | 0) * 72 | 0) + ((b[a2 + 8 >> 2] | 0) * 24 | 0) + (b[a2 + 12 >> 2] << 3) >> 2] | 0;
          }
          __name(qa, "qa");
          function ra(a2) {
            a2 = a2 | 0;
            return b[11120 + ((b[a2 >> 2] | 0) * 216 | 0) + ((b[a2 + 4 >> 2] | 0) * 72 | 0) + ((b[a2 + 8 >> 2] | 0) * 24 | 0) + (b[a2 + 12 >> 2] << 3) + 4 >> 2] | 0;
          }
          __name(ra, "ra");
          function sa(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            a2 = 7696 + (a2 * 28 | 0) | 0;
            b[c2 >> 2] = b[a2 >> 2];
            b[c2 + 4 >> 2] = b[a2 + 4 >> 2];
            b[c2 + 8 >> 2] = b[a2 + 8 >> 2];
            b[c2 + 12 >> 2] = b[a2 + 12 >> 2];
            return;
          }
          __name(sa, "sa");
          function ta(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0;
            if (c2 >>> 0 > 20) {
              c2 = -1;
              return c2 | 0;
            }
            do {
              if ((b[11120 + (c2 * 216 | 0) >> 2] | 0) != (a2 | 0)) {
                if ((b[11120 + (c2 * 216 | 0) + 8 >> 2] | 0) != (a2 | 0)) {
                  if ((b[11120 + (c2 * 216 | 0) + 16 >> 2] | 0) != (a2 | 0)) {
                    if ((b[11120 + (c2 * 216 | 0) + 24 >> 2] | 0) != (a2 | 0)) {
                      if ((b[11120 + (c2 * 216 | 0) + 32 >> 2] | 0) != (a2 | 0)) {
                        if ((b[11120 + (c2 * 216 | 0) + 40 >> 2] | 0) != (a2 | 0)) {
                          if ((b[11120 + (c2 * 216 | 0) + 48 >> 2] | 0) != (a2 | 0)) {
                            if ((b[11120 + (c2 * 216 | 0) + 56 >> 2] | 0) != (a2 | 0)) {
                              if ((b[11120 + (c2 * 216 | 0) + 64 >> 2] | 0) != (a2 | 0)) {
                                if ((b[11120 + (c2 * 216 | 0) + 72 >> 2] | 0) != (a2 | 0)) {
                                  if ((b[11120 + (c2 * 216 | 0) + 80 >> 2] | 0) != (a2 | 0)) {
                                    if ((b[11120 + (c2 * 216 | 0) + 88 >> 2] | 0) != (a2 | 0)) {
                                      if ((b[11120 + (c2 * 216 | 0) + 96 >> 2] | 0) != (a2 | 0)) {
                                        if ((b[11120 + (c2 * 216 | 0) + 104 >> 2] | 0) != (a2 | 0)) {
                                          if ((b[11120 + (c2 * 216 | 0) + 112 >> 2] | 0) != (a2 | 0)) {
                                            if ((b[11120 + (c2 * 216 | 0) + 120 >> 2] | 0) != (a2 | 0)) {
                                              if ((b[11120 + (c2 * 216 | 0) + 128 >> 2] | 0) != (a2 | 0)) {
                                                if ((b[11120 + (c2 * 216 | 0) + 136 >> 2] | 0) == (a2 | 0)) {
                                                  a2 = 2;
                                                  d2 = 1;
                                                  e2 = 2;
                                                } else {
                                                  if ((b[11120 + (c2 * 216 | 0) + 144 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 0;
                                                    d2 = 2;
                                                    e2 = 0;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 152 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 0;
                                                    d2 = 2;
                                                    e2 = 1;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 160 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 0;
                                                    d2 = 2;
                                                    e2 = 2;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 168 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 1;
                                                    d2 = 2;
                                                    e2 = 0;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 176 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 1;
                                                    d2 = 2;
                                                    e2 = 1;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 184 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 1;
                                                    d2 = 2;
                                                    e2 = 2;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 192 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 2;
                                                    d2 = 2;
                                                    e2 = 0;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 200 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 2;
                                                    d2 = 2;
                                                    e2 = 1;
                                                    break;
                                                  }
                                                  if ((b[11120 + (c2 * 216 | 0) + 208 >> 2] | 0) == (a2 | 0)) {
                                                    a2 = 2;
                                                    d2 = 2;
                                                    e2 = 2;
                                                    break;
                                                  } else {
                                                    a2 = -1;
                                                  }
                                                  return a2 | 0;
                                                }
                                              } else {
                                                a2 = 2;
                                                d2 = 1;
                                                e2 = 1;
                                              }
                                            } else {
                                              a2 = 2;
                                              d2 = 1;
                                              e2 = 0;
                                            }
                                          } else {
                                            a2 = 1;
                                            d2 = 1;
                                            e2 = 2;
                                          }
                                        } else {
                                          a2 = 1;
                                          d2 = 1;
                                          e2 = 1;
                                        }
                                      } else {
                                        a2 = 1;
                                        d2 = 1;
                                        e2 = 0;
                                      }
                                    } else {
                                      a2 = 0;
                                      d2 = 1;
                                      e2 = 2;
                                    }
                                  } else {
                                    a2 = 0;
                                    d2 = 1;
                                    e2 = 1;
                                  }
                                } else {
                                  a2 = 0;
                                  d2 = 1;
                                  e2 = 0;
                                }
                              } else {
                                a2 = 2;
                                d2 = 0;
                                e2 = 2;
                              }
                            } else {
                              a2 = 2;
                              d2 = 0;
                              e2 = 1;
                            }
                          } else {
                            a2 = 2;
                            d2 = 0;
                            e2 = 0;
                          }
                        } else {
                          a2 = 1;
                          d2 = 0;
                          e2 = 2;
                        }
                      } else {
                        a2 = 1;
                        d2 = 0;
                        e2 = 1;
                      }
                    } else {
                      a2 = 1;
                      d2 = 0;
                      e2 = 0;
                    }
                  } else {
                    a2 = 0;
                    d2 = 0;
                    e2 = 2;
                  }
                } else {
                  a2 = 0;
                  d2 = 0;
                  e2 = 1;
                }
              } else {
                a2 = 0;
                d2 = 0;
                e2 = 0;
              }
            } while (0);
            c2 = b[11120 + (c2 * 216 | 0) + (d2 * 72 | 0) + (a2 * 24 | 0) + (e2 << 3) + 4 >> 2] | 0;
            return c2 | 0;
          }
          __name(ta, "ta");
          function ua(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            if ((b[7696 + (a2 * 28 | 0) + 20 >> 2] | 0) == (c2 | 0)) {
              c2 = 1;
              return c2 | 0;
            }
            c2 = (b[7696 + (a2 * 28 | 0) + 24 >> 2] | 0) == (c2 | 0);
            return c2 | 0;
          }
          __name(ua, "ua");
          function va(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            return b[848 + (a2 * 28 | 0) + (c2 << 2) >> 2] | 0;
          }
          __name(va, "va");
          function wa(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            if ((b[848 + (a2 * 28 | 0) >> 2] | 0) == (c2 | 0)) {
              c2 = 0;
              return c2 | 0;
            }
            if ((b[848 + (a2 * 28 | 0) + 4 >> 2] | 0) == (c2 | 0)) {
              c2 = 1;
              return c2 | 0;
            }
            if ((b[848 + (a2 * 28 | 0) + 8 >> 2] | 0) == (c2 | 0)) {
              c2 = 2;
              return c2 | 0;
            }
            if ((b[848 + (a2 * 28 | 0) + 12 >> 2] | 0) == (c2 | 0)) {
              c2 = 3;
              return c2 | 0;
            }
            if ((b[848 + (a2 * 28 | 0) + 16 >> 2] | 0) == (c2 | 0)) {
              c2 = 4;
              return c2 | 0;
            }
            if ((b[848 + (a2 * 28 | 0) + 20 >> 2] | 0) == (c2 | 0)) {
              c2 = 5;
              return c2 | 0;
            } else {
              return ((b[848 + (a2 * 28 | 0) + 24 >> 2] | 0) == (c2 | 0) ? 6 : 7) | 0;
            }
            return 0;
          }
          __name(wa, "wa");
          function xa() {
            return 122;
          }
          __name(xa, "xa");
          function ya(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            c2 = 0;
            do {
              Ud(c2 | 0, 0, 45) | 0;
              e2 = H() | 0 | 134225919;
              d2 = a2 + (c2 << 3) | 0;
              b[d2 >> 2] = -1;
              b[d2 + 4 >> 2] = e2;
              c2 = c2 + 1 | 0;
            } while ((c2 | 0) != 122);
            return 0;
          }
          __name(ya, "ya");
          function za(a2) {
            a2 = a2 | 0;
            var b2 = 0, c2 = 0, d2 = 0;
            d2 = +e[a2 + 16 >> 3];
            c2 = +e[a2 + 24 >> 3];
            b2 = d2 - c2;
            return +(d2 < c2 ? b2 + 6.283185307179586 : b2);
          }
          __name(za, "za");
          function Aa(a2) {
            a2 = a2 | 0;
            return +e[a2 + 16 >> 3] < +e[a2 + 24 >> 3] | 0;
          }
          __name(Aa, "Aa");
          function Ba(a2) {
            a2 = a2 | 0;
            return +(+e[a2 >> 3] - +e[a2 + 8 >> 3]);
          }
          __name(Ba, "Ba");
          function Ca(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0;
            c2 = +e[b2 >> 3];
            if (!(c2 >= +e[a2 + 8 >> 3])) {
              b2 = 0;
              return b2 | 0;
            }
            if (!(c2 <= +e[a2 >> 3])) {
              b2 = 0;
              return b2 | 0;
            }
            d2 = +e[a2 + 16 >> 3];
            c2 = +e[a2 + 24 >> 3];
            f2 = +e[b2 + 8 >> 3];
            b2 = f2 >= c2;
            a2 = f2 <= d2 & 1;
            if (d2 < c2) {
              if (b2) {
                a2 = 1;
              }
            } else if (!b2) {
              a2 = 0;
            }
            b2 = (a2 | 0) != 0;
            return b2 | 0;
          }
          __name(Ca, "Ca");
          function Da(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            if (+e[a2 >> 3] < +e[b2 + 8 >> 3]) {
              d2 = 0;
              return d2 | 0;
            }
            if (+e[a2 + 8 >> 3] > +e[b2 >> 3]) {
              d2 = 0;
              return d2 | 0;
            }
            g2 = +e[a2 + 16 >> 3];
            c2 = a2 + 24 | 0;
            l = +e[c2 >> 3];
            h = g2 < l;
            d2 = b2 + 16 | 0;
            k = +e[d2 >> 3];
            f2 = b2 + 24 | 0;
            j = +e[f2 >> 3];
            i = k < j;
            b2 = l - k < j - g2;
            a2 = h ? i | b2 ? 1 : 2 : 0;
            b2 = i ? h ? 1 : b2 ? 2 : 1 : 0;
            g2 = +nc(g2, a2);
            if (g2 < +nc(+e[f2 >> 3], b2)) {
              i = 0;
              return i | 0;
            }
            l = +nc(+e[c2 >> 3], a2);
            if (l > +nc(+e[d2 >> 3], b2)) {
              i = 0;
              return i | 0;
            }
            i = 1;
            return i | 0;
          }
          __name(Da, "Da");
          function Ea(a2, c2, d2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0;
            h = +e[a2 + 16 >> 3];
            k = +e[a2 + 24 >> 3];
            a2 = h < k;
            j = +e[c2 + 16 >> 3];
            i = +e[c2 + 24 >> 3];
            g2 = j < i;
            c2 = k - j < i - h;
            b[d2 >> 2] = a2 ? g2 | c2 ? 1 : 2 : 0;
            b[f2 >> 2] = g2 ? a2 ? 1 : c2 ? 2 : 1 : 0;
            return;
          }
          __name(Ea, "Ea");
          function Fa(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            if (+e[a2 >> 3] < +e[b2 >> 3]) {
              d2 = 0;
              return d2 | 0;
            }
            if (+e[a2 + 8 >> 3] > +e[b2 + 8 >> 3]) {
              d2 = 0;
              return d2 | 0;
            }
            d2 = a2 + 16 | 0;
            j = +e[d2 >> 3];
            g2 = +e[a2 + 24 >> 3];
            h = j < g2;
            c2 = b2 + 16 | 0;
            l = +e[c2 >> 3];
            f2 = b2 + 24 | 0;
            k = +e[f2 >> 3];
            i = l < k;
            b2 = g2 - l < k - j;
            a2 = h ? i | b2 ? 1 : 2 : 0;
            b2 = i ? h ? 1 : b2 ? 2 : 1 : 0;
            g2 = +nc(g2, a2);
            if (!(g2 <= +nc(+e[f2 >> 3], b2))) {
              i = 0;
              return i | 0;
            }
            l = +nc(+e[d2 >> 3], a2);
            i = l >= +nc(+e[c2 >> 3], b2);
            return i | 0;
          }
          __name(Fa, "Fa");
          function Ga(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            g2 = T;
            T = T + 176 | 0;
            f2 = g2;
            b[f2 >> 2] = 4;
            j = +e[c2 >> 3];
            e[f2 + 8 >> 3] = j;
            h = +e[c2 + 16 >> 3];
            e[f2 + 16 >> 3] = h;
            e[f2 + 24 >> 3] = j;
            j = +e[c2 + 24 >> 3];
            e[f2 + 32 >> 3] = j;
            i = +e[c2 + 8 >> 3];
            e[f2 + 40 >> 3] = i;
            e[f2 + 48 >> 3] = j;
            e[f2 + 56 >> 3] = i;
            e[f2 + 64 >> 3] = h;
            c2 = f2 + 72 | 0;
            d2 = c2 + 96 | 0;
            do {
              b[c2 >> 2] = 0;
              c2 = c2 + 4 | 0;
            } while ((c2 | 0) < (d2 | 0));
            Zd(a2 | 0, f2 | 0, 168) | 0;
            T = g2;
            return;
          }
          __name(Ga, "Ga");
          function Ha(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0;
            t2 = T;
            T = T + 288 | 0;
            n = t2 + 264 | 0;
            o = t2 + 96 | 0;
            m = t2;
            k = m;
            l = k + 96 | 0;
            do {
              b[k >> 2] = 0;
              k = k + 4 | 0;
            } while ((k | 0) < (l | 0));
            c2 = fc(c2, m) | 0;
            if (c2 | 0) {
              s2 = c2;
              T = t2;
              return s2 | 0;
            }
            l = m;
            m = b[l >> 2] | 0;
            l = b[l + 4 >> 2] | 0;
            ac(m, l, n) | 0;
            bc(m, l, o) | 0;
            j = +pc(n, o + 8 | 0);
            e[n >> 3] = +e[a2 >> 3];
            l = n + 8 | 0;
            e[l >> 3] = +e[a2 + 16 >> 3];
            e[o >> 3] = +e[a2 + 8 >> 3];
            m = o + 8 | 0;
            e[m >> 3] = +e[a2 + 24 >> 3];
            h = +pc(n, o);
            v2 = +e[l >> 3] - +e[m >> 3];
            i = +q(+v2);
            u2 = +e[n >> 3] - +e[o >> 3];
            g2 = +q(+u2);
            if (!(v2 == 0 | u2 == 0) ? (v2 = +Wd(+i, +g2), v2 = +A(+(h * h / +Xd(+(v2 / +Xd(+i, +g2)), 3) / (j * (j * 2.59807621135) * 0.8))), e[f >> 3] = v2, r2 = ~~v2 >>> 0, s2 = +q(v2) >= 1 ? v2 > 0 ? ~~+C(+p(v2 / 4294967296), 4294967295) >>> 0 : ~~+A((v2 - +(~~v2 >>> 0)) / 4294967296) >>> 0 : 0, !((b[f + 4 >> 2] & 2146435072 | 0) == 2146435072)) : 0) {
              o = (r2 | 0) == 0 & (s2 | 0) == 0;
              c2 = d2;
              b[c2 >> 2] = o ? 1 : r2;
              b[c2 + 4 >> 2] = o ? 0 : s2;
              c2 = 0;
            } else {
              c2 = 1;
            }
            s2 = c2;
            T = t2;
            return s2 | 0;
          }
          __name(Ha, "Ha");
          function Ia(a2, c2, d2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
            m = T;
            T = T + 288 | 0;
            j = m + 264 | 0;
            k = m + 96 | 0;
            l = m;
            h = l;
            i = h + 96 | 0;
            do {
              b[h >> 2] = 0;
              h = h + 4 | 0;
            } while ((h | 0) < (i | 0));
            d2 = fc(d2, l) | 0;
            if (d2 | 0) {
              g2 = d2;
              T = m;
              return g2 | 0;
            }
            d2 = l;
            h = b[d2 >> 2] | 0;
            d2 = b[d2 + 4 >> 2] | 0;
            ac(h, d2, j) | 0;
            bc(h, d2, k) | 0;
            n = +pc(j, k + 8 | 0);
            n = +A(+(+pc(a2, c2) / (n * 2)));
            e[f >> 3] = n;
            d2 = ~~n >>> 0;
            h = +q(n) >= 1 ? n > 0 ? ~~+C(+p(n / 4294967296), 4294967295) >>> 0 : ~~+A((n - +(~~n >>> 0)) / 4294967296) >>> 0 : 0;
            if ((b[f + 4 >> 2] & 2146435072 | 0) == 2146435072) {
              g2 = 1;
              T = m;
              return g2 | 0;
            }
            l = (d2 | 0) == 0 & (h | 0) == 0;
            b[g2 >> 2] = l ? 1 : d2;
            b[g2 + 4 >> 2] = l ? 0 : h;
            g2 = 0;
            T = m;
            return g2 | 0;
          }
          __name(Ia, "Ia");
          function Ja(a2, b2) {
            a2 = a2 | 0;
            b2 = +b2;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            g2 = a2 + 16 | 0;
            h = +e[g2 >> 3];
            c2 = a2 + 24 | 0;
            f2 = +e[c2 >> 3];
            d2 = h - f2;
            d2 = h < f2 ? d2 + 6.283185307179586 : d2;
            k = +e[a2 >> 3];
            i = a2 + 8 | 0;
            j = +e[i >> 3];
            l = k - j;
            d2 = (d2 * b2 - d2) * 0.5;
            b2 = (l * b2 - l) * 0.5;
            k = k + b2;
            e[a2 >> 3] = k > 1.5707963267948966 ? 1.5707963267948966 : k;
            b2 = j - b2;
            e[i >> 3] = b2 < -1.5707963267948966 ? -1.5707963267948966 : b2;
            b2 = h + d2;
            b2 = b2 > 3.141592653589793 ? b2 + -6.283185307179586 : b2;
            e[g2 >> 3] = b2 < -3.141592653589793 ? b2 + 6.283185307179586 : b2;
            b2 = f2 - d2;
            b2 = b2 > 3.141592653589793 ? b2 + -6.283185307179586 : b2;
            e[c2 >> 3] = b2 < -3.141592653589793 ? b2 + 6.283185307179586 : b2;
            return;
          }
          __name(Ja, "Ja");
          function Ka(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            b[a2 >> 2] = c2;
            b[a2 + 4 >> 2] = d2;
            b[a2 + 8 >> 2] = e2;
            return;
          }
          __name(Ka, "Ka");
          function La(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0;
            n = c2 + 8 | 0;
            b[n >> 2] = 0;
            k = +e[a2 >> 3];
            i = +q(+k);
            l = +e[a2 + 8 >> 3];
            j = +q(+l) * 1.1547005383792515;
            i = i + j * 0.5;
            d2 = ~~i;
            a2 = ~~j;
            i = i - +(d2 | 0);
            j = j - +(a2 | 0);
            do {
              if (i < 0.5) {
                if (i < 0.3333333333333333) {
                  b[c2 >> 2] = d2;
                  if (j < (i + 1) * 0.5) {
                    b[c2 + 4 >> 2] = a2;
                    break;
                  } else {
                    a2 = a2 + 1 | 0;
                    b[c2 + 4 >> 2] = a2;
                    break;
                  }
                } else {
                  o = 1 - i;
                  a2 = (!(j < o) & 1) + a2 | 0;
                  b[c2 + 4 >> 2] = a2;
                  if (o <= j & j < i * 2) {
                    d2 = d2 + 1 | 0;
                    b[c2 >> 2] = d2;
                    break;
                  } else {
                    b[c2 >> 2] = d2;
                    break;
                  }
                }
              } else {
                if (!(i < 0.6666666666666666)) {
                  d2 = d2 + 1 | 0;
                  b[c2 >> 2] = d2;
                  if (j < i * 0.5) {
                    b[c2 + 4 >> 2] = a2;
                    break;
                  } else {
                    a2 = a2 + 1 | 0;
                    b[c2 + 4 >> 2] = a2;
                    break;
                  }
                }
                if (j < 1 - i) {
                  b[c2 + 4 >> 2] = a2;
                  if (i * 2 + -1 < j) {
                    b[c2 >> 2] = d2;
                    break;
                  }
                } else {
                  a2 = a2 + 1 | 0;
                  b[c2 + 4 >> 2] = a2;
                }
                d2 = d2 + 1 | 0;
                b[c2 >> 2] = d2;
              }
            } while (0);
            do {
              if (k < 0) {
                if (!(a2 & 1)) {
                  m = (a2 | 0) / 2 | 0;
                  m = Kd(d2 | 0, ((d2 | 0) < 0) << 31 >> 31 | 0, m | 0, ((m | 0) < 0) << 31 >> 31 | 0) | 0;
                  d2 = ~~(+(d2 | 0) - (+(m >>> 0) + 4294967296 * +(H() | 0)) * 2);
                  b[c2 >> 2] = d2;
                  break;
                } else {
                  m = (a2 + 1 | 0) / 2 | 0;
                  m = Kd(d2 | 0, ((d2 | 0) < 0) << 31 >> 31 | 0, m | 0, ((m | 0) < 0) << 31 >> 31 | 0) | 0;
                  d2 = ~~(+(d2 | 0) - ((+(m >>> 0) + 4294967296 * +(H() | 0)) * 2 + 1));
                  b[c2 >> 2] = d2;
                  break;
                }
              }
            } while (0);
            m = c2 + 4 | 0;
            if (l < 0) {
              d2 = d2 - ((a2 << 1 | 1 | 0) / 2 | 0) | 0;
              b[c2 >> 2] = d2;
              a2 = 0 - a2 | 0;
              b[m >> 2] = a2;
            }
            f2 = a2 - d2 | 0;
            if ((d2 | 0) < 0) {
              g2 = 0 - d2 | 0;
              b[m >> 2] = f2;
              b[n >> 2] = g2;
              b[c2 >> 2] = 0;
              a2 = f2;
              d2 = 0;
            } else {
              g2 = 0;
            }
            if ((a2 | 0) < 0) {
              d2 = d2 - a2 | 0;
              b[c2 >> 2] = d2;
              g2 = g2 - a2 | 0;
              b[n >> 2] = g2;
              b[m >> 2] = 0;
              a2 = 0;
            }
            h = d2 - g2 | 0;
            f2 = a2 - g2 | 0;
            if ((g2 | 0) < 0) {
              b[c2 >> 2] = h;
              b[m >> 2] = f2;
              b[n >> 2] = 0;
              a2 = f2;
              d2 = h;
              g2 = 0;
            }
            f2 = (a2 | 0) < (d2 | 0) ? a2 : d2;
            f2 = (g2 | 0) < (f2 | 0) ? g2 : f2;
            if ((f2 | 0) <= 0) {
              return;
            }
            b[c2 >> 2] = d2 - f2;
            b[m >> 2] = a2 - f2;
            b[n >> 2] = g2 - f2;
            return;
          }
          __name(La, "La");
          function Ma(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0;
            c2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            d2 = b[h >> 2] | 0;
            if ((c2 | 0) < 0) {
              d2 = d2 - c2 | 0;
              b[h >> 2] = d2;
              g2 = a2 + 8 | 0;
              b[g2 >> 2] = (b[g2 >> 2] | 0) - c2;
              b[a2 >> 2] = 0;
              c2 = 0;
            }
            if ((d2 | 0) < 0) {
              c2 = c2 - d2 | 0;
              b[a2 >> 2] = c2;
              g2 = a2 + 8 | 0;
              f2 = (b[g2 >> 2] | 0) - d2 | 0;
              b[g2 >> 2] = f2;
              b[h >> 2] = 0;
              d2 = 0;
            } else {
              f2 = a2 + 8 | 0;
              g2 = f2;
              f2 = b[f2 >> 2] | 0;
            }
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[a2 >> 2] = c2;
              d2 = d2 - f2 | 0;
              b[h >> 2] = d2;
              b[g2 >> 2] = 0;
              f2 = 0;
            }
            e2 = (d2 | 0) < (c2 | 0) ? d2 : c2;
            e2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            if ((e2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = c2 - e2;
            b[h >> 2] = d2 - e2;
            b[g2 >> 2] = f2 - e2;
            return;
          }
          __name(Ma, "Ma");
          function Na(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0;
            f2 = b[a2 + 8 >> 2] | 0;
            d2 = +((b[a2 + 4 >> 2] | 0) - f2 | 0);
            e[c2 >> 3] = +((b[a2 >> 2] | 0) - f2 | 0) - d2 * 0.5;
            e[c2 + 8 >> 3] = d2 * 0.8660254037844386;
            return;
          }
          __name(Na, "Na");
          function Oa(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            b[d2 >> 2] = (b[c2 >> 2] | 0) + (b[a2 >> 2] | 0);
            b[d2 + 4 >> 2] = (b[c2 + 4 >> 2] | 0) + (b[a2 + 4 >> 2] | 0);
            b[d2 + 8 >> 2] = (b[c2 + 8 >> 2] | 0) + (b[a2 + 8 >> 2] | 0);
            return;
          }
          __name(Oa, "Oa");
          function Pa(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            b[d2 >> 2] = (b[a2 >> 2] | 0) - (b[c2 >> 2] | 0);
            b[d2 + 4 >> 2] = (b[a2 + 4 >> 2] | 0) - (b[c2 + 4 >> 2] | 0);
            b[d2 + 8 >> 2] = (b[a2 + 8 >> 2] | 0) - (b[c2 + 8 >> 2] | 0);
            return;
          }
          __name(Pa, "Pa");
          function Qa(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0;
            d2 = B(b[a2 >> 2] | 0, c2) | 0;
            b[a2 >> 2] = d2;
            d2 = a2 + 4 | 0;
            e2 = B(b[d2 >> 2] | 0, c2) | 0;
            b[d2 >> 2] = e2;
            a2 = a2 + 8 | 0;
            c2 = B(b[a2 >> 2] | 0, c2) | 0;
            b[a2 >> 2] = c2;
            return;
          }
          __name(Qa, "Qa");
          function Ra(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            h = b[a2 >> 2] | 0;
            i = (h | 0) < 0;
            e2 = (b[a2 + 4 >> 2] | 0) - (i ? h : 0) | 0;
            g2 = (e2 | 0) < 0;
            f2 = (g2 ? 0 - e2 | 0 : 0) + ((b[a2 + 8 >> 2] | 0) - (i ? h : 0)) | 0;
            d2 = (f2 | 0) < 0;
            a2 = d2 ? 0 : f2;
            c2 = (g2 ? 0 : e2) - (d2 ? f2 : 0) | 0;
            f2 = (i ? 0 : h) - (g2 ? e2 : 0) - (d2 ? f2 : 0) | 0;
            d2 = (c2 | 0) < (f2 | 0) ? c2 : f2;
            d2 = (a2 | 0) < (d2 | 0) ? a2 : d2;
            e2 = (d2 | 0) > 0;
            a2 = a2 - (e2 ? d2 : 0) | 0;
            c2 = c2 - (e2 ? d2 : 0) | 0;
            a: do {
              switch (f2 - (e2 ? d2 : 0) | 0) {
                case 0:
                  switch (c2 | 0) {
                    case 0: {
                      i = (a2 | 0) == 0 ? 0 : (a2 | 0) == 1 ? 1 : 7;
                      return i | 0;
                    }
                    case 1: {
                      i = (a2 | 0) == 0 ? 2 : (a2 | 0) == 1 ? 3 : 7;
                      return i | 0;
                    }
                    default:
                      break a;
                  }
                case 1:
                  switch (c2 | 0) {
                    case 0: {
                      i = (a2 | 0) == 0 ? 4 : (a2 | 0) == 1 ? 5 : 7;
                      return i | 0;
                    }
                    case 1: {
                      if (!a2) {
                        a2 = 6;
                      } else {
                        break a;
                      }
                      return a2 | 0;
                    }
                    default:
                      break a;
                  }
                default:
              }
            } while (0);
            i = 7;
            return i | 0;
          }
          __name(Ra, "Ra");
          function Sa(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0;
            j = a2 + 8 | 0;
            h = b[j >> 2] | 0;
            i = (b[a2 >> 2] | 0) - h | 0;
            k = a2 + 4 | 0;
            h = (b[k >> 2] | 0) - h | 0;
            if (i >>> 0 > 715827881 | h >>> 0 > 715827881) {
              e2 = (i | 0) > 0;
              f2 = 2147483647 - i | 0;
              g2 = -2147483648 - i | 0;
              if (e2 ? (f2 | 0) < (i | 0) : (g2 | 0) > (i | 0)) {
                k = 1;
                return k | 0;
              }
              d2 = i << 1;
              if (e2 ? (2147483647 - d2 | 0) < (i | 0) : (-2147483648 - d2 | 0) > (i | 0)) {
                k = 1;
                return k | 0;
              }
              if ((h | 0) > 0 ? (2147483647 - h | 0) < (h | 0) : (-2147483648 - h | 0) > (h | 0)) {
                k = 1;
                return k | 0;
              }
              c2 = i * 3 | 0;
              d2 = h << 1;
              if ((e2 ? (f2 | 0) < (d2 | 0) : (g2 | 0) > (d2 | 0)) ? 1 : (i | 0) > -1 ? (c2 | -2147483648 | 0) >= (h | 0) : (c2 ^ -2147483648 | 0) < (h | 0)) {
                k = 1;
                return k | 0;
              }
            } else {
              d2 = h << 1;
              c2 = i * 3 | 0;
            }
            e2 = Fd(+(c2 - h | 0) * 0.14285714285714285) | 0;
            b[a2 >> 2] = e2;
            f2 = Fd(+(d2 + i | 0) * 0.14285714285714285) | 0;
            b[k >> 2] = f2;
            b[j >> 2] = 0;
            d2 = (f2 | 0) < (e2 | 0);
            c2 = d2 ? e2 : f2;
            d2 = d2 ? f2 : e2;
            if ((d2 | 0) < 0) {
              if ((d2 | 0) == -2147483648 ? 1 : (c2 | 0) > 0 ? (2147483647 - c2 | 0) < (d2 | 0) : (-2147483648 - c2 | 0) > (d2 | 0)) {
                I(27795, 26892, 354, 26903);
              }
              if ((c2 | 0) > -1 ? (c2 | -2147483648 | 0) >= (d2 | 0) : (c2 ^ -2147483648 | 0) < (d2 | 0)) {
                I(27795, 26892, 354, 26903);
              }
            }
            c2 = f2 - e2 | 0;
            if ((e2 | 0) < 0) {
              d2 = 0 - e2 | 0;
              b[k >> 2] = c2;
              b[j >> 2] = d2;
              b[a2 >> 2] = 0;
              e2 = 0;
            } else {
              c2 = f2;
              d2 = 0;
            }
            if ((c2 | 0) < 0) {
              e2 = e2 - c2 | 0;
              b[a2 >> 2] = e2;
              d2 = d2 - c2 | 0;
              b[j >> 2] = d2;
              b[k >> 2] = 0;
              c2 = 0;
            }
            g2 = e2 - d2 | 0;
            f2 = c2 - d2 | 0;
            if ((d2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[k >> 2] = f2;
              b[j >> 2] = 0;
              c2 = f2;
              f2 = g2;
              d2 = 0;
            } else {
              f2 = e2;
            }
            e2 = (c2 | 0) < (f2 | 0) ? c2 : f2;
            e2 = (d2 | 0) < (e2 | 0) ? d2 : e2;
            if ((e2 | 0) <= 0) {
              k = 0;
              return k | 0;
            }
            b[a2 >> 2] = f2 - e2;
            b[k >> 2] = c2 - e2;
            b[j >> 2] = d2 - e2;
            k = 0;
            return k | 0;
          }
          __name(Sa, "Sa");
          function Ta(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            h = a2 + 8 | 0;
            f2 = b[h >> 2] | 0;
            g2 = (b[a2 >> 2] | 0) - f2 | 0;
            i = a2 + 4 | 0;
            f2 = (b[i >> 2] | 0) - f2 | 0;
            if (g2 >>> 0 > 715827881 | f2 >>> 0 > 715827881) {
              d2 = (g2 | 0) > 0;
              if (d2 ? (2147483647 - g2 | 0) < (g2 | 0) : (-2147483648 - g2 | 0) > (g2 | 0)) {
                i = 1;
                return i | 0;
              }
              c2 = g2 << 1;
              e2 = (f2 | 0) > 0;
              if (e2 ? (2147483647 - f2 | 0) < (f2 | 0) : (-2147483648 - f2 | 0) > (f2 | 0)) {
                i = 1;
                return i | 0;
              }
              j = f2 << 1;
              if (e2 ? (2147483647 - j | 0) < (f2 | 0) : (-2147483648 - j | 0) > (f2 | 0)) {
                j = 1;
                return j | 0;
              }
              if (d2 ? (2147483647 - c2 | 0) < (f2 | 0) : (-2147483648 - c2 | 0) > (f2 | 0)) {
                j = 1;
                return j | 0;
              }
              d2 = f2 * 3 | 0;
              if ((f2 | 0) > -1 ? (d2 | -2147483648 | 0) >= (g2 | 0) : (d2 ^ -2147483648 | 0) < (g2 | 0)) {
                j = 1;
                return j | 0;
              }
            } else {
              d2 = f2 * 3 | 0;
              c2 = g2 << 1;
            }
            e2 = Fd(+(c2 + f2 | 0) * 0.14285714285714285) | 0;
            b[a2 >> 2] = e2;
            f2 = Fd(+(d2 - g2 | 0) * 0.14285714285714285) | 0;
            b[i >> 2] = f2;
            b[h >> 2] = 0;
            d2 = (f2 | 0) < (e2 | 0);
            c2 = d2 ? e2 : f2;
            d2 = d2 ? f2 : e2;
            if ((d2 | 0) < 0) {
              if ((d2 | 0) == -2147483648 ? 1 : (c2 | 0) > 0 ? (2147483647 - c2 | 0) < (d2 | 0) : (-2147483648 - c2 | 0) > (d2 | 0)) {
                I(27795, 26892, 402, 26917);
              }
              if ((c2 | 0) > -1 ? (c2 | -2147483648 | 0) >= (d2 | 0) : (c2 ^ -2147483648 | 0) < (d2 | 0)) {
                I(27795, 26892, 402, 26917);
              }
            }
            c2 = f2 - e2 | 0;
            if ((e2 | 0) < 0) {
              d2 = 0 - e2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = d2;
              b[a2 >> 2] = 0;
              e2 = 0;
            } else {
              c2 = f2;
              d2 = 0;
            }
            if ((c2 | 0) < 0) {
              e2 = e2 - c2 | 0;
              b[a2 >> 2] = e2;
              d2 = d2 - c2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = 0;
              c2 = 0;
            }
            g2 = e2 - d2 | 0;
            f2 = c2 - d2 | 0;
            if ((d2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[i >> 2] = f2;
              b[h >> 2] = 0;
              c2 = f2;
              f2 = g2;
              d2 = 0;
            } else {
              f2 = e2;
            }
            e2 = (c2 | 0) < (f2 | 0) ? c2 : f2;
            e2 = (d2 | 0) < (e2 | 0) ? d2 : e2;
            if ((e2 | 0) <= 0) {
              j = 0;
              return j | 0;
            }
            b[a2 >> 2] = f2 - e2;
            b[i >> 2] = c2 - e2;
            b[h >> 2] = d2 - e2;
            j = 0;
            return j | 0;
          }
          __name(Ta, "Ta");
          function Ua(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            h = a2 + 8 | 0;
            d2 = b[h >> 2] | 0;
            c2 = (b[a2 >> 2] | 0) - d2 | 0;
            i = a2 + 4 | 0;
            d2 = (b[i >> 2] | 0) - d2 | 0;
            e2 = Fd(+((c2 * 3 | 0) - d2 | 0) * 0.14285714285714285) | 0;
            b[a2 >> 2] = e2;
            c2 = Fd(+((d2 << 1) + c2 | 0) * 0.14285714285714285) | 0;
            b[i >> 2] = c2;
            b[h >> 2] = 0;
            d2 = c2 - e2 | 0;
            if ((e2 | 0) < 0) {
              g2 = 0 - e2 | 0;
              b[i >> 2] = d2;
              b[h >> 2] = g2;
              b[a2 >> 2] = 0;
              c2 = d2;
              e2 = 0;
              d2 = g2;
            } else {
              d2 = 0;
            }
            if ((c2 | 0) < 0) {
              e2 = e2 - c2 | 0;
              b[a2 >> 2] = e2;
              d2 = d2 - c2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = 0;
              c2 = 0;
            }
            g2 = e2 - d2 | 0;
            f2 = c2 - d2 | 0;
            if ((d2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[i >> 2] = f2;
              b[h >> 2] = 0;
              c2 = f2;
              f2 = g2;
              d2 = 0;
            } else {
              f2 = e2;
            }
            e2 = (c2 | 0) < (f2 | 0) ? c2 : f2;
            e2 = (d2 | 0) < (e2 | 0) ? d2 : e2;
            if ((e2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = f2 - e2;
            b[i >> 2] = c2 - e2;
            b[h >> 2] = d2 - e2;
            return;
          }
          __name(Ua, "Ua");
          function Va(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            h = a2 + 8 | 0;
            d2 = b[h >> 2] | 0;
            c2 = (b[a2 >> 2] | 0) - d2 | 0;
            i = a2 + 4 | 0;
            d2 = (b[i >> 2] | 0) - d2 | 0;
            e2 = Fd(+((c2 << 1) + d2 | 0) * 0.14285714285714285) | 0;
            b[a2 >> 2] = e2;
            c2 = Fd(+((d2 * 3 | 0) - c2 | 0) * 0.14285714285714285) | 0;
            b[i >> 2] = c2;
            b[h >> 2] = 0;
            d2 = c2 - e2 | 0;
            if ((e2 | 0) < 0) {
              g2 = 0 - e2 | 0;
              b[i >> 2] = d2;
              b[h >> 2] = g2;
              b[a2 >> 2] = 0;
              c2 = d2;
              e2 = 0;
              d2 = g2;
            } else {
              d2 = 0;
            }
            if ((c2 | 0) < 0) {
              e2 = e2 - c2 | 0;
              b[a2 >> 2] = e2;
              d2 = d2 - c2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = 0;
              c2 = 0;
            }
            g2 = e2 - d2 | 0;
            f2 = c2 - d2 | 0;
            if ((d2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[i >> 2] = f2;
              b[h >> 2] = 0;
              c2 = f2;
              f2 = g2;
              d2 = 0;
            } else {
              f2 = e2;
            }
            e2 = (c2 | 0) < (f2 | 0) ? c2 : f2;
            e2 = (d2 | 0) < (e2 | 0) ? d2 : e2;
            if ((e2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = f2 - e2;
            b[i >> 2] = c2 - e2;
            b[h >> 2] = d2 - e2;
            return;
          }
          __name(Va, "Va");
          function Wa(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            c2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            d2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            e2 = b[i >> 2] | 0;
            f2 = d2 + (c2 * 3 | 0) | 0;
            b[a2 >> 2] = f2;
            d2 = e2 + (d2 * 3 | 0) | 0;
            b[h >> 2] = d2;
            c2 = (e2 * 3 | 0) + c2 | 0;
            b[i >> 2] = c2;
            e2 = d2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = e2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              d2 = e2;
              e2 = 0;
            } else {
              e2 = f2;
            }
            if ((d2 | 0) < 0) {
              e2 = e2 - d2 | 0;
              b[a2 >> 2] = e2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = e2 - c2 | 0;
            f2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = f2;
              b[i >> 2] = 0;
              e2 = g2;
              c2 = 0;
            } else {
              f2 = d2;
            }
            d2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = e2 - d2;
            b[h >> 2] = f2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(Wa, "Wa");
          function Xa(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            f2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            c2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            d2 = b[i >> 2] | 0;
            e2 = (c2 * 3 | 0) + f2 | 0;
            f2 = d2 + (f2 * 3 | 0) | 0;
            b[a2 >> 2] = f2;
            b[h >> 2] = e2;
            c2 = (d2 * 3 | 0) + c2 | 0;
            b[i >> 2] = c2;
            d2 = e2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              f2 = 0;
            } else {
              d2 = e2;
            }
            if ((d2 | 0) < 0) {
              f2 = f2 - d2 | 0;
              b[a2 >> 2] = f2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = f2 - c2 | 0;
            e2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = e2;
              b[i >> 2] = 0;
              f2 = g2;
              c2 = 0;
            } else {
              e2 = d2;
            }
            d2 = (e2 | 0) < (f2 | 0) ? e2 : f2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = f2 - d2;
            b[h >> 2] = e2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(Xa, "Xa");
          function Ya(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            if ((c2 + -1 | 0) >>> 0 >= 6) {
              return;
            }
            f2 = (b[15440 + (c2 * 12 | 0) >> 2] | 0) + (b[a2 >> 2] | 0) | 0;
            b[a2 >> 2] = f2;
            i = a2 + 4 | 0;
            e2 = (b[15440 + (c2 * 12 | 0) + 4 >> 2] | 0) + (b[i >> 2] | 0) | 0;
            b[i >> 2] = e2;
            h = a2 + 8 | 0;
            c2 = (b[15440 + (c2 * 12 | 0) + 8 >> 2] | 0) + (b[h >> 2] | 0) | 0;
            b[h >> 2] = c2;
            d2 = e2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[i >> 2] = d2;
              b[h >> 2] = c2;
              b[a2 >> 2] = 0;
              e2 = 0;
            } else {
              d2 = e2;
              e2 = f2;
            }
            if ((d2 | 0) < 0) {
              e2 = e2 - d2 | 0;
              b[a2 >> 2] = e2;
              c2 = c2 - d2 | 0;
              b[h >> 2] = c2;
              b[i >> 2] = 0;
              d2 = 0;
            }
            g2 = e2 - c2 | 0;
            f2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[i >> 2] = f2;
              b[h >> 2] = 0;
              e2 = g2;
              c2 = 0;
            } else {
              f2 = d2;
            }
            d2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = e2 - d2;
            b[i >> 2] = f2 - d2;
            b[h >> 2] = c2 - d2;
            return;
          }
          __name(Ya, "Ya");
          function Za(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            f2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            c2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            d2 = b[i >> 2] | 0;
            e2 = c2 + f2 | 0;
            f2 = d2 + f2 | 0;
            b[a2 >> 2] = f2;
            b[h >> 2] = e2;
            c2 = d2 + c2 | 0;
            b[i >> 2] = c2;
            d2 = e2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              e2 = 0;
            } else {
              d2 = e2;
              e2 = f2;
            }
            if ((d2 | 0) < 0) {
              e2 = e2 - d2 | 0;
              b[a2 >> 2] = e2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = e2 - c2 | 0;
            f2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = f2;
              b[i >> 2] = 0;
              e2 = g2;
              c2 = 0;
            } else {
              f2 = d2;
            }
            d2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = e2 - d2;
            b[h >> 2] = f2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(Za, "Za");
          function _a(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            c2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            e2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            d2 = b[i >> 2] | 0;
            f2 = e2 + c2 | 0;
            b[a2 >> 2] = f2;
            e2 = d2 + e2 | 0;
            b[h >> 2] = e2;
            c2 = d2 + c2 | 0;
            b[i >> 2] = c2;
            d2 = e2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              e2 = 0;
            } else {
              d2 = e2;
              e2 = f2;
            }
            if ((d2 | 0) < 0) {
              e2 = e2 - d2 | 0;
              b[a2 >> 2] = e2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = e2 - c2 | 0;
            f2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = f2;
              b[i >> 2] = 0;
              e2 = g2;
              c2 = 0;
            } else {
              f2 = d2;
            }
            d2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = e2 - d2;
            b[h >> 2] = f2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(_a, "_a");
          function $a(a2) {
            a2 = a2 | 0;
            switch (a2 | 0) {
              case 1: {
                a2 = 5;
                break;
              }
              case 5: {
                a2 = 4;
                break;
              }
              case 4: {
                a2 = 6;
                break;
              }
              case 6: {
                a2 = 2;
                break;
              }
              case 2: {
                a2 = 3;
                break;
              }
              case 3: {
                a2 = 1;
                break;
              }
              default:
            }
            return a2 | 0;
          }
          __name($a, "$a");
          function ab(a2) {
            a2 = a2 | 0;
            switch (a2 | 0) {
              case 1: {
                a2 = 3;
                break;
              }
              case 3: {
                a2 = 2;
                break;
              }
              case 2: {
                a2 = 6;
                break;
              }
              case 6: {
                a2 = 4;
                break;
              }
              case 4: {
                a2 = 5;
                break;
              }
              case 5: {
                a2 = 1;
                break;
              }
              default:
            }
            return a2 | 0;
          }
          __name(ab, "ab");
          function bb(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            c2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            d2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            e2 = b[i >> 2] | 0;
            f2 = d2 + (c2 << 1) | 0;
            b[a2 >> 2] = f2;
            d2 = e2 + (d2 << 1) | 0;
            b[h >> 2] = d2;
            c2 = (e2 << 1) + c2 | 0;
            b[i >> 2] = c2;
            e2 = d2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = e2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              d2 = e2;
              e2 = 0;
            } else {
              e2 = f2;
            }
            if ((d2 | 0) < 0) {
              e2 = e2 - d2 | 0;
              b[a2 >> 2] = e2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = e2 - c2 | 0;
            f2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = f2;
              b[i >> 2] = 0;
              e2 = g2;
              c2 = 0;
            } else {
              f2 = d2;
            }
            d2 = (f2 | 0) < (e2 | 0) ? f2 : e2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = e2 - d2;
            b[h >> 2] = f2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(bb, "bb");
          function cb(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            f2 = b[a2 >> 2] | 0;
            h = a2 + 4 | 0;
            c2 = b[h >> 2] | 0;
            i = a2 + 8 | 0;
            d2 = b[i >> 2] | 0;
            e2 = (c2 << 1) + f2 | 0;
            f2 = d2 + (f2 << 1) | 0;
            b[a2 >> 2] = f2;
            b[h >> 2] = e2;
            c2 = (d2 << 1) + c2 | 0;
            b[i >> 2] = c2;
            d2 = e2 - f2 | 0;
            if ((f2 | 0) < 0) {
              c2 = c2 - f2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = c2;
              b[a2 >> 2] = 0;
              f2 = 0;
            } else {
              d2 = e2;
            }
            if ((d2 | 0) < 0) {
              f2 = f2 - d2 | 0;
              b[a2 >> 2] = f2;
              c2 = c2 - d2 | 0;
              b[i >> 2] = c2;
              b[h >> 2] = 0;
              d2 = 0;
            }
            g2 = f2 - c2 | 0;
            e2 = d2 - c2 | 0;
            if ((c2 | 0) < 0) {
              b[a2 >> 2] = g2;
              b[h >> 2] = e2;
              b[i >> 2] = 0;
              f2 = g2;
              c2 = 0;
            } else {
              e2 = d2;
            }
            d2 = (e2 | 0) < (f2 | 0) ? e2 : f2;
            d2 = (c2 | 0) < (d2 | 0) ? c2 : d2;
            if ((d2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = f2 - d2;
            b[h >> 2] = e2 - d2;
            b[i >> 2] = c2 - d2;
            return;
          }
          __name(cb, "cb");
          function db(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            h = (b[a2 >> 2] | 0) - (b[c2 >> 2] | 0) | 0;
            i = (h | 0) < 0;
            e2 = (b[a2 + 4 >> 2] | 0) - (b[c2 + 4 >> 2] | 0) - (i ? h : 0) | 0;
            g2 = (e2 | 0) < 0;
            f2 = (i ? 0 - h | 0 : 0) + (b[a2 + 8 >> 2] | 0) - (b[c2 + 8 >> 2] | 0) + (g2 ? 0 - e2 | 0 : 0) | 0;
            a2 = (f2 | 0) < 0;
            c2 = a2 ? 0 : f2;
            d2 = (g2 ? 0 : e2) - (a2 ? f2 : 0) | 0;
            f2 = (i ? 0 : h) - (g2 ? e2 : 0) - (a2 ? f2 : 0) | 0;
            a2 = (d2 | 0) < (f2 | 0) ? d2 : f2;
            a2 = (c2 | 0) < (a2 | 0) ? c2 : a2;
            e2 = (a2 | 0) > 0;
            c2 = c2 - (e2 ? a2 : 0) | 0;
            d2 = d2 - (e2 ? a2 : 0) | 0;
            a2 = f2 - (e2 ? a2 : 0) | 0;
            a2 = (a2 | 0) > -1 ? a2 : 0 - a2 | 0;
            d2 = (d2 | 0) > -1 ? d2 : 0 - d2 | 0;
            c2 = (c2 | 0) > -1 ? c2 : 0 - c2 | 0;
            c2 = (d2 | 0) > (c2 | 0) ? d2 : c2;
            return ((a2 | 0) > (c2 | 0) ? a2 : c2) | 0;
          }
          __name(db, "db");
          function eb(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0;
            d2 = b[a2 + 8 >> 2] | 0;
            b[c2 >> 2] = (b[a2 >> 2] | 0) - d2;
            b[c2 + 4 >> 2] = (b[a2 + 4 >> 2] | 0) - d2;
            return;
          }
          __name(eb, "eb");
          function fb(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            e2 = b[a2 >> 2] | 0;
            b[c2 >> 2] = e2;
            f2 = b[a2 + 4 >> 2] | 0;
            h = c2 + 4 | 0;
            b[h >> 2] = f2;
            i = c2 + 8 | 0;
            b[i >> 2] = 0;
            d2 = (f2 | 0) < (e2 | 0);
            a2 = d2 ? e2 : f2;
            d2 = d2 ? f2 : e2;
            if ((d2 | 0) < 0) {
              if ((d2 | 0) == -2147483648 ? 1 : (a2 | 0) > 0 ? (2147483647 - a2 | 0) < (d2 | 0) : (-2147483648 - a2 | 0) > (d2 | 0)) {
                c2 = 1;
                return c2 | 0;
              }
              if ((a2 | 0) > -1 ? (a2 | -2147483648 | 0) >= (d2 | 0) : (a2 ^ -2147483648 | 0) < (d2 | 0)) {
                c2 = 1;
                return c2 | 0;
              }
            }
            a2 = f2 - e2 | 0;
            if ((e2 | 0) < 0) {
              d2 = 0 - e2 | 0;
              b[h >> 2] = a2;
              b[i >> 2] = d2;
              b[c2 >> 2] = 0;
              e2 = 0;
            } else {
              a2 = f2;
              d2 = 0;
            }
            if ((a2 | 0) < 0) {
              e2 = e2 - a2 | 0;
              b[c2 >> 2] = e2;
              d2 = d2 - a2 | 0;
              b[i >> 2] = d2;
              b[h >> 2] = 0;
              a2 = 0;
            }
            g2 = e2 - d2 | 0;
            f2 = a2 - d2 | 0;
            if ((d2 | 0) < 0) {
              b[c2 >> 2] = g2;
              b[h >> 2] = f2;
              b[i >> 2] = 0;
              a2 = f2;
              f2 = g2;
              d2 = 0;
            } else {
              f2 = e2;
            }
            e2 = (a2 | 0) < (f2 | 0) ? a2 : f2;
            e2 = (d2 | 0) < (e2 | 0) ? d2 : e2;
            if ((e2 | 0) <= 0) {
              c2 = 0;
              return c2 | 0;
            }
            b[c2 >> 2] = f2 - e2;
            b[h >> 2] = a2 - e2;
            b[i >> 2] = d2 - e2;
            c2 = 0;
            return c2 | 0;
          }
          __name(fb, "fb");
          function gb(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0;
            c2 = a2 + 8 | 0;
            f2 = b[c2 >> 2] | 0;
            d2 = f2 - (b[a2 >> 2] | 0) | 0;
            b[a2 >> 2] = d2;
            e2 = a2 + 4 | 0;
            a2 = (b[e2 >> 2] | 0) - f2 | 0;
            b[e2 >> 2] = a2;
            b[c2 >> 2] = 0 - (a2 + d2);
            return;
          }
          __name(gb, "gb");
          function hb(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            d2 = b[a2 >> 2] | 0;
            c2 = 0 - d2 | 0;
            b[a2 >> 2] = c2;
            h = a2 + 8 | 0;
            b[h >> 2] = 0;
            i = a2 + 4 | 0;
            e2 = b[i >> 2] | 0;
            f2 = e2 + d2 | 0;
            if ((d2 | 0) > 0) {
              b[i >> 2] = f2;
              b[h >> 2] = d2;
              b[a2 >> 2] = 0;
              c2 = 0;
              e2 = f2;
            } else {
              d2 = 0;
            }
            if ((e2 | 0) < 0) {
              g2 = c2 - e2 | 0;
              b[a2 >> 2] = g2;
              d2 = d2 - e2 | 0;
              b[h >> 2] = d2;
              b[i >> 2] = 0;
              f2 = g2 - d2 | 0;
              c2 = 0 - d2 | 0;
              if ((d2 | 0) < 0) {
                b[a2 >> 2] = f2;
                b[i >> 2] = c2;
                b[h >> 2] = 0;
                e2 = c2;
                d2 = 0;
              } else {
                e2 = 0;
                f2 = g2;
              }
            } else {
              f2 = c2;
            }
            c2 = (e2 | 0) < (f2 | 0) ? e2 : f2;
            c2 = (d2 | 0) < (c2 | 0) ? d2 : c2;
            if ((c2 | 0) <= 0) {
              return;
            }
            b[a2 >> 2] = f2 - c2;
            b[i >> 2] = e2 - c2;
            b[h >> 2] = d2 - c2;
            return;
          }
          __name(hb, "hb");
          function ib(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            m = T;
            T = T + 64 | 0;
            l = m;
            i = m + 56 | 0;
            if (!(true & (c2 & 2013265920 | 0) == 134217728 & (true & (e2 & 2013265920 | 0) == 134217728))) {
              f2 = 5;
              T = m;
              return f2 | 0;
            }
            if ((a2 | 0) == (d2 | 0) & (c2 | 0) == (e2 | 0)) {
              b[f2 >> 2] = 0;
              f2 = 0;
              T = m;
              return f2 | 0;
            }
            h = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            h = h & 15;
            k = Td(d2 | 0, e2 | 0, 52) | 0;
            H() | 0;
            if ((h | 0) != (k & 15 | 0)) {
              f2 = 12;
              T = m;
              return f2 | 0;
            }
            g2 = h + -1 | 0;
            if (h >>> 0 > 1) {
              Ib(a2, c2, g2, l) | 0;
              Ib(d2, e2, g2, i) | 0;
              k = l;
              j = b[k >> 2] | 0;
              k = b[k + 4 >> 2] | 0;
              a: do {
                if ((j | 0) == (b[i >> 2] | 0) ? (k | 0) == (b[i + 4 >> 2] | 0) : 0) {
                  h = (h ^ 15) * 3 | 0;
                  g2 = Td(a2 | 0, c2 | 0, h | 0) | 0;
                  H() | 0;
                  g2 = g2 & 7;
                  h = Td(d2 | 0, e2 | 0, h | 0) | 0;
                  H() | 0;
                  h = h & 7;
                  do {
                    if (!((g2 | 0) == 0 | (h | 0) == 0)) {
                      if ((g2 | 0) == 7) {
                        g2 = 5;
                      } else {
                        if ((g2 | 0) == 1 | (h | 0) == 1 ? Kb(j, k) | 0 : 0) {
                          g2 = 5;
                          break;
                        }
                        if ((b[15536 + (g2 << 2) >> 2] | 0) != (h | 0) ? (b[15568 + (g2 << 2) >> 2] | 0) != (h | 0) : 0) {
                          break a;
                        }
                        b[f2 >> 2] = 1;
                        g2 = 0;
                      }
                    } else {
                      b[f2 >> 2] = 1;
                      g2 = 0;
                    }
                  } while (0);
                  f2 = g2;
                  T = m;
                  return f2 | 0;
                }
              } while (0);
            }
            g2 = l;
            h = g2 + 56 | 0;
            do {
              b[g2 >> 2] = 0;
              g2 = g2 + 4 | 0;
            } while ((g2 | 0) < (h | 0));
            aa(a2, c2, 1, l) | 0;
            c2 = l;
            if (((((!((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0) ? (c2 = l + 8 | 0, !((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0)) : 0) ? (c2 = l + 16 | 0, !((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0)) : 0) ? (c2 = l + 24 | 0, !((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0)) : 0) ? (c2 = l + 32 | 0, !((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0)) : 0) ? (c2 = l + 40 | 0, !((b[c2 >> 2] | 0) == (d2 | 0) ? (b[c2 + 4 >> 2] | 0) == (e2 | 0) : 0)) : 0) {
              g2 = l + 48 | 0;
              g2 = ((b[g2 >> 2] | 0) == (d2 | 0) ? (b[g2 + 4 >> 2] | 0) == (e2 | 0) : 0) & 1;
            } else {
              g2 = 1;
            }
            b[f2 >> 2] = g2;
            f2 = 0;
            T = m;
            return f2 | 0;
          }
          __name(ib, "ib");
          function jb(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            d2 = ia(a2, c2, d2, e2) | 0;
            if ((d2 | 0) == 7) {
              f2 = 11;
              return f2 | 0;
            }
            e2 = Ud(d2 | 0, 0, 56) | 0;
            c2 = c2 & -2130706433 | (H() | 0) | 268435456;
            b[f2 >> 2] = a2 | e2;
            b[f2 + 4 >> 2] = c2;
            f2 = 0;
            return f2 | 0;
          }
          __name(jb, "jb");
          function kb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            if (!(true & (c2 & 2013265920 | 0) == 268435456)) {
              d2 = 6;
              return d2 | 0;
            }
            b[d2 >> 2] = a2;
            b[d2 + 4 >> 2] = c2 & -2130706433 | 134217728;
            d2 = 0;
            return d2 | 0;
          }
          __name(kb, "kb");
          function lb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            f2 = T;
            T = T + 16 | 0;
            e2 = f2;
            b[e2 >> 2] = 0;
            if (!(true & (c2 & 2013265920 | 0) == 268435456)) {
              e2 = 6;
              T = f2;
              return e2 | 0;
            }
            g2 = Td(a2 | 0, c2 | 0, 56) | 0;
            H() | 0;
            e2 = ea(a2, c2 & -2130706433 | 134217728, g2 & 7, e2, d2) | 0;
            T = f2;
            return e2 | 0;
          }
          __name(lb, "lb");
          function mb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0;
            c2 = Td(a2 | 0, b2 | 0, 56) | 0;
            H() | 0;
            switch (c2 & 7) {
              case 0:
              case 7: {
                c2 = 0;
                return c2 | 0;
              }
              default:
            }
            c2 = b2 & -2130706433 | 134217728;
            if (!(true & (b2 & 2013265920 | 0) == 268435456)) {
              c2 = 0;
              return c2 | 0;
            }
            if (true & (b2 & 117440512 | 0) == 16777216 & (Kb(a2, c2) | 0) != 0) {
              c2 = 0;
              return c2 | 0;
            }
            c2 = Fb(a2, c2) | 0;
            return c2 | 0;
          }
          __name(mb, "mb");
          function nb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0;
            f2 = T;
            T = T + 16 | 0;
            e2 = f2;
            if (!(true & (c2 & 2013265920 | 0) == 268435456)) {
              e2 = 6;
              T = f2;
              return e2 | 0;
            }
            g2 = c2 & -2130706433 | 134217728;
            h = d2;
            b[h >> 2] = a2;
            b[h + 4 >> 2] = g2;
            b[e2 >> 2] = 0;
            c2 = Td(a2 | 0, c2 | 0, 56) | 0;
            H() | 0;
            e2 = ea(a2, g2, c2 & 7, e2, d2 + 8 | 0) | 0;
            T = f2;
            return e2 | 0;
          }
          __name(nb, "nb");
          function ob(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0;
            f2 = (Kb(a2, c2) | 0) == 0;
            c2 = c2 & -2130706433;
            e2 = d2;
            b[e2 >> 2] = f2 ? a2 : 0;
            b[e2 + 4 >> 2] = f2 ? c2 | 285212672 : 0;
            e2 = d2 + 8 | 0;
            b[e2 >> 2] = a2;
            b[e2 + 4 >> 2] = c2 | 301989888;
            e2 = d2 + 16 | 0;
            b[e2 >> 2] = a2;
            b[e2 + 4 >> 2] = c2 | 318767104;
            e2 = d2 + 24 | 0;
            b[e2 >> 2] = a2;
            b[e2 + 4 >> 2] = c2 | 335544320;
            e2 = d2 + 32 | 0;
            b[e2 >> 2] = a2;
            b[e2 + 4 >> 2] = c2 | 352321536;
            d2 = d2 + 40 | 0;
            b[d2 >> 2] = a2;
            b[d2 + 4 >> 2] = c2 | 369098752;
            return 0;
          }
          __name(ob, "ob");
          function pb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0;
            h = T;
            T = T + 16 | 0;
            f2 = h;
            g2 = c2 & -2130706433 | 134217728;
            if (!(true & (c2 & 2013265920 | 0) == 268435456)) {
              g2 = 6;
              T = h;
              return g2 | 0;
            }
            e2 = Td(a2 | 0, c2 | 0, 56) | 0;
            H() | 0;
            e2 = rd(a2, g2, e2 & 7) | 0;
            if ((e2 | 0) == -1) {
              b[d2 >> 2] = 0;
              g2 = 6;
              T = h;
              return g2 | 0;
            }
            if ($b(a2, g2, f2) | 0) {
              I(27795, 26932, 282, 26947);
            }
            c2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            c2 = c2 & 15;
            if (!(Kb(a2, g2) | 0)) {
              zb(f2, c2, e2, 2, d2);
            } else {
              vb(f2, c2, e2, 2, d2);
            }
            g2 = 0;
            T = h;
            return g2 | 0;
          }
          __name(pb, "pb");
          function qb(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0;
            d2 = T;
            T = T + 16 | 0;
            e2 = d2;
            rb(a2, b2, c2, e2);
            La(e2, c2 + 4 | 0);
            T = d2;
            return;
          }
          __name(qb, "qb");
          function rb(a2, c2, d2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0;
            j = T;
            T = T + 16 | 0;
            k = j;
            sb(a2, d2, k);
            h = +w(+(1 - +e[k >> 3] * 0.5));
            if (h < 1e-16) {
              b[f2 >> 2] = 0;
              b[f2 + 4 >> 2] = 0;
              b[f2 + 8 >> 2] = 0;
              b[f2 + 12 >> 2] = 0;
              T = j;
              return;
            }
            k = b[d2 >> 2] | 0;
            g2 = +e[15920 + (k * 24 | 0) >> 3];
            g2 = +lc(g2 - +lc(+rc(15600 + (k << 4) | 0, a2)));
            if (!(Yb(c2) | 0)) {
              i = g2;
            } else {
              i = +lc(g2 + -0.3334731722518321);
            }
            g2 = +v(+h) * 2.618033988749896;
            if ((c2 | 0) > 0) {
              a2 = 0;
              do {
                g2 = g2 * 2.6457513110645907;
                a2 = a2 + 1 | 0;
              } while ((a2 | 0) != (c2 | 0));
            }
            h = +t(+i) * g2;
            e[f2 >> 3] = h;
            i = +u(+i) * g2;
            e[f2 + 8 >> 3] = i;
            T = j;
            return;
          }
          __name(rb, "rb");
          function sb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0;
            h = T;
            T = T + 32 | 0;
            g2 = h;
            qd(a2, g2);
            b[c2 >> 2] = 0;
            e[d2 >> 3] = 5;
            f2 = +pd(16400, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 0;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16424, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 1;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16448, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 2;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16472, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 3;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16496, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 4;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16520, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 5;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16544, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 6;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16568, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 7;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16592, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 8;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16616, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 9;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16640, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 10;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16664, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 11;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16688, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 12;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16712, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 13;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16736, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 14;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16760, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 15;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16784, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 16;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16808, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 17;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16832, g2);
            if (f2 < +e[d2 >> 3]) {
              b[c2 >> 2] = 18;
              e[d2 >> 3] = f2;
            }
            f2 = +pd(16856, g2);
            if (!(f2 < +e[d2 >> 3])) {
              T = h;
              return;
            }
            b[c2 >> 2] = 19;
            e[d2 >> 3] = f2;
            T = h;
            return;
          }
          __name(sb, "sb");
          function tb(a2, c2, d2, f2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0;
            h = +md(a2);
            if (h < 1e-16) {
              c2 = 15600 + (c2 << 4) | 0;
              b[g2 >> 2] = b[c2 >> 2];
              b[g2 + 4 >> 2] = b[c2 + 4 >> 2];
              b[g2 + 8 >> 2] = b[c2 + 8 >> 2];
              b[g2 + 12 >> 2] = b[c2 + 12 >> 2];
              return;
            }
            i = +z(+ +e[a2 + 8 >> 3], + +e[a2 >> 3]);
            if ((d2 | 0) > 0) {
              a2 = 0;
              do {
                h = h * 0.37796447300922725;
                a2 = a2 + 1 | 0;
              } while ((a2 | 0) != (d2 | 0));
            }
            j = h * 0.3333333333333333;
            if (!f2) {
              h = +y(+(h * 0.381966011250105));
              if (Yb(d2) | 0) {
                i = +lc(i + 0.3334731722518321);
              }
            } else {
              d2 = (Yb(d2) | 0) == 0;
              h = +y(+((d2 ? j : j * 0.37796447300922725) * 0.381966011250105));
            }
            sc(15600 + (c2 << 4) | 0, +lc(+e[15920 + (c2 * 24 | 0) >> 3] - i), h, g2);
            return;
          }
          __name(tb, "tb");
          function ub(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0;
            e2 = T;
            T = T + 16 | 0;
            f2 = e2;
            Na(a2 + 4 | 0, f2);
            tb(f2, b[a2 >> 2] | 0, c2, 0, d2);
            T = e2;
            return;
          }
          __name(ub, "ub");
          function vb(a2, c2, d2, f2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0, E2 = 0, F = 0, G2 = 0, H2 = 0, J2 = 0;
            G2 = T;
            T = T + 272 | 0;
            h = G2 + 256 | 0;
            u2 = G2 + 240 | 0;
            D2 = G2;
            E2 = G2 + 224 | 0;
            F = G2 + 208 | 0;
            v2 = G2 + 176 | 0;
            w2 = G2 + 160 | 0;
            x2 = G2 + 192 | 0;
            y2 = G2 + 144 | 0;
            z2 = G2 + 128 | 0;
            A2 = G2 + 112 | 0;
            B2 = G2 + 96 | 0;
            C2 = G2 + 80 | 0;
            b[h >> 2] = c2;
            b[u2 >> 2] = b[a2 >> 2];
            b[u2 + 4 >> 2] = b[a2 + 4 >> 2];
            b[u2 + 8 >> 2] = b[a2 + 8 >> 2];
            b[u2 + 12 >> 2] = b[a2 + 12 >> 2];
            wb(u2, h, D2);
            b[g2 >> 2] = 0;
            u2 = f2 + d2 + ((f2 | 0) == 5 & 1) | 0;
            if ((u2 | 0) <= (d2 | 0)) {
              T = G2;
              return;
            }
            k = b[h >> 2] | 0;
            l = E2 + 4 | 0;
            m = v2 + 4 | 0;
            n = d2 + 5 | 0;
            o = 16880 + (k << 2) | 0;
            p2 = 16960 + (k << 2) | 0;
            q2 = z2 + 8 | 0;
            r2 = A2 + 8 | 0;
            s2 = B2 + 8 | 0;
            t2 = F + 4 | 0;
            j = d2;
            a: while (1) {
              i = D2 + (((j | 0) % 5 | 0) << 4) | 0;
              b[F >> 2] = b[i >> 2];
              b[F + 4 >> 2] = b[i + 4 >> 2];
              b[F + 8 >> 2] = b[i + 8 >> 2];
              b[F + 12 >> 2] = b[i + 12 >> 2];
              do {
              } while ((xb(F, k, 0, 1) | 0) == 2);
              if ((j | 0) > (d2 | 0) & (Yb(c2) | 0) != 0) {
                b[v2 >> 2] = b[F >> 2];
                b[v2 + 4 >> 2] = b[F + 4 >> 2];
                b[v2 + 8 >> 2] = b[F + 8 >> 2];
                b[v2 + 12 >> 2] = b[F + 12 >> 2];
                Na(l, w2);
                f2 = b[v2 >> 2] | 0;
                h = b[17040 + (f2 * 80 | 0) + (b[E2 >> 2] << 2) >> 2] | 0;
                b[v2 >> 2] = b[18640 + (f2 * 80 | 0) + (h * 20 | 0) >> 2];
                i = b[18640 + (f2 * 80 | 0) + (h * 20 | 0) + 16 >> 2] | 0;
                if ((i | 0) > 0) {
                  a2 = 0;
                  do {
                    Za(m);
                    a2 = a2 + 1 | 0;
                  } while ((a2 | 0) < (i | 0));
                }
                i = 18640 + (f2 * 80 | 0) + (h * 20 | 0) + 4 | 0;
                b[x2 >> 2] = b[i >> 2];
                b[x2 + 4 >> 2] = b[i + 4 >> 2];
                b[x2 + 8 >> 2] = b[i + 8 >> 2];
                Qa(x2, (b[o >> 2] | 0) * 3 | 0);
                Oa(m, x2, m);
                Ma(m);
                Na(m, y2);
                H2 = +(b[p2 >> 2] | 0);
                e[z2 >> 3] = H2 * 3;
                e[q2 >> 3] = 0;
                J2 = H2 * -1.5;
                e[A2 >> 3] = J2;
                e[r2 >> 3] = H2 * 2.598076211353316;
                e[B2 >> 3] = J2;
                e[s2 >> 3] = H2 * -2.598076211353316;
                switch (b[17040 + ((b[v2 >> 2] | 0) * 80 | 0) + (b[F >> 2] << 2) >> 2] | 0) {
                  case 1: {
                    a2 = A2;
                    f2 = z2;
                    break;
                  }
                  case 3: {
                    a2 = B2;
                    f2 = A2;
                    break;
                  }
                  case 2: {
                    a2 = z2;
                    f2 = B2;
                    break;
                  }
                  default: {
                    a2 = 12;
                    break a;
                  }
                }
                nd(w2, y2, f2, a2, C2);
                tb(C2, b[v2 >> 2] | 0, k, 1, g2 + 8 + (b[g2 >> 2] << 4) | 0);
                b[g2 >> 2] = (b[g2 >> 2] | 0) + 1;
              }
              if ((j | 0) < (n | 0)) {
                Na(t2, v2);
                tb(v2, b[F >> 2] | 0, k, 1, g2 + 8 + (b[g2 >> 2] << 4) | 0);
                b[g2 >> 2] = (b[g2 >> 2] | 0) + 1;
              }
              b[E2 >> 2] = b[F >> 2];
              b[E2 + 4 >> 2] = b[F + 4 >> 2];
              b[E2 + 8 >> 2] = b[F + 8 >> 2];
              b[E2 + 12 >> 2] = b[F + 12 >> 2];
              j = j + 1 | 0;
              if ((j | 0) >= (u2 | 0)) {
                a2 = 3;
                break;
              }
            }
            if ((a2 | 0) == 3) {
              T = G2;
              return;
            } else if ((a2 | 0) == 12) {
              I(26970, 27017, 572, 27027);
            }
          }
          __name(vb, "vb");
          function wb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 128 | 0;
            e2 = j + 64 | 0;
            f2 = j;
            g2 = e2;
            h = 20240;
            i = g2 + 60 | 0;
            do {
              b[g2 >> 2] = b[h >> 2];
              g2 = g2 + 4 | 0;
              h = h + 4 | 0;
            } while ((g2 | 0) < (i | 0));
            g2 = f2;
            h = 20304;
            i = g2 + 60 | 0;
            do {
              b[g2 >> 2] = b[h >> 2];
              g2 = g2 + 4 | 0;
              h = h + 4 | 0;
            } while ((g2 | 0) < (i | 0));
            i = (Yb(b[c2 >> 2] | 0) | 0) == 0;
            e2 = i ? e2 : f2;
            f2 = a2 + 4 | 0;
            bb(f2);
            cb(f2);
            if (Yb(b[c2 >> 2] | 0) | 0) {
              Xa(f2);
              b[c2 >> 2] = (b[c2 >> 2] | 0) + 1;
            }
            b[d2 >> 2] = b[a2 >> 2];
            c2 = d2 + 4 | 0;
            Oa(f2, e2, c2);
            Ma(c2);
            b[d2 + 16 >> 2] = b[a2 >> 2];
            c2 = d2 + 20 | 0;
            Oa(f2, e2 + 12 | 0, c2);
            Ma(c2);
            b[d2 + 32 >> 2] = b[a2 >> 2];
            c2 = d2 + 36 | 0;
            Oa(f2, e2 + 24 | 0, c2);
            Ma(c2);
            b[d2 + 48 >> 2] = b[a2 >> 2];
            c2 = d2 + 52 | 0;
            Oa(f2, e2 + 36 | 0, c2);
            Ma(c2);
            b[d2 + 64 >> 2] = b[a2 >> 2];
            d2 = d2 + 68 | 0;
            Oa(f2, e2 + 48 | 0, d2);
            Ma(d2);
            T = j;
            return;
          }
          __name(wb, "wb");
          function xb(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0;
            p2 = T;
            T = T + 32 | 0;
            n = p2 + 12 | 0;
            i = p2;
            o = a2 + 4 | 0;
            m = b[16960 + (c2 << 2) >> 2] | 0;
            l = (e2 | 0) != 0;
            m = l ? m * 3 | 0 : m;
            f2 = b[o >> 2] | 0;
            k = a2 + 8 | 0;
            h = b[k >> 2] | 0;
            if (l) {
              g2 = a2 + 12 | 0;
              e2 = b[g2 >> 2] | 0;
              f2 = h + f2 + e2 | 0;
              if ((f2 | 0) == (m | 0)) {
                o = 1;
                T = p2;
                return o | 0;
              } else {
                j = g2;
              }
            } else {
              j = a2 + 12 | 0;
              e2 = b[j >> 2] | 0;
              f2 = h + f2 + e2 | 0;
            }
            if ((f2 | 0) <= (m | 0)) {
              o = 0;
              T = p2;
              return o | 0;
            }
            do {
              if ((e2 | 0) > 0) {
                e2 = b[a2 >> 2] | 0;
                if ((h | 0) > 0) {
                  g2 = 18640 + (e2 * 80 | 0) + 60 | 0;
                  e2 = a2;
                  break;
                }
                e2 = 18640 + (e2 * 80 | 0) + 40 | 0;
                if (!d2) {
                  g2 = e2;
                  e2 = a2;
                } else {
                  Ka(n, m, 0, 0);
                  Pa(o, n, i);
                  _a(i);
                  Oa(i, n, o);
                  g2 = e2;
                  e2 = a2;
                }
              } else {
                g2 = 18640 + ((b[a2 >> 2] | 0) * 80 | 0) + 20 | 0;
                e2 = a2;
              }
            } while (0);
            b[e2 >> 2] = b[g2 >> 2];
            f2 = g2 + 16 | 0;
            if ((b[f2 >> 2] | 0) > 0) {
              e2 = 0;
              do {
                Za(o);
                e2 = e2 + 1 | 0;
              } while ((e2 | 0) < (b[f2 >> 2] | 0));
            }
            a2 = g2 + 4 | 0;
            b[n >> 2] = b[a2 >> 2];
            b[n + 4 >> 2] = b[a2 + 4 >> 2];
            b[n + 8 >> 2] = b[a2 + 8 >> 2];
            c2 = b[16880 + (c2 << 2) >> 2] | 0;
            Qa(n, l ? c2 * 3 | 0 : c2);
            Oa(o, n, o);
            Ma(o);
            if (l) {
              e2 = ((b[k >> 2] | 0) + (b[o >> 2] | 0) + (b[j >> 2] | 0) | 0) == (m | 0) ? 1 : 2;
            } else {
              e2 = 2;
            }
            o = e2;
            T = p2;
            return o | 0;
          }
          __name(xb, "xb");
          function yb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0;
            do {
              c2 = xb(a2, b2, 0, 1) | 0;
            } while ((c2 | 0) == 2);
            return c2 | 0;
          }
          __name(yb, "yb");
          function zb(a2, c2, d2, f2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0;
            B2 = T;
            T = T + 240 | 0;
            h = B2 + 224 | 0;
            x2 = B2 + 208 | 0;
            y2 = B2;
            z2 = B2 + 192 | 0;
            A2 = B2 + 176 | 0;
            s2 = B2 + 160 | 0;
            t2 = B2 + 144 | 0;
            u2 = B2 + 128 | 0;
            v2 = B2 + 112 | 0;
            w2 = B2 + 96 | 0;
            b[h >> 2] = c2;
            b[x2 >> 2] = b[a2 >> 2];
            b[x2 + 4 >> 2] = b[a2 + 4 >> 2];
            b[x2 + 8 >> 2] = b[a2 + 8 >> 2];
            b[x2 + 12 >> 2] = b[a2 + 12 >> 2];
            Ab(x2, h, y2);
            b[g2 >> 2] = 0;
            r2 = f2 + d2 + ((f2 | 0) == 6 & 1) | 0;
            if ((r2 | 0) <= (d2 | 0)) {
              T = B2;
              return;
            }
            k = b[h >> 2] | 0;
            l = d2 + 6 | 0;
            m = 16960 + (k << 2) | 0;
            n = t2 + 8 | 0;
            o = u2 + 8 | 0;
            p2 = v2 + 8 | 0;
            q2 = z2 + 4 | 0;
            i = 0;
            j = d2;
            f2 = -1;
            a: while (1) {
              h = (j | 0) % 6 | 0;
              a2 = y2 + (h << 4) | 0;
              b[z2 >> 2] = b[a2 >> 2];
              b[z2 + 4 >> 2] = b[a2 + 4 >> 2];
              b[z2 + 8 >> 2] = b[a2 + 8 >> 2];
              b[z2 + 12 >> 2] = b[a2 + 12 >> 2];
              a2 = i;
              i = xb(z2, k, 0, 1) | 0;
              if ((j | 0) > (d2 | 0) & (Yb(c2) | 0) != 0 ? (a2 | 0) != 1 ? (b[z2 >> 2] | 0) != (f2 | 0) : 0 : 0) {
                Na(y2 + (((h + 5 | 0) % 6 | 0) << 4) + 4 | 0, A2);
                Na(y2 + (h << 4) + 4 | 0, s2);
                C2 = +(b[m >> 2] | 0);
                e[t2 >> 3] = C2 * 3;
                e[n >> 3] = 0;
                D2 = C2 * -1.5;
                e[u2 >> 3] = D2;
                e[o >> 3] = C2 * 2.598076211353316;
                e[v2 >> 3] = D2;
                e[p2 >> 3] = C2 * -2.598076211353316;
                h = b[x2 >> 2] | 0;
                switch (b[17040 + (h * 80 | 0) + (((f2 | 0) == (h | 0) ? b[z2 >> 2] | 0 : f2) << 2) >> 2] | 0) {
                  case 1: {
                    a2 = u2;
                    f2 = t2;
                    break;
                  }
                  case 3: {
                    a2 = v2;
                    f2 = u2;
                    break;
                  }
                  case 2: {
                    a2 = t2;
                    f2 = v2;
                    break;
                  }
                  default: {
                    a2 = 8;
                    break a;
                  }
                }
                nd(A2, s2, f2, a2, w2);
                if (!(od(A2, w2) | 0) ? !(od(s2, w2) | 0) : 0) {
                  tb(w2, b[x2 >> 2] | 0, k, 1, g2 + 8 + (b[g2 >> 2] << 4) | 0);
                  b[g2 >> 2] = (b[g2 >> 2] | 0) + 1;
                }
              }
              if ((j | 0) < (l | 0)) {
                Na(q2, A2);
                tb(A2, b[z2 >> 2] | 0, k, 1, g2 + 8 + (b[g2 >> 2] << 4) | 0);
                b[g2 >> 2] = (b[g2 >> 2] | 0) + 1;
              }
              j = j + 1 | 0;
              if ((j | 0) >= (r2 | 0)) {
                a2 = 3;
                break;
              } else {
                f2 = b[z2 >> 2] | 0;
              }
            }
            if ((a2 | 0) == 3) {
              T = B2;
              return;
            } else if ((a2 | 0) == 8) {
              I(27054, 27017, 737, 27099);
            }
          }
          __name(zb, "zb");
          function Ab(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 160 | 0;
            e2 = j + 80 | 0;
            f2 = j;
            g2 = e2;
            h = 20368;
            i = g2 + 72 | 0;
            do {
              b[g2 >> 2] = b[h >> 2];
              g2 = g2 + 4 | 0;
              h = h + 4 | 0;
            } while ((g2 | 0) < (i | 0));
            g2 = f2;
            h = 20448;
            i = g2 + 72 | 0;
            do {
              b[g2 >> 2] = b[h >> 2];
              g2 = g2 + 4 | 0;
              h = h + 4 | 0;
            } while ((g2 | 0) < (i | 0));
            i = (Yb(b[c2 >> 2] | 0) | 0) == 0;
            e2 = i ? e2 : f2;
            f2 = a2 + 4 | 0;
            bb(f2);
            cb(f2);
            if (Yb(b[c2 >> 2] | 0) | 0) {
              Xa(f2);
              b[c2 >> 2] = (b[c2 >> 2] | 0) + 1;
            }
            b[d2 >> 2] = b[a2 >> 2];
            c2 = d2 + 4 | 0;
            Oa(f2, e2, c2);
            Ma(c2);
            b[d2 + 16 >> 2] = b[a2 >> 2];
            c2 = d2 + 20 | 0;
            Oa(f2, e2 + 12 | 0, c2);
            Ma(c2);
            b[d2 + 32 >> 2] = b[a2 >> 2];
            c2 = d2 + 36 | 0;
            Oa(f2, e2 + 24 | 0, c2);
            Ma(c2);
            b[d2 + 48 >> 2] = b[a2 >> 2];
            c2 = d2 + 52 | 0;
            Oa(f2, e2 + 36 | 0, c2);
            Ma(c2);
            b[d2 + 64 >> 2] = b[a2 >> 2];
            c2 = d2 + 68 | 0;
            Oa(f2, e2 + 48 | 0, c2);
            Ma(c2);
            b[d2 + 80 >> 2] = b[a2 >> 2];
            d2 = d2 + 84 | 0;
            Oa(f2, e2 + 60 | 0, d2);
            Ma(d2);
            T = j;
            return;
          }
          __name(Ab, "Ab");
          function Bb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            b2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            return b2 & 15 | 0;
          }
          __name(Bb, "Bb");
          function Cb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            b2 = Td(a2 | 0, b2 | 0, 45) | 0;
            H() | 0;
            return b2 & 127 | 0;
          }
          __name(Cb, "Cb");
          function Db(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            if ((d2 + -1 | 0) >>> 0 > 14) {
              e2 = 4;
              return e2 | 0;
            }
            d2 = Td(a2 | 0, c2 | 0, (15 - d2 | 0) * 3 | 0) | 0;
            H() | 0;
            b[e2 >> 2] = d2 & 7;
            e2 = 0;
            return e2 | 0;
          }
          __name(Db, "Db");
          function Eb(c2, d2, e2, f2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            if (c2 >>> 0 > 15) {
              f2 = 4;
              return f2 | 0;
            }
            if (d2 >>> 0 > 121) {
              f2 = 17;
              return f2 | 0;
            }
            i = Ud(c2 | 0, 0, 52) | 0;
            g2 = H() | 0;
            j = Ud(d2 | 0, 0, 45) | 0;
            g2 = g2 | (H() | 0) | 134225919;
            a: do {
              if ((c2 | 0) >= 1) {
                j = 1;
                i = (a[20528 + d2 >> 0] | 0) != 0;
                h = -1;
                while (1) {
                  d2 = b[e2 + (j + -1 << 2) >> 2] | 0;
                  if (d2 >>> 0 > 6) {
                    g2 = 18;
                    d2 = 10;
                    break;
                  }
                  if (!((d2 | 0) == 0 | i ^ 1)) {
                    if ((d2 | 0) == 1) {
                      g2 = 19;
                      d2 = 10;
                      break;
                    } else {
                      i = 0;
                    }
                  }
                  l = (15 - j | 0) * 3 | 0;
                  k = Ud(7, 0, l | 0) | 0;
                  g2 = g2 & ~(H() | 0);
                  d2 = Ud(d2 | 0, ((d2 | 0) < 0) << 31 >> 31 | 0, l | 0) | 0;
                  h = d2 | h & ~k;
                  g2 = H() | 0 | g2;
                  if ((j | 0) < (c2 | 0)) {
                    j = j + 1 | 0;
                  } else {
                    break a;
                  }
                }
                if ((d2 | 0) == 10) {
                  return g2 | 0;
                }
              } else {
                h = -1;
              }
            } while (0);
            l = f2;
            b[l >> 2] = h;
            b[l + 4 >> 2] = g2;
            l = 0;
            return l | 0;
          }
          __name(Eb, "Eb");
          function Fb(b2, c2) {
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0;
            if (!(true & (c2 & -16777216 | 0) == 134217728)) {
              b2 = 0;
              return b2 | 0;
            }
            e2 = Td(b2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            d2 = Td(b2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            d2 = d2 & 127;
            if (d2 >>> 0 > 121) {
              b2 = 0;
              return b2 | 0;
            }
            h = (e2 ^ 15) * 3 | 0;
            f2 = Td(b2 | 0, c2 | 0, h | 0) | 0;
            h = Ud(f2 | 0, H() | 0, h | 0) | 0;
            f2 = H() | 0;
            g2 = Kd(-1227133514, -1171, h | 0, f2 | 0) | 0;
            if (!((h & 613566756 & g2 | 0) == 0 & (f2 & 4681 & (H() | 0) | 0) == 0)) {
              h = 0;
              return h | 0;
            }
            h = (e2 * 3 | 0) + 19 | 0;
            g2 = Ud(~b2 | 0, ~c2 | 0, h | 0) | 0;
            h = Td(g2 | 0, H() | 0, h | 0) | 0;
            if (!((e2 | 0) == 15 | (h | 0) == 0 & (H() | 0) == 0)) {
              h = 0;
              return h | 0;
            }
            if (!(a[20528 + d2 >> 0] | 0)) {
              h = 1;
              return h | 0;
            }
            c2 = c2 & 8191;
            if ((b2 | 0) == 0 & (c2 | 0) == 0) {
              h = 1;
              return h | 0;
            } else {
              h = Vd(b2 | 0, c2 | 0, 0) | 0;
              H() | 0;
              return ((63 - h | 0) % 3 | 0 | 0) != 0 | 0;
            }
            return 0;
          }
          __name(Fb, "Fb");
          function Gb(b2, c2) {
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0;
            if (((true & (c2 & -16777216 | 0) == 134217728 ? (e2 = Td(b2 | 0, c2 | 0, 52) | 0, H() | 0, e2 = e2 & 15, d2 = Td(b2 | 0, c2 | 0, 45) | 0, H() | 0, d2 = d2 & 127, d2 >>> 0 <= 121) : 0) ? (h = (e2 ^ 15) * 3 | 0, f2 = Td(b2 | 0, c2 | 0, h | 0) | 0, h = Ud(f2 | 0, H() | 0, h | 0) | 0, f2 = H() | 0, g2 = Kd(-1227133514, -1171, h | 0, f2 | 0) | 0, (h & 613566756 & g2 | 0) == 0 & (f2 & 4681 & (H() | 0) | 0) == 0) : 0) ? (h = (e2 * 3 | 0) + 19 | 0, g2 = Ud(~b2 | 0, ~c2 | 0, h | 0) | 0, h = Td(g2 | 0, H() | 0, h | 0) | 0, (e2 | 0) == 15 | (h | 0) == 0 & (H() | 0) == 0) : 0) {
              if (!(a[20528 + d2 >> 0] | 0)) {
                h = 1;
                return h | 0;
              }
              d2 = c2 & 8191;
              if ((b2 | 0) == 0 & (d2 | 0) == 0) {
                h = 1;
                return h | 0;
              }
              h = Vd(b2 | 0, d2 | 0, 0) | 0;
              H() | 0;
              if ((63 - h | 0) % 3 | 0 | 0) {
                h = 1;
                return h | 0;
              }
            }
            if (mb(b2, c2) | 0) {
              h = 1;
              return h | 0;
            }
            h = (wd(b2, c2) | 0) != 0 & 1;
            return h | 0;
          }
          __name(Gb, "Gb");
          function Hb(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0;
            f2 = Ud(c2 | 0, 0, 52) | 0;
            g2 = H() | 0;
            d2 = Ud(d2 | 0, 0, 45) | 0;
            d2 = g2 | (H() | 0) | 134225919;
            if ((c2 | 0) < 1) {
              g2 = -1;
              e2 = d2;
              c2 = a2;
              b[c2 >> 2] = g2;
              a2 = a2 + 4 | 0;
              b[a2 >> 2] = e2;
              return;
            }
            g2 = 1;
            f2 = -1;
            while (1) {
              h = (15 - g2 | 0) * 3 | 0;
              i = Ud(7, 0, h | 0) | 0;
              d2 = d2 & ~(H() | 0);
              h = Ud(e2 | 0, 0, h | 0) | 0;
              f2 = f2 & ~i | h;
              d2 = d2 | (H() | 0);
              if ((g2 | 0) == (c2 | 0)) {
                break;
              } else {
                g2 = g2 + 1 | 0;
              }
            }
            i = a2;
            h = i;
            b[h >> 2] = f2;
            i = i + 4 | 0;
            b[i >> 2] = d2;
            return;
          }
          __name(Hb, "Hb");
          function Ib(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0;
            g2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            g2 = g2 & 15;
            if (d2 >>> 0 > 15) {
              e2 = 4;
              return e2 | 0;
            }
            if ((g2 | 0) < (d2 | 0)) {
              e2 = 12;
              return e2 | 0;
            }
            if ((g2 | 0) == (d2 | 0)) {
              b[e2 >> 2] = a2;
              b[e2 + 4 >> 2] = c2;
              e2 = 0;
              return e2 | 0;
            }
            f2 = Ud(d2 | 0, 0, 52) | 0;
            f2 = f2 | a2;
            a2 = H() | 0 | c2 & -15728641;
            if ((g2 | 0) > (d2 | 0)) {
              do {
                c2 = Ud(7, 0, (14 - d2 | 0) * 3 | 0) | 0;
                d2 = d2 + 1 | 0;
                f2 = c2 | f2;
                a2 = H() | 0 | a2;
              } while ((d2 | 0) < (g2 | 0));
            }
            b[e2 >> 2] = f2;
            b[e2 + 4 >> 2] = a2;
            e2 = 0;
            return e2 | 0;
          }
          __name(Ib, "Ib");
          function Jb(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0;
            g2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            g2 = g2 & 15;
            if (!((d2 | 0) < 16 & (g2 | 0) <= (d2 | 0))) {
              e2 = 4;
              return e2 | 0;
            }
            f2 = d2 - g2 | 0;
            d2 = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            a: do {
              if (!(oa(d2 & 127) | 0)) {
                d2 = Rc(7, 0, f2, ((f2 | 0) < 0) << 31 >> 31) | 0;
                f2 = H() | 0;
              } else {
                b: do {
                  if (g2 | 0) {
                    d2 = 1;
                    while (1) {
                      h = Ud(7, 0, (15 - d2 | 0) * 3 | 0) | 0;
                      if (!((h & a2 | 0) == 0 & ((H() | 0) & c2 | 0) == 0)) {
                        break;
                      }
                      if (d2 >>> 0 < g2 >>> 0) {
                        d2 = d2 + 1 | 0;
                      } else {
                        break b;
                      }
                    }
                    d2 = Rc(7, 0, f2, ((f2 | 0) < 0) << 31 >> 31) | 0;
                    f2 = H() | 0;
                    break a;
                  }
                } while (0);
                d2 = Rc(7, 0, f2, ((f2 | 0) < 0) << 31 >> 31) | 0;
                d2 = Pd(d2 | 0, H() | 0, 5, 0) | 0;
                d2 = Jd(d2 | 0, H() | 0, -5, -1) | 0;
                d2 = Nd(d2 | 0, H() | 0, 6, 0) | 0;
                d2 = Jd(d2 | 0, H() | 0, 1, 0) | 0;
                f2 = H() | 0;
              }
            } while (0);
            h = e2;
            b[h >> 2] = d2;
            b[h + 4 >> 2] = f2;
            h = 0;
            return h | 0;
          }
          __name(Jb, "Jb");
          function Kb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            e2 = Td(a2 | 0, b2 | 0, 45) | 0;
            H() | 0;
            if (!(oa(e2 & 127) | 0)) {
              e2 = 0;
              return e2 | 0;
            }
            e2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            a: do {
              if (!e2) {
                c2 = 0;
              } else {
                d2 = 1;
                while (1) {
                  c2 = Td(a2 | 0, b2 | 0, (15 - d2 | 0) * 3 | 0) | 0;
                  H() | 0;
                  c2 = c2 & 7;
                  if (c2 | 0) {
                    break a;
                  }
                  if (d2 >>> 0 < e2 >>> 0) {
                    d2 = d2 + 1 | 0;
                  } else {
                    c2 = 0;
                    break;
                  }
                }
              }
            } while (0);
            e2 = (c2 | 0) == 0 & 1;
            return e2 | 0;
          }
          __name(Kb, "Kb");
          function Lb(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0;
            h = T;
            T = T + 16 | 0;
            g2 = h;
            ic(g2, a2, c2, d2);
            c2 = g2;
            a2 = b[c2 >> 2] | 0;
            c2 = b[c2 + 4 >> 2] | 0;
            if ((a2 | 0) == 0 & (c2 | 0) == 0) {
              T = h;
              return 0;
            }
            f2 = 0;
            d2 = 0;
            do {
              i = e2 + (f2 << 3) | 0;
              b[i >> 2] = a2;
              b[i + 4 >> 2] = c2;
              f2 = Jd(f2 | 0, d2 | 0, 1, 0) | 0;
              d2 = H() | 0;
              kc(g2);
              i = g2;
              a2 = b[i >> 2] | 0;
              c2 = b[i + 4 >> 2] | 0;
            } while (!((a2 | 0) == 0 & (c2 | 0) == 0));
            T = h;
            return 0;
          }
          __name(Lb, "Lb");
          function Mb(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            if ((d2 | 0) < (c2 | 0)) {
              c2 = b2;
              d2 = a2;
              G(c2 | 0);
              return d2 | 0;
            }
            c2 = Ud(-1, -1, ((d2 - c2 | 0) * 3 | 0) + 3 | 0) | 0;
            d2 = Ud(~c2 | 0, ~(H() | 0) | 0, (15 - d2 | 0) * 3 | 0) | 0;
            c2 = ~(H() | 0) & b2;
            d2 = ~d2 & a2;
            G(c2 | 0);
            return d2 | 0;
          }
          __name(Mb, "Mb");
          function Nb(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0;
            f2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            f2 = f2 & 15;
            if (!((d2 | 0) < 16 & (f2 | 0) <= (d2 | 0))) {
              e2 = 4;
              return e2 | 0;
            }
            if ((f2 | 0) < (d2 | 0)) {
              f2 = Ud(-1, -1, ((d2 + -1 - f2 | 0) * 3 | 0) + 3 | 0) | 0;
              f2 = Ud(~f2 | 0, ~(H() | 0) | 0, (15 - d2 | 0) * 3 | 0) | 0;
              c2 = ~(H() | 0) & c2;
              a2 = ~f2 & a2;
            }
            f2 = Ud(d2 | 0, 0, 52) | 0;
            d2 = c2 & -15728641 | (H() | 0);
            b[e2 >> 2] = a2 | f2;
            b[e2 + 4 >> 2] = d2;
            e2 = 0;
            return e2 | 0;
          }
          __name(Nb, "Nb");
          function Ob(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0, E2 = 0;
            if ((d2 | 0) == 0 & (e2 | 0) == 0) {
              E2 = 0;
              return E2 | 0;
            }
            f2 = a2;
            g2 = b[f2 >> 2] | 0;
            f2 = b[f2 + 4 >> 2] | 0;
            if (true & (f2 & 15728640 | 0) == 0) {
              if (!((e2 | 0) > 0 | (e2 | 0) == 0 & d2 >>> 0 > 0)) {
                E2 = 0;
                return E2 | 0;
              }
              E2 = c2;
              b[E2 >> 2] = g2;
              b[E2 + 4 >> 2] = f2;
              if ((d2 | 0) == 1 & (e2 | 0) == 0) {
                E2 = 0;
                return E2 | 0;
              }
              f2 = 1;
              g2 = 0;
              do {
                C2 = a2 + (f2 << 3) | 0;
                D2 = b[C2 + 4 >> 2] | 0;
                E2 = c2 + (f2 << 3) | 0;
                b[E2 >> 2] = b[C2 >> 2];
                b[E2 + 4 >> 2] = D2;
                f2 = Jd(f2 | 0, g2 | 0, 1, 0) | 0;
                g2 = H() | 0;
              } while ((g2 | 0) < (e2 | 0) | (g2 | 0) == (e2 | 0) & f2 >>> 0 < d2 >>> 0);
              f2 = 0;
              return f2 | 0;
            }
            B2 = d2 << 3;
            D2 = Gd(B2) | 0;
            if (!D2) {
              E2 = 13;
              return E2 | 0;
            }
            Zd(D2 | 0, a2 | 0, B2 | 0) | 0;
            C2 = Id(d2, 8) | 0;
            if (!C2) {
              Hd(D2);
              E2 = 13;
              return E2 | 0;
            }
            a: while (1) {
              f2 = D2;
              k = b[f2 >> 2] | 0;
              f2 = b[f2 + 4 >> 2] | 0;
              z2 = Td(k | 0, f2 | 0, 52) | 0;
              H() | 0;
              z2 = z2 & 15;
              A2 = z2 + -1 | 0;
              y2 = (z2 | 0) != 0;
              x2 = (e2 | 0) > 0 | (e2 | 0) == 0 & d2 >>> 0 > 0;
              b: do {
                if (y2 & x2) {
                  t2 = Ud(A2 | 0, 0, 52) | 0;
                  u2 = H() | 0;
                  if (A2 >>> 0 > 15) {
                    if (!((k | 0) == 0 & (f2 | 0) == 0)) {
                      E2 = 16;
                      break a;
                    }
                    g2 = 0;
                    a2 = 0;
                    while (1) {
                      g2 = Jd(g2 | 0, a2 | 0, 1, 0) | 0;
                      a2 = H() | 0;
                      if (!((a2 | 0) < (e2 | 0) | (a2 | 0) == (e2 | 0) & g2 >>> 0 < d2 >>> 0)) {
                        break b;
                      }
                      h = D2 + (g2 << 3) | 0;
                      w2 = b[h >> 2] | 0;
                      h = b[h + 4 >> 2] | 0;
                      if (!((w2 | 0) == 0 & (h | 0) == 0)) {
                        f2 = h;
                        E2 = 16;
                        break a;
                      }
                    }
                  }
                  i = k;
                  a2 = f2;
                  g2 = 0;
                  h = 0;
                  while (1) {
                    if (!((i | 0) == 0 & (a2 | 0) == 0)) {
                      if (!(true & (a2 & 117440512 | 0) == 0)) {
                        E2 = 21;
                        break a;
                      }
                      l = Td(i | 0, a2 | 0, 52) | 0;
                      H() | 0;
                      l = l & 15;
                      if ((l | 0) < (A2 | 0)) {
                        f2 = 12;
                        E2 = 27;
                        break a;
                      }
                      if ((l | 0) != (A2 | 0)) {
                        i = i | t2;
                        a2 = a2 & -15728641 | u2;
                        if (l >>> 0 >= z2 >>> 0) {
                          j = A2;
                          do {
                            w2 = Ud(7, 0, (14 - j | 0) * 3 | 0) | 0;
                            j = j + 1 | 0;
                            i = w2 | i;
                            a2 = H() | 0 | a2;
                          } while (j >>> 0 < l >>> 0);
                        }
                      }
                      n = Rd(i | 0, a2 | 0, d2 | 0, e2 | 0) | 0;
                      o = H() | 0;
                      j = C2 + (n << 3) | 0;
                      l = j;
                      m = b[l >> 2] | 0;
                      l = b[l + 4 >> 2] | 0;
                      if (!((m | 0) == 0 & (l | 0) == 0)) {
                        r2 = 0;
                        s2 = 0;
                        do {
                          if ((r2 | 0) > (e2 | 0) | (r2 | 0) == (e2 | 0) & s2 >>> 0 > d2 >>> 0) {
                            E2 = 31;
                            break a;
                          }
                          if ((m | 0) == (i | 0) & (l & -117440513 | 0) == (a2 | 0)) {
                            p2 = Td(m | 0, l | 0, 56) | 0;
                            H() | 0;
                            p2 = p2 & 7;
                            q2 = p2 + 1 | 0;
                            w2 = Td(m | 0, l | 0, 45) | 0;
                            H() | 0;
                            c: do {
                              if (!(oa(w2 & 127) | 0)) {
                                l = 7;
                              } else {
                                m = Td(m | 0, l | 0, 52) | 0;
                                H() | 0;
                                m = m & 15;
                                if (!m) {
                                  l = 6;
                                  break;
                                }
                                l = 1;
                                while (1) {
                                  w2 = Ud(7, 0, (15 - l | 0) * 3 | 0) | 0;
                                  if (!((w2 & i | 0) == 0 & ((H() | 0) & a2 | 0) == 0)) {
                                    l = 7;
                                    break c;
                                  }
                                  if (l >>> 0 < m >>> 0) {
                                    l = l + 1 | 0;
                                  } else {
                                    l = 6;
                                    break;
                                  }
                                }
                              }
                            } while (0);
                            if ((p2 + 2 | 0) >>> 0 > l >>> 0) {
                              E2 = 41;
                              break a;
                            }
                            w2 = Ud(q2 | 0, 0, 56) | 0;
                            a2 = H() | 0 | a2 & -117440513;
                            v2 = j;
                            b[v2 >> 2] = 0;
                            b[v2 + 4 >> 2] = 0;
                            i = w2 | i;
                          } else {
                            n = Jd(n | 0, o | 0, 1, 0) | 0;
                            n = Qd(n | 0, H() | 0, d2 | 0, e2 | 0) | 0;
                            o = H() | 0;
                          }
                          s2 = Jd(s2 | 0, r2 | 0, 1, 0) | 0;
                          r2 = H() | 0;
                          j = C2 + (n << 3) | 0;
                          l = j;
                          m = b[l >> 2] | 0;
                          l = b[l + 4 >> 2] | 0;
                        } while (!((m | 0) == 0 & (l | 0) == 0));
                      }
                      w2 = j;
                      b[w2 >> 2] = i;
                      b[w2 + 4 >> 2] = a2;
                    }
                    g2 = Jd(g2 | 0, h | 0, 1, 0) | 0;
                    h = H() | 0;
                    if (!((h | 0) < (e2 | 0) | (h | 0) == (e2 | 0) & g2 >>> 0 < d2 >>> 0)) {
                      break b;
                    }
                    a2 = D2 + (g2 << 3) | 0;
                    i = b[a2 >> 2] | 0;
                    a2 = b[a2 + 4 >> 2] | 0;
                  }
                }
              } while (0);
              w2 = Jd(d2 | 0, e2 | 0, 5, 0) | 0;
              v2 = H() | 0;
              if (v2 >>> 0 < 0 | (v2 | 0) == 0 & w2 >>> 0 < 11) {
                E2 = 85;
                break;
              }
              w2 = Nd(d2 | 0, e2 | 0, 6, 0) | 0;
              H() | 0;
              w2 = Id(w2, 8) | 0;
              if (!w2) {
                E2 = 48;
                break;
              }
              do {
                if (x2) {
                  q2 = 0;
                  a2 = 0;
                  p2 = 0;
                  r2 = 0;
                  while (1) {
                    l = C2 + (q2 << 3) | 0;
                    h = l;
                    g2 = b[h >> 2] | 0;
                    h = b[h + 4 >> 2] | 0;
                    if (!((g2 | 0) == 0 & (h | 0) == 0)) {
                      m = Td(g2 | 0, h | 0, 56) | 0;
                      H() | 0;
                      m = m & 7;
                      i = m + 1 | 0;
                      n = h & -117440513;
                      v2 = Td(g2 | 0, h | 0, 45) | 0;
                      H() | 0;
                      d: do {
                        if (oa(v2 & 127) | 0) {
                          o = Td(g2 | 0, h | 0, 52) | 0;
                          H() | 0;
                          o = o & 15;
                          if (o | 0) {
                            j = 1;
                            while (1) {
                              v2 = Ud(7, 0, (15 - j | 0) * 3 | 0) | 0;
                              if (!((g2 & v2 | 0) == 0 & (n & (H() | 0) | 0) == 0)) {
                                break d;
                              }
                              if (j >>> 0 < o >>> 0) {
                                j = j + 1 | 0;
                              } else {
                                break;
                              }
                            }
                          }
                          h = Ud(i | 0, 0, 56) | 0;
                          g2 = h | g2;
                          h = H() | 0 | n;
                          i = l;
                          b[i >> 2] = g2;
                          b[i + 4 >> 2] = h;
                          i = m + 2 | 0;
                        }
                      } while (0);
                      if ((i | 0) == 7) {
                        v2 = w2 + (a2 << 3) | 0;
                        b[v2 >> 2] = g2;
                        b[v2 + 4 >> 2] = h & -117440513;
                        a2 = Jd(a2 | 0, p2 | 0, 1, 0) | 0;
                        v2 = H() | 0;
                      } else {
                        v2 = p2;
                      }
                    } else {
                      v2 = p2;
                    }
                    q2 = Jd(q2 | 0, r2 | 0, 1, 0) | 0;
                    r2 = H() | 0;
                    if (!((r2 | 0) < (e2 | 0) | (r2 | 0) == (e2 | 0) & q2 >>> 0 < d2 >>> 0)) {
                      break;
                    } else {
                      p2 = v2;
                    }
                  }
                  if (x2) {
                    s2 = A2 >>> 0 > 15;
                    t2 = Ud(A2 | 0, 0, 52) | 0;
                    u2 = H() | 0;
                    if (!y2) {
                      g2 = 0;
                      j = 0;
                      i = 0;
                      h = 0;
                      while (1) {
                        if (!((k | 0) == 0 & (f2 | 0) == 0)) {
                          A2 = c2 + (g2 << 3) | 0;
                          b[A2 >> 2] = k;
                          b[A2 + 4 >> 2] = f2;
                          g2 = Jd(g2 | 0, j | 0, 1, 0) | 0;
                          j = H() | 0;
                        }
                        i = Jd(i | 0, h | 0, 1, 0) | 0;
                        h = H() | 0;
                        if (!((h | 0) < (e2 | 0) | (h | 0) == (e2 | 0) & i >>> 0 < d2 >>> 0)) {
                          break;
                        }
                        f2 = D2 + (i << 3) | 0;
                        k = b[f2 >> 2] | 0;
                        f2 = b[f2 + 4 >> 2] | 0;
                      }
                      f2 = v2;
                      break;
                    }
                    g2 = 0;
                    j = 0;
                    h = 0;
                    i = 0;
                    while (1) {
                      do {
                        if (!((k | 0) == 0 & (f2 | 0) == 0)) {
                          o = Td(k | 0, f2 | 0, 52) | 0;
                          H() | 0;
                          o = o & 15;
                          if (s2 | (o | 0) < (A2 | 0)) {
                            E2 = 80;
                            break a;
                          }
                          if ((o | 0) != (A2 | 0)) {
                            l = k | t2;
                            m = f2 & -15728641 | u2;
                            if (o >>> 0 >= z2 >>> 0) {
                              n = A2;
                              do {
                                y2 = Ud(7, 0, (14 - n | 0) * 3 | 0) | 0;
                                n = n + 1 | 0;
                                l = y2 | l;
                                m = H() | 0 | m;
                              } while (n >>> 0 < o >>> 0);
                            }
                          } else {
                            l = k;
                            m = f2;
                          }
                          p2 = Rd(l | 0, m | 0, d2 | 0, e2 | 0) | 0;
                          n = 0;
                          o = 0;
                          r2 = H() | 0;
                          do {
                            if ((n | 0) > (e2 | 0) | (n | 0) == (e2 | 0) & o >>> 0 > d2 >>> 0) {
                              E2 = 81;
                              break a;
                            }
                            y2 = C2 + (p2 << 3) | 0;
                            q2 = b[y2 + 4 >> 2] | 0;
                            if ((q2 & -117440513 | 0) == (m | 0) ? (b[y2 >> 2] | 0) == (l | 0) : 0) {
                              E2 = 65;
                              break;
                            }
                            y2 = Jd(p2 | 0, r2 | 0, 1, 0) | 0;
                            p2 = Qd(y2 | 0, H() | 0, d2 | 0, e2 | 0) | 0;
                            r2 = H() | 0;
                            o = Jd(o | 0, n | 0, 1, 0) | 0;
                            n = H() | 0;
                            y2 = C2 + (p2 << 3) | 0;
                          } while (!((b[y2 >> 2] | 0) == (l | 0) ? (b[y2 + 4 >> 2] | 0) == (m | 0) : 0));
                          if ((E2 | 0) == 65 ? (E2 = 0, true & (q2 & 117440512 | 0) == 100663296) : 0) {
                            break;
                          }
                          y2 = c2 + (g2 << 3) | 0;
                          b[y2 >> 2] = k;
                          b[y2 + 4 >> 2] = f2;
                          g2 = Jd(g2 | 0, j | 0, 1, 0) | 0;
                          j = H() | 0;
                        }
                      } while (0);
                      h = Jd(h | 0, i | 0, 1, 0) | 0;
                      i = H() | 0;
                      if (!((i | 0) < (e2 | 0) | (i | 0) == (e2 | 0) & h >>> 0 < d2 >>> 0)) {
                        break;
                      }
                      f2 = D2 + (h << 3) | 0;
                      k = b[f2 >> 2] | 0;
                      f2 = b[f2 + 4 >> 2] | 0;
                    }
                    f2 = v2;
                  } else {
                    g2 = 0;
                    f2 = v2;
                  }
                } else {
                  g2 = 0;
                  a2 = 0;
                  f2 = 0;
                }
              } while (0);
              _d(C2 | 0, 0, B2 | 0) | 0;
              Zd(D2 | 0, w2 | 0, a2 << 3 | 0) | 0;
              Hd(w2);
              if ((a2 | 0) == 0 & (f2 | 0) == 0) {
                E2 = 89;
                break;
              } else {
                c2 = c2 + (g2 << 3) | 0;
                e2 = f2;
                d2 = a2;
              }
            }
            if ((E2 | 0) == 16) {
              if (true & (f2 & 117440512 | 0) == 0) {
                f2 = 4;
                E2 = 27;
              } else {
                E2 = 21;
              }
            } else if ((E2 | 0) == 31) {
              I(27795, 27122, 620, 27132);
            } else if ((E2 | 0) == 41) {
              Hd(D2);
              Hd(C2);
              E2 = 10;
              return E2 | 0;
            } else if ((E2 | 0) == 48) {
              Hd(D2);
              Hd(C2);
              E2 = 13;
              return E2 | 0;
            } else if ((E2 | 0) == 80) {
              I(27795, 27122, 711, 27132);
            } else if ((E2 | 0) == 81) {
              I(27795, 27122, 723, 27132);
            } else if ((E2 | 0) == 85) {
              Zd(c2 | 0, D2 | 0, d2 << 3 | 0) | 0;
              E2 = 89;
            }
            if ((E2 | 0) == 21) {
              Hd(D2);
              Hd(C2);
              E2 = 5;
              return E2 | 0;
            } else if ((E2 | 0) == 27) {
              Hd(D2);
              Hd(C2);
              E2 = f2;
              return E2 | 0;
            } else if ((E2 | 0) == 89) {
              Hd(D2);
              Hd(C2);
              E2 = 0;
              return E2 | 0;
            }
            return 0;
          }
          __name(Ob, "Ob");
          function Pb(a2, c2, d2, e2, f2, g2, h) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            h = h | 0;
            var i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0;
            q2 = T;
            T = T + 16 | 0;
            p2 = q2;
            if (!((d2 | 0) > 0 | (d2 | 0) == 0 & c2 >>> 0 > 0)) {
              p2 = 0;
              T = q2;
              return p2 | 0;
            }
            if ((h | 0) >= 16) {
              p2 = 12;
              T = q2;
              return p2 | 0;
            }
            n = 0;
            o = 0;
            m = 0;
            i = 0;
            a: while (1) {
              k = a2 + (n << 3) | 0;
              j = b[k >> 2] | 0;
              k = b[k + 4 >> 2] | 0;
              l = Td(j | 0, k | 0, 52) | 0;
              H() | 0;
              if ((l & 15 | 0) > (h | 0)) {
                i = 12;
                j = 11;
                break;
              }
              ic(p2, j, k, h);
              l = p2;
              k = b[l >> 2] | 0;
              l = b[l + 4 >> 2] | 0;
              if ((k | 0) == 0 & (l | 0) == 0) {
                j = m;
              } else {
                j = m;
                do {
                  if (!((i | 0) < (g2 | 0) | (i | 0) == (g2 | 0) & j >>> 0 < f2 >>> 0)) {
                    j = 10;
                    break a;
                  }
                  m = e2 + (j << 3) | 0;
                  b[m >> 2] = k;
                  b[m + 4 >> 2] = l;
                  j = Jd(j | 0, i | 0, 1, 0) | 0;
                  i = H() | 0;
                  kc(p2);
                  m = p2;
                  k = b[m >> 2] | 0;
                  l = b[m + 4 >> 2] | 0;
                } while (!((k | 0) == 0 & (l | 0) == 0));
              }
              n = Jd(n | 0, o | 0, 1, 0) | 0;
              o = H() | 0;
              if (!((o | 0) < (d2 | 0) | (o | 0) == (d2 | 0) & n >>> 0 < c2 >>> 0)) {
                i = 0;
                j = 11;
                break;
              } else {
                m = j;
              }
            }
            if ((j | 0) == 10) {
              p2 = 14;
              T = q2;
              return p2 | 0;
            } else if ((j | 0) == 11) {
              T = q2;
              return i | 0;
            }
            return 0;
          }
          __name(Pb, "Pb");
          function Qb(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
            n = T;
            T = T + 16 | 0;
            m = n;
            a: do {
              if ((d2 | 0) > 0 | (d2 | 0) == 0 & c2 >>> 0 > 0) {
                k = 0;
                h = 0;
                g2 = 0;
                l = 0;
                while (1) {
                  j = a2 + (k << 3) | 0;
                  i = b[j >> 2] | 0;
                  j = b[j + 4 >> 2] | 0;
                  if (!((i | 0) == 0 & (j | 0) == 0)) {
                    j = (Jb(i, j, e2, m) | 0) == 0;
                    i = m;
                    h = Jd(b[i >> 2] | 0, b[i + 4 >> 2] | 0, h | 0, g2 | 0) | 0;
                    g2 = H() | 0;
                    if (!j) {
                      g2 = 12;
                      break;
                    }
                  }
                  k = Jd(k | 0, l | 0, 1, 0) | 0;
                  l = H() | 0;
                  if (!((l | 0) < (d2 | 0) | (l | 0) == (d2 | 0) & k >>> 0 < c2 >>> 0)) {
                    break a;
                  }
                }
                T = n;
                return g2 | 0;
              } else {
                h = 0;
                g2 = 0;
              }
            } while (0);
            b[f2 >> 2] = h;
            b[f2 + 4 >> 2] = g2;
            f2 = 0;
            T = n;
            return f2 | 0;
          }
          __name(Qb, "Qb");
          function Rb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            b2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            return b2 & 1 | 0;
          }
          __name(Rb, "Rb");
          function Sb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            e2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            if (!e2) {
              e2 = 0;
              return e2 | 0;
            }
            d2 = 1;
            while (1) {
              c2 = Td(a2 | 0, b2 | 0, (15 - d2 | 0) * 3 | 0) | 0;
              H() | 0;
              c2 = c2 & 7;
              if (c2 | 0) {
                d2 = 5;
                break;
              }
              if (d2 >>> 0 < e2 >>> 0) {
                d2 = d2 + 1 | 0;
              } else {
                c2 = 0;
                d2 = 5;
                break;
              }
            }
            if ((d2 | 0) == 5) {
              return c2 | 0;
            }
            return 0;
          }
          __name(Sb, "Sb");
          function Tb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            i = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            i = i & 15;
            if (!i) {
              h = b2;
              i = a2;
              G(h | 0);
              return i | 0;
            }
            h = 1;
            c2 = 0;
            while (1) {
              f2 = (15 - h | 0) * 3 | 0;
              d2 = Ud(7, 0, f2 | 0) | 0;
              e2 = H() | 0;
              g2 = Td(a2 | 0, b2 | 0, f2 | 0) | 0;
              H() | 0;
              f2 = Ud($a(g2 & 7) | 0, 0, f2 | 0) | 0;
              g2 = H() | 0;
              a2 = f2 | a2 & ~d2;
              b2 = g2 | b2 & ~e2;
              a: do {
                if (!c2) {
                  if (!((f2 & d2 | 0) == 0 & (g2 & e2 | 0) == 0)) {
                    d2 = Td(a2 | 0, b2 | 0, 52) | 0;
                    H() | 0;
                    d2 = d2 & 15;
                    if (!d2) {
                      c2 = 1;
                    } else {
                      c2 = 1;
                      b: while (1) {
                        g2 = Td(a2 | 0, b2 | 0, (15 - c2 | 0) * 3 | 0) | 0;
                        H() | 0;
                        switch (g2 & 7) {
                          case 1:
                            break b;
                          case 0:
                            break;
                          default: {
                            c2 = 1;
                            break a;
                          }
                        }
                        if (c2 >>> 0 < d2 >>> 0) {
                          c2 = c2 + 1 | 0;
                        } else {
                          c2 = 1;
                          break a;
                        }
                      }
                      c2 = 1;
                      while (1) {
                        g2 = (15 - c2 | 0) * 3 | 0;
                        e2 = Td(a2 | 0, b2 | 0, g2 | 0) | 0;
                        H() | 0;
                        f2 = Ud(7, 0, g2 | 0) | 0;
                        b2 = b2 & ~(H() | 0);
                        g2 = Ud($a(e2 & 7) | 0, 0, g2 | 0) | 0;
                        a2 = a2 & ~f2 | g2;
                        b2 = b2 | (H() | 0);
                        if (c2 >>> 0 < d2 >>> 0) {
                          c2 = c2 + 1 | 0;
                        } else {
                          c2 = 1;
                          break;
                        }
                      }
                    }
                  } else {
                    c2 = 0;
                  }
                }
              } while (0);
              if (h >>> 0 < i >>> 0) {
                h = h + 1 | 0;
              } else {
                break;
              }
            }
            G(b2 | 0);
            return a2 | 0;
          }
          __name(Tb, "Tb");
          function Ub(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0;
            d2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            d2 = d2 & 15;
            if (!d2) {
              c2 = b2;
              d2 = a2;
              G(c2 | 0);
              return d2 | 0;
            }
            c2 = 1;
            while (1) {
              f2 = (15 - c2 | 0) * 3 | 0;
              g2 = Td(a2 | 0, b2 | 0, f2 | 0) | 0;
              H() | 0;
              e2 = Ud(7, 0, f2 | 0) | 0;
              b2 = b2 & ~(H() | 0);
              f2 = Ud($a(g2 & 7) | 0, 0, f2 | 0) | 0;
              a2 = f2 | a2 & ~e2;
              b2 = H() | 0 | b2;
              if (c2 >>> 0 < d2 >>> 0) {
                c2 = c2 + 1 | 0;
              } else {
                break;
              }
            }
            G(b2 | 0);
            return a2 | 0;
          }
          __name(Ub, "Ub");
          function Vb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0;
            i = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            i = i & 15;
            if (!i) {
              h = b2;
              i = a2;
              G(h | 0);
              return i | 0;
            }
            h = 1;
            c2 = 0;
            while (1) {
              f2 = (15 - h | 0) * 3 | 0;
              d2 = Ud(7, 0, f2 | 0) | 0;
              e2 = H() | 0;
              g2 = Td(a2 | 0, b2 | 0, f2 | 0) | 0;
              H() | 0;
              f2 = Ud(ab(g2 & 7) | 0, 0, f2 | 0) | 0;
              g2 = H() | 0;
              a2 = f2 | a2 & ~d2;
              b2 = g2 | b2 & ~e2;
              a: do {
                if (!c2) {
                  if (!((f2 & d2 | 0) == 0 & (g2 & e2 | 0) == 0)) {
                    d2 = Td(a2 | 0, b2 | 0, 52) | 0;
                    H() | 0;
                    d2 = d2 & 15;
                    if (!d2) {
                      c2 = 1;
                    } else {
                      c2 = 1;
                      b: while (1) {
                        g2 = Td(a2 | 0, b2 | 0, (15 - c2 | 0) * 3 | 0) | 0;
                        H() | 0;
                        switch (g2 & 7) {
                          case 1:
                            break b;
                          case 0:
                            break;
                          default: {
                            c2 = 1;
                            break a;
                          }
                        }
                        if (c2 >>> 0 < d2 >>> 0) {
                          c2 = c2 + 1 | 0;
                        } else {
                          c2 = 1;
                          break a;
                        }
                      }
                      c2 = 1;
                      while (1) {
                        e2 = (15 - c2 | 0) * 3 | 0;
                        f2 = Ud(7, 0, e2 | 0) | 0;
                        g2 = b2 & ~(H() | 0);
                        b2 = Td(a2 | 0, b2 | 0, e2 | 0) | 0;
                        H() | 0;
                        b2 = Ud(ab(b2 & 7) | 0, 0, e2 | 0) | 0;
                        a2 = a2 & ~f2 | b2;
                        b2 = g2 | (H() | 0);
                        if (c2 >>> 0 < d2 >>> 0) {
                          c2 = c2 + 1 | 0;
                        } else {
                          c2 = 1;
                          break;
                        }
                      }
                    }
                  } else {
                    c2 = 0;
                  }
                }
              } while (0);
              if (h >>> 0 < i >>> 0) {
                h = h + 1 | 0;
              } else {
                break;
              }
            }
            G(b2 | 0);
            return a2 | 0;
          }
          __name(Vb, "Vb");
          function Wb(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0;
            d2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            d2 = d2 & 15;
            if (!d2) {
              c2 = b2;
              d2 = a2;
              G(c2 | 0);
              return d2 | 0;
            }
            c2 = 1;
            while (1) {
              g2 = (15 - c2 | 0) * 3 | 0;
              f2 = Ud(7, 0, g2 | 0) | 0;
              e2 = b2 & ~(H() | 0);
              b2 = Td(a2 | 0, b2 | 0, g2 | 0) | 0;
              H() | 0;
              b2 = Ud(ab(b2 & 7) | 0, 0, g2 | 0) | 0;
              a2 = b2 | a2 & ~f2;
              b2 = H() | 0 | e2;
              if (c2 >>> 0 < d2 >>> 0) {
                c2 = c2 + 1 | 0;
              } else {
                break;
              }
            }
            G(b2 | 0);
            return a2 | 0;
          }
          __name(Wb, "Wb");
          function Xb(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            j = T;
            T = T + 64 | 0;
            i = j + 40 | 0;
            e2 = j + 24 | 0;
            f2 = j + 12 | 0;
            g2 = j;
            Ud(c2 | 0, 0, 52) | 0;
            d2 = H() | 0 | 134225919;
            if (!c2) {
              if ((b[a2 + 4 >> 2] | 0) > 2) {
                h = 0;
                i = 0;
                G(h | 0);
                T = j;
                return i | 0;
              }
              if ((b[a2 + 8 >> 2] | 0) > 2) {
                h = 0;
                i = 0;
                G(h | 0);
                T = j;
                return i | 0;
              }
              if ((b[a2 + 12 >> 2] | 0) > 2) {
                h = 0;
                i = 0;
                G(h | 0);
                T = j;
                return i | 0;
              }
              Ud(qa(a2) | 0, 0, 45) | 0;
              h = H() | 0 | d2;
              i = -1;
              G(h | 0);
              T = j;
              return i | 0;
            }
            b[i >> 2] = b[a2 >> 2];
            b[i + 4 >> 2] = b[a2 + 4 >> 2];
            b[i + 8 >> 2] = b[a2 + 8 >> 2];
            b[i + 12 >> 2] = b[a2 + 12 >> 2];
            h = i + 4 | 0;
            if ((c2 | 0) > 0) {
              a2 = -1;
              while (1) {
                b[e2 >> 2] = b[h >> 2];
                b[e2 + 4 >> 2] = b[h + 4 >> 2];
                b[e2 + 8 >> 2] = b[h + 8 >> 2];
                if (!(c2 & 1)) {
                  Va(h);
                  b[f2 >> 2] = b[h >> 2];
                  b[f2 + 4 >> 2] = b[h + 4 >> 2];
                  b[f2 + 8 >> 2] = b[h + 8 >> 2];
                  Xa(f2);
                } else {
                  Ua(h);
                  b[f2 >> 2] = b[h >> 2];
                  b[f2 + 4 >> 2] = b[h + 4 >> 2];
                  b[f2 + 8 >> 2] = b[h + 8 >> 2];
                  Wa(f2);
                }
                Pa(e2, f2, g2);
                Ma(g2);
                l = (15 - c2 | 0) * 3 | 0;
                k = Ud(7, 0, l | 0) | 0;
                d2 = d2 & ~(H() | 0);
                l = Ud(Ra(g2) | 0, 0, l | 0) | 0;
                a2 = l | a2 & ~k;
                d2 = H() | 0 | d2;
                if ((c2 | 0) > 1) {
                  c2 = c2 + -1 | 0;
                } else {
                  break;
                }
              }
            } else {
              a2 = -1;
            }
            a: do {
              if (((b[h >> 2] | 0) <= 2 ? (b[i + 8 >> 2] | 0) <= 2 : 0) ? (b[i + 12 >> 2] | 0) <= 2 : 0) {
                e2 = qa(i) | 0;
                c2 = Ud(e2 | 0, 0, 45) | 0;
                c2 = c2 | a2;
                a2 = H() | 0 | d2 & -1040385;
                g2 = ra(i) | 0;
                if (!(oa(e2) | 0)) {
                  if ((g2 | 0) <= 0) {
                    break;
                  }
                  f2 = 0;
                  while (1) {
                    e2 = Td(c2 | 0, a2 | 0, 52) | 0;
                    H() | 0;
                    e2 = e2 & 15;
                    if (e2) {
                      d2 = 1;
                      while (1) {
                        l = (15 - d2 | 0) * 3 | 0;
                        i = Td(c2 | 0, a2 | 0, l | 0) | 0;
                        H() | 0;
                        k = Ud(7, 0, l | 0) | 0;
                        a2 = a2 & ~(H() | 0);
                        l = Ud($a(i & 7) | 0, 0, l | 0) | 0;
                        c2 = c2 & ~k | l;
                        a2 = a2 | (H() | 0);
                        if (d2 >>> 0 < e2 >>> 0) {
                          d2 = d2 + 1 | 0;
                        } else {
                          break;
                        }
                      }
                    }
                    f2 = f2 + 1 | 0;
                    if ((f2 | 0) == (g2 | 0)) {
                      break a;
                    }
                  }
                }
                f2 = Td(c2 | 0, a2 | 0, 52) | 0;
                H() | 0;
                f2 = f2 & 15;
                b: do {
                  if (f2) {
                    d2 = 1;
                    c: while (1) {
                      l = Td(c2 | 0, a2 | 0, (15 - d2 | 0) * 3 | 0) | 0;
                      H() | 0;
                      switch (l & 7) {
                        case 1:
                          break c;
                        case 0:
                          break;
                        default:
                          break b;
                      }
                      if (d2 >>> 0 < f2 >>> 0) {
                        d2 = d2 + 1 | 0;
                      } else {
                        break b;
                      }
                    }
                    if (ua(e2, b[i >> 2] | 0) | 0) {
                      d2 = 1;
                      while (1) {
                        i = (15 - d2 | 0) * 3 | 0;
                        k = Ud(7, 0, i | 0) | 0;
                        l = a2 & ~(H() | 0);
                        a2 = Td(c2 | 0, a2 | 0, i | 0) | 0;
                        H() | 0;
                        a2 = Ud(ab(a2 & 7) | 0, 0, i | 0) | 0;
                        c2 = c2 & ~k | a2;
                        a2 = l | (H() | 0);
                        if (d2 >>> 0 < f2 >>> 0) {
                          d2 = d2 + 1 | 0;
                        } else {
                          break;
                        }
                      }
                    } else {
                      d2 = 1;
                      while (1) {
                        l = (15 - d2 | 0) * 3 | 0;
                        i = Td(c2 | 0, a2 | 0, l | 0) | 0;
                        H() | 0;
                        k = Ud(7, 0, l | 0) | 0;
                        a2 = a2 & ~(H() | 0);
                        l = Ud($a(i & 7) | 0, 0, l | 0) | 0;
                        c2 = c2 & ~k | l;
                        a2 = a2 | (H() | 0);
                        if (d2 >>> 0 < f2 >>> 0) {
                          d2 = d2 + 1 | 0;
                        } else {
                          break;
                        }
                      }
                    }
                  }
                } while (0);
                if ((g2 | 0) > 0) {
                  d2 = 0;
                  do {
                    c2 = Tb(c2, a2) | 0;
                    a2 = H() | 0;
                    d2 = d2 + 1 | 0;
                  } while ((d2 | 0) != (g2 | 0));
                }
              } else {
                c2 = 0;
                a2 = 0;
              }
            } while (0);
            k = a2;
            l = c2;
            G(k | 0);
            T = j;
            return l | 0;
          }
          __name(Xb, "Xb");
          function Yb(a2) {
            a2 = a2 | 0;
            return (a2 | 0) % 2 | 0 | 0;
          }
          __name(Yb, "Yb");
          function Zb(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0;
            f2 = T;
            T = T + 16 | 0;
            e2 = f2;
            if (c2 >>> 0 > 15) {
              e2 = 4;
              T = f2;
              return e2 | 0;
            }
            if ((b[a2 + 4 >> 2] & 2146435072 | 0) == 2146435072) {
              e2 = 3;
              T = f2;
              return e2 | 0;
            }
            if ((b[a2 + 8 + 4 >> 2] & 2146435072 | 0) == 2146435072) {
              e2 = 3;
              T = f2;
              return e2 | 0;
            }
            qb(a2, c2, e2);
            c2 = Xb(e2, c2) | 0;
            e2 = H() | 0;
            b[d2 >> 2] = c2;
            b[d2 + 4 >> 2] = e2;
            if ((c2 | 0) == 0 & (e2 | 0) == 0) {
              I(27795, 27122, 1050, 27145);
            }
            e2 = 0;
            T = f2;
            return e2 | 0;
          }
          __name(Zb, "Zb");
          function _b(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0;
            f2 = d2 + 4 | 0;
            g2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            g2 = g2 & 15;
            h = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            e2 = (g2 | 0) == 0;
            if (!(oa(h & 127) | 0)) {
              if (e2) {
                h = 0;
                return h | 0;
              }
              if ((b[f2 >> 2] | 0) == 0 ? (b[d2 + 8 >> 2] | 0) == 0 : 0) {
                e2 = (b[d2 + 12 >> 2] | 0) != 0 & 1;
              } else {
                e2 = 1;
              }
            } else if (e2) {
              h = 1;
              return h | 0;
            } else {
              e2 = 1;
            }
            d2 = 1;
            while (1) {
              if (!(d2 & 1)) {
                Xa(f2);
              } else {
                Wa(f2);
              }
              h = Td(a2 | 0, c2 | 0, (15 - d2 | 0) * 3 | 0) | 0;
              H() | 0;
              Ya(f2, h & 7);
              if (d2 >>> 0 < g2 >>> 0) {
                d2 = d2 + 1 | 0;
              } else {
                break;
              }
            }
            return e2 | 0;
          }
          __name(_b, "_b");
          function $b(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            l = T;
            T = T + 16 | 0;
            j = l;
            k = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            k = k & 127;
            if (k >>> 0 > 121) {
              b[d2 >> 2] = 0;
              b[d2 + 4 >> 2] = 0;
              b[d2 + 8 >> 2] = 0;
              b[d2 + 12 >> 2] = 0;
              k = 5;
              T = l;
              return k | 0;
            }
            a: do {
              if ((oa(k) | 0) != 0 ? (g2 = Td(a2 | 0, c2 | 0, 52) | 0, H() | 0, g2 = g2 & 15, (g2 | 0) != 0) : 0) {
                e2 = 1;
                b: while (1) {
                  i = Td(a2 | 0, c2 | 0, (15 - e2 | 0) * 3 | 0) | 0;
                  H() | 0;
                  switch (i & 7) {
                    case 5:
                      break b;
                    case 0:
                      break;
                    default: {
                      e2 = c2;
                      break a;
                    }
                  }
                  if (e2 >>> 0 < g2 >>> 0) {
                    e2 = e2 + 1 | 0;
                  } else {
                    e2 = c2;
                    break a;
                  }
                }
                f2 = 1;
                e2 = c2;
                while (1) {
                  c2 = (15 - f2 | 0) * 3 | 0;
                  h = Ud(7, 0, c2 | 0) | 0;
                  i = e2 & ~(H() | 0);
                  e2 = Td(a2 | 0, e2 | 0, c2 | 0) | 0;
                  H() | 0;
                  e2 = Ud(ab(e2 & 7) | 0, 0, c2 | 0) | 0;
                  a2 = a2 & ~h | e2;
                  e2 = i | (H() | 0);
                  if (f2 >>> 0 < g2 >>> 0) {
                    f2 = f2 + 1 | 0;
                  } else {
                    break;
                  }
                }
              } else {
                e2 = c2;
              }
            } while (0);
            i = 7696 + (k * 28 | 0) | 0;
            b[d2 >> 2] = b[i >> 2];
            b[d2 + 4 >> 2] = b[i + 4 >> 2];
            b[d2 + 8 >> 2] = b[i + 8 >> 2];
            b[d2 + 12 >> 2] = b[i + 12 >> 2];
            if (!(_b(a2, e2, d2) | 0)) {
              k = 0;
              T = l;
              return k | 0;
            }
            h = d2 + 4 | 0;
            b[j >> 2] = b[h >> 2];
            b[j + 4 >> 2] = b[h + 4 >> 2];
            b[j + 8 >> 2] = b[h + 8 >> 2];
            g2 = Td(a2 | 0, e2 | 0, 52) | 0;
            H() | 0;
            i = g2 & 15;
            if (!(g2 & 1)) {
              g2 = i;
            } else {
              Xa(h);
              g2 = i + 1 | 0;
            }
            if (!(oa(k) | 0)) {
              e2 = 0;
            } else {
              c: do {
                if (!i) {
                  e2 = 0;
                } else {
                  c2 = 1;
                  while (1) {
                    f2 = Td(a2 | 0, e2 | 0, (15 - c2 | 0) * 3 | 0) | 0;
                    H() | 0;
                    f2 = f2 & 7;
                    if (f2 | 0) {
                      e2 = f2;
                      break c;
                    }
                    if (c2 >>> 0 < i >>> 0) {
                      c2 = c2 + 1 | 0;
                    } else {
                      e2 = 0;
                      break;
                    }
                  }
                }
              } while (0);
              e2 = (e2 | 0) == 4 & 1;
            }
            if (!(xb(d2, g2, e2, 0) | 0)) {
              if ((g2 | 0) != (i | 0)) {
                b[h >> 2] = b[j >> 2];
                b[h + 4 >> 2] = b[j + 4 >> 2];
                b[h + 8 >> 2] = b[j + 8 >> 2];
              }
            } else {
              if (oa(k) | 0) {
                do {
                } while ((xb(d2, g2, 0, 0) | 0) != 0);
              }
              if ((g2 | 0) != (i | 0)) {
                Va(h);
              }
            }
            k = 0;
            T = l;
            return k | 0;
          }
          __name($b, "$b");
          function ac(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0;
            f2 = T;
            T = T + 16 | 0;
            d2 = f2;
            e2 = $b(a2, b2, d2) | 0;
            if (e2 | 0) {
              T = f2;
              return e2 | 0;
            }
            e2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            ub(d2, e2 & 15, c2);
            e2 = 0;
            T = f2;
            return e2 | 0;
          }
          __name(ac, "ac");
          function bc(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0;
            g2 = T;
            T = T + 16 | 0;
            f2 = g2;
            d2 = $b(a2, b2, f2) | 0;
            if (d2 | 0) {
              f2 = d2;
              T = g2;
              return f2 | 0;
            }
            d2 = Td(a2 | 0, b2 | 0, 45) | 0;
            H() | 0;
            d2 = (oa(d2 & 127) | 0) == 0;
            e2 = Td(a2 | 0, b2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            a: do {
              if (!d2) {
                if (e2 | 0) {
                  d2 = 1;
                  while (1) {
                    h = Ud(7, 0, (15 - d2 | 0) * 3 | 0) | 0;
                    if (!((h & a2 | 0) == 0 & ((H() | 0) & b2 | 0) == 0)) {
                      break a;
                    }
                    if (d2 >>> 0 < e2 >>> 0) {
                      d2 = d2 + 1 | 0;
                    } else {
                      break;
                    }
                  }
                }
                vb(f2, e2, 0, 5, c2);
                h = 0;
                T = g2;
                return h | 0;
              }
            } while (0);
            zb(f2, e2, 0, 6, c2);
            h = 0;
            T = g2;
            return h | 0;
          }
          __name(bc, "bc");
          function cc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            f2 = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            if (!(oa(f2 & 127) | 0)) {
              f2 = 2;
              b[d2 >> 2] = f2;
              return 0;
            }
            f2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            f2 = f2 & 15;
            if (!f2) {
              f2 = 5;
              b[d2 >> 2] = f2;
              return 0;
            }
            e2 = 1;
            while (1) {
              g2 = Ud(7, 0, (15 - e2 | 0) * 3 | 0) | 0;
              if (!((g2 & a2 | 0) == 0 & ((H() | 0) & c2 | 0) == 0)) {
                e2 = 2;
                a2 = 6;
                break;
              }
              if (e2 >>> 0 < f2 >>> 0) {
                e2 = e2 + 1 | 0;
              } else {
                e2 = 5;
                a2 = 6;
                break;
              }
            }
            if ((a2 | 0) == 6) {
              b[d2 >> 2] = e2;
              return 0;
            }
            return 0;
          }
          __name(cc, "cc");
          function dc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            m = T;
            T = T + 128 | 0;
            k = m + 112 | 0;
            g2 = m + 96 | 0;
            l = m;
            f2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            i = f2 & 15;
            b[k >> 2] = i;
            h = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            h = h & 127;
            a: do {
              if (oa(h) | 0) {
                if (i | 0) {
                  e2 = 1;
                  while (1) {
                    j = Ud(7, 0, (15 - e2 | 0) * 3 | 0) | 0;
                    if (!((j & a2 | 0) == 0 & ((H() | 0) & c2 | 0) == 0)) {
                      f2 = 0;
                      break a;
                    }
                    if (e2 >>> 0 < i >>> 0) {
                      e2 = e2 + 1 | 0;
                    } else {
                      break;
                    }
                  }
                }
                if (!(f2 & 1)) {
                  j = Ud(i + 1 | 0, 0, 52) | 0;
                  l = H() | 0 | c2 & -15728641;
                  k = Ud(7, 0, (14 - i | 0) * 3 | 0) | 0;
                  l = dc((j | a2) & ~k, l & ~(H() | 0), d2) | 0;
                  T = m;
                  return l | 0;
                } else {
                  f2 = 1;
                }
              } else {
                f2 = 0;
              }
            } while (0);
            e2 = $b(a2, c2, g2) | 0;
            if (!e2) {
              if (f2) {
                wb(g2, k, l);
                j = 5;
              } else {
                Ab(g2, k, l);
                j = 6;
              }
              b: do {
                if (oa(h) | 0) {
                  if (!i) {
                    a2 = 5;
                  } else {
                    e2 = 1;
                    while (1) {
                      h = Ud(7, 0, (15 - e2 | 0) * 3 | 0) | 0;
                      if (!((h & a2 | 0) == 0 & ((H() | 0) & c2 | 0) == 0)) {
                        a2 = 2;
                        break b;
                      }
                      if (e2 >>> 0 < i >>> 0) {
                        e2 = e2 + 1 | 0;
                      } else {
                        a2 = 5;
                        break;
                      }
                    }
                  }
                } else {
                  a2 = 2;
                }
              } while (0);
              _d(d2 | 0, -1, a2 << 2 | 0) | 0;
              c: do {
                if (f2) {
                  g2 = 0;
                  while (1) {
                    h = l + (g2 << 4) | 0;
                    yb(h, b[k >> 2] | 0) | 0;
                    h = b[h >> 2] | 0;
                    i = b[d2 >> 2] | 0;
                    if ((i | 0) == -1 | (i | 0) == (h | 0)) {
                      e2 = d2;
                    } else {
                      f2 = 0;
                      do {
                        f2 = f2 + 1 | 0;
                        if (f2 >>> 0 >= a2 >>> 0) {
                          e2 = 1;
                          break c;
                        }
                        e2 = d2 + (f2 << 2) | 0;
                        i = b[e2 >> 2] | 0;
                      } while (!((i | 0) == -1 | (i | 0) == (h | 0)));
                    }
                    b[e2 >> 2] = h;
                    g2 = g2 + 1 | 0;
                    if (g2 >>> 0 >= j >>> 0) {
                      e2 = 0;
                      break;
                    }
                  }
                } else {
                  g2 = 0;
                  while (1) {
                    h = l + (g2 << 4) | 0;
                    xb(h, b[k >> 2] | 0, 0, 1) | 0;
                    h = b[h >> 2] | 0;
                    i = b[d2 >> 2] | 0;
                    if ((i | 0) == -1 | (i | 0) == (h | 0)) {
                      e2 = d2;
                    } else {
                      f2 = 0;
                      do {
                        f2 = f2 + 1 | 0;
                        if (f2 >>> 0 >= a2 >>> 0) {
                          e2 = 1;
                          break c;
                        }
                        e2 = d2 + (f2 << 2) | 0;
                        i = b[e2 >> 2] | 0;
                      } while (!((i | 0) == -1 | (i | 0) == (h | 0)));
                    }
                    b[e2 >> 2] = h;
                    g2 = g2 + 1 | 0;
                    if (g2 >>> 0 >= j >>> 0) {
                      e2 = 0;
                      break;
                    }
                  }
                }
              } while (0);
            }
            l = e2;
            T = m;
            return l | 0;
          }
          __name(dc, "dc");
          function ec() {
            return 12;
          }
          __name(ec, "ec");
          function fc(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            if (a2 >>> 0 > 15) {
              i = 4;
              return i | 0;
            }
            Ud(a2 | 0, 0, 52) | 0;
            i = H() | 0 | 134225919;
            if (!a2) {
              d2 = 0;
              e2 = 0;
              do {
                if (oa(e2) | 0) {
                  Ud(e2 | 0, 0, 45) | 0;
                  h = i | (H() | 0);
                  a2 = c2 + (d2 << 3) | 0;
                  b[a2 >> 2] = -1;
                  b[a2 + 4 >> 2] = h;
                  d2 = d2 + 1 | 0;
                }
                e2 = e2 + 1 | 0;
              } while ((e2 | 0) != 122);
              d2 = 0;
              return d2 | 0;
            }
            d2 = 0;
            h = 0;
            do {
              if (oa(h) | 0) {
                Ud(h | 0, 0, 45) | 0;
                e2 = 1;
                f2 = -1;
                g2 = i | (H() | 0);
                while (1) {
                  j = Ud(7, 0, (15 - e2 | 0) * 3 | 0) | 0;
                  f2 = f2 & ~j;
                  g2 = g2 & ~(H() | 0);
                  if ((e2 | 0) == (a2 | 0)) {
                    break;
                  } else {
                    e2 = e2 + 1 | 0;
                  }
                }
                j = c2 + (d2 << 3) | 0;
                b[j >> 2] = f2;
                b[j + 4 >> 2] = g2;
                d2 = d2 + 1 | 0;
              }
              h = h + 1 | 0;
            } while ((h | 0) != 122);
            d2 = 0;
            return d2 | 0;
          }
          __name(fc, "fc");
          function gc(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0;
            t2 = T;
            T = T + 16 | 0;
            r2 = t2;
            s2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            s2 = s2 & 15;
            if (d2 >>> 0 > 15) {
              s2 = 4;
              T = t2;
              return s2 | 0;
            }
            if ((s2 | 0) < (d2 | 0)) {
              s2 = 12;
              T = t2;
              return s2 | 0;
            }
            if ((s2 | 0) != (d2 | 0)) {
              g2 = Ud(d2 | 0, 0, 52) | 0;
              g2 = g2 | a2;
              i = H() | 0 | c2 & -15728641;
              if ((s2 | 0) > (d2 | 0)) {
                j = d2;
                do {
                  q2 = Ud(7, 0, (14 - j | 0) * 3 | 0) | 0;
                  j = j + 1 | 0;
                  g2 = q2 | g2;
                  i = H() | 0 | i;
                } while ((j | 0) < (s2 | 0));
                q2 = g2;
              } else {
                q2 = g2;
              }
            } else {
              q2 = a2;
              i = c2;
            }
            p2 = Td(q2 | 0, i | 0, 45) | 0;
            H() | 0;
            a: do {
              if (oa(p2 & 127) | 0) {
                j = Td(q2 | 0, i | 0, 52) | 0;
                H() | 0;
                j = j & 15;
                if (j | 0) {
                  g2 = 1;
                  while (1) {
                    p2 = Ud(7, 0, (15 - g2 | 0) * 3 | 0) | 0;
                    if (!((p2 & q2 | 0) == 0 & ((H() | 0) & i | 0) == 0)) {
                      k = 33;
                      break a;
                    }
                    if (g2 >>> 0 < j >>> 0) {
                      g2 = g2 + 1 | 0;
                    } else {
                      break;
                    }
                  }
                }
                p2 = e2;
                b[p2 >> 2] = 0;
                b[p2 + 4 >> 2] = 0;
                if ((s2 | 0) > (d2 | 0)) {
                  p2 = c2 & -15728641;
                  o = s2;
                  while (1) {
                    n = o;
                    o = o + -1 | 0;
                    if (o >>> 0 > 15 | (s2 | 0) < (o | 0)) {
                      k = 19;
                      break;
                    }
                    if ((s2 | 0) != (o | 0)) {
                      g2 = Ud(o | 0, 0, 52) | 0;
                      g2 = g2 | a2;
                      j = H() | 0 | p2;
                      if ((s2 | 0) < (n | 0)) {
                        m = g2;
                      } else {
                        k = o;
                        do {
                          m = Ud(7, 0, (14 - k | 0) * 3 | 0) | 0;
                          k = k + 1 | 0;
                          g2 = m | g2;
                          j = H() | 0 | j;
                        } while ((k | 0) < (s2 | 0));
                        m = g2;
                      }
                    } else {
                      m = a2;
                      j = c2;
                    }
                    l = Td(m | 0, j | 0, 45) | 0;
                    H() | 0;
                    if (!(oa(l & 127) | 0)) {
                      g2 = 0;
                    } else {
                      l = Td(m | 0, j | 0, 52) | 0;
                      H() | 0;
                      l = l & 15;
                      b: do {
                        if (!l) {
                          g2 = 0;
                        } else {
                          k = 1;
                          while (1) {
                            g2 = Td(m | 0, j | 0, (15 - k | 0) * 3 | 0) | 0;
                            H() | 0;
                            g2 = g2 & 7;
                            if (g2 | 0) {
                              break b;
                            }
                            if (k >>> 0 < l >>> 0) {
                              k = k + 1 | 0;
                            } else {
                              g2 = 0;
                              break;
                            }
                          }
                        }
                      } while (0);
                      g2 = (g2 | 0) == 0 & 1;
                    }
                    j = Td(a2 | 0, c2 | 0, (15 - n | 0) * 3 | 0) | 0;
                    H() | 0;
                    j = j & 7;
                    if ((j | 0) == 7) {
                      f2 = 5;
                      k = 42;
                      break;
                    }
                    g2 = (g2 | 0) != 0;
                    if ((j | 0) == 1 & g2) {
                      f2 = 5;
                      k = 42;
                      break;
                    }
                    m = j + (((j | 0) != 0 & g2) << 31 >> 31) | 0;
                    if (m | 0) {
                      k = s2 - n | 0;
                      k = Rc(7, 0, k, ((k | 0) < 0) << 31 >> 31) | 0;
                      l = H() | 0;
                      if (g2) {
                        g2 = Pd(k | 0, l | 0, 5, 0) | 0;
                        g2 = Jd(g2 | 0, H() | 0, -5, -1) | 0;
                        g2 = Nd(g2 | 0, H() | 0, 6, 0) | 0;
                        g2 = Jd(g2 | 0, H() | 0, 1, 0) | 0;
                        j = H() | 0;
                      } else {
                        g2 = k;
                        j = l;
                      }
                      n = m + -1 | 0;
                      n = Pd(k | 0, l | 0, n | 0, ((n | 0) < 0) << 31 >> 31 | 0) | 0;
                      n = Jd(g2 | 0, j | 0, n | 0, H() | 0) | 0;
                      m = H() | 0;
                      l = e2;
                      l = Jd(n | 0, m | 0, b[l >> 2] | 0, b[l + 4 >> 2] | 0) | 0;
                      m = H() | 0;
                      n = e2;
                      b[n >> 2] = l;
                      b[n + 4 >> 2] = m;
                    }
                    if ((o | 0) <= (d2 | 0)) {
                      k = 37;
                      break;
                    }
                  }
                  if ((k | 0) == 19) {
                    I(27795, 27122, 1367, 27158);
                  } else if ((k | 0) == 37) {
                    h = e2;
                    f2 = b[h + 4 >> 2] | 0;
                    h = b[h >> 2] | 0;
                    break;
                  } else if ((k | 0) == 42) {
                    T = t2;
                    return f2 | 0;
                  }
                } else {
                  f2 = 0;
                  h = 0;
                }
              } else {
                k = 33;
              }
            } while (0);
            c: do {
              if ((k | 0) == 33) {
                p2 = e2;
                b[p2 >> 2] = 0;
                b[p2 + 4 >> 2] = 0;
                if ((s2 | 0) > (d2 | 0)) {
                  g2 = s2;
                  while (1) {
                    f2 = Td(a2 | 0, c2 | 0, (15 - g2 | 0) * 3 | 0) | 0;
                    H() | 0;
                    f2 = f2 & 7;
                    if ((f2 | 0) == 7) {
                      f2 = 5;
                      break;
                    }
                    h = s2 - g2 | 0;
                    h = Rc(7, 0, h, ((h | 0) < 0) << 31 >> 31) | 0;
                    f2 = Pd(h | 0, H() | 0, f2 | 0, 0) | 0;
                    h = H() | 0;
                    p2 = e2;
                    h = Jd(b[p2 >> 2] | 0, b[p2 + 4 >> 2] | 0, f2 | 0, h | 0) | 0;
                    f2 = H() | 0;
                    p2 = e2;
                    b[p2 >> 2] = h;
                    b[p2 + 4 >> 2] = f2;
                    g2 = g2 + -1 | 0;
                    if ((g2 | 0) <= (d2 | 0)) {
                      break c;
                    }
                  }
                  T = t2;
                  return f2 | 0;
                } else {
                  f2 = 0;
                  h = 0;
                }
              }
            } while (0);
            if (Jb(q2, i, s2, r2) | 0) {
              I(27795, 27122, 1327, 27173);
            }
            s2 = r2;
            r2 = b[s2 + 4 >> 2] | 0;
            if (((f2 | 0) > -1 | (f2 | 0) == -1 & h >>> 0 > 4294967295) & ((r2 | 0) > (f2 | 0) | ((r2 | 0) == (f2 | 0) ? (b[s2 >> 2] | 0) >>> 0 > h >>> 0 : 0))) {
              s2 = 0;
              T = t2;
              return s2 | 0;
            } else {
              I(27795, 27122, 1407, 27158);
            }
            return 0;
          }
          __name(gc, "gc");
          function hc(a2, c2, d2, e2, f2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0;
            m = T;
            T = T + 16 | 0;
            h = m;
            if (f2 >>> 0 > 15) {
              g2 = 4;
              T = m;
              return g2 | 0;
            }
            i = Td(d2 | 0, e2 | 0, 52) | 0;
            H() | 0;
            i = i & 15;
            if ((i | 0) > (f2 | 0)) {
              g2 = 12;
              T = m;
              return g2 | 0;
            }
            if (Jb(d2, e2, f2, h) | 0) {
              I(27795, 27122, 1327, 27173);
            }
            l = h;
            k = b[l + 4 >> 2] | 0;
            if (!(((c2 | 0) > -1 | (c2 | 0) == -1 & a2 >>> 0 > 4294967295) & ((k | 0) > (c2 | 0) | ((k | 0) == (c2 | 0) ? (b[l >> 2] | 0) >>> 0 > a2 >>> 0 : 0)))) {
              g2 = 2;
              T = m;
              return g2 | 0;
            }
            l = f2 - i | 0;
            f2 = Ud(f2 | 0, 0, 52) | 0;
            j = H() | 0 | e2 & -15728641;
            k = g2;
            b[k >> 2] = f2 | d2;
            b[k + 4 >> 2] = j;
            k = Td(d2 | 0, e2 | 0, 45) | 0;
            H() | 0;
            a: do {
              if (oa(k & 127) | 0) {
                if (i | 0) {
                  h = 1;
                  while (1) {
                    k = Ud(7, 0, (15 - h | 0) * 3 | 0) | 0;
                    if (!((k & d2 | 0) == 0 & ((H() | 0) & e2 | 0) == 0)) {
                      break a;
                    }
                    if (h >>> 0 < i >>> 0) {
                      h = h + 1 | 0;
                    } else {
                      break;
                    }
                  }
                }
                if ((l | 0) < 1) {
                  g2 = 0;
                  T = m;
                  return g2 | 0;
                }
                k = i ^ 15;
                e2 = -1;
                j = 1;
                h = 1;
                while (1) {
                  i = l - j | 0;
                  i = Rc(7, 0, i, ((i | 0) < 0) << 31 >> 31) | 0;
                  d2 = H() | 0;
                  do {
                    if (h) {
                      h = Pd(i | 0, d2 | 0, 5, 0) | 0;
                      h = Jd(h | 0, H() | 0, -5, -1) | 0;
                      h = Nd(h | 0, H() | 0, 6, 0) | 0;
                      f2 = H() | 0;
                      if ((c2 | 0) > (f2 | 0) | (c2 | 0) == (f2 | 0) & a2 >>> 0 > h >>> 0) {
                        c2 = Jd(a2 | 0, c2 | 0, -1, -1) | 0;
                        c2 = Kd(c2 | 0, H() | 0, h | 0, f2 | 0) | 0;
                        h = H() | 0;
                        n = g2;
                        p2 = b[n >> 2] | 0;
                        n = b[n + 4 >> 2] | 0;
                        q2 = (k + e2 | 0) * 3 | 0;
                        o = Ud(7, 0, q2 | 0) | 0;
                        n = n & ~(H() | 0);
                        e2 = Nd(c2 | 0, h | 0, i | 0, d2 | 0) | 0;
                        a2 = H() | 0;
                        f2 = Jd(e2 | 0, a2 | 0, 2, 0) | 0;
                        q2 = Ud(f2 | 0, H() | 0, q2 | 0) | 0;
                        n = H() | 0 | n;
                        f2 = g2;
                        b[f2 >> 2] = q2 | p2 & ~o;
                        b[f2 + 4 >> 2] = n;
                        a2 = Pd(e2 | 0, a2 | 0, i | 0, d2 | 0) | 0;
                        a2 = Kd(c2 | 0, h | 0, a2 | 0, H() | 0) | 0;
                        h = 0;
                        c2 = H() | 0;
                        break;
                      } else {
                        q2 = g2;
                        o = b[q2 >> 2] | 0;
                        q2 = b[q2 + 4 >> 2] | 0;
                        p2 = Ud(7, 0, (k + e2 | 0) * 3 | 0) | 0;
                        q2 = q2 & ~(H() | 0);
                        h = g2;
                        b[h >> 2] = o & ~p2;
                        b[h + 4 >> 2] = q2;
                        h = 1;
                        break;
                      }
                    } else {
                      o = g2;
                      f2 = b[o >> 2] | 0;
                      o = b[o + 4 >> 2] | 0;
                      e2 = (k + e2 | 0) * 3 | 0;
                      n = Ud(7, 0, e2 | 0) | 0;
                      o = o & ~(H() | 0);
                      q2 = Nd(a2 | 0, c2 | 0, i | 0, d2 | 0) | 0;
                      h = H() | 0;
                      e2 = Ud(q2 | 0, h | 0, e2 | 0) | 0;
                      o = H() | 0 | o;
                      p2 = g2;
                      b[p2 >> 2] = e2 | f2 & ~n;
                      b[p2 + 4 >> 2] = o;
                      h = Pd(q2 | 0, h | 0, i | 0, d2 | 0) | 0;
                      a2 = Kd(a2 | 0, c2 | 0, h | 0, H() | 0) | 0;
                      h = 0;
                      c2 = H() | 0;
                    }
                  } while (0);
                  if ((l | 0) > (j | 0)) {
                    e2 = ~j;
                    j = j + 1 | 0;
                  } else {
                    c2 = 0;
                    break;
                  }
                }
                T = m;
                return c2 | 0;
              }
            } while (0);
            if ((l | 0) < 1) {
              q2 = 0;
              T = m;
              return q2 | 0;
            }
            f2 = i ^ 15;
            h = 1;
            while (1) {
              p2 = l - h | 0;
              p2 = Rc(7, 0, p2, ((p2 | 0) < 0) << 31 >> 31) | 0;
              q2 = H() | 0;
              j = g2;
              d2 = b[j >> 2] | 0;
              j = b[j + 4 >> 2] | 0;
              i = (f2 - h | 0) * 3 | 0;
              e2 = Ud(7, 0, i | 0) | 0;
              j = j & ~(H() | 0);
              n = Nd(a2 | 0, c2 | 0, p2 | 0, q2 | 0) | 0;
              o = H() | 0;
              i = Ud(n | 0, o | 0, i | 0) | 0;
              j = H() | 0 | j;
              k = g2;
              b[k >> 2] = i | d2 & ~e2;
              b[k + 4 >> 2] = j;
              q2 = Pd(n | 0, o | 0, p2 | 0, q2 | 0) | 0;
              a2 = Kd(a2 | 0, c2 | 0, q2 | 0, H() | 0) | 0;
              c2 = H() | 0;
              if ((l | 0) <= (h | 0)) {
                c2 = 0;
                break;
              } else {
                h = h + 1 | 0;
              }
            }
            T = m;
            return c2 | 0;
          }
          __name(hc, "hc");
          function ic(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0;
            f2 = Td(c2 | 0, d2 | 0, 52) | 0;
            H() | 0;
            f2 = f2 & 15;
            if ((c2 | 0) == 0 & (d2 | 0) == 0 | ((e2 | 0) > 15 | (f2 | 0) > (e2 | 0))) {
              g2 = -1;
              c2 = -1;
              d2 = 0;
              f2 = 0;
            } else {
              c2 = Mb(c2, d2, f2 + 1 | 0, e2) | 0;
              h = (H() | 0) & -15728641;
              d2 = Ud(e2 | 0, 0, 52) | 0;
              d2 = c2 | d2;
              h = h | (H() | 0);
              c2 = (Kb(d2, h) | 0) == 0;
              g2 = f2;
              c2 = c2 ? -1 : e2;
              f2 = h;
            }
            h = a2;
            b[h >> 2] = d2;
            b[h + 4 >> 2] = f2;
            b[a2 + 8 >> 2] = g2;
            b[a2 + 12 >> 2] = c2;
            return;
          }
          __name(ic, "ic");
          function jc(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0;
            f2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            f2 = f2 & 15;
            g2 = e2 + 8 | 0;
            b[g2 >> 2] = f2;
            if ((a2 | 0) == 0 & (c2 | 0) == 0 | ((d2 | 0) > 15 | (f2 | 0) > (d2 | 0))) {
              d2 = e2;
              b[d2 >> 2] = 0;
              b[d2 + 4 >> 2] = 0;
              b[g2 >> 2] = -1;
              b[e2 + 12 >> 2] = -1;
              return;
            }
            a2 = Mb(a2, c2, f2 + 1 | 0, d2) | 0;
            g2 = (H() | 0) & -15728641;
            f2 = Ud(d2 | 0, 0, 52) | 0;
            f2 = a2 | f2;
            g2 = g2 | (H() | 0);
            a2 = e2;
            b[a2 >> 2] = f2;
            b[a2 + 4 >> 2] = g2;
            a2 = e2 + 12 | 0;
            if (!(Kb(f2, g2) | 0)) {
              b[a2 >> 2] = -1;
              return;
            } else {
              b[a2 >> 2] = d2;
              return;
            }
          }
          __name(jc, "jc");
          function kc(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0;
            d2 = a2;
            c2 = b[d2 >> 2] | 0;
            d2 = b[d2 + 4 >> 2] | 0;
            if ((c2 | 0) == 0 & (d2 | 0) == 0) {
              return;
            }
            e2 = Td(c2 | 0, d2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            i = Ud(1, 0, (e2 ^ 15) * 3 | 0) | 0;
            c2 = Jd(i | 0, H() | 0, c2 | 0, d2 | 0) | 0;
            d2 = H() | 0;
            i = a2;
            b[i >> 2] = c2;
            b[i + 4 >> 2] = d2;
            i = a2 + 8 | 0;
            h = b[i >> 2] | 0;
            if ((e2 | 0) < (h | 0)) {
              return;
            }
            j = a2 + 12 | 0;
            g2 = e2;
            while (1) {
              if ((g2 | 0) == (h | 0)) {
                e2 = 5;
                break;
              }
              k = (g2 | 0) == (b[j >> 2] | 0);
              f2 = (15 - g2 | 0) * 3 | 0;
              e2 = Td(c2 | 0, d2 | 0, f2 | 0) | 0;
              H() | 0;
              e2 = e2 & 7;
              if (k & ((e2 | 0) == 1 & true)) {
                e2 = 7;
                break;
              }
              if (!((e2 | 0) == 7 & true)) {
                e2 = 10;
                break;
              }
              k = Ud(1, 0, f2 | 0) | 0;
              c2 = Jd(c2 | 0, d2 | 0, k | 0, H() | 0) | 0;
              d2 = H() | 0;
              k = a2;
              b[k >> 2] = c2;
              b[k + 4 >> 2] = d2;
              if ((g2 | 0) > (h | 0)) {
                g2 = g2 + -1 | 0;
              } else {
                e2 = 10;
                break;
              }
            }
            if ((e2 | 0) == 5) {
              k = a2;
              b[k >> 2] = 0;
              b[k + 4 >> 2] = 0;
              b[i >> 2] = -1;
              b[j >> 2] = -1;
              return;
            } else if ((e2 | 0) == 7) {
              h = Ud(1, 0, f2 | 0) | 0;
              h = Jd(c2 | 0, d2 | 0, h | 0, H() | 0) | 0;
              i = H() | 0;
              k = a2;
              b[k >> 2] = h;
              b[k + 4 >> 2] = i;
              b[j >> 2] = g2 + -1;
              return;
            } else if ((e2 | 0) == 10) {
              return;
            }
          }
          __name(kc, "kc");
          function lc(a2) {
            a2 = +a2;
            var b2 = 0;
            b2 = a2 < 0 ? a2 + 6.283185307179586 : a2;
            return +(!(a2 >= 6.283185307179586) ? b2 : b2 + -6.283185307179586);
          }
          __name(lc, "lc");
          function mc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (!(+q(+(+e[a2 >> 3] - +e[b2 >> 3])) < 17453292519943298e-27)) {
              b2 = 0;
              return b2 | 0;
            }
            b2 = +q(+(+e[a2 + 8 >> 3] - +e[b2 + 8 >> 3])) < 17453292519943298e-27;
            return b2 | 0;
          }
          __name(mc, "mc");
          function nc(a2, b2) {
            a2 = +a2;
            b2 = b2 | 0;
            switch (b2 | 0) {
              case 1: {
                a2 = a2 < 0 ? a2 + 6.283185307179586 : a2;
                break;
              }
              case 2: {
                a2 = a2 > 0 ? a2 + -6.283185307179586 : a2;
                break;
              }
              default:
            }
            return +a2;
          }
          __name(nc, "nc");
          function oc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0;
            f2 = +e[b2 >> 3];
            d2 = +e[a2 >> 3];
            g2 = +u(+((f2 - d2) * 0.5));
            c2 = +u(+((+e[b2 + 8 >> 3] - +e[a2 + 8 >> 3]) * 0.5));
            c2 = g2 * g2 + c2 * (+t(+f2) * +t(+d2) * c2);
            return +(+z(+ +r(+c2), + +r(+(1 - c2))) * 2);
          }
          __name(oc, "oc");
          function pc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0;
            f2 = +e[b2 >> 3];
            d2 = +e[a2 >> 3];
            g2 = +u(+((f2 - d2) * 0.5));
            c2 = +u(+((+e[b2 + 8 >> 3] - +e[a2 + 8 >> 3]) * 0.5));
            c2 = g2 * g2 + c2 * (+t(+f2) * +t(+d2) * c2);
            return +(+z(+ +r(+c2), + +r(+(1 - c2))) * 2 * 6371.007180918475);
          }
          __name(pc, "pc");
          function qc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0;
            f2 = +e[b2 >> 3];
            d2 = +e[a2 >> 3];
            g2 = +u(+((f2 - d2) * 0.5));
            c2 = +u(+((+e[b2 + 8 >> 3] - +e[a2 + 8 >> 3]) * 0.5));
            c2 = g2 * g2 + c2 * (+t(+f2) * +t(+d2) * c2);
            return +(+z(+ +r(+c2), + +r(+(1 - c2))) * 2 * 6371.007180918475 * 1e3);
          }
          __name(qc, "qc");
          function rc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0;
            g2 = +e[b2 >> 3];
            d2 = +t(+g2);
            f2 = +e[b2 + 8 >> 3] - +e[a2 + 8 >> 3];
            h = d2 * +u(+f2);
            c2 = +e[a2 >> 3];
            return + +z(+h, +(+u(+g2) * +t(+c2) - +t(+f2) * (d2 * +u(+c2))));
          }
          __name(rc, "rc");
          function sc(a2, c2, d2, f2) {
            a2 = a2 | 0;
            c2 = +c2;
            d2 = +d2;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0;
            if (d2 < 1e-16) {
              b[f2 >> 2] = b[a2 >> 2];
              b[f2 + 4 >> 2] = b[a2 + 4 >> 2];
              b[f2 + 8 >> 2] = b[a2 + 8 >> 2];
              b[f2 + 12 >> 2] = b[a2 + 12 >> 2];
              return;
            }
            h = c2 < 0 ? c2 + 6.283185307179586 : c2;
            h = !(c2 >= 6.283185307179586) ? h : h + -6.283185307179586;
            do {
              if (h < 1e-16) {
                c2 = +e[a2 >> 3] + d2;
                e[f2 >> 3] = c2;
                g2 = f2;
              } else {
                g2 = +q(+(h + -3.141592653589793)) < 1e-16;
                c2 = +e[a2 >> 3];
                if (g2) {
                  c2 = c2 - d2;
                  e[f2 >> 3] = c2;
                  g2 = f2;
                  break;
                }
                i = +t(+d2);
                d2 = +u(+d2);
                c2 = i * +u(+c2) + +t(+h) * (d2 * +t(+c2));
                c2 = c2 > 1 ? 1 : c2;
                c2 = +x(+(c2 < -1 ? -1 : c2));
                e[f2 >> 3] = c2;
                if (+q(+(c2 + -1.5707963267948966)) < 1e-16) {
                  e[f2 >> 3] = 1.5707963267948966;
                  e[f2 + 8 >> 3] = 0;
                  return;
                }
                if (+q(+(c2 + 1.5707963267948966)) < 1e-16) {
                  e[f2 >> 3] = -1.5707963267948966;
                  e[f2 + 8 >> 3] = 0;
                  return;
                }
                j = 1 / +t(+c2);
                h = d2 * +u(+h) * j;
                d2 = +e[a2 >> 3];
                c2 = j * ((i - +u(+c2) * +u(+d2)) / +t(+d2));
                i = h > 1 ? 1 : h;
                c2 = c2 > 1 ? 1 : c2;
                c2 = +e[a2 + 8 >> 3] + +z(+(i < -1 ? -1 : i), +(c2 < -1 ? -1 : c2));
                if (c2 > 3.141592653589793) {
                  do {
                    c2 = c2 + -6.283185307179586;
                  } while (c2 > 3.141592653589793);
                }
                if (c2 < -3.141592653589793) {
                  do {
                    c2 = c2 + 6.283185307179586;
                  } while (c2 < -3.141592653589793);
                }
                e[f2 + 8 >> 3] = c2;
                return;
              }
            } while (0);
            if (+q(+(c2 + -1.5707963267948966)) < 1e-16) {
              e[g2 >> 3] = 1.5707963267948966;
              e[f2 + 8 >> 3] = 0;
              return;
            }
            if (+q(+(c2 + 1.5707963267948966)) < 1e-16) {
              e[g2 >> 3] = -1.5707963267948966;
              e[f2 + 8 >> 3] = 0;
              return;
            }
            c2 = +e[a2 + 8 >> 3];
            if (c2 > 3.141592653589793) {
              do {
                c2 = c2 + -6.283185307179586;
              } while (c2 > 3.141592653589793);
            }
            if (c2 < -3.141592653589793) {
              do {
                c2 = c2 + 6.283185307179586;
              } while (c2 < -3.141592653589793);
            }
            e[f2 + 8 >> 3] = c2;
            return;
          }
          __name(sc, "sc");
          function tc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (a2 >>> 0 > 15) {
              b2 = 4;
              return b2 | 0;
            }
            e[b2 >> 3] = +e[20656 + (a2 << 3) >> 3];
            b2 = 0;
            return b2 | 0;
          }
          __name(tc, "tc");
          function uc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (a2 >>> 0 > 15) {
              b2 = 4;
              return b2 | 0;
            }
            e[b2 >> 3] = +e[20784 + (a2 << 3) >> 3];
            b2 = 0;
            return b2 | 0;
          }
          __name(uc, "uc");
          function vc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (a2 >>> 0 > 15) {
              b2 = 4;
              return b2 | 0;
            }
            e[b2 >> 3] = +e[20912 + (a2 << 3) >> 3];
            b2 = 0;
            return b2 | 0;
          }
          __name(vc, "vc");
          function wc(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (a2 >>> 0 > 15) {
              b2 = 4;
              return b2 | 0;
            }
            e[b2 >> 3] = +e[21040 + (a2 << 3) >> 3];
            b2 = 0;
            return b2 | 0;
          }
          __name(wc, "wc");
          function xc(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0;
            if (a2 >>> 0 > 15) {
              c2 = 4;
              return c2 | 0;
            }
            d2 = Rc(7, 0, a2, ((a2 | 0) < 0) << 31 >> 31) | 0;
            d2 = Pd(d2 | 0, H() | 0, 120, 0) | 0;
            a2 = H() | 0;
            b[c2 >> 2] = d2 | 2;
            b[c2 + 4 >> 2] = a2;
            c2 = 0;
            return c2 | 0;
          }
          __name(xc, "xc");
          function yc(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
            n = +e[b2 >> 3];
            l = +e[a2 >> 3];
            j = +u(+((n - l) * 0.5));
            g2 = +e[b2 + 8 >> 3];
            k = +e[a2 + 8 >> 3];
            h = +u(+((g2 - k) * 0.5));
            i = +t(+l);
            m = +t(+n);
            h = j * j + h * (m * i * h);
            h = +z(+ +r(+h), + +r(+(1 - h))) * 2;
            j = +e[c2 >> 3];
            n = +u(+((j - n) * 0.5));
            d2 = +e[c2 + 8 >> 3];
            g2 = +u(+((d2 - g2) * 0.5));
            f2 = +t(+j);
            g2 = n * n + g2 * (m * f2 * g2);
            g2 = +z(+ +r(+g2), + +r(+(1 - g2))) * 2;
            j = +u(+((l - j) * 0.5));
            d2 = +u(+((k - d2) * 0.5));
            d2 = j * j + d2 * (i * f2 * d2);
            d2 = +z(+ +r(+d2), + +r(+(1 - d2))) * 2;
            f2 = (h + g2 + d2) * 0.5;
            return +(+y(+ +r(+(+v(+(f2 * 0.5)) * +v(+((f2 - h) * 0.5)) * +v(+((f2 - g2) * 0.5)) * +v(+((f2 - d2) * 0.5))))) * 4);
          }
          __name(yc, "yc");
          function zc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 192 | 0;
            h = j + 168 | 0;
            i = j;
            g2 = ac(a2, c2, h) | 0;
            if (g2 | 0) {
              d2 = g2;
              T = j;
              return d2 | 0;
            }
            if (bc(a2, c2, i) | 0) {
              I(27795, 27190, 415, 27199);
            }
            c2 = b[i >> 2] | 0;
            if ((c2 | 0) > 0) {
              f2 = +yc(i + 8 | 0, i + 8 + (((c2 | 0) != 1 & 1) << 4) | 0, h) + 0;
              if ((c2 | 0) != 1) {
                a2 = 1;
                do {
                  g2 = a2;
                  a2 = a2 + 1 | 0;
                  f2 = f2 + +yc(i + 8 + (g2 << 4) | 0, i + 8 + (((a2 | 0) % (c2 | 0) | 0) << 4) | 0, h);
                } while ((a2 | 0) < (c2 | 0));
              }
            } else {
              f2 = 0;
            }
            e[d2 >> 3] = f2;
            d2 = 0;
            T = j;
            return d2 | 0;
          }
          __name(zc, "zc");
          function Ac(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            a2 = zc(a2, b2, c2) | 0;
            if (a2 | 0) {
              return a2 | 0;
            }
            e[c2 >> 3] = +e[c2 >> 3] * 6371.007180918475 * 6371.007180918475;
            return a2 | 0;
          }
          __name(Ac, "Ac");
          function Bc(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            a2 = zc(a2, b2, c2) | 0;
            if (a2 | 0) {
              return a2 | 0;
            }
            e[c2 >> 3] = +e[c2 >> 3] * 6371.007180918475 * 6371.007180918475 * 1e3 * 1e3;
            return a2 | 0;
          }
          __name(Bc, "Bc");
          function Cc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            j = T;
            T = T + 176 | 0;
            i = j;
            a2 = pb(a2, c2, i) | 0;
            if (a2 | 0) {
              i = a2;
              T = j;
              return i | 0;
            }
            e[d2 >> 3] = 0;
            a2 = b[i >> 2] | 0;
            if ((a2 | 0) <= 1) {
              i = 0;
              T = j;
              return i | 0;
            }
            c2 = a2 + -1 | 0;
            a2 = 0;
            f2 = +e[i + 8 >> 3];
            g2 = +e[i + 16 >> 3];
            h = 0;
            do {
              a2 = a2 + 1 | 0;
              l = f2;
              f2 = +e[i + 8 + (a2 << 4) >> 3];
              m = +u(+((f2 - l) * 0.5));
              k = g2;
              g2 = +e[i + 8 + (a2 << 4) + 8 >> 3];
              k = +u(+((g2 - k) * 0.5));
              k = m * m + k * (+t(+f2) * +t(+l) * k);
              h = h + +z(+ +r(+k), + +r(+(1 - k))) * 2;
            } while ((a2 | 0) < (c2 | 0));
            e[d2 >> 3] = h;
            i = 0;
            T = j;
            return i | 0;
          }
          __name(Cc, "Cc");
          function Dc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            j = T;
            T = T + 176 | 0;
            i = j;
            a2 = pb(a2, c2, i) | 0;
            if (a2 | 0) {
              i = a2;
              h = +e[d2 >> 3];
              h = h * 6371.007180918475;
              e[d2 >> 3] = h;
              T = j;
              return i | 0;
            }
            e[d2 >> 3] = 0;
            a2 = b[i >> 2] | 0;
            if ((a2 | 0) <= 1) {
              i = 0;
              h = 0;
              h = h * 6371.007180918475;
              e[d2 >> 3] = h;
              T = j;
              return i | 0;
            }
            c2 = a2 + -1 | 0;
            a2 = 0;
            f2 = +e[i + 8 >> 3];
            g2 = +e[i + 16 >> 3];
            h = 0;
            do {
              a2 = a2 + 1 | 0;
              l = f2;
              f2 = +e[i + 8 + (a2 << 4) >> 3];
              m = +u(+((f2 - l) * 0.5));
              k = g2;
              g2 = +e[i + 8 + (a2 << 4) + 8 >> 3];
              k = +u(+((g2 - k) * 0.5));
              k = m * m + k * (+t(+l) * +t(+f2) * k);
              h = h + +z(+ +r(+k), + +r(+(1 - k))) * 2;
            } while ((a2 | 0) != (c2 | 0));
            e[d2 >> 3] = h;
            i = 0;
            m = h;
            m = m * 6371.007180918475;
            e[d2 >> 3] = m;
            T = j;
            return i | 0;
          }
          __name(Dc, "Dc");
          function Ec(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            j = T;
            T = T + 176 | 0;
            i = j;
            a2 = pb(a2, c2, i) | 0;
            if (a2 | 0) {
              i = a2;
              h = +e[d2 >> 3];
              h = h * 6371.007180918475;
              h = h * 1e3;
              e[d2 >> 3] = h;
              T = j;
              return i | 0;
            }
            e[d2 >> 3] = 0;
            a2 = b[i >> 2] | 0;
            if ((a2 | 0) <= 1) {
              i = 0;
              h = 0;
              h = h * 6371.007180918475;
              h = h * 1e3;
              e[d2 >> 3] = h;
              T = j;
              return i | 0;
            }
            c2 = a2 + -1 | 0;
            a2 = 0;
            f2 = +e[i + 8 >> 3];
            g2 = +e[i + 16 >> 3];
            h = 0;
            do {
              a2 = a2 + 1 | 0;
              l = f2;
              f2 = +e[i + 8 + (a2 << 4) >> 3];
              m = +u(+((f2 - l) * 0.5));
              k = g2;
              g2 = +e[i + 8 + (a2 << 4) + 8 >> 3];
              k = +u(+((g2 - k) * 0.5));
              k = m * m + k * (+t(+l) * +t(+f2) * k);
              h = h + +z(+ +r(+k), + +r(+(1 - k))) * 2;
            } while ((a2 | 0) != (c2 | 0));
            e[d2 >> 3] = h;
            i = 0;
            m = h;
            m = m * 6371.007180918475;
            m = m * 1e3;
            e[d2 >> 3] = m;
            T = j;
            return i | 0;
          }
          __name(Ec, "Ec");
          function Fc(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            c2 = Id(1, 12) | 0;
            if (!c2) {
              I(27280, 27235, 49, 27293);
            }
            d2 = a2 + 4 | 0;
            e2 = b[d2 >> 2] | 0;
            if (e2 | 0) {
              e2 = e2 + 8 | 0;
              b[e2 >> 2] = c2;
              b[d2 >> 2] = c2;
              return c2 | 0;
            }
            if (b[a2 >> 2] | 0) {
              I(27310, 27235, 61, 27333);
            }
            e2 = a2;
            b[e2 >> 2] = c2;
            b[d2 >> 2] = c2;
            return c2 | 0;
          }
          __name(Fc, "Fc");
          function Gc(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0;
            e2 = Gd(24) | 0;
            if (!e2) {
              I(27347, 27235, 78, 27361);
            }
            b[e2 >> 2] = b[c2 >> 2];
            b[e2 + 4 >> 2] = b[c2 + 4 >> 2];
            b[e2 + 8 >> 2] = b[c2 + 8 >> 2];
            b[e2 + 12 >> 2] = b[c2 + 12 >> 2];
            b[e2 + 16 >> 2] = 0;
            c2 = a2 + 4 | 0;
            d2 = b[c2 >> 2] | 0;
            if (d2 | 0) {
              b[d2 + 16 >> 2] = e2;
              b[c2 >> 2] = e2;
              return e2 | 0;
            }
            if (b[a2 >> 2] | 0) {
              I(27376, 27235, 82, 27361);
            }
            b[a2 >> 2] = e2;
            b[c2 >> 2] = e2;
            return e2 | 0;
          }
          __name(Gc, "Gc");
          function Hc(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0;
            if (!a2) {
              return;
            }
            e2 = 1;
            while (1) {
              c2 = b[a2 >> 2] | 0;
              if (c2 | 0) {
                do {
                  d2 = b[c2 >> 2] | 0;
                  if (d2 | 0) {
                    do {
                      f2 = d2;
                      d2 = b[d2 + 16 >> 2] | 0;
                      Hd(f2);
                    } while ((d2 | 0) != 0);
                  }
                  f2 = c2;
                  c2 = b[c2 + 8 >> 2] | 0;
                  Hd(f2);
                } while ((c2 | 0) != 0);
              }
              c2 = a2;
              a2 = b[a2 + 8 >> 2] | 0;
              if (!e2) {
                Hd(c2);
              }
              if (!a2) {
                break;
              } else {
                e2 = 0;
              }
            }
            return;
          }
          __name(Hc, "Hc");
          function Ic(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0, B2 = 0, C2 = 0, D2 = 0, E2 = 0, F = 0, G2 = 0, H2 = 0, J2 = 0, K2 = 0;
            g2 = a2 + 8 | 0;
            if (b[g2 >> 2] | 0) {
              K2 = 1;
              return K2 | 0;
            }
            f2 = b[a2 >> 2] | 0;
            if (!f2) {
              K2 = 0;
              return K2 | 0;
            }
            c2 = f2;
            d2 = 0;
            do {
              d2 = d2 + 1 | 0;
              c2 = b[c2 + 8 >> 2] | 0;
            } while ((c2 | 0) != 0);
            if (d2 >>> 0 < 2) {
              K2 = 0;
              return K2 | 0;
            }
            H2 = Gd(d2 << 2) | 0;
            if (!H2) {
              I(27396, 27235, 317, 27415);
            }
            G2 = Gd(d2 << 5) | 0;
            if (!G2) {
              I(27437, 27235, 321, 27415);
            }
            b[a2 >> 2] = 0;
            z2 = a2 + 4 | 0;
            b[z2 >> 2] = 0;
            b[g2 >> 2] = 0;
            d2 = 0;
            F = 0;
            y2 = 0;
            n = 0;
            a: while (1) {
              m = b[f2 >> 2] | 0;
              if (m) {
                h = 0;
                i = m;
                do {
                  k = +e[i + 8 >> 3];
                  c2 = i;
                  i = b[i + 16 >> 2] | 0;
                  l = (i | 0) == 0;
                  g2 = l ? m : i;
                  j = +e[g2 + 8 >> 3];
                  if (+q(+(k - j)) > 3.141592653589793) {
                    K2 = 14;
                    break;
                  }
                  h = h + (j - k) * (+e[c2 >> 3] + +e[g2 >> 3]);
                } while (!l);
                if ((K2 | 0) == 14) {
                  K2 = 0;
                  h = 0;
                  c2 = m;
                  do {
                    x2 = +e[c2 + 8 >> 3];
                    E2 = c2 + 16 | 0;
                    D2 = b[E2 >> 2] | 0;
                    D2 = (D2 | 0) == 0 ? m : D2;
                    w2 = +e[D2 + 8 >> 3];
                    h = h + (+e[c2 >> 3] + +e[D2 >> 3]) * ((w2 < 0 ? w2 + 6.283185307179586 : w2) - (x2 < 0 ? x2 + 6.283185307179586 : x2));
                    c2 = b[((c2 | 0) == 0 ? f2 : E2) >> 2] | 0;
                  } while ((c2 | 0) != 0);
                }
                if (h > 0) {
                  b[H2 + (F << 2) >> 2] = f2;
                  F = F + 1 | 0;
                  g2 = y2;
                  c2 = n;
                } else {
                  K2 = 19;
                }
              } else {
                K2 = 19;
              }
              if ((K2 | 0) == 19) {
                K2 = 0;
                do {
                  if (!d2) {
                    if (!n) {
                      if (!(b[a2 >> 2] | 0)) {
                        g2 = z2;
                        i = a2;
                        c2 = f2;
                        d2 = a2;
                        break;
                      } else {
                        K2 = 27;
                        break a;
                      }
                    } else {
                      g2 = z2;
                      i = n + 8 | 0;
                      c2 = f2;
                      d2 = a2;
                      break;
                    }
                  } else {
                    c2 = d2 + 8 | 0;
                    if (b[c2 >> 2] | 0) {
                      K2 = 21;
                      break a;
                    }
                    d2 = Id(1, 12) | 0;
                    if (!d2) {
                      K2 = 23;
                      break a;
                    }
                    b[c2 >> 2] = d2;
                    g2 = d2 + 4 | 0;
                    i = d2;
                    c2 = n;
                  }
                } while (0);
                b[i >> 2] = f2;
                b[g2 >> 2] = f2;
                i = G2 + (y2 << 5) | 0;
                l = b[f2 >> 2] | 0;
                if (l) {
                  m = G2 + (y2 << 5) + 8 | 0;
                  e[m >> 3] = 17976931348623157e292;
                  n = G2 + (y2 << 5) + 24 | 0;
                  e[n >> 3] = 17976931348623157e292;
                  e[i >> 3] = -17976931348623157e292;
                  o = G2 + (y2 << 5) + 16 | 0;
                  e[o >> 3] = -17976931348623157e292;
                  u2 = 17976931348623157e292;
                  v2 = -17976931348623157e292;
                  g2 = 0;
                  p2 = l;
                  k = 17976931348623157e292;
                  s2 = 17976931348623157e292;
                  t2 = -17976931348623157e292;
                  j = -17976931348623157e292;
                  while (1) {
                    h = +e[p2 >> 3];
                    x2 = +e[p2 + 8 >> 3];
                    p2 = b[p2 + 16 >> 2] | 0;
                    r2 = (p2 | 0) == 0;
                    w2 = +e[(r2 ? l : p2) + 8 >> 3];
                    if (h < k) {
                      e[m >> 3] = h;
                      k = h;
                    }
                    if (x2 < s2) {
                      e[n >> 3] = x2;
                      s2 = x2;
                    }
                    if (h > t2) {
                      e[i >> 3] = h;
                    } else {
                      h = t2;
                    }
                    if (x2 > j) {
                      e[o >> 3] = x2;
                      j = x2;
                    }
                    u2 = x2 > 0 & x2 < u2 ? x2 : u2;
                    v2 = x2 < 0 & x2 > v2 ? x2 : v2;
                    g2 = g2 | +q(+(x2 - w2)) > 3.141592653589793;
                    if (r2) {
                      break;
                    } else {
                      t2 = h;
                    }
                  }
                  if (g2) {
                    e[o >> 3] = v2;
                    e[n >> 3] = u2;
                  }
                } else {
                  b[i >> 2] = 0;
                  b[i + 4 >> 2] = 0;
                  b[i + 8 >> 2] = 0;
                  b[i + 12 >> 2] = 0;
                  b[i + 16 >> 2] = 0;
                  b[i + 20 >> 2] = 0;
                  b[i + 24 >> 2] = 0;
                  b[i + 28 >> 2] = 0;
                }
                g2 = y2 + 1 | 0;
              }
              E2 = f2 + 8 | 0;
              f2 = b[E2 >> 2] | 0;
              b[E2 >> 2] = 0;
              if (!f2) {
                K2 = 45;
                break;
              } else {
                y2 = g2;
                n = c2;
              }
            }
            if ((K2 | 0) == 21) {
              I(27213, 27235, 35, 27247);
            } else if ((K2 | 0) == 23) {
              I(27267, 27235, 37, 27247);
            } else if ((K2 | 0) == 27) {
              I(27310, 27235, 61, 27333);
            } else if ((K2 | 0) == 45) {
              b: do {
                if ((F | 0) > 0) {
                  E2 = (g2 | 0) == 0;
                  C2 = g2 << 2;
                  D2 = (a2 | 0) == 0;
                  B2 = 0;
                  c2 = 0;
                  while (1) {
                    A2 = b[H2 + (B2 << 2) >> 2] | 0;
                    if (!E2) {
                      y2 = Gd(C2) | 0;
                      if (!y2) {
                        K2 = 50;
                        break;
                      }
                      z2 = Gd(C2) | 0;
                      if (!z2) {
                        K2 = 52;
                        break;
                      }
                      c: do {
                        if (!D2) {
                          g2 = 0;
                          d2 = 0;
                          i = a2;
                          while (1) {
                            f2 = G2 + (g2 << 5) | 0;
                            if (Jc(b[i >> 2] | 0, f2, b[A2 >> 2] | 0) | 0) {
                              b[y2 + (d2 << 2) >> 2] = i;
                              b[z2 + (d2 << 2) >> 2] = f2;
                              r2 = d2 + 1 | 0;
                            } else {
                              r2 = d2;
                            }
                            i = b[i + 8 >> 2] | 0;
                            if (!i) {
                              break;
                            } else {
                              g2 = g2 + 1 | 0;
                              d2 = r2;
                            }
                          }
                          if ((r2 | 0) > 0) {
                            f2 = b[y2 >> 2] | 0;
                            if ((r2 | 0) == 1) {
                              d2 = f2;
                            } else {
                              o = 0;
                              p2 = -1;
                              d2 = f2;
                              n = f2;
                              while (1) {
                                l = b[n >> 2] | 0;
                                f2 = 0;
                                i = 0;
                                while (1) {
                                  g2 = b[b[y2 + (i << 2) >> 2] >> 2] | 0;
                                  if ((g2 | 0) == (l | 0)) {
                                    m = f2;
                                  } else {
                                    m = f2 + ((Jc(g2, b[z2 + (i << 2) >> 2] | 0, b[l >> 2] | 0) | 0) & 1) | 0;
                                  }
                                  i = i + 1 | 0;
                                  if ((i | 0) == (r2 | 0)) {
                                    break;
                                  } else {
                                    f2 = m;
                                  }
                                }
                                g2 = (m | 0) > (p2 | 0);
                                d2 = g2 ? n : d2;
                                f2 = o + 1 | 0;
                                if ((f2 | 0) == (r2 | 0)) {
                                  break c;
                                }
                                o = f2;
                                p2 = g2 ? m : p2;
                                n = b[y2 + (f2 << 2) >> 2] | 0;
                              }
                            }
                          } else {
                            d2 = 0;
                          }
                        } else {
                          d2 = 0;
                        }
                      } while (0);
                      Hd(y2);
                      Hd(z2);
                      if (d2) {
                        g2 = d2 + 4 | 0;
                        f2 = b[g2 >> 2] | 0;
                        if (!f2) {
                          if (b[d2 >> 2] | 0) {
                            K2 = 70;
                            break;
                          }
                        } else {
                          d2 = f2 + 8 | 0;
                        }
                        b[d2 >> 2] = A2;
                        b[g2 >> 2] = A2;
                      } else {
                        K2 = 73;
                      }
                    } else {
                      K2 = 73;
                    }
                    if ((K2 | 0) == 73) {
                      K2 = 0;
                      c2 = b[A2 >> 2] | 0;
                      if (c2 | 0) {
                        do {
                          z2 = c2;
                          c2 = b[c2 + 16 >> 2] | 0;
                          Hd(z2);
                        } while ((c2 | 0) != 0);
                      }
                      Hd(A2);
                      c2 = 1;
                    }
                    B2 = B2 + 1 | 0;
                    if ((B2 | 0) >= (F | 0)) {
                      J2 = c2;
                      break b;
                    }
                  }
                  if ((K2 | 0) == 50) {
                    I(27452, 27235, 249, 27471);
                  } else if ((K2 | 0) == 52) {
                    I(27490, 27235, 252, 27471);
                  } else if ((K2 | 0) == 70) {
                    I(27310, 27235, 61, 27333);
                  }
                } else {
                  J2 = 0;
                }
              } while (0);
              Hd(H2);
              Hd(G2);
              K2 = J2;
              return K2 | 0;
            }
            return 0;
          }
          __name(Ic, "Ic");
          function Jc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            if (!(Ca(c2, d2) | 0)) {
              a2 = 0;
              return a2 | 0;
            }
            c2 = Aa(c2) | 0;
            f2 = +e[d2 >> 3];
            g2 = +e[d2 + 8 >> 3];
            g2 = c2 & g2 < 0 ? g2 + 6.283185307179586 : g2;
            a2 = b[a2 >> 2] | 0;
            if (!a2) {
              a2 = 0;
              return a2 | 0;
            }
            if (c2) {
              c2 = 0;
              l = g2;
              d2 = a2;
              a: while (1) {
                while (1) {
                  i = +e[d2 >> 3];
                  g2 = +e[d2 + 8 >> 3];
                  d2 = d2 + 16 | 0;
                  m = b[d2 >> 2] | 0;
                  m = (m | 0) == 0 ? a2 : m;
                  h = +e[m >> 3];
                  j = +e[m + 8 >> 3];
                  if (i > h) {
                    k = i;
                    i = j;
                  } else {
                    k = h;
                    h = i;
                    i = g2;
                    g2 = j;
                  }
                  f2 = f2 == h | f2 == k ? f2 + 2220446049250313e-31 : f2;
                  if (!(f2 < h | f2 > k)) {
                    break;
                  }
                  d2 = b[d2 >> 2] | 0;
                  if (!d2) {
                    d2 = 22;
                    break a;
                  }
                }
                j = i < 0 ? i + 6.283185307179586 : i;
                i = g2 < 0 ? g2 + 6.283185307179586 : g2;
                l = j == l | i == l ? l + -2220446049250313e-31 : l;
                k = j + (i - j) * ((f2 - h) / (k - h));
                if ((k < 0 ? k + 6.283185307179586 : k) > l) {
                  c2 = c2 ^ 1;
                }
                d2 = b[d2 >> 2] | 0;
                if (!d2) {
                  d2 = 22;
                  break;
                }
              }
              if ((d2 | 0) == 22) {
                return c2 | 0;
              }
            } else {
              c2 = 0;
              l = g2;
              d2 = a2;
              b: while (1) {
                while (1) {
                  i = +e[d2 >> 3];
                  g2 = +e[d2 + 8 >> 3];
                  d2 = d2 + 16 | 0;
                  m = b[d2 >> 2] | 0;
                  m = (m | 0) == 0 ? a2 : m;
                  h = +e[m >> 3];
                  j = +e[m + 8 >> 3];
                  if (i > h) {
                    k = i;
                    i = j;
                  } else {
                    k = h;
                    h = i;
                    i = g2;
                    g2 = j;
                  }
                  f2 = f2 == h | f2 == k ? f2 + 2220446049250313e-31 : f2;
                  if (!(f2 < h | f2 > k)) {
                    break;
                  }
                  d2 = b[d2 >> 2] | 0;
                  if (!d2) {
                    d2 = 22;
                    break b;
                  }
                }
                l = i == l | g2 == l ? l + -2220446049250313e-31 : l;
                if (i + (g2 - i) * ((f2 - h) / (k - h)) > l) {
                  c2 = c2 ^ 1;
                }
                d2 = b[d2 >> 2] | 0;
                if (!d2) {
                  d2 = 22;
                  break;
                }
              }
              if ((d2 | 0) == 22) {
                return c2 | 0;
              }
            }
            return 0;
          }
          __name(Jc, "Jc");
          function Kc(c2, d2, e2, f2, g2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0;
            u2 = T;
            T = T + 32 | 0;
            t2 = u2 + 16 | 0;
            s2 = u2;
            h = Td(c2 | 0, d2 | 0, 52) | 0;
            H() | 0;
            h = h & 15;
            p2 = Td(e2 | 0, f2 | 0, 52) | 0;
            H() | 0;
            if ((h | 0) != (p2 & 15 | 0)) {
              t2 = 12;
              T = u2;
              return t2 | 0;
            }
            l = Td(c2 | 0, d2 | 0, 45) | 0;
            H() | 0;
            l = l & 127;
            m = Td(e2 | 0, f2 | 0, 45) | 0;
            H() | 0;
            m = m & 127;
            if (l >>> 0 > 121 | m >>> 0 > 121) {
              t2 = 5;
              T = u2;
              return t2 | 0;
            }
            p2 = (l | 0) != (m | 0);
            if (p2) {
              j = wa(l, m) | 0;
              if ((j | 0) == 7) {
                t2 = 1;
                T = u2;
                return t2 | 0;
              }
              k = wa(m, l) | 0;
              if ((k | 0) == 7) {
                I(27514, 27538, 161, 27548);
              } else {
                q2 = j;
                i = k;
              }
            } else {
              q2 = 0;
              i = 0;
            }
            n = oa(l) | 0;
            o = oa(m) | 0;
            b[t2 >> 2] = 0;
            b[t2 + 4 >> 2] = 0;
            b[t2 + 8 >> 2] = 0;
            b[t2 + 12 >> 2] = 0;
            do {
              if (!q2) {
                _b(e2, f2, t2) | 0;
                if ((n | 0) != 0 & (o | 0) != 0) {
                  if ((m | 0) != (l | 0)) {
                    I(27621, 27538, 261, 27548);
                  }
                  i = Sb(c2, d2) | 0;
                  h = Sb(e2, f2) | 0;
                  if (!((i | 0) == 7 | (h | 0) == 7)) {
                    if (!(a[22e3 + (i * 7 | 0) + h >> 0] | 0)) {
                      i = b[21168 + (i * 28 | 0) + (h << 2) >> 2] | 0;
                      if ((i | 0) > 0) {
                        j = t2 + 4 | 0;
                        h = 0;
                        do {
                          _a(j);
                          h = h + 1 | 0;
                        } while ((h | 0) != (i | 0));
                        r2 = 51;
                      } else {
                        r2 = 51;
                      }
                    } else {
                      h = 1;
                    }
                  } else {
                    h = 5;
                  }
                } else {
                  r2 = 51;
                }
              } else {
                m = b[4272 + (l * 28 | 0) + (q2 << 2) >> 2] | 0;
                j = (m | 0) > 0;
                if (!o) {
                  if (j) {
                    l = 0;
                    k = e2;
                    j = f2;
                    do {
                      k = Wb(k, j) | 0;
                      j = H() | 0;
                      i = ab(i) | 0;
                      l = l + 1 | 0;
                    } while ((l | 0) != (m | 0));
                    m = i;
                    l = k;
                    k = j;
                  } else {
                    m = i;
                    l = e2;
                    k = f2;
                  }
                } else if (j) {
                  l = 0;
                  k = e2;
                  j = f2;
                  do {
                    k = Vb(k, j) | 0;
                    j = H() | 0;
                    i = ab(i) | 0;
                    if ((i | 0) == 1) {
                      i = ab(1) | 0;
                    }
                    l = l + 1 | 0;
                  } while ((l | 0) != (m | 0));
                  m = i;
                  l = k;
                  k = j;
                } else {
                  m = i;
                  l = e2;
                  k = f2;
                }
                _b(l, k, t2) | 0;
                if (!p2) {
                  I(27563, 27538, 191, 27548);
                }
                j = (n | 0) != 0;
                i = (o | 0) != 0;
                if (j & i) {
                  I(27590, 27538, 192, 27548);
                }
                if (!j) {
                  if (i) {
                    i = Sb(l, k) | 0;
                    if ((i | 0) == 7) {
                      h = 5;
                      break;
                    }
                    if (a[22e3 + (i * 7 | 0) + m >> 0] | 0) {
                      h = 1;
                      break;
                    }
                    l = 0;
                    k = b[21168 + (m * 28 | 0) + (i << 2) >> 2] | 0;
                  } else {
                    l = 0;
                    k = 0;
                  }
                } else {
                  i = Sb(c2, d2) | 0;
                  if ((i | 0) == 7) {
                    h = 5;
                    break;
                  }
                  if (a[22e3 + (i * 7 | 0) + q2 >> 0] | 0) {
                    h = 1;
                    break;
                  }
                  k = b[21168 + (i * 28 | 0) + (q2 << 2) >> 2] | 0;
                  l = k;
                }
                if ((l | k | 0) < 0) {
                  h = 5;
                } else {
                  if ((k | 0) > 0) {
                    j = t2 + 4 | 0;
                    i = 0;
                    do {
                      _a(j);
                      i = i + 1 | 0;
                    } while ((i | 0) != (k | 0));
                  }
                  b[s2 >> 2] = 0;
                  b[s2 + 4 >> 2] = 0;
                  b[s2 + 8 >> 2] = 0;
                  Ya(s2, q2);
                  if (h | 0) {
                    while (1) {
                      if (!(Yb(h) | 0)) {
                        Xa(s2);
                      } else {
                        Wa(s2);
                      }
                      if ((h | 0) > 1) {
                        h = h + -1 | 0;
                      } else {
                        break;
                      }
                    }
                  }
                  if ((l | 0) > 0) {
                    h = 0;
                    do {
                      _a(s2);
                      h = h + 1 | 0;
                    } while ((h | 0) != (l | 0));
                  }
                  r2 = t2 + 4 | 0;
                  Oa(r2, s2, r2);
                  Ma(r2);
                  r2 = 51;
                }
              }
            } while (0);
            if ((r2 | 0) == 51) {
              h = t2 + 4 | 0;
              b[g2 >> 2] = b[h >> 2];
              b[g2 + 4 >> 2] = b[h + 4 >> 2];
              b[g2 + 8 >> 2] = b[h + 8 >> 2];
              h = 0;
            }
            t2 = h;
            T = u2;
            return t2 | 0;
          }
          __name(Kc, "Kc");
          function Lc(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0;
            q2 = T;
            T = T + 48 | 0;
            k = q2 + 36 | 0;
            h = q2 + 24 | 0;
            i = q2 + 12 | 0;
            j = q2;
            f2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            f2 = f2 & 15;
            n = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            n = n & 127;
            if (n >>> 0 > 121) {
              e2 = 5;
              T = q2;
              return e2 | 0;
            }
            l = oa(n) | 0;
            Ud(f2 | 0, 0, 52) | 0;
            r2 = H() | 0 | 134225919;
            g2 = e2;
            b[g2 >> 2] = -1;
            b[g2 + 4 >> 2] = r2;
            if (!f2) {
              f2 = Ra(d2) | 0;
              if ((f2 | 0) == 7) {
                r2 = 1;
                T = q2;
                return r2 | 0;
              }
              f2 = va(n, f2) | 0;
              if ((f2 | 0) == 127) {
                r2 = 1;
                T = q2;
                return r2 | 0;
              }
              o = Ud(f2 | 0, 0, 45) | 0;
              p2 = H() | 0;
              n = e2;
              p2 = b[n + 4 >> 2] & -1040385 | p2;
              r2 = e2;
              b[r2 >> 2] = b[n >> 2] | o;
              b[r2 + 4 >> 2] = p2;
              r2 = 0;
              T = q2;
              return r2 | 0;
            }
            b[k >> 2] = b[d2 >> 2];
            b[k + 4 >> 2] = b[d2 + 4 >> 2];
            b[k + 8 >> 2] = b[d2 + 8 >> 2];
            d2 = f2;
            while (1) {
              g2 = d2;
              d2 = d2 + -1 | 0;
              b[h >> 2] = b[k >> 2];
              b[h + 4 >> 2] = b[k + 4 >> 2];
              b[h + 8 >> 2] = b[k + 8 >> 2];
              if (!(Yb(g2) | 0)) {
                f2 = Ta(k) | 0;
                if (f2 | 0) {
                  d2 = 13;
                  break;
                }
                b[i >> 2] = b[k >> 2];
                b[i + 4 >> 2] = b[k + 4 >> 2];
                b[i + 8 >> 2] = b[k + 8 >> 2];
                Xa(i);
              } else {
                f2 = Sa(k) | 0;
                if (f2 | 0) {
                  d2 = 13;
                  break;
                }
                b[i >> 2] = b[k >> 2];
                b[i + 4 >> 2] = b[k + 4 >> 2];
                b[i + 8 >> 2] = b[k + 8 >> 2];
                Wa(i);
              }
              Pa(h, i, j);
              Ma(j);
              f2 = e2;
              t2 = b[f2 >> 2] | 0;
              f2 = b[f2 + 4 >> 2] | 0;
              u2 = (15 - g2 | 0) * 3 | 0;
              s2 = Ud(7, 0, u2 | 0) | 0;
              f2 = f2 & ~(H() | 0);
              u2 = Ud(Ra(j) | 0, 0, u2 | 0) | 0;
              f2 = H() | 0 | f2;
              r2 = e2;
              b[r2 >> 2] = u2 | t2 & ~s2;
              b[r2 + 4 >> 2] = f2;
              if ((g2 | 0) <= 1) {
                d2 = 14;
                break;
              }
            }
            a: do {
              if ((d2 | 0) != 13) {
                if ((d2 | 0) == 14) {
                  if (((b[k >> 2] | 0) <= 1 ? (b[k + 4 >> 2] | 0) <= 1 : 0) ? (b[k + 8 >> 2] | 0) <= 1 : 0) {
                    d2 = Ra(k) | 0;
                    f2 = va(n, d2) | 0;
                    if ((f2 | 0) == 127) {
                      j = 0;
                    } else {
                      j = oa(f2) | 0;
                    }
                    b: do {
                      if (!d2) {
                        if ((l | 0) != 0 & (j | 0) != 0) {
                          d2 = Sb(a2, c2) | 0;
                          g2 = e2;
                          g2 = Sb(b[g2 >> 2] | 0, b[g2 + 4 >> 2] | 0) | 0;
                          if ((d2 | 0) == 7 | (g2 | 0) == 7) {
                            f2 = 5;
                            break a;
                          }
                          g2 = b[21376 + (d2 * 28 | 0) + (g2 << 2) >> 2] | 0;
                          if ((g2 | 0) < 0) {
                            f2 = 5;
                            break a;
                          }
                          if (!g2) {
                            d2 = 59;
                          } else {
                            i = e2;
                            d2 = 0;
                            h = b[i >> 2] | 0;
                            i = b[i + 4 >> 2] | 0;
                            do {
                              h = Ub(h, i) | 0;
                              i = H() | 0;
                              u2 = e2;
                              b[u2 >> 2] = h;
                              b[u2 + 4 >> 2] = i;
                              d2 = d2 + 1 | 0;
                            } while ((d2 | 0) < (g2 | 0));
                            d2 = 58;
                          }
                        } else {
                          d2 = 58;
                        }
                      } else {
                        if (l) {
                          f2 = Sb(a2, c2) | 0;
                          if ((f2 | 0) == 7) {
                            f2 = 5;
                            break a;
                          }
                          g2 = b[21376 + (f2 * 28 | 0) + (d2 << 2) >> 2] | 0;
                          if ((g2 | 0) > 0) {
                            f2 = d2;
                            d2 = 0;
                            do {
                              f2 = $a(f2) | 0;
                              d2 = d2 + 1 | 0;
                            } while ((d2 | 0) != (g2 | 0));
                          } else {
                            f2 = d2;
                          }
                          if ((f2 | 0) == 1) {
                            f2 = 9;
                            break a;
                          }
                          d2 = va(n, f2) | 0;
                          if ((d2 | 0) == 127) {
                            I(27648, 27538, 411, 27678);
                          }
                          if (!(oa(d2) | 0)) {
                            p2 = d2;
                            o = g2;
                            m = f2;
                          } else {
                            I(27693, 27538, 412, 27678);
                          }
                        } else {
                          p2 = f2;
                          o = 0;
                          m = d2;
                        }
                        i = b[4272 + (n * 28 | 0) + (m << 2) >> 2] | 0;
                        if ((i | 0) <= -1) {
                          I(27724, 27538, 419, 27678);
                        }
                        if (!j) {
                          if ((o | 0) < 0) {
                            f2 = 5;
                            break a;
                          }
                          if (o | 0) {
                            g2 = e2;
                            f2 = 0;
                            d2 = b[g2 >> 2] | 0;
                            g2 = b[g2 + 4 >> 2] | 0;
                            do {
                              d2 = Ub(d2, g2) | 0;
                              g2 = H() | 0;
                              u2 = e2;
                              b[u2 >> 2] = d2;
                              b[u2 + 4 >> 2] = g2;
                              f2 = f2 + 1 | 0;
                            } while ((f2 | 0) < (o | 0));
                          }
                          if ((i | 0) <= 0) {
                            f2 = p2;
                            d2 = 58;
                            break;
                          }
                          g2 = e2;
                          f2 = 0;
                          d2 = b[g2 >> 2] | 0;
                          g2 = b[g2 + 4 >> 2] | 0;
                          while (1) {
                            d2 = Ub(d2, g2) | 0;
                            g2 = H() | 0;
                            u2 = e2;
                            b[u2 >> 2] = d2;
                            b[u2 + 4 >> 2] = g2;
                            f2 = f2 + 1 | 0;
                            if ((f2 | 0) == (i | 0)) {
                              f2 = p2;
                              d2 = 58;
                              break b;
                            }
                          }
                        }
                        h = wa(p2, n) | 0;
                        if ((h | 0) == 7) {
                          I(27514, 27538, 428, 27678);
                        }
                        f2 = e2;
                        d2 = b[f2 >> 2] | 0;
                        f2 = b[f2 + 4 >> 2] | 0;
                        if ((i | 0) > 0) {
                          g2 = 0;
                          do {
                            d2 = Ub(d2, f2) | 0;
                            f2 = H() | 0;
                            u2 = e2;
                            b[u2 >> 2] = d2;
                            b[u2 + 4 >> 2] = f2;
                            g2 = g2 + 1 | 0;
                          } while ((g2 | 0) != (i | 0));
                        }
                        f2 = Sb(d2, f2) | 0;
                        if ((f2 | 0) == 7) {
                          I(27795, 27538, 440, 27678);
                        }
                        d2 = pa(p2) | 0;
                        d2 = b[(d2 ? 21792 : 21584) + (h * 28 | 0) + (f2 << 2) >> 2] | 0;
                        if ((d2 | 0) < 0) {
                          I(27795, 27538, 454, 27678);
                        }
                        if (!d2) {
                          f2 = p2;
                          d2 = 58;
                        } else {
                          h = e2;
                          f2 = 0;
                          g2 = b[h >> 2] | 0;
                          h = b[h + 4 >> 2] | 0;
                          do {
                            g2 = Tb(g2, h) | 0;
                            h = H() | 0;
                            u2 = e2;
                            b[u2 >> 2] = g2;
                            b[u2 + 4 >> 2] = h;
                            f2 = f2 + 1 | 0;
                          } while ((f2 | 0) < (d2 | 0));
                          f2 = p2;
                          d2 = 58;
                        }
                      }
                    } while (0);
                    if ((d2 | 0) == 58) {
                      if (j) {
                        d2 = 59;
                      }
                    }
                    if ((d2 | 0) == 59) {
                      u2 = e2;
                      if ((Sb(b[u2 >> 2] | 0, b[u2 + 4 >> 2] | 0) | 0) == 1) {
                        f2 = 9;
                        break;
                      }
                    }
                    u2 = e2;
                    s2 = b[u2 >> 2] | 0;
                    u2 = b[u2 + 4 >> 2] & -1040385;
                    t2 = Ud(f2 | 0, 0, 45) | 0;
                    u2 = u2 | (H() | 0);
                    f2 = e2;
                    b[f2 >> 2] = s2 | t2;
                    b[f2 + 4 >> 2] = u2;
                    f2 = 0;
                  } else {
                    f2 = 1;
                  }
                }
              }
            } while (0);
            u2 = f2;
            T = q2;
            return u2 | 0;
          }
          __name(Lc, "Lc");
          function Mc(a2, b2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0;
            h = T;
            T = T + 16 | 0;
            g2 = h;
            if (!e2) {
              a2 = Kc(a2, b2, c2, d2, g2) | 0;
              if (!a2) {
                eb(g2, f2);
                a2 = 0;
              }
            } else {
              a2 = 15;
            }
            T = h;
            return a2 | 0;
          }
          __name(Mc, "Mc");
          function Nc(a2, b2, c2, d2, e2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0;
            g2 = T;
            T = T + 16 | 0;
            f2 = g2;
            if (!d2) {
              c2 = fb(c2, f2) | 0;
              if (!c2) {
                c2 = Lc(a2, b2, f2, e2) | 0;
              }
            } else {
              c2 = 15;
            }
            T = g2;
            return c2 | 0;
          }
          __name(Nc, "Nc");
          function Oc(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 32 | 0;
            h = j + 12 | 0;
            i = j;
            g2 = Kc(a2, c2, a2, c2, h) | 0;
            if (g2 | 0) {
              i = g2;
              T = j;
              return i | 0;
            }
            a2 = Kc(a2, c2, d2, e2, i) | 0;
            if (a2 | 0) {
              i = a2;
              T = j;
              return i | 0;
            }
            h = db(h, i) | 0;
            i = f2;
            b[i >> 2] = h;
            b[i + 4 >> 2] = ((h | 0) < 0) << 31 >> 31;
            i = 0;
            T = j;
            return i | 0;
          }
          __name(Oc, "Oc");
          function Pc(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 32 | 0;
            h = j + 12 | 0;
            i = j;
            g2 = Kc(a2, c2, a2, c2, h) | 0;
            if (!g2) {
              g2 = Kc(a2, c2, d2, e2, i) | 0;
              if (!g2) {
                e2 = db(h, i) | 0;
                e2 = Jd(e2 | 0, ((e2 | 0) < 0) << 31 >> 31 | 0, 1, 0) | 0;
                h = H() | 0;
                i = f2;
                b[i >> 2] = e2;
                b[i + 4 >> 2] = h;
                i = 0;
                T = j;
                return i | 0;
              }
            }
            i = g2;
            T = j;
            return i | 0;
          }
          __name(Pc, "Pc");
          function Qc(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0;
            z2 = T;
            T = T + 48 | 0;
            x2 = z2 + 24 | 0;
            h = z2 + 12 | 0;
            y2 = z2;
            g2 = Kc(a2, c2, a2, c2, x2) | 0;
            if (!g2) {
              g2 = Kc(a2, c2, d2, e2, h) | 0;
              if (!g2) {
                v2 = db(x2, h) | 0;
                w2 = ((v2 | 0) < 0) << 31 >> 31;
                b[x2 >> 2] = 0;
                b[x2 + 4 >> 2] = 0;
                b[x2 + 8 >> 2] = 0;
                b[h >> 2] = 0;
                b[h + 4 >> 2] = 0;
                b[h + 8 >> 2] = 0;
                if (Kc(a2, c2, a2, c2, x2) | 0) {
                  I(27795, 27538, 692, 27747);
                }
                if (Kc(a2, c2, d2, e2, h) | 0) {
                  I(27795, 27538, 697, 27747);
                }
                gb(x2);
                gb(h);
                l = (v2 | 0) == 0 ? 0 : 1 / +(v2 | 0);
                d2 = b[x2 >> 2] | 0;
                r2 = l * +((b[h >> 2] | 0) - d2 | 0);
                s2 = x2 + 4 | 0;
                e2 = b[s2 >> 2] | 0;
                t2 = l * +((b[h + 4 >> 2] | 0) - e2 | 0);
                u2 = x2 + 8 | 0;
                g2 = b[u2 >> 2] | 0;
                l = l * +((b[h + 8 >> 2] | 0) - g2 | 0);
                b[y2 >> 2] = d2;
                m = y2 + 4 | 0;
                b[m >> 2] = e2;
                n = y2 + 8 | 0;
                b[n >> 2] = g2;
                a: do {
                  if ((v2 | 0) < 0) {
                    g2 = 0;
                  } else {
                    o = 0;
                    p2 = 0;
                    while (1) {
                      j = +(p2 >>> 0) + 4294967296 * +(o | 0);
                      A2 = r2 * j + +(d2 | 0);
                      i = t2 * j + +(e2 | 0);
                      j = l * j + +(g2 | 0);
                      d2 = ~~+Yd(+A2);
                      h = ~~+Yd(+i);
                      g2 = ~~+Yd(+j);
                      A2 = +q(+(+(d2 | 0) - A2));
                      i = +q(+(+(h | 0) - i));
                      j = +q(+(+(g2 | 0) - j));
                      do {
                        if (!(A2 > i & A2 > j)) {
                          k = 0 - d2 | 0;
                          if (i > j) {
                            e2 = k - g2 | 0;
                            break;
                          } else {
                            e2 = h;
                            g2 = k - h | 0;
                            break;
                          }
                        } else {
                          d2 = 0 - (h + g2) | 0;
                          e2 = h;
                        }
                      } while (0);
                      b[y2 >> 2] = d2;
                      b[m >> 2] = e2;
                      b[n >> 2] = g2;
                      hb(y2);
                      g2 = Lc(a2, c2, y2, f2 + (p2 << 3) | 0) | 0;
                      if (g2 | 0) {
                        break a;
                      }
                      if (!((o | 0) < (w2 | 0) | (o | 0) == (w2 | 0) & p2 >>> 0 < v2 >>> 0)) {
                        g2 = 0;
                        break a;
                      }
                      d2 = Jd(p2 | 0, o | 0, 1, 0) | 0;
                      e2 = H() | 0;
                      o = e2;
                      p2 = d2;
                      d2 = b[x2 >> 2] | 0;
                      e2 = b[s2 >> 2] | 0;
                      g2 = b[u2 >> 2] | 0;
                    }
                  }
                } while (0);
                y2 = g2;
                T = z2;
                return y2 | 0;
              }
            }
            y2 = g2;
            T = z2;
            return y2 | 0;
          }
          __name(Qc, "Qc");
          function Rc(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            if ((c2 | 0) == 0 & (d2 | 0) == 0) {
              e2 = 0;
              f2 = 1;
              G(e2 | 0);
              return f2 | 0;
            }
            f2 = a2;
            e2 = b2;
            a2 = 1;
            b2 = 0;
            do {
              g2 = (c2 & 1 | 0) == 0 & true;
              a2 = Pd((g2 ? 1 : f2) | 0, (g2 ? 0 : e2) | 0, a2 | 0, b2 | 0) | 0;
              b2 = H() | 0;
              c2 = Sd(c2 | 0, d2 | 0, 1) | 0;
              d2 = H() | 0;
              f2 = Pd(f2 | 0, e2 | 0, f2 | 0, e2 | 0) | 0;
              e2 = H() | 0;
            } while (!((c2 | 0) == 0 & (d2 | 0) == 0));
            G(b2 | 0);
            return a2 | 0;
          }
          __name(Rc, "Rc");
          function Sc(a2, c2, d2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            j = T;
            T = T + 16 | 0;
            h = j;
            i = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            i = i & 15;
            do {
              if (!i) {
                g2 = Td(a2 | 0, c2 | 0, 45) | 0;
                H() | 0;
                g2 = g2 & 127;
                if (g2 >>> 0 > 121) {
                  i = 5;
                  T = j;
                  return i | 0;
                } else {
                  h = 22064 + (g2 << 5) | 0;
                  b[d2 >> 2] = b[h >> 2];
                  b[d2 + 4 >> 2] = b[h + 4 >> 2];
                  b[d2 + 8 >> 2] = b[h + 8 >> 2];
                  b[d2 + 12 >> 2] = b[h + 12 >> 2];
                  b[d2 + 16 >> 2] = b[h + 16 >> 2];
                  b[d2 + 20 >> 2] = b[h + 20 >> 2];
                  b[d2 + 24 >> 2] = b[h + 24 >> 2];
                  b[d2 + 28 >> 2] = b[h + 28 >> 2];
                  break;
                }
              } else {
                g2 = ac(a2, c2, h) | 0;
                if (!g2) {
                  l = +e[h >> 3];
                  k = 1 / +t(+l);
                  m = +e[25968 + (i << 3) >> 3];
                  e[d2 >> 3] = l + m;
                  e[d2 + 8 >> 3] = l - m;
                  l = +e[h + 8 >> 3];
                  k = m * k;
                  e[d2 + 16 >> 3] = k + l;
                  e[d2 + 24 >> 3] = l - k;
                  break;
                }
                i = g2;
                T = j;
                return i | 0;
              }
            } while (0);
            Ja(d2, f2 ? 1.4 : 1.1);
            f2 = 26096 + (i << 3) | 0;
            if ((b[f2 >> 2] | 0) == (a2 | 0) ? (b[f2 + 4 >> 2] | 0) == (c2 | 0) : 0) {
              e[d2 >> 3] = 1.5707963267948966;
            }
            i = 26224 + (i << 3) | 0;
            if ((b[i >> 2] | 0) == (a2 | 0) ? (b[i + 4 >> 2] | 0) == (c2 | 0) : 0) {
              e[d2 + 8 >> 3] = -1.5707963267948966;
            }
            if (!(+e[d2 >> 3] == 1.5707963267948966) ? !(+e[d2 + 8 >> 3] == -1.5707963267948966) : 0) {
              i = 0;
              T = j;
              return i | 0;
            }
            e[d2 + 16 >> 3] = 3.141592653589793;
            e[d2 + 24 >> 3] = -3.141592653589793;
            i = 0;
            T = j;
            return i | 0;
          }
          __name(Sc, "Sc");
          function Tc(c2, d2, e2, f2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            l = T;
            T = T + 48 | 0;
            i = l + 32 | 0;
            h = l + 40 | 0;
            j = l;
            Hb(i, 0, 0, 0);
            k = b[i >> 2] | 0;
            i = b[i + 4 >> 2] | 0;
            do {
              if (e2 >>> 0 <= 15) {
                g2 = _c(f2) | 0;
                if (g2 | 0) {
                  f2 = j;
                  b[f2 >> 2] = 0;
                  b[f2 + 4 >> 2] = 0;
                  b[j + 8 >> 2] = g2;
                  b[j + 12 >> 2] = -1;
                  f2 = j + 16 | 0;
                  k = j + 29 | 0;
                  b[f2 >> 2] = 0;
                  b[f2 + 4 >> 2] = 0;
                  b[f2 + 8 >> 2] = 0;
                  a[f2 + 12 >> 0] = 0;
                  a[k >> 0] = a[h >> 0] | 0;
                  a[k + 1 >> 0] = a[h + 1 >> 0] | 0;
                  a[k + 2 >> 0] = a[h + 2 >> 0] | 0;
                  break;
                }
                g2 = Id((b[d2 + 8 >> 2] | 0) + 1 | 0, 32) | 0;
                if (!g2) {
                  f2 = j;
                  b[f2 >> 2] = 0;
                  b[f2 + 4 >> 2] = 0;
                  b[j + 8 >> 2] = 13;
                  b[j + 12 >> 2] = -1;
                  f2 = j + 16 | 0;
                  k = j + 29 | 0;
                  b[f2 >> 2] = 0;
                  b[f2 + 4 >> 2] = 0;
                  b[f2 + 8 >> 2] = 0;
                  a[f2 + 12 >> 0] = 0;
                  a[k >> 0] = a[h >> 0] | 0;
                  a[k + 1 >> 0] = a[h + 1 >> 0] | 0;
                  a[k + 2 >> 0] = a[h + 2 >> 0] | 0;
                  break;
                } else {
                  $c(d2, g2);
                  m = j;
                  b[m >> 2] = k;
                  b[m + 4 >> 2] = i;
                  b[j + 8 >> 2] = 0;
                  b[j + 12 >> 2] = e2;
                  b[j + 16 >> 2] = f2;
                  b[j + 20 >> 2] = d2;
                  b[j + 24 >> 2] = g2;
                  a[j + 28 >> 0] = 0;
                  k = j + 29 | 0;
                  a[k >> 0] = a[h >> 0] | 0;
                  a[k + 1 >> 0] = a[h + 1 >> 0] | 0;
                  a[k + 2 >> 0] = a[h + 2 >> 0] | 0;
                  break;
                }
              } else {
                k = j;
                b[k >> 2] = 0;
                b[k + 4 >> 2] = 0;
                b[j + 8 >> 2] = 4;
                b[j + 12 >> 2] = -1;
                k = j + 16 | 0;
                m = j + 29 | 0;
                b[k >> 2] = 0;
                b[k + 4 >> 2] = 0;
                b[k + 8 >> 2] = 0;
                a[k + 12 >> 0] = 0;
                a[m >> 0] = a[h >> 0] | 0;
                a[m + 1 >> 0] = a[h + 1 >> 0] | 0;
                a[m + 2 >> 0] = a[h + 2 >> 0] | 0;
              }
            } while (0);
            Uc(j);
            b[c2 >> 2] = b[j >> 2];
            b[c2 + 4 >> 2] = b[j + 4 >> 2];
            b[c2 + 8 >> 2] = b[j + 8 >> 2];
            b[c2 + 12 >> 2] = b[j + 12 >> 2];
            b[c2 + 16 >> 2] = b[j + 16 >> 2];
            b[c2 + 20 >> 2] = b[j + 20 >> 2];
            b[c2 + 24 >> 2] = b[j + 24 >> 2];
            b[c2 + 28 >> 2] = b[j + 28 >> 2];
            T = l;
            return;
          }
          __name(Tc, "Tc");
          function Uc(c2) {
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0;
            w2 = T;
            T = T + 336 | 0;
            p2 = w2 + 168 | 0;
            q2 = w2;
            f2 = c2;
            e2 = b[f2 >> 2] | 0;
            f2 = b[f2 + 4 >> 2] | 0;
            if ((e2 | 0) == 0 & (f2 | 0) == 0) {
              T = w2;
              return;
            }
            d2 = c2 + 28 | 0;
            if (!(a[d2 >> 0] | 0)) {
              a[d2 >> 0] = 1;
            } else {
              e2 = Vc(e2, f2) | 0;
              f2 = H() | 0;
            }
            v2 = c2 + 20 | 0;
            if (!(b[b[v2 >> 2] >> 2] | 0)) {
              d2 = c2 + 24 | 0;
              e2 = b[d2 >> 2] | 0;
              if (e2 | 0) {
                Hd(e2);
              }
              u2 = c2;
              b[u2 >> 2] = 0;
              b[u2 + 4 >> 2] = 0;
              b[c2 + 8 >> 2] = 0;
              b[v2 >> 2] = 0;
              b[c2 + 12 >> 2] = -1;
              b[c2 + 16 >> 2] = 0;
              b[d2 >> 2] = 0;
              T = w2;
              return;
            }
            u2 = c2 + 16 | 0;
            d2 = b[u2 >> 2] | 0;
            g2 = d2 & 15;
            a: do {
              if (!((e2 | 0) == 0 & (f2 | 0) == 0)) {
                r2 = c2 + 12 | 0;
                n = (g2 | 0) == 3;
                m = d2 & 255;
                k = (g2 | 1 | 0) == 3;
                o = c2 + 24 | 0;
                l = (g2 + -1 | 0) >>> 0 < 3;
                i = (g2 | 2 | 0) == 3;
                j = q2 + 8 | 0;
                b: while (1) {
                  h = Td(e2 | 0, f2 | 0, 52) | 0;
                  H() | 0;
                  h = h & 15;
                  if ((h | 0) == (b[r2 >> 2] | 0)) {
                    switch (m & 15) {
                      case 0:
                      case 2:
                      case 3: {
                        g2 = ac(e2, f2, p2) | 0;
                        if (g2 | 0) {
                          s2 = 15;
                          break b;
                        }
                        if (ad(b[v2 >> 2] | 0, b[o >> 2] | 0, p2) | 0) {
                          s2 = 19;
                          break b;
                        }
                        break;
                      }
                      default:
                    }
                    if (k ? (g2 = b[(b[v2 >> 2] | 0) + 4 >> 2] | 0, b[p2 >> 2] = b[g2 >> 2], b[p2 + 4 >> 2] = b[g2 + 4 >> 2], b[p2 + 8 >> 2] = b[g2 + 8 >> 2], b[p2 + 12 >> 2] = b[g2 + 12 >> 2], Ca(26832, p2) | 0) : 0) {
                      if (Zb(b[(b[v2 >> 2] | 0) + 4 >> 2] | 0, h, q2) | 0) {
                        s2 = 25;
                        break;
                      }
                      g2 = q2;
                      if ((b[g2 >> 2] | 0) == (e2 | 0) ? (b[g2 + 4 >> 2] | 0) == (f2 | 0) : 0) {
                        s2 = 29;
                        break;
                      }
                    }
                    if (l) {
                      g2 = bc(e2, f2, p2) | 0;
                      if (g2 | 0) {
                        s2 = 32;
                        break;
                      }
                      if (Sc(e2, f2, q2, 0) | 0) {
                        s2 = 36;
                        break;
                      }
                      if (i ? bd(b[v2 >> 2] | 0, b[o >> 2] | 0, p2, q2) | 0 : 0) {
                        s2 = 42;
                        break;
                      }
                      if (k ? dd(b[v2 >> 2] | 0, b[o >> 2] | 0, p2, q2) | 0 : 0) {
                        s2 = 42;
                        break;
                      }
                    }
                    if (n) {
                      d2 = Sc(e2, f2, p2, 1) | 0;
                      g2 = b[o >> 2] | 0;
                      if (d2 | 0) {
                        s2 = 45;
                        break;
                      }
                      if (Da(g2, p2) | 0) {
                        Ga(q2, p2);
                        if (Fa(p2, b[o >> 2] | 0) | 0) {
                          s2 = 53;
                          break;
                        }
                        if (ad(b[v2 >> 2] | 0, b[o >> 2] | 0, j) | 0) {
                          s2 = 53;
                          break;
                        }
                        if (dd(b[v2 >> 2] | 0, b[o >> 2] | 0, q2, p2) | 0) {
                          s2 = 53;
                          break;
                        }
                      }
                    }
                  }
                  do {
                    if ((h | 0) < (b[r2 >> 2] | 0)) {
                      d2 = Sc(e2, f2, p2, 1) | 0;
                      g2 = b[o >> 2] | 0;
                      if (d2 | 0) {
                        s2 = 58;
                        break b;
                      }
                      if (!(Da(g2, p2) | 0)) {
                        s2 = 73;
                        break;
                      }
                      if (Fa(b[o >> 2] | 0, p2) | 0 ? (Ga(q2, p2), bd(b[v2 >> 2] | 0, b[o >> 2] | 0, q2, p2) | 0) : 0) {
                        s2 = 65;
                        break b;
                      }
                      e2 = Nb(e2, f2, h + 1 | 0, q2) | 0;
                      if (e2 | 0) {
                        s2 = 67;
                        break b;
                      }
                      f2 = q2;
                      e2 = b[f2 >> 2] | 0;
                      f2 = b[f2 + 4 >> 2] | 0;
                    } else {
                      s2 = 73;
                    }
                  } while (0);
                  if ((s2 | 0) == 73) {
                    s2 = 0;
                    e2 = Vc(e2, f2) | 0;
                    f2 = H() | 0;
                  }
                  if ((e2 | 0) == 0 & (f2 | 0) == 0) {
                    t2 = o;
                    break a;
                  }
                }
                switch (s2 | 0) {
                  case 15: {
                    d2 = b[o >> 2] | 0;
                    if (d2 | 0) {
                      Hd(d2);
                    }
                    s2 = c2;
                    b[s2 >> 2] = 0;
                    b[s2 + 4 >> 2] = 0;
                    b[v2 >> 2] = 0;
                    b[r2 >> 2] = -1;
                    b[u2 >> 2] = 0;
                    b[o >> 2] = 0;
                    b[c2 + 8 >> 2] = g2;
                    s2 = 20;
                    break;
                  }
                  case 19: {
                    b[c2 >> 2] = e2;
                    b[c2 + 4 >> 2] = f2;
                    s2 = 20;
                    break;
                  }
                  case 25: {
                    I(27795, 27761, 470, 27772);
                    break;
                  }
                  case 29: {
                    b[c2 >> 2] = e2;
                    b[c2 + 4 >> 2] = f2;
                    T = w2;
                    return;
                  }
                  case 32: {
                    d2 = b[o >> 2] | 0;
                    if (d2 | 0) {
                      Hd(d2);
                    }
                    t2 = c2;
                    b[t2 >> 2] = 0;
                    b[t2 + 4 >> 2] = 0;
                    b[v2 >> 2] = 0;
                    b[r2 >> 2] = -1;
                    b[u2 >> 2] = 0;
                    b[o >> 2] = 0;
                    b[c2 + 8 >> 2] = g2;
                    T = w2;
                    return;
                  }
                  case 36: {
                    I(27795, 27761, 493, 27772);
                    break;
                  }
                  case 42: {
                    b[c2 >> 2] = e2;
                    b[c2 + 4 >> 2] = f2;
                    T = w2;
                    return;
                  }
                  case 45: {
                    if (g2 | 0) {
                      Hd(g2);
                    }
                    s2 = c2;
                    b[s2 >> 2] = 0;
                    b[s2 + 4 >> 2] = 0;
                    b[v2 >> 2] = 0;
                    b[r2 >> 2] = -1;
                    b[u2 >> 2] = 0;
                    b[o >> 2] = 0;
                    b[c2 + 8 >> 2] = d2;
                    s2 = 55;
                    break;
                  }
                  case 53: {
                    b[c2 >> 2] = e2;
                    b[c2 + 4 >> 2] = f2;
                    s2 = 55;
                    break;
                  }
                  case 58: {
                    if (g2 | 0) {
                      Hd(g2);
                    }
                    s2 = c2;
                    b[s2 >> 2] = 0;
                    b[s2 + 4 >> 2] = 0;
                    b[v2 >> 2] = 0;
                    b[r2 >> 2] = -1;
                    b[u2 >> 2] = 0;
                    b[o >> 2] = 0;
                    b[c2 + 8 >> 2] = d2;
                    s2 = 71;
                    break;
                  }
                  case 65: {
                    b[c2 >> 2] = e2;
                    b[c2 + 4 >> 2] = f2;
                    s2 = 71;
                    break;
                  }
                  case 67: {
                    d2 = b[o >> 2] | 0;
                    if (d2 | 0) {
                      Hd(d2);
                    }
                    t2 = c2;
                    b[t2 >> 2] = 0;
                    b[t2 + 4 >> 2] = 0;
                    b[v2 >> 2] = 0;
                    b[r2 >> 2] = -1;
                    b[u2 >> 2] = 0;
                    b[o >> 2] = 0;
                    b[c2 + 8 >> 2] = e2;
                    T = w2;
                    return;
                  }
                }
                if ((s2 | 0) == 20) {
                  T = w2;
                  return;
                } else if ((s2 | 0) == 55) {
                  T = w2;
                  return;
                } else if ((s2 | 0) == 71) {
                  T = w2;
                  return;
                }
              } else {
                t2 = c2 + 24 | 0;
              }
            } while (0);
            d2 = b[t2 >> 2] | 0;
            if (d2 | 0) {
              Hd(d2);
            }
            s2 = c2;
            b[s2 >> 2] = 0;
            b[s2 + 4 >> 2] = 0;
            b[c2 + 8 >> 2] = 0;
            b[v2 >> 2] = 0;
            b[c2 + 12 >> 2] = -1;
            b[u2 >> 2] = 0;
            b[t2 >> 2] = 0;
            T = w2;
            return;
          }
          __name(Uc, "Uc");
          function Vc(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
            m = T;
            T = T + 16 | 0;
            l = m;
            e2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            e2 = e2 & 15;
            d2 = Td(a2 | 0, c2 | 0, 45) | 0;
            H() | 0;
            do {
              if (e2) {
                while (1) {
                  d2 = Ud(e2 + 4095 | 0, 0, 52) | 0;
                  f2 = H() | 0 | c2 & -15728641;
                  g2 = (15 - e2 | 0) * 3 | 0;
                  h = Ud(7, 0, g2 | 0) | 0;
                  i = H() | 0;
                  d2 = d2 | a2 | h;
                  f2 = f2 | i;
                  j = Td(a2 | 0, c2 | 0, g2 | 0) | 0;
                  H() | 0;
                  j = j & 7;
                  e2 = e2 + -1 | 0;
                  if (j >>> 0 < 6) {
                    break;
                  }
                  if (!e2) {
                    k = 4;
                    break;
                  } else {
                    c2 = f2;
                    a2 = d2;
                  }
                }
                if ((k | 0) == 4) {
                  d2 = Td(d2 | 0, f2 | 0, 45) | 0;
                  H() | 0;
                  break;
                }
                l = (j | 0) == 0 & (Kb(d2, f2) | 0) != 0;
                l = Ud((l ? 2 : 1) + j | 0, 0, g2 | 0) | 0;
                k = H() | 0 | c2 & ~i;
                l = l | a2 & ~h;
                G(k | 0);
                T = m;
                return l | 0;
              }
            } while (0);
            d2 = d2 & 127;
            if (d2 >>> 0 > 120) {
              k = 0;
              l = 0;
              G(k | 0);
              T = m;
              return l | 0;
            }
            Hb(l, 0, d2 + 1 | 0, 0);
            k = b[l + 4 >> 2] | 0;
            l = b[l >> 2] | 0;
            G(k | 0);
            T = m;
            return l | 0;
          }
          __name(Vc, "Vc");
          function Wc(a2, c2, d2, e2, f2, g2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0;
            r2 = T;
            T = T + 160 | 0;
            m = r2 + 80 | 0;
            i = r2 + 64 | 0;
            n = r2 + 112 | 0;
            q2 = r2;
            Tc(m, a2, c2, d2);
            k = m;
            ic(i, b[k >> 2] | 0, b[k + 4 >> 2] | 0, c2);
            k = i;
            j = b[k >> 2] | 0;
            k = b[k + 4 >> 2] | 0;
            h = b[m + 8 >> 2] | 0;
            o = n + 4 | 0;
            b[o >> 2] = b[m >> 2];
            b[o + 4 >> 2] = b[m + 4 >> 2];
            b[o + 8 >> 2] = b[m + 8 >> 2];
            b[o + 12 >> 2] = b[m + 12 >> 2];
            b[o + 16 >> 2] = b[m + 16 >> 2];
            b[o + 20 >> 2] = b[m + 20 >> 2];
            b[o + 24 >> 2] = b[m + 24 >> 2];
            b[o + 28 >> 2] = b[m + 28 >> 2];
            o = q2;
            b[o >> 2] = j;
            b[o + 4 >> 2] = k;
            o = q2 + 8 | 0;
            b[o >> 2] = h;
            a2 = q2 + 12 | 0;
            c2 = n;
            d2 = a2 + 36 | 0;
            do {
              b[a2 >> 2] = b[c2 >> 2];
              a2 = a2 + 4 | 0;
              c2 = c2 + 4 | 0;
            } while ((a2 | 0) < (d2 | 0));
            n = q2 + 48 | 0;
            b[n >> 2] = b[i >> 2];
            b[n + 4 >> 2] = b[i + 4 >> 2];
            b[n + 8 >> 2] = b[i + 8 >> 2];
            b[n + 12 >> 2] = b[i + 12 >> 2];
            if ((j | 0) == 0 & (k | 0) == 0) {
              q2 = h;
              T = r2;
              return q2 | 0;
            }
            d2 = q2 + 16 | 0;
            l = q2 + 24 | 0;
            m = q2 + 28 | 0;
            h = 0;
            i = 0;
            c2 = j;
            a2 = k;
            do {
              if (!((h | 0) < (f2 | 0) | (h | 0) == (f2 | 0) & i >>> 0 < e2 >>> 0)) {
                p2 = 4;
                break;
              }
              k = i;
              i = Jd(i | 0, h | 0, 1, 0) | 0;
              h = H() | 0;
              k = g2 + (k << 3) | 0;
              b[k >> 2] = c2;
              b[k + 4 >> 2] = a2;
              kc(n);
              a2 = n;
              c2 = b[a2 >> 2] | 0;
              a2 = b[a2 + 4 >> 2] | 0;
              if ((c2 | 0) == 0 & (a2 | 0) == 0) {
                Uc(d2);
                c2 = d2;
                a2 = b[c2 >> 2] | 0;
                c2 = b[c2 + 4 >> 2] | 0;
                if ((a2 | 0) == 0 & (c2 | 0) == 0) {
                  p2 = 10;
                  break;
                }
                jc(a2, c2, b[m >> 2] | 0, n);
                a2 = n;
                c2 = b[a2 >> 2] | 0;
                a2 = b[a2 + 4 >> 2] | 0;
              }
              k = q2;
              b[k >> 2] = c2;
              b[k + 4 >> 2] = a2;
            } while (!((c2 | 0) == 0 & (a2 | 0) == 0));
            if ((p2 | 0) == 4) {
              a2 = q2 + 40 | 0;
              c2 = b[a2 >> 2] | 0;
              if (c2 | 0) {
                Hd(c2);
              }
              p2 = q2 + 16 | 0;
              b[p2 >> 2] = 0;
              b[p2 + 4 >> 2] = 0;
              b[l >> 2] = 0;
              b[q2 + 36 >> 2] = 0;
              b[m >> 2] = -1;
              b[q2 + 32 >> 2] = 0;
              b[a2 >> 2] = 0;
              jc(0, 0, 0, n);
              b[q2 >> 2] = 0;
              b[q2 + 4 >> 2] = 0;
              b[o >> 2] = 0;
              q2 = 14;
              T = r2;
              return q2 | 0;
            } else if ((p2 | 0) == 10) {
              b[q2 >> 2] = 0;
              b[q2 + 4 >> 2] = 0;
              b[o >> 2] = b[l >> 2];
            }
            q2 = b[o >> 2] | 0;
            T = r2;
            return q2 | 0;
          }
          __name(Wc, "Wc");
          function Xc(c2, d2, f2, g2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            g2 = g2 | 0;
            var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, r2 = 0;
            o = T;
            T = T + 48 | 0;
            l = o + 32 | 0;
            k = o + 40 | 0;
            m = o;
            if (!(b[c2 >> 2] | 0)) {
              n = g2;
              b[n >> 2] = 0;
              b[n + 4 >> 2] = 0;
              n = 0;
              T = o;
              return n | 0;
            }
            Hb(l, 0, 0, 0);
            j = l;
            h = b[j >> 2] | 0;
            j = b[j + 4 >> 2] | 0;
            do {
              if (d2 >>> 0 > 15) {
                n = m;
                b[n >> 2] = 0;
                b[n + 4 >> 2] = 0;
                b[m + 8 >> 2] = 4;
                b[m + 12 >> 2] = -1;
                n = m + 16 | 0;
                f2 = m + 29 | 0;
                b[n >> 2] = 0;
                b[n + 4 >> 2] = 0;
                b[n + 8 >> 2] = 0;
                a[n + 12 >> 0] = 0;
                a[f2 >> 0] = a[k >> 0] | 0;
                a[f2 + 1 >> 0] = a[k + 1 >> 0] | 0;
                a[f2 + 2 >> 0] = a[k + 2 >> 0] | 0;
                f2 = 4;
                n = 9;
              } else {
                f2 = _c(f2) | 0;
                if (f2 | 0) {
                  l = m;
                  b[l >> 2] = 0;
                  b[l + 4 >> 2] = 0;
                  b[m + 8 >> 2] = f2;
                  b[m + 12 >> 2] = -1;
                  l = m + 16 | 0;
                  n = m + 29 | 0;
                  b[l >> 2] = 0;
                  b[l + 4 >> 2] = 0;
                  b[l + 8 >> 2] = 0;
                  a[l + 12 >> 0] = 0;
                  a[n >> 0] = a[k >> 0] | 0;
                  a[n + 1 >> 0] = a[k + 1 >> 0] | 0;
                  a[n + 2 >> 0] = a[k + 2 >> 0] | 0;
                  n = 9;
                  break;
                }
                f2 = Id((b[c2 + 8 >> 2] | 0) + 1 | 0, 32) | 0;
                if (!f2) {
                  n = m;
                  b[n >> 2] = 0;
                  b[n + 4 >> 2] = 0;
                  b[m + 8 >> 2] = 13;
                  b[m + 12 >> 2] = -1;
                  n = m + 16 | 0;
                  f2 = m + 29 | 0;
                  b[n >> 2] = 0;
                  b[n + 4 >> 2] = 0;
                  b[n + 8 >> 2] = 0;
                  a[n + 12 >> 0] = 0;
                  a[f2 >> 0] = a[k >> 0] | 0;
                  a[f2 + 1 >> 0] = a[k + 1 >> 0] | 0;
                  a[f2 + 2 >> 0] = a[k + 2 >> 0] | 0;
                  f2 = 13;
                  n = 9;
                  break;
                }
                $c(c2, f2);
                r2 = m;
                b[r2 >> 2] = h;
                b[r2 + 4 >> 2] = j;
                j = m + 8 | 0;
                b[j >> 2] = 0;
                b[m + 12 >> 2] = d2;
                b[m + 20 >> 2] = c2;
                b[m + 24 >> 2] = f2;
                a[m + 28 >> 0] = 0;
                h = m + 29 | 0;
                a[h >> 0] = a[k >> 0] | 0;
                a[h + 1 >> 0] = a[k + 1 >> 0] | 0;
                a[h + 2 >> 0] = a[k + 2 >> 0] | 0;
                b[m + 16 >> 2] = 3;
                p2 = +Ba(f2);
                p2 = p2 * +za(f2);
                i = +q(+ +e[f2 >> 3]);
                i = p2 / +t(+ +Xd(+i, + +q(+ +e[f2 + 8 >> 3]))) * 6371.007180918475 * 6371.007180918475;
                h = m + 12 | 0;
                f2 = b[h >> 2] | 0;
                a: do {
                  if ((f2 | 0) > 0) {
                    do {
                      tc(f2 + -1 | 0, l) | 0;
                      if (!(i / +e[l >> 3] > 10)) {
                        break a;
                      }
                      r2 = b[h >> 2] | 0;
                      f2 = r2 + -1 | 0;
                      b[h >> 2] = f2;
                    } while ((r2 | 0) > 1);
                  }
                } while (0);
                Uc(m);
                h = g2;
                b[h >> 2] = 0;
                b[h + 4 >> 2] = 0;
                h = m;
                f2 = b[h >> 2] | 0;
                h = b[h + 4 >> 2] | 0;
                if (!((f2 | 0) == 0 & (h | 0) == 0)) {
                  do {
                    Jb(f2, h, d2, l) | 0;
                    k = l;
                    c2 = g2;
                    k = Jd(b[c2 >> 2] | 0, b[c2 + 4 >> 2] | 0, b[k >> 2] | 0, b[k + 4 >> 2] | 0) | 0;
                    c2 = H() | 0;
                    r2 = g2;
                    b[r2 >> 2] = k;
                    b[r2 + 4 >> 2] = c2;
                    Uc(m);
                    r2 = m;
                    f2 = b[r2 >> 2] | 0;
                    h = b[r2 + 4 >> 2] | 0;
                  } while (!((f2 | 0) == 0 & (h | 0) == 0));
                }
                f2 = b[j >> 2] | 0;
              }
            } while (0);
            r2 = f2;
            T = o;
            return r2 | 0;
          }
          __name(Xc, "Xc");
          function Yc(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0;
            if (!(Ca(c2, d2) | 0)) {
              o = 0;
              return o | 0;
            }
            c2 = Aa(c2) | 0;
            f2 = +e[d2 >> 3];
            g2 = +e[d2 + 8 >> 3];
            g2 = c2 & g2 < 0 ? g2 + 6.283185307179586 : g2;
            o = b[a2 >> 2] | 0;
            if ((o | 0) <= 0) {
              o = 0;
              return o | 0;
            }
            n = b[a2 + 4 >> 2] | 0;
            if (c2) {
              c2 = 0;
              m = g2;
              d2 = -1;
              a2 = 0;
              a: while (1) {
                l = a2;
                while (1) {
                  i = +e[n + (l << 4) >> 3];
                  g2 = +e[n + (l << 4) + 8 >> 3];
                  a2 = (d2 + 2 | 0) % (o | 0) | 0;
                  h = +e[n + (a2 << 4) >> 3];
                  j = +e[n + (a2 << 4) + 8 >> 3];
                  if (i > h) {
                    k = i;
                    i = j;
                  } else {
                    k = h;
                    h = i;
                    i = g2;
                    g2 = j;
                  }
                  f2 = f2 == h | f2 == k ? f2 + 2220446049250313e-31 : f2;
                  if (!(f2 < h | f2 > k)) {
                    break;
                  }
                  d2 = l + 1 | 0;
                  if ((d2 | 0) >= (o | 0)) {
                    d2 = 22;
                    break a;
                  } else {
                    a2 = l;
                    l = d2;
                    d2 = a2;
                  }
                }
                j = i < 0 ? i + 6.283185307179586 : i;
                i = g2 < 0 ? g2 + 6.283185307179586 : g2;
                m = j == m | i == m ? m + -2220446049250313e-31 : m;
                k = j + (i - j) * ((f2 - h) / (k - h));
                if ((k < 0 ? k + 6.283185307179586 : k) > m) {
                  c2 = c2 ^ 1;
                }
                a2 = l + 1 | 0;
                if ((a2 | 0) >= (o | 0)) {
                  d2 = 22;
                  break;
                } else {
                  d2 = l;
                }
              }
              if ((d2 | 0) == 22) {
                return c2 | 0;
              }
            } else {
              c2 = 0;
              m = g2;
              d2 = -1;
              a2 = 0;
              b: while (1) {
                l = a2;
                while (1) {
                  i = +e[n + (l << 4) >> 3];
                  g2 = +e[n + (l << 4) + 8 >> 3];
                  a2 = (d2 + 2 | 0) % (o | 0) | 0;
                  h = +e[n + (a2 << 4) >> 3];
                  j = +e[n + (a2 << 4) + 8 >> 3];
                  if (i > h) {
                    k = i;
                    i = j;
                  } else {
                    k = h;
                    h = i;
                    i = g2;
                    g2 = j;
                  }
                  f2 = f2 == h | f2 == k ? f2 + 2220446049250313e-31 : f2;
                  if (!(f2 < h | f2 > k)) {
                    break;
                  }
                  d2 = l + 1 | 0;
                  if ((d2 | 0) >= (o | 0)) {
                    d2 = 22;
                    break b;
                  } else {
                    a2 = l;
                    l = d2;
                    d2 = a2;
                  }
                }
                m = i == m | g2 == m ? m + -2220446049250313e-31 : m;
                if (i + (g2 - i) * ((f2 - h) / (k - h)) > m) {
                  c2 = c2 ^ 1;
                }
                a2 = l + 1 | 0;
                if ((a2 | 0) >= (o | 0)) {
                  d2 = 22;
                  break;
                } else {
                  d2 = l;
                }
              }
              if ((d2 | 0) == 22) {
                return c2 | 0;
              }
            }
            return 0;
          }
          __name(Yc, "Yc");
          function Zc(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0;
            r2 = b[a2 >> 2] | 0;
            if (!r2) {
              b[c2 >> 2] = 0;
              b[c2 + 4 >> 2] = 0;
              b[c2 + 8 >> 2] = 0;
              b[c2 + 12 >> 2] = 0;
              b[c2 + 16 >> 2] = 0;
              b[c2 + 20 >> 2] = 0;
              b[c2 + 24 >> 2] = 0;
              b[c2 + 28 >> 2] = 0;
              return;
            }
            s2 = c2 + 8 | 0;
            e[s2 >> 3] = 17976931348623157e292;
            t2 = c2 + 24 | 0;
            e[t2 >> 3] = 17976931348623157e292;
            e[c2 >> 3] = -17976931348623157e292;
            u2 = c2 + 16 | 0;
            e[u2 >> 3] = -17976931348623157e292;
            if ((r2 | 0) <= 0) {
              return;
            }
            o = b[a2 + 4 >> 2] | 0;
            l = 17976931348623157e292;
            m = -17976931348623157e292;
            n = 0;
            a2 = -1;
            h = 17976931348623157e292;
            i = 17976931348623157e292;
            k = -17976931348623157e292;
            f2 = -17976931348623157e292;
            p2 = 0;
            while (1) {
              d2 = +e[o + (p2 << 4) >> 3];
              j = +e[o + (p2 << 4) + 8 >> 3];
              a2 = a2 + 2 | 0;
              g2 = +e[o + (((a2 | 0) == (r2 | 0) ? 0 : a2) << 4) + 8 >> 3];
              if (d2 < h) {
                e[s2 >> 3] = d2;
                h = d2;
              }
              if (j < i) {
                e[t2 >> 3] = j;
                i = j;
              }
              if (d2 > k) {
                e[c2 >> 3] = d2;
              } else {
                d2 = k;
              }
              if (j > f2) {
                e[u2 >> 3] = j;
                f2 = j;
              }
              l = j > 0 & j < l ? j : l;
              m = j < 0 & j > m ? j : m;
              n = n | +q(+(j - g2)) > 3.141592653589793;
              a2 = p2 + 1 | 0;
              if ((a2 | 0) == (r2 | 0)) {
                break;
              } else {
                v2 = p2;
                k = d2;
                p2 = a2;
                a2 = v2;
              }
            }
            if (!n) {
              return;
            }
            e[u2 >> 3] = m;
            e[t2 >> 3] = l;
            return;
          }
          __name(Zc, "Zc");
          function _c(a2) {
            a2 = a2 | 0;
            return (a2 >>> 0 < 4 ? 0 : 15) | 0;
          }
          __name(_c, "_c");
          function $c(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0;
            r2 = b[a2 >> 2] | 0;
            if (r2) {
              s2 = c2 + 8 | 0;
              e[s2 >> 3] = 17976931348623157e292;
              t2 = c2 + 24 | 0;
              e[t2 >> 3] = 17976931348623157e292;
              e[c2 >> 3] = -17976931348623157e292;
              u2 = c2 + 16 | 0;
              e[u2 >> 3] = -17976931348623157e292;
              if ((r2 | 0) > 0) {
                g2 = b[a2 + 4 >> 2] | 0;
                o = 17976931348623157e292;
                p2 = -17976931348623157e292;
                f2 = 0;
                d2 = -1;
                k = 17976931348623157e292;
                l = 17976931348623157e292;
                n = -17976931348623157e292;
                i = -17976931348623157e292;
                v2 = 0;
                while (1) {
                  h = +e[g2 + (v2 << 4) >> 3];
                  m = +e[g2 + (v2 << 4) + 8 >> 3];
                  z2 = d2 + 2 | 0;
                  j = +e[g2 + (((z2 | 0) == (r2 | 0) ? 0 : z2) << 4) + 8 >> 3];
                  if (h < k) {
                    e[s2 >> 3] = h;
                    k = h;
                  }
                  if (m < l) {
                    e[t2 >> 3] = m;
                    l = m;
                  }
                  if (h > n) {
                    e[c2 >> 3] = h;
                  } else {
                    h = n;
                  }
                  if (m > i) {
                    e[u2 >> 3] = m;
                    i = m;
                  }
                  o = m > 0 & m < o ? m : o;
                  p2 = m < 0 & m > p2 ? m : p2;
                  f2 = f2 | +q(+(m - j)) > 3.141592653589793;
                  d2 = v2 + 1 | 0;
                  if ((d2 | 0) == (r2 | 0)) {
                    break;
                  } else {
                    z2 = v2;
                    n = h;
                    v2 = d2;
                    d2 = z2;
                  }
                }
                if (f2) {
                  e[u2 >> 3] = p2;
                  e[t2 >> 3] = o;
                }
              }
            } else {
              b[c2 >> 2] = 0;
              b[c2 + 4 >> 2] = 0;
              b[c2 + 8 >> 2] = 0;
              b[c2 + 12 >> 2] = 0;
              b[c2 + 16 >> 2] = 0;
              b[c2 + 20 >> 2] = 0;
              b[c2 + 24 >> 2] = 0;
              b[c2 + 28 >> 2] = 0;
            }
            z2 = a2 + 8 | 0;
            d2 = b[z2 >> 2] | 0;
            if ((d2 | 0) <= 0) {
              return;
            }
            y2 = a2 + 12 | 0;
            x2 = 0;
            do {
              g2 = b[y2 >> 2] | 0;
              f2 = x2;
              x2 = x2 + 1 | 0;
              t2 = c2 + (x2 << 5) | 0;
              u2 = b[g2 + (f2 << 3) >> 2] | 0;
              if (u2) {
                v2 = c2 + (x2 << 5) + 8 | 0;
                e[v2 >> 3] = 17976931348623157e292;
                a2 = c2 + (x2 << 5) + 24 | 0;
                e[a2 >> 3] = 17976931348623157e292;
                e[t2 >> 3] = -17976931348623157e292;
                w2 = c2 + (x2 << 5) + 16 | 0;
                e[w2 >> 3] = -17976931348623157e292;
                if ((u2 | 0) > 0) {
                  r2 = b[g2 + (f2 << 3) + 4 >> 2] | 0;
                  o = 17976931348623157e292;
                  p2 = -17976931348623157e292;
                  g2 = 0;
                  f2 = -1;
                  s2 = 0;
                  k = 17976931348623157e292;
                  l = 17976931348623157e292;
                  m = -17976931348623157e292;
                  i = -17976931348623157e292;
                  while (1) {
                    h = +e[r2 + (s2 << 4) >> 3];
                    n = +e[r2 + (s2 << 4) + 8 >> 3];
                    f2 = f2 + 2 | 0;
                    j = +e[r2 + (((f2 | 0) == (u2 | 0) ? 0 : f2) << 4) + 8 >> 3];
                    if (h < k) {
                      e[v2 >> 3] = h;
                      k = h;
                    }
                    if (n < l) {
                      e[a2 >> 3] = n;
                      l = n;
                    }
                    if (h > m) {
                      e[t2 >> 3] = h;
                    } else {
                      h = m;
                    }
                    if (n > i) {
                      e[w2 >> 3] = n;
                      i = n;
                    }
                    o = n > 0 & n < o ? n : o;
                    p2 = n < 0 & n > p2 ? n : p2;
                    g2 = g2 | +q(+(n - j)) > 3.141592653589793;
                    f2 = s2 + 1 | 0;
                    if ((f2 | 0) == (u2 | 0)) {
                      break;
                    } else {
                      A2 = s2;
                      s2 = f2;
                      m = h;
                      f2 = A2;
                    }
                  }
                  if (g2) {
                    e[w2 >> 3] = p2;
                    e[a2 >> 3] = o;
                  }
                }
              } else {
                b[t2 >> 2] = 0;
                b[t2 + 4 >> 2] = 0;
                b[t2 + 8 >> 2] = 0;
                b[t2 + 12 >> 2] = 0;
                b[t2 + 16 >> 2] = 0;
                b[t2 + 20 >> 2] = 0;
                b[t2 + 24 >> 2] = 0;
                b[t2 + 28 >> 2] = 0;
                d2 = b[z2 >> 2] | 0;
              }
            } while ((x2 | 0) < (d2 | 0));
            return;
          }
          __name($c, "$c");
          function ad(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            if (!(Yc(a2, c2, d2) | 0)) {
              f2 = 0;
              return f2 | 0;
            }
            f2 = a2 + 8 | 0;
            if ((b[f2 >> 2] | 0) <= 0) {
              f2 = 1;
              return f2 | 0;
            }
            e2 = a2 + 12 | 0;
            a2 = 0;
            while (1) {
              g2 = a2;
              a2 = a2 + 1 | 0;
              if (Yc((b[e2 >> 2] | 0) + (g2 << 3) | 0, c2 + (a2 << 5) | 0, d2) | 0) {
                a2 = 0;
                e2 = 6;
                break;
              }
              if ((a2 | 0) >= (b[f2 >> 2] | 0)) {
                a2 = 1;
                e2 = 6;
                break;
              }
            }
            if ((e2 | 0) == 6) {
              return a2 | 0;
            }
            return 0;
          }
          __name(ad, "ad");
          function bd(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            k = T;
            T = T + 16 | 0;
            i = k;
            h = d2 + 8 | 0;
            if (!(Yc(a2, c2, h) | 0)) {
              j = 0;
              T = k;
              return j | 0;
            }
            j = a2 + 8 | 0;
            a: do {
              if ((b[j >> 2] | 0) > 0) {
                g2 = a2 + 12 | 0;
                f2 = 0;
                while (1) {
                  l = f2;
                  f2 = f2 + 1 | 0;
                  if (Yc((b[g2 >> 2] | 0) + (l << 3) | 0, c2 + (f2 << 5) | 0, h) | 0) {
                    f2 = 0;
                    break;
                  }
                  if ((f2 | 0) >= (b[j >> 2] | 0)) {
                    break a;
                  }
                }
                T = k;
                return f2 | 0;
              }
            } while (0);
            if (cd(a2, c2, d2, e2) | 0) {
              l = 0;
              T = k;
              return l | 0;
            }
            b[i >> 2] = b[d2 >> 2];
            b[i + 4 >> 2] = h;
            f2 = b[j >> 2] | 0;
            b: do {
              if ((f2 | 0) > 0) {
                a2 = a2 + 12 | 0;
                h = 0;
                g2 = f2;
                while (1) {
                  f2 = b[a2 >> 2] | 0;
                  if ((b[f2 + (h << 3) >> 2] | 0) > 0) {
                    if (Yc(i, e2, b[f2 + (h << 3) + 4 >> 2] | 0) | 0) {
                      f2 = 0;
                      break b;
                    }
                    f2 = h + 1 | 0;
                    if (cd((b[a2 >> 2] | 0) + (h << 3) | 0, c2 + (f2 << 5) | 0, d2, e2) | 0) {
                      f2 = 0;
                      break b;
                    }
                    g2 = b[j >> 2] | 0;
                  } else {
                    f2 = h + 1 | 0;
                  }
                  if ((f2 | 0) < (g2 | 0)) {
                    h = f2;
                  } else {
                    f2 = 1;
                    break;
                  }
                }
              } else {
                f2 = 1;
              }
            } while (0);
            l = f2;
            T = k;
            return l | 0;
          }
          __name(bd, "bd");
          function cd(a2, c2, d2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0, x2 = 0, y2 = 0, z2 = 0, A2 = 0;
            y2 = T;
            T = T + 176 | 0;
            u2 = y2 + 172 | 0;
            g2 = y2 + 168 | 0;
            v2 = y2;
            if (!(Da(c2, f2) | 0)) {
              a2 = 0;
              T = y2;
              return a2 | 0;
            }
            Ea(c2, f2, u2, g2);
            Zd(v2 | 0, d2 | 0, 168) | 0;
            if ((b[d2 >> 2] | 0) > 0) {
              c2 = 0;
              do {
                z2 = v2 + 8 + (c2 << 4) + 8 | 0;
                t2 = +nc(+e[z2 >> 3], b[g2 >> 2] | 0);
                e[z2 >> 3] = t2;
                c2 = c2 + 1 | 0;
              } while ((c2 | 0) < (b[d2 >> 2] | 0));
            }
            r2 = +e[f2 >> 3];
            s2 = +e[f2 + 8 >> 3];
            t2 = +nc(+e[f2 + 16 >> 3], b[g2 >> 2] | 0);
            p2 = +nc(+e[f2 + 24 >> 3], b[g2 >> 2] | 0);
            a: do {
              if ((b[a2 >> 2] | 0) > 0) {
                f2 = a2 + 4 | 0;
                g2 = b[v2 >> 2] | 0;
                if ((g2 | 0) <= 0) {
                  c2 = 0;
                  while (1) {
                    c2 = c2 + 1 | 0;
                    if ((c2 | 0) >= (b[a2 >> 2] | 0)) {
                      c2 = 0;
                      break a;
                    }
                  }
                }
                d2 = 0;
                while (1) {
                  c2 = b[f2 >> 2] | 0;
                  o = +e[c2 + (d2 << 4) >> 3];
                  q2 = +nc(+e[c2 + (d2 << 4) + 8 >> 3], b[u2 >> 2] | 0);
                  c2 = b[f2 >> 2] | 0;
                  d2 = d2 + 1 | 0;
                  z2 = (d2 | 0) % (b[a2 >> 2] | 0) | 0;
                  h = +e[c2 + (z2 << 4) >> 3];
                  i = +nc(+e[c2 + (z2 << 4) + 8 >> 3], b[u2 >> 2] | 0);
                  if (((!(o >= r2) | !(h >= r2) ? !(o <= s2) | !(h <= s2) : 0) ? !(q2 <= p2) | !(i <= p2) : 0) ? !(q2 >= t2) | !(i >= t2) : 0) {
                    n = h - o;
                    l = i - q2;
                    c2 = 0;
                    do {
                      A2 = c2;
                      c2 = c2 + 1 | 0;
                      z2 = (c2 | 0) == (g2 | 0) ? 0 : c2;
                      h = +e[v2 + 8 + (A2 << 4) + 8 >> 3];
                      i = +e[v2 + 8 + (z2 << 4) + 8 >> 3] - h;
                      j = +e[v2 + 8 + (A2 << 4) >> 3];
                      k = +e[v2 + 8 + (z2 << 4) >> 3] - j;
                      m = n * i - l * k;
                      if ((m != 0 ? (w2 = q2 - h, x2 = o - j, k = (w2 * k - i * x2) / m, !(k < 0 | k > 1)) : 0) ? (m = (n * w2 - l * x2) / m, m >= 0 & m <= 1) : 0) {
                        c2 = 1;
                        break a;
                      }
                    } while ((c2 | 0) < (g2 | 0));
                  }
                  if ((d2 | 0) >= (b[a2 >> 2] | 0)) {
                    c2 = 0;
                    break;
                  }
                }
              } else {
                c2 = 0;
              }
            } while (0);
            A2 = c2;
            T = y2;
            return A2 | 0;
          }
          __name(cd, "cd");
          function dd(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0;
            if (cd(a2, c2, d2, e2) | 0) {
              g2 = 1;
              return g2 | 0;
            }
            g2 = a2 + 8 | 0;
            if ((b[g2 >> 2] | 0) <= 0) {
              g2 = 0;
              return g2 | 0;
            }
            f2 = a2 + 12 | 0;
            a2 = 0;
            while (1) {
              h = a2;
              a2 = a2 + 1 | 0;
              if (cd((b[f2 >> 2] | 0) + (h << 3) | 0, c2 + (a2 << 5) | 0, d2, e2) | 0) {
                a2 = 1;
                f2 = 6;
                break;
              }
              if ((a2 | 0) >= (b[g2 >> 2] | 0)) {
                a2 = 0;
                f2 = 6;
                break;
              }
            }
            if ((f2 | 0) == 6) {
              return a2 | 0;
            }
            return 0;
          }
          __name(dd, "dd");
          function ed() {
            return 8;
          }
          __name(ed, "ed");
          function fd() {
            return 16;
          }
          __name(fd, "fd");
          function gd() {
            return 168;
          }
          __name(gd, "gd");
          function hd() {
            return 8;
          }
          __name(hd, "hd");
          function id() {
            return 16;
          }
          __name(id, "id");
          function jd() {
            return 12;
          }
          __name(jd, "jd");
          function kd() {
            return 8;
          }
          __name(kd, "kd");
          function ld(a2) {
            a2 = a2 | 0;
            return +(+((b[a2 >> 2] | 0) >>> 0) + 4294967296 * +(b[a2 + 4 >> 2] | 0));
          }
          __name(ld, "ld");
          function md(a2) {
            a2 = a2 | 0;
            var b2 = 0, c2 = 0;
            c2 = +e[a2 >> 3];
            b2 = +e[a2 + 8 >> 3];
            return + +r(+(c2 * c2 + b2 * b2));
          }
          __name(md, "md");
          function nd(a2, b2, c2, d2, f2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0;
            k = +e[a2 >> 3];
            j = +e[b2 >> 3] - k;
            i = +e[a2 + 8 >> 3];
            h = +e[b2 + 8 >> 3] - i;
            m = +e[c2 >> 3];
            g2 = +e[d2 >> 3] - m;
            n = +e[c2 + 8 >> 3];
            l = +e[d2 + 8 >> 3] - n;
            g2 = (g2 * (i - n) - (k - m) * l) / (j * l - h * g2);
            e[f2 >> 3] = k + j * g2;
            e[f2 + 8 >> 3] = i + h * g2;
            return;
          }
          __name(nd, "nd");
          function od(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            if (!(+q(+(+e[a2 >> 3] - +e[b2 >> 3])) < 11920928955078125e-23)) {
              b2 = 0;
              return b2 | 0;
            }
            b2 = +q(+(+e[a2 + 8 >> 3] - +e[b2 + 8 >> 3])) < 11920928955078125e-23;
            return b2 | 0;
          }
          __name(od, "od");
          function pd(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0;
            f2 = +e[a2 >> 3] - +e[b2 >> 3];
            d2 = +e[a2 + 8 >> 3] - +e[b2 + 8 >> 3];
            c2 = +e[a2 + 16 >> 3] - +e[b2 + 16 >> 3];
            return +(f2 * f2 + d2 * d2 + c2 * c2);
          }
          __name(pd, "pd");
          function qd(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, f2 = 0;
            c2 = +e[a2 >> 3];
            d2 = +t(+c2);
            c2 = +u(+c2);
            e[b2 + 16 >> 3] = c2;
            c2 = +e[a2 + 8 >> 3];
            f2 = d2 * +t(+c2);
            e[b2 >> 3] = f2;
            c2 = d2 * +u(+c2);
            e[b2 + 8 >> 3] = c2;
            return;
          }
          __name(qd, "qd");
          function rd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            g2 = T;
            T = T + 16 | 0;
            f2 = g2;
            e2 = Kb(a2, c2) | 0;
            if ((d2 + -1 | 0) >>> 0 > 5) {
              f2 = -1;
              T = g2;
              return f2 | 0;
            }
            e2 = (e2 | 0) != 0;
            if ((d2 | 0) == 1 & e2) {
              f2 = -1;
              T = g2;
              return f2 | 0;
            }
            do {
              if (!(sd(a2, c2, f2) | 0)) {
                if (e2) {
                  e2 = ((b[26352 + (d2 << 2) >> 2] | 0) + 5 - (b[f2 >> 2] | 0) | 0) % 5 | 0;
                  break;
                } else {
                  e2 = ((b[26384 + (d2 << 2) >> 2] | 0) + 6 - (b[f2 >> 2] | 0) | 0) % 6 | 0;
                  break;
                }
              } else {
                e2 = -1;
              }
            } while (0);
            f2 = e2;
            T = g2;
            return f2 | 0;
          }
          __name(rd, "rd");
          function sd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
            l = T;
            T = T + 32 | 0;
            i = l + 16 | 0;
            j = l;
            e2 = $b(a2, c2, i) | 0;
            if (e2 | 0) {
              d2 = e2;
              T = l;
              return d2 | 0;
            }
            g2 = Cb(a2, c2) | 0;
            k = Sb(a2, c2) | 0;
            sa(g2, j);
            e2 = ta(g2, b[i >> 2] | 0) | 0;
            do {
              if (oa(g2) | 0) {
                do {
                  switch (g2 | 0) {
                    case 4: {
                      f2 = 0;
                      break;
                    }
                    case 14: {
                      f2 = 1;
                      break;
                    }
                    case 24: {
                      f2 = 2;
                      break;
                    }
                    case 38: {
                      f2 = 3;
                      break;
                    }
                    case 49: {
                      f2 = 4;
                      break;
                    }
                    case 58: {
                      f2 = 5;
                      break;
                    }
                    case 63: {
                      f2 = 6;
                      break;
                    }
                    case 72: {
                      f2 = 7;
                      break;
                    }
                    case 83: {
                      f2 = 8;
                      break;
                    }
                    case 97: {
                      f2 = 9;
                      break;
                    }
                    case 107: {
                      f2 = 10;
                      break;
                    }
                    case 117: {
                      f2 = 11;
                      break;
                    }
                    default:
                      I(27795, 27797, 75, 27806);
                  }
                } while (0);
                h = b[26416 + (f2 * 24 | 0) + 8 >> 2] | 0;
                c2 = b[26416 + (f2 * 24 | 0) + 16 >> 2] | 0;
                a2 = b[i >> 2] | 0;
                if ((a2 | 0) != (b[j >> 2] | 0)) {
                  j = pa(g2) | 0;
                  a2 = b[i >> 2] | 0;
                  if (j | (a2 | 0) == (c2 | 0)) {
                    e2 = (e2 + 1 | 0) % 6 | 0;
                  }
                }
                if ((k | 0) == 3 & (a2 | 0) == (c2 | 0)) {
                  e2 = (e2 + 5 | 0) % 6 | 0;
                  break;
                }
                if ((k | 0) == 5 & (a2 | 0) == (h | 0)) {
                  e2 = (e2 + 1 | 0) % 6 | 0;
                }
              }
            } while (0);
            b[d2 >> 2] = e2;
            d2 = 0;
            T = l;
            return d2 | 0;
          }
          __name(sd, "sd");
          function td(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0;
            u2 = T;
            T = T + 32 | 0;
            t2 = u2 + 24 | 0;
            r2 = u2 + 20 | 0;
            p2 = u2 + 8 | 0;
            o = u2 + 16 | 0;
            n = u2;
            j = (Kb(a2, c2) | 0) == 0;
            j = j ? 6 : 5;
            l = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            l = l & 15;
            if (j >>> 0 <= d2 >>> 0) {
              e2 = 2;
              T = u2;
              return e2 | 0;
            }
            m = (l | 0) == 0;
            if (!m ? (q2 = Ud(7, 0, (l ^ 15) * 3 | 0) | 0, (q2 & a2 | 0) == 0 & ((H() | 0) & c2 | 0) == 0) : 0) {
              f2 = d2;
            } else {
              g2 = 4;
            }
            a: do {
              if ((g2 | 0) == 4) {
                f2 = (Kb(a2, c2) | 0) != 0;
                if (((f2 ? 4 : 5) | 0) < (d2 | 0)) {
                  e2 = 1;
                  T = u2;
                  return e2 | 0;
                }
                if (sd(a2, c2, t2) | 0) {
                  e2 = 1;
                  T = u2;
                  return e2 | 0;
                }
                g2 = (b[t2 >> 2] | 0) + d2 | 0;
                if (f2) {
                  f2 = 26704 + (((g2 | 0) % 5 | 0) << 2) | 0;
                } else {
                  f2 = 26736 + (((g2 | 0) % 6 | 0) << 2) | 0;
                }
                q2 = b[f2 >> 2] | 0;
                if ((q2 | 0) == 7) {
                  e2 = 1;
                  T = u2;
                  return e2 | 0;
                }
                b[r2 >> 2] = 0;
                f2 = ea(a2, c2, q2, r2, p2) | 0;
                do {
                  if (!f2) {
                    i = p2;
                    k = b[i >> 2] | 0;
                    i = b[i + 4 >> 2] | 0;
                    h = i >>> 0 < c2 >>> 0 | (i | 0) == (c2 | 0) & k >>> 0 < a2 >>> 0;
                    g2 = h ? k : a2;
                    h = h ? i : c2;
                    if (!m ? (m = Ud(7, 0, (l ^ 15) * 3 | 0) | 0, (k & m | 0) == 0 & (i & (H() | 0) | 0) == 0) : 0) {
                      f2 = d2;
                    } else {
                      i = (d2 + -1 + j | 0) % (j | 0) | 0;
                      f2 = Kb(a2, c2) | 0;
                      if ((i | 0) < 0) {
                        I(27795, 27797, 248, 27822);
                      }
                      j = (f2 | 0) != 0;
                      if (((j ? 4 : 5) | 0) < (i | 0)) {
                        I(27795, 27797, 248, 27822);
                      }
                      if (sd(a2, c2, t2) | 0) {
                        I(27795, 27797, 248, 27822);
                      }
                      f2 = (b[t2 >> 2] | 0) + i | 0;
                      if (j) {
                        f2 = 26704 + (((f2 | 0) % 5 | 0) << 2) | 0;
                      } else {
                        f2 = 26736 + (((f2 | 0) % 6 | 0) << 2) | 0;
                      }
                      i = b[f2 >> 2] | 0;
                      if ((i | 0) == 7) {
                        I(27795, 27797, 248, 27822);
                      }
                      b[o >> 2] = 0;
                      f2 = ea(a2, c2, i, o, n) | 0;
                      if (f2 | 0) {
                        break;
                      }
                      k = n;
                      j = b[k >> 2] | 0;
                      k = b[k + 4 >> 2] | 0;
                      do {
                        if (k >>> 0 < h >>> 0 | (k | 0) == (h | 0) & j >>> 0 < g2 >>> 0) {
                          if (!(Kb(j, k) | 0)) {
                            g2 = b[26800 + ((((b[o >> 2] | 0) + (b[26768 + (i << 2) >> 2] | 0) | 0) % 6 | 0) << 2) >> 2] | 0;
                          } else {
                            g2 = ia(j, k, a2, c2) | 0;
                          }
                          f2 = Kb(j, k) | 0;
                          if ((g2 + -1 | 0) >>> 0 > 5) {
                            f2 = -1;
                            g2 = j;
                            h = k;
                            break;
                          }
                          f2 = (f2 | 0) != 0;
                          if ((g2 | 0) == 1 & f2) {
                            f2 = -1;
                            g2 = j;
                            h = k;
                            break;
                          }
                          do {
                            if (!(sd(j, k, t2) | 0)) {
                              if (f2) {
                                f2 = ((b[26352 + (g2 << 2) >> 2] | 0) + 5 - (b[t2 >> 2] | 0) | 0) % 5 | 0;
                                break;
                              } else {
                                f2 = ((b[26384 + (g2 << 2) >> 2] | 0) + 6 - (b[t2 >> 2] | 0) | 0) % 6 | 0;
                                break;
                              }
                            } else {
                              f2 = -1;
                            }
                          } while (0);
                          g2 = j;
                          h = k;
                        } else {
                          f2 = d2;
                        }
                      } while (0);
                      i = p2;
                      k = b[i >> 2] | 0;
                      i = b[i + 4 >> 2] | 0;
                    }
                    if ((g2 | 0) == (k | 0) & (h | 0) == (i | 0)) {
                      j = (Kb(k, i) | 0) != 0;
                      if (j) {
                        a2 = ia(k, i, a2, c2) | 0;
                      } else {
                        a2 = b[26800 + ((((b[r2 >> 2] | 0) + (b[26768 + (q2 << 2) >> 2] | 0) | 0) % 6 | 0) << 2) >> 2] | 0;
                      }
                      f2 = Kb(k, i) | 0;
                      if ((a2 + -1 | 0) >>> 0 <= 5 ? (s2 = (f2 | 0) != 0, !((a2 | 0) == 1 & s2)) : 0) {
                        do {
                          if (!(sd(k, i, t2) | 0)) {
                            if (s2) {
                              f2 = ((b[26352 + (a2 << 2) >> 2] | 0) + 5 - (b[t2 >> 2] | 0) | 0) % 5 | 0;
                              break;
                            } else {
                              f2 = ((b[26384 + (a2 << 2) >> 2] | 0) + 6 - (b[t2 >> 2] | 0) | 0) % 6 | 0;
                              break;
                            }
                          } else {
                            f2 = -1;
                          }
                        } while (0);
                      } else {
                        f2 = -1;
                      }
                      f2 = f2 + 1 | 0;
                      f2 = (f2 | 0) == 6 | j & (f2 | 0) == 5 ? 0 : f2;
                    }
                    c2 = h;
                    a2 = g2;
                    break a;
                  }
                } while (0);
                e2 = f2;
                T = u2;
                return e2 | 0;
              }
            } while (0);
            s2 = Ud(f2 | 0, 0, 56) | 0;
            t2 = H() | 0 | c2 & -2130706433 | 536870912;
            b[e2 >> 2] = s2 | a2;
            b[e2 + 4 >> 2] = t2;
            e2 = 0;
            T = u2;
            return e2 | 0;
          }
          __name(td, "td");
          function ud(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0;
            g2 = (Kb(a2, c2) | 0) == 0;
            e2 = td(a2, c2, 0, d2) | 0;
            f2 = (e2 | 0) == 0;
            if (g2) {
              if (!f2) {
                g2 = e2;
                return g2 | 0;
              }
              e2 = td(a2, c2, 1, d2 + 8 | 0) | 0;
              if (e2 | 0) {
                g2 = e2;
                return g2 | 0;
              }
              e2 = td(a2, c2, 2, d2 + 16 | 0) | 0;
              if (e2 | 0) {
                g2 = e2;
                return g2 | 0;
              }
              e2 = td(a2, c2, 3, d2 + 24 | 0) | 0;
              if (e2 | 0) {
                g2 = e2;
                return g2 | 0;
              }
              e2 = td(a2, c2, 4, d2 + 32 | 0) | 0;
              if (!e2) {
                return td(a2, c2, 5, d2 + 40 | 0) | 0;
              } else {
                g2 = e2;
                return g2 | 0;
              }
            }
            if (!f2) {
              g2 = e2;
              return g2 | 0;
            }
            e2 = td(a2, c2, 1, d2 + 8 | 0) | 0;
            if (e2 | 0) {
              g2 = e2;
              return g2 | 0;
            }
            e2 = td(a2, c2, 2, d2 + 16 | 0) | 0;
            if (e2 | 0) {
              g2 = e2;
              return g2 | 0;
            }
            e2 = td(a2, c2, 3, d2 + 24 | 0) | 0;
            if (e2 | 0) {
              g2 = e2;
              return g2 | 0;
            }
            e2 = td(a2, c2, 4, d2 + 32 | 0) | 0;
            if (e2 | 0) {
              g2 = e2;
              return g2 | 0;
            }
            g2 = d2 + 40 | 0;
            b[g2 >> 2] = 0;
            b[g2 + 4 >> 2] = 0;
            g2 = 0;
            return g2 | 0;
          }
          __name(ud, "ud");
          function vd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            j = T;
            T = T + 192 | 0;
            f2 = j;
            g2 = j + 168 | 0;
            h = Td(a2 | 0, c2 | 0, 56) | 0;
            H() | 0;
            h = h & 7;
            i = c2 & -2130706433 | 134217728;
            e2 = $b(a2, i, g2) | 0;
            if (e2 | 0) {
              i = e2;
              T = j;
              return i | 0;
            }
            c2 = Td(a2 | 0, c2 | 0, 52) | 0;
            H() | 0;
            c2 = c2 & 15;
            if (!(Kb(a2, i) | 0)) {
              zb(g2, c2, h, 1, f2);
            } else {
              vb(g2, c2, h, 1, f2);
            }
            i = f2 + 8 | 0;
            b[d2 >> 2] = b[i >> 2];
            b[d2 + 4 >> 2] = b[i + 4 >> 2];
            b[d2 + 8 >> 2] = b[i + 8 >> 2];
            b[d2 + 12 >> 2] = b[i + 12 >> 2];
            i = 0;
            T = j;
            return i | 0;
          }
          __name(vd, "vd");
          function wd(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, e2 = 0, f2 = 0, g2 = 0;
            f2 = T;
            T = T + 16 | 0;
            d2 = f2;
            if (!(true & (c2 & 2013265920 | 0) == 536870912)) {
              e2 = 0;
              T = f2;
              return e2 | 0;
            }
            e2 = c2 & -2130706433 | 134217728;
            if (!(Fb(a2, e2) | 0)) {
              e2 = 0;
              T = f2;
              return e2 | 0;
            }
            g2 = Td(a2 | 0, c2 | 0, 56) | 0;
            H() | 0;
            g2 = (td(a2, e2, g2 & 7, d2) | 0) == 0;
            e2 = d2;
            e2 = g2 & ((b[e2 >> 2] | 0) == (a2 | 0) ? (b[e2 + 4 >> 2] | 0) == (c2 | 0) : 0) & 1;
            T = f2;
            return e2 | 0;
          }
          __name(wd, "wd");
          function xd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0;
            if ((c2 | 0) > 0) {
              e2 = Id(c2, 4) | 0;
              b[a2 >> 2] = e2;
              if (!e2) {
                I(27835, 27858, 40, 27872);
              }
            } else {
              b[a2 >> 2] = 0;
            }
            b[a2 + 4 >> 2] = c2;
            b[a2 + 8 >> 2] = 0;
            b[a2 + 12 >> 2] = d2;
            return;
          }
          __name(xd, "xd");
          function yd(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            g2 = a2 + 4 | 0;
            h = a2 + 12 | 0;
            i = a2 + 8 | 0;
            a: while (1) {
              d2 = b[g2 >> 2] | 0;
              c2 = 0;
              while (1) {
                if ((c2 | 0) >= (d2 | 0)) {
                  break a;
                }
                f2 = b[a2 >> 2] | 0;
                j = b[f2 + (c2 << 2) >> 2] | 0;
                if (!j) {
                  c2 = c2 + 1 | 0;
                } else {
                  break;
                }
              }
              c2 = f2 + (~~(+q(+(+s(10, + +(15 - (b[h >> 2] | 0) | 0)) * (+e[j >> 3] + +e[j + 8 >> 3]))) % +(d2 | 0)) >>> 0 << 2) | 0;
              d2 = b[c2 >> 2] | 0;
              b: do {
                if (d2 | 0) {
                  f2 = j + 32 | 0;
                  if ((d2 | 0) == (j | 0)) {
                    b[c2 >> 2] = b[f2 >> 2];
                  } else {
                    d2 = d2 + 32 | 0;
                    c2 = b[d2 >> 2] | 0;
                    if (!c2) {
                      break;
                    }
                    while (1) {
                      if ((c2 | 0) == (j | 0)) {
                        break;
                      }
                      d2 = c2 + 32 | 0;
                      c2 = b[d2 >> 2] | 0;
                      if (!c2) {
                        break b;
                      }
                    }
                    b[d2 >> 2] = b[f2 >> 2];
                  }
                  Hd(j);
                  b[i >> 2] = (b[i >> 2] | 0) + -1;
                }
              } while (0);
            }
            Hd(b[a2 >> 2] | 0);
            return;
          }
          __name(yd, "yd");
          function zd(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            e2 = b[a2 + 4 >> 2] | 0;
            d2 = 0;
            while (1) {
              if ((d2 | 0) >= (e2 | 0)) {
                c2 = 0;
                d2 = 4;
                break;
              }
              c2 = b[(b[a2 >> 2] | 0) + (d2 << 2) >> 2] | 0;
              if (!c2) {
                d2 = d2 + 1 | 0;
              } else {
                d2 = 4;
                break;
              }
            }
            if ((d2 | 0) == 4) {
              return c2 | 0;
            }
            return 0;
          }
          __name(zd, "zd");
          function Ad(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0, f2 = 0, g2 = 0, h = 0;
            d2 = ~~(+q(+(+s(10, + +(15 - (b[a2 + 12 >> 2] | 0) | 0)) * (+e[c2 >> 3] + +e[c2 + 8 >> 3]))) % +(b[a2 + 4 >> 2] | 0)) >>> 0;
            d2 = (b[a2 >> 2] | 0) + (d2 << 2) | 0;
            f2 = b[d2 >> 2] | 0;
            if (!f2) {
              h = 1;
              return h | 0;
            }
            h = c2 + 32 | 0;
            do {
              if ((f2 | 0) != (c2 | 0)) {
                d2 = b[f2 + 32 >> 2] | 0;
                if (!d2) {
                  h = 1;
                  return h | 0;
                }
                g2 = d2;
                while (1) {
                  if ((g2 | 0) == (c2 | 0)) {
                    g2 = 8;
                    break;
                  }
                  d2 = b[g2 + 32 >> 2] | 0;
                  if (!d2) {
                    d2 = 1;
                    g2 = 10;
                    break;
                  } else {
                    f2 = g2;
                    g2 = d2;
                  }
                }
                if ((g2 | 0) == 8) {
                  b[f2 + 32 >> 2] = b[h >> 2];
                  break;
                } else if ((g2 | 0) == 10) {
                  return d2 | 0;
                }
              } else {
                b[d2 >> 2] = b[h >> 2];
              }
            } while (0);
            Hd(c2);
            h = a2 + 8 | 0;
            b[h >> 2] = (b[h >> 2] | 0) + -1;
            h = 0;
            return h | 0;
          }
          __name(Ad, "Ad");
          function Bd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0;
            h = Gd(40) | 0;
            if (!h) {
              I(27888, 27858, 98, 27901);
            }
            b[h >> 2] = b[c2 >> 2];
            b[h + 4 >> 2] = b[c2 + 4 >> 2];
            b[h + 8 >> 2] = b[c2 + 8 >> 2];
            b[h + 12 >> 2] = b[c2 + 12 >> 2];
            g2 = h + 16 | 0;
            b[g2 >> 2] = b[d2 >> 2];
            b[g2 + 4 >> 2] = b[d2 + 4 >> 2];
            b[g2 + 8 >> 2] = b[d2 + 8 >> 2];
            b[g2 + 12 >> 2] = b[d2 + 12 >> 2];
            b[h + 32 >> 2] = 0;
            g2 = ~~(+q(+(+s(10, + +(15 - (b[a2 + 12 >> 2] | 0) | 0)) * (+e[c2 >> 3] + +e[c2 + 8 >> 3]))) % +(b[a2 + 4 >> 2] | 0)) >>> 0;
            g2 = (b[a2 >> 2] | 0) + (g2 << 2) | 0;
            f2 = b[g2 >> 2] | 0;
            do {
              if (!f2) {
                b[g2 >> 2] = h;
              } else {
                while (1) {
                  if (mc(f2, c2) | 0 ? mc(f2 + 16 | 0, d2) | 0 : 0) {
                    break;
                  }
                  g2 = b[f2 + 32 >> 2] | 0;
                  f2 = (g2 | 0) == 0 ? f2 : g2;
                  if (!(b[f2 + 32 >> 2] | 0)) {
                    i = 10;
                    break;
                  }
                }
                if ((i | 0) == 10) {
                  b[f2 + 32 >> 2] = h;
                  break;
                }
                Hd(h);
                i = f2;
                return i | 0;
              }
            } while (0);
            i = a2 + 8 | 0;
            b[i >> 2] = (b[i >> 2] | 0) + 1;
            i = h;
            return i | 0;
          }
          __name(Bd, "Bd");
          function Cd(a2, c2, d2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var f2 = 0, g2 = 0;
            g2 = ~~(+q(+(+s(10, + +(15 - (b[a2 + 12 >> 2] | 0) | 0)) * (+e[c2 >> 3] + +e[c2 + 8 >> 3]))) % +(b[a2 + 4 >> 2] | 0)) >>> 0;
            g2 = b[(b[a2 >> 2] | 0) + (g2 << 2) >> 2] | 0;
            if (!g2) {
              d2 = 0;
              return d2 | 0;
            }
            if (!d2) {
              a2 = g2;
              while (1) {
                if (mc(a2, c2) | 0) {
                  f2 = 10;
                  break;
                }
                a2 = b[a2 + 32 >> 2] | 0;
                if (!a2) {
                  a2 = 0;
                  f2 = 10;
                  break;
                }
              }
              if ((f2 | 0) == 10) {
                return a2 | 0;
              }
            }
            a2 = g2;
            while (1) {
              if (mc(a2, c2) | 0 ? mc(a2 + 16 | 0, d2) | 0 : 0) {
                f2 = 10;
                break;
              }
              a2 = b[a2 + 32 >> 2] | 0;
              if (!a2) {
                a2 = 0;
                f2 = 10;
                break;
              }
            }
            if ((f2 | 0) == 10) {
              return a2 | 0;
            }
            return 0;
          }
          __name(Cd, "Cd");
          function Dd(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0;
            d2 = ~~(+q(+(+s(10, + +(15 - (b[a2 + 12 >> 2] | 0) | 0)) * (+e[c2 >> 3] + +e[c2 + 8 >> 3]))) % +(b[a2 + 4 >> 2] | 0)) >>> 0;
            a2 = b[(b[a2 >> 2] | 0) + (d2 << 2) >> 2] | 0;
            if (!a2) {
              d2 = 0;
              return d2 | 0;
            }
            while (1) {
              if (mc(a2, c2) | 0) {
                c2 = 5;
                break;
              }
              a2 = b[a2 + 32 >> 2] | 0;
              if (!a2) {
                a2 = 0;
                c2 = 5;
                break;
              }
            }
            if ((c2 | 0) == 5) {
              return a2 | 0;
            }
            return 0;
          }
          __name(Dd, "Dd");
          function Ed() {
            return 27920;
          }
          __name(Ed, "Ed");
          function Fd(a2) {
            a2 = +a2;
            return ~~+$d(+a2) | 0;
          }
          __name(Fd, "Fd");
          function Gd(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0, q2 = 0, r2 = 0, s2 = 0, t2 = 0, u2 = 0, v2 = 0, w2 = 0;
            w2 = T;
            T = T + 16 | 0;
            n = w2;
            do {
              if (a2 >>> 0 < 245) {
                k = a2 >>> 0 < 11 ? 16 : a2 + 11 & -8;
                a2 = k >>> 3;
                m = b[6981] | 0;
                d2 = m >>> a2;
                if (d2 & 3 | 0) {
                  c2 = (d2 & 1 ^ 1) + a2 | 0;
                  a2 = 27964 + (c2 << 1 << 2) | 0;
                  d2 = a2 + 8 | 0;
                  e2 = b[d2 >> 2] | 0;
                  f2 = e2 + 8 | 0;
                  g2 = b[f2 >> 2] | 0;
                  if ((g2 | 0) == (a2 | 0)) {
                    b[6981] = m & ~(1 << c2);
                  } else {
                    b[g2 + 12 >> 2] = a2;
                    b[d2 >> 2] = g2;
                  }
                  v2 = c2 << 3;
                  b[e2 + 4 >> 2] = v2 | 3;
                  v2 = e2 + v2 + 4 | 0;
                  b[v2 >> 2] = b[v2 >> 2] | 1;
                  v2 = f2;
                  T = w2;
                  return v2 | 0;
                }
                l = b[6983] | 0;
                if (k >>> 0 > l >>> 0) {
                  if (d2 | 0) {
                    c2 = 2 << a2;
                    c2 = d2 << a2 & (c2 | 0 - c2);
                    c2 = (c2 & 0 - c2) + -1 | 0;
                    i = c2 >>> 12 & 16;
                    c2 = c2 >>> i;
                    d2 = c2 >>> 5 & 8;
                    c2 = c2 >>> d2;
                    g2 = c2 >>> 2 & 4;
                    c2 = c2 >>> g2;
                    a2 = c2 >>> 1 & 2;
                    c2 = c2 >>> a2;
                    e2 = c2 >>> 1 & 1;
                    e2 = (d2 | i | g2 | a2 | e2) + (c2 >>> e2) | 0;
                    c2 = 27964 + (e2 << 1 << 2) | 0;
                    a2 = c2 + 8 | 0;
                    g2 = b[a2 >> 2] | 0;
                    i = g2 + 8 | 0;
                    d2 = b[i >> 2] | 0;
                    if ((d2 | 0) == (c2 | 0)) {
                      a2 = m & ~(1 << e2);
                      b[6981] = a2;
                    } else {
                      b[d2 + 12 >> 2] = c2;
                      b[a2 >> 2] = d2;
                      a2 = m;
                    }
                    v2 = e2 << 3;
                    h = v2 - k | 0;
                    b[g2 + 4 >> 2] = k | 3;
                    f2 = g2 + k | 0;
                    b[f2 + 4 >> 2] = h | 1;
                    b[g2 + v2 >> 2] = h;
                    if (l | 0) {
                      e2 = b[6986] | 0;
                      c2 = l >>> 3;
                      d2 = 27964 + (c2 << 1 << 2) | 0;
                      c2 = 1 << c2;
                      if (!(a2 & c2)) {
                        b[6981] = a2 | c2;
                        c2 = d2;
                        a2 = d2 + 8 | 0;
                      } else {
                        a2 = d2 + 8 | 0;
                        c2 = b[a2 >> 2] | 0;
                      }
                      b[a2 >> 2] = e2;
                      b[c2 + 12 >> 2] = e2;
                      b[e2 + 8 >> 2] = c2;
                      b[e2 + 12 >> 2] = d2;
                    }
                    b[6983] = h;
                    b[6986] = f2;
                    v2 = i;
                    T = w2;
                    return v2 | 0;
                  }
                  g2 = b[6982] | 0;
                  if (g2) {
                    d2 = (g2 & 0 - g2) + -1 | 0;
                    f2 = d2 >>> 12 & 16;
                    d2 = d2 >>> f2;
                    e2 = d2 >>> 5 & 8;
                    d2 = d2 >>> e2;
                    h = d2 >>> 2 & 4;
                    d2 = d2 >>> h;
                    i = d2 >>> 1 & 2;
                    d2 = d2 >>> i;
                    j = d2 >>> 1 & 1;
                    j = b[28228 + ((e2 | f2 | h | i | j) + (d2 >>> j) << 2) >> 2] | 0;
                    d2 = j;
                    i = j;
                    j = (b[j + 4 >> 2] & -8) - k | 0;
                    while (1) {
                      a2 = b[d2 + 16 >> 2] | 0;
                      if (!a2) {
                        a2 = b[d2 + 20 >> 2] | 0;
                        if (!a2) {
                          break;
                        }
                      }
                      h = (b[a2 + 4 >> 2] & -8) - k | 0;
                      f2 = h >>> 0 < j >>> 0;
                      d2 = a2;
                      i = f2 ? a2 : i;
                      j = f2 ? h : j;
                    }
                    h = i + k | 0;
                    if (h >>> 0 > i >>> 0) {
                      f2 = b[i + 24 >> 2] | 0;
                      c2 = b[i + 12 >> 2] | 0;
                      do {
                        if ((c2 | 0) == (i | 0)) {
                          a2 = i + 20 | 0;
                          c2 = b[a2 >> 2] | 0;
                          if (!c2) {
                            a2 = i + 16 | 0;
                            c2 = b[a2 >> 2] | 0;
                            if (!c2) {
                              d2 = 0;
                              break;
                            }
                          }
                          while (1) {
                            e2 = c2 + 20 | 0;
                            d2 = b[e2 >> 2] | 0;
                            if (!d2) {
                              e2 = c2 + 16 | 0;
                              d2 = b[e2 >> 2] | 0;
                              if (!d2) {
                                break;
                              } else {
                                c2 = d2;
                                a2 = e2;
                              }
                            } else {
                              c2 = d2;
                              a2 = e2;
                            }
                          }
                          b[a2 >> 2] = 0;
                          d2 = c2;
                        } else {
                          d2 = b[i + 8 >> 2] | 0;
                          b[d2 + 12 >> 2] = c2;
                          b[c2 + 8 >> 2] = d2;
                          d2 = c2;
                        }
                      } while (0);
                      do {
                        if (f2 | 0) {
                          c2 = b[i + 28 >> 2] | 0;
                          a2 = 28228 + (c2 << 2) | 0;
                          if ((i | 0) == (b[a2 >> 2] | 0)) {
                            b[a2 >> 2] = d2;
                            if (!d2) {
                              b[6982] = g2 & ~(1 << c2);
                              break;
                            }
                          } else {
                            v2 = f2 + 16 | 0;
                            b[((b[v2 >> 2] | 0) == (i | 0) ? v2 : f2 + 20 | 0) >> 2] = d2;
                            if (!d2) {
                              break;
                            }
                          }
                          b[d2 + 24 >> 2] = f2;
                          c2 = b[i + 16 >> 2] | 0;
                          if (c2 | 0) {
                            b[d2 + 16 >> 2] = c2;
                            b[c2 + 24 >> 2] = d2;
                          }
                          c2 = b[i + 20 >> 2] | 0;
                          if (c2 | 0) {
                            b[d2 + 20 >> 2] = c2;
                            b[c2 + 24 >> 2] = d2;
                          }
                        }
                      } while (0);
                      if (j >>> 0 < 16) {
                        v2 = j + k | 0;
                        b[i + 4 >> 2] = v2 | 3;
                        v2 = i + v2 + 4 | 0;
                        b[v2 >> 2] = b[v2 >> 2] | 1;
                      } else {
                        b[i + 4 >> 2] = k | 3;
                        b[h + 4 >> 2] = j | 1;
                        b[h + j >> 2] = j;
                        if (l | 0) {
                          e2 = b[6986] | 0;
                          c2 = l >>> 3;
                          d2 = 27964 + (c2 << 1 << 2) | 0;
                          c2 = 1 << c2;
                          if (!(c2 & m)) {
                            b[6981] = c2 | m;
                            c2 = d2;
                            a2 = d2 + 8 | 0;
                          } else {
                            a2 = d2 + 8 | 0;
                            c2 = b[a2 >> 2] | 0;
                          }
                          b[a2 >> 2] = e2;
                          b[c2 + 12 >> 2] = e2;
                          b[e2 + 8 >> 2] = c2;
                          b[e2 + 12 >> 2] = d2;
                        }
                        b[6983] = j;
                        b[6986] = h;
                      }
                      v2 = i + 8 | 0;
                      T = w2;
                      return v2 | 0;
                    } else {
                      m = k;
                    }
                  } else {
                    m = k;
                  }
                } else {
                  m = k;
                }
              } else if (a2 >>> 0 <= 4294967231) {
                a2 = a2 + 11 | 0;
                k = a2 & -8;
                e2 = b[6982] | 0;
                if (e2) {
                  f2 = 0 - k | 0;
                  a2 = a2 >>> 8;
                  if (a2) {
                    if (k >>> 0 > 16777215) {
                      j = 31;
                    } else {
                      m = (a2 + 1048320 | 0) >>> 16 & 8;
                      q2 = a2 << m;
                      i = (q2 + 520192 | 0) >>> 16 & 4;
                      q2 = q2 << i;
                      j = (q2 + 245760 | 0) >>> 16 & 2;
                      j = 14 - (i | m | j) + (q2 << j >>> 15) | 0;
                      j = k >>> (j + 7 | 0) & 1 | j << 1;
                    }
                  } else {
                    j = 0;
                  }
                  d2 = b[28228 + (j << 2) >> 2] | 0;
                  a: do {
                    if (!d2) {
                      d2 = 0;
                      a2 = 0;
                      q2 = 61;
                    } else {
                      a2 = 0;
                      i = k << ((j | 0) == 31 ? 0 : 25 - (j >>> 1) | 0);
                      g2 = 0;
                      while (1) {
                        h = (b[d2 + 4 >> 2] & -8) - k | 0;
                        if (h >>> 0 < f2 >>> 0) {
                          if (!h) {
                            a2 = d2;
                            f2 = 0;
                            q2 = 65;
                            break a;
                          } else {
                            a2 = d2;
                            f2 = h;
                          }
                        }
                        q2 = b[d2 + 20 >> 2] | 0;
                        d2 = b[d2 + 16 + (i >>> 31 << 2) >> 2] | 0;
                        g2 = (q2 | 0) == 0 | (q2 | 0) == (d2 | 0) ? g2 : q2;
                        if (!d2) {
                          d2 = g2;
                          q2 = 61;
                          break;
                        } else {
                          i = i << 1;
                        }
                      }
                    }
                  } while (0);
                  if ((q2 | 0) == 61) {
                    if ((d2 | 0) == 0 & (a2 | 0) == 0) {
                      a2 = 2 << j;
                      a2 = (a2 | 0 - a2) & e2;
                      if (!a2) {
                        m = k;
                        break;
                      }
                      m = (a2 & 0 - a2) + -1 | 0;
                      h = m >>> 12 & 16;
                      m = m >>> h;
                      g2 = m >>> 5 & 8;
                      m = m >>> g2;
                      i = m >>> 2 & 4;
                      m = m >>> i;
                      j = m >>> 1 & 2;
                      m = m >>> j;
                      d2 = m >>> 1 & 1;
                      a2 = 0;
                      d2 = b[28228 + ((g2 | h | i | j | d2) + (m >>> d2) << 2) >> 2] | 0;
                    }
                    if (!d2) {
                      i = a2;
                      h = f2;
                    } else {
                      q2 = 65;
                    }
                  }
                  if ((q2 | 0) == 65) {
                    g2 = d2;
                    while (1) {
                      m = (b[g2 + 4 >> 2] & -8) - k | 0;
                      d2 = m >>> 0 < f2 >>> 0;
                      f2 = d2 ? m : f2;
                      a2 = d2 ? g2 : a2;
                      d2 = b[g2 + 16 >> 2] | 0;
                      if (!d2) {
                        d2 = b[g2 + 20 >> 2] | 0;
                      }
                      if (!d2) {
                        i = a2;
                        h = f2;
                        break;
                      } else {
                        g2 = d2;
                      }
                    }
                  }
                  if (((i | 0) != 0 ? h >>> 0 < ((b[6983] | 0) - k | 0) >>> 0 : 0) ? (l = i + k | 0, l >>> 0 > i >>> 0) : 0) {
                    g2 = b[i + 24 >> 2] | 0;
                    c2 = b[i + 12 >> 2] | 0;
                    do {
                      if ((c2 | 0) == (i | 0)) {
                        a2 = i + 20 | 0;
                        c2 = b[a2 >> 2] | 0;
                        if (!c2) {
                          a2 = i + 16 | 0;
                          c2 = b[a2 >> 2] | 0;
                          if (!c2) {
                            c2 = 0;
                            break;
                          }
                        }
                        while (1) {
                          f2 = c2 + 20 | 0;
                          d2 = b[f2 >> 2] | 0;
                          if (!d2) {
                            f2 = c2 + 16 | 0;
                            d2 = b[f2 >> 2] | 0;
                            if (!d2) {
                              break;
                            } else {
                              c2 = d2;
                              a2 = f2;
                            }
                          } else {
                            c2 = d2;
                            a2 = f2;
                          }
                        }
                        b[a2 >> 2] = 0;
                      } else {
                        v2 = b[i + 8 >> 2] | 0;
                        b[v2 + 12 >> 2] = c2;
                        b[c2 + 8 >> 2] = v2;
                      }
                    } while (0);
                    do {
                      if (g2) {
                        a2 = b[i + 28 >> 2] | 0;
                        d2 = 28228 + (a2 << 2) | 0;
                        if ((i | 0) == (b[d2 >> 2] | 0)) {
                          b[d2 >> 2] = c2;
                          if (!c2) {
                            e2 = e2 & ~(1 << a2);
                            b[6982] = e2;
                            break;
                          }
                        } else {
                          v2 = g2 + 16 | 0;
                          b[((b[v2 >> 2] | 0) == (i | 0) ? v2 : g2 + 20 | 0) >> 2] = c2;
                          if (!c2) {
                            break;
                          }
                        }
                        b[c2 + 24 >> 2] = g2;
                        a2 = b[i + 16 >> 2] | 0;
                        if (a2 | 0) {
                          b[c2 + 16 >> 2] = a2;
                          b[a2 + 24 >> 2] = c2;
                        }
                        a2 = b[i + 20 >> 2] | 0;
                        if (a2) {
                          b[c2 + 20 >> 2] = a2;
                          b[a2 + 24 >> 2] = c2;
                        }
                      }
                    } while (0);
                    b: do {
                      if (h >>> 0 < 16) {
                        v2 = h + k | 0;
                        b[i + 4 >> 2] = v2 | 3;
                        v2 = i + v2 + 4 | 0;
                        b[v2 >> 2] = b[v2 >> 2] | 1;
                      } else {
                        b[i + 4 >> 2] = k | 3;
                        b[l + 4 >> 2] = h | 1;
                        b[l + h >> 2] = h;
                        c2 = h >>> 3;
                        if (h >>> 0 < 256) {
                          d2 = 27964 + (c2 << 1 << 2) | 0;
                          a2 = b[6981] | 0;
                          c2 = 1 << c2;
                          if (!(a2 & c2)) {
                            b[6981] = a2 | c2;
                            c2 = d2;
                            a2 = d2 + 8 | 0;
                          } else {
                            a2 = d2 + 8 | 0;
                            c2 = b[a2 >> 2] | 0;
                          }
                          b[a2 >> 2] = l;
                          b[c2 + 12 >> 2] = l;
                          b[l + 8 >> 2] = c2;
                          b[l + 12 >> 2] = d2;
                          break;
                        }
                        c2 = h >>> 8;
                        if (c2) {
                          if (h >>> 0 > 16777215) {
                            d2 = 31;
                          } else {
                            u2 = (c2 + 1048320 | 0) >>> 16 & 8;
                            v2 = c2 << u2;
                            t2 = (v2 + 520192 | 0) >>> 16 & 4;
                            v2 = v2 << t2;
                            d2 = (v2 + 245760 | 0) >>> 16 & 2;
                            d2 = 14 - (t2 | u2 | d2) + (v2 << d2 >>> 15) | 0;
                            d2 = h >>> (d2 + 7 | 0) & 1 | d2 << 1;
                          }
                        } else {
                          d2 = 0;
                        }
                        c2 = 28228 + (d2 << 2) | 0;
                        b[l + 28 >> 2] = d2;
                        a2 = l + 16 | 0;
                        b[a2 + 4 >> 2] = 0;
                        b[a2 >> 2] = 0;
                        a2 = 1 << d2;
                        if (!(e2 & a2)) {
                          b[6982] = e2 | a2;
                          b[c2 >> 2] = l;
                          b[l + 24 >> 2] = c2;
                          b[l + 12 >> 2] = l;
                          b[l + 8 >> 2] = l;
                          break;
                        }
                        c2 = b[c2 >> 2] | 0;
                        c: do {
                          if ((b[c2 + 4 >> 2] & -8 | 0) != (h | 0)) {
                            e2 = h << ((d2 | 0) == 31 ? 0 : 25 - (d2 >>> 1) | 0);
                            while (1) {
                              d2 = c2 + 16 + (e2 >>> 31 << 2) | 0;
                              a2 = b[d2 >> 2] | 0;
                              if (!a2) {
                                break;
                              }
                              if ((b[a2 + 4 >> 2] & -8 | 0) == (h | 0)) {
                                c2 = a2;
                                break c;
                              } else {
                                e2 = e2 << 1;
                                c2 = a2;
                              }
                            }
                            b[d2 >> 2] = l;
                            b[l + 24 >> 2] = c2;
                            b[l + 12 >> 2] = l;
                            b[l + 8 >> 2] = l;
                            break b;
                          }
                        } while (0);
                        u2 = c2 + 8 | 0;
                        v2 = b[u2 >> 2] | 0;
                        b[v2 + 12 >> 2] = l;
                        b[u2 >> 2] = l;
                        b[l + 8 >> 2] = v2;
                        b[l + 12 >> 2] = c2;
                        b[l + 24 >> 2] = 0;
                      }
                    } while (0);
                    v2 = i + 8 | 0;
                    T = w2;
                    return v2 | 0;
                  } else {
                    m = k;
                  }
                } else {
                  m = k;
                }
              } else {
                m = -1;
              }
            } while (0);
            d2 = b[6983] | 0;
            if (d2 >>> 0 >= m >>> 0) {
              c2 = d2 - m | 0;
              a2 = b[6986] | 0;
              if (c2 >>> 0 > 15) {
                v2 = a2 + m | 0;
                b[6986] = v2;
                b[6983] = c2;
                b[v2 + 4 >> 2] = c2 | 1;
                b[a2 + d2 >> 2] = c2;
                b[a2 + 4 >> 2] = m | 3;
              } else {
                b[6983] = 0;
                b[6986] = 0;
                b[a2 + 4 >> 2] = d2 | 3;
                v2 = a2 + d2 + 4 | 0;
                b[v2 >> 2] = b[v2 >> 2] | 1;
              }
              v2 = a2 + 8 | 0;
              T = w2;
              return v2 | 0;
            }
            h = b[6984] | 0;
            if (h >>> 0 > m >>> 0) {
              t2 = h - m | 0;
              b[6984] = t2;
              v2 = b[6987] | 0;
              u2 = v2 + m | 0;
              b[6987] = u2;
              b[u2 + 4 >> 2] = t2 | 1;
              b[v2 + 4 >> 2] = m | 3;
              v2 = v2 + 8 | 0;
              T = w2;
              return v2 | 0;
            }
            if (!(b[7099] | 0)) {
              b[7101] = 4096;
              b[7100] = 4096;
              b[7102] = -1;
              b[7103] = -1;
              b[7104] = 0;
              b[7092] = 0;
              b[7099] = n & -16 ^ 1431655768;
              a2 = 4096;
            } else {
              a2 = b[7101] | 0;
            }
            i = m + 48 | 0;
            j = m + 47 | 0;
            g2 = a2 + j | 0;
            f2 = 0 - a2 | 0;
            k = g2 & f2;
            if (k >>> 0 <= m >>> 0) {
              v2 = 0;
              T = w2;
              return v2 | 0;
            }
            a2 = b[7091] | 0;
            if (a2 | 0 ? (l = b[7089] | 0, n = l + k | 0, n >>> 0 <= l >>> 0 | n >>> 0 > a2 >>> 0) : 0) {
              v2 = 0;
              T = w2;
              return v2 | 0;
            }
            d: do {
              if (!(b[7092] & 4)) {
                d2 = b[6987] | 0;
                e: do {
                  if (d2) {
                    e2 = 28372;
                    while (1) {
                      n = b[e2 >> 2] | 0;
                      if (n >>> 0 <= d2 >>> 0 ? (n + (b[e2 + 4 >> 2] | 0) | 0) >>> 0 > d2 >>> 0 : 0) {
                        break;
                      }
                      a2 = b[e2 + 8 >> 2] | 0;
                      if (!a2) {
                        q2 = 128;
                        break e;
                      } else {
                        e2 = a2;
                      }
                    }
                    c2 = g2 - h & f2;
                    if (c2 >>> 0 < 2147483647) {
                      a2 = ae(c2 | 0) | 0;
                      if ((a2 | 0) == ((b[e2 >> 2] | 0) + (b[e2 + 4 >> 2] | 0) | 0)) {
                        if ((a2 | 0) != (-1 | 0)) {
                          h = c2;
                          g2 = a2;
                          q2 = 145;
                          break d;
                        }
                      } else {
                        e2 = a2;
                        q2 = 136;
                      }
                    } else {
                      c2 = 0;
                    }
                  } else {
                    q2 = 128;
                  }
                } while (0);
                do {
                  if ((q2 | 0) == 128) {
                    d2 = ae(0) | 0;
                    if ((d2 | 0) != (-1 | 0) ? (c2 = d2, o = b[7100] | 0, p2 = o + -1 | 0, c2 = ((p2 & c2 | 0) == 0 ? 0 : (p2 + c2 & 0 - o) - c2 | 0) + k | 0, o = b[7089] | 0, p2 = c2 + o | 0, c2 >>> 0 > m >>> 0 & c2 >>> 0 < 2147483647) : 0) {
                      n = b[7091] | 0;
                      if (n | 0 ? p2 >>> 0 <= o >>> 0 | p2 >>> 0 > n >>> 0 : 0) {
                        c2 = 0;
                        break;
                      }
                      a2 = ae(c2 | 0) | 0;
                      if ((a2 | 0) == (d2 | 0)) {
                        h = c2;
                        g2 = d2;
                        q2 = 145;
                        break d;
                      } else {
                        e2 = a2;
                        q2 = 136;
                      }
                    } else {
                      c2 = 0;
                    }
                  }
                } while (0);
                do {
                  if ((q2 | 0) == 136) {
                    d2 = 0 - c2 | 0;
                    if (!(i >>> 0 > c2 >>> 0 & (c2 >>> 0 < 2147483647 & (e2 | 0) != (-1 | 0)))) {
                      if ((e2 | 0) == (-1 | 0)) {
                        c2 = 0;
                        break;
                      } else {
                        h = c2;
                        g2 = e2;
                        q2 = 145;
                        break d;
                      }
                    }
                    a2 = b[7101] | 0;
                    a2 = j - c2 + a2 & 0 - a2;
                    if (a2 >>> 0 >= 2147483647) {
                      h = c2;
                      g2 = e2;
                      q2 = 145;
                      break d;
                    }
                    if ((ae(a2 | 0) | 0) == (-1 | 0)) {
                      ae(d2 | 0) | 0;
                      c2 = 0;
                      break;
                    } else {
                      h = a2 + c2 | 0;
                      g2 = e2;
                      q2 = 145;
                      break d;
                    }
                  }
                } while (0);
                b[7092] = b[7092] | 4;
                q2 = 143;
              } else {
                c2 = 0;
                q2 = 143;
              }
            } while (0);
            if (((q2 | 0) == 143 ? k >>> 0 < 2147483647 : 0) ? (t2 = ae(k | 0) | 0, p2 = ae(0) | 0, r2 = p2 - t2 | 0, s2 = r2 >>> 0 > (m + 40 | 0) >>> 0, !((t2 | 0) == (-1 | 0) | s2 ^ 1 | t2 >>> 0 < p2 >>> 0 & ((t2 | 0) != (-1 | 0) & (p2 | 0) != (-1 | 0)) ^ 1)) : 0) {
              h = s2 ? r2 : c2;
              g2 = t2;
              q2 = 145;
            }
            if ((q2 | 0) == 145) {
              c2 = (b[7089] | 0) + h | 0;
              b[7089] = c2;
              if (c2 >>> 0 > (b[7090] | 0) >>> 0) {
                b[7090] = c2;
              }
              j = b[6987] | 0;
              f: do {
                if (j) {
                  c2 = 28372;
                  while (1) {
                    a2 = b[c2 >> 2] | 0;
                    d2 = b[c2 + 4 >> 2] | 0;
                    if ((g2 | 0) == (a2 + d2 | 0)) {
                      q2 = 154;
                      break;
                    }
                    e2 = b[c2 + 8 >> 2] | 0;
                    if (!e2) {
                      break;
                    } else {
                      c2 = e2;
                    }
                  }
                  if (((q2 | 0) == 154 ? (u2 = c2 + 4 | 0, (b[c2 + 12 >> 2] & 8 | 0) == 0) : 0) ? g2 >>> 0 > j >>> 0 & a2 >>> 0 <= j >>> 0 : 0) {
                    b[u2 >> 2] = d2 + h;
                    v2 = (b[6984] | 0) + h | 0;
                    t2 = j + 8 | 0;
                    t2 = (t2 & 7 | 0) == 0 ? 0 : 0 - t2 & 7;
                    u2 = j + t2 | 0;
                    t2 = v2 - t2 | 0;
                    b[6987] = u2;
                    b[6984] = t2;
                    b[u2 + 4 >> 2] = t2 | 1;
                    b[j + v2 + 4 >> 2] = 40;
                    b[6988] = b[7103];
                    break;
                  }
                  if (g2 >>> 0 < (b[6985] | 0) >>> 0) {
                    b[6985] = g2;
                  }
                  d2 = g2 + h | 0;
                  c2 = 28372;
                  while (1) {
                    if ((b[c2 >> 2] | 0) == (d2 | 0)) {
                      q2 = 162;
                      break;
                    }
                    a2 = b[c2 + 8 >> 2] | 0;
                    if (!a2) {
                      break;
                    } else {
                      c2 = a2;
                    }
                  }
                  if ((q2 | 0) == 162 ? (b[c2 + 12 >> 2] & 8 | 0) == 0 : 0) {
                    b[c2 >> 2] = g2;
                    l = c2 + 4 | 0;
                    b[l >> 2] = (b[l >> 2] | 0) + h;
                    l = g2 + 8 | 0;
                    l = g2 + ((l & 7 | 0) == 0 ? 0 : 0 - l & 7) | 0;
                    c2 = d2 + 8 | 0;
                    c2 = d2 + ((c2 & 7 | 0) == 0 ? 0 : 0 - c2 & 7) | 0;
                    k = l + m | 0;
                    i = c2 - l - m | 0;
                    b[l + 4 >> 2] = m | 3;
                    g: do {
                      if ((j | 0) == (c2 | 0)) {
                        v2 = (b[6984] | 0) + i | 0;
                        b[6984] = v2;
                        b[6987] = k;
                        b[k + 4 >> 2] = v2 | 1;
                      } else {
                        if ((b[6986] | 0) == (c2 | 0)) {
                          v2 = (b[6983] | 0) + i | 0;
                          b[6983] = v2;
                          b[6986] = k;
                          b[k + 4 >> 2] = v2 | 1;
                          b[k + v2 >> 2] = v2;
                          break;
                        }
                        a2 = b[c2 + 4 >> 2] | 0;
                        if ((a2 & 3 | 0) == 1) {
                          h = a2 & -8;
                          e2 = a2 >>> 3;
                          h: do {
                            if (a2 >>> 0 < 256) {
                              a2 = b[c2 + 8 >> 2] | 0;
                              d2 = b[c2 + 12 >> 2] | 0;
                              if ((d2 | 0) == (a2 | 0)) {
                                b[6981] = b[6981] & ~(1 << e2);
                                break;
                              } else {
                                b[a2 + 12 >> 2] = d2;
                                b[d2 + 8 >> 2] = a2;
                                break;
                              }
                            } else {
                              g2 = b[c2 + 24 >> 2] | 0;
                              a2 = b[c2 + 12 >> 2] | 0;
                              do {
                                if ((a2 | 0) == (c2 | 0)) {
                                  d2 = c2 + 16 | 0;
                                  e2 = d2 + 4 | 0;
                                  a2 = b[e2 >> 2] | 0;
                                  if (!a2) {
                                    a2 = b[d2 >> 2] | 0;
                                    if (!a2) {
                                      a2 = 0;
                                      break;
                                    }
                                  } else {
                                    d2 = e2;
                                  }
                                  while (1) {
                                    f2 = a2 + 20 | 0;
                                    e2 = b[f2 >> 2] | 0;
                                    if (!e2) {
                                      f2 = a2 + 16 | 0;
                                      e2 = b[f2 >> 2] | 0;
                                      if (!e2) {
                                        break;
                                      } else {
                                        a2 = e2;
                                        d2 = f2;
                                      }
                                    } else {
                                      a2 = e2;
                                      d2 = f2;
                                    }
                                  }
                                  b[d2 >> 2] = 0;
                                } else {
                                  v2 = b[c2 + 8 >> 2] | 0;
                                  b[v2 + 12 >> 2] = a2;
                                  b[a2 + 8 >> 2] = v2;
                                }
                              } while (0);
                              if (!g2) {
                                break;
                              }
                              d2 = b[c2 + 28 >> 2] | 0;
                              e2 = 28228 + (d2 << 2) | 0;
                              do {
                                if ((b[e2 >> 2] | 0) != (c2 | 0)) {
                                  v2 = g2 + 16 | 0;
                                  b[((b[v2 >> 2] | 0) == (c2 | 0) ? v2 : g2 + 20 | 0) >> 2] = a2;
                                  if (!a2) {
                                    break h;
                                  }
                                } else {
                                  b[e2 >> 2] = a2;
                                  if (a2 | 0) {
                                    break;
                                  }
                                  b[6982] = b[6982] & ~(1 << d2);
                                  break h;
                                }
                              } while (0);
                              b[a2 + 24 >> 2] = g2;
                              d2 = c2 + 16 | 0;
                              e2 = b[d2 >> 2] | 0;
                              if (e2 | 0) {
                                b[a2 + 16 >> 2] = e2;
                                b[e2 + 24 >> 2] = a2;
                              }
                              d2 = b[d2 + 4 >> 2] | 0;
                              if (!d2) {
                                break;
                              }
                              b[a2 + 20 >> 2] = d2;
                              b[d2 + 24 >> 2] = a2;
                            }
                          } while (0);
                          c2 = c2 + h | 0;
                          f2 = h + i | 0;
                        } else {
                          f2 = i;
                        }
                        c2 = c2 + 4 | 0;
                        b[c2 >> 2] = b[c2 >> 2] & -2;
                        b[k + 4 >> 2] = f2 | 1;
                        b[k + f2 >> 2] = f2;
                        c2 = f2 >>> 3;
                        if (f2 >>> 0 < 256) {
                          d2 = 27964 + (c2 << 1 << 2) | 0;
                          a2 = b[6981] | 0;
                          c2 = 1 << c2;
                          if (!(a2 & c2)) {
                            b[6981] = a2 | c2;
                            c2 = d2;
                            a2 = d2 + 8 | 0;
                          } else {
                            a2 = d2 + 8 | 0;
                            c2 = b[a2 >> 2] | 0;
                          }
                          b[a2 >> 2] = k;
                          b[c2 + 12 >> 2] = k;
                          b[k + 8 >> 2] = c2;
                          b[k + 12 >> 2] = d2;
                          break;
                        }
                        c2 = f2 >>> 8;
                        do {
                          if (!c2) {
                            e2 = 0;
                          } else {
                            if (f2 >>> 0 > 16777215) {
                              e2 = 31;
                              break;
                            }
                            u2 = (c2 + 1048320 | 0) >>> 16 & 8;
                            v2 = c2 << u2;
                            t2 = (v2 + 520192 | 0) >>> 16 & 4;
                            v2 = v2 << t2;
                            e2 = (v2 + 245760 | 0) >>> 16 & 2;
                            e2 = 14 - (t2 | u2 | e2) + (v2 << e2 >>> 15) | 0;
                            e2 = f2 >>> (e2 + 7 | 0) & 1 | e2 << 1;
                          }
                        } while (0);
                        c2 = 28228 + (e2 << 2) | 0;
                        b[k + 28 >> 2] = e2;
                        a2 = k + 16 | 0;
                        b[a2 + 4 >> 2] = 0;
                        b[a2 >> 2] = 0;
                        a2 = b[6982] | 0;
                        d2 = 1 << e2;
                        if (!(a2 & d2)) {
                          b[6982] = a2 | d2;
                          b[c2 >> 2] = k;
                          b[k + 24 >> 2] = c2;
                          b[k + 12 >> 2] = k;
                          b[k + 8 >> 2] = k;
                          break;
                        }
                        c2 = b[c2 >> 2] | 0;
                        i: do {
                          if ((b[c2 + 4 >> 2] & -8 | 0) != (f2 | 0)) {
                            e2 = f2 << ((e2 | 0) == 31 ? 0 : 25 - (e2 >>> 1) | 0);
                            while (1) {
                              d2 = c2 + 16 + (e2 >>> 31 << 2) | 0;
                              a2 = b[d2 >> 2] | 0;
                              if (!a2) {
                                break;
                              }
                              if ((b[a2 + 4 >> 2] & -8 | 0) == (f2 | 0)) {
                                c2 = a2;
                                break i;
                              } else {
                                e2 = e2 << 1;
                                c2 = a2;
                              }
                            }
                            b[d2 >> 2] = k;
                            b[k + 24 >> 2] = c2;
                            b[k + 12 >> 2] = k;
                            b[k + 8 >> 2] = k;
                            break g;
                          }
                        } while (0);
                        u2 = c2 + 8 | 0;
                        v2 = b[u2 >> 2] | 0;
                        b[v2 + 12 >> 2] = k;
                        b[u2 >> 2] = k;
                        b[k + 8 >> 2] = v2;
                        b[k + 12 >> 2] = c2;
                        b[k + 24 >> 2] = 0;
                      }
                    } while (0);
                    v2 = l + 8 | 0;
                    T = w2;
                    return v2 | 0;
                  }
                  c2 = 28372;
                  while (1) {
                    a2 = b[c2 >> 2] | 0;
                    if (a2 >>> 0 <= j >>> 0 ? (v2 = a2 + (b[c2 + 4 >> 2] | 0) | 0, v2 >>> 0 > j >>> 0) : 0) {
                      break;
                    }
                    c2 = b[c2 + 8 >> 2] | 0;
                  }
                  f2 = v2 + -47 | 0;
                  a2 = f2 + 8 | 0;
                  a2 = f2 + ((a2 & 7 | 0) == 0 ? 0 : 0 - a2 & 7) | 0;
                  f2 = j + 16 | 0;
                  a2 = a2 >>> 0 < f2 >>> 0 ? j : a2;
                  c2 = a2 + 8 | 0;
                  d2 = h + -40 | 0;
                  t2 = g2 + 8 | 0;
                  t2 = (t2 & 7 | 0) == 0 ? 0 : 0 - t2 & 7;
                  u2 = g2 + t2 | 0;
                  t2 = d2 - t2 | 0;
                  b[6987] = u2;
                  b[6984] = t2;
                  b[u2 + 4 >> 2] = t2 | 1;
                  b[g2 + d2 + 4 >> 2] = 40;
                  b[6988] = b[7103];
                  d2 = a2 + 4 | 0;
                  b[d2 >> 2] = 27;
                  b[c2 >> 2] = b[7093];
                  b[c2 + 4 >> 2] = b[7094];
                  b[c2 + 8 >> 2] = b[7095];
                  b[c2 + 12 >> 2] = b[7096];
                  b[7093] = g2;
                  b[7094] = h;
                  b[7096] = 0;
                  b[7095] = c2;
                  c2 = a2 + 24 | 0;
                  do {
                    u2 = c2;
                    c2 = c2 + 4 | 0;
                    b[c2 >> 2] = 7;
                  } while ((u2 + 8 | 0) >>> 0 < v2 >>> 0);
                  if ((a2 | 0) != (j | 0)) {
                    g2 = a2 - j | 0;
                    b[d2 >> 2] = b[d2 >> 2] & -2;
                    b[j + 4 >> 2] = g2 | 1;
                    b[a2 >> 2] = g2;
                    c2 = g2 >>> 3;
                    if (g2 >>> 0 < 256) {
                      d2 = 27964 + (c2 << 1 << 2) | 0;
                      a2 = b[6981] | 0;
                      c2 = 1 << c2;
                      if (!(a2 & c2)) {
                        b[6981] = a2 | c2;
                        c2 = d2;
                        a2 = d2 + 8 | 0;
                      } else {
                        a2 = d2 + 8 | 0;
                        c2 = b[a2 >> 2] | 0;
                      }
                      b[a2 >> 2] = j;
                      b[c2 + 12 >> 2] = j;
                      b[j + 8 >> 2] = c2;
                      b[j + 12 >> 2] = d2;
                      break;
                    }
                    c2 = g2 >>> 8;
                    if (c2) {
                      if (g2 >>> 0 > 16777215) {
                        e2 = 31;
                      } else {
                        u2 = (c2 + 1048320 | 0) >>> 16 & 8;
                        v2 = c2 << u2;
                        t2 = (v2 + 520192 | 0) >>> 16 & 4;
                        v2 = v2 << t2;
                        e2 = (v2 + 245760 | 0) >>> 16 & 2;
                        e2 = 14 - (t2 | u2 | e2) + (v2 << e2 >>> 15) | 0;
                        e2 = g2 >>> (e2 + 7 | 0) & 1 | e2 << 1;
                      }
                    } else {
                      e2 = 0;
                    }
                    d2 = 28228 + (e2 << 2) | 0;
                    b[j + 28 >> 2] = e2;
                    b[j + 20 >> 2] = 0;
                    b[f2 >> 2] = 0;
                    c2 = b[6982] | 0;
                    a2 = 1 << e2;
                    if (!(c2 & a2)) {
                      b[6982] = c2 | a2;
                      b[d2 >> 2] = j;
                      b[j + 24 >> 2] = d2;
                      b[j + 12 >> 2] = j;
                      b[j + 8 >> 2] = j;
                      break;
                    }
                    c2 = b[d2 >> 2] | 0;
                    j: do {
                      if ((b[c2 + 4 >> 2] & -8 | 0) != (g2 | 0)) {
                        e2 = g2 << ((e2 | 0) == 31 ? 0 : 25 - (e2 >>> 1) | 0);
                        while (1) {
                          d2 = c2 + 16 + (e2 >>> 31 << 2) | 0;
                          a2 = b[d2 >> 2] | 0;
                          if (!a2) {
                            break;
                          }
                          if ((b[a2 + 4 >> 2] & -8 | 0) == (g2 | 0)) {
                            c2 = a2;
                            break j;
                          } else {
                            e2 = e2 << 1;
                            c2 = a2;
                          }
                        }
                        b[d2 >> 2] = j;
                        b[j + 24 >> 2] = c2;
                        b[j + 12 >> 2] = j;
                        b[j + 8 >> 2] = j;
                        break f;
                      }
                    } while (0);
                    u2 = c2 + 8 | 0;
                    v2 = b[u2 >> 2] | 0;
                    b[v2 + 12 >> 2] = j;
                    b[u2 >> 2] = j;
                    b[j + 8 >> 2] = v2;
                    b[j + 12 >> 2] = c2;
                    b[j + 24 >> 2] = 0;
                  }
                } else {
                  v2 = b[6985] | 0;
                  if ((v2 | 0) == 0 | g2 >>> 0 < v2 >>> 0) {
                    b[6985] = g2;
                  }
                  b[7093] = g2;
                  b[7094] = h;
                  b[7096] = 0;
                  b[6990] = b[7099];
                  b[6989] = -1;
                  b[6994] = 27964;
                  b[6993] = 27964;
                  b[6996] = 27972;
                  b[6995] = 27972;
                  b[6998] = 27980;
                  b[6997] = 27980;
                  b[7e3] = 27988;
                  b[6999] = 27988;
                  b[7002] = 27996;
                  b[7001] = 27996;
                  b[7004] = 28004;
                  b[7003] = 28004;
                  b[7006] = 28012;
                  b[7005] = 28012;
                  b[7008] = 28020;
                  b[7007] = 28020;
                  b[7010] = 28028;
                  b[7009] = 28028;
                  b[7012] = 28036;
                  b[7011] = 28036;
                  b[7014] = 28044;
                  b[7013] = 28044;
                  b[7016] = 28052;
                  b[7015] = 28052;
                  b[7018] = 28060;
                  b[7017] = 28060;
                  b[7020] = 28068;
                  b[7019] = 28068;
                  b[7022] = 28076;
                  b[7021] = 28076;
                  b[7024] = 28084;
                  b[7023] = 28084;
                  b[7026] = 28092;
                  b[7025] = 28092;
                  b[7028] = 28100;
                  b[7027] = 28100;
                  b[7030] = 28108;
                  b[7029] = 28108;
                  b[7032] = 28116;
                  b[7031] = 28116;
                  b[7034] = 28124;
                  b[7033] = 28124;
                  b[7036] = 28132;
                  b[7035] = 28132;
                  b[7038] = 28140;
                  b[7037] = 28140;
                  b[7040] = 28148;
                  b[7039] = 28148;
                  b[7042] = 28156;
                  b[7041] = 28156;
                  b[7044] = 28164;
                  b[7043] = 28164;
                  b[7046] = 28172;
                  b[7045] = 28172;
                  b[7048] = 28180;
                  b[7047] = 28180;
                  b[7050] = 28188;
                  b[7049] = 28188;
                  b[7052] = 28196;
                  b[7051] = 28196;
                  b[7054] = 28204;
                  b[7053] = 28204;
                  b[7056] = 28212;
                  b[7055] = 28212;
                  v2 = h + -40 | 0;
                  t2 = g2 + 8 | 0;
                  t2 = (t2 & 7 | 0) == 0 ? 0 : 0 - t2 & 7;
                  u2 = g2 + t2 | 0;
                  t2 = v2 - t2 | 0;
                  b[6987] = u2;
                  b[6984] = t2;
                  b[u2 + 4 >> 2] = t2 | 1;
                  b[g2 + v2 + 4 >> 2] = 40;
                  b[6988] = b[7103];
                }
              } while (0);
              c2 = b[6984] | 0;
              if (c2 >>> 0 > m >>> 0) {
                t2 = c2 - m | 0;
                b[6984] = t2;
                v2 = b[6987] | 0;
                u2 = v2 + m | 0;
                b[6987] = u2;
                b[u2 + 4 >> 2] = t2 | 1;
                b[v2 + 4 >> 2] = m | 3;
                v2 = v2 + 8 | 0;
                T = w2;
                return v2 | 0;
              }
            }
            v2 = Ed() | 0;
            b[v2 >> 2] = 12;
            v2 = 0;
            T = w2;
            return v2 | 0;
          }
          __name(Gd, "Gd");
          function Hd(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            if (!a2) {
              return;
            }
            d2 = a2 + -8 | 0;
            f2 = b[6985] | 0;
            a2 = b[a2 + -4 >> 2] | 0;
            c2 = a2 & -8;
            j = d2 + c2 | 0;
            do {
              if (!(a2 & 1)) {
                e2 = b[d2 >> 2] | 0;
                if (!(a2 & 3)) {
                  return;
                }
                h = d2 + (0 - e2) | 0;
                g2 = e2 + c2 | 0;
                if (h >>> 0 < f2 >>> 0) {
                  return;
                }
                if ((b[6986] | 0) == (h | 0)) {
                  a2 = j + 4 | 0;
                  c2 = b[a2 >> 2] | 0;
                  if ((c2 & 3 | 0) != 3) {
                    i = h;
                    c2 = g2;
                    break;
                  }
                  b[6983] = g2;
                  b[a2 >> 2] = c2 & -2;
                  b[h + 4 >> 2] = g2 | 1;
                  b[h + g2 >> 2] = g2;
                  return;
                }
                d2 = e2 >>> 3;
                if (e2 >>> 0 < 256) {
                  a2 = b[h + 8 >> 2] | 0;
                  c2 = b[h + 12 >> 2] | 0;
                  if ((c2 | 0) == (a2 | 0)) {
                    b[6981] = b[6981] & ~(1 << d2);
                    i = h;
                    c2 = g2;
                    break;
                  } else {
                    b[a2 + 12 >> 2] = c2;
                    b[c2 + 8 >> 2] = a2;
                    i = h;
                    c2 = g2;
                    break;
                  }
                }
                f2 = b[h + 24 >> 2] | 0;
                a2 = b[h + 12 >> 2] | 0;
                do {
                  if ((a2 | 0) == (h | 0)) {
                    c2 = h + 16 | 0;
                    d2 = c2 + 4 | 0;
                    a2 = b[d2 >> 2] | 0;
                    if (!a2) {
                      a2 = b[c2 >> 2] | 0;
                      if (!a2) {
                        a2 = 0;
                        break;
                      }
                    } else {
                      c2 = d2;
                    }
                    while (1) {
                      e2 = a2 + 20 | 0;
                      d2 = b[e2 >> 2] | 0;
                      if (!d2) {
                        e2 = a2 + 16 | 0;
                        d2 = b[e2 >> 2] | 0;
                        if (!d2) {
                          break;
                        } else {
                          a2 = d2;
                          c2 = e2;
                        }
                      } else {
                        a2 = d2;
                        c2 = e2;
                      }
                    }
                    b[c2 >> 2] = 0;
                  } else {
                    i = b[h + 8 >> 2] | 0;
                    b[i + 12 >> 2] = a2;
                    b[a2 + 8 >> 2] = i;
                  }
                } while (0);
                if (f2) {
                  c2 = b[h + 28 >> 2] | 0;
                  d2 = 28228 + (c2 << 2) | 0;
                  if ((b[d2 >> 2] | 0) == (h | 0)) {
                    b[d2 >> 2] = a2;
                    if (!a2) {
                      b[6982] = b[6982] & ~(1 << c2);
                      i = h;
                      c2 = g2;
                      break;
                    }
                  } else {
                    i = f2 + 16 | 0;
                    b[((b[i >> 2] | 0) == (h | 0) ? i : f2 + 20 | 0) >> 2] = a2;
                    if (!a2) {
                      i = h;
                      c2 = g2;
                      break;
                    }
                  }
                  b[a2 + 24 >> 2] = f2;
                  c2 = h + 16 | 0;
                  d2 = b[c2 >> 2] | 0;
                  if (d2 | 0) {
                    b[a2 + 16 >> 2] = d2;
                    b[d2 + 24 >> 2] = a2;
                  }
                  c2 = b[c2 + 4 >> 2] | 0;
                  if (c2) {
                    b[a2 + 20 >> 2] = c2;
                    b[c2 + 24 >> 2] = a2;
                    i = h;
                    c2 = g2;
                  } else {
                    i = h;
                    c2 = g2;
                  }
                } else {
                  i = h;
                  c2 = g2;
                }
              } else {
                i = d2;
                h = d2;
              }
            } while (0);
            if (h >>> 0 >= j >>> 0) {
              return;
            }
            a2 = j + 4 | 0;
            e2 = b[a2 >> 2] | 0;
            if (!(e2 & 1)) {
              return;
            }
            if (!(e2 & 2)) {
              if ((b[6987] | 0) == (j | 0)) {
                j = (b[6984] | 0) + c2 | 0;
                b[6984] = j;
                b[6987] = i;
                b[i + 4 >> 2] = j | 1;
                if ((i | 0) != (b[6986] | 0)) {
                  return;
                }
                b[6986] = 0;
                b[6983] = 0;
                return;
              }
              if ((b[6986] | 0) == (j | 0)) {
                j = (b[6983] | 0) + c2 | 0;
                b[6983] = j;
                b[6986] = h;
                b[i + 4 >> 2] = j | 1;
                b[h + j >> 2] = j;
                return;
              }
              f2 = (e2 & -8) + c2 | 0;
              d2 = e2 >>> 3;
              do {
                if (e2 >>> 0 < 256) {
                  c2 = b[j + 8 >> 2] | 0;
                  a2 = b[j + 12 >> 2] | 0;
                  if ((a2 | 0) == (c2 | 0)) {
                    b[6981] = b[6981] & ~(1 << d2);
                    break;
                  } else {
                    b[c2 + 12 >> 2] = a2;
                    b[a2 + 8 >> 2] = c2;
                    break;
                  }
                } else {
                  g2 = b[j + 24 >> 2] | 0;
                  a2 = b[j + 12 >> 2] | 0;
                  do {
                    if ((a2 | 0) == (j | 0)) {
                      c2 = j + 16 | 0;
                      d2 = c2 + 4 | 0;
                      a2 = b[d2 >> 2] | 0;
                      if (!a2) {
                        a2 = b[c2 >> 2] | 0;
                        if (!a2) {
                          d2 = 0;
                          break;
                        }
                      } else {
                        c2 = d2;
                      }
                      while (1) {
                        e2 = a2 + 20 | 0;
                        d2 = b[e2 >> 2] | 0;
                        if (!d2) {
                          e2 = a2 + 16 | 0;
                          d2 = b[e2 >> 2] | 0;
                          if (!d2) {
                            break;
                          } else {
                            a2 = d2;
                            c2 = e2;
                          }
                        } else {
                          a2 = d2;
                          c2 = e2;
                        }
                      }
                      b[c2 >> 2] = 0;
                      d2 = a2;
                    } else {
                      d2 = b[j + 8 >> 2] | 0;
                      b[d2 + 12 >> 2] = a2;
                      b[a2 + 8 >> 2] = d2;
                      d2 = a2;
                    }
                  } while (0);
                  if (g2 | 0) {
                    a2 = b[j + 28 >> 2] | 0;
                    c2 = 28228 + (a2 << 2) | 0;
                    if ((b[c2 >> 2] | 0) == (j | 0)) {
                      b[c2 >> 2] = d2;
                      if (!d2) {
                        b[6982] = b[6982] & ~(1 << a2);
                        break;
                      }
                    } else {
                      e2 = g2 + 16 | 0;
                      b[((b[e2 >> 2] | 0) == (j | 0) ? e2 : g2 + 20 | 0) >> 2] = d2;
                      if (!d2) {
                        break;
                      }
                    }
                    b[d2 + 24 >> 2] = g2;
                    a2 = j + 16 | 0;
                    c2 = b[a2 >> 2] | 0;
                    if (c2 | 0) {
                      b[d2 + 16 >> 2] = c2;
                      b[c2 + 24 >> 2] = d2;
                    }
                    a2 = b[a2 + 4 >> 2] | 0;
                    if (a2 | 0) {
                      b[d2 + 20 >> 2] = a2;
                      b[a2 + 24 >> 2] = d2;
                    }
                  }
                }
              } while (0);
              b[i + 4 >> 2] = f2 | 1;
              b[h + f2 >> 2] = f2;
              if ((i | 0) == (b[6986] | 0)) {
                b[6983] = f2;
                return;
              }
            } else {
              b[a2 >> 2] = e2 & -2;
              b[i + 4 >> 2] = c2 | 1;
              b[h + c2 >> 2] = c2;
              f2 = c2;
            }
            a2 = f2 >>> 3;
            if (f2 >>> 0 < 256) {
              d2 = 27964 + (a2 << 1 << 2) | 0;
              c2 = b[6981] | 0;
              a2 = 1 << a2;
              if (!(c2 & a2)) {
                b[6981] = c2 | a2;
                a2 = d2;
                c2 = d2 + 8 | 0;
              } else {
                c2 = d2 + 8 | 0;
                a2 = b[c2 >> 2] | 0;
              }
              b[c2 >> 2] = i;
              b[a2 + 12 >> 2] = i;
              b[i + 8 >> 2] = a2;
              b[i + 12 >> 2] = d2;
              return;
            }
            a2 = f2 >>> 8;
            if (a2) {
              if (f2 >>> 0 > 16777215) {
                e2 = 31;
              } else {
                h = (a2 + 1048320 | 0) >>> 16 & 8;
                j = a2 << h;
                g2 = (j + 520192 | 0) >>> 16 & 4;
                j = j << g2;
                e2 = (j + 245760 | 0) >>> 16 & 2;
                e2 = 14 - (g2 | h | e2) + (j << e2 >>> 15) | 0;
                e2 = f2 >>> (e2 + 7 | 0) & 1 | e2 << 1;
              }
            } else {
              e2 = 0;
            }
            a2 = 28228 + (e2 << 2) | 0;
            b[i + 28 >> 2] = e2;
            b[i + 20 >> 2] = 0;
            b[i + 16 >> 2] = 0;
            c2 = b[6982] | 0;
            d2 = 1 << e2;
            a: do {
              if (!(c2 & d2)) {
                b[6982] = c2 | d2;
                b[a2 >> 2] = i;
                b[i + 24 >> 2] = a2;
                b[i + 12 >> 2] = i;
                b[i + 8 >> 2] = i;
              } else {
                a2 = b[a2 >> 2] | 0;
                b: do {
                  if ((b[a2 + 4 >> 2] & -8 | 0) != (f2 | 0)) {
                    e2 = f2 << ((e2 | 0) == 31 ? 0 : 25 - (e2 >>> 1) | 0);
                    while (1) {
                      d2 = a2 + 16 + (e2 >>> 31 << 2) | 0;
                      c2 = b[d2 >> 2] | 0;
                      if (!c2) {
                        break;
                      }
                      if ((b[c2 + 4 >> 2] & -8 | 0) == (f2 | 0)) {
                        a2 = c2;
                        break b;
                      } else {
                        e2 = e2 << 1;
                        a2 = c2;
                      }
                    }
                    b[d2 >> 2] = i;
                    b[i + 24 >> 2] = a2;
                    b[i + 12 >> 2] = i;
                    b[i + 8 >> 2] = i;
                    break a;
                  }
                } while (0);
                h = a2 + 8 | 0;
                j = b[h >> 2] | 0;
                b[j + 12 >> 2] = i;
                b[h >> 2] = i;
                b[i + 8 >> 2] = j;
                b[i + 12 >> 2] = a2;
                b[i + 24 >> 2] = 0;
              }
            } while (0);
            j = (b[6989] | 0) + -1 | 0;
            b[6989] = j;
            if (j | 0) {
              return;
            }
            a2 = 28380;
            while (1) {
              a2 = b[a2 >> 2] | 0;
              if (!a2) {
                break;
              } else {
                a2 = a2 + 8 | 0;
              }
            }
            b[6989] = -1;
            return;
          }
          __name(Hd, "Hd");
          function Id(a2, c2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            var d2 = 0;
            if (a2) {
              d2 = B(c2, a2) | 0;
              if ((c2 | a2) >>> 0 > 65535) {
                d2 = ((d2 >>> 0) / (a2 >>> 0) | 0 | 0) == (c2 | 0) ? d2 : -1;
              }
            } else {
              d2 = 0;
            }
            a2 = Gd(d2) | 0;
            if (!a2) {
              return a2 | 0;
            }
            if (!(b[a2 + -4 >> 2] & 3)) {
              return a2 | 0;
            }
            _d(a2 | 0, 0, d2 | 0) | 0;
            return a2 | 0;
          }
          __name(Id, "Id");
          function Jd(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            c2 = a2 + c2 >>> 0;
            return (G(b2 + d2 + (c2 >>> 0 < a2 >>> 0 | 0) >>> 0 | 0), c2 | 0) | 0;
          }
          __name(Jd, "Jd");
          function Kd(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            d2 = b2 - d2 - (c2 >>> 0 > a2 >>> 0 | 0) >>> 0;
            return (G(d2 | 0), a2 - c2 >>> 0 | 0) | 0;
          }
          __name(Kd, "Kd");
          function Ld(a2) {
            a2 = a2 | 0;
            return (a2 ? 31 - (E(a2 ^ a2 - 1) | 0) | 0 : 32) | 0;
          }
          __name(Ld, "Ld");
          function Md(a2, c2, d2, e2, f2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            f2 = f2 | 0;
            var g2 = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p2 = 0;
            l = a2;
            j = c2;
            k = j;
            h = d2;
            n = e2;
            i = n;
            if (!k) {
              g2 = (f2 | 0) != 0;
              if (!i) {
                if (g2) {
                  b[f2 >> 2] = (l >>> 0) % (h >>> 0);
                  b[f2 + 4 >> 2] = 0;
                }
                n = 0;
                f2 = (l >>> 0) / (h >>> 0) >>> 0;
                return (G(n | 0), f2) | 0;
              } else {
                if (!g2) {
                  n = 0;
                  f2 = 0;
                  return (G(n | 0), f2) | 0;
                }
                b[f2 >> 2] = a2 | 0;
                b[f2 + 4 >> 2] = c2 & 0;
                n = 0;
                f2 = 0;
                return (G(n | 0), f2) | 0;
              }
            }
            g2 = (i | 0) == 0;
            do {
              if (h) {
                if (!g2) {
                  g2 = (E(i | 0) | 0) - (E(k | 0) | 0) | 0;
                  if (g2 >>> 0 <= 31) {
                    m = g2 + 1 | 0;
                    i = 31 - g2 | 0;
                    c2 = g2 - 31 >> 31;
                    h = m;
                    a2 = l >>> (m >>> 0) & c2 | k << i;
                    c2 = k >>> (m >>> 0) & c2;
                    g2 = 0;
                    i = l << i;
                    break;
                  }
                  if (!f2) {
                    n = 0;
                    f2 = 0;
                    return (G(n | 0), f2) | 0;
                  }
                  b[f2 >> 2] = a2 | 0;
                  b[f2 + 4 >> 2] = j | c2 & 0;
                  n = 0;
                  f2 = 0;
                  return (G(n | 0), f2) | 0;
                }
                g2 = h - 1 | 0;
                if (g2 & h | 0) {
                  i = (E(h | 0) | 0) + 33 - (E(k | 0) | 0) | 0;
                  p2 = 64 - i | 0;
                  m = 32 - i | 0;
                  j = m >> 31;
                  o = i - 32 | 0;
                  c2 = o >> 31;
                  h = i;
                  a2 = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & c2;
                  c2 = c2 & k >>> (i >>> 0);
                  g2 = l << p2 & j;
                  i = (k << p2 | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
                  break;
                }
                if (f2 | 0) {
                  b[f2 >> 2] = g2 & l;
                  b[f2 + 4 >> 2] = 0;
                }
                if ((h | 0) == 1) {
                  o = j | c2 & 0;
                  p2 = a2 | 0 | 0;
                  return (G(o | 0), p2) | 0;
                } else {
                  p2 = Ld(h | 0) | 0;
                  o = k >>> (p2 >>> 0) | 0;
                  p2 = k << 32 - p2 | l >>> (p2 >>> 0) | 0;
                  return (G(o | 0), p2) | 0;
                }
              } else {
                if (g2) {
                  if (f2 | 0) {
                    b[f2 >> 2] = (k >>> 0) % (h >>> 0);
                    b[f2 + 4 >> 2] = 0;
                  }
                  o = 0;
                  p2 = (k >>> 0) / (h >>> 0) >>> 0;
                  return (G(o | 0), p2) | 0;
                }
                if (!l) {
                  if (f2 | 0) {
                    b[f2 >> 2] = 0;
                    b[f2 + 4 >> 2] = (k >>> 0) % (i >>> 0);
                  }
                  o = 0;
                  p2 = (k >>> 0) / (i >>> 0) >>> 0;
                  return (G(o | 0), p2) | 0;
                }
                g2 = i - 1 | 0;
                if (!(g2 & i)) {
                  if (f2 | 0) {
                    b[f2 >> 2] = a2 | 0;
                    b[f2 + 4 >> 2] = g2 & k | c2 & 0;
                  }
                  o = 0;
                  p2 = k >>> ((Ld(i | 0) | 0) >>> 0);
                  return (G(o | 0), p2) | 0;
                }
                g2 = (E(i | 0) | 0) - (E(k | 0) | 0) | 0;
                if (g2 >>> 0 <= 30) {
                  c2 = g2 + 1 | 0;
                  i = 31 - g2 | 0;
                  h = c2;
                  a2 = k << i | l >>> (c2 >>> 0);
                  c2 = k >>> (c2 >>> 0);
                  g2 = 0;
                  i = l << i;
                  break;
                }
                if (!f2) {
                  o = 0;
                  p2 = 0;
                  return (G(o | 0), p2) | 0;
                }
                b[f2 >> 2] = a2 | 0;
                b[f2 + 4 >> 2] = j | c2 & 0;
                o = 0;
                p2 = 0;
                return (G(o | 0), p2) | 0;
              }
            } while (0);
            if (!h) {
              k = i;
              j = 0;
              i = 0;
            } else {
              m = d2 | 0 | 0;
              l = n | e2 & 0;
              k = Jd(m | 0, l | 0, -1, -1) | 0;
              d2 = H() | 0;
              j = i;
              i = 0;
              do {
                e2 = j;
                j = g2 >>> 31 | j << 1;
                g2 = i | g2 << 1;
                e2 = a2 << 1 | e2 >>> 31 | 0;
                n = a2 >>> 31 | c2 << 1 | 0;
                Kd(k | 0, d2 | 0, e2 | 0, n | 0) | 0;
                p2 = H() | 0;
                o = p2 >> 31 | ((p2 | 0) < 0 ? -1 : 0) << 1;
                i = o & 1;
                a2 = Kd(e2 | 0, n | 0, o & m | 0, (((p2 | 0) < 0 ? -1 : 0) >> 31 | ((p2 | 0) < 0 ? -1 : 0) << 1) & l | 0) | 0;
                c2 = H() | 0;
                h = h - 1 | 0;
              } while ((h | 0) != 0);
              k = j;
              j = 0;
            }
            h = 0;
            if (f2 | 0) {
              b[f2 >> 2] = a2;
              b[f2 + 4 >> 2] = c2;
            }
            o = (g2 | 0) >>> 31 | (k | h) << 1 | (h << 1 | g2 >>> 31) & 0 | j;
            p2 = (g2 << 1 | 0 >>> 31) & -2 | i;
            return (G(o | 0), p2) | 0;
          }
          __name(Md, "Md");
          function Nd(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0, g2 = 0, h = 0, i = 0, j = 0;
            j = b2 >> 31 | ((b2 | 0) < 0 ? -1 : 0) << 1;
            i = ((b2 | 0) < 0 ? -1 : 0) >> 31 | ((b2 | 0) < 0 ? -1 : 0) << 1;
            f2 = d2 >> 31 | ((d2 | 0) < 0 ? -1 : 0) << 1;
            e2 = ((d2 | 0) < 0 ? -1 : 0) >> 31 | ((d2 | 0) < 0 ? -1 : 0) << 1;
            h = Kd(j ^ a2 | 0, i ^ b2 | 0, j | 0, i | 0) | 0;
            g2 = H() | 0;
            a2 = f2 ^ j;
            b2 = e2 ^ i;
            return Kd((Md(h, g2, Kd(f2 ^ c2 | 0, e2 ^ d2 | 0, f2 | 0, e2 | 0) | 0, H() | 0, 0) | 0) ^ a2 | 0, (H() | 0) ^ b2 | 0, a2 | 0, b2 | 0) | 0;
          }
          __name(Nd, "Nd");
          function Od(a2, b2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            var c2 = 0, d2 = 0, e2 = 0, f2 = 0;
            f2 = a2 & 65535;
            e2 = b2 & 65535;
            c2 = B(e2, f2) | 0;
            d2 = a2 >>> 16;
            a2 = (c2 >>> 16) + (B(e2, d2) | 0) | 0;
            e2 = b2 >>> 16;
            b2 = B(e2, f2) | 0;
            return (G((a2 >>> 16) + (B(e2, d2) | 0) + (((a2 & 65535) + b2 | 0) >>> 16) | 0), a2 + b2 << 16 | c2 & 65535 | 0) | 0;
          }
          __name(Od, "Od");
          function Pd(a2, b2, c2, d2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            var e2 = 0, f2 = 0;
            e2 = a2;
            f2 = c2;
            c2 = Od(e2, f2) | 0;
            a2 = H() | 0;
            return (G((B(b2, f2) | 0) + (B(d2, e2) | 0) + a2 | a2 & 0 | 0), c2 | 0 | 0) | 0;
          }
          __name(Pd, "Pd");
          function Qd(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0, j = 0, k = 0;
            f2 = T;
            T = T + 16 | 0;
            i = f2 | 0;
            h = c2 >> 31 | ((c2 | 0) < 0 ? -1 : 0) << 1;
            g2 = ((c2 | 0) < 0 ? -1 : 0) >> 31 | ((c2 | 0) < 0 ? -1 : 0) << 1;
            k = e2 >> 31 | ((e2 | 0) < 0 ? -1 : 0) << 1;
            j = ((e2 | 0) < 0 ? -1 : 0) >> 31 | ((e2 | 0) < 0 ? -1 : 0) << 1;
            a2 = Kd(h ^ a2 | 0, g2 ^ c2 | 0, h | 0, g2 | 0) | 0;
            c2 = H() | 0;
            Md(a2, c2, Kd(k ^ d2 | 0, j ^ e2 | 0, k | 0, j | 0) | 0, H() | 0, i) | 0;
            e2 = Kd(b[i >> 2] ^ h | 0, b[i + 4 >> 2] ^ g2 | 0, h | 0, g2 | 0) | 0;
            d2 = H() | 0;
            T = f2;
            return (G(d2 | 0), e2) | 0;
          }
          __name(Qd, "Qd");
          function Rd(a2, c2, d2, e2) {
            a2 = a2 | 0;
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0;
            g2 = T;
            T = T + 16 | 0;
            f2 = g2 | 0;
            Md(a2, c2, d2, e2, f2) | 0;
            T = g2;
            return (G(b[f2 + 4 >> 2] | 0), b[f2 >> 2] | 0) | 0;
          }
          __name(Rd, "Rd");
          function Sd(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            if ((c2 | 0) < 32) {
              G(b2 >> c2 | 0);
              return a2 >>> c2 | (b2 & (1 << c2) - 1) << 32 - c2;
            }
            G(((b2 | 0) < 0 ? -1 : 0) | 0);
            return b2 >> c2 - 32 | 0;
          }
          __name(Sd, "Sd");
          function Td(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            if ((c2 | 0) < 32) {
              G(b2 >>> c2 | 0);
              return a2 >>> c2 | (b2 & (1 << c2) - 1) << 32 - c2;
            }
            G(0);
            return b2 >>> c2 - 32 | 0;
          }
          __name(Td, "Td");
          function Ud(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            if ((c2 | 0) < 32) {
              G(b2 << c2 | (a2 & (1 << c2) - 1 << 32 - c2) >>> 32 - c2 | 0);
              return a2 << c2;
            }
            G(a2 << c2 - 32 | 0);
            return 0;
          }
          __name(Ud, "Ud");
          function Vd(a2, b2, c2) {
            a2 = a2 | 0;
            b2 = b2 | 0;
            c2 = c2 | 0;
            b2 = E(b2) | 0;
            if ((b2 | 0) == 32) {
              b2 = b2 + (E(a2) | 0) | 0;
            }
            G(0);
            return b2 | 0;
          }
          __name(Vd, "Vd");
          function Wd(a2, b2) {
            a2 = +a2;
            b2 = +b2;
            if (a2 != a2) {
              return +b2;
            }
            if (b2 != b2) {
              return +a2;
            }
            return +D(+a2, +b2);
          }
          __name(Wd, "Wd");
          function Xd(a2, b2) {
            a2 = +a2;
            b2 = +b2;
            if (a2 != a2) {
              return +b2;
            }
            if (b2 != b2) {
              return +a2;
            }
            return +C(+a2, +b2);
          }
          __name(Xd, "Xd");
          function Yd(a2) {
            a2 = +a2;
            return a2 >= 0 ? +p(a2 + 0.5) : +A(a2 - 0.5);
          }
          __name(Yd, "Yd");
          function Zd(c2, d2, e2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0;
            if ((e2 | 0) >= 8192) {
              L(c2 | 0, d2 | 0, e2 | 0) | 0;
              return c2 | 0;
            }
            h = c2 | 0;
            g2 = c2 + e2 | 0;
            if ((c2 & 3) == (d2 & 3)) {
              while (c2 & 3) {
                if (!e2) {
                  return h | 0;
                }
                a[c2 >> 0] = a[d2 >> 0] | 0;
                c2 = c2 + 1 | 0;
                d2 = d2 + 1 | 0;
                e2 = e2 - 1 | 0;
              }
              e2 = g2 & -4 | 0;
              f2 = e2 - 64 | 0;
              while ((c2 | 0) <= (f2 | 0)) {
                b[c2 >> 2] = b[d2 >> 2];
                b[c2 + 4 >> 2] = b[d2 + 4 >> 2];
                b[c2 + 8 >> 2] = b[d2 + 8 >> 2];
                b[c2 + 12 >> 2] = b[d2 + 12 >> 2];
                b[c2 + 16 >> 2] = b[d2 + 16 >> 2];
                b[c2 + 20 >> 2] = b[d2 + 20 >> 2];
                b[c2 + 24 >> 2] = b[d2 + 24 >> 2];
                b[c2 + 28 >> 2] = b[d2 + 28 >> 2];
                b[c2 + 32 >> 2] = b[d2 + 32 >> 2];
                b[c2 + 36 >> 2] = b[d2 + 36 >> 2];
                b[c2 + 40 >> 2] = b[d2 + 40 >> 2];
                b[c2 + 44 >> 2] = b[d2 + 44 >> 2];
                b[c2 + 48 >> 2] = b[d2 + 48 >> 2];
                b[c2 + 52 >> 2] = b[d2 + 52 >> 2];
                b[c2 + 56 >> 2] = b[d2 + 56 >> 2];
                b[c2 + 60 >> 2] = b[d2 + 60 >> 2];
                c2 = c2 + 64 | 0;
                d2 = d2 + 64 | 0;
              }
              while ((c2 | 0) < (e2 | 0)) {
                b[c2 >> 2] = b[d2 >> 2];
                c2 = c2 + 4 | 0;
                d2 = d2 + 4 | 0;
              }
            } else {
              e2 = g2 - 4 | 0;
              while ((c2 | 0) < (e2 | 0)) {
                a[c2 >> 0] = a[d2 >> 0] | 0;
                a[c2 + 1 >> 0] = a[d2 + 1 >> 0] | 0;
                a[c2 + 2 >> 0] = a[d2 + 2 >> 0] | 0;
                a[c2 + 3 >> 0] = a[d2 + 3 >> 0] | 0;
                c2 = c2 + 4 | 0;
                d2 = d2 + 4 | 0;
              }
            }
            while ((c2 | 0) < (g2 | 0)) {
              a[c2 >> 0] = a[d2 >> 0] | 0;
              c2 = c2 + 1 | 0;
              d2 = d2 + 1 | 0;
            }
            return h | 0;
          }
          __name(Zd, "Zd");
          function _d(c2, d2, e2) {
            c2 = c2 | 0;
            d2 = d2 | 0;
            e2 = e2 | 0;
            var f2 = 0, g2 = 0, h = 0, i = 0;
            h = c2 + e2 | 0;
            d2 = d2 & 255;
            if ((e2 | 0) >= 67) {
              while (c2 & 3) {
                a[c2 >> 0] = d2;
                c2 = c2 + 1 | 0;
              }
              f2 = h & -4 | 0;
              i = d2 | d2 << 8 | d2 << 16 | d2 << 24;
              g2 = f2 - 64 | 0;
              while ((c2 | 0) <= (g2 | 0)) {
                b[c2 >> 2] = i;
                b[c2 + 4 >> 2] = i;
                b[c2 + 8 >> 2] = i;
                b[c2 + 12 >> 2] = i;
                b[c2 + 16 >> 2] = i;
                b[c2 + 20 >> 2] = i;
                b[c2 + 24 >> 2] = i;
                b[c2 + 28 >> 2] = i;
                b[c2 + 32 >> 2] = i;
                b[c2 + 36 >> 2] = i;
                b[c2 + 40 >> 2] = i;
                b[c2 + 44 >> 2] = i;
                b[c2 + 48 >> 2] = i;
                b[c2 + 52 >> 2] = i;
                b[c2 + 56 >> 2] = i;
                b[c2 + 60 >> 2] = i;
                c2 = c2 + 64 | 0;
              }
              while ((c2 | 0) < (f2 | 0)) {
                b[c2 >> 2] = i;
                c2 = c2 + 4 | 0;
              }
            }
            while ((c2 | 0) < (h | 0)) {
              a[c2 >> 0] = d2;
              c2 = c2 + 1 | 0;
            }
            return h - e2 | 0;
          }
          __name(_d, "_d");
          function $d(a2) {
            a2 = +a2;
            return a2 >= 0 ? +p(a2 + 0.5) : +A(a2 - 0.5);
          }
          __name($d, "$d");
          function ae(a2) {
            a2 = a2 | 0;
            var c2 = 0, d2 = 0, e2 = 0;
            e2 = K() | 0;
            d2 = b[g >> 2] | 0;
            c2 = d2 + a2 | 0;
            if ((a2 | 0) > 0 & (c2 | 0) < (d2 | 0) | (c2 | 0) < 0) {
              N(c2 | 0) | 0;
              J(12);
              return -1;
            }
            if ((c2 | 0) > (e2 | 0)) {
              if (!(M(c2 | 0) | 0)) {
                J(12);
                return -1;
              }
            }
            b[g >> 2] = c2;
            return d2 | 0;
          }
          __name(ae, "ae");
          return {
            ___divdi3: Nd,
            ___muldi3: Pd,
            ___remdi3: Qd,
            ___uremdi3: Rd,
            _areNeighborCells: ib,
            _bitshift64Ashr: Sd,
            _bitshift64Lshr: Td,
            _bitshift64Shl: Ud,
            _calloc: Id,
            _cellAreaKm2: Ac,
            _cellAreaM2: Bc,
            _cellAreaRads2: zc,
            _cellToBoundary: bc,
            _cellToCenterChild: Nb,
            _cellToChildPos: gc,
            _cellToChildren: Lb,
            _cellToChildrenSize: Jb,
            _cellToLatLng: ac,
            _cellToLocalIj: Mc,
            _cellToParent: Ib,
            _cellToVertex: td,
            _cellToVertexes: ud,
            _cellsToDirectedEdge: jb,
            _cellsToLinkedMultiPolygon: na,
            _childPosToCell: hc,
            _compactCells: Ob,
            _constructCell: Eb,
            _destroyLinkedMultiPolygon: Hc,
            _directedEdgeToBoundary: pb,
            _directedEdgeToCells: nb,
            _edgeLengthKm: Dc,
            _edgeLengthM: Ec,
            _edgeLengthRads: Cc,
            _emscripten_replace_memory: W,
            _free: Hd,
            _getBaseCellNumber: Cb,
            _getDirectedEdgeDestination: lb,
            _getDirectedEdgeOrigin: kb,
            _getHexagonAreaAvgKm2: tc,
            _getHexagonAreaAvgM2: uc,
            _getHexagonEdgeLengthAvgKm: vc,
            _getHexagonEdgeLengthAvgM: wc,
            _getIcosahedronFaces: dc,
            _getIndexDigit: Db,
            _getNumCells: xc,
            _getPentagons: fc,
            _getRes0Cells: ya,
            _getResolution: Bb,
            _greatCircleDistanceKm: pc,
            _greatCircleDistanceM: qc,
            _greatCircleDistanceRads: oc,
            _gridDisk: aa,
            _gridDiskDistances: ba,
            _gridDistance: Oc,
            _gridPathCells: Qc,
            _gridPathCellsSize: Pc,
            _gridRing: fa,
            _gridRingUnsafe: ga,
            _i64Add: Jd,
            _i64Subtract: Kd,
            _isPentagon: Kb,
            _isResClassIII: Rb,
            _isValidCell: Fb,
            _isValidDirectedEdge: mb,
            _isValidIndex: Gb,
            _isValidVertex: wd,
            _latLngToCell: Zb,
            _llvm_ctlz_i64: Vd,
            _llvm_maxnum_f64: Wd,
            _llvm_minnum_f64: Xd,
            _llvm_round_f64: Yd,
            _localIjToCell: Nc,
            _malloc: Gd,
            _maxFaceCount: cc,
            _maxGridDiskSize: $,
            _maxPolygonToCellsSize: ja,
            _maxPolygonToCellsSizeExperimental: Xc,
            _memcpy: Zd,
            _memset: _d,
            _originToDirectedEdges: ob,
            _pentagonCount: ec,
            _polygonToCells: la,
            _polygonToCellsExperimental: Wc,
            _readInt64AsDoubleFromPointer: ld,
            _res0CellCount: xa,
            _round: $d,
            _sbrk: ae,
            _sizeOfCellBoundary: gd,
            _sizeOfCoordIJ: kd,
            _sizeOfGeoLoop: hd,
            _sizeOfGeoPolygon: id,
            _sizeOfH3Index: ed,
            _sizeOfLatLng: fd,
            _sizeOfLinkedGeoPolygon: jd,
            _uncompactCells: Pb,
            _uncompactCellsSize: Qb,
            _vertexToLatLng: vd,
            establishStackSpace: _,
            stackAlloc: X,
            stackRestore: Z,
            stackSave: Y
          };
        })(asmGlobalArg, asmLibraryArg, buffer)
      );
      var ___divdi3 = Module["___divdi3"] = asm["___divdi3"];
      var ___muldi3 = Module["___muldi3"] = asm["___muldi3"];
      var ___remdi3 = Module["___remdi3"] = asm["___remdi3"];
      var ___uremdi3 = Module["___uremdi3"] = asm["___uremdi3"];
      var _areNeighborCells = Module["_areNeighborCells"] = asm["_areNeighborCells"];
      var _bitshift64Ashr = Module["_bitshift64Ashr"] = asm["_bitshift64Ashr"];
      var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
      var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
      var _calloc = Module["_calloc"] = asm["_calloc"];
      var _cellAreaKm2 = Module["_cellAreaKm2"] = asm["_cellAreaKm2"];
      var _cellAreaM2 = Module["_cellAreaM2"] = asm["_cellAreaM2"];
      var _cellAreaRads2 = Module["_cellAreaRads2"] = asm["_cellAreaRads2"];
      var _cellToBoundary = Module["_cellToBoundary"] = asm["_cellToBoundary"];
      var _cellToCenterChild = Module["_cellToCenterChild"] = asm["_cellToCenterChild"];
      var _cellToChildPos = Module["_cellToChildPos"] = asm["_cellToChildPos"];
      var _cellToChildren = Module["_cellToChildren"] = asm["_cellToChildren"];
      var _cellToChildrenSize = Module["_cellToChildrenSize"] = asm["_cellToChildrenSize"];
      var _cellToLatLng = Module["_cellToLatLng"] = asm["_cellToLatLng"];
      var _cellToLocalIj = Module["_cellToLocalIj"] = asm["_cellToLocalIj"];
      var _cellToParent = Module["_cellToParent"] = asm["_cellToParent"];
      var _cellToVertex = Module["_cellToVertex"] = asm["_cellToVertex"];
      var _cellToVertexes = Module["_cellToVertexes"] = asm["_cellToVertexes"];
      var _cellsToDirectedEdge = Module["_cellsToDirectedEdge"] = asm["_cellsToDirectedEdge"];
      var _cellsToLinkedMultiPolygon = Module["_cellsToLinkedMultiPolygon"] = asm["_cellsToLinkedMultiPolygon"];
      var _childPosToCell = Module["_childPosToCell"] = asm["_childPosToCell"];
      var _compactCells = Module["_compactCells"] = asm["_compactCells"];
      var _constructCell = Module["_constructCell"] = asm["_constructCell"];
      var _destroyLinkedMultiPolygon = Module["_destroyLinkedMultiPolygon"] = asm["_destroyLinkedMultiPolygon"];
      var _directedEdgeToBoundary = Module["_directedEdgeToBoundary"] = asm["_directedEdgeToBoundary"];
      var _directedEdgeToCells = Module["_directedEdgeToCells"] = asm["_directedEdgeToCells"];
      var _edgeLengthKm = Module["_edgeLengthKm"] = asm["_edgeLengthKm"];
      var _edgeLengthM = Module["_edgeLengthM"] = asm["_edgeLengthM"];
      var _edgeLengthRads = Module["_edgeLengthRads"] = asm["_edgeLengthRads"];
      var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = asm["_emscripten_replace_memory"];
      var _free = Module["_free"] = asm["_free"];
      var _getBaseCellNumber = Module["_getBaseCellNumber"] = asm["_getBaseCellNumber"];
      var _getDirectedEdgeDestination = Module["_getDirectedEdgeDestination"] = asm["_getDirectedEdgeDestination"];
      var _getDirectedEdgeOrigin = Module["_getDirectedEdgeOrigin"] = asm["_getDirectedEdgeOrigin"];
      var _getHexagonAreaAvgKm2 = Module["_getHexagonAreaAvgKm2"] = asm["_getHexagonAreaAvgKm2"];
      var _getHexagonAreaAvgM2 = Module["_getHexagonAreaAvgM2"] = asm["_getHexagonAreaAvgM2"];
      var _getHexagonEdgeLengthAvgKm = Module["_getHexagonEdgeLengthAvgKm"] = asm["_getHexagonEdgeLengthAvgKm"];
      var _getHexagonEdgeLengthAvgM = Module["_getHexagonEdgeLengthAvgM"] = asm["_getHexagonEdgeLengthAvgM"];
      var _getIcosahedronFaces = Module["_getIcosahedronFaces"] = asm["_getIcosahedronFaces"];
      var _getIndexDigit = Module["_getIndexDigit"] = asm["_getIndexDigit"];
      var _getNumCells = Module["_getNumCells"] = asm["_getNumCells"];
      var _getPentagons = Module["_getPentagons"] = asm["_getPentagons"];
      var _getRes0Cells = Module["_getRes0Cells"] = asm["_getRes0Cells"];
      var _getResolution = Module["_getResolution"] = asm["_getResolution"];
      var _greatCircleDistanceKm = Module["_greatCircleDistanceKm"] = asm["_greatCircleDistanceKm"];
      var _greatCircleDistanceM = Module["_greatCircleDistanceM"] = asm["_greatCircleDistanceM"];
      var _greatCircleDistanceRads = Module["_greatCircleDistanceRads"] = asm["_greatCircleDistanceRads"];
      var _gridDisk = Module["_gridDisk"] = asm["_gridDisk"];
      var _gridDiskDistances = Module["_gridDiskDistances"] = asm["_gridDiskDistances"];
      var _gridDistance = Module["_gridDistance"] = asm["_gridDistance"];
      var _gridPathCells = Module["_gridPathCells"] = asm["_gridPathCells"];
      var _gridPathCellsSize = Module["_gridPathCellsSize"] = asm["_gridPathCellsSize"];
      var _gridRing = Module["_gridRing"] = asm["_gridRing"];
      var _gridRingUnsafe = Module["_gridRingUnsafe"] = asm["_gridRingUnsafe"];
      var _i64Add = Module["_i64Add"] = asm["_i64Add"];
      var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
      var _isPentagon = Module["_isPentagon"] = asm["_isPentagon"];
      var _isResClassIII = Module["_isResClassIII"] = asm["_isResClassIII"];
      var _isValidCell = Module["_isValidCell"] = asm["_isValidCell"];
      var _isValidDirectedEdge = Module["_isValidDirectedEdge"] = asm["_isValidDirectedEdge"];
      var _isValidIndex = Module["_isValidIndex"] = asm["_isValidIndex"];
      var _isValidVertex = Module["_isValidVertex"] = asm["_isValidVertex"];
      var _latLngToCell = Module["_latLngToCell"] = asm["_latLngToCell"];
      var _llvm_ctlz_i64 = Module["_llvm_ctlz_i64"] = asm["_llvm_ctlz_i64"];
      var _llvm_maxnum_f64 = Module["_llvm_maxnum_f64"] = asm["_llvm_maxnum_f64"];
      var _llvm_minnum_f64 = Module["_llvm_minnum_f64"] = asm["_llvm_minnum_f64"];
      var _llvm_round_f64 = Module["_llvm_round_f64"] = asm["_llvm_round_f64"];
      var _localIjToCell = Module["_localIjToCell"] = asm["_localIjToCell"];
      var _malloc = Module["_malloc"] = asm["_malloc"];
      var _maxFaceCount = Module["_maxFaceCount"] = asm["_maxFaceCount"];
      var _maxGridDiskSize = Module["_maxGridDiskSize"] = asm["_maxGridDiskSize"];
      var _maxPolygonToCellsSize = Module["_maxPolygonToCellsSize"] = asm["_maxPolygonToCellsSize"];
      var _maxPolygonToCellsSizeExperimental = Module["_maxPolygonToCellsSizeExperimental"] = asm["_maxPolygonToCellsSizeExperimental"];
      var _memcpy = Module["_memcpy"] = asm["_memcpy"];
      var _memset = Module["_memset"] = asm["_memset"];
      var _originToDirectedEdges = Module["_originToDirectedEdges"] = asm["_originToDirectedEdges"];
      var _pentagonCount = Module["_pentagonCount"] = asm["_pentagonCount"];
      var _polygonToCells = Module["_polygonToCells"] = asm["_polygonToCells"];
      var _polygonToCellsExperimental = Module["_polygonToCellsExperimental"] = asm["_polygonToCellsExperimental"];
      var _readInt64AsDoubleFromPointer = Module["_readInt64AsDoubleFromPointer"] = asm["_readInt64AsDoubleFromPointer"];
      var _res0CellCount = Module["_res0CellCount"] = asm["_res0CellCount"];
      var _round = Module["_round"] = asm["_round"];
      var _sbrk = Module["_sbrk"] = asm["_sbrk"];
      var _sizeOfCellBoundary = Module["_sizeOfCellBoundary"] = asm["_sizeOfCellBoundary"];
      var _sizeOfCoordIJ = Module["_sizeOfCoordIJ"] = asm["_sizeOfCoordIJ"];
      var _sizeOfGeoLoop = Module["_sizeOfGeoLoop"] = asm["_sizeOfGeoLoop"];
      var _sizeOfGeoPolygon = Module["_sizeOfGeoPolygon"] = asm["_sizeOfGeoPolygon"];
      var _sizeOfH3Index = Module["_sizeOfH3Index"] = asm["_sizeOfH3Index"];
      var _sizeOfLatLng = Module["_sizeOfLatLng"] = asm["_sizeOfLatLng"];
      var _sizeOfLinkedGeoPolygon = Module["_sizeOfLinkedGeoPolygon"] = asm["_sizeOfLinkedGeoPolygon"];
      var _uncompactCells = Module["_uncompactCells"] = asm["_uncompactCells"];
      var _uncompactCellsSize = Module["_uncompactCellsSize"] = asm["_uncompactCellsSize"];
      var _vertexToLatLng = Module["_vertexToLatLng"] = asm["_vertexToLatLng"];
      var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
      var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
      var stackRestore = Module["stackRestore"] = asm["stackRestore"];
      var stackSave = Module["stackSave"] = asm["stackSave"];
      Module["asm"] = asm;
      Module["cwrap"] = cwrap;
      Module["setValue"] = setValue;
      Module["getValue"] = getValue;
      if (memoryInitializer) {
        if (!isDataURI(memoryInitializer)) {
          memoryInitializer = locateFile(memoryInitializer);
        }
        {
          addRunDependency("memory initializer");
          var applyMemoryInitializer = /* @__PURE__ */ __name(function(data) {
            if (data.byteLength) {
              data = new Uint8Array(data);
            }
            HEAPU8.set(data, GLOBAL_BASE);
            if (Module["memoryInitializerRequest"]) {
              delete Module["memoryInitializerRequest"].response;
            }
            removeRunDependency("memory initializer");
          }, "applyMemoryInitializer");
          var doBrowserLoad = /* @__PURE__ */ __name(function() {
            readAsync(memoryInitializer, applyMemoryInitializer, function() {
              throw "could not load memory initializer " + memoryInitializer;
            });
          }, "doBrowserLoad");
          var memoryInitializerBytes = tryParseAsDataURI(memoryInitializer);
          if (memoryInitializerBytes) {
            applyMemoryInitializer(memoryInitializerBytes.buffer);
          } else if (Module["memoryInitializerRequest"]) {
            var useRequest = /* @__PURE__ */ __name(function() {
              var request = Module["memoryInitializerRequest"];
              var response = request.response;
              if (request.status !== 200 && request.status !== 0) {
                var data = tryParseAsDataURI(Module["memoryInitializerRequestURL"]);
                if (data) {
                  response = data.buffer;
                } else {
                  console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + request.status + ", retrying " + memoryInitializer);
                  doBrowserLoad();
                  return;
                }
              }
              applyMemoryInitializer(response);
            }, "useRequest");
            if (Module["memoryInitializerRequest"].response) {
              setTimeout(useRequest, 0);
            } else {
              Module["memoryInitializerRequest"].addEventListener("load", useRequest);
            }
          } else {
            doBrowserLoad();
          }
        }
      }
      var calledRun;
      dependenciesFulfilled = /* @__PURE__ */ __name(function runCaller() {
        if (!calledRun) {
          run();
        }
        if (!calledRun) {
          dependenciesFulfilled = runCaller;
        }
      }, "runCaller");
      function run(args) {
        args = args || arguments_;
        if (runDependencies > 0) {
          return;
        }
        preRun();
        if (runDependencies > 0) {
          return;
        }
        function doRun() {
          if (calledRun) {
            return;
          }
          calledRun = true;
          if (ABORT) {
            return;
          }
          initRuntime();
          preMain();
          if (Module["onRuntimeInitialized"]) {
            Module["onRuntimeInitialized"]();
          }
          postRun();
        }
        __name(doRun, "doRun");
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function() {
            setTimeout(function() {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      __name(run, "run");
      Module["run"] = run;
      function abort(what) {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
        what += "";
        out(what);
        err(what);
        ABORT = true;
        throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
      }
      __name(abort, "abort");
      Module["abort"] = abort;
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") {
          Module["preInit"] = [Module["preInit"]];
        }
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      run();
      return libh32;
    })(typeof libh3 === "object" ? libh3 : {});
    NUMBER = "number";
    H3_ERROR = NUMBER;
    BOOLEAN = NUMBER;
    H3_LOWER = NUMBER;
    H3_UPPER = NUMBER;
    RESOLUTION = NUMBER;
    POINTER = NUMBER;
    BINDINGS = [
      // The size functions are inserted via build/sizes.h
      ["sizeOfH3Index", NUMBER],
      ["sizeOfLatLng", NUMBER],
      ["sizeOfCellBoundary", NUMBER],
      ["sizeOfGeoLoop", NUMBER],
      ["sizeOfGeoPolygon", NUMBER],
      ["sizeOfLinkedGeoPolygon", NUMBER],
      ["sizeOfCoordIJ", NUMBER],
      ["readInt64AsDoubleFromPointer", NUMBER],
      // The remaining functions are defined in the core lib in h3Api.h
      ["isValidCell", BOOLEAN, [H3_LOWER, H3_UPPER]],
      ["isValidIndex", BOOLEAN, [H3_LOWER, H3_UPPER]],
      ["latLngToCell", H3_ERROR, [NUMBER, NUMBER, RESOLUTION, POINTER]],
      ["cellToLatLng", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["cellToBoundary", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["maxGridDiskSize", H3_ERROR, [NUMBER, POINTER]],
      ["gridDisk", H3_ERROR, [H3_LOWER, H3_UPPER, NUMBER, POINTER]],
      ["gridDiskDistances", H3_ERROR, [H3_LOWER, H3_UPPER, NUMBER, POINTER, POINTER]],
      ["gridRing", H3_ERROR, [H3_LOWER, H3_UPPER, NUMBER, POINTER]],
      ["gridRingUnsafe", H3_ERROR, [H3_LOWER, H3_UPPER, NUMBER, POINTER]],
      ["maxPolygonToCellsSize", H3_ERROR, [POINTER, RESOLUTION, NUMBER, POINTER]],
      ["polygonToCells", H3_ERROR, [POINTER, RESOLUTION, NUMBER, POINTER]],
      ["maxPolygonToCellsSizeExperimental", H3_ERROR, [POINTER, RESOLUTION, NUMBER, POINTER]],
      ["polygonToCellsExperimental", H3_ERROR, [POINTER, RESOLUTION, NUMBER, NUMBER, NUMBER, POINTER]],
      ["cellsToLinkedMultiPolygon", H3_ERROR, [POINTER, NUMBER, POINTER]],
      ["destroyLinkedMultiPolygon", null, [POINTER]],
      ["compactCells", H3_ERROR, [POINTER, POINTER, NUMBER, NUMBER]],
      ["uncompactCells", H3_ERROR, [POINTER, NUMBER, NUMBER, POINTER, NUMBER, RESOLUTION]],
      ["uncompactCellsSize", H3_ERROR, [POINTER, NUMBER, NUMBER, RESOLUTION, POINTER]],
      ["isPentagon", BOOLEAN, [H3_LOWER, H3_UPPER]],
      ["isResClassIII", BOOLEAN, [H3_LOWER, H3_UPPER]],
      ["getBaseCellNumber", NUMBER, [H3_LOWER, H3_UPPER]],
      ["getResolution", NUMBER, [H3_LOWER, H3_UPPER]],
      ["getIndexDigit", NUMBER, [H3_LOWER, H3_UPPER, NUMBER]],
      ["constructCell", H3_ERROR, [NUMBER, NUMBER, POINTER, POINTER]],
      ["maxFaceCount", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["getIcosahedronFaces", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["cellToParent", H3_ERROR, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["cellToChildren", H3_ERROR, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["cellToCenterChild", H3_ERROR, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["cellToChildrenSize", H3_ERROR, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["cellToChildPos", H3_ERROR, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["childPosToCell", H3_ERROR, [NUMBER, NUMBER, H3_LOWER, H3_UPPER, RESOLUTION, POINTER]],
      ["areNeighborCells", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]],
      ["cellsToDirectedEdge", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]],
      ["getDirectedEdgeOrigin", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["getDirectedEdgeDestination", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["isValidDirectedEdge", BOOLEAN, [H3_LOWER, H3_UPPER]],
      ["directedEdgeToCells", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["originToDirectedEdges", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["directedEdgeToBoundary", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["gridDistance", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]],
      ["gridPathCells", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]],
      ["gridPathCellsSize", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]],
      ["cellToLocalIj", H3_ERROR, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, NUMBER, POINTER]],
      ["localIjToCell", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER, NUMBER, POINTER]],
      ["getHexagonAreaAvgM2", H3_ERROR, [RESOLUTION, POINTER]],
      ["getHexagonAreaAvgKm2", H3_ERROR, [RESOLUTION, POINTER]],
      ["getHexagonEdgeLengthAvgM", H3_ERROR, [RESOLUTION, POINTER]],
      ["getHexagonEdgeLengthAvgKm", H3_ERROR, [RESOLUTION, POINTER]],
      ["greatCircleDistanceM", NUMBER, [POINTER, POINTER]],
      ["greatCircleDistanceKm", NUMBER, [POINTER, POINTER]],
      ["greatCircleDistanceRads", NUMBER, [POINTER, POINTER]],
      ["cellAreaM2", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["cellAreaKm2", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["cellAreaRads2", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["edgeLengthM", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["edgeLengthKm", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["edgeLengthRads", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["getNumCells", H3_ERROR, [RESOLUTION, POINTER]],
      ["getRes0Cells", H3_ERROR, [POINTER]],
      ["res0CellCount", NUMBER],
      ["getPentagons", H3_ERROR, [NUMBER, POINTER]],
      ["pentagonCount", NUMBER],
      ["cellToVertex", H3_ERROR, [H3_LOWER, H3_UPPER, NUMBER, POINTER]],
      ["cellToVertexes", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["vertexToLatLng", H3_ERROR, [H3_LOWER, H3_UPPER, POINTER]],
      ["isValidVertex", BOOLEAN, [H3_LOWER, H3_UPPER]]
    ];
    E_SUCCESS = 0;
    E_FAILED = 1;
    E_DOMAIN = 2;
    E_LATLNG_DOMAIN = 3;
    E_RES_DOMAIN = 4;
    E_CELL_INVALID = 5;
    E_DIR_EDGE_INVALID = 6;
    E_UNDIR_EDGE_INVALID = 7;
    E_VERTEX_INVALID = 8;
    E_PENTAGON = 9;
    E_DUPLICATE_INPUT = 10;
    E_NOT_NEIGHBORS = 11;
    E_RES_MISMATCH = 12;
    E_MEMORY_ALLOC = 13;
    E_MEMORY_BOUNDS = 14;
    E_OPTION_INVALID = 15;
    E_INDEX_INVALID = 16;
    E_BASE_CELL_DOMAIN = 17;
    E_DIGIT_DOMAIN = 18;
    E_DELETED_DIGIT = 19;
    H3_ERROR_MSGS = {};
    H3_ERROR_MSGS[E_SUCCESS] = "Success";
    H3_ERROR_MSGS[E_FAILED] = "The operation failed but a more specific error is not available";
    H3_ERROR_MSGS[E_DOMAIN] = "Argument was outside of acceptable range";
    H3_ERROR_MSGS[E_LATLNG_DOMAIN] = "Latitude or longitude arguments were outside of acceptable range";
    H3_ERROR_MSGS[E_RES_DOMAIN] = "Resolution argument was outside of acceptable range";
    H3_ERROR_MSGS[E_CELL_INVALID] = "Cell argument was not valid";
    H3_ERROR_MSGS[E_DIR_EDGE_INVALID] = "Directed edge argument was not valid";
    H3_ERROR_MSGS[E_UNDIR_EDGE_INVALID] = "Undirected edge argument was not valid";
    H3_ERROR_MSGS[E_VERTEX_INVALID] = "Vertex argument was not valid";
    H3_ERROR_MSGS[E_PENTAGON] = "Pentagon distortion was encountered";
    H3_ERROR_MSGS[E_DUPLICATE_INPUT] = "Duplicate input";
    H3_ERROR_MSGS[E_NOT_NEIGHBORS] = "Cell arguments were not neighbors";
    H3_ERROR_MSGS[E_RES_MISMATCH] = "Cell arguments had incompatible resolutions";
    H3_ERROR_MSGS[E_MEMORY_ALLOC] = "Memory allocation failed";
    H3_ERROR_MSGS[E_MEMORY_BOUNDS] = "Bounds of provided memory were insufficient";
    H3_ERROR_MSGS[E_OPTION_INVALID] = "Mode or flags argument was not valid";
    H3_ERROR_MSGS[E_INDEX_INVALID] = "Index argument was not valid";
    H3_ERROR_MSGS[E_BASE_CELL_DOMAIN] = "Base cell number was outside of acceptable range";
    H3_ERROR_MSGS[E_DIGIT_DOMAIN] = "Child indexing digits invalid";
    H3_ERROR_MSGS[E_DELETED_DIGIT] = "Child indexing digits refer to a deleted subsequence";
    E_UNKNOWN_UNIT = 1e3;
    E_ARRAY_LENGTH = 1001;
    E_NULL_INDEX = 1002;
    JS_ERROR_MESSAGES = {};
    JS_ERROR_MESSAGES[E_UNKNOWN_UNIT] = "Unknown unit";
    JS_ERROR_MESSAGES[E_ARRAY_LENGTH] = "Array length out of bounds";
    JS_ERROR_MESSAGES[E_NULL_INDEX] = "Got unexpected null value for H3 index";
    UNKNOWN_ERROR_MSG = "Unknown error";
    __name(createError, "createError");
    __name(H3LibraryError, "H3LibraryError");
    __name(JSBindingError, "JSBindingError");
    __name(throwIfError, "throwIfError");
    H3 = {};
    BINDINGS.forEach(/* @__PURE__ */ __name(function bind(def) {
      H3[def[0]] = libh3.cwrap.apply(libh3, def);
    }, "bind"));
    BASE_16 = 16;
    SZ_INT = 4;
    SZ_DBL = 8;
    SZ_INT64 = 8;
    SZ_H3INDEX = H3.sizeOfH3Index();
    SZ_LATLNG = H3.sizeOfLatLng();
    SZ_CELLBOUNDARY = H3.sizeOfCellBoundary();
    SZ_GEOPOLYGON = H3.sizeOfGeoPolygon();
    SZ_GEOLOOP = H3.sizeOfGeoLoop();
    SZ_LINKED_GEOPOLYGON = H3.sizeOfLinkedGeoPolygon();
    SZ_COORDIJ = H3.sizeOfCoordIJ();
    __name(validateH3Index, "validateH3Index");
    MAX_JS_ARRAY_LENGTH = Math.pow(2, 32) - 1;
    __name(validateArrayLength, "validateArrayLength");
    INVALID_HEXIDECIMAL_CHAR = /[^0-9a-fA-F]/;
    __name(h3IndexToSplitLong, "h3IndexToSplitLong");
    __name(hexFrom32Bit, "hexFrom32Bit");
    __name(splitLongToH3Index, "splitLongToH3Index");
    __name(zeroPad, "zeroPad");
    UPPER_BIT_DIVISOR = Math.pow(2, 32);
    __name(readH3IndexFromPointer, "readH3IndexFromPointer");
    __name(readInt64AsDoubleFromPointer, "readInt64AsDoubleFromPointer");
    __name(readArrayOfH3Indexes, "readArrayOfH3Indexes");
    __name(latLngToCell, "latLngToCell");
    __name(gridDisk, "gridDisk");
    __name(degsToRads, "degsToRads");
  }
});

// api/[[path]].js
var app, H3_RESOLUTION, onRequest;
var init_path = __esm({
  "api/[[path]].js"() {
    init_functionsRoutes_0_9257778137001627();
    init_checked_fetch();
    init_dist();
    init_cloudflare_pages();
    init_bcryptjs();
    init_h3_js_es();
    app = new Hono2().basePath("/api");
    app.onError((err, c) => {
      console.error("SERVER_ERROR:", err);
      return c.json({ error: err.message, stack: err.stack }, 500);
    });
    H3_RESOLUTION = 7;
    app.post("/auth/signin", async (c) => {
      const { email, password } = await c.req.json();
      const db = c.env.DB;
      const user = await db.prepare("SELECT * FROM businesses WHERE email = ?").bind(email.toLowerCase()).first();
      if (!user) return c.json({ error: "User not found" }, 401);
      if (user.is_suspended === 1) return c.json({ error: "Account suspended" }, 403);
      const isValid = bcryptjs_default.compareSync(password, user.password_hash);
      if (!isValid) return c.json({ error: "Invalid credentials" }, 401);
      return c.json({
        user: { id: user.id },
        business: user,
        isAdmin: !!user.is_admin
      });
    });
    app.post("/auth/signup", async (c) => {
      console.log("API: Processing Signup...");
      const data = await c.req.json();
      const db = c.env.DB;
      const id = crypto.randomUUID();
      const hash2 = bcryptjs_default.hashSync(data.password, 10);
      let h3Index = null;
      if (data.lat && data.lng) {
        h3Index = latLngToCell(data.lat, data.lng, H3_RESOLUTION);
      } else {
        h3Index = latLngToCell(0.3476, 32.5825, H3_RESOLUTION);
      }
      try {
        await db.prepare(`
      INSERT INTO businesses (id, name, owner_name, email, phone, sector, password_hash, lat, lng, h3_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, data.name, data.owner_name, data.email.toLowerCase(), data.phone, data.sector, hash2, data.lat || null, data.lng || null, h3Index).run();
        const user = await db.prepare("SELECT * FROM businesses WHERE id = ?").bind(id).first();
        return c.json({ user: { id }, business: user });
      } catch (err) {
        if (err.message.includes("UNIQUE")) return c.json({ error: "Email already exists" }, 400);
        throw err;
      }
    });
    app.get("/search", async (c) => {
      const q = c.req.query("q") || "";
      const latStr = c.req.query("lat");
      const lngStr = c.req.query("lng");
      const db = c.env.DB;
      if (!latStr || !lngStr) {
        const results = await db.prepare(`
      SELECT b.id as business_id, b.name as business_name, b.lat, b.lng, b.whatsapp, b.phone, b.is_open,
             l.id as item_id, l.name as item_name, l.price, l.type
      FROM businesses b
      JOIN listings l ON b.id = l.business_id
      WHERE (b.name LIKE ? OR l.name LIKE ?) 
      AND b.subscription_status = 'active' AND b.is_suspended = 0
    `).bind(`%${q}%`, `%${q}%`).all();
        return c.json(results.results);
      }
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      const centerH3 = latLngToCell(lat, lng, H3_RESOLUTION);
      let matchingH3s = [];
      let found = [];
      for (let ring = 0; ring <= 2; ring++) {
        matchingH3s = gridDisk(centerH3, ring);
        const placeholders = matchingH3s.map(() => "?").join(",");
        const results = await db.prepare(`
      SELECT b.id as business_id, b.name as business_name, b.lat, b.lng, b.whatsapp, b.phone, b.is_open,
             l.id as item_id, l.name as item_name, l.price, l.type
      FROM businesses b
      JOIN listings l ON b.id = l.business_id
      WHERE (b.name LIKE ? OR l.name LIKE ?) 
      AND b.h3_index IN (${placeholders})
      AND b.subscription_status = 'active' AND b.is_suspended = 0
    `).bind(`%${q}%`, `%${q}%`, ...matchingH3s).all();
        if (results.results.length > 0) {
          found = results.results;
          break;
        }
      }
      return c.json(found);
    });
    app.get("/listings/:bizId", async (c) => {
      const bizId = c.req.param("bizId");
      const result = await c.env.DB.prepare("SELECT * FROM listings WHERE business_id = ? ORDER BY created_at DESC").bind(bizId).all();
      return c.json(result.results);
    });
    app.post("/listings", async (c) => {
      const { business_id, name, type, price } = await c.req.json();
      const id = crypto.randomUUID();
      await c.env.DB.prepare(`
    INSERT INTO listings (id, business_id, name, type, price, available)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, business_id, name, type, parseFloat(price), 1).run();
      return c.json({ success: true, id });
    });
    app.delete("/listings/:id", async (c) => {
      const id = c.req.param("id");
      await c.env.DB.prepare("DELETE FROM listings WHERE id = ?").bind(id).run();
      return c.json({ success: true });
    });
    app.patch("/listings/:id/toggle", async (c) => {
      const id = c.req.param("id");
      await c.env.DB.prepare("UPDATE listings SET available = 1 - available WHERE id = ?").bind(id).run();
      return c.json({ success: true });
    });
    app.get("/admin/businesses", async (c) => {
      const result = await c.env.DB.prepare("SELECT * FROM businesses ORDER BY created_at DESC").all();
      return c.json(result.results);
    });
    app.patch("/admin/businesses/:id/status", async (c) => {
      const id = c.req.param("id");
      const { is_suspended } = await c.req.json();
      await c.env.DB.prepare("UPDATE businesses SET is_suspended = ? WHERE id = ?").bind(is_suspended, id).run();
      return c.json({ success: true });
    });
    onRequest = handle(app);
  }
});

// ../.wrangler/tmp/pages-KjqYBS/functionsRoutes-0.9257778137001627.mjs
var routes;
var init_functionsRoutes_0_9257778137001627 = __esm({
  "../.wrangler/tmp/pages-KjqYBS/functionsRoutes-0.9257778137001627.mjs"() {
    init_path();
    routes = [
      {
        routePath: "/api/:path*",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest]
      }
    ];
  }
});

// ../.wrangler/tmp/bundle-LN7Zhz/middleware-loader.entry.ts
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();

// ../.wrangler/tmp/bundle-LN7Zhz/middleware-insertion-facade.js
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();

// ../node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();

// ../node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match2(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match2, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match2(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match2(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match2(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match2(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-LN7Zhz/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
init_functionsRoutes_0_9257778137001627();
init_checked_fetch();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-LN7Zhz/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.13521429549329889.mjs.map
