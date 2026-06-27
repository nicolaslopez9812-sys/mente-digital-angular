const baseUrl = process.env.API_URL ?? 'http://localhost:3000';

async function main() {
  const health = await fetch(`${baseUrl}/health`);
  assert(health.ok, 'health debe responder 200');

  const cursos = await fetch(`${baseUrl}/cursos`);
  const cursosJson = await cursos.json();
  assert(cursos.ok, 'GET /cursos debe responder 200');
  assert(Array.isArray(cursosJson), 'GET /cursos debe devolver un arreglo');
  assert(cursosJson.length > 0, 'GET /cursos debe devolver cursos iniciales');

  const login = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'demo@mentedigital.com', password: 'Demo12345' })
  });
  const user = await login.json();
  assert(login.ok, 'POST /auth/login debe autenticar el usuario demo');
  assert(user.email === 'demo@mentedigital.com', 'login debe devolver el usuario autenticado');

  console.log('Smoke test OK: health, cursos y auth funcionan.');
}

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
