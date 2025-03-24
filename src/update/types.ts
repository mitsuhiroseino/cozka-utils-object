import { IsEqualByOptions } from '@cozka/utils-lang/isEqualBy';
import { PutOptions } from '../put';

/**
 * update関数のオプション
 */
export type UpdateOptions = IsEqualByOptions & PutOptions;
