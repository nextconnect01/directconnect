import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
    try {
        const sitemap = new SitemapStream({ hostname: "https://www.nextconnecthub.com" });

        // Static pages
        const staticPages = [
            { url: "/", changefreq: "monthly", priority: 1.0 },
            { url: "/about", changefreq: "monthly", priority: 0.8 },
            { url: "/offerings", changefreq: "monthly", priority: 0.8 },
            { url: "/blog", changefreq: "daily", priority: 0.9 },
            { url: "/login", changefreq: "monthly", priority: 0.5 },
            { url: "/SignUp", changefreq: "monthly", priority: 0.5 },
            { url: "/editProfile", changefreq: "monthly", priority: 0.7 },
            { url: "/privacy-policy", changefreq: "yearly", priority: 0.6 },
            { url: "/terms-condition", changefreq: "yearly", priority: 0.6 }
        ];

        // Add static pages
        staticPages.forEach(page => sitemap.write(page));

        // Dynamically generate Blog Inside pages
        const blogPosts = await getBlogPosts(); // Function to get blog post IDs from your database
        blogPosts.forEach(post => {
            sitemap.write({ url: `/blogInside:${post._id}`, changefreq: "weekly", priority: 0.9 });
        });

        sitemap.end();
        const sitemapXML = await streamToPromise(sitemap);

        res.header("Content-Type", "application/xml");
        res.send(sitemapXML.toString());
    } catch (error) {
        console.error("Sitemap generation error:", error);
        res.status(500).send("Could not generate sitemap");
    }
});

// Dummy function to get blog post IDs (Replace with actual database query)
async function getBlogPosts() {
    return [
        { _id: "12345" },
        { _id: "67890" }
    ];
}

export default router;
