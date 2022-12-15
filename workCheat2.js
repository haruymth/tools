async function cheat2(){
  function getCookieValue(key){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('='); 
        if (cookiesArray[0].trim() == key.trim()) { 
            return cookiesArray[1];  // (key[0],value[1])
        }
    }
    return '';
}
  let lessonList=getCookieValue("lessonlist").split(",");
  console.log(lessonList)
  for(let i=0;i<lessonList.length;i=i+2){
        let a=await fetch("https://player.lifeistech-lesson.jp/api/lesson_player/lesson_finished",{
        method:"POST",
        headers:{
            "credentials":"include",
            "content-type":"application/json"
        },
        body:JSON.stringify({project_name:lessonList[i],scenario_path:lessonList[i+1],finish_status:{quiz_all_answered:true,no_hint_cleared:true,noStatusUp:false}})
        })
    }
  alert("これですべてのレッスンを終了したことにできました。ホームに飛びます。");
  location.href="https://member.lifeistech-lesson.jp/home";
}
cheat2()
