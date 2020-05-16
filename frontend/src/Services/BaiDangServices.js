import { restConnector } from "./index";
import { url } from "../ultils";
class BaiDangServices {
  deletePost(id) {
    return restConnector({
      url: `${url}/posts/`,
      method: "DELETE",
      data: { postID: id },
    });
  }
}
export default new BaiDangServices();
