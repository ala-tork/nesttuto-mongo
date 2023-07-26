import { IsOptional ,IsString , IsNumber , IsEnum} from "class-validator";
import { Catrgorys } from "../schemas/book.schema"

export class UpdateBookDto{
    @IsOptional()
    @IsString()
    readonly title:string;
    @IsOptional()
    @IsString()
    readonly description : string;
    @IsOptional()
    @IsString()
    readonly author :string;
    @IsOptional()
    @IsNumber()
    readonly price : number;
    @IsOptional()
    @IsEnum(Catrgorys,{message:"pelase enter correct category"})
    readonly category : Catrgorys;
}