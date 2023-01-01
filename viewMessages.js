(async()=>{
    async function fetchMessages(){
        let session=await(await fetch("/session/",{headers:{"X-Requested-With":"XMLHttpRequest"}})).json();
        let urname=session.user.username;
        let xtoken=session.user.token;
        let messageCount=(await (await fetch(`//api.scratch.mit.edu/users/${urname}/messages/count`)).json()).count;
        let offset=0;
        let messages=[];
        console.log(urname);
        while(messageCount>=offset){
            let messagesArray=await (await fetch(`https://api.scratch.mit.edu/users/${urname}/messages?limit=40&offset=${offset}`,{headers:{"x-token":xtoken,"X-Requested-With":"XMLHttpRequest"}})).json();
            messagesArray.forEach(function(value){
                messages.push(value);
            });
            offset+=40;
        }
        return messages.slice(0,messageCount);
    }
})();
