{var devtool=document.createElement("code");
devtool.style="background-color:#f0f1f2;display:block;height:calc(100% - 34px);width:29.65%;position:absolute;z-index:9999999;top:0px;right:0px;position:fixed;border-left:solid 2px #c7c8c9;overflow:scroll;word-wrap: break-word;color:#000000;";
devtool.id="console";
devtool.innerHTML=`<div style="font-weight:600;padding:3px;border-bottom:solid 2px #000000;margin-bottom:5px;position:fixed;background-color:#f0f1f2;">Console</div>`;
var textbox=document.createElement("textarea");
textbox.style="border:none;outline: none;position:absolute;bottom:0px;right:0px;width:29.2%;padding:2px;position:fixed;font-size:10px;border-radius:0px;background-color:#FFFFFF;border-left:solid 2px #c7c8c9;z-index:9999999;margin:0px;";
textbox.placeholder=">_";
textbox.id="_console_textbox";
devtool.appendChild(textbox);
var submit=document.createElement("button");
submit.innerHTML="Run";
submit.id="_Run_button";
submit.style="background-color:#000000;color:#ffffff;padding;10px;border-radius:5px;corsor:pointer;font-size:5px;margin-left:5px;margin-bottom:10px;position:fixed;margin-top:90px;z-index:9999999;";
devtool.lastChild.before(submit);
var hidebutton=document.createElement("button");
hidebutton.innerHTML="hide";
hidebutton.id="_Run_button";
hidebutton.style="background-color:#000000;color:#ffffff;padding;10px;border-radius:5px;corsor:pointer;font-size:5px;margin-left:50px;margin-bottom:10px;position:fixed;margin-top:90px;z-index:9999999;";
hidebutton.onclick=function(){devtool.remove();};
devtool.lastChild.before(hidebutton);
var space=document.createElement("div");
space.style="height:120px;";
devtool.appendChild(space);
var outst=document.createElement("div");
outst.id="output";
outst.style="width:100%;";
devtool.appendChild(outst);
document.body.firstChild.before(devtool);
var li = document.createElement('div');
    li.style="border-bottom:solid 1px #c7c8c9;padding-left:10px;white-space: pre-wrap;";
    li.textContent="log here...";
    document.getElementById('output').appendChild(li);
(function(){
  const log = console.log;
  console.log = function(...args){
    log(...args);
    var li = document.createElement('div');
    li.style="border-bottom:solid 1px #c7c8c9;padding-left:10px;white-space: pre-wrap;";
    li.textContent=args[0];
    document.getElementById('output').firstChild.before(li);
   
  }
})();
(function(){
  const error = console.error;
  console.error = function(...args){
    error(...args);
    var li = document.createElement('div');
    li.style="border-bottom:solid 1px #c7c8c9;padding-left:10px;background-color:#f59595;white-space: pre-wrap;";
    li.textContent=args[0];
    document.getElementById('output').firstChild.before(li);
  }
})();
document.getElementById("_Run_button").addEventListener('click', test_ivent);
function test_ivent(e) {
if(textbox.value){
    const li = document.createElement('div');
    li.style="border-bottom:solid 1px #c7c8c9;padding:3px;opacity:0.7;";
    li.innerText = document.getElementById("_console_textbox").value;
    document.getElementById('output').firstChild.before(li);
    var script=document.createElement("script");
    script.id="consolescript";
    var code=document.getElementById("_console_textbox").value;
    script.innerText =`
    try{
    ${code}
    }catch(e){
    console.error(e);
    }`;
    script.textContent =`
    try{
    ${code}
    }catch(e){
    console.error(e);
    }`;
    document.body.appendChild(script);
    textbox.value="";
    textbox.focus();
    }
}
}
