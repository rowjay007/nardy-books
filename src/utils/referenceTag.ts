import { v4 as uuidv4 } from "uuid";

export const generateUniqueReference = (prefix: string): string => {
  const uuid = uuidv4().replace(/-/g, "").substring(0, 8);
  return `${prefix}${uuid}`;
};
