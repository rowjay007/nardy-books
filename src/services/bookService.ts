import BookRepository from "../repositories/bookRepository";
import { IBook } from "../models/bookModel";

class BookService {
  async createBook(bookData: Partial<IBook>): Promise<IBook> {
    return BookRepository.create(bookData);
  }

  async getBookById(id: string): Promise<IBook | null> {
    return BookRepository.findById(id);
  }

  async getAllBooks(
    queryParams: any
  ): Promise<{ books: IBook[]; total: number }> {
    return BookRepository.findAll(queryParams);
  }

  async updateBookById(
    id: string,
    bookData: Partial<IBook>
  ): Promise<IBook | null> {
    return BookRepository.updateById(id, bookData);
  }

  async deleteBookById(id: string): Promise<IBook | null> {
    return BookRepository.deleteById(id);
  }
}

export default new BookService();
