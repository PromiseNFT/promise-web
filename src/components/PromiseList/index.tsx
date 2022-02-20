import { Box, Container, styled, Typography } from '@mui/material';
import { CardComponent, CardType } from '../Cards/CardComponent';

const card_list: CardType[] = [
  {
    title: '모임',
    location: '강남역 1번출구',
    date: new Date('2018-03-20'),
    time: '점심 이후',
  },
  {
    title: '모임2',
    location: '강남역 2번출구',
    date: new Date('2019-04-20'),
    time: '점심 이후',
  },
  {
    title: '모임3',
    location: '강남역 3번출구',
    date: new Date('2020-05-20'),
    time: '점심 이후',
  },
  {
    title: '모임4',
    location: '강남역 4번출구',
    date: new Date('2021-06-20'),
    time: '점심 이후',
  },
  {
    title: '모임5',
    location: '강남역 5번출구',
    date: new Date('2022-02-21'),
    time: '점심 이후',
  },
];

export const PromiseList = (): JSX.Element => {
  const cards = card_list.map(({ title, location, date, time }: CardType) => {
    return (
      <CardComponent
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
      <CardWrapper>{cards}</CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 3.125rem;
`;

const CardWrapper = styled(Box)``;
