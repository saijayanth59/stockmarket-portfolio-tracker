const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cthoubpr01qm2t952970cthoubpr01qm2t95297g";
export const finnhubClient = new finnhub.DefaultApi();

export async function getQuote(q) {
  finnhubClient.quote(q, (error, data, response) => {
    console.log("from", data);
  });
}