import NodeCache from "node-cache";

export const CACHE_TTL_SECONDS = 600;

const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS, checkperiod: 120 });

export default cache;
