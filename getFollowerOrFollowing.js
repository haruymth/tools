async function func(){
    const followerCount=document.getElementsByClassName("box-head")[0].innerText.replace(/[^0-9]/g, '');
    const username=document.getElementsByClassName("box-head")[0].getElementsByTagName("a")[1].innerText;
    let userList="";
    console.log(followerCount);
    console.log(username);
    document.getElementsByClassName("media-grid")[0].innerHTML="";
    for(let page=0;page<followerCount;page+=60){
        var res = await (await fetch(`${location.href}?page=${Math.ceil(page/60)+1}`)).text();
        var box=document.createElement("div");
        box.innerHTML=res;
        document.body.appendChild(box);
        var box2=document.getElementsByClassName("user thumb item");
        for(let i=0;i<box2.length;i++){
            userList+=box2[i].innerHTML.split("/")[2]+"\n";
        }
        box.remove();
        console.log(`Loading... (${page}/${followerCount})`)
    }
    console.log(`Loading... (${followerCount}/${followerCount})`)
    const link=new Blob([userList],{type:"text/plain"});
    const url = URL.createObjectURL(link);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = username+"'s.txt";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
func();
