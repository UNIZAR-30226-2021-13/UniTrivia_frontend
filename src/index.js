import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//const config = require('./config');
//const logger = require('./logger');
//const ExpressServer = require('./expressServer');
//const bd = require('./utils/DatabaseConnection.js');
//const bd = require('../utils/DatabaseConnection.js');
/*
const launchServer = async () => {
    try{

        bd.iniciar("mongodb://localhost:27017", "UniTrivia");
        logger.info("Pool Connection initialized");
    }catch (err){
        logger.error("Cannot initialize Pool Connection", err.message)
        await this.close();
    }
    try {
        this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
        this.expressServer.launch();
        logger.info('Express server running');
    } catch (error) {
        logger.error('Express Server failure', error.message);
        await this.close();
    }
};

launchServer().catch(e => logger.error(e));
*/

ReactDOM.render(<App />, document.getElementById('root'));