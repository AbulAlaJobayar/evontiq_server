import { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userSchemaValidation } from './user.validation';
import auth from '../../middleware/auth';

const router = Router();
router.post(
  '/register',
  validateRequest(userSchemaValidation.userValidation),
  userController.createUser,
);
router.get('/my-profile', auth(), userController.getMyProfileIntoDB);
router.get('/:id', userController.getUserById);
router.post('/update', auth(), userController.updateUserFromDB);

export const userRouter = router;
