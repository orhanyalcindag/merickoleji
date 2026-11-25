import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '@/lib/db';

export async function GET() {
  try {
    await ensureDbInitialized();
    const result = await db.execute('SELECT * FROM applications ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Applications fetch error:', error);
    return NextResponse.json({ error: 'Başvurular alınamadı' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const {
      parent_name,
      phone,
      email = '',
      student_name,
      grade_level,
      branch_id,
      notes = '',
    } = body;

    if (!parent_name || !phone || !student_name || !branch_id) {
      return NextResponse.json(
        { error: 'Lütfen veli adı, telefon, öğrenci adı ve kampüs seçimini eksiksiz doldurunuz.' },
        { status: 400 }
      );
    }

    const now = new Date();
    const created_at = now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const result = await db.execute({
      sql: `INSERT INTO applications (parent_name, phone, email, student_name, grade_level, branch_id, notes, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'bekliyor', ?)`,
      args: [parent_name, phone, email, student_name, grade_level || 'Belirtilmedi', branch_id, notes, created_at],
    });

    return NextResponse.json({
      success: true,
      message: 'Ön kayıt başvurunuz başarıyla alındı. Eğitim danışmanımız en kısa sürede sizinle iletişime geçecektir.',
      id: Number(result.lastInsertRowid),
    });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json({ error: 'Başvuru kaydedilirken bir hata oluştu' }, { status: 500 });
  }
}
