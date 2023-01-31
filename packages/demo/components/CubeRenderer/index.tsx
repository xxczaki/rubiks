import { Grid, TextField } from '@mui/material';
import type { ForwardedRef } from 'react';
import { forwardRef, useContext } from 'react';

import CubeContext from '../../utils/CubeContext';
import CubePreview from './CubePreview';

function Preview(
  _properties: unknown,
  canvasReference: ForwardedRef<HTMLCanvasElement>
) {
  const { history } = useContext(CubeContext);

  return (
    <Grid alignItems="center" container spacing={3}>
      <CubePreview ref={canvasReference} />
      <Grid item xs>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
          disabled
          fullWidth
          label="History"
          multiline
          placeholder="No moves yet"
          rows={9}
          value={history}
        />
      </Grid>
    </Grid>
  );
}

export default forwardRef(Preview);
