export type FormatOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key キー
   * @param value 値
   * @returns 任意の値
   */
  replacer?: (key: string, value: any) => any;

  /**
   * インデントに設定するスペース
   */
  space?: string | number;
};
