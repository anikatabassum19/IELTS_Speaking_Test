import { json } from '@sveltejs/kit';
import { connectToDB } from '../../../../lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { env } from '$env/dynamic/private';

const SECRET_KEY = env.SECRET_KEY || 'default-secret-key';

export async function POST({ request }: { request: Request }) {
  try {
    // Get the authorization token
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return json({ success: false, error: 'Unauthorized: Token is missing' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    const db = await connectToDB();
    const resultsCollection = db.collection('Results');

    const { score, date } = await request.json();

    const result = {
      userId: new ObjectId(decoded.id),
      score,
      date: new Date(date),
    };

    // Insert the result into the database
    await resultsCollection.insertOne(result);

    return json({ success: true });
  } catch (error) {
    console.error('Error in storing result:', error);
    return json({ success: false, error: 'An error occurred while storing the result' }, { status: 500 });
  }
}
