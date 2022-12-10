async function cheat(){
    function getUrlQueries() {
        var queryStr = window.location.search.slice(1);  // 文頭?を除外
            queries = {};
      
        // クエリがない場合は空のオブジェクトを返す
        if (!queryStr) {
          return queries;
        }
      
        // クエリ文字列を & で分割して処理
        queryStr.split('&').forEach(function(queryStr) {
          // = で分割してkey,valueをオブジェクトに格納
          var queryArr = queryStr.split('=');
          queries[queryArr[0]] = queryArr[1];
        });
      
        return queries;
      }
    let url;
    let res=await (await fetch("https://player.lifeistech-lesson.jp/api/lesson_player/scenario?scenario_path=lesson%2Fpcbasic_chromebook&project_name=webdesign")).json();

}
