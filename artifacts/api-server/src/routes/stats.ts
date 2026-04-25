import { Router, type IRouter } from "express";
import { Post, Category } from "@workspace/db";

const router: IRouter = Router();

const TOOL_COUNT = 10;

router.get("/stats", async (_req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const categoryCount = await Category.countDocuments();
    const views = await Post.aggregate([
      { $group: { _id: null, totalReads: { $sum: "$viewsCount" } } },
    ]);

    const totalReads = views.length > 0 ? views[0].totalReads : 0;

    res.json({
      postCount,
      toolCount: TOOL_COUNT,
      categoryCount,
      totalReads,
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

export default router;
