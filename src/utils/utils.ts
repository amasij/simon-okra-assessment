import {NotFoundException} from "@nestjs/common";

const mongoose = require('mongoose');

export class Utils{
    static capitalize(text:string):string{
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static isValidMongoId(id:string):boolean{
        return mongoose.Types.ObjectId.isValid(id);
    }

    static validateMongoId(id:string,modelName?:string){
        if(!Utils.isValidMongoId(id)){
            throw new NotFoundException(`${modelName ? modelName + ' with ' : ''}id: ${id} not found`);
        }

    }
}
