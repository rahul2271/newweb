export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!url || !/^https?:\/\/.+\..+/.test(url)) {
      return res.status(400).json({ error: "Invalid URL. Please provide a valid URL." });
    }

    try {
      const response = await fetch(
        "https://api.apify.com/v2/acts/waxen_olive~my-actor/run-sync?token=apify_api_Ijlin6deGYdEEkrq6F5AVVlseHJLUW1QspAT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Apify API Error: ${errorMessage}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Apify API Error:", error);
      res.status(500).json({ error: "Failed to audit SEO. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]); // Inform client of allowed methods
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return 405 error
  }
}
