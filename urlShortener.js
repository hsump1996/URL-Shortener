class URLShortener {

    constructor (originalURL) {

        this.originalURL = originalURL;
        this.clickCount = 0;

    }

    // Returns Short URL
    //Protocol: http or https
    //Domain: localhost:3000
    //UniqueString: 6 characters long and Contain only the lowercase alphabets
    //Format: Protocol://Domain/UniqueString
    //Valid Short URL: http://localhost:3000/sdf65x

    shorten() {
        let uniqueString = 'http://localhost:3000/';
        let lettersNumbers = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let lettersNumsLength = lettersNumbers.length;
        
        for (let i = 0; i < 6; i++ ) {
            uniqueString += lettersNumbers.charAt(Math.floor(Math.random() * lettersNumsLength));
        }
        
        return uniqueString;
    }

    // Returns Expanded URL
    expand() {


    }

    // Updates Click count
    updateClickCount() {

        this.clickCount += 1;

    }
}

module.exports = {URLShortener}
