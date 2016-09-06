import Promise from 'bluebird';
import * as api from '../utils/api';

export async function servicesBySuburb(suburb) {
  // simulate an asynchronous operation
  return await
    api
    .get("/services")
}
