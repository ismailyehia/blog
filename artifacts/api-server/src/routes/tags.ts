import { Router, type IRouter } from "express";
import { Tag, Post } from "@workspace/db";

const router: IRouter = Router();

router.get("/tags", async (_req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    const results = await Promise.all(
      tags.map(async (tag) => {
        const postCount = await Post.countDocuments({ tags: tag._id });
        return {
          id: tag._id.toString(),
          slug: tag.slug,
          name: tag.name,
          postCount,
        };
      }),
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

export default router;
