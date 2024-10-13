class AddAvatorToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :avatar, :longtext
  end
end
