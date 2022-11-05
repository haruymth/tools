var input=document.createElement("input");
input.type="file";
input.style.display="none";
document.body.appendChild(input);
var reader = new FileReader();
input.addEventListener('change', () => {
    for(file of input.files){
        reader.readAsText(file, 'UTF-8');
        reader.onload = ()=> {
            let followuser = prompt("ユーザー名は何で行きますか？");
            const flw = async (index) => {
            let dat=await (await fetch("https://scratch.mit.edu/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json();
            if(dat["user"]["username"]==followuser){
            var token="";
            {
                var cookie=document.cookie;
                cookie=cookie.split(';');
                var cok=[[],[]];
                cookie.forEach(function(element){
                    const elements=element.split("=");
                    cok[0].push(elements[0]);
                    cok[1].push(elements[1]);
                });
                token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
            }
            var res = await fetch(`https://scratch.mit.edu/site-api/users/followers/${prom[index]}/add/?usernames=${followuser}`,{method: "PUT","headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
            if(res.status === 200) {
                console.log(prom[index]+"をフォローしたぞ("+index+"人目)、お礼ぐらい言えボケが");
            }else{
                console.log(prom[index]+"をフォローできなかったヨ！");
            }
            var res = await fetch(`https://scratch.mit.edu/site-api/users/followers/${prom[index]}/remove/?usernames=${followuser}`,{method: "PUT","headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
            //フォローした人に星とハートを付ける        
            var _projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${prom[index]}/projects/?limit=1&offset=0`)).json();
            var _projectid=_projectdata[0]["id"];
            var _token="";{
                    var cookie=document.cookie;
                    cookie=cookie.split(';');
                    var cok=[[],[]];
                    cookie.forEach(function(element){
                        const elements=element.split("=");
                        cok[0].push(elements[0]);
                        cok[1].push(elements[1]);
                    });
                    _token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
                }
            var _sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;
            await fetch(`https://api.scratch.mit.edu/proxy/projects/${_projectid}/favorites/user/${followuser}`,{method: "POST",headers:{'X-CSRFToken': _token,"x-token":_sessiontoken,"x-requested-with": "XMLHttpRequest"},credentials: 'include'});
            let kaku=await fetch(`https://api.scratch.mit.edu/proxy/projects/${_projectid}/loves/user/${followuser}`,{method: "POST",headers:{'X-CSRFToken': _token,"x-token":_sessiontoken,"x-requested-with": "XMLHttpRequest"},credentials: 'include'});
            if(kaku.status===200){
                console.log(`${prom[index]}のプロジェクトに❤と★をつけたぞ(${_projectid})`);
            }else{
                console.log(`${prom[index]}のプロジェクトには❤と★をつけられなかったヨ！(${_projectid})${kaku.status},${`https://api.scratch.mit.edu/proxy/projects/${_projectid}/loves/user/${followuser}`}`);
            }
                
var data=await (await fetch("https://scratch.mit.edu/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json()
var count=await (await fetch(`https://api.scratch.mit.edu/users/${followuser}/messages/count`,{headers:{"x-token":data["user"]["token"]}})).json();
var messages=await (await fetch(`https://api.scratch.mit.edu/users/${followuser}/messages/?limit=${count["count"]}&offset=0`,{headers:{"x-token":data["user"]["token"]}})).json();

for(var i=0;i<messages.length;i++){
    if(messages[i]["type"]=="favoriteproject"){
        var username=messages[i]["actor_username"];
        var projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${username}/projects/?limit=1&offset=0`)).json();
        var projectid=projectdata[0]["id"];
        var token="";{
                var cookie=document.cookie;
                cookie=cookie.split(';');
                var cok=[[],[]];
                cookie.forEach(function(element){
                    const elements=element.split("=");
                    cok[0].push(elements[0]);
                    cok[1].push(elements[1]);
                });
                token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
            }
        var sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;
        var user = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.username;
        fetch(`https://api.scratch.mit.edu/proxy/projects/${projectid}/favorites/user/${followuser}`,{
        method: "POST",
        headers:{
            'X-CSRFToken': token,
            "x-token":sessiontoken,
            "x-requested-with": "XMLHttpRequest"
        },
        credentials: 'include'
        });
        console.log(`${username}さんに★を返しました。`);

    }
    if(messages[i]["type"]=="loveproject"){
        var username=messages[i]["actor_username"];
        var projectdata=await (await fetch(`https://api.scratch.mit.edu/users/${username}/projects/?limit=1&offset=0`)).json();
        var projectid=projectdata[0]["id"];
        var token="";{
                var cookie=document.cookie;
                cookie=cookie.split(';');
                var cok=[[],[]];
                cookie.forEach(function(element){
                    const elements=element.split("=");
                    cok[0].push(elements[0]);
                    cok[1].push(elements[1]);
                });
                token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
            }
        var sessiontoken = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.token;
        var user = (await(await fetch("https://scratch.mit.edu/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json()).user.username;
        fetch(`https://api.scratch.mit.edu/proxy/projects/${projectid}/loves/user/${followuser}`,{
        method: "POST",
        headers:{
            'X-CSRFToken': token,
            "x-token":sessiontoken,
            "x-requested-with": "XMLHttpRequest"
        },
        credentials: 'include'
        });
        
        console.log(`${username}さんに❤を返しました。`);
    }
    if(messages[i]["type"]=="followuser"){
        var username=messages[i]["actor_username"];
        console.log(`🙆${username}さんにフォローされました！`)
    }
}
fetch(`https://scratch.mit.edu/site-api/messages/messages-clear/`,{
        method: "POST",
        headers:{
            'X-CSRFToken': token,
            "x-token":sessiontoken,
            "x-requested-with": "XMLHttpRequest"
        }
        });
            }
            else{
                console.log(`今は${dat["user"]["username"]}でログインしているからフォローできないよ。`);
            };}
            var prom=reader.result.split("\n");
            var setint=setInterval(follow,30000);
            console.log("30秒後に開始します...")
            var i=prompt("何人目から始めますか?");
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
