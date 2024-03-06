'use client';
import Button from "@/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { ButtonContainer, Container, TableContainer } from "./styles";
import ModalRegisterClient from "@/components/modals/ModalRegisterClient";
import Client from "@/interfaces/Client";
import ModalShowShorterPath from "@/components/modals/ModalShowShorterPath";
import useForm from "@/hooks/form/useForm";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Toast from "@/hooks/toast/Toast";
import handleAxiosError from "@/hooks/handleAxiosError";
import Mask from "@/helpers/Mask";


export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openShorterPathModal, setOpenShorterPathModal] = useState(false);

  const router = useRouter()
  const form = useForm({
    fields: [
      {
        gridSize: {
          xl: 4,
          md: 4,
          sm: 12,
          xs: 12,
        },
        type: 'text',
        name: 'nameFilter',
        label: 'Nome',
        placeholder: 'Eduardo Fertig Bastos',
      },
      {
        gridSize: {
          xl: 4,
          md: 4,
          sm: 6,
          xs: 12,
        },
        type: 'text',
        name: 'emailFilter',
        label: 'Email',
        placeholder: 'dudufbastos1@gmail.com',
      },
      {
        gridSize: {
          xl: 4,
          md: 4,
          sm: 6,
          xs: 12,
        },
        type: 'text',
        name: 'phoneFilter',
        label: 'Telefone',
        placeholder: '(47) 99126-3351',
      },
    ],
  });
 
  const buildFilter = useCallback(({
    nameFilter,
    emailFilter,
    phoneFilter,
  }: any) => {
    let filter = ''

    if (nameFilter !== '' || emailFilter !== '' || phoneFilter !== '') {
      const nameObj = { name: nameFilter }
      const emailObj = { email: emailFilter }
      const phoneObj = { phone: phoneFilter ? phoneFilter.replace(/\D/g, '') : undefined}

      const params = new URLSearchParams({
        ...(nameFilter ? nameObj : undefined),
        ...(emailFilter ? emailObj : undefined),
        ...(phoneFilter ? phoneObj : undefined),
      });

      filter = `?${params.toString()}`
    }

    return filter;
  }, []);

  const handleFilter = useCallback((filters: any) => {
    const filter = buildFilter(filters);

    api.get(`/clients${filter}`).then(({ data }) => {
      const { clients } = data;
      
      setClients(clients); 
    })
    .catch((error) => {
      const { message } = handleAxiosError(error);

      new Toast().error('Ops...' + message);
    });

    router.push(filter)
  }, [buildFilter, router]);

  const handleOpenRegisterModal = useCallback(() => {
    setOpenRegisterModal(true);
  }, [])

  const handleOpenShorterPathModal = useCallback(() => {
    setOpenShorterPathModal(true);
  }, []);

  useEffect(() => {
    api.get('/clients').then(({ data }) => {
      const { clients } = data;

      setClients(clients); 
    }).catch((error) => {
      const { message } = handleAxiosError(error);

      new Toast().error('Ops... ' + message);
    })
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handleOpenRegisterModal}>
          Registrar
        </Button>
        <Button color="success" onClick={handleOpenShorterPathModal}>
          Visualizar Rota Ideal
        </Button>
      </ButtonContainer>

      <TableContainer>
        <DataTable
          title="Clientes"
          metadata={[
            { 
              prop: "name", 
              label: "Nome"
            },
            { 
              prop: "email", 
              label: "Email"
            },
            { 
              prop: "phone", 
              label: "Telefone",
              mask(phone) {
                return Mask.applyMask(String(phone), '(00) 00000-0000');
              }
            },
            { 
              prop: "coordinate_x", 
              label: "Coordenadas",
              mask(_, { coordinate_x, coordinate_y }) {
                coordinate_x = coordinate_x.toFixed(6);
                coordinate_y = coordinate_y.toFixed(6);
                return `[${coordinate_x}, ${coordinate_y}]`;
              }, 
            },
          ]}
          filter={{
            form,
            handleFilterCallback: handleFilter
          }}
          data={clients}
          denseButton={false}
        />
      </TableContainer>

      <ModalRegisterClient 
        clients={clients}
        setClients={setClients}
        isOpen={openRegisterModal} 
        setIsOpen={setOpenRegisterModal}>
      </ModalRegisterClient>

      <ModalShowShorterPath 
        isOpen={openShorterPathModal} 
        setIsOpen={setOpenShorterPathModal}>
      </ModalShowShorterPath>

    </Container>
  );
}
