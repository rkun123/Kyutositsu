class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: :user_id
      t.references :post, foreign_key: :post_id

      t.timestamps
    end
  end
end
