import { Handler } from '@netlify/functions';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const handler: Handler = async () => {
  try {
    const result = await client.execute(`
      SELECT id, name, message, created_at as createdAt 
      FROM comments 
      ORDER BY created_at DESC 
      LIMIT 100
    `);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch comments' }),
    };
  }
};