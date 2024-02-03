function internalServerError(res, message) {
    console.log("Error: "+message);
    const messageFormatted = message.replace(/ /g, '+');
    const path = `/error?code=500&title=Internal+Server+Error&message=${messageFormatted}`;
    return res.redirect(path);
}

module.exports = {
    internalServerError,
}