import React, { ErrorInfo } from 'react'

import { captureException } from '@sentry/nextjs'

import ApplicationErrorView from 'components/views/ApplicationErrorView'

/**
 * Props interface for the ErrorBoundary component.
 * @interface
 * @property {React.ReactNode} children - The child components that ErrorBoundary will wrap.
 */
interface Props {
  children: React.ReactNode
}

/**
 * State interface for the ErrorBoundary component.
 * @interface
 * @property {boolean} hasError - Flag to indicate if an error has been caught.
 * @property {Error | null} [error] - The error object caught by the error boundary, if any.
 * @property {ErrorInfo | null} [errorInfo] - Additional information about the error caught by the error boundary, if any.
 */
interface State {
  hasError: boolean
}

/**
 * ErrorBoundary class component definition.
 * This component is designed to catch JavaScript errors anywhere in its child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 * @extends React.Component<Props, State>
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * Updates the state to indicate an error has occurred.
   * This lifecycle method is invoked after an error has been thrown by a descendant component.
   * It receives the error that was thrown as a parameter and returns a value to update state.
   *
   * @static
   * @returns {State} The new state object indicating that an error has occurred.
   */
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  /**
   * Lifecycle method to catch errors in any components below in the tree.
   * An error boundary can’t catch an error within itself.
   *
   * @param {Error} error - The error that was thrown.
   * @param {ErrorInfo} errorInfo - An object with componentStack key containing information about which component threw the error.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorMessage = `An unexpected error occurred: ${error.message}. See component stack for more details.`
    captureException(new Error(errorMessage), { extra: { componentStack: errorInfo.componentStack } })
    this.setState({ hasError: true })
  }

  /**
   * Renders the component UI.
   *
   * This method checks if an error has been caught by the error boundary. If an error is present,
   * it renders the `ApplicationErrorView` component to display a fallback UI. Otherwise, it renders
   * the child components passed to the `ErrorBoundary`.
   *
   * @returns The JSX element to be rendered.
   */
  render() {
    if (this.state.hasError) {
      return <ApplicationErrorView />
    }
    return this.props.children
  }
}

export default ErrorBoundary
