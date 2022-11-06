// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const json = await fetch("https://rickandmortyapi.com/api/character").then(
    (res) => res.json()
  );
  res.status(200).json(json);
}
