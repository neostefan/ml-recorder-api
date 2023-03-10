import fs from "fs";
import path from "path";
import archiver from "archiver";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import { ISample, sample, user } from "../models";
import { ReadDir } from "../util/dir-util";


export const getSamples: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
    let samplesPath = path.resolve('public', 'data', 'samples')
    let write_stream = fs.createWriteStream('./compressed_files/archive.zip')
    let archive = archiver('zip', {
        zlib: { level: 9 }
    })

    try {
        let filenames = await ReadDir(samplesPath)
        archive.pipe(write_stream)

        for(let file of filenames) {
            archive.file(samplesPath + "/" + file, {
                name: file
            })
        }

        await archive.finalize()

        res.set('Content-Type', 'application/zip')
        res.set('Content-Disposition', 'attachment; filename="archive.zip"')
        let read_stream = fs.createReadStream('./compressed_files/archive.zip')
        read_stream.pipe(res)
    } catch(e) {
        next(e)
    }
}

export const postSample: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
    //you have to make use of an auth middleware as the file will always be uploaded due to multer
    let sampleFile = req.file
    let registeredUser = req.user

    console.log("I am getting here...!!!!")

    if(registeredUser === undefined) {
        res.status(401).json({msg: "Not authorized to post sample!"})
    } else {
        try {
            if(sampleFile === undefined) {
                res.status(404).json({msg: "No sample uploaded"})
            } else {
                
                //checks if the user uploading sample exists
                let eUser = await user.findOne(registeredUser)
    
                // let savedSample = await newSample.save()
                // console.log(savedSample.location)
                // res.status(201).json({msg: `laughter sample: ${savedSample.location}, has been saved!`})
    
                if(eUser) {
                    //if user exists create a sample model and save in database
                    let newSample: HydratedDocument<ISample> = new sample({
                        userId: eUser?._id,
                        location: sampleFile.path
                    })
        
                    let savedSample = await newSample.save()
                    console.log(savedSample.location)
                    res.status(201).json({msg: `${eUser.firstName}, your sample, ${savedSample.location}, has been saved!`})
                } else {
                    //if no user send a 401 response
                    res.status(401).json({msg: "Not authorized to post sample!"})
                }
            }
        } catch(e) {
            next(e)
        }
    }
}