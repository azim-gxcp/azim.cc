import "dotenv/config";

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

function optional(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const config = {
  port: parseInt(optional("PORT", "3001"), 10),
  host: optional("HOST", "127.0.0.1"),

  databaseUrl: required("DATABASE_URL"),

  jwt: {
    secret: required("JWT_SECRET"),
    issuer: optional("JWT_ISSUER", "api.azim.cc"),
    accessTtl: "15m",
    refreshTtl: "7d",
  },

  smtp: {
    host: optional("SMTP_HOST", "localhost"),
    port: parseInt(optional("SMTP_PORT", "25"), 10),
    from: optional("SMTP_FROM", "newsletter@azim.cc"),
    fromName: optional("SMTP_FROM_NAME", "M Azim Abdul Majeed"),
  },

  turnstileSecret: required("TURNSTILE_SECRET_KEY"),

  frontendUrl: optional("FRONTEND_URL", "https://azim.cc"),
  apiUrl: optional("API_URL", "https://api.azim.cc"),

  github: {
    token: required("GITHUB_TOKEN"),
    owner: optional("GITHUB_OWNER", "azim-gxcp"),
    repo: optional("GITHUB_REPO", "azim.cc"),
    branch: optional("GITHUB_BRANCH", "main"),
  },
};
