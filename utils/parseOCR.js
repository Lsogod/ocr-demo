const fs = require('fs');
const axios = require('axios');

const REQUEST_URL = "https://shouxiegen.market.alicloudapi.com/ocrservice/shouxie";

async function parse(appCode, imgFile) {
  const imgData = await fs.promises.readFile(imgFile, 'base64');

  const headers = {
    "Authorization": `APPCODE ${appCode}`,
    "Content-Type": "application/json; charset=UTF-8"
  };

  const data = {
    img: imgData,
    prob: false,
    charInfo: false,
    rotate: false,
    table: false,
    sortPage: false
  };

  try {
    const response = await axios.post(REQUEST_URL, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('OCR parsing failed.');
  }
}

module.exports = {
    parse: parse
  };