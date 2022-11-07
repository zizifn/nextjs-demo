import {
  ReadableStream,
  TextDecoderStream,
  TextEncoderStream,
} from "node:stream/web";
import { fetch } from "undici";

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
}).pipeThrough(new TextEncoderStream());

// for await (let chunk of readableStream) {
//   console.log(chunk);
// }

const resp = await fetch("http://localhost:3000/api/proxy2", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: readableStream,
  duplex: "half",
});

for await (let chunk of resp.body.pipeThrough(new TextDecoderStream())) {
  console.log(chunk);
}

// const read = resp.body.getReader();
// while (true) {}
