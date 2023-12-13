import { ConfigModule, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import FaceService, { FaceDetectRespone, Tag } from "src/services/face";
import FacedbService from "src/services/facedb";
import jwt from "jsonwebtoken";
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const faceService = req.scope.resolve('faceService') as FaceService;
  const facedbService = req.scope.resolve('facedbService') as FacedbService;
  const files = req.files as Array<Express.Multer.File>;
  const result  = await Promise
    .allSettled(files
      .map(e => faceService.DetectImages(new Blob([e.buffer])))
    );

  const tids = result
                  .filter(e => e.status === 'fulfilled')
                  .map( (e:PromiseFulfilledResult<FaceDetectRespone>) => 
                  {
                    return e.value.photos.map(e => e.tags).reduce((acc,item)=> acc.concat(item),[]);
                  }).reduce((acc,item)=>acc.concat(item),[]).map(e => e.tid);
  const uid = await faceService.SaveTags(tids,req.user.customer_id);
  await faceService.TrainFace(uid);
  await facedbService.UpdateSkyBioId(req.user.customer_id,uid);
}
