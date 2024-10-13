class ChangeDataBToItem < ActiveRecord::Migration[7.1]
  def change
    remove_column :items, :images
    add_column :items, :images, :json, null: false
  end
end
