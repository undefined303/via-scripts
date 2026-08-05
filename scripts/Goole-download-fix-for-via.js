// ==UserScript==
// @name         Goole download fix for via
// @namespace    https://viayoo.com/
// @version      2.2
// @description  Fix the bug that files can't be downloaded in sites such as fonts.google.com，contacts.google.com，translate.google.com in via browser.
// @author       undefined303
// @run-at       document-start
// @match        https://*.google.com/*
// @grant        GM_download
// @license MIT
// ==/UserScript==
(function(){
var downloadObj={};
var downloadTimeout;
function download(fileName,fileData){
GM_download({url:fileData,name:fileName})
downloadObj={};
}
function downloadAddData(obj){
if(obj.type=="fileName"){
downloadObj.fileName=obj.data;
try{clearTimeout(downloadTimeout);}catch(e){}
downloadObj.fileData?download(downloadObj.fileName,downloadObj.fileData):null;
}
if(obj.type=="fileData"){
downloadObj.fileData=obj.data;
if(downloadObj.fileName){
downloadObj.fileData?download(downloadObj.fileName,downloadObj.fileData):null;
}else{
downloadTimeout=setTimeout(function(){
downloadObj.fileData?download("",downloadObj.fileData):null;
},100)
}
}
}
 
window.addEventListener("message",(event)=>{
console.log(event.data)
downloadAddData(event.data)
})
})();
var nativeDCE1=document.createElement;
document.createElement=function(...arg){
var element=nativeDCE1.call(document,...arg);
if(arg[0].toLowerCase()=="iframe"){
setTimeout(
function(){
if(element.srcdoc){
/<script (.*?)>/.test(element.srcdoc);
var t=RegExp.$1+"";
var result1=element.srcdoc.replace(/<script (.*?)>/,`<script `+t+`>
function blobToDataURI(blob, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
    callback(e.target.result);
  };
}
var nativeCOU=URL.createObjectURL;
URL.createObjectURL=function(...args){
blobToDataURI(args[0],(e)=>{
window.parent.postMessage({type:"fileData",data:e},"*")
});
return nativeCOU.call(URL,...args);
};
 
var nativeDCE1=document.createElement;
document.createElement=function(...arg){
var element=nativeDCE1.call(document,...arg)
if(arg[0].toLowerCase()=="a"){
element.addEventListener("click",()=>{
  element.download?window.parent.postMessage({type:"fileName",data:element.download},"*"):null;
return false;
})
}
  return element
}
 
window.addEventListener("load",function(){
[...document.getElementsByTagName("a")].forEach((e)=>{
e.addEventListener("click",()=>{
  e.download?window.parent.postMessage({type:"fileName",data:e.download},"*"):null;
return false;
})
})
})
 
`);
var policy1=trustedTypes.createPolicy("policy1",{createHTML:(str)=>str});
element.srcdoc=policy1.createHTML(result1);
}
},0);
}
  return element;
}
