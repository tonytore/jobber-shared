import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from 'cloudinary';


export function uploads(
    file: string,
    publicId?: string,
    overwrite?: boolean,
    invalidate?: boolean

):Promise<UploadApiErrorResponse | UploadApiResponse | undefined>{

    return new Promise((resolve)=>{
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id:publicId,
                overwrite,
                invalidate,
                resource_type: "auto"
            },
            (err:UploadApiErrorResponse|undefined,result:UploadApiResponse|undefined)=>{
                if(err){
                    resolve(err)
                }
                resolve(result)
            }
                )
    })

}

export function videoUploader(
    file: string,
    publicId?: string,
    overwrite?: boolean,
    invalidate?: boolean
):Promise<UploadApiErrorResponse | UploadApiResponse | undefined>{
    return new Promise((resolve)=>{
        cloudinary.v2.uploader.upload(
            file,
            {
                resource_type:"video",
                public_id:publicId,
                overwrite,
                invalidate,
                chunk_size: 50000
            },
            (err:UploadApiErrorResponse|undefined,result:UploadApiResponse|undefined)=>{
                if(err){
                    resolve(err)
                }
                resolve(result)
            }
                )
    })

}