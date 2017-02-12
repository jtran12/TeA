# Architecture
======

The overall system will be divided between three main components as follows:

### TA Coordinator Service

The TA Coordinator will be built with NodeJS under the Express framework. Through its API, it will receive requests from an outside Applicant API and send requests to the Applicant Recommendation Service. The service will cover all the use cases for the TA Coordinator.