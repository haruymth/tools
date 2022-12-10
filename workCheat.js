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
    let res=await (await fetch(`https://player.lifeistech-lesson.jp/api/lesson_player/scenario?scenario_path=${getA().scenario_path}&project_name=${getA().project_name}`)).json();
    //console.log(res)
    let id=res.steps[res.steps.length-1].stepId-1;
    let newUrl=`https://player.lifeistech-lesson.jp/player/step?project_name=${getA().project_name}&scenario_path=${getA().scenario_path}&step_id=${id}`
    location.href=newUrl

}
cheat()
