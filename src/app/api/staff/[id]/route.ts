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
    const {
      branch_id,
      name,
      title,
      hierarchy_level = 3,
      parent_id = null,
      subject = '',
      photo = '',
      bio = '',
      education = '',
      experience_years = 0,
      order_num = 0,
    } = body;

    await db.execute({
      sql: `UPDATE staff 
            SET branch_id = ?, name = ?, title = ?, hierarchy_level = ?, parent_id = ?, 
                subject = ?, photo = ?, bio = ?, education = ?, experience_years = ?, order_num = ?
            WHERE id = ?`,
      args: [
        branch_id,
        name,
        title,
        Number(hierarchy_level),
        parent_id ? Number(parent_id) : null,
        subject,
        photo,
        bio,
        education,
        Number(experience_years),
        Number(order_num),
        Number(id),
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Staff update error:', error);
    return NextResponse.json({ error: 'Kadro bilgisi güncellenemedi' }, { status: 500 });
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
      sql: 'DELETE FROM staff WHERE id = ?',
      args: [Number(id)],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Staff delete error:', error);
    return NextResponse.json({ error: 'Kadro silinemedi' }, { status: 500 });
  }
}
