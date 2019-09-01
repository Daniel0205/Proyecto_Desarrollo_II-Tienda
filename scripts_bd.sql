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
   id_dp          SERIAL PRIMARY KEY,
   name_dp		  TEXT NOT NULL,
   address        TEXT NOT NULL,
   telephone 	  INT NOT NULL
);

DROP TABLE IF EXISTS inventario CASCADE;
CREATE TABLE inventario(
   id_dp        INT REFERENCES distribution_point(id_dp),
   ISBN		    BIGINT REFERENCES book(ISBN),
   availability	    INT NOT NULL
);

------------------------------------------------------

CREATE OR REPLACE FUNCTION anadirProducto() RETURNS TRIGGER AS $$
DECLARE
	   row distribution_point%rowtype;
BEGIN
	FOR row IN (SELECT id_dp FROM distribution_point) LOOP
		INSERT INTO inventario(id_dp,isbn,availability) VALUES(row.id_dp,NEW.isbn,10);
	END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER nuevoProducto AFTER INSERT ON book FOR EACH ROW EXECUTE PROCEDURE anadirProducto();
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
	username, first_name, last_name, date_birth, type_id, id, password, phone_number,gender, address, email, credit_card_number, state)
	VALUES 
	 ('dan', 'Darren', 'Haan', '2000-06-23', 'CC', 116554391, '1234', 3146884001,'M', 'Cl 5 5N-45', 'dar.han@gmail.com' , 333, true), 
	 ('helat', 'Helaine', 'Trussell', '2001-04-20', 'CC', 1757886571, '1234', 3006884001, 'F','Cra 66 5-44', 'helat@gmail.com' , 332, true), 
	 ('jonpe', 'Jonah', 'Petti', '1998-01-20', 'CC', 2757886001, '1234', 5006667001, 'M','Avn 6n 8-144', 'jonah-p@gmail.com' , 331, true),
	 ('josette', 'Josette', 'Drouin', '1990-12-22', 'CC', 7757000001, '1234', 7006667099, 'F','Cll 66 7-14', 'josette_D@gmail.com' , 330, true),
	 ('clehar', 'Clement ', 'Harrelson', '1995-11-22', 'CC', 4447000001, '1234', 5009967092, 'N','Cra 56 7-184', 'clehar@gmail.com' , 329, true);
	
INSERT INTO distribution_point(
   name_dp,address,telephone) 
   VALUES 
   ('Cali','cualquiera',12345679),
   ('Medellin','cualquiera',12345679),
   ('Bogota','cualquiera',12345679);


INSERT INTO book (
   ISBN,name_subcategory,publication_year,synopsis,title,author,number_of_pages,price,editorial,edition,lang,cover_type,recommended_age,imagepath)
   VALUES
   (1,'Humanidades',2019,'CUALQUIERA','HOLA1','YO',10,15000,'NINGUNA',1,'INGLES','G',15,NULL),
   (2,'Salud',2019,'CUALQUIERA','HOLA2','YO',10,15000,'NINGUNA',2,'INGLES','B',15,NULL),
   (3,'Humanidades',2019,'CUALQUIERA','HOLA3','YO',10,15000,'NINGUNA',3,'INGLES','G',15,NULL);