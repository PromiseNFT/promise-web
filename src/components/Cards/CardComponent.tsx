import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Place,
  ReadMore,
  GroupAdd,
  AccessTime,
  Groups,
  Title,
  Description,
  Image,
} from '@mui/icons-material';
import { Box } from '@mui/material';

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
        <Button size='large' color='inherit'>
          <ReadMore sx={{ fontSize: 40 }} />
        </Button>
      </CardActions>
    </Card>
  );
};
