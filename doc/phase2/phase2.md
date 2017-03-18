# Phase 2 Technical Progress Report

## Table of Contents

- [Current Build](#current-build)
- [Product Design](#product-design)
- [Technical Highlights](#technical-highlights)
- [Teamwork](#teamwork)
- [Triage](#triage)

# Current Build

- What did you actually build during this phase?
    - How is this different from what you originally proposed? Why?

# Product Design
- High-level design of your software.

# Technical Highlights

- Technical highlights: interesting bugs, challenges, lessons learned, observations, etc.

#### Bugs

1.
> Error: Can't set headers after they are sent to the client

One bug that a few of our members came across was the inability to send several json objects to the client.

How we ran into it: 
```javascript
    if (err) {
      sendError(res, 400, err);
    }
    sendError(res, 404, "Course not found");
```
And similar code.

Explanation: In the worst case, the sendError callback gets called and the response is set in the callback (```res.status(errorCode).send(json);```). However after the function is completed, it is not returned and it continues to the method outside of the if statement which proceeds to send the response again. The res objects in Express don't allow headers to be edited when you're in the Body or Finished state.

Fix: Use if/elseif/else statements to avoid confusion. Alternatively use next() or return to exit the function.


#### Challenges

> Client set-up



> Setting up Automated Tests

On the front-end side, most of the auto-testing frameworks and code linter framworks were set up with the click of a button but it wasn't as simple for the back-end. When deciding which frameworks to use for back-end, we had to take into account what kind of tests we would be writing (unit tests, end to end tests).


# Teamwork
- Reflect on your teamwork and process. What worked well, what  needs improvement.
    - Ideally you will have specific artifacts from your development process to show (for instance, a burndown chart)

# Triage
- What will you build for phase 3, the final demo?

