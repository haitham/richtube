# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_richtube_session',
  :secret      => 'f8889572dc8b49b8d9ddf5bcdb3360e2432a84c26f1bcd4c4204e7db5342fff7ef96beba752dc466435327c7337ab31218793b1a58097a8dc5da039ff0041f48'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
