import { ForEachValuesOptions } from './types';

export default function forEachValues<T extends {}>(
  target: T,
  callbackfn: (value: unknown, key: PropertyKey, obj: T) => void | boolean,
  options: ForEachValuesOptions = {},
): boolean {
  const { ownProperty } = options;
  if (target) {
    for (const key in target) {
      if (!ownProperty || Object.hasOwn(target, key)) {
        const value = target[key];
        const result = callbackfn(value, key, target);
        if (result === false) {
          return false;
        }
      }
    }
  }
  return true;
}
