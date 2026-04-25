import { Router, type IRouter } from "express";
import healthRouter from "./health";
import postsRouter from "./posts";
import categoriesRouter from "./categories";
import tagsRouter from "./tags";
import toolsRouter from "./tools";
import statsRouter from "./stats";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(postsRouter);
router.use(categoriesRouter);
router.use(tagsRouter);
router.use(toolsRouter);
router.use(statsRouter);
router.use(contactRouter);
router.use(newsletterRouter);

export default router;
