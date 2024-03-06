import ClientsRepository, { FindManyFilters } from "../repositories/ClientsRepository";

class FetchClientsService {
  constructor(private clientsRespository: ClientsRepository) {}

  async execute({ name, email, phone }: FindManyFilters) {
    const clients = await this.clientsRespository.findMany({ 
      name, 
      email, 
      phone
    });

    return { 
      clients
    }
  }
}

export default FetchClientsService;