import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Place, Share } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from 'date-fns';
import { CardTimeOut } from './CardTimeOut';
import { useHistory } from 'react-router-dom';
import { ParamType } from '../../types';

export interface CardType {
  id: number;
  user_addr?: string;
  crt_dttm?: string;
  account_addr?: string;
  account_pub_key?: string;
  title: string;
  ctnt?: string; //content
  date: Date;
  time: string;
  location: string;
  head_count?: number;
}

export const CardComponent = ({
  id,
  title,
  location,
  date,
  time,
}: CardType): JSX.Element => {
  const { push } = useHistory<ParamType>();
  return (
    <Card
      key={id}
      sx={{
        maxWidth: 345,
        margin: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Button
        onClick={() => {
          push(`/contract/${id}`, { promiseType: 'read' });
        }}
        color='inherit'
      >
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography variant='body2' color='text.secondary'>
              {format(new Date(date), 'yy.MM.dd')} {time}{' '}
            </Typography>
            <CardTimeOut date={date} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='h5' component='div'>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Place sx={{ fontSize: 15, marginRight: 1 }} />
            <Typography variant='body2' color='text.secondary'>
              {location}
            </Typography>
          </Box>
        </CardContent>
      </Button>
      <CardActions>
        <CopyToClipboard
          text={`${window.location.href}contract/${id}`}
          onCopy={() => {
            alert(`????????? ?????????????????????.\n???????????? ??????????????????!`);
          }}
        >
          <Share sx={{ fontSize: 40 }} />
        </CopyToClipboard>
      </CardActions>
    </Card>
  );
};
