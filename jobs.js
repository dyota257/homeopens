const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var pagesAll = [];

async function scrapePage(URL) {
	try {
		const { data } = await axios.get(
			URL
		);
		
		const $ = cheerio.load(data);
		const entries = [];
		const root = 'https://www.seek.com.au';

		$('a[data-automation=jobTitle]').each((i, el) => {
			// Insert empty objects into entries
			entries.push({});
			entries[i].jobTitle = $(el).text();
			entries[i].url = root + $(el).attr('href').split('?')[0];
		});

		$('span[data-automation=jobListingDate]').each((i, el) => {
			entries[i].jobListingDate = $(el).text();
		});

		$('a[data-automation=jobCompany]').each((i, el) => {
			entries[i].jobCompany = $(el).text();
			entries[i].jobCompanyUrl = root + $(el).attr('href');
		});

		$('a[data-automation=jobLocation]').each((i, el) => {
			entries[i].jobLocation = $(el).text();
		});
		$('a[data-automation=jobArea]').each((i, el) => {
			entries[i].jobArea = $(el).text();
		});
		$('span[data-automation=jobSalary]').each((i, el) => {
			entries[i].jobSalary = $(el).text();
		});
		$('a[data-automation=jobClassification]').each((i, el) => {
			entries[i].jobClassification = $(el).text();
		});
		$('a[data-automation=jobSubClassification]').each((i, el) => {
			entries[i].jobSubClassification = $(el).text();
		});
		$('span[data-automation=jobShortDescription]').each((i, el) => {
			entries[i].jobShortDescription = $(el).text();
		});

	
		// console.log(homeopens)
		pagesAll.push(entries)
		return entries;

	} catch (error) {
		throw error;
	}
};

const jobs = [
    "power-apps",
    "power-bi"
]

var target = [];
const pages = 3;

for(var i = 0; i<jobs.length; i++) {
	for(var j = 1; j<=pages; j++) {
			let url = `https://www.seek.com.au/${jobs[i]}-jobs/in-perth?page=${j}&sortmode=ListedDate`
			target.push(url)
	}
}

console.log(target);

var newString = "";
var outputLocation = "E:\\Dyota\\OneDrive\\Projects\\Web\\web-scraper\\Outputs\\"

async function getAll() {
	for (var i=0; i<target.length; i++){
		await scrapePage(target[i]);
	};
	
	var newEnd = JSON.stringify(pagesAll);
	
	newString = newString + newEnd;
	fs.writeFileSync(outputLocation + "jobs_" + new Date().toISOString().split('T')[0] +  ".json", newString);
	console.log(pagesAll)
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