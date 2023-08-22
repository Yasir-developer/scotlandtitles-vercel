const axios = require('axios')


// export saveAccessToken(accessToken) => {


// }

const generateAccessToken = async (apiKey, sharedSecret, code, shop) => {
    const query = {
        client_id: apiKey,
        client_secret: sharedSecret,
        code: code
    };

    const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
    try {
        const response = await axios.post(accessTokenUrl, query);
        const accessToken = response.data.access_token;
        console.log(accessToken)
        return accessToken;
    } catch (error) {
        console.error(error);
    }
}

module.exports = generateAccessToken