import { z } from 'zod';

const eventValidation = z.object({
  title:z.string({
    invalid_type_error: 'title must be string',
    required_error: 'title must be required',
  }),
  name: z.string({
    invalid_type_error: 'Name must be string',
    required_error: 'name must be required',
  }),
  date: z.string({
    invalid_type_error: 'date must be string',
    required_error: 'date must be required',
  }),
  time: z.string({
    invalid_type_error: 'time must be number',
    required_error: 'time must be required',
  }),

  location: z.string({
   invalid_type_error: 'Location must be number',
    required_error: 'Location must be required', 
  }),

  description: z.string({
    invalid_type_error: 'description must be string',
    required_error: 'description must be required',
  }),
});

const bookEventValidation=z.object({
eventId:z.string({
   invalid_type_error: 'description must be string',
    required_error: 'description must be required',
})
})

export const eventSchemaValidation = {
  eventValidation,
  bookEventValidation
};
