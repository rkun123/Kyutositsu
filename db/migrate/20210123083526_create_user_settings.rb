class CreateUserSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :user_settings do |t|
      t.references :user, foreign_key: :user_id
      t.json :setting

      t.timestamps
    end
  end
end
