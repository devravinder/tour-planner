import { Component, ErrorInfo, ReactNode } from "react";

type FallbackFn = (error: Error) => ReactNode;
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: FallbackFn;
}

interface State {
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  static displayName = "ErrorBoundary";

  readonly state = {} as State;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { name, message } = error;
    const { componentStack } = errorInfo;
    console.log("error", {
      timestamp: Date.now(),
      name,
      message,
      componentStack,
    });
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    return error ? fallback?.(error) || <div>{error.message}</div> : children;
  }
}
