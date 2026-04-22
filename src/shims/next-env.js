export const loadEnvConfig = () => ({
  combinedEnv: process.env,
  loadedEnvFiles: [],
});

export default {
  loadEnvConfig,
};
