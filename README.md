# amazon-scraping

**OBS:** Frequentemente retorna um erro pois a amazon consegue identificar que é um "bot" acessando a página e dá um block nas requisições.
Amazon scraping é um projeto que faz o scraping de produtos da amazon e tras seus resultados.

## server

### Como rodar:

**Instalar dependências:**

```bash
bun install
```

**Rodar:** Na pasta server execute o comando

```bash
bun run ./src/index.ts
```

**Obs:** As Bucas devem ser feitas para o endpoint /api/scrape com a query keyword

```http
http://localhost:3000/api/scrape/?keyword=exemplo
```

## client

### como rodar:

**Instalar dependências:**

```bash
npm install
```

**Rodar:** Na pasta client execute o comando

```bash
npm run dev
```
