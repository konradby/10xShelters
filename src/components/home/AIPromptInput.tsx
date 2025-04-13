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
    <section className="py-12 bg-primary-50 rounded-xl shadow-lg border border-primary-200">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
          Opisz swojego idealnego psa
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            label="Opisz dokładnie jakiego psa szukasz"
            labelPlacement="outside"
            placeholder="Na przykład: Szukam średniej wielkości psa, który będzie dobrym towarzyszem dla rodziny z dziećmi. Powinien być aktywny, ale nie wymagający zbyt dużo ruchu. Preferuję psy o krótkiej sierści."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minRows={4}
            maxRows={8}
            isInvalid={!!error}
            errorMessage={error}
            className="w-full bg-white shadow-md border-2 border-primary-300 focus:border-primary-500"
            size="lg"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={prompt.length < 10 || prompt.length > 1000}
              className="text-lg font-bold py-6 px-8 text-white bg-primary-600 hover:bg-primary-700 shadow-md"
              size="lg"
            >
              {isLoading ? 'Szukam...' : 'Znajdź idealnego psa'}
            </Button>
          </div>
        </form>
        <div className="mt-6 p-4 bg-white rounded-lg border border-primary-200 shadow-sm">
          <p className="font-medium text-primary-800">
            Podpowiedź: Opisz jak najdokładniej:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
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
