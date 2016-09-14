import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {find, propEq} from 'ramda';
const usersData = require('json!./users.json');


console.log('Users data:' + JSON.stringify(usersData));

// import { getPosts, getAuthor, getAuthors, getComments, createPost } from './dynamo';

// const Author = new GraphQLObjectType({
//   name: "Author",
//   description: "Author of the blog post",
//   fields: () => ({
//       id: {type: GraphQLString},
//       name: {type: GraphQLString}
//     })
// });
//
// const Comment = new GraphQLObjectType({
//   name: "Comment",
//   description: "Comment on the blog post",
//   fields: () => ({
//       id: {type: GraphQLString},
//       content: {type: GraphQLString},
//       author: {
//         type: Author,
//         resolve: ({author}) => {
//           return getAuthor(author);
//         }
//       }
//     })
// });
//
// const Post = new GraphQLObjectType({
//   name: "Post",
//   description: "Blog post content",
//   fields: () => ({
//     id: {type: GraphQLString},
//     title: {type: GraphQLString},
//     bodyContent: {type: GraphQLString},
//     author: {
//       type: Author,
//       resolve: ({author}) => {
//         return getAuthor(author);
//       }
//     },
//     comments: {
//       type: new GraphQLList(Comment),
//       resolve: (post) => {
//         return getComments();
//       }
//     }
//   })
// });
//
// const Query = new GraphQLObjectType({
//   name: 'BlogSchema',
//   description: "Root of the Blog Schema",
//   fields: () => ({
//     posts: {
//       type: new GraphQLList(Post),
//       description: "List of posts in the blog",
//       resolve: (source, {category}) => {
//         return getPosts();
//       }
//     },
//     authors: {
//       type: new GraphQLList(Author),
//       description: "List of Authors",
//       resolve: () => {
//         return getAuthors();
//       }
//     },
//     author: {
//       type: Author,
//       description: "Get Author by id",
//       args: {
//         id: {type: new GraphQLNonNull(GraphQLString)}
//       },
//       resolve: (source, {id}) => {
//         return getAuthor({id:id});
//       }
//     }
//   })
// });
//
// const Mutation = new GraphQLObjectType({
//   name: 'BlogMutations',
//   fields: {
//     createPost: {
//       type: Post,
//       description: "Create blog post",
//       args: {
//         id: {type: new GraphQLNonNull(GraphQLString)},
//         title: {type: new GraphQLLimitedString(10, 30)},
//         bodyContent: {type: new GraphQLNonNull(GraphQLString)},
//         author: {type: new GraphQLNonNull(GraphQLString), description: "Id of the author"}
//       },
//       resolve: (source, args) => {
//         console.log('Source:' + source);
//         console.log('args', JSON.stringify(args));
//         return createPost(args);
//       }
//     }
//   }
// });

// const Schema = new GraphQLSchema({
//   query: Query,
//   mutation: Mutation
// });

const Plate = new GraphQLObjectType({
  name: "Plate",
  description: "Plate of the car to be parked",
  fields: () => ({
      id: {type: GraphQLString},
      plateNumber: {type: GraphQLString}
    })
});

const ParkingSpot = new GraphQLObjectType({
  name: "ParkingSpot",
  description: "Parking Spot to be selected",
  fields: () => ({
    id: {type: GraphQLString},
    plateNumber: {type: GraphQLString}
  })
});

const CreditCard = new GraphQLObjectType({
  name: "CreditCard",
  description: "User's credit card",
  fields: () => ({
    cardNumber: {type: GraphQLString},
    cardholderName: {type: GraphQLString},
    expiryDate: {type: GraphQLString},
    CCV: {type: GraphQLString}
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User that will use the parking service',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    creditCard: {
      type: CreditCard
    },
    plate: {
      type: Plate
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'ParkingSchema',
  description: "Root of the Parking Schema",
  fields: {
    user: {
      type: User,
      description: "Get User by id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (_, {id}) => {
        return find(propEq('id', id), usersData);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
