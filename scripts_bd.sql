DROP TABLE IF EXISTS client CASCADE;
CREATE TABLE client(
   username         TEXT PRIMARY KEY,
   first_name       TEXT NOT NULL,
   last_name      TEXT NOT NULL,
   date_birth	    DATE NOT NULL,
   type_id          CHAR(2),
   id	          BIGINT NOT NULL,
   password	    TEXT NOT NULL,
   phone_number  	    BIGINT NOT NULL,
   gender       CHAR(1) NOT NULL,
   address	    TEXT NOT NULL,
   email 	    TEXT NOT NULL,	
   state 	    BOOLEAN NOT NULL,	
   CHECK (type_id IN ('CC', 'TI','RC','TP')),
   CHECK (gender IN ('M','F','N'))
);

DROP TABLE IF EXISTS card CASCADE;
CREATE TABLE card(
   username         TEXT REFERENCES client(username),
   credit_card_number   BIGINT PRIMARY KEY,
   type              CHAR(1) NOT NULL,
   entity            TEXT NOT NULL,
   CHECK (type IN ('D','C'))
);


DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin(
   username     TEXT PRIMARY KEY,	
   password	    TEXT NOT NULL
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
   id_message     SERIAL PRIMARY KEY,
   username         TEXT REFERENCES client(username),
   description	    TEXT NOT NULL,	
   solved	    boolean NOT NULL
);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(
   name_category	TEXT PRIMARY KEY,
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS subcategory CASCADE;
CREATE TABLE subcategory(
   name_subcategory	TEXT PRIMARY KEY,
   name_category	TEXT REFERENCES category (name_category) ,
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS book CASCADE;
CREATE TABLE book(
   ISBN         	BIGINT PRIMARY KEY,
   name_subcategory	TEXT REFERENCES subcategory(name_subcategory),	
   publication_year	INT NOT NULL,
   synopsis 		TEXT NOT NULL,
   title		TEXT NOT NULL,
   author		TEXT NOT NULL,	
   number_of_pages 		INT NOT NULL,
   cost BIGINT NOT NULL, 
   price		BIGINT NOT NULL,   
   editorial 		TEXT NOT NULL,
   edition		INT NOT NULL,
   lang		TEXT NOT NULL,	
   cover_type 		CHAR(1) NOT NULL,
   recommended_age		INT NOT NULL,
   imagepath   TEXT
   CHECK (cover_type IN ('G', 'B'))
);

DROP TABLE IF EXISTS critics CASCADE;
CREATE TABLE critics(
   username         TEXT REFERENCES client(username),
   ISBN		    BIGINT REFERENCES book(ISBN),
   comment	    TEXT NOT NULL,
   score 		INT NOT NULL
);

DROP TABLE IF EXISTS bill CASCADE;
CREATE TABLE bill(
   id_bill          SERIAL PRIMARY KEY,
   date		    DATE NOT NULL
);

DROP TABLE IF EXISTS bill_card CASCADE;
CREATE TABLE bill_card(
   id_bill          BIGINT REFERENCES bill(id_bill),
   credit_card_number   BIGINT REFERENCES card(credit_card_number),
   dues                 INT NOT NULL,
   porcent          INT NOT NULL
);

DROP TABLE IF EXISTS distribution_point CASCADE;
CREATE TABLE distribution_point(
   name_dp		  TEXT  PRIMARY KEY,
   address        TEXT NOT NULL,
   telephone 	  INT NOT NULL
);

DROP TABLE IF EXISTS bill_book CASCADE;
CREATE TABLE bill_book(
   id_bill      BIGINT REFERENCES bill(id_bill),
   ISBN		    BIGINT REFERENCES book(ISBN),
   name_dp		  TEXT REFERENCES distribution_point(name_dp),
   quantity	    INT NOT NULL
);

DROP TABLE IF EXISTS distribution_point CASCADE;
CREATE TABLE distribution_point(
   name_dp		  TEXT  PRIMARY KEY,
   address        TEXT NOT NULL,
   telephone 	  INT NOT NULL
);

DROP TABLE IF EXISTS inventory CASCADE;
CREATE TABLE inventory(
   name_dp        TEXT REFERENCES distribution_point(name_dp),
   ISBN		    BIGINT REFERENCES book(ISBN),
   availability	    INT NOT NULL
);

------------------------------------------------------
--add product to every distribution point inventory
CREATE OR REPLACE FUNCTION anadirProducto() RETURNS TRIGGER AS $$
DECLARE
	   row distribution_point%rowtype;
BEGIN
	FOR row IN (SELECT name_dp FROM distribution_point) LOOP
		INSERT INTO inventory(name_dp,isbn,availability) VALUES(row.name_dp,NEW.isbn,10);
	END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER nuevoProducto AFTER INSERT ON book FOR EACH ROW EXECUTE PROCEDURE anadirProducto();

------Update the inventory
CREATE OR REPLACE FUNCTION updateProducto() RETURNS TRIGGER AS $$

BEGIN

	UPDATE inventory SET availability=availability-new.quantity WHERE isbn=new.isbn AND name_dp=new.name_dp;
	
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER updateProducto AFTER INSERT ON bill_Book FOR EACH ROW EXECUTE PROCEDURE updateProducto();
--------------------------------------------------------

INSERT INTO admin(password,username) values
   ('1234','1629338'),
   ('1234','1670129'),
   ('1234','1630536'),
   ('1234','1625644');

INSERT INTO category VALUES 
   ('Académicos','Contenido relacionado al conocimiento'),
   ('Novelas','Literatura en prosa'),
   ('Lenguas','Contenido para aprender lenguas'),
   ('Poesía','Literatura estetica y ritmica'),
   ('Filosofía','Aborda problemas raramente abordados por la ciencia');

INSERT INTO subcategory VALUES 
   ('Humanidades','Académicos', 'CUALQUIERA PARCE'),
   ('Salud','Académicos', 'CUALQUIERA PARCE'),
   ('Ciencias exactas','Académicos', 'CUALQUIERA PARCE'),
   ('Ingenieria','Académicos', 'CUALQUIERA PARCE'),
   ('Diccionarios','Académicos', 'CUALQUIERA PARCE'),
   ('Fantástica','Novelas', 'CUALQUIERA PARCE'),
   ('Histórica','Novelas', 'CUALQUIERA PARCE'),
   ('Misterio','Novelas', 'CUALQUIERA PARCE'),
   ('Drama','Novelas', 'CUALQUIERA PARCE'),
   ('Juvenil','Novelas', 'CUALQUIERA PARCE'),
   ('Inglés','Lenguas', 'CUALQUIERA PARCE'),
   ('Portugués','Lenguas', 'CUALQUIERA PARCE'),
   ('Francés','Lenguas', 'CUALQUIERA PARCE'),
   ('Alemán','Lenguas', 'CUALQUIERA PARCE'),
   ('Italiano','Lenguas', 'CUALQUIERA PARCE'),
   ('Drámatica','Poesía', 'CUALQUIERA PARCE'),
   ('Lírica','Poesía', 'CUALQUIERA PARCE'),
   ('Épica','Poesía', 'CUALQUIERA PARCE'),
   ('Vanguardista','Poesía', 'CUALQUIERA PARCE'),
   ('Contemporánea','Poesía', 'CUALQUIERA PARCE'),
   ('Metafísica','Filosofía', 'CUALQUIERA PARCE'),
   ('Lógica','Filosofía', 'CUALQUIERA PARCE'),
   ('Filosofía del lenguaje','Filosofía', 'CUALQUIERA PARCE'),
   ('Epistemología','Filosofía', 'CUALQUIERA PARCE'),
   ('Filosofía política','Filosofía', 'CUALQUIERA PARCE');


INSERT INTO client(
	username, first_name, last_name, date_birth, type_id, id, password, phone_number,gender, address, email, state)
	VALUES 
	 ('dan', 'Darren', 'Haan', '2000-06-23', 'CC', 116554391, '1234', 3146884001,'M', 'Cl 5 5N-45', 'dar.han@gmail.com' , true), 
	 ('helat', 'Helaine', 'Trussell', '2001-04-20', 'CC', 1757886571, '1234', 3006884001, 'F','Cra 66 5-44', 'helat@gmail.com' , true), 
	 ('jonpe', 'Jonah', 'Petti', '1998-01-20', 'CC', 2757886001, '1234', 5006667001, 'M','Avn 6n 8-144', 'jonah-p@gmail.com' , true),
	 ('josette', 'Josette', 'Drouin', '1990-12-22', 'CC', 7757000001, '1234', 7006667099, 'F','Cll 66 7-14', 'josette_D@gmail.com' , true),
	 ('clehar', 'Clement ', 'Harrelson', '1995-11-22', 'CC', 4447000001, '1234', 5009967092, 'N','Cra 56 7-184', 'clehar@gmail.com' , true);
	
INSERT INTO book VALUES
   (9788476588871,'Humanidades',2008,'Para la antropología histórica, la complejidad y el caracter','Antropología: Historia, Cultura, Filosofia','Christoph Wulf', 331, 50000, 84000,'Anthropos','1','Español','G','20','images/9788476588871.jpg'),
   (9788497321907,'Humanidades',2003,'Es un texto que pretende aportar una formación metodológica','Métodos de investigación en Ciencias Humanas y Sociales','José Losada', 246, 35000, 50000,'Paraninfo','4','Español','B','20','images/9788497321907.jpg'),
   (9788422626114,'Humanidades',1988,'Relaciones de la sociología de la literatura con otras ciencias humanas','Fundamentos de sociologia de la literatura','Juan Ignacio Ferreas', 158, 64300, 106300,'Barcelona','3','Español','G','20','images/9788422626114.jpg'),
   (9789588063737,'Humanidades',2010,' discute la trayectoria y el presente de la pedagogía','Pedagogía, saber y ciencias','Rafael Rios', 193, 40000, 70500,'UNC','2','Español','B','20','images/9789588063737.jpg'),
   (9788490227565,'Salud',2014,'Ofrece una visión concisa pero completa de la investigación en ciencias de la salud','Introducción a la investigación en ciencias de la salud','Stephen Polgar', 235, 130700, 210500,'Elsavier','6','Español','B','20','images/9788490227565.jpg'),
   (9788431326968,'Salud',2010,'La actividad física regular proporciona beneficios sustanciales para la salud de las personas','Alimentación, ejercicio físico y salud','Diana Ansorena', 302, 40000, 70500,'Eunsa','3','Español','B','20','images/9788431326968.jpg'),
   (9789588843056,'Salud',2014,'El hospital como organización -- Economía y financiamiento de la salud','Administración de servicios de salud','Humberto Blanco', 229, 20800, 60200,'CIB','2','Español','B','20','images/9789588843056.jpg'),
   (9789707290624,'Salud',2004,'Fundamentos del sistema nervioso -- Tejido nervioso y su conformación celular','Neuroanatomía clínica','Stephen Waxman', 417, 95400, 180500,'Manual Moderno','13','Español','G','20','images/9789707290624.jpg');

INSERT INTO distribution_point VALUES 
   ('Cali','Calle 13 #100-00',3212100),
   ('Medellin','Calle 25 #12-80',3214000),
   ('Barranquilla','Carrera 38 #45-20',3215300);

UPDATE inventory SET availability=500 WHERE name_dp='Cali';
UPDATE inventory SET availability=400 WHERE name_dp='Medellin';
UPDATE inventory SET availability=600 WHERE name_dp='Barranquilla';

INSERT INTO card(credit_card_number,username,type,entity) VALUES 
  (333,'dan','C','VISA'),(444,'dan','D','VISA'),(555,'helat','C','VISA'),(666,'jonpe','C','VISA'),(777,'josette','D','VISA'),(888,'clehar','C','VISA');
		  

INSERT INTO bill(date)VALUES 
   ('2019-09-01' ),
   ('2019-08-10'),
   ('2019-01-01'),
   ('2018-12-10'),
   ('2018-10-01');	
   
INSERT INTO bill_card VALUES
	(1,333,3,50),
	(1,444,1,50),
	(3,555,2,100),
	(4,666,3,100),
	(5,777,1,100),
   (2,888,4,100);

	
INSERT INTO bill_book VALUES 
   (1,9788476588871,'Cali',2),
   (1,9788422626114,'Cali',3),
   (1,9788497321907,'Medellin',1),
   (2,9788431326968,'Medellin',2),
   (2,9788490227565,'Barranquilla',1),
   (3,9789707290624,'Barranquilla',1);

INSERT INTO critics VALUES
   ('dan',9788422626114,'No me gusto',2),
   ('jonpe',9788431326968,'Me gusto',5),
   ('jonpe',9788490227565,'No me gusto',3),
   ('helat',9789707290624,'Me gusto',4);

INSERT INTO message(
	username,description,solved)
	VALUES
	('dan','La pagina no me carga los libros',false),
	('helat','Muy buena la pagina, sigan asi',false),
	('josette','No se donde puedo ver mis compras',false);
