import { Button } from "@/components/ui/button"
import { Download, FileCode, Copy } from 'lucide-react'

interface EditorToolbarProps {
  onFormat: () => void;
  onCopy: () => void;
  onDownload: () => void;
  isValid: boolean;
}

export function EditorToolbar({ onFormat, onCopy, onDownload, isValid }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button
        variant="outline"
        size="sm"
        onClick={onFormat}
        disabled={!isValid}
      >
        <FileCode className="w-4 h-4 mr-2" />
        フォーマット
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        disabled={!isValid}
      >
        <Copy className="w-4 h-4 mr-2" />
        コピー
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        disabled={!isValid}
      >
        <Download className="w-4 h-4 mr-2" />
        ダウンロード
      </Button>
    </div>
  )
}

