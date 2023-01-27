"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"), 1);
var import_cors = __toESM(require("@fastify/cors"), 1);

// src/lib/routes/appRoutes.ts
var appRoutes = async (app2) => {
  app2.get("/", async (request, response) => {
    response.send("Hello");
  });
};

// src/lib/routes/authRoutes.ts
var authRoutes = async (app2) => {
  app2.get("/login", () => {
  });
};

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default);
app.register(appRoutes);
app.register(authRoutes);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then((port) => console.log(`HTTP Server running on port ${port}!`));
