import { supportMimes } from "../config/filesystem.js";
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

function errorFomatter(error) {
  let errors;
  errors = error.issues.reduce((acc, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
  return errors

}


function bytesToMb(bytes) {
  return bytes / (1024 * 1024)
}

function imagevaliditor(size, mime) {
  if (bytesToMb(size) > 2) {
    console.log(bytesToMb(size), size)
    return "Image size must be less than 2 MB"
  }

  else if (!supportMimes.includes(mime)) {
    return "Image must be type of png, jpg,jpeg ,svg,webp, gif"
  }

  return null

}

function generateUniqueid() {
  return uuidv4()
}

function getImageUrl (imageName) {
  console.log()
  return `${process.env.APP_URL}/images/${imageName}`
}

function removeImage(imageName){
  const path = process.cwd()+"/public/images/"+imageName
  if(fs.existsSync(path)){
    fs.unlinkSync(path)
  }
  console.log("image removed susscessfully")
  return
}

function uploadImage(image){
  const imgExt = image?.name.split(".")
  const imageName = generateUniqueid() + "." + imgExt[1]
  const uploadPath = process.cwd() + "/public/images/" + imageName
  image.mv(uploadPath, (err) => {
      if (err) throw err
  })
  return imageName
}

export { errorFomatter, imagevaliditor, generateUniqueid ,getImageUrl,removeImage,uploadImage}