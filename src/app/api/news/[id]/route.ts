import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDbInitialized();
    const { id } = await params;

    // Search either by ID or by slug
    const isNumeric = /^\d+$/.test(id);
    let result;
    if (isNumeric) {
      result = await db.execute({
        sql: 'SELECT * FROM news_announcements WHERE id = ?',
        args: [Number(id)],
      });
    } else {
      result = await db.execute({
        sql: 'SELECT * FROM news_announcements WHERE slug = ?',
        args: [id],
      });
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'İçerik bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('News get error:', error);
    return NextResponse.json({ error: 'İçerik getirilemedi' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDbInitialized();
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      type,
      branch_id,
      image,
      summary,
      content,
      date,
      is_featured,
      is_published,
    } = body;

    await db.execute({
      sql: `UPDATE news_announcements 
            SET title = ?, type = ?, branch_id = ?, image = ?, summary = ?, 
                content = ?, date = ?, is_featured = ?, is_published = ?
            WHERE id = ?`,
      args: [
        title,
        type,
        branch_id,
        image,
        summary,
        content,
        date,
        is_featured ? 1 : 0,
        is_published ? 1 : 0,
        Number(id),
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('News update error:', error);
    return NextResponse.json({ error: 'Haber/duyuru güncellenemedi' }, { status: 500 });
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
      sql: 'DELETE FROM news_announcements WHERE id = ?',
      args: [Number(id)],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('News delete error:', error);
    return NextResponse.json({ error: 'Haber/duyuru silinemedi' }, { status: 500 });
  }
}
