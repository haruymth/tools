let num=Number(prompt("上から何個目のコメント？"));
let username=prompt("誰が言っているふうにする？");
let content=prompt("言わせる言葉は？")
let time=prompt("日時は？(○時間 前とか)");
console.log("アバター取得中...")
fetch("https://api.scratch.mit.edu/users/"+username).then(response=>response.json()).then(data=>{
    document.getElementsByClassName("avatar")[num+1].src=`https://uploads.scratch.mit.edu/get_image/user/${data.id}_60x60.png`;
    document.getElementsByClassName("name")[num-1].innerText=username;
    document.getElementsByClassName("content")[num-1].innerHTML=content;
    document.getElementsByClassName("time")[num+5].innerHTML=time;
})
