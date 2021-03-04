class URLShortener {

    constructor (originalURL) {

        this.originalURL = originalURL;
        this.clickCount = 0;

    }

    // Returns Short URL
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
    expand(urlData, shortUrlPassIn) {
        
        let originalUrl;

        for (let i = 0; i < urlData.length; i++) {
            if (urlData[i].shortURL === shortUrlPassIn) {
                originalUrl =  urlData[i].originalURL;
                console.log(urlData)
                break;
            }
        }
        return originalUrl;
    }

    // Updates Click count
    updateClickCount() {


        this.clickCount += 1;

    }
}

module.exports = {URLShortener}
