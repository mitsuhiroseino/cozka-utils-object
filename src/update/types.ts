import { IsEqualByOptions } from '@cozka/utils-lang/isEqualBy';
import { SetByNormalizedKeyOptions } from '../setByNormalizedKey';

/**
 * update関数のオプション
 */
export type UpdateOptions = IsEqualByOptions & SetByNormalizedKeyOptions;
