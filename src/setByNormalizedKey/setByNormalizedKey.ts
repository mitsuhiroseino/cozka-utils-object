import normalize from '@cozka/utils-string/normalize';
import { SetByNormalizedKeyOptions } from './types';

/**
 * オブジェクトのキーの大文字・小文字などの違いを無視して値を設定する
 * @param object 対象のオブジェクト
 * @param key 設定先のキー
 * @param value 設定する値
 * @param options オプション
 */
export default function setByNormalizedKey(
  object: Record<string, unknown>,
  key: string,
  value: unknown,
  options?: SetByNormalizedKeyOptions,
): Record<string, unknown> {
  if (object) {
    const targetKey = normalize(key, options);
    for (const objKey of Object.keys(object)) {
      if (normalize(objKey, options) === targetKey) {
        object[objKey] = value;
        return object;
      }
    }
    object[key] = value;
  }

  return object;
}
