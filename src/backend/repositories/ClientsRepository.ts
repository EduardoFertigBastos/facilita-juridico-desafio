import Client from "@/interfaces/Client";
import { query } from "../database/db";

export interface FindManyFilters {
  name: string | null;
  email: string | null;
  phone: number | null;
}

class ClientsRepository {

  async findByEmail(email: string): Promise<Client | null> {
    const queryString = `SELECT * FROM clients WHERE email = $1`;

    const { rows } = await query(queryString, [email]);

    if (!rows.length) {
      return null;
    }

    const client = {
      ...rows[0],
      coordinate_x: parseFloat(rows[0].coordinate_x),
      coordinate_y: parseFloat(rows[0].coordinate_y)
    }

    return client;
  }

  async findMany(filter?: FindManyFilters): Promise<Client[]> {
    const { name, email, phone } = filter || {};
    function buildQueryConditions() {
      let conditions = '';
      let conditionNumber = 1;
      const queryParams = [];

      if (name) {
        conditions += ` AND name ILIKE $${conditionNumber}`;
        conditionNumber += 1;
        queryParams.push(`%${name}%`);
      }

      if (email) {
        conditions += ` AND email ILIKE $${conditionNumber}`;
        conditionNumber += 1;
        queryParams.push(`%${email}%`);
      }

      if (phone) {
        conditions += ` AND phone ILIKE $${conditionNumber}`;
        conditionNumber += 1;
        queryParams.push(`%${phone}%`);
      }

      return {
        conditions,
        queryParams
      };
    }

    const { conditions, queryParams } = buildQueryConditions();
    
    // Where 1 = 1 não afeta o resultado da query e facilita a manutenção
    // além de não causar perdas de performance
    const queryString = `
      SELECT * 
        FROM clients
       WHERE 1 = 1
             ${conditions}
    `;

    const { rows } = await query(queryString, queryParams);

    const clients: Client[] = rows.map((client: any) => ({
      ...client,
      coordinate_x: parseFloat(client.coordinate_x),
      coordinate_y: parseFloat(client.coordinate_y)
    }));

    return clients;
  }

  async create({
    email,
    phone,
    name,
    coordinate_x,
    coordinate_y
  }: Client): Promise<boolean> {
    const queryString = `INSERT INTO clients(email, phone, name, coordinate_x, coordinate_y)
                        VALUES ($1, $2, $3, $4, $5)`;

    const { rowCount } = await query(
      queryString,
      [email, phone, name, coordinate_x, coordinate_y]
    );

    const isClientInserted = !!rowCount;

    return isClientInserted;
  }

}

export default ClientsRepository;