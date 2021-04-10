class AddColumnAssets < ActiveRecord::Migration[6.1]
  def change
    add_column :assets, :url, :string
    change_column_null :assets, :file, true, nil
  end
end
