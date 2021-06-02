const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var listsall = [];

async function getitems(URL) {
	try {
		const { data } = await axios.get(
			URL
		);
		
		const $ = cheerio.load(data);
		const list = [];

		$('p[data-testid=listing-card-price]').each((i, el) => {
			// Insert empty objects into list
			list.push({});
			list[i].price = $(el).text().trim();
		});

		$('span[itemprop=streetAddress]').each((i, el) => {
			list[i].address = $(el).text().split(',')[0].trim();
		});

		$('span[itemprop=addressLocality]').each((i, el) => {
			list[i].locality = $(el).text();
		});

		$('span[itemprop=addressRegion]').each((i, el) => {
			list[i].state = $(el).text();
		});

		$('span[itemprop=postalCode]').each((i, el) => {
			list[i].postalCode = $(el).text();
		});
		
		$('link[itemprop=url]').each((i, el) => {
			list[i].url = $(el).attr('href');
		});

		$('span.css-693528').each((i, el) => {
			list[i].type = $(el).text();
		});

		$('[data-testid=property-features]').each((i, el) => {
			list[i].features = $(el).text();
		});
		
		$('span.css-1nj9ymt').each((i, el) => {
			// e.g. "Sold by private treaty 31 May 2021"
			list[i].sold = $(el).text();
		});
		
		listsall.push(list)
		return list;

	} catch (error) {
		throw error;
	}
};


const suburbs = [
    'victoria-park-wa-6100',
	'east-victoria-park-wa-6101',
	'st-james-wa-6102'
]

const suburbsString = suburbs.join(',');

var target = [];

for(var i = 1; i<6; i++) {
	let url = `https://www.domain.com.au/sold-listings/?suburb=${suburbsString}&ptype=house&bedrooms=3-any&excludepricewithheld=0&page=${i}`
	target.push(url)
}

console.log(target);

var outputLocation = "E:\\Dyota\\OneDrive\\Projects\\Web\\web-scraper\\Outputs\\"

async function getAll() {
	for (var i=0; i<target.length; i++){
		await getitems(target[i]);
	};
	
	content = JSON.stringify(listsall);
	
	fs.writeFileSync(outputLocation + "sold_" + new Date().toISOString().split('T')[0] + ".json", content);
	console.log(listsall)
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