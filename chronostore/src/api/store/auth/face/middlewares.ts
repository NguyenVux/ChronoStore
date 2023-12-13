import type { 
    Logger,
  MedusaNextFunction, 
  MedusaRequest, 
  MedusaResponse,
  MiddlewareRoute
} from '@medusajs/medusa'

import Multer from 'multer';
import fs from 'fs';
const storage = Multer.memoryStorage();
const faceImg = Multer({storage: storage});


function removeFile(filePath): Promise<void>
{
    return new Promise((resolve,reject)=>{
        if(!fs.existsSync(filePath))
        {
            reject(`${filePath} not exist`);
        }
        fs.unlinkSync(filePath);
        resolve();
    });
}


function RemoveFileWhenClose(
            req: MedusaRequest, 
            res: MedusaResponse,
            next: MedusaNextFunction
        )
{
    const logger = req.scope.resolve<Logger>('logger');
    if(req.file === undefined)
    {
        logger.info('invalid file from user');
        res.status(400);
        res.send('Invalid file');
        res.end();
        return;
    }
    const fileLocation = req.file.path;
    res.once('close', () => {
        removeFile(fileLocation).then(()=> {
            logger.info(`removed ${fileLocation}`);
        }).catch(logger.error);
    });
    next();
}

function CheckIdInFormData(
    req: MedusaRequest, 
    res: MedusaResponse,
    next: MedusaNextFunction
)
{
    const logger = req.scope.resolve<Logger>('logger');
    console.log(req.file);
    if(req.body.email === undefined)
    {
        logger.error('missing email field');
        res.status(400);
        res.send('bad request');
        res.end();
        return;
    }
    next();
}



const routes:MiddlewareRoute[] = [
    {
        matcher: '/store/auth/face',
        middlewares: [
            faceImg.single('file'),
            function (
                req: MedusaRequest, 
                res: MedusaResponse,
                next: MedusaNextFunction
            )
            {
                const logger = req.scope.resolve<Logger>('logger');
                if(req.file === undefined)
                {
                    logger.info('invalid file from user');
                    res.status(400);
                    res.send('Invalid file');
                    res.end();
                    return;
                }
                next();
            },
            function (
                req: MedusaRequest, 
                res: MedusaResponse,
                next: MedusaNextFunction
            )
            {
                const logger = req.scope.resolve<Logger>('logger');
                if(req.body.email === undefined)
                {
                    logger.error('missing email field');
                    res.status(400);
                    res.send('bad request');
                    res.end();
                    return;
                }
                next();
            }
        ],
    },
];
export default routes;