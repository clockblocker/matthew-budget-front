import { z } from 'zod';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return new Date(arg);
  }
}, z.date());

export type DateSchema = z.infer<typeof dateSchema>;

export const TimePeriodZ = z.object({
  start: dateSchema,
  end: dateSchema,
});

export type TimePeriod = z.infer<typeof TimePeriodZ>;

export const TransactionZ = z.object({
  timePeriod: TimePeriodZ,
  id: z.string(),
  amount: z.number(),
  date: dateSchema.nullable(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  subcategory: z.string().nullable(),
});

export type Transaction = z.infer<typeof TransactionZ>;
