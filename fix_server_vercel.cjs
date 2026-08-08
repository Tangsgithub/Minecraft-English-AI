const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// 1. Remove `async function startServer() {` and dedent
code = code.replace(/async function startServer\(\) \{\n/, '');

// 2. We need to find the vite middleware section and wrap it in startServer
const viteSectionRegex = /\/\/ Vite middleware for development\s+if \(process\.env\.NODE_ENV !== "production"\) \{[\s\S]*\}\s+startServer\(\);/;

const newTail = `
// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Minecraft English AI Server running on http://localhost:\${PORT}\`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
`;

code = code.replace(viteSectionRegex, newTail);
fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts');
