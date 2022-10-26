declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHANCE_SEED: string;
    }
  }
}
