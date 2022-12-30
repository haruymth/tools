(()=>{
if(document.getElementById("console")!==null){
	document.getElementById("console").style.right="0px";
  	document.getElementById("closeButton").style.right=Number(document.getElementById("console").style.width.replace("px",""))-2+"px";
	return
}
let style=document.createElement("style");
style.textContent=`@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');
#console{
  all:initial;
  font-size:13px;
  display:block;
  background-color: #FFFFFF;
  height: 100%;
  position:absolute;
  top:0px;
  right:0px;
  border-left:#c7c7c7 2px solid;
  font-family: 'Source Code Pro', monospace;
  z-index:2147483647;
  overflow-y: scroll;
  overflow-x: hidden;
  position:fixed;
  direction: rtl;
}
#console * {
  direction: ltr;
  overflow-wrap:  break-word;
}
#codearea{
  all:initial;
  resize: none;
  min-height: 10px;
  width: 100%;
  outline:0;
  border:1px #c7c7c7 solid;
  border-left:0;
  font-family: 'Source Code Pro', monospace;
  font-size:13px;
  overflow-wrap:  break-word;
}
.consolelog{
  all:initial;
  display:block;
  width:100%;
  border-left:0;
  font-family: 'Source Code Pro', monospace;
  border-bottom:1px #c7c7c7 solid;
  white-space: pre-wrap;
  opacity:1;
  font-size:13px;
}
.consoleerror{
  all:initial;
  display:block;
  width:100%;
  border-left:0;
  font-family: 'Source Code Pro', monospace;
  border-bottom:1px #c7c7c7 solid;
  white-space: pre-wrap;
  opacity:1;
  font-size:13px;
  background-color:#ffa1a1;
}
.codelog{
  all:initial;
  display:block;
  width:100%;
  border-left:0;
  font-family: 'Source Code Pro', monospace;
  border-bottom:1px #c7c7c7 solid;
  white-space: pre-wrap;
  opacity:0.7;
  font-size:13px;
}
#closeButton{
  display:inline-block;
  position:absolute;
  top:0px;
  z-index:2147483646;
  background-color:#ffffff;
  padding:5px;
  padding-right:10px;
  position:fixed;
  font-family: 'Source Code Pro', monospace;
  border-radius:5px;
  user-select:none;
  cursor:pointer;
  border:1px #c7c7c7 solid;
}
#console::-webkit-scrollbar{
   width: 10px;
}
#console::-webkit-scrollbar-track{
   background-color: #c7c7c7;
}
#console::-webkit-scrollbar-thumb{
   background-color: #7d7d7d;
}`;
document.body.appendChild(style);
function createUI(){
	let container=document.createElement("div");
  container.id="console";
  container.style.width=document.body.clientWidth*0.25+"px";
  document.body.appendChild(container);
  let codeArea=document.createElement("textArea");
  codeArea.id="codearea";
  codeArea.placeholder="input code here...";
  container.appendChild(codeArea);
  codeArea.focus()
  let close=document.createElement("span");
  close.innerText="X";
  close.id="closeButton";
  close.style.right=document.body.clientWidth*0.25-2+"px";
  close.addEventListener("click",function(){
  	document.getElementById("console").style.right="-99999px";
	document.getElementById("closeButton").style.right="-99999px";
  })
  container.before(close);
  }
  createUI()
  {
 const textareaEl = document.getElementById("codearea");
textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
    textareaEl.addEventListener("input", setTextareaHeight);

  function setTextareaHeight() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
  }
  document.addEventListener("keyup",keyPress);
  function keyPress(e){
  	if(e.shiftKey && e.key === 'Enter'){
    	let code=document.getElementById("codearea").value.trim();
		if(!code)return;
      document.getElementById("codearea").value="";
      document.getElementById("codearea").style.height="auto";
      let codeLog=document.createElement("div");
      codeLog.setAttribute("class","codelog");
      codeLog.innerText=code;
      let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
      document.getElementById("codearea").before(codeLog);
      let scriptCode=document.createElement("script");
      scriptCode.textContent=code;
      document.body.appendChild(scriptCode);
      if(Math.abs((logAreaHeight-logAreaTop)-logArea.offsetHeight)<16){
      	logArea.scrollTop = logAreaHeight;
      }
    }
  }
  (function(){
  const log = console.log;
  console.log = function(...args){
    log(...args);
    var li = document.createElement('div');
    li.textContent=args[0];
    li.setAttribute("class","consolelog");
    let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
    document.getElementById("codearea").before(li);
    if(Math.abs((logAreaHeight-logAreaTop)-logArea.offsetHeight)<16){
      	logArea.scrollTop = logAreaHeight;
      }
  }
})();
(function(){
  const error = console.error;
  console.error = function(...args){
    error(...args);
    var li = document.createElement('div');
    li.textContent=args[0];
    li.setAttribute("class","consoleerror");
    let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
    document.getElementById("codearea").before(li);
    if(Math.abs((logAreaHeight-logAreaTop)-logArea.offsetHeight)<16){
      	logArea.scrollTop = logAreaHeight;
      }
  }
})();
	(function(){
  const warn = console.warn;
  console.warn = function(...args){
    warn(...args);
    var li = document.createElement('div');
    li.textContent=args[0];
    li.setAttribute("class","consoleerror");
    let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
    document.getElementById("codearea").before(li);
    if(Math.abs((logAreaHeight-logAreaTop)-logArea.offsetHeight)<16){
      	logArea.scrollTop = logAreaHeight;
      }
  }
})();
window.onerror = function(message, source, lineno, colno, error) {
	console.error(error)
}
})();
