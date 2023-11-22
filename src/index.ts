import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger';
import { discussions } from './groups/discussions';
import { users } from "./groups/users";

const app = new Elysia()
.use(swagger())    
.get("/", () => "Hello Elysia")
.group("/v1", app => app
  .get('/', () => 'Using v1')
  .use(discussions)
  .use(users)
)
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
