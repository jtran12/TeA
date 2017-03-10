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

![](https://lh3.googleusercontent.com/bCeJQGXHa-PxZ0862n0WeBmNe4Wp_pZkX6g2a7kE6396IGJ9KTZypvmmGJ8HWe_HT0bUEZaDCdvYNaftE_3HwDpSBmaMZ5EadqGp_dB2XPhLOOtZdovaZHha9jgOs1fOZMigmtatJJu3si6U7Zj7y6FfaTtk_TkKXyejBAr-9Wcco88VWUH59bOddzThrJsrTARB7xdJeYAWFprv-srXtEbTZFnYbn1QolUzNC4FO-RQz1yj9fqDQXWZkZQx7q6vYe27W4sQxI7-UH8o0M3BBU62oqjnZYZ8Qfd86WFo9vFX_okfkKhZV3TYJaWjYaCTgOW8ljaIbp1UCf5DlvmSjCQum4J3dFBSXBuDR2wLlxC6v6bIBMKFxBoEH7JglNzn_OzcDR_wPYUx3wjqOzsy923TijfYg23A4ypn4jbh8mki4VCKpb2tkZWEMgBeAEvRBmZskxgOLp0zolWaOEzU0y_OdXFkp4ggVUM2Q2tVZEqeeJhzR93weIZbeimmpMQzntRQKiLa_C-q3b13zxMHA3-YX37TVlZUBzUr2f9GXWh70n-Gf2KwJf49HEVurEnpQeII4XwhetTXlcFx_lc-IGCUkhoEu6YegHBjRCekyFgpPuta4RxwofEYKVjtResGWW_oUrwqcLGWBTDXNhQl87HgYO5mCmepqF3OLBPAFQ=w730-h944-no)
