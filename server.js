const { Server } = require("net");

const host = "0.0.0.0";
const END = "END";

// 127.0.0.1:8000 -> 'Usuario'
// 127.0.0.1:9000 -> 'Usuario1'
const connections = new Map();

const error = (message) => {
  console.error(message);
  process.exit(1);
};

const sendMessage = (message, origin) => {
  //Mandar el message a todos menos a origin
};

const listen = (port) => {
  const server = new Server();

  server.on("connection", (socket) => {
    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;
    connections.set(socket, "Test");
    console.log(`New connection from ${remoteSocket}`);
    socket.setEncoding("utf-8");
    socket.on("data", (message) => {
      if (!connections.has(socket)) {
        console.log(`Username ${message} set for connection ${remoteSocket}`);
        connections.set(socket, message);
      } else if (message === END) {
        console.log(`Connection with ${remoteSocket} closed`);
        socket.end();
      } else {
        //Enviar el mensaje al resto de clientes
        console.log(`${remoteSocket} -> ${message}`);
      }
    });
  });

  server.listen({ port, host }, () => {
    console.log("Listening on port 8000");
  });

  server.on("error", (err) => error(err.message));
};

const main = () => {
  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} port`);
  }

  let port = process.argv[2];
  if (isNaN(port)) {
    error(`Invalid port ${port}`);
  }

  port = Number(port);

  listen(port);
};

if (require.main === module) {
  main();
}
