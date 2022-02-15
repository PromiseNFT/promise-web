import { GroupAdd } from '@mui/icons-material';
import { Button } from '@mui/material';

export const Floating = (): JSX.Element => {
  return (
    <Button
      sx={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 500,
        border: 'solid',
        borderWidth: 1,
        zIndex: 999,
      }}
    >
      <GroupAdd sx={{ fontSize: 25 }} />
    </Button>
  );
};
