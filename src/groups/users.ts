import { Elysia } from "elysia";

function retrieveUserById() {
    
}

function retrieveUserByHandle() {
    
}

function retrieveLastRegisteredUser() {
    
}

export const users = new Elysia({ prefix: '/users'})
  .get("/", () => "?????")
  .get("/:handle", retrieveUserByHandle)
  .get("/lastRegisteredUser", retrieveLastRegisteredUser)