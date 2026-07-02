/**
 * OpenRouter AI client configuration.
 *
 * Centralizes the base URL, headers and default model so that
 * every API route that calls OpenRouter goes through one place.
 */

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export function getOpenRouterHeaders(): Record<string, string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set in environment variables')
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
    'X-Title': 'Cachaça Remedin',
  }
}

/** Default models — easy to swap later without touching route files. */
export const OPENROUTER_MODELS = {
  /** Fast, cheap text model for harmonization suggestions */
  text: 'google/gemini-2.0-flash-001',
  /** Image-capable model for label generation */
  image: 'openai/gpt-4o',
} as const

export { OPENROUTER_BASE_URL }
