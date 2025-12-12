import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import CookieConsent from "@/components/ui/cookie-consent";
import GoogleAnalytics from "@/components/analytics/google-analytics";

const inter = Inter({ subsets: ["latin"] });
// Configure the Serif Font
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif", // We will use this variable in CSS
});

// --- 1. ENTERPRISE METADATA ---
export const metadata = {
  metadataBase: new URL("https://www.inogrtechnologies.com.ng"),
  title: {
    default: "InoGr Technologies | Enterprise Software & Digital Hub in Kebbi",
    template: "%s | InoGr Technologies",
  },
  description:
    "InoGr Technologies is Kebbi State's premier tech hub. We provide custom software development (Web, Mobile, AI), professional branding, and essential digital services for students and businesses.",
  keywords: [
    // Software
    "Software Development Kebbi",
    "Web Development Nigeria",
    "Mobile App Development",
    "AI & Machine Learning Solutions",
    "UI/UX Design Agency",
    "Backend System Architecture",
    // Cafe & Local
    "Digital Hub Birnin Kebbi",
    "Printing Services Kebbi",
    "CAC Registration Nigeria",
    "POS & Telecom Services",
    "Tech Training Northern Nigeria",
    "Federal University Birnin Kebbi Tech",
  ],
  authors: [{ name: "InoGr Team" }],
  creator: "InoGr Technologies",
  publisher: "InoGr Technologies",
  verification: {
    google: "uXSGVuv_uWNRWPgiQL-bCpniQyabPbBwT5jKeiY6x5U", // <--- Paste the code from Step 1 here
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.inogrtechnologies.com.ng",
    siteName: "InoGr Technologies",
    title: "InoGr Technologies | Building the Digital Future of Kebbi",
    description: "Expert Software Solutions & Premium Digital Services.",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "InoGr Technologies Logo",
      },
    ],
  },
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // --- 2. ENTERPRISE SCHEMA (JSON-LD) ---
  // This maps exactly to your Nav Config services
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // A. ORGANIZATION IDENTITY
      {
        "@type": "Organization",
        "@id": "https://www.inogrtechnologies.com.ng/#organization",
        name: "InoGr Technologies",
        url: "https://www.inogrtechnologies.com.ng",
        logo: "https://www.inogrtechnologies.com.ng/logo.jpeg",
        email: "inogrworks@gmail.com",
        telephone: "+234-811-754-8994",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Students' Area, Take-off site, Federal University",
          addressLocality: "Birnin Kebbi",
          addressRegion: "Kebbi State",
          addressCountry: "NG",
        },
        sameAs: [
          "https://facebook.com/inogrtechnologies",
          "https://twitter.com/inogrtech",
          "https://linkedin.com/company/inogrtechnologies",
          "https://instagram.com/inogrtech",
        ],
      },

      // B. LOCAL BUSINESS (The Hub/Cafe)
      {
        "@type": "LocalBusiness",
        parentOrganization: {
          "@id": "https://www.inogrtechnologies.com.ng/#organization",
        },
        name: "InoGr Digital Hub & Café",
        image: "https://www.inogrtechnologies.com.ng/logo.jpeg",
        telephone: "+234-811-754-8994",
        priceRange: "₦₦",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Students' Area, Take-off site, Federal University",
          addressLocality: "Birnin Kebbi",
          addressRegion: "Kebbi State",
          addressCountry: "NG",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 12.45,
          longitude: 4.19,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "08:00",
            closes: "22:00",
          },
        ],
      },

      // C. SERVICE CATALOG (Software Solutions)
      {
        "@type": "Service",
        serviceType: "Software Engineering",
        provider: {
          "@id": "https://www.inogrtechnologies.com.ng/#organization",
        },
        areaServed: { "@type": "Country", name: "Nigeria" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Development (SaaS, Portals)",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development (iOS & Android)",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Artificial Intelligence & Machine Learning Integration",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UI/UX Design & Prototyping",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Backend API & Database Architecture",
              },
            },
          ],
        },
      },

      // D. SERVICE CATALOG (Café Services)
      {
        "@type": "Service",
        serviceType: "Digital Services",
        provider: {
          "@id": "https://www.inogrtechnologies.com.ng/#organization",
        },
        areaServed: { "@type": "City", name: "Birnin Kebbi" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Café Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Professional Printing & Documentation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Corporate Branding & Graphic Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Online Registration Services (CAC, JAMB, NIN)",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "POS & Telecom Services (Data, Airtime)",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${merriweather.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}

          <Navbar />

          {/* Inject JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
