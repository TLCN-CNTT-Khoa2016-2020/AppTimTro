const sharp = require("sharp");

module.exports = async(req, res, next) => {
    //console.log(req.files)
    if (!req.files) return next();

    req.body.images = [];
    try {
        await Promise.all(
            req.files.map(async file => {
              const filename = file.originalname.replace(/\..+$/, "");
              const newFilename = `apptimtro-${filename}-${Date.now()}.jpeg`;
        
              await sharp(file.buffer)
                .resize(500, 500)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`./uploads/${newFilename}`);
              //console.log(newFilename)
              req.body.images.push(newFilename);
            })
          );
          next();
    } catch (error) {
        console.log(error)
    }
    
  
    
}