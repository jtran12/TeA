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

### Preliminary Database Tables

The image below displays the preliminary tables planned for the Postgres database that will be used to hold all of the data used for this service.

#### Applicants  
TA applicants personal information and TA history is stored in this table. TA's are identified by their utorid. If they do not have one, they will be assigned a random id generated from their first and last name until they have recieved an official utorid to enter. The courses they have accepted and declined TA offers for will be saved for future reference.

#### Courses  
Stores the requirements for one course. The course is identified by the course code term, however that data is also available individually in order to allow searching for specific courses across terms, or all courses within one term.

#### Applications  
Stores applications TAs have submitted for a course. Keeps track of the status of the application, such as if an offer has been extended and the TA's response. 

#### Groups  
Allows admin to create groups of students for planning purposes. For example, this could be used to keep track of TA's who frequently TA the same course, or to present candidates to instructors for their opinion. Only the utorids are saved since the full profiles can be easily accessed.

![](https://lh3.googleusercontent.com/1gLVXiaeO3V8WP8mdbIRM1-MUbU0kZaCe8XixwP1D2wIPdIS2TlLHs-2l4qz9sve7sCqE2bHhQ7_K9oVxFP3sBR_KrTe4pnwYu196FUt5S58PR8QVvNKg41uEK9HlEkjUedx=w478-h618-no)
