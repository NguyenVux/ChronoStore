import { ConfigModule, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import FaceService from "src/services/face";
import FacedbService from "src/services/facedb";
import jwt from "jsonwebtoken";
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const facedbService = req.scope.resolve('facedbService') as FacedbService;
  const faceService = req.scope.resolve('faceService') as FaceService;
  const config = req.scope.resolve('configModule') as ConfigModule;
  const user = await facedbService.GetUser(req.body.email);
  if(user === null)
  {
    res.status(404);
    res.send('customer id not exist or did enable face login yet');
    return;
  }
  const recogResult = await faceService.Recognize(new Blob([req.file.buffer]),user.skybioUid);
  const result = recogResult.photos
                .map(photo => photo.tags.map(e => e.uids))
                .reduce((acc,item) => acc.concat(item),[])
                .reduce((acc,item) => acc.concat(item),[])
                .filter(uids => uids.uid ===user.skybioUid)
                .every(uid => uid.confidence > 80);
  if(result)
  {
    const token = jwt.sign(
      { customer_id: user.id, domain: "store" },
      config.projectConfig.jwt_secret,
      {
        expiresIn: "24h",
      }
    );
    res.send({
      'access-token': token
    });
  }
  else {
    res.status(401);
    res.end();
  }
}
