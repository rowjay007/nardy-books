"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="07c92976-8329-50ca-8e2d-445daa681af4")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
exports.constants = {
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
        USER_PROFILE: (userId) => `user_profile_${userId}`,
    },
};
//# sourceMappingURL=constants.js.map
//# debugId=07c92976-8329-50ca-8e2d-445daa681af4
