import styled from 'styled-components';

export const Container = styled.main`
  min-height: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  gap: 12px;

  @media screen and (max-width: 420px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const TableContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;
