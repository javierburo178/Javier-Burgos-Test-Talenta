Rails.application.routes.draw do
  root to: redirect('/films')
  get 'films', to: 'site#index'
  get 'films/new', to: 'site#index'
  get 'films/:id', to: 'site#index'
  get 'films/:id/edit', to: 'site#index'
  namespace :api do
    resources :films, only: %i[index show create destroy update]
  end
end
