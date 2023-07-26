import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
//enum for category 
export enum  Catrgorys{
    ADENTURE="Adventure",
    CLASSIC="Classic",
    CRIME="Crime"
}


@Schema({
    timestamps:true
})
export class Book{
    @Prop()
    title:String;
    @Prop()
    description:String;
    @Prop()
    author:String;
    @Prop()
    price:number;
    @Prop()
    category : Catrgorys;
}

export const BookSchema = SchemaFactory.createForClass(Book);