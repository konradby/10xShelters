import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Witaj w API 10xShelter!',
    status: 'active',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'Otrzymano dane',
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
}
