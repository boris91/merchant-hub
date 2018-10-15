import data from './data';
import MerchantApi from './merchant';
import BidApi from './bid';

export const merchantApi = new MerchantApi(data);

export const bidApi = new BidApi(data);