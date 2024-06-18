import Book, { IBook } from "../models/bookModel";

class BookRepository {
  async create(bookData: Partial<IBook>): Promise<IBook> {
    const book = new Book(bookData);
    return book.save();
  }

  async findById(id: string): Promise<IBook | null> {
    return Book.findById(id).populate("author publisher genre reviews").exec();
  }

  async findAll(queryParams: any): Promise<{ books: IBook[]; total: number }> {
    const { sort, limit, page, ...filters } = queryParams;

    const sortOptions = sort ? sort.split(",").join(" ") : "title";
    const limitValue = limit ? parseInt(limit) : 10;
    const skipValue = page ? (parseInt(page) - 1) * limitValue : 0;

    const booksQuery = Book.find(filters).populate(
      "author publisher genre reviews"
    );
    const books = await booksQuery
      .sort(sortOptions)
      .skip(skipValue)
      .limit(limitValue)
      .exec();
    const total = await Book.countDocuments(filters).exec();

    return { books, total };
  }

  async updateById(
    id: string,
    bookData: Partial<IBook>
  ): Promise<IBook | null> {
    return Book.findByIdAndUpdate(id, bookData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IBook | null> {
    return Book.findByIdAndDelete(id).exec();
  }
}

export default new BookRepository();
