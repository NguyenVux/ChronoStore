import { ConfigModule, Image, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager, Like } from "typeorm";
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
    const manager: EntityManager = req.scope.resolve("manager")
    const imageRepo = manager.getRepository(Image);
    const images = await imageRepo.find({
        where: {
            url:Like('http://localhost:9000%')
        }
    });

    images?.forEach(value => {
        value.url = `https://api.chronostore.io.vn/${value.url.substring(22)}`;
    });
    imageRepo.save(images)
    res.send(JSON.stringify(images));
}
