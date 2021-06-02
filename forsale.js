const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var homeopensall = [];

async function gethomeopens(URL) {
	try {
		const { data } = await axios.get(
			URL
		);
		
		const $ = cheerio.load(data);
		const homeopens = [];

		$('p[data-testid=listing-card-price]').each((i, el) => {
			// Insert empty objects into homeopens
			homeopens.push({});
			homeopens[i].price = $(el).text();
		});

		$('span[itemprop=streetAddress]').each((i, el) => {
			homeopens[i].address = $(el).text();
		});

		$('span[itemprop=addressLocality]').each((i, el) => {
			homeopens[i].locality = $(el).text();
		});

		$('span[itemprop=addressRegion]').each((i, el) => {
			homeopens[i].state = $(el).text();
		});

		$('span[itemprop=postalCode]').each((i, el) => {
			homeopens[i].postalCode = $(el).text();
		});
		
		$('link[itemprop=url]').each((i, el) => {
			homeopens[i].url = $(el).attr('href');
		});

		$('span.css-693528').each((i, el) => {
			homeopens[i].type = $(el).text();
		});

		$('[data-testid=property-features]').each((i, el) => {
			
			homeopens[i].features = $(el).text();
		});
		
		$('span[itemprop=startDate]').each((i, el) => {
			homeopens[i].startTime = $(el).attr('content');
		});

		// console.log(homeopens)
		homeopensall.push(homeopens)
		return homeopens;

	} catch (error) {
		throw error;
	}
};


var target = [];

for(var i = 1; i<=5; i++) {
	let url = `https://www.domain.com.au/sale/?ptype=house&bedrooms=3-any&price=500000-1000000&excludeunderoffer=1&sort=dateupdated-desc&state=wa${i!=1?`&page=${i}`:``}`
	target.push(url)
}

console.log(target);

var newString = "";
var outputLocation = "E:\\Dyota\\OneDrive\\Projects\\Web\\web-scraper\\Outputs\\"

async function getAll() {
	for (var i=0; i<target.length; i++){
		await gethomeopens(target[i]);
	};
	
	var newEnd = JSON.stringify(homeopensall);
	
	newString = newString + newEnd;
	fs.writeFileSync(outputLocation + "forsale_" + new Date().toISOString().split('T')[0] + ".json", newString);
	console.log(homeopensall)
}

getAll();




// for (var i=0; i<target.length; i++){
// 	gethomeopens(target[i])
// 	.then((homeopens) => {
// 		var newEnd = JSON.stringify(homeopens);
		
// 		
// 		
// 	});
// }

// output = fs.readFileSync(outputLocation + "output.txt", "utf-8");
// output = output.split("][").join(String.fromCharCode(10));
// output = output.split("\",\"").join("\""+String.fromCharCode(10)+"\"");
// console.log(output);
// fs.writeFileSync(outputLocation + "outputInspections.txt", output);