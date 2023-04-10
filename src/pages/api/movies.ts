import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.query.title as string;
  const response = await fetch(
    `https://movie-database-alternative.p.rapidapi.com/?s=${title}&page=1&r=json`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  if (data.Response === "False") {
    res.status(404).json({ error: data.Error });
  }
  else {
    res.status(200).json(data.Search);
  }
}