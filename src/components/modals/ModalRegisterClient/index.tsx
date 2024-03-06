/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, Dispatch, SetStateAction, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';

import { Typography } from '@mui/material';
import Button from '@/components/Button';
import FormBuilder from '@/components/form/FormBuilder';
import {
  CloseButton,
  ContainerQuestionButtons,
  DataContainer,
  FormContainer,
  ModalContainer,
} from './styles';
import useForm from '@/hooks/form/useForm';
import { MdMailOutline, MdOutlineDescription, MdOutlineLocalPhone } from 'react-icons/md';
import schema from './validation/schema';
import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb';
import Client from '@/interfaces/Client';
import handleAxiosError from '@/hooks/handleAxiosError';
import api from '@/services/api';
import Toast from '@/hooks/toast/Toast';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
}

const ModalRegisterClient: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  clients,
  setClients
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    fields: [
      {
        gridSize: {
          md: 12,
        },
        type: 'text',
        name: 'name',
        label: 'Nome',
        placeholder: 'Eduardo Fertig Bastos',
        icon: MdOutlineDescription,
      },
      {
        gridSize: {
          md: 12,
        },
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'dudufbastos1@gmail.com',
        icon: MdMailOutline,
      },
      {
        gridSize: {
          md: 12,
        },
        type: 'text',
        name: 'phone',
        label: 'Telefone',
        placeholder: '(47) 99126-3351',
        icon: MdOutlineLocalPhone,
        mask: '(00) 00000-0000',
      },
      {
        gridSize: {
          md: 6,
        },
        type: 'number',
        name: 'coordinate_x',
        label: 'Coordenada X',
        placeholder: '-27.2284057',
        icon: TbWorldLatitude,
      },
      {
        gridSize: {
          md: 6,
        },
        type: 'number',
        name: 'coordinate_y',
        label: 'Coordenada Y',
        placeholder: '-49.7561063',
        icon: TbWorldLongitude,
      },
    ],
    schema,
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      
      const dataToSend = {
        ...formData,
        coordinate_x: formData.coordinate_x ? Number(formData.coordinate_x) : undefined,
        coordinate_y: formData.coordinate_y ? Number(formData.coordinate_y) : undefined,
        phone: formData.phone.replace(/\D/g, ''),
      } as Client;

      if (!await form.validation(dataToSend)) {
        return;
      }
      setIsLoading(true);

      try {


        await api.post<{ client: Client }>(
          '/clients', 
          dataToSend
        );

        setClients([...clients, dataToSend]);
        form.clear();
        
        new Toast().success('Dados enviados com sucesso');
      } catch (e: any) {
        const { message } = handleAxiosError(e);
        new Toast().error(`Ops... ${message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [clients, form, setClients],
  );

  const handlePressEnter = useCallback((e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      
      if (form.ref.current) {
        form.ref.current.submitForm();
      }
    }
  }, [form]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <ModalContainer onKeyDown={(e) => handlePressEnter(e)}>
        <CloseButton>
          <button type="button" onClick={handleClose}>
            X
          </button>
        </CloseButton>

        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">
            Registrar Cliente
          </Typography>
        </div>

        <DataContainer>
          <FormContainer ref={form.ref} placeholder="Formulário" onSubmit={handleSubmit}>
            <FormBuilder fields={form.fields} /> 

            <ContainerQuestionButtons>
              <Button
                type="button"
                color="error"
                onClick={handleClose}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
              >
                Cadastrar
              </Button>
            </ContainerQuestionButtons>
          </FormContainer>

        </DataContainer>

      </ModalContainer>
    </Modal>
  );
};

export default ModalRegisterClient;
