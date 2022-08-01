export type TimePeriod = {
  start: Date;
  end: Date;
};

export type TransactionMandatoryFields = {
  id: string;
  amount: number;
  timePeriod: TimePeriod;
};

export type TransactionOptinalFields = {
  date: Date | null;
  description: string | null;
  category: string | null;
  subcategory: string | null;
};

export type Transaction = TransactionMandatoryFields & TransactionOptinalFields;
