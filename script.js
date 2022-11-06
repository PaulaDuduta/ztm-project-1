const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank and replace it with 'Unknown'
  // also if(quote.author === "")
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  //Check the quote length to determine styling -> reduce font size for long quotes
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here

    // if there are any errors you can call for another quote
    getQuotes();
    console.log('whoops, no quote', error);
    // this will set for an infinite loop with this recursive function(when a function calls itself again).
  }
}

// Share a quote on FACEBOOK
function shareQuote() {
  const fbUrl = `https://www.facebook.com/dialog/feed&app_id=paula.duduta&display=popup&link=${quoteText.textContent} - ${authorText.textContent}&redirect_uri=https://facebook.com`;
  window.open(fbUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
facebookBtn.addEventListener('click', shareQuote);

//On Load
getQuotes();
