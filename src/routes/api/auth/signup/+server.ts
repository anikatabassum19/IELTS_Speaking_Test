import { json } from '@sveltejs/kit';
import { connectToDB } from '../../../../lib/db';
import crypto from 'crypto';

interface SignupRequest {
  name: string;
  mobile: string;
  email: string;
  password: string;
}

// Pass hash here
function hashPassword(password: string, salt: string): string {
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return `${salt}:${hash}`;
}

export async function POST({ request }: { request: Request }) {
  try {
    const body: SignupRequest = await request.json();
    const { name, mobile, email, password } = body;

    if (!name || !mobile || !email || !password) {
      return json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('Authentication');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return json({ success: false, error: 'Email is already registered' }, { status: 400 });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(password, salt);

    await usersCollection.insertOne({ name, mobile, email, password: hashedPassword });

    return json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    return json({ success: false, error: 'An error occurred during signup' }, { status: 500 });
  }
}
