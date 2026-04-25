import { Router, type IRouter } from "express";
import { ContactSubmission } from "@workspace/db";
import { SubmitContactFormBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactFormBody.parse(req.body);
    const submission = new ContactSubmission({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
    const saved = await submission.save();
    res.status(201).json({
      id: saved._id.toString(),
      name: saved.name,
      email: saved.email,
      subject: saved.subject,
      message: saved.message,
      createdAt: saved.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: (err as Error).message });
  }
});

export default router;
