class ItemSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :image, :state, :created_at, :min_price, :discription, :amount

end