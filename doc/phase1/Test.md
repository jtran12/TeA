Testing
===================

Overview
-------------

We will be following the approach of Test Driven Development (TDD) as well as possibly completing a series of end-to-end tests.

Using a combination of Selenium and perhaps another additional library 
we will be able to write tests that deploy and configure out the application.

An example of an end-to-end test: opening the website, as well as the login form, writing the relevant login and password in the forms provided and after submission the result is checked.

This type of testing is important in the context of web development as there are many
layers, technologies, and languages. This allows us to ask whether or not our application is easily and quickly deployed, whether sessions are well persisted or help figure out if our URLs are working as expected.

This testing ensures that data integrity is maintained between various system components and systems.

Along with this, having set up the aforementioned and later unit tests. We can utilize continuous integration (CI) with either travis or Jenkins (probably travis) in order to run tests for each commit.

Travis
-------------

Using the .travis.yml file in our repo we set it up specifying the language as node_js.
We will need to tell Travis CI to start monitoring our project in the travis profile page.
Having a status button for travis for the README.md would also be helpful in letting people know that the project passes unit tests
however, it is not required.


Test Driven Development
-------------

Before building features, we write tests that fails but falls within the requirements of the features. When the test cases pass, the code has ensured that it does not break/degrade existing features. The code is then refactored and improved upon, and is re-ran with the test cases which ensures that the process is not altering any existing functionality.

Continuous integration will help by also providing revertible checkpoints in case of failure.

As well as the aforementioned notes, every member of the group must do a complete build and run (and pass) all unit tests before committing changes. Integration tests will be ran automatically on travis when it detects a new commit
