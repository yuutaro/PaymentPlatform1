class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :name, comment: "作品名"
      t.string :discription, comment: "作品紹介"
      t.integer :min_price, comment: "価格"
      t.integer :amount, comment: "個数"
      t.string :image, comment: "作品画像URL"


      t.timestamps
    end
  end
end
