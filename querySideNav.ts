import configPromise from './src/payload.config';
import { getPayload } from 'payload';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const global = await payload.findGlobal({ slug: 'side-nav' });
  console.log(JSON.stringify(global, null, 2));
}

run().catch(console.error).then(() => process.exit(0));
