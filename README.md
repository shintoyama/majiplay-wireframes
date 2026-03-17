# majiplay-wireframes

デジクルプラス（マジプラ）の開発に関するワイヤーフレーム・UIプロトタイプ・設計アウトプットをまとめるリポジトリです。

🌐 **GitHub Pages**: https://shintoyama.github.io/majiplay-wireframes/

---

## 目的

- 機能要件・UXの検討をHTML/CSS/JSで素早く形にする
- ステークホルダーへの説明・フィードバック収集に使えるインタラクティブなアウトプットを置く場所
- デザインツール（Figma等）に入る前の、ざっくりした動くワイヤーフレームの置き場

## ディレクトリ構成

```
majiplay-wireframes/
├── index.html              # 全アウトプット一覧トップ（随時更新）
├── assets/                 # 共通スタイル・JS
│   ├── style.css
│   └── main.js
│
├── staff/                  # 取り置きサービス 店舗スタッフ画面（神戸物産初期導入スコープ）
│   ├── order-list.html         # 取り置き一覧
│   ├── order-new.html          # 新規取り置き登録
│   ├── order-detail.html       # 取り置き詳細・変更
│   ├── order-search.html       # 予約検索（本人確認）
│   └── print.html              # 印刷（予約リスト・予約札・お客さま控え）
│
└── （今後追加予定）
    ├── reserve/            # 商品予約
    ├── campaign/           # キャンペーン
    └── ...
```

## アウトプット一覧

### 取り置きサービス（神戸物産初期導入スコープ）

> 消費者がほしい商品を事前に小売店に依頼して、指定の日付に指定の商品を用意して受け渡す体験を提供する機能。神戸物産（業務スーパー）向け初期スコープとして、電話予約を受け付けた際に店舗スタッフが管理画面から入力するフローを対象にしている。

| 画面 | 説明 | URL |
|------|------|-----|
| 取り置き一覧 | 当日の受け取り予定・ステータス管理 | [/staff/order-list.html](https://shintoyama.github.io/majiplay-wireframes/staff/order-list.html) |
| 新規取り置き登録 | 電話受付時の入力フロー（商品検索→客情報→受け取り日） | [/staff/order-new.html](https://shintoyama.github.io/majiplay-wireframes/staff/order-new.html) |
| 取り置き詳細・変更 | 予約内容の確認・変更・キャンセル・受け取り完了 | [/staff/order-detail.html](https://shintoyama.github.io/majiplay-wireframes/staff/order-detail.html) |
| 予約検索（本人確認） | 来店時に電話番号・氏名で予約を照会 | [/staff/order-search.html](https://shintoyama.github.io/majiplay-wireframes/staff/order-search.html) |
| 印刷 | 予約リスト・予約札・お客さま控えの印刷 | [/staff/print.html](https://shintoyama.github.io/majiplay-wireframes/staff/print.html) |

---

## 技術スタック

- HTML / CSS / JavaScript（バンドラーなし）
- [Bootstrap 5](https://getbootstrap.com/)（CDN）
- GitHub Pages（`main` ブランチの `/` ルートから配信）

シンプルに動くことを優先しているため、ビルドステップや依存パッケージはありません。ファイルを追加して `main` にpushするだけで公開されます。

## 新しいアウトプットを追加するには

```bash
# 1. リポジトリをクローン
git clone https://github.com/shintoyama/majiplay-wireframes.git
cd majiplay-wireframes

# 2. 機能名でディレクトリを作成してHTMLを追加
mkdir -p <feature-name>
# ... ファイルを作成 ...

# 3. index.html の一覧にリンクを追加

# 4. pushすれば自動で公開
git add .
git commit -m "Add wireframe: <feature-name>"
git push
```

## ワイヤーフレームのルール

- 各ページの**右下にアノテーションパネル**（黄色）を設置し、「このページの意図」と「要確認事項」を記載する
- `assets/style.css` と `assets/main.js` の共通リソースを使い回す
- ワイヤーフレームなので見た目の完成度より**フローと情報の網羅性**を優先する
