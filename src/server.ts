import { createServer } from "miragejs";

export default function () {
  createServer({
    routes() {
      this.get("/api/product/:id", () => ({
        name: "",
      }));
    },
  });
}
