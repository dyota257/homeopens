const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const gethomeopens = async (URL) => {
	try {
		const { data } = await axios.get(
			URL
		);
		
		const $ = cheerio.load(data);
		const homeopens = [];

		$('a.name').each(( _idx, el) => {
			const homeopen = $(el).text()
			homeopens.push('Address: ' + homeopen)
		});

		$('a.name').each(( _idx, el) => {
			const homeopen = $(el).attr("href")
			homeopens.push('Link: https://www.realestate.com.au' + homeopen)
		});

		$('li.type').each(( _idx, el) => {
			const homeopen = $(el).text()
			homeopens.push('Type: ' + homeopen)
		});

		$('img[alt="Bedrooms"]').each(( _idx, el) => {
			const homeopen = $(el).parent().text()
			homeopens.push('Bedrooms: ' + homeopen)
		});

		$('img[alt="Bathrooms"]').each(( _idx, el) => {
			const homeopen = $(el).parent().text()
			homeopens.push('Bathrooms: ' + homeopen)
		});

		$('img[alt="Car Spaces"]').each(( _idx, el) => {
			const homeopen = $(el).parent().text()
			homeopens.push('Car Spaces: ' + homeopen)
		});

		$('div.times > ul > :nth-child(2)').each(( _idx, el) => {
			const homeopen = $(el).text()
			homeopens.push('Time: ' + homeopen)
		});

		$('p.priceText').each(( _idx, el) => {
			const homeopen = $(el).text()
			homeopens.push('Price: ' + homeopen)
		});

		return homeopens;

	} catch (error) {
		throw error;
	}
};

var target = [
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-east+perth,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-subiaco,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-north+perth,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-victoria+park,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-burswood,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-mount+lawley,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-south+perth,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-bayswater,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-claremont,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-midland,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-highgate,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-west+perth,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-leederville,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-inglewood,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-fremantle,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-myaree,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-daglish,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-lathlain,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19",
	"https://www.realestate.com.au/buy/property-house-with-3-bedrooms-between-400000-750000-in-mount+hawthorn,+wa/inspection-times-1?maxBeds=4&inspection-date=2020-07-19"
];

var newString = "";
var outputLocation = "E:\\Dyota\\OneDrive\\Projects\\Web\\Home opens scraper\\Outputs\\"

for (var i=0; i<target.length; i++){
	gethomeopens(target[i])
	.then((homeopens) => {
		var newEnd = JSON.stringify(homeopens);
		
		newString = newString + newEnd;
		fs.writeFileSync(outputLocation + "output.txt", newString);
	});
}

output = fs.readFileSync(outputLocation + "output.txt", "utf-8");
output = output.split("][").join(String.fromCharCode(10));
output = output.split("\",\"").join("\""+String.fromCharCode(10)+"\"");
console.log(output);
fs.writeFileSync(outputLocation + "outputLines.txt", output);