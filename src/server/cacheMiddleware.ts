import * as express from 'express';
import * as LRUCache from 'lru-cache';

const router = express.Router();
export const ssrCache = new LRUCache({
  max: 500,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export const getCacheKey = (req: express.Request) => {
  return `${req.url}`;
};

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.SSR_CACHE === 'true') {
    const key = getCacheKey(req);

    if (ssrCache.has(key)) {
      res.send(ssrCache.get(key));
      return;
    }
  }

  next();
});

export const cacheMiddleware = router;
