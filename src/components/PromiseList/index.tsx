import { Box, Container, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppServer } from '../../utils/constants';
import { CardComponent, CardType } from '../Cards/CardComponent';

const card_list: CardType[] = [
  {
    id: 1, // BIGINT
    user_addr: 'Klip Address',
    crt_dttm: '2020-01-01 24:00 11.111',
    account_addr: 'String KAS Account Address',
    account_pub_key: 'String KAS Account Address Public Key',
    title: 'Sample Titile Example',
    ctnt: 'Sample Content Example',
    date: new Date('2019-04-20'),
    time: 'Time (Str)',
    location: 'Sample Location',
    head_count: 10, // The number of Contract's signers
  },
  {
    id: 2,
    title: '모임2',
    location: '강남역 2번출구',
    date: new Date('2019-04-20'),
    time: '점심 이후',
  },
  {
    id: 4,
    title: '모임3',
    location: '강남역 3번출구',
    date: new Date('2020-05-20'),
    time: '점심 이후',
  },
  {
    id: 5,
    title: '모임4',
    location: '강남역 4번출구',
    date: new Date('2021-06-20'),
    time: '점심 이후',
  },
  {
    id: 6,
    title: '모임5',
    location: '강남역 5번출구',
    date: new Date('2022-02-21'),
    time: '점심 이후',
  },
];

export const PromiseList = (): JSX.Element => {
  const [data, setData] = useState(card_list);

  const getData = async (): Promise<void> => {
    try {
      const result = await AppServer.getContracts();
      console.log('result : ', result);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const cards = data.map(({ id, title, location, date, time }: CardType) => {
    return (
      <CardComponent
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
