class ItemSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :images, :created_at, :min_price, :discription, :amount, :user_id

end