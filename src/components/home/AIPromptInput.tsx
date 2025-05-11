'use client';

import { useAIMatch } from '@/app/context/AIMatchContext';
import { Button, Progress } from '@heroui/react';
import { useEffect, useState } from 'react';

export const AIPromptInput = () => {
  const defaultPrompt =
    'Szukam średniej wielkości psa, łagodnego i przyjaznego dla dzieci. Mieszkamy w domu z małym ogrodem na przedmieściach.';

  const { prompt, setPrompt, isLoading, error, searchDogs } = useAIMatch();
  const [characterCount, setCharacterCount] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string | null>(null);

  useEffect(() => {
    if (prompt === '') {
      setPrompt(defaultPrompt);
    }

    setCharacterCount(prompt.length);
    if (validationErrors) {
      setValidationErrors(null);
    }
  }, [prompt, setPrompt, validationErrors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (prompt.length < 10) {
      setValidationErrors('Opis musi zawierać co najmniej 10 znaków');
      return;
    }

    if (prompt.length > 1000) {
      setValidationErrors('Opis nie może być dłuższy niż 1000 znaków');
      return;
    }

    searchDogs(prompt);
    setShowTips(false);
  };

  const getProgressColor = () => {
    if (characterCount < 10) return 'danger';
    if (characterCount > 1000) return 'danger';
    if (characterCount < 50) return 'warning';
    return 'success';
  };

  const progressValue = Math.min((characterCount / 1000) * 100, 100);

  return (
    <div className="bg-white rounded-3xl shadow-md border border-[#D1DBC8] w-full max-w-4xl mx-auto">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-[#9db19a] text-center py-8 px-6 md:px-8">
          Opisz swojego idealnego psa
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="px-6 md:px-8 mb-4">
            <label
              htmlFor="dog-description"
              className="text-[#2C4A27] font-medium block mb-2"
            >
              Opisz dokładnie jakiego psa szukasz
            </label>

            <textarea
              id="dog-description"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              rows={6}
              className={`w-full p-4 text-base bg-white border-2 rounded-2xl text-black
                ${validationErrors ? 'border-red-500' : 'border-[#A7C4A0]'} 
                focus:outline-none focus:border-[#4A6741]
                disabled:bg-gray-100 disabled:opacity-75`}
              aria-invalid={!!validationErrors}
            />

            {validationErrors && (
              <p className="text-red-500 text-sm mt-1">{validationErrors}</p>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-between items-center mt-4 bg-[#F5F7F2] p-3 rounded-xl border border-[#D1DBC8]">
              <Progress
                value={progressValue}
                color={getProgressColor()}
                className="w-full max-w-[85%] rounded-full overflow-hidden"
                classNames={{
                  track: 'rounded-full h-3',
                  indicator: 'rounded-full',
                }}
                aria-label="Postęp wypełniania opisu"
              />
              <span className="text-sm font-medium text-[#2C4A27] ml-4">
                {characterCount}/1000
              </span>
            </div>
          </div>

          <div className="flex justify-center py-8 px-6 md:px-8">
            <Button
              type="submit"
              color="success"
              isLoading={isLoading}
              isDisabled={isLoading}
              spinner={
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              }
              className="text-lg font-bold py-6 px-8 text-white bg-[#4A6741] hover:bg-[#2C4A27] shadow-md rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isLoading ? 'Szukam pasujących psów...' : 'Znajdź idealnego psa'}
            </Button>
          </div>
        </form>

        {showTips && !isLoading && (
          <div className="px-6 md:px-8 pb-8">
            <div className="p-6 bg-[#F5F7F2] rounded-2xl border border-[#D1DBC8]">
              <p className="font-medium text-[#2C4A27]">
                Podpowiedź: Opisz jak najdokładniej:
              </p>
              <ul className="list-disc list-inside mt-3 text-[#4A6741] space-y-2">
                <li>Twój styl życia i aktywności</li>
                <li>Miejsce zamieszkania i warunki</li>
                <li>Oczekiwania wobec psa</li>
                <li>Preferencje dotyczące wielkości i wyglądu</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
