import { Rotate90DegreesCcw, Rotate90DegreesCw } from '@mui/icons-material';
import { Button, ButtonGroup, Grid, Stack, Typography } from '@mui/material';
import type Cube from '@rubiks/core';
import { RotationType } from '@rubiks/core/dist/types';

type RotationMethods = Pick<
  Cube,
  | 'rotateBack'
  | 'rotateDown'
  | 'rotateFront'
  | 'rotateLeft'
  | 'rotateRight'
  | 'rotateUp'
>;

type Props = {
  onClick: (command: keyof RotationMethods, args: [RotationType]) => () => void;
};

export default function Rotations({ onClick }: Props) {
  return (
    <Grid item width="100%" xs="auto">
      <Stack spacing={1} width="100%">
        <Typography component="h2" variant="h6">
          Rotations
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row">
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateUp', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderTopRightRadius: 0 }}
              >
                Up
              </Button>
              <Button
                onClick={onClick('rotateDown', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderBottomRightRadius: 0 }}
              >
                Down
              </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateUp', [RotationType.COUNTERCLOCKWISE])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderTopLeftRadius: 0 }}
              >
                Up
              </Button>
              <Button
                onClick={onClick('rotateDown', [RotationType.COUNTERCLOCKWISE])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderBottomLeftRadius: 0 }}
              >
                Down
              </Button>
            </ButtonGroup>
          </Stack>
          <Stack direction="row">
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateFront', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderTopRightRadius: 0 }}
              >
                Front
              </Button>
              <Button
                onClick={onClick('rotateBack', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderBottomRightRadius: 0 }}
              >
                Back
              </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateFront', [
                  RotationType.COUNTERCLOCKWISE,
                ])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderTopLeftRadius: 0 }}
              >
                Front
              </Button>
              <Button
                onClick={onClick('rotateBack', [RotationType.COUNTERCLOCKWISE])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderBottomLeftRadius: 0 }}
              >
                Back
              </Button>
            </ButtonGroup>
          </Stack>
          <Stack direction="row">
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateLeft', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderTopRightRadius: 0 }}
              >
                Left
              </Button>
              <Button
                onClick={onClick('rotateRight', [RotationType.CLOCKWISE])}
                startIcon={<Rotate90DegreesCw />}
                sx={{ borderBottomRightRadius: 0 }}
              >
                Right
              </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" sx={{ width: '100%' }}>
              <Button
                onClick={onClick('rotateLeft', [RotationType.COUNTERCLOCKWISE])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderTopLeftRadius: 0 }}
              >
                Left
              </Button>
              <Button
                onClick={onClick('rotateRight', [
                  RotationType.COUNTERCLOCKWISE,
                ])}
                startIcon={<Rotate90DegreesCcw />}
                sx={{ borderBottomLeftRadius: 0 }}
              >
                Right
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
