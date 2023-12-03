import { Elysia } from "elysia";
import { mariadbconn as db } from '../lib/db';

function retrieveUserById() {
}

async function retrieveUserByHandle({ params: { handle }}) {
  let results: Promise<any> | boolean = await db.query('SELECT * FROM `users` WHERE `handler` = ?', [handle]).then(function([rows, fields]) {
    console.log(rows)
    return rows;
}, function() {
    return false;
})
return new Response(JSON.stringify(results));
//return 'single discussion' + id.toString()
}

function retrieveLastRegisteredUser() {
  // TODO: Implement this
}

export const users = new Elysia({ prefix: '/users'})
  .get("/", () => "?????")
  .get("/:handle", retrieveUserByHandle)
  .get("/lastRegisteredUser", retrieveLastRegisteredUser)