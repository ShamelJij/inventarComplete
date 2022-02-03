import {Database as Localdata} from './database.js';

let f = new Localdata('dienstag');
f.save(null,{ "name": "kim", "time": Date.now()});
console.log('persons here!!!');