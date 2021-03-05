class URLShortener {

    constructor (originalURL) {

        this.originalURL = originalURL;
        this.clickCount = 0;

    }

    // Returns Short URL
    shorten(longUrl) {
        let uniqueString = 'http://localhost:3000/';
        let lettersNumbers = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let lettersNumsLength = lettersNumbers.length;
        let enterAgain = 'No Parameter found. Please write the long url.';
        

        //Handles the case when there is no input value.
        if (longUrl === '') {
            return enterAgain;
        
        //If the Input was correctly entered, then randomly generate 6 letter + number combination
        } else {

            for (let i = 0; i < 6; i++ ) {
                uniqueString += lettersNumbers.charAt(Math.floor(Math.random() * lettersNumsLength));
            }
            
            return uniqueString;

        }
    }

    // Returns Expanded URL
    expand(urlData, shortUrlPassIn) {
        
        let originalUrl;

        for (let i = 0; i < urlData.length; i++) {
            //Handles the case wherre it only chooses the long URL that matches the short URL
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
