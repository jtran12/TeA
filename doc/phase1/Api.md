```
swagger: '2.0'

info:
  version: "1.0.0"
  title: TA-Coordinator

paths:
  /user/login/:
    post:
      description: |
        tests login information to determine if it is correct
      parameters:
        - name: user_id
          in: query
          description: id of user
          required: true
          type: integer
        - name: password
          in: query
          description: password
          required: true
          type: string
          format: password
      responses:
        default: 
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
  /course/:
    post:
      description: |
        Adds a new course.
      parameters:
        - name: course
          in: body
          description: course to add to system
          required: true
          schema:
            $ref: '#/definitions/Course'
      responses:
        default:
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
    get:
      description: |
        Gets a course by id
      parameters:
        - name: id
          in: query
          description: id of course to retrieve
          required: true
          type: integer
      responses:
        200:
          description: returns course desired
          schema:
            $ref: '#/definitions/Course'
        default:
          description: returns error information
          schema:
            $ref: '#/definitions/Success'
    put:
      description: |
        Updates a course
      parameters:
        - name: course
          in: body
          description: course data with updated data
          required: true
          schema:
            $ref: '#/definitions/Course'
      responses:
        default:
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
    delete:
      description: |
        Deletes a course by id.
      parameters:
        - name: id
          in: query
          description: id of course to delete
          required: true
          type: integer
      responses:
        default:
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
  /course/bulk/:
    post:
      description: |
        Mass uploads course data via JSON file that matches format.
      parameters:
        - name: data
          in: body
          description: data to add to system
          required: true
          schema:
            type: array
            items:
              $ref: '#/definitions/Course'
      responses:
        default:
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
    get:
      description: |
        Gets all data in the system formatted in JSON.
      responses:
        200:
          description: operation success, return data
          schema:
            type: array
            items:
              $ref: '#/definitions/Course'
        default:
          description: error information
          schema:
            $ref: '#/definitions/Success'
    delete:
      description: |
        Deletes all current course data in the system.
      responses:
        default:
          description: indicates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
  /applicant/:
    post:
      description: |
        creates a new applicant
      parameters:
        - name: applicant
          in: body
          description: applicant information to create
          required: true
          schema:
            $ref: '#/definitions/Applicant'
      responses:
          default:
            description: indicates operation success, returns error if applicable
            schema:
              $ref: '#/definitions/Success'
    get:
      description: |
        finds and returns applicant identified by id
      parameters:
        - name: student_id
          in: query
          description: student id of applicant to find
          required: true
          type: integer
      responses:
        200:
          description: returns desired student information
          schema:
            $ref: '#/definitions/Applicant'
        default:
          description: returns error information
          schema:
            $ref: '#/definitions/Success'
    put:
      description: |
        updates applicant
      parameters:
        - name: applicant
          in: body
          description: updated applicant
          required: true
          schema:
            $ref: '#/definitions/Applicant'
      responses:
        default:
          description: indcates operation usccess, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
    delete:
      description: |
        deletes applicant by id
      parameters:
        - name: a_id
          in: query
          description: the id of applicant to delete
          required: true
          type: integer
      responses:
        default:
          description: indcates operation usccess, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
  /applicant/filter/:
    post:
      description: |
        gets list of applicants based on filter, offer and limit
      parameters:
        - name: filter
          in: body
          description: options to filter list of applicants
          required: false
          schema:
            $ref: '#/definitions/ApplicantFilter'
        - name: limit
          in: query
          description: limit on number of search results
          required: false
          type: integer
        - name: offset
          in: query
          description: only search results after offset will be returned, for paging.
          required: false
          type: integer
      responses:
        200:
          description: returns list of applicants
          schema:
            type: array
            items:
              $ref: '#/definitions/Applicant'
        default:
          description: returns error information
          schema:
            $ref: '#/definitions/Success'
  /offer/:
    post:
      description: |
        creates a new offer
      parameters:
        - name: offer
          in: body
          description: offer information to create
          required: true
          schema:
            $ref: '#/definitions/Offer'
      responses:
          default:
            description: indicates operation success, returns error if applicable
            schema:
              $ref: '#/definitions/Success'
    get:
      description: |
        finds and returns offer identified by id
      parameters:
        - name: offer_id
          in: query
          description: id of offer to find
          required: true
          type: integer
      responses:
        200:
          description: returns desired offer information
          schema:
            $ref: '#/definitions/Offer'
        default:
          description: returns error information
          schema:
            $ref: '#/definitions/Success'
    put:
      description: |
        updates offer
      parameters:
        - name: offer
          in: body
          description: updated offer
          required: true
          schema:
            $ref: '#/definitions/Offer'
      responses:
        default:
          description: indcates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
    delete:
      description: |
        deletes offer by id
      parameters:
        - name: offer_id
          in: query
          description: the id of offer to delete
          required: true
          type: integer
      responses:
        default:
          description: indcates operation success, returns error if applicable
          schema:
            $ref: '#/definitions/Success'
  /offer/pending/:
    get:
      description: |
        finds all pending offers
      parameters:
        - name: filter
          in: body
          description: options to filter offers list
          required: true
          schema:
            $ref: '#/definitions/OfferFilter'
      responses:
        200:
          description: returns all pending offers
          schema:
            type: array
            items:
              $ref: '#/definitions/Offer'
        default:
          description: returns error information
          schema:
            $ref: '#/definitions/Success'
          
definitions:
  Applicant:
    type: object
    properties:
      a_id:  # would be student id
        type: integer
        format: int32
      password:  # to be hashed
        type: string
        format: password
      family_name:
        type: string
      given_name:
        type: string
      program:  # undergrad, masters, phd
        type: string
      year:
        type: integer
      ta_courses:  # past courses ta'd
        type: array
        items:
          $ref: '#/definitions/Course'
      courses:  # courses taken
        type: array
        items:
          type: integer
      phone:
        type: integer
        format: int32
      email:
        type: string
      work_status:
        type: string
      work_status_explanation:
        type: string
      department:
        type: string
      department_explanation:
        type: string
      experience:
        type: string
      appy_date:
        type: string
        format: dateTime
      applied_courses:
        type: array
        items:
          $ref: '#/definitions/Course'
      offers:
        type: array
        items:
          $ref: '#/definitions/Offer'
      active_offers:  # offers taken by applicant
        type: array
        items:
          $ref: '#/definitions/Offer'
  Course:
    type: object
    properties:
      c_id:  # course id 
        type: integer
        format: int32
      head_instructor:  # lead instructor for course, has managmennt permission
        $ref: '#/definitions/Instructor'
      additional_instructors:
        type: array
        items:
          $ref: '#/definitions/Instructor'
      name:
        type: string
      semester:
        type: string
      start_date:
        type: string
        format: date
      expected_enrollment:  # expected size of class
        type: integer
      preference:  # instructor message to coordinator
        type: string
      desired_applicants:  # applicants instructor requests
        type: array
        items:
          $ref: '#/definitions/Applicant'
      avoid_applicants:  # applicants instructor does not want
        type: array
        items:
          $ref: '#/definitions/Applicant'
      assigned_applicants:
        type: array
        items:
          $ref: '#/definitions/Applicant'
      flagged_applicants:
        type: array
        items:
          $ref: '#/definitions/Applicant'
      tas:
        type: array
        items:
          $ref: '#/definitions/Applicant'
  Offer:
    type: object
    properties:
      o_id:
        type: integer
        format: int32
      course:
        $ref: '#/definitions/Course'
      applicant:
        $ref: '#/definitions/Applicant'
      hours:
        type: integer
      approved:
        type: boolean
      accepted:
        type: boolean
  Instructor:
    type: object
    properties:
      i_id:  # instructor id, employee number
        type: integer
        format: int32
      family_name: 
        type: string
      given_name:
        type: string
      email:
        type: string
  ApplicantFilter:
    type: object
    properties:
      name: 
        type: string
      program:
        type: string
  OfferFilter:
    type: object
    properties:
      course:  # course id
        type: integer
      applicant:  # applicant id
        type: integer
  Success:
    type: object
    properties:
      success:
        type: boolean
      error_code:
        type: integer
        format: int32
      error_mst:
        type: string
```
