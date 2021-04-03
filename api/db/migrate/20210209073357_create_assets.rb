class CreateAssets < ActiveRecord::Migration[6.1]
  def change
    create_table :assets do |t|
      t.references :post, null: true, foreign_key: true
      t.string :file
      t.string :file_type

      t.timestamps
    end
  end
end
