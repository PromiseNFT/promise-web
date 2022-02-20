import { Box, styled, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';

interface Props {
  date: Date;
}

export const CardTimeOut = ({ date }: Props): JSX.Element => {
  const diff = differenceInDays(date, new Date()) + 1;

  if (diff === 0) {
    return (
      <Wrapper>
        <Typography
          sx={{ color: 'white' }}
          variant='body2'
          fontWeight='bold'
          color='text.secondary'
        >
          당일 입니다!
        </Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Typography
        sx={{ color: 'white' }}
        variant='body2'
        fontWeight='bold'
        color='text.secondary'
      >
        {diff}일 전
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  border: 'solid',
  borderRadius: 20,
  padding: 5,
  marginLeft: 3,
  borderColor: 'green',
  backgroundColor: 'green',
  opacity: 0.8,
});
