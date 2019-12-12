/*<-- Misson MIDDLEWARE : Check all timtrosetting to see if this article satisfies 
the settings of a certain user. If there is a message for the user -->*/

/*------------------ IMPORT MODULE ------------------------*/
const inside = require('point-in-polygon')
/*<--------------------- IMPORT MODELS --------------------->*/
const Post = require('../models/posts.model');
const User = require('../models/users.model');

module.exports = (_id_post, coordinates_post, roomPrice) => {
    try {
        // convert coordinates of post to Array
        let coordinates = [coordinates_post.latitude, coordinates_post.longitude];
        //
        User.find()
        .select(" _id timtroSettings")
        .exec()
        .then(result => {
            result.map(itemResult => {
                return itemResult.timtroSettings.area.map(item => {
                    let polygons = item.map(itemPolygon => {
                        return [itemPolygon.latitude, itemPolygon.longitude]
                    })
                    if (inside(coordinates, polygons) && ((roomPrice >= itemResult.timtroSettings.rangePrice.minPrice) && (roomPrice <= itemResult.timtroSettings.rangePrice.maxPrice)) ){
                        
                        console.log("Thông báo cho user có ID :" + `${itemResult._id}` + " đã có phòng thích hợp với mã bài đăng: " + `${_id_post}`)
                    }

                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}