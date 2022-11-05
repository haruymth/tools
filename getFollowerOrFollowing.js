async function func(){
    const followerCount=document.getElementsByClassName("box-head")[0].innerText.replace(/[^0-9]/g, '');
    const username=document.getElementsByClassName("box-head")[0].getElementsByTagName("a")[1].innerText;
    let userList=[];
    console.log(followerCount);
    console.log(username);
    for(let page=0;page<followerCount;page+=60){
        var res = await (await fetch(`${location.href}?page=${Math.ceil(page/60)}`)).text();
        console.log(1)
        var box=document.createElement("div");
        box.innerHTML=res;
        document.body.appendChild(box);
        var box2=document.getElementsByClassName("user thumb item");
        for(let i=60;i<box2.length;i++){
            userList.push(box2[i].innerHTML.split("/")[2]);
        }
        box2.remove();
        console.log(page)
    }
}
func();
