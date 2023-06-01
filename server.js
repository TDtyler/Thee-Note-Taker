const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.Port || 3001;