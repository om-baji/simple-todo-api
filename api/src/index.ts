import { Hono } from 'hono'
import { getTodo } from './gemini';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/todos', async (c) => {

  const res = await getTodo(10);

  return c.json(res)
})

app.get('/todo/:num', async (c) => {
  const num = parseInt(c.req.param("num"));
  const res = await getTodo(num)

  return c.json(res)
})

export default app
