{
    async function jumpToTurbowarp(){
        let projectid=location.href.replace(/[^0-9]/g,"");
        if(!(projectid&&location.hostname=="scratch.mit.edu")){
            alert("Please click on Scratch projects");
            return
        }
        let res=(await (await fetch("/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json()).user.token;
        let hoge=await (await fetch(`https://api.scratch.mit.edu/projects/${projectid}/`,{headers:{"x-token":res}})).json();
        projecttoken=hoge.project_token
        let ele=document.createElement("a");
        ele.href="https://turbowarp.org/"+projectid+"?token="+projecttoken;
        ele.target="_blank";
        document.body.appendChild(ele);
        ele.click();
    }
    jumpToTurbowarp();
}
