module.exports.checkParams = (res, ...params) => {

    for (let i = 0; i < params.length; i++) {

        if (params[i] == null) {
            console.log('Error : some parameters are not given');
            res.statusCode = 412;
            res.send("ERRORS.MISSING_FIELDS");
            return false;
        }
    }
    return true;
}

module.exports.errorFunct = (serviceName, error, res) => {

    if (error.status === 500) {
        console.log(`Error when request ${serviceName}`);
        console.error(error);
    }

    res.statusCode = error.status;

    if (error.message != null) {
        res.send(error.message);
    } else {
        res.send("ERRORS.UNKNOWN");
    }
}