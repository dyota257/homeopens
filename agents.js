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

		$('span[itemprop=streetAddress]').each((i, el) => {
			// Insert empty objects into list
			list.push({});
			list[i].address = $(el).text();
		});

		$('p[data-testid=listing-card-price]').each((i, el) => {
			list[i].price = $(el).text();
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
		
		// $('span[itemprop=startDate]').each((i, el) => {
		// 	list[i].startTime = $(el).attr('content');
		// });
		// $('span[itemprop=endDate]').each((i, el) => {
		// 	list[i].endTime = $(el).attr('content');
		// });

		
		listsall.push(list)
		return list;

	} catch (error) {
		throw error;
	}
};


const agents = [
    "tash-welburn-1556522"
]

var target = [];

for(var i = 0; i<agents.length; i++) {
	for(var j = 1; j<=3; j++) {
		let url = `https://www.domain.com.au/real-estate-agent/${agents[i]}/?tab=for-sale&tab-page=${j}`
		target.push(url)
	}
}

console.log(target);

var outputLocation = "E:\\Dyota\\OneDrive\\Projects\\Web\\web-scraper\\Outputs\\"

async function getAll() {
	for (var i=0; i<target.length; i++){
		await getitems(target[i]);
	};
	
	content = JSON.stringify(listsall);
	
	fs.writeFileSync(outputLocation + "agentportfolios.json", content);
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