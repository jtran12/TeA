# Architecture

The overall system will be divided between three main components as follows:

### TA Coordinator Client Application

The TA Coordinator Client Application will be made with React following MVC design and also Redux to ensure unidirectional data flow among client application components. The application will send asynchronous requests to the TA Coordinator Service and display the results through a UI.

Primary Responsibilities:
- Handle all user interactions.
- Present all information in an efficient way.
- Allow HR specialist to see progress at a glance
- Allow HR specialist to sort filter and search through candidates for each position.
- Data from backend will populate pages via AJAX calls.
- Utilize a basic authentication scheme to track current user
- Ensure users only have access to views which they have permission to access.
- Allow downloading of files in human readable format.

### TA Coordinator Service

The TA Coordinator Service will be built in NodeJS under the Express framework. Through its REST API, it will receive requests from an outside Applicant API and send requests to the Applicant Recommendation Service. The service will cover all the use cases regarding courses and terms and communicate with a PostgreSQL database. The TA Coordinator may build a term through the service or call an API that returns a term which the service will use to generate one.

### Applicant Recommendation Service

The Applicant Recommendation Service will be built in Javascript with a NodeJS server receiving requests and sending Applicant data. The service will communicate with a PostgreSQL database and handle only Applicant data. The Applicant Recommendation Service will act as middleware for the TA Coordinator Service.