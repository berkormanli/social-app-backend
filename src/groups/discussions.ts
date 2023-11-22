import { Elysia } from "elysia";

function retrieveRecentDiscussions() {
    return 'multiple discussions'
}

function retrieveSpecificDiscussion({ params: { id }}) {
    return 'single discussion' + id.toString()
}

export const discussions = new Elysia({ prefix: '/discussions'})
  .get("/", retrieveRecentDiscussions)
  .get("/:id", retrieveSpecificDiscussion)
