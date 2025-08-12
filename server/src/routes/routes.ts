import { Router } from "express";
import scrapingController from "../controller/scrapingController";
import versionController from "../controller/versionController";

const route = Router();

route.get("/version", versionController);

route.get("/api/scrape", scrapingController);

export default route;
