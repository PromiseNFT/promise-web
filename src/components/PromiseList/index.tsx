import { Box, Container, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthProvider';
import { AppServer } from '../../utils/api';
import { CardComponent, CardType } from '../Cards/CardComponent';

export const PromiseList = (): JSX.Element => {
  const auth = useAuthContext();
  const [data, setData] = useState([]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      console.log('auth?.user.token : ', auth?.user.token);
      if (auth?.user.token) {
        const result = await AppServer.getContracts(auth.user.token);
        console.log('result : ', result.data);
        setData(result.data);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  }, [setData, auth]);

  useEffect(() => {
    if (auth?.user.token) {
      getData();
    }
  }, [getData, auth]);

  const cards = data.map(({ id, title, location, date, time }: CardType) => {
    return (
      <CardComponent
        key={id}
        id={id}
        title={title}
        location={location}
        date={date}
        time={time}
      />
    );
  });

  return (
    <Wrapper>
      <Typography>나의 약속</Typography>
      {cards.length ? (
        <CardWrapper>{cards}</CardWrapper>
      ) : (
        <Typography>약속을 만들어보세요!</Typography>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 3.125rem;
`;

const CardWrapper = styled(Box)``;
