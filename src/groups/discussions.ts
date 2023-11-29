import { Elysia } from "elysia";
import { mariadbconn as db } from '../lib/db';

async function retrieveRecentDiscussions() {
    console.log("called?")
    let results: Promise<any> | boolean = await db.query('SELECT `discussions`.*, `users`.handler FROM discussions INNER JOIN `users` ON discussions.user_id=users.user_id LIMIT 50').then(function(result) {
        return result;
    }, function() {
        return false;
    });
    return new Response(JSON.stringify(results));
    //return 'multiple discussions'
}

async function retrieveSpecificDiscussion({ params: { id }}) {
    let results: Promise<any> | boolean = await db.query('SELECT discussions.*, users.handler FROM `discussions` INNER JOIN `users` ON discussions.user_id=users.user_id WHERE `discussion_id` = ?', [Number(id)]).then(function([rows, fields]) {
        return rows;
    }, function() {
        return false;
    })
    return new Response(JSON.stringify(results));
    //return 'single discussion' + id.toString()
}

export const discussions = new Elysia({ prefix: '/discussions'})
  .get("/", retrieveRecentDiscussions)
  .get("/:id", retrieveSpecificDiscussion)
