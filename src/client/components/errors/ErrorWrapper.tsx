import * as React from 'react';

export const withError = (WrappedComponent: any) => {
  return class ErrorBoundary extends React.Component<{}, any> {
    constructor(props: any) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
      this.setState({
        error,
        errorInfo,
      });
    }

    render() {
      if (this.state.errorInfo) {
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};
