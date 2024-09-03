class ChangeDataImageToItems < ActiveRecord::Migration[7.1]
  def change
    change_column :items, :image, :longtext
  end
end
