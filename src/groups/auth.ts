import { Elysia, t } from "elysia";
import { mariadbconn as db } from '../lib/db';
import UserData from "../interfaces/UserData";
import User from "../interfaces/User";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";


async function doesUserExist(user: UserData): Promise<false | User[]> {
    let results: Promise<User[]> | false = await db.query('SELECT * FROM users WHERE `handler` = ? AND `password` = ?', [user.handle, user.password]).then(function(result) {
      //console.log(result)
      return result;
    }, function() {
      return false;
    });
    return results;
}

async function fetchUser(user: UserData): Promise<User> {
    let results: Promise<User> = await db.query('SELECT * FROM users WHERE `handler` = ?', [user.handle]).then(function(result) {
      return result[0];
    });
    return results;
}

async function signUp() {
    
}

export const auth = new Elysia({ prefix: '/auth'})
  .post("/signin", async ({body, jwt, setCookie, set}) => {
    const {handle, password} = body;
    const accessToken = await jwt.sign({
        handle: handle,
        password: password,
      });
      console.log(accessToken);
      
      setCookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/",
      });

      return {
        success: true,
        data: null,
        message: "Account login successfully",
      };
  },
  { 
    body: t.ObjectString({
        handle: t.String(),
        password: t.String()
    }),
    beforeHandle: async ({ body, set }) => {
        const isUserExistingInDb = await doesUserExist(body);
        if (!isUserExistingInDb) {
            set.status = 400;
            return new Response(JSON.stringify({
                success: false,
                data: null,
                message: "Invalid credentials"
            }));
        }
    },
  }
)
.post("/signup", signUp)