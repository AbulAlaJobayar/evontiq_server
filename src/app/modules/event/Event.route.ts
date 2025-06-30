import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { EventController } from './event.controller';
import { eventSchemaValidation } from './event.validation';

const router = Router();
router.post(
  '/',
  auth(),
  validateRequest(eventSchemaValidation.eventValidation),
  EventController.createEventIntoDB,
);
router.post(
  '/book',
  auth(),
  validateRequest(eventSchemaValidation.bookEventValidation),
  EventController.attendEventById,
);
router.get(
  '/book',
  auth(),
  EventController.getMyBookedEvents,
);
router.get('/', EventController.getAllEventIntoDB);

router.get('/:id', auth(), EventController.getSingleEventFromDB);
router.patch('/:id', auth(), EventController.updateEventFromDB);
router.delete('/:id', auth(), EventController.delateEventFromDB);
router.post(
  '/delateMany',
  //  auth(),
  EventController.bulkDelateFromDB,
);

export const EventRouter = router;
