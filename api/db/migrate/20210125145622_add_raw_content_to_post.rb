class AddRawContentToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :raw_content, :string
  end
end
