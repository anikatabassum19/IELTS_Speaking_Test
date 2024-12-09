import { json } from '@sveltejs/kit';
import { connectToDB } from '../../../lib/db';


interface contactRequest {
  name: string;
  email: string;
  messages: string;
}


export async function POST({ request }: { request: Request }) {
  try {
    const body: contactRequest= await request.json();
    const { name, email, messages } = body;

    if (!name || !email || !messages) {
      return json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const db = await connectToDB();
    const usersCollection = db.collection('contactUS');

      
    await usersCollection.insertOne({ name, email, messages });

    return json({ success: true, message: 'Thank you for contact with us' });
  } catch (error) {
    return json({ success: false, error: 'Message did not sent' }, { status: 500 });
  }
}
