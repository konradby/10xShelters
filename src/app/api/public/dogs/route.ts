import { DogsService } from '@/app/api/services';
import { DogDetails } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse<DogDetails[] | { error: string }>> {
  const limit = Number(request.nextUrl.searchParams.get('limit') || 10);
  const supabase = await createClient();
  const dogsService = new DogsService(supabase);

  const dogData = await dogsService.getDogs(limit);

  return NextResponse.json(dogData);
}
