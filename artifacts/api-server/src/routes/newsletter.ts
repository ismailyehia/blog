import { Router, type IRouter } from "express";
import { NewsletterSubscription } from "@workspace/db";
import { SubscribeToNewsletterBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const body = SubscribeToNewsletterBody.parse(req.body);
    const existing = await NewsletterSubscription.findOne({ email: body.email });
    if (existing) {
      return res.status(201).json({
        id: existing._id.toString(),
        email: existing.email,
        createdAt: existing.createdAt.toISOString(),
      });
    }
    const subscription = new NewsletterSubscription({ email: body.email });
    const saved = await subscription.save();
    res.status(201).json({
      id: saved._id.toString(),
      email: saved.email,
      createdAt: saved.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

export default router;
