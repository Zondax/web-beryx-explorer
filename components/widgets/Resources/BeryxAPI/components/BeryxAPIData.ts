/**
 * @module BeryxAPIData
 * @description This module exports data for the BeryxAPI component.
 */

/**
 * @constant
 * @type {Array}
 * @description An array of language examples for using the Beryx API.
 * Each object in the array represents a different language example.
 * @property name - The name of the language.
 * @property language - The language used in the example.
 * @property code - The code example.
 */
export const languageExample = [
  {
    name: 'JavaScript - Fetch',
    language: 'javascript',
    code: `var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer [INSERT_YOUR_BERYX_TOKEN_HERE]");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.zondax.ch/fil/data/v3/mainnet/tipset/height/3155207", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  {
    name: 'NodeJS - Axios',
    language: 'javascript',
    code: `const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.zondax.ch/fil/data/v3/mainnet/tipset/height/3155207',
  headers: {
    'Authorization': 'Bearer [INSERT_YOUR_BERYX_TOKEN_HERE]'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});`,
  },
  {
    name: 'cURL',
    language: 'Powershell',
    code: `curl --location 'https://api.zondax.ch/fil/data/v3/mainnet/tipset/height/3155207' \
--header 'Authorization: Bearer [INSERT_YOUR_BERYX_TOKEN_HERE]'`,
  },
]

/**
 * @constant
 * @type {string}
 * @description A string representation of the response from the Beryx API.
 */
export const response = `[
  {
      "base_fee": 4927378,
      "block_cid": "{bafy2bzacebfyefiwmhrevgz4cfnntun7y4fqrheex6zzh27up47ajayfs75s4,bafy2bzacedtobmxvnco6623uimm3f5jpntlm6cdveh7emm6posj5rpign5k7u,bafy2bzacedotfi6nlv53prbn5gzlbnzx7zoboumua6cj6ictyxe4xjqxmhzaa,bafy2bzacedsfkdkipmj3an5itr7tcidknhjgvlmbq4fhdozawnrvx3gm5ijii,bafy2bzacecxapy5musch7d6eolpuyq7o4lucyayja6yt4i7gtxm5d4gzvztkw}",
      "blocks_info": [
          {
              "BlockCid": "bafy2bzacebfyefiwmhrevgz4cfnntun7y4fqrheex6zzh27up47ajayfs75s4",
              "Miner": "f01402625"
          },
          {
              "BlockCid": "bafy2bzacedtobmxvnco6623uimm3f5jpntlm6cdveh7emm6posj5rpign5k7u",
              "Miner": "f01466173"
          },
          {
              "BlockCid": "bafy2bzacedotfi6nlv53prbn5gzlbnzx7zoboumua6cj6ictyxe4xjqxmhzaa",
              "Miner": "f02211572"
          },
          {
              "BlockCid": "bafy2bzacedsfkdkipmj3an5itr7tcidknhjgvlmbq4fhdozawnrvx3gm5ijii",
              "Miner": "f01914977"
          },
          {
              "BlockCid": "bafy2bzacecxapy5musch7d6eolpuyq7o4lucyayja6yt4i7gtxm5d4gzvztkw",
              "Miner": "f0842171"
          }
      ],
      "canonical": true,
      "create_timestamp": "2023-08-27T23:11:58Z",
      "height": 3155207,
      "id": "1827bb08-f489-526b-bffd-18ab14700cb9",
      "parent_tipset_cid": "bafy2bzaceb3snmh4w47uyrmgyvywoh337azvfiz4yyb7fwrntr3y3t5om6tlw",
      "timestamp": "2023-08-25T11:23:30Z",
      "tipset_cid": "bafy2bzacedfw3zlema7czi7la72yzmfexmsyjqoz64c6itsvn4ud7da7tbkqs",
      "total_txs": 202
  }
]
  `

/**
 * @constant
 * @type {Array}
 * @description An array of endpoints for the Beryx API.
 * Each object in the array represents a different endpoint.
 * @property method - The HTTP method for the endpoint.
 * @property endpoint - The endpoint URL.
 * @property src - The source URL for the endpoint documentation.
 */
export const endpoints = [
  {
    method: 'GET',
    endpoint: '/account/balance/{address}',
    src: 'https://docs.zondax.ch/openapi#get-/account/balance/-address-',
  },
  {
    method: 'GET',
    endpoint: '/tipset/height/{height}',
    src: 'https://docs.zondax.ch/openapi#get-/tipset/height/-height-',
  },
  {
    method: 'GET',
    endpoint: '/transactions/address/{address}',
    src: 'https://docs.zondax.ch/openapi#get-/transactions/address/-address-',
  },
]
