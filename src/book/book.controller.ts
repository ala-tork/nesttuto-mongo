import { Controller, Get , Post , Body , Param , Put , Delete, Query} from '@nestjs/common';
import { BookService } from './book.service';
import { get } from 'http';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
//for search
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('book')
export class BookController {
    //get instance of the service 
    constructor(private bookservice : BookService){}

    // get all the books  and search
    @Get()
    async AllBooks (@Query() query:ExpressQuery) : Promise<Book[]>{

        const books = await this.bookservice.findAll(query)
        return books; 
    }

    //Create a book
    @Post()
    async CreateBook( 
        @Body() book:CreateBookDto ,
        )    : Promise<Book> {
        return this.bookservice.Create(book);
    }

    // get book by Id 
    @Get(":id")
    async GetBookByID ( @Param('id')  id : string) : Promise<Book>{
        const book = await this.bookservice.getBookById(id);
        return book; 
    }


    // update book by Id 
    @Put(":id")
    async UpdateBookByID ( @Param('id')  id : string , @Body() book:UpdateBookDto) : Promise<Book>{
        const res = await this.bookservice.updateBookById(id,book);
        return res; 
    }


    // delete book by Id 
    @Delete(":id")
    async DeleteBookByID ( @Param('id')  id : string) : Promise<Book>{
        const book = await this.bookservice.deleteBookById(id);
        return book; 
    }
}
