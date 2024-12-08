import { Handler } from '@netlify/functions';
import { createClient } from '@libsql/client';
import { z } from 'zod';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const CommentSchema = z.object({
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, message } = CommentSchema.parse(body);

    await client.execute({
      sql: 'INSERT INTO comments (name, message) VALUES (?, ?)',
      args: [name, message],
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error posting comment:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid comment data' }),
    };
  }
};