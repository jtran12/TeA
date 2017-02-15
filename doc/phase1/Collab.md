# Collaboration

### Team Members

1. **Name:** Vera Sipicki

    **Experience:** CSC301 final project, CSC309 final project, Wordpress, CSC400+ courses,

    **Strengths:** Works consistently and daily, willing to pull many all-nighters to get an application working

    **Skills:** Node.js, MongoDB, PostgreSQL, MySQL, Handlebars, Mustache, Jade, C#

    **Schedule (Free):** M, T, R before 4; W, F after 5; Weekends any time

2. **Name:** Jason Tran

    **Experience:** Software industry experience in the security sector, CSC454 project and pitch experience

    **Strengths:** Good presentation skills, good communication skills

    **Skills:** Node.js, AHK, MongoDB, Ruby, React, angularjs

    **Schedule (Free):** generally weekends, Thursdays, and an hour after lecture 5-6

3. **Name:** Ayodeji Oyewole

    **Experience:** Over 2 years of work experience at IBM, Bell Mobility; Team experience in CSC309, CSC301, CSC458

    **Strengths:** Software architecture planning, experience with both front-end and back-end

    **Skills:** Ruby, PHP, Python, MySQL, DB2, JavaScript, Ajax, Django, jQuery

    **Schedule (Free):** M, T, F: Before 1pm & After 5pm; W: N/A; R: Before 3pm & After 6pm; Weekends: All day

4. **Name:** Andrew Xia

    **Experience:** Significant work experience with large scale systems in both industry and research contexts.

    **Strengths:** Organization and management skills

    **Skills:** Java, Node.js, AngularJS, C#, Python

    **Schedule (Free):** typically weekends or afternoons

5. **Name:** Tony Hongjin Lee

    **Experience:** Currently up to one year in startup from UofT Hatchery program for a mentoring platform.

    **Strengths:** Desire to learn and implement best practices.

    **Skills:** Javascript, Angular2, ngrx, SQL

    **Schedule (Free):** Tuesdays (after 4pm) and Friday (after 5pm) and all day Saturday.

6. **Name:** Ken Wei Lee

    **Experience:** Multitude of group projects in 300 and 400 level courses

    **Strengths:** Management, Co-ordination, Communication, Initiative

    **Skills:** Node.js, PostreSQL, MySQL, Java, C, Python

    **Schedule (Free):** Always free, all the time.

7. **Name:** Timothy Pan

    **Experience:** Past projects with Nodejs and Ruby on Rails

    **Strengths:** Carryover knowledge from past projects

    **Skills:** Nodejs, Ruby on Rails, jQuery, Postgres

    **Schedule (Free):** Early mornings and evenings


### Past Meetings

**When:** Every Monday, Friday, 5-6

**Where:** Bahen (Great Hall, BA1200, and when desperate, the hallways), Gernstein booked rooms

**Total hours met:** Met approximately 8 hours total in the span of the last three weeks.

#### January 30th
Everyone met and introduced themselves to the team. This meeting's purpose was briefly figuring out which project to work on (TA coordination application or an idea of our own), and figuring out what experiences/skills each team member had. We also established our own development method with one member being the general team leader, one member being the back-end leader and one member being the front-end leader. This was chosen to not only improve communication but organization as well. Keeping track of what 3/4 members are doing is much more efficient than keeping track of all 7. The back-end and front-end leader would communicate with each other on the integration of both portions.

Estimated time: ~30 minutes

#### February 3rd
Everyone met up once more to discuss how to split up the TA selection system into services and what our team/learning goals are. Each point in the use cases and it's corresponding implementation was discussed. The team leader then discussed our ideas with the TA in order to receive feedback on how to improve them. Furthermore, the team also discussed a change from the previous platform decided, Django, to Node.js in order to increase compatibility between our API and the back-end framework.

Estimated time: ~1+ hours

#### February 6th
Most of the team was able to make it to the meeting to discuss plans for setting up and hosting the actual application. It was decided to use Heroku (after asking the professor to change our Github repository to public). Additionally, the team began to work on the Swagger documentation. At the end of the meeting, one member was responsible for setting up a server to host the Swagger document so that everyone could work on it simultaneously. However not much could be accomplished without receiving the example JSON format, the format of the database schema, and access to Jira. The team leader was given the task to ask the professor for all the information necessary to plan the API.

