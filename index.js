import {brotliCompressSync , brotliDecompressSync} from 'node:zlib';
import * as safe64 from 'urlsafe-base64';


export function gc_encode(gc_script) {
    let result = JSON.stringify(JSON.parse(gc_script));
    let buffer = brotliCompressSync(result);
    let safe_url = safe64.encode(buffer);
    return safe_url
}


export function gc_decode(url_string) {
    let result = safe64.decode(url_string);
    let json_data = brotliDecompressSync(result).toString('utf8');
    return json_data
}

