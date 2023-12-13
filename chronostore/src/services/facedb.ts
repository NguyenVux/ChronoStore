import { Lifetime } from "awilix"
import { Logger } from "@medusajs/medusa";
import { EntityManager, IsNull, Not, Repository } from "typeorm";
import { FaceFeature } from "../models/faceFeature";
import { Customer } from '../models/ExCustomer';
interface CtorArgs {
  logger: Logger,
  manager: EntityManager
}

class FacedbService {
  static LIFE_TIME = Lifetime.SCOPED;
  private logger: Logger;
  private customerRepo: Repository<Customer>;

  constructor({ logger, manager }: CtorArgs) {
    this.logger = logger;
    this.customerRepo = manager.getRepository(Customer);
  }

  public async UpdateSkyBioId(customer_id: string, uid: string) {
    this.customerRepo.update({ id: customer_id }, { skybioUid: uid });
  }

  public async GetUser(email: string) {
    return this.customerRepo.findOne({
      where: {
        email: email,
        skybioUid: Not(IsNull())
      }
    })
  }

}

export default FacedbService;