'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="max-w-4xl mx-auto border-none shadow-none">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p>申し訳ありません。エラーが発生しました。</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

