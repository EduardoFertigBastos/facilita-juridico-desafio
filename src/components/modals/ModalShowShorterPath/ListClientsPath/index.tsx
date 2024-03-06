/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { List } from './styles';
import {
  Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { ClientWithDistance, CompanyWithDistance } from '@/backend/services/FetchClientsBetterPathService';

interface Props {
  clients: (ClientWithDistance | CompanyWithDistance)[];
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const FACILITA_JURIDICO_IMG = 'https://media.licdn.com/dms/image/C4D0BAQEo4oNhFwPrdA/company-logo_200_200/0/1630539692904?e=2147483647&v=beta&t=OtCFVQdgPwTxCP1CpkID9ljDMYnZ9f5H5DdRXM4Vpg4';

const AVATARS_IMG = [
  'https://img.freepik.com/fotos-gratis/close-no-homem-sorrindo-na-natureza_23-2150771075.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=sph',
  'https://dentistaubatuba.com.br/wp-content/uploads/2021/06/o-que-as-pessoas-bonitas-tem-em-comum-2.jpg',
  'https://cajamar.sp.gov.br/noticias/wp-content/uploads/sites/2/2021/07/site-vacinacao-33-anos.png',
  'https://bordalo.observador.pt/v2/q:84/rs:fill:1889:1889/c:1889:1889:nowe:1100:311/plain/https://s3.observador.pt/wp-content/uploads/2022/11/18150324/jporfirio-jornalistas-observador-74-scaled.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGujanJNfteIzImtv17HVt0uBiuPT0p29TA&usqp=CAU'
]

const ListClientsPath: React.FC<Props> = ({ clients }: Props) => {

  function getAvatar(client: ClientWithDistance | CompanyWithDistance) {
    if (!('id' in client)) {
      return FACILITA_JURIDICO_IMG
    }

    return AVATARS_IMG[(client.id as number) % AVATARS_IMG.length];
  }

  function getName(client: ClientWithDistance | CompanyWithDistance) {
    if (!('id' in client)) {
      return 'Facilita Jurídico';
    }

    return client.name;
  }

  function getText(client: ClientWithDistance | CompanyWithDistance) {
    const distance = client.distance.toFixed(4);

    if (!('id' in client)) {
      return `Para voltar a empresa será necessário percorrer ${distance} km de distância.`;
    }

    const coordinate_x = client.coordinate_x.toFixed(6);
    const coordinate_y = client.coordinate_y.toFixed(6);

    return `O cliente localizado em [${coordinate_x}, ${coordinate_y}] está a ${distance} km de distância da última localização.`;
  }

  return (
    <Grid
      container
      columns={{
        xs: 12, sm: 12, md: 12, lg: 12, xl: 12,
      }}
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid
        item
        xs={12}
        md={12}
        style={{
          border: '1px solid rgba(0, 0, 0, 0.26)',
          borderRadius: '4px',
          marginLeft: '24px',
          marginTop: '40px',
          marginBottom: '15px',
          paddingBottom: '10px',
        }}
      >
        <Demo>
          <List dense>
            {clients.length > 0
              ? (
                <>
                
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={FACILITA_JURIDICO_IMG} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Facilita Jurídico"
                      secondary="A sua empresa está localizada aqui!"
                    />
                  </ListItem>
                  {clients.map((client: any, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar src={getAvatar(client)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={getName(client)}
                        secondary={getText(client)}
                      />
                    </ListItem>
                  ))}

                </> 
              )

              : (
                <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6">
                    Não há clientes cadastrados!
                  </Typography>
                </ListItem>
              )}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
};

export default ListClientsPath;
