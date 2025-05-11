import { DogsService } from '@/app/api/services';
import { DogDetailsDTO } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse<DogDetailsDTO | { error: string }>> {
  const id = request.nextUrl.pathname.split('/').pop();
  const supabase = await createClient();
  const dogsService = new DogsService(supabase);

  if (!id) {
    return NextResponse.json({ error: 'Dog id is required' }, { status: 400 });
  }

  const dogData = await dogsService.getDogById(id);

  if (!dogData) {
    return NextResponse.json({ error: 'Dog not found' }, { status: 404 });
  }

  return NextResponse.json(dogData);
}
