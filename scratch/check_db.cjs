const { Client } = require('pg');

async function check() {
  const urls = [
    'postgresql://postgres@localhost:5432/postgres',
    'postgresql://postgres:postgres@localhost:5432/postgres',
    'postgresql://root@localhost:5432/postgres',
  ];

  for (const url of urls) {
    console.log(`Checking ${url}...`);
    const client = new Client({ connectionString: url });
    try {
      await client.connect();
      console.log(`Successfully connected to ${url}`);
      await client.end();
      return;
    } catch (e) {
      console.log(`Failed: ${e.message}`);
    }
  }
}

check();
