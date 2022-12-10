async function cheat(){
    function getA() {
        var queryStr = window.location.search.slice(1);
            queries = {};
        if (!queryStr) {
          return queries;
        }
        queryStr.split('&').forEach(function(queryStr) {
          var queryArr = queryStr.split('=');
          queries[queryArr[0]] = queryArr[1];
        });
      
        return queries;
      }
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
    let corces=await (await fetch(`https://api.lifeistech-lesson.jp/api/players/courses`,{
        headers:{
            "authorization":"Bearer "+getCookieValue("mozermovie")
        }
    })).json();
    let lessonList=[];
    console.log(corces)
    for(let a=0;a<corces.courses.length;a++){
        let corce1=corces.courses[a].chapters;
        console.log(corce1)
        for(let b=0;b<corce1.length;b++){
            let corce2=corce1[b];
            console.log(corce2)
            for(let c=0;c<corce2.lessons.length;c++){
                   let corce3=corce2.lessons[c];
                   console.log(corce3)
                    lessonList.push([corce2.id,corce3.id]);
            }
        }
    }
    for(let i=0;i<lessonList;i++){
        await fetch("https://player.lifeistech-lesson.jp/api/lesson_player/lesson_finished",{
        headers:{
            "credentials":"include"
        }})
    }
    console.log(lessonList)
    /*let res=await (await fetch(`https://player.lifeistech-lesson.jp/api/lesson_player/scenario?scenario_path=${getA().scenario_path}&project_name=${getA().project_name}`)).json();
    //console.log(res)
    let id=res.steps[res.steps.length-1].stepId-1;
    let newUrl=`https://player.lifeistech-lesson.jp/player/step?project_name=${getA().project_name}&scenario_path=${getA().scenario_path}&step_id=${id}`
    location.href=newUrl*/

}
cheat()
