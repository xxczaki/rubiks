import { Redo, SwipeDown, SwipeUp, Undo } from '@mui/icons-material';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import type Cube from '@rubiks/core';

type MoveMethods = Pick<
  Cube,
  'moveFront' | 'moveBack' | 'moveLeft' | 'moveRight'
>;

type Props = {
  onClick: (command: keyof MoveMethods) => () => void;
};

export default function Moves({ onClick }: Props) {
  return (
    <Stack spacing={1} width="100%">
      <Typography component="h2" variant="h6">
        Moves
      </Typography>
      <ButtonGroup fullWidth>
        <Button onClick={onClick('moveFront')} startIcon={<SwipeDown />}>
          Towards
        </Button>
        <Button onClick={onClick('moveBack')} startIcon={<SwipeUp />}>
          Away from
        </Button>
        <Button onClick={onClick('moveRight')} startIcon={<Redo />}>
          Right
        </Button>
        <Button onClick={onClick('moveLeft')} startIcon={<Undo />}>
          Left
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
