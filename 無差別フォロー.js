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
            let res = await fetch(`https://scratch.mit.edu/site-api/users/followers/${prom[index]}/add/?usernames=${followuser}`,{method: "PUT","headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
            if(res.status === 200) {
                console.log(prom[index]+"をフォローしたぞ("+index+"人目)、お礼ぐらい言えボケが");
            }else{
                console.log(prom[index]+"をフォローできなかったヨ！");
            }
            res = await fetch(`https://scratch.mit.edu/site-api/users/followers/${prom[index]}/remove/?usernames=${followuser}`,{method: "PUT","headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
            //フォローした人に星とハートを付ける        
            let _projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${prom[index]}/projects/?limit=1&offset=0`)).json();
            let _projectid=_projectdata[0]["id"];
            let _token="";{
                    let cookie=document.cookie;
                    cookie=cookie.split(';');
                    let cok=[[],[]];
                    cookie.forEach(function(element){
                        const elements=element.split("=");
                        cok[0].push(elements[0]);
                        cok[1].push(elements[1]);
                    });
                    _token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
                }
            let _sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;
            await fetch(`https://api.scratch.mit.edu/proxy/projects/${_projectid}/favorites/user/${followuser}`,{method: "POST",headers:{'X-CSRFToken': _token,"x-token":_sessiontoken,"x-requested-with": "XMLHttpRequest"},credentials: 'include'});
            let kaku=await fetch(`https://api.scratch.mit.edu/proxy/projects/${_projectid}/loves/user/${followuser}`,{method: "POST",headers:{'X-CSRFToken': _token,"x-token":_sessiontoken,"x-requested-with": "XMLHttpRequest"},credentials: 'include'});
            if(kaku.status===200){
                console.log(`${prom[index]}のプロジェクトに❤と⭐をつけたぞ(${_projectid})`);
            }else{
                console.log(`${prom[index]}のプロジェクトには❤と⭐をつけられなかったヨ！(${_projectid})${kaku.status},${`https://api.scratch.mit.edu/proxy/projects/${_projectid}/loves/user/${followuser}`}`);
            }

let data=await (await fetch("https://scratch.mit.edu/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json()
let count=await (await fetch(`https://api.scratch.mit.edu/users/${followuser}/messages/count`,{headers:{"x-token":data["user"]["token"]}})).json();
let messages=await (await fetch(`https://api.scratch.mit.edu/users/${followuser}/messages/?limit=${count["count"]}&offset=0`,{headers:{"x-token":data["user"]["token"]}})).json();
let sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;

for(let i=0;i<messages.length;i++){
    if(messages[i]["type"]=="favoriteproject"){
        let username=messages[i]["actor_username"];
        let projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${username}/projects/?limit=1&offset=0`)).json();
        let projectid=projectdata[0]["id"];
        let favorite=await fetch(`https://api.scratch.mit.edu/proxy/projects/${projectid}/favorites/user/${followuser}`,{
        method: "POST",
        headers:{
            'X-CSRFToken': token,
            "x-token":sessiontoken,
            "x-requested-with": "XMLHttpRequest"
        },
        credentials: 'include'
        });
        if(favorite.status==200){
            console.log(`${username}さんに⭐を返しました。`);
        }else{
            console.log(`${username}さんに⭐を返せなかったヨ！`);
        }

    }
    if(messages[i]["type"]=="loveproject"){
        let username=messages[i]["actor_username"];
        let projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${username}/projects/?limit=1&offset=0`)).json();
        let projectid=projectdata[0]["id"];
        let love=await fetch(`https://api.scratch.mit.edu/proxy/projects/${projectid}/loves/user/${followuser}`,{
        method: "POST",
        headers:{
            'X-CSRFToken': token,
            "x-token":sessiontoken,
            "x-requested-with": "XMLHttpRequest"
        },
        credentials: 'include'
        });
        if(love.status==200){
            console.log(`${username}さんに❤を返しました。`);
        }else{
            console.log(`${username}さんに❤を返せなかったヨ！`);
        }
    }
    if(messages[i]["type"]=="followuser"){
        let username=messages[i]["actor_username"];
        console.log(`🙆${username}さんにフォローされました！`)
    }
}
            }
            else{
                console.log(`今は${dat["user"]["username"]}でログインしているからフォローできないよ。`);
            };}
            let prom=reader.result.split("\n");
            let setint=setInterval(follow,30000);
            console.log("30秒後に開始します...")
            let i=prompt("何人目から始めますか?");
            function follow(){
                flw(i)
                i++;
                if(i>prom.length){
                    clearInterval(setint);
                }
            }
};
    }
});
input.click();
