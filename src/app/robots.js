export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // 🔒 Keep Admin private
    },
    sitemap: "https://www.inogrtechnologies.com.ng/sitemap.xml",
  };
}
