declare namespace Express {
  interface Request {
    userId?: string;
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
  }
}

declare module "mongoose" {
  export interface Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Types {
    ObjectId: import("mongodb").ObjectId;
  }
}
