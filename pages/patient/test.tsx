// pages/patient/test.tsx
import React from "react";
import { GetServerSideProps } from "next";

type Props = {
  dbUser: string;
  dbHost: string;
  dbPort: string;
};

const TestPage = ({ dbUser, dbHost, dbPort }: Props) => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>DB USER: {dbUser}</p>
      <p>DB HOST: {dbHost}</p>
      <p>DB PORT: {dbPort}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      dbUser: process.env.DENTAL_DB_USER || "Not set",
      dbHost: process.env.DENTAL_DB_HOST || "Not set",
      dbPort: process.env.DENTAL_DB_PORT || "Not set",
    },
  };
};

export default TestPage;
