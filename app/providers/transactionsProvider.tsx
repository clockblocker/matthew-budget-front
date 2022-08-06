import React, { Dispatch, Context } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import { csv2jsonAsync, json2csvAsync } from 'json-2-csv';
import produce from 'immer';
import { Guid } from 'guid-typescript';

import { Transaction } from '../types';
import { parseCsv, serializedTransactionFromTransaction } from '../typecasts';

const csvState = `date,timePeriod.start,timePeriod.end,id,amount,description,category,subcategory
Jul-16-2022,Jul-16-2022,Aug-15-2022,5293031c-8cbe-af20-ec29-75d4567bdd28,5,null,Еда,Рестик
Jul-16-2022,Jul-16-2022,Aug-15-2022,d35bf2dc-398e-0a68-2a76-61762dd6ed08,15,null,Еда,Рестик
Jul-16-2022,Jul-16-2022,Aug-15-2022,9b001cd6-f86e-7389-1aaa-8dbfe09d72f4,56,Трава,Здоровье,Трава
Jul-17-2022,Jul-16-2022,Aug-15-2022,71d21573-aa8c-c16f-9571-cc178409c9c9,20,null,Еда,Рестик
Jul-18-2022,Jul-16-2022,Aug-15-2022,1e21065f-e59a-0122-8351-47b3cfbc2c07,10,Столовка,Еда,Столовка
Jul-18-2022,Jul-16-2022,Aug-15-2022,a3b7210c-6c55-f2c2-759a-26d2abe5ba39,10,Лидл,Еда,Грошериз
Jul-18-2022,Jul-16-2022,Aug-15-2022,80e8ef29-f42c-d5cc-610d-ecb201d16cd8,8,Лидл,Еда,Грошериз
Jul-19-2022,Jul-16-2022,Aug-15-2022,388d781d-3c08-5dd5-299b-129428ba8aa1,15,Столовка,Еда,Столовка
Jul-19-2022,Jul-16-2022,Aug-15-2022,38a6f6ba-4e2d-2a5d-bec0-7df7ed487330,10,Лидл,Еда,Грошериз
Jul-20-2022,Jul-16-2022,Aug-15-2022,b3f65201-7e2d-d9e4-4217-002bd056a421,8,Столовка,Еда,Столовка
Jul-20-2022,Jul-16-2022,Aug-15-2022,a81a0f28-279c-7078-6809-0e743601f65d,8,Лидл,Еда,Грошериз
null,Jul-16-2022,Aug-15-2022,d2e18d81-4c92-b73a-d05c-d94e98ff95cd,50,Лидл,Еда,Грошериз
null,Jul-16-2022,Aug-15-2022,0521ef85-cbac-ec0d-63bb-1d8a0eb61717,50,Меркель,Еда,Рестик
null,Jul-16-2022,Aug-15-2022,44eb50f8-5491-9e81-334b-9a8d4bb2dc68,800,Депозит,Хаузинг,Аренда
Jul-24-2022,Jul-16-2022,Aug-15-2022,58c73833-76d3-00df-c90b-87a51245001b,18,Пицца,Еда,Рестик
Jul-25-2022,Jul-16-2022,Aug-15-2022,6decafb6-d9c3-639a-63ae-e29ab301143e,4,Столовка,Еда,Столовка
Jul-25-2022,Jul-16-2022,Aug-15-2022,f9f6ae0a-2194-3132-14f5-aeba63d6ed96,7,Саб,Еда,Рестик
Jul-25-2022,Jul-16-2022,Aug-15-2022,7dc67ed3-27db-1a5e-e446-a943ab24b0cc,17,Томямная лапша,Еда,Рестик
Jul-25-2022,Jul-16-2022,Aug-15-2022,eddb3e99-29d0-e6bf-a9e9-2016cd21e55a,5,Фанта и печеньки,Еда,Снеки
Jul-25-2022,Jul-16-2022,Aug-15-2022,5b911927-a82d-7d9e-6b2b-64944dd8d155,4,Хумус,Еда,Столовка
Jul-26-2022,Jul-16-2022,Aug-15-2022,78b682f8-2c47-2da1-5a94-fe42bab09404,7,Снеки,Еда,Снеки
Jul-26-2022,Jul-16-2022,Aug-15-2022,e146a1d2-c705-55a9-a50e-0c2e74c76c0d,8,Вода,Еда,Грошериз
Jul-26-2022,Jul-16-2022,Aug-15-2022,93285923-b777-45ac-afcf-61deba9eedae,3,Киндер,Еда,Снеки
Jul-26-2022,Jul-16-2022,Aug-15-2022,86ba4414-b0d9-7ded-62cb-7e20d60ee0f0,9,Бумага и ручки,Канцтовары,null
Jul-26-2022,Jul-16-2022,Aug-15-2022,fae5f48c-bfde-74ad-5da3-cf16970f2ed6,5,Хумус,Еда,Столовка
Jul-27-2022,Jul-16-2022,Aug-15-2022,c27c7bb4-9914-b766-11be-248285c470e6,16,Анька с коллегами,Тусы,Бухич
Jul-27-2022,Jul-16-2022,Aug-15-2022,b8d264ec-ebd6-e572-0d93-4048c831f427,19,Тесты,Здоровье,Тесты
Jul-27-2022,Jul-16-2022,Aug-15-2022,8714bd9f-2cea-64d2-1869-ad56cf145040,8,Пицца,Еда,Столовка
Jul-27-2022,Jul-16-2022,Aug-15-2022,fff981fb-bc6f-a51d-b539-510e5da47790,10,Лиддл,Еда,Снеки
Jul-28-2022,Jul-16-2022,Aug-15-2022,e3ad1b98-6ef6-5841-d357-97d81fdc251e,5,Столовка,Еда,Столовка
Jul-28-2022,Jul-16-2022,Aug-15-2022,3028ec85-fd37-f48d-0f7a-999e5423f836,3,Снеки,Еда,Столовка
Jul-28-2022,Jul-16-2022,Aug-15-2022,245f9d6b-550d-ba89-8d0a-3584d004a72f,21,Вода,Еда,Грошериз
Jul-29-2022,Jul-16-2022,Aug-15-2022,00543394-fc12-1319-a082-0d8e86c61ee9,5,Столовка,Еда,Столовка
Jul-29-2022,Jul-16-2022,Aug-15-2022,ac472b8d-2a6d-afd1-bf42-1cc29fc073ad,2,Снеки,Еда,Столовка
Jul-29-2022,Jul-16-2022,Aug-15-2022,8f1490fd-7691-2762-6508-1589518f1553,7,Индийская,Еда,Рестик
Jul-29-2022,Jul-16-2022,Aug-15-2022,6aea30a6-31aa-d7ea-3746-b63d16d9b410,5,Кафе,Еда,Столовка
null,Jul-16-2022,Aug-15-2022,856f8890-f0c6-767e-466c-cf92edbdce2e,85,Рисование,Активности,Уроки
Jul-30-2022,Jul-16-2022,Aug-15-2022,f759a7dc-d50a-abf3-c0e0-7ef7c52cc35f,30,Индийская,Еда,Рестик
Jul-30-2022,Jul-16-2022,Aug-15-2022,af4ad299-88f1-ace7-6d58-fd31133793c7,18,Диса с кацеботами,Тусы,Бухич
Jul-30-2022,Jul-16-2022,Aug-15-2022,2b2bc4f6-ed00-5cf6-250c-3029cca252d2,24,Трава,Здоровье,Трава`;

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

csv2jsonAsync(csvState)
  .then((data) => {
    parsedTransactions = parseCsv(data);
  })
  .catch((err) => console.log('ERROR: ' + err.message));

const TransactionsProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    parsedTransactions
  );
  console.log('parsedTransactions', parsedTransactions);

  useEffect(() => {
    json2csvAsync(
      Object.values(transactions).map((t) =>
        serializedTransactionFromTransaction(t)
      )
    )
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('Transactions', data);
      })
      .catch((err) => console.log('ERROR: ' + err.message));
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
