class ApplicationUploader < CarrierWave::Uploader::Base

  if ENV['ENABLED_FOG']
    #S3に保存
    storage :fog
  else
    #railsに保存
    # strage :file
  end
end