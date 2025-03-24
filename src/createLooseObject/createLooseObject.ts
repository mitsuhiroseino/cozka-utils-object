import normalize from '@cozka/utils-string/normalize';
import isString from 'lodash-es/isString';
import stubTrue from 'lodash-es/stubTrue';
import hasOwnProperty from '../hasOwnProperty';
import { GenericRecord } from '../types';
import { CreateLooseObjectOptions } from './types';

type InsensitiveRecord<T extends GenericRecord> = T & Record<string, unknown>;

/**
 * キーの大文字・小文字を意識しないオブジェクトを作成する
 * @param options
 * @returns
 */
export default function createLooseObject<T extends GenericRecord>(
  options: CreateLooseObjectOptions<T> = {},
): InsensitiveRecord<T> {
  const { target = {} as T, ownProperty, ...normalizeOptions } = options;
  const isTargetProperty = ownProperty
    ? (target: T, key: PropertyKey) => hasOwnProperty(target, key)
    : stubTrue;
  const normalizedObject = {} as GenericRecord;

  // オリジナルのキーと標準化されたキーのマッピング
  const keyMap: Record<string, string> = {};
  for (const key in target) {
    if (isTargetProperty(target, key)) {
      if (isString(key)) {
        const standardizedKey = normalize(key, normalizeOptions);
        keyMap[key] = standardizedKey;
        keyMap[standardizedKey] = standardizedKey;
        normalizedObject[standardizedKey] = target[key];
      } else {
        normalizedObject[key] = target[key];
      }
    }
  }

  // 標準化されたキーの取得
  const getKey = <K extends PropertyKey>(target: T, key: K) => {
    if (key in target === false && isString(key)) {
      // キーを標準化
      if (key in keyMap) {
        return keyMap[key];
      } else {
        return normalize(key, normalizeOptions);
      }
    }
    return key;
  };

  return new Proxy(normalizedObject as InsensitiveRecord<T>, {
    // プロパティの設定時
    set(target, key, value, receiver) {
      if (isString(key)) {
        if (key in keyMap === false) {
          // キーを標準化して保持する
          keyMap[key] = normalize(key, normalizeOptions);
        }
        key = getKey(target, key);
      }
      return Reflect.set(target, key, value, receiver);
    },
    // プロパティの取得時
    get(target, key, receiver) {
      return Reflect.get(target, getKey(target, key), receiver);
    },
    // プロパティの有無判定
    has(target, key) {
      return Reflect.has(target, getKey(target, key));
    },
    // プロパティの削除時
    deleteProperty(target, key) {
      if (isString(key)) {
        const rawKey = key;
        key = getKey(target, rawKey);
        if (rawKey in keyMap) {
          // マップからキーを削除
          delete keyMap[rawKey];
          delete keyMap[key];
          for (const orgKey in keyMap) {
            if (keyMap[orgKey] === key) {
              // 標準化されたキーが同じものは削除
              delete keyMap[orgKey];
            }
          }
        }
      }
      return Reflect.deleteProperty(target, key);
    },
    // プロパティの定義取得時
    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target, getKey(target, key));
    },
    // プロパティの定義
    defineProperty(
      target: T,
      key: string | symbol,
      attributes: PropertyDescriptor,
    ) {
      return Reflect.defineProperty(target, getKey(target, key), attributes);
    },
  });
}
