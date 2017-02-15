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

![](https://lh3.googleusercontent.com/nlXZLD3Ngm45FbuEAmuzMF4MCRrzu7hXDDxyDbxrVp9amB7d2HbxxE89Jd0E1X3CWCIqHU2JiKqP75WsyaeoL_op0UcG92e_btBloa43800ugejSBPCicIja6YI-oRwT1sSq5XPsGddmiL8Phi0ajtRapj39kbW6qRg9T-pOJE-t6j0U8tgm7rcn2w7OC0LSDjybeUufCHzaTZmUvXbtLrmta-52Ie6kKhv2A1YuTPRDoHqsPjgCMhcrHtNcSIeNtYrnlRadxjRAkJ-peVOMMguxoFzHL1rjNhKOt6ERnzhMWXOVk2j4ldIieWpJ9yRwBJCBAvM_fnKoymFi3z4to5EGQgq_7_1eb-qj4-59hwbLaaXTk9xZa4y4S548uwIdvgl7bUtM5lcxrMixxfZw34SbyzzBm3cLh4A705l8r16UXnmMd8J3hBZqRbMu5Sbdk-vr1MelOfmZ9V6dOFgK0fqEVeTAIlaN_Wz5D3MWURHOOACZO73gOvUNJfKLwzEPz_tH-eKioGz7TRAeoYQjW4qV5BKeH92k8-hZ6CtS72eAyUxvnWalDh-6lYumPy1tDc2wIKv-Z62uH_gUKMRtxkQIt93bC1XM6a0Bp73YGLmGb_5e6h8=w696-h900-no)
