class ApplicationRecord < ActiveRecord::Base
  require 'carrierwave/orm/activerecord'
  self.abstract_class = true
end
