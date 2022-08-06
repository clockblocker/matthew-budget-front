import type { NextPage } from 'next';
import styled from 'styled-components';
import { EditTransactionForm } from './edit-transaction/EditTransaction';
import { TransactionRow } from './TransactionRow';

const PageContainer = styled.section`
  background-color: #222536;
  color: var(--color-accent);
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const ContentContainer = styled.section`
  background-color: grey;
  height: 100%;
  /* Large desktops and laptops */
  @media (min-width: 1200px) {
    width: 50%;
  }

  /* Landscape tablets and medium desktops */
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 60%;
  }

  /* Portrait tablets and small desktops */
  @media (min-width: 768px) and (max-width: 991px) {
    width: 60%;
  }

  /* Landscape phones and portrait tablets */
  @media (max-width: 767px) {
    width: 80%;
  }

  /* Portrait phones and smaller */
  @media (max-width: 480px) {
    width: 100%;
  }
  display: flex;
`;

const Transactions: NextPage = () => {
  return (
    <PageContainer>
      <ContentContainer>{}</ContentContainer>
    </PageContainer>
  );
};

export default Transactions;
