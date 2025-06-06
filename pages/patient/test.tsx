// pages/patient/test.tsx
import React from "react";
import { GetServerSideProps } from "next";

type Props = {
  dbUser: string;
  dbHost: string;
    dbPort: string;
    t1: string,
    t2: string,
    t3: string,
  t4: string,
};

const TestPage = ({ dbUser, dbHost, dbPort, t1,t2,t3,t4 }: Props) => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>DB USER: {dbUser}</p>
      <p>DB HOST: {dbHost}</p>
          <p>DB PORT: {dbPort}</p>
          <p>DB PORT: {t1}</p>
          <p>DB PORT: {t2}</p>
          <p>DB PORT: {t3}</p>
          <p>DB PORT: {t4}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      dbUser: process.env.DENTAL_DB_USER || "Not set",
      dbHost: process.env.DENTAL_DB_HOST || "Not set",
      dbPort: process.env.DENTAL_DB_PORT || "Not set",
      t1: process.env.NEXT_PUBLIC_APP_NAME || "Not set",
      t2: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Not set",
      t3: process.env.QPAY_INVOICE_CODE || "Not set",
      t4: process.env.QPAY_USERNAME || "Not set",
    },
  };
};

export default TestPage;
