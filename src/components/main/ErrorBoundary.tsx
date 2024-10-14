import React, { FC, ReactElement, ErrorInfo } from 'react';
import { Fallback } from '@/components/main';

interface ErrorBoundaryPropsI {
  children: ReactElement;
  fallback: FC<{ errorMsg: string }>;
}

interface ErrorBoundaryStateI {
  errorMsg: string;
}

export function ErrorBoundaryFallback({ errorMsg }: ErrorBoundaryStateI) {
  console.error(errorMsg);
  return <Fallback gradient="from-light_navy to-white" textColor="text-white" textLabel="Error" />;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryPropsI, ErrorBoundaryStateI> {
  constructor(props: ErrorBoundaryPropsI) {
    super(props);
    this.state = { errorMsg: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryStateI {
    console.log(error);
    return { errorMsg: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // logErrorToMyServices(error, info);
    console.log(error, info);
  }

  render() {
    const { errorMsg } = this.state;
    const { fallback: Fallback, children } = this.props;

    if (errorMsg) {
      if (Fallback) {
        return <Fallback errorMsg={errorMsg} />;
      }

      return errorMsg;
    }

    return children;
  }
}
