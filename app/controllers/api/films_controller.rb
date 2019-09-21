class Api::FilmsController < ApplicationController
  respond_to :json

  def index
    respond_with Film.order(film_date: :DESC)
  end

  def show
    respond_with Film.find(params[:id])
  end

  def create
    respond_with :api, Film.create(film_params)
  end

  def destroy
    respond_with Film.destroy(params[:id])
  end

  def update
    film = Film.find(params['id'])
    film.update(film_params)
    respond_with Film, json: film
  end

  private

  def film_params
    params.require(:film).permit(:name, :film_date, :description, :url_image)
  end
end