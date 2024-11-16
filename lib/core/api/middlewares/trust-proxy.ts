import { NextApiRequest, NextApiResponse } from "next";

const getProtocol = (req: NextApiRequest) => {
  // @ts-ignore the types for req.connection are incorrect
  if (req.connection?.encrypted) return "https";

  const forwardedProto =
    req.headers && (req.headers["x-forwarded-proto"] as string);
  if (forwardedProto) return forwardedProto.split(/\s*,\s*/)[0];

  return "http";
};

/**
 * This trustProxyMiddleware replicates Express' app.set("trust proxy", true)
 * to make auth work on Heroku. (inspired by blitz-js/blitz#966)
 */
export const trustProxyMiddleware = (
  req: NextApiRequest & { protocol: string },
  _: NextApiResponse,
  next: () => void
) => {
  req.protocol = getProtocol(req);
  next();
};
