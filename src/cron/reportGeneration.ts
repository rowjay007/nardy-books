import Book from "../models/bookModel";
import User from "../models/userModel";
import logger from "../config/logger";
import fs from "fs/promises";
import path from "path";

export async function generateReports() {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const topRatedBooks = await Book.find().sort({ ranking: -1 }).limit(10);

    const report = {
      date: new Date().toISOString(),
      totalUsers,
      totalBooks,
      topRatedBooks: topRatedBooks.map((book: any) => ({
        title: book.title,
        author: book.author,
        ranking: book.ranking,
      })),
    };

    const reportPath = path.join(
      __dirname,
      "..",
      "..",
      "reports",
      `weekly_report_${report.date}.json`
    );
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    logger.info(`Generated weekly report: ${reportPath}`);
  } catch (error) {
    logger.error("Error generating weekly report:", error);
  }
}
