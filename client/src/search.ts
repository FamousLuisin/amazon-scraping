interface Product {
  title: string | undefined;
  rating: number;
  reviews: number;
  image: string;
  url?: string;
}

export async function search(element: HTMLButtonElement) {
  element.disabled = true;
  element.textContent = "Buscando...";

  const input = document.querySelector<HTMLInputElement>("#search");
  const resultsContainer = document.querySelector<HTMLDivElement>("#results");

  if (!input || !resultsContainer) return;

  const query = input.value.trim();
  if (!query) {
    element.disabled = false;
    element.textContent = "Buscar";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("Erro ao buscar produtos");

    const data: Product[] = await res.json();

    resultsContainer.innerHTML = "";

    data.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title ?? "Produto"}" />
        <h3>${product.title ?? "Sem título"}</h3>
        <p>⭐ ${
          product.rating
        } — ${product.reviews.toLocaleString()} avaliações</p>
        ${
          product.url
            ? `<a href="${product.url}" target="_blank">Ver Produto</a>`
            : ""
        }
      `;
      resultsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("Ocorreu um erro ao buscar produtos.");
  }

  element.disabled = false;
  element.textContent = "Buscar";
}
