import { NextRequest, NextResponse } from 'next/server';
import FetchClientsService from '@/backend/services/FetchClientsService';
import RegisterClientService from '@/backend/services/RegisterClientService';
import ClientsRepository, { FindManyFilters } from '@/backend/repositories/ClientsRepository';
import { z } from 'zod';
import { validateRequestData } from '@/backend/helpers/validateRequestData';
import ClientWithEmailAlreadyExistsError from '@/backend/errors/ClientWithEmailAlreadyExistsError';

export const GET = async (req: NextRequest) => {
  try {
    const searchClientsQuerySchema = z.object({
      name: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.number().nullable(),
    });

    const { searchParams } = req.nextUrl;

    const phone = searchParams.get('phone');
    const phoneFilter = phone !== null 
      ? Number(phone.replace(/\D/g, '')) 
      : null;

    const filters: FindManyFilters = {
      name: searchParams.get('name'),
      email: searchParams.get('email'),
      phone: phoneFilter,
    }

    validateRequestData(filters, searchClientsQuerySchema);
    
    const clientsRespository =  new ClientsRepository();
    const fetchClientsService = new FetchClientsService(clientsRespository);
    const { clients } = await fetchClientsService.execute(filters);
  
    return NextResponse.json({ clients });
 
  } catch (e: any) {
    return NextResponse.json(
      {
        error: 'Ocorreu algum erro ao listar o cliente!',
        message: e.message
      },
      {
        status: 400
      }
    );
  }

}

export const POST = async (req: NextRequest) => {
  try {
    const {
      email,
      phone,
      name,
      coordinate_x,
      coordinate_y
    } = await req.json();

    const registerClientBodySchema = z.object({
      name: z.string().min(1, 'O nome do cliente é obrigatório!'),
      phone: z.string().min(11, 'O telefone deve ter 11 dígitos!'),
      email: z.string().email('O email deve ser um email válido!'),

      coordinate_x: z.number({
        required_error: 'A coordenada X é obrigatória!',
      }),
      coordinate_y: z.number({
        required_error: 'A coordenada Y é obrigatória!',
      }),
    });
  
    validateRequestData(
      {
        email,
        phone,
        name,
        coordinate_x,
        coordinate_y
      }, 
      registerClientBodySchema
    );

    const clientsRespository = new ClientsRepository();
    const registerClientsService = new RegisterClientService(clientsRespository);
    
    await registerClientsService.execute({
      email,
      phone,
      name,
      coordinate_x,
      coordinate_y,
    });
  
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    let message = error.message;
    let status = 400;

    if (error instanceof ClientWithEmailAlreadyExistsError) {
      status = 409;
    }

    return NextResponse.json(
      {
        message
      }, 
      {
        status: 400
      }
    );
  }
  
}
