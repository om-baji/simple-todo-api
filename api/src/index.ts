import { Hono } from "hono";
import { getTodo } from "./gemini";

const app = new Hono<{
  Bindings: {
    GEMINI_API_KEY: string;
  };
}>();


app.get("/", (c) => {
  const welcomeMessage = `
  Welcome to the Simple Todo API! 🌟

  Available Endpoints:
  - \`GET /todos\`: Generates a list of random todo items in JSON format.

  Example Usage:
  - \`GET /todo/{count}\`: Fetch 'count' random todos with unique IDs, user IDs, and completion status.

  Powered by Google Generative AI and Hono.

  Happy Coding!
  `;

  // Return as plain text for easy viewing in browsers
  return c.text(welcomeMessage);
});


app.get("/todos", async (c) => {
  const res = await getTodo(10, {
    GEMINI_API_KEY: c.env.GEMINI_API_KEY,
  });

  return c.json(res);
});

app.get("/todo/:num", async (c) => {
  const num = parseInt(c.req.param("num"));
  const res = await getTodo(num , {
    GEMINI_API_KEY: c.env.GEMINI_API_KEY,
  });

  return c.json(res);
});

export default app;
