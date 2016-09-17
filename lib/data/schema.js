import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

import {find, propEq} from 'ramda';
const usersData = [
  {
    "id": "masoudfaosdifoa",
    "creditCard": {
      "cardNumber": "1111-1111-1111-1111",
      "cardholderName": "FULANO D SILVA",
      "expiryDate": "01/21",
      "CCV": "111"
    },
    "name": "FULANO D SILVA",
    "plate": {
      "id": "1",
      "plateNumber": "ADF 0045"
    }
  },
  {
    "id": "poiwquer",
    "creditCard": {
      "cardNumber": "2222-2222-2222-2222",
      "cardholderName": "SICRANO D SOUZA",
      "expiryDate": "01/22",
      "CCV": "222"
    },
    "name": "SICRANO D SOUZA",
    "plate": {
      "id": "2",
      "plateNumber": "AAA 0000"
    }
  },
  {
    "id": "zxcvzmn",
    "creditCard": {
      "cardNumber": "3333-3333-3333-3333",
      "cardholderName": "FRANSHELLY APARECIDA",
      "expiryDate": "01/22",
      "CCV": "333"
    },
    "name": "FRANSHELLY APARECIDA",
    "plate": {
      "id": "3",
      "plateNumber": "BBB 1111"
    }
  }
];

const getUserById = (id) => {
  return find(propEq('id', id), usersData);
};

var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
      var {type, id} = fromGlobalId(globalId);
      if (type === 'User') {
        return getUserById(id);
      } else {
        return null;
      }
    },
    (obj) => {
      if (obj instanceof User) {
        return User;
      } else {
        return null;
      }
    }
);

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
    id: globalIdField('User'),
    name: {type: GraphQLString},
    creditCard: {
      type: CreditCard
    },
    plate: {
      type: Plate
    }
  }),
  interfaces: [nodeInterface]
});

const Query = new GraphQLObjectType({
  name: 'ParkingSchema',
  description: "Root of the Parking Schema",
  fields: {
    node: nodeField,
    user: {
      type: User,
      description: "Get User by id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (_, {id}) => {
        return getUserById(id);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
