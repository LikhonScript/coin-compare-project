// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
process.env.NEXT_BACKEND_CMC_API_KEY = "c97ed8d3-3314-4996-8a40-3b89203b82cd";

export default function handler(req, res) {
  const getData = async () => {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.NEXT_BACKEND_CMC_API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    const data = await response.json();
    return res.status(200).json({ data });
  };
  getData();
}
