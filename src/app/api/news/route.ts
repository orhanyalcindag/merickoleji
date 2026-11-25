import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const branch_id = searchParams.get('branch_id');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const includeUnpublished = searchParams.get('all') === 'true';

    let sql = 'SELECT * FROM news_announcements WHERE 1=1';
    const args: (string | number)[] = [];

    if (!includeUnpublished) {
      sql += ' AND is_published = 1';
    }

    if (type && type !== 'all') {
      sql += ' AND type = ?';
      args.push(type);
    }

    if (branch_id && branch_id !== 'all') {
      sql += ' AND (branch_id = ? OR branch_id = "all")';
      args.push(branch_id);
    }

    if (featured === 'true' || featured === '1') {
      sql += ' AND is_featured = 1';
    }

    sql += ' ORDER BY id DESC';

    if (limit) {
      sql += ' LIMIT ?';
      args.push(Number(limit));
    }

    const result = await db.execute({ sql, args });
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ error: 'Haber ve duyurular alınamadı' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const {
      title,
      type = 'duyuru',
      branch_id = 'all',
      image = '',
      summary = '',
      content = '',
      date = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      is_featured = 0,
      is_published = 1,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Başlık alanı zorunludur' }, { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);

    const defaultImage = image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';

    const result = await db.execute({
      sql: `INSERT INTO news_announcements (title, slug, type, branch_id, image, summary, content, date, is_featured, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        title,
        slug,
        type,
        branch_id,
        defaultImage,
        summary,
        content,
        date,
        is_featured ? 1 : 0,
        is_published ? 1 : 0,
      ],
    });

    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid), slug });
  } catch (error) {
    console.error('News create error:', error);
    return NextResponse.json({ error: 'Haber/duyuru eklenemedi' }, { status: 500 });
  }
}
