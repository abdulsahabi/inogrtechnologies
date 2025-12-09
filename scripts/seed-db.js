const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json"); // <--- Ensure this file exists

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// --- DATA: BLOG POSTS ---
const BLOG_DATA = [
  {
    slug: "future-of-ai",
    title: "The Future of AI in Northern Nigeria",
    excerpt:
      "How local businesses are adopting Machine Learning to solve unique agricultural and logistics challenges.",
    category: "Tech",
    date: "Dec 6, 2025",
    readTime: "5 min",
    image: "bg-gradient-to-br from-purple-900 to-indigo-900",
    content: `<p>Artificial Intelligence is often seen as a western concept...</p>`, // (Add full HTML content here if you have it)
    views: 120, // Initial views
  },
  {
    slug: "cac-guide",
    title: "Step-by-Step CAC Registration Guide",
    excerpt:
      "Stop paying agents extra. Here is the complete breakdown of how to register your business name yourself.",
    category: "Business",
    date: "Nov 28, 2025",
    readTime: "8 min",
    image: "bg-gradient-to-br from-orange-900 to-red-900",
    content: `<p>Registering your business is the first step...</p>`,
    views: 85,
  },
  {
    slug: "student-wifi",
    title: "Free WiFi Spots on Campus",
    excerpt:
      "A map of the strongest signal points at Federal University Birnin Kebbi and how to access InoGr Hub's premium network.",
    category: "Student Life",
    date: "Nov 15, 2025",
    readTime: "3 min",
    image: "bg-gradient-to-br from-green-900 to-emerald-900",
    content: `<p>Connectivity is key for modern students...</p>`,
    views: 340,
  },
  {
    slug: "remote-work",
    title: "Top 5 Tools for Remote Devs",
    excerpt:
      "The essential software stack for Nigerian developers working for international clients.",
    category: "Tech",
    date: "Nov 10, 2025",
    readTime: "6 min",
    image: "bg-gradient-to-br from-blue-900 to-cyan-900",
    content: `<p>Working remotely requires discipline...</p>`,
    views: 210,
  },
  {
    slug: "branding-101",
    title: "Why Your Business Needs a Logo",
    excerpt:
      "First impressions matter. We analyze how a professional brand identity increases customer trust.",
    category: "Design",
    date: "Oct 05, 2025",
    readTime: "4 min",
    image: "bg-gradient-to-br from-pink-900 to-rose-900",
    content: `<p>Your logo is the face of your business...</p>`,
    views: 95,
  },
];

// --- DATA: CAFE SERVICES ---
const CAFE_SERVICES = [
  {
    id: "printing",
    title: "Printing & Documentation",
    desc: "High-speed laser printing, photocopying, scanning, and professional binding.",
    price_range: "₦50 - ₦5,000",
    status: "Active",
  },
  {
    id: "branding",
    title: "Design & Branding",
    desc: "Logo creation, business cards, flyers, and full corporate identity packages.",
    price_range: "₦2,000 - ₦50,000",
    status: "Active",
  },
  {
    id: "online",
    title: "Online Services",
    desc: "CAC Registration, JAMB/School forms, Remita payments, and NIN services.",
    price_range: "₦1,000 - ₦25,000",
    status: "Active",
  },
  {
    id: "telecom",
    title: "POS & Telecom",
    desc: "Instant cash withdrawal, transfer, airtime top-up, and data bundles.",
    price_range: "Variable",
    status: "Active",
  },
];

async function seedDatabase() {
  console.log("🌱 Starting Database Seed...");

  try {
    // 1. Seed Blogs
    const blogBatch = db.batch();
    console.log(`... Seeding ${BLOG_DATA.length} Blog Posts`);

    BLOG_DATA.forEach((post) => {
      const docRef = db.collection("posts").doc(post.slug); // Use slug as ID
      blogBatch.set(docRef, {
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await blogBatch.commit();
    console.log("✅ Blog Posts Seeded!");

    // 2. Seed Cafe Services
    const cafeBatch = db.batch();
    console.log(`... Seeding ${CAFE_SERVICES.length} Café Services`);

    CAFE_SERVICES.forEach((service) => {
      const docRef = db.collection("services").doc(service.id);
      cafeBatch.set(docRef, {
        ...service,
        createdAt: new Date(),
      });
    });
    await cafeBatch.commit();
    console.log("✅ Café Services Seeded!");

    console.log("🚀 Database Seeded Successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
}

seedDatabase();
