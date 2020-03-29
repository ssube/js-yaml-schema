import { main } from './app';

export { CONFIG_SCHEMA } from './schema';
export { envType } from './type/Env';
export { includeSchema, includeType } from './type/Include';
export { regexpType } from './type/Regexp';
export { streamType } from './type/Stream';

const STATUS_ERROR = 1;

/**
 * This is the main entry-point to the program and the only file not included in the main bundle.
 */
main(process.argv).then((status) => process.exit(status)).catch((err: Error) => {
  // eslint-disable-next-line no-console
  console.error('uncaught error during main:', err);
  process.exit(STATUS_ERROR);
});
