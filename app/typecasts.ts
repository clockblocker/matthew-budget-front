import { z } from 'zod';

import { TimePeriod, Transaction, TransactionZ } from './types';

export const parseCsv = (rows: any[]) => {
  const state: Record<string, Transaction> = {};
  rows.forEach((r) => {
    try {
      const t = TransactionZ.parse(r);
      state[t.id] = t;
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(r, err.issues);
      }
    }
  });
  return state;
};

const formattedDateStringFromDate = (d: Date | null) =>
  d ? d.toDateString().slice(4).replaceAll(' ', '-') : null;

const stringifyedTimePeriodFromTimePeriod = ({ start, end }: TimePeriod) => {
  return {
    start: formattedDateStringFromDate(start),
    end: formattedDateStringFromDate(end),
  };
};

export const serializedTransactionFromTransaction = ({
  timePeriod,
  date,
  ...rest
}: Transaction) => {
  return {
    date: formattedDateStringFromDate(date),
    timePeriod: stringifyedTimePeriodFromTimePeriod(timePeriod),
    ...rest,
  };
};
