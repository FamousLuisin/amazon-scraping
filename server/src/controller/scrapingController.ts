import type { Request, Response } from "express";
import scrapingService from "../service/scrapingService";

const scrapingController = async (req: Request, res: Response) => {
  const search = req.query.keyword as string;

  if (!search) {
    return res.status(400).json({ error: "Missing search parameter" });
  }

  try {
    const prods = await scrapingService(search);

    res.json(prods);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default scrapingController;
