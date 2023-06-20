# gc-encoder-npm-package

This package allows you to encode and decode json into url safe strings. With this you can give the gamechanger wallet commands. 


# Example usage

import { gc_encode, gc_encode_qrcode_svg } from "gc-encoder"
import fs from 'fs';

let json_data = `{
    "type": "script",
    "title": "Minimal Coin Sending Demo",
    "description": "GC Payment",
    "run": [
        {
            "type": "buildTx",
            "tx": {
                "outputs": [
                    {
                        "address": "addr_test1qrl07u9ssdtdwtzhrt0zrrr79yejxhfvmsmjt9jxqyaz0ktp6ydulqht6r9z4ld0jms3a3c7gw45u32vhc2ftdp2f6rqvz02jw",
                        "assets": [
                            {
                                "policyId": "ada",
                                "assetName": "ada",
                                "quantity": "1000000"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "type": "signTxs",
            "detailedPermissions": false,
            "txs": [
                "{get('cache.0.txHex')}"
            ]
        },
        {
            "type": "submitTxs",
            "txs": "{get('cache.1')}"
        }
    ]
}`;

console.log(json_data);

console.log(gc_encode(json_data));

let qr_svg = await gc_encode_qrcode_svg(json_data,"preprod");

//console.log(qr_svg);

fs.writeFile('./test.svg', qr_svg, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
