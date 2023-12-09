import type { MiddlewaresConfig } from "@medusajs/medusa"
import FaceAuthRoutes from "./store/auth/face/middlewares"


export const config: MiddlewaresConfig = {
  routes: [
    ...FaceAuthRoutes
  ],
}