require 'test_helper'

class FavoriteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'favorite post by user' do
    favorite = posts(:post_one).favorites.build(user: users(:user_one))
    assert favorite.valid?
    assert favorite.save
  end
  
  test 'favorite must not duplicated' do
    # First favorite
    favorite = posts(:post_one).favorites.build(user: users(:user_one))
    assert favorite.valid?
    assert favorite.save

    # Duplicated favorite (must be rejected)
    favorite = posts(:post_one).favorites.build(user: users(:user_one))
    assert_not favorite.valid?
    assert_not favorite.save
  end
end
