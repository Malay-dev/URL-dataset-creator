

<br />
<div align="center">
  <h3 align="center">URL Dataset Creator</h3>
</div>

## About The Project

This dataset creator project revolves around web scraping, particularly extracting `<a>` tags (hyperlinks) from a given URL and storing this extracted data in a database. The essence of this project lies in the ability to gather URLs, which can be valuable for various purposes like analyzing links, conducting SEO research, or understanding web structures.

Initially, web scraping involves using tools like Beautiful Soup (in Python) or Puppeteer (in JavaScript) to extract specific information from websites. In this case, the project appears to leverage Puppeteer, a Node.js library that provides a high-level API over the Chrome DevTools Protocol, primarily used for automating web browser interactions.

Puppeteer allows developers to automate tasks related to web page interactions, like navigating to pages, clicking elements, and extracting data. For industrial-scale scraping, Puppeteer offers robust capabilities by running headless instances of a web browser (like Chrome or Chromium) to perform scraping tasks efficiently and at scale.

Here's how Puppeteer generally works:

1.  **Launching Browser Instances**: Puppeteer starts a headless instance of a browser (usually Chromium by default) that can be controlled programmatically.
2.  **Navigation and Interaction**: It navigates to web pages and interacts with them just like a user would—clicking buttons, filling forms, scrolling, etc.
3.  **Extracting Data**: Puppeteer enables extraction of data from the DOM (Document Object Model) by targeting specific elements using CSS selectors or XPath.
4.  **Storing Data**: Once the required data (in this case, the URLs) are extracted, they can be stored in databases or files for further processing or analysis.

Industrial-level scraping often involves running multiple instances of Puppeteer in parallel, handling proxies, managing sessions, and dealing with CAPTCHAs or other anti-scraping measures that websites might employ to prevent automated access.

Puppeteer's strength lies in its flexibility and the ability to execute complex interactions with web pages, making it a powerful tool for various web automation tasks, including scraping large amounts of data for datasets or analyses.

### Built With

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Puppeteer](https://img.shields.io/badge/Puppeteer-00D7A1?style=for-the-badge&logo=puppeteer&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Express.Js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
- ![Jquery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

#### Prequisites

- Docker Desktop
  Installation link - https://docs.docker.com/get-docker/

#### Installation

To run the log ingestor and query interface, you need Docker installed on your system. If you don't have Docker installed, follow the instructions provided [here](https://docs.docker.com/get-docker/) to install Docker for your operating system.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/log-ingestor.git
   cd url-dataset-creator
   ```
2. **Set the Enviornment Variables** - change .env.example &#8594; .env - Get MongoDB credentials
   ```bash
    PORT=3000
    MONGO_USER="root"
    MONGO_PASSWORD="example"
    RABBIT_MQ_USER="root"
    RABBIT_MQ_PASSWORD="example"
   ```
3. **Start the containers:**
   ```bash
   docker-compose up -d --build
   ```
   This command starts all the necessary containers. The `-d` flag runs the containers in the background, and `--build` flag forces the image to be built.
4. **Wait for the containers to be ready:**
   While the containers are starting up, the Node.js app connects to the database and RabbitMQ. You can verify their status by checking the logs using _Docker Desktop_ or running the following command for each instance:
   ```bash
   docker logs -f url_dataset_creator-url-dataset-creator-app-1
   ```
   ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/b65cca78-4431-403b-a582-93d4af863ca9)

5. **Interact with the System:**

   - **HTTP Requests:**

     - Make HTTP POST requests to the `/browse` endpoint to submit the URL to be crawled.
       ```bash
       - POST request
       - Body:
         {
           "link": "https://www.google.com/"
         }
       ```
     - Use HTTP GET requests to the `/browse/url_data` to get the current database stored URLs.
     - Example GET request: `http://localhost:3000/browse/url_data`

     ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/882f1985-0eb7-44e0-8637-a960170e0c8d)


   - **Web UI:**
     - Access the web UI at [http://localhost:3000](http://localhost:3000) in your browser.
       ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/05d72c1a-4b29-4869-bdbc-f7b0937cd2ac)
       ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/0f5290e7-2946-4004-9e4c-566be2b88491)

     - Use this extension https://chromewebstore.google.com/detail/export-historybookmarks-t/dcoegfodcnjofhjfbhegcgjgapeichlf to export your bookmarks/browser history in a _JSON format_

       ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/83af34ea-a015-44df-b69e-bf38f22029b6)

     - Upload this .json file to store those URLs.
       ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/3913adf1-b159-45fa-bc64-eca220a4c14a)


6. **Stopping and Cleaning Up**

   To stop and bring down the Docker containers, you can use the following command:

   ```bash
   docker-compose down -v
   ```

   This command stops and removes the containers. If you want also to delete the volumes and remove all data stored in the database, you can use the -v flag:

## Troubleshooting

If you encounter any issues or have questions, consider the following steps:

- Check the error on container - url_dataset_creator-url-dataset-creator-app-1
  ![image](https://github.com/Malay-dev/URL-dataset-creator/assets/91375797/62a772f3-69fd-42fb-a0df-cedb2b7e5595)

  ```bash
      docker-compose down -v
  ```
  - Delete **tmp** folder from the local copy
  - Now start the containers again
  ```bash
  docker-compose up -d --build
  ```
