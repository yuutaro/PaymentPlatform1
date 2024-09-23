class ItemSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :images, :state, :created_at, :min_price, :discription, :amount

end