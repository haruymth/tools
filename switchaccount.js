{
	async function switchAccount(username,password){
	    let token="";{let cookie=document.cookie;cookie=cookie.split(';');let cok=[[],[]];cookie.forEach(function(element){const elements=element.split("=");cok[0].push(elements[0]);cok[1].push(elements[1]);});token=cok[1][cok[0].indexOf(' scratchcsrftoken')];}
	    await fetch("https://scratch.mit.edu/accounts/logout/",{method:"POST","headers":{"x-csrftoken":token}});
	    let a=await fetch("https://scratch.mit.edu/accounts/login/",{method:"POST",body:JSON.stringify({"username":username,"password":password,"useMessages":false}),"headers":{"x-csrftoken":token,"x-requested-with": "XMLHttpRequest"}});
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
		let images=await (await fetch("//api.scratch.mit.edu/users/"+username)).json()
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
	function createGUI(){
		let background=document.createElement("div");
	  	background.style="background-color:#2a2a2a;height:400px;width:300px;position:absolute;top:10px;left:10px;position:fixed;border-radius:5px;color:#ffffff;font-size:15px;overflow:scroll;z-index:2147483646";
	  	background.id="switch_background";
		document.body.appendChild(background);
		let closeButton=document.createElement("span");
		closeButton.innerHTML="x";
		closeButton.style="color:#ffffff;display:inline-block;position:absolute;top:10px;left:306px;user-select:none;padding:10px;padding-top:5px;padding-bottom:5px;cursor:pointer;position:fixed;z-index:2147483647;background-color:#2a2a2a;border-radius:20%;";
		closeButton.onclick=function(){
			document.getElementById("switch_background").remove()
		}
		background.appendChild(closeButton);
		let list=accountList();
		for(let i=0;i<list.accountList.length;i++){
			let oneAccount=document.createElement("div");
			oneAccount.innerHTML=list.accountList[i].username;
			oneAccount.classList.add("switch_oneaccount");
			oneAccount.dataset.password=list.accountList[i].password;
			oneAccount.style="display:inline-block;padding:5px;margin-left:10px;border-bottom:solid 1px #424242;cursor:pointer;width:80%;vertical-align:middle;";
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
					delAccount(elements.indexOf(this.previousElementSibling));
				}
			};
			oneAccount.after(deleteButton);

			let icon=document.createElement("img");
			icon.height="25";
			icon.width="25";
			icon.src="https://uploads.scratch.mit.edu/get_image/user/"+list.accountList[i].icon+"_32x32.png";
			icon.style="vertical-align:middle;margin:2px;"
			oneAccount.insertBefore(icon,oneAccount.firstChild);
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
	createGUI()
}
