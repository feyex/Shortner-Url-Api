
const shortId = (len) => {
    return Math.random().toString(36).substring(2,len+2);
   
}

module.exports = shortId ;