import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base defaults to "/" — correct for an apex domain like kevinciang.com
export default defineConfig({
  plugins: [react()],
});
