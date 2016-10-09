import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    mutationWithClientMutationId
} from 'graphql-relay';

import {
    getCreditCardById,
    getLatestCreditCardByUserId,
    getLatestPlateByUserId,
    getPlateByNumber,
    getPaymentById,
    createPlate,
    getPlateById,
    getUserById
} from './database';
import {GraphQLInt} from "graphql/type/scalars";

var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        var {type, id} = fromGlobalId(globalId);
        if (type === 'User') {
            return getUserById(id);
        } else if(type === 'CreditCard') {
            return getCreditCardById(id);
        } else if(type === 'Plate'){
            return getPlateById(id);
        } else if(type === 'Payment') {
            return getPaymentById(id);
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof User) {
            return User;
        } else if(obj instanceof Plate){
            return Plate;
        } else if(obj instanceof CreditCard) {
            return CreditCard;
        } else if(obj instanceof Payment) {
            return Payment;
        } else {
            return null;
        }
    }
);

const Plate = new GraphQLObjectType({
    name: "Plate",
    description: "Plate of the car to be parked",
    fields: () => ({
        id: globalIdField('Plate'),
        ID: {type: GraphQLString},
        plateNumber: {type: GraphQLString},
        userID: {type: GraphQLString},
        timestamp: {type: GraphQLInt}
    })
});

const ParkingSpot = new GraphQLObjectType({
    name: "ParkingSpot",
    description: "Parking Spot to be selected",
    fields: () => ({
        id: globalIdField('ParkingSpot'),
        ID: {type: GraphQLString},
        spotNumber: {type: GraphQLString},
        timestamp: {type: GraphQLInt}
    })
});

const CreditCard = new GraphQLObjectType({
    name: "CreditCard",
    description: "User's credit card",
    fields: () => ({
        id: globalIdField('CreditCard'),
        ID: {type: GraphQLString},
        cardNumber: {type: GraphQLString},
        cardholderName: {type: GraphQLString},
        expiryDate: {type: GraphQLString},
        CCV: {type: GraphQLString},
        timestamp: {type: GraphQLInt},
        userID: {type: GraphQLString}
    })
});


const User = new GraphQLObjectType({
    name: 'User',
    description: 'User that will use the parking service',
    fields: () => ({
        id: globalIdField('User'),
        ID: {type: GraphQLString},
        name: {type: GraphQLString},
        email:{type: GraphQLString},
        password:{type: GraphQLString},
        timestamp: {type: GraphQLInt},
        currentPlate: {
            type: Plate,
            resolve: (_) => {
                const userID = _.ID;
                console.log('The current user:' + JSON.stringify(_));
                const lastPlateByUserID = getLatestPlateByUserId(userID);
                console.log('Latest plate from user ' + userID);
                console.log('plate:' + JSON.stringify(lastPlateByUserID));
                return lastPlateByUserID;
            }
        },
        currentCreditCard: {
            type: CreditCard,
            resolve: (_) => {
                const userID = _.ID;
                console.log('The current user:' + JSON.stringify(_));
                const lastCreditCard = getLatestCreditCardByUserId(userID);
                console.log('Latest credit card from user ' + userID);
                console.log('creditCard:' + JSON.stringify(lastCreditCard));
                return lastCreditCard;
            }
        }
    }),
    interfaces: [nodeInterface]
});

const Payment = new GraphQLObjectType({
    name: 'Payment',
    description: 'User that will use the parking service',
    fields: () => ({
        id: globalIdField('Payment'),
        ID: {type: GraphQLString},
        userID: {type: GraphQLString},
        creditCardID:{type: GraphQLString},
        plateID:{type: GraphQLString},
        minutes: {type: GraphQLInt}
    }),
    interfaces: [nodeInterface]
});

const UserPlateMutation = mutationWithClientMutationId({
    name: 'IntroducePlate',
    inputFields: {
        plateNumber: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userID: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    outputFields: {
        newPlate: {
            type: Plate,
            resolve: (payload) => {
                return getPlateById(payload.plateID);
            }
        },
        user: {
            type: User,
            resolve: (payload) => {
                return getUserById(payload.userID);
            }
        }
    },
    mutateAndGetPayload: ({plateNumber, userID}) => {
        const newPlate = createPlate(plateNumber, userID);
        return {
            plateID: newPlate.ID,
            userID: newPlate.userID
        }
    }
});

const mutationType = new GraphQLObjectType({
   name: 'Mutation',
    fields: () => ({
        introducePlate: UserPlateMutation
    })
});

const queryType = new GraphQLObjectType({
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
    query: queryType,
    mutation: mutationType
});

export default Schema;