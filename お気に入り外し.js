var input=document.createElement("input");
input.type="file";
input.style.display="none";
document.body.appendChild(input);
var reader = new FileReader();
input.addEventListener('change', () => {
    for(file of input.files){
        reader.readAsText(file, 'UTF-8');
        reader.onload = ()=> {
            let followuser = prompt("ユーザー名は何で行きますか？").toLowerCase();
            let password=prompt("ログインのためのパスワードを入力");
            const flw = async (index) => {
            let dat=await (await fetch("https://scratch.mit.edu/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json();
            if(dat["user"]["username"].toLowerCase()==followuser){
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
            let sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;
            let res=await fetch(`https://api.scratch.mit.edu/proxy/projects/${prom[i]}/favorites/user/${followuser}`,{method: "DELETE",headers:{'X-CSRFToken': token,"x-token":sessiontoken,"x-requested-with": "XMLHttpRequest"},credentials: 'include'});
            if(res.status==200){
                console.log(`プロジェクト(id:${prom[i]})の⭐を外したぞ`);
            }else{
                console.log(`プロジェクト(id:${prom[i]})の⭐が外せなかったぞ(${res.status})`);
            }
        
        }else{
                console.log(`今は${dat["user"]["username"]}でログインしているから⭐を外せないよ。`);
            };}
            let prom=reader.result.split("\n");
            let setint=setInterval(follow,100);
            let i=prompt("何個目から外しますか?");
            let limit=prompt("最後から何個目まで外しますか？");
            function follow(){
                flw(i)
                i++;
                if(i>prom.length-limit){
                    clearInterval(setint);
                }
            }
};
    }
});
input.click();
