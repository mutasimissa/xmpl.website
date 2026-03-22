import { test, expect } from "@playwright/test";
import { loadSiteTypeConfig } from "../fixtures/site-type";
import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

const config = loadSiteTypeConfig();

/** Read booking_link from business input if available */
function getBookingLink(): string | null {
  try {
    const root = path.resolve(__dirname, "../../../");
    const raw = fs.readFileSync(path.join(root, "business/01-business-input.yaml"), "utf-8");
    const data = parseYaml(raw) as Record<string, unknown>;
    const conversion = data.conversion as Record<string, unknown> | undefined;
    return (conversion?.booking_link as string) || null;
  } catch {
    return null;
  }
}

const bookingLink = getBookingLink();

test.describe("Booking Widget", () => {
  test.skip(!config.hasBookingWidget, "Site type is not booking");

  test("home page has booking link or widget", async ({ page }) => {
    await page.goto("/");
    // Build selectors — include the actual booking URL from business input if available
    const linkSelectors = [
      'a[href*="calendly"]',
      'a[href*="booking"]',
      'a[href*="schedule"]',
      'a[href*="cal.com"]',
      'a[href*="tidycal"]',
      '[data-booking]',
    ];
    if (bookingLink) {
      // Extract domain from booking link for a more targeted match
      try {
        const domain = new URL(bookingLink).hostname;
        linkSelectors.push(`a[href*="${domain}"]`);
      } catch {
        // Invalid URL, skip
      }
    }
    const bookingLocator = page.locator(linkSelectors.join(", "));
    const widgetLocator = page.locator('iframe[src*="calendly"], iframe[src*="booking"], iframe[src*="cal.com"], [class*="booking"]');
    const hasLink = await bookingLocator.count() > 0;
    const hasWidget = await widgetLocator.count() > 0;
    expect(hasLink || hasWidget, "No booking link or widget found on home page").toBe(true);
  });

  test("booking link is visible in hero or header", async ({ page }) => {
    await page.goto("/");
    // The booking CTA should be prominent — in the header or hero area
    const heroBooking = page.locator('header a[href*="book"], header a[href*="schedule"], header a[href*="calendly"], header a[href*="cal.com"], section:first-of-type a[href*="book"], section:first-of-type a[href*="schedule"]');
    const count = await heroBooking.count();
    expect(count, "Booking link should be visible in header or hero section").toBeGreaterThan(0);
  });
});
