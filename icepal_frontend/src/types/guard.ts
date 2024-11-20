export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isNothing(value: unknown): value is undefined | null {
  return isUndefined(value) || isNull(value);
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isPrimitive(
  value: unknown
): value is undefined | null | symbol | boolean | number | string {
  return (
    isUndefined(value) ||
    isNull(value) ||
    isSymbol(value) ||
    isBoolean(value) ||
    isNumber(value) ||
    isString(value)
  );
}

export function isDictionary(
  value: unknown
): value is Record<keyof never, unknown> {
  return value instanceof Object && value.constructor === Object;
}

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isRegex(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function isPromise(value: unknown): value is Promise<never> {
  return value instanceof Promise;
}

export function isEmpty(value: unknown): value is undefined | null | '' | [] {
  return (
    isUndefined(value) ||
    isNull(value) ||
    value === '' ||
    (isArray(value) && value.length === 0)
  );
}
