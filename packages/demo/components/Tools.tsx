import { Check, Shuffle } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import type Cube from '@rubiks/core';
import { useFormContext, useWatch } from 'react-hook-form';

import type { FormData } from '../types/shared';

type ToolMethods = Pick<Cube, 'scramble' | 'applyMoves'>;

type Props = {
  onClick: <T extends keyof ToolMethods>(
    command: T,
    args?: Parameters<Cube[T]>
  ) => () => void;
};

export default function Tools({ onClick }: Props) {
  const { register, control, getValues } = useFormContext<FormData>();
  const sequence = useWatch({ name: 'sequence', control });

  const handleScramble = () => {
    const { amount } = getValues();

    if (Number.isNaN(amount)) {
      onClick('scramble')();
    }

    onClick('scramble', [amount])();
  };

  const handleSequence = () => {
    const { sequence } = getValues();

    onClick('applyMoves', [sequence])();
  };

  return (
    <Stack spacing={3}>
      <Stack>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleScramble} startIcon={<Shuffle />}>
                  Scramble
                </Button>
              </InputAdornment>
            ),
          }}
          fullWidth
          inputProps={{ inputMode: 'numeric', min: 1 }}
          label="Amount"
          placeholder="25"
          type="number"
          {...register('amount', { valueAsNumber: true })}
        />
        <FormControlLabel
          control={<Checkbox disabled />}
          label="Use secure random number generator"
          {...register('useSecure')}
        />
      </Stack>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                disabled={
                  typeof sequence === 'undefined' || sequence.length === 0
                }
                onClick={handleSequence}
                startIcon={<Check />}
              >
                Apply
              </Button>
            </InputAdornment>
          ),
        }}
        fullWidth
        label="Sequence"
        placeholder="D B U B2 R'"
        {...register('sequence')}
      />
    </Stack>
  );
}
