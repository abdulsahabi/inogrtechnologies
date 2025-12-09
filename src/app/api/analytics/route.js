import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

// REUSE THE FIREBASE KEYS
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID; // <--- The numeric ID you need to find

  if (!propertyId) {
    return NextResponse.json(
      { error: "Missing GA_PROPERTY_ID" },
      { status: 500 }
    );
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "28daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "date",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
        {
          name: "screenPageViews",
        },
      ],
      orderBys: [
        {
          dimension: {
            orderType: "ALPHANUMERIC",
            dimensionName: "date",
          },
        },
      ],
    });

    // Transform Google's complex data into simple chart data
    const chartData = response.rows.map((row) => {
      // Format date from YYYYMMDD to nicer format if needed
      const rawDate = row.dimensionValues[0].value;
      // simple format: 20251208 -> 12/08
      const formattedDate = `${rawDate.substring(4, 6)}/${rawDate.substring(
        6,
        8
      )}`;

      return {
        date: formattedDate,
        users: parseInt(row.metricValues[0].value),
        views: parseInt(row.metricValues[1].value),
      };
    });

    return NextResponse.json({ data: chartData });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
