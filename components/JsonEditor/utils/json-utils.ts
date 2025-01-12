export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export function formatJson(json: any): string {
  return JSON.stringify(json, null, 2);
}

export function parseJson(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

