import {IsEmail, IsNotEmpty} from "class-validator";

export class ScrapeDto {
    @IsNotEmpty()
    bankId!: string;
    @IsNotEmpty()
    @IsEmail()
    customerEmail!: string;
    @IsNotEmpty()
    customerPassword!: string;
}
