type Query {
  hello(name: String): String!
  posts: [Post!]!
  post(id: String!): Post
}

type Post {
  id: String!
  title: String!
  date: String!
  body: String!
}