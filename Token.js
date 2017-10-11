
class Token {

    constructor(token, clientId){
        this.token = token;
        this.clientId = clientId;
        if (token) {
            try {
                const parts = token.split('.');
                this.header = JSON.parse(new Buffer(parts[0], 'base64').toString());
                this.content = JSON.parse(new Buffer(parts[1], 'base64').toString());
                this.signature = new Buffer(parts[2], 'base64');
                this.signed = parts[0] + '.' + parts[1];
            } catch (err) {
                this.content = {
                    exp: 0
                };
            }
        }
    }

    isExpired() {
        return ((this.content.exp * 1000) < Date.now());
    };

}

module.exports = Token;