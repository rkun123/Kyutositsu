require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'create post' do
    post = Post.new(content: 'foobar', user: users(:user_one), color: '#FF0000', tags: [tags(:tag_one), tags(:tag_two)])
    assert post.valid?
    assert post.save
  end

  test 'post must have some tags' do
    post = Post.new(content: 'foobar', user: users(:user_one), color: '#FF0000', tags: [])
    assert_not post.valid?
  end

  test 'post must have color' do
    post = Post.new(content: 'foobar', user: users(:user_one), tags: [tags(:tag_one), tags(:tag_two)])
    assert_not post.valid?
    assert_not post.save
  end
end
