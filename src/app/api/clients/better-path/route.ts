import { NextRequest, NextResponse } from 'next/server';
import ClientsRepository from '@/backend/repositories/ClientsRepository';
import FetchClientsBetterPathService from '@/backend/services/FetchClientsBetterPathService';

export const GET = async (req: NextRequest) => {
  try {
    const clientsRespository =  new ClientsRepository();
    const fetchClientsBetterRouteService = new FetchClientsBetterPathService(clientsRespository);
    const { path } = await fetchClientsBetterRouteService.execute();
  
    return NextResponse.json({ path });
 
  } catch (e: any) {
    let message = 'Ocorreu algum erro ao procurar a melhor rota!';
    
    return NextResponse.json(
      {
        error: 'Ocorreu algum erro ao procurar a melhor rota!',
        message: e.message
      },
      {
        status: 400
      }
    );
  }

}
