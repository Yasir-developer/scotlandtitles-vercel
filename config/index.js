const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "https://3737-182-176-179-27.ngrok-free.app"
  : "https://scotlandtitles-vercel.vercel.app";
