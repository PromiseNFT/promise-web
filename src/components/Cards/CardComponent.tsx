import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Place, Share } from '@mui/icons-material';
import { Box } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export interface CardType {
  title: string;
  location: string;
  time: Date | string;
}

export const CardComponent = ({
  title,
  location,
  time,
}: CardType): JSX.Element => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant='body2' color='text.secondary'>
            {time}
          </Typography>
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
      <CardActions>
        <CopyToClipboard
          text='ㄴㅇㄹㄴㅇㄹㄴㅇㄹ'
          onCopy={() => {
            alert('링크가 복사되었습니다.\n친구에게 공유해주세요!');
          }}
        >
          <Share sx={{ fontSize: 40 }} />
        </CopyToClipboard>
      </CardActions>
    </Card>
  );
};
