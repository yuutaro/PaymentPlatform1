class CurrentItemSerializer < ActiveModel::Serializer
  
  attributes :name, :images, :min_price, :discription, :amount, :state

end