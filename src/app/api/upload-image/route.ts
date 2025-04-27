import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, message: '파일이 없습니다.' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploadImages');

  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  const bytes = await file.arrayBuffer();

  await writeFile(filePath, Buffer.from(bytes));

  return NextResponse.json({
    success: true,
    url: `/uploadImages/${file.name}`,
  });
}
