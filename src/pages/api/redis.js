import { redis } from "app/lib/redis";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Post for writing value in redis
    try {
      const { key, value } = req.body;
      if (!key || value === undefined) {
        res.status(400).json({ error: `Key and Value are required` });
      }
      await redis.set(key, JSON.stringify(value)); // Store as JSON
      res.status(200).json({ success: true, message: `Saved successfully` });
    } catch (error) {
      res
        .status(500)
        .json({
          error: `failed to write data to redis. req: ${JSON.stringify(req)}`,
        });
    }
  } else if (req.method === "GET") {
    try {
      const { key } = req.query;

      if (!key) res.status(400).json({ error: "Key is required" });

      let data = null;
      const mkey = key.split(",");
      if(mkey.length > 1){
        // if key is an array use mget to get multiple values
        data = await redis.mget(mkey);
      }else{
        data = await redis.get(key);
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "failed to read data from redis." });
    }
  } else if (req.method === "DELETE") {
    try {
      const { key } = req.body;
      if (!key) res.status(400).json({ error: "Key is required" });
      await redis.del(key);
      res
        .status(200)
        .json({ success: true, message: `Delete successfully key:${key}` });
    } catch (error) {
      res.status(500).json({ error: "failed to delete data from redis." });
    }
  }
}
