// Author: Amay Kataria
// Date: 04/26/2022
// File: Database.js
// Description: Helper module to handle all database related methods. This module is responsible
// to read, load, commit from the database.

var Pool = require('pg').Pool;

// ------------------ postgresql database ---------------------- // 
//const connString = process.env['DATABASE_URL'];
const connString = 'postgresql://localhost/bundle?user=amaykataria&password=abc123';
console.log('Database Connection String: ' + connString);

const pool = new Pool({
    connectionString: connString
}); 

module.exports = {    
    saveData: function(key, bundle) {
        return onWriteDatabase(key, bundle)
    },

    readData: function(key) {
        return onReadDatabase(key);
    }
}

function onWriteDatabase(key, bundle) {
    // First read the database to see if there's any data.
    let readPromise = onReadDatabase(key);
    let writePromise = readPromise.then(entries => {
        let promise = new Promise((resolve, reject) => {
            // Pre-existing entry in the database. 
            // Overrwrite the current one with this key. 
            if (entries === 'empty') {
                // No entry found, write this into the db. 
                pool.query('INSERT INTO entries (key, bundle) VALUES ($1, $2)', [key, bundle], (error, result) => {
                    if (error) {
                        console.log('Some Error');
                        throw error;
                    }
        
                    console.log('Success: ' + key + ' is new entry in the database.');
                    resolve('Success: New entry with key: ' + key);
                });
            } else {
                pool.query('UPDATE entries SET bundle=$1 WHERE key=$2', [bundle, key], (error, result) => {
                    if (error) {
                        throw error;
                    }
            
                    console.log('Success: Updated entry in the adult database.');     
                    resolve('Success: Key: ' + key + ' exists. Overwriting data.');   
                });
            }
        }); 
        return promise; 
    }); 

    return writePromise; 
}

function onReadDatabase(key) {
    let promise = new Promise((resolve, reject) => {
        pool.query('SELECT * FROM entries WHERE key=$1', [key], (error, result) => {
            if (error) {
                console.log('Some error');
                throw(error);
            }

            console.log('Success: entries table successfully read.');
            let entries = result.rows; 
            if (entries.length > 0) {
                let bundle = entries[0]['bundle'];
                resolve(bundle); 
            } else {
                resolve('empty');
            }            
        }); 
    });
    return promise; 
}