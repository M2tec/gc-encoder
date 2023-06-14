import {brotliCompressSync , brotliDecompressSync} from 'node:zlib';
import * as safe64 from 'urlsafe-base64';

export function gc_encode(gc_script) {
    let result = JSON.stringify(JSON.parse(gc_script));
    result = brotliCompressSync(result);
    result = safe64.encode(result)
    return result
}


export function gc_decode(url_string) {
    let result = safe64.decode(url_string);
    result = brotliDecompressSync(result).toString('utf8')
    return result
}

