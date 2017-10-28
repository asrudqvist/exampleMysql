// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');


const mqtt = require('mqtt');
const client = mqtt.connect('localhost');

console.log('mqtt module');

