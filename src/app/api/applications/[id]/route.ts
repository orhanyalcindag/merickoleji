import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDbInitialized();
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (notes !== undefined && status !== undefined) {
      await db.execute({
        sql: 'UPDATE applications SET status = ?, notes = ? WHERE id = ?',
        args: [status, notes, Number(id)],
      });
    } else if (status !== undefined) {
      await db.execute({
        sql: 'UPDATE applications SET status = ? WHERE id = ?',
        args: [status, Number(id)],
      });
    } else if (notes !== undefined) {
      await db.execute({
        sql: 'UPDATE applications SET notes = ? WHERE id = ?',
        args: [notes, Number(id)],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application update error:', error);
    return NextResponse.json({ error: 'Başvuru güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDbInitialized();
    const { id } = await params;

    await db.execute({
      sql: 'DELETE FROM applications WHERE id = ?',
      args: [Number(id)],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application delete error:', error);
    return NextResponse.json({ error: 'Başvuru silinemedi' }, { status: 500 });
  }
}
