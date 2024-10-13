class ChangeDataAToItem < ActiveRecord::Migration[7.1]
  def change
    remove_column :items, :image
    add_column :items, :images, :json
  end
end
