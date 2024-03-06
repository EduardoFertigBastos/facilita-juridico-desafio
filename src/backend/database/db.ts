import { pool } from './connection';

export const query = async (
  text: string, 
  params?: any, 
  callback?: any
): Promise<any> => {
  return await pool.query(text, params, callback)
}
