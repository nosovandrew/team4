'use strict';

require('dotenv').config();

exports.NODE_ENV = process.env.NODE_ENV;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
exports.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

exports.HRUDB_TOKEN = process.env.HRUDB_TOKEN;
exports.HRUDB_URL = 'https://hrudb.herokuapp.com/storage/';
exports.HRUDB_RETRIES_COUNT = 5;
exports.HRUDB_REQUEST_TIMEOUT = 2000;
