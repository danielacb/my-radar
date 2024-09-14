import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

const scanWebsiteForKeywords = async (
  url: string,
  keywords: string[],
): Promise<boolean> => {
  if (!Array.isArray(keywords)) return false;

  const browser = await puppeteer.launch();
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
      if (pageContent?.includes(keyword)) {
        console.log(`Keyword "${keyword}" found on the page.`);

        return true;
      } else {
        console.log(`Keyword "${keyword}" NOT found on the page.`);
      }
    }

    return false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error scanning website: ${error.message}`);
    } else {
      console.error("Unknown error occurred.");
    }

    return false;
  } finally {
    await browser.close();
  }
};

export async function POST(req: NextRequest) {
  try {
    const { url, keywords } = await req.json();

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
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);

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
