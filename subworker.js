function w1 (){
    onmessage = (d)=>{
        console.log("subworker je poceo: "+d.data.indexStart)
        console.log("salje glavni worker",d.data)
        let binary = "";
        for (let i = d.data.indexStart; i < d.data.indexEnd; i++) {
            binary += String.fromCharCode(d.data.bytes[ i ])
        }
       
        console.log("subworker je zavrsio: "+d.data.indexStart)
        postMessage(binary);
    }
}
w1();
