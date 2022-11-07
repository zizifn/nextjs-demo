// export default async function handler(_) {
//   const encoder = new TextEncoder();

//   const customReadable = new ReadableStream({
//     start(controller) {
//       controller.enqueue(encoder.encode("Basic Streaming Test"));
//       controller.close();
//     },
//   });

//   return new Response(customReadable, {
//     headers: { "Content-Type": "text/html; charset=utf-8" },
//   });
// }

import { NextRequest, NextResponse } from "next/server";

const hello = (req: NextRequest) => {
  console.log("start");
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    index: 0,
    start(controller) {
      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(`client send ${this.index++}`));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 10_000);
    },
  } as UnderlyingSource & { index: number });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};

export default hello;

export const config = {
  runtime: "experimental-edge",
};
