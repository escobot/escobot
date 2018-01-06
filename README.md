<p align="center"> 
 <img src="https://user-images.githubusercontent.com/20388583/27060169-fa6f7d46-4fa8-11e7-88ea-c30f05ef5adb.png">
</p>

### TellMe  
[ ![Codeship Status for pbgnz/tellme](https://app.codeship.com/projects/583c80a0-35a0-0135-20a5-52cee2b34c43/status?branch=master)](https://app.codeship.com/projects/227100)

TellMe is a microservice based Slack bot built with Node.js. 

![imageedit_2_4194033671](https://user-images.githubusercontent.com/20388583/27765660-d8410f0a-5e85-11e7-9bbf-6efb139ba055.png)

##### Architecture
TellMe uses Slack's API to get notified when a new message arrives, uses a natural language processor, Wit, to try to understand the meaning of a message, uses self-built applications called microservices to find out what to reply, and send the reply back to Slack.

<p align="center"> 
 <img src="https://user-images.githubusercontent.com/20388583/27765953-5d3d1cf0-5e8e-11e7-9cc7-a3fa719689a2.png">
</p>

##### Resilience
The flexibility and ability to recover. A service registry was used to avoid the hardwiring of the microservices endpoints on the main application and to handle the cases when a microservice fails.

##### Security
TellMe uses endpoint security for their microservices. This means everytime a microservice announces itself to the main application, TellMe, it requires a pre-shared token. TellMe will reply with a service access token and subsequent requests between TellMe and a microservice will use the latter tokken. 

##### Testing infrastructure
TellMe uses the following tools for its testing infrastructure;
- mocha as a test runner
- should as an assertion library
- supertest for the http requests
- istanbul as a test coverage 

##### APIs used
- Slack real time messaging
- Wit.ai's natural language processing
- Google Maps Geocoding
- Google Maps Timezone
- OpenWeatherMap

##### More info
For more info, about the project visit the [wiki](https://github.com/pbgnz/tellme/wiki)
