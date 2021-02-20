if ENV['ASSET_STORE_PROVIDER'] == 'AWS'
    CarrierWave.configure do |config|
        config.fog_credentials = {
            provider: 'AWS',
            aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
            region: ENV['AWS_REGION'],
            host: "#{ENV['AWS_REGION']}.digitaloceanspaces.com",
            endpoint: "https://#{ENV['AWS_REGION']}.digitaloceanspaces.com"
        }
        config.fog_directory = ENV['AWS_S3_BUCKET']
        config.cache_storage = :fog
    end
end