import { restConnector } from "./index";
import { url } from "../ultils";
class TimKiemServices {
  getMarkerFollowFilter(filterCondi) {
    return restConnector({
      url: `${url}/posts/postdataroom`,
      method: "POST",
      headers: { "Access-Control-Allow-Origin": true },
      data: filterCondi,
    })
      // .then((res) => res.data)
      // .catch((err) => console.log(err));
      
  }
}
export default new TimKiemServices();
