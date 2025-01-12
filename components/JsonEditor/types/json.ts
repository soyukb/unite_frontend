export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface JsonEditorProps {
  initialValue: JsonValue;
  onChange?: (value: JsonValue) => void;
}

