import { Router } from 'express';
import { userRouter } from '../modules/User/user.route';
import { authRouter } from '../modules/auth/auth.route';
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
  // {
  //   path: '/product',
  //   route: productRouter,
  // },
  // {
  //   path: '/sale',
  //   route: salesRouter,
  // },
  // {
  //   path: '/coupon',
  //   route: couponRouter,
  // },
  // {
  //   path: '/customer',
  //   route: CustomerRouter,
  // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router
