import React, { Dispatch, Context } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import { csv2jsonAsync, csv2json } from 'json-2-csv';
import produce from 'immer';
import { Guid } from 'guid-typescript';

import { Transaction } from '../types';
import { transactionOrNullFromObject, notEmpty } from '../typecasts';

const dummyCsvState = `description,category,amount,subcategory,date,timePeriod.start,timePeriod.end
,Еда,5,Рестик,2022-07-16,2022-07-16,2022-08-15
,Еда,15,Рестик,2022-07-16,2022-07-16,2022-08-15
Трава,Здоровье,56,Трава,2022-07-16,2022-07-16,2022-08-15
,Еда,20,Рестик,2022-07-17,2022-07-16,2022-08-15
Столовка,Еда,10,Столовка,2022-07-18,2022-07-16,2022-08-15
Лидл,Еда,10,Грошериз,2022-07-18,2022-07-16,2022-08-15
Лидл,Еда,8,Грошериз,2022-07-18,2022-07-16,2022-08-15
Столовка,Еда,15,Столовка,2022-07-19,2022-07-16,2022-08-15
Лидл,Еда,10,Грошериз,2022-07-19,2022-07-16,2022-08-15
Столовка,Еда,8,Столовка,2022-07-20,2022-07-16,2022-08-15
Лидл,Еда,8,Грошериз,2022-07-20,2022-07-16,2022-08-15
Лидл,Еда,50,Грошериз,,2022-07-16,2022-08-15
Меркель,Еда,50,Рестик,,2022-07-16,2022-08-15
Депозит,Хаузинг,800,Аренда,,2022-07-16,2022-08-15
Пицца,Еда,18,Рестик,2022-07-24,2022-07-16,2022-08-15
Столовка,Еда,4,Столовка,2022-07-25,2022-07-16,2022-08-15
Саб,Еда,7,Рестик,2022-07-25,2022-07-16,2022-08-15
Томямная лапша,Еда,17,Рестик,2022-07-25,2022-07-16,2022-08-15
Фанта и печеньки,Еда,5,Снеки,2022-07-25,2022-07-16,2022-08-15
Хумус,Еда,4,Столовка,2022-07-25,2022-07-16,2022-08-15
Снеки,Еда,7,Снеки,2022-07-26,2022-07-16,2022-08-15
Вода,Еда,8,Грошериз,2022-07-26,2022-07-16,2022-08-15
Киндер,Еда,3,Снеки,2022-07-26,2022-07-16,2022-08-15
Бумага и ручки,Канцтовары,9,,2022-07-26,2022-07-16,2022-08-15
Хумус,Еда,5,Столовка,2022-07-26,2022-07-16,2022-08-15
Анька с коллегами,Тусы,16,Бухич,2022-07-27,2022-07-16,2022-08-15
Тесты,Здоровье,19,Тесты,2022-07-27,2022-07-16,2022-08-15
Пицца,Еда,8,Столовка,2022-07-27,2022-07-16,2022-08-15
Лиддл,Еда,10,Снеки,2022-07-27,2022-07-16,2022-08-15
Столовка,Еда,5,Столовка,2022-07-28,2022-07-16,2022-08-15
Снеки,Еда,3,Столовка,2022-07-28,2022-07-16,2022-08-15
Вода,Еда,21,Грошериз,2022-07-28,2022-07-16,2022-08-15
Столовка,Еда,5,Столовка,2022-07-29,2022-07-16,2022-08-15
Снеки,Еда,2,Столовка,2022-07-29,2022-07-16,2022-08-15
Индийская,Еда,7,Рестик,2022-07-29,2022-07-16,2022-08-15
Кафе,Еда,5,Столовка,2022-07-29,2022-07-16,2022-08-15
Рисование,Активности,85,Уроки,,2022-07-16,2022-08-15
Индийская,Еда,30,Рестик,2022-07-30,2022-07-16,2022-08-15
Диса с кацеботами,Тусы,18,Бухич,2022-07-30,2022-07-16,2022-08-15
Трава,Здоровье,24,Трава,2022-07-30,2022-07-16,2022-08-15`;

enum TransactionActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

type TransactionAction = {
  type: TransactionActionType;
  transactions: Transaction[];
};

interface TransactionsContext {
  transactions: Record<string, Transaction>;
  dispatch: Dispatch<TransactionAction>;
}

const transactionsReducer = (
  state: Record<string, Transaction>,
  action: TransactionAction
) => {
  const nextState = produce(state, (draft) => {
    switch (action.type) {
      case TransactionActionType.CREATE: {
        action.transactions.forEach((transaction) => {
          const id = Guid.create().toString();
          draft[id] = { ...transaction, id };
        });
        break;
      }
      case TransactionActionType.DELETE: {
        action.transactions.forEach(({ id }) => {
          delete draft[id];
        });
        break;
      }
      case TransactionActionType.UPDATE: {
        action.transactions.forEach(({ id, ...rest }) => {
          draft[id] = { id: Guid.create().toString(), ...rest };
        });
      }
      default: {
        break;
      }
    }
  });
  return nextState;
};

const TransactionsContext: Context<TransactionsContext> = createContext(
  {} as TransactionsContext
);

let parsedTransactions: Record<string, Transaction> = {};

csv2jsonAsync(dummyCsvState)
  .then((data) => {
    parsedTransactions = Object.fromEntries(
      (
        data
          .map((row) =>
            transactionOrNullFromObject({
              ...row,
              id: Guid.create().toString(),
            })
          )
          .filter((t) => notEmpty(t)) as Transaction[]
      ).map(({ id, ...rest }) => [id, { id, ...rest }])
    );
  })
  .catch((err) => console.log('ERROR: ' + err.message));

//   JSON.parse(localStorage.getItem('Transaction') sas string) || [];

const TransactionsProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    parsedTransactions
  );

  console.log('transactions', transactions);

  // useEffect(() => {
  //   csv2jsonAsync(dummyCsvState)
  //     .then((data) => {
  //       const parsedTransactions: Transaction[] = data
  //         .map((row, i) => transactionOrNulAlFromObject({ ...row, id: i }))
  //         .filter((t) => notEmpty(t)) as Transaction[];
  //       console.log(parsedTransactions);
  //     })
  //     .catch((err) => console.log('ERROR: ' + err.message));
  // }, []);

  useEffect(() => {
    localStorage.setItem('Transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        dispatch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsProvider, TransactionsContext };
