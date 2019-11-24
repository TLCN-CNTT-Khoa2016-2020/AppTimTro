/*----------------------------------CALCULATE FOR MAP----------------------------------*/
/*
* function isInTheCircle
* purpose : check if a point is in the circle with center "centerPoint" and radius "km"
* return : true/false
* @param checkPoint
* @param centerPoint
* @param km 
*/
exports.isInTheCircle  = (checkPoint, centerPoint, km) => {
    let ky = 40000/360;
    let kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
    let dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    let dy = Math.abs(centerPoint.latitude - checkPoint.latitude ) * ky;
    return Math.sqrt(dx *dx + dy * dy) <= km
}
