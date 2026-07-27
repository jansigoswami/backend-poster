import OpenAI from "openai"
import dotenv from "dotenv"
dotenv.config();

export const OPENAI_IMAGE_MODEL =
  process.env.OPENAI_MODEL ?? "gpt-5.4"

let client: OpenAI | null = null

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_KEY = "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";

console.log("api key", OPENAI_API_KEY)

export function getOpenAI(): OpenAI {
  if (!client) {
    if (!OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in env variables")
    }
    client = new OpenAI({ apiKey: OPENAI_API_KEY })
  }
  return client
}
