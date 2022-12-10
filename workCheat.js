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
    let corces=await (await fetch(`https://api.lifeistech-lesson.jp/api/players/courses`).{}son();
    let lessonList=[];
    for(let a=0;a<corces.corces.length;a++){
        let corce1=corces.corces[a];
        for(let b=0;b<corce1.length;b++){
            let corce2=corce1.chapter[b];
            for(let c=0;c<corce2.length;c++){
                   let corce3=corce2.lessons[c];
                   for(let d=0;d<corce3.length;d++){
                       lessonList.push([corce2.id,corce3.id]);
                   }
            }
        }
        
    }
    console.log(lessonList)
    /*let res=await (await fetch(`https://player.lifeistech-lesson.jp/api/lesson_player/scenario?scenario_path=${getA().scenario_path}&project_name=${getA().project_name}`)).json();
    //console.log(res)
    let id=res.steps[res.steps.length-1].stepId-1;
    let newUrl=`https://player.lifeistech-lesson.jp/player/step?project_name=${getA().project_name}&scenario_path=${getA().scenario_path}&step_id=${id}`
    location.href=newUrl*/

}
cheat()
