import Client from "@/interfaces/Client";
import ClientsRepository from "../repositories/ClientsRepository";
import ClientWithEmailAlreadyExistsError from "../errors/ClientWithEmailAlreadyExistsError";

class RegisterClientService {
  constructor(private clientsRespository: ClientsRepository) {}

  async execute({
    email,
    phone,
    name,
    coordinate_x,
    coordinate_y
  }: Client) {  
    const clientAlreadyExists = await this.clientsRespository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new ClientWithEmailAlreadyExistsError();
    }

    const isInserted = await this.clientsRespository.create({
      email,
      phone,
      name,
      coordinate_x,
      coordinate_y
    });

    if (!isInserted) {
      throw new Error('Ocorreu algum erro ao inserir o cliente!')
    }
  }
  
}

export default RegisterClientService;