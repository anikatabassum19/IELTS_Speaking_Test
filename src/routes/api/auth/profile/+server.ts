import { json } from '@sveltejs/kit';
import { connectToDB } from '../../../../lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { env } from '$env/dynamic/private';

const SECRET_KEY = env.SECRET_KEY || 'default-secret-key';

export async function GET({ request }: { request: Request }) {
  try {
    const authHeader = request.headers.get('cookie');
    const token = authHeader?.split('authToken=')[1]?.split(';')[0];

    if (!token) {
      return json({ success: false, error: 'Unauthorized: Token is missing' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    const db = await connectToDB();
    const usersCollection = db.collection('Authentication');
    const scoresCollection = db.collection('Results');

    // Fetch user details
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });
    if (!user) {
      return json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Fetch user's scores
    const scores = await scoresCollection.find({ userId: decoded.id }).toArray();

    return json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profilePicture: user.profilePicture || '/default-profile.png',
        previousScores: scores.map(score => ({
          date: score.date,
          score: score.score,
        })),
      },
    });
  } catch (error) {
    console.error('Error in /auth/profile:', error);
    return json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}
