var Schema = require('graph.ql')
var to_slug = require('to-slug-case')
var assign = require('object-assign')
var Remarkable = require('remarkable')
var remarkable = new Remarkable()

var posts = {}

module.exports = Schema(`
  scalar Date
  scalar Markdown

  type Post {
    title: String!
    date: Date!
    body: Markdown
    slug: String!
  }

  input PostInput {
    title: String!
    date: Date!
    body: Markdown!
  }

  type Mutation {
    create_post (post: PostInput): Post
  }

  type Query {
    all_posts(): [Post]
    get_post(slug: String): Post
  }
`, {
  Date: {
    serialize: function (v) {
      return new Date(v)
    },
    parse: function (v) {
      var date = new Date(v)
      return date.toISOString()
    }
  },
  Markdown: {
    serialize: function (v) {
      //input comes out
      return v;
    },
    parse: function (v) {
      //input comes in
      //turn string into Markdown
      return remarkable.render(v)
    }
  },
  Mutation: {
    create_post (mutation, args) {
      var slug = to_slug(args.post.title)
      posts[slug] = assign(args.post, {
        slug: slug
      })
      console.log("create_post", posts);
      return posts[slug]
    }
  },
  Query: {
    all_posts (query, args) {
      console.log("all_posts", posts)
      return Object.keys(posts).map(slug => {
        console.log("Object.keys", slug, posts[slug]);
        return posts[slug]
      })
    },
    get_post (query, args) {
      console.log('get_post', query, args)
      return posts[args.slug];
    }
  }
})