Estimated time: ~1+ hours

#### February 10th

The team mainly finalized the scope of the project. The member responsible for the front-end design presented their mockups and other members critiqued it.

Estimated time: 1 hour

#### February 14th
The whole team showed up to finish designing the API and to document it in OpenApi format using Swagger. The Use Cases were thoroughly examined to allow the team to create all necessary fields for the JSON objects the application will use. Also the routes were created for the RESTful API that correspond to each use case. The Database Schema and table format was also concluded. Everybody decided to break off into groups and assign future tasks.

Estimated time: 3 hours

### Shared Documents

* Google Docs: [Notes](https://docs.google.com/document/d/1F2AfiEcxOFLsu5fYQ2xPJl1_T3tKH10XBU5hBDyPWY8/edit#heading=h.wcyofgdcqjp1) used primarily for documenting every meeting and discussions (and for documentation on our updates in the future)
* Swagger: The API will be documented here and referred to during development

### Future Meetings
In the future, we plan to have meetings at a booked room in Gernstein for privacy. The plan of meeting every Monday and Friday still stands however more days might be added in between depending on the amount of work left to do.  Additionally, we can now meet in two separate groups (back-end and front-end), which allows for easier scheduling.

### Methodology
Our team will be using the Kanban software development methodology for the course of this project. As we have all had experience with Scrum, we decided against it because we felt that the management criteria that would fit best would be "Work in Progress" (WIP). By using this method, we hope to optimize not only the flow of work items but team cooperation as well. Since every column on the Kanban board represents a WIP limit, we can ensure that the whole team will be helping to clear the state bfefore permitting new work items. This allows us to organize our minimum viable product (MVP) better since we will not be working all over the place but in a more organized method. Each state will represent a substantial portion of the application such as a group of use cases.

Unfortunately the Scrum methodology is too structured for the given time constraints. The use cases were optimized to act similar to a Scrum backlog. And since the design was created thoroughly, each team member has a high understanding of their work items. The work items were split in a method that allowed them to be independent of one another which eliminates the need to use Scrum's synchronization benefits.

### Strategy for Dividing Work
For the beginning of the project, we divided the write ups, wireframes, test research and basic application set up (database, server) equally. Designing the API was only done when all group members were present

We divided the team into front-end and back-end groups, 3 and 4 members respectively, by taking into account preferred work and experience. Front-end will split up their goals by assigning each member to work on a specific view. Back-end will split up their goals by assigning each member to a particular route of the API. Each back-end member will be responsible for programming the HTTP methods for RESTful APIs for one the following routes: applicants, applications, courses. The last member of the back-end will begin to work on the  recommendation system for TA selection. Lastly, one member will usually work on taking notes of all plans during each meeting and posting them on Google Docs.

### Github
Each member will be responsible for creating tests before each job is implemented/completed. Also each member will be working on separate branches and merging with the main only if they have tested and completed the task successfully.

There will be two CI people in the group that will ensure flawless integration: the front-end leader and the back-end leader.

### Messaging
* Slack: [Group](https://csc302projectgroup.slack.com/) where most of the discussion, development, and meeting times are posted/pinned
* Facebook/email: General way to contact one another

### Tracking Progress
Since we were all enthusiastic about learning how to use JIRA, we would like to use it to limit WIPs and track story cards, issues and bugs. By keeping track of the Kanban board, we will be able to identify bottlenecks in the progress visually and improve our process in order to avoid them in the future. JIRA will be integrated with Github for ease of use. Since it is able to visualize team performance through flow diagrams and control charts, we will use that to get a good idea of our progress and it will be included in our documentation for reference.

Alternatively if JIRA cannot be made available, we will use Github and it's issues to track all of our story cards, issues and bugs. Github also supports visual graphics of progress through commit activity, code frequency, and impact charts so we will use those. We will also track issues opened/closed and create burndown charts.
