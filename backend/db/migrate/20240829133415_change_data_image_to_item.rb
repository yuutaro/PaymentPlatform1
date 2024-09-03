class ChangeDataImageToItem < ActiveRecord::Migration[7.1]
  def change
    change_column :items, :image, :text
  end
end
