class VideosController < ApplicationController
  
  def index
    
  end
  
  def new
    
  end
  
  def create
    v = Video.create params[:video]
    render :text => v.id, :status => :ok
  end
  
  def show
    @video = Video.find params[:id]
  end
  
  def edit
    
  end
  
  def update
    
  end
  
end
