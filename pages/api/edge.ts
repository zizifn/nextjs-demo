import { NextRequest, NextResponse } from "next/server";

const hello = (req: NextRequest) => {
  console.log("start");
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const readableStream2 = req.body?.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        console.log("[transform]", decoder.decode(chunk));
        controller.enqueue(chunk);
      },
      flush(controller) {
        console.log("[flush]");
        controller.terminate();
      },
    })
  );
  return new Response(readableStream2, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};

export default hello;

export const config = {
  runtime: "experimental-edge",
};
