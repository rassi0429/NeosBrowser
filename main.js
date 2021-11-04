
const express = require("express")
const puppeteer = require('puppeteer')
const app = express()
const api = app.listen(3000, () => console.log("API OK"))
app.get("/", async (req, res) => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1920 });
    await page.waitForTimeout(Number(req.query.timeout || 0));
    await page.goto(req.query.url);
    res.status(200).send(await page.screenshot({ fullPage: true }));
})