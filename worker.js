function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
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
onmessage=async (e)=>{
    let start = Date.now();
    
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const key = await crypto.subtle.generateKey(
            {
                name:"AES-GCM",
                length: 256
            },
            true,
            ["encrypt","decrypt"]
        )
        const cipherTxt = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            e.data
            
        ).then(
            // e=>{ 
            //     postMessage({
            //         "text": _arrayBufferToBase64(e),
            //         "iv":iv,
            //         "key":key,
            //         "arrayBuff": e
                        
            //     })
                
            // }
             res=>{
                // const blob = new Blob([res],{type:"aplication/octet-stream"})
                const dataToSend = {
                    text: res,
                    iv: iv,
                    key: key,
                    arrayBuff: res
                }
                postMessage(dataToSend,[dataToSend.text])
        //         let end = Date.now();
        //         console.log(`Trajanje enkripcije sa workera je ${(end - start)/1000}` )
        //         let j = 0;
        //         let finalBinary, binary1, binary2 = '';
        //         let bytes = new Uint8Array(res);
        //         let len = bytes.byteLength;
        //         const worker1 = new Worker("subworker.js")
        //         worker1.postMessage({
        //             "byteLength": len,
        //             "bytes": bytes,
        //             "indexStart": 0,
        //             "indexEnd": Math.trunc(len/2)
        //         })
        //          worker1.onmessage = (e)=>{
                    
        //             binary1 = e.data;
        //             finalBinary = binary1 + binary2
        //             // console.log("worker1 binary1=",binary1)
        //             if(j == 1){
                        
        //                 postMessage({
        //                     "text":finalBinary,
        //                     "iv":iv,
        //                     "key":key,
        //                     "arrayBuff": res
                
        //                 })
                        
        // let end = Date.now();
        // console.log(`Trajanje enkripcije sa workera je ${(end - start)/1000}` )
        //             }else {
        //                 j = 1
        //             }
        //         }
        //         const worker2 = new Worker("subworker.js")
        //         worker2.postMessage({
        //             "byteLength": len,
        //             "bytes": bytes,
        //             "indexStart":Math.trunc(len/2),
        //             "indexEnd": len
        //         })
        //         worker2.onmessage = (e)=>{
                    
        //             binary2 = e.data;
        //             finalBinary = binary1 + binary2
        //             // console.log("worker2 binary2",binary2)
        //             if(j == 1){
                        
        // let end = Date.now();
        // console.log(`Trajanje enkripcije sa workera je ${(end - start)/1000}` )
        //                 postMessage({
        //                     "text":finalBinary,
        //                     "iv":iv,
        //                     "key":key,
        //                     "arrayBuff": res
                
        //                 })
        //             }else{
        //                 j = 1
        //             }
                   
        //         }
                
            }
        )
        
        // sendMessage = _arrayBufferToBase64(cipherTxt)
        
        
        // postMessage(sendMessage)
        
        // postMessage(cipherTxt)
        async function bytesToBase64DataUrl(bytes, type = "application/octet-stream") {
            return await new Promise((resolve, reject) => {
            const reader = Object.assign(new FileReader(), {
                onload: () => resolve(reader.result),
                onerror: () => reject(reader.error),
            });
            reader.readAsDataURL(new File([bytes], "", { type }));
            });
        }
        //  await bytesToBase64DataUrl(new Uint8Array(cipherTxt)).then(e=>postMessage(e));

        // console.log("broj niti threads: ",navigator.hardwareConcurrency)
        
       

      
    
    

}
   