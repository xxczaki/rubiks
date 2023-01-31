import { ContentCopy } from '@mui/icons-material';
import {
  Alert,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import type { ForwardedRef } from 'react';
import { forwardRef, useContext } from 'react';
import toast from 'react-hot-toast';

import CubeContext from '../../utils/CubeContext';

function CubePreview(
  _properties: unknown,
  canvasReference: ForwardedRef<HTMLCanvasElement>
) {
  const { state, emoji } = useContext(CubeContext);

  const handleCopy = async () => {
    navigator.clipboard.writeText(emoji!);
    toast.success('Copied to clipboard');
  };

  return (
    <Grid item xs="auto">
      <Paper sx={{ position: 'relative', width: '250px' }}>
        {state === 'loading' && (
          <CircularProgress
            size="4rem"
            sx={{ position: 'absolute', top: '35%', left: '37.5%' }}
          />
        )}
        {state === 'error' && (
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Rendering Error
          </Alert>
        )}
        <Stack alignItems="center" direction="row" spacing={1}>
          <canvas height="210" ref={canvasReference} width="190" />
          {state === 'idle' && (
            <ButtonGroup orientation="vertical">
              <Tooltip placement="right" title="Copy as emoji">
                <IconButton onClick={handleCopy}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          )}
        </Stack>
        <Typography ml={1} variant="caption">
          worker: {state}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default forwardRef(CubePreview);
