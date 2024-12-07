import fastify from "fastify";
import cors from "@fastify/cors";
import { api } from "./src/api";

const server = fastify({
  logger: true,
});

server.register(require("@fastify/multipart"), {
  attachFieldsToBody: true,
});

server.register(cors, {
  origin: "*",
});

server.post("/contact/submit", api.contact.submit);
server.get("/contact/list", api.contact.getList);
server.delete("/contact/:id", api.contact.delete);
server.put("/contact/:id", api.contact.update);

server.listen({ host: "0.0.0.0", port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
