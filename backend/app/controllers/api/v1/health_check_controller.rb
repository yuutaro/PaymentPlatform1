class Api::V1::HealthCheckController < ApplicationController
	def index
		render json: { message: 'Server is running!'}, status: :ok
	end
end
