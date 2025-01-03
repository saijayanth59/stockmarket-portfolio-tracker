"use client";
import axios from "axios";
const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.NEXT_PUBLIC_API_FINHUB_KEY;
export const finnhubClient = new finnhub.DefaultApi();
export const socketUrl = `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_API_FINHUB_KEY}`;

export async function getQuote(q) {
  finnhubClient.quote(q, (error, data, response) => {
    console.log("from", data);
  });
}

export async function fetchMonthlyAdjustedData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=QCPZ9SKV1F1EO4FL`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "axios",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
