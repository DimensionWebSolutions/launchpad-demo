import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Visitor analytics. Vercel Web Analytics and Speed Insights start counting once they're turned on
 * for the project in Vercel (Analytics and Speed Insights tabs); Google Analytics once
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (the Launchpad console sets it for you).
 */
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      {ga && /^G-[A-Z0-9]{4,16}$/.test(ga) ? <GoogleAnalytics gaId={ga} /> : null}
    </>
  );
}
