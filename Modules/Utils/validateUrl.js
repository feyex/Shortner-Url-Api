
module.exports.ValidateUrl = (url) => {
    let urlValid = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (urlValid !== null)
   
}

module.exports.makeUrl = (url) => {
    const stringToAdd = 'https://'
    const index = url.indexOf('www');
    const result = url.substring(0, index) + stringToAdd + url.substring(index, url.length);
    return result;
}
