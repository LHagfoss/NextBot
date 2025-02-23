export const getDatabaseURL = () => {
  if (process.env.VERCEL_ENV) {
    return `${process.env.DATABASE_URL}?pgbouncer=true&connection_limit=1`;
  }
  return process.env.DATABASE_URL;
}; 