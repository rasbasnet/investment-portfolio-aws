import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.log("Test: ", error, info);
		if (error.message.includes("ResizeObserver loop limit exceeded")) {
			console.warn(
				"ResizeObserver loop limit exceeded. Suppressing warning."
			);
			return;
		}

		// Handle other errors normally
		console.error(error, info);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
