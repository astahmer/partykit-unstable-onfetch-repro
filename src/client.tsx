import "./styles.css";

import PartySocket from "partysocket";

declare const PARTYKIT_HOST: string;

// Let's append all the messages we get into this DOM element
const output = document.getElementById("app") as HTMLDivElement;

// Helper function to add a new line to the DOM
function add(text: string) {
  output.appendChild(document.createTextNode(text));
  output.appendChild(document.createElement("br"));
}

// A PartySocket is like a WebSocket, except it's a bit more magical.
// It handles reconnection logic, buffering messages while it's offline, and more.
const conn = new PartySocket({
  host: PARTYKIT_HOST,
  room: "my-new-room",
});

// You can even start sending messages before the connection is open!
conn.addEventListener("message", (event) => {
  add(`Received -> ${event.data}`);
});

// Let's listen for when the connection opens
// And send a ping every 2 seconds right after
conn.addEventListener("open", () => {
  add("Connected!");
  add("Sending a ping every 2 seconds...");
  // TODO: make this more interesting / nice
  setInterval(() => {
    conn.send("ping");
  }, 1000);
});

const btn = document.createElement("button");
btn.setAttribute("type", "button");
btn.innerText = "Post on /";
btn.onclick = () => {
  // This one is not working, probably because of the client.tsx+serve ?
  fetch("/", { method: "post" }).then((res) => {
    console.log(res);
  });
};
Object.assign(btn.style, {
  position: "fixed",
  top: "0",
  left: "500px",
  width: "100px",
  height: "100px",
  "text-align": "center",
  background: "white",
  padding: "10px",
  zIndex: "9999",
});
document.body.appendChild(btn);

const btn2 = document.createElement("button");
btn2.setAttribute("type", "button");
btn2.innerText = "Get /abc";
btn2.onclick = () => {
  fetch("/abc").then((res) => {
    console.log(res);
  });
};
Object.assign(btn2.style, {
  position: "fixed",
  top: "0",
  left: "700px",
  width: "100px",
  height: "100px",
  "text-align": "center",
  background: "white",
  padding: "10px",
  zIndex: "9999",
});
document.body.appendChild(btn2);
