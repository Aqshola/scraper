import puppeteer from "puppeteer";

export const initBrowser = puppeteer.launch({
  headless: "new",
  timeout: 15000,
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  args: ["--no-sandbox", "--window-size=1400,900"],
});
