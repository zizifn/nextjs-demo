// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import net, { NetConnectOpts, TcpNetConnectOpts } from "node:net";
import { Transform } from "node:stream";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("start");
  const headers = req.headers;
  const serverAddress = headers["x-host"] as string;
  const remotePort = headers["x-port"];
  if (!serverAddress || !remotePort) {
    res.status(200).json({ name: "proxy" });
    return;
  }

  try {
    const proxyToServerSocket = await new Promise<net.Socket>((res, rej) => {
      let socket = net.createConnection(
        Number(remotePort),
        serverAddress,
        () => {
          console.log("request proxy to", serverAddress, Number(remotePort));
          res(socket);
        }
      );
    });
    req
      .pipe(
        new Transform({
          transform(chunk, encoding, callback) {
            console.log("req", Date(), chunk);
            callback(null, chunk);
          },
        })
      )
      .pipe(proxyToServerSocket);
    // clientToProxySocket.pipe(proxyToServerSocket);
    proxyToServerSocket
      .pipe(
        new Transform({
          transform(chunk, encoding, callback) {
            console.log("---res", Date(), chunk);
            callback(null, chunk);
          },
        })
      )
      .pipe(res);
    proxyToServerSocket.on("error", (err) => {
      console.log("PROXY TO SERVER ERROR");
      console.log(err);
    });
  } catch (error) {
    console.log("on error", error);
  }

  console.log("end");
}
