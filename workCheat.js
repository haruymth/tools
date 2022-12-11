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
    for(let a=0;a<corces.courses.length;a++){
        let corce1=corces.courses[a].chapters;
        for(let b=0;b<corce1.length;b++){
            let corce2=corce1[b];
            for(let c=0;c<corce2.lessons.length;c++){
                   let corce3=corce2.lessons[c];
                    let pay=await (await fetch(`https://api.lifeistech-lesson.jp/api/players/chapters/${corce2.id}/lessons/${corce3.id}`,{
                        headers:{
                            "authorization":"Bearer "+getCookieValue("mozermovie")
                        }
                    })).json();
                    let projectName=pay.start_links[0].player_url.split("project_name=")[1].split("&")[0];
                    let scenarioPath=pay.start_links[0].player_url.split("scenario_path=")[1].split("&")[0];
                    lessonList.push([projectName,scenarioPath]);
            }
        }
    }
    document.cookie=lessonList.toString()+";path=/;max-age=32421454";
    alert("次に、ページに飛ぶので、そこで、ブックマークレットの2つめをクリックしてね");
    let newUrl=`https://player.lifeistech-lesson.jp/player/step?project_name=${lessonList[0][0]}&scenario_path=${lessonList[0][1]}&step_id=1`
    location.href=newUrl;

}
cheat()
