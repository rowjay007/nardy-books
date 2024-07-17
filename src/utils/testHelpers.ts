import { Request, Response } from "express";

export const mockRequest = (): Partial<Request> => ({
  body: {},
  params: {},
  query: {},
  headers: {},
});

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
};
