import { json } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import { connectToDB } from '../../../lib/db';

// Ensure the secret key matches the one used in login/+server.ts
const SECRET_KEY = crypto.randomBytes(64).toString('hex');

export async function GET({ cookies }: { cookies: any }) {
  try {
    const token = cookies.get('authToken');

    if (!token) {
      return json({ error: 'Unauthorized: Token is missing' }, { status: 401 });
    }

    let decoded: string | JwtPayload;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    if (typeof decoded !== 'object' || !('id' in decoded)) {
      return json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('Authentication');

    // Convert the `decoded.id` string to an ObjectId
    const userId = new ObjectId(decoded.id);

    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    return json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        },
      
    });
      
  } catch (error) {
      console.error('Error fetching user data:', error);
      
      return json({ error: 'Internal server error' }, { status: 500 });
      
  }
    
    
}
