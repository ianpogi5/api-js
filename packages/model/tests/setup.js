// Polyfill for encoding which isn't present globally in jsdom
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.MONGO_URL =
  "mongodb://root:password@localhost:27017/api-test-model?authSource=admin";
process.env.DEBUG = "";
