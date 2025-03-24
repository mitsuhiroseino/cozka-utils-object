import { NormalizeOptions } from '@cozka/utils-string/normalize';

/**
 * オプション
 */
export type CreateLooseObjectOptions<T extends object> = NormalizeOptions & {
  /**
   * 対象のプロパティを持つオブジェクト
   */
  target?: T;

  /**
   * 継承されたプロパティを管理対象とするか
   *
   * - false: 管理対象とする
   * - true: 管理対象としない
   */
  ownProperty?: boolean;
};
