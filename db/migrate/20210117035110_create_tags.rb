class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :color
      t.references :created_by, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
