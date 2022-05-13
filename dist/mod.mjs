// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function addSignalListener(...args) {
    if (typeof Deno.addSignalListener == "function") {
        return Deno.addSignalListener(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function createHttpClient(...args) {
    if (typeof Deno.createHttpClient == "function") {
        return Deno.createHttpClient(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function consoleSize(...args) {
    if (typeof Deno.consoleSize == "function") {
        return Deno.consoleSize(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function futime(...args) {
    if (typeof Deno.futime == "function") {
        return Deno.futime(...args);
    } else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
function futimeSync(...args) {
    if (typeof Deno.futimeSync == "function") {
        return Deno.futimeSync(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function getUid(...args) {
    if (typeof Deno.getUid == "function") {
        return Deno.getUid(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function hostname(...args) {
    if (typeof Deno.hostname == "function") {
        return Deno.hostname(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function loadavg(...args) {
    if (typeof Deno.loadavg == "function") {
        return Deno.loadavg(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function osRelease(...args) {
    if (typeof Deno.osRelease == "function") {
        return Deno.osRelease(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function removeSignalListener(...args) {
    if (typeof Deno.removeSignalListener == "function") {
        return Deno.removeSignalListener(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function setRaw(...args) {
    if (typeof Deno.setRaw == "function") {
        return Deno.setRaw(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function systemMemoryInfo(...args) {
    if (typeof Deno.systemMemoryInfo == "function") {
        return Deno.systemMemoryInfo(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function utime(...args) {
    if (typeof Deno.utime == "function") {
        return Deno.utime(...args);
    } else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
function utimeSync(...args) {
    if (typeof Deno.utimeSync == "function") {
        return Deno.utimeSync(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function networkInterfaces(...args) {
    if (typeof Deno.networkInterfaces == "function") {
        return Deno.networkInterfaces(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
async function connect(options) {
    return await Deno.connect(options);
}
function listen(options) {
    return Deno.listen(options);
}
function ListenerRef(listener, ...args) {
    if (typeof listener.ref == "function") {
        return listener.ref(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function ListenerUnref(listener, ...args) {
    if (typeof listener.unref == "function") {
        return listener.unref(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
function delay(ms, options = {}) {
    const { signal  } = options;
    if (signal?.aborted) {
        return Promise.reject(new DOMException("Delay was aborted.", "AbortError"));
    }
    return new Promise((resolve9, reject)=>{
        const abort = ()=>{
            clearTimeout(i2);
            reject(new DOMException("Delay was aborted.", "AbortError"));
        };
        const done = ()=>{
            signal?.removeEventListener("abort", abort);
            resolve9();
        };
        const i2 = setTimeout(done, ms);
        signal?.addEventListener("abort", abort, {
            once: true
        });
    });
}
const { Deno: Deno1  } = globalThis;
const noColor = typeof Deno1?.noColor === "boolean" ? Deno1.noColor : true;
let enabled = !noColor;
function code(open1, close1) {
    return {
        open: `\x1b[${open1.join(";")}m`,
        close: `\x1b[${close1}m`,
        regexp: new RegExp(`\\x1b\\[${close1}m`, "g")
    };
}
function run(str, code1) {
    return enabled ? `${code1.open}${str.replace(code1.regexp, code1.open)}${code1.close}` : str;
}
function bold(str) {
    return run(str, code([
        1
    ], 22));
}
function red(str) {
    return run(str, code([
        31
    ], 39));
}
function green(str) {
    return run(str, code([
        32
    ], 39));
}
function white(str) {
    return run(str, code([
        37
    ], 39));
}
function gray(str) {
    return brightBlack(str);
}
function brightBlack(str) {
    return run(str, code([
        90
    ], 39));
}
function bgRed(str) {
    return run(str, code([
        41
    ], 49));
}
function bgGreen(str) {
    return run(str, code([
        42
    ], 49));
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", 
].join("|"), "g");
function stripColor(string) {
    return string.replace(ANSI_PATTERN, "");
}
var DiffType;
(function(DiffType1) {
    DiffType1["removed"] = "removed";
    DiffType1["common"] = "common";
    DiffType1["added"] = "added";
})(DiffType || (DiffType = {}));
const REMOVED = 1;
const COMMON = 2;
const ADDED = 3;
function createCommon(A1, B1, reverse1) {
    const common1 = [];
    if (A1.length === 0 || B1.length === 0) return [];
    for(let i3 = 0; i3 < Math.min(A1.length, B1.length); i3 += 1){
        if (A1[reverse1 ? A1.length - i3 - 1 : i3] === B1[reverse1 ? B1.length - i3 - 1 : i3]) {
            common1.push(A1[reverse1 ? A1.length - i3 - 1 : i3]);
        } else {
            return common1;
        }
    }
    return common1;
}
function diff(A1, B1) {
    const prefixCommon = createCommon(A1, B1);
    const suffixCommon = createCommon(A1.slice(prefixCommon.length), B1.slice(prefixCommon.length), true).reverse();
    A1 = suffixCommon.length ? A1.slice(prefixCommon.length, -suffixCommon.length) : A1.slice(prefixCommon.length);
    B1 = suffixCommon.length ? B1.slice(prefixCommon.length, -suffixCommon.length) : B1.slice(prefixCommon.length);
    const swapped1 = B1.length > A1.length;
    [A1, B1] = swapped1 ? [
        B1,
        A1
    ] : [
        A1,
        B1
    ];
    const M1 = A1.length;
    const N1 = B1.length;
    if (!M1 && !N1 && !suffixCommon.length && !prefixCommon.length) return [];
    if (!N1) {
        return [
            ...prefixCommon.map((c)=>({
                    type: DiffType.common,
                    value: c
                })
            ),
            ...A1.map((a)=>({
                    type: swapped1 ? DiffType.added : DiffType.removed,
                    value: a
                })
            ),
            ...suffixCommon.map((c)=>({
                    type: DiffType.common,
                    value: c
                })
            ), 
        ];
    }
    const offset = N1;
    const delta = M1 - N1;
    const size = M1 + N1 + 1;
    const fp1 = Array.from({
        length: size
    }, ()=>({
            y: -1,
            id: -1
        })
    );
    const routes = new Uint32Array((M1 * N1 + size + 1) * 2);
    const diffTypesPtrOffset = routes.length / 2;
    let ptr = 0;
    let p1 = -1;
    function backTrace(A2, B2, current, swapped) {
        const M2 = A2.length;
        const N2 = B2.length;
        const result = [];
        let a = M2 - 1;
        let b3 = N2 - 1;
        let j3 = routes[current.id];
        let type1 = routes[current.id + diffTypesPtrOffset];
        while(true){
            if (!j3 && !type1) break;
            const prev = j3;
            if (type1 === 1) {
                result.unshift({
                    type: swapped ? DiffType.removed : DiffType.added,
                    value: B2[b3]
                });
                b3 -= 1;
            } else if (type1 === 3) {
                result.unshift({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: A2[a]
                });
                a -= 1;
            } else {
                result.unshift({
                    type: DiffType.common,
                    value: A2[a]
                });
                a -= 1;
                b3 -= 1;
            }
            j3 = routes[prev];
            type1 = routes[prev + diffTypesPtrOffset];
        }
        return result;
    }
    function createFP(slide, down, k2, M3) {
        if (slide && slide.y === -1 && down && down.y === -1) {
            return {
                y: 0,
                id: 0
            };
        }
        if (down && down.y === -1 || k2 === M3 || (slide && slide.y) > (down && down.y) + 1) {
            const prev = slide.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = ADDED;
            return {
                y: slide.y,
                id: ptr
            };
        } else {
            const prev = down.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = REMOVED;
            return {
                y: down.y + 1,
                id: ptr
            };
        }
    }
    function snake(k3, slide, down, _offset, A3, B3) {
        const M4 = A3.length;
        const N3 = B3.length;
        if (k3 < -N3 || M4 < k3) return {
            y: -1,
            id: -1
        };
        const fp = createFP(slide, down, k3, M4);
        while(fp.y + k3 < M4 && fp.y < N3 && A3[fp.y + k3] === B3[fp.y]){
            const prev = fp.id;
            ptr++;
            fp.id = ptr;
            fp.y += 1;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
    }
    while(fp1[delta + offset].y < N1){
        p1 = p1 + 1;
        for(let k4 = -p1; k4 < delta; ++k4){
            fp1[k4 + offset] = snake(k4, fp1[k4 - 1 + offset], fp1[k4 + 1 + offset], offset, A1, B1);
        }
        for(let k1 = delta + p1; k1 > delta; --k1){
            fp1[k1 + offset] = snake(k1, fp1[k1 - 1 + offset], fp1[k1 + 1 + offset], offset, A1, B1);
        }
        fp1[delta + offset] = snake(delta, fp1[delta - 1 + offset], fp1[delta + 1 + offset], offset, A1, B1);
    }
    return [
        ...prefixCommon.map((c)=>({
                type: DiffType.common,
                value: c
            })
        ),
        ...backTrace(A1, B1, fp1[delta + offset], swapped1),
        ...suffixCommon.map((c)=>({
                type: DiffType.common,
                value: c
            })
        ), 
    ];
}
function diffstr(A4, B4) {
    function unescape1(string) {
        return string.replaceAll("\b", "\\b").replaceAll("\f", "\\f").replaceAll("\t", "\\t").replaceAll("\v", "\\v").replaceAll(/\r\n|\r|\n/g, (str)=>str === "\r" ? "\\r" : str === "\n" ? "\\n\n" : "\\r\\n\r\n"
        );
    }
    function tokenize(string, { wordDiff =false  } = {}) {
        if (wordDiff) {
            const tokens = string.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
            const words = /^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u;
            for(let i4 = 0; i4 < tokens.length - 1; i4++){
                if (!tokens[i4 + 1] && tokens[i4 + 2] && words.test(tokens[i4]) && words.test(tokens[i4 + 2])) {
                    tokens[i4] += tokens[i4 + 2];
                    tokens.splice(i4 + 1, 2);
                    i4--;
                }
            }
            return tokens.filter((token)=>token
            );
        } else {
            const tokens = [], lines = string.split(/(\n|\r\n)/);
            if (!lines[lines.length - 1]) {
                lines.pop();
            }
            for(let i5 = 0; i5 < lines.length; i5++){
                if (i5 % 2) {
                    tokens[tokens.length - 1] += lines[i5];
                } else {
                    tokens.push(lines[i5]);
                }
            }
            return tokens;
        }
    }
    function createDetails(line, tokens) {
        return tokens.filter(({ type: type2  })=>type2 === line.type || type2 === DiffType.common
        ).map((result, i6, t)=>{
            if (result.type === DiffType.common && t[i6 - 1] && t[i6 - 1]?.type === t[i6 + 1]?.type && /\s+/.test(result.value)) {
                result.type = t[i6 - 1].type;
            }
            return result;
        });
    }
    const diffResult = diff(tokenize(`${unescape1(A4)}\n`), tokenize(`${unescape1(B4)}\n`));
    const added = [], removed = [];
    for (const result1 of diffResult){
        if (result1.type === DiffType.added) {
            added.push(result1);
        }
        if (result1.type === DiffType.removed) {
            removed.push(result1);
        }
    }
    const aLines = added.length < removed.length ? added : removed;
    const bLines = aLines === removed ? added : removed;
    for (const a of aLines){
        let tokens = [], b4;
        while(bLines.length){
            b4 = bLines.shift();
            tokens = diff(tokenize(a.value, {
                wordDiff: true
            }), tokenize(b4?.value ?? "", {
                wordDiff: true
            }));
            if (tokens.some(({ type: type3 , value  })=>type3 === DiffType.common && value.trim().length
            )) {
                break;
            }
        }
        a.details = createDetails(a, tokens);
        if (b4) {
            b4.details = createDetails(b4, tokens);
        }
    }
    return diffResult;
}
function createColor(diffType, { background =false  } = {}) {
    switch(diffType){
        case DiffType.added:
            return (s)=>background ? bgGreen(white(s)) : green(bold(s))
            ;
        case DiffType.removed:
            return (s)=>background ? bgRed(white(s)) : red(bold(s))
            ;
        default:
            return white;
    }
}
function createSign(diffType) {
    switch(diffType){
        case DiffType.added:
            return "+   ";
        case DiffType.removed:
            return "-   ";
        default:
            return "    ";
    }
}
function buildMessage(diffResult, { stringDiff =false  } = {}) {
    const messages = [], diffMessages = [];
    messages.push("");
    messages.push("");
    messages.push(`    ${gray(bold("[Diff]"))} ${red(bold("Actual"))} / ${green(bold("Expected"))}`);
    messages.push("");
    messages.push("");
    diffResult.forEach((result)=>{
        const c = createColor(result.type);
        const line = result.details?.map((detail)=>detail.type !== DiffType.common ? createColor(detail.type, {
                background: true
            })(detail.value) : detail.value
        ).join("") ?? result.value;
        diffMessages.push(c(`${createSign(result.type)}${line}`));
    });
    messages.push(...stringDiff ? [
        diffMessages.join("")
    ] : diffMessages);
    messages.push("");
    return messages;
}
function format(v2) {
    const { Deno  } = globalThis;
    return typeof Deno?.inspect === "function" ? Deno.inspect(v2, {
        depth: Infinity,
        sorted: true,
        trailingComma: true,
        compact: false,
        iterableLimit: Infinity
    }) : `"${String(v2).replace(/(?=["\\])/g, "\\")}"`;
}
const CAN_NOT_DISPLAY = "[Cannot display]";
class AssertionError extends Error {
    name = "AssertionError";
    constructor(message){
        super(message);
    }
}
function isKeyedCollection(x1) {
    return [
        Symbol.iterator,
        "size"
    ].every((k5)=>k5 in x1
    );
}
function equal(c, d) {
    const seen = new Map();
    return function compare(a, b5) {
        if (a && b5 && (a instanceof RegExp && b5 instanceof RegExp || a instanceof URL && b5 instanceof URL)) {
            return String(a) === String(b5);
        }
        if (a instanceof Date && b5 instanceof Date) {
            const aTime = a.getTime();
            const bTime = b5.getTime();
            if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
                return true;
            }
            return aTime === bTime;
        }
        if (typeof a === "number" && typeof b5 === "number") {
            return Number.isNaN(a) && Number.isNaN(b5) || a === b5;
        }
        if (Object.is(a, b5)) {
            return true;
        }
        if (a && typeof a === "object" && b5 && typeof b5 === "object") {
            if (a && b5 && !constructorsEqual(a, b5)) {
                return false;
            }
            if (a instanceof WeakMap || b5 instanceof WeakMap) {
                if (!(a instanceof WeakMap && b5 instanceof WeakMap)) return false;
                throw new TypeError("cannot compare WeakMap instances");
            }
            if (a instanceof WeakSet || b5 instanceof WeakSet) {
                if (!(a instanceof WeakSet && b5 instanceof WeakSet)) return false;
                throw new TypeError("cannot compare WeakSet instances");
            }
            if (seen.get(a) === b5) {
                return true;
            }
            if (Object.keys(a || {}).length !== Object.keys(b5 || {}).length) {
                return false;
            }
            seen.set(a, b5);
            if (isKeyedCollection(a) && isKeyedCollection(b5)) {
                if (a.size !== b5.size) {
                    return false;
                }
                let unmatchedEntries = a.size;
                for (const [aKey, aValue] of a.entries()){
                    for (const [bKey, bValue] of b5.entries()){
                        if (aKey === aValue && bKey === bValue && compare(aKey, bKey) || compare(aKey, bKey) && compare(aValue, bValue)) {
                            unmatchedEntries--;
                        }
                    }
                }
                return unmatchedEntries === 0;
            }
            const merged = {
                ...a,
                ...b5
            };
            for (const key of [
                ...Object.getOwnPropertyNames(merged),
                ...Object.getOwnPropertySymbols(merged), 
            ]){
                if (!compare(a && a[key], b5 && b5[key])) {
                    return false;
                }
                if (key in a && !(key in b5) || key in b5 && !(key in a)) {
                    return false;
                }
            }
            if (a instanceof WeakRef || b5 instanceof WeakRef) {
                if (!(a instanceof WeakRef && b5 instanceof WeakRef)) return false;
                return compare(a.deref(), b5.deref());
            }
            return true;
        }
        return false;
    }(c, d);
}
function constructorsEqual(a, b6) {
    return a.constructor === b6.constructor || a.constructor === Object && !b6.constructor || !a.constructor && b6.constructor === Object;
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new AssertionError(msg);
    }
}
function assertEquals(actual, expected, msg) {
    if (equal(actual, expected)) {
        return;
    }
    let message = "";
    const actualString = format(actual);
    const expectedString = format(expected);
    try {
        const stringDiff = typeof actual === "string" && typeof expected === "string";
        const diffResult = stringDiff ? diffstr(actual, expected) : diff(actualString.split("\n"), expectedString.split("\n"));
        const diffMsg = buildMessage(diffResult, {
            stringDiff
        }).join("\n");
        message = `Values are not equal:\n${diffMsg}`;
    } catch  {
        message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
    }
    if (msg) {
        message = msg;
    }
    throw new AssertionError(message);
}
function assertNotEquals(actual, expected, msg) {
    if (!equal(actual, expected)) {
        return;
    }
    let actualString;
    let expectedString;
    try {
        actualString = String(actual);
    } catch  {
        actualString = "[Cannot display]";
    }
    try {
        expectedString = String(expected);
    } catch  {
        expectedString = "[Cannot display]";
    }
    if (!msg) {
        msg = `actual: ${actualString} expected not to be: ${expectedString}`;
    }
    throw new AssertionError(msg);
}
function assertStrictEquals(actual, expected, msg) {
    if (actual === expected) {
        return;
    }
    let message;
    if (msg) {
        message = msg;
    } else {
        const actualString = format(actual);
        const expectedString = format(expected);
        if (actualString === expectedString) {
            const withOffset = actualString.split("\n").map((l)=>`    ${l}`
            ).join("\n");
            message = `Values have the same structure but are not reference-equal:\n\n${red(withOffset)}\n`;
        } else {
            try {
                const stringDiff = typeof actual === "string" && typeof expected === "string";
                const diffResult = stringDiff ? diffstr(actual, expected) : diff(actualString.split("\n"), expectedString.split("\n"));
                const diffMsg = buildMessage(diffResult, {
                    stringDiff
                }).join("\n");
                message = `Values are not strictly equal:\n${diffMsg}`;
            } catch  {
                message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
            }
        }
    }
    throw new AssertionError(message);
}
function assertNotStrictEquals(actual, expected, msg) {
    if (actual !== expected) {
        return;
    }
    throw new AssertionError(msg ?? `Expected "actual" to be strictly unequal to: ${format(actual)}\n`);
}
function assertMatch(actual, expected, msg) {
    if (!expected.test(actual)) {
        if (!msg) {
            msg = `actual: "${actual}" expected to match: "${expected}"`;
        }
        throw new AssertionError(msg);
    }
}
function assertNotMatch(actual, expected, msg) {
    if (expected.test(actual)) {
        if (!msg) {
            msg = `actual: "${actual}" expected to not match: "${expected}"`;
        }
        throw new AssertionError(msg);
    }
}
function unreachable() {
    throw new AssertionError("unreachable");
}
class DenoStdInternalError extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert1(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
function indexOfNeedle(source, needle, start = 0) {
    if (start >= source.length) {
        return -1;
    }
    if (start < 0) {
        start = Math.max(0, source.length + start);
    }
    const s = needle[0];
    for(let i7 = start; i7 < source.length; i7++){
        if (source[i7] !== s) continue;
        const pin = i7;
        let matched = 1;
        let j4 = i7;
        while(matched < needle.length){
            j4++;
            if (source[j4] !== needle[j4 - pin]) {
                break;
            }
            matched++;
        }
        if (matched === needle.length) {
            return pin;
        }
    }
    return -1;
}
function copy(src, dst, off = 0) {
    off = Math.max(0, Math.min(off, dst.byteLength));
    const dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
const MIN_BUF_SIZE = 16;
const CR = "\r".charCodeAt(0);
const LF = "\n".charCodeAt(0);
class BufferFullError extends Error {
    name;
    constructor(partial){
        super("Buffer full");
        this.partial = partial;
        this.name = "BufferFullError";
    }
    partial;
}
class PartialReadError extends Error {
    name = "PartialReadError";
    partial;
    constructor(){
        super("Encountered UnexpectedEof, data only partially read");
    }
}
class BufReader {
    #buf;
    #rd;
    #r = 0;
    #w = 0;
    #eof = false;
    static create(r, size = 4096) {
        return r instanceof BufReader ? r : new BufReader(r, size);
    }
    constructor(rd, size = 4096){
        if (size < 16) {
            size = MIN_BUF_SIZE;
        }
        this.#reset(new Uint8Array(size), rd);
    }
    size() {
        return this.#buf.byteLength;
    }
    buffered() {
        return this.#w - this.#r;
    }
    #fill = async ()=>{
        if (this.#r > 0) {
            this.#buf.copyWithin(0, this.#r, this.#w);
            this.#w -= this.#r;
            this.#r = 0;
        }
        if (this.#w >= this.#buf.byteLength) {
            throw Error("bufio: tried to fill full buffer");
        }
        for(let i8 = 100; i8 > 0; i8--){
            const rr = await this.#rd.read(this.#buf.subarray(this.#w));
            if (rr === null) {
                this.#eof = true;
                return;
            }
            assert1(rr >= 0, "negative read");
            this.#w += rr;
            if (rr > 0) {
                return;
            }
        }
        throw new Error(`No progress after ${100} read() calls`);
    };
    reset(r) {
        this.#reset(this.#buf, r);
    }
    #reset = (buf, rd)=>{
        this.#buf = buf;
        this.#rd = rd;
        this.#eof = false;
    };
    async read(p2) {
        let rr = p2.byteLength;
        if (p2.byteLength === 0) return rr;
        if (this.#r === this.#w) {
            if (p2.byteLength >= this.#buf.byteLength) {
                const rr = await this.#rd.read(p2);
                const nread = rr ?? 0;
                assert1(nread >= 0, "negative read");
                return rr;
            }
            this.#r = 0;
            this.#w = 0;
            rr = await this.#rd.read(this.#buf);
            if (rr === 0 || rr === null) return rr;
            assert1(rr >= 0, "negative read");
            this.#w += rr;
        }
        const copied = copy(this.#buf.subarray(this.#r, this.#w), p2, 0);
        this.#r += copied;
        return copied;
    }
    async readFull(p3) {
        let bytesRead = 0;
        while(bytesRead < p3.length){
            try {
                const rr = await this.read(p3.subarray(bytesRead));
                if (rr === null) {
                    if (bytesRead === 0) {
                        return null;
                    } else {
                        throw new PartialReadError();
                    }
                }
                bytesRead += rr;
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = p3.subarray(0, bytesRead);
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = p3.subarray(0, bytesRead);
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
        }
        return p3;
    }
    async readByte() {
        while(this.#r === this.#w){
            if (this.#eof) return null;
            await this.#fill();
        }
        const c = this.#buf[this.#r];
        this.#r++;
        return c;
    }
    async readString(delim) {
        if (delim.length !== 1) {
            throw new Error("Delimiter should be a single character");
        }
        const buffer = await this.readSlice(delim.charCodeAt(0));
        if (buffer === null) return null;
        return new TextDecoder().decode(buffer);
    }
    async readLine() {
        let line = null;
        try {
            line = await this.readSlice(LF);
        } catch (err) {
            if (err instanceof Deno.errors.BadResource) {
                throw err;
            }
            let partial;
            if (err instanceof PartialReadError) {
                partial = err.partial;
                assert1(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
            }
            if (!(err instanceof BufferFullError)) {
                throw err;
            }
            partial = err.partial;
            if (!this.#eof && partial && partial.byteLength > 0 && partial[partial.byteLength - 1] === CR) {
                assert1(this.#r > 0, "bufio: tried to rewind past start of buffer");
                this.#r--;
                partial = partial.subarray(0, partial.byteLength - 1);
            }
            if (partial) {
                return {
                    line: partial,
                    more: !this.#eof
                };
            }
        }
        if (line === null) {
            return null;
        }
        if (line.byteLength === 0) {
            return {
                line,
                more: false
            };
        }
        if (line[line.byteLength - 1] == LF) {
            let drop = 1;
            if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                drop = 2;
            }
            line = line.subarray(0, line.byteLength - drop);
        }
        return {
            line,
            more: false
        };
    }
    async readSlice(delim) {
        let s = 0;
        let slice;
        while(true){
            let i9 = this.#buf.subarray(this.#r + s, this.#w).indexOf(delim);
            if (i9 >= 0) {
                i9 += s;
                slice = this.#buf.subarray(this.#r, this.#r + i9 + 1);
                this.#r += i9 + 1;
                break;
            }
            if (this.#eof) {
                if (this.#r === this.#w) {
                    return null;
                }
                slice = this.#buf.subarray(this.#r, this.#w);
                this.#r = this.#w;
                break;
            }
            if (this.buffered() >= this.#buf.byteLength) {
                this.#r = this.#w;
                const oldbuf = this.#buf;
                const newbuf = this.#buf.slice(0);
                this.#buf = newbuf;
                throw new BufferFullError(oldbuf);
            }
            s = this.#w - this.#r;
            try {
                await this.#fill();
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = slice;
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = slice;
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
        }
        return slice;
    }
    async peek(n6) {
        if (n6 < 0) {
            throw Error("negative count");
        }
        let avail = this.#w - this.#r;
        while(avail < n6 && avail < this.#buf.byteLength && !this.#eof){
            try {
                await this.#fill();
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = this.#buf.subarray(this.#r, this.#w);
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = this.#buf.subarray(this.#r, this.#w);
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
            avail = this.#w - this.#r;
        }
        if (avail === 0 && this.#eof) {
            return null;
        } else if (avail < n6 && this.#eof) {
            return this.#buf.subarray(this.#r, this.#r + avail);
        } else if (avail < n6) {
            throw new BufferFullError(this.#buf.subarray(this.#r, this.#w));
        }
        return this.#buf.subarray(this.#r, this.#r + n6);
    }
}
class AbstractBufBase {
    buf;
    usedBufferBytes = 0;
    err = null;
    constructor(buf){
        this.buf = buf;
    }
    size() {
        return this.buf.byteLength;
    }
    available() {
        return this.buf.byteLength - this.usedBufferBytes;
    }
    buffered() {
        return this.usedBufferBytes;
    }
}
class BufWriter extends AbstractBufBase {
    #writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
    }
    constructor(writer, size = 4096){
        super(new Uint8Array(size <= 0 ? 4096 : size));
        this.#writer = writer;
    }
    reset(w2) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.#writer = w2;
    }
    async flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            const p4 = this.buf.subarray(0, this.usedBufferBytes);
            let nwritten = 0;
            while(nwritten < p4.length){
                nwritten += await this.#writer.write(p4.subarray(nwritten));
            }
        } catch (e) {
            if (e instanceof Error) {
                this.err = e;
            }
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    async write(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = await this.#writer.write(data);
                } catch (e) {
                    if (e instanceof Error) {
                        this.err = e;
                    }
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                await this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
class BufWriterSync extends AbstractBufBase {
    #writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriterSync ? writer : new BufWriterSync(writer, size);
    }
    constructor(writer, size = 4096){
        super(new Uint8Array(size <= 0 ? 4096 : size));
        this.#writer = writer;
    }
    reset(w3) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.#writer = w3;
    }
    flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            const p5 = this.buf.subarray(0, this.usedBufferBytes);
            let nwritten = 0;
            while(nwritten < p5.length){
                nwritten += this.#writer.writeSync(p5.subarray(nwritten));
            }
        } catch (e) {
            if (e instanceof Error) {
                this.err = e;
            }
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    writeSync(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = this.#writer.writeSync(data);
                } catch (e) {
                    if (e instanceof Error) {
                        this.err = e;
                    }
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
async function writeAll(w4, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += await w4.write(arr.subarray(nwritten));
    }
}
function writeAllSync(w5, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += w5.writeSync(arr.subarray(nwritten));
    }
}
function notImplemented(msg) {
    const message = msg ? `Not implemented: ${msg}` : "Not implemented";
    throw new Error(message);
}
function warnNotImplemented(msg) {
    const message = msg ? `Not implemented: ${msg}` : "Not implemented";
    console.warn(message);
}
const _TextDecoder = TextDecoder;
const _TextEncoder = TextEncoder;
function intoCallbackAPIWithIntercept(func, interceptor, cb, ...args) {
    func(...args).then((value)=>cb && cb(null, interceptor(value))
    , (err)=>cb && cb(err)
    );
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function normalizeEncoding(enc) {
    if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
    return slowCases(enc);
}
function slowCases(enc) {
    switch(enc.length){
        case 4:
            if (enc === "UTF8") return "utf8";
            if (enc === "ucs2" || enc === "UCS2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf8") return "utf8";
            if (enc === "ucs2") return "utf16le";
            break;
        case 3:
            if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
                return "hex";
            }
            break;
        case 5:
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            if (enc === "UTF-8") return "utf8";
            if (enc === "ASCII") return "ascii";
            if (enc === "UCS-2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf-8") return "utf8";
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            break;
        case 6:
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            if (enc === "BASE64") return "base64";
            if (enc === "LATIN1" || enc === "BINARY") return "latin1";
            enc = `${enc}`.toLowerCase();
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            break;
        case 7:
            if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
                return "utf16le";
            }
            break;
        case 8:
            if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
                return "utf16le";
            }
            break;
        default:
            if (enc === "") return "utf8";
    }
}
function validateIntegerRange(value, name1, min1 = -2147483648, max = 2147483647) {
    if (!Number.isInteger(value)) {
        throw new Error(`${name1} must be 'an integer' but was ${value}`);
    }
    if (value < min1 || value > max) {
        throw new Error(`${name1} must be >= ${min1} && <= ${max}. Value was ${value}`);
    }
}
const _toString = Object.prototype.toString;
const _isObjectLike = (value)=>value !== null && typeof value === "object"
;
const _isFunctionLike = (value)=>value !== null && typeof value === "function"
;
function isAnyArrayBuffer(value) {
    return _isObjectLike(value) && (_toString.call(value) === "[object ArrayBuffer]" || _toString.call(value) === "[object SharedArrayBuffer]");
}
function isArgumentsObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Arguments]";
}
function isArrayBuffer(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object ArrayBuffer]";
}
function isAsyncFunction(value) {
    return _isFunctionLike(value) && _toString.call(value) === "[object AsyncFunction]";
}
function isBooleanObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Boolean]";
}
function isBoxedPrimitive(value) {
    return isBooleanObject(value) || isStringObject(value) || isNumberObject(value) || isSymbolObject(value) || isBigIntObject(value);
}
function isDataView(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object DataView]";
}
function isDate(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Date]";
}
function isGeneratorFunction(value) {
    return _isFunctionLike(value) && _toString.call(value) === "[object GeneratorFunction]";
}
function isGeneratorObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Generator]";
}
function isMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Map]";
}
function isMapIterator(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Map Iterator]";
}
function isModuleNamespaceObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Module]";
}
function isNativeError(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Error]";
}
function isNumberObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Number]";
}
function isBigIntObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object BigInt]";
}
function isPromise(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Promise]";
}
function isRegExp(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object RegExp]";
}
function isSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Set]";
}
function isSetIterator(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Set Iterator]";
}
function isSharedArrayBuffer(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object SharedArrayBuffer]";
}
function isStringObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object String]";
}
function isSymbolObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Symbol]";
}
function isWeakMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakMap]";
}
function isWeakSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakSet]";
}
const __default = {
    isAsyncFunction,
    isGeneratorFunction,
    isAnyArrayBuffer,
    isArrayBuffer,
    isArgumentsObject,
    isBoxedPrimitive,
    isDataView,
    isMap,
    isMapIterator,
    isModuleNamespaceObject,
    isNativeError,
    isPromise,
    isSet,
    isSetIterator,
    isWeakMap,
    isWeakSet,
    isRegExp,
    isDate,
    isStringObject,
    isNumberObject,
    isBooleanObject,
    isBigIntObject
};
const mod = {
    isAnyArrayBuffer: isAnyArrayBuffer,
    isArgumentsObject: isArgumentsObject,
    isArrayBuffer: isArrayBuffer,
    isAsyncFunction: isAsyncFunction,
    isBooleanObject: isBooleanObject,
    isBoxedPrimitive: isBoxedPrimitive,
    isDataView: isDataView,
    isDate: isDate,
    isGeneratorFunction: isGeneratorFunction,
    isGeneratorObject: isGeneratorObject,
    isMap: isMap,
    isMapIterator: isMapIterator,
    isModuleNamespaceObject: isModuleNamespaceObject,
    isNativeError: isNativeError,
    isNumberObject: isNumberObject,
    isBigIntObject: isBigIntObject,
    isPromise: isPromise,
    isRegExp: isRegExp,
    isSet: isSet,
    isSetIterator: isSetIterator,
    isSharedArrayBuffer: isSharedArrayBuffer,
    isStringObject: isStringObject,
    isSymbolObject: isSymbolObject,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    default: __default
};
const kKeyObject = Symbol("kKeyObject");
const kKeyType = Symbol("kKeyType");
function isKeyObject(obj) {
    return obj != null && obj[kKeyType] !== undefined;
}
function isCryptoKey(obj) {
    return obj != null && obj[kKeyObject] !== undefined;
}
const _toString1 = Object.prototype.toString;
const _isObjectLike1 = (value)=>value !== null && typeof value === "object"
;
function isArrayBufferView(value) {
    return ArrayBuffer.isView(value);
}
function isBigInt64Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object BigInt64Array]";
}
function isBigUint64Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object BigUint64Array]";
}
function isFloat32Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Float32Array]";
}
function isFloat64Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Float64Array]";
}
function isInt8Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Int8Array]";
}
function isInt16Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Int16Array]";
}
function isInt32Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Int32Array]";
}
function isTypedArray(value) {
    const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
    return _isObjectLike1(value) && reTypedTag.test(_toString1.call(value));
}
function isUint8Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Uint8Array]";
}
function isUint8ClampedArray(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Uint8ClampedArray]";
}
function isUint16Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Uint16Array]";
}
function isUint32Array(value) {
    return _isObjectLike1(value) && _toString1.call(value) === "[object Uint32Array]";
}
const { isDate: isDate1 , isArgumentsObject: isArgumentsObject1 , isBigIntObject: isBigIntObject1 , isBooleanObject: isBooleanObject1 , isNumberObject: isNumberObject1 , isStringObject: isStringObject1 , isSymbolObject: isSymbolObject1 , isNativeError: isNativeError1 , isRegExp: isRegExp1 , isAsyncFunction: isAsyncFunction1 , isGeneratorFunction: isGeneratorFunction1 , isGeneratorObject: isGeneratorObject1 , isPromise: isPromise1 , isMap: isMap1 , isSet: isSet1 , isMapIterator: isMapIterator1 , isSetIterator: isSetIterator1 , isWeakMap: isWeakMap1 , isWeakSet: isWeakSet1 , isArrayBuffer: isArrayBuffer1 , isDataView: isDataView1 , isSharedArrayBuffer: isSharedArrayBuffer1 , isModuleNamespaceObject: isModuleNamespaceObject1 , isAnyArrayBuffer: isAnyArrayBuffer1 , isBoxedPrimitive: isBoxedPrimitive1 ,  } = mod;
const mod1 = {
    isCryptoKey: isCryptoKey,
    isKeyObject: isKeyObject,
    isArrayBufferView: isArrayBufferView,
    isBigInt64Array: isBigInt64Array,
    isBigUint64Array: isBigUint64Array,
    isFloat32Array: isFloat32Array,
    isFloat64Array: isFloat64Array,
    isInt8Array: isInt8Array,
    isInt16Array: isInt16Array,
    isInt32Array: isInt32Array,
    isTypedArray: isTypedArray,
    isUint8Array: isUint8Array,
    isUint8ClampedArray: isUint8ClampedArray,
    isUint16Array: isUint16Array,
    isUint32Array: isUint32Array,
    isDate: isDate1,
    isArgumentsObject: isArgumentsObject1,
    isBigIntObject: isBigIntObject1,
    isBooleanObject: isBooleanObject1,
    isNumberObject: isNumberObject1,
    isStringObject: isStringObject1,
    isSymbolObject: isSymbolObject1,
    isNativeError: isNativeError1,
    isRegExp: isRegExp1,
    isAsyncFunction: isAsyncFunction1,
    isGeneratorFunction: isGeneratorFunction1,
    isGeneratorObject: isGeneratorObject1,
    isPromise: isPromise1,
    isMap: isMap1,
    isSet: isSet1,
    isMapIterator: isMapIterator1,
    isSetIterator: isSetIterator1,
    isWeakMap: isWeakMap1,
    isWeakSet: isWeakSet1,
    isArrayBuffer: isArrayBuffer1,
    isDataView: isDataView1,
    isSharedArrayBuffer: isSharedArrayBuffer1,
    isModuleNamespaceObject: isModuleNamespaceObject1,
    isAnyArrayBuffer: isAnyArrayBuffer1,
    isBoxedPrimitive: isBoxedPrimitive1
};
const codes = {};
function hideStackFrames(fn) {
    const hidden = "__node_internal_" + fn.name;
    Object.defineProperty(fn, "name", {
        value: hidden
    });
    return fn;
}
function normalizeEncoding1(enc) {
    if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
    return slowCases1(enc);
}
function slowCases1(enc) {
    switch(enc.length){
        case 4:
            if (enc === "UTF8") return "utf8";
            if (enc === "ucs2" || enc === "UCS2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf8") return "utf8";
            if (enc === "ucs2") return "utf16le";
            break;
        case 3:
            if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
                return "hex";
            }
            break;
        case 5:
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            if (enc === "UTF-8") return "utf8";
            if (enc === "ASCII") return "ascii";
            if (enc === "UCS-2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf-8") return "utf8";
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            break;
        case 6:
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            if (enc === "BASE64") return "base64";
            if (enc === "LATIN1" || enc === "BINARY") return "latin1";
            enc = `${enc}`.toLowerCase();
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            break;
        case 7:
            if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
                return "utf16le";
            }
            break;
        case 8:
            if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
                return "utf16le";
            }
            break;
        case 9:
            if (enc === "base64url" || enc === "BASE64URL" || `${enc}`.toLowerCase() === "base64url") {
                return "base64url";
            }
            break;
        default:
            if (enc === "") return "utf8";
    }
}
function isInt32(value) {
    return value === (value | 0);
}
function isUint32(value) {
    return value === value >>> 0;
}
const octalReg = /^[0-7]+$/;
const modeDesc = "must be a 32-bit unsigned integer or an octal string";
function parseFileMode(value, name2, def) {
    value ??= def;
    if (typeof value === "string") {
        if (!octalReg.test(value)) {
            throw new codes.ERR_INVALID_ARG_VALUE(name2, value, modeDesc);
        }
        value = Number.parseInt(value, 8);
    }
    validateInt32(value, name2, 0, 2 ** 32 - 1);
    return value;
}
const validateBuffer = hideStackFrames((buffer, name3 = "buffer")=>{
    if (!isArrayBufferView(buffer)) {
        throw new codes.ERR_INVALID_ARG_TYPE(name3, [
            "Buffer",
            "TypedArray",
            "DataView"
        ], buffer);
    }
});
const validateInteger = hideStackFrames((value, name4, min2 = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER)=>{
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name4, "number", value);
    }
    if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name4, "an integer", value);
    }
    if (value < min2 || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name4, `>= ${min2} && <= ${max}`, value);
    }
});
const validateObject = hideStackFrames((value, name5, options)=>{
    const useDefaultOptions = options == null;
    const allowArray = useDefaultOptions ? false : options.allowArray;
    const allowFunction = useDefaultOptions ? false : options.allowFunction;
    const nullable = useDefaultOptions ? false : options.nullable;
    if (!nullable && value === null || !allowArray && Array.isArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
        throw new codes.ERR_INVALID_ARG_TYPE(name5, "Object", value);
    }
});
const validateInt32 = hideStackFrames((value, name6, min3 = -2147483648, max = 2147483647)=>{
    if (!isInt32(value)) {
        if (typeof value !== "number") {
            throw new codes.ERR_INVALID_ARG_TYPE(name6, "number", value);
        }
        if (!Number.isInteger(value)) {
            throw new codes.ERR_OUT_OF_RANGE(name6, "an integer", value);
        }
        throw new codes.ERR_OUT_OF_RANGE(name6, `>= ${min3} && <= ${max}`, value);
    }
    if (value < min3 || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name6, `>= ${min3} && <= ${max}`, value);
    }
});
const validateUint32 = hideStackFrames((value, name7, positive)=>{
    if (!isUint32(value)) {
        if (typeof value !== "number") {
            throw new codes.ERR_INVALID_ARG_TYPE(name7, "number", value);
        }
        if (!Number.isInteger(value)) {
            throw new codes.ERR_OUT_OF_RANGE(name7, "an integer", value);
        }
        const min4 = positive ? 1 : 0;
        throw new codes.ERR_OUT_OF_RANGE(name7, `>= ${min4} && < 4294967296`, value);
    }
    if (positive && value === 0) {
        throw new codes.ERR_OUT_OF_RANGE(name7, ">= 1 && < 4294967296", value);
    }
});
function validateString(value, name8) {
    if (typeof value !== "string") {
        throw new codes.ERR_INVALID_ARG_TYPE(name8, "string", value);
    }
}
function validateNumber(value, name9) {
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name9, "number", value);
    }
}
function validateBoolean(value, name10) {
    if (typeof value !== "boolean") {
        throw new codes.ERR_INVALID_ARG_TYPE(name10, "boolean", value);
    }
}
const validateOneOf = hideStackFrames((value, name11, oneOf)=>{
    if (!Array.prototype.includes.call(oneOf, value)) {
        const allowed = Array.prototype.join.call(Array.prototype.map.call(oneOf, (v3)=>typeof v3 === "string" ? `'${v3}'` : String(v3)
        ), ", ");
        const reason = "must be one of: " + allowed;
        throw new codes.ERR_INVALID_ARG_VALUE(name11, value, reason);
    }
});
function validateEncoding(data, encoding) {
    const normalizedEncoding = normalizeEncoding1(encoding);
    const length = data.length;
    if (normalizedEncoding === "hex" && length % 2 !== 0) {
        throw new codes.ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
    }
}
function validatePort(port, name12 = "Port", allowZero = true) {
    if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && String.prototype.trim.call(port).length === 0 || +port !== +port >>> 0 || port > 0xFFFF || port === 0 && !allowZero) {
        throw new codes.ERR_SOCKET_BAD_PORT(name12, port, allowZero);
    }
    return port;
}
const validateCallback = hideStackFrames((callback)=>{
    if (typeof callback !== "function") {
        throw new codes.ERR_INVALID_CALLBACK(callback);
    }
});
const validateAbortSignal = hideStackFrames((signal, name13)=>{
    if (signal !== undefined && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new codes.ERR_INVALID_ARG_TYPE(name13, "AbortSignal", signal);
    }
});
const validateFunction = hideStackFrames((value, name14)=>{
    if (typeof value !== "function") {
        throw new codes.ERR_INVALID_ARG_TYPE(name14, "Function", value);
    }
});
const validateArray = hideStackFrames((value, name15, minLength = 0)=>{
    if (!Array.isArray(value)) {
        throw new codes.ERR_INVALID_ARG_TYPE(name15, "Array", value);
    }
    if (value.length < minLength) {
        const reason = `must be longer than ${minLength}`;
        throw new codes.ERR_INVALID_ARG_VALUE(name15, value, reason);
    }
});
function guessHandleType(_fd) {
    notImplemented("util.guessHandleType");
}
const isNumericLookup = {};
function isArrayIndex(value) {
    switch(typeof value){
        case "number":
            return value >= 0 && (value | 0) === value;
        case "string":
            {
                const result = isNumericLookup[value];
                if (result !== void 0) {
                    return result;
                }
                const length = value.length;
                if (length === 0) {
                    return isNumericLookup[value] = false;
                }
                let ch = 0;
                let i10 = 0;
                for(; i10 < length; ++i10){
                    ch = value.charCodeAt(i10);
                    if (i10 === 0 && ch === 0x30 && length > 1 || ch < 0x30 || ch > 0x39) {
                        return isNumericLookup[value] = false;
                    }
                }
                return isNumericLookup[value] = true;
            }
        default:
            return false;
    }
}
function getOwnNonIndexProperties(obj, filter) {
    let allProperties = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj), 
    ];
    if (Array.isArray(obj)) {
        allProperties = allProperties.filter((k6)=>!isArrayIndex(k6)
        );
    }
    if (filter === 0) {
        return allProperties;
    }
    const result = [];
    for (const key of allProperties){
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if (desc === undefined) {
            continue;
        }
        if (filter & 1 && !desc.writable) {
            continue;
        }
        if (filter & 2 && !desc.enumerable) {
            continue;
        }
        if (filter & 4 && !desc.configurable) {
            continue;
        }
        if (filter & 8 && typeof key === "string") {
            continue;
        }
        if (filter & 16 && typeof key === "symbol") {
            continue;
        }
        result.push(key);
    }
    return result;
}
const mod2 = function() {
    return {
        guessHandleType: guessHandleType,
        ALL_PROPERTIES: 0,
        ONLY_WRITABLE: 1,
        ONLY_ENUMERABLE: 2,
        ONLY_CONFIGURABLE: 4,
        ONLY_ENUM_WRITABLE: 6,
        SKIP_STRINGS: 8,
        SKIP_SYMBOLS: 16,
        isArrayIndex: isArrayIndex,
        getOwnNonIndexProperties: getOwnNonIndexProperties
    };
}();
const kObjectType = 0;
const kArrayExtrasType = 2;
const kRejected = 2;
const meta = [
    '\\x00',
    '\\x01',
    '\\x02',
    '\\x03',
    '\\x04',
    '\\x05',
    '\\x06',
    '\\x07',
    '\\b',
    '\\t',
    '\\n',
    '\\x0B',
    '\\f',
    '\\r',
    '\\x0E',
    '\\x0F',
    '\\x10',
    '\\x11',
    '\\x12',
    '\\x13',
    '\\x14',
    '\\x15',
    '\\x16',
    '\\x17',
    '\\x18',
    '\\x19',
    '\\x1A',
    '\\x1B',
    '\\x1C',
    '\\x1D',
    '\\x1E',
    '\\x1F',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    "\\'",
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\\\',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\x7F',
    '\\x80',
    '\\x81',
    '\\x82',
    '\\x83',
    '\\x84',
    '\\x85',
    '\\x86',
    '\\x87',
    '\\x88',
    '\\x89',
    '\\x8A',
    '\\x8B',
    '\\x8C',
    '\\x8D',
    '\\x8E',
    '\\x8F',
    '\\x90',
    '\\x91',
    '\\x92',
    '\\x93',
    '\\x94',
    '\\x95',
    '\\x96',
    '\\x97',
    '\\x98',
    '\\x99',
    '\\x9A',
    '\\x9B',
    '\\x9C',
    '\\x9D',
    '\\x9E',
    '\\x9F'
];
const isUndetectableObject = (v4)=>typeof v4 === "undefined" && v4 !== undefined
;
const strEscapeSequencesRegExp = /[\x00-\x1f\x27\x5c\x7f-\x9f]/;
const strEscapeSequencesReplacer = /[\x00-\x1f\x27\x5c\x7f-\x9f]/g;
const strEscapeSequencesRegExpSingle = /[\x00-\x1f\x5c\x7f-\x9f]/;
const strEscapeSequencesReplacerSingle = /[\x00-\x1f\x5c\x7f-\x9f]/g;
const keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const numberRegExp = /^(0|[1-9][0-9]*)$/;
const nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
const classRegExp = /^(\s+[^(]*?)\s*{/;
const stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;
const inspectDefaultOptions = {
    showHidden: false,
    depth: 2,
    colors: false,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: 10000,
    breakLength: 80,
    compact: 3,
    sorted: false,
    getters: false
};
function getUserOptions(ctx, isCrossContext) {
    const ret = {
        stylize: ctx.stylize,
        showHidden: ctx.showHidden,
        depth: ctx.depth,
        colors: ctx.colors,
        customInspect: ctx.customInspect,
        showProxy: ctx.showProxy,
        maxArrayLength: ctx.maxArrayLength,
        maxStringLength: ctx.maxStringLength,
        breakLength: ctx.breakLength,
        compact: ctx.compact,
        sorted: ctx.sorted,
        getters: ctx.getters,
        ...ctx.userOptions
    };
    if (isCrossContext) {
        Object.setPrototypeOf(ret, null);
        for (const key of Object.keys(ret)){
            if ((typeof ret[key] === "object" || typeof ret[key] === "function") && ret[key] !== null) {
                delete ret[key];
            }
        }
        ret.stylize = Object.setPrototypeOf((value, flavour)=>{
            let stylized;
            try {
                stylized = `${ctx.stylize(value, flavour)}`;
            } catch  {}
            if (typeof stylized !== "string") return value;
            return stylized;
        }, null);
    }
    return ret;
}
function inspect(value, opts) {
    const ctx = {
        budget: {},
        indentationLvl: 0,
        seen: [],
        currentDepth: 0,
        stylize: stylizeNoColor,
        showHidden: inspectDefaultOptions.showHidden,
        depth: inspectDefaultOptions.depth,
        colors: inspectDefaultOptions.colors,
        customInspect: inspectDefaultOptions.customInspect,
        showProxy: inspectDefaultOptions.showProxy,
        maxArrayLength: inspectDefaultOptions.maxArrayLength,
        maxStringLength: inspectDefaultOptions.maxStringLength,
        breakLength: inspectDefaultOptions.breakLength,
        compact: inspectDefaultOptions.compact,
        sorted: inspectDefaultOptions.sorted,
        getters: inspectDefaultOptions.getters
    };
    if (arguments.length > 1) {
        if (arguments.length > 2) {
            if (arguments[2] !== undefined) {
                ctx.depth = arguments[2];
            }
            if (arguments.length > 3 && arguments[3] !== undefined) {
                ctx.colors = arguments[3];
            }
        }
        if (typeof opts === "boolean") {
            ctx.showHidden = opts;
        } else if (opts) {
            const optKeys = Object.keys(opts);
            for(let i11 = 0; i11 < optKeys.length; ++i11){
                const key = optKeys[i11];
                if (inspectDefaultOptions.hasOwnProperty(key) || key === "stylize") {
                    ctx[key] = opts[key];
                } else if (ctx.userOptions === undefined) {
                    ctx.userOptions = opts;
                }
            }
        }
    }
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    if (ctx.maxArrayLength === null) ctx.maxArrayLength = Infinity;
    if (ctx.maxStringLength === null) ctx.maxStringLength = Infinity;
    return formatValue(ctx, value, 0);
}
const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
inspect.custom = customInspectSymbol;
Object.defineProperty(inspect, "defaultOptions", {
    get () {
        return inspectDefaultOptions;
    },
    set (options) {
        validateObject(options, "options");
        return Object.assign(inspectDefaultOptions, options);
    }
});
const defaultFG = 39;
const defaultBG = 49;
inspect.colors = Object.assign(Object.create(null), {
    reset: [
        0,
        0
    ],
    bold: [
        1,
        22
    ],
    dim: [
        2,
        22
    ],
    italic: [
        3,
        23
    ],
    underline: [
        4,
        24
    ],
    blink: [
        5,
        25
    ],
    inverse: [
        7,
        27
    ],
    hidden: [
        8,
        28
    ],
    strikethrough: [
        9,
        29
    ],
    doubleunderline: [
        21,
        24
    ],
    black: [
        30,
        defaultFG
    ],
    red: [
        31,
        defaultFG
    ],
    green: [
        32,
        defaultFG
    ],
    yellow: [
        33,
        defaultFG
    ],
    blue: [
        34,
        defaultFG
    ],
    magenta: [
        35,
        defaultFG
    ],
    cyan: [
        36,
        defaultFG
    ],
    white: [
        37,
        defaultFG
    ],
    bgBlack: [
        40,
        defaultBG
    ],
    bgRed: [
        41,
        defaultBG
    ],
    bgGreen: [
        42,
        defaultBG
    ],
    bgYellow: [
        43,
        defaultBG
    ],
    bgBlue: [
        44,
        defaultBG
    ],
    bgMagenta: [
        45,
        defaultBG
    ],
    bgCyan: [
        46,
        defaultBG
    ],
    bgWhite: [
        47,
        defaultBG
    ],
    framed: [
        51,
        54
    ],
    overlined: [
        53,
        55
    ],
    gray: [
        90,
        defaultFG
    ],
    redBright: [
        91,
        defaultFG
    ],
    greenBright: [
        92,
        defaultFG
    ],
    yellowBright: [
        93,
        defaultFG
    ],
    blueBright: [
        94,
        defaultFG
    ],
    magentaBright: [
        95,
        defaultFG
    ],
    cyanBright: [
        96,
        defaultFG
    ],
    whiteBright: [
        97,
        defaultFG
    ],
    bgGray: [
        100,
        defaultBG
    ],
    bgRedBright: [
        101,
        defaultBG
    ],
    bgGreenBright: [
        102,
        defaultBG
    ],
    bgYellowBright: [
        103,
        defaultBG
    ],
    bgBlueBright: [
        104,
        defaultBG
    ],
    bgMagentaBright: [
        105,
        defaultBG
    ],
    bgCyanBright: [
        106,
        defaultBG
    ],
    bgWhiteBright: [
        107,
        defaultBG
    ]
});
function defineColorAlias(target, alias) {
    Object.defineProperty(inspect.colors, alias, {
        get () {
            return this[target];
        },
        set (value) {
            this[target] = value;
        },
        configurable: true,
        enumerable: false
    });
}
defineColorAlias("gray", "grey");
defineColorAlias("gray", "blackBright");
defineColorAlias("bgGray", "bgGrey");
defineColorAlias("bgGray", "bgBlackBright");
defineColorAlias("dim", "faint");
defineColorAlias("strikethrough", "crossedout");
defineColorAlias("strikethrough", "strikeThrough");
defineColorAlias("strikethrough", "crossedOut");
defineColorAlias("hidden", "conceal");
defineColorAlias("inverse", "swapColors");
defineColorAlias("inverse", "swapcolors");
defineColorAlias("doubleunderline", "doubleUnderline");
inspect.styles = Object.assign(Object.create(null), {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
    module: "underline"
});
function addQuotes(str, quotes) {
    if (quotes === -1) {
        return `"${str}"`;
    }
    if (quotes === -2) {
        return `\`${str}\``;
    }
    return `'${str}'`;
}
const escapeFn = (str)=>meta[str.charCodeAt(0)]
;
function strEscape(str) {
    let escapeTest = strEscapeSequencesRegExp;
    let escapeReplace = strEscapeSequencesReplacer;
    let singleQuote = 39;
    if (str.includes("'")) {
        if (!str.includes('"')) {
            singleQuote = -1;
        } else if (!str.includes("`") && !str.includes("${")) {
            singleQuote = -2;
        }
        if (singleQuote !== 39) {
            escapeTest = strEscapeSequencesRegExpSingle;
            escapeReplace = strEscapeSequencesReplacerSingle;
        }
    }
    if (str.length < 5000 && !escapeTest.test(str)) {
        return addQuotes(str, singleQuote);
    }
    if (str.length > 100) {
        str = str.replace(escapeReplace, escapeFn);
        return addQuotes(str, singleQuote);
    }
    let result = "";
    let last = 0;
    const lastIndex = str.length;
    for(let i12 = 0; i12 < lastIndex; i12++){
        const point = str.charCodeAt(i12);
        if (point === singleQuote || point === 92 || point < 32 || point > 126 && point < 160) {
            if (last === i12) {
                result += meta[point];
            } else {
                result += `${str.slice(last, i12)}${meta[point]}`;
            }
            last = i12 + 1;
        }
    }
    if (last !== lastIndex) {
        result += str.slice(last);
    }
    return addQuotes(result, singleQuote);
}
function stylizeWithColor(str, styleType) {
    const style = inspect.styles[styleType];
    if (style !== undefined) {
        const color = inspect.colors[style];
        if (color !== undefined) {
            return `\u001b[${color[0]}m${str}\u001b[${color[1]}m`;
        }
    }
    return str;
}
function stylizeNoColor(str) {
    return str;
}
function formatValue(ctx, value, recurseTimes, typedArray) {
    if (typeof value !== "object" && typeof value !== "function" && !isUndetectableObject(value)) {
        return formatPrimitive(ctx.stylize, value, ctx);
    }
    if (value === null) {
        return ctx.stylize("null", "null");
    }
    const context = value;
    const proxy = undefined;
    if (ctx.customInspect) {
        const maybeCustom = value[customInspectSymbol];
        if (typeof maybeCustom === "function" && maybeCustom !== inspect && !(value.constructor && value.constructor.prototype === value)) {
            const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
            const isCrossContext = proxy !== undefined || !(context instanceof Object);
            const ret = maybeCustom.call(context, depth, getUserOptions(ctx, isCrossContext));
            if (ret !== context) {
                if (typeof ret !== "string") {
                    return formatValue(ctx, ret, recurseTimes);
                }
                return ret.replace(/\n/g, `\n${" ".repeat(ctx.indentationLvl)}`);
            }
        }
    }
    if (ctx.seen.includes(value)) {
        let index = 1;
        if (ctx.circular === undefined) {
            ctx.circular = new Map();
            ctx.circular.set(value, index);
        } else {
            index = ctx.circular.get(value);
            if (index === undefined) {
                index = ctx.circular.size + 1;
                ctx.circular.set(value, index);
            }
        }
        return ctx.stylize(`[Circular *${index}]`, "special");
    }
    return formatRaw(ctx, value, recurseTimes, typedArray);
}
function formatRaw(ctx, value, recurseTimes, typedArray) {
    let keys;
    let protoProps;
    if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
        protoProps = [];
    }
    const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
    if (protoProps !== undefined && protoProps.length === 0) {
        protoProps = undefined;
    }
    let tag = value[Symbol.toStringTag];
    if (typeof tag !== "string") {
        tag = "";
    }
    let base1 = "";
    let formatter = getEmptyFormatArray;
    let braces;
    let noIterator = true;
    let i13 = 0;
    const filter = ctx.showHidden ? 0 : 2;
    let extrasType = 0;
    if (value[Symbol.iterator] || constructor === null) {
        noIterator = false;
        if (Array.isArray(value)) {
            const prefix = constructor !== "Array" || tag !== "" ? getPrefix(constructor, tag, "Array", `(${value.length})`) : "";
            keys = getOwnNonIndexProperties(value, filter);
            braces = [
                `${prefix}[`,
                "]"
            ];
            if (value.length === 0 && keys.length === 0 && protoProps === undefined) {
                return `${braces[0]}]`;
            }
            extrasType = kArrayExtrasType;
            formatter = formatArray;
        } else if (isSet1(value)) {
            const size = value.size;
            const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
            keys = getKeys(value, ctx.showHidden);
            formatter = constructor !== null ? formatSet.bind(null, value) : formatSet.bind(null, value.values());
            if (size === 0 && keys.length === 0 && protoProps === undefined) {
                return `${prefix}{}`;
            }
            braces = [
                `${prefix}{`,
                "}"
            ];
        } else if (isMap1(value)) {
            const size = value.size;
            const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
            keys = getKeys(value, ctx.showHidden);
            formatter = constructor !== null ? formatMap.bind(null, value) : formatMap.bind(null, value.entries());
            if (size === 0 && keys.length === 0 && protoProps === undefined) {
                return `${prefix}{}`;
            }
            braces = [
                `${prefix}{`,
                "}"
            ];
        } else if (isTypedArray(value)) {
            keys = getOwnNonIndexProperties(value, filter);
            const bound = value;
            const fallback = "";
            const size = value.length;
            const prefix = getPrefix(constructor, tag, fallback, `(${size})`);
            braces = [
                `${prefix}[`,
                "]"
            ];
            if (value.length === 0 && keys.length === 0 && !ctx.showHidden) {
                return `${braces[0]}]`;
            }
            formatter = formatTypedArray.bind(null, bound, size);
            extrasType = kArrayExtrasType;
        } else if (isMapIterator1(value)) {
            keys = getKeys(value, ctx.showHidden);
            braces = getIteratorBraces("Map", tag);
            formatter = formatIterator.bind(null, braces);
        } else if (isSetIterator1(value)) {
            keys = getKeys(value, ctx.showHidden);
            braces = getIteratorBraces("Set", tag);
            formatter = formatIterator.bind(null, braces);
        } else {
            noIterator = true;
        }
    }
    if (noIterator) {
        keys = getKeys(value, ctx.showHidden);
        braces = [
            "{",
            "}"
        ];
        if (constructor === "Object") {
            if (isArgumentsObject1(value)) {
                braces[0] = "[Arguments] {";
            } else if (tag !== "") {
                braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
            }
            if (keys.length === 0 && protoProps === undefined) {
                return `${braces[0]}}`;
            }
        } else if (typeof value === "function") {
            base1 = getFunctionBase(value, constructor, tag);
            if (keys.length === 0 && protoProps === undefined) {
                return ctx.stylize(base1, "special");
            }
        } else if (isRegExp1(value)) {
            base1 = RegExp(constructor !== null ? value : new RegExp(value)).toString();
            const prefix = getPrefix(constructor, tag, "RegExp");
            if (prefix !== "RegExp ") {
                base1 = `${prefix}${base1}`;
            }
            if (keys.length === 0 && protoProps === undefined || recurseTimes > ctx.depth && ctx.depth !== null) {
                return ctx.stylize(base1, "regexp");
            }
        } else if (isDate1(value)) {
            base1 = Number.isNaN(value.getTime()) ? value.toString() : value.toISOString();
            const prefix = getPrefix(constructor, tag, "Date");
            if (prefix !== "Date ") {
                base1 = `${prefix}${base1}`;
            }
            if (keys.length === 0 && protoProps === undefined) {
                return ctx.stylize(base1, "date");
            }
        } else if (value instanceof Error) {
            base1 = formatError(value, constructor, tag, ctx, keys);
            if (keys.length === 0 && protoProps === undefined) {
                return base1;
            }
        } else if (isAnyArrayBuffer1(value)) {
            const arrayType = isArrayBuffer1(value) ? "ArrayBuffer" : "SharedArrayBuffer";
            const prefix = getPrefix(constructor, tag, arrayType);
            if (typedArray === undefined) {
                formatter = formatArrayBuffer;
            } else if (keys.length === 0 && protoProps === undefined) {
                return prefix + `{ byteLength: ${formatNumber(ctx.stylize, value.byteLength)} }`;
            }
            braces[0] = `${prefix}{`;
            Array.prototype.unshift(keys, "byteLength");
        } else if (isDataView1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
            Array.prototype.unshift(keys, "byteLength", "byteOffset", "buffer");
        } else if (isPromise1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
            formatter = formatPromise;
        } else if (isWeakSet1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
            formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
        } else if (isWeakMap1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
            formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
        } else if (isModuleNamespaceObject1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
            formatter = formatNamespaceObject.bind(null, keys);
        } else if (isBoxedPrimitive1(value)) {
            base1 = getBoxedBase(value, ctx, keys, constructor, tag);
            if (keys.length === 0 && protoProps === undefined) {
                return base1;
            }
        } else {
            if (keys.length === 0 && protoProps === undefined) {
                return `${getCtxStyle(value, constructor, tag)}{}`;
            }
            braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
        }
    }
    if (recurseTimes > ctx.depth && ctx.depth !== null) {
        let constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
        if (constructor !== null) {
            constructorName = `[${constructorName}]`;
        }
        return ctx.stylize(constructorName, "special");
    }
    recurseTimes += 1;
    ctx.seen.push(value);
    ctx.currentDepth = recurseTimes;
    let output;
    const indentationLvl = ctx.indentationLvl;
    try {
        output = formatter(ctx, value, recurseTimes);
        for(i13 = 0; i13 < keys.length; i13++){
            output.push(formatProperty(ctx, value, recurseTimes, keys[i13], extrasType));
        }
        if (protoProps !== undefined) {
            output.push(...protoProps);
        }
    } catch (err) {
        const constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
        return handleMaxCallStackSize(ctx, err, constructorName, indentationLvl);
    }
    if (ctx.circular !== undefined) {
        const index = ctx.circular.get(value);
        if (index !== undefined) {
            const reference = ctx.stylize(`<ref *${index}>`, "special");
            if (ctx.compact !== true) {
                base1 = base1 === "" ? reference : `${reference} ${base1}`;
            } else {
                braces[0] = `${reference} ${braces[0]}`;
            }
        }
    }
    ctx.seen.pop();
    if (ctx.sorted) {
        const comparator = ctx.sorted === true ? undefined : ctx.sorted;
        if (extrasType === 0) {
            output = output.sort(comparator);
        } else if (keys.length > 1) {
            const sorted = output.slice(output.length - keys.length).sort(comparator);
            output.splice(output.length - keys.length, keys.length, ...sorted);
        }
    }
    const res = reduceToSingleString(ctx, output, base1, braces, extrasType, recurseTimes, value);
    const budget = ctx.budget[ctx.indentationLvl] || 0;
    const newLength = budget + res.length;
    ctx.budget[ctx.indentationLvl] = newLength;
    if (newLength > 2 ** 27) {
        ctx.depth = -1;
    }
    return res;
}
const builtInObjects = new Set(Object.getOwnPropertyNames(globalThis).filter((e)=>/^[A-Z][a-zA-Z0-9]+$/.test(e)
));
function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
    let depth = 0;
    let keys;
    let keySet;
    do {
        if (depth !== 0 || main === obj) {
            obj = Object.getPrototypeOf(obj);
            if (obj === null) {
                return;
            }
            const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
            if (descriptor !== undefined && typeof descriptor.value === "function" && builtInObjects.has(descriptor.value.name)) {
                return;
            }
        }
        if (depth === 0) {
            keySet = new Set();
        } else {
            Array.prototype.forEach(keys, (key)=>keySet.add(key)
            );
        }
        keys = Reflect.ownKeys(obj);
        Array.prototype.push(ctx.seen, main);
        for (const key1 of keys){
            if (key1 === "constructor" || main.hasOwnProperty(key1) || depth !== 0 && keySet.has(key1)) {
                continue;
            }
            const desc = Object.getOwnPropertyDescriptor(obj, key1);
            if (typeof desc.value === "function") {
                continue;
            }
            const value = formatProperty(ctx, obj, recurseTimes, key1, 0, desc, main);
            if (ctx.colors) {
                Array.prototype.push(output, `\u001b[2m${value}\u001b[22m`);
            } else {
                Array.prototype.push(output, value);
            }
        }
        Array.prototype.pop(ctx.seen);
    }while (++depth !== 3)
}
function getConstructorName(obj, ctx, recurseTimes, protoProps) {
    let firstProto;
    const tmp = obj;
    while(obj || isUndetectableObject(obj)){
        const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
        if (descriptor !== undefined && typeof descriptor.value === "function" && descriptor.value.name !== "" && isInstanceof(tmp, descriptor.value)) {
            if (protoProps !== undefined && (firstProto !== obj || !builtInObjects.has(descriptor.value.name))) {
                addPrototypeProperties(ctx, tmp, firstProto || tmp, recurseTimes, protoProps);
            }
            return descriptor.value.name;
        }
        obj = Object.getPrototypeOf(obj);
        if (firstProto === undefined) {
            firstProto = obj;
        }
    }
    if (firstProto === null) {
        return null;
    }
    const res = undefined;
    if (recurseTimes > ctx.depth && ctx.depth !== null) {
        return `${res} <Complex prototype>`;
    }
    const protoConstr = getConstructorName(firstProto, ctx, recurseTimes + 1, protoProps);
    if (protoConstr === null) {
        return `${res} <${inspect(firstProto, {
            ...ctx,
            customInspect: false,
            depth: -1
        })}>`;
    }
    return `${res} <${protoConstr}>`;
}
function formatPrimitive(fn, value, ctx) {
    if (typeof value === "string") {
        let trailer = "";
        if (value.length > ctx.maxStringLength) {
            const remaining = value.length - ctx.maxStringLength;
            value = value.slice(0, ctx.maxStringLength);
            trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
        }
        if (ctx.compact !== true && value.length > 16 && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
            return value.split(/(?<=\n)/).map((line)=>fn(strEscape(line), "string")
            ).join(` +\n${" ".repeat(ctx.indentationLvl + 2)}`) + trailer;
        }
        return fn(strEscape(value), "string") + trailer;
    }
    if (typeof value === "number") {
        return formatNumber(fn, value);
    }
    if (typeof value === "bigint") {
        return formatBigInt(fn, value);
    }
    if (typeof value === "boolean") {
        return fn(`${value}`, "boolean");
    }
    if (typeof value === "undefined") {
        return fn("undefined", "undefined");
    }
    return fn(value.toString(), "symbol");
}
function getEmptyFormatArray() {
    return [];
}
function isInstanceof(object, proto) {
    try {
        return object instanceof proto;
    } catch  {
        return false;
    }
}
function getPrefix(constructor, tag, fallback, size = "") {
    if (constructor === null) {
        if (tag !== "" && fallback !== tag) {
            return `[${fallback}${size}: null prototype] [${tag}] `;
        }
        return `[${fallback}${size}: null prototype] `;
    }
    if (tag !== "" && constructor !== tag) {
        return `${constructor}${size} [${tag}] `;
    }
    return `${constructor}${size} `;
}
function formatArray(ctx, value, recurseTimes) {
    const valLen = value.length;
    const len = Math.min(Math.max(0, ctx.maxArrayLength), valLen);
    const remaining = valLen - len;
    const output = [];
    for(let i14 = 0; i14 < len; i14++){
        if (!value.hasOwnProperty(i14)) {
            return formatSpecialArray(ctx, value, recurseTimes, len, output, i14);
        }
        output.push(formatProperty(ctx, value, recurseTimes, i14, 1));
    }
    if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function getCtxStyle(_value, constructor, tag) {
    let fallback = "";
    if (constructor === null) {
        if (fallback === tag) {
            fallback = "Object";
        }
    }
    return getPrefix(constructor, tag, fallback);
}
function getKeys(value, showHidden) {
    let keys;
    const symbols1 = Object.getOwnPropertySymbols(value);
    if (showHidden) {
        keys = Object.getOwnPropertyNames(value);
        if (symbols1.length !== 0) {
            Array.prototype.push.apply(keys, symbols1);
        }
    } else {
        try {
            keys = Object.keys(value);
        } catch (_err) {
            keys = Object.getOwnPropertyNames(value);
        }
        if (symbols1.length !== 0) {}
    }
    return keys;
}
function formatSet(value, ctx, _ignored, recurseTimes) {
    const output = [];
    ctx.indentationLvl += 2;
    for (const v5 of value){
        Array.prototype.push(output, formatValue(ctx, v5, recurseTimes));
    }
    ctx.indentationLvl -= 2;
    return output;
}
function formatMap(value, ctx, _gnored, recurseTimes) {
    const output = [];
    ctx.indentationLvl += 2;
    for (const { 0: k7 , 1: v6  } of value){
        output.push(`${formatValue(ctx, k7, recurseTimes)} => ${formatValue(ctx, v6, recurseTimes)}`);
    }
    ctx.indentationLvl -= 2;
    return output;
}
function formatTypedArray(value, length, ctx, _ignored, recurseTimes) {
    const maxLength = Math.min(Math.max(0, ctx.maxArrayLength), length);
    const remaining = value.length - maxLength;
    const output = new Array(maxLength);
    const elementFormatter = value.length > 0 && typeof value[0] === "number" ? formatNumber : formatBigInt;
    for(let i15 = 0; i15 < maxLength; ++i15){
        output[i15] = elementFormatter(ctx.stylize, value[i15]);
    }
    if (remaining > 0) {
        output[maxLength] = `... ${remaining} more item${remaining > 1 ? "s" : ""}`;
    }
    if (ctx.showHidden) {
        ctx.indentationLvl += 2;
        for (const key of [
            "BYTES_PER_ELEMENT",
            "length",
            "byteLength",
            "byteOffset",
            "buffer", 
        ]){
            const str = formatValue(ctx, value[key], recurseTimes, true);
            Array.prototype.push(output, `[${key}]: ${str}`);
        }
        ctx.indentationLvl -= 2;
    }
    return output;
}
function getIteratorBraces(type4, tag) {
    if (tag !== `${type4} Iterator`) {
        if (tag !== "") {
            tag += "] [";
        }
        tag += `${type4} Iterator`;
    }
    return [
        `[${tag}] {`,
        "}"
    ];
}
function formatIterator(braces, ctx, value, recurseTimes) {
    const { 0: entries , 1: isKeyValue  } = value;
    if (isKeyValue) {
        braces[0] = braces[0].replace(/ Iterator] {$/, " Entries] {");
        return formatMapIterInner(ctx, recurseTimes, entries, 2);
    }
    return formatSetIterInner(ctx, recurseTimes, entries, 1);
}
function getFunctionBase(value, constructor, tag) {
    const stringified = Function.prototype.toString(value);
    if (stringified.slice(0, 5) === "class" && stringified.endsWith("}")) {
        const slice = stringified.slice(5, -1);
        const bracketIndex = slice.indexOf("{");
        if (bracketIndex !== -1 && (!slice.slice(0, bracketIndex).includes("(") || classRegExp.test(slice.replace(stripCommentsRegExp)))) {
            return getClassBase(value, constructor, tag);
        }
    }
    let type5 = "Function";
    if (isGeneratorFunction1(value)) {
        type5 = `Generator${type5}`;
    }
    if (isAsyncFunction1(value)) {
        type5 = `Async${type5}`;
    }
    let base2 = `[${type5}`;
    if (constructor === null) {
        base2 += " (null prototype)";
    }
    if (value.name === "") {
        base2 += " (anonymous)";
    } else {
        base2 += `: ${value.name}`;
    }
    base2 += "]";
    if (constructor !== type5 && constructor !== null) {
        base2 += ` ${constructor}`;
    }
    if (tag !== "" && constructor !== tag) {
        base2 += ` [${tag}]`;
    }
    return base2;
}
function formatError(err, constructor, tag, ctx, keys) {
    const name16 = err.name != null ? String(err.name) : "Error";
    let len = name16.length;
    let stack = err.stack ? String(err.stack) : err.toString();
    if (!ctx.showHidden && keys.length !== 0) {
        for (const name17 of [
            "name",
            "message",
            "stack"
        ]){
            const index = keys.indexOf(name17);
            if (index !== -1 && stack.includes(err[name17])) {
                keys.splice(index, 1);
            }
        }
    }
    if (constructor === null || name16.endsWith("Error") && stack.startsWith(name16) && (stack.length === len || stack[len] === ":" || stack[len] === "\n")) {
        let fallback = "Error";
        if (constructor === null) {
            const start = stack.match(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) || stack.match(/^([a-z_A-Z0-9-]*Error)$/);
            fallback = start && start[1] || "";
            len = fallback.length;
            fallback = fallback || "Error";
        }
        const prefix = getPrefix(constructor, tag, fallback).slice(0, -1);
        if (name16 !== prefix) {
            if (prefix.includes(name16)) {
                if (len === 0) {
                    stack = `${prefix}: ${stack}`;
                } else {
                    stack = `${prefix}${stack.slice(len)}`;
                }
            } else {
                stack = `${prefix} [${name16}]${stack.slice(len)}`;
            }
        }
    }
    let pos = err.message && stack.indexOf(err.message) || -1;
    if (pos !== -1) {
        pos += err.message.length;
    }
    const stackStart = stack.indexOf("\n    at", pos);
    if (stackStart === -1) {
        stack = `[${stack}]`;
    } else if (ctx.colors) {
        let newStack = stack.slice(0, stackStart);
        const lines = stack.slice(stackStart + 1).split("\n");
        for (const line of lines){
            let nodeModule;
            newStack += "\n";
            let pos = 0;
            while(nodeModule = nodeModulesRegExp.exec(line)){
                newStack += line.slice(pos, nodeModule.index + 14);
                newStack += ctx.stylize(nodeModule[1], "module");
                pos = nodeModule.index + nodeModule[0].length;
            }
            newStack += pos === 0 ? line : line.slice(pos);
        }
        stack = newStack;
    }
    if (ctx.indentationLvl !== 0) {
        const indentation = " ".repeat(ctx.indentationLvl);
        stack = stack.replace(/\n/g, `\n${indentation}`);
    }
    return stack;
}
let hexSlice;
function formatArrayBuffer(ctx, value) {
    let buffer;
    try {
        buffer = new Uint8Array(value);
    } catch  {
        return [
            ctx.stylize("(detached)", "special")
        ];
    }
    let str = hexSlice(buffer, 0, Math.min(ctx.maxArrayLength, buffer.length)).replace(/(.{2})/g, "$1 ").trim();
    const remaining = buffer.length - ctx.maxArrayLength;
    if (remaining > 0) {
        str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
    }
    return [
        `${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`
    ];
}
function formatNumber(fn, value) {
    return fn(Object.is(value, -0) ? "-0" : `${value}`, "number");
}
function formatPromise(ctx, value, recurseTimes) {
    let output;
    const { 0: state , 1: result  } = value;
    if (state === 0) {
        output = [
            ctx.stylize("<pending>", "special")
        ];
    } else {
        ctx.indentationLvl += 2;
        const str = formatValue(ctx, result, recurseTimes);
        ctx.indentationLvl -= 2;
        output = [
            state === kRejected ? `${ctx.stylize("<rejected>", "special")} ${str}` : str, 
        ];
    }
    return output;
}
function formatWeakCollection(ctx) {
    return [
        ctx.stylize("<items unknown>", "special")
    ];
}
function formatWeakSet(ctx, value, recurseTimes) {
    const entries = value;
    return formatSetIterInner(ctx, recurseTimes, entries, 0);
}
function formatWeakMap(ctx, value, recurseTimes) {
    const entries = value;
    return formatMapIterInner(ctx, recurseTimes, entries, 0);
}
function formatProperty(ctx, value, recurseTimes, key, type6, desc, original = value) {
    let name18, str;
    let extra = " ";
    desc = desc || Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key],
        enumerable: true
    };
    if (desc.value !== undefined) {
        const diff1 = ctx.compact !== true || type6 !== 0 ? 2 : 3;
        ctx.indentationLvl += diff1;
        str = formatValue(ctx, desc.value, recurseTimes);
        if (diff1 === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
            extra = `\n${" ".repeat(ctx.indentationLvl)}`;
        }
        ctx.indentationLvl -= diff1;
    } else if (desc.get !== undefined) {
        const label = desc.set !== undefined ? "Getter/Setter" : "Getter";
        const s = ctx.stylize;
        const sp = "special";
        if (ctx.getters && (ctx.getters === true || ctx.getters === "get" && desc.set === undefined || ctx.getters === "set" && desc.set !== undefined)) {
            try {
                const tmp = desc.get.call(original);
                ctx.indentationLvl += 2;
                if (tmp === null) {
                    str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
                } else if (typeof tmp === "object") {
                    str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
                } else {
                    const primitive = formatPrimitive(s, tmp, ctx);
                    str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
                }
                ctx.indentationLvl -= 2;
            } catch (err) {
                const message = `<Inspection threw (${err.message})>`;
                str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
            }
        } else {
            str = ctx.stylize(`[${label}]`, sp);
        }
    } else if (desc.set !== undefined) {
        str = ctx.stylize("[Setter]", "special");
    } else {
        str = ctx.stylize("undefined", "undefined");
    }
    if (type6 === 1) {
        return str;
    }
    if (typeof key === "symbol") {
        const tmp = key.toString().replace(strEscapeSequencesReplacer, escapeFn);
        name18 = `[${ctx.stylize(tmp, "symbol")}]`;
    } else if (key === "__proto__") {
        name18 = "['__proto__']";
    } else if (desc.enumerable === false) {
        const tmp = key.replace(strEscapeSequencesReplacer, escapeFn);
        name18 = `[${tmp}]`;
    } else if (keyStrRegExp.test(key)) {
        name18 = ctx.stylize(key, "name");
    } else {
        name18 = ctx.stylize(strEscape(key), "string");
    }
    return `${name18}:${extra}${str}`;
}
function handleMaxCallStackSize(_ctx, _err, _constructorName, _indentationLvl) {}
const colorRegExp = /\u001b\[\d\d?m/g;
function removeColors(str) {
    return str.replace(colorRegExp, "");
}
function isBelowBreakLength(ctx, output, start, base3) {
    let totalLength = output.length + start;
    if (totalLength + output.length > ctx.breakLength) {
        return false;
    }
    for(let i16 = 0; i16 < output.length; i16++){
        if (ctx.colors) {
            totalLength += removeColors(output[i16]).length;
        } else {
            totalLength += output[i16].length;
        }
        if (totalLength > ctx.breakLength) {
            return false;
        }
    }
    return base3 === "" || !base3.includes("\n");
}
function formatBigInt(fn, value) {
    return fn(`${value}n`, "bigint");
}
function formatNamespaceObject(keys, ctx, value, recurseTimes) {
    const output = new Array(keys.length);
    for(let i17 = 0; i17 < keys.length; i17++){
        try {
            output[i17] = formatProperty(ctx, value, recurseTimes, keys[i17], kObjectType);
        } catch (_err) {
            const tmp = {
                [keys[i17]]: ""
            };
            output[i17] = formatProperty(ctx, tmp, recurseTimes, keys[i17], kObjectType);
            const pos = output[i17].lastIndexOf(" ");
            output[i17] = output[i17].slice(0, pos + 1) + ctx.stylize("<uninitialized>", "special");
        }
    }
    keys.length = 0;
    return output;
}
function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i18) {
    const keys = Object.keys(value);
    let index = i18;
    for(; i18 < keys.length && output.length < maxLength; i18++){
        const key = keys[i18];
        const tmp = +key;
        if (tmp > 2 ** 32 - 2) {
            break;
        }
        if (`${index}` !== key) {
            if (!numberRegExp.test(key)) {
                break;
            }
            const emptyItems = tmp - index;
            const ending = emptyItems > 1 ? "s" : "";
            const message = `<${emptyItems} empty item${ending}>`;
            output.push(ctx.stylize(message, "undefined"));
            index = tmp;
            if (output.length === maxLength) {
                break;
            }
        }
        output.push(formatProperty(ctx, value, recurseTimes, key, 1));
        index++;
    }
    const remaining = value.length - index;
    if (output.length !== maxLength) {
        if (remaining > 0) {
            const ending = remaining > 1 ? "s" : "";
            const message = `<${remaining} empty item${ending}>`;
            output.push(ctx.stylize(message, "undefined"));
        }
    } else if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function getBoxedBase(value, ctx, keys, constructor, tag) {
    let type7;
    if (isNumberObject1(value)) {
        type7 = "Number";
    } else if (isStringObject1(value)) {
        type7 = "String";
        keys.splice(0, value.length);
    } else if (isBooleanObject1(value)) {
        type7 = "Boolean";
    } else if (isBigIntObject1(value)) {
        type7 = "BigInt";
    } else {
        type7 = "Symbol";
    }
    let base4 = `[${type7}`;
    if (type7 !== constructor) {
        if (constructor === null) {
            base4 += " (null prototype)";
        } else {
            base4 += ` (${constructor})`;
        }
    }
    base4 += `: ${formatPrimitive(stylizeNoColor, value.valueOf(), ctx)}]`;
    if (tag !== "" && tag !== constructor) {
        base4 += ` [${tag}]`;
    }
    if (keys.length !== 0 || ctx.stylize === stylizeNoColor) {
        return base4;
    }
    return ctx.stylize(base4, type7.toLowerCase());
}
function getClassBase(value, constructor, tag) {
    const hasName = value.hasOwnProperty("name");
    const name19 = hasName && value.name || "(anonymous)";
    let base5 = `class ${name19}`;
    if (constructor !== "Function" && constructor !== null) {
        base5 += ` [${constructor}]`;
    }
    if (tag !== "" && constructor !== tag) {
        base5 += ` [${tag}]`;
    }
    if (constructor !== null) {
        const superName = Object.getPrototypeOf(value).name;
        if (superName) {
            base5 += ` extends ${superName}`;
        }
    } else {
        base5 += " extends [null prototype]";
    }
    return `[${base5}]`;
}
function reduceToSingleString(ctx, output, base6, braces, extrasType, recurseTimes, value) {
    if (ctx.compact !== true) {
        if (typeof ctx.compact === "number" && ctx.compact >= 1) {
            const entries = output.length;
            if (extrasType === 2 && entries > 6) {
                output = groupArrayElements(ctx, output, value);
            }
            if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
                const start = output.length + ctx.indentationLvl + braces[0].length + base6.length + 10;
                if (isBelowBreakLength(ctx, output, start, base6)) {
                    return `${base6 ? `${base6} ` : ""}${braces[0]} ${join(output, ", ")}` + ` ${braces[1]}`;
                }
            }
        }
        const indentation = `\n${" ".repeat(ctx.indentationLvl)}`;
        return `${base6 ? `${base6} ` : ""}${braces[0]}${indentation}  ` + `${join(output, `,${indentation}  `)}${indentation}${braces[1]}`;
    }
    if (isBelowBreakLength(ctx, output, 0, base6)) {
        return `${braces[0]}${base6 ? ` ${base6}` : ""} ${join(output, ", ")} ` + braces[1];
    }
    const indentation = " ".repeat(ctx.indentationLvl);
    const ln = base6 === "" && braces[0].length === 1 ? " " : `${base6 ? ` ${base6}` : ""}\n${indentation}  `;
    return `${braces[0]}${ln}${join(output, `,\n${indentation}  `)} ${braces[1]}`;
}
function join(output, separator) {
    let str = "";
    if (output.length !== 0) {
        const lastIndex = output.length - 1;
        for(let i19 = 0; i19 < lastIndex; i19++){
            str += output[i19];
            str += separator;
        }
        str += output[lastIndex];
    }
    return str;
}
function groupArrayElements(ctx, output, value) {
    let totalLength = 0;
    let maxLength = 0;
    let i20 = 0;
    let outputLength = output.length;
    if (ctx.maxArrayLength < output.length) {
        outputLength--;
    }
    const separatorSpace = 2;
    const dataLen = new Array(outputLength);
    for(; i20 < outputLength; i20++){
        const len = getStringWidth(output[i20], ctx.colors);
        dataLen[i20] = len;
        totalLength += len + separatorSpace;
        if (maxLength < len) {
            maxLength = len;
        }
    }
    const actualMax = maxLength + 2;
    if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
        const averageBias = Math.sqrt(actualMax - totalLength / output.length);
        const biasedMax = Math.max(actualMax - 3 - averageBias, 1);
        const columns = Math.min(Math.round(Math.sqrt(2.5 * biasedMax * outputLength) / biasedMax), Math.floor((ctx.breakLength - ctx.indentationLvl) / actualMax), ctx.compact * 4, 15);
        if (columns <= 1) {
            return output;
        }
        const tmp = [];
        const maxLineLength = [];
        for(let i21 = 0; i21 < columns; i21++){
            let lineMaxLength = 0;
            for(let j5 = i21; j5 < output.length; j5 += columns){
                if (dataLen[j5] > lineMaxLength) {
                    lineMaxLength = dataLen[j5];
                }
            }
            lineMaxLength += separatorSpace;
            maxLineLength[i21] = lineMaxLength;
        }
        let order = String.prototype.padStart;
        if (value !== undefined) {
            for(let i22 = 0; i22 < output.length; i22++){
                if (typeof value[i22] !== "number" && typeof value[i22] !== "bigint") {
                    order = String.prototype.padEnd;
                    break;
                }
            }
        }
        for(let i1 = 0; i1 < outputLength; i1 += columns){
            const max = Math.min(i1 + columns, outputLength);
            let str = "";
            let j6 = i1;
            for(; j6 < max - 1; j6++){
                const padding = maxLineLength[j6 - i1] + output[j6].length - dataLen[j6];
                str += `${output[j6]}, `.padStart(padding, " ");
            }
            if (order === String.prototype.padStart) {
                const padding = maxLineLength[j6 - i1] + output[j6].length - dataLen[j6] - 2;
                str += output[j6].padStart(padding, " ");
            } else {
                str += output[j6];
            }
            Array.prototype.push(tmp, str);
        }
        if (ctx.maxArrayLength < output.length) {
            Array.prototype.push(tmp, output[outputLength]);
        }
        output = tmp;
    }
    return output;
}
function formatMapIterInner(ctx, recurseTimes, entries, state) {
    const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
    const len = entries.length / 2;
    const remaining = len - maxArrayLength;
    const maxLength = Math.min(maxArrayLength, len);
    let output = new Array(maxLength);
    let i23 = 0;
    ctx.indentationLvl += 2;
    if (state === 0) {
        for(; i23 < maxLength; i23++){
            const pos = i23 * 2;
            output[i23] = `${formatValue(ctx, entries[pos], recurseTimes)} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
        }
        if (!ctx.sorted) {
            output = output.sort();
        }
    } else {
        for(; i23 < maxLength; i23++){
            const pos = i23 * 2;
            const res = [
                formatValue(ctx, entries[pos], recurseTimes),
                formatValue(ctx, entries[pos + 1], recurseTimes), 
            ];
            output[i23] = reduceToSingleString(ctx, res, "", [
                "[",
                "]"
            ], kArrayExtrasType, recurseTimes);
        }
    }
    ctx.indentationLvl -= 2;
    if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function formatSetIterInner(ctx, recurseTimes, entries, state) {
    const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
    const maxLength = Math.min(maxArrayLength, entries.length);
    const output = new Array(maxLength);
    ctx.indentationLvl += 2;
    for(let i24 = 0; i24 < maxLength; i24++){
        output[i24] = formatValue(ctx, entries[i24], recurseTimes);
    }
    ctx.indentationLvl -= 2;
    if (state === 0 && !ctx.sorted) {
        output.sort();
    }
    const remaining = entries.length - maxLength;
    if (remaining > 0) {
        Array.prototype.push(output, `... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
const ansiPattern = "[\\u001B\\u009B][[\\]()#;?]*" + "(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*" + "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" + "|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
const ansi = new RegExp(ansiPattern, "g");
function getStringWidth(str, removeControlChars = true) {
    let width = 0;
    if (removeControlChars) {
        str = stripVTControlCharacters(str);
    }
    str = str.normalize("NFC");
    for (const __char of str[Symbol.iterator]()){
        const code2 = __char.codePointAt(0);
        if (isFullWidthCodePoint(code2)) {
            width += 2;
        } else if (!isZeroWidthCodePoint(code2)) {
            width++;
        }
    }
    return width;
}
const isFullWidthCodePoint = (code3)=>{
    return code3 >= 0x1100 && (code3 <= 0x115f || code3 === 0x2329 || code3 === 0x232a || code3 >= 0x2e80 && code3 <= 0x3247 && code3 !== 0x303f || code3 >= 0x3250 && code3 <= 0x4dbf || code3 >= 0x4e00 && code3 <= 0xa4c6 || code3 >= 0xa960 && code3 <= 0xa97c || code3 >= 0xac00 && code3 <= 0xd7a3 || code3 >= 0xf900 && code3 <= 0xfaff || code3 >= 0xfe10 && code3 <= 0xfe19 || code3 >= 0xfe30 && code3 <= 0xfe6b || code3 >= 0xff01 && code3 <= 0xff60 || code3 >= 0xffe0 && code3 <= 0xffe6 || code3 >= 0x1b000 && code3 <= 0x1b001 || code3 >= 0x1f200 && code3 <= 0x1f251 || code3 >= 0x1f300 && code3 <= 0x1f64f || code3 >= 0x20000 && code3 <= 0x3fffd);
};
const isZeroWidthCodePoint = (code4)=>{
    return code4 <= 0x1F || code4 >= 0x7F && code4 <= 0x9F || code4 >= 0x300 && code4 <= 0x36F || code4 >= 0x200B && code4 <= 0x200F || code4 >= 0x20D0 && code4 <= 0x20FF || code4 >= 0xFE00 && code4 <= 0xFE0F || code4 >= 0xFE20 && code4 <= 0xFE2F || code4 >= 0xE0100 && code4 <= 0xE01EF;
};
function hasBuiltInToString(value) {
    const proxyTarget = undefined;
    if (proxyTarget !== undefined) {
        value = proxyTarget;
    }
    if (typeof value.toString !== "function") {
        return true;
    }
    if (Object.prototype.hasOwnProperty.call(value, "toString")) {
        return false;
    }
    let pointer = value;
    do {
        pointer = Object.getPrototypeOf(pointer);
    }while (!Object.prototype.hasOwnProperty.call(pointer, "toString"))
    const descriptor = Object.getOwnPropertyDescriptor(pointer, "constructor");
    return descriptor !== undefined && typeof descriptor.value === "function" && builtInObjects.has(descriptor.value.name);
}
const firstErrorLine = (error1)=>error1.message.split("\n", 1)[0]
;
let CIRCULAR_ERROR_MESSAGE;
function tryStringify(arg) {
    try {
        return JSON.stringify(arg);
    } catch (err) {
        if (!CIRCULAR_ERROR_MESSAGE) {
            try {
                const a = {};
                a.a = a;
                JSON.stringify(a);
            } catch (circularError) {
                CIRCULAR_ERROR_MESSAGE = firstErrorLine(circularError);
            }
        }
        if (err.name === "TypeError" && firstErrorLine(err) === CIRCULAR_ERROR_MESSAGE) {
            return "[Circular]";
        }
        throw err;
    }
}
function format1(...args) {
    return formatWithOptionsInternal(undefined, args);
}
function formatWithOptions(inspectOptions, ...args) {
    if (typeof inspectOptions !== "object" || inspectOptions === null) {
        throw new codes.ERR_INVALID_ARG_TYPE("inspectOptions", "object", inspectOptions);
    }
    return formatWithOptionsInternal(inspectOptions, args);
}
function formatNumberNoColor(number, options) {
    return formatNumber(stylizeNoColor, number, options?.numericSeparator ?? inspectDefaultOptions.numericSeparator);
}
function formatBigIntNoColor(bigint, options) {
    return formatBigInt(stylizeNoColor, bigint, options?.numericSeparator ?? inspectDefaultOptions.numericSeparator);
}
function formatWithOptionsInternal(inspectOptions, args) {
    const first = args[0];
    let a = 0;
    let str = "";
    let join1 = "";
    if (typeof first === "string") {
        if (args.length === 1) {
            return first;
        }
        let tempStr;
        let lastPos = 0;
        for(let i25 = 0; i25 < first.length - 1; i25++){
            if (first.charCodeAt(i25) === 37) {
                const nextChar = first.charCodeAt(++i25);
                if (a + 1 !== args.length) {
                    switch(nextChar){
                        case 115:
                            const tempArg = args[++a];
                            if (typeof tempArg === "number") {
                                tempStr = formatNumberNoColor(tempArg, inspectOptions);
                            } else if (typeof tempArg === "bigint") {
                                tempStr = formatBigIntNoColor(tempArg, inspectOptions);
                            } else if (typeof tempArg !== "object" || tempArg === null || !hasBuiltInToString(tempArg)) {
                                tempStr = String(tempArg);
                            } else {
                                tempStr = inspect(tempArg, {
                                    ...inspectOptions,
                                    compact: 3,
                                    colors: false,
                                    depth: 0
                                });
                            }
                            break;
                        case 106:
                            tempStr = tryStringify(args[++a]);
                            break;
                        case 100:
                            const tempNum = args[++a];
                            if (typeof tempNum === "bigint") {
                                tempStr = formatBigIntNoColor(tempNum, inspectOptions);
                            } else if (typeof tempNum === "symbol") {
                                tempStr = "NaN";
                            } else {
                                tempStr = formatNumberNoColor(Number(tempNum), inspectOptions);
                            }
                            break;
                        case 79:
                            tempStr = inspect(args[++a], inspectOptions);
                            break;
                        case 111:
                            tempStr = inspect(args[++a], {
                                ...inspectOptions,
                                showHidden: true,
                                showProxy: true,
                                depth: 4
                            });
                            break;
                        case 105:
                            const tempInteger = args[++a];
                            if (typeof tempInteger === "bigint") {
                                tempStr = formatBigIntNoColor(tempInteger, inspectOptions);
                            } else if (typeof tempInteger === "symbol") {
                                tempStr = "NaN";
                            } else {
                                tempStr = formatNumberNoColor(Number.parseInt(tempInteger), inspectOptions);
                            }
                            break;
                        case 102:
                            const tempFloat = args[++a];
                            if (typeof tempFloat === "symbol") {
                                tempStr = "NaN";
                            } else {
                                tempStr = formatNumberNoColor(Number.parseFloat(tempFloat), inspectOptions);
                            }
                            break;
                        case 99:
                            a += 1;
                            tempStr = "";
                            break;
                        case 37:
                            str += first.slice(lastPos, i25);
                            lastPos = i25 + 1;
                            continue;
                        default:
                            continue;
                    }
                    if (lastPos !== i25 - 1) {
                        str += first.slice(lastPos, i25 - 1);
                    }
                    str += tempStr;
                    lastPos = i25 + 1;
                } else if (nextChar === 37) {
                    str += first.slice(lastPos, i25);
                    lastPos = i25 + 1;
                }
            }
        }
        if (lastPos !== 0) {
            a++;
            join1 = " ";
            if (lastPos < first.length) {
                str += first.slice(lastPos);
            }
        }
    }
    while(a < args.length){
        const value = args[a];
        str += join1;
        str += typeof value !== "string" ? inspect(value, inspectOptions) : value;
        join1 = " ";
        a++;
    }
    return str;
}
function stripVTControlCharacters(str) {
    validateString(str, "str");
    return str.replace(ansi, "");
}
Symbol.for("nodejs.util.inspect.custom");
const kEnumerableProperty = Object.create(null);
kEnumerableProperty.enumerable = true;
function once(callback) {
    let called = false;
    return function(...args) {
        if (called) return;
        called = true;
        Reflect.apply(callback, this, args);
    };
}
function createDeferredPromise() {
    let resolve10;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve10 = res;
        reject = rej;
    });
    return {
        promise,
        resolve: resolve10,
        reject
    };
}
const codesWarned = new Set();
function deprecate(fn, msg, code5) {
    if (code5 !== undefined) {
        validateString(code5, "code");
    }
    let warned = false;
    function deprecated(...args) {
        if (!warned) {
            warned = true;
            if (code5 !== undefined) {
                if (!codesWarned.has(code5)) {
                    process.emitWarning(msg, "DeprecationWarning", code5, deprecated);
                    codesWarned.add(code5);
                }
            } else {
                process.emitWarning(msg, "DeprecationWarning", deprecated);
            }
        }
        if (new.target) {
            return Reflect.construct(fn, args, new.target);
        }
        return Reflect.apply(fn, this, args);
    }
    Object.setPrototypeOf(deprecated, fn);
    if (fn.prototype) {
        deprecated.prototype = fn.prototype;
    }
    return deprecated;
}
const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
const kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");
const customPromisifyArgs = kCustomPromisifyArgsSymbol;
function promisify(original) {
    validateFunction(original, "original");
    if (original[kCustomPromisifiedSymbol]) {
        const fn = original[kCustomPromisifiedSymbol];
        validateFunction(fn, "util.promisify.custom");
        return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    const argumentNames = original[kCustomPromisifyArgsSymbol];
    function fn(...args) {
        return new Promise((resolve11, reject)=>{
            args.push((err, ...values)=>{
                if (err) {
                    return reject(err);
                }
                if (argumentNames !== undefined && values.length > 1) {
                    const obj = {};
                    for(let i26 = 0; i26 < argumentNames.length; i26++){
                        obj[argumentNames[i26]] = values[i26];
                    }
                    resolve11(obj);
                } else {
                    resolve11(values[0]);
                }
            });
            Reflect.apply(original, this, args);
        });
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
    });
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
promisify.custom = kCustomPromisifiedSymbol;
let core;
if (Deno?.core) {
    core = Deno.core;
} else {
    core = {
        setNextTickCallback: undefined,
        evalContext (_code, _filename) {
            throw new Error("Deno.core.evalContext is not supported in this environment");
        },
        encode (chunk) {
            return new TextEncoder().encode(chunk);
        }
    };
}
let _exiting = false;
const kSize = 2048;
const kMask = 2048 - 1;
class FixedCircularBuffer {
    bottom;
    top;
    list;
    next;
    constructor(){
        this.bottom = 0;
        this.top = 0;
        this.list = new Array(kSize);
        this.next = null;
    }
    isEmpty() {
        return this.top === this.bottom;
    }
    isFull() {
        return (this.top + 1 & kMask) === this.bottom;
    }
    push(data) {
        this.list[this.top] = data;
        this.top = this.top + 1 & kMask;
    }
    shift() {
        const nextItem = this.list[this.bottom];
        if (nextItem === undefined) {
            return null;
        }
        this.list[this.bottom] = undefined;
        this.bottom = this.bottom + 1 & kMask;
        return nextItem;
    }
}
class FixedQueue {
    head;
    tail;
    constructor(){
        this.head = this.tail = new FixedCircularBuffer();
    }
    isEmpty() {
        return this.head.isEmpty();
    }
    push(data) {
        if (this.head.isFull()) {
            this.head = this.head.next = new FixedCircularBuffer();
        }
        this.head.push(data);
    }
    shift() {
        const tail = this.tail;
        const next = tail.shift();
        if (tail.isEmpty() && tail.next !== null) {
            this.tail = tail.next;
        }
        return next;
    }
}
const queue = new FixedQueue();
let _nextTick;
if (typeof core.setNextTickCallback !== "undefined") {
    function runNextTicks() {
        if (!core.hasTickScheduled()) {
            core.runMicrotasks();
        }
        if (!core.hasTickScheduled()) {
            return true;
        }
        processTicksAndRejections();
        return true;
    }
    function processTicksAndRejections() {
        let tock;
        do {
            while(tock = queue.shift()){
                try {
                    const callback = tock.callback;
                    if (tock.args === undefined) {
                        callback();
                    } else {
                        const args = tock.args;
                        switch(args.length){
                            case 1:
                                callback(args[0]);
                                break;
                            case 2:
                                callback(args[0], args[1]);
                                break;
                            case 3:
                                callback(args[0], args[1], args[2]);
                                break;
                            case 4:
                                callback(args[0], args[1], args[2], args[3]);
                                break;
                            default:
                                callback(...args);
                        }
                    }
                } finally{}
            }
            core.runMicrotasks();
        }while (!queue.isEmpty())
        core.setHasTickScheduled(false);
    }
    core.setNextTickCallback(processTicksAndRejections);
    core.setMacrotaskCallback(runNextTicks);
    function __nextTickNative(callback, ...args) {
        validateCallback(callback);
        if (_exiting) {
            return;
        }
        let args_;
        switch(args.length){
            case 0:
                break;
            case 1:
                args_ = [
                    args[0]
                ];
                break;
            case 2:
                args_ = [
                    args[0],
                    args[1]
                ];
                break;
            case 3:
                args_ = [
                    args[0],
                    args[1],
                    args[2]
                ];
                break;
            default:
                args_ = new Array(args.length);
                for(let i27 = 0; i27 < args.length; i27++){
                    args_[i27] = args[i27];
                }
        }
        if (queue.isEmpty()) {
            core.setHasTickScheduled(true);
        }
        const tickObject = {
            callback,
            args: args_
        };
        queue.push(tickObject);
    }
    _nextTick = __nextTickNative;
} else {
    function __nextTickQueueMicrotask(callback, ...args) {
        if (args) {
            queueMicrotask(()=>callback.call(this, ...args)
            );
        } else {
            queueMicrotask(callback);
        }
    }
    _nextTick = __nextTickQueueMicrotask;
}
function nextTick2(callback, ...args) {
    _nextTick(callback, ...args);
}
class NodeFalsyValueRejectionError extends Error {
    reason;
    code = "ERR_FALSY_VALUE_REJECTION";
    constructor(reason){
        super("Promise was rejected with falsy value");
        this.reason = reason;
    }
}
class NodeInvalidArgTypeError extends TypeError {
    code = "ERR_INVALID_ARG_TYPE";
    constructor(argumentName){
        super(`The ${argumentName} argument must be of type function.`);
    }
}
function callbackify(original) {
    if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError('"original"');
    }
    const callbackified = function(...args1) {
        const maybeCb = args1.pop();
        if (typeof maybeCb !== "function") {
            throw new NodeInvalidArgTypeError("last");
        }
        const cb = (...args)=>{
            maybeCb.apply(this, args);
        };
        original.apply(this, args1).then((ret)=>{
            nextTick2(cb.bind(this, null, ret));
        }, (rej)=>{
            rej = rej || new NodeFalsyValueRejectionError(rej);
            nextTick2(cb.bind(this, rej));
        });
    };
    const descriptors = Object.getOwnPropertyDescriptors(original);
    if (typeof descriptors.length.value === "number") {
        descriptors.length.value++;
    }
    if (typeof descriptors.name.value === "string") {
        descriptors.name.value += "Callbackified";
    }
    Object.defineProperties(callbackified, descriptors);
    return callbackified;
}
var State;
(function(State1) {
    State1[State1["PASSTHROUGH"] = 0] = "PASSTHROUGH";
    State1[State1["PERCENT"] = 1] = "PERCENT";
    State1[State1["POSITIONAL"] = 2] = "POSITIONAL";
    State1[State1["PRECISION"] = 3] = "PRECISION";
    State1[State1["WIDTH"] = 4] = "WIDTH";
})(State || (State = {}));
var WorP;
(function(WorP1) {
    WorP1[WorP1["WIDTH"] = 0] = "WIDTH";
    WorP1[WorP1["PRECISION"] = 1] = "PRECISION";
})(WorP || (WorP = {}));
class Flags {
    plus;
    dash;
    sharp;
    space;
    zero;
    lessthan;
    width = -1;
    precision = -1;
}
const min = Math.min;
const UNICODE_REPLACEMENT_CHARACTER = "\ufffd";
const FLOAT_REGEXP = /(-?)(\d)\.?(\d*)e([+-])(\d+)/;
var F;
(function(F1) {
    F1[F1["sign"] = 1] = "sign";
    F1[F1["mantissa"] = 2] = "mantissa";
    F1[F1["fractional"] = 3] = "fractional";
    F1[F1["esign"] = 4] = "esign";
    F1[F1["exponent"] = 5] = "exponent";
})(F || (F = {}));
class Printf {
    format;
    args;
    i;
    state = State.PASSTHROUGH;
    verb = "";
    buf = "";
    argNum = 0;
    flags = new Flags();
    haveSeen;
    tmpError;
    constructor(format8, ...args){
        this.format = format8;
        this.args = args;
        this.haveSeen = Array.from({
            length: args.length
        });
        this.i = 0;
    }
    doPrintf() {
        for(; this.i < this.format.length; ++this.i){
            const c = this.format[this.i];
            switch(this.state){
                case State.PASSTHROUGH:
                    if (c === "%") {
                        this.state = State.PERCENT;
                    } else {
                        this.buf += c;
                    }
                    break;
                case State.PERCENT:
                    if (c === "%") {
                        this.buf += c;
                        this.state = State.PASSTHROUGH;
                    } else {
                        this.handleFormat();
                    }
                    break;
                default:
                    throw Error("Should be unreachable, certainly a bug in the lib.");
            }
        }
        let extras = false;
        let err = "%!(EXTRA";
        for(let i28 = 0; i28 !== this.haveSeen.length; ++i28){
            if (!this.haveSeen[i28]) {
                extras = true;
                err += ` '${Deno.inspect(this.args[i28])}'`;
            }
        }
        err += ")";
        if (extras) {
            this.buf += err;
        }
        return this.buf;
    }
    handleFormat() {
        this.flags = new Flags();
        const flags = this.flags;
        for(; this.i < this.format.length; ++this.i){
            const c = this.format[this.i];
            switch(this.state){
                case State.PERCENT:
                    switch(c){
                        case "[":
                            this.handlePositional();
                            this.state = State.POSITIONAL;
                            break;
                        case "+":
                            flags.plus = true;
                            break;
                        case "<":
                            flags.lessthan = true;
                            break;
                        case "-":
                            flags.dash = true;
                            flags.zero = false;
                            break;
                        case "#":
                            flags.sharp = true;
                            break;
                        case " ":
                            flags.space = true;
                            break;
                        case "0":
                            flags.zero = !flags.dash;
                            break;
                        default:
                            if ("1" <= c && c <= "9" || c === "." || c === "*") {
                                if (c === ".") {
                                    this.flags.precision = 0;
                                    this.state = State.PRECISION;
                                    this.i++;
                                } else {
                                    this.state = State.WIDTH;
                                }
                                this.handleWidthAndPrecision(flags);
                            } else {
                                this.handleVerb();
                                return;
                            }
                    }
                    break;
                case State.POSITIONAL:
                    if (c === "*") {
                        const worp = this.flags.precision === -1 ? WorP.WIDTH : WorP.PRECISION;
                        this.handleWidthOrPrecisionRef(worp);
                        this.state = State.PERCENT;
                        break;
                    } else {
                        this.handleVerb();
                        return;
                    }
                default:
                    throw new Error(`Should not be here ${this.state}, library bug!`);
            }
        }
    }
    handleWidthOrPrecisionRef(wOrP) {
        if (this.argNum >= this.args.length) {
            return;
        }
        const arg = this.args[this.argNum];
        this.haveSeen[this.argNum] = true;
        if (typeof arg === "number") {
            switch(wOrP){
                case WorP.WIDTH:
                    this.flags.width = arg;
                    break;
                default:
                    this.flags.precision = arg;
            }
        } else {
            const tmp = wOrP === WorP.WIDTH ? "WIDTH" : "PREC";
            this.tmpError = `%!(BAD ${tmp} '${this.args[this.argNum]}')`;
        }
        this.argNum++;
    }
    handleWidthAndPrecision(flags) {
        const fmt = this.format;
        for(; this.i !== this.format.length; ++this.i){
            const c = fmt[this.i];
            switch(this.state){
                case State.WIDTH:
                    switch(c){
                        case ".":
                            this.flags.precision = 0;
                            this.state = State.PRECISION;
                            break;
                        case "*":
                            this.handleWidthOrPrecisionRef(WorP.WIDTH);
                            break;
                        default:
                            {
                                const val = parseInt(c);
                                if (isNaN(val)) {
                                    this.i--;
                                    this.state = State.PERCENT;
                                    return;
                                }
                                flags.width = flags.width == -1 ? 0 : flags.width;
                                flags.width *= 10;
                                flags.width += val;
                            }
                    }
                    break;
                case State.PRECISION:
                    {
                        if (c === "*") {
                            this.handleWidthOrPrecisionRef(WorP.PRECISION);
                            break;
                        }
                        const val = parseInt(c);
                        if (isNaN(val)) {
                            this.i--;
                            this.state = State.PERCENT;
                            return;
                        }
                        flags.precision *= 10;
                        flags.precision += val;
                        break;
                    }
                default:
                    throw new Error("can't be here. bug.");
            }
        }
    }
    handlePositional() {
        if (this.format[this.i] !== "[") {
            throw new Error("Can't happen? Bug.");
        }
        let positional = 0;
        const format9 = this.format;
        this.i++;
        let err = false;
        for(; this.i !== this.format.length; ++this.i){
            if (format9[this.i] === "]") {
                break;
            }
            positional *= 10;
            const val = parseInt(format9[this.i]);
            if (isNaN(val)) {
                this.tmpError = "%!(BAD INDEX)";
                err = true;
            }
            positional += val;
        }
        if (positional - 1 >= this.args.length) {
            this.tmpError = "%!(BAD INDEX)";
            err = true;
        }
        this.argNum = err ? this.argNum : positional - 1;
        return;
    }
    handleLessThan() {
        const arg = this.args[this.argNum];
        if ((arg || {}).constructor.name !== "Array") {
            throw new Error(`arg ${arg} is not an array. Todo better error handling`);
        }
        let str = "[ ";
        for(let i29 = 0; i29 !== arg.length; ++i29){
            if (i29 !== 0) str += ", ";
            str += this._handleVerb(arg[i29]);
        }
        return str + " ]";
    }
    handleVerb() {
        const verb = this.format[this.i];
        this.verb = verb;
        if (this.tmpError) {
            this.buf += this.tmpError;
            this.tmpError = undefined;
            if (this.argNum < this.haveSeen.length) {
                this.haveSeen[this.argNum] = true;
            }
        } else if (this.args.length <= this.argNum) {
            this.buf += `%!(MISSING '${verb}')`;
        } else {
            const arg = this.args[this.argNum];
            this.haveSeen[this.argNum] = true;
            if (this.flags.lessthan) {
                this.buf += this.handleLessThan();
            } else {
                this.buf += this._handleVerb(arg);
            }
        }
        this.argNum++;
        this.state = State.PASSTHROUGH;
    }
    _handleVerb(arg) {
        switch(this.verb){
            case "t":
                return this.pad(arg.toString());
            case "b":
                return this.fmtNumber(arg, 2);
            case "c":
                return this.fmtNumberCodePoint(arg);
            case "d":
                return this.fmtNumber(arg, 10);
            case "o":
                return this.fmtNumber(arg, 8);
            case "x":
                return this.fmtHex(arg);
            case "X":
                return this.fmtHex(arg, true);
            case "e":
                return this.fmtFloatE(arg);
            case "E":
                return this.fmtFloatE(arg, true);
            case "f":
            case "F":
                return this.fmtFloatF(arg);
            case "g":
                return this.fmtFloatG(arg);
            case "G":
                return this.fmtFloatG(arg, true);
            case "s":
                return this.fmtString(arg);
            case "T":
                return this.fmtString(typeof arg);
            case "v":
                return this.fmtV(arg);
            case "j":
                return this.fmtJ(arg);
            default:
                return `%!(BAD VERB '${this.verb}')`;
        }
    }
    pad(s) {
        const padding = this.flags.zero ? "0" : " ";
        if (this.flags.dash) {
            return s.padEnd(this.flags.width, padding);
        }
        return s.padStart(this.flags.width, padding);
    }
    padNum(nStr, neg) {
        let sign;
        if (neg) {
            sign = "-";
        } else if (this.flags.plus || this.flags.space) {
            sign = this.flags.plus ? "+" : " ";
        } else {
            sign = "";
        }
        const zero = this.flags.zero;
        if (!zero) {
            nStr = sign + nStr;
        }
        const pad1 = zero ? "0" : " ";
        const len = zero ? this.flags.width - sign.length : this.flags.width;
        if (this.flags.dash) {
            nStr = nStr.padEnd(len, pad1);
        } else {
            nStr = nStr.padStart(len, pad1);
        }
        if (zero) {
            nStr = sign + nStr;
        }
        return nStr;
    }
    fmtNumber(n, radix, upcase = false) {
        let num = Math.abs(n).toString(radix);
        const prec = this.flags.precision;
        if (prec !== -1) {
            this.flags.zero = false;
            num = n === 0 && prec === 0 ? "" : num;
            while(num.length < prec){
                num = "0" + num;
            }
        }
        let prefix = "";
        if (this.flags.sharp) {
            switch(radix){
                case 2:
                    prefix += "0b";
                    break;
                case 8:
                    prefix += num.startsWith("0") ? "" : "0";
                    break;
                case 16:
                    prefix += "0x";
                    break;
                default:
                    throw new Error("cannot handle base: " + radix);
            }
        }
        num = num.length === 0 ? num : prefix + num;
        if (upcase) {
            num = num.toUpperCase();
        }
        return this.padNum(num, n < 0);
    }
    fmtNumberCodePoint(n) {
        let s = "";
        try {
            s = String.fromCodePoint(n);
        } catch  {
            s = UNICODE_REPLACEMENT_CHARACTER;
        }
        return this.pad(s);
    }
    fmtFloatSpecial(n) {
        if (isNaN(n)) {
            this.flags.zero = false;
            return this.padNum("NaN", false);
        }
        if (n === Number.POSITIVE_INFINITY) {
            this.flags.zero = false;
            this.flags.plus = true;
            return this.padNum("Inf", false);
        }
        if (n === Number.NEGATIVE_INFINITY) {
            this.flags.zero = false;
            return this.padNum("Inf", true);
        }
        return "";
    }
    roundFractionToPrecision(fractional, precision) {
        let round = false;
        if (fractional.length > precision) {
            fractional = "1" + fractional;
            let tmp = parseInt(fractional.substr(0, precision + 2)) / 10;
            tmp = Math.round(tmp);
            fractional = Math.floor(tmp).toString();
            round = fractional[0] === "2";
            fractional = fractional.substr(1);
        } else {
            while(fractional.length < precision){
                fractional += "0";
            }
        }
        return [
            fractional,
            round
        ];
    }
    fmtFloatE(n, upcase = false) {
        const special = this.fmtFloatSpecial(n);
        if (special !== "") {
            return special;
        }
        const m = n.toExponential().match(FLOAT_REGEXP);
        if (!m) {
            throw Error("can't happen, bug");
        }
        let fractional = m[F.fractional];
        const precision = this.flags.precision !== -1 ? this.flags.precision : 6;
        let rounding = false;
        [fractional, rounding] = this.roundFractionToPrecision(fractional, precision);
        let e = m[F.exponent];
        let esign = m[F.esign];
        let mantissa = parseInt(m[F.mantissa]);
        if (rounding) {
            mantissa += 1;
            if (10 <= mantissa) {
                mantissa = 1;
                const r = parseInt(esign + e) + 1;
                e = r.toString();
                esign = r < 0 ? "-" : "+";
            }
        }
        e = e.length == 1 ? "0" + e : e;
        const val = `${mantissa}.${fractional}${upcase ? "E" : "e"}${esign}${e}`;
        return this.padNum(val, n < 0);
    }
    fmtFloatF(n1) {
        const special = this.fmtFloatSpecial(n1);
        if (special !== "") {
            return special;
        }
        function expandNumber(n) {
            if (Number.isSafeInteger(n)) {
                return n.toString() + ".";
            }
            const t = n.toExponential().split("e");
            let m = t[0].replace(".", "");
            const e = parseInt(t[1]);
            if (e < 0) {
                let nStr = "0.";
                for(let i30 = 0; i30 !== Math.abs(e) - 1; ++i30){
                    nStr += "0";
                }
                return nStr += m;
            } else {
                const splIdx = e + 1;
                while(m.length < splIdx){
                    m += "0";
                }
                return m.substr(0, splIdx) + "." + m.substr(splIdx);
            }
        }
        const val = expandNumber(Math.abs(n1));
        const arr = val.split(".");
        let dig = arr[0];
        let fractional = arr[1];
        const precision = this.flags.precision !== -1 ? this.flags.precision : 6;
        let round = false;
        [fractional, round] = this.roundFractionToPrecision(fractional, precision);
        if (round) {
            dig = (parseInt(dig) + 1).toString();
        }
        return this.padNum(`${dig}.${fractional}`, n1 < 0);
    }
    fmtFloatG(n, upcase = false) {
        const special = this.fmtFloatSpecial(n);
        if (special !== "") {
            return special;
        }
        let P1 = this.flags.precision !== -1 ? this.flags.precision : 6;
        P1 = P1 === 0 ? 1 : P1;
        const m = n.toExponential().match(FLOAT_REGEXP);
        if (!m) {
            throw Error("can't happen");
        }
        const X = parseInt(m[F.exponent]) * (m[F.esign] === "-" ? -1 : 1);
        let nStr = "";
        if (P1 > X && X >= -4) {
            this.flags.precision = P1 - (X + 1);
            nStr = this.fmtFloatF(n);
            if (!this.flags.sharp) {
                nStr = nStr.replace(/\.?0*$/, "");
            }
        } else {
            this.flags.precision = P1 - 1;
            nStr = this.fmtFloatE(n);
            if (!this.flags.sharp) {
                nStr = nStr.replace(/\.?0*e/, upcase ? "E" : "e");
            }
        }
        return nStr;
    }
    fmtString(s) {
        if (this.flags.precision !== -1) {
            s = s.substr(0, this.flags.precision);
        }
        return this.pad(s);
    }
    fmtHex(val, upper = false) {
        switch(typeof val){
            case "number":
                return this.fmtNumber(val, 16, upper);
            case "string":
                {
                    const sharp = this.flags.sharp && val.length !== 0;
                    let hex = sharp ? "0x" : "";
                    const prec = this.flags.precision;
                    const end = prec !== -1 ? min(prec, val.length) : val.length;
                    for(let i31 = 0; i31 !== end; ++i31){
                        if (i31 !== 0 && this.flags.space) {
                            hex += sharp ? " 0x" : " ";
                        }
                        const c = (val.charCodeAt(i31) & 0xff).toString(16);
                        hex += c.length === 1 ? `0${c}` : c;
                    }
                    if (upper) {
                        hex = hex.toUpperCase();
                    }
                    return this.pad(hex);
                }
            default:
                throw new Error("currently only number and string are implemented for hex");
        }
    }
    fmtV(val) {
        if (this.flags.sharp) {
            const options = this.flags.precision !== -1 ? {
                depth: this.flags.precision
            } : {};
            return this.pad(Deno.inspect(val, options));
        } else {
            const p6 = this.flags.precision;
            return p6 === -1 ? val.toString() : val.toString().substr(0, p6);
        }
    }
    fmtJ(val) {
        return JSON.stringify(val);
    }
}
function sprintf(format10, ...args) {
    const printf1 = new Printf(format10, ...args);
    return printf1.doPrintf();
}
let debugImpls;
let testEnabled;
function initializeDebugEnv(debugEnv1) {
    debugImpls = Object.create(null);
    if (debugEnv1) {
        debugEnv1 = debugEnv1.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replaceAll("*", ".*").replaceAll(",", "$|^");
        const debugEnvRegex = new RegExp(`^${debugEnv1}$`, "i");
        testEnabled = (str)=>debugEnvRegex.exec(str) !== null
        ;
    } else {
        testEnabled = ()=>false
        ;
    }
}
function emitWarningIfNeeded(set) {
    if ("HTTP" === set || "HTTP2" === set) {
        console.warn("Setting the NODE_DEBUG environment variable " + "to '" + set.toLowerCase() + "' can expose sensitive " + "data (such as passwords, tokens and authentication headers) " + "in the resulting log.");
    }
}
const noop = ()=>{};
function debuglogImpl(enabled1, set) {
    if (debugImpls[set] === undefined) {
        if (enabled1) {
            emitWarningIfNeeded(set);
            debugImpls[set] = function debug(...args) {
                const msg = args.map((arg)=>inspect(arg)
                ).join(" ");
                console.error(sprintf("%s %s: %s", set, String(Deno.pid), msg));
            };
        } else {
            debugImpls[set] = noop;
        }
    }
    return debugImpls[set];
}
function debuglog(set, cb) {
    function init() {
        set = set.toUpperCase();
        enabled2 = testEnabled(set);
    }
    let debug4 = (...args)=>{
        init();
        debug4 = debuglogImpl(enabled2, set);
        if (typeof cb === "function") {
            cb(debug4);
        }
        return debug4(...args);
    };
    let enabled2;
    let test = ()=>{
        init();
        test = ()=>enabled2
        ;
        return enabled2;
    };
    const logger = (...args)=>debug4(...args)
    ;
    Object.defineProperty(logger, "enabled", {
        get () {
            return test();
        },
        configurable: true,
        enumerable: true
    });
    return logger;
}
let debugEnv;
try {
    debugEnv = Deno.env.get("NODE_DEBUG") ?? "";
} catch (error2) {
    if (error2 instanceof Deno.errors.PermissionDenied) {
        debugEnv = "";
    } else {
        throw error2;
    }
}
initializeDebugEnv(debugEnv);
const osType = (()=>{
    const { Deno  } = globalThis;
    if (typeof Deno?.build?.os === "string") {
        return Deno.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win") ?? false) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
function uvTranslateSysError(sysErrno) {
    switch(sysErrno){
        case 5:
            return "EACCES";
        case 998:
            return "EACCES";
        case 10013:
            return "EACCES";
        case 1920:
            return "EACCES";
        case 1227:
            return "EADDRINUSE";
        case 10048:
            return "EADDRINUSE";
        case 10049:
            return "EADDRNOTAVAIL";
        case 10047:
            return "EAFNOSUPPORT";
        case 10035:
            return "EAGAIN";
        case 10037:
            return "EALREADY";
        case 1004:
            return "EBADF";
        case 6:
            return "EBADF";
        case 33:
            return "EBUSY";
        case 231:
            return "EBUSY";
        case 32:
            return "EBUSY";
        case 995:
            return "ECANCELED";
        case 10004:
            return "ECANCELED";
        case 1113:
            return "ECHARSET";
        case 1236:
            return "ECONNABORTED";
        case 10053:
            return "ECONNABORTED";
        case 1225:
            return "ECONNREFUSED";
        case 10061:
            return "ECONNREFUSED";
        case 64:
            return "ECONNRESET";
        case 10054:
            return "ECONNRESET";
        case 183:
            return "EEXIST";
        case 80:
            return "EEXIST";
        case 111:
            return "EFAULT";
        case 10014:
            return "EFAULT";
        case 1232:
            return "EHOSTUNREACH";
        case 10065:
            return "EHOSTUNREACH";
        case 122:
            return "EINVAL";
        case 13:
            return "EINVAL";
        case 123:
            return "EINVAL";
        case 87:
            return "EINVAL";
        case 10022:
            return "EINVAL";
        case 10046:
            return "EINVAL";
        case 1102:
            return "EIO";
        case 1111:
            return "EIO";
        case 23:
            return "EIO";
        case 1166:
            return "EIO";
        case 1165:
            return "EIO";
        case 1393:
            return "EIO";
        case 1129:
            return "EIO";
        case 1101:
            return "EIO";
        case 31:
            return "EIO";
        case 1106:
            return "EIO";
        case 1117:
            return "EIO";
        case 1104:
            return "EIO";
        case 205:
            return "EIO";
        case 110:
            return "EIO";
        case 1103:
            return "EIO";
        case 156:
            return "EIO";
        case 10056:
            return "EISCONN";
        case 1921:
            return "ELOOP";
        case 4:
            return "EMFILE";
        case 10024:
            return "EMFILE";
        case 10040:
            return "EMSGSIZE";
        case 206:
            return "ENAMETOOLONG";
        case 1231:
            return "ENETUNREACH";
        case 10051:
            return "ENETUNREACH";
        case 10055:
            return "ENOBUFS";
        case 161:
            return "ENOENT";
        case 267:
            return "ENOTDIR";
        case 203:
            return "ENOENT";
        case 2:
            return "ENOENT";
        case 15:
            return "ENOENT";
        case 4392:
            return "ENOENT";
        case 126:
            return "ENOENT";
        case 3:
            return "ENOENT";
        case 11001:
            return "ENOENT";
        case 11004:
            return "ENOENT";
        case 8:
            return "ENOMEM";
        case 14:
            return "ENOMEM";
        case 82:
            return "ENOSPC";
        case 112:
            return "ENOSPC";
        case 277:
            return "ENOSPC";
        case 1100:
            return "ENOSPC";
        case 39:
            return "ENOSPC";
        case 2250:
            return "ENOTCONN";
        case 10057:
            return "ENOTCONN";
        case 145:
            return "ENOTEMPTY";
        case 10038:
            return "ENOTSOCK";
        case 50:
            return "ENOTSUP";
        case 109:
            return "EOF";
        case 1314:
            return "EPERM";
        case 230:
            return "EPIPE";
        case 232:
            return "EPIPE";
        case 233:
            return "EPIPE";
        case 10058:
            return "EPIPE";
        case 10043:
            return "EPROTONOSUPPORT";
        case 19:
            return "EROFS";
        case 121:
            return "ETIMEDOUT";
        case 10060:
            return "ETIMEDOUT";
        case 17:
            return "EXDEV";
        case 1:
            return "EISDIR";
        case 208:
            return "E2BIG";
        case 10044:
            return "ESOCKTNOSUPPORT";
        default:
            return "UNKNOWN";
    }
}
const os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {
        RTLD_LAZY: 1,
        RTLD_NOW: 2,
        RTLD_GLOBAL: 8,
        RTLD_LOCAL: 4
    },
    errno: {
        E2BIG: 7,
        EACCES: 13,
        EADDRINUSE: 48,
        EADDRNOTAVAIL: 49,
        EAFNOSUPPORT: 47,
        EAGAIN: 35,
        EALREADY: 37,
        EBADF: 9,
        EBADMSG: 94,
        EBUSY: 16,
        ECANCELED: 89,
        ECHILD: 10,
        ECONNABORTED: 53,
        ECONNREFUSED: 61,
        ECONNRESET: 54,
        EDEADLK: 11,
        EDESTADDRREQ: 39,
        EDOM: 33,
        EDQUOT: 69,
        EEXIST: 17,
        EFAULT: 14,
        EFBIG: 27,
        EHOSTUNREACH: 65,
        EIDRM: 90,
        EILSEQ: 92,
        EINPROGRESS: 36,
        EINTR: 4,
        EINVAL: 22,
        EIO: 5,
        EISCONN: 56,
        EISDIR: 21,
        ELOOP: 62,
        EMFILE: 24,
        EMLINK: 31,
        EMSGSIZE: 40,
        EMULTIHOP: 95,
        ENAMETOOLONG: 63,
        ENETDOWN: 50,
        ENETRESET: 52,
        ENETUNREACH: 51,
        ENFILE: 23,
        ENOBUFS: 55,
        ENODATA: 96,
        ENODEV: 19,
        ENOENT: 2,
        ENOEXEC: 8,
        ENOLCK: 77,
        ENOLINK: 97,
        ENOMEM: 12,
        ENOMSG: 91,
        ENOPROTOOPT: 42,
        ENOSPC: 28,
        ENOSR: 98,
        ENOSTR: 99,
        ENOSYS: 78,
        ENOTCONN: 57,
        ENOTDIR: 20,
        ENOTEMPTY: 66,
        ENOTSOCK: 38,
        ENOTSUP: 45,
        ENOTTY: 25,
        ENXIO: 6,
        EOPNOTSUPP: 102,
        EOVERFLOW: 84,
        EPERM: 1,
        EPIPE: 32,
        EPROTO: 100,
        EPROTONOSUPPORT: 43,
        EPROTOTYPE: 41,
        ERANGE: 34,
        EROFS: 30,
        ESPIPE: 29,
        ESRCH: 3,
        ESTALE: 70,
        ETIME: 101,
        ETIMEDOUT: 60,
        ETXTBSY: 26,
        EWOULDBLOCK: 35,
        EXDEV: 18
    },
    signals: {
        SIGHUP: 1,
        SIGINT: 2,
        SIGQUIT: 3,
        SIGILL: 4,
        SIGTRAP: 5,
        SIGABRT: 6,
        SIGIOT: 6,
        SIGBUS: 10,
        SIGFPE: 8,
        SIGKILL: 9,
        SIGUSR1: 30,
        SIGSEGV: 11,
        SIGUSR2: 31,
        SIGPIPE: 13,
        SIGALRM: 14,
        SIGTERM: 15,
        SIGCHLD: 20,
        SIGCONT: 19,
        SIGSTOP: 17,
        SIGTSTP: 18,
        SIGTTIN: 21,
        SIGTTOU: 22,
        SIGURG: 16,
        SIGXCPU: 24,
        SIGXFSZ: 25,
        SIGVTALRM: 26,
        SIGPROF: 27,
        SIGWINCH: 28,
        SIGIO: 23,
        SIGINFO: 29,
        SIGSYS: 12,
        SIGEMT: 7,
        SIGPWR: 30,
        SIGSTKFLT: 16
    },
    priority: {
        PRIORITY_LOW: 19,
        PRIORITY_BELOW_NORMAL: 10,
        PRIORITY_NORMAL: 0,
        PRIORITY_ABOVE_NORMAL: -7,
        PRIORITY_HIGH: -14,
        PRIORITY_HIGHEST: -20
    }
};
const fs = {
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    UV_DIRENT_UNKNOWN: 0,
    UV_DIRENT_FILE: 1,
    UV_DIRENT_DIR: 2,
    UV_DIRENT_LINK: 3,
    UV_DIRENT_FIFO: 4,
    UV_DIRENT_SOCKET: 5,
    UV_DIRENT_CHAR: 6,
    UV_DIRENT_BLOCK: 7,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 512,
    O_EXCL: 2048,
    UV_FS_O_FILEMAP: 0,
    O_NOCTTY: 131072,
    O_TRUNC: 1024,
    O_APPEND: 8,
    O_DIRECTORY: 1048576,
    O_NOFOLLOW: 256,
    O_SYNC: 128,
    O_DSYNC: 4194304,
    O_SYMLINK: 2097152,
    O_NONBLOCK: 4,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_FICLONE_FORCE: 4
};
const crypto = {
    OPENSSL_VERSION_NUMBER: 269488319,
    SSL_OP_ALL: 2147485780,
    SSL_OP_ALLOW_NO_DHE_KEX: 1024,
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
    SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
    SSL_OP_CISCO_ANYCONNECT: 32768,
    SSL_OP_COOKIE_EXCHANGE: 8192,
    SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
    SSL_OP_EPHEMERAL_RSA: 0,
    SSL_OP_LEGACY_SERVER_CONNECT: 4,
    SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 0,
    SSL_OP_MICROSOFT_SESS_ID_BUG: 0,
    SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
    SSL_OP_NETSCAPE_CA_DN_BUG: 0,
    SSL_OP_NETSCAPE_CHALLENGE_BUG: 0,
    SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NO_COMPRESSION: 131072,
    SSL_OP_NO_ENCRYPT_THEN_MAC: 524288,
    SSL_OP_NO_QUERY_MTU: 4096,
    SSL_OP_NO_RENEGOTIATION: 1073741824,
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
    SSL_OP_NO_SSLv2: 0,
    SSL_OP_NO_SSLv3: 33554432,
    SSL_OP_NO_TICKET: 16384,
    SSL_OP_NO_TLSv1: 67108864,
    SSL_OP_NO_TLSv1_1: 268435456,
    SSL_OP_NO_TLSv1_2: 134217728,
    SSL_OP_NO_TLSv1_3: 536870912,
    SSL_OP_PKCS1_CHECK_1: 0,
    SSL_OP_PKCS1_CHECK_2: 0,
    SSL_OP_PRIORITIZE_CHACHA: 2097152,
    SSL_OP_SINGLE_DH_USE: 0,
    SSL_OP_SINGLE_ECDH_USE: 0,
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 0,
    SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
    SSL_OP_TLS_BLOCK_PADDING_BUG: 0,
    SSL_OP_TLS_D5_BUG: 0,
    SSL_OP_TLS_ROLLBACK_BUG: 8388608,
    ENGINE_METHOD_RSA: 1,
    ENGINE_METHOD_DSA: 2,
    ENGINE_METHOD_DH: 4,
    ENGINE_METHOD_RAND: 8,
    ENGINE_METHOD_EC: 2048,
    ENGINE_METHOD_CIPHERS: 64,
    ENGINE_METHOD_DIGESTS: 128,
    ENGINE_METHOD_PKEY_METHS: 512,
    ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
    ENGINE_METHOD_ALL: 65535,
    ENGINE_METHOD_NONE: 0,
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    RSA_PSS_SALTLEN_DIGEST: -1,
    RSA_PSS_SALTLEN_MAX_SIGN: -2,
    RSA_PSS_SALTLEN_AUTO: -2,
    defaultCoreCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
    TLS1_VERSION: 769,
    TLS1_1_VERSION: 770,
    TLS1_2_VERSION: 771,
    TLS1_3_VERSION: 772,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
};
const zlib = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_VERSION_ERROR: -6,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    ZLIB_VERNUM: 4784,
    DEFLATE: 1,
    INFLATE: 2,
    GZIP: 3,
    GUNZIP: 4,
    DEFLATERAW: 5,
    INFLATERAW: 6,
    UNZIP: 7,
    BROTLI_DECODE: 8,
    BROTLI_ENCODE: 9,
    Z_MIN_WINDOWBITS: 8,
    Z_MAX_WINDOWBITS: 15,
    Z_DEFAULT_WINDOWBITS: 15,
    Z_MIN_CHUNK: 64,
    Z_MAX_CHUNK: Infinity,
    Z_DEFAULT_CHUNK: 16384,
    Z_MIN_MEMLEVEL: 1,
    Z_MAX_MEMLEVEL: 9,
    Z_DEFAULT_MEMLEVEL: 8,
    Z_MIN_LEVEL: -1,
    Z_MAX_LEVEL: 9,
    Z_DEFAULT_LEVEL: -1,
    BROTLI_OPERATION_PROCESS: 0,
    BROTLI_OPERATION_FLUSH: 1,
    BROTLI_OPERATION_FINISH: 2,
    BROTLI_OPERATION_EMIT_METADATA: 3,
    BROTLI_PARAM_MODE: 0,
    BROTLI_MODE_GENERIC: 0,
    BROTLI_MODE_TEXT: 1,
    BROTLI_MODE_FONT: 2,
    BROTLI_DEFAULT_MODE: 0,
    BROTLI_PARAM_QUALITY: 1,
    BROTLI_MIN_QUALITY: 0,
    BROTLI_MAX_QUALITY: 11,
    BROTLI_DEFAULT_QUALITY: 11,
    BROTLI_PARAM_LGWIN: 2,
    BROTLI_MIN_WINDOW_BITS: 10,
    BROTLI_MAX_WINDOW_BITS: 24,
    BROTLI_LARGE_MAX_WINDOW_BITS: 30,
    BROTLI_DEFAULT_WINDOW: 22,
    BROTLI_PARAM_LGBLOCK: 3,
    BROTLI_MIN_INPUT_BLOCK_BITS: 16,
    BROTLI_MAX_INPUT_BLOCK_BITS: 24,
    BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
    BROTLI_PARAM_SIZE_HINT: 5,
    BROTLI_PARAM_LARGE_WINDOW: 6,
    BROTLI_PARAM_NPOSTFIX: 7,
    BROTLI_PARAM_NDIRECT: 8,
    BROTLI_DECODER_RESULT_ERROR: 0,
    BROTLI_DECODER_RESULT_SUCCESS: 1,
    BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
    BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
    BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
    BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
    BROTLI_DECODER_NO_ERROR: 0,
    BROTLI_DECODER_SUCCESS: 1,
    BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
    BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
    BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
    BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
    BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
    BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
    BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
    BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
    BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
    BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
    BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
    BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
    BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
    BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
    BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
    BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
    BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
    BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
    BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
    BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
    BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
    BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
    BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
    BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
    BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
    BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
    BROTLI_DECODER_ERROR_UNREACHABLE: -31
};
const trace = {
    TRACE_EVENT_PHASE_BEGIN: 66,
    TRACE_EVENT_PHASE_END: 69,
    TRACE_EVENT_PHASE_COMPLETE: 88,
    TRACE_EVENT_PHASE_INSTANT: 73,
    TRACE_EVENT_PHASE_ASYNC_BEGIN: 83,
    TRACE_EVENT_PHASE_ASYNC_STEP_INTO: 84,
    TRACE_EVENT_PHASE_ASYNC_STEP_PAST: 112,
    TRACE_EVENT_PHASE_ASYNC_END: 70,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_BEGIN: 98,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_END: 101,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_INSTANT: 110,
    TRACE_EVENT_PHASE_FLOW_BEGIN: 115,
    TRACE_EVENT_PHASE_FLOW_STEP: 116,
    TRACE_EVENT_PHASE_FLOW_END: 102,
    TRACE_EVENT_PHASE_METADATA: 77,
    TRACE_EVENT_PHASE_COUNTER: 67,
    TRACE_EVENT_PHASE_SAMPLE: 80,
    TRACE_EVENT_PHASE_CREATE_OBJECT: 78,
    TRACE_EVENT_PHASE_SNAPSHOT_OBJECT: 79,
    TRACE_EVENT_PHASE_DELETE_OBJECT: 68,
    TRACE_EVENT_PHASE_MEMORY_DUMP: 118,
    TRACE_EVENT_PHASE_MARK: 82,
    TRACE_EVENT_PHASE_CLOCK_SYNC: 99,
    TRACE_EVENT_PHASE_ENTER_CONTEXT: 40,
    TRACE_EVENT_PHASE_LEAVE_CONTEXT: 41,
    TRACE_EVENT_PHASE_LINK_IDS: 61
};
const mod3 = {
    os: os,
    fs: fs,
    crypto: crypto,
    zlib: zlib,
    trace: trace
};
const UV_EEXIST = os.errno.EEXIST;
const UV_ENOENT = os.errno.ENOENT;
const codeToErrorWindows = [
    [
        -4093,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -4092,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -4091,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -4090,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -4089,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -4088,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -4084,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -4083,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -4082,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -4081,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -4079,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -4078,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -4077,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -4076,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -4075,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -4074,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -4036,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -4073,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4072,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -4071,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -4070,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -4069,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -4068,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -4067,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -4066,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -4065,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -4064,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -4063,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -4062,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -4061,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -4060,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -4059,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -4058,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -4057,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -4056,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -4035,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -4055,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -4054,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -4053,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -4052,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -4051,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -4050,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -4049,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -4048,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -4047,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -4046,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -4045,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -4044,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -4034,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -4043,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -4042,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -4041,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -4040,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -4039,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -4038,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -4037,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -4033,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -4032,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -4031,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -4030,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -4029,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -4028,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -4027,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeWindows = codeToErrorWindows.map(([status, [error3]])=>[
        error3,
        status
    ]
);
const codeToErrorDarwin = [
    [
        -7,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -13,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -48,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -49,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -47,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -35,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -37,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -9,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -16,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -89,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -53,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -61,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -54,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -39,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -17,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -14,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -27,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -65,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -22,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -5,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -56,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -21,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -62,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -24,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -40,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -63,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -50,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -51,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -23,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -55,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -19,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -2,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -12,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -4056,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -42,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -28,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -78,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -57,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -20,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -66,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -38,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -45,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -1,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -32,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -100,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -43,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -41,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -34,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -30,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -58,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -29,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -3,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -60,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -26,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -18,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -6,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -31,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -64,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -4030,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -25,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -79,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -92,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeDarwin = codeToErrorDarwin.map(([status, [code6]])=>[
        code6,
        status
    ]
);
const codeToErrorLinux = [
    [
        -7,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -13,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -98,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -99,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -97,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -11,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -114,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -9,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -16,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -125,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -103,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -111,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -104,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -89,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -17,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -14,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -27,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -113,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -22,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -5,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -106,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -21,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -40,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -24,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -90,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -36,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -100,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -101,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -23,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -105,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -19,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -2,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -12,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -64,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -92,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -28,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -38,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -107,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -20,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -39,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -88,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -95,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -1,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -32,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -71,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -93,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -91,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -34,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -30,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -108,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -29,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -3,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -110,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -26,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -18,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -6,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -31,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -112,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -121,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -25,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -4028,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -84,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeLinux = codeToErrorLinux.map(([status, [code7]])=>[
        code7,
        status
    ]
);
const errorMap = new Map(osType === "windows" ? codeToErrorWindows : osType === "darwin" ? codeToErrorDarwin : osType === "linux" ? codeToErrorLinux : unreachable());
const codeMap = new Map(osType === "windows" ? errorToCodeWindows : osType === "darwin" ? errorToCodeDarwin : osType === "linux" ? errorToCodeLinux : unreachable());
function mapSysErrnoToUvErrno(sysErrno) {
    if (osType === "windows") {
        const code8 = uvTranslateSysError(sysErrno);
        return codeMap.get(code8) ?? -sysErrno;
    } else {
        return -sysErrno;
    }
}
const UV_EAI_MEMORY = codeMap.get("EAI_MEMORY");
const mod4 = {
    UV_EEXIST: UV_EEXIST,
    UV_ENOENT: UV_ENOENT,
    errorMap: errorMap,
    codeMap: codeMap,
    mapSysErrnoToUvErrno: mapSysErrnoToUvErrno,
    UV_EAI_MEMORY: UV_EAI_MEMORY
};
const __default1 = {
    ...mod1
};
var Encodings;
(function(Encodings1) {
    Encodings1[Encodings1["ASCII"] = 0] = "ASCII";
    Encodings1[Encodings1["UTF8"] = 1] = "UTF8";
    Encodings1[Encodings1["BASE64"] = 2] = "BASE64";
    Encodings1[Encodings1["UCS2"] = 3] = "UCS2";
    Encodings1[Encodings1["BINARY"] = 4] = "BINARY";
    Encodings1[Encodings1["HEX"] = 5] = "HEX";
    Encodings1[Encodings1["BUFFER"] = 6] = "BUFFER";
    Encodings1[Encodings1["BASE64URL"] = 7] = "BASE64URL";
    Encodings1[Encodings1["LATIN1"] = 4] = "LATIN1";
})(Encodings || (Encodings = {}));
const encodings = [];
encodings[Encodings.ASCII] = "ascii";
encodings[Encodings.BASE64] = "base64";
encodings[Encodings.BASE64URL] = "base64url";
encodings[Encodings.BUFFER] = "buffer";
encodings[Encodings.HEX] = "hex";
encodings[Encodings.LATIN1] = "latin1";
encodings[Encodings.UCS2] = "utf16le";
encodings[Encodings.UTF8] = "utf8";
const __default2 = {
    encodings
};
const mod5 = {
    encodings: encodings,
    default: __default2
};
function numberToBytes(n) {
    if (n === 0) return new Uint8Array([
        0
    ]);
    const bytes = [];
    bytes.unshift(n & 255);
    while(n >= 256){
        n = n >>> 8;
        bytes.unshift(n & 255);
    }
    return new Uint8Array(bytes);
}
function findLastIndex(targetBuffer, buffer, offset) {
    offset = offset > targetBuffer.length ? targetBuffer.length : offset;
    const searchableBuffer = targetBuffer.slice(0, offset + buffer.length);
    const searchableBufferLastIndex = searchableBuffer.length - 1;
    const bufferLastIndex = buffer.length - 1;
    let lastMatchIndex = -1;
    let matches = 0;
    let index = -1;
    for(let x2 = 0; x2 <= searchableBufferLastIndex; x2++){
        if (searchableBuffer[searchableBufferLastIndex - x2] === buffer[bufferLastIndex - matches]) {
            if (lastMatchIndex === -1) {
                lastMatchIndex = x2;
            }
            matches++;
        } else {
            matches = 0;
            if (lastMatchIndex !== -1) {
                x2 = lastMatchIndex + 1;
                lastMatchIndex = -1;
            }
            continue;
        }
        if (matches === buffer.length) {
            index = x2;
            break;
        }
    }
    if (index === -1) return index;
    return searchableBufferLastIndex - index;
}
function indexOfBuffer(targetBuffer, buffer, byteOffset, encoding, forwardDirection) {
    if (!Encodings[encoding] === undefined) {
        throw new Error(`Unknown encoding code ${encoding}`);
    }
    if (!forwardDirection) {
        if (byteOffset < 0) {
            byteOffset = targetBuffer.length + byteOffset;
        }
        if (buffer.length === 0) {
            return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
        }
        return findLastIndex(targetBuffer, buffer, byteOffset);
    }
    if (buffer.length === 0) {
        return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
    }
    return indexOfNeedle(targetBuffer, buffer, byteOffset);
}
function indexOfNumber(targetBuffer, number, byteOffset, forwardDirection) {
    const bytes = numberToBytes(number);
    if (bytes.length > 1) {
        throw new Error("Multi byte number search is not supported");
    }
    return indexOfBuffer(targetBuffer, numberToBytes(number), byteOffset, Encodings.UTF8, forwardDirection);
}
const __default3 = {
    indexOfBuffer,
    indexOfNumber
};
const mod6 = {
    indexOfBuffer: indexOfBuffer,
    indexOfNumber: indexOfNumber,
    numberToBytes: numberToBytes,
    default: __default3
};
const base64abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/", 
];
function encode(data) {
    const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
    let result = "", i32;
    const l = uint8.length;
    for(i32 = 2; i32 < l; i32 += 3){
        result += base64abc[uint8[i32 - 2] >> 2];
        result += base64abc[(uint8[i32 - 2] & 0x03) << 4 | uint8[i32 - 1] >> 4];
        result += base64abc[(uint8[i32 - 1] & 0x0f) << 2 | uint8[i32] >> 6];
        result += base64abc[uint8[i32] & 0x3f];
    }
    if (i32 === l + 1) {
        result += base64abc[uint8[i32 - 2] >> 2];
        result += base64abc[(uint8[i32 - 2] & 0x03) << 4];
        result += "==";
    }
    if (i32 === l) {
        result += base64abc[uint8[i32 - 2] >> 2];
        result += base64abc[(uint8[i32 - 2] & 0x03) << 4 | uint8[i32 - 1] >> 4];
        result += base64abc[(uint8[i32 - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}
function decode(b64) {
    const binString = atob(b64);
    const size = binString.length;
    const bytes = new Uint8Array(size);
    for(let i33 = 0; i33 < size; i33++){
        bytes[i33] = binString.charCodeAt(i33);
    }
    return bytes;
}
function addPaddingToBase64url(base64url) {
    if (base64url.length % 4 === 2) return base64url + "==";
    if (base64url.length % 4 === 3) return base64url + "=";
    if (base64url.length % 4 === 1) {
        throw new TypeError("Illegal base64url string!");
    }
    return base64url;
}
function convertBase64urlToBase64(b64url) {
    if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
        throw new TypeError("Failed to decode base64url: invalid character");
    }
    return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(b64) {
    return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function encode1(data) {
    return convertBase64ToBase64url(encode(data));
}
function decode1(b64url) {
    return decode(convertBase64urlToBase64(b64url));
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i34 = 0; i34 < str.length; ++i34){
        byteArray.push(str.charCodeAt(i34) & 255);
    }
    return new Uint8Array(byteArray);
}
function base64ToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("-", "+").replaceAll("_", "/");
    return decode(str);
}
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while(str.length % 4 !== 0){
        str = str + "=";
    }
    return str;
}
function base64UrlToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("+", "-").replaceAll("/", "_");
    return decode1(str);
}
function hexToBytes(str) {
    const byteArray = new Uint8Array(Math.floor((str || "").length / 2));
    let i35;
    for(i35 = 0; i35 < byteArray.length; i35++){
        const a = Number.parseInt(str[i35 * 2], 16);
        const b7 = Number.parseInt(str[i35 * 2 + 1], 16);
        if (Number.isNaN(a) && Number.isNaN(b7)) {
            break;
        }
        byteArray[i35] = a << 4 | b7;
    }
    return new Uint8Array(i35 === byteArray.length ? byteArray : byteArray.slice(0, i35));
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i36 = 0; i36 < str.length; ++i36){
        if ((units -= 2) < 0) {
            break;
        }
        c = str.charCodeAt(i36);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return new Uint8Array(byteArray);
}
function bytesToAscii(bytes) {
    let ret = "";
    for(let i37 = 0; i37 < bytes.length; ++i37){
        ret += String.fromCharCode(bytes[i37] & 127);
    }
    return ret;
}
function bytesToUtf16le(bytes) {
    let res = "";
    for(let i38 = 0; i38 < bytes.length - 1; i38 += 2){
        res += String.fromCharCode(bytes[i38] + bytes[i38 + 1] * 256);
    }
    return res;
}
const utf8Encoder = new TextEncoder();
const float32Array = new Float32Array(1);
const uInt8Float32Array = new Uint8Array(float32Array.buffer);
const float64Array = new Float64Array(1);
const uInt8Float64Array = new Uint8Array(float64Array.buffer);
float32Array[0] = -1;
const bigEndian = uInt8Float32Array[3] === 0;
function readUInt48LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + (buf[++offset] + last * 2 ** 8) * 2 ** 32;
}
function readUInt40LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + last * 2 ** 32;
}
function readUInt24LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    return first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
}
function readUInt48BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    return (first * 2 ** 8 + buf[++offset]) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt40BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return first * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt24BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    return first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt16BE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    return first * 2 ** 8 + last;
}
function readUInt32BE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
}
function readDoubleBackwards(buffer, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 8);
    }
    uInt8Float64Array[7] = first;
    uInt8Float64Array[6] = buffer[++offset];
    uInt8Float64Array[5] = buffer[++offset];
    uInt8Float64Array[4] = buffer[++offset];
    uInt8Float64Array[3] = buffer[++offset];
    uInt8Float64Array[2] = buffer[++offset];
    uInt8Float64Array[1] = buffer[++offset];
    uInt8Float64Array[0] = last;
    return float64Array[0];
}
function readDoubleForwards(buffer, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 8);
    }
    uInt8Float64Array[0] = first;
    uInt8Float64Array[1] = buffer[++offset];
    uInt8Float64Array[2] = buffer[++offset];
    uInt8Float64Array[3] = buffer[++offset];
    uInt8Float64Array[4] = buffer[++offset];
    uInt8Float64Array[5] = buffer[++offset];
    uInt8Float64Array[6] = buffer[++offset];
    uInt8Float64Array[7] = last;
    return float64Array[0];
}
function writeDoubleForwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 7);
    float64Array[0] = val;
    buffer[offset++] = uInt8Float64Array[0];
    buffer[offset++] = uInt8Float64Array[1];
    buffer[offset++] = uInt8Float64Array[2];
    buffer[offset++] = uInt8Float64Array[3];
    buffer[offset++] = uInt8Float64Array[4];
    buffer[offset++] = uInt8Float64Array[5];
    buffer[offset++] = uInt8Float64Array[6];
    buffer[offset++] = uInt8Float64Array[7];
    return offset;
}
function writeDoubleBackwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 7);
    float64Array[0] = val;
    buffer[offset++] = uInt8Float64Array[7];
    buffer[offset++] = uInt8Float64Array[6];
    buffer[offset++] = uInt8Float64Array[5];
    buffer[offset++] = uInt8Float64Array[4];
    buffer[offset++] = uInt8Float64Array[3];
    buffer[offset++] = uInt8Float64Array[2];
    buffer[offset++] = uInt8Float64Array[1];
    buffer[offset++] = uInt8Float64Array[0];
    return offset;
}
function readFloatBackwards(buffer, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 4);
    }
    uInt8Float32Array[3] = first;
    uInt8Float32Array[2] = buffer[++offset];
    uInt8Float32Array[1] = buffer[++offset];
    uInt8Float32Array[0] = last;
    return float32Array[0];
}
function readFloatForwards(buffer, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 4);
    }
    uInt8Float32Array[0] = first;
    uInt8Float32Array[1] = buffer[++offset];
    uInt8Float32Array[2] = buffer[++offset];
    uInt8Float32Array[3] = last;
    return float32Array[0];
}
function writeFloatForwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 3);
    float32Array[0] = val;
    buffer[offset++] = uInt8Float32Array[0];
    buffer[offset++] = uInt8Float32Array[1];
    buffer[offset++] = uInt8Float32Array[2];
    buffer[offset++] = uInt8Float32Array[3];
    return offset;
}
function writeFloatBackwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 3);
    float32Array[0] = val;
    buffer[offset++] = uInt8Float32Array[3];
    buffer[offset++] = uInt8Float32Array[2];
    buffer[offset++] = uInt8Float32Array[1];
    buffer[offset++] = uInt8Float32Array[0];
    return offset;
}
function readInt24LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    const val = first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
    return val | (val & 2 ** 23) * 0x1fe;
}
function readInt40LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return (last | (last & 2 ** 7) * 0x1fffffe) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt48LE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    const val = buf[offset + 4] + last * 2 ** 8;
    return (val | (val & 2 ** 15) * 0x1fffe) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt24BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    const val = first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
    return val | (val & 2 ** 23) * 0x1fe;
}
function readInt48BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    const val = buf[++offset] + first * 2 ** 8;
    return (val | (val & 2 ** 15) * 0x1fffe) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readInt40BE(buf, offset = 0) {
    validateNumber1(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return (first | (first & 2 ** 7) * 0x1fffffe) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function byteLengthUtf8(str) {
    return utf8Encoder.encode(str).length;
}
function base64ByteLength(str, bytes) {
    if (str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }
    if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }
    return bytes * 3 >>> 2;
}
const encodingsMap = Object.create(null);
for(let i = 0; i < encodings.length; ++i){
    encodingsMap[encodings[i]] = i;
}
const encodingOps = {
    ascii: {
        byteLength: (string)=>string.length
        ,
        encoding: "ascii",
        encodingVal: encodingsMap.ascii,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, asciiToBytes(val), byteOffset, encodingsMap.ascii, dir)
        ,
        slice: (buf, start, end)=>buf.asciiSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.asciiWrite(string, offset, len)
    },
    base64: {
        byteLength: (string)=>base64ByteLength(string, string.length)
        ,
        encoding: "base64",
        encodingVal: encodingsMap.base64,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, base64ToBytes(val), byteOffset, encodingsMap.base64, dir)
        ,
        slice: (buf, start, end)=>buf.base64Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.base64Write(string, offset, len)
    },
    base64url: {
        byteLength: (string)=>base64ByteLength(string, string.length)
        ,
        encoding: "base64url",
        encodingVal: encodingsMap.base64url,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, base64UrlToBytes(val), byteOffset, encodingsMap.base64url, dir)
        ,
        slice: (buf, start, end)=>buf.base64urlSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.base64urlWrite(string, offset, len)
    },
    hex: {
        byteLength: (string)=>string.length >>> 1
        ,
        encoding: "hex",
        encodingVal: encodingsMap.hex,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, hexToBytes(val), byteOffset, encodingsMap.hex, dir)
        ,
        slice: (buf, start, end)=>buf.hexSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.hexWrite(string, offset, len)
    },
    latin1: {
        byteLength: (string)=>string.length
        ,
        encoding: "latin1",
        encodingVal: encodingsMap.latin1,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, asciiToBytes(val), byteOffset, encodingsMap.latin1, dir)
        ,
        slice: (buf, start, end)=>buf.latin1Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.latin1Write(string, offset, len)
    },
    ucs2: {
        byteLength: (string)=>string.length * 2
        ,
        encoding: "ucs2",
        encodingVal: encodingsMap.utf16le,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf16leToBytes(val), byteOffset, encodingsMap.utf16le, dir)
        ,
        slice: (buf, start, end)=>buf.ucs2Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.ucs2Write(string, offset, len)
    },
    utf8: {
        byteLength: byteLengthUtf8,
        encoding: "utf8",
        encodingVal: encodingsMap.utf8,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf8Encoder.encode(val), byteOffset, encodingsMap.utf8, dir)
        ,
        slice: (buf, start, end)=>buf.utf8Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.utf8Write(string, offset, len)
    },
    utf16le: {
        byteLength: (string)=>string.length * 2
        ,
        encoding: "utf16le",
        encodingVal: encodingsMap.utf16le,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf16leToBytes(val), byteOffset, encodingsMap.utf16le, dir)
        ,
        slice: (buf, start, end)=>buf.ucs2Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.ucs2Write(string, offset, len)
    }
};
function getEncodingOps(encoding) {
    encoding = String(encoding).toLowerCase();
    switch(encoding.length){
        case 4:
            if (encoding === "utf8") return encodingOps.utf8;
            if (encoding === "ucs2") return encodingOps.ucs2;
            break;
        case 5:
            if (encoding === "utf-8") return encodingOps.utf8;
            if (encoding === "ascii") return encodingOps.ascii;
            if (encoding === "ucs-2") return encodingOps.ucs2;
            break;
        case 7:
            if (encoding === "utf16le") {
                return encodingOps.utf16le;
            }
            break;
        case 8:
            if (encoding === "utf-16le") {
                return encodingOps.utf16le;
            }
            break;
        case 6:
            if (encoding === "latin1" || encoding === "binary") {
                return encodingOps.latin1;
            }
            if (encoding === "base64") return encodingOps.base64;
        case 3:
            if (encoding === "hex") {
                return encodingOps.hex;
            }
            break;
        case 9:
            if (encoding === "base64url") {
                return encodingOps.base64url;
            }
            break;
    }
}
function _copyActual(source, target, targetStart, sourceStart, sourceEnd) {
    if (sourceEnd - sourceStart > target.length - targetStart) {
        sourceEnd = sourceStart + target.length - targetStart;
    }
    let nb = sourceEnd - sourceStart;
    const sourceLen = source.length - sourceStart;
    if (nb > sourceLen) {
        nb = sourceLen;
    }
    if (sourceStart !== 0 || sourceEnd < source.length) {
        source = new Uint8Array(source.buffer, source.byteOffset + sourceStart, nb);
    }
    target.set(source, targetStart);
    return nb;
}
function boundsError(value, length, type8) {
    if (Math.floor(value) !== value) {
        validateNumber1(value, type8);
        throw new codes.ERR_OUT_OF_RANGE(type8 || "offset", "an integer", value);
    }
    if (length < 0) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new codes.ERR_OUT_OF_RANGE(type8 || "offset", `>= ${type8 ? 1 : 0} and <= ${length}`, value);
}
function validateNumber1(value, name20) {
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name20, "number", value);
    }
}
function checkBounds(buf, offset, byteLength1) {
    validateNumber1(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength1] === undefined) {
        boundsError(offset, buf.length - (byteLength1 + 1));
    }
}
function checkInt(value, min5, max, buf, offset, byteLength2) {
    if (value > max || value < min5) {
        const n = typeof min5 === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
            if (min5 === 0 || min5 === 0n) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
                range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and ` + `< 2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
        } else {
            range = `>= ${min5}${n} and <= ${max}${n}`;
        }
        throw new codes.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
}
function toInteger(n, defaultVal) {
    n = +n;
    if (!Number.isNaN(n) && n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER) {
        return n % 1 === 0 ? n : Math.floor(n);
    }
    return defaultVal;
}
function writeU_Int8(buf, value, offset, min6, max) {
    value = +value;
    validateNumber1(offset, "offset");
    if (value > max || value < min6) {
        throw new codes.ERR_OUT_OF_RANGE("value", `>= ${min6} and <= ${max}`, value);
    }
    if (buf[offset] === undefined) {
        boundsError(offset, buf.length - 1);
    }
    buf[offset] = value;
    return offset + 1;
}
function writeU_Int16BE(buf, value, offset, min7, max) {
    value = +value;
    checkInt(value, min7, max, buf, offset, 1);
    buf[offset++] = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function _writeUInt32LE(buf, value, offset, min8, max) {
    value = +value;
    checkInt(value, min8, max, buf, offset, 3);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function writeU_Int16LE(buf, value, offset, min9, max) {
    value = +value;
    checkInt(value, min9, max, buf, offset, 1);
    buf[offset++] = value;
    buf[offset++] = value >>> 8;
    return offset;
}
function _writeUInt32BE(buf, value, offset, min10, max) {
    value = +value;
    checkInt(value, min10, max, buf, offset, 3);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int48BE(buf, value, offset, min11, max) {
    value = +value;
    checkInt(value, min11, max, buf, offset, 5);
    const newVal = Math.floor(value * 2 ** -32);
    buf[offset++] = newVal >>> 8;
    buf[offset++] = newVal;
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int40BE(buf, value, offset, min12, max) {
    value = +value;
    checkInt(value, min12, max, buf, offset, 4);
    buf[offset++] = Math.floor(value * 2 ** -32);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int32BE(buf, value, offset, min13, max) {
    value = +value;
    checkInt(value, min13, max, buf, offset, 3);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int24BE(buf, value, offset, min14, max) {
    value = +value;
    checkInt(value, min14, max, buf, offset, 2);
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 3;
}
function validateOffset(value, name21, min15 = 0, max = Number.MAX_SAFE_INTEGER) {
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name21, "number", value);
    }
    if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name21, "an integer", value);
    }
    if (value < min15 || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name21, `>= ${min15} && <= ${max}`, value);
    }
}
function writeU_Int48LE(buf, value, offset, min16, max) {
    value = +value;
    checkInt(value, min16, max, buf, offset, 5);
    const newVal = Math.floor(value * 2 ** -32);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    buf[offset++] = newVal;
    buf[offset++] = newVal >>> 8;
    return offset;
}
function writeU_Int40LE(buf, value, offset, min17, max) {
    value = +value;
    checkInt(value, min17, max, buf, offset, 4);
    const newVal = value;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    buf[offset++] = Math.floor(newVal * 2 ** -32);
    return offset;
}
function writeU_Int32LE(buf, value, offset, min18, max) {
    value = +value;
    checkInt(value, min18, max, buf, offset, 3);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function writeU_Int24LE(buf, value, offset, min19, max) {
    value = +value;
    checkInt(value, min19, max, buf, offset, 2);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
const kMaxLength = 2147483647;
const MAX_UINT32 = 2 ** 32;
const customInspectSymbol1 = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
const INSPECT_MAX_BYTES = 50;
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) {
            return void 0;
        }
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) {
            return void 0;
        }
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > 2147483647) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function Buffer(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
            throw new codes.ERR_INVALID_ARG_TYPE("string", "string", arg);
        }
        return _allocUnsafe(arg);
    }
    return _from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192;
function _from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
    }
    if (typeof value === "object" && value !== null) {
        if (isAnyArrayBuffer1(value)) {
            return fromArrayBuffer(value, encodingOrOffset, length);
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value && (typeof valueOf === "string" || typeof valueOf === "object")) {
            return _from(valueOf, encodingOrOffset, length);
        }
        const b8 = fromObject(value);
        if (b8) {
            return b8;
        }
        if (typeof value[Symbol.toPrimitive] === "function") {
            const primitive = value[Symbol.toPrimitive]("string");
            if (typeof primitive === "string") {
                return fromString(primitive, encodingOrOffset);
            }
        }
    }
    throw new codes.ERR_INVALID_ARG_TYPE("first argument", [
        "string",
        "Buffer",
        "ArrayBuffer",
        "Array",
        "Array-like Object"
    ], value);
}
Buffer.from = function from(value, encodingOrOffset, length) {
    return _from(value, encodingOrOffset, length);
};
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    validateNumber1(size, "size");
    if (!(size >= 0 && size <= 2147483647)) {
        throw new codes.ERR_INVALID_ARG_VALUE.RangeError("size", size);
    }
}
function _alloc(size, fill, encoding) {
    assertSize(size);
    const buffer = createBuffer(size);
    if (fill !== undefined) {
        if (encoding !== undefined && typeof encoding !== "string") {
            throw new codes.ERR_INVALID_ARG_TYPE("encoding", "string", encoding);
        }
        return buffer.fill(fill, encoding);
    }
    return buffer;
}
Buffer.alloc = function alloc(size, fill, encoding) {
    return _alloc(size, fill, encoding);
};
function _allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
Buffer.allocUnsafe = function allocUnsafe(size) {
    return _allocUnsafe(size);
};
Buffer.allocUnsafeSlow = function allocUnsafeSlow(size) {
    return _allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
        buf = buf.slice(0, actual);
    }
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i39 = 0; i39 < length; i39 += 1){
        buf[i39] = array[i39] & 255;
    }
    return buf;
}
function fromObject(obj) {
    if (obj.length !== undefined || isAnyArrayBuffer1(obj.buffer)) {
        if (typeof obj.length !== "number") {
            return createBuffer(0);
        }
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
    }
}
function checked(length) {
    if (length >= 2147483647) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647..toString(16) + " bytes");
    }
    return length | 0;
}
function SlowBuffer(length) {
    assertSize(length);
    return Buffer.alloc(+length);
}
Object.setPrototypeOf(SlowBuffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(SlowBuffer, Uint8Array);
Buffer.isBuffer = function isBuffer(b9) {
    return b9 != null && b9._isBuffer === true && b9 !== Buffer.prototype;
};
Buffer.compare = function compare(a, b10) {
    if (isInstance(a, Uint8Array)) {
        a = Buffer.from(a, a.offset, a.byteLength);
    }
    if (isInstance(b10, Uint8Array)) {
        b10 = Buffer.from(b10, b10.offset, b10.byteLength);
    }
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b10)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b10) {
        return 0;
    }
    let x3 = a.length;
    let y3 = b10.length;
    for(let i40 = 0, len = Math.min(x3, y3); i40 < len; ++i40){
        if (a[i40] !== b10[i40]) {
            x3 = a[i40];
            y3 = b10[i40];
            break;
        }
    }
    if (x3 < y3) {
        return -1;
    }
    if (y3 < x3) {
        return 1;
    }
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    return typeof encoding === "string" && encoding.length !== 0 && normalizeEncoding1(encoding) !== undefined;
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new codes.ERR_INVALID_ARG_TYPE("list", "Array", list);
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    if (length === undefined) {
        length = 0;
        for(let i41 = 0; i41 < list.length; i41++){
            if (list[i41].length) {
                length += list[i41].length;
            }
        }
    } else {
        validateOffset(length, "length");
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(let i42 = 0; i42 < list.length; i42++){
        const buf = list[i42];
        if (!isUint8Array(buf)) {
            throw new codes.ERR_INVALID_ARG_TYPE(`list[${i42}]`, [
                "Buffer",
                "Uint8Array"
            ], list[i42]);
        }
        pos += _copyActual(buf, buffer, pos, 0, buf.length);
    }
    if (pos < length) {
        buffer.fill(0, pos, length);
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (typeof string !== "string") {
        if (isArrayBufferView(string) || isAnyArrayBuffer1(string)) {
            return string.byteLength;
        }
        throw new codes.ERR_INVALID_ARG_TYPE("string", [
            "string",
            "Buffer",
            "ArrayBuffer"
        ], string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) {
        return 0;
    }
    if (!encoding) {
        return mustMatch ? -1 : byteLengthUtf8(string);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        return mustMatch ? -1 : byteLengthUtf8(string);
    }
    return ops.byteLength(string);
}
Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;
function swap(b11, n, m) {
    const i43 = b11[n];
    b11[n] = b11[m];
    b11[m] = i43;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for(let i44 = 0; i44 < len; i44 += 2){
        swap(this, i44, i44 + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for(let i45 = 0; i45 < len; i45 += 4){
        swap(this, i45, i45 + 3);
        swap(this, i45 + 1, i45 + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for(let i46 = 0; i46 < len; i46 += 8){
        swap(this, i46, i46 + 7);
        swap(this, i46 + 1, i46 + 6);
        swap(this, i46 + 2, i46 + 5);
        swap(this, i46 + 3, i46 + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString(encoding, start, end) {
    if (arguments.length === 0) {
        return this.utf8Slice(0, this.length);
    }
    const len = this.length;
    if (start <= 0) {
        start = 0;
    } else if (start >= len) {
        return "";
    } else {
        start |= 0;
    }
    if (end === undefined || end > len) {
        end = len;
    } else {
        end |= 0;
    }
    if (end <= start) {
        return "";
    }
    if (encoding === undefined) {
        return this.utf8Slice(start, end);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.slice(this, start, end);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b12) {
    if (!isUint8Array(b12)) {
        throw new codes.ERR_INVALID_ARG_TYPE("otherBuffer", [
            "Buffer",
            "Uint8Array"
        ], b12);
    }
    if (this === b12) {
        return true;
    }
    return Buffer.compare(this, b12) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) {
        str += " ... ";
    }
    return "<Buffer " + str + ">";
};
if (customInspectSymbol1) {
    Buffer.prototype[customInspectSymbol1] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
        throw new codes.ERR_INVALID_ARG_TYPE("target", [
            "Buffer",
            "Uint8Array"
        ], target);
    }
    if (start === undefined) {
        start = 0;
    } else {
        validateOffset(start, "targetStart", 0, kMaxLength);
    }
    if (end === undefined) {
        end = target.length;
    } else {
        validateOffset(end, "targetEnd", 0, target.length);
    }
    if (thisStart === undefined) {
        thisStart = 0;
    } else {
        validateOffset(start, "sourceStart", 0, kMaxLength);
    }
    if (thisEnd === undefined) {
        thisEnd = this.length;
    } else {
        validateOffset(end, "sourceEnd", 0, this.length);
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new codes.ERR_OUT_OF_RANGE("out of range index", "range");
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) {
        return 0;
    }
    let x4 = thisEnd - thisStart;
    let y4 = end - start;
    const len = Math.min(x4, y4);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i47 = 0; i47 < len; ++i47){
        if (thisCopy[i47] !== targetCopy[i47]) {
            x4 = thisCopy[i47];
            y4 = targetCopy[i47];
            break;
        }
    }
    if (x4 < y4) {
        return -1;
    }
    if (y4 < x4) {
        return 1;
    }
    return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    validateBuffer(buffer);
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = undefined;
    } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;
    if (Number.isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length || buffer.byteLength;
    }
    dir = !!dir;
    if (typeof val === "number") {
        return indexOfNumber(buffer, val >>> 0, byteOffset, dir);
    }
    let ops;
    if (encoding === undefined) {
        ops = encodingOps.utf8;
    } else {
        ops = getEncodingOps(encoding);
    }
    if (typeof val === "string") {
        if (ops === undefined) {
            throw new codes.ERR_UNKNOWN_ENCODING(encoding);
        }
        return ops.indexOf(buffer, val, byteOffset, dir);
    }
    if (isUint8Array(val)) {
        const encodingVal = ops === undefined ? encodingsMap.utf8 : ops.encodingVal;
        return indexOfBuffer(buffer, val, byteOffset, encodingVal, dir);
    }
    throw new codes.ERR_INVALID_ARG_TYPE("value", [
        "number",
        "string",
        "Buffer",
        "Uint8Array"
    ], val);
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
Buffer.prototype.asciiSlice = function asciiSlice(offset, length) {
    if (offset === 0 && length === this.length) {
        return bytesToAscii(this);
    } else {
        return bytesToAscii(this.slice(offset, length));
    }
};
Buffer.prototype.asciiWrite = function asciiWrite(string, offset, length) {
    return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.base64Slice = function base64Slice(offset, length) {
    if (offset === 0 && length === this.length) {
        return encode(this);
    } else {
        return encode(this.slice(offset, length));
    }
};
Buffer.prototype.base64Write = function base64Write(string, offset, length) {
    return blitBuffer(base64ToBytes(string), this, offset, length);
};
Buffer.prototype.base64urlSlice = function base64urlSlice(offset, length) {
    if (offset === 0 && length === this.length) {
        return encode1(this);
    } else {
        return encode1(this.slice(offset, length));
    }
};
Buffer.prototype.base64urlWrite = function base64urlWrite(string, offset, length) {
    return blitBuffer(base64UrlToBytes(string), this, offset, length);
};
Buffer.prototype.hexWrite = function hexWrite(string, offset, length) {
    return blitBuffer(hexToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.hexSlice = function hexSlice(string, offset, length) {
    return _hexSlice(this, string, offset, length);
};
Buffer.prototype.latin1Slice = function latin1Slice(string, offset, length) {
    return _latin1Slice(this, string, offset, length);
};
Buffer.prototype.latin1Write = function latin1Write(string, offset, length) {
    return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.ucs2Slice = function ucs2Slice(offset, length) {
    if (offset === 0 && length === this.length) {
        return bytesToUtf16le(this);
    } else {
        return bytesToUtf16le(this.slice(offset, length));
    }
};
Buffer.prototype.ucs2Write = function ucs2Write(string, offset, length) {
    return blitBuffer(utf16leToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.utf8Slice = function utf8Slice(string, offset, length) {
    return _utf8Slice(this, string, offset, length);
};
Buffer.prototype.utf8Write = function utf8Write(string, offset, length) {
    return blitBuffer(utf8ToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
        return this.utf8Write(string, 0, this.length);
    }
    if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    } else {
        validateOffset(offset, "offset", 0, this.length);
        const remaining = this.length - offset;
        if (length === undefined) {
            length = remaining;
        } else if (typeof length === "string") {
            encoding = length;
            length = remaining;
        } else {
            validateOffset(length, "length", 0, this.length);
            if (length > remaining) {
                length = remaining;
            }
        }
    }
    if (!encoding) {
        return this.utf8Write(string, offset, length);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.write(this, string, offset, length);
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function fromArrayBuffer(obj, byteOffset, length) {
    if (byteOffset === undefined) {
        byteOffset = 0;
    } else {
        byteOffset = +byteOffset;
        if (Number.isNaN(byteOffset)) {
            byteOffset = 0;
        }
    }
    const maxLength = obj.byteLength - byteOffset;
    if (maxLength < 0) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("offset");
    }
    if (length === undefined) {
        length = maxLength;
    } else {
        length = +length;
        if (length > 0) {
            if (length > maxLength) {
                throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("length");
            }
        } else {
            length = 0;
        }
    }
    const buffer = new Uint8Array(obj, byteOffset, length);
    Object.setPrototypeOf(buffer, Buffer.prototype);
    return buffer;
}
function _utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i48 = start;
    while(i48 < end){
        const firstByte = buf[i48];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i48 + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 128) {
                        codePoint = firstByte;
                    }
                    break;
                case 2:
                    secondByte = buf[i48 + 1];
                    if ((secondByte & 192) === 128) {
                        tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                        if (tempCodePoint > 127) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 3:
                    secondByte = buf[i48 + 1];
                    thirdByte = buf[i48 + 2];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                        if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 4:
                    secondByte = buf[i48 + 1];
                    thirdByte = buf[i48 + 2];
                    fourthByte = buf[i48 + 3];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                        if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                            codePoint = tempCodePoint;
                        }
                    }
            }
        }
        if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
        } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i48 += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= 4096) {
        return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i49 = 0;
    while(i49 < len){
        res += String.fromCharCode.apply(String, codePoints.slice(i49, i49 += MAX_ARGUMENTS_LENGTH));
    }
    return res;
}
function _latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i50 = start; i50 < end; ++i50){
        ret += String.fromCharCode(buf[i50]);
    }
    return ret;
}
function _hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) {
        start = 0;
    }
    if (!end || end < 0 || end > len) {
        end = len;
    }
    let out = "";
    for(let i51 = start; i51 < end; ++i51){
        out += hexSliceLookupTable[buf[i51]];
    }
    return out;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) {
            start = 0;
        }
    } else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0) {
            end = 0;
        }
    } else if (end > len) {
        end = len;
    }
    if (end < start) {
        end = start;
    }
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength1) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength1 === 6) {
        return readUInt48LE(this, offset);
    }
    if (byteLength1 === 5) {
        return readUInt40LE(this, offset);
    }
    if (byteLength1 === 3) {
        return readUInt24LE(this, offset);
    }
    if (byteLength1 === 4) {
        return this.readUInt32LE(offset);
    }
    if (byteLength1 === 2) {
        return this.readUInt16LE(offset);
    }
    if (byteLength1 === 1) {
        return this.readUInt8(offset);
    }
    boundsError(byteLength1, 6, "byteLength");
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength2 === 6) {
        return readUInt48BE(this, offset);
    }
    if (byteLength2 === 5) {
        return readUInt40BE(this, offset);
    }
    if (byteLength2 === 3) {
        return readUInt24BE(this, offset);
    }
    if (byteLength2 === 4) {
        return this.readUInt32BE(offset);
    }
    if (byteLength2 === 2) {
        return this.readUInt16BE(offset);
    }
    if (byteLength2 === 1) {
        return this.readUInt8(offset);
    }
    boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset = 0) {
    validateNumber1(offset, "offset");
    const val = this[offset];
    if (val === undefined) {
        boundsError(offset, this.length - 1);
    }
    return val;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = readUInt16BE;
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    return first + last * 2 ** 8;
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = readUInt32BE;
Buffer.prototype.readBigUint64LE = Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUint64BE = Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength3) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength3 === 6) {
        return readInt48LE(this, offset);
    }
    if (byteLength3 === 5) {
        return readInt40LE(this, offset);
    }
    if (byteLength3 === 3) {
        return readInt24LE(this, offset);
    }
    if (byteLength3 === 4) {
        return this.readInt32LE(offset);
    }
    if (byteLength3 === 2) {
        return this.readInt16LE(offset);
    }
    if (byteLength3 === 1) {
        return this.readInt8(offset);
    }
    boundsError(byteLength3, 6, "byteLength");
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength4) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength4 === 6) {
        return readInt48BE(this, offset);
    }
    if (byteLength4 === 5) {
        return readInt40BE(this, offset);
    }
    if (byteLength4 === 3) {
        return readInt24BE(this, offset);
    }
    if (byteLength4 === 4) {
        return this.readInt32BE(offset);
    }
    if (byteLength4 === 2) {
        return this.readInt16BE(offset);
    }
    if (byteLength4 === 1) {
        return this.readInt8(offset);
    }
    boundsError(byteLength4, 6, "byteLength");
};
Buffer.prototype.readInt8 = function readInt8(offset = 0) {
    validateNumber1(offset, "offset");
    const val = this[offset];
    if (val === undefined) {
        boundsError(offset, this.length - 1);
    }
    return val | (val & 2 ** 7) * 0x1fffffe;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    const val = first + last * 2 ** 8;
    return val | (val & 2 ** 15) * 0x1fffe;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    const val = first * 2 ** 8 + last;
    return val | (val & 2 ** 15) * 0x1fffe;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + (last << 24);
};
Buffer.prototype.readInt32BE = function readInt32BE(offset = 0) {
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber1(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset) {
    return bigEndian ? readFloatBackwards(this, offset) : readFloatForwards(this, offset);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset) {
    return bigEndian ? readFloatForwards(this, offset) : readFloatBackwards(this, offset);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset) {
    return bigEndian ? readDoubleBackwards(this, offset) : readDoubleForwards(this, offset);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset) {
    return bigEndian ? readDoubleForwards(this, offset) : readDoubleBackwards(this, offset);
};
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength5) {
    if (byteLength5 === 6) {
        return writeU_Int48LE(this, value, offset, 0, 0xffffffffffff);
    }
    if (byteLength5 === 5) {
        return writeU_Int40LE(this, value, offset, 0, 0xffffffffff);
    }
    if (byteLength5 === 3) {
        return writeU_Int24LE(this, value, offset, 0, 0xffffff);
    }
    if (byteLength5 === 4) {
        return writeU_Int32LE(this, value, offset, 0, 0xffffffff);
    }
    if (byteLength5 === 2) {
        return writeU_Int16LE(this, value, offset, 0, 0xffff);
    }
    if (byteLength5 === 1) {
        return writeU_Int8(this, value, offset, 0, 0xff);
    }
    boundsError(byteLength5, 6, "byteLength");
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength6) {
    if (byteLength6 === 6) {
        return writeU_Int48BE(this, value, offset, 0, 0xffffffffffff);
    }
    if (byteLength6 === 5) {
        return writeU_Int40BE(this, value, offset, 0, 0xffffffffff);
    }
    if (byteLength6 === 3) {
        return writeU_Int24BE(this, value, offset, 0, 0xffffff);
    }
    if (byteLength6 === 4) {
        return writeU_Int32BE(this, value, offset, 0, 0xffffffff);
    }
    if (byteLength6 === 2) {
        return writeU_Int16BE(this, value, offset, 0, 0xffff);
    }
    if (byteLength6 === 1) {
        return writeU_Int8(this, value, offset, 0, 0xff);
    }
    boundsError(byteLength6, 6, "byteLength");
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset = 0) {
    return writeU_Int8(this, value, offset, 0, 0xff);
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset = 0) {
    return writeU_Int16LE(this, value, offset, 0, 0xffff);
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset = 0) {
    return writeU_Int16BE(this, value, offset, 0, 0xffff);
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset = 0) {
    return _writeUInt32LE(this, value, offset, 0, 0xffffffff);
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset = 0) {
    return _writeUInt32BE(this, value, offset, 0, 0xffffffff);
};
function wrtBigUInt64LE(buf, value, offset, min20, max) {
    checkIntBI(value, min20, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min21, max) {
    checkIntBI(value, min21, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUint64LE = Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeBigUint64BE = Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength7) {
    if (byteLength7 === 6) {
        return writeU_Int48LE(this, value, offset, -0x800000000000, 0x7fffffffffff);
    }
    if (byteLength7 === 5) {
        return writeU_Int40LE(this, value, offset, -0x8000000000, 0x7fffffffff);
    }
    if (byteLength7 === 3) {
        return writeU_Int24LE(this, value, offset, -0x800000, 0x7fffff);
    }
    if (byteLength7 === 4) {
        return writeU_Int32LE(this, value, offset, -0x80000000, 0x7fffffff);
    }
    if (byteLength7 === 2) {
        return writeU_Int16LE(this, value, offset, -0x8000, 0x7fff);
    }
    if (byteLength7 === 1) {
        return writeU_Int8(this, value, offset, -0x80, 0x7f);
    }
    boundsError(byteLength7, 6, "byteLength");
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength8) {
    if (byteLength8 === 6) {
        return writeU_Int48BE(this, value, offset, -0x800000000000, 0x7fffffffffff);
    }
    if (byteLength8 === 5) {
        return writeU_Int40BE(this, value, offset, -0x8000000000, 0x7fffffffff);
    }
    if (byteLength8 === 3) {
        return writeU_Int24BE(this, value, offset, -0x800000, 0x7fffff);
    }
    if (byteLength8 === 4) {
        return writeU_Int32BE(this, value, offset, -0x80000000, 0x7fffffff);
    }
    if (byteLength8 === 2) {
        return writeU_Int16BE(this, value, offset, -0x8000, 0x7fff);
    }
    if (byteLength8 === 1) {
        return writeU_Int8(this, value, offset, -0x80, 0x7f);
    }
    boundsError(byteLength8, 6, "byteLength");
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset = 0) {
    return writeU_Int8(this, value, offset, -0x80, 0x7f);
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset = 0) {
    return writeU_Int16LE(this, value, offset, -0x8000, 0x7fff);
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset = 0) {
    return writeU_Int16BE(this, value, offset, -0x8000, 0x7fff);
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset = 0) {
    return writeU_Int32LE(this, value, offset, -0x80000000, 0x7fffffff);
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset = 0) {
    return writeU_Int32BE(this, value, offset, -0x80000000, 0x7fffffff);
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset) {
    return bigEndian ? writeFloatBackwards(this, value, offset) : writeFloatForwards(this, value, offset);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset) {
    return bigEndian ? writeFloatForwards(this, value, offset) : writeFloatBackwards(this, value, offset);
};
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset) {
    return bigEndian ? writeDoubleBackwards(this, value, offset) : writeDoubleForwards(this, value, offset);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset) {
    return bigEndian ? writeDoubleForwards(this, value, offset) : writeDoubleBackwards(this, value, offset);
};
Buffer.prototype.copy = function copy(target, targetStart, sourceStart, sourceEnd) {
    if (!isUint8Array(this)) {
        throw new codes.ERR_INVALID_ARG_TYPE("source", [
            "Buffer",
            "Uint8Array"
        ], this);
    }
    if (!isUint8Array(target)) {
        throw new codes.ERR_INVALID_ARG_TYPE("target", [
            "Buffer",
            "Uint8Array"
        ], target);
    }
    if (targetStart === undefined) {
        targetStart = 0;
    } else {
        targetStart = toInteger(targetStart, 0);
        if (targetStart < 0) {
            throw new codes.ERR_OUT_OF_RANGE("targetStart", ">= 0", targetStart);
        }
    }
    if (sourceStart === undefined) {
        sourceStart = 0;
    } else {
        sourceStart = toInteger(sourceStart, 0);
        if (sourceStart < 0) {
            throw new codes.ERR_OUT_OF_RANGE("sourceStart", ">= 0", sourceStart);
        }
        if (sourceStart >= MAX_UINT32) {
            throw new codes.ERR_OUT_OF_RANGE("sourceStart", `< ${MAX_UINT32}`, sourceStart);
        }
    }
    if (sourceEnd === undefined) {
        sourceEnd = this.length;
    } else {
        sourceEnd = toInteger(sourceEnd, 0);
        if (sourceEnd < 0) {
            throw new codes.ERR_OUT_OF_RANGE("sourceEnd", ">= 0", sourceEnd);
        }
        if (sourceEnd >= MAX_UINT32) {
            throw new codes.ERR_OUT_OF_RANGE("sourceEnd", `< ${MAX_UINT32}`, sourceEnd);
        }
    }
    if (targetStart >= target.length) {
        return 0;
    }
    if (sourceEnd > 0 && sourceEnd < sourceStart) {
        sourceEnd = sourceStart;
    }
    if (sourceEnd === sourceStart) {
        return 0;
    }
    if (target.length === 0 || this.length === 0) {
        return 0;
    }
    if (sourceEnd > this.length) {
        sourceEnd = this.length;
    }
    if (target.length - targetStart < sourceEnd - sourceStart) {
        sourceEnd = target.length - targetStart + sourceStart;
    }
    const len = sourceEnd - sourceStart;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, sourceStart, sourceEnd);
    } else {
        Uint8Array.prototype.set.call(target, this.subarray(sourceStart, sourceEnd), targetStart);
    }
    return len;
};
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
            const code9 = val.charCodeAt(0);
            if (encoding === "utf8" && code9 < 128 || encoding === "latin1") {
                val = code9;
            }
        }
    } else if (typeof val === "number") {
        val = val & 255;
    } else if (typeof val === "boolean") {
        val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
    }
    if (end <= start) {
        return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) {
        val = 0;
    }
    let i52;
    if (typeof val === "number") {
        for(i52 = start; i52 < end; ++i52){
            this[i52] = val;
        }
    } else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
            throw new codes.ERR_INVALID_ARG_VALUE("value", val);
        }
        for(i52 = 0; i52 < end - start; ++i52){
            this[i52 + start] = bytes[i52 % len];
        }
    }
    return this;
};
function checkBounds1(buf, offset, byteLength2) {
    validateNumber1(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
    }
}
function checkIntBI(value, min22, max, buf, offset, byteLength2) {
    if (value > max || value < min22) {
        const n = typeof min22 === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
            if (min22 === 0 || min22 === BigInt(0)) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
                range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
        } else {
            range = `>= ${min22}${n} and <= ${max}${n}`;
        }
        throw new codes.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds1(buf, offset, byteLength2);
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i53 = 0; i53 < length; ++i53){
        codePoint = string.charCodeAt(i53);
        if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
                if (codePoint > 56319) {
                    if ((units -= 3) > -1) {
                        bytes.push(239, 191, 189);
                    }
                    continue;
                } else if (i53 + 1 === length) {
                    if ((units -= 3) > -1) {
                        bytes.push(239, 191, 189);
                    }
                    continue;
                }
                leadSurrogate = codePoint;
                continue;
            }
            if (codePoint < 56320) {
                if ((units -= 3) > -1) {
                    bytes.push(239, 191, 189);
                }
                leadSurrogate = codePoint;
                continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
            if ((units -= 3) > -1) {
                bytes.push(239, 191, 189);
            }
        }
        leadSurrogate = null;
        if (codePoint < 128) {
            if ((units -= 1) < 0) {
                break;
            }
            bytes.push(codePoint);
        } else if (codePoint < 2048) {
            if ((units -= 2) < 0) {
                break;
            }
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
            if ((units -= 3) < 0) {
                break;
            }
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) {
                break;
            }
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
            throw new Error("Invalid code point");
        }
    }
    return bytes;
}
function blitBuffer(src, dst, offset, byteLength9) {
    let i54;
    const length = byteLength9 === undefined ? src.length : byteLength9;
    for(i54 = 0; i54 < length; ++i54){
        if (i54 + offset >= dst.length || i54 >= src.length) {
            break;
        }
        dst[i54 + offset] = src[i54];
    }
    return i54;
}
function isInstance(obj, type9) {
    return obj instanceof type9 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type9.name;
}
const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i55 = 0; i55 < 16; ++i55){
        const i16 = i55 * 16;
        for(let j7 = 0; j7 < 16; ++j7){
            table[i16 + j7] = alphabet[i55] + alphabet[j7];
        }
    }
    return table;
}();
function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}
globalThis.atob;
globalThis.Blob;
globalThis.btoa;
var valueType;
(function(valueType1) {
    valueType1[valueType1["noIterator"] = 0] = "noIterator";
    valueType1[valueType1["isArray"] = 1] = "isArray";
    valueType1[valueType1["isSet"] = 2] = "isSet";
    valueType1[valueType1["isMap"] = 3] = "isMap";
})(valueType || (valueType = {}));
let memo;
function isDeepStrictEqual(val1, val2) {
    return innerDeepEqual(val1, val2, true);
}
function innerDeepEqual(val1, val2, strict1, memos = memo) {
    if (val1 === val2) {
        if (val1 !== 0) return true;
        return strict1 ? Object.is(val1, val2) : true;
    }
    if (strict1) {
        if (typeof val1 !== "object") {
            return typeof val1 === "number" && Number.isNaN(val1) && Number.isNaN(val2);
        }
        if (typeof val2 !== "object" || val1 === null || val2 === null) {
            return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
            return false;
        }
    } else {
        if (val1 === null || typeof val1 !== "object") {
            if (val2 === null || typeof val2 !== "object") {
                return val1 == val2 || Number.isNaN(val1) && Number.isNaN(val2);
            }
            return false;
        }
        if (val2 === null || typeof val2 !== "object") {
            return false;
        }
    }
    const val1Tag = Object.prototype.toString.call(val1);
    const val2Tag = Object.prototype.toString.call(val2);
    if (val1Tag !== val2Tag) {
        return false;
    }
    if (Array.isArray(val1)) {
        if (!Array.isArray(val2) || val1.length !== val2.length) {
            return false;
        }
        const filter = strict1 ? 2 : 2 | 16;
        const keys1 = getOwnNonIndexProperties(val1, filter);
        const keys2 = getOwnNonIndexProperties(val2, filter);
        if (keys1.length !== keys2.length) {
            return false;
        }
        return keyCheck(val1, val2, strict1, memos, valueType.isArray, keys1);
    } else if (val1Tag === "[object Object]") {
        return keyCheck(val1, val2, strict1, memos, valueType.noIterator);
    } else if (val1 instanceof Date) {
        if (!(val2 instanceof Date) || val1.getTime() !== val2.getTime()) {
            return false;
        }
    } else if (val1 instanceof RegExp) {
        if (!(val2 instanceof RegExp) || !areSimilarRegExps(val1, val2)) {
            return false;
        }
    } else if (isNativeError1(val1) || val1 instanceof Error) {
        if (!isNativeError1(val2) && !(val2 instanceof Error) || val1.message !== val2.message || val1.name !== val2.name) {
            return false;
        }
    } else if (isArrayBufferView(val1)) {
        const TypedArrayPrototypeGetSymbolToStringTag = (val)=>Object.getOwnPropertySymbols(val).map((item)=>item.toString()
            ).toString()
        ;
        if (isTypedArray(val1) && isTypedArray(val2) && TypedArrayPrototypeGetSymbolToStringTag(val1) !== TypedArrayPrototypeGetSymbolToStringTag(val2)) {
            return false;
        }
        if (!strict1 && (isFloat32Array(val1) || isFloat64Array(val1))) {
            if (!areSimilarFloatArrays(val1, val2)) {
                return false;
            }
        } else if (!areSimilarTypedArrays(val1, val2)) {
            return false;
        }
        const filter = strict1 ? 2 : 2 | 16;
        const keysVal1 = getOwnNonIndexProperties(val1, filter);
        const keysVal2 = getOwnNonIndexProperties(val2, filter);
        if (keysVal1.length !== keysVal2.length) {
            return false;
        }
        return keyCheck(val1, val2, strict1, memos, valueType.noIterator, keysVal1);
    } else if (isSet1(val1)) {
        if (!isSet1(val2) || val1.size !== val2.size) {
            return false;
        }
        return keyCheck(val1, val2, strict1, memos, valueType.isSet);
    } else if (isMap1(val1)) {
        if (!isMap1(val2) || val1.size !== val2.size) {
            return false;
        }
        return keyCheck(val1, val2, strict1, memos, valueType.isMap);
    } else if (isAnyArrayBuffer1(val1)) {
        if (!isAnyArrayBuffer1(val2) || !areEqualArrayBuffers(val1, val2)) {
            return false;
        }
    } else if (isBoxedPrimitive1(val1)) {
        if (!isEqualBoxedPrimitive(val1, val2)) {
            return false;
        }
    } else if (Array.isArray(val2) || isArrayBufferView(val2) || isSet1(val2) || isMap1(val2) || isDate1(val2) || isRegExp1(val2) || isAnyArrayBuffer1(val2) || isBoxedPrimitive1(val2) || isNativeError1(val2) || val2 instanceof Error) {
        return false;
    }
    return keyCheck(val1, val2, strict1, memos, valueType.noIterator);
}
function keyCheck(val1, val2, strict2, memos, iterationType, aKeys = []) {
    if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        const bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
    }
    let i56 = 0;
    for(; i56 < aKeys.length; i56++){
        if (!val2.propertyIsEnumerable(aKeys[i56])) {
            return false;
        }
    }
    if (strict2 && arguments.length === 5) {
        const symbolKeysA = Object.getOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
            let count = 0;
            for(i56 = 0; i56 < symbolKeysA.length; i56++){
                const key = symbolKeysA[i56];
                if (val1.propertyIsEnumerable(key)) {
                    if (!val2.propertyIsEnumerable(key)) {
                        return false;
                    }
                    aKeys.push(key.toString());
                    count++;
                } else if (val2.propertyIsEnumerable(key)) {
                    return false;
                }
            }
            const symbolKeysB = Object.getOwnPropertySymbols(val2);
            if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
                return false;
            }
        } else {
            const symbolKeysB = Object.getOwnPropertySymbols(val2);
            if (symbolKeysB.length !== 0 && getEnumerables(val2, symbolKeysB).length !== 0) {
                return false;
            }
        }
    }
    if (aKeys.length === 0 && (iterationType === valueType.noIterator || iterationType === valueType.isArray && val1.length === 0 || val1.size === 0)) {
        return true;
    }
    if (memos === undefined) {
        memos = {
            val1: new Map(),
            val2: new Map(),
            position: 0
        };
    } else {
        const val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== undefined) {
            const val2MemoB = memos.val2.get(val2);
            if (val2MemoB !== undefined) {
                return val2MemoA === val2MemoB;
            }
        }
        memos.position++;
    }
    memos.val1.set(val1, memos.position);
    memos.val2.set(val2, memos.position);
    const areEq = objEquiv(val1, val2, strict2, aKeys, memos, iterationType);
    memos.val1.delete(val1);
    memos.val2.delete(val2);
    return areEq;
}
function areSimilarRegExps(a, b13) {
    return a.source === b13.source && a.flags === b13.flags && a.lastIndex === b13.lastIndex;
}
function areSimilarFloatArrays(arr1, arr2) {
    if (arr1.byteLength !== arr2.byteLength) {
        return false;
    }
    for(let i57 = 0; i57 < arr1.byteLength; i57++){
        if (arr1[i57] !== arr2[i57]) {
            return false;
        }
    }
    return true;
}
function areSimilarTypedArrays(arr1, arr2) {
    if (arr1.byteLength !== arr2.byteLength) {
        return false;
    }
    return Buffer.compare(new Uint8Array(arr1.buffer, arr1.byteOffset, arr1.byteLength), new Uint8Array(arr2.buffer, arr2.byteOffset, arr2.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
    return buf1.byteLength === buf2.byteLength && Buffer.compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(a, b14) {
    if (Object.getOwnPropertyNames(a).length !== Object.getOwnPropertyNames(b14).length) {
        return false;
    }
    if (Object.getOwnPropertySymbols(a).length !== Object.getOwnPropertySymbols(b14).length) {
        return false;
    }
    if (isNumberObject1(a)) {
        return isNumberObject1(b14) && Object.is(Number.prototype.valueOf.call(a), Number.prototype.valueOf.call(b14));
    }
    if (isStringObject1(a)) {
        return isStringObject1(b14) && String.prototype.valueOf.call(a) === String.prototype.valueOf.call(b14);
    }
    if (isBooleanObject1(a)) {
        return isBooleanObject1(b14) && Boolean.prototype.valueOf.call(a) === Boolean.prototype.valueOf.call(b14);
    }
    if (isBigIntObject1(a)) {
        return isBigIntObject1(b14) && BigInt.prototype.valueOf.call(a) === BigInt.prototype.valueOf.call(b14);
    }
    if (isSymbolObject1(a)) {
        return isSymbolObject1(b14) && Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b14);
    }
    throw Error(`Unknown boxed type`);
}
function getEnumerables(val, keys) {
    return keys.filter((key)=>val.propertyIsEnumerable(key)
    );
}
function objEquiv(obj1, obj2, strict3, keys, memos, iterationType) {
    let i58 = 0;
    if (iterationType === valueType.isSet) {
        if (!setEquiv(obj1, obj2, strict3, memos)) {
            return false;
        }
    } else if (iterationType === valueType.isMap) {
        if (!mapEquiv(obj1, obj2, strict3, memos)) {
            return false;
        }
    } else if (iterationType === valueType.isArray) {
        for(; i58 < obj1.length; i58++){
            if (obj1.hasOwnProperty(i58)) {
                if (!obj2.hasOwnProperty(i58) || !innerDeepEqual(obj1[i58], obj2[i58], strict3, memos)) {
                    return false;
                }
            } else if (obj2.hasOwnProperty(i58)) {
                return false;
            } else {
                const keys1 = Object.keys(obj1);
                for(; i58 < keys1.length; i58++){
                    const key = keys1[i58];
                    if (!obj2.hasOwnProperty(key) || !innerDeepEqual(obj1[key], obj2[key], strict3, memos)) {
                        return false;
                    }
                }
                if (keys1.length !== Object.keys(obj2).length) {
                    return false;
                }
                if (keys1.length !== Object.keys(obj2).length) {
                    return false;
                }
                return true;
            }
        }
    }
    for(i58 = 0; i58 < keys.length; i58++){
        const key = keys[i58];
        if (!innerDeepEqual(obj1[key], obj2[key], strict3, memos)) {
            return false;
        }
    }
    return true;
}
function findLooseMatchingPrimitives(primitive) {
    switch(typeof primitive){
        case "undefined":
            return null;
        case "object":
            return undefined;
        case "symbol":
            return false;
        case "string":
            primitive = +primitive;
        case "number":
            if (Number.isNaN(primitive)) {
                return false;
            }
    }
    return true;
}
function setMightHaveLoosePrim(set1, set2, primitive) {
    const altValue = findLooseMatchingPrimitives(primitive);
    if (altValue != null) return altValue;
    return set2.has(altValue) && !set1.has(altValue);
}
function setHasEqualElement(set, val1, strict4, memos) {
    for (const val2 of set){
        if (innerDeepEqual(val1, val2, strict4, memos)) {
            set.delete(val2);
            return true;
        }
    }
    return false;
}
function setEquiv(set1, set2, strict5, memos) {
    let set = null;
    for (const item of set1){
        if (typeof item === "object" && item !== null) {
            if (set === null) {
                set = new Set();
            }
            set.add(item);
        } else if (!set2.has(item)) {
            if (strict5) return false;
            if (!setMightHaveLoosePrim(set1, set2, item)) {
                return false;
            }
            if (set === null) {
                set = new Set();
            }
            set.add(item);
        }
    }
    if (set !== null) {
        for (const item of set2){
            if (typeof item === "object" && item !== null) {
                if (!setHasEqualElement(set, item, strict5, memos)) return false;
            } else if (!strict5 && !set1.has(item) && !setHasEqualElement(set, item, strict5, memos)) {
                return false;
            }
        }
        return set.size === 0;
    }
    return true;
}
function mapMightHaveLoosePrimitive(map1, map2, primitive, item, memos) {
    const altValue = findLooseMatchingPrimitives(primitive);
    if (altValue != null) {
        return altValue;
    }
    const curB = map2.get(altValue);
    if (curB === undefined && !map2.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
    }
    return !map1.has(altValue) && innerDeepEqual(item, curB, false, memos);
}
function mapEquiv(map1, map2, strict6, memos) {
    let set = null;
    for (const { 0: key , 1: item1  } of map1){
        if (typeof key === "object" && key !== null) {
            if (set === null) {
                set = new Set();
            }
            set.add(key);
        } else {
            const item2 = map2.get(key);
            if (item2 === undefined && !map2.has(key) || !innerDeepEqual(item1, item2, strict6, memos)) {
                if (strict6) return false;
                if (!mapMightHaveLoosePrimitive(map1, map2, key, item1, memos)) {
                    return false;
                }
                if (set === null) {
                    set = new Set();
                }
                set.add(key);
            }
        }
    }
    if (set !== null) {
        for (const { 0: key , 1: item  } of map2){
            if (typeof key === "object" && key !== null) {
                if (!mapHasEqualEntry(set, map1, key, item, strict6, memos)) {
                    return false;
                }
            } else if (!strict6 && (!map1.has(key) || !innerDeepEqual(map1.get(key), item, false, memos)) && !mapHasEqualEntry(set, map1, key, item, false, memos)) {
                return false;
            }
        }
        return set.size === 0;
    }
    return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict7, memos) {
    for (const key2 of set){
        if (innerDeepEqual(key1, key2, strict7, memos) && innerDeepEqual(item1, map.get(key2), strict7, memos)) {
            set.delete(key2);
            return true;
        }
    }
    return false;
}
const NumberIsSafeInteger = Number.isSafeInteger;
function isArray(value) {
    return Array.isArray(value);
}
function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}
function isNull(value) {
    return value === null;
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
function isSymbol(value) {
    return typeof value === "symbol";
}
function isUndefined(value) {
    return value === undefined;
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isError(e) {
    return e instanceof Error;
}
function isFunction(value) {
    return typeof value === "function";
}
function isRegExp2(value) {
    return __default1.isRegExp(value);
}
function isDate2(value) {
    return __default1.isDate(value);
}
function isPrimitive(value) {
    return value === null || typeof value !== "object" && typeof value !== "function";
}
function isBuffer(value) {
    return Buffer.isBuffer(value);
}
function _extend(target, source) {
    if (source === null || typeof source !== "object") return target;
    const keys = Object.keys(source);
    let i59 = keys.length;
    while(i59--){
        target[keys[i59]] = source[keys[i59]];
    }
    return target;
}
function getSystemErrorName(code10) {
    if (typeof code10 !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE("err", "number", code10);
    }
    if (code10 >= 0 || !NumberIsSafeInteger(code10)) {
        throw new codes.ERR_OUT_OF_RANGE("err", "a negative integer", code10);
    }
    return errorMap.get(code10)?.[0];
}
function inherits(ctor, superCtor) {
    if (ctor === undefined || ctor === null) {
        throw new codes.ERR_INVALID_ARG_TYPE("ctor", "Function", ctor);
    }
    if (superCtor === undefined || superCtor === null) {
        throw new codes.ERR_INVALID_ARG_TYPE("superCtor", "Function", superCtor);
    }
    if (superCtor.prototype === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("superCtor.prototype", "Object", superCtor.prototype);
    }
    Object.defineProperty(ctor, "super_", {
        value: superCtor,
        writable: true,
        configurable: true
    });
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
function pad(n) {
    return n.toString().padStart(2, "0");
}
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec", 
];
function timestamp() {
    const d = new Date();
    const t = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds()), 
    ].join(":");
    return `${d.getDate()} ${months[d.getMonth()]} ${t}`;
}
function log(...args) {
    console.log("%s - %s", timestamp(), format1(...args));
}
const __default4 = {
    format: format1,
    formatWithOptions,
    inspect,
    isArray,
    isBoolean,
    isNull,
    isNullOrUndefined,
    isNumber,
    isString,
    isSymbol,
    isUndefined,
    isObject,
    isError,
    isFunction,
    isRegExp: isRegExp2,
    isDate: isDate2,
    isPrimitive,
    isBuffer,
    _extend,
    getSystemErrorName,
    deprecate,
    callbackify,
    promisify,
    inherits,
    types: __default1,
    stripVTControlCharacters,
    TextDecoder: _TextDecoder,
    TextEncoder: _TextEncoder,
    log,
    debuglog,
    isDeepStrictEqual
};
const { errno: { ENOTDIR , ENOENT  } ,  } = os;
const kIsNodeError = Symbol("kIsNodeError");
const classRegExp1 = /^([A-Z][a-z0-9]*)+$/;
const kTypes = [
    "string",
    "function",
    "number",
    "object",
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol", 
];
class AbortError extends Error {
    code;
    constructor(){
        super("The operation was aborted");
        this.code = "ABORT_ERR";
        this.name = "AbortError";
    }
}
function addNumericalSeparator(val) {
    let res = "";
    let i60 = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i60 >= start + 4; i60 -= 3){
        res = `_${val.slice(i60 - 3, i60)}${res}`;
    }
    return `${val.slice(0, i60)}${res}`;
}
const captureLargerStackTrace = hideStackFrames(function captureLargerStackTrace(err) {
    Error.captureStackTrace(err);
    return err;
});
hideStackFrames(function uvExceptionWithHostPort(err, syscall, address, port) {
    const { 0: code11 , 1: uvmsg  } = uvErrmapGet(err) || uvUnmappedError;
    const message = `${syscall} ${code11}: ${uvmsg}`;
    let details = "";
    if (port && port > 0) {
        details = ` ${address}:${port}`;
    } else if (address) {
        details = ` ${address}`;
    }
    const ex = new Error(`${message}${details}`);
    ex.code = code11;
    ex.errno = err;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
        ex.port = port;
    }
    return captureLargerStackTrace(ex);
});
const errnoException = hideStackFrames(function errnoException(err, syscall, original) {
    const code12 = getSystemErrorName(err);
    const message = original ? `${syscall} ${code12} ${original}` : `${syscall} ${code12}`;
    const ex = new Error(message);
    ex.errno = err;
    ex.code = code12;
    ex.syscall = syscall;
    return captureLargerStackTrace(ex);
});
function uvErrmapGet(name22) {
    return errorMap.get(name22);
}
const uvUnmappedError = [
    "UNKNOWN",
    "unknown error"
];
const uvException = hideStackFrames(function uvException(ctx) {
    const { 0: code13 , 1: uvmsg  } = uvErrmapGet(ctx.errno) || uvUnmappedError;
    let message = `${code13}: ${ctx.message || uvmsg}, ${ctx.syscall}`;
    let path4;
    let dest;
    if (ctx.path) {
        path4 = ctx.path.toString();
        message += ` '${path4}'`;
    }
    if (ctx.dest) {
        dest = ctx.dest.toString();
        message += ` -> '${dest}'`;
    }
    const err = new Error(message);
    for (const prop of Object.keys(ctx)){
        if (prop === "message" || prop === "path" || prop === "dest") {
            continue;
        }
        err[prop] = ctx[prop];
    }
    err.code = code13;
    if (path4) {
        err.path = path4;
    }
    if (dest) {
        err.dest = dest;
    }
    return captureLargerStackTrace(err);
});
const exceptionWithHostPort = hideStackFrames(function exceptionWithHostPort(err, syscall, address, port, additional) {
    const code14 = getSystemErrorName(err);
    let details = "";
    if (port && port > 0) {
        details = ` ${address}:${port}`;
    } else if (address) {
        details = ` ${address}`;
    }
    if (additional) {
        details += ` - Local (${additional})`;
    }
    const ex = new Error(`${syscall} ${code14}${details}`);
    ex.errno = err;
    ex.code = code14;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
        ex.port = port;
    }
    return captureLargerStackTrace(ex);
});
const dnsException = hideStackFrames(function(code15, syscall, hostname2) {
    let errno;
    if (typeof code15 === "number") {
        errno = code15;
        if (code15 === codeMap.get("EAI_NODATA") || code15 === codeMap.get("EAI_NONAME")) {
            code15 = "ENOTFOUND";
        } else {
            code15 = getSystemErrorName(code15);
        }
    }
    const message = `${syscall} ${code15}${hostname2 ? ` ${hostname2}` : ""}`;
    const ex = new Error(message);
    ex.errno = errno;
    ex.code = code15;
    ex.syscall = syscall;
    if (hostname2) {
        ex.hostname = hostname2;
    }
    return captureLargerStackTrace(ex);
});
class NodeErrorAbstraction extends Error {
    code;
    constructor(name23, code16, message){
        super(message);
        this.code = code16;
        this.name = name23;
        this.stack = this.stack && `${name23} [${this.code}]${this.stack.slice(20)}`;
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
}
class NodeError extends NodeErrorAbstraction {
    constructor(code17, message){
        super(Error.prototype.name, code17, message);
    }
}
class NodeRangeError extends NodeErrorAbstraction {
    constructor(code18, message){
        super(RangeError.prototype.name, code18, message);
        Object.setPrototypeOf(this, RangeError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeTypeError extends NodeErrorAbstraction {
    constructor(code19, message){
        super(TypeError.prototype.name, code19, message);
        Object.setPrototypeOf(this, TypeError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeURIError extends NodeErrorAbstraction {
    constructor(code20, message){
        super(URIError.prototype.name, code20, message);
        Object.setPrototypeOf(this, URIError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeSystemError extends NodeErrorAbstraction {
    constructor(key, context, msgPrefix){
        let message = `${msgPrefix}: ${context.syscall} returned ` + `${context.code} (${context.message})`;
        if (context.path !== undefined) {
            message += ` ${context.path}`;
        }
        if (context.dest !== undefined) {
            message += ` => ${context.dest}`;
        }
        super("SystemError", key, message);
        captureLargerStackTrace(this);
        Object.defineProperties(this, {
            [kIsNodeError]: {
                value: true,
                enumerable: false,
                writable: false,
                configurable: true
            },
            info: {
                value: context,
                enumerable: true,
                configurable: true,
                writable: false
            },
            errno: {
                get () {
                    return context.errno;
                },
                set: (value)=>{
                    context.errno = value;
                },
                enumerable: true,
                configurable: true
            },
            syscall: {
                get () {
                    return context.syscall;
                },
                set: (value)=>{
                    context.syscall = value;
                },
                enumerable: true,
                configurable: true
            }
        });
        if (context.path !== undefined) {
            Object.defineProperty(this, "path", {
                get () {
                    return context.path;
                },
                set: (value)=>{
                    context.path = value;
                },
                enumerable: true,
                configurable: true
            });
        }
        if (context.dest !== undefined) {
            Object.defineProperty(this, "dest", {
                get () {
                    return context.dest;
                },
                set: (value)=>{
                    context.dest = value;
                },
                enumerable: true,
                configurable: true
            });
        }
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
}
function makeSystemErrorWithCode(key, msgPrfix) {
    return class NodeError extends NodeSystemError {
        constructor(ctx){
            super(key, ctx, msgPrfix);
        }
    };
}
const ERR_FS_EISDIR = makeSystemErrorWithCode("ERR_FS_EISDIR", "Path is a directory");
function createInvalidArgType(name24, expected) {
    expected = Array.isArray(expected) ? expected : [
        expected
    ];
    let msg = "The ";
    if (name24.endsWith(" argument")) {
        msg += `${name24} `;
    } else {
        const type10 = name24.includes(".") ? "property" : "argument";
        msg += `"${name24}" ${type10} `;
    }
    msg += "must be ";
    const types = [];
    const instances = [];
    const other = [];
    for (const value of expected){
        if (kTypes.includes(value)) {
            types.push(value.toLocaleLowerCase());
        } else if (classRegExp1.test(value)) {
            instances.push(value);
        } else {
            other.push(value);
        }
    }
    if (instances.length > 0) {
        const pos = types.indexOf("object");
        if (pos !== -1) {
            types.splice(pos, 1);
            instances.push("Object");
        }
    }
    if (types.length > 0) {
        if (types.length > 2) {
            const last = types.pop();
            msg += `one of type ${types.join(", ")}, or ${last}`;
        } else if (types.length === 2) {
            msg += `one of type ${types[0]} or ${types[1]}`;
        } else {
            msg += `of type ${types[0]}`;
        }
        if (instances.length > 0 || other.length > 0) {
            msg += " or ";
        }
    }
    if (instances.length > 0) {
        if (instances.length > 2) {
            const last = instances.pop();
            msg += `an instance of ${instances.join(", ")}, or ${last}`;
        } else {
            msg += `an instance of ${instances[0]}`;
            if (instances.length === 2) {
                msg += ` or ${instances[1]}`;
            }
        }
        if (other.length > 0) {
            msg += " or ";
        }
    }
    if (other.length > 0) {
        if (other.length > 2) {
            const last = other.pop();
            msg += `one of ${other.join(", ")}, or ${last}`;
        } else if (other.length === 2) {
            msg += `one of ${other[0]} or ${other[1]}`;
        } else {
            if (other[0].toLowerCase() !== other[0]) {
                msg += "an ";
            }
            msg += `${other[0]}`;
        }
    }
    return msg;
}
class ERR_INVALID_ARG_TYPE_RANGE extends NodeRangeError {
    constructor(name25, expected, actual){
        const msg = createInvalidArgType(name25, expected);
        super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
    }
}
class ERR_INVALID_ARG_TYPE extends NodeTypeError {
    constructor(name26, expected, actual){
        const msg = createInvalidArgType(name26, expected);
        super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
    }
    static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
}
class ERR_INVALID_ARG_VALUE_RANGE extends NodeRangeError {
    constructor(name27, value, reason = "is invalid"){
        const type11 = name27.includes(".") ? "property" : "argument";
        const inspected = inspect(value);
        super("ERR_INVALID_ARG_VALUE", `The ${type11} '${name27}' ${reason}. Received ${inspected}`);
    }
}
class ERR_INVALID_ARG_VALUE extends NodeTypeError {
    constructor(name28, value, reason = "is invalid"){
        const type12 = name28.includes(".") ? "property" : "argument";
        const inspected = inspect(value);
        super("ERR_INVALID_ARG_VALUE", `The ${type12} '${name28}' ${reason}. Received ${inspected}`);
    }
    static RangeError = ERR_INVALID_ARG_VALUE_RANGE;
}
function invalidArgTypeHelper(input) {
    if (input == null) {
        return ` Received ${input}`;
    }
    if (typeof input === "function" && input.name) {
        return ` Received function ${input.name}`;
    }
    if (typeof input === "object") {
        if (input.constructor && input.constructor.name) {
            return ` Received an instance of ${input.constructor.name}`;
        }
        return ` Received ${inspect(input, {
            depth: -1
        })}`;
    }
    let inspected = inspect(input, {
        colors: false
    });
    if (inspected.length > 25) {
        inspected = `${inspected.slice(0, 25)}...`;
    }
    return ` Received type ${typeof input} (${inspected})`;
}
class ERR_OUT_OF_RANGE extends RangeError {
    code = "ERR_OUT_OF_RANGE";
    constructor(str, range, input, replaceDefaultBoolean = false){
        assert1(range, 'Missing "range" argument');
        let msg = replaceDefaultBoolean ? str : `The value of "${str}" is out of range.`;
        let received;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
            received = String(input);
            if (input > 2n ** 32n || input < -(2n ** 32n)) {
                received = addNumericalSeparator(received);
            }
            received += "n";
        } else {
            received = inspect(input);
        }
        msg += ` It must be ${range}. Received ${received}`;
        super(msg);
        const { name: name29  } = this;
        this.name = `${name29} [${this.code}]`;
        this.stack;
        this.name = name29;
    }
}
class ERR_AMBIGUOUS_ARGUMENT extends NodeTypeError {
    constructor(x5, y5){
        super("ERR_AMBIGUOUS_ARGUMENT", `The "${x5}" argument is ambiguous. ${y5}`);
    }
}
class ERR_ASYNC_TYPE extends NodeTypeError {
    constructor(x6){
        super("ERR_ASYNC_TYPE", `Invalid name for async "type": ${x6}`);
    }
}
class ERR_BUFFER_OUT_OF_BOUNDS extends NodeRangeError {
    constructor(name30){
        super("ERR_BUFFER_OUT_OF_BOUNDS", name30 ? `"${name30}" is outside of buffer bounds` : "Attempt to access memory outside buffer bounds");
    }
}
class ERR_DNS_SET_SERVERS_FAILED extends NodeError {
    constructor(x7, y6){
        super("ERR_DNS_SET_SERVERS_FAILED", `c-ares failed to set servers: "${x7}" [${y6}]`);
    }
}
class ERR_FS_INVALID_SYMLINK_TYPE extends NodeError {
    constructor(x8){
        super("ERR_FS_INVALID_SYMLINK_TYPE", `Symlink type must be one of "dir", "file", or "junction". Received "${x8}"`);
    }
}
class ERR_HTTP_HEADERS_SENT extends NodeError {
    constructor(x9){
        super("ERR_HTTP_HEADERS_SENT", `Cannot ${x9} headers after they are sent to the client`);
    }
}
class ERR_HTTP_INVALID_HEADER_VALUE extends NodeTypeError {
    constructor(x10, y7){
        super("ERR_HTTP_INVALID_HEADER_VALUE", `Invalid value "${x10}" for header "${y7}"`);
    }
}
class ERR_HTTP_TRAILER_INVALID extends NodeError {
    constructor(){
        super("ERR_HTTP_TRAILER_INVALID", `Trailers are invalid with this transfer encoding`);
    }
}
class ERR_INVALID_ASYNC_ID extends NodeRangeError {
    constructor(x11, y8){
        super("ERR_INVALID_ASYNC_ID", `Invalid ${x11} value: ${y8}`);
    }
}
class ERR_INVALID_CALLBACK extends NodeTypeError {
    constructor(object){
        super("ERR_INVALID_CALLBACK", `Callback must be a function. Received ${inspect(object)}`);
    }
}
class ERR_INVALID_FILE_URL_HOST extends NodeTypeError {
    constructor(x12){
        super("ERR_INVALID_FILE_URL_HOST", `File URL host must be "localhost" or empty on ${x12}`);
    }
}
class ERR_INVALID_FILE_URL_PATH extends NodeTypeError {
    constructor(x13){
        super("ERR_INVALID_FILE_URL_PATH", `File URL path ${x13}`);
    }
}
class ERR_INVALID_HTTP_TOKEN extends NodeTypeError {
    constructor(x14, y9){
        super("ERR_INVALID_HTTP_TOKEN", `${x14} must be a valid HTTP token ["${y9}"]`);
    }
}
class ERR_INVALID_IP_ADDRESS extends NodeTypeError {
    constructor(x15){
        super("ERR_INVALID_IP_ADDRESS", `Invalid IP address: ${x15}`);
    }
}
class ERR_INVALID_OPT_VALUE_ENCODING extends NodeTypeError {
    constructor(x16){
        super("ERR_INVALID_OPT_VALUE_ENCODING", `The value "${x16}" is invalid for option "encoding"`);
    }
}
class ERR_INVALID_URI extends NodeURIError {
    constructor(){
        super("ERR_INVALID_URI", `URI malformed`);
    }
}
class ERR_IPC_CHANNEL_CLOSED extends NodeError {
    constructor(){
        super("ERR_IPC_CHANNEL_CLOSED", `Channel closed`);
    }
}
class ERR_METHOD_NOT_IMPLEMENTED extends NodeError {
    constructor(x17){
        super("ERR_METHOD_NOT_IMPLEMENTED", `The ${x17} method is not implemented`);
    }
}
class ERR_MISSING_ARGS extends NodeTypeError {
    constructor(...args){
        let msg = "The ";
        const len = args.length;
        const wrap1 = (a)=>`"${a}"`
        ;
        args = args.map((a)=>Array.isArray(a) ? a.map(wrap1).join(" or ") : wrap1(a)
        );
        switch(len){
            case 1:
                msg += `${args[0]} argument`;
                break;
            case 2:
                msg += `${args[0]} and ${args[1]} arguments`;
                break;
            default:
                msg += args.slice(0, len - 1).join(", ");
                msg += `, and ${args[len - 1]} arguments`;
                break;
        }
        super("ERR_MISSING_ARGS", `${msg} must be specified`);
    }
}
class ERR_MULTIPLE_CALLBACK extends NodeError {
    constructor(){
        super("ERR_MULTIPLE_CALLBACK", `Callback called multiple times`);
    }
}
class ERR_SERVER_NOT_RUNNING extends NodeError {
    constructor(){
        super("ERR_SERVER_NOT_RUNNING", `Server is not running.`);
    }
}
class ERR_SOCKET_BAD_PORT extends NodeRangeError {
    constructor(name31, port, allowZero = true){
        assert1(typeof allowZero === "boolean", "The 'allowZero' argument must be of type boolean.");
        const operator = allowZero ? ">=" : ">";
        super("ERR_SOCKET_BAD_PORT", `${name31} should be ${operator} 0 and < 65536. Received ${port}.`);
    }
}
class ERR_SOCKET_CLOSED extends NodeError {
    constructor(){
        super("ERR_SOCKET_CLOSED", `Socket is closed`);
    }
}
class ERR_STREAM_ALREADY_FINISHED extends NodeError {
    constructor(x18){
        super("ERR_STREAM_ALREADY_FINISHED", `Cannot call ${x18} after a stream was finished`);
    }
}
class ERR_STREAM_CANNOT_PIPE extends NodeError {
    constructor(){
        super("ERR_STREAM_CANNOT_PIPE", `Cannot pipe, not readable`);
    }
}
class ERR_STREAM_DESTROYED extends NodeError {
    constructor(x19){
        super("ERR_STREAM_DESTROYED", `Cannot call ${x19} after a stream was destroyed`);
    }
}
class ERR_STREAM_NULL_VALUES extends NodeTypeError {
    constructor(){
        super("ERR_STREAM_NULL_VALUES", `May not write null values to stream`);
    }
}
class ERR_STREAM_PREMATURE_CLOSE extends NodeError {
    constructor(){
        super("ERR_STREAM_PREMATURE_CLOSE", `Premature close`);
    }
}
class ERR_STREAM_PUSH_AFTER_EOF extends NodeError {
    constructor(){
        super("ERR_STREAM_PUSH_AFTER_EOF", `stream.push() after EOF`);
    }
}
class ERR_STREAM_UNSHIFT_AFTER_END_EVENT extends NodeError {
    constructor(){
        super("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", `stream.unshift() after end event`);
    }
}
class ERR_STREAM_WRITE_AFTER_END extends NodeError {
    constructor(){
        super("ERR_STREAM_WRITE_AFTER_END", `write after end`);
    }
}
class ERR_UNHANDLED_ERROR extends NodeError {
    constructor(x20){
        super("ERR_UNHANDLED_ERROR", `Unhandled error. (${x20})`);
    }
}
class ERR_UNKNOWN_ENCODING extends NodeTypeError {
    constructor(x21){
        super("ERR_UNKNOWN_ENCODING", `Unknown encoding: ${x21}`);
    }
}
class ERR_UNKNOWN_SIGNAL extends NodeTypeError {
    constructor(x22){
        super("ERR_UNKNOWN_SIGNAL", `Unknown signal: ${x22}`);
    }
}
class ERR_INVALID_ADDRESS_FAMILY extends NodeRangeError {
    host;
    port;
    constructor(addressType, host, port){
        super("ERR_INVALID_ADDRESS_FAMILY", `Invalid address family: ${addressType} ${host}:${port}`);
        this.host = host;
        this.port = port;
    }
}
class ERR_INVALID_CHAR extends NodeTypeError {
    constructor(name32, field){
        super("ERR_INVALID_CHAR", field ? `Invalid character in ${name32}` : `Invalid character in ${name32} ["${field}"]`);
    }
}
function buildReturnPropertyType(value) {
    if (value && value.constructor && value.constructor.name) {
        return `instance of ${value.constructor.name}`;
    } else {
        return `type ${typeof value}`;
    }
}
class ERR_INVALID_RETURN_VALUE extends NodeTypeError {
    constructor(input, name33, value){
        super("ERR_INVALID_RETURN_VALUE", `Expected ${input} to be returned from the "${name33}" function but got ${buildReturnPropertyType(value)}.`);
    }
}
class ERR_INVALID_URL_SCHEME extends NodeTypeError {
    constructor(expected){
        expected = Array.isArray(expected) ? expected : [
            expected
        ];
        const res = expected.length === 2 ? `one of scheme ${expected[0]} or ${expected[1]}` : `of scheme ${expected[0]}`;
        super("ERR_INVALID_URL_SCHEME", `The URL must be ${res}`);
    }
}
class ERR_INTERNAL_ASSERTION extends NodeError {
    constructor(message){
        const suffix = "This is caused by either a bug in Node.js " + "or incorrect usage of Node.js internals.\n" + "Please open an issue with this stack trace at " + "https://github.com/nodejs/node/issues\n";
        super("ERR_INTERNAL_ASSERTION", message === undefined ? suffix : `${message}\n${suffix}`);
    }
}
class ERR_FS_RMDIR_ENOTDIR extends NodeSystemError {
    constructor(path5){
        const code21 = isWindows ? "ENOENT" : "ENOTDIR";
        const ctx = {
            message: "not a directory",
            path: path5,
            syscall: "rmdir",
            code: code21,
            errno: isWindows ? ENOENT : ENOTDIR
        };
        super(code21, ctx, "Path is not a directory");
    }
}
function denoErrorToNodeError(e, ctx) {
    const errno = extractOsErrorNumberFromErrorMessage(e);
    if (typeof errno === "undefined") {
        return e;
    }
    const ex = uvException({
        errno: mapSysErrnoToUvErrno(errno),
        ...ctx
    });
    return ex;
}
function extractOsErrorNumberFromErrorMessage(e) {
    const match1 = e instanceof Error ? e.message.match(/\(os error (\d+)\)/) : false;
    if (match1) {
        return +match1[1];
    }
    return undefined;
}
function connResetException(msg) {
    const ex = new Error(msg);
    ex.code = "ECONNRESET";
    return ex;
}
function aggregateTwoErrors(innerError, outerError) {
    if (innerError && outerError && innerError !== outerError) {
        if (Array.isArray(outerError.errors)) {
            outerError.errors.push(innerError);
            return outerError;
        }
        const err = new AggregateError([
            outerError,
            innerError, 
        ], outerError.message);
        err.code = outerError.code;
        return err;
    }
    return innerError || outerError;
}
codes.ERR_IPC_CHANNEL_CLOSED = ERR_IPC_CHANNEL_CLOSED;
codes.ERR_INVALID_ARG_TYPE = ERR_INVALID_ARG_TYPE;
codes.ERR_INVALID_ARG_VALUE = ERR_INVALID_ARG_VALUE;
codes.ERR_INVALID_CALLBACK = ERR_INVALID_CALLBACK;
codes.ERR_OUT_OF_RANGE = ERR_OUT_OF_RANGE;
codes.ERR_SOCKET_BAD_PORT = ERR_SOCKET_BAD_PORT;
codes.ERR_BUFFER_OUT_OF_BOUNDS = ERR_BUFFER_OUT_OF_BOUNDS;
codes.ERR_UNKNOWN_ENCODING = ERR_UNKNOWN_ENCODING;
const genericNodeError = hideStackFrames(function genericNodeError(message, errorProperties) {
    const err = new Error(message);
    Object.assign(err, errorProperties);
    return err;
});
"use strict";
const kRejection = Symbol.for("nodejs.rejection");
const kCapture = Symbol("kCapture");
const kErrorMonitor = Symbol("events.errorMonitor");
const kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners");
const kMaxEventTargetListenersWarned = Symbol("events.maxEventTargetListenersWarned");
function EventEmitter(opts) {
    EventEmitter.init.call(this, opts);
}
EventEmitter.on = on;
EventEmitter.once = once1;
EventEmitter.getEventListeners = getEventListeners;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.captureRejectionSymbol = kRejection;
EventEmitter.captureRejectionSymbol;
EventEmitter.errorMonitor;
Object.defineProperty(EventEmitter, "captureRejections", {
    get () {
        return EventEmitter.prototype[kCapture];
    },
    set (value) {
        validateBoolean(value, "EventEmitter.captureRejections");
        EventEmitter.prototype[kCapture] = value;
    },
    enumerable: true
});
EventEmitter.errorMonitor = kErrorMonitor;
Object.defineProperty(EventEmitter.prototype, kCapture, {
    value: false,
    writable: true,
    enumerable: false
});
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
let defaultMaxListeners = 10;
function checkListener(listener) {
    validateFunction(listener, "listener");
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
            throw new ERR_OUT_OF_RANGE("defaultMaxListeners", "a non-negative number", arg);
        }
        defaultMaxListeners = arg;
    }
});
Object.defineProperties(EventEmitter, {
    kMaxEventTargetListeners: {
        value: kMaxEventTargetListeners,
        enumerable: false,
        configurable: false,
        writable: false
    },
    kMaxEventTargetListenersWarned: {
        value: kMaxEventTargetListenersWarned,
        enumerable: false,
        configurable: false,
        writable: false
    }
});
EventEmitter.setMaxListeners = function(n = defaultMaxListeners, ...eventTargets) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
        throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
    }
    if (eventTargets.length === 0) {
        defaultMaxListeners = n;
    } else {
        for(let i61 = 0; i61 < eventTargets.length; i61++){
            const target = eventTargets[i61];
            if (target instanceof EventTarget) {
                target[kMaxEventTargetListeners] = n;
                target[kMaxEventTargetListenersWarned] = false;
            } else if (typeof target.setMaxListeners === "function") {
                target.setMaxListeners(n);
            } else {
                throw new ERR_INVALID_ARG_TYPE("eventTargets", [
                    "EventEmitter",
                    "EventTarget"
                ], target);
            }
        }
    }
};
EventEmitter.init = function(opts) {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
    if (opts?.captureRejections) {
        validateBoolean(opts.captureRejections, "options.captureRejections");
        this[kCapture] = Boolean(opts.captureRejections);
    } else {
        this[kCapture] = EventEmitter.prototype[kCapture];
    }
};
function addCatch(that, promise, type13, args) {
    if (!that[kCapture]) {
        return;
    }
    try {
        const then = promise.then;
        if (typeof then === "function") {
            then.call(promise, undefined, function(err) {
                process.nextTick(emitUnhandledRejectionOrErr, that, err, type13, args);
            });
        }
    } catch (err) {
        that.emit("error", err);
    }
}
function emitUnhandledRejectionOrErr(ee2, err, type14, args) {
    if (typeof ee2[kRejection] === "function") {
        ee2[kRejection](err, type14, ...args);
    } else {
        const prev = ee2[kCapture];
        try {
            ee2[kCapture] = false;
            ee2.emit("error", err);
        } finally{
            ee2[kCapture] = prev;
        }
    }
}
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
        throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) {
        return EventEmitter.defaultMaxListeners;
    }
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type15, ...args) {
    let doError = type15 === "error";
    const events = this._events;
    if (events !== undefined) {
        if (doError && events[kErrorMonitor] !== undefined) {
            this.emit(kErrorMonitor, ...args);
        }
        doError = doError && events.error === undefined;
    } else if (!doError) {
        return false;
    }
    if (doError) {
        let er;
        if (args.length > 0) {
            er = args[0];
        }
        if (er instanceof Error) {
            try {
                const capture = {};
                Error.captureStackTrace(capture, EventEmitter.prototype.emit);
            } catch  {}
            throw er;
        }
        let stringifiedEr;
        try {
            stringifiedEr = inspect(er);
        } catch  {
            stringifiedEr = er;
        }
        const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
        err.context = er;
        throw err;
    }
    const handler = events[type15];
    if (handler === undefined) {
        return false;
    }
    if (typeof handler === "function") {
        const result = handler.apply(this, args);
        if (result !== undefined && result !== null) {
            addCatch(this, result, type15, args);
        }
    } else {
        const len = handler.length;
        const listeners = arrayClone(handler);
        for(let i62 = 0; i62 < len; ++i62){
            const result = listeners[i62].apply(this, args);
            if (result !== undefined && result !== null) {
                addCatch(this, result, type15, args);
            }
        }
    }
    return true;
};
function _addListener(target, type16, listener, prepend) {
    let m;
    let events;
    let existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        if (events.newListener !== undefined) {
            target.emit("newListener", type16, listener.listener ?? listener);
            events = target._events;
        }
        existing = events[type16];
    }
    if (existing === undefined) {
        events[type16] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") {
            existing = events[type16] = prepend ? [
                listener,
                existing
            ] : [
                existing,
                listener
            ];
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            const w6 = new Error("Possible EventEmitter memory leak detected. " + `${existing.length} ${String(type16)} listeners ` + `added to ${inspect(target, {
                depth: -1
            })}. Use ` + "emitter.setMaxListeners() to increase limit");
            w6.name = "MaxListenersExceededWarning";
            w6.emitter = target;
            w6.type = type16;
            w6.count = existing.length;
            process.emitWarning(w6);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type17, listener) {
    return _addListener(this, type17, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type18, listener) {
    return _addListener(this, type18, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) {
            return this.listener.call(this.target);
        }
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type19, listener) {
    const state = {
        fired: false,
        wrapFn: undefined,
        target,
        type: type19,
        listener
    };
    const wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type20, listener) {
    checkListener(listener);
    this.on(type20, _onceWrap(this, type20, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type21, listener) {
    checkListener(listener);
    this.prependListener(type21, _onceWrap(this, type21, listener));
    return this;
};
EventEmitter.prototype.removeListener = function removeListener(type22, listener) {
    checkListener(listener);
    const events = this._events;
    if (events === undefined) {
        return this;
    }
    const list = events[type22];
    if (list === undefined) {
        return this;
    }
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) {
            this._events = Object.create(null);
        } else {
            delete events[type22];
            if (events.removeListener) {
                this.emit("removeListener", type22, list.listener || listener);
            }
        }
    } else if (typeof list !== "function") {
        let position = -1;
        for(let i63 = list.length - 1; i63 >= 0; i63--){
            if (list[i63] === listener || list[i63].listener === listener) {
                position = i63;
                break;
            }
        }
        if (position < 0) {
            return this;
        }
        if (position === 0) {
            list.shift();
        } else {
            spliceOne(list, position);
        }
        if (list.length === 1) {
            events[type22] = list[0];
        }
        if (events.removeListener !== undefined) {
            this.emit("removeListener", type22, listener);
        }
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type23) {
    const events = this._events;
    if (events === undefined) {
        return this;
    }
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type23] !== undefined) {
            if (--this._eventsCount === 0) {
                this._events = Object.create(null);
            } else {
                delete events[type23];
            }
        }
        return this;
    }
    if (arguments.length === 0) {
        for (const key of Reflect.ownKeys(events)){
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    const listeners = events[type23];
    if (typeof listeners === "function") {
        this.removeListener(type23, listeners);
    } else if (listeners !== undefined) {
        for(let i64 = listeners.length - 1; i64 >= 0; i64--){
            this.removeListener(type23, listeners[i64]);
        }
    }
    return this;
};
function _listeners(target, type24, unwrap) {
    const events = target._events;
    if (events === undefined) {
        return [];
    }
    const evlistener = events[type24];
    if (evlistener === undefined) {
        return [];
    }
    if (typeof evlistener === "function") {
        return unwrap ? [
            evlistener.listener || evlistener
        ] : [
            evlistener
        ];
    }
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener);
}
EventEmitter.prototype.listeners = function listeners(type25) {
    return _listeners(this, type25, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type26) {
    return _listeners(this, type26, false);
};
EventEmitter.listenerCount = function(emitter, type27) {
    if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type27);
    }
    return listenerCount.call(emitter, type27);
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type28) {
    const events = this._events;
    if (events !== undefined) {
        const evlistener = events[type28];
        if (typeof evlistener === "function") {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function arrayClone(arr) {
    switch(arr.length){
        case 2:
            return [
                arr[0],
                arr[1]
            ];
        case 3:
            return [
                arr[0],
                arr[1],
                arr[2]
            ];
        case 4:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3]
            ];
        case 5:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3],
                arr[4]
            ];
        case 6:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3],
                arr[4],
                arr[5]
            ];
    }
    return arr.slice();
}
function unwrapListeners(arr) {
    const ret = arrayClone(arr);
    for(let i65 = 0; i65 < ret.length; ++i65){
        const orig = ret[i65].listener;
        if (typeof orig === "function") {
            ret[i65] = orig;
        }
    }
    return ret;
}
function getEventListeners(emitterOrTarget, type29) {
    if (typeof emitterOrTarget.listeners === "function") {
        return emitterOrTarget.listeners(type29);
    }
    if (emitterOrTarget instanceof EventTarget) {
        const root = emitterOrTarget[kEvents].get(type29);
        const listeners = [];
        let handler = root?.next;
        while(handler?.listener !== undefined){
            const listener = handler.listener?.deref ? handler.listener.deref() : handler.listener;
            listeners.push(listener);
            handler = handler.next;
        }
        return listeners;
    }
    throw new ERR_INVALID_ARG_TYPE("emitter", [
        "EventEmitter",
        "EventTarget"
    ], emitterOrTarget);
}
async function once1(emitter, name34, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal, "options.signal");
    if (signal?.aborted) {
        throw new AbortError();
    }
    return new Promise((resolve12, reject)=>{
        const errorListener = (err)=>{
            emitter.removeListener(name34, resolver2);
            if (signal != null) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
            }
            reject(err);
        };
        const resolver2 = (...args)=>{
            if (typeof emitter.removeListener === "function") {
                emitter.removeListener("error", errorListener);
            }
            if (signal != null) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
            }
            resolve12(args);
        };
        eventTargetAgnosticAddListener(emitter, name34, resolver2, {
            once: true
        });
        if (name34 !== "error" && typeof emitter.once === "function") {
            emitter.once("error", errorListener);
        }
        function abortListener() {
            eventTargetAgnosticRemoveListener(emitter, name34, resolver2);
            eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
            reject(new AbortError());
        }
        if (signal != null) {
            eventTargetAgnosticAddListener(signal, "abort", abortListener, {
                once: true
            });
        }
    });
}
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function*() {}).prototype);
function createIterResult(value, done) {
    return {
        value,
        done
    };
}
function eventTargetAgnosticRemoveListener(emitter, name35, listener, flags) {
    if (typeof emitter.removeListener === "function") {
        emitter.removeListener(name35, listener);
    } else if (typeof emitter.removeEventListener === "function") {
        emitter.removeEventListener(name35, listener, flags);
    } else {
        throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
    }
}
function eventTargetAgnosticAddListener(emitter, name36, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags?.once) {
            emitter.once(name36, listener);
        } else {
            emitter.on(name36, listener);
        }
    } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name36, (arg)=>{
            listener(arg);
        }, flags);
    } else {
        throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
    }
}
function on(emitter, event, options) {
    const signal = options?.signal;
    validateAbortSignal(signal, "options.signal");
    if (signal?.aborted) {
        throw new AbortError();
    }
    const unconsumedEvents = [];
    const unconsumedPromises = [];
    let error4 = null;
    let finished1 = false;
    const iterator = Object.setPrototypeOf({
        next () {
            const value = unconsumedEvents.shift();
            if (value) {
                return Promise.resolve(createIterResult(value, false));
            }
            if (error4) {
                const p7 = Promise.reject(error4);
                error4 = null;
                return p7;
            }
            if (finished1) {
                return Promise.resolve(createIterResult(undefined, true));
            }
            return new Promise(function(resolve13, reject) {
                unconsumedPromises.push({
                    resolve: resolve13,
                    reject
                });
            });
        },
        return () {
            eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
            eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
            if (signal) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener, {
                    once: true
                });
            }
            finished1 = true;
            for (const promise of unconsumedPromises){
                promise.resolve(createIterResult(undefined, true));
            }
            return Promise.resolve(createIterResult(undefined, true));
        },
        throw (err) {
            if (!err || !(err instanceof Error)) {
                throw new ERR_INVALID_ARG_TYPE("EventEmitter.AsyncIterator", "Error", err);
            }
            error4 = err;
            eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
            eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    }, AsyncIteratorPrototype);
    eventTargetAgnosticAddListener(emitter, event, eventHandler);
    if (event !== "error" && typeof emitter.on === "function") {
        emitter.on("error", errorHandler);
    }
    if (signal) {
        eventTargetAgnosticAddListener(signal, "abort", abortListener, {
            once: true
        });
    }
    return iterator;
    function abortListener() {
        errorHandler(new AbortError());
    }
    function eventHandler(...args) {
        const promise = unconsumedPromises.shift();
        if (promise) {
            promise.resolve(createIterResult(args, false));
        } else {
            unconsumedEvents.push(args);
        }
    }
    function errorHandler(err) {
        finished1 = true;
        const toError = unconsumedPromises.shift();
        if (toError) {
            toError.reject(err);
        } else {
            error4 = err;
        }
        iterator.return();
    }
}
const { hasOwn  } = Object;
function get(obj, key) {
    if (hasOwn(obj, key)) {
        return obj[key];
    }
}
function getForce(obj, key) {
    const v7 = get(obj, key);
    assert1(v7 != null);
    return v7;
}
function isNumber1(x23) {
    if (typeof x23 === "number") return true;
    if (/^0x[0-9a-f]+$/i.test(String(x23))) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x23));
}
function hasKey(obj, keys) {
    let o = obj;
    keys.slice(0, -1).forEach((key)=>{
        o = get(o, key) ?? {};
    });
    const key1 = keys[keys.length - 1];
    return key1 in o;
}
function parse(args, { "--": doubleDash = false , alias: alias3 = {} , boolean: __boolean = false , default: defaults = {} , stopEarly =false , string =[] , unknown =(i66)=>i66
  } = {}) {
    const flags = {
        bools: {},
        strings: {},
        unknownFn: unknown,
        allBools: false
    };
    if (__boolean !== undefined) {
        if (typeof __boolean === "boolean") {
            flags.allBools = !!__boolean;
        } else {
            const booleanArgs = typeof __boolean === "string" ? [
                __boolean
            ] : __boolean;
            for (const key of booleanArgs.filter(Boolean)){
                flags.bools[key] = true;
            }
        }
    }
    const aliases = {};
    if (alias3 !== undefined) {
        for(const key in alias3){
            const val = getForce(alias3, key);
            if (typeof val === "string") {
                aliases[key] = [
                    val
                ];
            } else {
                aliases[key] = val;
            }
            for (const alias1 of getForce(aliases, key)){
                aliases[alias1] = [
                    key
                ].concat(aliases[key].filter((y10)=>alias1 !== y10
                ));
            }
        }
    }
    if (string !== undefined) {
        const stringArgs = typeof string === "string" ? [
            string
        ] : string;
        for (const key of stringArgs.filter(Boolean)){
            flags.strings[key] = true;
            const alias = get(aliases, key);
            if (alias) {
                for (const al of alias){
                    flags.strings[al] = true;
                }
            }
        }
    }
    const argv1 = {
        _: []
    };
    function argDefined(key, arg) {
        return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
    }
    function setKey(obj, keys, value) {
        let o = obj;
        keys.slice(0, -1).forEach(function(key) {
            if (get(o, key) === undefined) {
                o[key] = {};
            }
            o = get(o, key);
        });
        const key4 = keys[keys.length - 1];
        if (get(o, key4) === undefined || get(flags.bools, key4) || typeof get(o, key4) === "boolean") {
            o[key4] = value;
        } else if (Array.isArray(get(o, key4))) {
            o[key4].push(value);
        } else {
            o[key4] = [
                get(o, key4),
                value
            ];
        }
    }
    function setArg(key, val, arg = undefined) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg, key, val) === false) return;
        }
        const value = !get(flags.strings, key) && isNumber1(val) ? Number(val) : val;
        setKey(argv1, key.split("."), value);
        const alias = get(aliases, key);
        if (alias) {
            for (const x24 of alias){
                setKey(argv1, x24.split("."), value);
            }
        }
    }
    function aliasIsBoolean(key) {
        return getForce(aliases, key).some((x25)=>typeof get(flags.bools, x25) === "boolean"
        );
    }
    for (const key3 of Object.keys(flags.bools)){
        setArg(key3, defaults[key3] === undefined ? false : defaults[key3]);
    }
    let notFlags = [];
    if (args.includes("--")) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
    }
    for(let i67 = 0; i67 < args.length; i67++){
        const arg = args[i67];
        if (/^--.+=/.test(arg)) {
            const m = arg.match(/^--([^=]+)=(.*)$/s);
            assert1(m != null);
            const [, key, value] = m;
            if (flags.bools[key]) {
                const booleanValue = value !== "false";
                setArg(key, booleanValue, arg);
            } else {
                setArg(key, value, arg);
            }
        } else if (/^--no-.+/.test(arg)) {
            const m = arg.match(/^--no-(.+)/);
            assert1(m != null);
            setArg(m[1], false, arg);
        } else if (/^--.+/.test(arg)) {
            const m = arg.match(/^--(.+)/);
            assert1(m != null);
            const [, key] = m;
            const next = args[i67 + 1];
            if (next !== undefined && !/^-/.test(next) && !get(flags.bools, key) && !flags.allBools && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i67++;
            } else if (/^(true|false)$/.test(next)) {
                setArg(key, next === "true", arg);
                i67++;
            } else {
                setArg(key, get(flags.strings, key) ? "" : true, arg);
            }
        } else if (/^-[^-]+/.test(arg)) {
            const letters = arg.slice(1, -1).split("");
            let broken = false;
            for(let j8 = 0; j8 < letters.length; j8++){
                const next = arg.slice(j8 + 2);
                if (next === "-") {
                    setArg(letters[j8], next, arg);
                    continue;
                }
                if (/[A-Za-z]/.test(letters[j8]) && /=/.test(next)) {
                    setArg(letters[j8], next.split(/=(.+)/)[1], arg);
                    broken = true;
                    break;
                }
                if (/[A-Za-z]/.test(letters[j8]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j8], next, arg);
                    broken = true;
                    break;
                }
                if (letters[j8 + 1] && letters[j8 + 1].match(/\W/)) {
                    setArg(letters[j8], arg.slice(j8 + 2), arg);
                    broken = true;
                    break;
                } else {
                    setArg(letters[j8], get(flags.strings, letters[j8]) ? "" : true, arg);
                }
            }
            const [key] = arg.slice(-1);
            if (!broken && key !== "-") {
                if (args[i67 + 1] && !/^(-|--)[^-]/.test(args[i67 + 1]) && !get(flags.bools, key) && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i67 + 1], arg);
                    i67++;
                } else if (args[i67 + 1] && /^(true|false)$/.test(args[i67 + 1])) {
                    setArg(key, args[i67 + 1] === "true", arg);
                    i67++;
                } else {
                    setArg(key, get(flags.strings, key) ? "" : true, arg);
                }
            }
        } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv1._.push(flags.strings["_"] ?? !isNumber1(arg) ? arg : Number(arg));
            }
            if (stopEarly) {
                argv1._.push(...args.slice(i67 + 1));
                break;
            }
        }
    }
    for (const key2 of Object.keys(defaults)){
        if (!hasKey(argv1, key2.split("."))) {
            setKey(argv1, key2.split("."), defaults[key2]);
            if (aliases[key2]) {
                for (const x26 of aliases[key2]){
                    setKey(argv1, x26.split("."), defaults[key2]);
                }
            }
        }
    }
    if (doubleDash) {
        argv1["--"] = [];
        for (const key of notFlags){
            argv1["--"].push(key);
        }
    } else {
        for (const key of notFlags){
            argv1._.push(key);
        }
    }
    return argv1;
}
function getOptions() {
    const args = parse(Deno.args);
    const options = new Map(Object.entries(args).map(([key, value])=>[
            key,
            {
                value
            }
        ]
    ));
    return {
        options
    };
}
let optionsMap;
function getOptionsFromBinding() {
    if (!optionsMap) {
        ({ options: optionsMap  } = getOptions());
    }
    return optionsMap;
}
function getOptionValue(optionName) {
    const options = getOptionsFromBinding();
    if (optionName.startsWith("--no-")) {
        const option = options.get("--" + optionName.slice(5));
        return option && !option.value;
    }
    return options.get(optionName)?.value;
}
const CHAR_FORWARD_SLASH = 47;
function assertPath(path6) {
    if (typeof path6 !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path6)}`);
    }
}
function isPosixPathSeparator(code22) {
    return code22 === 47;
}
function isPathSeparator(code23) {
    return isPosixPathSeparator(code23) || code23 === 92;
}
function isWindowsDeviceRoot(code24) {
    return code24 >= 97 && code24 <= 122 || code24 >= 65 && code24 <= 90;
}
function normalizeString(path7, allowAboveRoot, separator, isPathSeparator1) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code25;
    for(let i68 = 0, len = path7.length; i68 <= len; ++i68){
        if (i68 < len) code25 = path7.charCodeAt(i68);
        else if (isPathSeparator1(code25)) break;
        else code25 = CHAR_FORWARD_SLASH;
        if (isPathSeparator1(code25)) {
            if (lastSlash === i68 - 1 || dots === 1) {} else if (lastSlash !== i68 - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i68;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i68;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path7.slice(lastSlash + 1, i68);
                else res = path7.slice(lastSlash + 1, i68);
                lastSegmentLength = i68 - lastSlash - 1;
            }
            lastSlash = i68;
            dots = 0;
        } else if (code25 === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep6, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base7 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base7;
    if (dir === pathObject.root) return dir + base7;
    return dir + sep6 + base7;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i69 = pathSegments.length - 1; i69 >= -1; i69--){
        let path8;
        const { Deno  } = globalThis;
        if (i69 >= 0) {
            path8 = pathSegments[i69];
        } else if (!resolvedDevice) {
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path8 = Deno.cwd();
        } else {
            if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path8 = Deno.cwd();
            if (path8 === undefined || path8.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path8 = `${resolvedDevice}\\`;
            }
        }
        assertPath(path8);
        const len = path8.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute1 = false;
        const code26 = path8.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code26)) {
                isAbsolute1 = true;
                if (isPathSeparator(path8.charCodeAt(1))) {
                    let j9 = 2;
                    let last = j9;
                    for(; j9 < len; ++j9){
                        if (isPathSeparator(path8.charCodeAt(j9))) break;
                    }
                    if (j9 < len && j9 !== last) {
                        const firstPart = path8.slice(last, j9);
                        last = j9;
                        for(; j9 < len; ++j9){
                            if (!isPathSeparator(path8.charCodeAt(j9))) break;
                        }
                        if (j9 < len && j9 !== last) {
                            last = j9;
                            for(; j9 < len; ++j9){
                                if (isPathSeparator(path8.charCodeAt(j9))) break;
                            }
                            if (j9 === len) {
                                device = `\\\\${firstPart}\\${path8.slice(last)}`;
                                rootEnd = j9;
                            } else if (j9 !== last) {
                                device = `\\\\${firstPart}\\${path8.slice(last, j9)}`;
                                rootEnd = j9;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code26)) {
                if (path8.charCodeAt(1) === 58) {
                    device = path8.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path8.charCodeAt(2))) {
                            isAbsolute1 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code26)) {
            rootEnd = 1;
            isAbsolute1 = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path8.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute1;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path9) {
    assertPath(path9);
    const len = path9.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute2 = false;
    const code27 = path9.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code27)) {
            isAbsolute2 = true;
            if (isPathSeparator(path9.charCodeAt(1))) {
                let j10 = 2;
                let last = j10;
                for(; j10 < len; ++j10){
                    if (isPathSeparator(path9.charCodeAt(j10))) break;
                }
                if (j10 < len && j10 !== last) {
                    const firstPart = path9.slice(last, j10);
                    last = j10;
                    for(; j10 < len; ++j10){
                        if (!isPathSeparator(path9.charCodeAt(j10))) break;
                    }
                    if (j10 < len && j10 !== last) {
                        last = j10;
                        for(; j10 < len; ++j10){
                            if (isPathSeparator(path9.charCodeAt(j10))) break;
                        }
                        if (j10 === len) {
                            return `\\\\${firstPart}\\${path9.slice(last)}\\`;
                        } else if (j10 !== last) {
                            device = `\\\\${firstPart}\\${path9.slice(last, j10)}`;
                            rootEnd = j10;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code27)) {
            if (path9.charCodeAt(1) === 58) {
                device = path9.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path9.charCodeAt(2))) {
                        isAbsolute2 = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code27)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path9.slice(rootEnd), !isAbsolute2, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute2) tail = ".";
    if (tail.length > 0 && isPathSeparator(path9.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute2) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute2) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path10) {
    assertPath(path10);
    const len = path10.length;
    if (len === 0) return false;
    const code28 = path10.charCodeAt(0);
    if (isPathSeparator(code28)) {
        return true;
    } else if (isWindowsDeviceRoot(code28)) {
        if (len > 2 && path10.charCodeAt(1) === 58) {
            if (isPathSeparator(path10.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join1(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i70 = 0; i70 < pathsCount; ++i70){
        const path11 = paths[i70];
        assertPath(path11);
        if (path11.length > 0) {
            if (joined === undefined) joined = firstPart = path11;
            else joined += `\\${path11}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert1(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i71 = 0;
    for(; i71 <= length; ++i71){
        if (i71 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i71) === 92) {
                    return toOrig.slice(toStart + i71 + 1);
                } else if (i71 === 2) {
                    return toOrig.slice(toStart + i71);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i71) === 92) {
                    lastCommonSep = i71;
                } else if (i71 === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i71);
        const toCode = to.charCodeAt(toStart + i71);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i71;
    }
    if (i71 !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i71 = fromStart + lastCommonSep + 1; i71 <= fromEnd; ++i71){
        if (i71 === fromEnd || from.charCodeAt(i71) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path12) {
    if (typeof path12 !== "string") return path12;
    if (path12.length === 0) return "";
    const resolvedPath = resolve(path12);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code29 = resolvedPath.charCodeAt(2);
                if (code29 !== 63 && code29 !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path12;
}
function dirname(path13) {
    assertPath(path13);
    const len = path13.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code30 = path13.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code30)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path13.charCodeAt(1))) {
                let j11 = 2;
                let last = j11;
                for(; j11 < len; ++j11){
                    if (isPathSeparator(path13.charCodeAt(j11))) break;
                }
                if (j11 < len && j11 !== last) {
                    last = j11;
                    for(; j11 < len; ++j11){
                        if (!isPathSeparator(path13.charCodeAt(j11))) break;
                    }
                    if (j11 < len && j11 !== last) {
                        last = j11;
                        for(; j11 < len; ++j11){
                            if (isPathSeparator(path13.charCodeAt(j11))) break;
                        }
                        if (j11 === len) {
                            return path13;
                        }
                        if (j11 !== last) {
                            rootEnd = offset = j11 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code30)) {
            if (path13.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path13.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code30)) {
        return path13;
    }
    for(let i72 = len - 1; i72 >= offset; --i72){
        if (isPathSeparator(path13.charCodeAt(i72))) {
            if (!matchedSlash) {
                end = i72;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path13.slice(0, end);
}
function basename(path14, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path14);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i73;
    if (path14.length >= 2) {
        const drive = path14.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path14.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path14.length) {
        if (ext.length === path14.length && ext === path14) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i73 = path14.length - 1; i73 >= start; --i73){
            const code31 = path14.charCodeAt(i73);
            if (isPathSeparator(code31)) {
                if (!matchedSlash) {
                    start = i73 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i73 + 1;
                }
                if (extIdx >= 0) {
                    if (code31 === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i73;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path14.length;
        return path14.slice(start, end);
    } else {
        for(i73 = path14.length - 1; i73 >= start; --i73){
            if (isPathSeparator(path14.charCodeAt(i73))) {
                if (!matchedSlash) {
                    start = i73 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i73 + 1;
            }
        }
        if (end === -1) return "";
        return path14.slice(start, end);
    }
}
function extname(path15) {
    assertPath(path15);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path15.length >= 2 && path15.charCodeAt(1) === 58 && isWindowsDeviceRoot(path15.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i74 = path15.length - 1; i74 >= start; --i74){
        const code32 = path15.charCodeAt(i74);
        if (isPathSeparator(code32)) {
            if (!matchedSlash) {
                startPart = i74 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i74 + 1;
        }
        if (code32 === 46) {
            if (startDot === -1) startDot = i74;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path15.slice(startDot, end);
}
function format2(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse1(path16) {
    assertPath(path16);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path16.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code33 = path16.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code33)) {
            rootEnd = 1;
            if (isPathSeparator(path16.charCodeAt(1))) {
                let j12 = 2;
                let last = j12;
                for(; j12 < len; ++j12){
                    if (isPathSeparator(path16.charCodeAt(j12))) break;
                }
                if (j12 < len && j12 !== last) {
                    last = j12;
                    for(; j12 < len; ++j12){
                        if (!isPathSeparator(path16.charCodeAt(j12))) break;
                    }
                    if (j12 < len && j12 !== last) {
                        last = j12;
                        for(; j12 < len; ++j12){
                            if (isPathSeparator(path16.charCodeAt(j12))) break;
                        }
                        if (j12 === len) {
                            rootEnd = j12;
                        } else if (j12 !== last) {
                            rootEnd = j12 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code33)) {
            if (path16.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path16.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path16;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path16;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code33)) {
        ret.root = ret.dir = path16;
        return ret;
    }
    if (rootEnd > 0) ret.root = path16.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i75 = path16.length - 1;
    let preDotState = 0;
    for(; i75 >= rootEnd; --i75){
        code33 = path16.charCodeAt(i75);
        if (isPathSeparator(code33)) {
            if (!matchedSlash) {
                startPart = i75 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i75 + 1;
        }
        if (code33 === 46) {
            if (startDot === -1) startDot = i75;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path16.slice(startPart, end);
        }
    } else {
        ret.name = path16.slice(startPart, startDot);
        ret.base = path16.slice(startPart, end);
        ret.ext = path16.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path16.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path17 = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path17 = `\\\\${url.hostname}${path17}`;
    }
    return path17;
}
function toFileUrl(path18) {
    if (!isAbsolute(path18)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname3, pathname] = path18.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname3 != null && hostname3 != "localhost") {
        url.hostname = hostname3;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod7 = {
    sep: sep,
    delimiter: delimiter,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join1,
    relative: relative,
    toNamespacedPath: toNamespacedPath,
    dirname: dirname,
    basename: basename,
    extname: extname,
    format: format2,
    parse: parse1,
    fromFileUrl: fromFileUrl,
    toFileUrl: toFileUrl
};
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i76 = pathSegments.length - 1; i76 >= -1 && !resolvedAbsolute; i76--){
        let path19;
        if (i76 >= 0) path19 = pathSegments[i76];
        else {
            const { Deno  } = globalThis;
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path19 = Deno.cwd();
        }
        assertPath(path19);
        if (path19.length === 0) {
            continue;
        }
        resolvedPath = `${path19}/${resolvedPath}`;
        resolvedAbsolute = path19.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path20) {
    assertPath(path20);
    if (path20.length === 0) return ".";
    const isAbsolute1 = path20.charCodeAt(0) === 47;
    const trailingSeparator = path20.charCodeAt(path20.length - 1) === 47;
    path20 = normalizeString(path20, !isAbsolute1, "/", isPosixPathSeparator);
    if (path20.length === 0 && !isAbsolute1) path20 = ".";
    if (path20.length > 0 && trailingSeparator) path20 += "/";
    if (isAbsolute1) return `/${path20}`;
    return path20;
}
function isAbsolute1(path21) {
    assertPath(path21);
    return path21.length > 0 && path21.charCodeAt(0) === 47;
}
function join2(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i77 = 0, len = paths.length; i77 < len; ++i77){
        const path22 = paths[i77];
        assertPath(path22);
        if (path22.length > 0) {
            if (!joined) joined = path22;
            else joined += `/${path22}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i78 = 0;
    for(; i78 <= length; ++i78){
        if (i78 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i78) === 47) {
                    return to.slice(toStart + i78 + 1);
                } else if (i78 === 0) {
                    return to.slice(toStart + i78);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i78) === 47) {
                    lastCommonSep = i78;
                } else if (i78 === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i78);
        const toCode = to.charCodeAt(toStart + i78);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i78;
    }
    let out = "";
    for(i78 = fromStart + lastCommonSep + 1; i78 <= fromEnd; ++i78){
        if (i78 === fromEnd || from.charCodeAt(i78) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path23) {
    return path23;
}
function dirname1(path24) {
    assertPath(path24);
    if (path24.length === 0) return ".";
    const hasRoot = path24.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i79 = path24.length - 1; i79 >= 1; --i79){
        if (path24.charCodeAt(i79) === 47) {
            if (!matchedSlash) {
                end = i79;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path24.slice(0, end);
}
function basename1(path25, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path25);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i80;
    if (ext !== undefined && ext.length > 0 && ext.length <= path25.length) {
        if (ext.length === path25.length && ext === path25) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i80 = path25.length - 1; i80 >= 0; --i80){
            const code34 = path25.charCodeAt(i80);
            if (code34 === 47) {
                if (!matchedSlash) {
                    start = i80 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i80 + 1;
                }
                if (extIdx >= 0) {
                    if (code34 === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i80;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path25.length;
        return path25.slice(start, end);
    } else {
        for(i80 = path25.length - 1; i80 >= 0; --i80){
            if (path25.charCodeAt(i80) === 47) {
                if (!matchedSlash) {
                    start = i80 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i80 + 1;
            }
        }
        if (end === -1) return "";
        return path25.slice(start, end);
    }
}
function extname1(path26) {
    assertPath(path26);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i81 = path26.length - 1; i81 >= 0; --i81){
        const code35 = path26.charCodeAt(i81);
        if (code35 === 47) {
            if (!matchedSlash) {
                startPart = i81 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i81 + 1;
        }
        if (code35 === 46) {
            if (startDot === -1) startDot = i81;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path26.slice(startDot, end);
}
function format3(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse2(path27) {
    assertPath(path27);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path27.length === 0) return ret;
    const isAbsolute2 = path27.charCodeAt(0) === 47;
    let start;
    if (isAbsolute2) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i82 = path27.length - 1;
    let preDotState = 0;
    for(; i82 >= start; --i82){
        const code36 = path27.charCodeAt(i82);
        if (code36 === 47) {
            if (!matchedSlash) {
                startPart = i82 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i82 + 1;
        }
        if (code36 === 46) {
            if (startDot === -1) startDot = i82;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute2) {
                ret.base = ret.name = path27.slice(1, end);
            } else {
                ret.base = ret.name = path27.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute2) {
            ret.name = path27.slice(1, startDot);
            ret.base = path27.slice(1, end);
        } else {
            ret.name = path27.slice(startPart, startDot);
            ret.base = path27.slice(startPart, end);
        }
        ret.ext = path27.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path27.slice(0, startPart - 1);
    else if (isAbsolute2) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path28) {
    if (!isAbsolute1(path28)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path28.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod8 = {
    sep: sep1,
    delimiter: delimiter1,
    resolve: resolve1,
    normalize: normalize1,
    isAbsolute: isAbsolute1,
    join: join2,
    relative: relative1,
    toNamespacedPath: toNamespacedPath1,
    dirname: dirname1,
    basename: basename1,
    extname: extname1,
    format: format3,
    parse: parse2,
    fromFileUrl: fromFileUrl1,
    toFileUrl: toFileUrl1
};
const path = isWindows ? mod7 : mod8;
const { join: join3 , normalize: normalize2  } = path;
const path1 = isWindows ? mod7 : mod8;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format4 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join4 , normalize: normalize3 , parse: parse3 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2 ,  } = path1;
function _arch() {
    if (Deno.build.arch == "x86_64") {
        return "x64";
    } else if (Deno.build.arch == "aarch64") {
        return "arm64";
    } else {
        throw Error("unreachable");
    }
}
const arch = _arch();
const chdir = Deno.chdir;
const cwd = Deno.cwd;
const nextTick1 = nextTick2;
const env = new Proxy({}, {
    get (_target, prop) {
        return Deno.env.get(String(prop));
    },
    ownKeys: ()=>Reflect.ownKeys(Deno.env.toObject())
    ,
    getOwnPropertyDescriptor: (_target, name37)=>{
        const e = Deno.env.toObject();
        if (name37 in Deno.env.toObject()) {
            const o = {
                enumerable: true,
                configurable: true
            };
            if (typeof name37 === "string") {
                o.value = e[name37];
            }
            return o;
        }
    },
    set (_target, prop, value) {
        Deno.env.set(String(prop), String(value));
        return value;
    }
});
const pid = Deno.pid;
const platform = isWindows ? "win32" : Deno.build.os;
const version = "v16.11.1";
const versions = {
    node: "16.11.1",
    uv: "1.42.0",
    zlib: "1.2.11",
    brotli: "1.0.9",
    ares: "1.17.2",
    modules: "93",
    nghttp2: "1.45.1",
    napi: "8",
    llhttp: "6.0.4",
    openssl: "1.1.1l",
    cldr: "39.0",
    icu: "69.1",
    tz: "2021a",
    unicode: "13.0",
    ...Deno.version
};
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
}
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function isServerResponse(stream) {
    return typeof stream._sent100 === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean" && typeof stream._removedTE === "boolean" && typeof stream._closed === "boolean";
}
function isReadable(stream) {
    return typeof stream.readable === "boolean" || typeof stream.readableEnded === "boolean" || !!stream._readableState;
}
function isWritable(stream) {
    return typeof stream.writable === "boolean" || typeof stream.writableEnded === "boolean" || !!stream._writableState;
}
function isWritableFinished(stream) {
    if (stream.writableFinished) return true;
    const wState = stream._writableState;
    if (!wState || wState.errored) return false;
    return wState.finished || wState.ended && wState.length === 0;
}
const nop = ()=>{};
function isReadableEnded(stream) {
    if (stream.readableEnded) return true;
    const rState = stream._readableState;
    if (!rState || rState.errored) return false;
    return rState.endEmitted || rState.ended && rState.length === 0;
}
function eos(stream, options, callback) {
    if (arguments.length === 2) {
        callback = options;
        options = {};
    } else if (options == null) {
        options = {};
    } else {
        validateObject(options, "options");
    }
    validateFunction(callback, "callback");
    validateAbortSignal(options.signal, "options.signal");
    callback = once(callback);
    const readable = options.readable || options.readable !== false && isReadable(stream);
    const writable = options.writable || options.writable !== false && isWritable(stream);
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    const onlegacyfinish = ()=>{
        if (!stream.writable) onfinish();
    };
    let willEmitClose = isServerResponse(stream) || state && state.autoDestroy && state.emitClose && state.closed === false && isReadable(stream) === readable && isWritable(stream) === writable;
    let writableFinished = stream.writableFinished || wState && wState.finished;
    const onfinish = ()=>{
        writableFinished = true;
        if (stream.destroyed) willEmitClose = false;
        if (willEmitClose && (!stream.readable || readable)) return;
        if (!readable || readableEnded) callback.call(stream);
    };
    let readableEnded = stream.readableEnded || rState && rState.endEmitted;
    const onend = ()=>{
        readableEnded = true;
        if (stream.destroyed) willEmitClose = false;
        if (willEmitClose && (!stream.writable || writable)) return;
        if (!writable || writableFinished) callback.call(stream);
    };
    const onerror = (err)=>{
        callback.call(stream, err);
    };
    const onclose = ()=>{
        if (readable && !readableEnded) {
            if (!isReadableEnded(stream)) {
                return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
            }
        }
        if (writable && !writableFinished) {
            if (!isWritableFinished(stream)) {
                return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
            }
        }
        callback.call(stream);
    };
    const onrequest = ()=>{
        stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
        stream.on("complete", onfinish);
        if (!willEmitClose) {
            stream.on("abort", onclose);
        }
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !wState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    if (!willEmitClose && typeof stream.aborted === "boolean") {
        stream.on("aborted", onclose);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (options.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    const closed = !wState && !rState && stream._closed === true || wState && wState.closed || rState && rState.closed || wState && wState.errorEmitted || rState && rState.errorEmitted || rState && stream.req && stream.aborted || (!wState || !willEmitClose || typeof wState.closed !== "boolean") && (!rState || !willEmitClose || typeof rState.closed !== "boolean") && (!writable || wState && wState.finished) && (!readable || rState && rState.endEmitted);
    if (closed) {
        nextTick2(()=>{
            callback();
        });
    }
    const cleanup = ()=>{
        callback = nop;
        stream.removeListener("aborted", onclose);
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
    if (options.signal && !closed) {
        const abort = ()=>{
            const endCallback = callback;
            cleanup();
            endCallback.call(stream, new AbortError());
        };
        if (options.signal.aborted) {
            nextTick2(abort);
        } else {
            const originalCallback = callback;
            callback = once((...args)=>{
                options.signal.removeEventListener("abort", abort);
                originalCallback.apply(stream, args);
            });
            options.signal.addEventListener("abort", abort);
        }
    }
    return cleanup;
}
const validateAbortSignal1 = (signal, name38)=>{
    if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new ERR_INVALID_ARG_TYPE(name38, "AbortSignal", signal);
    }
};
function isStream(obj) {
    return !!(obj && typeof obj.pipe === "function");
}
function addAbortSignal(signal, stream) {
    validateAbortSignal1(signal, "signal");
    if (!isStream(stream)) {
        throw new ERR_INVALID_ARG_TYPE("stream", "stream.Stream", stream);
    }
    return addAbortSignalNoValidate(signal, stream);
}
function addAbortSignalNoValidate(signal, stream) {
    if (typeof signal !== "object" || !("aborted" in signal)) {
        return stream;
    }
    const onAbort = ()=>{
        stream.destroy(new AbortError());
    };
    if (signal.aborted) {
        onAbort();
    } else {
        signal.addEventListener("abort", onAbort);
        eos(stream, ()=>signal.removeEventListener("abort", onAbort)
        );
    }
    return stream;
}
const kDestroy = Symbol("kDestroy");
const kConstruct = Symbol("kConstruct");
function checkError(err, w7, r) {
    if (err) {
        err.stack;
        if (w7 && !w7.errored) {
            w7.errored = err;
        }
        if (r && !r.errored) {
            r.errored = err;
        }
    }
}
function destroy2(err, cb) {
    const r = this._readableState;
    const w8 = this._writableState;
    const s = w8 || r;
    if (w8 && w8.destroyed || r && r.destroyed) {
        if (typeof cb === "function") {
            cb();
        }
        return this;
    }
    checkError(err, w8, r);
    if (w8) {
        w8.destroyed = true;
    }
    if (r) {
        r.destroyed = true;
    }
    if (!s.constructed) {
        this.once(kDestroy, function(er) {
            _destroy(this, aggregateTwoErrors(er, err), cb);
        });
    } else {
        _destroy(this, err, cb);
    }
    return this;
}
function _destroy(self, err1, cb) {
    let called = false;
    function onDestroy(err) {
        if (called) {
            return;
        }
        called = true;
        const r = self._readableState;
        const w9 = self._writableState;
        checkError(err, w9, r);
        if (w9) {
            w9.closed = true;
        }
        if (r) {
            r.closed = true;
        }
        if (typeof cb === "function") {
            cb(err);
        }
        if (err) {
            nextTick2(emitErrorCloseNT, self, err);
        } else {
            nextTick2(emitCloseNT, self);
        }
    }
    try {
        const result = self._destroy(err1 || null, onDestroy);
        if (result != null) {
            const then = result.then;
            if (typeof then === "function") {
                then.call(result, function() {
                    nextTick2(onDestroy, null);
                }, function(err) {
                    nextTick2(onDestroy, err);
                });
            }
        }
    } catch (err) {
        onDestroy(err);
    }
}
function emitErrorCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
function emitCloseNT(self) {
    const r = self._readableState;
    const w10 = self._writableState;
    if (w10) {
        w10.closeEmitted = true;
    }
    if (r) {
        r.closeEmitted = true;
    }
    if (w10 && w10.emitClose || r && r.emitClose) {
        self.emit("close");
    }
}
function emitErrorNT(self, err) {
    const r = self._readableState;
    const w11 = self._writableState;
    if (w11 && w11.errorEmitted || r && r.errorEmitted) {
        return;
    }
    if (w11) {
        w11.errorEmitted = true;
    }
    if (r) {
        r.errorEmitted = true;
    }
    self.emit("error", err);
}
function undestroy() {
    const r = this._readableState;
    const w12 = this._writableState;
    if (r) {
        r.constructed = true;
        r.closed = false;
        r.closeEmitted = false;
        r.destroyed = false;
        r.errored = null;
        r.errorEmitted = false;
        r.reading = false;
        r.ended = false;
        r.endEmitted = false;
    }
    if (w12) {
        w12.constructed = true;
        w12.destroyed = false;
        w12.closed = false;
        w12.closeEmitted = false;
        w12.errored = null;
        w12.errorEmitted = false;
        w12.ended = false;
        w12.ending = false;
        w12.finalCalled = false;
        w12.prefinished = false;
        w12.finished = false;
    }
}
function errorOrDestroy(stream, err, sync) {
    const r = stream._readableState;
    const w13 = stream._writableState;
    if (w13 && w13.destroyed || r && r.destroyed) {
        return this;
    }
    if (r && r.autoDestroy || w13 && w13.autoDestroy) {
        stream.destroy(err);
    } else if (err) {
        err.stack;
        if (w13 && !w13.errored) {
            w13.errored = err;
        }
        if (r && !r.errored) {
            r.errored = err;
        }
        if (sync) {
            nextTick2(emitErrorNT, stream, err);
        } else {
            emitErrorNT(stream, err);
        }
    }
}
function construct(stream, cb) {
    if (typeof stream._construct !== "function") {
        return;
    }
    const r = stream._readableState;
    const w14 = stream._writableState;
    if (r) {
        r.constructed = false;
    }
    if (w14) {
        w14.constructed = false;
    }
    stream.once(kConstruct, cb);
    if (stream.listenerCount(kConstruct) > 1) {
        return;
    }
    nextTick2(constructNT, stream);
}
function constructNT(stream) {
    let called = false;
    function onConstruct(err) {
        if (called) {
            errorOrDestroy(stream, err ?? new ERR_MULTIPLE_CALLBACK());
            return;
        }
        called = true;
        const r = stream._readableState;
        const w15 = stream._writableState;
        const s = w15 || r;
        if (r) {
            r.constructed = true;
        }
        if (w15) {
            w15.constructed = true;
        }
        if (s.destroyed) {
            stream.emit(kDestroy, err);
        } else if (err) {
            errorOrDestroy(stream, err, true);
        } else {
            nextTick2(emitConstructNT, stream);
        }
    }
    try {
        const result = stream._construct(onConstruct);
        if (result != null) {
            const then = result.then;
            if (typeof then === "function") {
                then.call(result, function() {
                    nextTick2(onConstruct, null);
                }, function(err) {
                    nextTick2(onConstruct, err);
                });
            }
        }
    } catch (err) {
        onConstruct(err);
    }
}
function emitConstructNT(stream) {
    stream.emit(kConstruct);
}
function isRequest1(stream) {
    return stream && stream.setHeader && typeof stream.abort === "function";
}
function destroyer(stream, err) {
    if (!stream) return;
    if (isRequest1(stream)) return stream.abort();
    if (isRequest1(stream.req)) return stream.req.abort();
    if (typeof stream.destroy === "function") return stream.destroy(err);
    if (typeof stream.close === "function") return stream.close();
}
const __default5 = {
    construct,
    destroyer,
    destroy: destroy2,
    undestroy,
    errorOrDestroy
};
const kIsDisturbed = Symbol("kIsDisturbed");
function isReadableNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!obj._writableState || obj._readableState?.readable !== false) && (!obj._writableState || obj._readableState));
}
function isWritableNodeStream(obj) {
    return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || obj._writableState?.writable !== false));
}
function isDuplexNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
}
function isNodeStream(obj) {
    return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
}
function isIterable(obj, isAsync) {
    if (obj == null) return false;
    if (isAsync === true) return typeof obj[Symbol.asyncIterator] === "function";
    if (isAsync === false) return typeof obj[Symbol.iterator] === "function";
    return typeof obj[Symbol.asyncIterator] === "function" || typeof obj[Symbol.iterator] === "function";
}
function isDestroyed(stream) {
    if (!isNodeStream(stream)) return null;
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    return !!(stream.destroyed || state?.destroyed);
}
function isWritableEnded(stream) {
    if (!isWritableNodeStream(stream)) return null;
    if (stream.writableEnded === true) return true;
    const wState = stream._writableState;
    if (wState?.errored) return false;
    if (typeof wState?.ended !== "boolean") return null;
    return wState.ended;
}
function isReadableEnded1(stream) {
    if (!isReadableNodeStream(stream)) return null;
    if (stream.readableEnded === true) return true;
    const rState = stream._readableState;
    if (!rState || rState.errored) return false;
    if (typeof rState?.ended !== "boolean") return null;
    return rState.ended;
}
function isReadableFinished(stream, strict8) {
    if (!isReadableNodeStream(stream)) return null;
    const rState = stream._readableState;
    if (rState?.errored) return false;
    if (typeof rState?.endEmitted !== "boolean") return null;
    return !!(rState.endEmitted || strict8 === false && rState.ended === true && rState.length === 0);
}
function isDisturbed(stream) {
    return !!(stream && (stream.readableDidRead || stream.readableAborted || stream[kIsDisturbed]));
}
function isReadable1(stream) {
    const r = isReadableNodeStream(stream);
    if (r === null || typeof stream?.readable !== "boolean") return null;
    if (isDestroyed(stream)) return false;
    return r && stream.readable && !isReadableFinished(stream);
}
function isWritable1(stream) {
    const r = isWritableNodeStream(stream);
    if (r === null || typeof stream?.writable !== "boolean") return null;
    if (isDestroyed(stream)) return false;
    return r && stream.writable && !isWritableEnded(stream);
}
const stdio = {};
function isBlob(object) {
    return object instanceof Blob;
}
function _from1(Readable1, iterable, opts) {
    let iterator;
    if (typeof iterable === "string" || iterable instanceof Buffer) {
        return new Readable1({
            objectMode: true,
            ...opts,
            read () {
                this.push(iterable);
                this.push(null);
            }
        });
    }
    let isAsync;
    if (iterable && iterable[Symbol.asyncIterator]) {
        isAsync = true;
        iterator = iterable[Symbol.asyncIterator]();
    } else if (iterable && iterable[Symbol.iterator]) {
        isAsync = false;
        iterator = iterable[Symbol.iterator]();
    } else {
        throw new ERR_INVALID_ARG_TYPE("iterable", [
            "Iterable"
        ], iterable);
    }
    const readable = new Readable1({
        objectMode: true,
        highWaterMark: 1,
        ...opts
    });
    let reading = false;
    readable._read = function() {
        if (!reading) {
            reading = true;
            next();
        }
    };
    readable._destroy = function(error5, cb) {
        close2(error5).then(()=>nextTick1(cb, error5)
        , (e)=>nextTick1(cb, e || error5)
        );
    };
    async function close2(error6) {
        const hadError = error6 !== undefined && error6 !== null;
        const hasThrow = typeof iterator.throw === "function";
        if (hadError && hasThrow) {
            const { value , done  } = await iterator.throw(error6);
            await value;
            if (done) {
                return;
            }
        }
        if (typeof iterator.return === "function") {
            const { value  } = await iterator.return();
            await value;
        }
    }
    async function next() {
        for(;;){
            try {
                const { value , done  } = isAsync ? await iterator.next() : iterator.next();
                if (done) {
                    readable.push(null);
                } else {
                    const res = value && typeof value.then === "function" ? await value : value;
                    if (res === null) {
                        reading = false;
                        throw new ERR_STREAM_NULL_VALUES();
                    } else if (readable.push(res)) {
                        continue;
                    } else {
                        reading = false;
                    }
                }
            } catch (err) {
                readable.destroy(err);
            }
            break;
        }
    }
    return readable;
}
function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getDefaultHighWaterMark(objectMode) {
    return objectMode ? 16 : 16 * 1024;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
    const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!Number.isInteger(hwm) || hwm < 0) {
            const name39 = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
            throw new ERR_INVALID_ARG_VALUE(name39, hwm);
        }
        return Math.floor(hwm);
    }
    return getDefaultHighWaterMark(state.objectMode);
}
function Stream(opts) {
    EventEmitter.call(this, opts);
}
Object.setPrototypeOf(Stream.prototype, EventEmitter.prototype);
Object.setPrototypeOf(Stream, EventEmitter);
Stream.prototype.pipe = function(dest, options) {
    const source = this;
    function ondata(chunk) {
        if (dest.writable && dest.write(chunk) === false && source.pause) {
            source.pause();
        }
    }
    source.on("data", ondata);
    function ondrain() {
        if (source.readable && source.resume) {
            source.resume();
        }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
    }
    let didOnEnd = false;
    function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
    }
    function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === "function") dest.destroy();
    }
    function onerror(er) {
        cleanup();
        if (EventEmitter.listenerCount(this, "error") === 0) {
            this.emit("error", er);
        }
    }
    prependListener(source, "error", onerror);
    prependListener(dest, "error", onerror);
    function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
};
function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") {
        return emitter.prependListener(event, fn);
    }
    if (!emitter._events || !emitter._events[event]) {
        emitter.on(event, fn);
    } else if (Array.isArray(emitter._events[event])) {
        emitter._events[event].unshift(fn);
    } else {
        emitter._events[event] = [
            fn,
            emitter._events[event]
        ];
    }
}
var NotImplemented;
(function(NotImplemented1) {
    NotImplemented1[NotImplemented1["ascii"] = 0] = "ascii";
    NotImplemented1[NotImplemented1["latin1"] = 1] = "latin1";
    NotImplemented1[NotImplemented1["utf16le"] = 2] = "utf16le";
})(NotImplemented || (NotImplemented = {}));
function normalizeEncoding2(enc) {
    const encoding = normalizeEncoding(enc ?? null);
    if (encoding && encoding in NotImplemented) notImplemented(encoding);
    if (!encoding && typeof enc === "string" && enc.toLowerCase() !== "raw") {
        throw new Error(`Unknown encoding: ${enc}`);
    }
    return String(encoding);
}
function utf8CheckByte(__byte) {
    if (__byte <= 0x7f) return 0;
    else if (__byte >> 5 === 0x06) return 2;
    else if (__byte >> 4 === 0x0e) return 3;
    else if (__byte >> 3 === 0x1e) return 4;
    return __byte >> 6 === 0x02 ? -1 : -2;
}
function utf8CheckIncomplete(self, buf, i83) {
    let j13 = buf.length - 1;
    if (j13 < i83) return 0;
    let nb = utf8CheckByte(buf[j13]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j13 < i83 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j13]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j13 < i83 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j13]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
function utf8CheckExtraBytes(self, buf) {
    if ((buf[0] & 0xc0) !== 0x80) {
        self.lastNeed = 0;
        return "\ufffd";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xc0) !== 0x80) {
            self.lastNeed = 1;
            return "\ufffd";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xc0) !== 0x80) {
                self.lastNeed = 2;
                return "\ufffd";
            }
        }
    }
}
function utf8FillLastComplete(buf) {
    const p8 = this.lastTotal - this.lastNeed;
    const r = utf8CheckExtraBytes(this, buf);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p8, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p8, 0, buf.length);
    this.lastNeed -= buf.length;
}
function utf8FillLastIncomplete(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
}
function utf8Text(buf, i84) {
    const total = utf8CheckIncomplete(this, buf, i84);
    if (!this.lastNeed) return buf.toString("utf8", i84);
    this.lastTotal = total;
    const end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i84, end);
}
function utf8End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "\ufffd";
    return r;
}
function utf8Write(buf) {
    if (typeof buf === "string") {
        return buf;
    }
    if (buf.length === 0) return "";
    let r;
    let i85;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return "";
        i85 = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i85 = 0;
    }
    if (i85 < buf.length) return r ? r + this.text(buf, i85) : this.text(buf, i85);
    return r || "";
}
function base64Text(buf, i86) {
    const n = (buf.length - i86) % 3;
    if (n === 0) return buf.toString("base64", i86);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i86, buf.length - n);
}
function base64End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    }
    return r;
}
function simpleWrite(buf) {
    if (typeof buf === "string") {
        return buf;
    }
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
}
class StringDecoderBase {
    lastChar;
    lastNeed;
    lastTotal;
    constructor(encoding, nb){
        this.encoding = encoding;
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer.allocUnsafe(nb);
    }
    encoding;
}
class Base64Decoder extends StringDecoderBase {
    end = base64End;
    fillLast = utf8FillLastIncomplete;
    text = base64Text;
    write = utf8Write;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 3);
    }
}
class GenericDecoder extends StringDecoderBase {
    end = simpleEnd;
    fillLast = undefined;
    text = utf8Text;
    write = simpleWrite;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 4);
    }
}
class Utf8Decoder extends StringDecoderBase {
    end = utf8End;
    fillLast = utf8FillLastComplete;
    text = utf8Text;
    write = utf8Write;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 4);
    }
}
class StringDecoder {
    encoding;
    end;
    fillLast;
    lastChar;
    lastNeed;
    lastTotal;
    text;
    write;
    constructor(encoding){
        let decoder;
        switch(encoding){
            case "utf8":
                decoder = new Utf8Decoder(encoding);
                break;
            case "base64":
                decoder = new Base64Decoder(encoding);
                break;
            default:
                decoder = new GenericDecoder(encoding);
        }
        this.encoding = decoder.encoding;
        this.end = decoder.end;
        this.fillLast = decoder.fillLast;
        this.lastChar = decoder.lastChar;
        this.lastNeed = decoder.lastNeed;
        this.lastTotal = decoder.lastTotal;
        this.text = decoder.text;
        this.write = decoder.write;
    }
}
new Proxy(StringDecoder, {
    apply (_target, thisArg, args) {
        return Object.assign(thisArg, new StringDecoder(...args));
    }
});
class BufferList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(v8) {
        const entry = {
            data: v8,
            next: null
        };
        if (this.length > 0) {
            this.tail.next = entry;
        } else {
            this.head = entry;
        }
        this.tail = entry;
        ++this.length;
    }
    unshift(v9) {
        const entry = {
            data: v9,
            next: this.head
        };
        if (this.length === 0) {
            this.tail = entry;
        }
        this.head = entry;
        ++this.length;
    }
    shift() {
        if (this.length === 0) {
            return;
        }
        const ret = this.head.data;
        if (this.length === 1) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
        }
        --this.length;
        return ret;
    }
    clear() {
        this.head = this.tail = null;
        this.length = 0;
    }
    join(s) {
        if (this.length === 0) {
            return "";
        }
        let p9 = this.head;
        let ret = "" + p9.data;
        while(p9 = p9.next){
            ret += s + p9.data;
        }
        return ret;
    }
    concat(n) {
        if (this.length === 0) {
            return Buffer.alloc(0);
        }
        const ret = Buffer.allocUnsafe(n >>> 0);
        let p10 = this.head;
        let i87 = 0;
        while(p10){
            ret.set(p10.data, i87);
            i87 += p10.data.length;
            p10 = p10.next;
        }
        return ret;
    }
    consume(n, hasStrings) {
        const data = this.head.data;
        if (n < data.length) {
            const slice = data.slice(0, n);
            this.head.data = data.slice(n);
            return slice;
        }
        if (n === data.length) {
            return this.shift();
        }
        return hasStrings ? this._getString(n) : this._getBuffer(n);
    }
    first() {
        return this.head.data;
    }
    *[Symbol.iterator]() {
        for(let p11 = this.head; p11; p11 = p11.next){
            yield p11.data;
        }
    }
    _getString(n) {
        let ret = "";
        let p12 = this.head;
        let c = 0;
        do {
            const str = p12.data;
            if (n > str.length) {
                ret += str;
                n -= str.length;
            } else {
                if (n === str.length) {
                    ret += str;
                    ++c;
                    if (p12.next) {
                        this.head = p12.next;
                    } else {
                        this.head = this.tail = null;
                    }
                } else {
                    ret += str.slice(0, n);
                    this.head = p12;
                    p12.data = str.slice(n);
                }
                break;
            }
            ++c;
        }while (p12 = p12.next)
        this.length -= c;
        return ret;
    }
    _getBuffer(n) {
        const ret = Buffer.allocUnsafe(n);
        const retLen = n;
        let p13 = this.head;
        let c = 0;
        do {
            const buf = p13.data;
            if (n > buf.length) {
                ret.set(buf, retLen - n);
                n -= buf.length;
            } else {
                if (n === buf.length) {
                    ret.set(buf, retLen - n);
                    ++c;
                    if (p13.next) {
                        this.head = p13.next;
                    } else {
                        this.head = this.tail = null;
                    }
                } else {
                    ret.set(new Uint8Array(buf.buffer, buf.byteOffset, n), retLen - n);
                    this.head = p13;
                    p13.data = buf.slice(n);
                }
                break;
            }
            ++c;
        }while (p13 = p13.next)
        this.length -= c;
        return ret;
    }
    [inspect.custom](_, options) {
        return inspect(this, {
            ...options,
            depth: 0,
            customInspect: false
        });
    }
}
let debug = debuglog("stream", (fn)=>{
    debug = fn;
});
const kPaused = Symbol("kPaused");
Object.setPrototypeOf(Readable.prototype, Stream.prototype);
Object.setPrototypeOf(Readable, Stream);
const nop1 = ()=>{};
const { errorOrDestroy: errorOrDestroy1  } = __default5;
function ReadableState(options, stream, isDuplex) {
    if (typeof isDuplex !== "boolean") {
        isDuplex = stream instanceof Stream.Duplex;
    }
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex) {
        this.objectMode = this.objectMode || !!(options && options.readableObjectMode);
    }
    this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = [];
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.constructed = true;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this[kPaused] = null;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.destroyed = false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.awaitDrainWriters = null;
    this.multiAwaitDrain = false;
    this.readingMore = false;
    this.dataEmitted = false;
    this.decoder = null;
    this.encoding = null;
    if (options && options.encoding) {
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}
function Readable(options) {
    if (!(this instanceof Readable)) {
        return new Readable(options);
    }
    const isDuplex = this instanceof Stream.Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    if (options) {
        if (typeof options.read === "function") {
            this._read = options.read;
        }
        if (typeof options.destroy === "function") {
            this._destroy = options.destroy;
        }
        if (typeof options.construct === "function") {
            this._construct = options.construct;
        }
        if (options.signal && !isDuplex) {
            addAbortSignalNoValidate(options.signal, this);
        }
    }
    Stream.call(this, options);
    __default5.construct(this, ()=>{
        if (this._readableState.needReadable) {
            maybeReadMore(this, this._readableState);
        }
    });
}
Readable.prototype.destroy = __default5.destroy;
Readable.prototype._undestroy = __default5.undestroy;
Readable.prototype._destroy = function(err, cb) {
    cb(err);
};
Readable.prototype[EventEmitter.captureRejectionSymbol] = function(err) {
    this.destroy(err);
};
Readable.prototype.push = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, false);
};
Readable.prototype.unshift = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, true);
};
function readableAddChunk(stream, chunk, encoding, addToFront) {
    debug("readableAddChunk", chunk);
    const state = stream._readableState;
    let err;
    if (!state.objectMode) {
        if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (state.encoding !== encoding) {
                if (addToFront && state.encoding) {
                    chunk = Buffer.from(chunk, encoding).toString(state.encoding);
                } else {
                    chunk = Buffer.from(chunk, encoding);
                    encoding = "";
                }
            }
        } else if (chunk instanceof Buffer) {
            encoding = "";
        } else if (Stream._isUint8Array(chunk)) {
            chunk = Stream._uint8ArrayToBuffer(chunk);
            encoding = "";
        } else if (chunk != null) {
            err = new ERR_INVALID_ARG_TYPE("chunk", [
                "string",
                "Buffer",
                "Uint8Array"
            ], chunk);
        }
    }
    if (err) {
        errorOrDestroy1(stream, err);
    } else if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
        if (addToFront) {
            if (state.endEmitted) {
                errorOrDestroy1(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            } else {
                addChunk(stream, state, chunk, true);
            }
        } else if (state.ended) {
            errorOrDestroy1(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state.destroyed || state.errored) {
            return false;
        } else {
            state.reading = false;
            if (state.decoder && !encoding) {
                chunk = state.decoder.write(chunk);
                if (state.objectMode || chunk.length !== 0) {
                    addChunk(stream, state, chunk, false);
                } else {
                    maybeReadMore(stream, state);
                }
            } else {
                addChunk(stream, state, chunk, false);
            }
        }
    } else if (!addToFront) {
        state.reading = false;
        maybeReadMore(stream, state);
    }
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
        if (state.multiAwaitDrain) {
            state.awaitDrainWriters.clear();
        } else {
            state.awaitDrainWriters = null;
        }
        state.dataEmitted = true;
        stream.emit("data", chunk);
    } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) {
            state.buffer.unshift(chunk);
        } else {
            state.buffer.push(chunk);
        }
        if (state.needReadable) {
            emitReadable(stream);
        }
    }
    maybeReadMore(stream, state);
}
Readable.prototype.isPaused = function() {
    const state = this._readableState;
    return state[kPaused] === true || state.flowing === false;
};
Readable.prototype.setEncoding = function(enc) {
    const decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    const buffer = this._readableState.buffer;
    let content = "";
    for (const data of buffer){
        content += decoder.write(data);
    }
    buffer.clear();
    if (content !== "") {
        buffer.push(content);
    }
    this._readableState.length = content.length;
    return this;
};
const MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
    if (n >= 0x40000000) {
        n = MAX_HWM;
    } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
}
function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) {
        return 0;
    }
    if (state.objectMode) {
        return 1;
    }
    if (Number.isNaN(n)) {
        if (state.flowing && state.length) {
            return state.buffer.first().length;
        }
        return state.length;
    }
    if (n <= state.length) {
        return n;
    }
    return state.ended ? state.length : 0;
}
Readable.prototype.read = function(n) {
    debug("read", n);
    if (n === undefined) {
        n = NaN;
    } else if (!Number.isInteger(n)) {
        n = Number.parseInt(n, 10);
    }
    const state = this._readableState;
    const nOrig = n;
    if (n > state.highWaterMark) {
        state.highWaterMark = computeNewHighWaterMark(n);
    }
    if (n !== 0) {
        state.emittedReadable = false;
    }
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) {
            endReadable(this);
        } else {
            emitReadable(this);
        }
        return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
        if (state.length === 0) {
            endReadable(this);
        }
        return null;
    }
    let doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
        doRead = false;
        debug("reading, ended or constructing", doRead);
    } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) {
            state.needReadable = true;
        }
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) {
            n = howMuchToRead(nOrig, state);
        }
    }
    let ret;
    if (n > 0) {
        ret = fromList(n, state);
    } else {
        ret = null;
    }
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    } else {
        state.length -= n;
        if (state.multiAwaitDrain) {
            state.awaitDrainWriters.clear();
        } else {
            state.awaitDrainWriters = null;
        }
    }
    if (state.length === 0) {
        if (!state.ended) {
            state.needReadable = true;
        }
        if (nOrig !== n && state.ended) {
            endReadable(this);
        }
    }
    if (ret !== null) {
        state.dataEmitted = true;
        this.emit("data", ret);
    }
    return ret;
};
function onEofChunk(stream, state) {
    debug("onEofChunk");
    if (state.ended) return;
    if (state.decoder) {
        const chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) {
        emitReadable(stream);
    } else {
        state.needReadable = false;
        state.emittedReadable = true;
        emitReadable_(stream);
    }
}
function emitReadable(stream) {
    const state = stream._readableState;
    debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        nextTick2(emitReadable_, stream);
    }
}
function emitReadable_(stream) {
    const state = stream._readableState;
    debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && !state.errored && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
    }
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
}
function maybeReadMore(stream, state) {
    if (!state.readingMore && state.constructed) {
        state.readingMore = true;
        nextTick2(maybeReadMore_, stream, state);
    }
}
function maybeReadMore_(stream, state) {
    while(!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)){
        const len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length) {
            break;
        }
    }
    state.readingMore = false;
}
Readable.prototype._read = function(n) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
};
Readable.prototype.pipe = function(dest, pipeOpts) {
    const src = this;
    const state = this._readableState;
    if (state.pipes.length === 1) {
        if (!state.multiAwaitDrain) {
            state.multiAwaitDrain = true;
            state.awaitDrainWriters = new Set(state.awaitDrainWriters ? [
                state.awaitDrainWriters
            ] : []);
        }
    }
    state.pipes.push(dest);
    debug("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
    const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== stdio.stdout && dest !== stdio.stderr;
    const endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) {
        nextTick2(endFn);
    } else {
        src.once("end", endFn);
    }
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        debug("onend");
        dest.end();
    }
    let ondrain;
    let cleanedUp = false;
    function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        if (ondrain) {
            dest.removeListener("drain", ondrain);
        }
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) {
            ondrain();
        }
    }
    function pause() {
        if (!cleanedUp) {
            if (state.pipes.length === 1 && state.pipes[0] === dest) {
                debug("false write response, pause", 0);
                state.awaitDrainWriters = dest;
                state.multiAwaitDrain = false;
            } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
                debug("false write response, pause", state.awaitDrainWriters.size);
                state.awaitDrainWriters.add(dest);
            }
            src.pause();
        }
        if (!ondrain) {
            ondrain = pipeOnDrain(src, dest);
            dest.on("drain", ondrain);
        }
    }
    src.on("data", ondata);
    function ondata(chunk) {
        debug("ondata");
        const ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
            pause();
        }
    }
    function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EventEmitter.listenerCount(dest, "error") === 0) {
            const s = dest._writableState || dest._readableState;
            if (s && !s.errorEmitted) {
                errorOrDestroy1(dest, er);
            } else {
                dest.emit("error", er);
            }
        }
    }
    prependListener(dest, "error", onerror);
    function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (dest.writableNeedDrain === true) {
        if (state.flowing) {
            pause();
        }
    } else if (!state.flowing) {
        debug("pipe resume");
        src.resume();
    }
    return dest;
};
function pipeOnDrain(src, dest) {
    return function pipeOnDrainFunctionResult() {
        const state = src._readableState;
        if (state.awaitDrainWriters === dest) {
            debug("pipeOnDrain", 1);
            state.awaitDrainWriters = null;
        } else if (state.multiAwaitDrain) {
            debug("pipeOnDrain", state.awaitDrainWriters.size);
            state.awaitDrainWriters.delete(dest);
        }
        if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && EventEmitter.listenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
        }
    };
}
Readable.prototype.unpipe = function(dest) {
    const state = this._readableState;
    const unpipeInfo = {
        hasUnpiped: false
    };
    if (state.pipes.length === 0) {
        return this;
    }
    if (!dest) {
        const dests = state.pipes;
        state.pipes = [];
        this.pause();
        for(let i88 = 0; i88 < dests.length; i88++){
            dests[i88].emit("unpipe", this, {
                hasUnpiped: false
            });
        }
        return this;
    }
    const index = state.pipes.indexOf(dest);
    if (index === -1) {
        return this;
    }
    state.pipes.splice(index, 1);
    if (state.pipes.length === 0) {
        this.pause();
    }
    dest.emit("unpipe", this, unpipeInfo);
    return this;
};
Readable.prototype.on = function(ev, fn) {
    const res = Stream.prototype.on.call(this, ev, fn);
    const state = this._readableState;
    if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) {
            this.resume();
        }
    } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
                emitReadable(this);
            } else if (!state.reading) {
                nextTick2(nReadingNextTick, this);
            }
        }
    }
    return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function(ev, fn) {
    const res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
        nextTick2(updateReadableListening, this);
    }
    return res;
};
Readable.prototype.off = Readable.prototype.removeListener;
Readable.prototype.removeAllListeners = function(ev) {
    const res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === undefined) {
        nextTick2(updateReadableListening, this);
    }
    return res;
};
function updateReadableListening(self) {
    const state = self._readableState;
    state.readableListening = self.listenerCount("readable") > 0;
    if (state.resumeScheduled && state[kPaused] === false) {
        state.flowing = true;
    } else if (self.listenerCount("data") > 0) {
        self.resume();
    } else if (!state.readableListening) {
        state.flowing = null;
    }
}
function nReadingNextTick(self) {
    debug("readable nexttick read 0");
    self.read(0);
}
Readable.prototype.resume = function() {
    const state = this._readableState;
    if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
    }
    state[kPaused] = false;
    return this;
};
function resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        nextTick2(resume_, stream, state);
    }
}
function resume_(stream, state) {
    debug("resume", state.reading);
    if (!state.reading) {
        stream.read(0);
    }
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading) {
        stream.read(0);
    }
}
Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
    }
    this._readableState[kPaused] = true;
    return this;
};
function flow(stream) {
    const state = stream._readableState;
    debug("flow", state.flowing);
    while(state.flowing && stream.read() !== null);
}
Readable.prototype.wrap = function(stream) {
    let paused = false;
    stream.on("data", (chunk)=>{
        if (!this.push(chunk) && stream.pause) {
            paused = true;
            stream.pause();
        }
    });
    stream.on("end", ()=>{
        this.push(null);
    });
    stream.on("error", (err)=>{
        errorOrDestroy1(this, err);
    });
    stream.on("close", ()=>{
        this.destroy();
    });
    stream.on("destroy", ()=>{
        this.destroy();
    });
    this._read = ()=>{
        if (paused && stream.resume) {
            paused = false;
            stream.resume();
        }
    };
    const streamKeys = Object.keys(stream);
    for(let j14 = 1; j14 < streamKeys.length; j14++){
        const i89 = streamKeys[j14];
        if (this[i89] === undefined && typeof stream[i89] === "function") {
            this[i89] = stream[i89].bind(stream);
        }
    }
    return this;
};
Readable.prototype[Symbol.asyncIterator] = function() {
    return streamToAsyncIterator(this);
};
Readable.prototype.iterator = function(options) {
    if (options !== undefined) {
        validateObject(options, "options");
    }
    return streamToAsyncIterator(this, options);
};
function streamToAsyncIterator(stream, options) {
    if (typeof stream.read !== "function") {
        stream = Readable.wrap(stream, {
            objectMode: true
        });
    }
    const iter = createAsyncIterator(stream, options);
    iter.stream = stream;
    return iter;
}
async function* createAsyncIterator(stream, options) {
    let callback = nop1;
    const opts = {
        destroyOnReturn: true,
        destroyOnError: true,
        ...options
    };
    function next(resolve14) {
        if (this === stream) {
            callback();
            callback = nop1;
        } else {
            callback = resolve14;
        }
    }
    const state = stream._readableState;
    let error7 = state.errored;
    let errorEmitted = state.errorEmitted;
    let endEmitted = state.endEmitted;
    let closeEmitted = state.closeEmitted;
    stream.on("readable", next).on("error", function(err) {
        error7 = err;
        errorEmitted = true;
        next.call(this);
    }).on("end", function() {
        endEmitted = true;
        next.call(this);
    }).on("close", function() {
        closeEmitted = true;
        next.call(this);
    });
    let errorThrown = false;
    try {
        while(true){
            const chunk = stream.destroyed ? null : stream.read();
            if (chunk !== null) {
                yield chunk;
            } else if (errorEmitted) {
                throw error7;
            } else if (endEmitted) {
                break;
            } else if (closeEmitted) {
                break;
            } else {
                await new Promise(next);
            }
        }
    } catch (err) {
        if (opts.destroyOnError) {
            __default5.destroyer(stream, err);
        }
        errorThrown = true;
        throw err;
    } finally{
        if (!errorThrown && opts.destroyOnReturn) {
            if (state.autoDestroy || !endEmitted) {
                __default5.destroyer(stream, null);
            }
        }
    }
}
Object.defineProperties(Readable.prototype, {
    readable: {
        get () {
            const r = this._readableState;
            return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
        },
        set (val) {
            if (this._readableState) {
                this._readableState.readable = !!val;
            }
        }
    },
    readableDidRead: {
        enumerable: false,
        get: function() {
            return this._readableState.dataEmitted;
        }
    },
    readableAborted: {
        enumerable: false,
        get: function() {
            return !!(this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted;
        }
    },
    readableHighWaterMark: {
        enumerable: false,
        get: function() {
            return this._readableState.highWaterMark;
        }
    },
    readableBuffer: {
        enumerable: false,
        get: function() {
            return this._readableState && this._readableState.buffer;
        }
    },
    readableFlowing: {
        enumerable: false,
        get: function() {
            return this._readableState.flowing;
        },
        set: function(state) {
            if (this._readableState) {
                this._readableState.flowing = state;
            }
        }
    },
    readableLength: {
        enumerable: false,
        get () {
            return this._readableState.length;
        }
    },
    readableObjectMode: {
        enumerable: false,
        get () {
            return this._readableState ? this._readableState.objectMode : false;
        }
    },
    readableEncoding: {
        enumerable: false,
        get () {
            return this._readableState ? this._readableState.encoding : null;
        }
    },
    destroyed: {
        enumerable: false,
        get () {
            if (this._readableState === undefined) {
                return false;
            }
            return this._readableState.destroyed;
        },
        set (value) {
            if (!this._readableState) {
                return;
            }
            this._readableState.destroyed = value;
        }
    },
    readableEnded: {
        enumerable: false,
        get () {
            return this._readableState ? this._readableState.endEmitted : false;
        }
    }
});
Object.defineProperties(ReadableState.prototype, {
    pipesCount: {
        get () {
            return this.pipes.length;
        }
    },
    paused: {
        get () {
            return this[kPaused] !== false;
        },
        set (value) {
            this[kPaused] = !!value;
        }
    }
});
function fromList(n, state) {
    if (state.length === 0) {
        return null;
    }
    let ret;
    if (state.objectMode) {
        ret = state.buffer.shift();
    } else if (!n || n >= state.length) {
        if (state.decoder) {
            ret = state.buffer.join("");
        } else if (state.buffer.length === 1) {
            ret = state.buffer.first();
        } else {
            ret = state.buffer.concat(state.length);
        }
        state.buffer.clear();
    } else {
        ret = state.buffer.consume(n, state.decoder);
    }
    return ret;
}
function endReadable(stream) {
    const state = stream._readableState;
    debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        nextTick2(endReadableNT, state, stream);
    }
}
function endReadableNT(state, stream) {
    debug("endReadableNT", state.endEmitted, state.length);
    if (!state.errorEmitted && !state.closeEmitted && !state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.emit("end");
        if (stream.writable && stream.allowHalfOpen === false) {
            nextTick2(endWritableNT, stream);
        } else if (state.autoDestroy) {
            const wState = stream._writableState;
            const autoDestroy = !wState || wState.autoDestroy && (wState.finished || wState.writable === false);
            if (autoDestroy) {
                stream.destroy();
            }
        }
    }
}
function endWritableNT(stream) {
    const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
    if (writable) {
        stream.end();
    }
}
function readableFrom(iterable, opts) {
    return _from1(Readable, iterable, opts);
}
function wrap(src, options) {
    return new Readable({
        objectMode: (src.readableObjectMode ?? src.objectMode) ?? true,
        ...options,
        destroy (err, callback) {
            __default5.destroyer(src, err);
            callback(err);
        }
    }).wrap(src);
}
Readable._fromList = fromList;
Readable.ReadableState = ReadableState;
Readable.from = readableFrom;
Readable.wrap = wrap;
const { errorOrDestroy: errorOrDestroy2  } = __default5;
function isDuplexStream(maybe_duplex) {
    const isReadable2 = Readable.prototype.isPrototypeOf(maybe_duplex);
    let prototype = maybe_duplex;
    let isDuplex = false;
    while(prototype?.constructor && prototype.constructor.name !== "Object"){
        if (prototype.constructor.name === "Duplex") {
            isDuplex = true;
            break;
        }
        prototype = Object.getPrototypeOf(prototype);
    }
    return isReadable2 && isDuplex;
}
Object.setPrototypeOf(Writable.prototype, Stream.prototype);
Object.setPrototypeOf(Writable, Stream);
function nop2() {}
const kOnFinished = Symbol("kOnFinished");
function WritableState(options, stream, isDuplex) {
    if (typeof isDuplex !== "boolean") {
        isDuplex = isDuplexStream(stream);
    }
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex) {
        this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
    }
    this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    const noDecode = !!(options && options.decodeStrings === false);
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = onwrite.bind(undefined, stream);
    this.writecb = null;
    this.writelen = 0;
    this.afterWriteTickInfo = null;
    resetBuffer(this);
    this.pendingcb = 0;
    this.constructed = true;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this[kOnFinished] = [];
}
function resetBuffer(state) {
    state.buffered = [];
    state.bufferedIndex = 0;
    state.allBuffers = true;
    state.allNoop = true;
}
WritableState.prototype.getBuffer = function getBuffer() {
    return this.buffered.slice(this.bufferedIndex);
};
Object.defineProperty(WritableState.prototype, "bufferedRequestCount", {
    get () {
        return this.buffered.length - this.bufferedIndex;
    }
});
function Writable(options) {
    const isDuplex = isDuplexStream(this);
    if (!isDuplex && !Function.prototype[Symbol.hasInstance].call(Writable, this)) {
        return new Writable(options);
    }
    this._writableState = new WritableState(options, this, isDuplex);
    if (options) {
        if (typeof options.write === "function") {
            this._write = options.write;
        }
        if (typeof options.writev === "function") {
            this._writev = options.writev;
        }
        if (typeof options.destroy === "function") {
            this._destroy = options.destroy;
        }
        if (typeof options.final === "function") {
            this._final = options.final;
        }
        if (typeof options.construct === "function") {
            this._construct = options.construct;
        }
        if (options.signal) {
            addAbortSignalNoValidate(options.signal, this);
        }
    }
    Stream.call(this, options);
    __default5.construct(this, ()=>{
        const state = this._writableState;
        if (!state.writing) {
            clearBuffer(this, state);
        }
        finishMaybe(this, state);
    });
}
Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function(object) {
        if (Function.prototype[Symbol.hasInstance].call(this, object)) return true;
        if (this !== Writable) return false;
        return object && object._writableState instanceof WritableState;
    }
});
Writable.prototype.pipe = function() {
    errorOrDestroy2(this, new ERR_STREAM_CANNOT_PIPE());
};
function _write(stream, chunk, encoding, cb) {
    const state = stream._writableState;
    if (typeof encoding === "function") {
        cb = encoding;
        encoding = state.defaultEncoding;
    } else {
        if (!encoding) {
            encoding = state.defaultEncoding;
        } else if (encoding !== "buffer" && !Buffer.isEncoding(encoding)) {
            throw new ERR_UNKNOWN_ENCODING(encoding);
        }
        if (typeof cb !== "function") {
            cb = nop2;
        }
    }
    if (chunk === null) {
        throw new ERR_STREAM_NULL_VALUES();
    } else if (!state.objectMode) {
        if (typeof chunk === "string") {
            if (state.decodeStrings !== false) {
                chunk = Buffer.from(chunk, encoding);
                encoding = "buffer";
            }
        } else if (chunk instanceof Buffer) {
            encoding = "buffer";
        } else if (isUint8Array(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
            encoding = "buffer";
        } else {
            throw new ERR_INVALID_ARG_TYPE("chunk", [
                "string",
                "Buffer",
                "Uint8Array"
            ], chunk);
        }
    }
    let err;
    if (state.ending) {
        err = new ERR_STREAM_WRITE_AFTER_END();
    } else if (state.destroyed) {
        err = new ERR_STREAM_DESTROYED("write");
    }
    if (err) {
        nextTick2(cb, err);
        errorOrDestroy2(stream, err, true);
        return err;
    }
    state.pendingcb++;
    return writeOrBuffer(stream, state, chunk, encoding, cb);
}
Writable.prototype.write = function(chunk, encoding, cb) {
    return _write(this, chunk, encoding, cb) === true;
};
Writable.prototype.cork = function() {
    this._writableState.corked++;
};
Writable.prototype.uncork = function() {
    const state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing) {
            clearBuffer(this, state);
        }
    }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string") {
        encoding = encoding.toLowerCase();
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new ERR_UNKNOWN_ENCODING(encoding);
    }
    this._writableState.defaultEncoding = encoding;
    return this;
};
function writeOrBuffer(stream, state, chunk, encoding, callback) {
    const len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    const ret = state.length < state.highWaterMark;
    if (!ret) {
        state.needDrain = true;
    }
    if (state.writing || state.corked || state.errored || !state.constructed) {
        state.buffered.push({
            chunk,
            encoding,
            callback
        });
        if (state.allBuffers && encoding !== "buffer") {
            state.allBuffers = false;
        }
        if (state.allNoop && callback !== nop2) {
            state.allNoop = false;
        }
    } else {
        state.writelen = len;
        state.writecb = callback;
        state.writing = true;
        state.sync = true;
        stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
    }
    return ret && !state.errored && !state.destroyed;
}
function doWrite(stream, state, writev1, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) {
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
    } else if (writev1) {
        stream._writev(chunk, state.onwrite);
    } else {
        stream._write(chunk, encoding, state.onwrite);
    }
    state.sync = false;
}
function onwriteError(stream, state, er, cb) {
    --state.pendingcb;
    cb(er);
    errorBuffer(state);
    errorOrDestroy2(stream, er);
}
function onwrite(stream, er) {
    const state = stream._writableState;
    const sync = state.sync;
    const cb = state.writecb;
    if (typeof cb !== "function") {
        errorOrDestroy2(stream, new ERR_MULTIPLE_CALLBACK());
        return;
    }
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
    if (er) {
        er.stack;
        if (!state.errored) {
            state.errored = er;
        }
        if (stream._readableState && !stream._readableState.errored) {
            stream._readableState.errored = er;
        }
        if (sync) {
            nextTick2(onwriteError, stream, state, er, cb);
        } else {
            onwriteError(stream, state, er, cb);
        }
    } else {
        if (state.buffered.length > state.bufferedIndex) {
            clearBuffer(stream, state);
        }
        if (sync) {
            if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
                state.afterWriteTickInfo.count++;
            } else {
                state.afterWriteTickInfo = {
                    count: 1,
                    cb,
                    stream,
                    state
                };
                nextTick2(afterWriteTick, state.afterWriteTickInfo);
            }
        } else {
            afterWrite(stream, state, 1, cb);
        }
    }
}
function afterWriteTick({ stream , state , count , cb  }) {
    state.afterWriteTickInfo = null;
    return afterWrite(stream, state, count, cb);
}
function afterWrite(stream, state, count, cb) {
    const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
    if (needDrain) {
        state.needDrain = false;
        stream.emit("drain");
    }
    while(count-- > 0){
        state.pendingcb--;
        cb();
    }
    if (state.destroyed) {
        errorBuffer(state);
    }
    finishMaybe(stream, state);
}
function errorBuffer(state) {
    if (state.writing) {
        return;
    }
    for(let n = state.bufferedIndex; n < state.buffered.length; ++n){
        const { chunk , callback  } = state.buffered[n];
        const len = state.objectMode ? 1 : chunk.length;
        state.length -= len;
        callback(new ERR_STREAM_DESTROYED("write"));
    }
    const onfinishCallbacks = state[kOnFinished].splice(0);
    for(let i90 = 0; i90 < onfinishCallbacks.length; i90++){
        onfinishCallbacks[i90](new ERR_STREAM_DESTROYED("end"));
    }
    resetBuffer(state);
}
function clearBuffer(stream, state) {
    if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
        return;
    }
    const { buffered , bufferedIndex , objectMode  } = state;
    const bufferedLength = buffered.length - bufferedIndex;
    if (!bufferedLength) {
        return;
    }
    let i91 = bufferedIndex;
    state.bufferProcessing = true;
    if (bufferedLength > 1 && stream._writev) {
        state.pendingcb -= bufferedLength - 1;
        const callback = state.allNoop ? nop2 : (err)=>{
            for(let n = i91; n < buffered.length; ++n){
                buffered[n].callback(err);
            }
        };
        const chunks = state.allNoop && i91 === 0 ? buffered : buffered.slice(i91);
        chunks.allBuffers = state.allBuffers;
        doWrite(stream, state, true, state.length, chunks, "", callback);
        resetBuffer(state);
    } else {
        do {
            const { chunk , encoding , callback  } = buffered[i91];
            buffered[i91++] = null;
            const len = objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, callback);
        }while (i91 < buffered.length && !state.writing)
        if (i91 === buffered.length) {
            resetBuffer(state);
        } else if (i91 > 256) {
            buffered.splice(0, i91);
            state.bufferedIndex = 0;
        } else {
            state.bufferedIndex = i91;
        }
    }
    state.bufferProcessing = false;
}
Writable.prototype._write = function(chunk, encoding, cb) {
    if (this._writev) {
        this._writev([
            {
                chunk,
                encoding
            }
        ], cb);
    } else {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
    }
};
Writable.prototype._writev = null;
Writable.prototype.end = function(chunk, encoding, cb) {
    const state = this._writableState;
    if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    let err;
    if (chunk !== null && chunk !== undefined) {
        const ret = _write(this, chunk, encoding);
        if (ret instanceof Error) {
            err = ret;
        }
    }
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    }
    if (err) {} else if (!state.errored && !state.ending) {
        state.ending = true;
        finishMaybe(this, state, true);
        state.ended = true;
    } else if (state.finished) {
        err = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state.destroyed) {
        err = new ERR_STREAM_DESTROYED("end");
    }
    if (typeof cb === "function") {
        if (err || state.finished) {
            nextTick1(cb, err);
        } else {
            state[kOnFinished].push(cb);
        }
    }
    return this;
};
function needFinish(state) {
    return state.ending && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
}
function callFinal(stream, state) {
    let called = false;
    function onFinish1(err) {
        if (called) {
            errorOrDestroy2(stream, err ?? ERR_MULTIPLE_CALLBACK());
            return;
        }
        called = true;
        state.pendingcb--;
        if (err) {
            const onfinishCallbacks = state[kOnFinished].splice(0);
            for(let i92 = 0; i92 < onfinishCallbacks.length; i92++){
                onfinishCallbacks[i92](err);
            }
            errorOrDestroy2(stream, err, state.sync);
        } else if (needFinish(state)) {
            state.prefinished = true;
            stream.emit("prefinish");
            state.pendingcb++;
            nextTick2(finish, stream, state);
        }
    }
    state.sync = true;
    state.pendingcb++;
    try {
        const result = stream._final(onFinish1);
        if (result != null) {
            const then = result.then;
            if (typeof then === "function") {
                then.call(result, function() {
                    nextTick2(onFinish1, null);
                }, function(err) {
                    nextTick2(onFinish1, err);
                });
            }
        }
    } catch (err) {
        onFinish1(stream, state, err);
    }
    state.sync = false;
}
function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
            state.finalCalled = true;
            callFinal(stream, state);
        } else {
            state.prefinished = true;
            stream.emit("prefinish");
        }
    }
}
function finishMaybe(stream, state, sync) {
    if (needFinish(state)) {
        prefinish(stream, state);
        if (state.pendingcb === 0 && needFinish(state)) {
            state.pendingcb++;
            if (sync) {
                nextTick2(finish, stream, state);
            } else {
                finish(stream, state);
            }
        }
    }
}
function finish(stream, state) {
    state.pendingcb--;
    state.finished = true;
    const onfinishCallbacks = state[kOnFinished].splice(0);
    for(let i93 = 0; i93 < onfinishCallbacks.length; i93++){
        onfinishCallbacks[i93]();
    }
    stream.emit("finish");
    if (state.autoDestroy) {
        const rState = stream._readableState;
        const autoDestroy = !rState || rState.autoDestroy && (rState.endEmitted || rState.readable === false);
        if (autoDestroy) {
            stream.destroy();
        }
    }
}
Object.defineProperties(Writable.prototype, {
    destroyed: {
        get () {
            return this._writableState ? this._writableState.destroyed : false;
        },
        set (value) {
            if (this._writableState) {
                this._writableState.destroyed = value;
            }
        }
    },
    writable: {
        get () {
            const w16 = this._writableState;
            return !!w16 && w16.writable !== false && !w16.destroyed && !w16.errored && !w16.ending && !w16.ended;
        },
        set (val) {
            if (this._writableState) {
                this._writableState.writable = !!val;
            }
        }
    },
    writableFinished: {
        get () {
            return this._writableState ? this._writableState.finished : false;
        }
    },
    writableObjectMode: {
        get () {
            return this._writableState ? this._writableState.objectMode : false;
        }
    },
    writableBuffer: {
        get () {
            return this._writableState && this._writableState.getBuffer();
        }
    },
    writableEnded: {
        get () {
            return this._writableState ? this._writableState.ending : false;
        }
    },
    writableNeedDrain: {
        get () {
            const wState = this._writableState;
            if (!wState) return false;
            return !wState.destroyed && !wState.ending && wState.needDrain;
        }
    },
    writableHighWaterMark: {
        get () {
            return this._writableState && this._writableState.highWaterMark;
        }
    },
    writableCorked: {
        get () {
            return this._writableState ? this._writableState.corked : 0;
        }
    },
    writableLength: {
        get () {
            return this._writableState && this._writableState.length;
        }
    }
});
const destroy1 = __default5.destroy;
Writable.prototype.destroy = function(err, cb) {
    const state = this._writableState;
    if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
        nextTick1(errorBuffer, state);
    }
    destroy1.call(this, err, cb);
    return this;
};
Writable.prototype._undestroy = __default5.undestroy;
Writable.prototype._destroy = function(err, cb) {
    cb(err);
};
Writable.prototype[EventEmitter.captureRejectionSymbol] = function(err) {
    this.destroy(err);
};
Writable.WritableState = WritableState;
Object.setPrototypeOf(Duplex.prototype, Readable.prototype);
Object.setPrototypeOf(Duplex, Readable);
{
    for (const method of Object.keys(Writable.prototype)){
        if (!Duplex.prototype[method]) {
            Duplex.prototype[method] = Writable.prototype[method];
        }
    }
}function Duplex(options) {
    if (!(this instanceof Duplex)) {
        return new Duplex(options);
    }
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false) {
            this.readable = false;
        }
        if (options.writable === false) {
            this.writable = false;
        }
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
        }
    }
}
Object.defineProperties(Duplex.prototype, {
    writable: Object.getOwnPropertyDescriptor(Writable.prototype, "writable"),
    writableHighWaterMark: Object.getOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark"),
    writableObjectMode: Object.getOwnPropertyDescriptor(Writable.prototype, "writableObjectMode"),
    writableBuffer: Object.getOwnPropertyDescriptor(Writable.prototype, "writableBuffer"),
    writableLength: Object.getOwnPropertyDescriptor(Writable.prototype, "writableLength"),
    writableFinished: Object.getOwnPropertyDescriptor(Writable.prototype, "writableFinished"),
    writableCorked: Object.getOwnPropertyDescriptor(Writable.prototype, "writableCorked"),
    writableEnded: Object.getOwnPropertyDescriptor(Writable.prototype, "writableEnded"),
    writableNeedDrain: Object.getOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain"),
    destroyed: {
        get () {
            if (this._readableState === undefined || this._writableState === undefined) {
                return false;
            }
            return this._readableState.destroyed && this._writableState.destroyed;
        },
        set (value) {
            if (this._readableState && this._writableState) {
                this._readableState.destroyed = value;
                this._writableState.destroyed = value;
            }
        }
    }
});
function isReadableStream(object) {
    return object instanceof ReadableStream;
}
function isWritableStream(object) {
    return object instanceof WritableStream;
}
Duplex.fromWeb = function(pair, options) {
    validateObject(pair, "pair");
    const { readable: readableStream , writable: writableStream ,  } = pair;
    if (!isReadableStream(readableStream)) {
        throw new ERR_INVALID_ARG_TYPE("pair.readable", "ReadableStream", readableStream);
    }
    if (!isWritableStream(writableStream)) {
        throw new ERR_INVALID_ARG_TYPE("pair.writable", "WritableStream", writableStream);
    }
    validateObject(options, "options");
    const { allowHalfOpen =false , objectMode =false , encoding: encoding1 , decodeStrings =true , highWaterMark , signal ,  } = options;
    validateBoolean(objectMode, "options.objectMode");
    if (encoding1 !== undefined && !Buffer.isEncoding(encoding1)) {
        throw new ERR_INVALID_ARG_VALUE(encoding1, "options.encoding");
    }
    const writer = writableStream.getWriter();
    const reader = readableStream.getReader();
    let writableClosed = false;
    let readableClosed = false;
    const duplex = new Duplex({
        allowHalfOpen,
        highWaterMark,
        objectMode,
        encoding: encoding1,
        decodeStrings,
        signal,
        writev (chunks, callback) {
            function done(error8) {
                error8 = error8.filter((e)=>e
                );
                try {
                    callback(error8.length === 0 ? undefined : error8);
                } catch (error1) {
                    nextTick1(()=>destroy(duplex, error1)
                    );
                }
            }
            writer.ready.then(()=>Promise.All(chunks.map((data)=>writer.write(data.chunk)
                )).then(done, done)
            , done);
        },
        write (chunk, encoding, callback) {
            if (typeof chunk === "string" && decodeStrings && !objectMode) {
                chunk = Buffer.from(chunk, encoding);
                chunk = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
            }
            function done(error9) {
                try {
                    callback(error9);
                } catch (error2) {
                    destroy(duplex, error2);
                }
            }
            writer.ready.then(()=>writer.write(chunk).then(done, done)
            , done);
        },
        final (callback) {
            function done(error10) {
                try {
                    callback(error10);
                } catch (error3) {
                    nextTick1(()=>destroy(duplex, error3)
                    );
                }
            }
            if (!writableClosed) {
                writer.close().then(done, done);
            }
        },
        read () {
            reader.read().then((chunk)=>{
                if (chunk.done) {
                    duplex.push(null);
                } else {
                    duplex.push(chunk.value);
                }
            }, (error11)=>destroy(duplex, error11)
            );
        },
        destroy (error4, callback) {
            function done() {
                try {
                    callback(error4);
                } catch (error12) {
                    nextTick1(()=>{
                        throw error12;
                    });
                }
            }
            async function closeWriter() {
                if (!writableClosed) {
                    await writer.abort(error4);
                }
            }
            async function closeReader() {
                if (!readableClosed) {
                    await reader.cancel(error4);
                }
            }
            if (!writableClosed || !readableClosed) {
                Promise.All([
                    closeWriter(),
                    closeReader(), 
                ]).then(done, done);
                return;
            }
            done();
        }
    });
    writer.closed.then(()=>{
        writableClosed = true;
        if (!isWritableEnded(duplex)) {
            destroy(duplex, new ERR_STREAM_PREMATURE_CLOSE());
        }
    }, (error13)=>{
        writableClosed = true;
        readableClosed = true;
        destroy(duplex, error13);
    });
    reader.closed.then(()=>{
        readableClosed = true;
        if (!isReadableEnded1(duplex)) {
            duplex.push(null);
        }
    }, (error14)=>{
        writableClosed = true;
        readableClosed = true;
        destroy(duplex, error14);
    });
    return duplex;
};
class Duplexify extends Duplex {
    constructor(options){
        super(options);
        if (options?.readable === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
        }
        if (options?.writable === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
        }
    }
}
function duplexify(body, name40) {
    if (isDuplexNodeStream(body)) {
        return body;
    }
    if (isReadableNodeStream(body)) {
        return _duplexify({
            readable: body
        });
    }
    if (isWritableNodeStream(body)) {
        return _duplexify({
            writable: body
        });
    }
    if (isNodeStream(body)) {
        return _duplexify({
            writable: false,
            readable: false
        });
    }
    if (typeof body === "function") {
        const { value , write: write1 , final: __final1 , destroy  } = fromAsyncGen(body);
        if (isIterable(value)) {
            return _from1(Duplexify, value, {
                objectMode: true,
                write: write1,
                final: __final1,
                destroy
            });
        }
        const then = value?.then;
        if (typeof then === "function") {
            let d;
            const promise = then.call(value, (val)=>{
                if (val != null) {
                    throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
                }
            }, (err)=>{
                destroyer(d, err);
            });
            return d = new Duplexify({
                objectMode: true,
                readable: false,
                write: write1,
                final (cb) {
                    __final1(async ()=>{
                        try {
                            await promise;
                            nextTick1(cb, null);
                        } catch (err) {
                            nextTick1(cb, err);
                        }
                    });
                },
                destroy
            });
        }
        throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name40, value);
    }
    if (isBlob(body)) {
        return duplexify(body.arrayBuffer());
    }
    if (isIterable(body)) {
        return _from1(Duplexify, body, {
            objectMode: true,
            writable: false
        });
    }
    if (typeof body?.writable === "object" || typeof body?.readable === "object") {
        const readable = body?.readable ? isReadableNodeStream(body?.readable) ? body?.readable : duplexify(body.readable) : undefined;
        const writable = body?.writable ? isWritableNodeStream(body?.writable) ? body?.writable : duplexify(body.writable) : undefined;
        return _duplexify({
            readable,
            writable
        });
    }
    const then = body?.then;
    if (typeof then === "function") {
        let d;
        then.call(body, (val)=>{
            if (val != null) {
                d.push(val);
            }
            d.push(null);
        }, (err)=>{
            destroyer(d, err);
        });
        return d = new Duplexify({
            objectMode: true,
            writable: false,
            read () {}
        });
    }
    throw new ERR_INVALID_ARG_TYPE(name40, [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise", 
    ], body);
}
function fromAsyncGen(fn) {
    let { promise , resolve: resolve15  } = createDeferredPromise();
    const ac = new AbortController();
    const signal = ac.signal;
    const value = fn(async function*() {
        while(true){
            const _promise = promise;
            promise = null;
            const { chunk , done , cb  } = await _promise;
            nextTick2(cb);
            if (done) return;
            if (signal.aborted) throw new AbortError();
            ({ promise , resolve: resolve15  } = createDeferredPromise());
            yield chunk;
        }
    }(), {
        signal
    });
    return {
        value,
        write (chunk, encoding, cb) {
            const _resolve2 = resolve15;
            resolve15 = null;
            _resolve2({
                chunk,
                done: false,
                cb
            });
        },
        final (cb) {
            const _resolve3 = resolve15;
            resolve15 = null;
            _resolve3({
                done: true,
                cb
            });
        },
        destroy (err, cb) {
            ac.abort();
            cb(err);
        }
    };
}
function _duplexify(pair) {
    const r = pair.readable && typeof pair.readable.read !== "function" ? Readable.wrap(pair.readable) : pair.readable;
    const w17 = pair.writable;
    let readable = !!isReadable1(r);
    let writable = !!isWritable1(w17);
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
        const cb = onclose;
        onclose = null;
        if (cb) {
            cb(err);
        } else if (err) {
            d.destroy(err);
        } else if (!readable && !writable) {
            d.destroy();
        }
    }
    d = new Duplexify({
        readableObjectMode: !!r?.readableObjectMode,
        writableObjectMode: !!w17?.writableObjectMode,
        readable,
        writable
    });
    if (writable) {
        eos(w17, (err)=>{
            writable = false;
            if (err) {
                destroyer(r, err);
            }
            onfinished(err);
        });
        d._write = function(chunk, encoding, callback) {
            if (w17.write(chunk, encoding)) {
                callback();
            } else {
                ondrain = callback;
            }
        };
        d._final = function(callback) {
            w17.end();
            onfinish = callback;
        };
        w17.on("drain", function() {
            if (ondrain) {
                const cb = ondrain;
                ondrain = null;
                cb();
            }
        });
        w17.on("finish", function() {
            if (onfinish) {
                const cb = onfinish;
                onfinish = null;
                cb();
            }
        });
    }
    if (readable) {
        eos(r, (err)=>{
            readable = false;
            if (err) {
                destroyer(r, err);
            }
            onfinished(err);
        });
        r.on("readable", function() {
            if (onreadable) {
                const cb = onreadable;
                onreadable = null;
                cb();
            }
        });
        r.on("end", function() {
            d.push(null);
        });
        d._read = function() {
            while(true){
                const buf = r.read();
                if (buf === null) {
                    onreadable = d._read;
                    return;
                }
                if (!d.push(buf)) {
                    return;
                }
            }
        };
    }
    d._destroy = function(err, callback) {
        if (!err && onclose !== null) {
            err = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
            callback(err);
        } else {
            onclose = callback;
            destroyer(w17, err);
            destroyer(r, err);
        }
    };
    return d;
}
function duplexFrom(body) {
    return duplexify(body, "body");
}
Duplex.from = duplexFrom;
Object.setPrototypeOf(Transform.prototype, Duplex.prototype);
Object.setPrototypeOf(Transform, Duplex);
const kCallback = Symbol("kCallback");
function Transform(options) {
    if (!(this instanceof Transform)) {
        return new Transform(options);
    }
    Duplex.call(this, options);
    this._readableState.sync = false;
    this[kCallback] = null;
    if (options) {
        if (typeof options.transform === "function") {
            this._transform = options.transform;
        }
        if (typeof options.flush === "function") {
            this._flush = options.flush;
        }
    }
    this.on("prefinish", prefinish1);
}
function __final(cb) {
    let called = false;
    if (typeof this._flush === "function" && !this.destroyed) {
        const result = this._flush((er, data)=>{
            called = true;
            if (er) {
                if (cb) {
                    cb(er);
                } else {
                    this.destroy(er);
                }
                return;
            }
            if (data != null) {
                this.push(data);
            }
            this.push(null);
            if (cb) {
                cb();
            }
        });
        if (result !== undefined && result !== null) {
            try {
                const then = result.then;
                if (typeof then === "function") {
                    then.call(result, (data)=>{
                        if (called) {
                            return;
                        }
                        if (data != null) {
                            this.push(data);
                        }
                        this.push(null);
                        if (cb) {
                            nextTick2(cb);
                        }
                    }, (err)=>{
                        if (cb) {
                            nextTick2(cb, err);
                        } else {
                            nextTick2(()=>this.destroy(err)
                            );
                        }
                    });
                }
            } catch (err) {
                nextTick2(()=>this.destroy(err)
                );
            }
        }
    } else {
        this.push(null);
        if (cb) {
            cb();
        }
    }
}
function prefinish1() {
    if (this._final !== __final) {
        __final.call(this);
    }
}
Transform.prototype._final = __final;
Transform.prototype._transform = function(chunk, encoding, callback) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
};
Transform.prototype._write = function(chunk, encoding, callback) {
    const rState = this._readableState;
    const wState = this._writableState;
    const length = rState.length;
    let called = false;
    const result = this._transform(chunk, encoding, (err, val)=>{
        called = true;
        if (err) {
            callback(err);
            return;
        }
        if (val != null) {
            this.push(val);
        }
        if (wState.ended || length === rState.length || rState.length < rState.highWaterMark || rState.length === 0) {
            callback();
        } else {
            this[kCallback] = callback;
        }
    });
    if (result !== undefined && result != null) {
        try {
            const then = result.then;
            if (typeof then === "function") {
                then.call(result, (val)=>{
                    if (called) {
                        return;
                    }
                    if (val != null) {
                        this.push(val);
                    }
                    if (wState.ended || length === rState.length || rState.length < rState.highWaterMark || rState.length === 0) {
                        nextTick1(callback);
                    } else {
                        this[kCallback] = callback;
                    }
                }, (err)=>{
                    nextTick1(callback, err);
                });
            }
        } catch (err) {
            nextTick1(callback, err);
        }
    }
};
Transform.prototype._read = function() {
    if (this[kCallback]) {
        const callback = this[kCallback];
        this[kCallback] = null;
        callback();
    }
};
Object.setPrototypeOf(PassThrough.prototype, Transform.prototype);
Object.setPrototypeOf(PassThrough, Transform);
function PassThrough(options) {
    if (!(this instanceof PassThrough)) {
        return new PassThrough(options);
    }
    Transform.call(this, options);
}
PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};
function destroyer1(stream, reading, writing, callback) {
    callback = once(callback);
    let finished2 = false;
    stream.on("close", ()=>{
        finished2 = true;
    });
    eos(stream, {
        readable: reading,
        writable: writing
    }, (err)=>{
        finished2 = !err;
        const rState = stream._readableState;
        if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && reading && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
            stream.once("end", callback).once("error", callback);
        } else {
            callback(err);
        }
    });
    return (err)=>{
        if (finished2) return;
        finished2 = true;
        __default5.destroyer(stream, err);
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
}
function popCallback(streams) {
    validateCallback(streams[streams.length - 1]);
    return streams.pop();
}
function makeAsyncIterable(val) {
    if (isIterable(val)) {
        return val;
    } else if (isReadableNodeStream(val)) {
        return fromReadable(val);
    }
    throw new ERR_INVALID_ARG_TYPE("val", [
        "Readable",
        "Iterable",
        "AsyncIterable"
    ], val);
}
async function* fromReadable(val) {
    yield* Readable.prototype[Symbol.asyncIterator].call(val);
}
async function pump(iterable, writable, finish1) {
    let error15;
    let onresolve2 = null;
    const resume1 = (err)=>{
        if (err) {
            error15 = err;
        }
        if (onresolve2) {
            const callback = onresolve2;
            onresolve2 = null;
            callback();
        }
    };
    const wait = ()=>new Promise((resolve16, reject)=>{
            if (error15) {
                reject(error15);
            } else {
                onresolve2 = ()=>{
                    if (error15) {
                        reject(error15);
                    } else {
                        resolve16();
                    }
                };
            }
        })
    ;
    writable.on("drain", resume1);
    const cleanup = eos(writable, {
        readable: false
    }, resume1);
    try {
        if (writable.writableNeedDrain) {
            await wait();
        }
        for await (const chunk of iterable){
            if (!writable.write(chunk)) {
                await wait();
            }
        }
        writable.end();
        await wait();
        finish1();
    } catch (err) {
        finish1(error15 !== err ? aggregateTwoErrors(error15, err) : err);
    } finally{
        cleanup();
        writable.off("drain", resume1);
    }
}
function pipeline(...streams) {
    const callback = once(popCallback(streams));
    if (Array.isArray(streams[0]) && streams.length === 1) {
        streams = streams[0];
    }
    return pipelineImpl(streams, callback);
}
function pipelineImpl(streams, callback, opts) {
    if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
    }
    const ac = new AbortController();
    const signal = ac.signal;
    const outerSignal = opts?.signal;
    validateAbortSignal(outerSignal, "options.signal");
    function abort() {
        finishImpl(new AbortError());
    }
    outerSignal?.addEventListener("abort", abort);
    let error16;
    let value;
    const destroys = [];
    let finishCount = 0;
    function finish2(err) {
        finishImpl(err, --finishCount === 0);
    }
    function finishImpl(err, __final2) {
        if (err && (!error16 || error16.code === "ERR_STREAM_PREMATURE_CLOSE")) {
            error16 = err;
        }
        if (!error16 && !__final2) {
            return;
        }
        while(destroys.length){
            destroys.shift()(error16);
        }
        outerSignal?.removeEventListener("abort", abort);
        ac.abort();
        if (__final2) {
            callback(error16, value);
        }
    }
    let ret;
    for(let i94 = 0; i94 < streams.length; i94++){
        const stream = streams[i94];
        const reading = i94 < streams.length - 1;
        const writing = i94 > 0;
        if (isNodeStream(stream)) {
            finishCount++;
            destroys.push(destroyer1(stream, reading, writing, finish2));
        }
        if (i94 === 0) {
            if (typeof stream === "function") {
                ret = stream({
                    signal
                });
                if (!isIterable(ret)) {
                    throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
                }
            } else if (isIterable(stream) || isReadableNodeStream(stream)) {
                ret = stream;
            } else {
                ret = Duplex.from(stream);
            }
        } else if (typeof stream === "function") {
            ret = makeAsyncIterable(ret);
            ret = stream(ret, {
                signal
            });
            if (reading) {
                if (!isIterable(ret, true)) {
                    throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i94 - 1}]`, ret);
                }
            } else {
                const pt1 = new PassThrough({
                    objectMode: true
                });
                const then = ret?.then;
                if (typeof then === "function") {
                    then.call(ret, (val)=>{
                        value = val;
                        pt1.end(val);
                    }, (err)=>{
                        pt1.destroy(err);
                    });
                } else if (isIterable(ret, true)) {
                    finishCount++;
                    pump(ret, pt1, finish2);
                } else {
                    throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
                }
                ret = pt1;
                finishCount++;
                destroys.push(destroyer1(ret, false, true, finish2));
            }
        } else if (isNodeStream(stream)) {
            if (isReadableNodeStream(ret)) {
                ret.pipe(stream);
                if (stream === stdio.stdout || stream === stdio.stderr) {
                    ret.on("end", ()=>stream.end()
                    );
                }
            } else {
                ret = makeAsyncIterable(ret);
                finishCount++;
                pump(ret, stream, finish2);
            }
            ret = stream;
        } else {
            ret = Duplex.from(stream);
        }
    }
    if (signal?.aborted || outerSignal?.aborted) {
        nextTick2(abort);
    }
    return ret;
}
class ComposeDuplex extends Duplex {
    constructor(options){
        super(options);
        if (options?.readable === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
        }
        if (options?.writable === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
        }
    }
}
function compose(...streams) {
    if (streams.length === 0) {
        throw new ERR_MISSING_ARGS("streams");
    }
    if (streams.length === 1) {
        return Duplex.from(streams[0]);
    }
    const orgStreams = [
        ...streams
    ];
    if (typeof streams[0] === "function") {
        streams[0] = Duplex.from(streams[0]);
    }
    if (typeof streams[streams.length - 1] === "function") {
        const idx = streams.length - 1;
        streams[idx] = Duplex.from(streams[idx]);
    }
    for(let n = 0; n < streams.length; ++n){
        if (!isNodeStream(streams[n])) {
            continue;
        }
        if (n < streams.length - 1 && !isReadable1(streams[n])) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
        }
        if (n > 0 && !isWritable1(streams[n])) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
        }
    }
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
        const cb = onclose;
        onclose = null;
        if (cb) {
            cb(err);
        } else if (err) {
            d.destroy(err);
        } else if (!readable && !writable) {
            d.destroy();
        }
    }
    const head = streams[0];
    const tail = pipeline(streams, onfinished);
    const writable = !!isWritable1(head);
    const readable = !!isReadable1(tail);
    d = new ComposeDuplex({
        writableObjectMode: !!head?.writableObjectMode,
        readableObjectMode: !!tail?.writableObjectMode,
        writable,
        readable
    });
    if (writable) {
        d._write = function(chunk, encoding, callback) {
            if (head.write(chunk, encoding)) {
                callback();
            } else {
                ondrain = callback;
            }
        };
        d._final = function(callback) {
            head.end();
            onfinish = callback;
        };
        head.on("drain", function() {
            if (ondrain) {
                const cb = ondrain;
                ondrain = null;
                cb();
            }
        });
        tail.on("finish", function() {
            if (onfinish) {
                const cb = onfinish;
                onfinish = null;
                cb();
            }
        });
    }
    if (readable) {
        tail.on("readable", function() {
            if (onreadable) {
                const cb = onreadable;
                onreadable = null;
                cb();
            }
        });
        tail.on("end", function() {
            d.push(null);
        });
        d._read = function() {
            while(true){
                const buf = tail.read();
                if (buf === null) {
                    onreadable = d._read;
                    return;
                }
                if (!d.push(buf)) {
                    return;
                }
            }
        };
    }
    d._destroy = function(err, callback) {
        if (!err && onclose !== null) {
            err = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
            callback(err);
        } else {
            onclose = callback;
            destroyer(tail, err);
        }
    };
    return d;
}
function pipeline1(...streams) {
    return new Promise((resolve17, reject)=>{
        let signal;
        let end;
        const lastArg = streams[streams.length - 1];
        if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg)) {
            const options = streams.pop();
            signal = options.signal;
            end = options.end;
        }
        pipelineImpl(streams, (err, value)=>{
            if (err) {
                reject(err);
            } else {
                resolve17(value);
            }
        }, {
            signal,
            end
        });
    });
}
function finished(stream, opts) {
    return new Promise((resolve18, reject)=>{
        eos(stream, opts, (err)=>{
            if (err) {
                reject(err);
            } else {
                resolve18();
            }
        });
    });
}
const __default6 = {
    finished,
    pipeline: pipeline1
};
const { custom: customPromisify  } = promisify;
Stream.isDisturbed = isDisturbed;
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform;
Stream.PassThrough = PassThrough;
Stream.pipeline = pipeline;
Stream.addAbortSignal = addAbortSignal;
Stream.finished = eos;
Stream.destroy = destroyer;
Stream.compose = compose;
Object.defineProperty(Stream, "promises", {
    configurable: true,
    enumerable: true,
    get () {
        return __default6;
    }
});
Object.defineProperty(pipeline, customPromisify, {
    enumerable: true,
    get () {
        return __default6.pipeline;
    }
});
Object.defineProperty(eos, customPromisify, {
    enumerable: true,
    get () {
        return __default6.finished;
    }
});
Stream.Stream = Stream;
Stream._isUint8Array = isUint8Array;
Stream._uint8ArrayToBuffer = _uint8ArrayToBuffer;
function createWritableStdioStream(writer, name41) {
    const stream = new Writable({
        write (buf, enc, cb) {
            if (!writer) {
                this.destroy(new Error(`Deno.${name41} is not available in this environment`));
                return;
            }
            writer.writeSync(buf instanceof Uint8Array ? buf : Buffer.from(buf, enc));
            cb();
        },
        destroy (err, cb) {
            cb(err);
            this._undestroy();
            if (!this._writableState.emitClose) {
                nextTick(()=>this.emit("close")
                );
            }
        }
    });
    stream.fd = writer?.rid ?? -1;
    stream.destroySoon = stream.destroy;
    stream._isStdio = true;
    stream.once("close", ()=>writer?.close()
    );
    Object.defineProperties(stream, {
        columns: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.(writer?.rid).columns : undefined
        },
        rows: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.(writer?.rid).rows : undefined
        },
        isTTY: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid)
        },
        getWindowSize: {
            enumerable: true,
            configurable: true,
            value: ()=>Deno.isatty?.(writer?.rid) ? Object.values(Deno.consoleSize?.(writer?.rid)) : undefined
        }
    });
    return stream;
}
const stderr = stdio.stderr = createWritableStdioStream(Deno.stderr, "stderr");
const stdout = stdio.stdout = createWritableStdioStream(Deno.stdout, "stdout");
const stdin = stdio.stdin = new Readable({
    highWaterMark: 0,
    emitClose: false,
    read (size) {
        const p14 = Buffer.alloc(size || 16 * 1024);
        if (!Deno.stdin) {
            this.destroy(new Error("Deno.stdin is not available in this environment"));
            return;
        }
        Deno.stdin.read(p14).then((length)=>{
            this.push(length === null ? null : p14.slice(0, length));
        }, (error17)=>{
            this.destroy(error17);
        });
    }
});
stdin.on("close", ()=>Deno.stdin?.close()
);
stdin.fd = Deno.stdin?.rid ?? -1;
Object.defineProperty(stdin, "isTTY", {
    enumerable: true,
    configurable: true,
    get () {
        return Deno.isatty?.(Deno.stdin.rid);
    }
});
stdin._isRawMode = false;
stdin.setRawMode = (enable)=>{
    setRaw?.(Deno.stdin?.rid, enable);
    stdin._isRawMode = enable;
    return stdin;
};
Object.defineProperty(stdin, "isRaw", {
    enumerable: true,
    configurable: true,
    get () {
        return stdin._isRawMode;
    }
});
function registerDestroyHook(_target, _asyncId, _prop) {}
var constants;
(function(constants5) {
    constants5[constants5["kInit"] = 0] = "kInit";
    constants5[constants5["kBefore"] = 1] = "kBefore";
    constants5[constants5["kAfter"] = 2] = "kAfter";
    constants5[constants5["kDestroy"] = 3] = "kDestroy";
    constants5[constants5["kPromiseResolve"] = 4] = "kPromiseResolve";
    constants5[constants5["kTotals"] = 5] = "kTotals";
    constants5[constants5["kCheck"] = 6] = "kCheck";
    constants5[constants5["kExecutionAsyncId"] = 7] = "kExecutionAsyncId";
    constants5[constants5["kTriggerAsyncId"] = 8] = "kTriggerAsyncId";
    constants5[constants5["kAsyncIdCounter"] = 9] = "kAsyncIdCounter";
    constants5[constants5["kDefaultTriggerAsyncId"] = 10] = "kDefaultTriggerAsyncId";
    constants5[constants5["kUsesExecutionAsyncResource"] = 11] = "kUsesExecutionAsyncResource";
    constants5[constants5["kStackLength"] = 12] = "kStackLength";
})(constants || (constants = {}));
const asyncHookFields = new Uint32Array(Object.keys(constants).length);
function newAsyncId() {
    return ++asyncIdFields[constants.kAsyncIdCounter];
}
var UidFields;
(function(UidFields1) {
    UidFields1[UidFields1["kExecutionAsyncId"] = 0] = "kExecutionAsyncId";
    UidFields1[UidFields1["kTriggerAsyncId"] = 1] = "kTriggerAsyncId";
    UidFields1[UidFields1["kAsyncIdCounter"] = 2] = "kAsyncIdCounter";
    UidFields1[UidFields1["kDefaultTriggerAsyncId"] = 3] = "kDefaultTriggerAsyncId";
    UidFields1[UidFields1["kUidFieldsCount"] = 4] = "kUidFieldsCount";
})(UidFields || (UidFields = {}));
const asyncIdFields = new Float64Array(Object.keys(UidFields).length);
asyncIdFields[UidFields.kAsyncIdCounter] = 1;
asyncIdFields[UidFields.kDefaultTriggerAsyncId] = -1;
var providerType;
(function(providerType1) {
    providerType1[providerType1["NONE"] = 0] = "NONE";
    providerType1[providerType1["DIRHANDLE"] = 1] = "DIRHANDLE";
    providerType1[providerType1["DNSCHANNEL"] = 2] = "DNSCHANNEL";
    providerType1[providerType1["ELDHISTOGRAM"] = 3] = "ELDHISTOGRAM";
    providerType1[providerType1["FILEHANDLE"] = 4] = "FILEHANDLE";
    providerType1[providerType1["FILEHANDLECLOSEREQ"] = 5] = "FILEHANDLECLOSEREQ";
    providerType1[providerType1["FIXEDSIZEBLOBCOPY"] = 6] = "FIXEDSIZEBLOBCOPY";
    providerType1[providerType1["FSEVENTWRAP"] = 7] = "FSEVENTWRAP";
    providerType1[providerType1["FSREQCALLBACK"] = 8] = "FSREQCALLBACK";
    providerType1[providerType1["FSREQPROMISE"] = 9] = "FSREQPROMISE";
    providerType1[providerType1["GETADDRINFOREQWRAP"] = 10] = "GETADDRINFOREQWRAP";
    providerType1[providerType1["GETNAMEINFOREQWRAP"] = 11] = "GETNAMEINFOREQWRAP";
    providerType1[providerType1["HEAPSNAPSHOT"] = 12] = "HEAPSNAPSHOT";
    providerType1[providerType1["HTTP2SESSION"] = 13] = "HTTP2SESSION";
    providerType1[providerType1["HTTP2STREAM"] = 14] = "HTTP2STREAM";
    providerType1[providerType1["HTTP2PING"] = 15] = "HTTP2PING";
    providerType1[providerType1["HTTP2SETTINGS"] = 16] = "HTTP2SETTINGS";
    providerType1[providerType1["HTTPINCOMINGMESSAGE"] = 17] = "HTTPINCOMINGMESSAGE";
    providerType1[providerType1["HTTPCLIENTREQUEST"] = 18] = "HTTPCLIENTREQUEST";
    providerType1[providerType1["JSSTREAM"] = 19] = "JSSTREAM";
    providerType1[providerType1["JSUDPWRAP"] = 20] = "JSUDPWRAP";
    providerType1[providerType1["MESSAGEPORT"] = 21] = "MESSAGEPORT";
    providerType1[providerType1["PIPECONNECTWRAP"] = 22] = "PIPECONNECTWRAP";
    providerType1[providerType1["PIPESERVERWRAP"] = 23] = "PIPESERVERWRAP";
    providerType1[providerType1["PIPEWRAP"] = 24] = "PIPEWRAP";
    providerType1[providerType1["PROCESSWRAP"] = 25] = "PROCESSWRAP";
    providerType1[providerType1["PROMISE"] = 26] = "PROMISE";
    providerType1[providerType1["QUERYWRAP"] = 27] = "QUERYWRAP";
    providerType1[providerType1["SHUTDOWNWRAP"] = 28] = "SHUTDOWNWRAP";
    providerType1[providerType1["SIGNALWRAP"] = 29] = "SIGNALWRAP";
    providerType1[providerType1["STATWATCHER"] = 30] = "STATWATCHER";
    providerType1[providerType1["STREAMPIPE"] = 31] = "STREAMPIPE";
    providerType1[providerType1["TCPCONNECTWRAP"] = 32] = "TCPCONNECTWRAP";
    providerType1[providerType1["TCPSERVERWRAP"] = 33] = "TCPSERVERWRAP";
    providerType1[providerType1["TCPWRAP"] = 34] = "TCPWRAP";
    providerType1[providerType1["TTYWRAP"] = 35] = "TTYWRAP";
    providerType1[providerType1["UDPSENDWRAP"] = 36] = "UDPSENDWRAP";
    providerType1[providerType1["UDPWRAP"] = 37] = "UDPWRAP";
    providerType1[providerType1["SIGINTWATCHDOG"] = 38] = "SIGINTWATCHDOG";
    providerType1[providerType1["WORKER"] = 39] = "WORKER";
    providerType1[providerType1["WORKERHEAPSNAPSHOT"] = 40] = "WORKERHEAPSNAPSHOT";
    providerType1[providerType1["WRITEWRAP"] = 41] = "WRITEWRAP";
    providerType1[providerType1["ZLIB"] = 42] = "ZLIB";
})(providerType || (providerType = {}));
const kInvalidAsyncId = -1;
class AsyncWrap {
    provider = providerType.NONE;
    asyncId = kInvalidAsyncId;
    constructor(provider){
        this.provider = provider;
        this.getAsyncId();
    }
    getAsyncId() {
        this.asyncId = this.asyncId === kInvalidAsyncId ? newAsyncId() : this.asyncId;
        return this.asyncId;
    }
    getProviderType() {
        return this.provider;
    }
}
const mod9 = {
    async_hook_fields: asyncHookFields,
    asyncIdFields: asyncIdFields,
    registerDestroyHook: registerDestroyHook,
    constants: constants,
    newAsyncId: newAsyncId,
    UidFields: UidFields,
    providerType: providerType,
    AsyncWrap: AsyncWrap
};
const mod10 = {};
const v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
const IPv4Reg = new RegExp(`^${v4Str}$`);
const v6Seg = "(?:[0-9a-fA-F]{1,4})";
const IPv6Reg = new RegExp("^(" + `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` + `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` + `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` + `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` + `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` + `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` + `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` + `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` + ")(%[0-9a-zA-Z-.:]{1,})?$");
function isIPv4(ip) {
    return RegExp.prototype.test.call(IPv4Reg, ip);
}
function isIPv6(ip) {
    return RegExp.prototype.test.call(IPv6Reg, ip);
}
function isIP(ip) {
    if (isIPv4(ip)) {
        return 4;
    }
    if (isIPv6(ip)) {
        return 6;
    }
    return 0;
}
const normalizedArgsSymbol = Symbol("normalizedArgs");
const AI_V4MAPPED = 1 << 4;
const AI_ALL = 1 << 5;
const AI_ADDRCONFIG = 1 << 6;
function ares_strerror(code37) {
    const errorText = [
        "Successful completion",
        "DNS server returned answer with no data",
        "DNS server claims query was misformatted",
        "DNS server returned general failure",
        "Domain name not found",
        "DNS server does not implement requested operation",
        "DNS server refused query",
        "Misformatted DNS query",
        "Misformatted domain name",
        "Unsupported address family",
        "Misformatted DNS reply",
        "Could not contact DNS servers",
        "Timeout while contacting DNS servers",
        "End of file",
        "Error reading file",
        "Out of memory",
        "Channel is being destroyed",
        "Misformatted string",
        "Illegal flags specified",
        "Given hostname is not numeric",
        "Illegal hints flags specified",
        "c-ares library initialization not yet performed",
        "Error loading iphlpapi.dll",
        "Could not find GetNetworkParams function",
        "DNS query cancelled", 
    ];
    if (code37 >= 0 && code37 < errorText.length) {
        return errorText[code37];
    } else {
        return "unknown";
    }
}
class GetAddrInfoReqWrap extends AsyncWrap {
    family;
    hostname;
    callback;
    resolve;
    reject;
    oncomplete;
    constructor(){
        super(providerType.GETADDRINFOREQWRAP);
    }
}
function getaddrinfo(req, hostname4, family, _hints, verbatim) {
    let addresses = [];
    const recordTypes = [];
    if (family === 0 || family === 4) {
        recordTypes.push("A");
    }
    if (family === 0 || family === 6) {
        recordTypes.push("AAAA");
    }
    (async ()=>{
        await Promise.allSettled(recordTypes.map((recordType)=>Deno.resolveDns(hostname4, recordType).then((records)=>{
                records.forEach((record)=>addresses.push(record)
                );
            })
        ));
        const error18 = addresses.length ? 0 : codeMap.get("EAI_NODATA");
        if (!verbatim) {
            addresses.sort((a, b15)=>{
                if (isIPv4(a)) {
                    return -1;
                } else if (isIPv4(b15)) {
                    return 1;
                }
                return 0;
            });
        }
        if (isWindows && hostname4 === "localhost") {
            addresses = addresses.filter((address)=>isIPv4(address)
            );
        }
        req.oncomplete(error18, addresses);
    })();
    return 0;
}
class QueryReqWrap extends AsyncWrap {
    bindingName;
    hostname;
    ttl;
    callback;
    resolve;
    reject;
    oncomplete;
    constructor(){
        super(providerType.QUERYWRAP);
    }
}
class ChannelWrap extends AsyncWrap {
    #timeout;
    #tries;
    constructor(timeout, tries){
        super(providerType.DNSCHANNEL);
        this.#timeout = timeout;
        this.#tries = tries;
    }
    async #query(query, recordType) {
        let ret = [];
        let code = 0;
        try {
            ret = await Deno.resolveDns(query, recordType);
        } catch (e) {
            if (e instanceof Deno.errors.NotFound) {
                code = codeMap.get("EAI_NODATA");
            } else {
                code = codeMap.get("UNKNOWN");
            }
        }
        return {
            code,
            ret
        };
    }
    queryAny(req, name42) {
        (async ()=>{
            const records = [];
            await Promise.allSettled([
                this.#query(name42, "A").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "A",
                            address: record
                        })
                    );
                }),
                this.#query(name42, "AAAA").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "AAAA",
                            address: record
                        })
                    );
                }),
                this.#query(name42, "CNAME").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "CNAME",
                            value: record
                        })
                    );
                }),
                this.#query(name42, "MX").then(({ ret  })=>{
                    ret.forEach(({ preference , exchange  })=>records.push({
                            type: "MX",
                            priority: preference,
                            exchange
                        })
                    );
                }),
                this.#query(name42, "PTR").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "PTR",
                            value: record
                        })
                    );
                }),
                this.#query(name42, "SRV").then(({ ret  })=>{
                    ret.forEach(({ priority , weight , port , target  })=>records.push({
                            type: "SRV",
                            priority,
                            weight,
                            port,
                            name: target
                        })
                    );
                }),
                this.#query(name42, "TXT").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "TXT",
                            entries: record
                        })
                    );
                }), 
            ]);
            const err = records.length ? 0 : codeMap.get("EAI_NODATA");
            req.oncomplete(err, records);
        })();
        return 0;
    }
    queryA(req, name43) {
        this.#query(name43, "A").then(({ code: code38 , ret  })=>{
            req.oncomplete(code38, ret);
        });
        return 0;
    }
    queryAaaa(req, name44) {
        this.#query(name44, "AAAA").then(({ code: code39 , ret  })=>{
            req.oncomplete(code39, ret);
        });
        return 0;
    }
    queryCaa(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.queryCaa");
    }
    queryCname(req, name45) {
        this.#query(name45, "CNAME").then(({ code: code40 , ret  })=>{
            req.oncomplete(code40, ret);
        });
        return 0;
    }
    queryMx(req, name46) {
        this.#query(name46, "MX").then(({ code: code41 , ret  })=>{
            const records = ret.map(({ preference , exchange  })=>({
                    priority: preference,
                    exchange
                })
            );
            req.oncomplete(code41, records);
        });
        return 0;
    }
    queryNs(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.queryNs");
    }
    queryTxt(req, name47) {
        this.#query(name47, "TXT").then(({ code: code42 , ret  })=>{
            req.oncomplete(code42, ret);
        });
        return 0;
    }
    querySrv(req, name48) {
        this.#query(name48, "SRV").then(({ code: code43 , ret  })=>{
            const records = ret.map(({ priority , weight , port , target  })=>({
                    priority,
                    weight,
                    port,
                    name: target
                })
            );
            req.oncomplete(code43, records);
        });
        return 0;
    }
    queryPtr(req, name49) {
        this.#query(name49, "PTR").then(({ code: code44 , ret  })=>{
            req.oncomplete(code44, ret);
        });
        return 0;
    }
    queryNaptr(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.queryNaptr");
    }
    querySoa(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.querySoa");
    }
    getHostByAddr(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.getHostByAddr");
    }
    getServers() {
        notImplemented("cares.ChannelWrap.prototype.getServers");
    }
    setServers(_servers) {
        notImplemented("cares.ChannelWrap.prototype.setServers");
    }
    setLocalAddress(_addr0, _addr1) {
        notImplemented("cares.ChannelWrap.prototype.setLocalAddress");
    }
    cancel() {
        notImplemented("cares.ChannelWrap.prototype.cancel");
    }
}
const DNS_ESETSRVPENDING = -1000;
const EMSG_ESETSRVPENDING = "There are pending queries.";
function strerror(code45) {
    return code45 === DNS_ESETSRVPENDING ? EMSG_ESETSRVPENDING : ares_strerror(code45);
}
const mod11 = {
    GetAddrInfoReqWrap: GetAddrInfoReqWrap,
    getaddrinfo: getaddrinfo,
    QueryReqWrap: QueryReqWrap,
    ChannelWrap: ChannelWrap,
    strerror: strerror
};
const mod12 = {};
const mod13 = {};
const mod14 = {};
const mod15 = {};
const mod16 = {};
const mod17 = {};
const mod18 = {};
const mod19 = {};
const mod20 = {};
const mod21 = {};
const mod22 = {};
const mod23 = {};
const mod24 = {};
const mod25 = {};
const mod26 = {};
const mod27 = {};
const mod28 = {};
const mod29 = {};
class HandleWrap extends AsyncWrap {
    constructor(provider){
        super(provider);
    }
    close(cb = ()=>{}) {
        this._onClose();
        cb();
    }
    ref() {
        notImplemented("HandleWrap.prototype.ref");
    }
    unref() {
        notImplemented("HandleWrap.prototype.unref");
    }
    _onClose() {}
}
var StreamBaseStateFields;
(function(StreamBaseStateFields1) {
    StreamBaseStateFields1[StreamBaseStateFields1["kReadBytesOrError"] = 0] = "kReadBytesOrError";
    StreamBaseStateFields1[StreamBaseStateFields1["kArrayBufferOffset"] = 1] = "kArrayBufferOffset";
    StreamBaseStateFields1[StreamBaseStateFields1["kBytesWritten"] = 2] = "kBytesWritten";
    StreamBaseStateFields1[StreamBaseStateFields1["kLastWriteWasAsync"] = 3] = "kLastWriteWasAsync";
    StreamBaseStateFields1[StreamBaseStateFields1["kNumStreamBaseStateFields"] = 4] = "kNumStreamBaseStateFields";
})(StreamBaseStateFields || (StreamBaseStateFields = {}));
const kReadBytesOrError = StreamBaseStateFields.kReadBytesOrError;
const kArrayBufferOffset = StreamBaseStateFields.kArrayBufferOffset;
const kBytesWritten = StreamBaseStateFields.kBytesWritten;
const kLastWriteWasAsync = StreamBaseStateFields.kLastWriteWasAsync;
const kNumStreamBaseStateFields = StreamBaseStateFields.kNumStreamBaseStateFields;
const streamBaseState = new Uint8Array(5);
streamBaseState[kLastWriteWasAsync] = 1;
class WriteWrap extends AsyncWrap {
    handle;
    oncomplete;
    async;
    bytes;
    buffer;
    callback;
    _chunks;
    constructor(){
        super(providerType.WRITEWRAP);
    }
}
class ShutdownWrap extends AsyncWrap {
    handle;
    oncomplete;
    callback;
    constructor(){
        super(providerType.SHUTDOWNWRAP);
    }
}
const kStreamBaseField = Symbol("kStreamBaseField");
const SUGGESTED_SIZE = 64 * 1024;
class LibuvStreamWrap extends HandleWrap {
    [kStreamBaseField];
    reading;
    #reading = false;
    destroyed = false;
    writeQueueSize = 0;
    bytesRead = 0;
    bytesWritten = 0;
    onread;
    constructor(provider, stream){
        super(provider);
        this.#attachToObject(stream);
    }
    readStart() {
        if (!this.#reading) {
            this.#reading = true;
            this.#read();
        }
        return 0;
    }
    readStop() {
        this.#reading = false;
        return 0;
    }
    shutdown(req) {
        const status = this._onClose();
        try {
            req.oncomplete(status);
        } catch  {}
        return 0;
    }
    useUserBuffer(_userBuf) {
        notImplemented("LibuvStreamWrap.prototype.useUserBuffer");
    }
    writeBuffer(req, data) {
        this.#write(req, data);
        return 0;
    }
    writev(req, chunks, allBuffers) {
        const count = allBuffers ? chunks.length : chunks.length >> 1;
        const buffers = new Array(count);
        if (!allBuffers) {
            for(let i95 = 0; i95 < count; i95++){
                const chunk = chunks[i95 * 2];
                if (Buffer.isBuffer(chunk)) {
                    buffers[i95] = chunk;
                }
                const encoding = chunks[i95 * 2 + 1];
                buffers[i95] = Buffer.from(chunk, encoding);
            }
        } else {
            for(let i96 = 0; i96 < count; i96++){
                buffers[i96] = chunks[i96];
            }
        }
        return this.writeBuffer(req, Buffer.concat(buffers));
    }
    writeAsciiString(req, data) {
        const buffer = new TextEncoder().encode(data);
        return this.writeBuffer(req, buffer);
    }
    writeUtf8String(req, data) {
        const buffer = new TextEncoder().encode(data);
        return this.writeBuffer(req, buffer);
    }
    writeUcs2String(_req, _data) {
        notImplemented("LibuvStreamWrap.prototype.writeUcs2String");
    }
    writeLatin1String(req, data) {
        const buffer = Buffer.from(data, "latin1");
        return this.writeBuffer(req, buffer);
    }
    _onClose() {
        let status = 0;
        this.#reading = false;
        try {
            this[kStreamBaseField]?.close();
        } catch  {
            status = codeMap.get("ENOTCONN");
        }
        return status;
    }
     #attachToObject(stream) {
        this[kStreamBaseField] = stream;
    }
    async #read() {
        let buf = new Uint8Array(SUGGESTED_SIZE);
        let nread;
        try {
            nread = await this[kStreamBaseField].read(buf);
        } catch (e) {
            if (e instanceof Deno.errors.Interrupted || e instanceof Deno.errors.BadResource) {
                nread = codeMap.get("EOF");
            } else if (e instanceof Deno.errors.ConnectionReset || e instanceof Deno.errors.ConnectionAborted) {
                nread = codeMap.get("ECONNRESET");
            } else {
                nread = codeMap.get("UNKNOWN");
            }
            buf = new Uint8Array(0);
        }
        nread ??= codeMap.get("EOF");
        streamBaseState[kReadBytesOrError] = nread;
        if (nread > 0) {
            this.bytesRead += nread;
        }
        buf = buf.slice(0, nread);
        streamBaseState[kArrayBufferOffset] = 0;
        try {
            this.onread(buf, nread);
        } catch  {}
        if (nread >= 0 && this.#reading) {
            this.#read();
        }
    }
    async #write(req, data) {
        const { byteLength  } = data;
        try {
            await writeAll(this[kStreamBaseField], data);
        } catch (e) {
            let status;
            if (e instanceof Deno.errors.BadResource || e instanceof Deno.errors.BrokenPipe) {
                status = codeMap.get("EBADF");
            } else {
                status = codeMap.get("UNKNOWN");
            }
            try {
                req.oncomplete(status);
            } catch  {}
            return;
        }
        streamBaseState[kBytesWritten] = byteLength;
        this.bytesWritten += byteLength;
        try {
            req.oncomplete(0);
        } catch  {}
        return;
    }
}
const mod30 = {
    kReadBytesOrError: kReadBytesOrError,
    kArrayBufferOffset: kArrayBufferOffset,
    kBytesWritten: kBytesWritten,
    kLastWriteWasAsync: kLastWriteWasAsync,
    kNumStreamBaseStateFields: kNumStreamBaseStateFields,
    streamBaseState: streamBaseState,
    WriteWrap: WriteWrap,
    ShutdownWrap: ShutdownWrap,
    kStreamBaseField: kStreamBaseField,
    LibuvStreamWrap: LibuvStreamWrap
};
class ConnectionWrap extends LibuvStreamWrap {
    onconnection = null;
    constructor(provider, object){
        super(provider, object);
    }
    afterConnect(req1, status) {
        const isSuccessStatus = !status;
        const readable = isSuccessStatus;
        const writable = isSuccessStatus;
        try {
            req1.oncomplete(status, this, req1, readable, writable);
        } catch  {}
        return;
    }
}
function ceilPowOf2(n) {
    const roundPowOf2 = 1 << 31 - Math.clz32(n);
    return roundPowOf2 < n ? roundPowOf2 * 2 : roundPowOf2;
}
const INITIAL_ACCEPT_BACKOFF_DELAY = 5;
const MAX_ACCEPT_BACKOFF_DELAY = 1000;
var socketType;
(function(socketType2) {
    socketType2[socketType2["SOCKET"] = 0] = "SOCKET";
    socketType2[socketType2["SERVER"] = 1] = "SERVER";
    socketType2[socketType2["IPC"] = 2] = "IPC";
})(socketType || (socketType = {}));
class Pipe extends ConnectionWrap {
    reading = false;
    ipc;
    #pendingInstances = 4;
    #address;
    #backlog;
    #listener;
    #connections = 0;
    #closed = false;
    #acceptBackoffDelay;
    constructor(type30, conn){
        let provider;
        let ipc;
        switch(type30){
            case socketType.SOCKET:
                {
                    provider = providerType.PIPEWRAP;
                    ipc = false;
                    break;
                }
            case socketType.SERVER:
                {
                    provider = providerType.PIPESERVERWRAP;
                    ipc = false;
                    break;
                }
            case socketType.IPC:
                {
                    provider = providerType.PIPEWRAP;
                    ipc = true;
                    break;
                }
            default:
                {
                    unreachable();
                }
        }
        super(provider, conn);
        this.ipc = ipc;
        if (conn && provider === providerType.PIPEWRAP) {
            const localAddr = conn.localAddr;
            this.#address = localAddr.path;
        }
    }
    open(_fd) {
        notImplemented("Pipe.prototype.open");
    }
    bind(name50) {
        this.#address = name50;
        return 0;
    }
    connect(req2, address) {
        if (isWindows) {
            notImplemented("Pipe.prototype.connect - Windows");
        }
        const connectOptions = {
            path: address,
            transport: "unix"
        };
        connect(connectOptions).then((conn)=>{
            const localAddr = conn.localAddr;
            this.#address = req2.address = localAddr.path;
            this[kStreamBaseField] = conn;
            try {
                this.afterConnect(req2, 0);
            } catch  {}
        }, (e)=>{
            let code46;
            if (e instanceof Deno.errors.NotFound) {
                code46 = codeMap.get("ENOENT");
            } else if (e instanceof Deno.errors.PermissionDenied) {
                code46 = codeMap.get("EACCES");
            } else {
                code46 = codeMap.get("ECONNREFUSED");
            }
            try {
                this.afterConnect(req2, code46);
            } catch  {}
        });
        return 0;
    }
    listen(backlog) {
        if (isWindows) {
            notImplemented("Pipe.prototype.listen - Windows");
        }
        this.#backlog = isWindows ? this.#pendingInstances : ceilPowOf2(backlog + 1);
        const listenOptions = {
            path: this.#address,
            transport: "unix"
        };
        let listener;
        try {
            listener = listen(listenOptions);
        } catch (e) {
            if (e instanceof Deno.errors.AddrInUse) {
                return codeMap.get("EADDRINUSE");
            } else if (e instanceof Deno.errors.AddrNotAvailable) {
                return codeMap.get("EADDRNOTAVAIL");
            }
            return codeMap.get("UNKNOWN");
        }
        const address = listener.addr;
        this.#address = address.path;
        this.#listener = listener;
        this.#accept();
        return 0;
    }
    ref() {
        if (this.#listener) {
            ListenerRef(this.#listener);
        }
    }
    unref() {
        if (this.#listener) {
            ListenerUnref(this.#listener);
        }
    }
    setPendingInstances(instances) {
        this.#pendingInstances = instances;
    }
    fchmod(mode) {
        if (mode != constants1.UV_READABLE && mode != constants1.UV_WRITABLE && mode != (constants1.UV_WRITABLE | constants1.UV_READABLE)) {
            return codeMap.get("EINVAL");
        }
        let desired_mode = 0;
        if (mode & constants1.UV_READABLE) {
            desired_mode |= fs.S_IRUSR | fs.S_IRGRP | fs.S_IROTH;
        }
        if (mode & constants1.UV_WRITABLE) {
            desired_mode |= fs.S_IWUSR | fs.S_IWGRP | fs.S_IWOTH;
        }
        try {
            Deno.chmodSync(this.#address, desired_mode);
        } catch  {
            return codeMap.get("UNKNOWN");
        }
        return 0;
    }
    async #acceptBackoff() {
        if (!this.#acceptBackoffDelay) {
            this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
        } else {
            this.#acceptBackoffDelay *= 2;
        }
        if (this.#acceptBackoffDelay >= 1000) {
            this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
        }
        await delay(this.#acceptBackoffDelay);
        this.#accept();
    }
    async #accept() {
        if (this.#closed) {
            return;
        }
        if (this.#connections > this.#backlog) {
            this.#acceptBackoff();
            return;
        }
        let connection;
        try {
            connection = await this.#listener.accept();
        } catch (e) {
            if (e instanceof Deno.errors.BadResource && this.#closed) {
                return;
            }
            try {
                this.onconnection(codeMap.get("UNKNOWN"), undefined);
            } catch  {}
            this.#acceptBackoff();
            return;
        }
        this.#acceptBackoffDelay = undefined;
        const connectionHandle = new Pipe(socketType.SOCKET, connection);
        this.#connections++;
        try {
            this.onconnection(0, connectionHandle);
        } catch  {}
        return this.#accept();
    }
    _onClose() {
        this.#closed = true;
        this.reading = false;
        this.#address = undefined;
        this.#backlog = undefined;
        this.#connections = 0;
        this.#acceptBackoffDelay = undefined;
        if (this.provider === providerType.PIPESERVERWRAP) {
            try {
                this.#listener.close();
            } catch  {}
        }
        return LibuvStreamWrap.prototype._onClose.call(this);
    }
}
class PipeConnectWrap extends AsyncWrap {
    oncomplete;
    address;
    constructor(){
        super(providerType.PIPECONNECTWRAP);
    }
}
var constants1;
(function(constants6) {
    constants6[constants6["SOCKET"] = socketType.SOCKET] = "SOCKET";
    constants6[constants6["SERVER"] = socketType.SERVER] = "SERVER";
    constants6[constants6["IPC"] = socketType.IPC] = "IPC";
    constants6[constants6["UV_READABLE"] = 1] = "UV_READABLE";
    constants6[constants6["UV_WRITABLE"] = 2] = "UV_WRITABLE";
})(constants1 || (constants1 = {}));
const mod31 = {
    socketType: socketType,
    Pipe: Pipe,
    PipeConnectWrap: PipeConnectWrap,
    constants: constants1
};
const mod32 = {};
const mod33 = {};
const mod34 = {};
const mod35 = {};
const mod36 = {};
const mod37 = {};
const asyncIdSymbol = Symbol("asyncIdSymbol");
const ownerSymbol = Symbol("ownerSymbol");
const mod38 = {
    asyncIdSymbol: asyncIdSymbol,
    ownerSymbol: ownerSymbol
};
const mod39 = {};
var socketType1;
(function(socketType3) {
    socketType3[socketType3["SOCKET"] = 0] = "SOCKET";
    socketType3[socketType3["SERVER"] = 1] = "SERVER";
})(socketType1 || (socketType1 = {}));
class TCPConnectWrap extends AsyncWrap {
    oncomplete;
    address;
    port;
    localAddress;
    localPort;
    constructor(){
        super(providerType.TCPCONNECTWRAP);
    }
}
var constants2;
(function(constants7) {
    constants7[constants7["SOCKET"] = socketType1.SOCKET] = "SOCKET";
    constants7[constants7["SERVER"] = socketType1.SERVER] = "SERVER";
    constants7[constants7["UV_TCP_IPV6ONLY"] = 0] = "UV_TCP_IPV6ONLY";
})(constants2 || (constants2 = {}));
class TCP extends ConnectionWrap {
    [ownerSymbol] = null;
    reading = false;
    #address;
    #port;
    #remoteAddress;
    #remoteFamily;
    #remotePort;
    #backlog;
    #listener;
    #connections = 0;
    #closed = false;
    #acceptBackoffDelay;
    constructor(type31, conn){
        let provider;
        switch(type31){
            case socketType1.SOCKET:
                {
                    provider = providerType.TCPWRAP;
                    break;
                }
            case socketType1.SERVER:
                {
                    provider = providerType.TCPSERVERWRAP;
                    break;
                }
            default:
                {
                    unreachable();
                }
        }
        super(provider, conn);
        if (conn && provider === providerType.TCPWRAP) {
            const localAddr = conn.localAddr;
            this.#address = localAddr.hostname;
            this.#port = localAddr.port;
            const remoteAddr = conn.remoteAddr;
            this.#remoteAddress = remoteAddr.hostname;
            this.#remotePort = remoteAddr.port;
            this.#remoteFamily = isIP(remoteAddr.hostname);
        }
    }
    open(_fd) {
        notImplemented("TCP.prototype.open");
    }
    bind(address, port) {
        return this.#bind(address, port, 0);
    }
    bind6(address, port, flags) {
        return this.#bind(address, port, flags);
    }
    connect(req3, address, port) {
        return this.#connect(req3, address, port);
    }
    connect6(req4, address, port) {
        return this.#connect(req4, address, port);
    }
    listen(backlog) {
        this.#backlog = ceilPowOf2(backlog + 1);
        const listenOptions = {
            hostname: this.#address,
            port: this.#port,
            transport: "tcp"
        };
        let listener;
        try {
            listener = Deno.listen(listenOptions);
        } catch (e) {
            if (e instanceof Deno.errors.AddrInUse) {
                return codeMap.get("EADDRINUSE");
            } else if (e instanceof Deno.errors.AddrNotAvailable) {
                return codeMap.get("EADDRNOTAVAIL");
            }
            return codeMap.get("UNKNOWN");
        }
        const address = listener.addr;
        this.#address = address.hostname;
        this.#port = address.port;
        this.#listener = listener;
        this.#accept();
        return 0;
    }
    ref() {
        if (this.#listener) {
            ListenerRef(this.#listener);
        }
    }
    unref() {
        if (this.#listener) {
            ListenerUnref(this.#listener);
        }
    }
    getsockname(sockname) {
        if (typeof this.#address === "undefined" || typeof this.#port === "undefined") {
            return codeMap.get("EADDRNOTAVAIL");
        }
        sockname.address = this.#address;
        sockname.port = this.#port;
        sockname.family = isIP(this.#address);
        return 0;
    }
    getpeername(peername) {
        if (typeof this.#remoteAddress === "undefined" || typeof this.#remotePort === "undefined") {
            return codeMap.get("EADDRNOTAVAIL");
        }
        peername.address = this.#remoteAddress;
        peername.port = this.#remotePort;
        peername.family = this.#remoteFamily;
        return 0;
    }
    setNoDelay(_noDelay) {
        return 0;
    }
    setKeepAlive(_enable, _initialDelay) {
        return 0;
    }
    setSimultaneousAccepts(_enable) {
        notImplemented("TCP.prototype.setSimultaneousAccepts");
    }
     #bind(address, port, _flags) {
        this.#address = address;
        this.#port = port;
        return 0;
    }
     #connect(req5, address1, port1) {
        this.#remoteAddress = address1;
        this.#remotePort = port1;
        this.#remoteFamily = isIP(address1);
        const connectOptions = {
            hostname: address1,
            port: port1,
            transport: "tcp"
        };
        Deno.connect(connectOptions).then((conn)=>{
            const localAddr = conn.localAddr;
            this.#address = req5.localAddress = localAddr.hostname;
            this.#port = req5.localPort = localAddr.port;
            this[kStreamBaseField] = conn;
            try {
                this.afterConnect(req5, 0);
            } catch  {}
        }, ()=>{
            try {
                this.afterConnect(req5, codeMap.get("ECONNREFUSED"));
            } catch  {}
        });
        return 0;
    }
    async #acceptBackoff() {
        if (!this.#acceptBackoffDelay) {
            this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
        } else {
            this.#acceptBackoffDelay *= 2;
        }
        if (this.#acceptBackoffDelay >= 1000) {
            this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
        }
        await delay(this.#acceptBackoffDelay);
        this.#accept();
    }
    async #accept() {
        if (this.#closed) {
            return;
        }
        if (this.#connections > this.#backlog) {
            this.#acceptBackoff();
            return;
        }
        let connection;
        try {
            connection = await this.#listener.accept();
        } catch (e) {
            if (e instanceof Deno.errors.BadResource && this.#closed) {
                return;
            }
            try {
                this.onconnection(codeMap.get("UNKNOWN"), undefined);
            } catch  {}
            this.#acceptBackoff();
            return;
        }
        this.#acceptBackoffDelay = undefined;
        const connectionHandle = new TCP(socketType1.SOCKET, connection);
        this.#connections++;
        try {
            this.onconnection(0, connectionHandle);
        } catch  {}
        return this.#accept();
    }
    _onClose() {
        this.#closed = true;
        this.reading = false;
        this.#address = undefined;
        this.#port = undefined;
        this.#remoteAddress = undefined;
        this.#remoteFamily = undefined;
        this.#remotePort = undefined;
        this.#backlog = undefined;
        this.#connections = 0;
        this.#acceptBackoffDelay = undefined;
        if (this.provider === providerType.TCPSERVERWRAP) {
            try {
                this.#listener.close();
            } catch  {}
        }
        return LibuvStreamWrap.prototype._onClose.call(this);
    }
}
const mod40 = {
    TCPConnectWrap: TCPConnectWrap,
    constants: constants2,
    TCP: TCP
};
const mod41 = {};
const mod42 = {};
const mod43 = {};
const mod44 = {};
const mod45 = {};
const mod46 = {};
const mod47 = {};
const mod48 = {};
const mod49 = {};
const modules = {
    "async_wrap": mod9,
    buffer: mod6,
    "cares_wrap": mod11,
    config: mod10,
    constants: mod3,
    contextify: mod12,
    credentials: mod14,
    crypto: mod13,
    errors: mod15,
    fs: mod16,
    "fs_dir": mod17,
    "fs_event_wrap": mod18,
    "heap_utils": mod19,
    "http_parser": mod20,
    icu: mod21,
    inspector: mod22,
    "js_stream": mod23,
    messaging: mod24,
    "module_wrap": mod25,
    "native_module": mod26,
    natives: mod27,
    options: mod28,
    os: mod29,
    performance: mod32,
    "pipe_wrap": mod31,
    "process_methods": mod33,
    report: mod34,
    serdes: mod35,
    "signal_wrap": mod36,
    "spawn_sync": mod37,
    "stream_wrap": mod30,
    "string_decoder": mod5,
    symbols: mod38,
    "task_queue": mod39,
    "tcp_wrap": mod40,
    timers: mod41,
    "tls_wrap": mod42,
    "trace_events": mod43,
    "tty_wrap": mod44,
    types: mod,
    "udp_wrap": mod45,
    url: mod46,
    util: mod2,
    uv: mod4,
    v8: mod47,
    worker: mod48,
    zlib: mod49
};
function getBinding(name51) {
    const mod54 = modules[name51];
    if (!mod54) {
        throw new Error(`No such module: ${name51}`);
    }
    return mod54;
}
const kInternal = Symbol("internal properties");
const replaceUnderscoresRegex = /_/g;
const leadingDashesRegex = /^--?/;
const trailingValuesRegex = /=.*$/;
function buildAllowedFlags() {
    const allowedNodeEnvironmentFlags = [
        "--track-heap-objects",
        "--no-track-heap-objects",
        "--node-snapshot",
        "--no-node-snapshot",
        "--require",
        "--max-old-space-size",
        "--trace-exit",
        "--no-trace-exit",
        "--disallow-code-generation-from-strings",
        "--experimental-json-modules",
        "--no-experimental-json-modules",
        "--interpreted-frames-native-stack",
        "--inspect-brk",
        "--no-inspect-brk",
        "--trace-tls",
        "--no-trace-tls",
        "--stack-trace-limit",
        "--experimental-repl-await",
        "--no-experimental-repl-await",
        "--preserve-symlinks",
        "--no-preserve-symlinks",
        "--report-uncaught-exception",
        "--no-report-uncaught-exception",
        "--experimental-modules",
        "--no-experimental-modules",
        "--report-signal",
        "--jitless",
        "--inspect-port",
        "--heapsnapshot-near-heap-limit",
        "--tls-keylog",
        "--force-context-aware",
        "--no-force-context-aware",
        "--napi-modules",
        "--abort-on-uncaught-exception",
        "--diagnostic-dir",
        "--verify-base-objects",
        "--no-verify-base-objects",
        "--unhandled-rejections",
        "--perf-basic-prof",
        "--trace-atomics-wait",
        "--no-trace-atomics-wait",
        "--deprecation",
        "--no-deprecation",
        "--perf-basic-prof-only-functions",
        "--perf-prof",
        "--max-http-header-size",
        "--report-on-signal",
        "--no-report-on-signal",
        "--throw-deprecation",
        "--no-throw-deprecation",
        "--warnings",
        "--no-warnings",
        "--force-fips",
        "--no-force-fips",
        "--pending-deprecation",
        "--no-pending-deprecation",
        "--input-type",
        "--tls-max-v1.3",
        "--no-tls-max-v1.3",
        "--tls-min-v1.2",
        "--no-tls-min-v1.2",
        "--inspect",
        "--no-inspect",
        "--heapsnapshot-signal",
        "--trace-warnings",
        "--no-trace-warnings",
        "--trace-event-categories",
        "--experimental-worker",
        "--tls-max-v1.2",
        "--no-tls-max-v1.2",
        "--perf-prof-unwinding-info",
        "--preserve-symlinks-main",
        "--no-preserve-symlinks-main",
        "--policy-integrity",
        "--experimental-wasm-modules",
        "--no-experimental-wasm-modules",
        "--node-memory-debug",
        "--inspect-publish-uid",
        "--tls-min-v1.3",
        "--no-tls-min-v1.3",
        "--experimental-specifier-resolution",
        "--secure-heap",
        "--tls-min-v1.0",
        "--no-tls-min-v1.0",
        "--redirect-warnings",
        "--experimental-report",
        "--trace-event-file-pattern",
        "--trace-uncaught",
        "--no-trace-uncaught",
        "--experimental-loader",
        "--http-parser",
        "--dns-result-order",
        "--trace-sigint",
        "--no-trace-sigint",
        "--secure-heap-min",
        "--enable-fips",
        "--no-enable-fips",
        "--enable-source-maps",
        "--no-enable-source-maps",
        "--insecure-http-parser",
        "--no-insecure-http-parser",
        "--use-openssl-ca",
        "--no-use-openssl-ca",
        "--tls-cipher-list",
        "--experimental-top-level-await",
        "--no-experimental-top-level-await",
        "--openssl-config",
        "--icu-data-dir",
        "--v8-pool-size",
        "--report-on-fatalerror",
        "--no-report-on-fatalerror",
        "--title",
        "--tls-min-v1.1",
        "--no-tls-min-v1.1",
        "--report-filename",
        "--trace-deprecation",
        "--no-trace-deprecation",
        "--report-compact",
        "--no-report-compact",
        "--experimental-policy",
        "--experimental-import-meta-resolve",
        "--no-experimental-import-meta-resolve",
        "--zero-fill-buffers",
        "--no-zero-fill-buffers",
        "--report-dir",
        "--use-bundled-ca",
        "--no-use-bundled-ca",
        "--experimental-vm-modules",
        "--no-experimental-vm-modules",
        "--force-async-hooks-checks",
        "--no-force-async-hooks-checks",
        "--frozen-intrinsics",
        "--no-frozen-intrinsics",
        "--huge-max-old-generation-size",
        "--disable-proto",
        "--debug-arraybuffer-allocations",
        "--no-debug-arraybuffer-allocations",
        "--conditions",
        "--experimental-wasi-unstable-preview1",
        "--no-experimental-wasi-unstable-preview1",
        "--trace-sync-io",
        "--no-trace-sync-io",
        "--use-largepages",
        "--experimental-abortcontroller",
        "--debug-port",
        "--es-module-specifier-resolution",
        "--prof-process",
        "-C",
        "--loader",
        "--report-directory",
        "-r",
        "--trace-events-enabled", 
    ];
    const trimLeadingDashes = (flag)=>flag.replace(leadingDashesRegex, "")
    ;
    const nodeFlags = allowedNodeEnvironmentFlags.map(trimLeadingDashes);
    class NodeEnvironmentFlagsSet extends Set {
        constructor(array){
            super();
            this[kInternal] = {
                array
            };
        }
        add() {
            return this;
        }
        delete() {
            return false;
        }
        clear() {}
        has(key) {
            if (typeof key === "string") {
                key = key.replace(replaceUnderscoresRegex, "-");
                if (leadingDashesRegex.test(key)) {
                    key = key.replace(trailingValuesRegex, "");
                    return this[kInternal].array.includes(key);
                }
                return nodeFlags.includes(key);
            }
            return false;
        }
        entries() {
            this[kInternal].set ??= new Set(this[kInternal].array);
            return this[kInternal].set.entries();
        }
        forEach(callback, thisArg = undefined) {
            this[kInternal].array.forEach((v10)=>Reflect.apply(callback, thisArg, [
                    v10,
                    v10,
                    this
                ])
            );
        }
        get size() {
            return this[kInternal].array.length;
        }
        values() {
            this[kInternal].set ??= new Set(this[kInternal].array);
            return this[kInternal].set.values();
        }
    }
    NodeEnvironmentFlagsSet.prototype.keys = NodeEnvironmentFlagsSet.prototype[Symbol.iterator] = NodeEnvironmentFlagsSet.prototype.values;
    Object.freeze(NodeEnvironmentFlagsSet.prototype.constructor);
    Object.freeze(NodeEnvironmentFlagsSet.prototype);
    return Object.freeze(new NodeEnvironmentFlagsSet(allowedNodeEnvironmentFlags));
}
const notImplementedEvents = [
    "beforeExit",
    "disconnect",
    "message",
    "multipleResolves",
    "rejectionHandled",
    "uncaughtException",
    "uncaughtExceptionMonitor",
    "unhandledRejection",
    "worker", 
];
const argv = [
    "",
    "",
    ...Deno.args
];
Object.defineProperty(argv, "0", {
    get: Deno.execPath
});
Object.defineProperty(argv, "1", {
    get: ()=>fromFileUrl2(Deno.mainModule)
});
const exit = (code47)=>{
    if (code47 || code47 === 0) {
        if (typeof code47 === "string") {
            const parsedCode = parseInt(code47);
            process1.exitCode = isNaN(parsedCode) ? undefined : parsedCode;
        } else {
            process1.exitCode = code47;
        }
    }
    if (!process1._exiting) {
        process1._exiting = true;
        process1.emit("exit", process1.exitCode || 0);
    }
    Deno.exit(process1.exitCode || 0);
};
function addReadOnlyProcessAlias(name52, option, enumerable = true) {
    const value = getOptionValue(option);
    if (value) {
        Object.defineProperty(process1, name52, {
            writable: false,
            configurable: true,
            enumerable,
            value
        });
    }
}
function createWarningObject(warning, type32, code48, ctor, detail) {
    assert1(typeof warning === "string");
    const warningErr = new Error(warning);
    warningErr.name = String(type32 || "Warning");
    if (code48 !== undefined) {
        warningErr.code = code48;
    }
    if (detail !== undefined) {
        warningErr.detail = detail;
    }
    Error.captureStackTrace(warningErr, ctor || process1.emitWarning);
    return warningErr;
}
function doEmitWarning(warning) {
    process1.emit("warning", warning);
}
function emitWarning(warning, type33, code49, ctor) {
    let detail;
    if (type33 !== null && typeof type33 === "object" && !Array.isArray(type33)) {
        ctor = type33.ctor;
        code49 = type33.code;
        if (typeof type33.detail === "string") {
            detail = type33.detail;
        }
        type33 = type33.type || "Warning";
    } else if (typeof type33 === "function") {
        ctor = type33;
        code49 = undefined;
        type33 = "Warning";
    }
    if (type33 !== undefined) {
        validateString(type33, "type");
    }
    if (typeof code49 === "function") {
        ctor = code49;
        code49 = undefined;
    } else if (code49 !== undefined) {
        validateString(code49, "code");
    }
    if (typeof warning === "string") {
        warning = createWarningObject(warning, type33, code49, ctor, detail);
    } else if (!(warning instanceof Error)) {
        throw new ERR_INVALID_ARG_TYPE("warning", [
            "Error",
            "string"
        ], warning);
    }
    if (warning.name === "DeprecationWarning") {
        if (process1.noDeprecation) {
            return;
        }
        if (process1.throwDeprecation) {
            return process1.nextTick(()=>{
                throw warning;
            });
        }
    }
    process1.nextTick(doEmitWarning, warning);
}
function hrtime(time) {
    const milli = performance.now();
    const sec = Math.floor(milli / 1000);
    const nano = Math.floor(milli * 1_000_000 - sec * 1_000_000_000);
    if (!time) {
        return [
            sec,
            nano
        ];
    }
    const [prevSec, prevNano] = time;
    return [
        sec - prevSec,
        nano - prevNano
    ];
}
hrtime.bigint = function() {
    const [sec, nano] = hrtime();
    return BigInt(sec) * 1_000_000_000n + BigInt(nano);
};
function memoryUsage() {
    return {
        ...Deno.memoryUsage(),
        arrayBuffers: 0
    };
}
memoryUsage.rss = function() {
    return memoryUsage().rss;
};
function kill(pid1, sig = "SIGTERM") {
    if (pid1 != (pid1 | 0)) {
        throw new ERR_INVALID_ARG_TYPE("pid", "number", pid1);
    }
    if (typeof sig === "string") {
        try {
            Deno.kill(pid1, sig);
        } catch (e) {
            if (e instanceof TypeError) {
                throw new ERR_UNKNOWN_SIGNAL(sig);
            }
            throw e;
        }
    } else {
        throw new ERR_UNKNOWN_SIGNAL(sig.toString());
    }
    return true;
}
class Process extends EventEmitter {
    constructor(){
        super();
        globalThis.addEventListener("unload", ()=>{
            if (!process1._exiting) {
                process1._exiting = true;
                super.emit("exit", process1.exitCode || 0);
            }
        });
    }
    arch = arch;
    argv = argv;
    chdir = chdir;
    config = {
        target_defaults: {},
        variables: {}
    };
    cwd = cwd;
    env = env;
    execArgv = [];
    exit = exit;
    _exiting = _exiting;
    exitCode = undefined;
    mainModule = undefined;
    nextTick = nextTick2;
    on(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.on("${event}")`);
            super.on(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                addSignalListener(event, listener);
            }
        } else {
            super.on(event, listener);
        }
        return this;
    }
    off(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.off("${event}")`);
            super.off(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                removeSignalListener(event, listener);
            }
        } else {
            super.off(event, listener);
        }
        return this;
    }
    emit(event, ...args) {
        if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                Deno.kill(Deno.pid, event);
            }
        } else {
            return super.emit(event, ...args);
        }
        return true;
    }
    prependListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.prependListener("${event}")`);
            super.prependListener(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                addSignalListener(event, listener);
            }
        } else {
            super.prependListener(event, listener);
        }
        return this;
    }
    pid = pid;
    platform = platform;
    addListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.addListener("${event}")`);
        }
        return this.on(event, listener);
    }
    removeListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.removeListener("${event}")`);
        }
        return this.off(event, listener);
    }
    hrtime = hrtime;
    kill = kill;
    memoryUsage = memoryUsage;
    stderr = stderr;
    stdin = stdin;
    stdout = stdout;
    version = version;
    versions = versions;
    emitWarning = emitWarning;
    binding(name53) {
        return getBinding(name53);
    }
    umask() {
        return 0o22;
    }
    getuid() {
        return NaN;
    }
    getgid() {
        return NaN;
    }
    _eval = undefined;
    get execPath() {
        return argv[0];
    }
    #startTime = Date.now();
    uptime() {
        return (Date.now() - this.#startTime) / 1000;
    }
    #allowedFlags = buildAllowedFlags();
    get allowedNodeEnvironmentFlags() {
        return this.#allowedFlags;
    }
    features = {
        inspector: false
    };
}
const process1 = new Process();
Object.defineProperty(process1, Symbol.toStringTag, {
    enumerable: false,
    writable: true,
    configurable: false,
    value: "process"
});
addReadOnlyProcessAlias("noDeprecation", "--no-deprecation");
addReadOnlyProcessAlias("throwDeprecation", "--throw-deprecation");
process1.removeListener;
process1.removeAllListeners;
var _ = Object.create;
var p = Object.defineProperty;
var k = Object.getOwnPropertyDescriptor;
var q = Object.getOwnPropertyNames;
var C = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty;
var T = (t, e)=>()=>(e || t((e = {
            exports: {}
        }).exports, e), e.exports)
;
var y = (t, e, r, a)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let o of q(e))!E.call(t, o) && o !== r && p(t, o, {
        get: ()=>e[o]
        ,
        enumerable: !(a = k(e, o)) || a.enumerable
    });
    return t;
};
var A = (t, e, r)=>(r = t != null ? _(C(t)) : {}, y(e || !t || !t.__esModule ? p(r, "default", {
        value: t,
        enumerable: !0
    }) : r, t))
;
var w = T((n)=>{
    "use strict";
    var m = n && n.__awaiter || function(t, e, r, a) {
        function o(s) {
            return s instanceof r ? s : new r(function(d) {
                d(s);
            });
        }
        return new (r || (r = Promise))(function(s, d) {
            function B5(i97) {
                try {
                    h(a.next(i97));
                } catch (u) {
                    d(u);
                }
            }
            function H2(i98) {
                try {
                    h(a.throw(i98));
                } catch (u) {
                    d(u);
                }
            }
            function h(i99) {
                i99.done ? s(i99.value) : o(i99.value).then(B5, H2);
            }
            h((a = a.apply(t, e || [])).next());
        });
    };
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    n.PersonalAccessTokenCredentialHandler = n.BearerCredentialHandler = n.BasicCredentialHandler = void 0;
    var c = class {
        constructor(e, r){
            this.username = e, this.password = r;
        }
        prepareRequest(e) {
            if (!e.headers) throw Error("The request has no headers");
            e.headers.Authorization = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
        }
        canHandleAuthentication() {
            return !1;
        }
        handleAuthentication() {
            return m(this, void 0, void 0, function*() {
                throw new Error("not implemented");
            });
        }
    };
    n.BasicCredentialHandler = c;
    var l = class {
        constructor(e){
            this.token = e;
        }
        prepareRequest(e) {
            if (!e.headers) throw Error("The request has no headers");
            e.headers.Authorization = `Bearer ${this.token}`;
        }
        canHandleAuthentication() {
            return !1;
        }
        handleAuthentication() {
            return m(this, void 0, void 0, function*() {
                throw new Error("not implemented");
            });
        }
    };
    n.BearerCredentialHandler = l;
    var f = class {
        constructor(e){
            this.token = e;
        }
        prepareRequest(e) {
            if (!e.headers) throw Error("The request has no headers");
            e.headers.Authorization = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
        }
        canHandleAuthentication() {
            return !1;
        }
        handleAuthentication() {
            return m(this, void 0, void 0, function*() {
                throw new Error("not implemented");
            });
        }
    };
    n.PersonalAccessTokenCredentialHandler = f;
});
var $ = A(w()), v = A(w()), { __esModule: M , PersonalAccessTokenCredentialHandler: P , BasicCredentialHandler: S , BearerCredentialHandler: j  } = v, { default: b , ...z } = v, O = ($.default ?? b) ?? z;
const active_hooks = {
    array: [],
    call_depth: 0,
    tmp_array: null,
    tmp_fields: null
};
const registerDestroyHook1 = mod9.registerDestroyHook;
const { async_hook_fields , asyncIdFields: async_id_fields , newAsyncId: newAsyncId1 , constants: constants3 ,  } = mod9;
const { kInit , kBefore , kAfter , kDestroy: kDestroy1 , kPromiseResolve , kTotals , kCheck , kDefaultTriggerAsyncId , kStackLength ,  } = constants3;
const resource_symbol = Symbol("resource");
const async_id_symbol = Symbol("trigger_async_id");
const trigger_async_id_symbol = Symbol("trigger_async_id");
const init_symbol = Symbol("init");
const before_symbol = Symbol("before");
const after_symbol = Symbol("after");
const destroy_symbol = Symbol("destroy");
const promise_resolve_symbol = Symbol("promiseResolve");
const symbols = {
    async_id_symbol,
    trigger_async_id_symbol,
    init_symbol,
    before_symbol,
    after_symbol,
    destroy_symbol,
    promise_resolve_symbol
};
function lookupPublicResource(resource) {
    if (typeof resource !== "object" || resource === null) return resource;
    const publicResource = resource[resource_symbol];
    if (publicResource !== undefined) {
        return publicResource;
    }
    return resource;
}
function emitInitNative(asyncId, type34, triggerAsyncId, resource) {
    active_hooks.call_depth += 1;
    resource = lookupPublicResource(resource);
    try {
        for(let i100 = 0; i100 < active_hooks.array.length; i100++){
            if (typeof active_hooks.array[i100][init_symbol] === "function") {
                active_hooks.array[i100][init_symbol](asyncId, type34, triggerAsyncId, resource);
            }
        }
    } catch (e) {
        throw e;
    } finally{
        active_hooks.call_depth -= 1;
    }
    if (active_hooks.call_depth === 0 && active_hooks.tmp_array !== null) {
        restoreActiveHooks();
    }
}
function copyHooks(destination, source) {
    destination[kInit] = source[kInit];
    destination[kBefore] = source[kBefore];
    destination[kAfter] = source[kAfter];
    destination[kDestroy1] = source[kDestroy1];
    destination[kPromiseResolve] = source[kPromiseResolve];
}
function restoreActiveHooks() {
    active_hooks.array = active_hooks.tmp_array;
    copyHooks(async_hook_fields, active_hooks.tmp_fields);
    active_hooks.tmp_array = null;
    active_hooks.tmp_fields = null;
}
function getDefaultTriggerAsyncId() {
    const defaultTriggerAsyncId = async_id_fields[mod9.UidFields.kDefaultTriggerAsyncId];
    if (defaultTriggerAsyncId < 0) {
        return async_id_fields[mod9.UidFields.kExecutionAsyncId];
    }
    return defaultTriggerAsyncId;
}
function defaultTriggerAsyncIdScope(triggerAsyncId, block, ...args) {
    if (triggerAsyncId === undefined) {
        return block.apply(null, args);
    }
    const oldDefaultTriggerAsyncId = async_id_fields[kDefaultTriggerAsyncId];
    async_id_fields[kDefaultTriggerAsyncId] = triggerAsyncId;
    try {
        return block.apply(null, args);
    } finally{
        async_id_fields[kDefaultTriggerAsyncId] = oldDefaultTriggerAsyncId;
    }
}
function hasHooks(key) {
    return async_hook_fields[key] > 0;
}
function enabledHooksExist() {
    return hasHooks(kCheck);
}
function initHooksExist() {
    return hasHooks(kInit);
}
function destroyHooksExist() {
    return hasHooks(kDestroy1);
}
function emitInitScript(asyncId, type35, triggerAsyncId, resource) {
    if (!hasHooks(kInit)) {
        return;
    }
    if (triggerAsyncId === null) {
        triggerAsyncId = getDefaultTriggerAsyncId();
    }
    emitInitNative(asyncId, type35, triggerAsyncId, resource);
}
function hasAsyncIdStack() {
    return hasHooks(kStackLength);
}
const TIMEOUT_MAX = 2 ** 31 - 1;
const kTimerId = Symbol("timerId");
const kTimeout = Symbol("timeout");
const kRefed = Symbol("refed");
function Timeout(id) {
    this[kTimerId] = id;
    this[kRefed] = true;
}
Timeout.prototype[inspect.custom] = function(_, options) {
    return inspect(this, {
        ...options,
        depth: 0,
        customInspect: false
    });
};
Timeout.prototype.refresh = function() {
    notImplemented();
};
Timeout.prototype.unref = function() {
    if (this[kRefed]) {
        this[kRefed] = false;
        Deno.unrefTimer(this[kTimerId]);
    }
    return this;
};
Timeout.prototype.ref = function() {
    if (!this[kRefed]) {
        this[kRefed] = true;
        Deno.refTimer(this[kTimerId]);
    }
    return this;
};
Timeout.prototype.hasRef = function() {
    return this[kRefed];
};
Timeout.prototype[Symbol.toPrimitive] = function() {
    return this[kTimerId];
};
function getTimerDuration(msecs, name54) {
    validateNumber(msecs, name54);
    if (msecs < 0 || !Number.isFinite(msecs)) {
        throw new ERR_OUT_OF_RANGE(name54, "a non-negative finite number", msecs);
    }
    if (msecs > TIMEOUT_MAX) {
        emitWarning(`${msecs} does not fit into a 32-bit signed integer.` + `\nTimer duration was truncated to ${TIMEOUT_MAX}.`, "TimeoutOverflowWarning");
        return TIMEOUT_MAX;
    }
    return msecs;
}
const setTimeout_ = globalThis.setTimeout;
globalThis.clearTimeout;
globalThis.setInterval;
globalThis.clearInterval;
function setTimeout1(cb, timeout, ...args1) {
    validateCallback(cb);
    if (typeof timeout === "number" && timeout > TIMEOUT_MAX) {
        timeout = 1;
    }
    const timer = new Timeout(setTimeout_((...args)=>{
        cb.bind(timer)(...args);
    }, timeout, ...args1));
    return timer;
}
Object.defineProperty(setTimeout1, promisify.custom, {
    value: (timeout, ...args)=>{
        return new Promise((cb)=>setTimeout1(cb, timeout, ...args)
        );
    },
    enumerable: true
});
function setUnrefTimeout(cb, timeout, ...args) {
    setTimeout1(cb, timeout, ...args).unref();
}
const kMaybeDestroy = Symbol("kMaybeDestroy");
const kUpdateTimer = Symbol("kUpdateTimer");
const kAfterAsyncWrite = Symbol("kAfterAsyncWrite");
const kHandle = Symbol("kHandle");
const kSession = Symbol("kSession");
const kBuffer = Symbol("kBuffer");
const kBufferGen = Symbol("kBufferGen");
const kBufferCb = Symbol("kBufferCb");
function handleWriteReq(req6, data1, encoding) {
    const { handle  } = req6;
    switch(encoding){
        case "buffer":
            {
                const ret = handle.writeBuffer(req6, data1);
                if (streamBaseState[kLastWriteWasAsync]) {
                    req6.buffer = data1;
                }
                return ret;
            }
        case "latin1":
        case "binary":
            return handle.writeLatin1String(req6, data1);
        case "utf8":
        case "utf-8":
            return handle.writeUtf8String(req6, data1);
        case "ascii":
            return handle.writeAsciiString(req6, data1);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return handle.writeUcs2String(req6, data1);
        default:
            {
                const buffer = Buffer.from(data1, encoding);
                const ret = handle.writeBuffer(req6, buffer);
                if (streamBaseState[kLastWriteWasAsync]) {
                    req6.buffer = buffer;
                }
                return ret;
            }
    }
}
function onWriteComplete(status) {
    let stream1 = this.handle[ownerSymbol];
    if (stream1.constructor.name === "ReusedHandle") {
        stream1 = stream1.handle;
    }
    if (stream1.destroyed) {
        if (typeof this.callback === "function") {
            this.callback(null);
        }
        return;
    }
    if (status < 0) {
        const ex = errnoException(status, "write", this.error);
        if (typeof this.callback === "function") {
            this.callback(ex);
        } else {
            stream1.destroy(ex);
        }
        return;
    }
    stream1[kUpdateTimer]();
    stream1[kAfterAsyncWrite](this);
    if (typeof this.callback === "function") {
        this.callback(null);
    }
}
function createWriteWrap(handle, callback) {
    const req7 = new WriteWrap();
    req7.handle = handle;
    req7.oncomplete = onWriteComplete;
    req7.async = false;
    req7.bytes = 0;
    req7.buffer = null;
    req7.callback = callback;
    return req7;
}
function writevGeneric(owner, data2, cb) {
    const req8 = createWriteWrap(owner[kHandle], cb);
    const allBuffers = data2.allBuffers;
    let chunks;
    if (allBuffers) {
        chunks = data2;
        for(let i101 = 0; i101 < data2.length; i101++){
            data2[i101] = data2[i101].chunk;
        }
    } else {
        chunks = new Array(data2.length << 1);
        for(let i102 = 0; i102 < data2.length; i102++){
            const entry = data2[i102];
            chunks[i102 * 2] = entry.chunk;
            chunks[i102 * 2 + 1] = entry.encoding;
        }
    }
    const err = req8.handle.writev(req8, chunks, allBuffers);
    if (err === 0) {
        req8._chunks = chunks;
    }
    afterWriteDispatched(req8, err, cb);
    return req8;
}
function writeGeneric(owner, data3, encoding, cb) {
    const req9 = createWriteWrap(owner[kHandle], cb);
    const err = handleWriteReq(req9, data3, encoding);
    afterWriteDispatched(req9, err, cb);
    return req9;
}
function afterWriteDispatched(req10, err, cb) {
    req10.bytes = streamBaseState[kBytesWritten];
    req10.async = !!streamBaseState[kLastWriteWasAsync];
    if (err !== 0) {
        return cb(errnoException(err, "write", req10.error));
    }
    if (!req10.async && typeof req10.callback === "function") {
        req10.callback();
    }
}
function onStreamRead(arrayBuffer, nread) {
    const handle = this;
    let stream2 = this[ownerSymbol];
    if (stream2.constructor.name === "ReusedHandle") {
        stream2 = stream2.handle;
    }
    stream2[kUpdateTimer]();
    if (nread > 0 && !stream2.destroyed) {
        let ret;
        let result;
        const userBuf = stream2[kBuffer];
        if (userBuf) {
            result = stream2[kBufferCb](nread, userBuf) !== false;
            const bufGen = stream2[kBufferGen];
            if (bufGen !== null) {
                const nextBuf = bufGen();
                if (isUint8Array(nextBuf)) {
                    stream2[kBuffer] = ret = nextBuf;
                }
            }
        } else {
            const offset = streamBaseState[kArrayBufferOffset];
            const buf = Buffer.from(arrayBuffer, offset, nread);
            result = stream2.push(buf);
        }
        if (!result) {
            handle.reading = false;
            if (!stream2.destroyed) {
                const err = handle.readStop();
                if (err) {
                    stream2.destroy(errnoException(err, "read"));
                }
            }
        }
        return ret;
    }
    if (nread === 0) {
        return;
    }
    if (nread !== codeMap.get("EOF")) {
        stream2.destroy(errnoException(nread, "read"));
        return;
    }
    if (stream2._readableState.endEmitted) {
        if (stream2[kMaybeDestroy]) {
            stream2[kMaybeDestroy]();
        }
    } else {
        if (stream2[kMaybeDestroy]) {
            stream2.on("end", stream2[kMaybeDestroy]);
        }
        if (handle.readStop) {
            const err = handle.readStop();
            if (err) {
                stream2.destroy(errnoException(err, "read"));
                return;
            }
        }
        stream2.push(null);
        stream2.read(0);
    }
}
function setStreamTimeout(msecs, callback) {
    if (this.destroyed) {
        return this;
    }
    this.timeout = msecs;
    msecs = getTimerDuration(msecs, "msecs");
    clearTimeout(this[kTimeout]);
    if (msecs === 0) {
        if (callback !== undefined) {
            validateCallback(callback);
            this.removeListener("timeout", callback);
        }
    } else {
        this[kTimeout] = setUnrefTimeout(this._onTimeout.bind(this), msecs);
        if (this[kSession]) {
            this[kSession][kUpdateTimer]();
        }
        if (callback !== undefined) {
            validateCallback(callback);
            this.once("timeout", callback);
        }
    }
    return this;
}
const { DTRACE_HTTP_CLIENT_REQUEST =(..._args)=>{} , DTRACE_HTTP_CLIENT_RESPONSE =(..._args)=>{} , DTRACE_HTTP_SERVER_REQUEST =(..._args)=>{} , DTRACE_HTTP_SERVER_RESPONSE =(..._args)=>{} , DTRACE_NET_SERVER_CONNECTION =(..._args)=>{} , DTRACE_NET_STREAM_END =(..._args)=>{} ,  } = {};
function isLookupOptions(options) {
    return typeof options === "object" || typeof options === "undefined";
}
function isLookupCallback(options) {
    return typeof options === "function";
}
function isFamily(options) {
    return typeof options === "number";
}
function isResolveCallback(callback) {
    return typeof callback === "function";
}
const IPv6RE = /^\[([^[\]]*)\]/;
const addrSplitRE = /(^.+?)(?::(\d+))?$/;
function validateTimeout(options) {
    const { timeout =-1  } = {
        ...options
    };
    validateInt32(timeout, "options.timeout", -1, 2 ** 31 - 1);
    return timeout;
}
function validateTries(options) {
    const { tries =4  } = {
        ...options
    };
    validateInt32(tries, "options.tries", 1, 2 ** 31 - 1);
    return tries;
}
class Resolver {
    _handle;
    constructor(options){
        const timeout = validateTimeout(options);
        const tries = validateTries(options);
        this._handle = new ChannelWrap(timeout, tries);
    }
    cancel() {
        this._handle.cancel();
    }
    getServers() {
        return this._handle.getServers().map((val)=>{
            if (!val[1] || val[1] === 53) {
                return val[0];
            }
            const host = isIP(val[0]) === 6 ? `[${val[0]}]` : val[0];
            return `${host}:${val[1]}`;
        });
    }
    setServers(servers) {
        validateArray(servers, "servers");
        const orig = this._handle.getServers();
        const newSet = [];
        servers.forEach((serv, index)=>{
            validateString(serv, `servers[${index}]`);
            let ipVersion = isIP(serv);
            if (ipVersion !== 0) {
                return newSet.push([
                    ipVersion,
                    serv,
                    53
                ]);
            }
            const match2 = serv.match(IPv6RE);
            if (match2) {
                ipVersion = isIP(match2[1]);
                if (ipVersion !== 0) {
                    const port2 = Number.parseInt(serv.replace(addrSplitRE, "$2")) || 53;
                    return newSet.push([
                        ipVersion,
                        match2[1],
                        port2
                    ]);
                }
            }
            const addrSplitMatch = serv.match(addrSplitRE);
            if (addrSplitMatch) {
                const hostIP = addrSplitMatch[1];
                const port3 = addrSplitMatch[2] || `${53}`;
                ipVersion = isIP(hostIP);
                if (ipVersion !== 0) {
                    return newSet.push([
                        ipVersion,
                        hostIP,
                        Number.parseInt(port3)
                    ]);
                }
            }
            throw new ERR_INVALID_IP_ADDRESS(serv);
        });
        const errorNumber = this._handle.setServers(newSet);
        if (errorNumber !== 0) {
            this._handle.setServers(orig.join(","));
            const err = strerror(errorNumber);
            throw new ERR_DNS_SET_SERVERS_FAILED(err, servers.toString());
        }
    }
    setLocalAddress(ipv4, ipv6) {
        validateString(ipv4, "ipv4");
        if (ipv6 !== undefined) {
            validateString(ipv6, "ipv6");
        }
        this._handle.setLocalAddress(ipv4, ipv6);
    }
}
let defaultResolver = new Resolver();
function getDefaultResolver() {
    return defaultResolver;
}
function setDefaultResolver(resolver3) {
    defaultResolver = resolver3;
}
function validateHints(hints) {
    if ((hints & ~(AI_ADDRCONFIG | AI_ALL | AI_V4MAPPED)) !== 0) {
        throw new ERR_INVALID_ARG_VALUE("hints", hints, "is invalid");
    }
}
let invalidHostnameWarningEmitted = false;
function emitInvalidHostnameWarning(hostname5) {
    if (invalidHostnameWarningEmitted) {
        return;
    }
    invalidHostnameWarningEmitted = true;
    emitWarning(`The provided hostname "${hostname5}" is not a valid ` + "hostname, and is supported in the dns module solely for compatibility.", "DeprecationWarning", "DEP0118");
}
let dnsOrder = getOptionValue("--dns-result-order") || "ipv4first";
function getDefaultVerbatim() {
    switch(dnsOrder){
        case "verbatim":
            {
                return true;
            }
        case "ipv4first":
            {
                return false;
            }
        default:
            {
                return false;
            }
    }
}
function setDefaultResultOrder(order) {
    validateOneOf(order, "dnsOrder", [
        "verbatim",
        "ipv4first"
    ]);
    dnsOrder = order;
}
"use strict";
const base = 36;
const damp = 700;
const delimiter3 = "-";
const regexNonASCII = /[^\0-\x7E]/;
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
const errors = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
};
const baseMinusTMin = 36 - 1;
function error(type36) {
    throw new RangeError(errors[type36]);
}
function mapDomain(str, fn) {
    const parts = str.split("@");
    let result = "";
    if (parts.length > 1) {
        result = parts[0] + "@";
        str = parts[1];
    }
    str = str.replace(regexSeparators, "\x2E");
    const labels = str.split(".");
    const encoded = labels.map(fn).join(".");
    return result + encoded;
}
function ucs2decode(str) {
    const output = [];
    let counter = 0;
    const length = str.length;
    while(counter < length){
        const value = str.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            const extra = str.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) {
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}
function digitToBasic(digit, flag) {
    return digit + 22 + 75 * Number(digit < 26) - (Number(flag != 0) << 5);
}
function adapt(delta, numPoints, firstTime) {
    let k8 = 0;
    delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
    delta += Math.floor(delta / numPoints);
    for(; delta > baseMinusTMin * 26 >> 1; k8 += base){
        delta = Math.floor(delta / baseMinusTMin);
    }
    return Math.floor(k8 + (baseMinusTMin + 1) * delta / (delta + 38));
}
function encode2(str) {
    const output = [];
    const input = ucs2decode(str);
    const inputLength = input.length;
    let n = 128;
    let delta = 0;
    let bias = 72;
    for (const currentValue of input){
        if (currentValue < 0x80) {
            output.push(String.fromCharCode(currentValue));
        }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
        output.push(delimiter3);
    }
    while(handledCPCount < inputLength){
        let m = 2147483647;
        for (const currentValue of input){
            if (currentValue >= n && currentValue < m) {
                m = currentValue;
            }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > Math.floor((2147483647 - delta) / handledCPCountPlusOne)) {
            error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue1 of input){
            if (currentValue1 < n && ++delta > 2147483647) {
                error("overflow");
            }
            if (currentValue1 == n) {
                let q2 = delta;
                for(let k9 = 36;; k9 += base){
                    const t = k9 <= bias ? 1 : k9 >= bias + 26 ? 26 : k9 - bias;
                    if (q2 < t) {
                        break;
                    }
                    const qMinusT = q2 - t;
                    const baseMinusT = 36 - t;
                    output.push(String.fromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    q2 = Math.floor(qMinusT / baseMinusT);
                }
                output.push(String.fromCharCode(digitToBasic(q2, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
            }
        }
        ++delta;
        ++n;
    }
    return output.join("");
}
function toASCII(input) {
    return mapDomain(input, function(str) {
        return regexNonASCII.test(str) ? "xn--" + encode2(str) : str;
    });
}
function onlookup(err, addresses) {
    if (err) {
        this.reject(dnsException(err, "getaddrinfo", this.hostname));
        return;
    }
    const family = this.family || isIP(addresses[0]);
    this.resolve({
        address: addresses[0],
        family
    });
}
function onlookupall(err, addresses) {
    if (err) {
        this.reject(dnsException(err, "getaddrinfo", this.hostname));
        return;
    }
    const family = this.family;
    const parsedAddresses = [];
    for(let i103 = 0; i103 < addresses.length; i103++){
        const address2 = addresses[i103];
        parsedAddresses[i103] = {
            address: address2,
            family: family ? family : isIP(address2)
        };
    }
    this.resolve(parsedAddresses);
}
function createLookupPromise(family, hostname6, all, hints, verbatim) {
    return new Promise((resolve19, reject)=>{
        if (!hostname6) {
            emitInvalidHostnameWarning(hostname6);
            resolve19(all ? [] : {
                address: null,
                family: family === 6 ? 6 : 4
            });
            return;
        }
        const matchedFamily = isIP(hostname6);
        if (matchedFamily !== 0) {
            const result = {
                address: hostname6,
                family: matchedFamily
            };
            resolve19(all ? [
                result
            ] : result);
            return;
        }
        const req11 = new GetAddrInfoReqWrap();
        req11.family = family;
        req11.hostname = hostname6;
        req11.oncomplete = all ? onlookupall : onlookup;
        req11.resolve = resolve19;
        req11.reject = reject;
        const err = getaddrinfo(req11, toASCII(hostname6), family, hints, verbatim);
        if (err) {
            reject(dnsException(err, "getaddrinfo", hostname6));
        }
    });
}
const validFamilies = [
    0,
    4,
    6
];
function lookup(hostname7, options) {
    let hints = 0;
    let family = 0;
    let all = false;
    let verbatim = getDefaultVerbatim();
    if (hostname7) {
        validateString(hostname7, "hostname");
    }
    if (isFamily(options)) {
        validateOneOf(options, "family", validFamilies);
        family = options;
    } else if (!isLookupOptions(options)) {
        throw new ERR_INVALID_ARG_TYPE("options", [
            "integer",
            "object"
        ], options);
    } else {
        if (options?.hints != null) {
            validateNumber(options.hints, "options.hints");
            hints = options.hints >>> 0;
            validateHints(hints);
        }
        if (options?.family != null) {
            validateOneOf(options.family, "options.family", validFamilies);
            family = options.family;
        }
        if (options?.all != null) {
            validateBoolean(options.all, "options.all");
            all = options.all;
        }
        if (options?.verbatim != null) {
            validateBoolean(options.verbatim, "options.verbatim");
            verbatim = options.verbatim;
        }
    }
    return createLookupPromise(family, hostname7, all, hints, verbatim);
}
function onresolve(err, records, ttls) {
    if (err) {
        this.reject(dnsException(err, this.bindingName, this.hostname));
        return;
    }
    const parsedRecords = ttls && this.ttl ? records.map((address3, index)=>({
            address: address3,
            ttl: ttls[index]
        })
    ) : records;
    this.resolve(parsedRecords);
}
function createResolverPromise(resolver1, bindingName, hostname8, ttl) {
    return new Promise((resolve21, reject)=>{
        const req12 = new QueryReqWrap();
        req12.bindingName = bindingName;
        req12.hostname = hostname8;
        req12.oncomplete = onresolve;
        req12.resolve = resolve21;
        req12.reject = reject;
        req12.ttl = ttl;
        const err = resolver1._handle[bindingName](req12, toASCII(hostname8));
        if (err) {
            reject(dnsException(err, bindingName, hostname8));
        }
    });
}
function resolver(bindingName) {
    function query1(name55, options) {
        validateString(name55, "name");
        const ttl = !!(options && options.ttl);
        return createResolverPromise(this, bindingName, name55, ttl);
    }
    Object.defineProperty(query1, "name", {
        value: bindingName
    });
    return query1;
}
const resolveMap = Object.create(null);
class Resolver1 extends Resolver {
}
Resolver1.prototype.resolveAny = resolveMap.ANY = resolver("queryAny");
Resolver1.prototype.resolve4 = resolver("queryA");
Resolver1.prototype.resolve6 = resolveMap.AAAA = resolver("queryAaaa");
Resolver1.prototype.resolveCaa = resolveMap.CAA = resolver("queryCaa");
Resolver1.prototype.resolveCname = resolveMap.CNAME = resolver("queryCname");
Resolver1.prototype.resolveMx = resolveMap.MX = resolver("queryMx");
Resolver1.prototype.resolveNs = resolveMap.NS = resolver("queryNs");
Resolver1.prototype.resolveTxt = resolveMap.TXT = resolver("queryTxt");
Resolver1.prototype.resolveSrv = resolveMap.SRV = resolver("querySrv");
Resolver1.prototype.resolvePtr = resolveMap.PTR = resolver("queryPtr");
Resolver1.prototype.resolveNaptr = resolveMap.NAPTR = resolver("queryNaptr");
Resolver1.prototype.resolveSoa = resolveMap.SOA = resolver("querySoa");
Resolver1.prototype.reverse = resolver("getHostByAddr");
Resolver1.prototype.resolve = _resolve;
function _resolve(hostname9, rrtype) {
    let resolver2;
    if (typeof hostname9 !== "string") {
        throw new ERR_INVALID_ARG_TYPE("name", "string", hostname9);
    }
    if (rrtype !== undefined) {
        validateString(rrtype, "rrtype");
        resolver2 = resolveMap[rrtype];
        if (typeof resolver2 !== "function") {
            throw new ERR_INVALID_ARG_VALUE("rrtype", rrtype);
        }
    } else {
        resolver2 = resolveMap.A;
    }
    return Reflect.apply(resolver2, this, [
        hostname9
    ]);
}
function getServers() {
    return Resolver1.prototype.getServers.bind(getDefaultResolver())();
}
function resolveAny(hostname10) {
    return Resolver1.prototype.resolveAny.bind(getDefaultResolver())(hostname10);
}
function resolve4(hostname11, options) {
    return Resolver1.prototype.resolve4.bind(getDefaultResolver())(hostname11, options);
}
function resolve6(hostname12, options) {
    return Resolver1.prototype.resolve6.bind(getDefaultResolver())(hostname12, options);
}
function resolveCaa(hostname13) {
    return Resolver1.prototype.resolveCaa.bind(getDefaultResolver())(hostname13);
}
function resolveCname(hostname14) {
    return Resolver1.prototype.resolveCname.bind(getDefaultResolver())(hostname14);
}
function resolveMx(hostname15) {
    return Resolver1.prototype.resolveMx.bind(getDefaultResolver())(hostname15);
}
function resolveNs(hostname16) {
    return Resolver1.prototype.resolveNs.bind(getDefaultResolver())(hostname16);
}
function resolveTxt(hostname17) {
    return Resolver1.prototype.resolveTxt.bind(getDefaultResolver())(hostname17);
}
function resolveSrv(hostname18) {
    return Resolver1.prototype.resolveSrv.bind(getDefaultResolver())(hostname18);
}
function resolvePtr(hostname19) {
    return Resolver1.prototype.resolvePtr.bind(getDefaultResolver())(hostname19);
}
function resolveNaptr(hostname20) {
    return Resolver1.prototype.resolveNaptr.bind(getDefaultResolver())(hostname20);
}
function resolveSoa(hostname21) {
    return Resolver1.prototype.resolveSoa.bind(getDefaultResolver())(hostname21);
}
function reverse(ip) {
    return Resolver1.prototype.reverse.bind(getDefaultResolver())(ip);
}
function resolve3(hostname22, rrtype) {
    return Resolver1.prototype.resolve.bind(getDefaultResolver())(hostname22, rrtype);
}
const __default7 = {
    lookup,
    Resolver: Resolver1,
    getServers,
    resolveAny,
    resolve4,
    resolve6,
    resolveCaa,
    resolveCname,
    resolveMx,
    resolveNs,
    resolveTxt,
    resolveSrv,
    resolvePtr,
    resolveNaptr,
    resolveSoa,
    resolve: resolve3,
    reverse
};
function onlookup1(err, addresses) {
    if (err) {
        return this.callback(dnsException(err, "getaddrinfo", this.hostname));
    }
    this.callback(null, addresses[0], this.family || isIP(addresses[0]));
}
function onlookupall1(err, addresses) {
    if (err) {
        return this.callback(dnsException(err, "getaddrinfo", this.hostname));
    }
    const family = this.family;
    const parsedAddresses = [];
    for(let i104 = 0; i104 < addresses.length; i104++){
        const addr = addresses[i104];
        parsedAddresses[i104] = {
            address: addr,
            family: family || isIP(addr)
        };
    }
    this.callback(null, parsedAddresses);
}
const validFamilies1 = [
    0,
    4,
    6
];
function lookup1(hostname23, options, callback) {
    let hints = 0;
    let family = 0;
    let all = false;
    let verbatim = getDefaultVerbatim();
    if (hostname23) {
        validateString(hostname23, "hostname");
    }
    if (isLookupCallback(options)) {
        callback = options;
        family = 0;
    } else if (isFamily(options)) {
        validateFunction(callback, "callback");
        validateOneOf(options, "family", validFamilies1);
        family = options;
    } else if (!isLookupOptions(options)) {
        validateFunction(arguments.length === 2 ? options : callback, "callback");
        throw new ERR_INVALID_ARG_TYPE("options", [
            "integer",
            "object"
        ], options);
    } else {
        validateFunction(callback, "callback");
        if (options?.hints != null) {
            validateNumber(options.hints, "options.hints");
            hints = options.hints >>> 0;
            validateHints(hints);
        }
        if (options?.family != null) {
            validateOneOf(options.family, "options.family", validFamilies1);
            family = options.family;
        }
        if (options?.all != null) {
            validateBoolean(options.all, "options.all");
            all = options.all;
        }
        if (options?.verbatim != null) {
            validateBoolean(options.verbatim, "options.verbatim");
            verbatim = options.verbatim;
        }
    }
    if (!hostname23) {
        emitInvalidHostnameWarning(hostname23);
        if (all) {
            nextTick2(callback, null, []);
        } else {
            nextTick2(callback, null, null, family === 6 ? 6 : 4);
        }
        return {};
    }
    const matchedFamily = isIP(hostname23);
    if (matchedFamily) {
        if (all) {
            nextTick2(callback, null, [
                {
                    address: hostname23,
                    family: matchedFamily
                }, 
            ]);
        } else {
            nextTick2(callback, null, hostname23, matchedFamily);
        }
        return {};
    }
    const req13 = new GetAddrInfoReqWrap();
    req13.callback = callback;
    req13.family = family;
    req13.hostname = hostname23;
    req13.oncomplete = all ? onlookupall1 : onlookup1;
    const err = getaddrinfo(req13, toASCII(hostname23), family, hints, verbatim);
    if (err) {
        nextTick2(callback, dnsException(err, "getaddrinfo", hostname23));
        return {};
    }
    return req13;
}
Object.defineProperty(lookup1, customPromisifyArgs, {
    value: [
        "address",
        "family"
    ],
    enumerable: false
});
function onresolve1(err, records, ttls) {
    if (err) {
        this.callback(dnsException(err, this.bindingName, this.hostname));
        return;
    }
    const parsedRecords = ttls && this.ttl ? records.map((address4, index)=>({
            address: address4,
            ttl: ttls[index]
        })
    ) : records;
    this.callback(null, parsedRecords);
}
function resolver1(bindingName) {
    function query2(name56, options, callback) {
        if (isResolveCallback(options)) {
            callback = options;
            options = {};
        }
        validateString(name56, "name");
        validateFunction(callback, "callback");
        const req14 = new QueryReqWrap();
        req14.bindingName = bindingName;
        req14.callback = callback;
        req14.hostname = name56;
        req14.oncomplete = onresolve1;
        if (options && options.ttl) {
            notImplemented("dns.resolve* with ttl option");
        }
        req14.ttl = !!(options && options.ttl);
        const err = this._handle[bindingName](req14, toASCII(name56));
        if (err) {
            throw dnsException(err, bindingName, name56);
        }
        return req14;
    }
    Object.defineProperty(query2, "name", {
        value: bindingName
    });
    return query2;
}
const resolveMap1 = Object.create(null);
class Resolver2 extends Resolver {
}
Resolver2.prototype.resolveAny = resolveMap1.ANY = resolver1("queryAny");
Resolver2.prototype.resolve4 = resolveMap1.A = resolver1("queryA");
Resolver2.prototype.resolve6 = resolveMap1.AAAA = resolver1("queryAaaa");
Resolver2.prototype.resolveCaa = resolveMap1.CAA = resolver1("queryCaa");
Resolver2.prototype.resolveCname = resolveMap1.CNAME = resolver1("queryCname");
Resolver2.prototype.resolveMx = resolveMap1.MX = resolver1("queryMx");
Resolver2.prototype.resolveNs = resolveMap1.NS = resolver1("queryNs");
Resolver2.prototype.resolveTxt = resolveMap1.TXT = resolver1("queryTxt");
Resolver2.prototype.resolveSrv = resolveMap1.SRV = resolver1("querySrv");
Resolver2.prototype.resolvePtr = resolveMap1.PTR = resolver1("queryPtr");
Resolver2.prototype.resolveNaptr = resolveMap1.NAPTR = resolver1("queryNaptr");
Resolver2.prototype.resolveSoa = resolveMap1.SOA = resolver1("querySoa");
Resolver2.prototype.reverse = resolver1("getHostByAddr");
Resolver2.prototype.resolve = _resolve1;
function _resolve1(hostname24, rrtype, callback) {
    let resolver11;
    if (typeof hostname24 !== "string") {
        throw new ERR_INVALID_ARG_TYPE("name", "string", hostname24);
    }
    if (typeof rrtype === "string") {
        resolver11 = resolveMap1[rrtype];
    } else if (typeof rrtype === "function") {
        resolver11 = resolveMap1.A;
        callback = rrtype;
    } else {
        throw new ERR_INVALID_ARG_TYPE("rrtype", "string", rrtype);
    }
    if (typeof resolver11 === "function") {
        return Reflect.apply(resolver11, this, [
            hostname24,
            callback
        ]);
    }
    throw new ERR_INVALID_ARG_VALUE("rrtype", rrtype);
}
function setServers(servers) {
    const resolver2 = new Resolver2();
    resolver2.setServers(servers);
    setDefaultResolver(resolver2);
}
Object.defineProperties(__default7, {
    setServers: {
        configurable: true,
        enumerable: true,
        value: setServers
    },
    setDefaultResultOrder: {
        configurable: true,
        enumerable: true,
        value: setDefaultResultOrder
    }
});
let debug1 = debuglog("net", (fn)=>{
    debug1 = fn;
});
const kLastWriteQueueSize = Symbol("lastWriteQueueSize");
const kSetNoDelay = Symbol("kSetNoDelay");
const kBytesRead = Symbol("kBytesRead");
const kBytesWritten1 = Symbol("kBytesWritten");
const DEFAULT_IPV4_ADDR = "0.0.0.0";
const DEFAULT_IPV6_ADDR = "::";
function _getNewAsyncId(handle) {
    return !handle || typeof handle.getAsyncId !== "function" ? newAsyncId1() : handle.getAsyncId();
}
const _noop = (_arrayBuffer, _nread)=>{
    return;
};
function _toNumber(x27) {
    return (x27 = Number(x27)) >= 0 ? x27 : false;
}
function _isPipeName(s) {
    return typeof s === "string" && _toNumber(s) === false;
}
function _normalizeArgs(args) {
    let arr;
    if (args.length === 0) {
        arr = [
            {},
            null
        ];
        arr[normalizedArgsSymbol] = true;
        return arr;
    }
    const arg0 = args[0];
    let options = {};
    if (typeof arg0 === "object" && arg0 !== null) {
        options = arg0;
    } else if (_isPipeName(arg0)) {
        options.path = arg0;
    } else {
        options.port = arg0;
        if (args.length > 1 && typeof args[1] === "string") {
            options.host = args[1];
        }
    }
    const cb = args[args.length - 1];
    if (!_isConnectionListener(cb)) {
        arr = [
            options,
            null
        ];
    } else {
        arr = [
            options,
            cb
        ];
    }
    arr[normalizedArgsSymbol] = true;
    return arr;
}
function _isTCPConnectWrap(req15) {
    return "localAddress" in req15 && "localPort" in req15;
}
function _afterConnect(status, handle, req16, readable, writable) {
    let socket = handle[ownerSymbol];
    if (socket.constructor.name === "ReusedHandle") {
        socket = socket.handle;
    }
    if (socket.destroyed) {
        return;
    }
    debug1("afterConnect");
    assert1(socket.connecting);
    socket.connecting = false;
    socket._sockname = null;
    if (status === 0) {
        if (socket.readable && !readable) {
            socket.push(null);
            socket.read();
        }
        if (socket.writable && !writable) {
            socket.end();
        }
        socket._unrefTimer();
        socket.emit("connect");
        socket.emit("ready");
        if (readable && !socket.isPaused()) {
            socket.read(0);
        }
    } else {
        socket.connecting = false;
        let details;
        if (_isTCPConnectWrap(req16)) {
            details = req16.localAddress + ":" + req16.localPort;
        }
        const ex = exceptionWithHostPort(status, "connect", req16.address, req16.port, details);
        if (_isTCPConnectWrap(req16)) {
            ex.localAddress = req16.localAddress;
            ex.localPort = req16.localPort;
        }
        socket.destroy(ex);
    }
}
function _checkBindError(err, port4, handle) {
    if (err === 0 && port4 > 0 && handle.getsockname) {
        const out = {};
        err = handle.getsockname(out);
        if (err === 0 && port4 !== out.port) {
            err = codeMap.get("EADDRINUSE");
        }
    }
    return err;
}
function _isPipe(options) {
    return "path" in options && !!options.path;
}
function _connectErrorNT(socket, err) {
    socket.destroy(err);
}
function _internalConnect(socket, address5, port5, addressType, localAddress, localPort, flags) {
    assert1(socket.connecting);
    let err;
    if (localAddress || localPort) {
        if (addressType === 4) {
            localAddress = localAddress || DEFAULT_IPV4_ADDR;
            err = socket._handle.bind(localAddress, localPort);
        } else {
            localAddress = localAddress || DEFAULT_IPV6_ADDR;
            err = socket._handle.bind6(localAddress, localPort, flags);
        }
        debug1("binding to localAddress: %s and localPort: %d (addressType: %d)", localAddress, localPort, addressType);
        err = _checkBindError(err, localPort, socket._handle);
        if (err) {
            const ex = exceptionWithHostPort(err, "bind", localAddress, localPort);
            socket.destroy(ex);
            return;
        }
    }
    if (addressType === 6 || addressType === 4) {
        const req17 = new TCPConnectWrap();
        req17.oncomplete = _afterConnect;
        req17.address = address5;
        req17.port = port5;
        req17.localAddress = localAddress;
        req17.localPort = localPort;
        if (addressType === 4) {
            err = socket._handle.connect(req17, address5, port5);
        } else {
            err = socket._handle.connect6(req17, address5, port5);
        }
    } else {
        const req18 = new PipeConnectWrap();
        req18.oncomplete = _afterConnect;
        req18.address = address5;
        err = socket._handle.connect(req18, address5);
    }
    if (err) {
        let details = "";
        const sockname = socket._getsockname();
        if (sockname) {
            details = `${sockname.address}:${sockname.port}`;
        }
        const ex = exceptionWithHostPort(err, "connect", address5, port5, details);
        socket.destroy(ex);
    }
}
function _writeAfterFIN(chunk, encoding, cb) {
    if (!this.writableEnded) {
        return Duplex.prototype.write.call(this, chunk, encoding, cb);
    }
    if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    const err = genericNodeError("This socket has been ended by the other party", {
        code: "EPIPE"
    });
    if (typeof cb === "function") {
        defaultTriggerAsyncIdScope(this[asyncIdSymbol], nextTick2, cb, err);
    }
    if (this._server) {
        nextTick2(()=>this.destroy(err)
        );
    } else {
        this.destroy(err);
    }
    return false;
}
function _tryReadStart(socket) {
    debug1("Socket._handle.readStart");
    socket._handle.reading = true;
    const err = socket._handle.readStart();
    if (err) {
        socket.destroy(errnoException(err, "read"));
    }
}
function _onReadableStreamEnd() {
    if (!this.allowHalfOpen) {
        this.write = _writeAfterFIN;
    }
}
function _initSocketHandle(socket) {
    socket._undestroy();
    socket._sockname = undefined;
    if (socket._handle) {
        socket._handle[ownerSymbol] = socket;
        socket._handle.onread = onStreamRead;
        socket[asyncIdSymbol] = _getNewAsyncId(socket._handle);
        let userBuf = socket[kBuffer];
        if (userBuf) {
            const bufGen = socket[kBufferGen];
            if (bufGen !== null) {
                userBuf = bufGen();
                if (!isUint8Array(userBuf)) {
                    return;
                }
                socket[kBuffer] = userBuf;
            }
            socket._handle.useUserBuffer(userBuf);
        }
    }
}
function _lookupAndConnect(self, options) {
    const { localAddress , localPort  } = options;
    const host = options.host || "localhost";
    let { port: port6  } = options;
    if (localAddress && !isIP(localAddress)) {
        throw new ERR_INVALID_IP_ADDRESS(localAddress);
    }
    if (localPort) {
        validateNumber(localPort, "options.localPort");
    }
    if (typeof port6 !== "undefined") {
        if (typeof port6 !== "number" && typeof port6 !== "string") {
            throw new ERR_INVALID_ARG_TYPE("options.port", [
                "number",
                "string"
            ], port6);
        }
        validatePort(port6);
    }
    port6 |= 0;
    const addressType1 = isIP(host);
    if (addressType1) {
        defaultTriggerAsyncIdScope(self[asyncIdSymbol], nextTick2, ()=>{
            if (self.connecting) {
                defaultTriggerAsyncIdScope(self[asyncIdSymbol], _internalConnect, self, host, port6, addressType1, localAddress, localPort);
            }
        });
        return;
    }
    if (options.lookup !== undefined) {
        validateFunction(options.lookup, "options.lookup");
    }
    const dnsOpts = {
        family: options.family,
        hints: options.hints || 0
    };
    if (!isWindows && dnsOpts.family !== 4 && dnsOpts.family !== 6 && dnsOpts.hints === 0) {
        dnsOpts.hints = AI_ADDRCONFIG;
    }
    debug1("connect: find host", host);
    debug1("connect: dns options", dnsOpts);
    self._host = host;
    const lookup2 = options.lookup || lookup1;
    defaultTriggerAsyncIdScope(self[asyncIdSymbol], function() {
        lookup2(host, dnsOpts, function emitLookup(err, ip, addressType) {
            self.emit("lookup", err, ip, addressType, host);
            if (!self.connecting) {
                return;
            }
            if (err) {
                nextTick2(_connectErrorNT, self, err);
            } else if (!isIP(ip)) {
                err = new ERR_INVALID_IP_ADDRESS(ip);
                nextTick2(_connectErrorNT, self, err);
            } else if (addressType !== 4 && addressType !== 6) {
                err = new ERR_INVALID_ADDRESS_FAMILY(`${addressType}`, options.host, options.port);
                nextTick2(_connectErrorNT, self, err);
            } else {
                self._unrefTimer();
                defaultTriggerAsyncIdScope(self[asyncIdSymbol], _internalConnect, self, ip, port6, addressType, localAddress, localPort);
            }
        });
    });
}
function _afterShutdown() {
    const self = this.handle[ownerSymbol];
    debug1("afterShutdown destroyed=%j", self.destroyed, self._readableState);
    this.callback();
}
function _emitCloseNT(s) {
    debug1("SERVER: emit close");
    s.emit("close");
}
class Socket extends Duplex {
    [asyncIdSymbol] = -1;
    [kHandle] = null;
    [kSetNoDelay] = false;
    [kLastWriteQueueSize] = 0;
    [kTimeout] = null;
    [kBuffer] = null;
    [kBufferCb] = null;
    [kBufferGen] = null;
    [kBytesRead] = 0;
    [kBytesWritten1] = 0;
    server = null;
    _server = null;
    _peername;
    _sockname;
    _pendingData = null;
    _pendingEncoding = "";
    _host = null;
    _parent = null;
    constructor(options){
        if (typeof options === "number") {
            options = {
                fd: options
            };
        } else {
            options = {
                ...options
            };
        }
        options.allowHalfOpen = Boolean(options.allowHalfOpen);
        options.emitClose = false;
        options.autoDestroy = true;
        options.decodeStrings = false;
        super(options);
        if (options.handle) {
            this._handle = options.handle;
            this[asyncIdSymbol] = _getNewAsyncId(this._handle);
        } else if (options.fd !== undefined) {
            notImplemented("net.Socket.prototype.constructor with fd option");
        }
        const onread = options.onread;
        if (onread !== null && typeof onread === "object" && (isUint8Array(onread.buffer) || typeof onread.buffer === "function") && typeof onread.callback === "function") {
            if (typeof onread.buffer === "function") {
                this[kBuffer] = true;
                this[kBufferGen] = onread.buffer;
            } else {
                this[kBuffer] = onread.buffer;
            }
            this[kBufferCb] = onread.callback;
        }
        this.on("end", _onReadableStreamEnd);
        _initSocketHandle(this);
        if (this._handle && options.readable !== false) {
            if (options.pauseOnCreate) {
                this._handle.reading = false;
                this._handle.readStop();
                this.readableFlowing = false;
            } else if (!options.manualStart) {
                this.read(0);
            }
        }
    }
    connect(...args) {
        let normalized;
        if (Array.isArray(args[0]) && args[0][normalizedArgsSymbol]) {
            normalized = args[0];
        } else {
            normalized = _normalizeArgs(args);
        }
        const options = normalized[0];
        const cb = normalized[1];
        if (options.port === undefined && options.path == null) {
            throw new ERR_MISSING_ARGS([
                "options",
                "port",
                "path"
            ]);
        }
        if (this.write !== Socket.prototype.write) {
            this.write = Socket.prototype.write;
        }
        if (this.destroyed) {
            this._handle = null;
            this._peername = undefined;
            this._sockname = undefined;
        }
        const { path: path29  } = options;
        const pipe = _isPipe(options);
        debug1("pipe", pipe, path29);
        if (!this._handle) {
            this._handle = pipe ? new Pipe(constants1.SOCKET) : new TCP(constants2.SOCKET);
            _initSocketHandle(this);
        }
        if (cb !== null) {
            this.once("connect", cb);
        }
        this._unrefTimer();
        this.connecting = true;
        if (pipe) {
            validateString(path29, "options.path");
            defaultTriggerAsyncIdScope(this[asyncIdSymbol], _internalConnect, this, path29);
        } else {
            _lookupAndConnect(this, options);
        }
        return this;
    }
    pause() {
        if (this[kBuffer] && !this.connecting && this._handle && this._handle.reading) {
            this._handle.reading = false;
            if (!this.destroyed) {
                const err = this._handle.readStop();
                if (err) {
                    this.destroy(errnoException(err, "read"));
                }
            }
        }
        return Duplex.prototype.pause.call(this);
    }
    resume() {
        if (this[kBuffer] && !this.connecting && this._handle && !this._handle.reading) {
            _tryReadStart(this);
        }
        return Duplex.prototype.resume.call(this);
    }
    setTimeout = setStreamTimeout;
    setNoDelay(noDelay) {
        if (!this._handle) {
            this.once("connect", noDelay ? this.setNoDelay : ()=>this.setNoDelay(noDelay)
            );
            return this;
        }
        const newValue = noDelay === undefined ? true : !!noDelay;
        if ("setNoDelay" in this._handle && this._handle.setNoDelay && newValue !== this[kSetNoDelay]) {
            this[kSetNoDelay] = newValue;
            this._handle.setNoDelay(newValue);
        }
        return this;
    }
    setKeepAlive(enable, initialDelay) {
        if (!this._handle) {
            this.once("connect", ()=>this.setKeepAlive(enable, initialDelay)
            );
            return this;
        }
        if ("setKeepAlive" in this._handle) {
            this._handle.setKeepAlive(enable, ~~(initialDelay / 1000));
        }
        return this;
    }
    address() {
        return this._getsockname();
    }
    unref() {
        if (!this._handle) {
            this.once("connect", this.unref);
            return this;
        }
        if (typeof this._handle.unref === "function") {
            this._handle.unref();
        }
        return this;
    }
    ref() {
        if (!this._handle) {
            this.once("connect", this.ref);
            return this;
        }
        if (typeof this._handle.ref === "function") {
            this._handle.ref();
        }
        return this;
    }
    get bufferSize() {
        if (this._handle) {
            return this.writableLength;
        }
        return 0;
    }
    get bytesRead() {
        return this._handle ? this._handle.bytesRead : this[kBytesRead];
    }
    get bytesWritten() {
        let bytes = this._bytesDispatched;
        const data4 = this._pendingData;
        const encoding = this._pendingEncoding;
        const writableBuffer = this.writableBuffer;
        if (!writableBuffer) {
            return undefined;
        }
        for (const el of writableBuffer){
            bytes += el.chunk instanceof Buffer ? el.chunk.length : Buffer.byteLength(el.chunk, el.encoding);
        }
        if (Array.isArray(data4)) {
            for(let i105 = 0; i105 < data4.length; i105++){
                const chunk = data4[i105];
                if (data4.allBuffers || chunk instanceof Buffer) {
                    bytes += chunk.length;
                } else {
                    bytes += Buffer.byteLength(chunk.chunk, chunk.encoding);
                }
            }
        } else if (data4) {
            if (typeof data4 !== "string") {
                bytes += data4.length;
            } else {
                bytes += Buffer.byteLength(data4, encoding);
            }
        }
        return bytes;
    }
    connecting = false;
    get localAddress() {
        return this._getsockname().address;
    }
    get localPort() {
        return this._getsockname().port;
    }
    get remoteAddress() {
        return this._getpeername().address;
    }
    get remoteFamily() {
        return `IPv${this._getpeername().family}`;
    }
    get remotePort() {
        return this._getpeername().port;
    }
    get pending() {
        return !this._handle || this.connecting;
    }
    get readyState() {
        if (this.connecting) {
            return "opening";
        } else if (this.readable && this.writable) {
            return "open";
        } else if (this.readable && !this.writable) {
            return "readOnly";
        } else if (!this.readable && this.writable) {
            return "writeOnly";
        }
        return "closed";
    }
    end(data5, encoding, cb) {
        Duplex.prototype.end.call(this, data5, encoding, cb);
        DTRACE_NET_STREAM_END(this);
        return this;
    }
    read(size) {
        if (this[kBuffer] && !this.connecting && this._handle && !this._handle.reading) {
            _tryReadStart(this);
        }
        return Duplex.prototype.read.call(this, size);
    }
    destroySoon() {
        if (this.writable) {
            this.end();
        }
        if (this.writableFinished) {
            this.destroy();
        } else {
            this.once("finish", this.destroy);
        }
    }
    _unrefTimer() {
        for(let s = this; s !== null; s = s._parent){
            if (s[kTimeout]) {
                s[kTimeout].refresh();
            }
        }
    }
    _final(cb) {
        if (this.pending) {
            debug1("_final: not yet connected");
            return this.once("connect", ()=>this._final(cb)
            );
        }
        if (!this._handle) {
            return cb();
        }
        debug1("_final: not ended, call shutdown()");
        const req19 = new ShutdownWrap();
        req19.oncomplete = _afterShutdown;
        req19.handle = this._handle;
        req19.callback = cb;
        const err = this._handle.shutdown(req19);
        if (err === 1 || err === codeMap.get("ENOTCONN")) {
            return cb();
        } else if (err !== 0) {
            return cb(errnoException(err, "shutdown"));
        }
    }
    _onTimeout() {
        const handle = this._handle;
        const lastWriteQueueSize = this[kLastWriteQueueSize];
        if (lastWriteQueueSize > 0 && handle) {
            const { writeQueueSize  } = handle;
            if (lastWriteQueueSize !== writeQueueSize) {
                this[kLastWriteQueueSize] = writeQueueSize;
                this._unrefTimer();
                return;
            }
        }
        debug1("_onTimeout");
        this.emit("timeout");
    }
    _read(size) {
        debug1("_read");
        if (this.connecting || !this._handle) {
            debug1("_read wait for connection");
            this.once("connect", ()=>this._read(size)
            );
        } else if (!this._handle.reading) {
            _tryReadStart(this);
        }
    }
    _destroy(exception, cb) {
        debug1("destroy");
        this.connecting = false;
        for(let s = this; s !== null; s = s._parent){
            clearTimeout(s[kTimeout]);
        }
        debug1("close");
        if (this._handle) {
            debug1("close handle");
            const isException = exception ? true : false;
            this[kBytesRead] = this._handle.bytesRead;
            this[kBytesWritten1] = this._handle.bytesWritten;
            this._handle.close(()=>{
                this._handle.onread = _noop;
                this._handle = null;
                this._sockname = undefined;
                cb(exception);
                debug1("emit close");
                this.emit("close", isException);
            });
        } else {
            cb(exception);
            nextTick2(_emitCloseNT, this);
        }
        if (this._server) {
            debug1("has server");
            this._server._connections--;
            if (this._server._emitCloseIfDrained) {
                this._server._emitCloseIfDrained();
            }
        }
    }
    _getpeername() {
        if (!this._handle || !("getpeername" in this._handle)) {
            return this._peername || {};
        } else if (!this._peername) {
            this._peername = {};
            this._handle.getpeername(this._peername);
        }
        return this._peername;
    }
    _getsockname() {
        if (!this._handle || !("getsockname" in this._handle)) {
            return {};
        } else if (!this._sockname) {
            this._sockname = {};
            this._handle.getsockname(this._sockname);
        }
        return this._sockname;
    }
    _writeGeneric(writev2, data6, encoding, cb) {
        if (this.connecting) {
            this._pendingData = data6;
            this._pendingEncoding = encoding;
            this.once("connect", function connect() {
                this._writeGeneric(writev2, data6, encoding, cb);
            });
            return;
        }
        this._pendingData = null;
        this._pendingEncoding = "";
        if (!this._handle) {
            cb(new ERR_SOCKET_CLOSED());
            return false;
        }
        this._unrefTimer();
        let req20;
        if (writev2) {
            req20 = writevGeneric(this, data6, cb);
        } else {
            req20 = writeGeneric(this, data6, encoding, cb);
        }
        if (req20.async) {
            this[kLastWriteQueueSize] = req20.bytes;
        }
    }
    _writev(chunks, cb) {
        this._writeGeneric(true, chunks, "", cb);
    }
    _write(data7, encoding, cb) {
        this._writeGeneric(false, data7, encoding, cb);
    }
    [kAfterAsyncWrite]() {
        this[kLastWriteQueueSize] = 0;
    }
    get [kUpdateTimer]() {
        return this._unrefTimer;
    }
    get _connecting() {
        return this.connecting;
    }
    get _bytesDispatched() {
        return this._handle ? this._handle.bytesWritten : this[kBytesWritten1];
    }
    get _handle() {
        return this[kHandle];
    }
    set _handle(v11) {
        this[kHandle] = v11;
    }
}
function connect1(...args) {
    const normalized = _normalizeArgs(args);
    const options = normalized[0];
    debug1("createConnection", normalized);
    const socket = new Socket(options);
    if (options.timeout) {
        socket.setTimeout(options.timeout);
    }
    return socket.connect(normalized);
}
const createConnection = connect1;
function _isConnectionListener(connectionListener) {
    return typeof connectionListener === "function";
}
function getConsoleWidth() {
    try {
        return consoleSize(Deno.stderr.rid).columns;
    } catch  {
        return 80;
    }
}
const MathMax = Math.max;
const { Error: Error1  } = globalThis;
const { create: ObjectCreate , defineProperty: ObjectDefineProperty , getPrototypeOf: ObjectGetPrototypeOf , getOwnPropertyDescriptor: ObjectGetOwnPropertyDescriptor , keys: ObjectKeys ,  } = Object;
let blue = "";
let green1 = "";
let red1 = "";
let defaultColor = "";
const kReadableOperator = {
    deepStrictEqual: "Expected values to be strictly deep-equal:",
    strictEqual: "Expected values to be strictly equal:",
    strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
    deepEqual: "Expected values to be loosely deep-equal:",
    notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
    notStrictEqual: 'Expected "actual" to be strictly unequal to:',
    notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
    notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
    notIdentical: "Values have same structure but are not reference-equal:",
    notDeepEqualUnequal: "Expected values not to be loosely deep-equal:"
};
function copyError(source) {
    const keys = ObjectKeys(source);
    const target = ObjectCreate(ObjectGetPrototypeOf(source));
    for (const key of keys){
        const desc = ObjectGetOwnPropertyDescriptor(source, key);
        if (desc !== undefined) {
            ObjectDefineProperty(target, key, desc);
        }
    }
    ObjectDefineProperty(target, "message", {
        value: source.message
    });
    return target;
}
function inspectValue(val) {
    return inspect(val, {
        compact: true,
        customInspect: false,
        depth: 1000,
        maxArrayLength: Infinity,
        showHidden: false,
        showProxy: false,
        sorted: true,
        getters: true
    });
}
function createErrDiff(actual, expected, operator) {
    let other = "";
    let res = "";
    let end = "";
    let skipped = false;
    const actualInspected = inspectValue(actual);
    const actualLines = actualInspected.split("\n");
    const expectedLines = inspectValue(expected).split("\n");
    let i106 = 0;
    let indicator = "";
    if (operator === "strictEqual" && (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null || typeof actual === "function" && typeof expected === "function")) {
        operator = "strictEqualObject";
    }
    if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
        const c = inspect.defaultOptions.colors;
        const actualRaw = c ? stripColor(actualLines[0]) : actualLines[0];
        const expectedRaw = c ? stripColor(expectedLines[0]) : expectedLines[0];
        const inputLength = actualRaw.length + expectedRaw.length;
        if (inputLength <= 12) {
            if ((typeof actual !== "object" || actual === null) && (typeof expected !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
                return `${kReadableOperator[operator]}\n\n` + `${actualLines[0]} !== ${expectedLines[0]}\n`;
            }
        } else if (operator !== "strictEqualObject") {
            const maxLength = Deno.isatty(Deno.stderr.rid) ? getConsoleWidth() : 80;
            if (inputLength < maxLength) {
                while(actualRaw[i106] === expectedRaw[i106]){
                    i106++;
                }
                if (i106 > 2) {
                    indicator = `\n  ${" ".repeat(i106)}^`;
                    i106 = 0;
                }
            }
        }
    }
    let a = actualLines[actualLines.length - 1];
    let b16 = expectedLines[expectedLines.length - 1];
    while(a === b16){
        if (i106++ < 3) {
            end = `\n  ${a}${end}`;
        } else {
            other = a;
        }
        actualLines.pop();
        expectedLines.pop();
        if (actualLines.length === 0 || expectedLines.length === 0) {
            break;
        }
        a = actualLines[actualLines.length - 1];
        b16 = expectedLines[expectedLines.length - 1];
    }
    const maxLines = MathMax(actualLines.length, expectedLines.length);
    if (maxLines === 0) {
        const actualLines = actualInspected.split("\n");
        if (actualLines.length > 50) {
            actualLines[46] = `${blue}...${defaultColor}`;
            while(actualLines.length > 47){
                actualLines.pop();
            }
        }
        return `${kReadableOperator.notIdentical}\n\n${actualLines.join("\n")}\n`;
    }
    if (i106 >= 5) {
        end = `\n${blue}...${defaultColor}${end}`;
        skipped = true;
    }
    if (other !== "") {
        end = `\n  ${other}${end}`;
        other = "";
    }
    let printedLines = 0;
    let identical = 0;
    const msg = kReadableOperator[operator] + `\n${green1}+ actual${defaultColor} ${red1}- expected${defaultColor}`;
    const skippedMsg = ` ${blue}...${defaultColor} Lines skipped`;
    let lines = actualLines;
    let plusMinus = `${green1}+${defaultColor}`;
    let maxLength = expectedLines.length;
    if (actualLines.length < maxLines) {
        lines = expectedLines;
        plusMinus = `${red1}-${defaultColor}`;
        maxLength = actualLines.length;
    }
    for(i106 = 0; i106 < maxLines; i106++){
        if (maxLength < i106 + 1) {
            if (identical > 2) {
                if (identical > 3) {
                    if (identical > 4) {
                        if (identical === 5) {
                            res += `\n  ${lines[i106 - 3]}`;
                            printedLines++;
                        } else {
                            res += `\n${blue}...${defaultColor}`;
                            skipped = true;
                        }
                    }
                    res += `\n  ${lines[i106 - 2]}`;
                    printedLines++;
                }
                res += `\n  ${lines[i106 - 1]}`;
                printedLines++;
            }
            identical = 0;
            if (lines === actualLines) {
                res += `\n${plusMinus} ${lines[i106]}`;
            } else {
                other += `\n${plusMinus} ${lines[i106]}`;
            }
            printedLines++;
        } else {
            const expectedLine = expectedLines[i106];
            let actualLine = actualLines[i106];
            let divergingLines = actualLine !== expectedLine && (!actualLine.endsWith(",") || actualLine.slice(0, -1) !== expectedLine);
            if (divergingLines && expectedLine.endsWith(",") && expectedLine.slice(0, -1) === actualLine) {
                divergingLines = false;
                actualLine += ",";
            }
            if (divergingLines) {
                if (identical > 2) {
                    if (identical > 3) {
                        if (identical > 4) {
                            if (identical === 5) {
                                res += `\n  ${actualLines[i106 - 3]}`;
                                printedLines++;
                            } else {
                                res += `\n${blue}...${defaultColor}`;
                                skipped = true;
                            }
                        }
                        res += `\n  ${actualLines[i106 - 2]}`;
                        printedLines++;
                    }
                    res += `\n  ${actualLines[i106 - 1]}`;
                    printedLines++;
                }
                identical = 0;
                res += `\n${green1}+${defaultColor} ${actualLine}`;
                other += `\n${red1}-${defaultColor} ${expectedLine}`;
                printedLines += 2;
            } else {
                res += other;
                other = "";
                identical++;
                if (identical <= 2) {
                    res += `\n  ${actualLine}`;
                    printedLines++;
                }
            }
        }
        if (printedLines > 50 && i106 < maxLines - 2) {
            return `${msg}${skippedMsg}\n${res}\n${blue}...${defaultColor}${other}\n` + `${blue}...${defaultColor}`;
        }
    }
    return `${msg}${skipped ? skippedMsg : ""}\n${res}${other}${end}${indicator}`;
}
class AssertionError1 extends Error1 {
    constructor(options){
        if (typeof options !== "object" || options === null) {
            throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        const { message , operator , stackStartFn , details , stackStartFunction ,  } = options;
        let { actual , expected ,  } = options;
        const limit = Error1.stackTraceLimit;
        Error1.stackTraceLimit = 0;
        if (message != null) {
            super(String(message));
        } else {
            if (Deno.isatty(Deno.stderr.rid)) {
                if (Deno.noColor) {
                    blue = "";
                    green1 = "";
                    defaultColor = "";
                    red1 = "";
                } else {
                    blue = "\u001b[34m";
                    green1 = "\u001b[32m";
                    defaultColor = "\u001b[39m";
                    red1 = "\u001b[31m";
                }
            }
            if (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null && "stack" in actual && actual instanceof Error1 && "stack" in expected && expected instanceof Error1) {
                actual = copyError(actual);
                expected = copyError(expected);
            }
            if (operator === "deepStrictEqual" || operator === "strictEqual") {
                super(createErrDiff(actual, expected, operator));
            } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
                let base8 = kReadableOperator[operator];
                const res = inspectValue(actual).split("\n");
                if (operator === "notStrictEqual" && (typeof actual === "object" && actual !== null || typeof actual === "function")) {
                    base8 = kReadableOperator.notStrictEqualObject;
                }
                if (res.length > 50) {
                    res[46] = `${blue}...${defaultColor}`;
                    while(res.length > 47){
                        res.pop();
                    }
                }
                if (res.length === 1) {
                    super(`${base8}${res[0].length > 5 ? "\n\n" : " "}${res[0]}`);
                } else {
                    super(`${base8}\n\n${res.join("\n")}\n`);
                }
            } else {
                let res = inspectValue(actual);
                let other = inspectValue(expected);
                const knownOperator = kReadableOperator[operator ?? ""];
                if (operator === "notDeepEqual" && res === other) {
                    res = `${knownOperator}\n\n${res}`;
                    if (res.length > 1024) {
                        res = `${res.slice(0, 1021)}...`;
                    }
                    super(res);
                } else {
                    if (res.length > 512) {
                        res = `${res.slice(0, 509)}...`;
                    }
                    if (other.length > 512) {
                        other = `${other.slice(0, 509)}...`;
                    }
                    if (operator === "deepEqual") {
                        res = `${knownOperator}\n\n${res}\n\nshould loosely deep-equal\n\n`;
                    } else {
                        const newOp = kReadableOperator[`${operator}Unequal`];
                        if (newOp) {
                            res = `${newOp}\n\n${res}\n\nshould not loosely deep-equal\n\n`;
                        } else {
                            other = ` ${operator} ${other}`;
                        }
                    }
                    super(`${res}${other}`);
                }
            }
        }
        Error1.stackTraceLimit = limit;
        this.generatedMessage = !message;
        ObjectDefineProperty(this, "name", {
            value: "AssertionError [ERR_ASSERTION]",
            enumerable: false,
            writable: true,
            configurable: true
        });
        this.code = "ERR_ASSERTION";
        if (details) {
            this.actual = undefined;
            this.expected = undefined;
            this.operator = undefined;
            for(let i107 = 0; i107 < details.length; i107++){
                this["message " + i107] = details[i107].message;
                this["actual " + i107] = details[i107].actual;
                this["expected " + i107] = details[i107].expected;
                this["operator " + i107] = details[i107].operator;
                this["stack trace " + i107] = details[i107].stack;
            }
        } else {
            this.actual = actual;
            this.expected = expected;
            this.operator = operator;
        }
        Error1.captureStackTrace(this, stackStartFn || stackStartFunction);
        this.stack;
        this.name = "AssertionError";
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
    [inspect.custom](_recurseTimes, ctx) {
        const tmpActual = this.actual;
        const tmpExpected = this.expected;
        for (const name57 of [
            "actual",
            "expected"
        ]){
            if (typeof this[name57] === "string") {
                const value = this[name57];
                const lines = value.split("\n");
                if (lines.length > 10) {
                    lines.length = 10;
                    this[name57] = `${lines.join("\n")}\n...`;
                } else if (value.length > 512) {
                    this[name57] = `${value.slice(512)}...`;
                }
            }
        }
        const result = inspect(this, {
            ...ctx,
            customInspect: false,
            depth: 0
        });
        this.actual = tmpActual;
        this.expected = tmpExpected;
        return result;
    }
}
function createAssertionError(options) {
    const error19 = new AssertionError1(options);
    if (options.generatedMessage) {
        error19.generatedMessage = true;
    }
    return error19;
}
function toNode(fn, opts) {
    const { operator , message , actual , expected  } = opts || {};
    try {
        fn();
    } catch (e) {
        if (e instanceof AssertionError) {
            if (typeof message === "string") {
                throw new AssertionError1({
                    operator,
                    message,
                    actual,
                    expected
                });
            } else if (message instanceof Error) {
                throw message;
            } else {
                throw new AssertionError1({
                    operator,
                    message: e.message,
                    actual,
                    expected
                });
            }
        }
        throw e;
    }
}
function assert2(actual, message) {
    if (arguments.length === 0) {
        throw new AssertionError1({
            message: "No value argument passed to `assert.ok()`"
        });
    }
    toNode(()=>assert(actual)
    , {
        message,
        actual,
        expected: true
    });
}
const ok = assert2;
function __throws(fn, error20, message) {
    if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "function", fn);
    }
    if (typeof error20 === "object" && error20 !== null && Object.getPrototypeOf(error20) === Object.prototype && Object.keys(error20).length === 0) {
        throw new ERR_INVALID_ARG_VALUE("error", error20, "may not be an empty object");
    }
    if (typeof message === "string") {
        if (!(error20 instanceof RegExp) && typeof error20 !== "function" && !(error20 instanceof Error) && typeof error20 !== "object") {
            throw new ERR_INVALID_ARG_TYPE("error", [
                "Function",
                "Error",
                "RegExp",
                "Object", 
            ], error20);
        }
    } else {
        if (typeof error20 !== "undefined" && typeof error20 !== "string" && !(error20 instanceof RegExp) && typeof error20 !== "function" && !(error20 instanceof Error) && typeof error20 !== "object") {
            throw new ERR_INVALID_ARG_TYPE("error", [
                "Function",
                "Error",
                "RegExp",
                "Object", 
            ], error20);
        }
    }
    try {
        fn();
    } catch (e) {
        if (validateThrownError(e, error20, message, {
            operator: __throws
        })) {
            return;
        }
    }
    if (message) {
        let msg = `Missing expected exception: ${message}`;
        if (typeof error20 === "function" && error20?.name) {
            msg = `Missing expected exception (${error20.name}): ${message}`;
        }
        throw new AssertionError1({
            message: msg,
            operator: "throws",
            actual: undefined,
            expected: error20
        });
    } else if (typeof error20 === "string") {
        throw new AssertionError1({
            message: `Missing expected exception: ${error20}`,
            operator: "throws",
            actual: undefined,
            expected: undefined
        });
    } else if (typeof error20 === "function" && error20?.prototype !== undefined) {
        throw new AssertionError1({
            message: `Missing expected exception (${error20.name}).`,
            operator: "throws",
            actual: undefined,
            expected: error20
        });
    } else {
        throw new AssertionError1({
            message: "Missing expected exception.",
            operator: "throws",
            actual: undefined,
            expected: error20
        });
    }
}
function doesNotThrow(fn, expected, message) {
    if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "function", fn);
    } else if (!(expected instanceof RegExp) && typeof expected !== "function" && typeof expected !== "string" && typeof expected !== "undefined") {
        throw new ERR_INVALID_ARG_TYPE("expected", [
            "Function",
            "RegExp"
        ], fn);
    }
    try {
        fn();
    } catch (e) {
        gotUnwantedException(e, expected, message, doesNotThrow);
    }
    return;
}
function equal1(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (actual == expected) {
        return;
    }
    if (Number.isNaN(actual) && Number.isNaN(expected)) {
        return;
    }
    if (typeof message === "string") {
        throw new AssertionError1({
            message
        });
    } else if (message instanceof Error) {
        throw message;
    }
    toNode(()=>assertStrictEquals(actual, expected)
    , {
        message: message || `${actual} == ${expected}`,
        operator: "==",
        actual,
        expected
    });
}
function notEqual(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (Number.isNaN(actual) && Number.isNaN(expected)) {
        throw new AssertionError1({
            message: `${actual} != ${expected}`,
            operator: "!=",
            actual,
            expected
        });
    }
    if (actual != expected) {
        return;
    }
    if (typeof message === "string") {
        throw new AssertionError1({
            message
        });
    } else if (message instanceof Error) {
        throw message;
    }
    toNode(()=>assertNotStrictEquals(actual, expected)
    , {
        message: message || `${actual} != ${expected}`,
        operator: "!=",
        actual,
        expected
    });
}
function strictEqual(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    toNode(()=>assertStrictEquals(actual, expected)
    , {
        message,
        operator: "strictEqual",
        actual,
        expected
    });
}
function notStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    toNode(()=>assertNotStrictEquals(actual, expected)
    , {
        message,
        actual,
        expected,
        operator: "notStrictEqual"
    });
}
function deepEqual() {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    throw new Error("Not implemented");
}
function notDeepEqual() {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    throw new Error("Not implemented");
}
function deepStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    toNode(()=>assertEquals(actual, expected)
    , {
        message,
        actual,
        expected,
        operator: "deepStrictEqual"
    });
}
function notDeepStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
    }
    toNode(()=>assertNotEquals(actual, expected)
    , {
        message,
        actual,
        expected,
        operator: "deepNotStrictEqual"
    });
}
function fail(message) {
    if (typeof message === "string" || message == null) {
        throw createAssertionError({
            message: message ?? "Failed",
            operator: "fail",
            generatedMessage: message == null
        });
    } else {
        throw message;
    }
}
function match(actual, regexp, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "regexp");
    }
    if (!(regexp instanceof RegExp)) {
        throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
    }
    toNode(()=>assertMatch(actual, regexp)
    , {
        message,
        actual,
        expected: regexp,
        operator: "match"
    });
}
function doesNotMatch(string, regexp, message) {
    if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("string", "regexp");
    }
    if (!(regexp instanceof RegExp)) {
        throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
    }
    if (typeof string !== "string") {
        if (message instanceof Error) {
            throw message;
        }
        throw new AssertionError1({
            message: message || `The "string" argument must be of type string. Received type ${typeof string} (${inspect(string)})`,
            actual: string,
            expected: regexp,
            operator: "doesNotMatch"
        });
    }
    toNode(()=>assertNotMatch(string, regexp)
    , {
        message,
        actual: string,
        expected: regexp,
        operator: "doesNotMatch"
    });
}
function strict(actual, message) {
    if (arguments.length === 0) {
        throw new AssertionError1({
            message: "No value argument passed to `assert.ok()`"
        });
    }
    assert2(actual, message);
}
function rejects(asyncFn, error21, message1) {
    let promise;
    if (typeof asyncFn === "function") {
        try {
            promise = asyncFn();
        } catch (err) {
            return Promise.reject(err);
        }
        if (!isValidThenable(promise)) {
            return Promise.reject(new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", promise));
        }
    } else if (!isValidThenable(asyncFn)) {
        return Promise.reject(new ERR_INVALID_ARG_TYPE("promiseFn", [
            "function",
            "Promise"
        ], asyncFn));
    } else {
        promise = asyncFn;
    }
    function onFulfilled() {
        let message = "Missing expected rejection";
        if (typeof error21 === "string") {
            message += `: ${error21}`;
        } else if (typeof error21 === "function" && error21.prototype !== undefined) {
            message += ` (${error21.name}).`;
        } else {
            message += ".";
        }
        return Promise.reject(createAssertionError({
            message,
            operator: "rejects",
            generatedMessage: true
        }));
    }
    function rejects_onRejected(e) {
        if (validateThrownError(e, error21, message1, {
            operator: rejects,
            validationFunctionName: "validate"
        })) {
            return;
        }
    }
    return promise.then(onFulfilled, rejects_onRejected);
}
function doesNotReject(asyncFn, error22, message) {
    let promise;
    if (typeof asyncFn === "function") {
        try {
            const value = asyncFn();
            if (!isValidThenable(value)) {
                return Promise.reject(new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", value));
            }
            promise = value;
        } catch (e) {
            return Promise.reject(e);
        }
    } else if (!isValidThenable(asyncFn)) {
        return Promise.reject(new ERR_INVALID_ARG_TYPE("promiseFn", [
            "function",
            "Promise"
        ], asyncFn));
    } else {
        promise = asyncFn;
    }
    return promise.then(()=>{}, (e)=>gotUnwantedException(e, error22, message, doesNotReject)
    );
}
function gotUnwantedException(e, expected, message, operator) {
    if (typeof expected === "string") {
        throw new AssertionError1({
            message: `Got unwanted exception: ${expected}\nActual message: "${e.message}"`,
            operator: operator.name
        });
    } else if (typeof expected === "function" && expected.prototype !== undefined) {
        if (e instanceof expected) {
            let msg = `Got unwanted exception: ${e.constructor?.name}`;
            if (message) {
                msg += ` ${String(message)}`;
            }
            throw new AssertionError1({
                message: msg,
                operator: operator.name
            });
        } else if (expected.prototype instanceof Error) {
            throw e;
        } else {
            const result = expected(e);
            if (result === true) {
                let msg = `Got unwanted rejection.\nActual message: "${e.message}"`;
                if (message) {
                    msg += ` ${String(message)}`;
                }
                throw new AssertionError1({
                    message: msg,
                    operator: operator.name
                });
            }
        }
        throw e;
    } else {
        if (message) {
            throw new AssertionError1({
                message: `Got unwanted exception: ${message}\nActual message: "${e ? e.message : String(e)}"`,
                operator: operator.name
            });
        }
        throw new AssertionError1({
            message: `Got unwanted exception.\nActual message: "${e ? e.message : String(e)}"`,
            operator: operator.name
        });
    }
}
function ifError(err) {
    if (err !== null && err !== undefined) {
        let message = "ifError got unwanted exception: ";
        if (typeof err === "object" && typeof err.message === "string") {
            if (err.message.length === 0 && err.constructor) {
                message += err.constructor.name;
            } else {
                message += err.message;
            }
        } else {
            message += inspect(err);
        }
        const newErr = new AssertionError1({
            actual: err,
            expected: null,
            operator: "ifError",
            message,
            stackStartFn: ifError
        });
        const origStack = err.stack;
        if (typeof origStack === "string") {
            const tmp2 = origStack.split("\n");
            tmp2.shift();
            let tmp1 = newErr.stack?.split("\n");
            for (const errFrame of tmp2){
                const pos = tmp1?.indexOf(errFrame);
                if (pos !== -1) {
                    tmp1 = tmp1?.slice(0, pos);
                    break;
                }
            }
            newErr.stack = `${tmp1?.join("\n")}\n${tmp2.join("\n")}`;
        }
        throw newErr;
    }
}
function validateThrownError(e, error23, message, options) {
    if (typeof error23 === "string") {
        if (message != null) {
            throw new ERR_INVALID_ARG_TYPE("error", [
                "Object",
                "Error",
                "Function",
                "RegExp"
            ], error23);
        } else if (typeof e === "object" && e !== null) {
            if (e.message === error23) {
                throw new ERR_AMBIGUOUS_ARGUMENT("error/message", `The error message "${e.message}" is identical to the message.`);
            }
        } else if (e === error23) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", `The error "${e}" is identical to the message.`);
        }
        message = error23;
        error23 = undefined;
    }
    if (error23 instanceof Function && error23.prototype !== undefined && error23.prototype instanceof Error) {
        if (e instanceof error23) {
            return true;
        }
        throw createAssertionError({
            message: `The error is expected to be an instance of "${error23.name}". Received "${e?.constructor?.name}"\n\nError message:\n\n${e?.message}`,
            actual: e,
            expected: error23,
            operator: options.operator.name,
            generatedMessage: true
        });
    }
    if (error23 instanceof Function) {
        const received = error23(e);
        if (received === true) {
            return true;
        }
        throw createAssertionError({
            message: `The ${options.validationFunctionName ? `"${options.validationFunctionName}" validation` : "validation"} function is expected to return "true". Received ${inspect(received)}\n\nCaught error:\n\n${e}`,
            actual: e,
            expected: error23,
            operator: options.operator.name,
            generatedMessage: true
        });
    }
    if (error23 instanceof RegExp) {
        if (error23.test(String(e))) {
            return true;
        }
        throw createAssertionError({
            message: `The input did not match the regular expression ${error23.toString()}. Input:\n\n'${String(e)}'\n`,
            actual: e,
            expected: error23,
            operator: options.operator.name,
            generatedMessage: true
        });
    }
    if (typeof error23 === "object" && error23 !== null) {
        const keys = Object.keys(error23);
        if (error23 instanceof Error) {
            keys.push("name", "message");
        }
        for (const k10 of keys){
            if (e == null) {
                throw createAssertionError({
                    message: message || "object is expected to thrown, but got null",
                    actual: e,
                    expected: error23,
                    operator: options.operator.name,
                    generatedMessage: message == null
                });
            }
            if (typeof e === "string") {
                throw createAssertionError({
                    message: message || `object is expected to thrown, but got string: ${e}`,
                    actual: e,
                    expected: error23,
                    operator: options.operator.name,
                    generatedMessage: message == null
                });
            }
            if (typeof e === "number") {
                throw createAssertionError({
                    message: message || `object is expected to thrown, but got number: ${e}`,
                    actual: e,
                    expected: error23,
                    operator: options.operator.name,
                    generatedMessage: message == null
                });
            }
            if (!(k10 in e)) {
                throw createAssertionError({
                    message: message || `A key in the expected object is missing: ${k10}`,
                    actual: e,
                    expected: error23,
                    operator: options.operator.name,
                    generatedMessage: message == null
                });
            }
            const actual = e[k10];
            const expected = error23[k10];
            if (typeof actual === "string" && expected instanceof RegExp) {
                match(actual, expected);
            } else {
                deepStrictEqual(actual, expected);
            }
        }
        return true;
    }
    if (typeof error23 === "undefined") {
        return true;
    }
    throw createAssertionError({
        message: `Invalid expectation: ${error23}`,
        operator: options.operator.name,
        generatedMessage: true
    });
}
function isValidThenable(maybeThennable) {
    if (!maybeThennable) {
        return false;
    }
    if (maybeThennable instanceof Promise) {
        return true;
    }
    const isThenable = typeof maybeThennable.then === "function" && typeof maybeThennable.catch === "function";
    return isThenable && typeof maybeThennable !== "function";
}
Object.assign(strict, {
    AssertionError: AssertionError1,
    deepEqual: deepStrictEqual,
    deepStrictEqual,
    doesNotMatch,
    doesNotReject,
    doesNotThrow,
    equal: strictEqual,
    fail,
    ifError,
    match,
    notDeepEqual: notDeepStrictEqual,
    notDeepStrictEqual,
    notEqual: notStrictEqual,
    notStrictEqual,
    ok,
    rejects,
    strict,
    strictEqual,
    throws: __throws
});
Object.assign(assert2, {
    AssertionError: AssertionError1,
    deepEqual,
    deepStrictEqual,
    doesNotMatch,
    doesNotReject,
    doesNotThrow,
    equal: equal1,
    fail,
    ifError,
    match,
    notDeepEqual,
    notDeepStrictEqual,
    notEqual,
    notStrictEqual,
    ok,
    rejects,
    strict,
    strictEqual,
    throws: __throws
});
const CHAR_FORWARD_SLASH1 = 47;
function assertPath1(path30) {
    if (typeof path30 !== "string") {
        throw new ERR_INVALID_ARG_TYPE("path", [
            "string"
        ], path30);
    }
}
function isPosixPathSeparator1(code50) {
    return code50 === 47;
}
function isPathSeparator1(code51) {
    return isPosixPathSeparator1(code51) || code51 === 92;
}
function isWindowsDeviceRoot1(code52) {
    return code52 >= 97 && code52 <= 122 || code52 >= 65 && code52 <= 90;
}
function normalizeString1(path31, allowAboveRoot, separator, isPathSeparator11) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code53;
    for(let i108 = 0, len = path31.length; i108 <= len; ++i108){
        if (i108 < len) code53 = path31.charCodeAt(i108);
        else if (isPathSeparator11(code53)) break;
        else code53 = CHAR_FORWARD_SLASH1;
        if (isPathSeparator11(code53)) {
            if (lastSlash === i108 - 1 || dots === 1) {} else if (lastSlash !== i108 - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i108;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i108;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path31.slice(lastSlash + 1, i108);
                else res = path31.slice(lastSlash + 1, i108);
                lastSegmentLength = i108 - lastSlash - 1;
            }
            lastSlash = i108;
            dots = 0;
        } else if (code53 === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format1(sep7, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base9 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base9;
    if (dir === pathObject.root) return dir + base9;
    return dir + sep7 + base9;
}
const WHITESPACE_ENCODINGS1 = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace1(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS1[c] ?? c;
    });
}
const sep3 = "\\";
const delimiter4 = ";";
function resolve5(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i109 = pathSegments.length - 1; i109 >= -1; i109--){
        let path32;
        const { Deno  } = globalThis;
        if (i109 >= 0) {
            path32 = pathSegments[i109];
        } else if (!resolvedDevice) {
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path32 = Deno.cwd();
        } else {
            if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path32 = Deno.cwd();
            if (path32 === undefined || path32.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path32 = `${resolvedDevice}\\`;
            }
        }
        assertPath1(path32);
        const len = path32.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute11 = false;
        const code54 = path32.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator1(code54)) {
                isAbsolute11 = true;
                if (isPathSeparator1(path32.charCodeAt(1))) {
                    let j15 = 2;
                    let last = j15;
                    for(; j15 < len; ++j15){
                        if (isPathSeparator1(path32.charCodeAt(j15))) break;
                    }
                    if (j15 < len && j15 !== last) {
                        const firstPart = path32.slice(last, j15);
                        last = j15;
                        for(; j15 < len; ++j15){
                            if (!isPathSeparator1(path32.charCodeAt(j15))) break;
                        }
                        if (j15 < len && j15 !== last) {
                            last = j15;
                            for(; j15 < len; ++j15){
                                if (isPathSeparator1(path32.charCodeAt(j15))) break;
                            }
                            if (j15 === len) {
                                device = `\\\\${firstPart}\\${path32.slice(last)}`;
                                rootEnd = j15;
                            } else if (j15 !== last) {
                                device = `\\\\${firstPart}\\${path32.slice(last, j15)}`;
                                rootEnd = j15;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot1(code54)) {
                if (path32.charCodeAt(1) === 58) {
                    device = path32.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator1(path32.charCodeAt(2))) {
                            isAbsolute11 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator1(code54)) {
            rootEnd = 1;
            isAbsolute11 = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path32.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute11;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString1(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator1);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize4(path33) {
    assertPath1(path33);
    const len = path33.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute21 = false;
    const code55 = path33.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code55)) {
            isAbsolute21 = true;
            if (isPathSeparator1(path33.charCodeAt(1))) {
                let j16 = 2;
                let last = j16;
                for(; j16 < len; ++j16){
                    if (isPathSeparator1(path33.charCodeAt(j16))) break;
                }
                if (j16 < len && j16 !== last) {
                    const firstPart = path33.slice(last, j16);
                    last = j16;
                    for(; j16 < len; ++j16){
                        if (!isPathSeparator1(path33.charCodeAt(j16))) break;
                    }
                    if (j16 < len && j16 !== last) {
                        last = j16;
                        for(; j16 < len; ++j16){
                            if (isPathSeparator1(path33.charCodeAt(j16))) break;
                        }
                        if (j16 === len) {
                            return `\\\\${firstPart}\\${path33.slice(last)}\\`;
                        } else if (j16 !== last) {
                            device = `\\\\${firstPart}\\${path33.slice(last, j16)}`;
                            rootEnd = j16;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot1(code55)) {
            if (path33.charCodeAt(1) === 58) {
                device = path33.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path33.charCodeAt(2))) {
                        isAbsolute21 = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator1(code55)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString1(path33.slice(rootEnd), !isAbsolute21, "\\", isPathSeparator1);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute21) tail = ".";
    if (tail.length > 0 && isPathSeparator1(path33.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute21) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute21) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute3(path34) {
    assertPath1(path34);
    const len = path34.length;
    if (len === 0) return false;
    const code56 = path34.charCodeAt(0);
    if (isPathSeparator1(code56)) {
        return true;
    } else if (isWindowsDeviceRoot1(code56)) {
        if (len > 2 && path34.charCodeAt(1) === 58) {
            if (isPathSeparator1(path34.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join5(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i110 = 0; i110 < pathsCount; ++i110){
        const path35 = paths[i110];
        assertPath1(path35);
        if (path35.length > 0) {
            if (joined === undefined) joined = firstPart = path35;
            else joined += `\\${path35}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert1(firstPart != null);
    if (isPathSeparator1(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator1(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator1(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator1(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize4(joined);
}
function relative3(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    const fromOrig = resolve5(from);
    const toOrig = resolve5(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i111 = 0;
    for(; i111 <= length; ++i111){
        if (i111 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i111) === 92) {
                    return toOrig.slice(toStart + i111 + 1);
                } else if (i111 === 2) {
                    return toOrig.slice(toStart + i111);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i111) === 92) {
                    lastCommonSep = i111;
                } else if (i111 === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i111);
        const toCode = to.charCodeAt(toStart + i111);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i111;
    }
    if (i111 !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i111 = fromStart + lastCommonSep + 1; i111 <= fromEnd; ++i111){
        if (i111 === fromEnd || from.charCodeAt(i111) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath3(path36) {
    if (typeof path36 !== "string") return path36;
    if (path36.length === 0) return "";
    const resolvedPath = resolve5(path36);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code57 = resolvedPath.charCodeAt(2);
                if (code57 !== 63 && code57 !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot1(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path36;
}
function dirname3(path37) {
    assertPath1(path37);
    const len = path37.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code58 = path37.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code58)) {
            rootEnd = offset = 1;
            if (isPathSeparator1(path37.charCodeAt(1))) {
                let j17 = 2;
                let last = j17;
                for(; j17 < len; ++j17){
                    if (isPathSeparator1(path37.charCodeAt(j17))) break;
                }
                if (j17 < len && j17 !== last) {
                    last = j17;
                    for(; j17 < len; ++j17){
                        if (!isPathSeparator1(path37.charCodeAt(j17))) break;
                    }
                    if (j17 < len && j17 !== last) {
                        last = j17;
                        for(; j17 < len; ++j17){
                            if (isPathSeparator1(path37.charCodeAt(j17))) break;
                        }
                        if (j17 === len) {
                            return path37;
                        }
                        if (j17 !== last) {
                            rootEnd = offset = j17 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code58)) {
            if (path37.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator1(path37.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator1(code58)) {
        return path37;
    }
    for(let i112 = len - 1; i112 >= offset; --i112){
        if (isPathSeparator1(path37.charCodeAt(i112))) {
            if (!matchedSlash) {
                end = i112;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path37.slice(0, end);
}
function basename3(path38, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new ERR_INVALID_ARG_TYPE("ext", [
            "string"
        ], ext);
    }
    assertPath1(path38);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i113;
    if (path38.length >= 2) {
        const drive = path38.charCodeAt(0);
        if (isWindowsDeviceRoot1(drive)) {
            if (path38.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path38.length) {
        if (ext.length === path38.length && ext === path38) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i113 = path38.length - 1; i113 >= start; --i113){
            const code59 = path38.charCodeAt(i113);
            if (isPathSeparator1(code59)) {
                if (!matchedSlash) {
                    start = i113 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i113 + 1;
                }
                if (extIdx >= 0) {
                    if (code59 === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i113;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path38.length;
        return path38.slice(start, end);
    } else {
        for(i113 = path38.length - 1; i113 >= start; --i113){
            if (isPathSeparator1(path38.charCodeAt(i113))) {
                if (!matchedSlash) {
                    start = i113 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i113 + 1;
            }
        }
        if (end === -1) return "";
        return path38.slice(start, end);
    }
}
function extname3(path39) {
    assertPath1(path39);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path39.length >= 2 && path39.charCodeAt(1) === 58 && isWindowsDeviceRoot1(path39.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i114 = path39.length - 1; i114 >= start; --i114){
        const code60 = path39.charCodeAt(i114);
        if (isPathSeparator1(code60)) {
            if (!matchedSlash) {
                startPart = i114 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i114 + 1;
        }
        if (code60 === 46) {
            if (startDot === -1) startDot = i114;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path39.slice(startDot, end);
}
function format5(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new ERR_INVALID_ARG_TYPE("pathObject", [
            "Object"
        ], pathObject);
    }
    return _format1("\\", pathObject);
}
function parse4(path40) {
    assertPath1(path40);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path40.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code61 = path40.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code61)) {
            rootEnd = 1;
            if (isPathSeparator1(path40.charCodeAt(1))) {
                let j18 = 2;
                let last = j18;
                for(; j18 < len; ++j18){
                    if (isPathSeparator1(path40.charCodeAt(j18))) break;
                }
                if (j18 < len && j18 !== last) {
                    last = j18;
                    for(; j18 < len; ++j18){
                        if (!isPathSeparator1(path40.charCodeAt(j18))) break;
                    }
                    if (j18 < len && j18 !== last) {
                        last = j18;
                        for(; j18 < len; ++j18){
                            if (isPathSeparator1(path40.charCodeAt(j18))) break;
                        }
                        if (j18 === len) {
                            rootEnd = j18;
                        } else if (j18 !== last) {
                            rootEnd = j18 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code61)) {
            if (path40.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path40.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path40;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path40;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator1(code61)) {
        ret.root = ret.dir = path40;
        return ret;
    }
    if (rootEnd > 0) ret.root = path40.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i115 = path40.length - 1;
    let preDotState = 0;
    for(; i115 >= rootEnd; --i115){
        code61 = path40.charCodeAt(i115);
        if (isPathSeparator1(code61)) {
            if (!matchedSlash) {
                startPart = i115 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i115 + 1;
        }
        if (code61 === 46) {
            if (startDot === -1) startDot = i115;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path40.slice(startPart, end);
        }
    } else {
        ret.name = path40.slice(startPart, startDot);
        ret.base = path40.slice(startPart, end);
        ret.ext = path40.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path40.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl3(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path41 = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path41 = `\\\\${url.hostname}${path41}`;
    }
    return path41;
}
function toFileUrl3(path42) {
    if (!isAbsolute3(path42)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname25, pathname] = path42.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(pathname.replace(/%/g, "%25"));
    if (hostname25 != null && hostname25 != "localhost") {
        url.hostname = hostname25;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const __default8 = {
    basename: basename3,
    delimiter: delimiter4,
    dirname: dirname3,
    extname: extname3,
    format: format5,
    fromFileUrl: fromFileUrl3,
    isAbsolute: isAbsolute3,
    join: join5,
    normalize: normalize4,
    parse: parse4,
    relative: relative3,
    resolve: resolve5,
    sep: sep3,
    toFileUrl: toFileUrl3,
    toNamespacedPath: toNamespacedPath3
};
const mod50 = {
    sep: sep3,
    delimiter: delimiter4,
    resolve: resolve5,
    normalize: normalize4,
    isAbsolute: isAbsolute3,
    join: join5,
    relative: relative3,
    toNamespacedPath: toNamespacedPath3,
    dirname: dirname3,
    basename: basename3,
    extname: extname3,
    format: format5,
    parse: parse4,
    fromFileUrl: fromFileUrl3,
    toFileUrl: toFileUrl3,
    default: __default8
};
const sep4 = "/";
const delimiter5 = ":";
function resolve7(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i116 = pathSegments.length - 1; i116 >= -1 && !resolvedAbsolute; i116--){
        let path43;
        if (i116 >= 0) path43 = pathSegments[i116];
        else {
            const { Deno  } = globalThis;
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path43 = Deno.cwd();
        }
        assertPath1(path43);
        if (path43.length === 0) {
            continue;
        }
        resolvedPath = `${path43}/${resolvedPath}`;
        resolvedAbsolute = path43.charCodeAt(0) === CHAR_FORWARD_SLASH1;
    }
    resolvedPath = normalizeString1(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator1);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize5(path44) {
    assertPath1(path44);
    if (path44.length === 0) return ".";
    const isAbsolute12 = path44.charCodeAt(0) === 47;
    const trailingSeparator = path44.charCodeAt(path44.length - 1) === 47;
    path44 = normalizeString1(path44, !isAbsolute12, "/", isPosixPathSeparator1);
    if (path44.length === 0 && !isAbsolute12) path44 = ".";
    if (path44.length > 0 && trailingSeparator) path44 += "/";
    if (isAbsolute12) return `/${path44}`;
    return path44;
}
function isAbsolute4(path45) {
    assertPath1(path45);
    return path45.length > 0 && path45.charCodeAt(0) === 47;
}
function join6(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i117 = 0, len = paths.length; i117 < len; ++i117){
        const path46 = paths[i117];
        assertPath1(path46);
        if (path46.length > 0) {
            if (!joined) joined = path46;
            else joined += `/${path46}`;
        }
    }
    if (!joined) return ".";
    return normalize5(joined);
}
function relative4(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    from = resolve7(from);
    to = resolve7(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i118 = 0;
    for(; i118 <= length; ++i118){
        if (i118 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i118) === 47) {
                    return to.slice(toStart + i118 + 1);
                } else if (i118 === 0) {
                    return to.slice(toStart + i118);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i118) === 47) {
                    lastCommonSep = i118;
                } else if (i118 === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i118);
        const toCode = to.charCodeAt(toStart + i118);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i118;
    }
    let out = "";
    for(i118 = fromStart + lastCommonSep + 1; i118 <= fromEnd; ++i118){
        if (i118 === fromEnd || from.charCodeAt(i118) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath4(path47) {
    return path47;
}
function dirname4(path48) {
    assertPath1(path48);
    if (path48.length === 0) return ".";
    const hasRoot = path48.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i119 = path48.length - 1; i119 >= 1; --i119){
        if (path48.charCodeAt(i119) === 47) {
            if (!matchedSlash) {
                end = i119;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path48.slice(0, end);
}
function basename4(path49, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new ERR_INVALID_ARG_TYPE("ext", [
            "string"
        ], ext);
    }
    assertPath1(path49);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i120;
    if (ext !== undefined && ext.length > 0 && ext.length <= path49.length) {
        if (ext.length === path49.length && ext === path49) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i120 = path49.length - 1; i120 >= 0; --i120){
            const code62 = path49.charCodeAt(i120);
            if (code62 === 47) {
                if (!matchedSlash) {
                    start = i120 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i120 + 1;
                }
                if (extIdx >= 0) {
                    if (code62 === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i120;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path49.length;
        return path49.slice(start, end);
    } else {
        for(i120 = path49.length - 1; i120 >= 0; --i120){
            if (path49.charCodeAt(i120) === 47) {
                if (!matchedSlash) {
                    start = i120 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i120 + 1;
            }
        }
        if (end === -1) return "";
        return path49.slice(start, end);
    }
}
function extname4(path50) {
    assertPath1(path50);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i121 = path50.length - 1; i121 >= 0; --i121){
        const code63 = path50.charCodeAt(i121);
        if (code63 === 47) {
            if (!matchedSlash) {
                startPart = i121 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i121 + 1;
        }
        if (code63 === 46) {
            if (startDot === -1) startDot = i121;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path50.slice(startDot, end);
}
function format6(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new ERR_INVALID_ARG_TYPE("pathObject", [
            "Object"
        ], pathObject);
    }
    return _format1("/", pathObject);
}
function parse5(path51) {
    assertPath1(path51);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path51.length === 0) return ret;
    const isAbsolute22 = path51.charCodeAt(0) === 47;
    let start;
    if (isAbsolute22) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i122 = path51.length - 1;
    let preDotState = 0;
    for(; i122 >= start; --i122){
        const code64 = path51.charCodeAt(i122);
        if (code64 === 47) {
            if (!matchedSlash) {
                startPart = i122 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i122 + 1;
        }
        if (code64 === 46) {
            if (startDot === -1) startDot = i122;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute22) {
                ret.base = ret.name = path51.slice(1, end);
            } else {
                ret.base = ret.name = path51.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute22) {
            ret.name = path51.slice(1, startDot);
            ret.base = path51.slice(1, end);
        } else {
            ret.name = path51.slice(startPart, startDot);
            ret.base = path51.slice(startPart, end);
        }
        ret.ext = path51.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path51.slice(0, startPart - 1);
    else if (isAbsolute22) ret.dir = "/";
    return ret;
}
function fromFileUrl4(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl4(path52) {
    if (!isAbsolute4(path52)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(path52.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const __default9 = {
    basename: basename4,
    delimiter: delimiter5,
    dirname: dirname4,
    extname: extname4,
    format: format6,
    fromFileUrl: fromFileUrl4,
    isAbsolute: isAbsolute4,
    join: join6,
    normalize: normalize5,
    parse: parse5,
    relative: relative4,
    resolve: resolve7,
    sep: sep4,
    toFileUrl: toFileUrl4,
    toNamespacedPath: toNamespacedPath4
};
const mod51 = {
    sep: sep4,
    delimiter: delimiter5,
    resolve: resolve7,
    normalize: normalize5,
    isAbsolute: isAbsolute4,
    join: join6,
    relative: relative4,
    toNamespacedPath: toNamespacedPath4,
    dirname: dirname4,
    basename: basename4,
    extname: extname4,
    format: format6,
    parse: parse5,
    fromFileUrl: fromFileUrl4,
    toFileUrl: toFileUrl4,
    default: __default9
};
const SEP = isWindows ? "\\" : "/";
const SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
function common(paths, sep8 = SEP) {
    const [first = "", ...remaining] = paths;
    if (first === "" || remaining.length === 0) {
        return first.substring(0, first.lastIndexOf(sep8) + 1);
    }
    const parts = first.split(sep8);
    let endOfPrefix = parts.length;
    for (const path53 of remaining){
        const compare = path53.split(sep8);
        for(let i123 = 0; i123 < endOfPrefix; i123++){
            if (compare[i123] !== parts[i123]) {
                endOfPrefix = i123;
            }
        }
        if (endOfPrefix === 0) {
            return "";
        }
    }
    const prefix = parts.slice(0, endOfPrefix).join(sep8);
    return prefix.endsWith(sep8) ? prefix : `${prefix}${sep8}`;
}
const path2 = isWindows ? mod50 : mod51;
const { join: join7 , normalize: normalize6  } = path2;
const regExpEscapeChars = [
    "!",
    "$",
    "(",
    ")",
    "*",
    "+",
    ".",
    "=",
    "?",
    "[",
    "\\",
    "^",
    "{",
    "|", 
];
const rangeEscapeChars = [
    "-",
    "\\",
    "]"
];
function globToRegExp(glob, { extended =true , globstar: globstarOption = true , os: os1 = osType , caseInsensitive =false  } = {}) {
    if (glob == "") {
        return /(?!)/;
    }
    const sep9 = os1 == "windows" ? "(?:\\\\|/)+" : "/+";
    const sepMaybe = os1 == "windows" ? "(?:\\\\|/)*" : "/*";
    const seps = os1 == "windows" ? [
        "\\",
        "/"
    ] : [
        "/"
    ];
    const globstar = os1 == "windows" ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*" : "(?:[^/]*(?:/|$)+)*";
    const wildcard = os1 == "windows" ? "[^\\\\/]*" : "[^/]*";
    const escapePrefix = os1 == "windows" ? "`" : "\\";
    let newLength = glob.length;
    for(; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--);
    glob = glob.slice(0, newLength);
    let regExpString = "";
    for(let j19 = 0; j19 < glob.length;){
        let segment = "";
        const groupStack = [];
        let inRange = false;
        let inEscape = false;
        let endsWithSep = false;
        let i124 = j19;
        for(; i124 < glob.length && !seps.includes(glob[i124]); i124++){
            if (inEscape) {
                inEscape = false;
                const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
                segment += escapeChars.includes(glob[i124]) ? `\\${glob[i124]}` : glob[i124];
                continue;
            }
            if (glob[i124] == escapePrefix) {
                inEscape = true;
                continue;
            }
            if (glob[i124] == "[") {
                if (!inRange) {
                    inRange = true;
                    segment += "[";
                    if (glob[i124 + 1] == "!") {
                        i124++;
                        segment += "^";
                    } else if (glob[i124 + 1] == "^") {
                        i124++;
                        segment += "\\^";
                    }
                    continue;
                } else if (glob[i124 + 1] == ":") {
                    let k11 = i124 + 1;
                    let value = "";
                    while(glob[k11 + 1] != null && glob[k11 + 1] != ":"){
                        value += glob[k11 + 1];
                        k11++;
                    }
                    if (glob[k11 + 1] == ":" && glob[k11 + 2] == "]") {
                        i124 = k11 + 2;
                        if (value == "alnum") segment += "\\dA-Za-z";
                        else if (value == "alpha") segment += "A-Za-z";
                        else if (value == "ascii") segment += "\x00-\x7F";
                        else if (value == "blank") segment += "\t ";
                        else if (value == "cntrl") segment += "\x00-\x1F\x7F";
                        else if (value == "digit") segment += "\\d";
                        else if (value == "graph") segment += "\x21-\x7E";
                        else if (value == "lower") segment += "a-z";
                        else if (value == "print") segment += "\x20-\x7E";
                        else if (value == "punct") {
                            segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
                        } else if (value == "space") segment += "\\s\v";
                        else if (value == "upper") segment += "A-Z";
                        else if (value == "word") segment += "\\w";
                        else if (value == "xdigit") segment += "\\dA-Fa-f";
                        continue;
                    }
                }
            }
            if (glob[i124] == "]" && inRange) {
                inRange = false;
                segment += "]";
                continue;
            }
            if (inRange) {
                if (glob[i124] == "\\") {
                    segment += `\\\\`;
                } else {
                    segment += glob[i124];
                }
                continue;
            }
            if (glob[i124] == ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
                segment += ")";
                const type37 = groupStack.pop();
                if (type37 == "!") {
                    segment += wildcard;
                } else if (type37 != "@") {
                    segment += type37;
                }
                continue;
            }
            if (glob[i124] == "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i124] == "+" && extended && glob[i124 + 1] == "(") {
                i124++;
                groupStack.push("+");
                segment += "(?:";
                continue;
            }
            if (glob[i124] == "@" && extended && glob[i124 + 1] == "(") {
                i124++;
                groupStack.push("@");
                segment += "(?:";
                continue;
            }
            if (glob[i124] == "?") {
                if (extended && glob[i124 + 1] == "(") {
                    i124++;
                    groupStack.push("?");
                    segment += "(?:";
                } else {
                    segment += ".";
                }
                continue;
            }
            if (glob[i124] == "!" && extended && glob[i124 + 1] == "(") {
                i124++;
                groupStack.push("!");
                segment += "(?!";
                continue;
            }
            if (glob[i124] == "{") {
                groupStack.push("BRACE");
                segment += "(?:";
                continue;
            }
            if (glob[i124] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
                groupStack.pop();
                segment += ")";
                continue;
            }
            if (glob[i124] == "," && groupStack[groupStack.length - 1] == "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i124] == "*") {
                if (extended && glob[i124 + 1] == "(") {
                    i124++;
                    groupStack.push("*");
                    segment += "(?:";
                } else {
                    const prevChar = glob[i124 - 1];
                    let numStars = 1;
                    while(glob[i124 + 1] == "*"){
                        i124++;
                        numStars++;
                    }
                    const nextChar = glob[i124 + 1];
                    if (globstarOption && numStars == 2 && [
                        ...seps,
                        undefined
                    ].includes(prevChar) && [
                        ...seps,
                        undefined
                    ].includes(nextChar)) {
                        segment += globstar;
                        endsWithSep = true;
                    } else {
                        segment += wildcard;
                    }
                }
                continue;
            }
            segment += regExpEscapeChars.includes(glob[i124]) ? `\\${glob[i124]}` : glob[i124];
        }
        if (groupStack.length > 0 || inRange || inEscape) {
            segment = "";
            for (const c of glob.slice(j19, i124)){
                segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
                endsWithSep = false;
            }
        }
        regExpString += segment;
        if (!endsWithSep) {
            regExpString += i124 < glob.length ? sep9 : sepMaybe;
            endsWithSep = true;
        }
        while(seps.includes(glob[i124]))i124++;
        if (!(i124 > j19)) {
            throw new Error("Assertion failure: i > j (potential infinite loop)");
        }
        j19 = i124;
    }
    regExpString = `^${regExpString}$`;
    return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
function isGlob(str) {
    const chars = {
        "{": "}",
        "(": ")",
        "[": "]"
    };
    const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
    if (str === "") {
        return false;
    }
    let match3;
    while(match3 = regex.exec(str)){
        if (match3[2]) return true;
        let idx = match3.index + match3[0].length;
        const open2 = match3[1];
        const close3 = open2 ? chars[open2] : null;
        if (open2 && close3) {
            const n = str.indexOf(close3, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }
        str = str.slice(idx);
    }
    return false;
}
function normalizeGlob(glob, { globstar =false  } = {}) {
    if (glob.match(/\0/g)) {
        throw new Error(`Glob contains invalid characters: "${glob}"`);
    }
    if (!globstar) {
        return normalize6(glob);
    }
    const s = SEP_PATTERN.source;
    const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
    return normalize6(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
function joinGlobs(globs, { extended =true , globstar =false  } = {}) {
    if (!globstar || globs.length == 0) {
        return join7(...globs);
    }
    if (globs.length === 0) return ".";
    let joined;
    for (const glob of globs){
        const path110 = glob;
        if (path110.length > 0) {
            if (!joined) joined = path110;
            else joined += `${SEP}${path110}`;
        }
    }
    if (!joined) return ".";
    return normalizeGlob(joined, {
        extended,
        globstar
    });
}
const path3 = isWindows ? __default8 : __default9;
const { basename: basename5 , delimiter: delimiter6 , dirname: dirname5 , extname: extname5 , format: format7 , fromFileUrl: fromFileUrl5 , isAbsolute: isAbsolute5 , join: join8 , normalize: normalize7 , parse: parse6 , relative: relative5 , resolve: resolve8 , sep: sep5 , toFileUrl: toFileUrl5 , toNamespacedPath: toNamespacedPath5 ,  } = path3;
const mod52 = {
    SEP: SEP,
    SEP_PATTERN: SEP_PATTERN,
    win32: __default8,
    posix: __default9,
    basename: basename5,
    delimiter: delimiter6,
    dirname: dirname5,
    extname: extname5,
    format: format7,
    fromFileUrl: fromFileUrl5,
    isAbsolute: isAbsolute5,
    join: join8,
    normalize: normalize7,
    parse: parse6,
    relative: relative5,
    resolve: resolve8,
    sep: sep5,
    toFileUrl: toFileUrl5,
    toNamespacedPath: toNamespacedPath5,
    common,
    globToRegExp,
    isGlob,
    normalizeGlob,
    joinGlobs
};
const __default10 = {
    ...mod52
};
const hexTable = new Array(256);
for(let i1 = 0; i1 < 256; ++i1){
    hexTable[i1] = "%" + ((i1 < 16 ? "0" : "") + i1.toString(16)).toUpperCase();
}
new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]);
function encodeStr(str, noEscapeTable, hexTable1) {
    const len = str.length;
    if (len === 0) return "";
    let out = "";
    let lastPos = 0;
    for(let i125 = 0; i125 < len; i125++){
        let c = str.charCodeAt(i125);
        if (c < 0x80) {
            if (noEscapeTable[c] === 1) continue;
            if (lastPos < i125) out += str.slice(lastPos, i125);
            lastPos = i125 + 1;
            out += hexTable1[c];
            continue;
        }
        if (lastPos < i125) out += str.slice(lastPos, i125);
        if (c < 0x800) {
            lastPos = i125 + 1;
            out += hexTable1[0xc0 | c >> 6] + hexTable1[0x80 | c & 0x3f];
            continue;
        }
        if (c < 0xd800 || c >= 0xe000) {
            lastPos = i125 + 1;
            out += hexTable1[0xe0 | c >> 12] + hexTable1[0x80 | c >> 6 & 0x3f] + hexTable1[0x80 | c & 0x3f];
            continue;
        }
        ++i125;
        if (i125 >= len) throw new ERR_INVALID_URI();
        const c2 = str.charCodeAt(i125) & 0x3ff;
        lastPos = i125 + 1;
        c = 0x10000 + ((c & 0x3ff) << 10 | c2);
        out += hexTable1[0xf0 | c >> 18] + hexTable1[0x80 | c >> 12 & 0x3f] + hexTable1[0x80 | c >> 6 & 0x3f] + hexTable1[0x80 | c & 0x3f];
    }
    if (lastPos === 0) return str;
    if (lastPos < len) return out + str.slice(lastPos);
    return out;
}
const decode2 = parse7;
const encode3 = stringify;
function qsEscape(str) {
    if (typeof str !== "string") {
        if (typeof str === "object") {
            str = String(str);
        } else {
            str += "";
        }
    }
    return encodeStr(str, noEscape, hexTable);
}
const escape = qsEscape;
const isHexTable = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]);
function charCodes(str) {
    const ret = new Array(str.length);
    for(let i126 = 0; i126 < str.length; ++i126){
        ret[i126] = str.charCodeAt(i126);
    }
    return ret;
}
function addKeyVal(obj, key, value, keyEncoded, valEncoded, decode11) {
    if (key.length > 0 && keyEncoded) {
        key = decode11(key);
    }
    if (value.length > 0 && valEncoded) {
        value = decode11(value);
    }
    if (obj[key] === undefined) {
        obj[key] = value;
    } else {
        const curValue = obj[key];
        if (curValue.pop) {
            curValue[curValue.length] = value;
        } else {
            obj[key] = [
                curValue,
                value
            ];
        }
    }
}
function parse7(str, sep10 = "&", eq = "=", { decodeURIComponent =unescape , maxKeys =1000  } = {}) {
    const obj = Object.create(null);
    if (typeof str !== "string" || str.length === 0) {
        return obj;
    }
    const sepCodes = !sep10 ? [
        38
    ] : charCodes(String(sep10));
    const eqCodes = !eq ? [
        61
    ] : charCodes(String(eq));
    const sepLen = sepCodes.length;
    const eqLen = eqCodes.length;
    let pairs = 1000;
    if (typeof maxKeys === "number") {
        pairs = maxKeys > 0 ? maxKeys : -1;
    }
    let decode21 = unescape;
    if (decodeURIComponent) {
        decode21 = decodeURIComponent;
    }
    const customDecode = decode21 !== unescape;
    let lastPos = 0;
    let sepIdx = 0;
    let eqIdx = 0;
    let key = "";
    let value = "";
    let keyEncoded = customDecode;
    let valEncoded = customDecode;
    const plusChar = customDecode ? "%20" : " ";
    let encodeCheck = 0;
    for(let i127 = 0; i127 < str.length; ++i127){
        const code65 = str.charCodeAt(i127);
        if (code65 === sepCodes[sepIdx]) {
            if (++sepIdx === sepLen) {
                const end = i127 - sepIdx + 1;
                if (eqIdx < eqLen) {
                    if (lastPos < end) {
                        key += str.slice(lastPos, end);
                    } else if (key.length === 0) {
                        if (--pairs === 0) {
                            return obj;
                        }
                        lastPos = i127 + 1;
                        sepIdx = eqIdx = 0;
                        continue;
                    }
                } else if (lastPos < end) {
                    value += str.slice(lastPos, end);
                }
                addKeyVal(obj, key, value, keyEncoded, valEncoded, decode21);
                if (--pairs === 0) {
                    return obj;
                }
                key = value = "";
                encodeCheck = 0;
                lastPos = i127 + 1;
                sepIdx = eqIdx = 0;
            }
        } else {
            sepIdx = 0;
            if (eqIdx < eqLen) {
                if (code65 === eqCodes[eqIdx]) {
                    if (++eqIdx === eqLen) {
                        const end = i127 - eqIdx + 1;
                        if (lastPos < end) {
                            key += str.slice(lastPos, end);
                        }
                        encodeCheck = 0;
                        lastPos = i127 + 1;
                    }
                    continue;
                } else {
                    eqIdx = 0;
                    if (!keyEncoded) {
                        if (code65 === 37) {
                            encodeCheck = 1;
                            continue;
                        } else if (encodeCheck > 0) {
                            if (isHexTable[code65] === 1) {
                                if (++encodeCheck === 3) {
                                    keyEncoded = true;
                                }
                                continue;
                            } else {
                                encodeCheck = 0;
                            }
                        }
                    }
                }
                if (code65 === 43) {
                    if (lastPos < i127) {
                        key += str.slice(lastPos, i127);
                    }
                    key += plusChar;
                    lastPos = i127 + 1;
                    continue;
                }
            }
            if (code65 === 43) {
                if (lastPos < i127) {
                    value += str.slice(lastPos, i127);
                }
                value += plusChar;
                lastPos = i127 + 1;
            } else if (!valEncoded) {
                if (code65 === 37) {
                    encodeCheck = 1;
                } else if (encodeCheck > 0) {
                    if (isHexTable[code65] === 1) {
                        if (++encodeCheck === 3) {
                            valEncoded = true;
                        }
                    } else {
                        encodeCheck = 0;
                    }
                }
            }
        }
    }
    if (lastPos < str.length) {
        if (eqIdx < eqLen) {
            key += str.slice(lastPos);
        } else if (sepIdx < sepLen) {
            value += str.slice(lastPos);
        }
    } else if (eqIdx === 0 && key.length === 0) {
        return obj;
    }
    addKeyVal(obj, key, value, keyEncoded, valEncoded, decode21);
    return obj;
}
const noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
]);
function stringifyPrimitive(v12) {
    if (typeof v12 === "string") {
        return v12;
    }
    if (typeof v12 === "number" && isFinite(v12)) {
        return "" + v12;
    }
    if (typeof v12 === "bigint") {
        return "" + v12;
    }
    if (typeof v12 === "boolean") {
        return v12 ? "true" : "false";
    }
    return "";
}
function encodeStringifiedCustom(v13, encode11) {
    return encode11(stringifyPrimitive(v13));
}
function encodeStringified(v14, encode21) {
    if (typeof v14 === "string") {
        return v14.length ? encode21(v14) : "";
    }
    if (typeof v14 === "number" && isFinite(v14)) {
        return Math.abs(v14) < 1e21 ? "" + v14 : encode21("" + v14);
    }
    if (typeof v14 === "bigint") {
        return "" + v14;
    }
    if (typeof v14 === "boolean") {
        return v14 ? "true" : "false";
    }
    return "";
}
function stringify(obj, sep11, eq, options) {
    sep11 ||= "&";
    eq ||= "=";
    const encode31 = options ? options.encodeURIComponent : qsEscape;
    const convert = options ? encodeStringifiedCustom : encodeStringified;
    if (obj !== null && typeof obj === "object") {
        const keys = Object.keys(obj);
        const len = keys.length;
        let fields = "";
        for(let i128 = 0; i128 < len; ++i128){
            const k12 = keys[i128];
            const v15 = obj[k12];
            let ks = convert(k12, encode31);
            ks += eq;
            if (Array.isArray(v15)) {
                const vlen = v15.length;
                if (vlen === 0) continue;
                if (fields) {
                    fields += sep11;
                }
                for(let j20 = 0; j20 < vlen; ++j20){
                    if (j20) {
                        fields += sep11;
                    }
                    fields += ks;
                    fields += convert(v15[j20], encode31);
                }
            } else {
                if (fields) {
                    fields += sep11;
                }
                fields += ks;
                fields += convert(v15, encode31);
            }
        }
        return fields;
    }
    return "";
}
const unhexTable = new Int8Array([
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
    -1,
    -1,
    +0,
    +1,
    +2,
    +3,
    +4,
    +5,
    +6,
    +7,
    +8,
    +9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
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
    10,
    11,
    12,
    13,
    14,
    15,
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
    -1
]);
function unescapeBuffer(s, decodeSpaces = false) {
    const out = new Buffer(s.length);
    let index = 0;
    let outIndex = 0;
    let currentChar;
    let nextChar;
    let hexHigh;
    let hexLow;
    const maxLength = s.length - 2;
    let hasHex = false;
    while(index < s.length){
        currentChar = s.charCodeAt(index);
        if (currentChar === 43 && decodeSpaces) {
            out[outIndex++] = 32;
            index++;
            continue;
        }
        if (currentChar === 37 && index < maxLength) {
            currentChar = s.charCodeAt(++index);
            hexHigh = unhexTable[currentChar];
            if (!(hexHigh >= 0)) {
                out[outIndex++] = 37;
                continue;
            } else {
                nextChar = s.charCodeAt(++index);
                hexLow = unhexTable[nextChar];
                if (!(hexLow >= 0)) {
                    out[outIndex++] = 37;
                    index--;
                } else {
                    hasHex = true;
                    currentChar = hexHigh * 16 + hexLow;
                }
            }
        }
        out[outIndex++] = currentChar;
        index++;
    }
    return hasHex ? out.slice(0, outIndex) : out;
}
function qsUnescape(s) {
    try {
        return decodeURIComponent(s);
    } catch  {
        return unescapeBuffer(s).toString();
    }
}
const unescape = qsUnescape;
const __default11 = {
    parse: parse7,
    stringify,
    decode: decode2,
    encode: encode3,
    unescape,
    escape,
    unescapeBuffer
};
const forwardSlashRegEx = /\//g;
const protocolPattern = /^[a-z0-9.+-]+:/i;
const portPattern = /:[0-9]*$/;
const hostPattern = /^\/\/[^@/]+@[^@/]+/;
const simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/;
const unsafeProtocol = new Set([
    "javascript",
    "javascript:"
]);
const hostlessProtocol = new Set([
    "javascript",
    "javascript:"
]);
const slashedProtocol = new Set([
    "http",
    "http:",
    "https",
    "https:",
    "ftp",
    "ftp:",
    "gopher",
    "gopher:",
    "file",
    "file:",
    "ws",
    "ws:",
    "wss",
    "wss:", 
]);
const noEscapeAuth = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
]);
class Url {
    protocol;
    slashes;
    auth;
    host;
    port;
    hostname;
    hash;
    search;
    query;
    pathname;
    path;
    href;
    constructor(){
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
    }
    parseHost() {
        let host = this.host || "";
        let port7 = portPattern.exec(host);
        if (port7) {
            port7 = port7[0];
            if (port7 !== ":") {
                this.port = port7.slice(1);
            }
            host = host.slice(0, host.length - port7.length);
        }
        if (host) this.hostname = host;
    }
    resolve(relative6) {
        return this.resolveObject(parse8(relative6, false, true)).format();
    }
    resolveObject(relative7) {
        if (typeof relative7 === "string") {
            const rel = new Url();
            rel.urlParse(relative7, false, true);
            relative7 = rel;
        }
        const result = new Url();
        const tkeys = Object.keys(this);
        for(let tk = 0; tk < tkeys.length; tk++){
            const tkey = tkeys[tk];
            result[tkey] = this[tkey];
        }
        result.hash = relative7.hash;
        if (relative7.href === "") {
            result.href = result.format();
            return result;
        }
        if (relative7.slashes && !relative7.protocol) {
            const rkeys = Object.keys(relative7);
            for(let rk = 0; rk < rkeys.length; rk++){
                const rkey = rkeys[rk];
                if (rkey !== "protocol") result[rkey] = relative7[rkey];
            }
            if (result.protocol && slashedProtocol.has(result.protocol) && result.hostname && !result.pathname) {
                result.path = result.pathname = "/";
            }
            result.href = result.format();
            return result;
        }
        if (relative7.protocol && relative7.protocol !== result.protocol) {
            if (!slashedProtocol.has(relative7.protocol)) {
                const keys = Object.keys(relative7);
                for(let v16 = 0; v16 < keys.length; v16++){
                    const k13 = keys[v16];
                    result[k13] = relative7[k13];
                }
                result.href = result.format();
                return result;
            }
            result.protocol = relative7.protocol;
            if (!relative7.host && !/^file:?$/.test(relative7.protocol) && !hostlessProtocol.has(relative7.protocol)) {
                const relPath = (relative7.pathname || "").split("/");
                while(relPath.length && !(relative7.host = relPath.shift() || null));
                if (!relative7.host) relative7.host = "";
                if (!relative7.hostname) relative7.hostname = "";
                if (relPath[0] !== "") relPath.unshift("");
                if (relPath.length < 2) relPath.unshift("");
                result.pathname = relPath.join("/");
            } else {
                result.pathname = relative7.pathname;
            }
            result.search = relative7.search;
            result.query = relative7.query;
            result.host = relative7.host || "";
            result.auth = relative7.auth;
            result.hostname = relative7.hostname || relative7.host;
            result.port = relative7.port;
            if (result.pathname || result.search) {
                const p15 = result.pathname || "";
                const s = result.search || "";
                result.path = p15 + s;
            }
            result.slashes = result.slashes || relative7.slashes;
            result.href = result.format();
            return result;
        }
        const isSourceAbs = result.pathname && result.pathname.charAt(0) === "/";
        const isRelAbs = relative7.host || relative7.pathname && relative7.pathname.charAt(0) === "/";
        let mustEndAbs = isRelAbs || isSourceAbs || result.host && relative7.pathname;
        const removeAllDots = mustEndAbs;
        let srcPath = result.pathname && result.pathname.split("/") || [];
        const relPath = relative7.pathname && relative7.pathname.split("/") || [];
        const noLeadingSlashes = result.protocol && !slashedProtocol.has(result.protocol);
        if (noLeadingSlashes) {
            result.hostname = "";
            result.port = null;
            if (result.host) {
                if (srcPath[0] === "") srcPath[0] = result.host;
                else srcPath.unshift(result.host);
            }
            result.host = "";
            if (relative7.protocol) {
                relative7.hostname = null;
                relative7.port = null;
                result.auth = null;
                if (relative7.host) {
                    if (relPath[0] === "") relPath[0] = relative7.host;
                    else relPath.unshift(relative7.host);
                }
                relative7.host = null;
            }
            mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
            if (relative7.host || relative7.host === "") {
                if (result.host !== relative7.host) result.auth = null;
                result.host = relative7.host;
                result.port = relative7.port;
            }
            if (relative7.hostname || relative7.hostname === "") {
                if (result.hostname !== relative7.hostname) result.auth = null;
                result.hostname = relative7.hostname;
            }
            result.search = relative7.search;
            result.query = relative7.query;
            srcPath = relPath;
        } else if (relPath.length) {
            if (!srcPath) srcPath = [];
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative7.search;
            result.query = relative7.query;
        } else if (relative7.search !== null && relative7.search !== undefined) {
            if (noLeadingSlashes) {
                result.hostname = result.host = srcPath.shift() || null;
                const authInHost = result.host && result.host.indexOf("@") > 0 && result.host.split("@");
                if (authInHost) {
                    result.auth = authInHost.shift() || null;
                    result.host = result.hostname = authInHost.shift() || null;
                }
            }
            result.search = relative7.search;
            result.query = relative7.query;
            if (result.pathname !== null || result.search !== null) {
                result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
            }
            result.href = result.format();
            return result;
        }
        if (!srcPath.length) {
            result.pathname = null;
            if (result.search) {
                result.path = "/" + result.search;
            } else {
                result.path = null;
            }
            result.href = result.format();
            return result;
        }
        let last = srcPath.slice(-1)[0];
        const hasTrailingSlash = (result.host || relative7.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        let up = 0;
        for(let i129 = srcPath.length - 1; i129 >= 0; i129--){
            last = srcPath[i129];
            if (last === ".") {
                srcPath.splice(i129, 1);
            } else if (last === "..") {
                srcPath.splice(i129, 1);
                up++;
            } else if (up) {
                srcPath.splice(i129, 1);
                up--;
            }
        }
        if (!mustEndAbs && !removeAllDots) {
            while(up--){
                srcPath.unshift("..");
            }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
            srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
            srcPath.push("");
        }
        const isAbsolute6 = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (noLeadingSlashes) {
            result.hostname = result.host = isAbsolute6 ? "" : srcPath.length ? srcPath.shift() || null : "";
            const authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
                result.auth = authInHost.shift() || null;
                result.host = result.hostname = authInHost.shift() || null;
            }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute6) {
            srcPath.unshift("");
        }
        if (!srcPath.length) {
            result.pathname = null;
            result.path = null;
        } else {
            result.pathname = srcPath.join("/");
        }
        if (result.pathname !== null || result.search !== null) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative7.auth || result.auth;
        result.slashes = result.slashes || relative7.slashes;
        result.href = result.format();
        return result;
    }
    format() {
        let auth = this.auth || "";
        if (auth) {
            auth = encodeStr(auth, noEscapeAuth, hexTable);
            auth += "@";
        }
        let protocol = this.protocol || "";
        let pathname = this.pathname || "";
        let hash = this.hash || "";
        let host = "";
        let query3 = "";
        if (this.host) {
            host = auth + this.host;
        } else if (this.hostname) {
            host = auth + (this.hostname.includes(":") && !isIpv6Hostname(this.hostname) ? "[" + this.hostname + "]" : this.hostname);
            if (this.port) {
                host += ":" + this.port;
            }
        }
        if (this.query !== null && typeof this.query === "object") {
            query3 = __default11.stringify(this.query);
        }
        let search = this.search || query3 && "?" + query3 || "";
        if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58) {
            protocol += ":";
        }
        let newPathname = "";
        let lastPos = 0;
        for(let i130 = 0; i130 < pathname.length; ++i130){
            switch(pathname.charCodeAt(i130)){
                case 35:
                    if (i130 - lastPos > 0) {
                        newPathname += pathname.slice(lastPos, i130);
                    }
                    newPathname += "%23";
                    lastPos = i130 + 1;
                    break;
                case 63:
                    if (i130 - lastPos > 0) {
                        newPathname += pathname.slice(lastPos, i130);
                    }
                    newPathname += "%3F";
                    lastPos = i130 + 1;
                    break;
            }
        }
        if (lastPos > 0) {
            if (lastPos !== pathname.length) {
                pathname = newPathname + pathname.slice(lastPos);
            } else pathname = newPathname;
        }
        if (this.slashes || slashedProtocol.has(protocol)) {
            if (this.slashes || host) {
                if (pathname && pathname.charCodeAt(0) !== 47) {
                    pathname = "/" + pathname;
                }
                host = "//" + host;
            } else if (protocol.length >= 4 && protocol.charCodeAt(0) === 102 && protocol.charCodeAt(1) === 105 && protocol.charCodeAt(2) === 108 && protocol.charCodeAt(3) === 101) {
                host = "//";
            }
        }
        search = search.replace(/#/g, "%23");
        if (hash && hash.charCodeAt(0) !== 35) {
            hash = "#" + hash;
        }
        if (search && search.charCodeAt(0) !== 63) {
            search = "?" + search;
        }
        return protocol + host + pathname + search + hash;
    }
    urlParse(url, parseQueryString, slashesDenoteHost) {
        let hasHash = false;
        let start = -1;
        let end = -1;
        let rest = "";
        let lastPos = 0;
        for(let i131 = 0, inWs = false, split = false; i131 < url.length; ++i131){
            const code66 = url.charCodeAt(i131);
            const isWs = code66 === 32 || code66 === 9 || code66 === 13 || code66 === 10 || code66 === 12 || code66 === 160 || code66 === 65279;
            if (start === -1) {
                if (isWs) continue;
                lastPos = start = i131;
            } else if (inWs) {
                if (!isWs) {
                    end = -1;
                    inWs = false;
                }
            } else if (isWs) {
                end = i131;
                inWs = true;
            }
            if (!split) {
                switch(code66){
                    case 35:
                        hasHash = true;
                    case 63:
                        split = true;
                        break;
                    case 92:
                        if (i131 - lastPos > 0) rest += url.slice(lastPos, i131);
                        rest += "/";
                        lastPos = i131 + 1;
                        break;
                }
            } else if (!hasHash && code66 === 35) {
                hasHash = true;
            }
        }
        if (start !== -1) {
            if (lastPos === start) {
                if (end === -1) {
                    if (start === 0) rest = url;
                    else rest = url.slice(start);
                } else {
                    rest = url.slice(start, end);
                }
            } else if (end === -1 && lastPos < url.length) {
                rest += url.slice(lastPos);
            } else if (end !== -1 && lastPos < end) {
                rest += url.slice(lastPos, end);
            }
        }
        if (!slashesDenoteHost && !hasHash) {
            const simplePath = simplePathPattern.exec(rest);
            if (simplePath) {
                this.path = rest;
                this.href = rest;
                this.pathname = simplePath[1];
                if (simplePath[2]) {
                    this.search = simplePath[2];
                    if (parseQueryString) {
                        this.query = __default11.parse(this.search.slice(1));
                    } else {
                        this.query = this.search.slice(1);
                    }
                } else if (parseQueryString) {
                    this.search = null;
                    this.query = Object.create(null);
                }
                return this;
            }
        }
        let proto = protocolPattern.exec(rest);
        let lowerProto = "";
        if (proto) {
            proto = proto[0];
            lowerProto = proto.toLowerCase();
            this.protocol = lowerProto;
            rest = rest.slice(proto.length);
        }
        let slashes;
        if (slashesDenoteHost || proto || hostPattern.test(rest)) {
            slashes = rest.charCodeAt(0) === CHAR_FORWARD_SLASH && rest.charCodeAt(1) === CHAR_FORWARD_SLASH;
            if (slashes && !(proto && hostlessProtocol.has(lowerProto))) {
                rest = rest.slice(2);
                this.slashes = true;
            }
        }
        if (!hostlessProtocol.has(lowerProto) && (slashes || proto && !slashedProtocol.has(proto))) {
            let hostEnd = -1;
            let atSign = -1;
            let nonHost = -1;
            for(let i132 = 0; i132 < rest.length; ++i132){
                switch(rest.charCodeAt(i132)){
                    case 9:
                    case 10:
                    case 13:
                    case 32:
                    case 34:
                    case 37:
                    case 39:
                    case 59:
                    case 60:
                    case 62:
                    case 92:
                    case 94:
                    case 96:
                    case 123:
                    case 124:
                    case 125:
                        if (nonHost === -1) nonHost = i132;
                        break;
                    case 35:
                    case 47:
                    case 63:
                        if (nonHost === -1) nonHost = i132;
                        hostEnd = i132;
                        break;
                    case 64:
                        atSign = i132;
                        nonHost = -1;
                        break;
                }
                if (hostEnd !== -1) break;
            }
            start = 0;
            if (atSign !== -1) {
                this.auth = decodeURIComponent(rest.slice(0, atSign));
                start = atSign + 1;
            }
            if (nonHost === -1) {
                this.host = rest.slice(start);
                rest = "";
            } else {
                this.host = rest.slice(start, nonHost);
                rest = rest.slice(nonHost);
            }
            this.parseHost();
            if (typeof this.hostname !== "string") this.hostname = "";
            const hostname26 = this.hostname;
            const ipv6Hostname = isIpv6Hostname(hostname26);
            if (!ipv6Hostname) {
                rest = getHostname(this, rest, hostname26);
            }
            if (this.hostname.length > 255) {
                this.hostname = "";
            } else {
                this.hostname = this.hostname.toLowerCase();
            }
            if (!ipv6Hostname) {
                this.hostname = toASCII(this.hostname);
            }
            const p16 = this.port ? ":" + this.port : "";
            const h = this.hostname || "";
            this.host = h + p16;
            if (ipv6Hostname) {
                this.hostname = this.hostname.slice(1, -1);
                if (rest[0] !== "/") {
                    rest = "/" + rest;
                }
            }
        }
        if (!unsafeProtocol.has(lowerProto)) {
            rest = autoEscapeStr(rest);
        }
        let questionIdx = -1;
        let hashIdx = -1;
        for(let i133 = 0; i133 < rest.length; ++i133){
            const code67 = rest.charCodeAt(i133);
            if (code67 === 35) {
                this.hash = rest.slice(i133);
                hashIdx = i133;
                break;
            } else if (code67 === 63 && questionIdx === -1) {
                questionIdx = i133;
            }
        }
        if (questionIdx !== -1) {
            if (hashIdx === -1) {
                this.search = rest.slice(questionIdx);
                this.query = rest.slice(questionIdx + 1);
            } else {
                this.search = rest.slice(questionIdx, hashIdx);
                this.query = rest.slice(questionIdx + 1, hashIdx);
            }
            if (parseQueryString) {
                this.query = __default11.parse(this.query);
            }
        } else if (parseQueryString) {
            this.search = null;
            this.query = Object.create(null);
        }
        const useQuestionIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx);
        const firstIdx = useQuestionIdx ? questionIdx : hashIdx;
        if (firstIdx === -1) {
            if (rest.length > 0) this.pathname = rest;
        } else if (firstIdx > 0) {
            this.pathname = rest.slice(0, firstIdx);
        }
        if (slashedProtocol.has(lowerProto) && this.hostname && !this.pathname) {
            this.pathname = "/";
        }
        if (this.pathname || this.search) {
            const p17 = this.pathname || "";
            const s = this.search || "";
            this.path = p17 + s;
        }
        this.href = this.format();
        return this;
    }
}
function isIpv6Hostname(hostname27) {
    return hostname27.charCodeAt(0) === 91 && hostname27.charCodeAt(hostname27.length - 1) === 93;
}
function getHostname(self, rest, hostname28) {
    for(let i134 = 0; i134 < hostname28.length; ++i134){
        const code68 = hostname28.charCodeAt(i134);
        const isValid = code68 >= 97 && code68 <= 122 || code68 === 46 || code68 >= 65 && code68 <= 90 || code68 >= 48 && code68 <= 57 || code68 === 45 || code68 === 43 || code68 === 95 || code68 > 127;
        if (!isValid) {
            self.hostname = hostname28.slice(0, i134);
            return `/${hostname28.slice(i134)}${rest}`;
        }
    }
    return rest;
}
const escapedCodes = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%09",
    "%0A",
    "",
    "",
    "%0D",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%20",
    "",
    "%22",
    "",
    "",
    "",
    "",
    "%27",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%3C",
    "",
    "%3E",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%5C",
    "",
    "%5E",
    "",
    "%60",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%7B",
    "%7C",
    "%7D"
];
function autoEscapeStr(rest) {
    let escaped = "";
    let lastEscapedPos = 0;
    for(let i135 = 0; i135 < rest.length; ++i135){
        const escapedChar = escapedCodes[rest.charCodeAt(i135)];
        if (escapedChar) {
            if (i135 > lastEscapedPos) {
                escaped += rest.slice(lastEscapedPos, i135);
            }
            escaped += escapedChar;
            lastEscapedPos = i135 + 1;
        }
    }
    if (lastEscapedPos === 0) {
        return rest;
    }
    if (lastEscapedPos < rest.length) {
        escaped += rest.slice(lastEscapedPos);
    }
    return escaped;
}
function parse8(url, parseQueryString, slashesDenoteHost) {
    if (url instanceof Url) return url;
    const urlObject = new Url();
    urlObject.urlParse(url, parseQueryString, slashesDenoteHost);
    return urlObject;
}
function fileURLToPath(path111) {
    if (typeof path111 === "string") path111 = new URL(path111);
    else if (!(path111 instanceof URL)) {
        throw new ERR_INVALID_ARG_TYPE("path", [
            "string",
            "URL"
        ], path111);
    }
    if (path111.protocol !== "file:") {
        throw new ERR_INVALID_URL_SCHEME("file");
    }
    return isWindows ? getPathFromURLWin(path111) : getPathFromURLPosix(path111);
}
function getPathFromURLWin(url) {
    const hostname29 = url.hostname;
    let pathname = url.pathname;
    for(let n = 0; n < pathname.length; n++){
        if (pathname[n] === "%") {
            const third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === "2" && third === 102 || pathname[n + 1] === "5" && third === 99) {
                throw new ERR_INVALID_FILE_URL_PATH("must not include encoded \\ or / characters");
            }
        }
    }
    pathname = pathname.replace(forwardSlashRegEx, "\\");
    pathname = decodeURIComponent(pathname);
    if (hostname29 !== "") {
        return `\\\\${hostname29}${pathname}`;
    } else {
        const letter = pathname.codePointAt(1) | 0x20;
        const sep12 = pathname[2];
        if (letter < 97 || letter > 122 || sep12 !== ":") {
            throw new ERR_INVALID_FILE_URL_PATH("must be absolute");
        }
        return pathname.slice(1);
    }
}
function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
        throw new ERR_INVALID_FILE_URL_HOST(osType);
    }
    const pathname = url.pathname;
    for(let n = 0; n < pathname.length; n++){
        if (pathname[n] === "%") {
            const third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === "2" && third === 102) {
                throw new ERR_INVALID_FILE_URL_PATH("must not include encoded / characters");
            }
        }
    }
    return decodeURIComponent(pathname);
}
Symbol("query");
function toPathIfFileURL(fileURLOrPath) {
    if (!(fileURLOrPath instanceof URL)) {
        return fileURLOrPath;
    }
    return fileURLToPath(fileURLOrPath);
}
function urlToHttpOptions(url) {
    const options = {
        protocol: url.protocol,
        hostname: typeof url.hostname === "string" && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        path: `${url.pathname || ""}${url.search || ""}`,
        href: url.href
    };
    if (url.port !== "") {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
    }
    return options;
}
var Status;
(function(Status1) {
    Status1[Status1["Continue"] = 100] = "Continue";
    Status1[Status1["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    Status1[Status1["Processing"] = 102] = "Processing";
    Status1[Status1["EarlyHints"] = 103] = "EarlyHints";
    Status1[Status1["OK"] = 200] = "OK";
    Status1[Status1["Created"] = 201] = "Created";
    Status1[Status1["Accepted"] = 202] = "Accepted";
    Status1[Status1["NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
    Status1[Status1["NoContent"] = 204] = "NoContent";
    Status1[Status1["ResetContent"] = 205] = "ResetContent";
    Status1[Status1["PartialContent"] = 206] = "PartialContent";
    Status1[Status1["MultiStatus"] = 207] = "MultiStatus";
    Status1[Status1["AlreadyReported"] = 208] = "AlreadyReported";
    Status1[Status1["IMUsed"] = 226] = "IMUsed";
    Status1[Status1["MultipleChoices"] = 300] = "MultipleChoices";
    Status1[Status1["MovedPermanently"] = 301] = "MovedPermanently";
    Status1[Status1["Found"] = 302] = "Found";
    Status1[Status1["SeeOther"] = 303] = "SeeOther";
    Status1[Status1["NotModified"] = 304] = "NotModified";
    Status1[Status1["UseProxy"] = 305] = "UseProxy";
    Status1[Status1["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    Status1[Status1["PermanentRedirect"] = 308] = "PermanentRedirect";
    Status1[Status1["BadRequest"] = 400] = "BadRequest";
    Status1[Status1["Unauthorized"] = 401] = "Unauthorized";
    Status1[Status1["PaymentRequired"] = 402] = "PaymentRequired";
    Status1[Status1["Forbidden"] = 403] = "Forbidden";
    Status1[Status1["NotFound"] = 404] = "NotFound";
    Status1[Status1["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Status1[Status1["NotAcceptable"] = 406] = "NotAcceptable";
    Status1[Status1["ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
    Status1[Status1["RequestTimeout"] = 408] = "RequestTimeout";
    Status1[Status1["Conflict"] = 409] = "Conflict";
    Status1[Status1["Gone"] = 410] = "Gone";
    Status1[Status1["LengthRequired"] = 411] = "LengthRequired";
    Status1[Status1["PreconditionFailed"] = 412] = "PreconditionFailed";
    Status1[Status1["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    Status1[Status1["RequestURITooLong"] = 414] = "RequestURITooLong";
    Status1[Status1["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    Status1[Status1["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    Status1[Status1["ExpectationFailed"] = 417] = "ExpectationFailed";
    Status1[Status1["Teapot"] = 418] = "Teapot";
    Status1[Status1["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    Status1[Status1["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    Status1[Status1["Locked"] = 423] = "Locked";
    Status1[Status1["FailedDependency"] = 424] = "FailedDependency";
    Status1[Status1["TooEarly"] = 425] = "TooEarly";
    Status1[Status1["UpgradeRequired"] = 426] = "UpgradeRequired";
    Status1[Status1["PreconditionRequired"] = 428] = "PreconditionRequired";
    Status1[Status1["TooManyRequests"] = 429] = "TooManyRequests";
    Status1[Status1["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    Status1[Status1["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    Status1[Status1["InternalServerError"] = 500] = "InternalServerError";
    Status1[Status1["NotImplemented"] = 501] = "NotImplemented";
    Status1[Status1["BadGateway"] = 502] = "BadGateway";
    Status1[Status1["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    Status1[Status1["GatewayTimeout"] = 504] = "GatewayTimeout";
    Status1[Status1["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    Status1[Status1["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    Status1[Status1["InsufficientStorage"] = 507] = "InsufficientStorage";
    Status1[Status1["LoopDetected"] = 508] = "LoopDetected";
    Status1[Status1["NotExtended"] = 510] = "NotExtended";
    Status1[Status1["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(Status || (Status = {}));
new Map([
    [
        Status.Continue,
        "Continue"
    ],
    [
        Status.SwitchingProtocols,
        "Switching Protocols"
    ],
    [
        Status.Processing,
        "Processing"
    ],
    [
        Status.EarlyHints,
        "Early Hints"
    ],
    [
        Status.OK,
        "OK"
    ],
    [
        Status.Created,
        "Created"
    ],
    [
        Status.Accepted,
        "Accepted"
    ],
    [
        Status.NonAuthoritativeInfo,
        "Non-Authoritative Information"
    ],
    [
        Status.NoContent,
        "No Content"
    ],
    [
        Status.ResetContent,
        "Reset Content"
    ],
    [
        Status.PartialContent,
        "Partial Content"
    ],
    [
        Status.MultiStatus,
        "Multi-Status"
    ],
    [
        Status.AlreadyReported,
        "Already Reported"
    ],
    [
        Status.IMUsed,
        "IM Used"
    ],
    [
        Status.MultipleChoices,
        "Multiple Choices"
    ],
    [
        Status.MovedPermanently,
        "Moved Permanently"
    ],
    [
        Status.Found,
        "Found"
    ],
    [
        Status.SeeOther,
        "See Other"
    ],
    [
        Status.NotModified,
        "Not Modified"
    ],
    [
        Status.UseProxy,
        "Use Proxy"
    ],
    [
        Status.TemporaryRedirect,
        "Temporary Redirect"
    ],
    [
        Status.PermanentRedirect,
        "Permanent Redirect"
    ],
    [
        Status.BadRequest,
        "Bad Request"
    ],
    [
        Status.Unauthorized,
        "Unauthorized"
    ],
    [
        Status.PaymentRequired,
        "Payment Required"
    ],
    [
        Status.Forbidden,
        "Forbidden"
    ],
    [
        Status.NotFound,
        "Not Found"
    ],
    [
        Status.MethodNotAllowed,
        "Method Not Allowed"
    ],
    [
        Status.NotAcceptable,
        "Not Acceptable"
    ],
    [
        Status.ProxyAuthRequired,
        "Proxy Authentication Required"
    ],
    [
        Status.RequestTimeout,
        "Request Timeout"
    ],
    [
        Status.Conflict,
        "Conflict"
    ],
    [
        Status.Gone,
        "Gone"
    ],
    [
        Status.LengthRequired,
        "Length Required"
    ],
    [
        Status.PreconditionFailed,
        "Precondition Failed"
    ],
    [
        Status.RequestEntityTooLarge,
        "Request Entity Too Large"
    ],
    [
        Status.RequestURITooLong,
        "Request URI Too Long"
    ],
    [
        Status.UnsupportedMediaType,
        "Unsupported Media Type"
    ],
    [
        Status.RequestedRangeNotSatisfiable,
        "Requested Range Not Satisfiable"
    ],
    [
        Status.ExpectationFailed,
        "Expectation Failed"
    ],
    [
        Status.Teapot,
        "I'm a teapot"
    ],
    [
        Status.MisdirectedRequest,
        "Misdirected Request"
    ],
    [
        Status.UnprocessableEntity,
        "Unprocessable Entity"
    ],
    [
        Status.Locked,
        "Locked"
    ],
    [
        Status.FailedDependency,
        "Failed Dependency"
    ],
    [
        Status.TooEarly,
        "Too Early"
    ],
    [
        Status.UpgradeRequired,
        "Upgrade Required"
    ],
    [
        Status.PreconditionRequired,
        "Precondition Required"
    ],
    [
        Status.TooManyRequests,
        "Too Many Requests"
    ],
    [
        Status.RequestHeaderFieldsTooLarge,
        "Request Header Fields Too Large"
    ],
    [
        Status.UnavailableForLegalReasons,
        "Unavailable For Legal Reasons"
    ],
    [
        Status.InternalServerError,
        "Internal Server Error"
    ],
    [
        Status.NotImplemented,
        "Not Implemented"
    ],
    [
        Status.BadGateway,
        "Bad Gateway"
    ],
    [
        Status.ServiceUnavailable,
        "Service Unavailable"
    ],
    [
        Status.GatewayTimeout,
        "Gateway Timeout"
    ],
    [
        Status.HTTPVersionNotSupported,
        "HTTP Version Not Supported"
    ],
    [
        Status.VariantAlsoNegotiates,
        "Variant Also Negotiates"
    ],
    [
        Status.InsufficientStorage,
        "Insufficient Storage"
    ],
    [
        Status.LoopDetected,
        "Loop Detected"
    ],
    [
        Status.NotExtended,
        "Not Extended"
    ],
    [
        Status.NetworkAuthenticationRequired,
        "Network Authentication Required"
    ], 
]);
function assert3(value, message) {
    if (!value) {
        throw new ERR_INTERNAL_ASSERTION(message);
    }
}
function fail1(message) {
    throw new ERR_INTERNAL_ASSERTION(message);
}
assert3.fail = fail1;
let utcCache;
function utcDate() {
    if (!utcCache) cache();
    return utcCache;
}
function cache() {
    const d = new Date();
    utcCache = d.toUTCString();
    setUnrefTimeout(resetCache, 1000 - d.getMilliseconds());
}
function resetCache() {
    utcCache = undefined;
}
const kOutHeaders = Symbol("kOutHeaders");
const kNeedDrain = Symbol("kNeedDrain");
const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
function checkIsHttpToken(val) {
    return tokenRegExp.test(val);
}
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
function checkInvalidHeaderChar(val) {
    return headerCharRegex.test(val);
}
const chunkExpression = /(?:^|\W)chunked(?:$|\W)/i;
const { async_id_symbol: async_id_symbol1  } = symbols;
let debug2 = debuglog("http", (fn)=>{
    debug2 = fn;
});
const HIGH_WATER_MARK = getDefaultHighWaterMark();
const kCorked = Symbol("corked");
const nop3 = ()=>{};
const RE_CONN_CLOSE = /(?:^|\W)close(?:$|\W)/i;
function isCookieField(s) {
    return s.length === 6 && s.toLowerCase() === "cookie";
}
function OutgoingMessage() {
    Stream.call(this);
    this.outputData = [];
    this.outputSize = 0;
    this.writable = true;
    this.destroyed = false;
    this._last = false;
    this.chunkedEncoding = false;
    this.shouldKeepAlive = true;
    this.maxRequestsOnConnectionReached = false;
    this._defaultKeepAlive = true;
    this.useChunkedEncodingByDefault = true;
    this.sendDate = false;
    this._removedConnection = false;
    this._removedContLen = false;
    this._removedTE = false;
    this._contentLength = null;
    this._hasBody = true;
    this._trailer = "";
    this[kNeedDrain] = false;
    this.finished = false;
    this._headerSent = false;
    this[kCorked] = 0;
    this._closed = false;
    this.socket = null;
    this._header = null;
    this[kOutHeaders] = null;
    this._keepAliveTimeout = 0;
    this._onPendingData = nop3;
}
Object.setPrototypeOf(OutgoingMessage.prototype, Stream.prototype);
Object.setPrototypeOf(OutgoingMessage, Stream);
Object.defineProperty(OutgoingMessage.prototype, "writableFinished", {
    get () {
        return this.finished && this.outputSize === 0 && (!this.socket || this.socket.writableLength === 0);
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableObjectMode", {
    get () {
        return false;
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableLength", {
    get () {
        return this.outputSize + (this.socket ? this.socket.writableLength : 0);
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableHighWaterMark", {
    get () {
        return this.socket ? this.socket.writableHighWaterMark : HIGH_WATER_MARK;
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableCorked", {
    get () {
        const corked = this.socket ? this.socket.writableCorked : 0;
        return corked + this[kCorked];
    }
});
Object.defineProperty(OutgoingMessage.prototype, "_headers", {
    get: deprecate(function() {
        return this.getHeaders();
    }, "OutgoingMessage.prototype._headers is deprecated", "DEP0066"),
    set: deprecate(function(val) {
        if (val == null) {
            this[kOutHeaders] = null;
        } else if (typeof val === "object") {
            const headers = this[kOutHeaders] = Object.create(null);
            const keys = Object.keys(val);
            for(let i136 = 0; i136 < keys.length; ++i136){
                const name58 = keys[i136];
                headers[name58.toLowerCase()] = [
                    name58,
                    val[name58]
                ];
            }
        }
    }, "OutgoingMessage.prototype._headers is deprecated", "DEP0066")
});
Object.defineProperty(OutgoingMessage.prototype, "connection", {
    get: function() {
        return this.socket;
    },
    set: function(val) {
        this.socket = val;
    }
});
Object.defineProperty(OutgoingMessage.prototype, "_headerNames", {
    get: deprecate(function() {
        const headers = this[kOutHeaders];
        if (headers !== null) {
            const out = Object.create(null);
            const keys = Object.keys(headers);
            for(let i137 = 0; i137 < keys.length; ++i137){
                const key = keys[i137];
                const val = headers[key][0];
                out[key] = val;
            }
            return out;
        }
        return null;
    }, "OutgoingMessage.prototype._headerNames is deprecated", "DEP0066"),
    set: deprecate(function(val) {
        if (typeof val === "object" && val !== null) {
            const headers = this[kOutHeaders];
            if (!headers) {
                return;
            }
            const keys = Object.keys(val);
            for(let i138 = 0; i138 < keys.length; ++i138){
                const header = headers[keys[i138]];
                if (header) {
                    header[0] = val[keys[i138]];
                }
            }
        }
    }, "OutgoingMessage.prototype._headerNames is deprecated", "DEP0066")
});
OutgoingMessage.prototype._renderHeaders = function _renderHeaders() {
    if (this._header) {
        throw new ERR_HTTP_HEADERS_SENT("render");
    }
    const headersMap = this[kOutHeaders];
    const headers = {};
    if (headersMap !== null) {
        const keys = Object.keys(headersMap);
        for(let i139 = 0, l = keys.length; i139 < l; i139++){
            const key = keys[i139];
            headers[headersMap[key][0]] = headersMap[key][1];
        }
    }
    return headers;
};
OutgoingMessage.prototype.cork = function() {
    if (this.socket) {
        this.socket.cork();
    } else {
        this[kCorked]++;
    }
};
OutgoingMessage.prototype.uncork = function() {
    if (this.socket) {
        this.socket.uncork();
    } else if (this[kCorked]) {
        this[kCorked]--;
    }
};
OutgoingMessage.prototype.setTimeout = function setTimeout(msecs, callback) {
    if (callback) {
        this.on("timeout", callback);
    }
    if (!this.socket) {
        this.once("socket", function socketSetTimeoutOnConnect(socket) {
            socket.setTimeout(msecs);
        });
    } else {
        this.socket.setTimeout(msecs);
    }
    return this;
};
OutgoingMessage.prototype.destroy = function destroy(error24) {
    if (this.destroyed) {
        return this;
    }
    this.destroyed = true;
    if (this.socket) {
        this.socket.destroy(error24);
    } else {
        this.once("socket", function socketDestroyOnConnect(socket) {
            socket.destroy(error24);
        });
    }
    return this;
};
OutgoingMessage.prototype._send = function _send(data8, encoding, callback) {
    if (!this._headerSent) {
        if (typeof data8 === "string" && (encoding === "utf8" || encoding === "latin1" || !encoding)) {
            data8 = this._header + data8;
        } else {
            const header = this._header;
            this.outputData.unshift({
                data: header,
                encoding: "latin1",
                callback: null
            });
            this.outputSize += header.length;
            this._onPendingData(header.length);
        }
        this._headerSent = true;
    }
    return this._writeRaw(data8, encoding, callback);
};
OutgoingMessage.prototype._writeRaw = _writeRaw;
function _writeRaw(data9, encoding, callback) {
    const conn = this.socket;
    if (conn && conn.destroyed) {
        return false;
    }
    if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
    }
    if (conn && conn._httpMessage === this && conn.writable) {
        if (this.outputData.length) {
            this._flushOutput(conn);
        }
        return conn.write(data9, encoding, callback);
    }
    this.outputData.push({
        data: data9,
        encoding,
        callback
    });
    this.outputSize += data9.length;
    this._onPendingData(data9.length);
    return this.outputSize < HIGH_WATER_MARK;
}
OutgoingMessage.prototype._storeHeader = _storeHeader;
function _storeHeader(firstLine, headers) {
    const state = {
        connection: false,
        contLen: false,
        te: false,
        date: false,
        expect: false,
        trailer: false,
        header: firstLine
    };
    if (headers) {
        if (headers === this[kOutHeaders]) {
            for(const key in headers){
                const entry = headers[key];
                processHeader(this, state, entry[0], entry[1], false);
            }
        } else if (Array.isArray(headers)) {
            if (headers.length && Array.isArray(headers[0])) {
                for(let i140 = 0; i140 < headers.length; i140++){
                    const entry = headers[i140];
                    processHeader(this, state, entry[0], entry[1], true);
                }
            } else {
                if (headers.length % 2 !== 0) {
                    throw new ERR_INVALID_ARG_VALUE("headers", headers);
                }
                for(let n = 0; n < headers.length; n += 2){
                    processHeader(this, state, headers[n + 0], headers[n + 1], true);
                }
            }
        } else {
            for(const key in headers){
                if (Object.hasOwn(headers, key)) {
                    processHeader(this, state, key, headers[key], true);
                }
            }
        }
    }
    let { header  } = state;
    if (this.sendDate && !state.date) {
        header += "Date: " + utcDate() + "\r\n";
    }
    if (this.chunkedEncoding && (this.statusCode === 204 || this.statusCode === 304)) {
        debug2(this.statusCode + " response should not use chunked encoding," + " closing connection.");
        this.chunkedEncoding = false;
        this.shouldKeepAlive = false;
    }
    if (this._removedConnection) {
        this._last = true;
        this.shouldKeepAlive = false;
    } else if (!state.connection) {
        const shouldSendKeepAlive = this.shouldKeepAlive && (state.contLen || this.useChunkedEncodingByDefault || this.agent);
        if (shouldSendKeepAlive && this.maxRequestsOnConnectionReached) {
            header += "Connection: close\r\n";
        } else if (shouldSendKeepAlive) {
            header += "Connection: keep-alive\r\n";
            if (this._keepAliveTimeout && this._defaultKeepAlive) {
                const timeoutSeconds = Math.floor(this._keepAliveTimeout / 1000);
                header += `Keep-Alive: timeout=${timeoutSeconds}\r\n`;
            }
        } else {
            this._last = true;
            header += "Connection: close\r\n";
        }
    }
    if (!state.contLen && !state.te) {
        if (!this._hasBody) {
            this.chunkedEncoding = false;
        } else if (!this.useChunkedEncodingByDefault) {
            this._last = true;
        } else if (!state.trailer && !this._removedContLen && typeof this._contentLength === "number") {
            header += "Content-Length: " + this._contentLength + "\r\n";
        } else if (!this._removedTE) {
            header += "Transfer-Encoding: chunked\r\n";
            this.chunkedEncoding = true;
        } else {
            debug2("Both Content-Length and Transfer-Encoding are removed");
        }
    }
    if (this.chunkedEncoding !== true && state.trailer) {
        throw new ERR_HTTP_TRAILER_INVALID();
    }
    this._header = header + "\r\n";
    this._headerSent = false;
    if (state.expect) this._send("");
}
function processHeader(self, state, key, value, validate) {
    if (validate) {
        validateHeaderName(key);
    }
    if (Array.isArray(value)) {
        if (value.length < 2 || !isCookieField(key)) {
            for(let i141 = 0; i141 < value.length; i141++){
                storeHeader(self, state, key, value[i141], validate);
            }
            return;
        }
        value = value.join("; ");
    }
    storeHeader(self, state, key, value, validate);
}
function storeHeader(self, state, key, value, validate) {
    if (validate) {
        validateHeaderValue(key, value);
    }
    state.header += key + ": " + value + "\r\n";
    matchHeader(self, state, key, value);
}
function matchHeader(self, state, field, value) {
    if (field.length < 4 || field.length > 17) {
        return;
    }
    field = field.toLowerCase();
    switch(field){
        case "connection":
            state.connection = true;
            self._removedConnection = false;
            if (RE_CONN_CLOSE.test(value)) {
                self._last = true;
            } else {
                self.shouldKeepAlive = true;
            }
            break;
        case "transfer-encoding":
            state.te = true;
            self._removedTE = false;
            if (chunkExpression.test(value)) {
                self.chunkedEncoding = true;
            }
            break;
        case "content-length":
            state.contLen = true;
            self._removedContLen = false;
            break;
        case "date":
        case "expect":
        case "trailer":
            state[field] = true;
            break;
        case "keep-alive":
            self._defaultKeepAlive = false;
            break;
    }
}
const validateHeaderName = hideStackFrames((name59)=>{
    if (typeof name59 !== "string" || !name59 || !checkIsHttpToken(name59)) {
        throw new ERR_INVALID_HTTP_TOKEN("Header name", name59);
    }
});
const validateHeaderValue = hideStackFrames((name60, value)=>{
    if (value === undefined) {
        throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name60);
    }
    if (checkInvalidHeaderChar(value)) {
        debug2('Header "%s" contains invalid characters', name60);
        throw new ERR_INVALID_CHAR("header content", name60);
    }
});
OutgoingMessage.prototype.setHeader = function setHeader(name61, value) {
    if (this._header) {
        throw new ERR_HTTP_HEADERS_SENT("set");
    }
    validateHeaderName(name61);
    validateHeaderValue(name61, value);
    let headers = this[kOutHeaders];
    if (headers === null) {
        this[kOutHeaders] = headers = Object.create(null);
    }
    headers[name61.toLowerCase()] = [
        name61,
        value
    ];
    return this;
};
OutgoingMessage.prototype.getHeader = function getHeader(name62) {
    validateString(name62, "name");
    const headers = this[kOutHeaders];
    if (headers === null) {
        return;
    }
    const entry = headers[name62.toLowerCase()];
    return entry && entry[1];
};
OutgoingMessage.prototype.getHeaderNames = function getHeaderNames() {
    return this[kOutHeaders] !== null ? Object.keys(this[kOutHeaders]) : [];
};
OutgoingMessage.prototype.getRawHeaderNames = function getRawHeaderNames() {
    const headersMap = this[kOutHeaders];
    if (headersMap === null) return [];
    const values = Object.values(headersMap);
    const headers = Array(values.length);
    for(let i142 = 0, l = values.length; i142 < l; i142++){
        headers[i142] = values[i142][0];
    }
    return headers;
};
OutgoingMessage.prototype.getHeaders = function getHeaders() {
    const headers = this[kOutHeaders];
    const ret = Object.create(null);
    if (headers) {
        const keys = Object.keys(headers);
        for(let i143 = 0; i143 < keys.length; ++i143){
            const key = keys[i143];
            const val = headers[key][1];
            ret[key] = val;
        }
    }
    return ret;
};
OutgoingMessage.prototype.hasHeader = function hasHeader(name63) {
    validateString(name63, "name");
    return this[kOutHeaders] !== null && !!this[kOutHeaders][name63.toLowerCase()];
};
OutgoingMessage.prototype.removeHeader = function removeHeader(name64) {
    validateString(name64, "name");
    if (this._header) {
        throw new ERR_HTTP_HEADERS_SENT("remove");
    }
    const key = name64.toLowerCase();
    switch(key){
        case "connection":
            this._removedConnection = true;
            break;
        case "content-length":
            this._removedContLen = true;
            break;
        case "transfer-encoding":
            this._removedTE = true;
            break;
        case "date":
            this.sendDate = false;
            break;
    }
    if (this[kOutHeaders] !== null) {
        delete this[kOutHeaders][key];
    }
};
OutgoingMessage.prototype._implicitHeader = function _implicitHeader() {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_implicitHeader()");
};
Object.defineProperty(OutgoingMessage.prototype, "headersSent", {
    configurable: true,
    enumerable: true,
    get: function() {
        return !!this._header;
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableEnded", {
    get: function() {
        return this.finished;
    }
});
Object.defineProperty(OutgoingMessage.prototype, "writableNeedDrain", {
    get: function() {
        return !this.destroyed && !this.finished && this[kNeedDrain];
    }
});
const crlf_buf = Buffer.from("\r\n");
OutgoingMessage.prototype.write = function write(chunk, encoding, callback) {
    if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
    }
    const ret = write_(this, chunk, encoding, callback, false);
    if (!ret) {
        this[kNeedDrain] = true;
    }
    return ret;
};
function onError(msg, err, callback) {
    const triggerAsyncId = msg.socket ? msg.socket[async_id_symbol1] : undefined;
    defaultTriggerAsyncIdScope(triggerAsyncId, globalThis.process.nextTick, emitErrorNt, msg, err, callback);
}
function emitErrorNt(msg, err, callback) {
    callback(err);
    if (typeof msg.emit === "function" && !msg._closed) {
        msg.emit("error", err);
    }
}
function write_(msg, chunk, encoding, callback, fromEnd) {
    if (typeof callback !== "function") {
        callback = nop3;
    }
    let len;
    if (chunk === null) {
        throw new ERR_STREAM_NULL_VALUES();
    } else if (typeof chunk === "string") {
        len = Buffer.byteLength(chunk, encoding);
    } else if (isUint8Array(chunk)) {
        len = chunk.length;
    } else {
        throw new ERR_INVALID_ARG_TYPE("chunk", [
            "string",
            "Buffer",
            "Uint8Array"
        ], chunk);
    }
    let err;
    if (msg.finished) {
        err = new ERR_STREAM_WRITE_AFTER_END();
    } else if (msg.destroyed) {
        err = new ERR_STREAM_DESTROYED("write");
    }
    if (err) {
        if (!msg.destroyed) {
            onError(msg, err, callback);
        } else {
            globalThis.process.nextTick(callback, err);
        }
        return false;
    }
    if (!msg._header) {
        if (fromEnd) {
            msg._contentLength = len;
        }
        msg._implicitHeader();
    }
    if (!msg._hasBody) {
        debug2("This type of response MUST NOT have a body. " + "Ignoring write() calls.");
        globalThis.process.nextTick(callback);
        return true;
    }
    if (!fromEnd && msg.socket && !msg.socket.writableCorked) {
        msg.socket.cork();
        globalThis.process.nextTick(connectionCorkNT, msg.socket);
    }
    let ret;
    if (msg.chunkedEncoding && chunk.length !== 0) {
        msg._send(len.toString(16), "latin1", null);
        msg._send(crlf_buf, null, null);
        msg._send(chunk, encoding, null);
        ret = msg._send(crlf_buf, null, callback);
    } else {
        ret = msg._send(chunk, encoding, callback);
    }
    debug2("write ret = " + ret);
    return ret;
}
function connectionCorkNT(conn) {
    conn.uncork();
}
OutgoingMessage.prototype.addTrailers = function addTrailers(headers) {
    this._trailer = "";
    const keys = Object.keys(headers);
    const isArray1 = Array.isArray(headers);
    for(let i144 = 0, l = keys.length; i144 < l; i144++){
        let field, value;
        const key = keys[i144];
        if (isArray1) {
            field = headers[key][0];
            value = headers[key][1];
        } else {
            field = key;
            value = headers[key];
        }
        if (typeof field !== "string" || !field || !checkIsHttpToken(field)) {
            throw new ERR_INVALID_HTTP_TOKEN("Trailer name", field);
        }
        if (checkInvalidHeaderChar(value)) {
            debug2('Trailer "%s" contains invalid characters', field);
            throw new ERR_INVALID_CHAR("trailer content", field);
        }
        this._trailer += field + ": " + value + "\r\n";
    }
};
function onFinish(outmsg) {
    if (outmsg && outmsg.socket && outmsg.socket._hadError) return;
    outmsg.emit("finish");
}
OutgoingMessage.prototype.end = function end(chunk, encoding, callback) {
    if (typeof chunk === "function") {
        callback = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
    }
    if (chunk) {
        if (this.finished) {
            onError(this, new ERR_STREAM_WRITE_AFTER_END(), typeof callback !== "function" ? nop3 : callback);
            return this;
        }
        if (this.socket) {
            this.socket.cork();
        }
        write_(this, chunk, encoding, null, true);
    } else if (this.finished) {
        if (typeof callback === "function") {
            if (!this.writableFinished) {
                this.on("finish", callback);
            } else {
                callback(new ERR_STREAM_ALREADY_FINISHED("end"));
            }
        }
        return this;
    } else if (!this._header) {
        if (this.socket) {
            this.socket.cork();
        }
        this._contentLength = 0;
        this._implicitHeader();
    }
    if (typeof callback === "function") {
        this.once("finish", callback);
    }
    const finish3 = onFinish.bind(undefined, this);
    if (this._hasBody && this.chunkedEncoding) {
        this._send("0\r\n" + this._trailer + "\r\n", "latin1", finish3);
    } else if (!this._headerSent || this.writableLength || chunk) {
        this._send("", "latin1", finish3);
    } else {
        globalThis.process.nextTick(finish3);
    }
    if (this.socket) {
        this.socket._writableState.corked = 1;
        this.socket.uncork();
    }
    this[kCorked] = 0;
    this.finished = true;
    debug2("outgoing message end.");
    if (this.outputData.length === 0 && this.socket && this.socket._httpMessage === this) {
        this._finish();
    }
    return this;
};
OutgoingMessage.prototype._finish = function _finish() {
    assert3(this.socket);
    this.emit("prefinish");
};
OutgoingMessage.prototype._flush = function _flush() {
    const socket = this.socket;
    if (socket && socket.writable) {
        const ret = this._flushOutput(socket);
        if (this.finished) {
            this._finish();
        } else if (ret && this[kNeedDrain]) {
            this[kNeedDrain] = false;
            this.emit("drain");
        }
    }
};
OutgoingMessage.prototype._flushOutput = function _flushOutput(socket) {
    while(this[kCorked]){
        this[kCorked]--;
        socket.cork();
    }
    const outputLength = this.outputData.length;
    if (outputLength <= 0) {
        return undefined;
    }
    const outputData = this.outputData;
    socket.cork();
    let ret;
    for(let i145 = 0; i145 < outputLength; i145++){
        const { data: data10 , encoding , callback  } = outputData[i145];
        ret = socket.write(data10, encoding, callback);
    }
    socket.uncork();
    this.outputData = [];
    this._onPendingData(-this.outputSize);
    this.outputSize = 0;
    return ret;
};
OutgoingMessage.prototype.flushHeaders = function flushHeaders() {
    if (!this._header) {
        this._implicitHeader();
    }
    this._send("");
};
OutgoingMessage.prototype.pipe = function pipe() {
    this.emit("error", new ERR_STREAM_CANNOT_PIPE());
};
OutgoingMessage.prototype[EventEmitter.captureRejectionSymbol] = function(err, _event) {
    this.destroy(err);
};
const destroyedSymbol = Symbol("destroyed");
class AsyncResource {
    [async_id_symbol];
    [trigger_async_id_symbol];
    [destroyedSymbol];
    constructor(type38, opts = {}){
        validateString(type38, "type");
        let triggerAsyncId;
        let requireManualDestroy = false;
        if (typeof opts !== "number") {
            triggerAsyncId = opts.triggerAsyncId === undefined ? getDefaultTriggerAsyncId() : opts.triggerAsyncId;
            requireManualDestroy = !!opts.requireManualDestroy;
        } else {
            triggerAsyncId = opts;
        }
        if (!Number.isSafeInteger(triggerAsyncId) || triggerAsyncId < -1) {
            throw new ERR_INVALID_ASYNC_ID("triggerAsyncId", triggerAsyncId);
        }
        const asyncId = newAsyncId1();
        this[async_id_symbol] = asyncId;
        this[trigger_async_id_symbol] = triggerAsyncId;
        if (initHooksExist()) {
            if (enabledHooksExist() && type38.length === 0) {
                throw new ERR_ASYNC_TYPE(type38);
            }
            emitInitScript(asyncId, type38, triggerAsyncId, this);
        }
        if (!requireManualDestroy && destroyHooksExist()) {
            const destroyed = {
                destroyed: false
            };
            this[destroyedSymbol] = destroyed;
            registerDestroyHook1(this, asyncId, destroyed);
        }
    }
    runInAsyncScope(fn, thisArg, ...args) {
        this[async_id_symbol];
        try {
            const ret = Reflect.apply(fn, thisArg, args);
            return ret;
        } finally{
            if (hasAsyncIdStack()) {}
        }
    }
    emitDestroy() {
        if (this[destroyedSymbol] !== undefined) {
            this[destroyedSymbol].destroyed = true;
        }
        return this;
    }
    asyncId() {
        return this[async_id_symbol];
    }
    triggerAsyncId() {
        return this[trigger_async_id_symbol];
    }
    bind(fn, thisArg = this) {
        validateFunction(fn, "fn");
        const ret = this.runInAsyncScope.bind(this, fn, thisArg);
        Object.defineProperties(ret, {
            "length": {
                configurable: true,
                enumerable: false,
                value: fn.length,
                writable: false
            },
            "asyncResource": {
                configurable: true,
                enumerable: true,
                value: this,
                writable: true
            }
        });
        return ret;
    }
    static bind(fn, type39, thisArg) {
        type39 = type39 || fn.name;
        return new AsyncResource(type39 || "bound-anonymous-fn").bind(fn, thisArg);
    }
}
let debug3 = debuglog("http", (fn)=>{
    debug3 = fn;
});
const { async_id_symbol: async_id_symbol2  } = symbols;
const kOnKeylog = Symbol("onkeylog");
const kRequestOptions = Symbol("requestOptions");
const kRequestAsyncResource = Symbol("requestAsyncResource");
class ReusedHandle {
    constructor(type40, handle){
        this.type = type40;
        this.handle = handle;
    }
}
function freeSocketErrorListener(err) {
    const socket = this;
    debug3("SOCKET ERROR on FREE socket:", err.message, err.stack);
    socket.destroy();
    socket.emit("agentRemove");
}
function Agent(options1) {
    if (!(this instanceof Agent)) {
        return new Agent(options1);
    }
    EventEmitter.call(this);
    this.defaultPort = 80;
    this.protocol = "http:";
    this.options = {
        __proto__: null,
        ...options1
    };
    this.options.path = null;
    this.requests = Object.create(null);
    this.sockets = Object.create(null);
    this.freeSockets = Object.create(null);
    this.keepAliveMsecs = this.options.keepAliveMsecs || 1000;
    this.keepAlive = this.options.keepAlive || false;
    this.maxSockets = this.options.maxSockets || Agent.defaultMaxSockets;
    this.maxFreeSockets = this.options.maxFreeSockets || 256;
    this.scheduling = this.options.scheduling || "lifo";
    this.maxTotalSockets = this.options.maxTotalSockets;
    this.totalSocketCount = 0;
    validateOneOf(this.scheduling, "scheduling", [
        "fifo",
        "lifo"
    ]);
    if (this.maxTotalSockets !== undefined) {
        validateNumber(this.maxTotalSockets, "maxTotalSockets");
        if (this.maxTotalSockets <= 0 || Number.isNaN(this.maxTotalSockets)) {
            throw new ERR_OUT_OF_RANGE("maxTotalSockets", "> 0", this.maxTotalSockets);
        }
    } else {
        this.maxTotalSockets = Infinity;
    }
    this.on("free", (socket, options)=>{
        const name65 = this.getName(options);
        debug3("agent.on(free)", name65);
        if (!socket.writable) {
            socket.destroy();
            return;
        }
        const requests = this.requests[name65];
        if (requests && requests.length) {
            const req21 = requests.shift();
            const reqAsyncRes = req21[kRequestAsyncResource];
            if (reqAsyncRes) {
                reqAsyncRes.runInAsyncScope(()=>{
                    asyncResetHandle(socket);
                    setRequestSocket(this, req21, socket);
                });
                req21[kRequestAsyncResource] = null;
            } else {
                setRequestSocket(this, req21, socket);
            }
            if (requests.length === 0) {
                delete this.requests[name65];
            }
            return;
        }
        const req22 = socket._httpMessage;
        if (!req22 || !req22.shouldKeepAlive || !this.keepAlive) {
            socket.destroy();
            return;
        }
        const freeSockets = this.freeSockets[name65] || [];
        const freeLen = freeSockets.length;
        let count = freeLen;
        if (this.sockets[name65]) {
            count += this.sockets[name65].length;
        }
        if (this.totalSocketCount > this.maxTotalSockets || count > this.maxSockets || freeLen >= this.maxFreeSockets || !this.keepSocketAlive(socket)) {
            socket.destroy();
            return;
        }
        this.freeSockets[name65] = freeSockets;
        socket[async_id_symbol2] = -1;
        socket._httpMessage = null;
        this.removeSocket(socket, options);
        socket.once("error", freeSocketErrorListener);
        freeSockets.push(socket);
    });
    this.on("newListener", maybeEnableKeylog);
}
Object.setPrototypeOf(Agent.prototype, EventEmitter.prototype);
Object.setPrototypeOf(Agent, EventEmitter);
function maybeEnableKeylog(eventName) {
    if (eventName === "keylog") {
        this.removeListener("newListener", maybeEnableKeylog);
        const agent = this;
        this[kOnKeylog] = function onkeylog(keylog) {
            agent.emit("keylog", keylog, this);
        };
        const sockets = ObjectValues(this.sockets);
        for(let i146 = 0; i146 < sockets.length; i146++){
            sockets[i146].on("keylog", this[kOnKeylog]);
        }
    }
}
Agent.defaultMaxSockets = Infinity;
Agent.prototype.createConnection = createConnection;
Agent.prototype.getName = function getName(options) {
    let name66 = options.host || "localhost";
    name66 += ":";
    if (options.port) {
        name66 += options.port;
    }
    name66 += ":";
    if (options.localAddress) {
        name66 += options.localAddress;
    }
    if (options.family === 4 || options.family === 6) {
        name66 += `:${options.family}`;
    }
    if (options.socketPath) {
        name66 += `:${options.socketPath}`;
    }
    return name66;
};
Agent.prototype.addRequest = function addRequest(req23, options, port8, localAddress) {
    if (typeof options === "string") {
        options = {
            __proto__: null,
            host: options,
            port: port8,
            localAddress
        };
    }
    options = {
        __proto__: null,
        ...options,
        ...this.options
    };
    if (options.socketPath) {
        options.path = options.socketPath;
    }
    if (!options.servername && options.servername !== "") {
        options.servername = calculateServerName(options, req23);
    }
    const name67 = this.getName(options);
    if (!this.sockets[name67]) {
        this.sockets[name67] = [];
    }
    const freeSockets = this.freeSockets[name67];
    let socket1;
    if (freeSockets) {
        while(freeSockets.length && freeSockets[0].destroyed){
            freeSockets.shift();
        }
        socket1 = this.scheduling === "fifo" ? freeSockets.shift() : freeSockets.pop();
        if (!freeSockets.length) {
            delete this.freeSockets[name67];
        }
    }
    const freeLen = freeSockets ? freeSockets.length : 0;
    const sockLen = freeLen + this.sockets[name67].length;
    if (socket1) {
        asyncResetHandle(socket1);
        this.reuseSocket(socket1, req23);
        setRequestSocket(this, req23, socket1);
        this.sockets[name67].push(socket1);
    } else if (sockLen < this.maxSockets && this.totalSocketCount < this.maxTotalSockets) {
        debug3("call onSocket", sockLen, freeLen);
        this.createSocket(req23, options, (err, socket)=>{
            if (err) {
                req23.onSocket(socket, err);
            } else {
                setRequestSocket(this, req23, socket);
            }
        });
    } else {
        debug3("wait for socket");
        if (!this.requests[name67]) {
            this.requests[name67] = [];
        }
        req23[kRequestOptions] = options;
        req23[kRequestAsyncResource] = new AsyncResource("QueuedRequest");
        this.requests[name67].push(req23);
    }
};
Agent.prototype.createSocket = function createSocket(req24, options, cb) {
    options = {
        __proto__: null,
        ...options,
        ...this.options
    };
    if (options.socketPath) {
        options.path = options.socketPath;
    }
    if (!options.servername && options.servername !== "") {
        options.servername = calculateServerName(options, req24);
    }
    const name68 = this.getName(options);
    options._agentKey = name68;
    debug3("createConnection", name68, options);
    options.encoding = null;
    const oncreate = once((err, s)=>{
        if (err) {
            return cb(err);
        }
        if (!this.sockets[name68]) {
            this.sockets[name68] = [];
        }
        this.sockets[name68].push(s);
        this.totalSocketCount++;
        debug3("sockets", name68, this.sockets[name68].length, this.totalSocketCount);
        installListeners(this, s, options);
        cb(null, s);
    });
    const newSocket = this.createConnection(options, oncreate);
    if (newSocket) {
        oncreate(null, newSocket);
    }
};
function calculateServerName(options, req25) {
    let servername = options.host;
    const hostHeader = req25.getHeader("host");
    if (hostHeader) {
        validateString(hostHeader, "options.headers.host");
        if (hostHeader.startsWith("[")) {
            const index = hostHeader.indexOf("]");
            if (index === -1) {
                servername = hostHeader;
            } else {
                servername = hostHeader.substr(1, index - 1);
            }
        } else {
            servername = hostHeader.split(":", 1)[0];
        }
    }
    if (isIP(servername)) {
        servername = "";
    }
    return servername;
}
function installListeners(agent, s, options) {
    function onFree() {
        debug3("CLIENT socket onFree");
        agent.emit("free", s, options);
    }
    s.on("free", onFree);
    function onClose(_err) {
        debug3("CLIENT socket onClose");
        agent.totalSocketCount--;
        agent.removeSocket(s, options);
    }
    s.on("close", onClose);
    function onTimeout() {
        debug3("CLIENT socket onTimeout");
        const sockets = agent.freeSockets;
        if (Object.keys(sockets).some((name69)=>sockets[name69].includes(s)
        )) {
            return s.destroy();
        }
    }
    s.on("timeout", onTimeout);
    function onRemove() {
        debug3("CLIENT socket onRemove");
        agent.totalSocketCount--;
        agent.removeSocket(s, options);
        s.removeListener("close", onClose);
        s.removeListener("free", onFree);
        s.removeListener("timeout", onTimeout);
        s.removeListener("agentRemove", onRemove);
    }
    s.on("agentRemove", onRemove);
    if (agent[kOnKeylog]) {
        s.on("keylog", agent[kOnKeylog]);
    }
}
Agent.prototype.removeSocket = function removeSocket(s, options) {
    const name70 = this.getName(options);
    debug3("removeSocket", name70, "writable:", s.writable);
    const sets = [
        this.sockets
    ];
    if (!s.writable) {
        sets.push(this.freeSockets);
    }
    for(let sk = 0; sk < sets.length; sk++){
        const sockets = sets[sk];
        if (sockets[name70]) {
            const index = sockets[name70].indexOf(s);
            if (index !== -1) {
                sockets[name70].splice(index, 1);
                if (sockets[name70].length === 0) {
                    delete sockets[name70];
                }
            }
        }
    }
    let req26;
    if (this.requests[name70] && this.requests[name70].length) {
        debug3("removeSocket, have a request, make a socket");
        req26 = this.requests[name70][0];
    } else {
        const keys = Object.keys(this.requests);
        for(let i147 = 0; i147 < keys.length; i147++){
            const prop = keys[i147];
            if (this.sockets[prop] && this.sockets[prop].length) break;
            debug3("removeSocket, have a request with different origin," + " make a socket");
            req26 = this.requests[prop][0];
            options = req26[kRequestOptions];
            break;
        }
    }
    if (req26 && options) {
        req26[kRequestOptions] = undefined;
        this.createSocket(req26, options, (err, socket)=>{
            if (err) {
                req26.onSocket(socket, err);
            } else {
                socket.emit("free");
            }
        });
    }
};
Agent.prototype.keepSocketAlive = function keepSocketAlive(socket) {
    socket.setKeepAlive(true, this.keepAliveMsecs);
    socket.unref();
    const agentTimeout = this.options.timeout || 0;
    if (socket.timeout !== agentTimeout) {
        socket.setTimeout(agentTimeout);
    }
    return true;
};
Agent.prototype.reuseSocket = function reuseSocket(socket, req27) {
    debug3("have free socket");
    socket.removeListener("error", freeSocketErrorListener);
    req27.reusedSocket = true;
    socket.ref();
};
Agent.prototype.destroy = function destroy() {
    const sets = [
        this.freeSockets,
        this.sockets
    ];
    for(let s = 0; s < sets.length; s++){
        const set = sets[s];
        const keys = Object.keys(set);
        for(let v17 = 0; v17 < keys.length; v17++){
            const setName = set[keys[v17]];
            for(let n = 0; n < setName.length; n++){
                setName[n].destroy();
            }
        }
    }
};
function setRequestSocket(agent, req28, socket) {
    req28.onSocket(socket);
    const agentTimeout = agent.options.timeout || 0;
    if (req28.timeout === undefined || req28.timeout === agentTimeout) {
        return;
    }
    socket.setTimeout(req28.timeout);
}
function asyncResetHandle(socket) {
    const handle = socket._handle;
    if (handle && typeof handle.asyncReset === "function") {
        handle.asyncReset(new ReusedHandle(handle.getProviderType(), handle));
        socket[async_id_symbol2] = handle.getAsyncId();
    }
}
new Agent();
const METHODS = [
    "ACL",
    "BIND",
    "CHECKOUT",
    "CONNECT",
    "COPY",
    "DELETE",
    "GET",
    "HEAD",
    "LINK",
    "LOCK",
    "M-SEARCH",
    "MERGE",
    "MKACTIVITY",
    "MKCALENDAR",
    "MKCOL",
    "MOVE",
    "NOTIFY",
    "OPTIONS",
    "PATCH",
    "POST",
    "PROPFIND",
    "PROPPATCH",
    "PURGE",
    "PUT",
    "REBIND",
    "REPORT",
    "SEARCH",
    "SOURCE",
    "SUBSCRIBE",
    "TRACE",
    "UNBIND",
    "UNLINK",
    "UNLOCK",
    "UNSUBSCRIBE", 
];
function chunkToU8(chunk) {
    if (typeof chunk === "string") {
        return core.encode(chunk);
    }
    return chunk;
}
class ClientRequest extends Writable {
    body;
    controller;
    constructor(opts, cb){
        super();
        this.opts = opts;
        this.cb = cb;
        this.body = null;
        this.controller = null;
    }
    _write(chunk, _enc, cb) {
        if (this.controller) {
            this.controller.enqueue(chunk);
            cb();
            return;
        }
        this.body = new ReadableStream({
            start: (controller)=>{
                this.controller = controller;
                controller.enqueue(chunk);
                cb();
            }
        });
    }
    async _final() {
        if (this.controller) {
            this.controller.close();
        }
        const client = await this._createCustomClient();
        const opts = {
            body: this.body,
            method: this.opts.method,
            client
        };
        const mayResponse = fetch(this._createUrlStrFromOptions(this.opts), opts).catch((e)=>{
            if (e.message.includes("connection closed before message completed")) {} else {
                this.emit("error", e);
            }
            return undefined;
        });
        const res = new IncomingMessageForClient(await mayResponse, this._createSocket());
        this.emit("response", res);
        if (client) {
            res.on("end", ()=>{
                client.close();
            });
        }
        this.cb?.(res);
    }
    abort() {
        this.destroy();
    }
    _createCustomClient() {
        return Promise.resolve(undefined);
    }
    _createSocket() {
        return new Socket({});
    }
    _createUrlStrFromOptions(opts) {
        if (opts.href) {
            return opts.href;
        } else {
            const { auth , protocol , host , hostname: hostname30 , path: path54 , port: port9 ,  } = opts;
            return `${protocol}//${auth ? `${auth}@` : ""}${host ?? hostname30}${port9 ? `:${port9}` : ""}${path54}`;
        }
    }
    opts;
    cb;
}
class IncomingMessageForClient extends Readable {
    reader;
    constructor(response, socket){
        super();
        this.response = response;
        this.socket = socket;
        this.reader = response?.body?.getReader();
    }
    async _read(_size) {
        if (this.reader === undefined) {
            this.push(null);
            return;
        }
        try {
            const res = await this.reader.read();
            if (res.done) {
                this.push(null);
                return;
            }
            this.push(res.value);
        } catch (e) {
            this.destroy(e);
        }
    }
    get headers() {
        if (this.response) {
            return Object.fromEntries(this.response.headers.entries());
        }
        return {};
    }
    get trailers() {
        return {};
    }
    get statusCode() {
        return this.response?.status || 0;
    }
    get statusMessage() {
        return this.response?.statusText || "";
    }
    response;
    socket;
}
class ServerResponse extends Writable {
    statusCode = undefined;
    statusMessage = undefined;
    #headers = new Headers({});
    readable;
    headersSent = false;
    #reqEvent;
    #firstChunk = null;
    constructor(reqEvent){
        let controller;
        const readable = new ReadableStream({
            start (c) {
                controller = c;
            }
        });
        super({
            autoDestroy: true,
            defaultEncoding: "utf-8",
            emitClose: true,
            write: (chunk, _encoding, cb)=>{
                if (!this.headersSent) {
                    if (this.#firstChunk === null) {
                        this.#firstChunk = chunk;
                        return cb();
                    } else {
                        controller.enqueue(chunkToU8(this.#firstChunk));
                        this.#firstChunk = null;
                        this.respond(false);
                    }
                }
                controller.enqueue(chunkToU8(chunk));
                return cb();
            },
            final: (cb)=>{
                if (this.#firstChunk) {
                    this.respond(true, this.#firstChunk);
                } else if (!this.headersSent) {
                    this.respond(true);
                }
                controller.close();
                return cb();
            },
            destroy: (err, cb)=>{
                if (err) {
                    controller.error(err);
                }
                return cb(null);
            }
        });
        this.readable = readable;
        this.#reqEvent = reqEvent;
    }
    setHeader(name71, value) {
        this.#headers.set(name71, value);
        return this;
    }
    getHeader(name72) {
        return this.#headers.get(name72);
    }
    removeHeader(name73) {
        return this.#headers.delete(name73);
    }
    getHeaderNames() {
        return Array.from(this.#headers.keys());
    }
    hasHeader(name74) {
        return this.#headers.has(name74);
    }
    writeHead(status, headers) {
        this.statusCode = status;
        for(const k14 in headers){
            this.#headers.set(k14, headers[k14]);
        }
        return this;
    }
     #ensureHeaders(singleChunk) {
        if (this.statusCode === undefined) {
            this.statusCode = 200;
            this.statusMessage = "OK";
        }
        if (typeof singleChunk === "string" && !this.hasHeader("content-type")) {
            this.setHeader("content-type", "text/plain;charset=UTF-8");
        }
    }
    respond(__final3, singleChunk1) {
        this.headersSent = true;
        this.#ensureHeaders(singleChunk1);
        const body = singleChunk1 ?? (__final3 ? null : this.readable);
        this.#reqEvent.respondWith(new Response(body, {
            headers: this.#headers,
            status: this.statusCode,
            statusText: this.statusMessage
        })).catch(()=>{});
    }
    end(chunk, encoding, cb) {
        if (!chunk && this.#headers.has("transfer-encoding")) {
            this.#headers.set("content-length", "0");
            this.#headers.delete("transfer-encoding");
        }
        return super.end(chunk, encoding, cb);
    }
}
class IncomingMessageForServer extends Readable {
    req;
    url;
    constructor(req29){
        const reader = req29.body?.getReader();
        super({
            autoDestroy: true,
            emitClose: true,
            objectMode: false,
            read: async function(_size) {
                if (!reader) {
                    return this.push(null);
                }
                try {
                    const { value  } = await reader.read();
                    this.push(value !== undefined ? Buffer.from(value) : null);
                } catch (err) {
                    this.destroy(err);
                }
            },
            destroy: (err, cb)=>{
                reader?.cancel().finally(()=>cb(err)
                );
            }
        });
        this.req = req29;
        this.url = req29.url.slice(this.req.url.indexOf("/", 8));
    }
    get aborted() {
        return false;
    }
    get httpVersion() {
        return "1.1";
    }
    get headers() {
        return Object.fromEntries(this.req.headers.entries());
    }
    get method() {
        return this.req.method;
    }
}
function Server(handler) {
    return new ServerImpl(handler);
}
class ServerImpl extends EventEmitter {
    #httpConnections = new Set();
    #listener;
    constructor(handler){
        super();
        if (handler !== undefined) {
            this.on("request", handler);
        }
    }
    listen(...args) {
        const normalized = _normalizeArgs(args);
        const options = normalized[0];
        const cb = normalized[1];
        if (cb !== null) {
            this.once("listening", cb);
        }
        let port10 = 0;
        if (typeof options.port === "number" || typeof options.port === "string") {
            validatePort(options.port, "options.port");
            port10 = options.port | 0;
        }
        const hostname31 = options.host ?? "";
        this.#listener = Deno.listen({
            port: port10,
            hostname: hostname31
        });
        nextTick2(()=>this.#listenLoop()
        );
        return this;
    }
    async #listenLoop() {
        const go = async (httpConn)=>{
            try {
                for(;;){
                    let reqEvent = null;
                    try {
                        reqEvent = await httpConn.nextRequest();
                    } catch  {}
                    if (reqEvent === null) {
                        break;
                    }
                    const req30 = new IncomingMessageForServer(reqEvent.request);
                    const res = new ServerResponse(reqEvent);
                    this.emit("request", req30, res);
                }
            } finally{
                this.#httpConnections.delete(httpConn);
            }
        };
        const listener = this.#listener;
        if (listener !== undefined) {
            this.emit("listening");
            for await (const conn of listener){
                let httpConn;
                try {
                    httpConn = Deno.serveHttp(conn);
                } catch  {
                    continue;
                }
                this.#httpConnections.add(httpConn);
                go(httpConn);
            }
        }
    }
    get listening() {
        return this.#listener !== undefined;
    }
    close(cb) {
        const listening = this.listening;
        if (typeof cb === "function") {
            if (listening) {
                this.once("close", cb);
            } else {
                this.once("close", function close() {
                    cb(new ERR_SERVER_NOT_RUNNING());
                });
            }
        }
        nextTick2(()=>this.emit("close")
        );
        if (listening) {
            this.#listener.close();
            this.#listener = undefined;
            for (const httpConn of this.#httpConnections){
                try {
                    httpConn.close();
                } catch  {}
            }
            this.#httpConnections.clear();
        }
        return this;
    }
    address() {
        const addr = this.#listener.addr;
        return {
            port: addr.port,
            address: addr.hostname
        };
    }
}
Server.prototype = ServerImpl.prototype;
function createServer(handler) {
    return Server(handler);
}
function request(...args) {
    let options = {};
    if (typeof args[0] === "string") {
        options = urlToHttpOptions(new URL(args.shift()));
    } else if (args[0] instanceof URL) {
        options = urlToHttpOptions(args.shift());
    }
    if (args[0] && typeof args[0] !== "function") {
        Object.assign(options, args.shift());
    }
    args.unshift(options);
    return new ClientRequest(args[0], args[1]);
}
function get1(...args) {
    const req31 = request(args[0], args[1], args[2]);
    req31.end();
    return req31;
}
const __default12 = {
    Agent,
    ClientRequest,
    STATUS_CODES: Status,
    METHODS,
    createServer,
    Server,
    IncomingMessage: IncomingMessageForServer,
    OutgoingMessage,
    ServerResponse,
    request,
    get: get1
};
class Agent1 extends Agent {
}
class Server1 {
    constructor(){
        notImplemented("https.Server.prototype.constructor");
    }
}
function createServer1() {
    notImplemented("https.createServer");
}
let caCerts;
function get2(...args) {
    const req32 = request1(args[0], args[1], args[2]);
    req32.end();
    return req32;
}
const globalAgent = undefined;
class HttpsClientRequest extends ClientRequest {
    async _createCustomClient() {
        if (caCerts === null) {
            return undefined;
        }
        if (caCerts !== undefined) {
            return createHttpClient({
                caCerts
            });
        }
        const status = await Deno.permissions.query({
            name: "env",
            variable: "NODE_EXTRA_CA_CERTS"
        });
        if (status.state !== "granted") {
            caCerts = null;
            return undefined;
        }
        const certFilename = Deno.env.get("NODE_EXTRA_CA_CERTS");
        if (!certFilename) {
            caCerts = null;
            return undefined;
        }
        const caCert = await Deno.readTextFile(certFilename);
        caCerts = [
            caCert
        ];
        return createHttpClient({
            caCerts
        });
    }
    _createSocket() {
        return {
            authorized: true
        };
    }
}
function request1(...args) {
    let options = {};
    if (typeof args[0] === "string") {
        options = urlToHttpOptions(new URL(args.shift()));
    } else if (args[0] instanceof URL) {
        options = urlToHttpOptions(args.shift());
    }
    if (args[0] && typeof args[0] !== "function") {
        Object.assign(options, args.shift());
    }
    args.unshift(options);
    return new HttpsClientRequest(args[0], args[1]);
}
const __default13 = {
    Agent: Agent1,
    Server: Server1,
    createServer: createServer1,
    get: get2,
    globalAgent,
    request: request1
};
function createSecureContext(options) {
    return {
        ca: options?.ca,
        cert: options?.cert,
        key: options?.key
    };
}
const __default14 = {
    createSecureContext
};
Array.isArray;
const ObjectAssign = Object.assign;
String.fromCharCode;
const StringPrototypeReplace = (that, ...args)=>that.replace(...args)
;
const kConnectOptions = Symbol("connect-options");
const kIsVerified = Symbol("verified");
const kPendingSession = Symbol("pendingSession");
const kRes = Symbol("res");
debuglog("tls", (fn)=>{});
function onConnectEnd() {
    if (!this._hadError) {
        const options = this[kConnectOptions];
        this._hadError = true;
        const error25 = connResetException("Client network socket disconnected " + "before secure TLS connection was " + "established");
        error25.path = options.path;
        error25.host = options.host;
        error25.port = options.port;
        error25.localAddress = options.localAddress;
        this.destroy(error25);
    }
}
class TLSSocket extends Socket {
    _tlsOptions;
    _secureEstablished;
    _securePending;
    _newSessionPending;
    _controlReleased;
    secureConnecting;
    _SNICallback;
    servername;
    alpnProtocol;
    authorized;
    authorizationError;
    [kRes];
    [kIsVerified];
    [kPendingSession];
    [kConnectOptions];
    ssl;
    _start;
    constructor(socket, opts){
        const tlsOptions1 = {
            ...opts
        };
        let hostname32 = tlsOptions1?.secureContext?.servername;
        hostname32 = opts.host;
        tlsOptions1.hostname = hostname32;
        tlsOptions1?.secureContext?.cert;
        tlsOptions1?.secureContext?.key;
        let caCerts1 = tlsOptions1?.secureContext?.ca;
        if (typeof caCerts1 === "string") caCerts1 = [
            caCerts1
        ];
        tlsOptions1.caCerts = caCerts1;
        super({
            handle: _wrapHandle(tlsOptions1, socket),
            ...opts,
            manualStart: true
        });
        if (socket) {
            this._parent = socket;
        }
        this._tlsOptions = tlsOptions1;
        this._secureEstablished = false;
        this._securePending = false;
        this._newSessionPending = false;
        this._controlReleased = false;
        this.secureConnecting = true;
        this._SNICallback = null;
        this.servername = null;
        this.alpnProtocol = null;
        this.authorized = false;
        this.authorizationError = null;
        this[kRes] = null;
        this[kIsVerified] = false;
        this[kPendingSession] = null;
        this.ssl = new class {
            verifyError() {
                return null;
            }
        }();
        const tlssock = this;
        function _wrapHandle(tlsOptions, wrap2) {
            let handle;
            if (wrap2) {
                handle = wrap2._handle;
            }
            const options = tlsOptions;
            if (!handle) {
                handle = options.pipe ? new Pipe(constants1.SOCKET) : new TCP(constants2.SOCKET);
            }
            const afterConnect = handle.afterConnect;
            handle.afterConnect = async (req33, status)=>{
                try {
                    const conn = await Deno.startTls(handle[kStreamBaseField], options);
                    tlssock.emit("secure");
                    tlssock.removeListener("end", onConnectEnd);
                    handle[kStreamBaseField] = conn;
                } catch  {}
                return afterConnect.call(handle, req33, status);
            };
            handle.verifyError = function() {
                return null;
            };
            return handle;
        }
    }
    _tlsError(err) {
        this.emit("_tlsError", err);
        if (this._controlReleased) {
            return err;
        }
        return null;
    }
    _releaseControl() {
        if (this._controlReleased) {
            return false;
        }
        this._controlReleased = true;
        this.removeListener("error", this._tlsError);
        return true;
    }
    getEphemeralKeyInfo() {
        return {};
    }
    isSessionReused() {
        return false;
    }
    setSession(_session) {}
    setServername(_servername) {}
    getPeerCertificate(_detailed) {
        return {
            subject: "localhost",
            subjectaltname: "IP Address:127.0.0.1, IP Address:::1"
        };
    }
}
function normalizeConnectArgs(listArgs) {
    const args = _normalizeArgs(listArgs);
    const options = args[0];
    const cb = args[1];
    if (listArgs[1] !== null && typeof listArgs[1] === "object") {
        ObjectAssign(options, listArgs[1]);
    } else if (listArgs[2] !== null && typeof listArgs[2] === "object") {
        ObjectAssign(options, listArgs[2]);
    }
    return cb ? [
        options,
        cb
    ] : [
        options
    ];
}
let ipServernameWarned = false;
function Server2(options, listener) {
    return new ServerImpl1(options, listener);
}
class ServerImpl1 extends EventEmitter {
    listener;
    #closed;
    constructor(options, listener){
        super();
        this.options = options;
        this.#closed = false;
        if (listener) {
            this.on("secureConnection", listener);
        }
    }
    listen(port11, callback) {
        const { key , cert  } = this.options;
        const hostname33 = "localhost";
        this.listener = Deno.listenTls({
            port: port11,
            hostname: hostname33,
            cert,
            key
        });
        callback?.();
        this.#listen(this.listener);
        return this;
    }
    async #listen(listener) {
        while(!this.#closed){
            try {
                const handle = new TCP(constants2.SOCKET, await listener.accept());
                const socket = new Socket({
                    handle
                });
                this.emit("secureConnection", socket);
            } catch (e) {
                if (e instanceof Deno.errors.BadResource) {
                    this.#closed = true;
                }
            }
        }
    }
    close(cb) {
        if (this.listener) {
            this.listener.close();
        }
        cb?.();
        return this;
    }
    options;
}
Server2.prototype = ServerImpl1.prototype;
function createServer2(options, listener1) {
    return new ServerImpl1(options, listener1);
}
function connect2(...args) {
    args = normalizeConnectArgs(args);
    let options = args[0];
    const cb = args[1];
    const allowUnauthorized = getAllowUnauthorized();
    options = {
        rejectUnauthorized: !allowUnauthorized,
        ciphers: DEFAULT_CIPHERS,
        checkServerIdentity,
        minDHSize: 1024,
        ...options
    };
    if (!options.keepAlive) {
        options.singleUse = true;
    }
    assert3(typeof options.checkServerIdentity === "function");
    assert3(typeof options.minDHSize === "number", "options.minDHSize is not a number: " + options.minDHSize);
    assert3(options.minDHSize > 0, "options.minDHSize is not a positive number: " + options.minDHSize);
    const context = options.secureContext || createSecureContext(options);
    const tlssock = new TLSSocket(options.socket, {
        allowHalfOpen: options.allowHalfOpen,
        pipe: !!options.path,
        secureContext: context,
        isServer: false,
        requestCert: true,
        rejectUnauthorized: options.rejectUnauthorized !== false,
        session: options.session,
        ALPNProtocols: options.ALPNProtocols,
        requestOCSP: options.requestOCSP,
        enableTrace: options.enableTrace,
        pskCallback: options.pskCallback,
        highWaterMark: options.highWaterMark,
        onread: options.onread,
        signal: options.signal,
        ...options
    });
    options.rejectUnauthorized = options.rejectUnauthorized !== false;
    tlssock[kConnectOptions] = options;
    if (cb) {
        tlssock.once("secureConnect", cb);
    }
    if (!options.socket) {
        if (options.timeout) {
            tlssock.setTimeout(options.timeout);
        }
        tlssock.connect(options, tlssock._start);
    }
    tlssock._releaseControl();
    if (options.session) {
        tlssock.setSession(options.session);
    }
    if (options.servername) {
        if (!ipServernameWarned && isIP(options.servername)) {
            emitWarning("Setting the TLS ServerName to an IP address is not permitted by " + "RFC 6066. This will be ignored in a future version.", "DeprecationWarning", "DEP0123");
            ipServernameWarned = true;
        }
        tlssock.setServername(options.servername);
    }
    if (options.socket) {
        tlssock._start();
    }
    tlssock.prependListener("end", onConnectEnd);
    return tlssock;
}
function getAllowUnauthorized() {
    return false;
}
function checkServerIdentity(_hostname, _cert) {}
function unfqdn(host) {
    return StringPrototypeReplace(host, /[.]$/, "");
}
const DEFAULT_CIPHERS = [
    "AES256-GCM-SHA384",
    "AES128-GCM-SHA256",
    "TLS_CHACHA20_POLY1305_SHA256",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "ECDHE-ECDSA-AES128-GCM-SHA256",
    "ECDHE-ECDSA-CHACHA20-POLY1305",
    "ECDHE-RSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-CHACHA20-POLY1305", 
].join(":");
const __default15 = {
    TLSSocket,
    connect: connect2,
    createServer: createServer2,
    checkServerIdentity,
    DEFAULT_CIPHERS,
    unfqdn
};
const cipherMap = {
    "__proto__": null,
    "AES128-GCM-SHA256": "TLS13_AES_128_GCM_SHA256",
    "AES256-GCM-SHA384": "TLS13_AES_256_GCM_SHA384",
    "ECDHE-ECDSA-AES128-GCM-SHA256": "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
    "ECDHE-ECDSA-AES256-GCM-SHA384": "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
    "ECDHE-ECDSA-CHACHA20-POLY1305": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
    "ECDHE-RSA-AES128-GCM-SHA256": "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
    "ECDHE-RSA-AES256-GCM-SHA384": "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
    "ECDHE-RSA-CHACHA20-POLY1305": "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256": "TLS13_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384": "TLS13_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256": "TLS13_CHACHA20_POLY1305_SHA256"
};
function getCiphers() {
    return Object.keys(cipherMap).map((name75)=>name75.toLowerCase()
    );
}
const rootCertificates = undefined;
const DEFAULT_ECDH_CURVE = "auto";
const DEFAULT_MAX_VERSION = "TLSv1.3";
const DEFAULT_MIN_VERSION = "TLSv1.2";
class CryptoStream {
}
class SecurePair {
}
class Server3 {
}
function createSecurePair() {
    notImplemented("tls.createSecurePair");
}
__default14.createSecureContext;
__default15.TLSSocket;
__default15.createServer;
__default15.connect;
const __default16 = {
    CryptoStream,
    SecurePair,
    Server: Server3,
    TLSSocket: __default15.TLSSocket,
    checkServerIdentity: __default15.checkServerIdentity,
    connect: __default15.connect,
    createSecureContext: __default14.createSecureContext,
    createSecurePair,
    createServer: __default15.createServer,
    getCiphers,
    rootCertificates,
    DEFAULT_CIPHERS: __default15.DEFAULT_CIPHERS,
    DEFAULT_ECDH_CURVE,
    DEFAULT_MAX_VERSION,
    DEFAULT_MIN_VERSION
};
var w1 = Object.create;
var y1 = Object.defineProperty;
var L = Object.getOwnPropertyDescriptor;
var B = Object.getOwnPropertyNames;
var D = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty;
((t)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(t, {
        get: (e, o)=>(typeof require != "undefined" ? require : e)[o]
    }) : t
)(function(t) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + t + '" is not supported');
});
var E1 = (t, e)=>()=>(e || t((e = {
            exports: {}
        }).exports, e), e.exports)
;
var $1 = (t, e, o, r)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let s of B(e))!U.call(t, s) && s !== o && y1(t, s, {
        get: ()=>e[s]
        ,
        enumerable: !(r = L(e, s)) || r.enumerable
    });
    return t;
};
var b1 = (t, e, o)=>(o = t != null ? w1(D(t)) : {}, $1(e || !t || !t.__esModule ? y1(o, "default", {
        value: t,
        enumerable: !0
    }) : o, t))
;
var H = E1((g)=>{
    "use strict";
    var P2 = __default16, O1 = __default12, x28 = __default13, F2 = EventEmitter, G1 = __default4;
    g.httpOverHttp = _1;
    g.httpsOverHttp = z2;
    g.httpOverHttps = M5;
    g.httpsOverHttps = j21;
    function _1(t) {
        var e = new f(t);
        return e.request = O1.request, e;
    }
    function z2(t) {
        var e = new f(t);
        return e.request = O1.request, e.createSocket = N4, e.defaultPort = 443, e;
    }
    function M5(t) {
        var e = new f(t);
        return e.request = x28.request, e;
    }
    function j21(t) {
        var e = new f(t);
        return e.request = x28.request, e.createSocket = N4, e.defaultPort = 443, e;
    }
    function f(t) {
        var e = this;
        e.options = t || {}, e.proxyOptions = e.options.proxy || {}, e.maxSockets = e.options.maxSockets || O1.Agent.defaultMaxSockets, e.requests = [], e.sockets = [], e.on("free", function(r, s, n, u) {
            for(var a = C1(s, n, u), p18 = 0, l = e.requests.length; p18 < l; ++p18){
                var h = e.requests[p18];
                if (h.host === a.host && h.port === a.port) {
                    e.requests.splice(p18, 1), h.request.onSocket(r);
                    return;
                }
            }
            r.destroy(), e.removeSocket(r);
        });
    }
    G1.inherits(f, F2.EventEmitter);
    f.prototype.addRequest = function(e, o, r, s) {
        var n = this, u = S1({
            request: e
        }, n.options, C1(o, r, s));
        if (n.sockets.length >= this.maxSockets) {
            n.requests.push(u);
            return;
        }
        n.createSocket(u, function(a) {
            a.on("free", p19), a.on("close", l), a.on("agentRemove", l), e.onSocket(a);
            function p19() {
                n.emit("free", a, u);
            }
            function l(h) {
                n.removeSocket(a), a.removeListener("free", p19), a.removeListener("close", l), a.removeListener("agentRemove", l);
            }
        });
    };
    f.prototype.createSocket = function(e, o) {
        var r = this, s = {};
        r.sockets.push(s);
        var n = S1({}, r.proxyOptions, {
            method: "CONNECT",
            path: e.host + ":" + e.port,
            agent: !1,
            headers: {
                host: e.host + ":" + e.port
            }
        });
        e.localAddress && (n.localAddress = e.localAddress), n.proxyAuth && (n.headers = n.headers || {}, n.headers["Proxy-Authorization"] = "Basic " + new Buffer(n.proxyAuth).toString("base64")), v18("making CONNECT request");
        var u = r.request(n);
        u.useChunkedEncodingByDefault = !1, u.once("response", a), u.once("upgrade", p20), u.once("connect", l), u.once("error", h), u.end();
        function a(c) {
            c.upgrade = !0;
        }
        function p20(c, i148, q3) {
            process1.nextTick(function() {
                l(c, i148, q3);
            });
        }
        function l(c, i149, q4) {
            if (u.removeAllListeners(), i149.removeAllListeners(), c.statusCode !== 200) {
                v18("tunneling socket could not be established, statusCode=%d", c.statusCode), i149.destroy();
                var m = new Error("tunneling socket could not be established, statusCode=" + c.statusCode);
                m.code = "ECONNRESET", e.request.emit("error", m), r.removeSocket(s);
                return;
            }
            if (q4.length > 0) {
                v18("got illegal response body from proxy"), i149.destroy();
                var m = new Error("got illegal response body from proxy");
                m.code = "ECONNRESET", e.request.emit("error", m), r.removeSocket(s);
                return;
            }
            return v18("tunneling connection has established"), r.sockets[r.sockets.indexOf(s)] = i149, o(i149);
        }
        function h(c) {
            u.removeAllListeners(), v18(`tunneling socket could not be established, cause=%s
`, c.message, c.stack);
            var i150 = new Error("tunneling socket could not be established, cause=" + c.message);
            i150.code = "ECONNRESET", e.request.emit("error", i150), r.removeSocket(s);
        }
    };
    f.prototype.removeSocket = function(e) {
        var o = this.sockets.indexOf(e);
        if (o !== -1) {
            this.sockets.splice(o, 1);
            var r = this.requests.shift();
            r && this.createSocket(r, function(s) {
                r.request.onSocket(s);
            });
        }
    };
    function N4(t, e) {
        var o = this;
        f.prototype.createSocket.call(o, t, function(r) {
            var s = t.request.getHeader("host"), n = S1({}, o.options, {
                socket: r,
                servername: s ? s.replace(/:.*$/, "") : t.host
            }), u = P2.connect(0, n);
            o.sockets[o.sockets.indexOf(r)] = u, e(u);
        });
    }
    function C1(t, e, o) {
        return typeof t == "string" ? {
            host: t,
            port: e,
            localAddress: o
        } : t;
    }
    function S1(t) {
        for(var e = 1, o = arguments.length; e < o; ++e){
            var r = arguments[e];
            if (typeof r == "object") for(var s = Object.keys(r), n = 0, u = s.length; n < u; ++n){
                var a = s[n];
                r[a] !== void 0 && (t[a] = r[a]);
            }
        }
        return t;
    }
    var v18;
    process1.env.NODE_DEBUG && /\btunnel\b/.test(process1.env.NODE_DEBUG) ? v18 = function() {
        var t = Array.prototype.slice.call(arguments);
        typeof t[0] == "string" ? t[0] = "TUNNEL: " + t[0] : t.unshift("TUNNEL:"), console.error.apply(console, t);
    } : v18 = function() {};
    g.debug = v18;
});
var k1 = E1((X, A5)=>{
    A5.exports = H();
});
var R = b1(k1()), T1 = b1(k1()), { httpOverHttp: Y , httpsOverHttp: Z , httpOverHttps: ee , httpsOverHttps: te , debug: re  } = T1, { default: I , ...J } = T1, oe = (R.default ?? I) ?? J;
var j1 = Object.create;
var b2 = Object.defineProperty;
var L1 = Object.getOwnPropertyDescriptor;
var G = Object.getOwnPropertyNames;
var $2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (r, t)=>(typeof require != "undefined" ? require : r)[t]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var M1 = (e, r)=>()=>(r || e((r = {
            exports: {}
        }).exports, r), r.exports)
;
var z1 = (e, r, t, s)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let i151 of G(r))!I1.call(e, i151) && i151 !== t && b2(e, i151, {
        get: ()=>r[i151]
        ,
        enumerable: !(s = L1(r, i151)) || s.enumerable
    });
    return e;
};
var q1 = (e, r, t)=>(t = e != null ? j1($2(e)) : {}, z1(r || !e || !e.__esModule ? b2(t, "default", {
        value: e,
        enumerable: !0
    }) : t, e))
;
var D1 = M1((_2)=>{
    "use strict";
    Object.defineProperty(_2, "__esModule", {
        value: !0
    });
    _2.checkBypass = _2.getProxyUrl = void 0;
    function F3(e) {
        let r = e.protocol === "https:";
        if (k15(e)) return;
        let t = (()=>r ? process1.env.https_proxy || process1.env.HTTPS_PROXY : process1.env.http_proxy || process1.env.HTTP_PROXY
        )();
        if (t) return new URL(t);
    }
    _2.getProxyUrl = F3;
    function k15(e) {
        if (!e.hostname) return !1;
        let r = process1.env.no_proxy || process1.env.NO_PROXY || "";
        if (!r) return !1;
        let t;
        e.port ? t = Number(e.port) : e.protocol === "http:" ? t = 80 : e.protocol === "https:" && (t = 443);
        let s = [
            e.hostname.toUpperCase()
        ];
        typeof t == "number" && s.push(`${s[0]}:${t}`);
        for (let i152 of r.split(",").map((n)=>n.trim().toUpperCase()
        ).filter((n)=>n
        ))if (s.some((n)=>n === i152
        )) return !0;
        return !1;
    }
    _2.checkBypass = k15;
});
var E2 = M1((a)=>{
    "use strict";
    var K = a && a.__createBinding || (Object.create ? function(e, r, t, s) {
        s === void 0 && (s = t), Object.defineProperty(e, s, {
            enumerable: !0,
            get: function() {
                return r[t];
            }
        });
    } : function(e, r, t, s) {
        s === void 0 && (s = t), e[s] = r[t];
    }), X = a && a.__setModuleDefault || (Object.create ? function(e, r) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: r
        });
    } : function(e, r) {
        e.default = r;
    }), T2 = a && a.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var r = {};
        if (e != null) for(var t in e)t !== "default" && Object.hasOwnProperty.call(e, t) && K(r, e, t);
        return X(r, e), r;
    }, h = a && a.__awaiter || function(e, r, t, s) {
        function i153(n) {
            return n instanceof t ? n : new t(function(l) {
                l(n);
            });
        }
        return new (t || (t = Promise))(function(n, l) {
            function c(p21) {
                try {
                    o(s.next(p21));
                } catch (f) {
                    l(f);
                }
            }
            function u(p22) {
                try {
                    o(s.throw(p22));
                } catch (f) {
                    l(f);
                }
            }
            function o(p23) {
                p23.done ? n(p23.value) : i153(p23.value).then(c, u);
            }
            o((s = s.apply(e, r || [])).next());
        });
    };
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    a.HttpClient = a.isHttps = a.HttpClientResponse = a.HttpClientError = a.getProxyUrl = a.MediaTypes = a.Headers = a.HttpCodes = void 0;
    var R1 = T2(__default12), O2 = T2(__default13), B6 = T2(D1()), w18 = T2(oe), g;
    (function(e) {
        e[e.OK = 200] = "OK", e[e.MultipleChoices = 300] = "MultipleChoices", e[e.MovedPermanently = 301] = "MovedPermanently", e[e.ResourceMoved = 302] = "ResourceMoved", e[e.SeeOther = 303] = "SeeOther", e[e.NotModified = 304] = "NotModified", e[e.UseProxy = 305] = "UseProxy", e[e.SwitchProxy = 306] = "SwitchProxy", e[e.TemporaryRedirect = 307] = "TemporaryRedirect", e[e.PermanentRedirect = 308] = "PermanentRedirect", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.PaymentRequired = 402] = "PaymentRequired", e[e.Forbidden = 403] = "Forbidden", e[e.NotFound = 404] = "NotFound", e[e.MethodNotAllowed = 405] = "MethodNotAllowed", e[e.NotAcceptable = 406] = "NotAcceptable", e[e.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.Conflict = 409] = "Conflict", e[e.Gone = 410] = "Gone", e[e.TooManyRequests = 429] = "TooManyRequests", e[e.InternalServerError = 500] = "InternalServerError", e[e.NotImplemented = 501] = "NotImplemented", e[e.BadGateway = 502] = "BadGateway", e[e.ServiceUnavailable = 503] = "ServiceUnavailable", e[e.GatewayTimeout = 504] = "GatewayTimeout";
    })(g = a.HttpCodes || (a.HttpCodes = {}));
    var d;
    (function(e) {
        e.Accept = "accept", e.ContentType = "content-type";
    })(d = a.Headers || (a.Headers = {}));
    var m;
    (function(e) {
        e.ApplicationJson = "application/json";
    })(m = a.MediaTypes || (a.MediaTypes = {}));
    function Y1(e) {
        let r = B6.getProxyUrl(new URL(e));
        return r ? r.href : "";
    }
    a.getProxyUrl = Y1;
    var V1 = [
        g.MovedPermanently,
        g.ResourceMoved,
        g.SeeOther,
        g.TemporaryRedirect,
        g.PermanentRedirect
    ], W = [
        g.BadGateway,
        g.ServiceUnavailable,
        g.GatewayTimeout
    ], Q = [
        "OPTIONS",
        "GET",
        "DELETE",
        "HEAD"
    ], Z2 = 10, C2 = 5, v19 = class extends Error {
        constructor(r, t){
            super(r), this.name = "HttpClientError", this.statusCode = t, Object.setPrototypeOf(this, v19.prototype);
        }
    };
    a.HttpClientError = v19;
    var x29 = class {
        constructor(r){
            this.message = r;
        }
        readBody() {
            return h(this, void 0, void 0, function*() {
                return new Promise((r)=>h(this, void 0, void 0, function*() {
                        let t = Buffer.alloc(0);
                        this.message.on("data", (s)=>{
                            t = Buffer.concat([
                                t,
                                s
                            ]);
                        }), this.message.on("end", ()=>{
                            r(t.toString());
                        });
                    })
                );
            });
        }
    };
    a.HttpClientResponse = x29;
    function H3(e) {
        return new URL(e).protocol === "https:";
    }
    a.isHttps = H3;
    var U2 = class {
        constructor(r, t, s){
            this._ignoreSslError = !1, this._allowRedirects = !0, this._allowRedirectDowngrade = !1, this._maxRedirects = 50, this._allowRetries = !1, this._maxRetries = 1, this._keepAlive = !1, this._disposed = !1, this.userAgent = r, this.handlers = t || [], this.requestOptions = s, s && (s.ignoreSslError != null && (this._ignoreSslError = s.ignoreSslError), this._socketTimeout = s.socketTimeout, s.allowRedirects != null && (this._allowRedirects = s.allowRedirects), s.allowRedirectDowngrade != null && (this._allowRedirectDowngrade = s.allowRedirectDowngrade), s.maxRedirects != null && (this._maxRedirects = Math.max(s.maxRedirects, 0)), s.keepAlive != null && (this._keepAlive = s.keepAlive), s.allowRetries != null && (this._allowRetries = s.allowRetries), s.maxRetries != null && (this._maxRetries = s.maxRetries));
        }
        options(r, t) {
            return h(this, void 0, void 0, function*() {
                return this.request("OPTIONS", r, null, t || {});
            });
        }
        get(r, t) {
            return h(this, void 0, void 0, function*() {
                return this.request("GET", r, null, t || {});
            });
        }
        del(r, t) {
            return h(this, void 0, void 0, function*() {
                return this.request("DELETE", r, null, t || {});
            });
        }
        post(r, t, s) {
            return h(this, void 0, void 0, function*() {
                return this.request("POST", r, t, s || {});
            });
        }
        patch(r, t, s) {
            return h(this, void 0, void 0, function*() {
                return this.request("PATCH", r, t, s || {});
            });
        }
        put(r, t, s) {
            return h(this, void 0, void 0, function*() {
                return this.request("PUT", r, t, s || {});
            });
        }
        head(r, t) {
            return h(this, void 0, void 0, function*() {
                return this.request("HEAD", r, null, t || {});
            });
        }
        sendStream(r, t, s, i154) {
            return h(this, void 0, void 0, function*() {
                return this.request(r, t, s, i154);
            });
        }
        getJson(r, t = {}) {
            return h(this, void 0, void 0, function*() {
                t[d.Accept] = this._getExistingOrDefaultHeader(t, d.Accept, m.ApplicationJson);
                let s = yield this.get(r, t);
                return this._processResponse(s, this.requestOptions);
            });
        }
        postJson(r, t, s = {}) {
            return h(this, void 0, void 0, function*() {
                let i155 = JSON.stringify(t, null, 2);
                s[d.Accept] = this._getExistingOrDefaultHeader(s, d.Accept, m.ApplicationJson), s[d.ContentType] = this._getExistingOrDefaultHeader(s, d.ContentType, m.ApplicationJson);
                let n = yield this.post(r, i155, s);
                return this._processResponse(n, this.requestOptions);
            });
        }
        putJson(r, t, s = {}) {
            return h(this, void 0, void 0, function*() {
                let i156 = JSON.stringify(t, null, 2);
                s[d.Accept] = this._getExistingOrDefaultHeader(s, d.Accept, m.ApplicationJson), s[d.ContentType] = this._getExistingOrDefaultHeader(s, d.ContentType, m.ApplicationJson);
                let n = yield this.put(r, i156, s);
                return this._processResponse(n, this.requestOptions);
            });
        }
        patchJson(r, t, s = {}) {
            return h(this, void 0, void 0, function*() {
                let i157 = JSON.stringify(t, null, 2);
                s[d.Accept] = this._getExistingOrDefaultHeader(s, d.Accept, m.ApplicationJson), s[d.ContentType] = this._getExistingOrDefaultHeader(s, d.ContentType, m.ApplicationJson);
                let n = yield this.patch(r, i157, s);
                return this._processResponse(n, this.requestOptions);
            });
        }
        request(r, t, s, i158) {
            return h(this, void 0, void 0, function*() {
                if (this._disposed) throw new Error("Client has already been disposed.");
                let n = new URL(t), l = this._prepareRequest(r, n, i158), c = this._allowRetries && Q.includes(r) ? this._maxRetries + 1 : 1, u = 0, o;
                do {
                    if (o = yield this.requestRaw(l, s), o && o.message && o.message.statusCode === g.Unauthorized) {
                        let f;
                        for (let y11 of this.handlers)if (y11.canHandleAuthentication(o)) {
                            f = y11;
                            break;
                        }
                        return f ? f.handleAuthentication(this, l, s) : o;
                    }
                    let p24 = this._maxRedirects;
                    for(; o.message.statusCode && V1.includes(o.message.statusCode) && this._allowRedirects && p24 > 0;){
                        let f = o.message.headers.location;
                        if (!f) break;
                        let y12 = new URL(f);
                        if (n.protocol === "https:" && n.protocol !== y12.protocol && !this._allowRedirectDowngrade) throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                        if (yield o.readBody(), y12.hostname !== n.hostname) for(let S2 in i158)S2.toLowerCase() === "authorization" && delete i158[S2];
                        l = this._prepareRequest(r, y12, i158), o = yield this.requestRaw(l, s), p24--;
                    }
                    if (!o.message.statusCode || !W.includes(o.message.statusCode)) return o;
                    u += 1, u < c && (yield o.readBody(), yield this._performExponentialBackoff(u));
                }while (u < c)
                return o;
            });
        }
        dispose() {
            this._agent && this._agent.destroy(), this._disposed = !0;
        }
        requestRaw(r, t) {
            return h(this, void 0, void 0, function*() {
                return new Promise((s, i159)=>{
                    function n(l, c) {
                        l ? i159(l) : c ? s(c) : i159(new Error("Unknown error"));
                    }
                    this.requestRawWithCallback(r, t, n);
                });
            });
        }
        requestRawWithCallback(r, t, s) {
            typeof t == "string" && (r.options.headers || (r.options.headers = {}), r.options.headers["Content-Length"] = Buffer.byteLength(t, "utf8"));
            let i160 = !1;
            function n(u, o) {
                i160 || (i160 = !0, s(u, o));
            }
            let l = r.httpModule.request(r.options, (u)=>{
                let o = new x29(u);
                n(void 0, o);
            }), c;
            l.on("socket", (u)=>{
                c = u;
            }), l.setTimeout(this._socketTimeout || 3 * 6e4, ()=>{
                c && c.end(), n(new Error(`Request timeout: ${r.options.path}`));
            }), l.on("error", function(u) {
                n(u);
            }), t && typeof t == "string" && l.write(t, "utf8"), t && typeof t != "string" ? (t.on("close", function() {
                l.end();
            }), t.pipe(l)) : l.end();
        }
        getAgent(r) {
            let t = new URL(r);
            return this._getAgent(t);
        }
        _prepareRequest(r, t, s) {
            let i161 = {};
            i161.parsedUrl = t;
            let n = i161.parsedUrl.protocol === "https:";
            i161.httpModule = n ? O2 : R1;
            let l = n ? 443 : 80;
            if (i161.options = {}, i161.options.host = i161.parsedUrl.hostname, i161.options.port = i161.parsedUrl.port ? parseInt(i161.parsedUrl.port) : l, i161.options.path = (i161.parsedUrl.pathname || "") + (i161.parsedUrl.search || ""), i161.options.method = r, i161.options.headers = this._mergeHeaders(s), this.userAgent != null && (i161.options.headers["user-agent"] = this.userAgent), i161.options.agent = this._getAgent(i161.parsedUrl), this.handlers) for (let c of this.handlers)c.prepareRequest(i161.options);
            return i161;
        }
        _mergeHeaders(r) {
            return this.requestOptions && this.requestOptions.headers ? Object.assign({}, A6(this.requestOptions.headers), A6(r || {})) : A6(r || {});
        }
        _getExistingOrDefaultHeader(r, t, s) {
            let i162;
            return this.requestOptions && this.requestOptions.headers && (i162 = A6(this.requestOptions.headers)[t]), r[t] || i162 || s;
        }
        _getAgent(r) {
            let t, s = B6.getProxyUrl(r), i163 = s && s.hostname;
            if (this._keepAlive && i163 && (t = this._proxyAgent), this._keepAlive && !i163 && (t = this._agent), t) return t;
            let n = r.protocol === "https:", l = 100;
            if (this.requestOptions && (l = this.requestOptions.maxSockets || R1.globalAgent.maxSockets), s && s.hostname) {
                let c = {
                    maxSockets: l,
                    keepAlive: this._keepAlive,
                    proxy: Object.assign(Object.assign({}, (s.username || s.password) && {
                        proxyAuth: `${s.username}:${s.password}`
                    }), {
                        host: s.hostname,
                        port: s.port
                    })
                }, u, o = s.protocol === "https:";
                n ? u = o ? w18.httpsOverHttps : w18.httpsOverHttp : u = o ? w18.httpOverHttps : w18.httpOverHttp, t = u(c), this._proxyAgent = t;
            }
            if (this._keepAlive && !t) {
                let c = {
                    keepAlive: this._keepAlive,
                    maxSockets: l
                };
                t = n ? new O2.Agent(c) : new R1.Agent(c), this._agent = t;
            }
            return t || (t = n ? O2.globalAgent : R1.globalAgent), n && this._ignoreSslError && (t.options = Object.assign(t.options || {}, {
                rejectUnauthorized: !1
            })), t;
        }
        _performExponentialBackoff(r) {
            return h(this, void 0, void 0, function*() {
                r = Math.min(Z2, r);
                let t = C2 * Math.pow(2, r);
                return new Promise((s)=>setTimeout(()=>s()
                    , t)
                );
            });
        }
        _processResponse(r, t) {
            return h(this, void 0, void 0, function*() {
                return new Promise((s, i164)=>h(this, void 0, void 0, function*() {
                        let n = r.message.statusCode || 0, l = {
                            statusCode: n,
                            result: null,
                            headers: {}
                        };
                        n === g.NotFound && s(l);
                        function c(p, f) {
                            if (typeof f == "string") {
                                let y13 = new Date(f);
                                if (!isNaN(y13.valueOf())) return y13;
                            }
                            return f;
                        }
                        let u, o;
                        try {
                            o = yield r.readBody(), o && o.length > 0 && (t && t.deserializeDates ? u = JSON.parse(o, c) : u = JSON.parse(o), l.result = u), l.headers = r.message.headers;
                        } catch  {}
                        if (n > 299) {
                            let p25;
                            u && u.message ? p25 = u.message : o && o.length > 0 ? p25 = o : p25 = `Failed request: (${n})`;
                            let f = new v19(p25, n);
                            f.result = l.result, i164(f);
                        } else s(l);
                    })
                );
            });
        }
    };
    a.HttpClient = U2;
    var A6 = (e)=>Object.keys(e).reduce((r, t)=>(r[t.toLowerCase()] = e[t], r)
        , {})
    ;
});
var N = q1(E2()), J1 = q1(E2()), { __esModule: ne , HttpClient: oe1 , HttpCodes: le , Headers: ae , MediaTypes: ue , getProxyUrl: ce , HttpClientError: he , HttpClientResponse: pe , isHttps: fe  } = J1, { default: ee1 , ...te1 } = J1, de = (N.default ?? ee1) ?? te1;
function isFileOptions(fileOptions) {
    if (!fileOptions) return false;
    return fileOptions.encoding != undefined || fileOptions.flag != undefined || fileOptions.signal != undefined || fileOptions.mode != undefined;
}
function getEncoding(optOrCallback) {
    if (!optOrCallback || typeof optOrCallback === "function") {
        return null;
    }
    const encoding = typeof optOrCallback === "string" ? optOrCallback : optOrCallback.encoding;
    if (!encoding) return null;
    return encoding;
}
function checkEncoding(encoding) {
    if (!encoding) return null;
    encoding = encoding.toLowerCase();
    if ([
        "utf8",
        "hex",
        "base64"
    ].includes(encoding)) return encoding;
    if (encoding === "utf-8") {
        return "utf8";
    }
    if (encoding === "binary") {
        return "binary";
    }
    const notImplementedEncodings = [
        "utf16le",
        "latin1",
        "ascii",
        "ucs2"
    ];
    if (notImplementedEncodings.includes(encoding)) {
        notImplemented(`"${encoding}" encoding`);
    }
    throw new Error(`The value "${encoding}" is invalid for option "encoding"`);
}
function getOpenOptions(flag) {
    if (!flag) {
        return {
            create: true,
            append: true
        };
    }
    let openOptions;
    switch(flag){
        case "a":
            {
                openOptions = {
                    create: true,
                    append: true
                };
                break;
            }
        case "ax":
            {
                openOptions = {
                    createNew: true,
                    write: true,
                    append: true
                };
                break;
            }
        case "a+":
            {
                openOptions = {
                    read: true,
                    create: true,
                    append: true
                };
                break;
            }
        case "ax+":
            {
                openOptions = {
                    read: true,
                    createNew: true,
                    append: true
                };
                break;
            }
        case "r":
            {
                openOptions = {
                    read: true
                };
                break;
            }
        case "r+":
            {
                openOptions = {
                    read: true,
                    write: true
                };
                break;
            }
        case "w":
            {
                openOptions = {
                    create: true,
                    write: true,
                    truncate: true
                };
                break;
            }
        case "wx":
            {
                openOptions = {
                    createNew: true,
                    write: true
                };
                break;
            }
        case "w+":
            {
                openOptions = {
                    create: true,
                    write: true,
                    truncate: true,
                    read: true
                };
                break;
            }
        case "wx+":
            {
                openOptions = {
                    createNew: true,
                    write: true,
                    read: true
                };
                break;
            }
        case "as":
            {
                openOptions = {
                    create: true,
                    append: true
                };
                break;
            }
        case "as+":
            {
                openOptions = {
                    create: true,
                    read: true,
                    append: true
                };
                break;
            }
        case "rs+":
            {
                openOptions = {
                    create: true,
                    read: true,
                    write: true
                };
                break;
            }
        default:
            {
                throw new Error(`Unrecognized file system flag: ${flag}`);
            }
    }
    return openOptions;
}
function maybeCallback(cb) {
    validateCallback(cb);
    return cb;
}
function makeCallback(cb) {
    validateCallback(cb);
    return (...args)=>Reflect.apply(cb, this, args)
    ;
}
function convertFileInfoToStats(origin) {
    return {
        dev: origin.dev,
        ino: origin.ino,
        mode: origin.mode,
        nlink: origin.nlink,
        uid: origin.uid,
        gid: origin.gid,
        rdev: origin.rdev,
        size: origin.size,
        blksize: origin.blksize,
        blocks: origin.blocks,
        mtime: origin.mtime,
        atime: origin.atime,
        birthtime: origin.birthtime,
        mtimeMs: origin.mtime?.getTime() || null,
        atimeMs: origin.atime?.getTime() || null,
        birthtimeMs: origin.birthtime?.getTime() || null,
        isFile: ()=>origin.isFile
        ,
        isDirectory: ()=>origin.isDirectory
        ,
        isSymbolicLink: ()=>origin.isSymlink
        ,
        isBlockDevice: ()=>false
        ,
        isFIFO: ()=>false
        ,
        isCharacterDevice: ()=>false
        ,
        isSocket: ()=>false
        ,
        ctime: origin.mtime,
        ctimeMs: origin.mtime?.getTime() || null
    };
}
function toBigInt(number) {
    if (number === null || number === undefined) return null;
    return BigInt(number);
}
function convertFileInfoToBigIntStats(origin) {
    return {
        dev: toBigInt(origin.dev),
        ino: toBigInt(origin.ino),
        mode: toBigInt(origin.mode),
        nlink: toBigInt(origin.nlink),
        uid: toBigInt(origin.uid),
        gid: toBigInt(origin.gid),
        rdev: toBigInt(origin.rdev),
        size: toBigInt(origin.size) || 0n,
        blksize: toBigInt(origin.blksize),
        blocks: toBigInt(origin.blocks),
        mtime: origin.mtime,
        atime: origin.atime,
        birthtime: origin.birthtime,
        mtimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
        atimeMs: origin.atime ? BigInt(origin.atime.getTime()) : null,
        birthtimeMs: origin.birthtime ? BigInt(origin.birthtime.getTime()) : null,
        mtimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null,
        atimeNs: origin.atime ? BigInt(origin.atime.getTime()) * 1000000n : null,
        birthtimeNs: origin.birthtime ? BigInt(origin.birthtime.getTime()) * 1000000n : null,
        isFile: ()=>origin.isFile
        ,
        isDirectory: ()=>origin.isDirectory
        ,
        isSymbolicLink: ()=>origin.isSymlink
        ,
        isBlockDevice: ()=>false
        ,
        isFIFO: ()=>false
        ,
        isCharacterDevice: ()=>false
        ,
        isSocket: ()=>false
        ,
        ctime: origin.mtime,
        ctimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
        ctimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null
    };
}
function CFISBIS(fileInfo, bigInt) {
    if (bigInt) return convertFileInfoToBigIntStats(fileInfo);
    return convertFileInfoToStats(fileInfo);
}
function stat(path55, optionsOrCallback, maybeCallback1) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback1;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.stat(path55).then((stat1)=>callback(null, CFISBIS(stat1, options.bigint))
    , (err)=>callback(denoErrorToNodeError(err, {
            syscall: "stat"
        }))
    );
}
function statSync(path56, options = {
    bigint: false,
    throwIfNoEntry: true
}) {
    try {
        const origin = Deno.statSync(path56);
        return CFISBIS(origin, options.bigint);
    } catch (err) {
        if (options?.throwIfNoEntry === false && err instanceof Deno.errors.NotFound) {
            return;
        }
        if (err instanceof Error) {
            throw denoErrorToNodeError(err, {
                syscall: "stat"
            });
        } else {
            throw err;
        }
    }
}
function lstat(path57, optionsOrCallback, maybeCallback2) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.lstat(path57).then((stat2)=>callback(null, CFISBIS(stat2, options.bigint))
    , (err)=>callback(err)
    );
}
function lstatSync(path58, options) {
    const origin = Deno.lstatSync(path58);
    return CFISBIS(origin, options?.bigint || false);
}
"use strict";
const kType = Symbol("type");
const kStats = Symbol("stats");
const { F_OK =0 , W_OK =0 , R_OK =0 , X_OK =0 , COPYFILE_EXCL , COPYFILE_FICLONE , COPYFILE_FICLONE_FORCE , O_APPEND , O_CREAT , O_EXCL , O_RDONLY , O_RDWR , O_SYNC , O_TRUNC , O_WRONLY , S_IFBLK , S_IFCHR , S_IFDIR , S_IFIFO , S_IFLNK , S_IFMT , S_IFREG , S_IFSOCK , UV_FS_SYMLINK_DIR , UV_FS_SYMLINK_JUNCTION , UV_DIRENT_UNKNOWN , UV_DIRENT_FILE , UV_DIRENT_DIR , UV_DIRENT_LINK , UV_DIRENT_FIFO , UV_DIRENT_SOCKET , UV_DIRENT_CHAR , UV_DIRENT_BLOCK ,  } = fs;
const { errno: { EISDIR ,  } ,  } = os;
const kMinimumAccessMode = Math.min(F_OK, W_OK, R_OK, X_OK);
const kMaximumAccessMode = F_OK | W_OK | R_OK | X_OK;
const kDefaultCopyMode = 0;
const kMinimumCopyMode = Math.min(0, COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE);
const kMaximumCopyMode = COPYFILE_EXCL | COPYFILE_FICLONE | COPYFILE_FICLONE_FORCE;
const kIoMaxLength = 2 ** 31 - 1;
const kReadFileUnknownBufferLength = 64 * 1024;
const kReadFileBufferLength = 512 * 1024;
const kWriteFileMaxChunkSize = 512 * 1024;
const kMaxUserId = 2 ** 32 - 1;
function assertEncoding(encoding) {
    if (encoding && !Buffer.isEncoding(encoding)) {
        const reason = "is invalid encoding";
        throw new ERR_INVALID_ARG_VALUE(encoding, "encoding", reason);
    }
}
class Dirent {
    constructor(name1, type41){
        this.name = name1;
        this[kType] = type41;
    }
    isDirectory() {
        return this[kType] === UV_DIRENT_DIR;
    }
    isFile() {
        return this[kType] === UV_DIRENT_FILE;
    }
    isBlockDevice() {
        return this[kType] === UV_DIRENT_BLOCK;
    }
    isCharacterDevice() {
        return this[kType] === UV_DIRENT_CHAR;
    }
    isSymbolicLink() {
        return this[kType] === UV_DIRENT_LINK;
    }
    isFIFO() {
        return this[kType] === UV_DIRENT_FIFO;
    }
    isSocket() {
        return this[kType] === UV_DIRENT_SOCKET;
    }
}
class DirentFromStats extends Dirent {
    constructor(name2, stats){
        super(name2, null);
        this[kStats] = stats;
    }
}
for (const name of Reflect.ownKeys(Dirent.prototype)){
    if (name === "constructor") {
        continue;
    }
    DirentFromStats.prototype[name] = function() {
        return this[kStats][name]();
    };
}
function copyObject(source) {
    const target = {};
    for(const key in source){
        target[key] = source[key];
    }
    return target;
}
const bufferSep = Buffer.from(__default10.sep);
function join9(path59, name3) {
    if ((typeof path59 === "string" || isUint8Array(path59)) && name3 === undefined) {
        return path59;
    }
    if (typeof path59 === "string" && isUint8Array(name3)) {
        const pathBuffer = Buffer.from(__default10.join(path59, __default10.sep));
        return Buffer.concat([
            pathBuffer,
            name3
        ]);
    }
    if (typeof path59 === "string" && typeof name3 === "string") {
        return __default10.join(path59, name3);
    }
    if (isUint8Array(path59) && isUint8Array(name3)) {
        return Buffer.concat([
            path59,
            bufferSep,
            name3
        ]);
    }
    throw new ERR_INVALID_ARG_TYPE("path", [
        "string",
        "Buffer"
    ], path59);
}
function getDirents(path60, { 0: names , 1: types  }, callback) {
    let i165;
    if (typeof callback === "function") {
        const len = names.length;
        let toFinish = 0;
        callback = once(callback);
        for(i165 = 0; i165 < len; i165++){
            const type42 = types[i165];
            if (type42 === UV_DIRENT_UNKNOWN) {
                const name4 = names[i165];
                const idx = i165;
                toFinish++;
                let filepath;
                try {
                    filepath = join9(path60, name4);
                } catch (err1) {
                    callback(err1);
                    return;
                }
                lstat(filepath, (err, stats)=>{
                    if (err) {
                        callback(err);
                        return;
                    }
                    names[idx] = new DirentFromStats(name4, stats);
                    if (--toFinish === 0) {
                        callback(null, names);
                    }
                });
            } else {
                names[i165] = new Dirent(names[i165], types[i165]);
            }
        }
        if (toFinish === 0) {
            callback(null, names);
        }
    } else {
        const len = names.length;
        for(i165 = 0; i165 < len; i165++){
            names[i165] = getDirent(path60, names[i165], types[i165]);
        }
        return names;
    }
}
function getDirent(path61, name5, type43, callback) {
    if (typeof callback === "function") {
        if (type43 === UV_DIRENT_UNKNOWN) {
            let filepath;
            try {
                filepath = join9(path61, name5);
            } catch (err5) {
                callback(err5);
                return;
            }
            lstat(filepath, (err, stats)=>{
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, new DirentFromStats(name5, stats));
            });
        } else {
            callback(null, new Dirent(name5, type43));
        }
    } else if (type43 === UV_DIRENT_UNKNOWN) {
        const stats = lstatSync(join9(path61, name5));
        return new DirentFromStats(name5, stats);
    } else {
        return new Dirent(name5, type43);
    }
}
function getOptions1(options, defaultOptions) {
    if (options === null || options === undefined || typeof options === "function") {
        return defaultOptions;
    }
    if (typeof options === "string") {
        defaultOptions = {
            ...defaultOptions
        };
        defaultOptions.encoding = options;
        options = defaultOptions;
    } else if (typeof options !== "object") {
        throw new ERR_INVALID_ARG_TYPE("options", [
            "string",
            "Object"
        ], options);
    }
    if (options.encoding !== "buffer") {
        assertEncoding(options.encoding);
    }
    if (options.signal !== undefined) {
        validateAbortSignal(options.signal, "options.signal");
    }
    return options;
}
function handleErrorFromBinding(ctx) {
    if (ctx.errno !== undefined) {
        const err = uvException(ctx);
        Error.captureStackTrace(err, handleErrorFromBinding);
        throw err;
    }
    if (ctx.error !== undefined) {
        Error.captureStackTrace(ctx.error, handleErrorFromBinding);
        throw ctx.error;
    }
}
const nullCheck = hideStackFrames((path62, propName, throwError = true)=>{
    const pathIsString = typeof path62 === "string";
    const pathIsUint8Array = isUint8Array(path62);
    if (!pathIsString && !pathIsUint8Array || pathIsString && !path62.includes("\u0000") || pathIsUint8Array && !path62.includes(0)) {
        return;
    }
    const err = new ERR_INVALID_ARG_VALUE(propName, path62, "must be a string or Uint8Array without null bytes");
    if (throwError) {
        throw err;
    }
    return err;
});
function preprocessSymlinkDestination(path63, type44, linkPath) {
    if (!isWindows) {
        return path63;
    }
    path63 = "" + path63;
    if (type44 === "junction") {
        path63 = __default10.resolve(linkPath, "..", path63);
        return __default10.toNamespacedPath(path63);
    }
    if (__default10.isAbsolute(path63)) {
        return __default10.toNamespacedPath(path63);
    }
    return path63.replace(/\//g, "\\");
}
function StatsBase(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks) {
    this.dev = dev;
    this.mode = mode;
    this.nlink = nlink;
    this.uid = uid;
    this.gid = gid;
    this.rdev = rdev;
    this.blksize = blksize;
    this.ino = ino;
    this.size = size;
    this.blocks = blocks;
}
StatsBase.prototype.isDirectory = function() {
    return this._checkModeProperty(S_IFDIR);
};
StatsBase.prototype.isFile = function() {
    return this._checkModeProperty(S_IFREG);
};
StatsBase.prototype.isBlockDevice = function() {
    return this._checkModeProperty(S_IFBLK);
};
StatsBase.prototype.isCharacterDevice = function() {
    return this._checkModeProperty(S_IFCHR);
};
StatsBase.prototype.isSymbolicLink = function() {
    return this._checkModeProperty(S_IFLNK);
};
StatsBase.prototype.isFIFO = function() {
    return this._checkModeProperty(S_IFIFO);
};
StatsBase.prototype.isSocket = function() {
    return this._checkModeProperty(S_IFSOCK);
};
const kNsPerMsBigInt = 10n ** 6n;
const kNsPerSecBigInt = 10n ** 9n;
const kMsPerSec = 10 ** 3;
const kNsPerMs = 10 ** 6;
function msFromTimeSpec(sec, nsec) {
    return sec * kMsPerSec + nsec / kNsPerMs;
}
function nsFromTimeSpecBigInt(sec, nsec) {
    return sec * kNsPerSecBigInt + nsec;
}
function dateFromMs(ms) {
    return new Date(Number(ms) + 0.5);
}
function BigIntStats(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeNs, mtimeNs, ctimeNs, birthtimeNs) {
    Reflect.apply(StatsBase, this, [
        dev,
        mode,
        nlink,
        uid,
        gid,
        rdev,
        blksize,
        ino,
        size,
        blocks, 
    ]);
    this.atimeMs = atimeNs / kNsPerMsBigInt;
    this.mtimeMs = mtimeNs / kNsPerMsBigInt;
    this.ctimeMs = ctimeNs / kNsPerMsBigInt;
    this.birthtimeMs = birthtimeNs / kNsPerMsBigInt;
    this.atimeNs = atimeNs;
    this.mtimeNs = mtimeNs;
    this.ctimeNs = ctimeNs;
    this.birthtimeNs = birthtimeNs;
    this.atime = dateFromMs(this.atimeMs);
    this.mtime = dateFromMs(this.mtimeMs);
    this.ctime = dateFromMs(this.ctimeMs);
    this.birthtime = dateFromMs(this.birthtimeMs);
}
Object.setPrototypeOf(BigIntStats.prototype, StatsBase.prototype);
Object.setPrototypeOf(BigIntStats, StatsBase);
BigIntStats.prototype._checkModeProperty = function(property) {
    if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
        return false;
    }
    return (this.mode & BigInt(S_IFMT)) === BigInt(property);
};
function Stats(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeMs, mtimeMs, ctimeMs, birthtimeMs) {
    StatsBase.call(this, dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks);
    this.atimeMs = atimeMs;
    this.mtimeMs = mtimeMs;
    this.ctimeMs = ctimeMs;
    this.birthtimeMs = birthtimeMs;
    this.atime = dateFromMs(atimeMs);
    this.mtime = dateFromMs(mtimeMs);
    this.ctime = dateFromMs(ctimeMs);
    this.birthtime = dateFromMs(birthtimeMs);
}
Object.setPrototypeOf(Stats.prototype, StatsBase.prototype);
Object.setPrototypeOf(Stats, StatsBase);
Stats.prototype.isFile = StatsBase.prototype.isFile;
Stats.prototype._checkModeProperty = function(property) {
    if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
        return false;
    }
    return (this.mode & S_IFMT) === property;
};
function getStatsFromBinding(stats, offset = 0) {
    if (isBigUint64Array(stats)) {
        return new BigIntStats(stats[0 + offset], stats[1 + offset], stats[2 + offset], stats[3 + offset], stats[4 + offset], stats[5 + offset], stats[6 + offset], stats[7 + offset], stats[8 + offset], stats[9 + offset], nsFromTimeSpecBigInt(stats[10 + offset], stats[11 + offset]), nsFromTimeSpecBigInt(stats[12 + offset], stats[13 + offset]), nsFromTimeSpecBigInt(stats[14 + offset], stats[15 + offset]), nsFromTimeSpecBigInt(stats[16 + offset], stats[17 + offset]));
    }
    return new Stats(stats[0 + offset], stats[1 + offset], stats[2 + offset], stats[3 + offset], stats[4 + offset], stats[5 + offset], stats[6 + offset], stats[7 + offset], stats[8 + offset], stats[9 + offset], msFromTimeSpec(stats[10 + offset], stats[11 + offset]), msFromTimeSpec(stats[12 + offset], stats[13 + offset]), msFromTimeSpec(stats[14 + offset], stats[15 + offset]), msFromTimeSpec(stats[16 + offset], stats[17 + offset]));
}
function stringToFlags(flags, name6 = "flags") {
    if (typeof flags === "number") {
        validateInt32(flags, name6);
        return flags;
    }
    if (flags == null) {
        return O_RDONLY;
    }
    switch(flags){
        case "r":
            return O_RDONLY;
        case "rs":
        case "sr":
            return O_RDONLY | O_SYNC;
        case "r+":
            return O_RDWR;
        case "rs+":
        case "sr+":
            return O_RDWR | O_SYNC;
        case "w":
            return O_TRUNC | O_CREAT | O_WRONLY;
        case "wx":
        case "xw":
            return O_TRUNC | O_CREAT | O_WRONLY | O_EXCL;
        case "w+":
            return O_TRUNC | O_CREAT | O_RDWR;
        case "wx+":
        case "xw+":
            return O_TRUNC | O_CREAT | O_RDWR | O_EXCL;
        case "a":
            return O_APPEND | O_CREAT | O_WRONLY;
        case "ax":
        case "xa":
            return O_APPEND | O_CREAT | O_WRONLY | O_EXCL;
        case "as":
        case "sa":
            return O_APPEND | O_CREAT | O_WRONLY | O_SYNC;
        case "a+":
            return O_APPEND | O_CREAT | O_RDWR;
        case "ax+":
        case "xa+":
            return O_APPEND | O_CREAT | O_RDWR | O_EXCL;
        case "as+":
        case "sa+":
            return O_APPEND | O_CREAT | O_RDWR | O_SYNC;
    }
    throw new ERR_INVALID_ARG_VALUE("flags", flags);
}
const stringToSymlinkType = hideStackFrames((type45)=>{
    let flags = 0;
    if (typeof type45 === "string") {
        switch(type45){
            case "dir":
                flags |= UV_FS_SYMLINK_DIR;
                break;
            case "junction":
                flags |= UV_FS_SYMLINK_JUNCTION;
                break;
            case "file":
                break;
            default:
                throw new ERR_FS_INVALID_SYMLINK_TYPE(type45);
        }
    }
    return flags;
});
function toUnixTimestamp(time, name7 = "time") {
    if (typeof time === "string" && +time == time) {
        return +time;
    }
    if (Number.isFinite(time)) {
        if (time < 0) {
            return Date.now() / 1000;
        }
        return time;
    }
    if (isDate1(time)) {
        return Date.getTime(time) / 1000;
    }
    throw new ERR_INVALID_ARG_TYPE(name7, [
        "Date",
        "Time in seconds"
    ], time);
}
const validateOffsetLengthRead = hideStackFrames((offset, length, bufferLength)=>{
    if (offset < 0) {
        throw new ERR_OUT_OF_RANGE("offset", ">= 0", offset);
    }
    if (length < 0) {
        throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    if (offset + length > bufferLength) {
        throw new ERR_OUT_OF_RANGE("length", `<= ${bufferLength - offset}`, length);
    }
});
const validateOffsetLengthWrite = hideStackFrames((offset, length, byteLength10)=>{
    if (offset > byteLength10) {
        throw new ERR_OUT_OF_RANGE("offset", `<= ${byteLength10}`, offset);
    }
    if (length > byteLength10 - offset) {
        throw new ERR_OUT_OF_RANGE("length", `<= ${byteLength10 - offset}`, length);
    }
    if (length < 0) {
        throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    validateInt32(length, "length", 0);
});
const validatePath = hideStackFrames((path64, propName = "path")=>{
    if (typeof path64 !== "string" && !isUint8Array(path64)) {
        throw new ERR_INVALID_ARG_TYPE(propName, [
            "string",
            "Buffer",
            "URL"
        ], path64);
    }
    const err = nullCheck(path64, propName, false);
    if (err !== undefined) {
        throw err;
    }
});
const getValidatedPath = hideStackFrames((fileURLOrPath, propName = "path")=>{
    const path65 = toPathIfFileURL(fileURLOrPath);
    validatePath(path65, propName);
    return path65;
});
const getValidatedFd = hideStackFrames((fd, propName = "fd")=>{
    if (Object.is(fd, -0)) {
        return 0;
    }
    validateInt32(fd, propName, 0);
    return fd;
});
const validateBufferArray = hideStackFrames((buffers, propName = "buffers")=>{
    if (!Array.isArray(buffers)) {
        throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
    }
    for(let i166 = 0; i166 < buffers.length; i166++){
        if (!isArrayBufferView(buffers[i166])) {
            throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
        }
    }
    return buffers;
});
let nonPortableTemplateWarn = true;
function warnOnNonPortableTemplate(template) {
    if (nonPortableTemplateWarn && template.endsWith("X")) {
        process1.emitWarning("mkdtemp() templates ending with X are not portable. " + "For details see: https://nodejs.org/api/fs.html");
        nonPortableTemplateWarn = false;
    }
}
const defaultCpOptions = {
    dereference: false,
    errorOnExist: false,
    filter: undefined,
    force: true,
    preserveTimestamps: false,
    recursive: false
};
const defaultRmOptions = {
    recursive: false,
    force: false,
    retryDelay: 100,
    maxRetries: 0
};
const defaultRmdirOptions = {
    retryDelay: 100,
    maxRetries: 0,
    recursive: false
};
const validateCpOptions = hideStackFrames((options)=>{
    if (options === undefined) {
        return {
            ...defaultCpOptions
        };
    }
    validateObject(options, "options");
    options = {
        ...defaultCpOptions,
        ...options
    };
    validateBoolean(options.dereference, "options.dereference");
    validateBoolean(options.errorOnExist, "options.errorOnExist");
    validateBoolean(options.force, "options.force");
    validateBoolean(options.preserveTimestamps, "options.preserveTimestamps");
    validateBoolean(options.recursive, "options.recursive");
    if (options.filter !== undefined) {
        validateFunction(options.filter, "options.filter");
    }
    return options;
});
const validateRmOptions = hideStackFrames((path66, options, expectDir, cb)=>{
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    stat(path66, (err, stats)=>{
        if (err) {
            if (options.force && err.code === "ENOENT") {
                return cb(null, options);
            }
            return cb(err, options);
        }
        if (expectDir && !stats.isDirectory()) {
            return cb(false);
        }
        if (stats.isDirectory() && !options.recursive) {
            return cb(new ERR_FS_EISDIR({
                code: "EISDIR",
                message: "is a directory",
                path: path66,
                syscall: "rm",
                errno: EISDIR
            }));
        }
        return cb(null, options);
    });
});
const validateRmOptionsSync = hideStackFrames((path67, options, expectDir)=>{
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    if (!options.force || expectDir || !options.recursive) {
        const isDirectory = statSync(path67, {
            throwIfNoEntry: !options.force
        })?.isDirectory();
        if (expectDir && !isDirectory) {
            return false;
        }
        if (isDirectory && !options.recursive) {
            throw new ERR_FS_EISDIR({
                code: "EISDIR",
                message: "is a directory",
                path: path67,
                syscall: "rm",
                errno: EISDIR
            });
        }
    }
    return options;
});
let recursiveRmdirWarned = process1.noDeprecation;
function emitRecursiveRmdirWarning() {
    if (!recursiveRmdirWarned) {
        process1.emitWarning("In future versions of Node.js, fs.rmdir(path, { recursive: true }) " + "will be removed. Use fs.rm(path, { recursive: true }) instead", "DeprecationWarning", "DEP0147");
        recursiveRmdirWarned = true;
    }
}
const validateRmdirOptions = hideStackFrames((options, defaults = defaultRmdirOptions)=>{
    if (options === undefined) {
        return defaults;
    }
    validateObject(options, "options");
    options = {
        ...defaults,
        ...options
    };
    validateBoolean(options.recursive, "options.recursive");
    validateInt32(options.retryDelay, "options.retryDelay", 0);
    validateUint32(options.maxRetries, "options.maxRetries");
    return options;
});
const getValidMode = hideStackFrames((mode, type46)=>{
    let min23 = kMinimumAccessMode;
    let max = kMaximumAccessMode;
    let def = F_OK;
    if (type46 === "copyFile") {
        min23 = kMinimumCopyMode;
        max = kMaximumCopyMode;
        def = mode || kDefaultCopyMode;
    } else {
        assert3(type46 === "access");
    }
    if (mode == null) {
        return def;
    }
    if (Number.isInteger(mode) && mode >= min23 && mode <= max) {
        return mode;
    }
    if (typeof mode !== "number") {
        throw new ERR_INVALID_ARG_TYPE("mode", "integer", mode);
    }
    throw new ERR_OUT_OF_RANGE("mode", `an integer >= ${min23} && <= ${max}`, mode);
});
const validateStringAfterArrayBufferView = hideStackFrames((buffer, name8)=>{
    if (typeof buffer === "string") {
        return;
    }
    if (typeof buffer === "object" && buffer !== null && typeof buffer.toString === "function" && Object.prototype.hasOwnProperty.call(buffer, "toString")) {
        return;
    }
    throw new ERR_INVALID_ARG_TYPE(name8, [
        "string",
        "Buffer",
        "TypedArray",
        "DataView"
    ], buffer);
});
const validatePosition = hideStackFrames((position)=>{
    if (typeof position === "number") {
        validateInteger(position, "position");
    } else if (typeof position === "bigint") {
        if (!(position >= -(2n ** 63n) && position <= 2n ** 63n - 1n)) {
            throw new ERR_OUT_OF_RANGE("position", `>= ${-(2n ** 63n)} && <= ${2n ** 63n - 1n}`, position);
        }
    } else {
        throw new ERR_INVALID_ARG_TYPE("position", [
            "integer",
            "bigint"
        ], position);
    }
});
({
    constants: {
        kIoMaxLength,
        kMaxUserId,
        kReadFileBufferLength,
        kReadFileUnknownBufferLength,
        kWriteFileMaxChunkSize
    },
    assertEncoding,
    BigIntStats,
    copyObject,
    Dirent,
    emitRecursiveRmdirWarning,
    getDirent,
    getDirents,
    getOptions: getOptions1,
    getValidatedFd,
    getValidatedPath,
    getValidMode,
    handleErrorFromBinding,
    nullCheck,
    preprocessSymlinkDestination,
    realpathCacheKey: Symbol("realpathCacheKey"),
    getStatsFromBinding,
    stringToFlags,
    stringToSymlinkType,
    Stats,
    toUnixTimestamp,
    validateBufferArray,
    validateCpOptions,
    validateOffsetLengthRead,
    validateOffsetLengthWrite,
    validatePath,
    validatePosition,
    validateRmOptions,
    validateRmOptionsSync,
    validateRmdirOptions,
    validateStringAfterArrayBufferView,
    warnOnNonPortableTemplate
});
function access(path68, mode, callback) {
    if (typeof mode === "function") {
        callback = mode;
        mode = fs.F_OK;
    }
    path68 = getValidatedPath(path68).toString();
    mode = getValidMode(mode, "access");
    const cb = makeCallback(callback);
    Deno.lstat(path68).then((info)=>{
        const m = +mode || 0;
        let fileMode = +info.mode || 0;
        if (Deno.build.os !== "windows" && info.uid === getUid()) {
            fileMode >>= 6;
        }
        if ((m & fileMode) === m) {
            cb(null);
        } else {
            const e = new Error(`EACCES: permission denied, access '${path68}'`);
            e.path = path68;
            e.syscall = "access";
            e.errno = os.errno.EACCES;
            e.code = "EACCES";
            cb(e);
        }
    }, (err)=>{
        if (err instanceof Deno.errors.NotFound) {
            const e = new Error(`ENOENT: no such file or directory, access '${path68}'`);
            e.path = path68;
            e.syscall = "access";
            e.errno = os.errno.ENOENT;
            e.code = "ENOENT";
            cb(e);
        } else {
            cb(err);
        }
    });
}
function accessSync(path69, mode) {
    path69 = getValidatedPath(path69).toString();
    mode = getValidMode(mode, "access");
    try {
        const info = Deno.lstatSync(path69.toString());
        const m = +mode || 0;
        const fileMode = +info.mode || 0;
        if ((m & fileMode) === m) {} else {
            const e = new Error(`EACCES: permission denied, access '${path69}'`);
            e.path = path69;
            e.syscall = "access";
            e.errno = os.errno.EACCES;
            e.code = "EACCES";
            throw e;
        }
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            const e = new Error(`ENOENT: no such file or directory, access '${path69}'`);
            e.path = path69;
            e.syscall = "access";
            e.errno = os.errno.ENOENT;
            e.code = "ENOENT";
            throw e;
        } else {
            throw err;
        }
    }
}
function writeFile(pathOrRid, data11, optOrCallback, callback) {
    const callbackFn = optOrCallback instanceof Function ? optOrCallback : callback;
    const options = optOrCallback instanceof Function ? undefined : optOrCallback;
    if (!callbackFn) {
        throw new TypeError("Callback must be a function.");
    }
    pathOrRid = pathOrRid instanceof URL ? fromFileUrl5(pathOrRid) : pathOrRid;
    const flag = isFileOptions(options) ? options.flag : undefined;
    const mode = isFileOptions(options) ? options.mode : undefined;
    const encoding = checkEncoding(getEncoding(options)) || "utf8";
    const openOptions = getOpenOptions(flag || "w");
    if (!ArrayBuffer.isView(data11)) {
        validateStringAfterArrayBufferView(data11, "data");
        data11 = Buffer.from(String(data11), encoding);
    }
    const isRid = typeof pathOrRid === "number";
    let file;
    let error26 = null;
    (async ()=>{
        try {
            file = isRid ? new Deno.FsFile(pathOrRid) : await Deno.open(pathOrRid, openOptions);
            if (!isRid && mode && !isWindows) {
                await Deno.chmod(pathOrRid, mode);
            }
            const signal = isFileOptions(options) ? options.signal : undefined;
            await writeAll1(file, data11, {
                signal
            });
        } catch (e) {
            error26 = e instanceof Error ? denoErrorToNodeError(e, {
                syscall: "write"
            }) : new Error("[non-error thrown]");
        } finally{
            if (!isRid && file) file.close();
            callbackFn(error26);
        }
    })();
}
function writeFileSync(pathOrRid, data12, options) {
    pathOrRid = pathOrRid instanceof URL ? fromFileUrl5(pathOrRid) : pathOrRid;
    const flag = isFileOptions(options) ? options.flag : undefined;
    const mode = isFileOptions(options) ? options.mode : undefined;
    const encoding = checkEncoding(getEncoding(options)) || "utf8";
    const openOptions = getOpenOptions(flag || "w");
    if (!ArrayBuffer.isView(data12)) {
        validateStringAfterArrayBufferView(data12, "data");
        data12 = Buffer.from(String(data12), encoding);
    }
    const isRid = typeof pathOrRid === "number";
    let file;
    let error27 = null;
    try {
        file = isRid ? new Deno.FsFile(pathOrRid) : Deno.openSync(pathOrRid, openOptions);
        if (!isRid && mode && !isWindows) {
            Deno.chmodSync(pathOrRid, mode);
        }
        writeAllSync(file, data12);
    } catch (e) {
        error27 = e instanceof Error ? denoErrorToNodeError(e, {
            syscall: "write"
        }) : new Error("[non-error thrown]");
    } finally{
        if (!isRid && file) file.close();
    }
    if (error27) throw error27;
}
async function writeAll1(w19, arr, options = {}) {
    const { offset =0 , length =arr.byteLength , signal  } = options;
    checkAborted(signal);
    const written = await w19.write(arr.subarray(offset, offset + length));
    if (written === length) {
        return;
    }
    await writeAll1(w19, arr, {
        offset: offset + written,
        length: length - written,
        signal
    });
}
function checkAborted(signal) {
    if (signal?.aborted) {
        throw new AbortError();
    }
}
function appendFile(path70, data13, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions1(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    options = copyObject(options);
    if (!options.flag || isUint32(path70)) {
        options.flag = "a";
    }
    writeFile(path70, data13, options, callback);
}
function appendFileSync(path71, data14, options) {
    options = getOptions1(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    options = copyObject(options);
    if (!options.flag || isUint32(path71)) {
        options.flag = "a";
    }
    writeFileSync(path71, data14, options);
}
function chmod(path72, mode, callback) {
    path72 = getValidatedPath(path72).toString();
    mode = parseFileMode(mode, "mode");
    Deno.chmod(toNamespacedPath2(path72), mode).then(()=>callback(null)
    , callback);
}
function chmodSync(path73, mode) {
    path73 = getValidatedPath(path73).toString();
    mode = parseFileMode(mode, "mode");
    Deno.chmodSync(toNamespacedPath2(path73), mode);
}
function chown(path74, uid, gid, callback) {
    callback = makeCallback(callback);
    path74 = getValidatedPath(path74).toString();
    validateInteger(uid, "uid", -1, kMaxUserId);
    validateInteger(gid, "gid", -1, kMaxUserId);
    Deno.chown(toNamespacedPath2(path74), uid, gid).then(()=>callback(null)
    , callback);
}
function chownSync(path75, uid, gid) {
    path75 = getValidatedPath(path75).toString();
    validateInteger(uid, "uid", -1, kMaxUserId);
    validateInteger(gid, "gid", -1, kMaxUserId);
    Deno.chownSync(toNamespacedPath2(path75), uid, gid);
}
function close(fd, callback) {
    fd = getValidatedFd(fd);
    setTimeout(()=>{
        let error28 = null;
        try {
            Deno.close(fd);
        } catch (err) {
            error28 = err instanceof Error ? err : new Error("[non-error thrown]");
        }
        callback(error28);
    }, 0);
}
function closeSync(fd) {
    fd = getValidatedFd(fd);
    Deno.close(fd);
}
class ReadStream extends Readable {
    path;
    constructor(path76, opts){
        path76 = path76 instanceof URL ? fromFileUrl5(path76) : path76;
        const hasBadOptions = opts && (opts.fd || opts.start || opts.end || opts.fs);
        if (hasBadOptions) {
            notImplemented(`fs.ReadStream.prototype.constructor with unsupported options (${JSON.stringify(opts)})`);
        }
        const file = Deno.openSync(path76, {
            read: true
        });
        const buffer = new Uint8Array(16 * 1024);
        super({
            autoDestroy: true,
            emitClose: true,
            objectMode: false,
            read: async function(_size) {
                try {
                    const n = await file.read(buffer);
                    this.push(n ? Buffer.from(buffer.slice(0, n)) : null);
                } catch (err) {
                    this.destroy(err);
                }
            },
            destroy: (err, cb)=>{
                try {
                    file.close();
                } catch  {}
                cb(err);
            }
        });
        this.path = path76;
    }
}
function createReadStream(path77, options) {
    return new ReadStream(path77, options);
}
const { F_OK: F_OK1 , R_OK: R_OK1 , W_OK: W_OK1 , X_OK: X_OK1 , S_IRUSR , S_IWUSR , S_IXUSR , S_IRGRP , S_IWGRP , S_IXGRP , S_IROTH , S_IWOTH , S_IXOTH , COPYFILE_EXCL: COPYFILE_EXCL1 , COPYFILE_FICLONE: COPYFILE_FICLONE1 , COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE1 , UV_FS_COPYFILE_EXCL , UV_FS_COPYFILE_FICLONE , UV_FS_COPYFILE_FICLONE_FORCE ,  } = fs;
const mod53 = {
    F_OK: F_OK1,
    R_OK: R_OK1,
    W_OK: W_OK1,
    X_OK: X_OK1,
    S_IRUSR: S_IRUSR,
    S_IWUSR: S_IWUSR,
    S_IXUSR: S_IXUSR,
    S_IRGRP: S_IRGRP,
    S_IWGRP: S_IWGRP,
    S_IXGRP: S_IXGRP,
    S_IROTH: S_IROTH,
    S_IWOTH: S_IWOTH,
    S_IXOTH: S_IXOTH,
    COPYFILE_EXCL: COPYFILE_EXCL1,
    COPYFILE_FICLONE: COPYFILE_FICLONE1,
    COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE1,
    UV_FS_COPYFILE_EXCL: UV_FS_COPYFILE_EXCL,
    UV_FS_COPYFILE_FICLONE: UV_FS_COPYFILE_FICLONE,
    UV_FS_COPYFILE_FICLONE_FORCE: UV_FS_COPYFILE_FICLONE_FORCE
};
function copyFile(src, dest, mode, callback) {
    if (typeof mode === "function") {
        callback = mode;
        mode = 0;
    }
    const srcStr = getValidatedPath(src, "src").toString();
    const destStr = getValidatedPath(dest, "dest").toString();
    const modeNum = getValidMode(mode, "copyFile");
    const cb = makeCallback(callback);
    if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
        Deno.lstat(destStr).then(()=>{
            const e = new Error(`EEXIST: file already exists, copyfile '${srcStr}' -> '${destStr}'`);
            e.syscall = "copyfile";
            e.errno = os.errno.EEXIST;
            e.code = "EEXIST";
            cb(e);
        }, (e)=>{
            if (e instanceof Deno.errors.NotFound) {
                Deno.copyFile(srcStr, destStr).then(()=>cb(null)
                , cb);
            }
            cb(e);
        });
    } else {
        Deno.copyFile(srcStr, destStr).then(()=>cb(null)
        , cb);
    }
}
function copyFileSync(src, dest, mode) {
    const srcStr = getValidatedPath(src, "src").toString();
    const destStr = getValidatedPath(dest, "dest").toString();
    const modeNum = getValidMode(mode, "copyFile");
    if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
        try {
            Deno.lstatSync(destStr);
            throw new Error(`A file exists at the destination: ${destStr}`);
        } catch (e) {
            if (e instanceof Deno.errors.NotFound) {
                Deno.copyFileSync(srcStr, destStr);
            }
            throw e;
        }
    } else {
        Deno.copyFileSync(srcStr, destStr);
    }
}
class Dirent1 {
    constructor(entry){
        this.entry = entry;
    }
    isBlockDevice() {
        notImplemented("Deno does not yet support identification of block devices");
        return false;
    }
    isCharacterDevice() {
        notImplemented("Deno does not yet support identification of character devices");
        return false;
    }
    isDirectory() {
        return this.entry.isDirectory;
    }
    isFIFO() {
        notImplemented("Deno does not yet support identification of FIFO named pipes");
        return false;
    }
    isFile() {
        return this.entry.isFile;
    }
    isSocket() {
        notImplemented("Deno does not yet support identification of sockets");
        return false;
    }
    isSymbolicLink() {
        return this.entry.isSymlink;
    }
    get name() {
        return this.entry.name;
    }
    entry;
}
class Dir {
    dirPath;
    syncIterator;
    asyncIterator;
    constructor(path78){
        this.dirPath = path78;
    }
    get path() {
        if (this.dirPath instanceof Uint8Array) {
            return new TextDecoder().decode(this.dirPath);
        }
        return this.dirPath;
    }
    read(callback) {
        return new Promise((resolve20, reject)=>{
            if (!this.asyncIterator) {
                this.asyncIterator = Deno.readDir(this.path)[Symbol.asyncIterator]();
            }
            assert1(this.asyncIterator);
            this.asyncIterator.next().then(({ value  })=>{
                resolve20(value ? value : null);
                if (callback) {
                    callback(null, value ? value : null);
                }
            }, (err)=>{
                if (callback) {
                    callback(err);
                }
                reject(err);
            });
        });
    }
    readSync() {
        if (!this.syncIterator) {
            this.syncIterator = Deno.readDirSync(this.path)[Symbol.iterator]();
        }
        const file = this.syncIterator.next().value;
        return file ? new Dirent1(file) : null;
    }
    close(callback) {
        return new Promise((resolve22)=>{
            if (callback) {
                callback(null);
            }
            resolve22();
        });
    }
    closeSync() {}
    async *[Symbol.asyncIterator]() {
        try {
            while(true){
                const dirent = await this.read();
                if (dirent === null) {
                    break;
                }
                yield dirent;
            }
        } finally{
            await this.close();
        }
    }
}
function exists(path79, callback) {
    path79 = path79 instanceof URL ? fromFileUrl5(path79) : path79;
    Deno.lstat(path79).then(()=>callback(true)
    , ()=>callback(false)
    );
}
function existsSync(path80) {
    path80 = path80 instanceof URL ? fromFileUrl5(path80) : path80;
    try {
        Deno.lstatSync(path80);
        return true;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}
function fdatasync(fd, callback) {
    Deno.fdatasync(fd).then(()=>callback(null)
    , callback);
}
function fdatasyncSync(fd) {
    Deno.fdatasyncSync(fd);
}
function fstat(fd, optionsOrCallback, maybeCallback3) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback3;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.fstat(fd).then((stat3)=>callback(null, CFISBIS(stat3, options.bigint))
    , (err)=>callback(err)
    );
}
function fstatSync(fd, options) {
    const origin = Deno.fstatSync(fd);
    return CFISBIS(origin, options?.bigint || false);
}
function fsync(fd, callback) {
    Deno.fsync(fd).then(()=>callback(null)
    , callback);
}
function fsyncSync(fd) {
    Deno.fsyncSync(fd);
}
function ftruncate(fd, lenOrCallback, maybeCallback4) {
    const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
    const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback4;
    if (!callback) throw new Error("No callback function supplied");
    Deno.ftruncate(fd, len).then(()=>callback(null)
    , callback);
}
function ftruncateSync(fd, len) {
    Deno.ftruncateSync(fd, len);
}
function getValidTime(time, name76) {
    if (typeof time === "string") {
        time = Number(time);
    }
    if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
        throw new Deno.errors.InvalidData(`invalid ${name76}, must not be infinity or NaN`);
    }
    return time;
}
function futimes(fd, atime, mtime, callback) {
    if (!callback) {
        throw new Deno.errors.InvalidData("No callback function supplied");
    }
    atime = getValidTime(atime, "atime");
    mtime = getValidTime(mtime, "mtime");
    futime(fd, atime, mtime).then(()=>callback(null)
    , callback);
}
function futimesSync(fd, atime, mtime) {
    atime = getValidTime(atime, "atime");
    mtime = getValidTime(mtime, "mtime");
    futimeSync(fd, atime, mtime);
}
function link(existingPath, newPath, callback) {
    existingPath = existingPath instanceof URL ? fromFileUrl5(existingPath) : existingPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.link(existingPath, newPath).then(()=>callback(null)
    , callback);
}
function linkSync(existingPath, newPath) {
    existingPath = existingPath instanceof URL ? fromFileUrl5(existingPath) : existingPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.linkSync(existingPath, newPath);
}
function mkdir(path81, options, callback) {
    path81 = path81 instanceof URL ? fromFileUrl5(path81) : path81;
    let mode = 0o777;
    let recursive = false;
    if (typeof options == "function") {
        callback = options;
    } else if (typeof options === "number") {
        mode = options;
    } else if (typeof options === "boolean") {
        recursive = options;
    } else if (options) {
        if (options.recursive !== undefined) recursive = options.recursive;
        if (options.mode !== undefined) mode = options.mode;
    }
    if (typeof recursive !== "boolean") {
        throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
    }
    Deno.mkdir(path81, {
        recursive,
        mode
    }).then(()=>{
        if (typeof callback === "function") {
            callback(null);
        }
    }, (err)=>{
        if (typeof callback === "function") {
            callback(err);
        }
    });
}
function mkdirSync(path82, options) {
    path82 = path82 instanceof URL ? fromFileUrl5(path82) : path82;
    let mode = 0o777;
    let recursive = false;
    if (typeof options === "number") {
        mode = options;
    } else if (typeof options === "boolean") {
        recursive = options;
    } else if (options) {
        if (options.recursive !== undefined) recursive = options.recursive;
        if (options.mode !== undefined) mode = options.mode;
    }
    if (typeof recursive !== "boolean") {
        throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
    }
    Deno.mkdirSync(path82, {
        recursive,
        mode
    });
}
function mkdtemp(prefix, optionsOrCallback, maybeCallback5) {
    const callback = typeof optionsOrCallback == "function" ? optionsOrCallback : maybeCallback5;
    if (!callback) throw new ERR_INVALID_CALLBACK(callback);
    const encoding = parseEncoding(optionsOrCallback);
    const path83 = tempDirPath(prefix);
    mkdir(path83, {
        recursive: false,
        mode: 0o700
    }, (err)=>{
        if (err) callback(err);
        else callback(null, decode3(path83, encoding));
    });
}
function mkdtempSync(prefix, options) {
    const encoding = parseEncoding(options);
    const path84 = tempDirPath(prefix);
    mkdirSync(path84, {
        recursive: false,
        mode: 0o700
    });
    return decode3(path84, encoding);
}
function parseEncoding(optionsOrCallback) {
    let encoding;
    if (typeof optionsOrCallback == "function") encoding = undefined;
    else if (optionsOrCallback instanceof Object) {
        encoding = optionsOrCallback?.encoding;
    } else encoding = optionsOrCallback;
    if (encoding) {
        try {
            new TextDecoder(encoding);
        } catch  {
            throw new ERR_INVALID_OPT_VALUE_ENCODING(encoding);
        }
    }
    return encoding;
}
function decode3(str, encoding) {
    if (!encoding) return str;
    else {
        const decoder = new TextDecoder(encoding);
        const encoder = new TextEncoder();
        return decoder.decode(encoder.encode(str));
    }
}
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function randomName() {
    return [
        ...Array(6)
    ].map(()=>CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("");
}
function tempDirPath(prefix) {
    let path85;
    do {
        path85 = prefix + randomName();
    }while (existsSync(path85))
    return path85;
}
function existsSync1(filePath) {
    try {
        Deno.lstatSync(filePath);
        return true;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}
function convertFlagAndModeToOptions(flag, mode) {
    if (!flag && !mode) return undefined;
    if (!flag && mode) return {
        mode
    };
    return {
        ...getOpenOptions(flag),
        mode
    };
}
function open(path86, flagsOrCallback, callbackOrMode, maybeCallback6) {
    const flags = typeof flagsOrCallback === "string" ? flagsOrCallback : undefined;
    const callback = typeof flagsOrCallback === "function" ? flagsOrCallback : typeof callbackOrMode === "function" ? callbackOrMode : maybeCallback6;
    const mode = typeof callbackOrMode === "number" ? callbackOrMode : undefined;
    path86 = path86 instanceof URL ? fromFileUrl5(path86) : path86;
    if (!callback) throw new Error("No callback function supplied");
    if ([
        "ax",
        "ax+",
        "wx",
        "wx+"
    ].includes(flags || "") && existsSync1(path86)) {
        const err = new Error(`EEXIST: file already exists, open '${path86}'`);
        callback(err);
    } else {
        if (flags === "as" || flags === "as+") {
            let err = null, res;
            try {
                res = openSync(path86, flags, mode);
            } catch (error29) {
                err = error29 instanceof Error ? error29 : new Error("[non-error thrown]");
            }
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
            return;
        }
        Deno.open(path86, convertFlagAndModeToOptions(flags, mode)).then((file)=>callback(null, file.rid)
        , (err)=>callback(err)
        );
    }
}
function openSync(path87, flagsOrMode, maybeMode) {
    const flags = typeof flagsOrMode === "string" ? flagsOrMode : undefined;
    const mode = typeof flagsOrMode === "number" ? flagsOrMode : maybeMode;
    path87 = path87 instanceof URL ? fromFileUrl5(path87) : path87;
    if ([
        "ax",
        "ax+",
        "wx",
        "wx+"
    ].includes(flags || "") && existsSync1(path87)) {
        throw new Error(`EEXIST: file already exists, open '${path87}'`);
    }
    return Deno.openSync(path87, convertFlagAndModeToOptions(flags, mode)).rid;
}
function read(fd, optOrBuffer, offsetOrCallback, length, position, callback) {
    let cb;
    let offset = 0, buffer;
    if (length == null) {
        length = 0;
    }
    if (typeof offsetOrCallback === "function") {
        cb = offsetOrCallback;
    } else if (typeof optOrBuffer === "function") {
        cb = optOrBuffer;
    } else {
        offset = offsetOrCallback;
        cb = callback;
    }
    if (!cb) throw new Error("No callback function supplied");
    if (optOrBuffer instanceof Buffer || optOrBuffer instanceof Uint8Array) {
        buffer = optOrBuffer;
    } else if (typeof optOrBuffer === "function") {
        offset = 0;
        buffer = Buffer.alloc(16384);
        length = buffer.byteLength;
        position = null;
    } else {
        const opt = optOrBuffer;
        offset = opt.offset ?? 0;
        buffer = opt.buffer ?? Buffer.alloc(16384);
        length = opt.length ?? buffer.byteLength;
        position = opt.position ?? null;
    }
    assert(offset >= 0, "offset should be greater or equal to 0");
    assert(offset + length <= buffer.byteLength, `buffer doesn't have enough data: byteLength = ${buffer.byteLength}, offset + length = ${offset + length}`);
    if (buffer.byteLength == 0) {
        throw new ERR_INVALID_ARG_VALUE("buffer", buffer, "is empty and cannot be written");
    }
    let err = null, numberOfBytesRead = null;
    if (position) {
        Deno.seekSync(fd, position, Deno.SeekMode.Current);
    }
    try {
        numberOfBytesRead = Deno.readSync(fd, buffer);
    } catch (error30) {
        err = error30 instanceof Error ? error30 : new Error("[non-error thrown]");
    }
    if (err) {
        callback(err);
    } else {
        const data15 = Buffer.from(buffer.buffer, offset, length);
        cb(null, numberOfBytesRead, data15);
    }
    return;
}
function readSync(fd, buffer, offsetOrOpt, length, position) {
    let offset = 0;
    if (length == null) {
        length = 0;
    }
    if (buffer.byteLength == 0) {
        throw new ERR_INVALID_ARG_VALUE("buffer", buffer, "is empty and cannot be written");
    }
    if (typeof offsetOrOpt === "number") {
        offset = offsetOrOpt;
    } else {
        const opt = offsetOrOpt;
        offset = opt.offset ?? 0;
        length = opt.length ?? buffer.byteLength;
        position = opt.position ?? null;
    }
    assert(offset >= 0, "offset should be greater or equal to 0");
    assert(offset + length <= buffer.byteLength, `buffer doesn't have enough data: byteLength = ${buffer.byteLength}, offset + length = ${offset + length}`);
    if (position) {
        Deno.seekSync(fd, position, Deno.SeekMode.Current);
    }
    const numberOfBytesRead = Deno.readSync(fd, buffer);
    return numberOfBytesRead ?? 0;
}
function asyncIterableToCallback(iter, callback, errCallback) {
    const iterator = iter[Symbol.asyncIterator]();
    function next() {
        iterator.next().then((obj)=>{
            if (obj.done) {
                callback(obj.value, true);
                return;
            }
            callback(obj.value);
            next();
        }, errCallback);
    }
    next();
}
function watch(filename, optionsOrListener, optionsOrListener2) {
    const listener2 = typeof optionsOrListener === "function" ? optionsOrListener : typeof optionsOrListener2 === "function" ? optionsOrListener2 : undefined;
    const options = typeof optionsOrListener === "object" ? optionsOrListener : typeof optionsOrListener2 === "object" ? optionsOrListener2 : undefined;
    filename = filename instanceof URL ? fromFileUrl5(filename) : filename;
    const iterator = Deno.watchFs(filename, {
        recursive: options?.recursive || false
    });
    if (!listener2) throw new Error("No callback function supplied");
    const fsWatcher = new FSWatcher(()=>{
        if (iterator.return) iterator.return();
    });
    fsWatcher.on("change", listener2);
    asyncIterableToCallback(iterator, (val, done)=>{
        if (done) return;
        fsWatcher.emit("change", val.kind, val.paths[0]);
    }, (e)=>{
        fsWatcher.emit("error", e);
    });
    return fsWatcher;
}
class FSWatcher extends EventEmitter {
    close;
    constructor(closer){
        super();
        this.close = closer;
    }
    ref() {
        notImplemented("FSWatcher.ref() is not implemented");
    }
    unref() {
        notImplemented("FSWatcher.unref() is not implemented");
    }
}
function toDirent(val) {
    return new Dirent1(val);
}
function readdir(path88, optionsOrCallback, maybeCallback7) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback7;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
    const result = [];
    path88 = getValidatedPath(path88);
    if (!callback) throw new Error("No callback function supplied");
    if (options?.encoding) {
        try {
            new TextDecoder(options.encoding);
        } catch  {
            throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
        }
    }
    try {
        asyncIterableToCallback(Deno.readDir(path88.toString()), (val, done)=>{
            if (typeof path88 !== "string") return;
            if (done) {
                callback(null, result);
                return;
            }
            if (options?.withFileTypes) {
                result.push(toDirent(val));
            } else result.push(decode4(val.name));
        }, (e)=>{
            callback(denoErrorToNodeError(e, {
                syscall: "readdir"
            }));
        });
    } catch (e) {
        callback(denoErrorToNodeError(e, {
            syscall: "readdir"
        }));
    }
}
function decode4(str, encoding) {
    if (!encoding) return str;
    else {
        const decoder = new TextDecoder(encoding);
        const encoder = new TextEncoder();
        return decoder.decode(encoder.encode(str));
    }
}
function readdirSync(path89, options) {
    const result = [];
    path89 = getValidatedPath(path89);
    if (options?.encoding) {
        try {
            new TextDecoder(options.encoding);
        } catch  {
            throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
        }
    }
    try {
        for (const file of Deno.readDirSync(path89.toString())){
            if (options?.withFileTypes) {
                result.push(toDirent(file));
            } else result.push(decode4(file.name));
        }
    } catch (e) {
        throw denoErrorToNodeError(e, {
            syscall: "readdir"
        });
    }
    return result;
}
function maybeDecode(data16, encoding) {
    const buffer = Buffer.from(data16.buffer, data16.byteOffset, data16.byteLength);
    if (encoding && encoding !== "binary") return buffer.toString(encoding);
    return buffer;
}
function readFile(path90, optOrCallback, callback) {
    path90 = path90 instanceof URL ? fromFileUrl5(path90) : path90;
    let cb;
    if (typeof optOrCallback === "function") {
        cb = optOrCallback;
    } else {
        cb = callback;
    }
    const encoding = getEncoding(optOrCallback);
    const p26 = Deno.readFile(path90);
    if (cb) {
        p26.then((data17)=>{
            if (encoding && encoding !== "binary") {
                const text = maybeDecode(data17, encoding);
                return cb(null, text);
            }
            const buffer = maybeDecode(data17, encoding);
            cb(null, buffer);
        }, (err)=>cb && cb(err)
        );
    }
}
function readFileSync(path91, opt) {
    path91 = path91 instanceof URL ? fromFileUrl5(path91) : path91;
    const data18 = Deno.readFileSync(path91);
    const encoding = getEncoding(opt);
    if (encoding && encoding !== "binary") {
        const text = maybeDecode(data18, encoding);
        return text;
    }
    const buffer = maybeDecode(data18, encoding);
    return buffer;
}
function maybeEncode(data19, encoding) {
    if (encoding === "buffer") {
        return new TextEncoder().encode(data19);
    }
    return data19;
}
function getEncoding1(optOrCallback) {
    if (!optOrCallback || typeof optOrCallback === "function") {
        return null;
    } else {
        if (optOrCallback.encoding) {
            if (optOrCallback.encoding === "utf8" || optOrCallback.encoding === "utf-8") {
                return "utf8";
            } else if (optOrCallback.encoding === "buffer") {
                return "buffer";
            } else {
                notImplemented(`fs.readlink encoding=${optOrCallback.encoding}`);
            }
        }
        return null;
    }
}
function readlink(path92, optOrCallback, callback) {
    path92 = path92 instanceof URL ? fromFileUrl5(path92) : path92;
    let cb;
    if (typeof optOrCallback === "function") {
        cb = optOrCallback;
    } else {
        cb = callback;
    }
    const encoding = getEncoding1(optOrCallback);
    intoCallbackAPIWithIntercept(Deno.readLink, (data20)=>maybeEncode(data20, encoding)
    , cb, path92);
}
function readlinkSync(path93, opt) {
    path93 = path93 instanceof URL ? fromFileUrl5(path93) : path93;
    return maybeEncode(Deno.readLinkSync(path93), getEncoding1(opt));
}
function realpath(path112, options, callback) {
    if (typeof options === "function") {
        callback = options;
    }
    if (!callback) {
        throw new Error("No callback function supplied");
    }
    Deno.realPath(path112).then((path94)=>callback(null, path94)
    , (err)=>callback(err)
    );
}
realpath.native = realpath;
function realpathSync(path95) {
    return Deno.realPathSync(path95);
}
realpathSync.native = realpathSync;
function rename(oldPath, newPath, callback) {
    oldPath = oldPath instanceof URL ? fromFileUrl5(oldPath) : oldPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    if (!callback) throw new Error("No callback function supplied");
    Deno.rename(oldPath, newPath).then((_)=>callback()
    , callback);
}
function renameSync(oldPath, newPath) {
    oldPath = oldPath instanceof URL ? fromFileUrl5(oldPath) : oldPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.renameSync(oldPath, newPath);
}
function rmdir(path96, optionsOrCallback, maybeCallback8) {
    path96 = toNamespacedPath5(getValidatedPath(path96));
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback8;
    const options1 = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
    if (!callback) throw new Error("No callback function supplied");
    if (options1?.recursive) {
        emitRecursiveRmdirWarning();
        validateRmOptions(path96, {
            ...options1,
            force: false
        }, true, (err, options)=>{
            if (err === false) {
                return callback(new ERR_FS_RMDIR_ENOTDIR(path96.toString()));
            }
            if (err) {
                return callback(err);
            }
            Deno.remove(path96, {
                recursive: options?.recursive
            }).then((_)=>callback()
            , callback);
        });
    } else {
        validateRmdirOptions(options1);
        Deno.remove(path96, {
            recursive: options1?.recursive
        }).then((_)=>callback()
        , (err)=>{
            callback(err instanceof Error ? denoErrorToNodeError(err, {
                syscall: "rmdir"
            }) : err);
        });
    }
}
function rmdirSync(path97, options) {
    path97 = getValidatedPath(path97);
    if (options?.recursive) {
        emitRecursiveRmdirWarning();
        options = validateRmOptionsSync(path97, {
            ...options,
            force: false
        }, true);
        if (options === false) {
            throw new ERR_FS_RMDIR_ENOTDIR(path97.toString());
        }
    } else {
        validateRmdirOptions(options);
    }
    try {
        Deno.removeSync(toNamespacedPath5(path97), {
            recursive: options?.recursive
        });
    } catch (err) {
        throw err instanceof Error ? denoErrorToNodeError(err, {
            syscall: "rmdir"
        }) : err;
    }
}
function rm(path98, optionsOrCallback, maybeCallback9) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback9;
    const options1 = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
    if (!callback) throw new Error("No callback function supplied");
    validateRmOptions(path98, options1, false, (err1, options)=>{
        if (err1) {
            return callback(err1);
        }
        Deno.remove(path98, {
            recursive: options?.recursive
        }).then((_)=>callback(null)
        , (err)=>{
            if (options?.force && err instanceof Deno.errors.NotFound) {
                callback(null);
            } else {
                callback(err instanceof Error ? denoErrorToNodeError(err, {
                    syscall: "rm"
                }) : err);
            }
        });
    });
}
function rmSync(path99, options) {
    options = validateRmOptionsSync(path99, options, false);
    try {
        Deno.removeSync(path99, {
            recursive: options?.recursive
        });
    } catch (err) {
        if (options?.force && err instanceof Deno.errors.NotFound) {
            return;
        }
        if (err instanceof Error) {
            throw denoErrorToNodeError(err, {
                syscall: "stat"
            });
        } else {
            throw err;
        }
    }
}
function symlink(target, path100, typeOrCallback, maybeCallback10) {
    target = target instanceof URL ? fromFileUrl5(target) : target;
    path100 = path100 instanceof URL ? fromFileUrl5(path100) : path100;
    const type47 = typeof typeOrCallback === "string" ? typeOrCallback : "file";
    const callback = typeof typeOrCallback === "function" ? typeOrCallback : maybeCallback10;
    if (!callback) throw new Error("No callback function supplied");
    Deno.symlink(target, path100, {
        type: type47
    }).then(()=>callback(null)
    , callback);
}
function symlinkSync(target, path101, type48) {
    target = target instanceof URL ? fromFileUrl5(target) : target;
    path101 = path101 instanceof URL ? fromFileUrl5(path101) : path101;
    type48 = type48 || "file";
    Deno.symlinkSync(target, path101, {
        type: type48
    });
}
function truncate(path102, lenOrCallback, maybeCallback11) {
    path102 = path102 instanceof URL ? fromFileUrl5(path102) : path102;
    const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
    const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback11;
    if (!callback) throw new Error("No callback function supplied");
    Deno.truncate(path102, len).then(()=>callback(null)
    , callback);
}
function truncateSync(path103, len) {
    path103 = path103 instanceof URL ? fromFileUrl5(path103) : path103;
    Deno.truncateSync(path103, len);
}
function unlink(path104, callback) {
    if (!callback) throw new Error("No callback function supplied");
    Deno.remove(path104).then((_)=>callback()
    , callback);
}
function unlinkSync(path105) {
    Deno.removeSync(path105);
}
function getValidTime1(time, name77) {
    if (typeof time === "string") {
        time = Number(time);
    }
    if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
        throw new Deno.errors.InvalidData(`invalid ${name77}, must not be infinity or NaN`);
    }
    return time;
}
function utimes(path106, atime, mtime, callback) {
    path106 = path106 instanceof URL ? fromFileUrl5(path106) : path106;
    if (!callback) {
        throw new Deno.errors.InvalidData("No callback function supplied");
    }
    atime = getValidTime1(atime, "atime");
    mtime = getValidTime1(mtime, "mtime");
    utime(path106, atime, mtime).then(()=>callback(null)
    , callback);
}
function utimesSync(path107, atime, mtime) {
    path107 = path107 instanceof URL ? fromFileUrl5(path107) : path107;
    atime = getValidTime1(atime, "atime");
    mtime = getValidTime1(mtime, "mtime");
    utimeSync(path107, atime, mtime);
}
function writeSync(fd1, buffer1, offset1, length1, position1) {
    fd1 = getValidatedFd(fd1);
    const innerWriteSync = (fd, buffer, offset, length, position)=>{
        if (buffer instanceof DataView) {
            buffer = new Uint8Array(buffer.buffer);
        }
        if (typeof position === "number") {
            Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        let currentOffset = offset;
        const end = offset + length;
        while(currentOffset - offset < length){
            currentOffset += Deno.writeSync(fd, buffer.subarray(currentOffset, end));
        }
        return currentOffset - offset;
    };
    if (isArrayBufferView(buffer1)) {
        if (position1 === undefined) {
            position1 = null;
        }
        if (offset1 == null) {
            offset1 = 0;
        } else {
            validateInteger(offset1, "offset", 0);
        }
        if (typeof length1 !== "number") {
            length1 = buffer1.byteLength - offset1;
        }
        validateOffsetLengthWrite(offset1, length1, buffer1.byteLength);
        return innerWriteSync(fd1, buffer1, offset1, length1, position1);
    }
    validateStringAfterArrayBufferView(buffer1, "buffer");
    validateEncoding(buffer1, length1);
    if (offset1 === undefined) {
        offset1 = null;
    }
    buffer1 = Buffer.from(buffer1, length1);
    return innerWriteSync(fd1, buffer1, 0, buffer1.length, position1);
}
function write(fd2, buffer2, offset2, length2, position2, callback) {
    fd2 = getValidatedFd(fd2);
    const innerWrite = async (fd, buffer, offset, length, position)=>{
        if (buffer instanceof DataView) {
            buffer = new Uint8Array(buffer.buffer);
        }
        if (typeof position === "number") {
            await Deno.seek(fd, position, Deno.SeekMode.Start);
        }
        let currentOffset = offset;
        const end = offset + length;
        while(currentOffset - offset < length){
            currentOffset += await Deno.write(fd, buffer.subarray(currentOffset, end));
        }
        return currentOffset - offset;
    };
    if (isArrayBufferView(buffer2)) {
        callback = maybeCallback(callback || position2 || length2 || offset2);
        if (offset2 == null || typeof offset2 === "function") {
            offset2 = 0;
        } else {
            validateInteger(offset2, "offset", 0);
        }
        if (typeof length2 !== "number") {
            length2 = buffer2.byteLength - offset2;
        }
        if (typeof position2 !== "number") {
            position2 = null;
        }
        validateOffsetLengthWrite(offset2, length2, buffer2.byteLength);
        innerWrite(fd2, buffer2, offset2, length2, position2).then((nwritten)=>{
            callback(null, nwritten, buffer2);
        }, (err)=>callback(err)
        );
        return;
    }
    validateStringAfterArrayBufferView(buffer2, "buffer");
    if (typeof position2 !== "function") {
        if (typeof offset2 === "function") {
            position2 = offset2;
            offset2 = null;
        } else {
            position2 = length2;
        }
        length2 = "utf-8";
    }
    const str = String(buffer2);
    validateEncoding(str, length2);
    callback = maybeCallback(position2);
    buffer2 = Buffer.from(str, length2);
    innerWrite(fd2, buffer2, 0, buffer2.length, offset2, callback).then((nwritten)=>{
        callback(null, nwritten, buffer2);
    }, (err)=>callback(err)
    );
}
function writev(fd1, buffers1, position1, callback) {
    const innerWritev = async (fd, buffers, position)=>{
        const chunks = [];
        for(let i167 = 0; i167 < buffers.length; i167++){
            if (Buffer.isBuffer(buffers[i167])) {
                chunks.push(buffers[i167]);
            } else {
                chunks.push(new Buffer(buffers[i167]));
            }
        }
        if (typeof position === "number") {
            await Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        const buffer = Buffer.concat(chunks);
        let currentOffset = 0;
        while(currentOffset < buffer.byteLength){
            currentOffset += await Deno.writeSync(fd, buffer.subarray(currentOffset));
        }
        return currentOffset - 0;
    };
    fd1 = getValidatedFd(fd1);
    validateBufferArray(buffers1);
    callback = maybeCallback(callback || position1);
    if (buffers1.length === 0) {
        process.nextTick(callback, null, 0, buffers1);
        return;
    }
    if (typeof position1 !== "number") position1 = null;
    innerWritev(fd1, buffers1, position1).then((nwritten)=>{
        callback(null, nwritten, buffers1);
    }, (err)=>callback(err)
    );
}
function writevSync(fd2, buffers2, position2) {
    const innerWritev = (fd, buffers, position)=>{
        const chunks = [];
        for(let i168 = 0; i168 < buffers.length; i168++){
            if (Buffer.isBuffer(buffers[i168])) {
                chunks.push(buffers[i168]);
            } else {
                chunks.push(new Buffer(buffers[i168]));
            }
        }
        if (typeof position === "number") {
            Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        const buffer = Buffer.concat(chunks);
        let currentOffset = 0;
        while(currentOffset < buffer.byteLength){
            currentOffset += Deno.writeSync(fd, buffer.subarray(currentOffset));
        }
        return currentOffset - 0;
    };
    fd2 = getValidatedFd(fd2);
    validateBufferArray(buffers2);
    if (buffers2.length === 0) {
        return 0;
    }
    if (typeof position2 !== "number") position2 = null;
    return innerWritev(fd2, buffers2, position2);
}
const kFs = Symbol("kFs");
const kIsPerformingIO = Symbol("kIsPerformingIO");
const kIoDone = Symbol("kIoDone");
class WriteStreamClass extends Writable {
    fd = null;
    path;
    flags;
    mode;
    bytesWritten = 0;
    pos = 0;
    [kFs] = {
        open,
        write
    };
    [kIsPerformingIO] = false;
    constructor(path108, opts = {}){
        super(opts);
        this.path = toPathIfFileURL(path108);
        this.flags = opts.flags || "w";
        this.mode = opts.mode || 0o666;
        this[kFs] = opts.fs ?? {
            open,
            write,
            close
        };
        if (opts.encoding) {
            this.setDefaultEncoding(opts.encoding);
        }
    }
    _construct(callback) {
        this[kFs].open(this.path.toString(), this.flags, this.mode, (err, fd)=>{
            if (err) {
                callback(err);
                return;
            }
            this.fd = fd;
            callback();
            this.emit("open", this.fd);
            this.emit("ready");
        });
    }
    _write(data21, _encoding, cb) {
        this[kIsPerformingIO] = true;
        this[kFs].write(this.fd, data21, 0, data21.length, this.pos, (er, bytes)=>{
            this[kIsPerformingIO] = false;
            if (this.destroyed) {
                cb(er);
                return this.emit(kIoDone, er);
            }
            if (er) {
                return cb(er);
            }
            this.bytesWritten += bytes;
            cb();
        });
        if (this.pos !== undefined) {
            this.pos += data21.length;
        }
    }
    _destroy(err, cb) {
        if (this[kIsPerformingIO]) {
            this.once(kIoDone, (er)=>closeStream(this, err || er, cb)
            );
        } else {
            closeStream(this, err, cb);
        }
    }
}
function closeStream(stream3, err, cb) {
    if (!stream3.fd) {
        cb(err);
    } else {
        stream3[kFs].close(stream3.fd, (er)=>{
            cb(er || err);
        });
        stream3.fd = null;
    }
}
function WriteStream(path109, opts) {
    return new WriteStreamClass(path109, opts);
}
WriteStream.prototype = WriteStreamClass.prototype;
function createWriteStream(path113, opts) {
    return new WriteStreamClass(path113, opts);
}
const { F_OK: F_OK2 , R_OK: R_OK2 , W_OK: W_OK2 , X_OK: X_OK2 ,  } = mod53;
const promises = {
    access: promisify(access),
    copyFile: promisify(copyFile),
    open: promisify(open),
    rename: promisify(rename),
    truncate: promisify(truncate),
    rm: promisify(rm),
    rmdir: promisify(rmdir),
    mkdir: promisify(mkdir),
    readdir: promisify(readdir),
    readlink: promisify(readlink),
    symlink: promisify(symlink),
    lstat: promisify(lstat),
    stat: promisify(stat),
    link: promisify(link),
    unlink: promisify(unlink),
    chmod: promisify(chmod),
    chown: promisify(chown),
    utimes: promisify(utimes),
    realpath: promisify(realpath),
    mkdtemp: promisify(mkdtemp),
    writeFile: promisify(writeFile),
    appendFile: promisify(appendFile),
    readFile: promisify(readFile),
    watch: promisify(watch)
};
const __default17 = {
    access,
    accessSync,
    appendFile,
    appendFileSync,
    chmod,
    chmodSync,
    chown,
    chownSync,
    close,
    closeSync,
    constants: mod53,
    copyFile,
    copyFileSync,
    createReadStream,
    createWriteStream,
    Dir,
    Dirent: Dirent1,
    exists,
    existsSync,
    F_OK: F_OK2,
    fdatasync,
    fdatasyncSync,
    fstat,
    fstatSync,
    fsync,
    fsyncSync,
    ftruncate,
    ftruncateSync,
    futimes,
    futimesSync,
    link,
    linkSync,
    lstat,
    lstatSync,
    mkdir,
    mkdirSync,
    mkdtemp,
    mkdtempSync,
    open,
    openSync,
    read,
    readSync,
    promises,
    R_OK: R_OK2,
    readdir,
    readdirSync,
    readFile,
    readFileSync,
    readlink,
    readlinkSync,
    realpath,
    realpathSync,
    rename,
    renameSync,
    rmdir,
    rmdirSync,
    rm,
    rmSync,
    stat,
    Stats,
    statSync,
    symlink,
    symlinkSync,
    truncate,
    truncateSync,
    unlink,
    unlinkSync,
    utimes,
    utimesSync,
    W_OK: W_OK2,
    watch,
    watchFile: watch,
    write,
    writeFile,
    writev,
    writevSync,
    writeFileSync,
    WriteStream,
    writeSync,
    X_OK: X_OK2
};
var EOL;
(function(EOL2) {
    EOL2["LF"] = "\n";
    EOL2["CRLF"] = "\r\n";
})(EOL || (EOL = {}));
const SEE_GITHUB_ISSUE = "See https://github.com/denoland/deno_std/issues/1436";
function arch1() {
    return process1.arch;
}
arch1[Symbol.toPrimitive] = ()=>process1.arch
;
endianness[Symbol.toPrimitive] = ()=>endianness()
;
freemem[Symbol.toPrimitive] = ()=>freemem()
;
homedir[Symbol.toPrimitive] = ()=>homedir()
;
hostname1[Symbol.toPrimitive] = ()=>hostname1()
;
platform1[Symbol.toPrimitive] = ()=>platform1()
;
release[Symbol.toPrimitive] = ()=>release()
;
totalmem[Symbol.toPrimitive] = ()=>totalmem()
;
type[Symbol.toPrimitive] = ()=>type()
;
uptime[Symbol.toPrimitive] = ()=>uptime()
;
function cpus() {
    return Array.from(Array(navigator.hardwareConcurrency)).map(()=>{
        return {
            model: "",
            speed: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        };
    });
}
function endianness() {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
}
function freemem() {
    return systemMemoryInfo().free;
}
function getPriority(pid2 = 0) {
    validateIntegerRange(pid2, "pid");
    notImplemented(SEE_GITHUB_ISSUE);
}
function homedir() {
    switch(osType){
        case "windows":
            return Deno.env.get("USERPROFILE") || null;
        case "linux":
        case "darwin":
            return Deno.env.get("HOME") || null;
        default:
            throw Error("unreachable");
    }
}
function hostname1() {
    return hostname();
}
function loadavg1() {
    if (isWindows) {
        return [
            0,
            0,
            0
        ];
    }
    return loadavg();
}
function networkInterfaces1() {
    const interfaces = {};
    for (const { name: name78 , address: address6 , netmask , family , mac , scopeid , cidr  } of networkInterfaces()){
        const addresses = interfaces[name78] ||= [];
        const networkAddress = {
            address: address6,
            netmask,
            family,
            mac,
            internal: family === "IPv4" && isIPv4LoopbackAddr(address6) || family === "IPv6" && isIPv6LoopbackAddr(address6),
            cidr
        };
        if (family === "IPv6") {
            networkAddress.scopeid = scopeid;
        }
        addresses.push(networkAddress);
    }
    return interfaces;
}
function isIPv4LoopbackAddr(addr) {
    return addr.startsWith("127");
}
function isIPv6LoopbackAddr(addr) {
    return addr === "::1" || addr === "fe80::1";
}
function platform1() {
    return process1.platform;
}
function release() {
    return osRelease();
}
function setPriority(pid3, priority) {
    if (priority === undefined) {
        priority = pid3;
        pid3 = 0;
    }
    validateIntegerRange(pid3, "pid");
    validateIntegerRange(priority, "priority", -20, 19);
    notImplemented(SEE_GITHUB_ISSUE);
}
function tmpdir() {
    if (isWindows) {
        const temp = Deno.env.get("TEMP") || Deno.env.get("TMP");
        if (temp) {
            return temp.replace(/(?<!:)[/\\]*$/, "");
        }
        const base10 = Deno.env.get("SYSTEMROOT") || Deno.env.get("WINDIR");
        if (base10) {
            return base10 + "\\temp";
        }
        return null;
    } else {
        const temp = Deno.env.get("TMPDIR") || Deno.env.get("TMP") || Deno.env.get("TEMP") || "/tmp";
        return temp.replace(/(?<!^)\/*$/, "");
    }
}
function totalmem() {
    return systemMemoryInfo().total;
}
function type() {
    switch(Deno.build.os){
        case "windows":
            return "Windows_NT";
        case "linux":
            return "Linux";
        case "darwin":
            return "Darwin";
        default:
            throw Error("unreachable");
    }
}
function uptime() {
    notImplemented(SEE_GITHUB_ISSUE);
}
function userInfo(options = {
    encoding: "utf-8"
}) {
    notImplemented(SEE_GITHUB_ISSUE);
}
const constants4 = {
    dlopen: {},
    errno: {},
    signals: {
        "SIGABRT": "SIGABRT",
        "SIGALRM": "SIGALRM",
        "SIGBUS": "SIGBUS",
        "SIGCHLD": "SIGCHLD",
        "SIGCONT": "SIGCONT",
        "SIGEMT": "SIGEMT",
        "SIGFPE": "SIGFPE",
        "SIGHUP": "SIGHUP",
        "SIGILL": "SIGILL",
        "SIGINFO": "SIGINFO",
        "SIGINT": "SIGINT",
        "SIGIO": "SIGIO",
        "SIGKILL": "SIGKILL",
        "SIGPIPE": "SIGPIPE",
        "SIGPROF": "SIGPROF",
        "SIGPWR": "SIGPWR",
        "SIGQUIT": "SIGQUIT",
        "SIGSEGV": "SIGSEGV",
        "SIGSTKFLT": "SIGSTKFLT",
        "SIGSTOP": "SIGSTOP",
        "SIGSYS": "SIGSYS",
        "SIGTERM": "SIGTERM",
        "SIGTRAP": "SIGTRAP",
        "SIGTSTP": "SIGTSTP",
        "SIGTTIN": "SIGTTIN",
        "SIGTTOU": "SIGTTOU",
        "SIGURG": "SIGURG",
        "SIGUSR1": "SIGUSR1",
        "SIGUSR2": "SIGUSR2",
        "SIGVTALRM": "SIGVTALRM",
        "SIGWINCH": "SIGWINCH",
        "SIGXCPU": "SIGXCPU",
        "SIGXFSZ": "SIGXFSZ"
    },
    priority: {}
};
const EOL1 = isWindows ? EOL.CRLF : EOL.LF;
const devNull = isWindows ? "\\\\.\\nul" : "/dev/null";
const __default18 = {
    arch: arch1,
    cpus,
    endianness,
    freemem,
    getPriority,
    homedir,
    hostname: hostname1,
    loadavg: loadavg1,
    networkInterfaces: networkInterfaces1,
    platform: platform1,
    release,
    setPriority,
    tmpdir,
    totalmem,
    type,
    uptime,
    userInfo,
    constants: constants4,
    EOL: EOL1,
    devNull
};
var te2 = Object.create;
var D2 = Object.defineProperty;
var ne1 = Object.getOwnPropertyDescriptor;
var re1 = Object.getOwnPropertyNames;
var ie = Object.getPrototypeOf, se = Object.prototype.hasOwnProperty;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (t, n)=>(typeof require != "undefined" ? require : t)[n]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var v1 = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports)
;
var oe2 = (e, t, n, r)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let s of re1(t))!se.call(e, s) && s !== n && D2(e, s, {
        get: ()=>t[s]
        ,
        enumerable: !(r = ne1(t, s)) || r.enumerable
    });
    return e;
};
var U1 = (e, t, n)=>(n = e != null ? te2(ie(e)) : {}, oe2(t || !e || !e.__esModule ? D2(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e))
;
var E3 = v1((b17)=>{
    "use strict";
    Object.defineProperty(b17, "__esModule", {
        value: !0
    });
    b17.toCommandProperties = b17.toCommandValue = void 0;
    function ue1(e) {
        return e == null ? "" : typeof e == "string" || e instanceof String ? e : JSON.stringify(e);
    }
    b17.toCommandValue = ue1;
    function ae1(e) {
        return Object.keys(e).length ? {
            title: e.title,
            file: e.file,
            line: e.startLine,
            endLine: e.endLine,
            col: e.startColumn,
            endColumn: e.endColumn
        } : {};
    }
    b17.toCommandProperties = ae1;
});
var V = v1((f)=>{
    "use strict";
    var ce1 = f && f.__createBinding || (Object.create ? function(e, t, n, r) {
        r === void 0 && (r = n), Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[n];
            }
        });
    } : function(e, t, n, r) {
        r === void 0 && (r = n), e[r] = t[n];
    }), de1 = f && f.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        });
    } : function(e, t) {
        e.default = t;
    }), le1 = f && f.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) for(var n in e)n !== "default" && Object.hasOwnProperty.call(e, n) && ce1(t, e, n);
        return de1(t, e), t;
    };
    Object.defineProperty(f, "__esModule", {
        value: !0
    });
    f.issue = f.issueCommand = void 0;
    var fe1 = le1(__default18), L2 = E3();
    function A7(e, t, n) {
        let r = new T3(e, t, n);
        process1.stdout.write(r.toString() + fe1.EOL);
    }
    f.issueCommand = A7;
    function he1(e, t = "") {
        A7(e, {}, t);
    }
    f.issue = he1;
    var P3 = "::", T3 = class {
        constructor(t, n, r){
            t || (t = "missing.command"), this.command = t, this.properties = n, this.message = r;
        }
        toString() {
            let t = P3 + this.command;
            if (this.properties && Object.keys(this.properties).length > 0) {
                t += " ";
                let n = !0;
                for(let r in this.properties)if (this.properties.hasOwnProperty(r)) {
                    let s = this.properties[r];
                    s && (n ? n = !1 : t += ",", t += `${r}=${pe1(s)}`);
                }
            }
            return t += `${P3}${me(this.message)}`, t;
        }
    };
    function me(e) {
        return L2.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function pe1(e) {
        return L2.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
});
var N1 = v1((m)=>{
    "use strict";
    var _e = m && m.__createBinding || (Object.create ? function(e, t, n, r) {
        r === void 0 && (r = n), Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[n];
            }
        });
    } : function(e, t, n, r) {
        r === void 0 && (r = n), e[r] = t[n];
    }), we = m && m.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        });
    } : function(e, t) {
        e.default = t;
    }), B7 = m && m.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) for(var n in e)n !== "default" && Object.hasOwnProperty.call(e, n) && _e(t, e, n);
        return we(t, e), t;
    };
    Object.defineProperty(m, "__esModule", {
        value: !0
    });
    m.issueCommand = void 0;
    var q5 = B7(__default17), ge = B7(__default18), ve = E3();
    function be(e, t) {
        let n = process1.env[`GITHUB_${e}`];
        if (!n) throw new Error(`Unable to find environment variable for file command ${e}`);
        if (!q5.existsSync(n)) throw new Error(`Missing file at path: ${n}`);
        q5.appendFileSync(n, `${ve.toCommandValue(t)}${ge.EOL}`, {
            encoding: "utf8"
        });
    }
    m.issueCommand = be;
});
var H1 = v1((O3)=>{
    "use strict";
    var F4 = O3 && O3.__awaiter || function(e, t, n, r) {
        function s(o) {
            return o instanceof n ? o : new n(function(u) {
                u(o);
            });
        }
        return new (n || (n = Promise))(function(o, u) {
            function p27(a) {
                try {
                    c(r.next(a));
                } catch (l) {
                    u(l);
                }
            }
            function g(a) {
                try {
                    c(r.throw(a));
                } catch (l) {
                    u(l);
                }
            }
            function c(a) {
                a.done ? o(a.value) : s(a.value).then(p27, g);
            }
            c((r = r.apply(e, t || [])).next());
        });
    };
    Object.defineProperty(O3, "__esModule", {
        value: !0
    });
    O3.OidcClient = void 0;
    var Oe = de, Ee = O, G2 = y2(), w20 = class {
        static createHttpClient(t = !0, n = 10) {
            let r = {
                allowRetries: t,
                maxRetries: n
            };
            return new Oe.HttpClient("actions/oidc-client", [
                new Ee.BearerCredentialHandler(w20.getRequestToken())
            ], r);
        }
        static getRequestToken() {
            let t = process1.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
            if (!t) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
            return t;
        }
        static getIDTokenUrl() {
            let t = process1.env.ACTIONS_ID_TOKEN_REQUEST_URL;
            if (!t) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
            return t;
        }
        static getCall(t) {
            var n;
            return F4(this, void 0, void 0, function*() {
                let o = (n = (yield w20.createHttpClient().getJson(t).catch((u)=>{
                    throw new Error(`Failed to get ID Token. 
 
        Error Code : ${u.statusCode}
 
        Error Message: ${u.result.message}`);
                })).result) === null || n === void 0 ? void 0 : n.value;
                if (!o) throw new Error("Response json body do not have ID Token field");
                return o;
            });
        }
        static getIDToken(t) {
            return F4(this, void 0, void 0, function*() {
                try {
                    let n = w20.getIDTokenUrl();
                    if (t) {
                        let s = encodeURIComponent(t);
                        n = `${n}&audience=${s}`;
                    }
                    G2.debug(`ID token url is ${n}`);
                    let r = yield w20.getCall(n);
                    return G2.setSecret(r), r;
                } catch (n) {
                    throw new Error(`Error message: ${n.message}`);
                }
            });
        }
    };
    O3.OidcClient = w20;
});
var j2 = v1((d)=>{
    "use strict";
    var $3 = d && d.__awaiter || function(e, t, n, r) {
        function s(o) {
            return o instanceof n ? o : new n(function(u) {
                u(o);
            });
        }
        return new (n || (n = Promise))(function(o, u) {
            function p28(a) {
                try {
                    c(r.next(a));
                } catch (l) {
                    u(l);
                }
            }
            function g(a) {
                try {
                    c(r.throw(a));
                } catch (l) {
                    u(l);
                }
            }
            function c(a) {
                a.done ? o(a.value) : s(a.value).then(p28, g);
            }
            c((r = r.apply(e, t || [])).next());
        });
    };
    Object.defineProperty(d, "__esModule", {
        value: !0
    });
    d.summary = d.markdownSummary = d.SUMMARY_DOCS_URL = d.SUMMARY_ENV_VAR = void 0;
    var ye = __default18, R2 = __default17, { access: Ce , appendFile: Se , writeFile: Te  } = R2.promises;
    d.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    d.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var I2 = class {
        constructor(){
            this._buffer = "";
        }
        filePath() {
            return $3(this, void 0, void 0, function*() {
                if (this._filePath) return this._filePath;
                let t = process1.env[d.SUMMARY_ENV_VAR];
                if (!t) throw new Error(`Unable to find environment variable for $${d.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
                try {
                    yield Ce(t, R2.constants.R_OK | R2.constants.W_OK);
                } catch  {
                    throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`);
                }
                return this._filePath = t, this._filePath;
            });
        }
        wrap(t, n, r = {}) {
            let s = Object.entries(r).map(([o, u])=>` ${o}="${u}"`
            ).join("");
            return n ? `<${t}${s}>${n}</${t}>` : `<${t}${s}>`;
        }
        write(t) {
            return $3(this, void 0, void 0, function*() {
                let n = !!t?.overwrite, r = yield this.filePath();
                return yield (n ? Te : Se)(r, this._buffer, {
                    encoding: "utf8"
                }), this.emptyBuffer();
            });
        }
        clear() {
            return $3(this, void 0, void 0, function*() {
                return this.emptyBuffer().write({
                    overwrite: !0
                });
            });
        }
        stringify() {
            return this._buffer;
        }
        isEmptyBuffer() {
            return this._buffer.length === 0;
        }
        emptyBuffer() {
            return this._buffer = "", this;
        }
        addRaw(t, n = !1) {
            return this._buffer += t, n ? this.addEOL() : this;
        }
        addEOL() {
            return this.addRaw(ye.EOL);
        }
        addCodeBlock(t, n) {
            let r = Object.assign({}, n && {
                lang: n
            }), s = this.wrap("pre", this.wrap("code", t), r);
            return this.addRaw(s).addEOL();
        }
        addList(t, n = !1) {
            let r = n ? "ol" : "ul", s = t.map((u)=>this.wrap("li", u)
            ).join(""), o = this.wrap(r, s);
            return this.addRaw(o).addEOL();
        }
        addTable(t) {
            let n = t.map((s)=>{
                let o = s.map((u)=>{
                    if (typeof u == "string") return this.wrap("td", u);
                    let { header: p29 , data: g , colspan: c , rowspan: a  } = u, l = p29 ? "th" : "td", ee3 = Object.assign(Object.assign({}, c && {
                        colspan: c
                    }), a && {
                        rowspan: a
                    });
                    return this.wrap(l, g, ee3);
                }).join("");
                return this.wrap("tr", o);
            }).join(""), r = this.wrap("table", n);
            return this.addRaw(r).addEOL();
        }
        addDetails(t, n) {
            let r = this.wrap("details", this.wrap("summary", t) + n);
            return this.addRaw(r).addEOL();
        }
        addImage(t, n, r) {
            let { width: s , height: o  } = r || {}, u = Object.assign(Object.assign({}, s && {
                width: s
            }), o && {
                height: o
            }), p30 = this.wrap("img", null, Object.assign({
                src: t,
                alt: n
            }, u));
            return this.addRaw(p30).addEOL();
        }
        addHeading(t, n) {
            let r = `h${n}`, s = [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6"
            ].includes(r) ? r : "h1", o = this.wrap(s, t);
            return this.addRaw(o).addEOL();
        }
        addSeparator() {
            let t = this.wrap("hr", null);
            return this.addRaw(t).addEOL();
        }
        addBreak() {
            let t = this.wrap("br", null);
            return this.addRaw(t).addEOL();
        }
        addQuote(t, n) {
            let r = Object.assign({}, n && {
                cite: n
            }), s = this.wrap("blockquote", t, r);
            return this.addRaw(s).addEOL();
        }
        addLink(t, n) {
            let r = this.wrap("a", t, {
                href: n
            });
            return this.addRaw(r).addEOL();
        }
    }, k16 = new I2;
    d.markdownSummary = k16;
    d.summary = k16;
});
var y2 = v1((i169)=>{
    "use strict";
    var $e = i169 && i169.__createBinding || (Object.create ? function(e, t, n, r) {
        r === void 0 && (r = n), Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[n];
            }
        });
    } : function(e, t, n, r) {
        r === void 0 && (r = n), e[r] = t[n];
    }), Re = i169 && i169.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        });
    } : function(e, t) {
        e.default = t;
    }), K = i169 && i169.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) for(var n in e)n !== "default" && Object.hasOwnProperty.call(e, n) && $e(t, e, n);
        return Re(t, e), t;
    }, Y2 = i169 && i169.__awaiter || function(e, t, n, r) {
        function s(o) {
            return o instanceof n ? o : new n(function(u) {
                u(o);
            });
        }
        return new (n || (n = Promise))(function(o, u) {
            function p31(a) {
                try {
                    c(r.next(a));
                } catch (l) {
                    u(l);
                }
            }
            function g(a) {
                try {
                    c(r.throw(a));
                } catch (l) {
                    u(l);
                }
            }
            function c(a) {
                a.done ? o(a.value) : s(a.value).then(p31, g);
            }
            c((r = r.apply(e, t || [])).next());
        });
    };
    Object.defineProperty(i169, "__esModule", {
        value: !0
    });
    i169.getIDToken = i169.getState = i169.saveState = i169.group = i169.endGroup = i169.startGroup = i169.info = i169.notice = i169.warning = i169.error = i169.debug = i169.isDebug = i169.setFailed = i169.setCommandEcho = i169.setOutput = i169.getBooleanInput = i169.getMultilineInput = i169.getInput = i169.addPath = i169.setSecret = i169.exportVariable = i169.ExitCode = void 0;
    var h = V(), Q = N1(), S3 = E3(), C3 = K(__default18), Ie = K(__default10), je = H1(), J2;
    (function(e) {
        e[e.Success = 0] = "Success", e[e.Failure = 1] = "Failure";
    })(J2 = i169.ExitCode || (i169.ExitCode = {}));
    function Me(e, t) {
        let n = S3.toCommandValue(t);
        if (process1.env[e] = n, process1.env.GITHUB_ENV || "") {
            let s = "_GitHubActionsFileCommandDelimeter_", o = `${e}<<${s}${C3.EOL}${n}${C3.EOL}${s}`;
            Q.issueCommand("ENV", o);
        } else h.issueCommand("set-env", {
            name: e
        }, n);
    }
    i169.exportVariable = Me;
    function De(e) {
        h.issueCommand("add-mask", {}, e);
    }
    i169.setSecret = De;
    function Ue(e) {
        process1.env.GITHUB_PATH || "" ? Q.issueCommand("PATH", e) : h.issueCommand("add-path", {}, e), process1.env.PATH = `${e}${Ie.delimiter}${process1.env.PATH}`;
    }
    i169.addPath = Ue;
    function M6(e, t) {
        let n = process1.env[`INPUT_${e.replace(/ /g, "_").toUpperCase()}`] || "";
        if (t && t.required && !n) throw new Error(`Input required and not supplied: ${e}`);
        return t && t.trimWhitespace === !1 ? n : n.trim();
    }
    i169.getInput = M6;
    function Pe(e, t) {
        return M6(e, t).split(`
`).filter((r)=>r !== ""
        );
    }
    i169.getMultilineInput = Pe;
    function Le(e, t) {
        let n = [
            "true",
            "True",
            "TRUE"
        ], r = [
            "false",
            "False",
            "FALSE"
        ], s = M6(e, t);
        if (n.includes(s)) return !0;
        if (r.includes(s)) return !1;
        throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    i169.getBooleanInput = Le;
    function Ae(e, t) {
        process1.stdout.write(C3.EOL), h.issueCommand("set-output", {
            name: e
        }, t);
    }
    i169.setOutput = Ae;
    function Ve(e) {
        h.issue("echo", e ? "on" : "off");
    }
    i169.setCommandEcho = Ve;
    function qe(e) {
        process1.exitCode = J2.Failure, W(e);
    }
    i169.setFailed = qe;
    function Be() {
        return process1.env.RUNNER_DEBUG === "1";
    }
    i169.isDebug = Be;
    function Ne(e) {
        h.issueCommand("debug", {}, e);
    }
    i169.debug = Ne;
    function W(e, t = {}) {
        h.issueCommand("error", S3.toCommandProperties(t), e instanceof Error ? e.toString() : e);
    }
    i169.error = W;
    function Fe(e, t = {}) {
        h.issueCommand("warning", S3.toCommandProperties(t), e instanceof Error ? e.toString() : e);
    }
    i169.warning = Fe;
    function Ge(e, t = {}) {
        h.issueCommand("notice", S3.toCommandProperties(t), e instanceof Error ? e.toString() : e);
    }
    i169.notice = Ge;
    function He(e) {
        process1.stdout.write(e + C3.EOL);
    }
    i169.info = He;
    function z3(e) {
        h.issue("group", e);
    }
    i169.startGroup = z3;
    function X() {
        h.issue("endgroup");
    }
    i169.endGroup = X;
    function ke(e, t) {
        return Y2(this, void 0, void 0, function*() {
            z3(e);
            let n;
            try {
                n = yield t();
            } finally{
                X();
            }
            return n;
        });
    }
    i169.group = ke;
    function Ke(e, t) {
        h.issueCommand("save-state", {
            name: e
        }, t);
    }
    i169.saveState = Ke;
    function Ye(e) {
        return process1.env[`STATE_${e}`] || "";
    }
    i169.getState = Ye;
    function Qe(e) {
        return Y2(this, void 0, void 0, function*() {
            return yield je.OidcClient.getIDToken(e);
        });
    }
    i169.getIDToken = Qe;
    var Je = j2();
    Object.defineProperty(i169, "summary", {
        enumerable: !0,
        get: function() {
            return Je.summary;
        }
    });
    var We = j2();
    Object.defineProperty(i169, "markdownSummary", {
        enumerable: !0,
        get: function() {
            return We.markdownSummary;
        }
    });
});
var Z1 = U1(y2()), x = U1(y2()), { __esModule: st , getIDToken: ot , ExitCode: ut , exportVariable: at , setSecret: ct , addPath: dt , getInput: lt , getMultilineInput: ft , getBooleanInput: ht , setOutput: mt , setCommandEcho: pt , setFailed: _t , isDebug: wt , debug: gt , error: vt , warning: bt , notice: Ot , info: Et , startGroup: yt , endGroup: Ct , group: St , saveState: Tt , getState: $t , summary: Rt , markdownSummary: It  } = x, { default: ze , ...Xe } = x, jt = (Z1.default ?? ze) ?? Xe;
const timeFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
});
const formatTime = (time)=>timeFormatter.format(time)
;
const formatString = (str)=>str.trim().replace(/\n/g, "<br />")
;
const formatSuccess = (success)=>success ? "✅ Pass" : "❌ Fail"
;
const formatFailure = (failure)=>failure ? failure.trim().replace(/\n/g, "<br />") : "N/A"
;
function makeSummaryTable({ time , success , threads , testCount  }) {
    Rt.addHeading("Summary", 3).addTable([
        [
            {
                data: "Success",
                header: true
            },
            {
                data: "Time (seconds)",
                header: true
            },
            {
                data: "Threads",
                header: true
            },
            {
                data: "Test Count",
                header: true
            }, 
        ],
        [
            formatSuccess(success),
            formatTime(time),
            threads.toString(),
            testCount.toString(), 
        ], 
    ]);
}
function makeResultsTable(results) {
    Rt.addHeading("Results", 3).addTable([
        [
            {
                data: "Name",
                header: true
            },
            {
                data: "Success",
                header: true
            },
            {
                data: "Time (seconds)",
                header: true
            },
            {
                data: "Summary",
                header: true
            },
            {
                data: "Description",
                header: true
            },
            {
                data: "Failure Reason",
                header: true
            }, 
        ],
        ...results.map(({ name: name79 , success , failure , description , summary , time  })=>[
                name79,
                formatSuccess(success),
                formatTime(time),
                formatString(summary),
                formatString(description),
                formatFailure(failure), 
            ]
        ), 
    ]);
}
function populate_summary(tasty_json_filepath) {
    try {
        const data22 = Deno.readTextFileSync(tasty_json_filepath);
        const testResults = JSON.parse(data22);
        makeSummaryTable(testResults);
        makeResultsTable(testResults.results);
        return Rt.stringify();
    } catch (error31) {
        if (error31 instanceof Deno.errors.NotFound) {
            error31.message = `File not found: ${tasty_json_filepath}`;
        }
        throw error31;
    }
}
async function run1() {
    try {
        const tasty_json_filepath = lt("tasty_json_filepath");
        if (tasty_json_filepath === "") {
            throw new TypeError("tasty_json_filepath is required");
        }
        const markdown_filepath = lt("markdown_filepath");
        const markdownOutput = populate_summary(tasty_json_filepath);
        if (markdown_filepath !== "") {
            await Deno.writeTextFile(markdown_filepath, markdownOutput);
        }
        return await Rt.write({
            overwrite: true
        });
    } catch (error32) {
        if (error32 instanceof Error) _t(error32.message);
    }
}
await run1();
export { timeFormatter as timeFormatter };
export { formatTime as formatTime };
export { formatString as formatString };
export { formatSuccess as formatSuccess };
export { formatFailure as formatFailure };
export { makeSummaryTable as makeSummaryTable };
export { makeResultsTable as makeResultsTable };
export { populate_summary as populate_summary };
