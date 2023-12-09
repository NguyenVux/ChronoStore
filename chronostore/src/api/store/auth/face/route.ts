import { ConfigModule, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import FaceService from "src/services/face";
import FacedbService from "src/services/facedb";
import jwt from "jsonwebtoken";
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const facedbService = req.scope.resolve('facedbService') as FacedbService;
  const faceApiService = req.scope.resolve('faceService') as FaceService;
  const config = req.scope.resolve('configModule') as ConfigModule;
  const feature = await facedbService.GetFeature(req.body.email);
  if(feature === null)
  {
    res.status(404);
    res.send('customer id not exist or did enable face login yet');
    return;
  }
  const requestDescriptor = await faceApiService.GetFeatureFromImage(req.file.path);
  const dbDescriptor = feature.features;
  if(faceApiService.IsMatch(requestDescriptor,dbDescriptor) < 0.5)
  {
    const token = jwt.sign(
      { customer_id: feature.customerId, domain: "store" },
      config.projectConfig.jwt_secret,
      {
        expiresIn: "24h",
      }
    );
    res.send(token);
  }
  else {
    res.status(401);
    res.end();
  }
}
