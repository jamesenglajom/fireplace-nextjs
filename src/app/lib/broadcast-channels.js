
import { BroadcastChannel } from 'broadcast-channel';

export const cartProductsChannel = new BroadcastChannel('update-cart-product');
export const compareProductsChannel = new BroadcastChannel('update-compare-product');