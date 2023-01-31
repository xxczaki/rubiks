export type FormData = {
  amount: number;
  sequence: string;
  useSecure: boolean;
};

export type CubeContextType = {
  emoji?: string;
  history?: string;
  state?: 'loading' | 'idle' | 'error';
};
