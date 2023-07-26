import { IsNotEmpty ,IsString , IsNumber , IsEnum} from "class-validator";
import { Catrgorys } from "../schemas/book.schema"

export class CreateBookDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;
    @IsNotEmpty()
    @IsString()
    readonly description : string;
    @IsNotEmpty()
    @IsString()
    readonly author :string;
    @IsNotEmpty()
    @IsNumber()
    readonly price : number;
    @IsNotEmpty()
    @IsEnum(Catrgorys,{message:"pelase enter correct category"})
    readonly category : Catrgorys;
}