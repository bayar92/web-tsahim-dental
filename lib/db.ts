import sql from 'mssql';

export async function getDbConnectionById(id: string | number) {
  const dbName = `${id}`;

  const config: sql.config = {
    user: process.env.DENTAL_DB_USER,
    password: process.env.DENTAL_DB_PASS,
    server: process.env.DENTAL_DB_HOST!,
    port: Number(process.env.DENTAL_DB_PORT),
    database: dbName,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await new sql.ConnectionPool(config).connect();
    return pool;
  } catch (err) {
    throw err;
  }
}
