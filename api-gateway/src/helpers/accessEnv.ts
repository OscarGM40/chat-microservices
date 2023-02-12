// accesses a variable inside of process.env, throwing an error if it's not found
//always run this method in advance(i.e. upon initialisation) so that the error is thrown as early as possible
// caching the values also increases performance - accessing process.env many times is bad

const cache: { [key: string]: string } = {};

const accessEnv = (key: string, defaultValue: string): string => {
  // si no esta la key devuelvo el defaultValue o un error
  if (!(key in process.env) || typeof process.env[key] === "undefined") {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env!`);
  }

  if (!(key in cache)) {
    cache[key] = <string>process.env[key];
  }
  return cache[key];
};

export default accessEnv;
