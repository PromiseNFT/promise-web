import { Floating } from '../../components/Floating';
import { HomeHeader } from '../../components/HomeHeader';
import { PromiseList } from '../../components/PromiseList';
import { useAuthContext } from '../../contexts/AuthProvider';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DefaultLayout>
      <HomeHeader />
      {!!auth?.user.token ? (
        <>
          <PromiseList />
          <Floating />
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flex: 1,
            marginTop: 30,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>지갑 연결 후 이용해주세요.</Typography>
        </Box>
      )}
    </DefaultLayout>
  );
};

export default Home;
