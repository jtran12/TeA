# Architecture

![](https://github.com/csc302-2017-spring/proj-ItWorkedYesterday/blob/master/doc/phase1/AppUML.png?raw=true)

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

![](https://lh3.googleusercontent.com/kmshrj88Y0NSDhJ496_EVoMJr_4NfBzEDUzVlnCOgvyrvVDejaGd7bcumEpuObs-GZXnXNr0uO7lTzT4U7LjCplb5I9xhOzaYRAGrQbKr6BP8XKw9bvVer8597SjWpRSut3W_cyMxxFh6u-b8PY6u91Dc6GDsvTXPz3A-N1vwg8z9NSVAhdNAJDkdub91EuxkuF9TfIeMksum8JCiwaBF_XNEcLxmktjvOx6Pj5wrCcoz1JX_agJC3O6NZ1NE8_xiudNHUym1SqDWw3A6Aoge1cQwUm4wm3iDRnR2aWDhvSk7hk6i5mHwQAEIB8U-WQDhHUKdBSjpitsYehvy3W_6r0Z-_ctpj_tWwJfcfqGHt-8ez89fYD_c9leoOAgbSXCHYA_WICExcpI0o6KZIpu72MRQB3UjACtv9awBCglrx4szkSB4N-SDZ1YAGlw64d1PioMZs7OUVMFqR_de7K6yddwoAwwyKrggnwjiPQ0fjbBiJtZF81yV9s5wsoW26LelKDUkQOnr5_8f3tVX49zt2qz3InENt852il7hyS2zpCPXLUBHOf1B0QiSRBk91zI8JryZfT5D23AI5vIW4035lE_lHUpHR5SEVPVpKjQnhsB_8wve0msuDBhJYI5A9Sa5Mj5iK3RcWKn43Q3EZB2ckG83sxgs_TVM1LIB8hFWA=w553-h716-no)
