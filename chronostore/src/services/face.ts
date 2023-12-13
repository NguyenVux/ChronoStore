import { Lifetime } from "awilix";
import fs from 'fs/promises';
import { PathLike } from "fs";
import axios, { AxiosResponse } from "axios";
import { Point, RecogRespone } from "src/types/face";

interface ApiError {
  status: string;
  error_code: number;
  error_message: string;
  operation_id: string;
}

export interface Photo {
  url: string;
  pid: string;
  width: number;
  height: number;
  tags: Tag[];
}
interface Attribute {
  value: string;
  confidence: number;
}

export interface Tag {
  tid: string;
  recognizable: boolean;
  confirmed: boolean;
  manual: boolean;
  width: number;
  height: number;
  center:Point;
  eye_left:Point;
  eye_right:Point;
  yaw: number;
  roll: number;
  pitch: number;
  attributes: {
    face:Attribute;
    gender:Attribute;
    glasses:Attribute;
    dark_glasses:Attribute;
    smiling:Attribute;
  };
}

interface ApiResponseBase {
  status: string;
  usage: {
    used: number;
    remaining: number;
    limit: number;
    reset_time: number;
  };
}

export type FaceDetectRespone = {photos: Photo[]} & ApiResponseBase;

class FaceService {
  static LIFE_TIME = Lifetime.SINGLETON;
  static SkyBioOpts = {
    apiKey: process.env.SKYBIO_APIKEY,
    secret: process.env.SKYBIO_SECRET,
    endpoint: process.env.SKYBIO_ENDPOINT,
    namespace: process.env.SKYBIO_NAMESPACE,
  }
  
  private weightsLocation: string;

  constructor(container) {
    // this.weightsLocation = process.env.WEIGHT_PATH ?? "data/weights";
    // faceAPI.nets.tinyFaceDetector.loadFromDisk(this.weightsLocation),
    // faceAPI.nets.faceLandmark68TinyNet.loadFromDisk(this.weightsLocation);
    // faceAPI.nets.faceRecognitionNet.loadFromDisk(this.weightsLocation);
    
    console.log(this.weightsLocation);
  }

  private BuildBaseFormData() : FormData {
    const formData = new FormData();
    formData.append('api_key',FaceService.SkyBioOpts.apiKey);
    formData.append('api_secret',FaceService.SkyBioOpts.secret);
    return formData;
  }

  public async DetectImages(files: Blob)
  {
    const baseFormdata = this.BuildBaseFormData();
    baseFormdata.append('urls',files);

    return axios.post<FaceDetectRespone>(`${FaceService.SkyBioOpts.endpoint}/faces/detect`, baseFormdata,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(respone => respone.data);
  }

  public async SaveTags(tid: string[],customerId:string){
    // const tid: string[] = [];
    // input.photos.forEach(e => e.tags.forEach(t => tid.push(t.tid)));
    const uid = `${customerId}@${FaceService.SkyBioOpts.namespace}`;
    const tids = tid.join(',');
    const formData = this.BuildBaseFormData();
    formData.append('uid',uid);
    formData.append('tids',tids);

    return axios.post(`${FaceService.SkyBioOpts.endpoint}/tags/save`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(respone => {
      console.log(respone.data);
      return uid;
    });
  }

  public async TrainFace(customerId:string)
  {
    const uid = `${customerId}@${FaceService.SkyBioOpts.namespace}`;
    const formData = this.BuildBaseFormData();
    formData.append('uids',uid);

    return axios.post(`${FaceService.SkyBioOpts.endpoint}/faces/train`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(respone => respone.data);
  }

  public async Recognize(blob:Blob, uid:string)
  {
    const formData = this.BuildBaseFormData();
    formData.append('uids',uid);
    formData.append('urls',blob);

    return axios.post(`${FaceService.SkyBioOpts.endpoint}/faces/recognize`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(respone => respone.data as RecogRespone);
  }

}

export default FaceService;