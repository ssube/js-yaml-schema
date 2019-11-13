import { VERSION_INFO } from './version';

export async function main(argv: Array<string>): Promise<number> {
  /* eslint-disable-next-line no-console */
  console.log('Please use this schema with js-yaml.', VERSION_INFO, argv);
  return 1;
}
