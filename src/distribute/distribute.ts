import cloneDeep from 'lodash-es/cloneDeep';
import { DistributeOptions, DistributeRules } from './types';

/**
 * object直下のプロパティをrulesに従って分類する
 * @param object
 * @param rules
 * @param options
 */
export default function distribute<R extends DistributeRules>(
  object: Record<PropertyKey, unknown>,
  rules: R,
  options: DistributeOptions = {},
) {
  const { ownProperty, cloneValue } = options;
  const has = ownProperty
    ? (property) => Object.hasOwn(object, property)
    : (property) => property in object;
  const get = cloneValue
    ? (property) => cloneDeep(object[property])
    : (property) => object[property];
  // 分類結果
  const result: Record<string, Record<PropertyKey, unknown>> = {};
  // 対象をrestにコピーし、分類できたものはrestから削除していく
  const rest = { ...object };
  const restGroupKeys: string[] = [];

  for (const groupKey in rules) {
    const group = (result[groupKey] = {} as any);
    const properties = rules[groupKey];
    if (properties == null) {
      // 分類できなかったプロパティを設定するグループ
      restGroupKeys.push(groupKey);
    } else {
      // 指定のプロパティを対象のグループへ分類
      for (const property in properties) {
        if (has(property)) {
          const value = properties[property];
          if (value === true) {
            // 元のプロパティ名でグループへ設定
            group[property] = get(property);
            delete rest[property];
          } else if (value !== false) {
            // 指定のプロパティ名でグループへ設定
            group[value] = get(property);
            delete rest[property];
          }
        }
      }
    }
  }
  if (restGroupKeys.length) {
    for (const groupKey of restGroupKeys) {
      // restの内容をグループへ設定
      result[groupKey] = { ...rest };
    }
  }

  return result as {
    [groupKey in keyof R]: { [property: PropertyKey]: unknown };
  };
}
