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
  let datas: any[] = [];
  req.on("data", (chunk) => {
    try {
      //console.log("To JSON : ",chunk.toJSON())
      //console.log("To String : ",chunk.toString())
      //console.log(chunk.isEncoding())
      datas.push(chunk);
    } catch (e) {
      console.log("Data : ", e);
    }
  });
  req.on("end", () => {
    console.log(datas[0]);
    res.status(200).json({ data: null, error: "Success" });
  });

  console.log("ddddd");
}
