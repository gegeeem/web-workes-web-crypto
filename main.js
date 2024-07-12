function _arrayBufferToBase64( buffer ) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}
function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
let start, end;
const getElem =  document.querySelector("#fileUpload");
function handleFile(){
    const myWorker = new Worker("worker.js");
   
    const reader7  = new FileReader();
    reader7.readAsArrayBuffer(getElem.files[0])
    reader7.onloadend = ()=>{
        myWorker.postMessage(reader7.result, [reader7.result])
    }
     start = Date.now();
    // myWorker.postMessage(getElem.files[0])
//     let reader1 = new FileReader();
//     let blob = new Blob([getElem.files[0]], {type: getElem.files[0].type});
//     reader1.readAsDataURL(blob);
//     reader1.onloadend =()=>{
//         let link = document.createElement('a');
//                 link.download = "novi.pdf";
//                 link.href = URL.createObjectURL(blob);
//                     link.click();
//                     URL.revokeObjectURL(link.href);

//     }
//     let reader2 = new FileReader();
//    blob.text().then(res=>{console.log("blob.text:   ",res)})

    
myWorker.onmessage = (e)=>{
    console.log("salje worker:", e.data);
    end = Date.now();
    console.log(`Execution time: ${(end - start)/1000} s`);
    const getLinkToDownload = document.querySelector("#linkZaPreuyimanje")
    // getLinkToDownload.href ="data:text/plain;base64,"+e.data
    // getLinkToDownload.src ="data:text/plain;base64,"+e.data;
    // getLinkToDownload.href = e.data
    getLinkToDownload.download = "workerEnkriptovani"
    let blob =new Blob([e.data.text],{type:"application/octet-stream"})
    getLinkToDownload.href = URL.createObjectURL(blob)
    getLinkToDownload.click();
    URL.revokeObjectURL(getLinkToDownload.href)
    getLinkToDownload.remove();
  const reader3 = new FileReader();
  reader3.readAsArrayBuffer(blob);
  let arrayForDec;
  reader3.onloadend = ()=>{
    arrayForDec = reader3.result;
    window.crypto.subtle.decrypt(
        {
        name:"AES-GCM",
        iv: e.data.iv,
        },
        e.data.key,
        arrayForDec
        

    ).then(res=>{
                    let link = document.createElement('a');
                    link.download = "biceBolje";
                    let blob= new Blob([res],{type:`${getElem.files[0].type}`})
                    let reader = new FileReader();
                    reader.readAsDataURL(blob)
                    reader.onloadend = ()=>{
                        link.href = URL.createObjectURL(blob);
                        link.click();
                        URL.revokeObjectURL(link.href);
                    }
                    
                }
            )
    .catch(err=>{console.log(err)})
  }
   
    }
}

getElem.addEventListener("change",handleFile)
