import { v4 as uuidv4 } from "uuid";

const PREFIX = "ADM_";

export const generateUniqueReference = (): string => {
  const uuid = uuidv4().replace(/-/g, "").substring(0, 8); 
  return `${PREFIX}${uuid}`;
};


