# Metadata Fetcher API

This project is a simple API that fetches metadata (title, description, and image) from a list of URLs provided by the user. The API is built using Node.js, Express.js, Axios, Cheerio, and includes security and rate-limiting features.

## Features

- **Fetch Metadata:** Extracts the title, description, and image from each URL.
- **Rate Limiting:** Limits each IP to 5 requests per second to prevent abuse.
- **Security:** Utilizes Helmet.js to enhance API security by setting HTTP headers appropriately.
- **CORS:** Enabled for cross-origin requests.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/yourusername/metadata-fetcher-api.git
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd metadata-fetcher-api
   \`\`\`

3. Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

## Usage

1. Start the server:

   \`\`\`bash
   npm start
   \`\`\`
