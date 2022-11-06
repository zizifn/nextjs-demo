// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import net, { NetConnectOpts, TcpNetConnectOpts } from "node:net";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(
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
    // res.end();
    let proxyToServerSocket = net.createConnection(
      Number(remotePort),
      serverAddress,
      () => {
        console.log("request proxy to", serverAddress);
        req.pipe(proxyToServerSocket);
        // clientToProxySocket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(res);
      }
    );
    proxyToServerSocket.on("error", (err) => {
      console.log("PROXY TO SERVER ERROR");
      console.log(err);
    });
  } catch (error) {
    console.log("on error", error);
  }
}
