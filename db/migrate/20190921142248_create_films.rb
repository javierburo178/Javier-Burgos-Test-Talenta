class CreateFilms < ActiveRecord::Migration[6.0]
  def change
    create_table :films do |t|
      t.string :name
      t.text :description
      t.string :url_image
      t.date :film_date

      t.timestamps
    end
  end
end
