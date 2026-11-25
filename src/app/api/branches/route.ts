import { NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET() {
  try {
    await ensureDbInitialized();
    const result = await db.execute('SELECT * FROM branches ORDER BY order_num ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Branches fetch error:', error);
    return NextResponse.json({ error: 'Şubeler yüklenemedi' }, { status: 500 });
  }
}
