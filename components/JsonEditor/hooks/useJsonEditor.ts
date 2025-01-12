import { useState, useCallback } from 'react';
import { isValidJson, formatJson, parseJson } from '../utils/json-utils';
import type { JsonValue } from '../types/json';

export function useJsonEditor(initialValue: JsonValue) {
  const [value, setValue] = useState<string>(formatJson(initialValue));
  const [error, setError] = useState<string>('');

  const updateValue = useCallback((newValue: string | JsonValue) => {
    // 文字列以外が渡された場合はJSONに変換
    const stringValue = typeof newValue === 'string' 
      ? newValue 
      : JSON.stringify(newValue, null, 2);
    
    setValue(stringValue);
    
    if (stringValue.trim() === '') {
      setError('JSONを入力してください');
      return;
    }
    
    if (!isValidJson(stringValue)) {
      setError('無効なJSONフォーマットです');
      return;
    }
    
    setError('');
  }, []);

  const formatValue = useCallback(() => {
    if (isValidJson(value)) {
      setValue(formatJson(parseJson(value)));
    }
  }, [value]);

  return {
    value,
    error,
    updateValue,
    formatValue,
    parsedValue: parseJson(value)
  };
}

