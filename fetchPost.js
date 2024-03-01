function fetchPosts() {
  var page = 1; 
  var allData = []; 
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetName = "Post - Publish Dates"; // Use your specific sheet name
  
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    if (!sheet) {
      Logger.log("Error: Failed to create a new sheet.");
      return;
    }
  }

  var dataStartRow = 2; // Starting from the second row to preserve headers
  var numColumns = 4; // Number of columns you're filling with data
  var lastRow = sheet.getLastRow();
  
  // Clear content from row 2 to last row for the first 4 columns
  if (lastRow > 1) { 
    sheet.getRange(dataStartRow, 1, lastRow - 1, numColumns).clearContent();
  }

  // Ensure headers are in place (this overrides existing headers, but keeps the approach simple)
  sheet.getRange(1, 1, 1, numColumns).setValues([['Publish Date', 'Link', 'Title', 'Author']]);
  
  while(true) {
    var url = "https://changeme.com/wp-json/wp/v2/posts?_fields=date,link,title,yoast_head_json&per_page=100&page=" + page;
    try {
      var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
      var data = JSON.parse(response.getContentText()); 
      
      if(response.getResponseCode() == 200 && data && data.length > 0) {
        for(var i = 0; i < data.length; i++) {
          var post = data[i];
          allData.push([
            post.date, 
            post.link, 
            htmlDecode(post.title.rendered),
            htmlDecode(post.yoast_head_json.author)
          ]);
        }
        page++; 
      } else {
        Logger.log("No more data or error encountered. Stopping at page: " + page);
        break;
      }
    } catch(error) {
      Logger.log("Error fetching page " + page + ": " + error.toString());
      break;
    }
  }
  
  if (allData.length > 0) {
    sheet.getRange(dataStartRow, 1, allData.length, numColumns).setValues(allData);
  }
}

function htmlDecode(input) {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, '\'')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    // Add more replacements as needed
    ;
}
