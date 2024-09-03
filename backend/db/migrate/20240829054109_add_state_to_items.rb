class AddStateToItems < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :state, :integer, comment: "公開状況"
  end
end
