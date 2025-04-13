'use client';

import { useState } from 'react';
import { Textarea, Button } from '@heroui/react';
import { useAIMatch } from '@/hooks/useAIMatch';

export const AIPromptInput = () => {
  const { prompt, setPrompt, isLoading, error, searchDogs } = useAIMatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchDogs(prompt);
  };

  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Opisz idealnego psa dla Ciebie"
            placeholder="Na przykład: Szukam średniej wielkości psa, który będzie dobrym towarzyszem dla rodziny z dziećmi. Powinien być aktywny, ale nie wymagający zbyt dużo ruchu. Preferuję psy o krótkiej sierści."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minRows={4}
            maxRows={8}
            isInvalid={!!error}
            errorMessage={error}
            className="w-full"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={prompt.length < 10 || prompt.length > 1000}
            >
              Znajdź psa
            </Button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          <p>Podpowiedź: Opisz jak najdokładniej:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Twój styl życia i aktywności</li>
            <li>Miejsce zamieszkania i warunki</li>
            <li>Oczekiwania wobec psa</li>
            <li>Preferencje dotyczące wielkości i wyglądu</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
