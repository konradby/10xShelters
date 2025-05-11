import { DogsService } from '@/app/api/services';
import { logError } from '@/lib';
import { AIService } from '@/lib/ai-service';
import { AIMatchRequestSchema } from '@/lib/schemas/ai-match.schema';
import { AIMatchResponse } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const validationResult = AIMatchRequestSchema.safeParse(body);
  
  if (!validationResult.success) {
    logError('Invalid request body:', { error: validationResult.error });
    return NextResponse.json(
      { error: validationResult.error.errors[0].message },
      { status: 400 }
    );
  }
  
  const dogsService = new DogsService(await createClient());

  const dogs = await dogsService.getDogs(10);

  if (!dogs || dogs.length === 0) {
    logError('No dogs found', { dogs });

    return NextResponse.json(
      { error: 'No dogs found' },
      { status: 404 }
    );
  }

  const aiService = new AIService();
  let result: AIMatchResponse | null = null;

  result = await aiService.matchDogs(body, dogs);
  
  if (!result || !Array.isArray(result.matches) || result.matches.length === 0) {
    return NextResponse.json(
      { error: 'Nie otrzymano wyników dopasowania' },
      { status: 404 }
    );
  }

  return NextResponse.json(result.matches);
}
