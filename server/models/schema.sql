--cat schema.sql | heroku pg:psql --app csc302-project

CREATE TABLE applicants(
	utorid text,
	studentnumber integer NOT NULL UNIQUE,
	familyname text NOT NULL,
	givenname text NOT NULL,
	program text,
	year integer,
	phonenumber text,
	email text NOT NULL,
	studentdepartment text,
	tacourses text[],
	courses text[],
	declined boolean NOT NULL,
	declinedcount integer,
	declinedcourses text[],
	appliedcourses text[],
	currentassignedcourses text[],
	PRIMARY KEY(utorid)
);

CREATE TABLE courses(
	course text,
	coursecode text NOT NULL,
	term text NOT NULL,
	year integer NOT NULL,
	requirements text[],
	head_instructor text,
	additional_instructors text[],
	tas text[],
	expected_enrollment integer,
	current_enrollment integer,
	max_enrollment integer,
	currentta integer NOT NULL,
	maxta integer NOT NULL,
	recommended_applicants text[] NOT NULL,
	PRIMARY KEY(course)
);

CREATE TABLE applications(
	utorid text REFERENCES applicants,
	course text REFERENCES courses,
	assigned boolean,
	accepted boolean
);

CREATE TABLE groups(
	name text,
	course text,
	email text,
	utorids text[],
	PRIMARY KEY(name)
);
