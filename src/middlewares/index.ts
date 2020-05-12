import express from "express";
import { ssrMiddleware } from "./ssr";

export const createMiddlewares = () => [
  express.static("public"),
  ssrMiddleware,
];
