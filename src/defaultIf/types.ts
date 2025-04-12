import { ForEachValuesOptions } from '../forEachValues';

export type DefaultIfOptions = ForEachValuesOptions & {
  /**
   * デフォルト値がnullの場合は処理しない
   */
  skipNull?: boolean;

  /**
   * 対象のオブジェクトのプロパティ値がnullの場合にも設定する
   */
  overwriteNull?: boolean;
};
