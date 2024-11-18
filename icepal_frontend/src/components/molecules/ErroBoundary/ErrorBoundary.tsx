import { Component, ErrorInfo, ReactNode } from 'react'
import {
  Button,
  AlertTriangle,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from 'design-system-eduno'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            Error en la aplicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Lo sentimos, ha ocurrido un error inesperado.
          </p>
          {error && (
            <p className="mt-2 break-words text-sm text-gray-500">
              {error.toString()}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()} className="w-full">
            Recargar la página
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export { ErrorBoundary }
