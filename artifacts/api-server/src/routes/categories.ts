import { Router, type IRouter } from "express";
import { Category, Post } from "@workspace/db";

const router: IRouter = Router();

router.get("/categories", async (_req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const results = await Promise.all(
      categories.map(async (cat) => {
        const postCount = await Post.countDocuments({ categoryId: cat._id });
        return {
          id: cat._id.toString(),
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          color: cat.color,
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
