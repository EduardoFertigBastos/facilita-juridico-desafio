import styled from 'styled-components';

import { Box } from '@mui/system';
import { Form } from '@unform/web';
import { primaryColor } from '@/styles/variables';

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: calc(100% - 40px);
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 35px 25px 0 25px;
  cursor: auto;

  @media screen and (max-width: 700px) {
    max-width: calc(92vw);
  }
  
  @media screen and (max-width: 500px) {
    max-width: calc(100% - 10px);
  }

  @media screen and (max-width: 600px) {
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background-color: #efefef;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${primaryColor};
      border-radius: 100px;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 25px 15px;
  }

`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -20px -10px 0 0;

  button {
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 25px;
  }
`;

export const ContainerQuestionButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  
  width: 100%;
  padding: 0.75rem 1.25rem;
  margin: 10px 0 1rem 0;

  button {
    width: 150px;
  }
`;

export const DataContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled(Form)`
  max-width: 600px;
  width: 100%;
  margin: 30px auto 0 auto;
`;

