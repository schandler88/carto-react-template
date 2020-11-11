import { executeSQL } from 'lib/sdk';

export const getStore = async ({ id, credentials }) => {
  const query = `
    SELECT address, city, phone, revenue, storetype, zip, ST_X(the_geom) as longitude, ST_Y(the_geom) as latitude
      FROM mcdonalds 
      WHERE store_id='${id}'
  `;

  return await executeSQL(credentials, query).then((data) => data[0]);
};

export const getRevenuePerMonth = async ({ id, credentials }) => {
  const query = `
      SELECT revenue, date, 
          (
            SELECT AVG(revenue) 
            FROM mcdonalds_revenue sub
            WHERE sub.date =  date
          ) as avg
        FROM mcdonalds_revenue
        WHERE store_id='${id}'
  `;
  return await executeSQL(credentials, query);
};
