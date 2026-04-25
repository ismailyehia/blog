import { Router, type IRouter } from "express";
import { Post, Category, Tag, Author } from "@workspace/db";
import {
  ListPostsQueryParams,
  ListRecentPostsQueryParams,
  ListPopularPostsQueryParams,
  GetPostBySlugParams,
  GetRelatedPostsParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toSummary(p: any) {
  return {
    id: p._id.toString(),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImageUrl,
    readingMinutes: p.readingMinutes,
    viewsCount: p.viewsCount,
    publishedAt: p.publishedAt.toISOString(),
    featured: p.featured,
    category: p.categoryId ? {
      id: p.categoryId._id.toString(),
      slug: p.categoryId.slug,
      name: p.categoryId.name,
      description: p.categoryId.description,
      color: p.categoryId.color,
    } : null,
    tags: (p.tags || []).map((t: any) => ({
      id: t._id.toString(),
      slug: t.slug,
      name: t.name
    })),
    author: p.authorId ? {
      name: p.authorId.name,
      avatarUrl: p.authorId.avatarUrl,
      bio: p.authorId.bio,
    } : null,
  };
}

function toDetail(p: any) {
  return {
    ...toSummary(p),
    content: p.content,
    seoTitle: p.seoTitle || p.title,
    seoDescription: p.seoDescription || p.excerpt,
  };
}

router.get("/posts", async (req, res) => {
  try {
    const params = ListPostsQueryParams.parse(req.query);
    const limit = params.limit ?? 12;
    const offset = params.offset ?? 0;

    const query: any = {};

    if (params.search) {
      query.$or = [
        { title: { $regex: params.search, $options: "i" } },
        { excerpt: { $regex: params.search, $options: "i" } },
      ];
    }

    if (params.category) {
      const cat = await Category.findOne({ slug: params.category });
      if (!cat) {
        return res.json({ items: [], total: 0, limit, offset });
      }
      query.categoryId = cat._id;
    }

    if (params.tag) {
      const tag = await Tag.findOne({ slug: params.tag });
      if (!tag) {
        return res.json({ items: [], total: 0, limit, offset });
      }
      query.tags = tag._id;
    }

    const total = await Post.countDocuments(query);
    const items = await Post.find(query)
      .sort({ publishedAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");

    res.json({
      items: items.map(toSummary),
      total,
      limit,
      offset,
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

router.get("/posts/featured", async (_req, res) => {
  try {
    const items = await Post.find({ featured: true })
      .sort({ publishedAt: -1 })
      .limit(6)
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");
    res.json(items.map(toSummary));
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

router.get("/posts/recent", async (req, res) => {
  try {
    const params = ListRecentPostsQueryParams.parse(req.query);
    const limit = params.limit ?? 6;
    const items = await Post.find()
      .sort({ publishedAt: -1 })
      .limit(limit)
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");
    res.json(items.map(toSummary));
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

router.get("/posts/popular", async (req, res) => {
  try {
    const params = ListPopularPostsQueryParams.parse(req.query);
    const limit = params.limit ?? 5;
    const items = await Post.find()
      .sort({ viewsCount: -1 })
      .limit(limit)
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");
    res.json(items.map(toSummary));
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

router.get("/posts/:slug", async (req, res) => {
  try {
    const { slug } = GetPostBySlugParams.parse(req.params);
    const post = await Post.findOne({ slug })
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");

    if (!post) {
      return res.status(404).json({ error: "not_found", message: "Post not found" });
    }

    // Increment view count
    post.viewsCount += 1;
    await post.save();

    res.json(toDetail(post));
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

router.get("/posts/:slug/related", async (req, res) => {
  try {
    const { slug } = GetRelatedPostsParams.parse(req.params);
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.json([]);
    }

    const items = await Post.find({
      categoryId: post.categoryId,
      _id: { $ne: post._id },
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .populate("authorId")
      .populate("categoryId")
      .populate("tags");

    res.json(items.map(toSummary));
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

export default router;
