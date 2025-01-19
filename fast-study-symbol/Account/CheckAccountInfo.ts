import { aliceAddress, NODE } from "./configure.js";

const accountInfo = await fetch(new URL("/accounts/" + aliceAddress, NODE), {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => {
    return json.account;
  });
console.log(accountInfo);
