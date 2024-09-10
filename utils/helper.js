import { supportMimes } from "../config/filesystem.js";
import {v4 as uuidv4} from "uuid"

function errorFomatter(error) {
  let errors;
  errors = error.issues.reduce((acc, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
  return errors

}


function bytesToMb(bytes) {
  return bytes / 1024
}

function imagevaliditor(size, mime) {
  if (bytesToMb(size) > 2) {
    return "Image size must be less than 2 MB"
  }

  else if(!supportMimes.includes(mime)){
    return "Image must be type of png, jpg,jpeg ,svg,webp, gif"
  }

  return null

}

function  generateUniqueid(){
  return uuidv4()
}

export { errorFomatter, imagevaliditor ,generateUniqueid}