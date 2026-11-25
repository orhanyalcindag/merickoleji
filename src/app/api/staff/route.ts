import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const searchParams = request.nextUrl.searchParams;
    const branch_id = searchParams.get('branch_id');

    let sql = 'SELECT * FROM staff';
    const args: (string | number)[] = [];

    if (branch_id && branch_id !== 'all') {
      sql += ' WHERE branch_id = ?';
      args.push(branch_id);
    }

    sql += ' ORDER BY hierarchy_level ASC, order_num ASC, id ASC';

    const result = await db.execute({ sql, args });
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Staff fetch error:', error);
    return NextResponse.json({ error: 'Kadro verileri alınamadı' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const {
      branch_id,
      name,
      title,
      hierarchy_level = 3,
      parent_id = null,
      subject = '',
      photo = '',
      gender = 'kadin',
      bio = '',
      education = '',
      experience_years = 0,
      order_num = 0,
    } = body;

    if (!name || !title || !branch_id) {
      return NextResponse.json({ error: 'Ad, unvan ve şube alanları zorunludur' }, { status: 400 });
    }

    const defaultPhoto =
      photo && photo.trim() !== ''
        ? photo
        : gender === 'kadin'
        ? '/images/staff/default-female.svg'
        : '/images/staff/default-male.svg';

    const result = await db.execute({
      sql: `INSERT INTO staff (branch_id, name, title, hierarchy_level, parent_id, subject, photo, bio, education, experience_years, order_num, gender)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        branch_id,
        name,
        title,
        Number(hierarchy_level),
        parent_id ? Number(parent_id) : null,
        subject,
        defaultPhoto,
        bio,
        education,
        Number(experience_years),
        Number(order_num),
        gender,
      ],
    });

    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error('Staff create error:', error);
    return NextResponse.json({ error: 'Öğretmen/yönetici eklenemedi' }, { status: 500 });
  }
}
