// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((json) => {
      res.status(200).json(json);
    });
  console.log(req.headers);
}
