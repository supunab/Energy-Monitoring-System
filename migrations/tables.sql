CREATE TABLE User (id INT NOT NULL AUTO_INCREMENT,first_name VARCHAR(30) NULL,last_name VARCHAR(50) NULL,user_name VARCHAR(20) NULL,email VARCHAR(40) NULL,password VARCHAR(100) NULL,is_admin BOOLEAN NOT NULL DEFAULT false,PRIMARY KEY ( id ))ENGINE=INNODB;CREATE TABLE Complaint (id INT NOT NULL AUTO_INCREMENT,user_id INT NULL,title VARCHAR(200) NOT NULL,description TEXT NOT NULL,comp_type VARCHAR(20) NOT NULL,PRIMARY KEY ( id ), FOREIGN KEY (user_id) REFERENCES User(id) )ENGINE=INNODB;