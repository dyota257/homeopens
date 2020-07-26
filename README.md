# Home opens web scraper
## Intro 
This is a web scraping sequence that takes information from realestate.com and compiles it into an Excel spreadsheet. 

[realestate.com.au](https://www.realestate.com.au/) offers a search on inspection times for home opens. The goal was to produce a table in MS Excel that lists all the inspections occuring on a selected date for a range of target suburbs. 

This sequence achieves this by:
- Compiling a list of target URLs within MS Excel, by concatenating a https URL  with the required parameters
- Retrieving all the HTML data from each target URL
- Parsing it and collecting all the desired information into a text file
- Reconstituting the text file in an Excel-readable table

This method requires Node.js, the Axios and Cheerio JavaScript libraries, and Power Query within MS Excel. 

# Flaws/possible future improvements
## JavaScript output is not a table
The current output from the crawler.js script is a text file that is a "stringified" array, which is not readable by Excel. An ideal goal would be to produce as close to a table format as possible using the JavaScript script, such as a .csv file. This would negate the extensive use of Power Query to reconstitute a table.

Another potential option is to output the results in a JSON format, which Power Query can readily accept and turn into a table. This would have required more prudent use of JavaScript Objects within the script.

## No need to send in an array of target URLs
The realestate.com.au home open search engine is able to take multiple suburbs at once. 

The target URL array can be made into a single string. 

## The process is takes two steps
First, run "node crawler.js" in the terminal. 

Then, refresh the Power Query in Excel. 

Ideally, it would take one step to refresh. 