import React, { ReactElement, ErrorInfo } from 'react';
import { Fallback } from './Fallback';

interface ErrorBoundaryPropsI {
  children: ReactElement;
}

interface ErrorBoundaryStateI {
  errorMsg: string;
}

function ErrorBoundaryFallback({ errorMsg }: ErrorBoundaryStateI) {
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
    const { children } = this.props;

    if (errorMsg) {
      <ErrorBoundaryFallback errorMsg={errorMsg} />;
    }

    return children;
  }
}
