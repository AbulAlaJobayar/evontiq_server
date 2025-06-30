import { Router } from 'express';
import { userRouter } from '../modules/User/user.route';
import { authRouter } from '../modules/auth/auth.route';
import { EventRouter } from '../modules/event/Event.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/event',
    route: EventRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
