import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === 'admin' && (password === 'meric2025' || password === 'admin123')) {
      const response = NextResponse.json({ success: true, message: 'Giriş başarılı' });
      response.cookies.set({
        name: 'meric_admin_session',
        value: 'authenticated',
        path: '/',
        httpOnly: false, // Accessible for client-side check if needed
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre!' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Giriş işlemi başarısız' }, { status: 500 });
  }
}
