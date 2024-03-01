# Fetch Posts Google Sheets Script

This script is designed to fetch post data from a WordPress site and populate a Google Sheet with this information, including publish dates, links, titles, and author names. It utilizes Google Apps Script associated with a Google Sheets document to automate data retrieval and processing. Notably, the author name retrieval utilizes the Yoast SEO plugin.

## How to Use

To use this script in your Google Sheets, follow these simple steps:

### Preparing Your Google Sheets

1. Open or create a Google Sheets document where you want the WordPress post data to be stored.
2. Name a sheet "Post - Publish Dates" or update the `sheetName` variable in the script with your preferred sheet name.

### Adding the Script to Google Sheets

1. From your Google Sheets document, navigate to `Extensions` > `Apps Script`.
2. Copy the entire provided script into the script editor that opens up.
3. Save the script with an appropriate name, like `FetchWordPressPosts`.

### Customizing the Script

1. Modify the `url` variable inside the `fetchPosts` function to point to the WordPress site API you wish to fetch posts from. The `url` is currently set as `"https://changeme.com/wp-json/wp/v2/posts?_fields=date,link,title,yoast_head_json&per_page=100&page=" + page`; replace `"https://changeme.com"` with your WordPress site's base URL.
2. If necessary, adjust the `dataStartRow`, `numColumns`, or any other variable to match your specific requirements.
3. **Adjusting Fields**: To add or remove fields fetched by the script, update the `_fields` parameter in the API URL within the `fetchPosts` function. For example, to add an `excerpt` field, append `,excerpt` to the list of fields in the URL.

### Running the Script

1. Back in the Google Sheets UI, click on the play/run button in the Apps Script editor to manually trigger the `fetchPosts` function.
2. Grant the necessary permissions when prompted. These permissions are required for the script to interact with the external WordPress API and modify the contents of your Google Sheet.
3. Once executed, the script will fetch posts from the configured WordPress site and populate them in the specified sheet.

## Important Notes

- This script clears content starting from row 2 every time it runs to ensure data is fresh. Adjust this behavior in the script if necessary.
- The author names are fetched using the Yoast SEO plugin, which should be active and properly configured on your WordPress site. If your authorship data is stored differently, you might need to adjust the part of the script that handles author name retrieval.
- Ensure the Google Sheet and the script have the necessary access permissions set to let the script run successfully.
- If you encounter any issues with data not appearing correctly, double-check the API URL and the structure of the data being returned by the WordPress site.

By following these instructions and adjustments, you should be able to successfully customize the fetching and recording of WordPress post data into your Google Sheets document to meet your specific requirements.
