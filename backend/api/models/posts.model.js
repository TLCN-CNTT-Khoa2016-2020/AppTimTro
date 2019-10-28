//<--------------------- CALL THE PACKAGE --------------------->
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


//<--------------------- CREATE POST SCHEMA --------------------->
const postSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : {type : String, required : true},           // title của post
    address : {type : String, required : true},         // địa chỉ phòng
    day_submit : {type : Date, required : true},        // ngày đăng
    kind_of_room : {type : String, required : true},    // loại phòng (4 loại)
    room_price : {type : Number, required : true,
         min : 500000, max : 20000000},                 // giá phòng range from 500.000 => 20.000.000
    room_area : {type : String, required : true},       // diện tích phòng
    room_deposi : {type : Number, required : true},     // tiền đặt cọc
    electric_price : {type : Number, required : true,
         default : 0},                                  // giá điện
    water_price : {type : Number, required : true,
         default : 0},                                  // giá nước
    parking_price : {type : Number, required : true,
         default : 0},                                  // giá giữ xe
    wifi_price : {type : Number, required : true,
         default : 0},                                  // giá wifi
    gender : { type : Boolean, required : true},        // giới tính 
    description : { type : String, required : false},   // mô tả về phòng
    utilities : {                                       // các tiện ích 
        wc_rieng    : {type: Boolean, default : false},
        an_ninh     : {type: Boolean, default : false},
        chu_rieng   : {type: Boolean, default : false},
        tu_do       : {type: Boolean, default : false},
        cua_so      : {type: Boolean, default : false},
        chode_xe    : {type: Boolean, default : false},
        wifi        : {type: Boolean, default : false},
        may_lanh    : {type: Boolean, default : false},
        tu_lanh     : {type: Boolean, default : false},
        may_giat    : {type: Boolean, default : false},
        nha_bep     : {type: Boolean, default : false},
        thu_cung    : {type: Boolean, default : false}
    },
    is_approved : {type : Boolean , default : false},
    room_image : [{
         type : String,
         require : true
    }],
    userId : {
         type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref : 'User'
    }

});
//<--------------------- EXPORT USER SCHEMA --------------------->
module.exports = mongoose.model('Post', postSchema);