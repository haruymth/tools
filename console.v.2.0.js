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
  position:absolute;
  right:0px;
  min-height: 10px;
  width: calc(100% - 15px);
  outline:0;
  /*border:1px #c7c7c7 solid;
  border-left:0;*/
  font-family: 'Source Code Pro', monospace;
  font-size:13px;
  overflow-wrap:  break-word;
  border-bottom:0;
}
.consolelog,.consoleerror,.consolewarn,.codelog{
  all:initial;
  display:block;
  padding-left:15px;
  width:calc(100% - 15px);
  border-left:0;
  margin-left:auto;
  font-family: 'Source Code Pro', monospace;
  border-bottom:1px #c7c7c7 solid;
  white-space: pre-wrap;
  opacity:0.8;
  font-size:13px;
}
.consoleerror{
  background-color:#ffa1a1;
}
.consolewarn{
  background-color:#fffca1;
}
.codelog{
  opacity:1;
}
#closeButton{
	all:initial;
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
#code-area-track{
	all:initial;
  position:relative;
  left:5px;
  top:1px;
  font-size:13px;
  font-weight:1000;
  color:#58b3fc;
  font-family: 'Source Code Pro', monospace;
}
#code-area-container{
	width:100%;
}
#console::-webkit-scrollbar{
   width: 10px;
}
#console::-webkit-scrollbar-track{
   background-color: #c7c7c7;
}
#console::-webkit-scrollbar-thumb{
   background-color: #7d7d7d;
   opacity:0.5;
}`;
document.body.appendChild(style);
function createUI(){
	let container=document.createElement("div");
  container.id="console";
  container.style.width=document.body.clientWidth*0.25+"px";
  document.body.appendChild(container);
  let codeAreaContainer=document.createElement("div");
  codeAreaContainer.id="code-area-container";
  let codeArea=document.createElement("textArea");
  codeArea.id="codearea";
  codeArea.onkeypress="if(event.keyCode==13){if(event.shiftKey==true){event.returnValue=true}else{event.returnValue=false}}";
  let codeAreaTrack=document.createElement("span");
  codeAreaTrack.textContent=">";
  codeAreaTrack.id="code-area-track";
  codeAreaContainer.appendChild(codeAreaTrack);
  codeAreaContainer.appendChild(codeArea);
  container.appendChild(codeAreaContainer);
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
  	if(!e.shiftKey && e.key === 'Enter'){
    	let code=document.getElementById("codearea").value.trim();
		if(!code)return;
    let code2="{"+document.getElementById("codearea").value+"}"
      document.getElementById("codearea").value="";
      document.getElementById("codearea").style.height="auto";
      let codeLog=document.createElement("div");
      codeLog.setAttribute("class","codelog");
      codeLog.innerText=code;
      let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
      document.getElementById("code-area-container").before(codeLog);
      let scriptCode=document.createElement("script");
      scriptCode.textContent=code2;
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
    document.getElementById("code-area-container").before(li);
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
    document.getElementById("code-area-container").before(li);
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
    li.setAttribute("class","consolewarn");
    let logArea = document.getElementById('console'),
     	logAreaHeight = logArea.scrollHeight,
      logAreaTop = logArea.scrollTop;
    document.getElementById("code-area-container").before(li);
    if(Math.abs((logAreaHeight-logAreaTop)-logArea.offsetHeight)<16){
      	logArea.scrollTop = logAreaHeight;
      }
  }
})();
window.onerror = function(message, source, lineno, colno, error) {
	console.error(error)
}
})();
