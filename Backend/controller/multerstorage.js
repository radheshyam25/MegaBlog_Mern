const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"files/")
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    },
  })

const uploadStorage=multer({storage:storage})

  module.exports=uploadStorage;