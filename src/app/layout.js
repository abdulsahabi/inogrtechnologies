import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import CookieConsent from "@/components/ui/cookie-consent";
import GoogleAnalytics from "@/components/analytics/google-analytics";

const inter = Inter({ subsets: ["latin"] });

// 1. VIEWPORT CONFIGURATION (Separate export in Next.js 14+)
// This ensures your brand colors show up in the browser bar on mobile
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// 2. DETAILED METADATA
export const metadata = {
  // CRITICAL: This fixes social sharing images. Change .com to .ng if needed.
  metadataBase: new URL("https://inogrtechnologies.com.ng"),

  title: {
    default: "InoGr Technologies | Enterprise Software & Digital Hub in Kebbi",
    template: "%s | InoGr Technologies", // Auto-adds brand name to other pages
  },

  description:
    "The premier technology company in Birnin Kebbi. We build enterprise-grade software (Web, Mobile, AI) and provide essential business services (CAC Registration, Branding, Printing) for students and startups.",

  applicationName: "InoGr Technologies",

  // KEYWORDS: Mix of high-tech and local services for maximum reach
  keywords: [
    "Software Development Kebbi",
    "Web Design Nigeria",
    "Mobile App Developer",
    "AI Solutions Northern Nigeria",
    "CAC Registration Birnin Kebbi",
    "Student Project Printing",
    "POS Services Kebbi",
    "Tech Hub Birnin Kebbi",
    "InoGr Technologies",
    "InoGr Cafe",
  ],

  authors: [
    { name: "Abdulrahaman Sahabi", url: "https://inogrtechnologies.com.ng" },
  ],
  creator: "InoGr Technologies Team",
  publisher: "InoGr Technologies",

  // ROBOTS: Tells Google to index everything
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // OPEN GRAPH (For Facebook, LinkedIn, WhatsApp links)
  openGraph: {
    type: "website",
    locale: "en_NG", // Targeting Nigeria
    url: "https://inogrtechnologies.com.ng",
    title: "InoGr Technologies | Innovation meets Accessibility",
    description:
      "Bridging the gap between global tech innovation and local accessibility in Kebbi State.",
    siteName: "InoGr Technologies",
    images: [
      {
        url: "/logo.jpeg", // We use your logo as the sharing image
        width: 800,
        height: 600,
        alt: "InoGr Technologies Logo",
      },
    ],
  },

  // TWITTER CARD (For X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "InoGr Technologies",
    description: "Enterprise Software & Digital Hub in Kebbi State.",
    images: ["/logo.jpeg"], // Re-use logo
    creator: "@inogrtech", // Replace with your actual handle if you have one
  },

  // ICONS (Favicon)
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },

  // LOCAL SEO (Helps you show up on Google Maps/Local Search)
  category: "technology",
  classification: "Software Company & Business Center",

  // VERIFICATION (You will need to add your codes here later)
  verification: {
    google: "google-site-verification=YOUR_CODE_HERE", // Add this when you launch
  },

  // GEOTAGGING (Crucial for "Near Me" searches in Kebbi)
  other: {
    "geo.region": "NG-KE", // Nigeria - Kebbi
    "geo.placename": "Birnin Kebbi",
    "geo.position": "12.45;4.19", // Approx Lat/Long for Birnin Kebbi
    ICBM: "12.45, 4.19",
  },
};

export default function RootLayout({ children }) {
  // Access the variable safely
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Smart Analytics (Only runs if accepted) */}
          <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />

          <Navbar />
          {children}

          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
