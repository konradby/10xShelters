'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@heroui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ups! Coś poszło nie tak</h2>
          <p className="text-gray-600 mb-8">
            Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub skontaktuj
            się z nami, jeśli problem będzie się powtarzał.
          </p>
          <Button color="primary" onClick={() => window.location.reload()}>
            Odśwież stronę
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
