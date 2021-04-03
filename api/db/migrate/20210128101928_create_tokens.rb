class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.string :uuid
      t.datetime :expire

      t.timestamps

      t.index :uuid, unique: true
    end
  end
end
