#!/usr/bin/env node
/**
 * https://www.mediawiki.org/wiki/citoid
 */

var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var request = require('request');

//Currently picks out contents of <title> tag only
//returns list of json obj (i.e. body)
var scrapeXpath = function(url, callback){
	var json = { title : "", url: url};
	request(
		{
			url: url, 
			headers: {'user-agent': 'Mozilla/5.0'},
			//followRedirect: false 
		}, function(url, response, html){
			var doc = new dom().parseFromString(html);
			var titleValue = '';
			try {
				titleValue = xpath.select("//title/text()", doc).toString();
			}
			catch (e){}
			json.title = titleValue;
			var body = [json];
			callback(body);
	});
}

var scrape = scrapeXpath;

if (require.main === module) {
	var sampleUrl = 'http://www.mediawiki.org';
	console.log('scrape fcn running on sample url:'+sampleUrl)
	scrape(sampleUrl, function(body){
		console.log(body);
	});
}

module.exports = {
	scrape: scrape
};