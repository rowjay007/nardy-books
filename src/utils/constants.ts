export const constants = {
  USER_ROLES: {
    ADMIN: "admin",
    USER: "user",
  },
  RESPONSE_MESSAGES: {
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid credentials",
    BOOK_NOT_FOUND: "Book not found",
    UNAUTHORIZED: "Unauthorized access",
  },
  CACHE_KEYS: {
    ALL_BOOKS: "all_books",
    USER_PROFILE: (userId: string) => `user_profile_${userId}`,
  },
};
