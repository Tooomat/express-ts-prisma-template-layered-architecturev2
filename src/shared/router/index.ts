import { Request, Response, Router } from "express";
import { publicRouter }  from './public.routes'
import { privateRouter } from './private.routes'
import { not_found_handler, success_handler_without_data } from "../response/web.response";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return success_handler_without_data(res, "main routes!", 200);
})

router.get("/ping", (req: Request, res: Response) => {
  return success_handler_without_data(res, "pong!", 200);
});

router.use(publicRouter)
router.use(privateRouter)

router.use((req: Request, res: Response) => {
  console.log(`❌ Route not found: ${req.method} ${req.path}`);
  return not_found_handler(res);
});


export default router;