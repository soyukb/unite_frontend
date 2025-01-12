'use client'

import { JsonEditor } from './components/json-editor'
import { UrlForm } from './components/url-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import type { JsonValue } from './types/json'

const initialJson = {
  article_id: null,
  title: "",
  title_translated: "",
  source_url: "",
  category: [],
  published_at: null,
  comment_count: 0,
  comments: [],
  is_published: false,
  media: [],
  posts: []
}

export default function JsonEditorPage() {
  const [jsonData, setJsonData] = useState<JsonValue>(initialJson)

  const handleChange = (value: JsonValue) => {
    setJsonData(value)
  }

  const handleJsonReceived = (json: JsonValue) => {
    setJsonData(json)
  }

  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Reddit URLからJSONを取得</CardTitle>
        </CardHeader>
        <CardContent>
          <UrlForm onJsonReceived={handleJsonReceived} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JSONエディタ</CardTitle>
        </CardHeader>
        <CardContent>
          <JsonEditor
            initialValue={initialJson}
            value={jsonData}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}

