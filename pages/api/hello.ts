// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest, NextResponse } from "next/server";
export const config = {
  runtime: "experimental-edge",
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextRequest) {
  // fetch('https://rickandmortyapi.com/api/character')
  //   .then((res) => res.json())
  //   .then((json) => {
  //     res.status(200).json(json);
  //   });
  return new Response("hello world", {
    status: 200,
  });
}
