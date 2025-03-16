import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import puppeteer from "puppeteer";

const scanWebsiteForKeywords = async (
  url: string,
  keywords: string[],
): Promise<boolean> => {
  if (!Array.isArray(keywords)) return false;

  let browser;

  if (process.env.NODE_ENV === "development") {
    browser = await puppeteer.launch();
  } else {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_TOKEN}`,
    });
  }

  const page = await browser.newPage();
  const SPApages = ["ashbyhq"];
  const waitOption = SPApages.some((page) => url.includes(page))
    ? "networkidle0"
    : "domcontentloaded";

  try {
    await page.goto(url, { waitUntil: waitOption });
    const pageContent = await page.evaluate(() => document.body.innerText);

    // Check if any keyword is present
    for (const keyword of keywords) {
      if (pageContent?.includes(keyword)) return true;
    }

    return false;
  } catch (error: unknown) {
    Sentry.withScope((scope) => {
      scope.setContext("scanWebsiteForKeywords", {
        url: new URL(url).origin,
        keywords,
      });
      Sentry.captureException(error);
    });

    return false;
  } finally {
    await browser.close();
  }
};

export async function POST(req: NextRequest) {
  const { url, keywords } = await req.json();

  try {
    if (
      typeof url !== "string" ||
      !Array.isArray(keywords) ||
      keywords.some((k) => typeof k !== "string")
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid input. URL must be a string and keywords must be an array of strings.",
        },
        { status: 400 },
      );
    }

    const result = await scanWebsiteForKeywords(url, keywords);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    Sentry.withScope((scope) => {
      scope.setContext("scan jobs request", {
        url: new URL(url).origin,
        keywords,
      });
      Sentry.captureException(error);
    });

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal server error.", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { message: "Unknown error occurred." },
        { status: 500 },
      );
    }
  }
}
