import { createHandler } from "@api/handler";

const handler = createHandler();

handler.get(async (req, res) => {
  res.sendSuccess(req.user ?? {});
});

export default handler;
