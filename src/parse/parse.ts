import isString from 'lodash-es/isString';
import { ParseOptions } from './types';

/**
 * オブジェクトへのパースを行う
 * @param value 任意の値
 * @param options オプション
 * @returns
 */
export default function parse(
  value: any,
  options: ParseOptions = {},
): any | null {
  if (isString(value)) {
    return JSON.parse(value, options.reviver);
  }
  return value;
}
