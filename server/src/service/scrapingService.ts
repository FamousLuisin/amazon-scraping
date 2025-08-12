import axios from "axios";
import { JSDOM } from "jsdom";

interface Product {
  title: string | undefined;
  rating: number;
  reviews: number;
  image: string;
  url?: string;
}

const scrapingService = async (search: string) => {
  const urlBase = "https://www.amazon.com.br/";

  const { data } = await axios.get(
    `${urlBase}s?k=${encodeURIComponent(search)}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
    }
  );

  const dom = new JSDOM(data);
  const elements = dom.window.document.querySelectorAll("[data-uuid]");

  let prods: Product[] = [];

  elements.forEach((p) => {
    const divTitle = p.querySelector("[data-cy='title-recipe']");
    const divRating = p.querySelector("[data-cy='reviews-block']");
    const urlImage = p.querySelector("img.s-image");

    if (divTitle === null || divRating === null || urlImage === null) {
      return;
    }

    const title = divTitle.querySelector("div a h2 span")?.textContent;

    const patrocinio = divTitle.querySelector(
      "div div span a span span"
    )?.textContent;

    if (patrocinio !== undefined) {
      return;
    }

    const rating = divRating
      .querySelector("div div span")
      ?.textContent.split(" ")[0]
      ?.replace(",", ".");
    const reviewsText = divRating
      .querySelector("div div")
      ?.querySelector(":scope > a:last-of-type span")?.textContent;

    let reviews;

    if (reviewsText?.includes(".")) {
      const num = parseFloat(reviewsText);
      reviews = num * 1000;
    } else {
      reviews = reviewsText ? parseInt(reviewsText) : 0;
    }

    const img = urlImage.getAttribute("src");
    const urlLink = divTitle.querySelector("div a")?.getAttribute("href");

    const prod: Product = {
      title: title,
      rating: rating ? Number.parseFloat(rating) : 0,
      reviews: reviews,
      image: img ? img : "",
      url: urlLink ? `${urlBase}/${urlLink}` : "",
    };

    prods.push(prod);
  });

  return prods;
};

export default scrapingService;
