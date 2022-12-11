async function func(){
    const getuser=document.getElementsByClassName("box-head")[0];
    const urname=getuser.getElementsByTagName("a")[1];
    const username=urname.innerText;
    urname.style.display="none";
    const data=getuser.innerText;
    const projectCount=data.replace(/[^0-9]/g, '');
    urname.removeAttribute("style");
    console.log(username);
    console.log(projectCount);
    
    let projectList="";
    document.getElementsByClassName("media-grid")[0].innerHTML="";
    var src=document.createElement("script");src.src="https://haruymth.github.io/scripts/codes/token.js";document.body.appendChild(src);
    for(let page=0;page<projectCount;page+=60){
        var res = await (await fetch(`${location.href}?page=${Math.ceil(page/60)+1}`)).text();
        var box=document.createElement("div");
        box.innerHTML=res;
        document.body.appendChild(box);
        var box2=document.getElementsByClassName("project thumb item");
        for(let i=0;i<box2.length;i++){
            projectList+=box2[i].innerHTML.split("/")[2]+"\n";
        }
        box.remove();
        console.log(`Loading... (${page}/${projectCount})`)
    }
    console.log(`Loading... (${projectCount}/${projectCount})`)
    const link=new Blob([projectList],{type:"text/plain"});
    const url = URL.createObjectURL(link);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = username+"'s favorite projects.txt";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
func();
/*getFollowerOrFollowingの使いまわしだなんて口が裂けても言えないッ..!*/
