import { Box, Container, styled, Typography } from '@mui/material';
import { CardComponent, CardType } from '../Cards/CardComponent';

const card_list: CardType[] = [
  { title: '모임', location: '강남역 1번출구', time: '2018-03-20' },
  { title: '모임2', location: '강남역 2번출구', time: '2019-04-20' },
  { title: '모임3', location: '강남역 3번출구', time: '2020-05-20' },
  { title: '모임4', location: '강남역 4번출구', time: '2021-06-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
  { title: '모임5', location: '강남역 5번출구', time: '2022-07-20' },
];

export const PromiseList = (): JSX.Element => {
  const cards = card_list.map(({ title, location, time }: CardType) => {
    return <CardComponent title={title} location={location} time={time} />;
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
