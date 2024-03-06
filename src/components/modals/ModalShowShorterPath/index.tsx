/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';

import { CircularProgress, Typography } from '@mui/material';
import {
  CloseButton,
  DataContainer,
  ModalContainer,
} from './styles';
import api from '@/services/api';
import ListClientsPath from './ListClientsPath';
import { ClientWithDistance, CompanyWithDistance } from '@/backend/services/FetchClientsBetterPathService';
import Toast from '@/hooks/toast/Toast';
import handleAxiosError from '@/hooks/handleAxiosError';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalShowShorterPath: React.FC<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientsPath, setClientsPath] = useState<(ClientWithDistance | CompanyWithDistance)[]>([]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const fetchShorterPath = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/clients/better-path');

        setClientsPath(data.path);
      } catch (error: any) {
        const { message } = handleAxiosError(error);

        new Toast().error('Ops... ' + message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchShorterPath();
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <ModalContainer>
        <CloseButton>
          <button type="button" onClick={handleClose}>
            X
          </button>
        </CloseButton>

        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">
            { isLoading ? 'Carregando Rota' : 'Rota Ideal' }
          </Typography>
        </div>

        <DataContainer>
          { isLoading ? (
            <CircularProgress size={80} />
          ) : (
            <ListClientsPath clients={clientsPath} />
          )}
        </DataContainer>

      </ModalContainer>
    </Modal>
  );
};

export default ModalShowShorterPath;
