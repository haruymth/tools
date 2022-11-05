# tools
jsとかで作ったツールを公開してます

## console.js
僕は開発の殆どを学校PCでやっているので開発者ツールを使うときだけ家のWindowsでやってますなので不便なのでブックマークレットでコンソールを使えるようにすればいいじゃないかと思いついてつくってます.
## getFollowerOrFollowing.js  
フォローかフォロワーのページに行って実行です。  
## seizonkakunin.js
ブックマークレットでやるやつです。
「私について」の「生存確認」というワードが含まれる行を「生存確認：年月日時分」で変更します。
```js
javascript:{let aa=document.createElement("script");aa.src="https://haru-ymth.github.io/tools/seizonkakunin.js";document.body.appendChild(aa);}
```
です。
## 無差別フォロー.js
ユーザー名を縦に並べたテキストファイルを選択して使用するユーザー名を入力して何人目から始めるか入力すれば30秒ごとにフォローできる（フォローしたらすぐ外すっていうプログラム（外しても相手に通知行くからそれでフォロバしてもらえればおｋ））（30秒なのは429エラー回避）
