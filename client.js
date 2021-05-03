const { Socket } = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const END = "END";

const error = (message) => {
  console.error(message);
  process.exit(1);
};

const socket = new Socket();

socket.connect({ host: "localhost", port: 8000 });
socket.setEncoding("utf-8");

readline.on("line", (message) => {
  socket.write(message);
  if (message === END) {
    Socket.end();
    process.exit(0);
  }
});

socket.on("data", (data) => {
  console.log(data);
});

const main () => {
  if (process.argv.length !==4) {
    error(`Usage: node ${__filename} host port`);
  }

  let host = process.argv[2];
  let port = process.argv[3];
  console.log(`${host}:${port}`);
}
