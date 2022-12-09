# tools
jsとかで作ったツールを公開してます。
ここにあってスクリプト配布のところにないやつとか、スクリプト配布のところにあってここにないやつとかあるので気をつけてね

## console.js
僕は開発の殆どを学校PCでやっているので開発者ツールを使うときだけ家のWindowsでやってますなので不便なのでブックマークレットでコンソールを使えるようにすればいいじゃないかと思いついてつくってます.
## getFollowerOrFollowing.js  
フォローかフォロワーのページに行って実行です。  
## seizonkakunin.js
ブックマークレットでやるやつです。  
「私について」の「生存確認」というワードが含まれる行を「生存確認：年月日時分」で変更します。
```js
javascript:{let aa=document.createElement("script");aa.src="https://haruymth.github.io/tools/seizonkakunin.js";document.body.appendChild(aa);}
```
です。
## 無差別フォロー.js
上のgetfollowerjsみたいなやつでファイル取得したあとこのスクリプトを実行してそのファイルを選択して使用するユーザー名を入力して何人目から始めるか入力すれば30秒ごとにフォローできる（フォローしたらすぐ外すっていうプログラム（外しても相手に通知行くからそれでフォロバしてもらえればおｋ））（30秒なのは429エラー回避）（あんまり広めるな）

## getFavorite.js/getFollowerOrFollowing.js
ふぁぼならふぁぼのページ行ってFFならFFのページいって実行

## jumpToTurbowarp.js
ブックマークレットです。非共有の自分のプロジェクトをTurbowarpで見れるようにするやつです。  
自動でproject_tokenとか取ってTurbowarpに飛んでくれます。
```js
javascript:{let aa=document.createElement("script");aa.src="https://haruymth.github.io/tools/じjumpToTurbowarp.js";document.body.appendChild(aa);}
```

## kidoku.js
只々依頼があったから作っただけです。BMLです。
```js
javascript:{let aa=document.createElement("script");aa.src="https://haruymth.github.io/tools/kidoku.js";document.body.appendChild(aa);}
```
## switchaccount.js
これは僕が超頑張って作ったやつです。ブックマークレットです。  
①ブックマークレットに登録
```js
javascript:{let aa=document.createElement("script");aa.src="https://haruymth.github.io/tools/switchaccount.js";document.body.appendChild(aa);}
```
②ブックマークレットをScratch.mit.eduのドメイン内で実行(api.scratch.mit.eduとかとはcookieつないでない)する  
③「アカウントを追加する」を押して切り替えたいアカウントを追加（あとからいつでも追加可能）  
④あとはポチポチ押して切り替えるだけ。  
クソ便利です。

## お気に入り外し.js
BMLじゃねえよ  
getFavoriteでダウンロードしたファイルをこれ実行して渡せばおｋ

## コメ変更.js
コメ偽造って言ったほうがいいかな。プロジェクトコメントとスタジオコメントには対応してません。  
ユーザープロフのコメントだけ、いろいろイジることが出来ます。  
まずは実行してみろ

## フォロー整理(外すやつ).js
無差別フォロー.jsとセットで使いましょう。  
そうすればタダ(?)でフォロワーが手に入ります。  
ちなみにyamaguchi03(本垢)ではこのスクリプトはやってません。サブ垢でやってたりします。  
できるだけこのスクリプトは使わないほうがおすすめ
