import type { MiddlewaresConfig } from "@medusajs/medusa"
import FaceAuthRoutes from "./store/auth/face/middlewares"
import addFaceRoutes from "./store/auth/add-face/middlewares"


export const config: MiddlewaresConfig = {
  routes: [
    ...addFaceRoutes,
    ...FaceAuthRoutes,
  ],
}