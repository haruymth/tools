
(async () => {
try {
    let userList = prompt("ユーザーを改行で分けて入力").split("\n");
    userList.forEach(function (value, index) {
    userList[index] = value.trim();
    })
    let username = [];
    let count = 0;
    let password = prompt("パスワードは？(全員)");
    let category = "13";
    let projectId = location.href.replace(/[^0-9]/g, "");
    for (let i = count; i < userList.length; i++) {
    function getCookieArray() {
        var arr = new Array();
        if (document.cookie != '') {
        var tmp = document.cookie.split('; ');
        for (var i = 0; i < tmp.length; i++) {
            var data = tmp[i].split('=');
            arr[data[0]] = decodeURIComponent(data[1]);
        }
        }
        var memo = arr;
        var token = memo['scratchcsrftoken'];
        return token
    }
    let token = getCookieArray();
    
    await fetch("https://scratch.mit.edu/accounts/logout/", { method: "POST", "headers": { "x-csrftoken": token } });
    let a = await fetch("https://scratch.mit.edu/accounts/login/", {
        method: "POST",
        body: JSON.stringify({
        "username": userList[i],
        "password": password,
        "useMessages": false
        }),
        "headers": {
        "x-csrftoken": token,
        "x-requested-with": "XMLHttpRequest"
        }
    });
    let trend=await (await fetch("https://api.scratch.mit.edu/explore/projects?limit=3&offset=0&language=ja&mode=trending&q=*")).json();
    for(let j=0;j<3;j++){
        let xtoken = (await (await fetch("/session/", { headers: { "X-Requested-With": "XMLHttpRequest" } })).json()).user.token;
        token = getCookieArray();
        let makeproject = await fetch(`https://projects.scratch.mit.edu`, {
            method: "POST",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify({"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["変数",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"背景1","dataFormat":"svg","assetId":"cd21514d0531fdffb22204e0ec5ed84a","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[{"name":"ポップ","assetId":"83a9787d4cb6f3b7632b4ddfebf74367","dataFormat":"wav","format":"","rate":48000,"sampleCount":1123,"md5ext":"83a9787d4cb6f3b7632b4ddfebf74367.wav"}],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"スプライト1","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"コスチューム1","bitmapResolution":1,"dataFormat":"svg","assetId":"017b3be004d334b13b2d18e0df70ec7a","md5ext":"017b3be004d334b13b2d18e0df70ec7a.svg","rotationCenterX":96.27265286574638,"rotationCenterY":-15.392285266467525}],"sounds":[{"name":"ニャー","assetId":"83c36d806dc92327b9e7049a565c6bff","dataFormat":"wav","format":"","rate":48000,"sampleCount":40681,"md5ext":"83c36d806dc92327b9e7049a565c6bff.wav"}],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"1.3.14","agent":"Mozilla/5.0 (X11; CrOS x86_64 15183.78.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}}),
            credentials:"include"
        });
        if (makeproject.status == 200) {
            console.log(`${userList[i]}のプロジェクトを作成したよ${i + 1}人目`);
        } else {
            console.error(`${userList[i]}のプロジェクトを作成できなかったよ${i + 1}人目`);
        }
        let projectID=(await makeproject.json())["content-name"];
        console.log("a")
        let shareProject=await fetch(`https://api.scratch.mit.edu/proxy/projects/${projectID}/share`,{
            method:"PUT",
            headers:{
                "x-csrftoken":token,
                "x-token":xtoken,
                "x-requested-with": "XMLHttpRequest",
                "content-type":"application/json"
            },
            body : JSON.stringify({is_published:"true"}),
            credentials:"include"
        });
        console.log("a")
        console.log(shareProject.status)
        if (shareProject.status == 200) {
            console.log(`${userList[i]}のプロジェクトを共有したよ${i + 1}人目`)
        } else {
            console.error(`${userList[i]}のプロジェクトを共有できなかったよ${i + 1}人目`)
        }
        let love=await fetch(`https://api.scratch.mit.edu/proxy/projects/${trend[j].id}/loves/user/${userList[i]}`,{
            method:"POST",
            headers:{
                "x-csrftoken":token,
                "x-token":xtoken,
                "x-requested-with": "XMLHttpRequest"
            },
            credentials:"include"
        });
        if (love.status == 200) {
            console.log(`${userList[i]}でなんかのプロジェクトに♡をつけたよ${i + 1}人目`);
        } else {
            console.error(`${userList[i]}でなんかのプロジェクトに♡をつけれなかったよ${i + 1}人目`);
        }
        let favorite=await fetch(`https://api.scratch.mit.edu/proxy/projects/${trend[j].id}/favorites/user/${userList[i]}`,{
            method:"POST",
            headers:{
                "x-csrftoken":token,
                "x-token":xtoken,
                "x-requested-with": "XMLHttpRequest"
            },
            credentials:"include"
        });
        if (favorite.status == 200) {
            console.log(`${userList[i]}でなんかのプロジェクトに☆をつけたよ${i + 1}人目`);
        } else {
            console.error(`${userList[i]}でなんかのプロジェクトに☆をつけれなかったよ${i + 1}人目`);
        }
        let comment=await fetch(`https://api.scratch.mit.edu/proxy/comments/project/${projectID}`,{
            method:"POST",
            headers:{
                "x-csrftoken":token,
                "x-token":xtoken
            },
            body:JSON.stringify({
                content:"I think this project is so amazing! I'll follow you!"+"!".repeat(Math.floor(Math.random()*100)),
                parent_id:"",
                commentee_id:""
            })
        });
        if (comment.status == 200) {
            console.log(`${userList[i]}でなんかのプロジェクトにコメントしたよ${i + 1}人目`);
        } else {
            console.error(`${userList[i]}でなんかのプロジェクトにコメントできなかったよ${i + 1}人目`);
        }
        let follow=await fetch(`https://scratch.mit.edu/site-api/users/followers/${trend[j].author.username}/add/?usernames=${userList[i]}`,{
            method:"POST",
            headers:{
                "x-csrftoken":token,
                "x-requested-with": "XMLHttpRequest"
            },
            credentials:"include"
        });
        if (follow.status == 200) {
            console.log(`${userList[i]}でなんか適当に人フォローしたよ${i + 1}人目`);
        } else {
            console.error(`${userList[i]}でなんか適当に人フォローできなかったよ${i + 1}人目`);
        }
    }
    }
    var sound = new Audio('https://soundeffect-lab.info/sound/anime/mp3/shakin1.mp3');
    sound.play();
    console.log("全員分変え終わったぞ")
} catch (e) {
    console.error(e);
}
})();
window.addEventListener('error', (event) => {
    console.log(event.path)
});