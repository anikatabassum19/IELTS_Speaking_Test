import { json } from '@sveltejs/kit';
import { serialize } from 'cookie';

export async function GET() {
  try {
    // Set the cookie with a past expiration date to clear it
    const clearCookie = serialize('authToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: -1, // Expire immediately
    });

    return json(
      { success: true, message: 'Logged out successfully' },
      {
        headers: {
          'Set-Cookie': clearCookie,
        },
      }
    );
  } catch (error) {
    console.error('Error during logout:', error);
    return json({ success: false, error: 'Failed to log out' }, { status: 500 });
  }
}
