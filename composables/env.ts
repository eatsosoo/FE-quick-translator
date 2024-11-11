export default function env(key: keyof InternalEnv) {
  const configs = useRuntimeConfig()?.public;
  const env = configs[key];
  if (!env) throw new Error(`Env ${key} not found`);
  return env;
}
