import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type Cube from '@rubiks/core';
import { useEffect, useReducer, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CubeRenderer from '../components/CubeRenderer';
import Header from '../components/Header';
import Moves from '../components/Moves';
import Rotations from '../components/Rotations';
import Tools from '../components/Tools';
import type { CubeContextType } from '../types/shared';
import CubeContext from '../utils/CubeContext';

function reducer(state: CubeContextType, payload: Partial<CubeContextType>) {
  return {
    ...state,
    ...payload,
  };
}

export default function Home() {
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const workerReference = useRef<Worker>();
  const [context, updateContext] = useReducer(reducer, { state: 'loading' });
  const methods = useForm<FormData>();

  useEffect(() => {
    const handleMessage = (event: WorkerEventMap['message']) => {
      const { history, emoji } = event.data;

      updateContext({ history: history.join(' '), emoji, state: 'idle' });
    };
    const handleError = () => updateContext({ state: 'error' });

    workerReference.current?.addEventListener('message', handleMessage);
    workerReference.current?.addEventListener('error', handleError);

    return () => {
      workerReference.current?.removeEventListener('message', handleMessage);
      workerReference.current?.removeEventListener('error', handleError);
    };
  }, [workerReference]);

  useEffect(() => {
    if (canvasReference?.current === null) {
      return;
    }

    if ('transferControlToOffscreen' in HTMLCanvasElement.prototype) {
      try {
        const offscreen = canvasReference.current.transferControlToOffscreen();

        workerReference.current = new Worker(
          new URL('../worker.ts', import.meta.url)
        );
        workerReference.current.postMessage(offscreen, [offscreen]);
      } catch {}
    }
  }, [canvasReference]);

  function executeCommand<T extends keyof Cube>(
    command: T,
    args?: Cube[T] extends (...args: any) => any ? Parameters<Cube[T]> : never
  ) {
    return () => workerReference.current?.postMessage([command, args]);
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Header />
          <CubeContext.Provider value={context}>
            <CubeRenderer ref={canvasReference} />
          </CubeContext.Provider>
          <Moves onClick={executeCommand} />
          <Grid container spacing={3}>
            <Rotations onClick={executeCommand} />
            <Grid item width="100%" xs="auto">
              <Stack height="100%" spacing={1} width="100%">
                <Typography component="h2" variant="h6">
                  Tools
                </Typography>
                <Stack height="100%" justifyContent="space-between" spacing={3}>
                  <Tools onClick={executeCommand} />
                  <Typography textAlign="right" variant="caption">
                    Copyright &copy; Antoni Kępiński {new Date().getFullYear()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </FormProvider>
  );
}
