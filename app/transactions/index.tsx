import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { PeriodHeader } from '../components/PeriodHeader';
import { TransactionList } from '../components/TransactionList';
import { useCurrentPeriod } from '../providers/currentPeriodAtom';

const Transactions: NextPage = () => {
  const { currentPertiod, setCurrentPertiod } = useCurrentPeriod();

  return (
    <Layout>
      <PeriodHeader />
      <TransactionList />
      <div>{`${currentPertiod.start}-${currentPertiod.start}`}</div>
    </Layout>
  );
};

export default Transactions;
