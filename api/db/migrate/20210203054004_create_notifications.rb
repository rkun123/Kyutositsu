class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.references :favorite, foreign_key: true
      t.references :user, null: false, index: true, foreign_key: true

      t.timestamps
    end
  end
end
