--cat schema.sql | heroku pg:psql --app csc302-project

CREATE TABLE applicants(
	utorid text,
	studentnumber integer,
	familyname text,
	givenname text,
	program text,
	year integer,
	phonenumber integer,
	email text,
	studentdepartment text,
	tacourses text[],
	courses text[],
	declined boolean,
	declinedcount integer,
	declinedcourses text[],
	PRIMARY KEY(utorid)
);

CREATE TABLE courses(
	course text,
	coursecode text,
	term text,
	requirements text[],
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
	utorids text[],
	PRIMARY KEY(name)
);