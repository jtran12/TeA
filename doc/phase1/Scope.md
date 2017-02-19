# Scope

### TA Coordinator Use Cases

Given the short time frame, we have decided to focus on the TA coordinator use cases (all 18 of them). The TA coordinator uses the app more than anybody else and also the flaws of the current app are more of a burden for the TA coordinator than it is for anybody else. For that reason, as well as the limited timeframe, the team is focusing on making life easier for the TA coordinator. The 18 use cases are listed as follows (from the [Project Design Docs](https://docs.google.com/document/d/1mMzftOX5ZxIOPUSbbPDUZ0gfxyL19G214vNByqlELkk/pub)):

1. Enter, upload, or call out on API for courses for term
	* Route: /course/
	* RESTful methods: GET, POST
	* Input (fields): Course name, course code, time, session (F, S, Y), Instructor Name, Enrollment limit
	* Output: similar to input but returned in JSON format
2. Enter “ad” requirements and qualifications for each course
	* Route: /course/
	* Refer to 1
	* Input: text field of requirements and qualifications which will be parsed when 	filtering possible TAs
3. Enter instructor assignment
	* Route: /course/
	* Refer to 1
	* Input: text field containing name of instructor
4. Enter projected course enrollment
	* Route: /course/
	* Refer to 1
	* Input: text field containing the projected course enrollment limit
5. Enter instructors requests, anti-requests
	* Route: /course/
	* Refer to 1
	* Input: 
6. Reject applicant
	* Route: /course/
	* RESTful methods: POST
	* Input: checkboxes or click/drag to reject given applicants
7. Unreject applicant
	* Similar to 6
8. Assign set of applicants to course
    * Route: /course/ 
    * RESTful methods: POST
    * Similar to 7 except we are accepting an applicant, not cancelling a reject
9. Identify named set of applicants
    * Route: /course/
    * RESTful methods: GET
    * Note: This set could be a list of filtered TA applicants
10. Share named set of provisional applicants (presumably for discussion with course instructor)
    * Route: /course/
    * RESTful methods: POST
11. Search for unassigned applicants

	a. By previous experience
	
    b. By program
	
    c. By preferred courses
	
    d. By year of program
	
    e. By courses applicant has taken in the past
	
    f. By arbitrary other fields in Applicant records.
	
    g. Heretofore rejected
	
    h. By grad vs UG
	
    i. By whether applicant has been offered and declined a course in the past
	
    j. By whether applicant applied on time.
    
    * Route: /applicants/
    * RESTful method: GET
    * Returns a list of all the applicants with this information
    * Input: checkboxes with all fields listed above/query
    
12. See applicant record (all information applicant entered)
    * Route: /applicant/
    * RESTful method: GET
    * Will be called often throughout API, make sure it sends detailed JSON object back
13. Flag applicant as ever having declined offer
    * Route: /applicant/
    * RESTful method: POST
    * Input: Button or checkbox for flagging
    * Allow profs to flag/unflag the applicant as well
14. Unassign applicant(s) to course
    * Route: /applicant/
    * RESTful method: POST
    * Input: Checkbox or the life and update
    * Note: Add 'unassigned' as a tag to keep a history and allow profs to revert if they make a mistake
15. Unassign assignees
    * Route: /applicant/
    * RESTful method: POST
16. Move assignee(s) from one course to another
    * Route: /applicant/
    * RESTful method: POST
17. List unassigned applicants
    * Route: /applicants/unassigned
    * RESTful method: GET
18. List openings
    * Route: /course/openings
    * RESTful method: GET

### Assumptions about the Applicant Endpoint
While designing and implementing solutions for the TA coordinator use cases, we would work under the assumption that all the applicant use cases have been implemented and that we have all the required data from the applicant side to use on the TA coordinator side.

As previously mentioned, the team has decided to provide solutions for all 18 TA coord use cases, we also decided to design and implement a recommendation system to assist with TA assignments.

### Recommendation System

Karen Reid mentioned some "rules" she has to follow when considering which applicants to assign to a course, for example in some cases she had to prioritize graduate applicants over undergraduate applicants, applicants in the department of computer science over applicants from other departments. We plan to build a recommendation system that for each course, it makes recommendations to the TA coordinator on which applicants to assign, prioritizing based on the previously mentioned "rules". The current list of rules we have for the recommendation system are:

1. Prioritize graduate over undergraduate applicants.

2. Exhaust list of applicants from the department of Computer science before making offers to applicants from other departments.

3. Prioritize based on how many times an applicant has taught a course in the past.

4. Applicants give a ranking of courses they would like to TA, prioritize based on each applicant’s preferences.

5. Consider that each graduate has to be made at least one offer.

6. Consider that you need to match previous hours of Phd applicants.

7. If given enough time, a rating system where professors can rate the performance of TAs. Highest rating recommended first.

### Learning Goals

The recurring theme regarding learning goals is to gain some experience working with languages and frameworks that are in very high demand in today’s job market. We are also working on our ability to take simple user stories and turn them into software solutions that perfectly satisfies what the user had in mind. Finally, we will be following the Kanban workflow methodology, a first for some of us. The experience working in a Kanban team would be a great reference point when considering its pros and cons in our future endeavours.
