import { json } from '@sveltejs/kit';
import { connectToDB } from '../../../../lib/db';
import crypto from 'crypto';

// {pass hash logics}
function hashPassword(password: string, salt: string): string {
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return `${salt}:${hash}`;
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('Authentication');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const [salt, storedHash] = user.password.split(':');
    const hashedInputPassword = hashPassword(password, salt).split(':')[1];

    if (hashedInputPassword !== storedHash) {
      return json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    return json({ 
      success: true, 
      message: 'Login successful', 
      user: { name: user.name, email: user.email } 
    });
  } catch (error) {
    return json({ success: false, error: 'An error occurred during login' }, { status: 500 });
  }
}