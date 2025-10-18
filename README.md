# Dynamic Converser

Chatbot front + backend para integração com API de IA (ex.: OpenAI). Projeto com frontend em Vite (React + TypeScript/JSX) e backend Node/Express (porta exemplo 3001). Feito para desenvolvimento local.

## Estrutura
- frontend/ — app React (Vite) — porta dev: 5173
- backend/ — servidor Node/Express — porta dev: 3001
- README.md — este arquivo

## Requisitos
- Node.js >= 16
- npm ou yarn
- Chave da API externa (ex.: OPENAI_API_KEY)

## Variáveis de ambiente (exemplo)
No backend crie um `.env`:
```
OPENAI_API_KEY=sk-xxxx...
PORT=3001
```

## Rodando em desenvolvimento
No terminal (Linux):

1. Instalar e iniciar backend:
```bash
cd backend
npm install
npm run dev   # ou node index.js / npm start conforme script
```

2. Instalar e iniciar frontend:
```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173

## Endpoint esperado
O frontend usa (via proxy do Vite) o endpoint:
POST /api/openai
Body JSON: { "prompt": "sua pergunta" }

Exemplo curl (via Vite proxy):
```bash
curl -v -X POST http://localhost:5173/api/openai \
  -H "Content-Type: application/json" \
  -d '{"prompt":"teste"}'
```
Ou direto no backend:
```bash
curl -v -X POST http://localhost:3001/api/openai \
  -H "Content-Type: application/json" \
  -d '{"prompt":"teste"}'
```

## Configurações úteis

1. Vite: alias e proxy (frontend/vite.config.ts)
- Alias "@": facilita imports como `@/components/...`
- Proxy: redireciona `/api` para backend (3001)
Exemplo (resumo):
```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } }
  }
});
```

2. tsconfig.json (ou jsconfig.json) para resolver `@/*`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

3. Se não quiser usar alias: troque `@/...` por caminhos relativos (`./components/...`).

## Erros comuns e como resolver
- Failed to resolve import "@/...": configure alias no Vite/tsconfig ou troque para caminho relativo.
- Mensagem no frontend: "Use POST /api/openai com { prompt: string }": significa que você fez GET; ajuste o fetch para `method: 'POST'` e `body: JSON.stringify({ prompt })`.
- Erro favicon (NS_BINDING_ABORTED / OpaqueResponseBlocking): adicionar `public/favicon.ico` e servir arquivos estáticos, ou criar rota `/favicon.ico`.
- Source map JSON.parse unexpected character (react_devtools_backend_compact.js.map): geralmente inofensivo — é DevTools/React DevTools tentando ler um .map inválido. Verifique Network > .map, ou desative source maps nas configurações do Vite / DevTools.

## Depuração rápida
- Verificar se backend está rodando e porta:
```bash
ss -ltnp | rg 3001 || ps aux | rg node
```
- Testar endpoint com curl (ver acima).
- Abrir DevTools (F12) -> Network -> checar requisição `/api/openai`:
  - Método: POST
  - Status: 200/4xx/5xx
  - Request payload: JSON
  - Response body: erro/descritivo
- Logs do servidor: rode backend em modo dev e observe console (coloque console.error nas rotas catch).

## Dicas finais
- Sempre reinicie o dev server após alterar `vite.config.ts` ou `tsconfig.json`.
- Se usar service worker, desregistre-o em Application > Service Workers ao depurar problemas de cache.
- Se quiser, posso:
  - Gerar vite.config.ts + tsconfig.json prontos;
  - Trocar automaticamente imports "@/..." para relativos;
  - Ajudar a ajustar a rota `/api/openai` no backend.

Licença: Mayara Rocha 
