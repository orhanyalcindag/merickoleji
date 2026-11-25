import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET() {
  try {
    await ensureDbInitialized();
    const result = await db.execute('SELECT * FROM settings');
    const settingsObj: Record<string, string> = {};
    for (const row of result.rows) {
      settingsObj[String(row.key)] = String(row.value);
    }
    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ error: 'Ayarlar yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json(); // key-value map

    for (const [key, value] of Object.entries(body)) {
      await db.execute({
        sql: `INSERT INTO settings (key, value) VALUES (?, ?)
              ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        args: [key, String(value)],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Ayarlar kaydedilemedi' }, { status: 500 });
  }
}
