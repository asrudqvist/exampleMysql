CREATE TABLE people (
    id MEDIUMINT NOT NULL
        AUTO_INCREMENT,
	age TINYINT,
	email text,
	fullname text,
	gender char(1),
	location text,
	username varchar(255),
	PRIMARY KEY (id)
);


