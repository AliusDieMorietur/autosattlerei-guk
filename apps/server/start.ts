import fastify from "fastify";
import cors from "@fastify/cors";
import { api } from "./src/api";
import multipart from "@fastify/multipart";
import { config } from "./src/lib/config";

const FILE_LIMIT = 20 * 1024 * 1024;

const server = fastify({
  logger: true,
});

console.log("config.adminUserName", config.adminUserName);

server.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  async (_, response, done) => {
    try {
      let data = "";
      for await (const chunk of response) {
        data += chunk;
      }
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
);

server.register(multipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: FILE_LIMIT,
  },
});

server.register(cors, {
  origin: "*",
});

server.post("/contact/submit", api.contact.submit);
server.get("/contact/list", api.contact.getList);
server.delete("/contact/:id", api.contact.delete);
server.put("/contact/:id", api.contact.update);
server.post("/api/admin/init", api.admin.init);
server.post("/api/admin/report", api.admin.report);

server.listen({ host: "0.0.0.0", port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
