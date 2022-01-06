import { Connection, createConnection, getConnectionOptions } from 'typeorm';



const host = process.env.NODE_ENV === 'test' || 'development' || !process.env.NODE_ENV ? 'localhost' : process.env.DB_HOST;

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'fin_api'
          : defaultOptions.database,
    }),
  );
};





