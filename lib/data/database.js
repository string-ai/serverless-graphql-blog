/**
 * Created by rn1466 on 9/10/16.
 */
// import * as moment from 'moment';

const platesData = [
    {
        userID: "masoudfaosdifoa",
        plateNumber: "ADF 0045",
        ID: "1",
        timestamp: new Date(2016, 10, 1, 13, 20, 0).getTime()
    },
    {
        userID: "masoudfaosdifoa",
        plateNumber: "AFF 0015",
        ID: "4",
        timestamp: new Date(2012, 10, 1, 13, 20, 0).getTime()
    },
    {
        userID: "poiwquer",
        plateNumber: "AAA 0000",
        ID: "2",
        timestamp: new Date(2016, 10, 1, 13, 10, 0).getTime()
    },
    {
        userID: "zxcvzmn",
        plateNumber: "BBB 1111",
        ID: "3",
        timestamp: new Date(2016, 9, 10, 13, 20, 0).getTime()
    }];

const creditCardData = [
    {
        ID: "1",
        cardNumber: "1111-1111-1111-1111",
        cardholderName: "FULANO D SILVA",
        expiryDate: "01/21",
        CCV: "111",
        userID: "masoudfaosdifoa",
        timestamp: new Date(2016, 10, 1, 13, 20, 0).getTime()
    },
    {
        ID: "4",
        cardNumber: "2111-1111-1111-1111",
        cardholderName: "FULANO D SILVA",
        expiryDate: "04/21",
        CCV: "121",
        userID: "masoudfaosdifoa",
        timestamp: new Date(2015, 10, 1, 13, 20, 0).getTime()
    },
    {
        ID: "2",
        cardNumber: "2222-2222-2222-2222",
        cardholderName: "SICRANO D SOUZA",
        expiryDate: "01/22",
        CCV: "222",
        userID: "poiwquer",
        timestamp: new Date(2016, 9, 1, 13, 20, 0).getTime()
    },
    {
        ID: "3",
        cardNumber: "3333-3333-3333-3333",
        cardholderName: "FRANSHELLY APARECIDA",
        expiryDate: "01/22",
        CCV: "333",
        userID: "zxcvzmn",
        timestamp: new Date(2016, 8, 1, 13, 20, 0).getTime()
    }];

const usersData = [
    {
        ID: "masoudfaosdifoa",
        name: "FULANO D SILVA",
        email: "fulano.da.silva@gmail.com",
        password: "cabecadejumento69",
        timestamp: new Date(2016, 10, 1, 13, 20, 0).getTime()
    },
    {
        ID: "poiwquer",
        name: "SICRANO D SOUZA",
        email: "sicrano.da.souza@gmail.com",
        password: "subwaybigmac77",
        timestamp: new Date(2016, 8, 1, 13, 20, 0).getTime()
    },
    {
        ID: "zxcvzmn",
        name: "FRANSHELLY APARECIDA",
        email: "frangatinha21@gmail.com",
        password: "superhotfuck69",
        timestamp: new Date(2016, 7, 1, 13, 20, 0).getTime()
    }
];

// Parking Data should have userID, creditCardID, plateID
const parkingData = [];

const paymentData = [];

import {find, filter, propEq, sort, head} from 'ramda';

const getByID = (id) => find(propEq('ID', id));

const diffTimestamp = (a, b) => a.timestamp - b.timestamp;
const filterByUserID = (userID) => filter(propEq('userID', userID));
const plateExists = (plateNumber) => find(propEq('plateNumber', plateNumber));

export const getUserById = (id) => {
    return getByID(id)(usersData);
};

export const getLatestPlateByUserId = (userID) => {
    const sortedByTimestamp = sort(diffTimestamp, filterByUserID(userID)(platesData));
    return head(sortedByTimestamp);
};

export const getLatestCreditCardByUserId = (userID) => {
    const sortedByTimestamp = sort(diffTimestamp, filterByUserID(userID)(creditCardData));
    return head(sortedByTimestamp);
};

export const getPlateById = (id) => {
    return getByID(id)(platesData);
};

export const getCreditCardById = (id) => {
    return getByID(id)(creditCardData);
};

export const getPlateByNumber = (plateNumber) => {
    return find(propEq('plateNumber', plateNumber), platesData);
};

export const getPaymentById = (id) => {
    return getByID(id)(paymentData)
};

export const createPlate = (plateNumber, userID) => {
    var checkPlate = plateExists(plateNumber)(platesData);
    console.log('Checking if plate already exists:' + plateNumber);
    if(checkPlate) {
        console.log('Plate already exists.. throwing error...');
        console.log('Plate:' + JSON.stringify(checkPlate));
        throw Error('The plate number already exists!');
    }
    const newID = (platesData.length + 1) + "";
    console.log('NEWID:' + newID);
    const timestamp = new Date().getTime();
    console.log('TIMESTAMP:' + timestamp);
    const newPlate = {
        ID:newID,
        timestamp,
        plateNumber,
        userID
    };
    console.log('newPlate:' + JSON.stringify(newPlate));
    platesData.push(newPlate);
    console.log('new content of platesData:' + JSON.stringify(platesData));
    return newPlate;
};