import { Alert, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <Stack spacing={1} width="100%">
      <Typography component="h1" textAlign="left" variant="h2">
        Rubik&apos;s
      </Typography>
      <Typography component="div">
        This is an interactive demo of{' '}
        <Chip label="@rubiks/core" size="small" />, a modern TypeScript
        implementation of a 3×3×3 Rubik&apos;s cube.
      </Typography>
      <Alert severity="info">
        Your browser must support{' '}
        <Link
          href="https://caniuse.com/offscreencanvas"
          rel="noopener noreferrer"
          target="_blank"
        >
          OffscreenCanvas
        </Link>{' '}
        for this page to work correctly.
      </Alert>
    </Stack>
  );
}
