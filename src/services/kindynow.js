import Promise from 'bluebird';
import * as api from '../utils/api';

export async function centersBySuburb(suburb) {
  // simulate an asynchronous operation

  console.log("api", api.get("/services"))

  return await
    api
    .get("/services")
    .then((data) => console.log('ok, ', data))
    .catch((err)=> console.log('err', err))
}
