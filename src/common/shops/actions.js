import type { Action, Deps, Shop } from '../types';
import { range } from 'ramda';

export const downloadShopsCSV = (id: string): Action => ({
  type: 'DOWNLOAD_SHOPS_CSV',
  payload: { id },
});

export const toggleShopSelected = (shop: Shop): Action => ({
  type: 'TOGGLE_SHOP_SELECTED',
  payload: { shop },
});
