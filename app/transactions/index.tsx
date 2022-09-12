import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { PeriodHeader } from '../components/PeriodHeader/PeriodHeader';

const Transactions: NextPage = () => {
  return (
    <Layout>
      <PeriodHeader title={'asd'} />
    </Layout>
  );
};

export default Transactions;
