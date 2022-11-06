import type { NextApiRequest, NextApiResponse } from "next";
import type { Readable } from "node:stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("start");
  const serverAddress = req.headers["x-host"] as string;
  const remotePort = req.headers["x-port"];
  const index = req.headers["x-count"];
  console.log(`${serverAddress} + port ${remotePort} + index ${index}`);
  if (req.method === "POST") {
    // const buf = await buffer(req);
    // const rawBody = buf.toString("utf8");
    // req.pipe(res);
    for await (const chunk of req) {
      // chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      console.log("inside chunk");
      console.log(chunk);
      res.json({ chunk });
    }
    console.log("end");

    // setTimeout(() => {
    //   console.log("after 2 sens");
    //   res.json({ key: "aaa" });
    // }, 2000);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
