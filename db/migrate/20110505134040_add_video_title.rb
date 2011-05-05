class AddVideoTitle < ActiveRecord::Migration
  def self.up
    add_column :videos, :title, :string, :null => false
  end

  def self.down
    remove_column :videos, :title
  end
end
