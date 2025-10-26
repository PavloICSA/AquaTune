import React, { Component, ErrorInfo, ReactNode } from 'react';

// Error boundary state interface
interface TranslationErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
  errorStack?: string;
}

// Error boundary props interface
interface TranslationErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Error boundary component specifically designed for translation-related errors.
 * Provides graceful fallback UI when translation system fails.
 */
export class TranslationErrorBoundary extends Component<
  TranslationErrorBoundaryProps,
  TranslationErrorBoundaryState
> {
  constructor(props: TranslationErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): TranslationErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorMessage: error.message,
      errorStack: error.stack
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error for debugging
    console.error('Translation Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    
    // You could also log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  private handleRetry = (): void => {
    // Reset error state to retry rendering
    this.setState({
      hasError: false,
      errorMessage: undefined,
      errorStack: undefined
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI in Ukrainian (most likely to work)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-[min(10vw, 70px)] font-medium text-gray-900">
                  Помилка перекладу / Translation Error
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-[min(10vw, 70px)] text-gray-600 mb-2">
                Виникла помилка в системі перекладу. Спробуйте оновити сторінку.
              </p>
              <p className="text-[min(10vw, 70px)] text-gray-600">
                A translation system error occurred. Try refreshing the page.
              </p>
            </div>

            {this.state.errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-[min(10vw, 70px)] text-red-700 font-mono">
                  {this.state.errorMessage}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-[min(10vw, 70px)] font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Спробувати знову / Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md text-[min(10vw, 70px)] font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Оновити / Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap components with translation error boundary
 */
export const withTranslationErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <TranslationErrorBoundary fallback={fallback}>
      <Component {...props} />
    </TranslationErrorBoundary>
  );

  WrappedComponent.displayName = `withTranslationErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};