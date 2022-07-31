import { TimePeriod, Transaction } from './types';
import { TransactionMandatoryFields, TransactionOptinalFields } from './types';

const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

function entries<T>(obj: T): Entries<T> {
  return Object.entries(obj) as any;
}

export const makeDummyTimePeriod: () => TimePeriod = () => ({
  start: new Date(),
  end: new Date(),
});

export const makeDummyTransactionWithMandatoryFields: () => TransactionMandatoryFields =
  () => ({
    id: -1,
    amount: 0,
    timePeriod: makeDummyTimePeriod(),
  });

export const makeDummyTransactionOptinalFieldsObject: () => TransactionOptinalFields =
  () => ({
    date: null,
    description: null,
    category: null,
    subcategory: null,
  });

export const makeDummyTransaction: () => Transaction = () => ({
  ...makeDummyTransactionWithMandatoryFields(),
  ...makeDummyTransactionOptinalFieldsObject(),
});

export const mandatoryFields = getKeys(
  makeDummyTransactionWithMandatoryFields()
);
export const optinalFields = getKeys(makeDummyTransactionOptinalFieldsObject());
export const transactionFields = getKeys(makeDummyTransaction());
export const timePeriodFields = getKeys(makeDummyTimePeriod());

export const timePeriodOrNullFromObject = (o: Record<string, any>) => {
  const tp = makeDummyTimePeriod();
  if ('start' in o && o.start) {
    tp.start = new Date(o.start);
    if ('end' in o && o.end) {
      tp.end = new Date(o.end);
      return tp;
    }
  }

  return null;
};

export const transactionMandatoryFieldsOrNullFromObject = (
  o: Record<string, any>
) => {
  const mf = makeDummyTransactionWithMandatoryFields();
  if ('timePeriod' in o && typeof o.timePeriod == 'object') {
    const tp = timePeriodOrNullFromObject(o.timePeriod);
    if (tp && 'id' in o && typeof parseInt(`${o.id}`) == 'number') {
      mf.timePeriod = tp;
      mf.id = parseInt(`${o.id}`);

      if ('amount' in o && typeof parseFloat(`${o.amount}`) == 'number') {
        mf.amount = parseFloat(`${o.amount}`);

        return mf;
      }
    }
  }
  return null;
};

export const transactionOrNullFromObject = (o: Record<string, any>) => {
  const mandatoryFields = transactionMandatoryFieldsOrNullFromObject(o);
  if (!mandatoryFields) {
    return null;
  }

  const transaction: Transaction = {
    ...makeDummyTransaction(),
    ...mandatoryFields,
  };

  if ('date' in o && o.date) {
    transaction.date = new Date(o.date);
  }
  if ('description' in o && typeof o.description === 'string') {
    transaction.description = o.description || null;
  }
  if ('category' in o && typeof o.category === 'string') {
    transaction.category = o.category || null;
  }
  if ('subcategory' in o && typeof o.subcategory === 'string') {
    transaction.subcategory = o.subcategory || null;
  }
  return transaction;
};

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
}
