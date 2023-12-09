import { Lifetime } from "awilix"
import * as faceAPI from '@vladmandic/face-api';
import * as fs from 'fs';
import { Customer, Logger } from "@medusajs/medusa";
import { EntityManager, Repository } from "typeorm";
import { FaceFeature } from "../models/faceFeature";

interface CtorArgs{
  logger: Logger,
  manager: EntityManager
}

class FacedbService {
  static LIFE_TIME = Lifetime.SCOPED;
  private logger: Logger;
  private featureRepo: Repository<FaceFeature>;

  constructor({logger,manager}:CtorArgs) {
    this.logger = logger;
    this.featureRepo = manager.getRepository(FaceFeature);
  }

  public GetFeature(email: string) : Promise<FaceFeature>
  {
    return this.featureRepo.findOne({
        where: {
        customer:{
          email
        }
      }
    });
  }

  public async UpdateFeature(customerId: string,features: number[]) : Promise<void>
  {
    const newItem = this.featureRepo.create({customerId,features});
    this.featureRepo.save(newItem);
  }

}

export default FacedbService;