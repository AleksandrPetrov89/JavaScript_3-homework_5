import puppeteer from "puppeteer";

jest.setTimeout(30000); // default puppeteer timeout

describe("E2E tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test.each([["input"], ["button"]])(
    "Проверка появления/удаления всплывающей подсказки на %p",
    async (selector) => {
      await page.goto("http://localhost:9000");
      await page.waitForSelector(selector);

      await page.hover(selector);
      await page.waitForSelector(".tooltip-popover");

      await page.mouse.reset();
      const bool = await page.$(".tooltip-popover");
      expect(bool).toBe(null);
    },
  );

  afterAll(async () => {
    await browser.close();
  });
});
