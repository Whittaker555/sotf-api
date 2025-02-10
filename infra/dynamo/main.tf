resource "aws_dynamodb_table" "SpotifyPlaylist" {
  name         = "sotf_users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  attribute {
    name = "userId"
    type = "S"
  }
}
