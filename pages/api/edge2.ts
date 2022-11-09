import { NextRequest, NextResponse } from "next/server";

const hello = async (req: NextRequest) => {
  console.log("start");
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const readableStream2 = new ReadableStream({
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
  } as UnderlyingSource & { index: number }).pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          console.log("[transform]", chunk);
          controller.enqueue(encoder.encode(chunk));
        },
        flush(controller) {
          console.log("[flush]");
          controller.terminate();
        },
      })
    );
  return new Response(readableStream2, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

export default hello;

export const config = {
  runtime: "experimental-edge",
  api: {
    bodyParser: false,
  },
};
