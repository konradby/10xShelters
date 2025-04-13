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
    <section className="py-12 bg-[#F5F7F2] rounded-3xl shadow-lg border border-[#D1DBC8]">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#2C4A27] mb-6 text-center">
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
            className="w-full bg-white shadow-sm border-2 border-[#A7C4A0] focus:border-[#4A6741]"
            size="lg"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              color="success"
              isLoading={isLoading}
              isDisabled={prompt.length < 10 || prompt.length > 1000}
              className="text-lg font-bold py-6 px-8 text-white bg-[#4A6741] hover:bg-[#2C4A27] shadow-md rounded-xl"
              size="lg"
            >
              {isLoading ? 'Szukam...' : 'Znajdź idealnego psa'}
            </Button>
          </div>
        </form>
        <div className="mt-6 p-6 bg-white rounded-2xl border border-[#D1DBC8] shadow-sm">
          <p className="font-medium text-[#2C4A27]">
            Podpowiedź: Opisz jak najdokładniej:
          </p>
          <ul className="list-disc list-inside mt-2 text-[#4A6741] space-y-2">
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
