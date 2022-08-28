import {IsEmail, IsMongoId, isMongoId, IsNotEmpty} from "class-validator";

export class ScrapeDto {
    @IsNotEmpty()
    @IsMongoId({message:'Bank with ID not found',})
    bankId!: string;
    @IsNotEmpty()
    @IsEmail()
    customerEmail!: string;
    @IsNotEmpty()
    customerPassword!: string;
}
