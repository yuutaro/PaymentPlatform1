class RemoveAvatarToUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :avatar, :longtext
  end
end
