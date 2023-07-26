import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
//for search
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
    //inject the book module and schema get instance of them 
    constructor(
        @InjectModel(Book.name)
        private bookModel : mongoose.Model<Book>
    ){}

    //fucntion to get all books && search && pagination 
    
    async findAll(query : Query): Promise<Book[]>{
        
        const resPage =2 ;
        const currentpage = Number(query.page) || 1;
        const skip = resPage * (currentpage -1 );


        const keyword = query.keyword?{
            title : {
                $regex:query.keyword,
                $options : 'i'
            }
        }:{}
        const books = await this.bookModel.find({...keyword}).limit(resPage).skip(skip);
        return books;
    }

    //Create a book
    async Create(book : Book) : Promise<Book>{
      const res = await this.bookModel.create(book)
        return res
    }

    //get Book by Id 
    async getBookById(id : string) : Promise<Book> {
        try{
            const res = await this.bookModel.findById(id);
            return res;
        }catch{
            throw new NotFoundException('Book Not Found.');
        }
    }


    //Update Book by Id 
    async updateBookById(id : string,book :Book) : Promise<Book> {
        try{
            const res = await this.bookModel.findByIdAndUpdate(id,book,{
                new  :true,
                runValidators: true
            });
            return res;
        }catch{
            throw new NotFoundException('Book Not Found.');
        }
    }

    //delete Book by Id 
    async deleteBookById(id : string) : Promise<Book> {
        try{
            const res = await this.bookModel.findByIdAndDelete(id);
            return res;
        }catch{
            throw new NotFoundException('Book Not Found.');
        }
    }
}
