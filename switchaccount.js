async function switchAccount(username,password){
    let token="";{let cookie=document.cookie;cookie=cookie.split(';');let cok=[[],[]];cookie.forEach(function(element){const elements=element.split("=");cok[0].push(elements[0]);cok[1].push(elements[1]);});token=cok[1][cok[0].indexOf(' scratchcsrftoken')];}
    await fetch("https://scratch.mit.edu/accounts/logout/",{method:"POST","headers":{"x-csrftoken":token}});
    let a=await fetch("https://scratch.mit.edu/accounts/login/",{method:"POST",body:JSON.stringify({"username":username,"password":password,"useMessages":false}),"headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
    if(a.status==200){
        return true;
    }else{
        return false;
    }
    location.reload();
}
function getCookieValue(key) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('='); 
        if (cookiesArray[0].trim() == key.trim()) { 
            return cookiesArray[1];
        }
    }
    return '';
}

function accountList(){
	let list;
	if(getCookieValue("accountlist")==''){
  	list={accountList:[]}
  }else{
		list=JSON.parse(getCookieValue("accountlist"));
  }
	return list;
}
function addAccount(username,password){
	let list=accountList();
  list.accountList.push({username:username,password:password});
  document.cookie="accountlist="+JSON.stringify(list)+";path=/;"
  document.getElementById("switch_background").remove();
  createGUI();
  console.log("accountlist="+JSON.stringify(list)+";path=/;")
}
function createGUI(){
	let background=document.createElement("div");
  background.style="background-color:#2a2a2a;height:60%;width:50%;position:absolute;top:10px;left:10px;position:fixed;border-radius:5px;color:#ffffff;font-size:15px;overflow:scroll;z-index:2147483647";
  background.id="switch_background";
  document.body.appendChild(background);
  let closeButton=document.createElement("span");
  closeButton.innerHTML="x";
  closeButton.style="display:inline-block;position:absolute;top:10px;right:50%;user-select:none;padding-top:3px;padding-right:10px;cursor:pointer;position:fixed;";
  closeButton.onclick=function(){document.getElementById("switch_background").remove()}
  background.appendChild(closeButton);
  let list=accountList();
  for(let i=0;i<list.accountList.length;i++){
  	let oneAccount=document.createElement("div");
    oneAccount.innerHTML=list.accountList[i].username;
    oneAccount.class=list.accountList[i].password;
    oneAccount.style="padding:5px;margin-left:10px;border-bottom:solid 1px #424242;cursor:pointer;width:80%";
    oneAccount.onclick=async function(){switchAccount(this.innerHTML,this.class);location.reload()}
    background.appendChild(oneAccount);
  }
  let addButton=document.createElement("div");
  addButton.style="display:block;width:90%;margin:5%;margin-right:5%;margin-left:5px;text-align:center;cursor:pointer;font-weight:550;";
  addButton.innerHTML="アカウントを追加する";
  addButton.onclick=function(){let newUsername=prompt("ユーザー名を入力");let newPassword=prompt("パスワードを入力");addAccount(newUsername,newPassword)};
  background.appendChild(addButton);
}
createGUI()
