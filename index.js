'use strict';
const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
});

const personModel = dynamoose.model('People', personSchema);

exports.handler = async (event) => {
  console.log('EVENT: ', event);
  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    const result = await personModel.update({ id }, body);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error('ERROR: ', error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};