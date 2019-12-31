/*<-- Misson MIDDLEWARE : Check all timtrosetting to see if this article satisfies 
the settings of a certain user. If there is a message for the user -->*/

/*------------------ IMPORT MODULE ------------------------*/
const inside = require('point-in-polygon')
/*<--------------------- IMPORT MODELS --------------------->*/
const Post = require('../models/posts.model');
const User = require('../models/users.model');
const { Expo } = require('expo-server-sdk');


module.exports = (_id_post, coordinates_post, roomPrice) => {
    try {
        // convert coordinates of post to Array
        let coordinates = [coordinates_post.latitude, coordinates_post.longitude];
        //
        User.find()
            .select(" _id timtroSettings expoPushToken")
            .exec()
            .then(result => {
                result.map(itemResult => {
                    return itemResult.timtroSettings.area.map(item => {
                        let polygons = item.map(itemPolygon => {
                            return [itemPolygon.latitude, itemPolygon.longitude]
                        })
                        if (inside(coordinates, polygons) && ((roomPrice >= itemResult.timtroSettings.rangePrice.minPrice) && (roomPrice <= itemResult.timtroSettings.rangePrice.maxPrice))) {

                            //console.log("Thông báo cho user có ID :" + `${itemResult._id}` + " đã có phòng thích hợp với mã bài đăng: " + `${_id_post}`)
                            // Create a new Expo SDK client
                            let expo = new Expo();

                            // Create the messages that you want to send to clents
                            let messages = [];
                         
                                // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                                // Check that all your push tokens appear to be valid Expo push tokens
                                if (!Expo.isExpoPushToken(itemResult.expoPushToken)) {
                                    console.error(`Push token ${itemResult.expoPushToken} is not a valid Expo push token`);
                                  
                                }
                                console.log(itemResult.expoPushToken)
                                // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
                                messages.push({
                                    to: itemResult.expoPushToken,
                                    sound: 'default',
                                    body: 'Đã tìm được phòng trọ thích hợp',
                                    data: { 
                                            userID  : itemResult._id,
                                            postID  : _id_post
                                         },
                                })
                            
                                // Update notification
                                User.findByIdAndUpdate({_id : itemResult._id},{$push: {notification : _id_post}})
                                    .exec()
                                    .then(result =>{
                                        // res.status(200).json({
                                        //     message : "Update notification successful !",
                                        // })
                                        console.log(itemResult._id)
                                        console.log("Update notification successful ")
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err
                                        })
                                    })
                

                            // The Expo push notification service accepts batches of notifications so
                            // that you don't need to send 1000 requests to send 1000 notifications. We
                            // recommend you batch your notifications to reduce the number of requests
                            // and to compress them (notifications with similar content will get
                            // compressed).
                            let chunks = expo.chunkPushNotifications(messages);
                            let tickets = [];
                            (async () => {
                                // Send the chunks to the Expo push notification service. There are
                                // different strategies you could use. A simple one is to send one chunk at a
                                // time, which nicely spreads the load out over time:
                                for (let chunk of chunks) {
                                    try {
                                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                                        console.log(ticketChunk);
                                        tickets.push(...ticketChunk);
                                        // NOTE: If a ticket contains an error code in ticket.details.error, you
                                        // must handle it appropriately. The error codes are listed in the Expo
                                        // documentation:
                                        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            })();

                        // Later, after the Expo push notification service has delivered the
                        // notifications to Apple or Google (usually quickly, but allow the the service
                        // up to 30 minutes when under load), a "receipt" for each notification is
                        // created. The receipts will be available for at least a day; stale receipts
                        // are deleted.
                        //
                        // The ID of each receipt is sent back in the response "ticket" for each
                        // notification. In summary, sending a notification produces a ticket, which
                        // contains a receipt ID you later use to get the receipt.
                        //
                        // The receipts may contain error codes to which you must respond. In
                        // particular, Apple or Google may block apps that continue to send
                        // notifications to devices that have blocked notifications or have uninstalled
                        // your app. Expo does not control this policy and sends back the feedback from
                        // Apple and Google so you can handle it appropriately.
                        let receiptIds = [];
                    for (let ticket of tickets) {
                        // NOTE: Not all tickets have IDs; for example, tickets for notifications
                        // that could not be enqueued will have error information and no receipt ID.
                        if (ticket.id) {
                            receiptIds.push(ticket.id);
                        }
                    }

                    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                    (async () => {
                        // Like sending notifications, there are different strategies you could use
                        // to retrieve batches of receipts from the Expo service.
                        for (let chunk of receiptIdChunks) {
                            try {
                                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                                console.log(receipts);

                                // The receipts specify whether Apple or Google successfully received the
                                // notification and information about an error, if one occurred.
                                for (let receipt of receipts) {
                                    if (receipt.status === 'ok') {
                                        continue;
                                    } else if (receipt.status === 'error') {
                                        console.error(`There was an error sending a notification: ${receipt.message}`);
                                        if (receipt.details && receipt.details.error) {
                                            // The error codes are listed in the Expo documentation:
                                            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                                            // You must handle the errors appropriately.
                                            console.error(`The error code is ${receipt.details.error}`);
                                        }
                                    }
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    })();


                }

                })
    })
})
        .catch (error => {
    console.log(error)
})
    } catch (error) {
    console.log(error)
}
}

expoPushNotification = (userID, postID) => {

}