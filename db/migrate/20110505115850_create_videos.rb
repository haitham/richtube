class CreateVideos < ActiveRecord::Migration
  def self.up
    create_table :videos do |t|
      t.string :youtube_id, :null => false
      t.text :timeline
      t.timestamps
    end
  end

  def self.down
    drop_table :videos
  end
end
