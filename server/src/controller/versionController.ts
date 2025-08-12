import type { Request, Response } from "express";

const versionController = (req: Request, res: Response) => {
  res.json({ version: "1.0.0" });
};

export default versionController;
