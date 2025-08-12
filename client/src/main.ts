import "./style.css";
import { search } from "./search.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="main">
    <div class="header">
      <h1>Amazon Scraping</h1>
      <div class="hr"></div>
    </div>
    
    <form class="form">
      <label for="search">Pesquisar</label>
      <input type="text" id="search" name="search" value="">
      <button id="searchButton" type="submit">Buscar</button>
    </form>

    <div id="results" class="results"></div>

    <div class="footer">
      <div class="hr"></div>
      <span>noki</span>
    </div>
  </div>
`;

document
  .querySelector<HTMLFormElement>(".form")!
  .addEventListener("submit", (e) => {
    e.preventDefault();
    search(document.querySelector<HTMLButtonElement>("#searchButton")!);
  });
