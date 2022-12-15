import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("start");

  const readableStream = new ReadableStream({
    index: 0,
    start(controller) {
      const interval = setInterval(() => {
        controller.enqueue(`client send ${this.index++}`);
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 10_000);
    },
  } as UnderlyingSource & { index: number });
  res.writeHead(200);

  // for await (let chunk of readableStream) {
  //   res.write(chunk);
  // }
  // res.end();
}
