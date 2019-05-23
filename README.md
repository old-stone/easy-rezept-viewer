# Easy Rezept Viewer

## Overview

CSVの電子レセプト(診療費請求書)をレコード名などを併せて表示できるビューワです。  
若干エディタっぽいこともできますが、レセコンとは全然違うのでビューワにしています。  
現段階では労災フォーマットのみ対応😭  

![demo](https://raw.githubusercontent.com/wiki/old-stone/easy-rezept-viewer/images/erv_demo.gif)

お試しはこちら → https://easy-rezept-viewer.netlify.com/

## Getting Started

### Prerequisites

- git 2.20.1
- node 11.14.0
- npm 6.9.0
- yarn 1.15.2

※開発時のバージョン

### Installing

```sh
git clone https://github.com/old-stone/easy-rezept-viewer.git
cd easy-rezept-viewer
yarn install
yarn start
```

http://localhost:3000/ にアクセス

## Running the tests

```sh
yarn test
```

## Deployment

```sh
yarn build
```

T.B.D.

## Built With

T.B.D.

## Contributing

T.B.D.

## Authors

- old-stone

## License

MIT

## Acknowledgments

T.B.D.

## TODO

- electron化
- 簡易チェック機能をもうちょっとちゃんとする
- 簡易チェックの R(L)1〜4 エラーとの紐づけ
- 支払基金・アフターケアのフォーマット対応とか
- エラー一覧画面追加
