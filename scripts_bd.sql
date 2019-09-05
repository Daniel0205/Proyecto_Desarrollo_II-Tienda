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
   credit_card_number   BIGINT,
   state 	    BOOLEAN NOT NULL,	
   CHECK (type_id IN ('CC', 'TI','RC','TP')),
   CHECK (gender IN ('M','F','N'))
);

DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin(
   username     TEXT PRIMARY KEY,	
   password	    TEXT NOT NULL
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
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
   name_category	TEXT,
   description	    TEXT NOT NULL,
CONSTRAINT fk_category FOREIGN KEY (name_category) REFERENCES category (name_category) ON DELETE CASCADE
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
   id_bill          BIGINT PRIMARY KEY,
   username		    TEXT REFERENCES client(username),
   date		    DATE NOT NULL
);

DROP TABLE IF EXISTS bill_book CASCADE;
CREATE TABLE bill_book(
   id_bill      BIGINT REFERENCES bill(id_bill),
   ISBN		    BIGINT REFERENCES book(ISBN),
   quantity	    INT NOT NULL
);

DROP TABLE IF EXISTS distribution_point CASCADE;
CREATE TABLE distribution_point(
   name_dp		  TEXT  PRIMARY KEY,
   address        TEXT NOT NULL,
   telephone 	  INT NOT NULL
);

DROP TABLE IF EXISTS inventario CASCADE;
CREATE TABLE inventario(
   name_dp        TEXT REFERENCES distribution_point(name_dp),
   ISBN		    BIGINT REFERENCES book(ISBN),
   availability	    INT NOT NULL
);

------------------------------------------------------

CREATE OR REPLACE FUNCTION anadirProducto() RETURNS TRIGGER AS $$
DECLARE
	   row distribution_point%rowtype;
BEGIN
	FOR row IN (SELECT name_dp FROM distribution_point) LOOP
		INSERT INTO inventario(name_dp,isbn,availability) VALUES(row.name_dp,NEW.isbn,10);
	END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER nuevoProducto AFTER INSERT ON book FOR EACH ROW EXECUTE PROCEDURE anadirProducto();
--------------------------------------------------------

--Registros de ejemplo

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
	username, first_name, last_name, date_birth, type_id, id, password, phone_number,gender, address, email, credit_card_number, state)
	VALUES 
	 ('dan', 'Darren', 'Haan', '2000-06-23', 'CC', 116554391, '1234', 3146884001,'M', 'Cl 5 5N-45', 'dar.han@gmail.com' , 333, true), 
	 ('helat', 'Helaine', 'Trussell', '2001-04-20', 'CC', 1757886571, '1234', 3006884001, 'F','Cra 66 5-44', 'helat@gmail.com' , 332, true), 
	 ('jonpe', 'Jonah', 'Petti', '1998-01-20', 'CC', 2757886001, '1234', 5006667001, 'M','Avn 6n 8-144', 'jonah-p@gmail.com' , 331, true),
	 ('josette', 'Josette', 'Drouin', '1990-12-22', 'CC', 7757000001, '1234', 7006667099, 'F','Cll 66 7-14', 'josette_D@gmail.com' , 330, true),
	 ('clehar', 'Clement ', 'Harrelson', '1995-11-22', 'CC', 4447000001, '1234', 5009967092, 'N','Cra 56 7-184', 'clehar@gmail.com' , 329, true);
	
INSERT INTO book VALUES
   (9788476588871,'Humanidades',2008,'Para la antropología histórica, la complejidad y el caracter','Antropología: Historia, Cultura, Filosofia','Christoph Wulf', 331, 50000, 84000,'Anthropos','1','Español','G','20-40','images/9788476588871.jpg'),
   (9788497321907,'Humanidades',2003,'Es un texto que pretende aportar una formación metodológica','Métodos de investigación en Ciencias Humanas y Sociales','José Losada', 246, 35000, 50000,'Paraninfo','4','Español','B','20-40','images/9788497321907.jpg'),
   (9788422626114,'Humanidades',1988,'Relaciones de la sociología de la literatura con otras ciencias humanas','Fundamentos de sociologia de la literatura','Juan Ignacio Ferreas', 158, 64300, 106300,'Barcelona','3','Español','G','20-40','images/9788422626114.jpg'),
   (9789588063737,'Humanidades',2010,' discute la trayectoria y el presente de la pedagogía','Pedagogía, saber y ciencias','Rafael Rios', 193, 40000, 70500,'UNC','2','Español','B','20-40','images/9789588063737.jpg'),
   (9788490227565,'Salud',2014,'Ofrece una visión concisa pero completa de la investigación en ciencias de la salud','Introducción a la investigación en ciencias de la salud','Stephen Polgar', 235, 130700, 210500,'Elsavier','6','Español','B','20-40','images/9788490227565.jpg'),
   (9788431326968,'Salud',2010,'La actividad física regular proporciona beneficios sustanciales para la salud de las personas','Alimentación, ejercicio físico y salud','Diana Ansorena', 302, 40000, 70500,'Eunsa','3','Español','B','20-40','images/9788431326968.jpg'),
   (9789588843056,'Salud',2014,'El hospital como organización -- Economía y financiamiento de la salud','Administración de servicios de salud','Humberto Blanco', 229, 20800, 60200,'CIB','2','Español','B','20-40','images/9789588843056.jpg'),
   (9789707290624,'Salud',2004,'Fundamentos del sistema nervioso -- Tejido nervioso y su conformación celular','Neuroanatomía clínica','Stephen Waxman', 417, 95400, 180500,'Manual Moderno','13','Español','G','20-40','images/9789707290624.jpg');

INSERT INTO distribution_point VALUES 
   ('Cali','Calle 13 #100-00',3212100),
   ('Medellin','Calle 25 #12-80',3214000),
   ('Barranquilla','Carrera 38 #45-20',3215300);

UPDATE inventario SET availability=500 WHERE name_dp='Cali';
UPDATE inventario SET availability=400 WHERE name_dp='Medellin';
UPDATE inventario SET availability=600 WHERE name_dp='Barranquilla';

INSERT INTO bill VALUES 
   (1000001,'dan',NOW()),
   (1000002,'jonpe',NOW()),
   (1000003,'helat',NOW());

INSERT INTO bill_book VALUES 
   (1000001,9788476588871,2),
   (1000001,9788422626114,3),
   (1000001,9788497321907,1),
   (1000002,9788431326968,2),
   (1000002,9788490227565,1),
   (1000003,9789707290624,1),;

INSERT INTO critics VALUES
   ('dan',9788422626114,'No me gusto',2),
   ('jonpe',9788431326968,'Me gusto',5),
   ('jonpe',9788490227565,'No me gusto',3),
   ('helat',9789707290624,'Me gusto',4);

INSERT INTO critics VALUES
   ('dan','La pagina no me carga los libros',false),
   ('helat','Muy buena la pagina, sigan asi',false),
   ('josette','No se donde puedo ver mis compras',false);