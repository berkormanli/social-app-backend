import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger';
import { discussions } from './groups/discussions';
import { users } from "./groups/users";
import { auth } from "./groups/auth";
import { rateLimit } from 'elysia-rate-limit'
import { logger } from '@grotto/logysia';
import { helmet } from 'elysia-helmet';
import { nocache } from 'elysia-nocache';
//import { cron } from '@elysiajs/cron';
import { bearer } from '@elysiajs/bearer';
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";


const app = new Elysia()
.use(helmet())
.use(logger())
.use(rateLimit())
.use(swagger())
.use(bearer())
.use(
    jwt({
        name: 'jwt',
        secret: 'zattirizortzortpirthehe'
    })
)
.use(cookie())
// .use(
//     cron({
//         name: 'heartbeat',
//         pattern: '*/10 * * * * *',
//         run() {
//             console.log('Heartbeat')
//         }
//     })
// )
.get("/", () => "Hello Elysia")
.get('/sign/:name', async ({ jwt, cookie, setCookie, params }) => {
  setCookie('auth', await jwt.sign(params), {
      httpOnly: true,
      maxAge: 7 * 86400,
  })

  console.log(cookie.auth)
  return `Sign in as ${cookie.auth}`
})
.get('/profile', async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth)

    if (!profile) {
        set.status = 401
        return 'Unauthorized'
    }

    return `Hello ${profile.name}`
})
.group("/v1", app => app
  .get('/', () => 'Using v1')
  .use(discussions)
  .use(users)
  .use(auth)
  .get('/signin', ({ bearer }) => bearer, {
    beforeHandle({ bearer, set }) {
      if (!bearer) {
        set.status = 400
        set.headers[
          'WWW-Authenticate'
        ] = `Bearer realm='signin', error="invalid_request"`

        return 'Unauthorized'
      }
    }
  })
)
.listen(3000);

nocache(app);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);