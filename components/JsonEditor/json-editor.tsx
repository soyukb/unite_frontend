'use client'

import { useJsonEditor } from '../hooks/useJsonEditor'
import { EditorToolbar } from './editor-toolbar'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import type { JsonValue } from '../types/json'
import { useEffect } from 'react'

export interface JsonEditorProps {
  initialValue: JsonValue;
  value?: JsonValue;
  onChange?: (value: JsonValue) => void;
}

export function JsonEditor({ initialValue, value, onChange }: JsonEditorProps) {
  const { value: editorValue, error, updateValue, formatValue, parsedValue } = useJsonEditor(initialValue)

  // 外部からvalueが更新された場合に反映
  useEffect(() => {
    if (value !== undefined) {
      updateValue(value)
    }
  }, [value, updateValue])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue)
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([editorValue], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value)
    if (onChange && !error) {
      onChange(parsedValue)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <EditorToolbar
          onFormat={formatValue}
          onCopy={handleCopy}
          onDownload={handleDownload}
          isValid={!error}
        />
        <div className="p-4">
          <Textarea
            value={editorValue}
            onChange={handleChange}
            className="font-mono min-h-[500px] resize-y"
            placeholder="JSONを入力してください"
          />
        </div>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

