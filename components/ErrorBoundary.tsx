"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-ink-950 p-8">
          <div className="text-center">
            <h1 className="serif-display text-3xl text-ink-900 dark:text-ink-50 mb-4">
              Terjadi Kesalahan
            </h1>
            <p className="text-ink-600 dark:text-ink-400 mb-6">
              Maaf, terjadi kesalahan saat memuat halaman ini.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-sacred-500 px-4 py-2 text-white hover:bg-sacred-600 transition-colors"
            >
              Muat Ulang Halaman
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="mt-6 text-left text-xs bg-ink-900/5 dark:bg-white/5 p-4 rounded-lg overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}