# TeA

[![](https://travis-ci.com/csc302-2017-spring/proj-ItWorkedYesterday.svg?token=5XK2J61kxbWjQQwJaGYo&branch=master)](https://travis-ci.com/)
[![](https://img.shields.io/badge/made%20by-It%20Worked%20Yesterday-blue.svg?style=flat)](https://github.com/csc302-2017-spring/proj-ItWorkedYesterday)
[![](https://img.shields.io/badge/node-v6.10.2-blue.svg?style=flat)](https://nodejs.org/en/download/)
[![](https://img.shields.io/badge/react-v15.0.1-blue.svg?style=flat)](https://facebook.github.io/react/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat)](https://github.com/RichardLitt/standard-readme)

> Because you should not have to use one PHP script to coordinate TAs.

Note: Does not contain full functionality for applicant registration and assumes the data is already entered somehow.


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [User Cases](#user-cases)
- [Authors](#authors)

## Install

This project uses [node](http://nodejs.org), [npm](https://npmjs.com) and [postgreSQL](https://www.postgresql.org).

**node.js**:

```bash
cd ./client
npm install
cd ../server
npm install
```

## Usage

Run the server:

```bash
cd ./server
node server.js
```

And enjoy the front-end website!

## User Cases

The following user cases for the TA-coordination app have been implemented:

1. Enter, upload, or call out on API for courses for term
2. Enter “ad” requirements and qualifications for each course
3. Enter instructor assignment
4. Enter projected course enrollment
5. Enter instructors requests, anti-requests
6. Reject applicant
7. Unreject applicant
8. Assign set of applicants to course
9. Not implemented
10. Not implemented
11. Search for unassigned applicants
    - By previous experience
    - By program
    - By preferred courses
    - By year of program
    - By courses applicant has taken in the past
    - By arbitrary other fields in Applicant records.
    - Heretofore rejected
    - By grad vs UG
    - By whether applicant has been offered and declined a course in the past
    - By whether applicant applied on time.
12. See applicant record (all information applicant entered)
13. Flag applicant as ever having declined offer
14. Unassign applicant(s) to course
15. Unassign assignees
16. Not implemented
17. List unassigned applicants
18. List openings

Extra features implemented:

**Recommendation system**

- Implements a ranking system for applicants on courses
- Whenever a new applicant is posted/edited, the new ranking score is computed for every course
- Top 30 recommended applicants are stored in descending order


These functionalities have been scrapped due to change of focus and prioritizing a polished MVP:
- Use case 9: Identify named set of applicants
- Use case 10: Share named set of provisional applicants (presumably for discussion with course instructor)
- Use case 16: Move assignee(s) from one course to another
- Basic security using OAUTH2
- Sessions saved through cookies, etc

## Authors

- Tim Pan [github/Timpan5](https://github.com/Timpan5)
- Ken [github/Darkmoot](https://github.com/Darkmoot)
- Tony Lee [github/tony-h-lee](https://github.com/tony-h-lee)
- Andrew Xia [github/andrew-x](https://github.com/andrew-x)
- Jason Tran [github/jtran12](https://github.com/jtran12)
- Ayo Oyewole [github/wols13](https://github.com/wols13)
- Vera Sipicki [github/birdievera](https://github.com/birdievera)
