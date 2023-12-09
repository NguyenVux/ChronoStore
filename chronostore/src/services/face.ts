import { Lifetime } from "awilix";
const tf = require('@tensorflow/tfjs-node');
const faceAPI = require('@vladmandic/face-api');
import fs from 'fs/promises';
import { PathLike } from "fs";

class FaceService {
  static LIFE_TIME = Lifetime.SINGLETON;
  static detectorOpts = new faceAPI.TinyFaceDetectorOptions({
                                                        inputSize:736,
                                                        scoreThreshold:0.3
                                                    });
  
  private weightsLocation: string;

  constructor(container) {
    this.weightsLocation = process.env.WEIGHT_PATH ?? "data/weights";
    faceAPI.nets.tinyFaceDetector.loadFromDisk(this.weightsLocation),
    faceAPI.nets.faceLandmark68TinyNet.loadFromDisk(this.weightsLocation);
    faceAPI.nets.faceRecognitionNet.loadFromDisk(this.weightsLocation);
    
    console.log(this.weightsLocation);
  }

  public async GetFeatureFromImage(path: PathLike): Promise<number[]>
  {
    const file = await fs.readFile(path);
    const decodeT = tf.node.decodeImage(file);
    const e = faceAPI.tf.expandDims(decodeT);
    const result = await faceAPI
      .detectSingleFace(e,FaceService.detectorOpts)
      .withFaceLandmarks(true)
      .withFaceDescriptor();
    return Array.from(result.descriptor);
  }

  public IsMatch(descriptorA:number[],descriptorB:number[]): number
  {
    return faceAPI.euclideanDistance(descriptorA,descriptorB);
  }

}

export default FaceService;