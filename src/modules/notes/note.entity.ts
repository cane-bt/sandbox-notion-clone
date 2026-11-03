export class Note {
  // この講座ではNotionクローンを題材としている
  // Notionはサイドバーの`ノートを作成`をクリックしたときには、すぐに新規ページが作成(保存)されるようになっている
  // そのためには、idとcreatedAt,userIdのみ必須として、他は空欄でも登録できるように型を指定する必要がある
  // Ruby on Railsなどのgeneraterを使用した時のようにで各データをそのまますべて入力していかなければいけないという形ではない
  //  26. ノートの作成処理を作ろう
  id!: number;
  userId!: string;
  title?: string | null;
  content?: string | null;
  parentId?: number | null;
  createdAt!: Date;

  constructor(data: Note) {
    Object.assign(this, data);
    // バックエンド(API)から日時を表す文字列としてデータが返ってくるのでそれをDate型で上書きする
    this.createdAt = new Date(data.createdAt);
  }
}
