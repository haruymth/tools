(()=>{
if(document.getElementById("console")!==null){
	return
}
let style=document.createElement("style");
style.textContent=`@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');

#console{
  all:initial;
  font-size:12px;
  display:block;
  background-color: #FFFFFF;
  height: 100%;
  position:absolute;
  top:0px;
  left:0px;
  border-right:#c7c7c7 2px solid;
  font-family: 'Source Code Pro', monospace;
  z-index:2147483647;
  overflow:scroll;
  position:fixed;
}
#codearea{
  all:initial;
  resize: none;
  min-height: 20px;
  width: 100%;
  outline:0;
  border:1px #c7c7c7 solid;
  border-left:0;
  font-family: 'Source Code Pro', monospace;
  font-size:12px;
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
  font-size:12px;
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
  font-size:12px;
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
  font-size:12px;
}
#closeButton{
  display:inline-block;
  position:absolute;
  top:0px;
  z-index:2147483646;
  background-color:#ffffff;
  padding:5px;
  padding-left:10px;
  position:fixed;
  font-family: 'Source Code Pro', monospace;
  border-radius:5px;
}`;
document.body.appendChild(style);
function createUI(){
	let container=document.createElement("div");
  container.id="console";
  container.style.width=document.body.clientWidth*0.5+"px";
  document.body.appendChild(container);
  let codeArea=document.createElement("textArea");
  codeArea.id="codearea";
  codeArea.placeholder="input code here...";
  container.appendChild(codeArea);
  codeArea.focus()
  let close=document.createElement("span");
  close.innerText="X";
  close.id="closeButton";
  close.style.left=document.body.clientWidth*0.5-2+"px";
  close.addEventListener("click",function(){
  	document.getElementById("console").remove();
  })
  container.before(close);
  }
  createUI()
  {
 const textareaEls = document.querySelectorAll("textarea");

  textareaEls.forEach((textareaEl) => {
    textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
    textareaEl.addEventListener("input", setTextareaHeight);
  });

  function setTextareaHeight() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
  }
  document.addEventListener("keyup",keyPress);
  function keyPress(e){
  	if(e.shiftKey && e.key === 'Enter'){
    	let code=document.getElementById("codearea").value.trim();
      document.getElementById("codearea").value="";
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
      if(logAreaHeight-logAreaTop==logArea.offsetHeight){
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
    if(logAreaHeight-logAreaTop==logArea.offsetHeight){
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
    if(logAreaHeight-logAreaTop==logArea.offsetHeight){
      	logArea.scrollTop = logAreaHeight;
      }
  }
})();
window.onerror = function(message, source, lineno, colno, error) {
	console.error(error)
}
})();
