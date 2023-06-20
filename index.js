import {brotliCompressSync , brotliDecompressSync} from 'node:zlib';
import * as safe64 from 'urlsafe-base64';
import QRCode from 'easyqrcodejs-nodejs';


export function gc_encode(gc_script) {
    let result = JSON.stringify(JSON.parse(gc_script));
    let buffer = brotliCompressSync(result);
    let url_safe_script = safe64.encode(buffer);
    return url_safe_script
}


export function gc_decode(url_string) {
    let result = safe64.decode(url_string);
    let json_data = brotliDecompressSync(result).toString('utf8');
    return json_data
}


export function get_network_url(network) {
    let url = ''
    if (network === 'mainnet')
        url = 'https://wallet.gamechanger.finance/api/1/tx/';
    else if (network === 'preprod')
        url = 'https://preprod-wallet.gamechanger.finance/api/1/tx/';
    else if (network === 'beta-preprod')
        url = 'https://beta-preprod.gamechanger.finance/api/2/tx/';
    else throw new Error('Unknown Cardano network specification');

    return url
}


export function gc_encode_complete(gc_script, network) {
    let url_safe_script = gc_encode(gc_script);
    let wallet_url_prfix = get_network_url(network);
    let wallet_url = wallet_url_prfix + url_safe_script;
    return wallet_url
}


export function gc_encode_qrcode_svg(gc_script, network) {
    let wallet_url = gc_encode_complete(gc_script, network);

    const qrCode = new QRCode({
		text: wallet_url,
	});
	return qrCode.toSVGText();
}