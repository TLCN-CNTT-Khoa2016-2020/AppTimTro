import { restConnector } from "./index";
class TimKiemServices {
  getMarkerFollowFilter(filterCondi) {
    return restConnector({
      url: "http://192.168.0.20:8080/posts/postdataroom",
      method: "POST",
      headers: { "Access-Control-Allow-Origin": true },
      data: filterCondi,
    })
      // .then((res) => res.data)
      // .catch((err) => console.log(err));
  }
}
export default new TimKiemServices();
