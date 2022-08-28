import {IsNotEmpty} from "class-validator";

export class BankCreationDto {
    @IsNotEmpty({message:'Please provide a bank name'})
    name!: string;
}
