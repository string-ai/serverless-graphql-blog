/**
 * Created by rn1466 on 1/10/16.
 */
import {tester} from 'graphql-tester';

describe('Parking Race Graphql Server', () => {
    const parkingRaceTest = tester({
        // url:'http://localhost:9000/undefined/graphql',
        url: 'https://3elir229r9.execute-api.us-east-1.amazonaws.com/dev/graphql',
        contentType: 'application/json, application/graphql',
        method: 'POST'
    });

    describe('Successfully getting the user poiwquer', () => {
       const response = parkingRaceTest(`{user(id:"poiwquer"){
                                name,
                                creditCard {
                                    cardNumber
                                },
                                plate {
                                    plateNumber,
                                    id
                                },
                                id}}`);
       it('Returns success', () => {
           return response.should.eventually.have.property('success').equal(true);
       });
    });
});