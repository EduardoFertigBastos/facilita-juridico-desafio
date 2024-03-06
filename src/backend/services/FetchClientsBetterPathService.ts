import Client from "@/interfaces/Client";
import ClientsRepository from "../repositories/ClientsRepository";

interface CoordinateProps {
  coordinate_x: number;
  coordinate_y: number;
}

export interface ClientWithDistance extends Client {
  distance: number;
}

export interface CompanyWithDistance extends CoordinateProps {
  distance: number;
}

class FetchClientsBetterPathService {
  constructor(private clientsRespository: ClientsRepository) {}

  public companyCoordinates: CoordinateProps = { coordinate_x: 0, coordinate_y: 0 };

  async execute() {
    const clients = await this.clientsRespository.findMany();

    if (clients.length === 0) {
      return { 
        path: []
      }
    }

    const { path } = this.calculateClientsBetterPath(clients);

    return { 
      path
    }
  }

  calculateClientsBetterPath(clients: Client[]) {
    const checked = new Array(clients.length).fill(false);
    const path: (ClientWithDistance | CompanyWithDistance)[] = [];

    // JSON.parse(JSON.stringify(clients)) - para não alterar o objeto inicial
    let currentClient: CoordinateProps = JSON.parse(
      JSON.stringify(this.companyCoordinates)
    );

    clients.forEach((client, i) => {
      const notCheckedClients = clients.filter(
        (_, j) => !checked[j]
      );

      if (notCheckedClients.length === 0) {
        return;
      }

      let nearestClient: Client | null = null;
      let nearestDistance: number | null = null;

      notCheckedClients.forEach((clientToCompare, j) => {
        const distance = this.calculateDistanceBetweenCoordinates(
          currentClient, 
          clientToCompare
        );

        if (!nearestDistance || distance < nearestDistance) {
          nearestDistance = distance;
          nearestClient = clientToCompare;
        }
      });

      if (nearestClient && (nearestDistance || nearestDistance === 0)) {
        path.push({
          ...nearestClient as Client,
          distance: nearestDistance
        });

        const index = clients.findIndex((cli) => cli.id === nearestClient?.id)
        checked [index] = true;
        currentClient = nearestClient;
      }
    });


    const lastClient = path[path.length - 1];
    const distanceBackToCompany = this.calculateDistanceBetweenCoordinates(
      lastClient, 
      this.companyCoordinates
    );

    path.push({
      distance: distanceBackToCompany,
      ...this.companyCoordinates,
    })

    return { 
      path, 
    };
  }

  calculateDistanceBetweenCoordinates(initial: CoordinateProps, end: CoordinateProps) {
    const distance = Math.hypot(
      initial.coordinate_x - end.coordinate_x, 
      initial.coordinate_y - end.coordinate_y
    );

    return distance;
  }
}

export default FetchClientsBetterPathService;