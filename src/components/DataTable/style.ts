import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;

  @media screen and (max-width: 800px) {
    max-width: 80vw;
  }

  @media screen and (max-width: 500px) {
    max-width: 92vw;
  }
`;

export const SubContainerPaper = styled(Paper)`
  width: 100%;
  overflow-x: auto;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  a,
  button
  {
    height: 35px;
    font-size: .7rem;

    svg {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 800px) {
    a,
    button
    {
      height: 30px;
      font-size: .7rem;

      svg {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
`;
