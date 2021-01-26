class AddColumnPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :column_size, :integer, default: 1, null: false
  end
end
