var devtool=document.createElement("code");
devtool.style="background-color:#f0f1f2;display:block;height:100%;width:30%;position:absolute;z-index:9999999;top:0px;right:0px;position:fixed;border-left:solid 2px #c7c8c9;overflow:scroll;"
devtool.id="console";
devtool.innerHTML=`<div style="font-weight:600;padding:3px;border-bottom:solid 2px #000000;margin-bottom:20px;">コンソール(開発者ツールが使えない人向け。エラーは表示できません。)</div>`
var textbox=document.createElement("textarea");
textbox.style="border:none;outline: none;position:absolute;bottom:0px;right:0px;width:29.2%;padding:2px;position:fixed";
textbox.placeholder=">_";
textbox.id="_console_textbox";
devtool.appendChild(textbox);
document.body.firstChild.before(devtool);
(function(){
  const log = console.log;
  console.log = function(...args){
    log(...args);
    const li = document.createElement('div');
    li.style="border-bottom:solid 1px #c7c8c9"
    li.innerText = args[0];
    document.getElementById('console').appendChild(li);
  }
})()
document.getElementById("_console_textbox").addEventListener('keypress', test_ivent);
function test_ivent(e) {
if(e.keyCode === 13){
		console.log(document.getElementById("_console_textbox").value);
    var script=document.createElement("script");
    script.id="consolescript";
    script.innerHTML=document.getElementById("_console_textbox").value;
    document.getElementById("_console_textbox").remove();
    var textbox=document.createElement("textarea");
    textbox.style="border:none;outline: none;position:absolute;bottom:0px;right:0px;width:29.2%;padding:2px;position:fixed";
    textbox.placeholder=">_";
    textbox.id="_console_textbox";
    document.getElementById("console").appendChild(textbox);
    
    textbox.focus();
    document.getElementById("_console_textbox").addEventListener('keypress', test_ivent);
	}
}
