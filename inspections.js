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

		$('span[itemprop=streetAddress]').each((i, el) => {
			// Insert empty objects into homeopens
			homeopens.push({});
			homeopens[i].address = $(el).text();
		});

		$('p[data-testid=listing-card-price]').each((i, el) => {
			homeopens[i].price = $(el).text();
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
		$('span[itemprop=endDate]').each((i, el) => {
			homeopens[i].endTime = $(el).attr('content');
		});

		// console.log(homeopens)
		homeopensall.push(homeopens)
		return homeopens;

	} catch (error) {
		throw error;
	}
};


const suburbs = [
    "victoria-park-wa-6100",
    "east-victoria-park-wa-6101",
	"maylands-wa-6051"
]

var dates = [];

for(var i = 0; i<=7; i++) {
    let today = new Date();    
    let dayN = today.setDate(today.getDate() + i);
    let dateN = new Date(dayN);
    if(
        [0, 6].indexOf(dateN.getDay()) != -1
    ){
        let dateString = `${dateN.getYear() + 1900}-${(dateN.getMonth()+1).toString().padStart(2, "0")}-${(dateN.getDate()).toString().padStart(2, "0")}`
        dates.push(dateString)
    }
}

var target = [];

for(var i = 0; i<dates.length; i++) {
	for(var j = 1; j<=2; j++) {
		for(var k = 0; k<suburbs.length; k++) {
			let url = `https://www.domain.com.au/sale/${suburbs[k]}/inspection-times/?inspectiondate=${dates[i]}&ptype=house&bedrooms=3-any&page=${j}`
			target.push(url)
		}
	}
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
	fs.writeFileSync(outputLocation + "inspections.json", newString);
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