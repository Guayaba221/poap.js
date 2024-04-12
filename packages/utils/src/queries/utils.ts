import { Order } from '../types/order';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterUndefinedProperties<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  const filteredObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order | undefined,
): { [key: string]: Order } {
  return key && value ? { [key]: value } : {};
}

export function createLikeFilter(
  key: string,
  value?: string,
): { [key: string]: { _ilike: string } } {
  return value ? { [key]: { _ilike: `%${value}%` } } : {};
}

export function createEqFilter(
  key: string,
  value?: string | number,
): { [key: string]: { _eq: string | number } } {
  return value ? { [key]: { _eq: value } } : {};
}

export function createNeqFilter(
  key: string,
  value?: string | number,
): { [key: string]: { _neq: string | number } } {
  return value ? { [key]: { _neq: value } } : {};
}

export function createBoolFilter(
  key: string,
  value?: boolean,
): { [key: string]: { _eq: 'true' | 'false' } } {
  return typeof value === 'boolean'
    ? { [key]: { _eq: value ? 'true' : 'false' } }
    : {};
}

export function createAddressFilter(
  key: string,
  filterZeroAddress: boolean,
  value?: string,
): {
  [key: string]: {
    _neq?: string;
    _eq?: string;
  };
} {
  return filterZeroAddress || value
    ? {
        [key]: {
          ...(filterZeroAddress
            ? { _neq: '0x0000000000000000000000000000000000000000' }
            : {}),
          ...(value ? { _eq: value.toLowerCase() } : {}),
        },
      }
    : {};
}

export function createInFilter(
  key: string,
  values?: Array<string | number>,
): { [key: string]: { _in: Array<string | number> } } {
  return values && values.length ? { [key]: { _in: values } } : {};
}

export function createBetweenFilter(
  key: string,
  from?: string,
  to?: string,
): Record<string, any> {
  const dateFilter: { _gte?: string; _lte?: string } = {};
  if (from) {
    dateFilter._gte = from;
  }
  if (to) {
    dateFilter._lte = to;
  }
  return from || to ? { [key]: dateFilter } : {};
}
