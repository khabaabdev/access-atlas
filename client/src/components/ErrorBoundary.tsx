import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <main className="error-state" role="alert" aria-labelledby="error-title">
        <p className="eyebrow">A small pause</p>
        <h1 id="error-title">That step did not load.</h1>
        <p>Refresh the page and try again. Your learning plan is not stored by this app.</p>
        <button type="button" className="primary-button" onClick={() => window.location.reload()}>Refresh Access Atlas</button>
      </main>;
    }

    return this.props.children;
  }
}
