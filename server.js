const { Server } = require("net");

const server = new Server();

server.on("connection", (socket) => {
  console.log(
    `New connection from ${socket.remoteAddress}:${socket.remotePort}`
  );
  socket.on("data", (data) => {
    console.log(data);
  });
});

server.listen({ port: 8000, host: "0.0.0.0" }, () => {
  console.log("Listening on port 8000");
});