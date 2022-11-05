async function func(){
    const getuser=document.getElementsByClassName("box-head")[0];
    const urname=getuser.getElementsByTagName("a")[1];
    const username=urname.innerText;
    urname.style.display="none";
    const data=getuser.innerText;
    const followerCount=data.replace(/[^0-9]/g, '');
    urname.removeAttribute("style");
    console.log(urname);
    console.log(followerCount);
    
    let userList="";
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
//一部参考：Xx_Freezer_xX
