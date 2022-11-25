async function a(){
    let token="";
    {
        let cookie=document.cookie;
        cookie=cookie.split(';');
        let cok=[[],[]];
        cookie.forEach(function(element){
            const elements=element.split("=");
            cok[0].push(elements[0]);
            cok[1].push(elements[1]);
        });
        token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
    }
let a=await fetch(`https://scratch.mit.edu/site-api/messages/messages-clear/`,{
  method: "POST",
  headers: {
    'X-CSRFToken': token,
    "x-requested-with": "XMLHttpRequest"
  }
});
console.log(a.status);
}
a()
