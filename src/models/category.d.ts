// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
    data: WelcomeData;
    meta: Meta;
}

export interface WelcomeData {
    id:         number;
    attributes: PurpleAttributes;
}

export interface PurpleAttributes {
    Title:       string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    slug:        string;
    posts:       Posts;
}

export interface Posts {
    data: Datum[];
}

export interface Datum {
    id:         number;
    attributes: DatumAttributes;
}

export interface DatumAttributes {
    title:       string;
    description: string;
    content:     string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    slug:        string;
    cover:       Cover;
}

export interface Cover {
    data: CoverData;
}

export interface CoverData {
    id:         number;
    attributes: FluffyAttributes;
}

export interface FluffyAttributes {
    name:              string;
    alternativeText:   string;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Formats {
    thumbnail: Medium;
    small:     Medium;
    medium:    Medium;
}

export interface Medium {
    name:   string;
    hash:   string;
    ext:    string;
    mime:   string;
    path:   null;
    width:  number;
    height: number;
    size:   number;
    url:    string;
}

export interface Meta {
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): Welcome {
        return cast(JSON.parse(json), r("Welcome"));
    }

    public static welcomeToJson(value: Welcome): string {
        return JSON.stringify(uncast(value, r("Welcome")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "data", js: "data", typ: r("WelcomeData") },
        { json: "meta", js: "meta", typ: r("Meta") },
    ], false),
    "WelcomeData": o([
        { json: "id", js: "id", typ: 0 },
        { json: "attributes", js: "attributes", typ: r("PurpleAttributes") },
    ], false),
    "PurpleAttributes": o([
        { json: "Title", js: "Title", typ: "" },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "publishedAt", js: "publishedAt", typ: Date },
        { json: "slug", js: "slug", typ: "" },
        { json: "posts", js: "posts", typ: r("Posts") },
    ], false),
    "Posts": o([
        { json: "data", js: "data", typ: a(r("Datum")) },
    ], false),
    "Datum": o([
        { json: "id", js: "id", typ: 0 },
        { json: "attributes", js: "attributes", typ: r("DatumAttributes") },
    ], false),
    "DatumAttributes": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "content", js: "content", typ: "" },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "publishedAt", js: "publishedAt", typ: Date },
        { json: "slug", js: "slug", typ: "" },
        { json: "cover", js: "cover", typ: r("Cover") },
    ], false),
    "Cover": o([
        { json: "data", js: "data", typ: r("CoverData") },
    ], false),
    "CoverData": o([
        { json: "id", js: "id", typ: 0 },
        { json: "attributes", js: "attributes", typ: r("FluffyAttributes") },
    ], false),
    "FluffyAttributes": o([
        { json: "name", js: "name", typ: "" },
        { json: "alternativeText", js: "alternativeText", typ: "" },
        { json: "caption", js: "caption", typ: null },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "formats", js: "formats", typ: r("Formats") },
        { json: "hash", js: "hash", typ: "" },
        { json: "ext", js: "ext", typ: "" },
        { json: "mime", js: "mime", typ: "" },
        { json: "size", js: "size", typ: 3.14 },
        { json: "url", js: "url", typ: "" },
        { json: "previewUrl", js: "previewUrl", typ: null },
        { json: "provider", js: "provider", typ: "" },
        { json: "provider_metadata", js: "provider_metadata", typ: null },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
    ], false),
    "Formats": o([
        { json: "thumbnail", js: "thumbnail", typ: r("Medium") },
        { json: "small", js: "small", typ: r("Medium") },
        { json: "medium", js: "medium", typ: r("Medium") },
    ], false),
    "Medium": o([
        { json: "name", js: "name", typ: "" },
        { json: "hash", js: "hash", typ: "" },
        { json: "ext", js: "ext", typ: "" },
        { json: "mime", js: "mime", typ: "" },
        { json: "path", js: "path", typ: null },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "size", js: "size", typ: 3.14 },
        { json: "url", js: "url", typ: "" },
    ], false),
    "Meta": o([
    ], false),
};
