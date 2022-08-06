import React from 'react';
import { string } from 'zod';
import { Transaction } from '../types';

export const TransactionRow = ({
  timePeriod,
  id,
  amount,
  date,
  description,
  category,
  subcategory,
}: Transaction) => {
  return (
    <>
      <div>{category}</div>
      <div>{amount}</div>
    </>
  );
};
