-- Active: 1680544226904@@127.0.0.1@3306

--users
-- CREATE TABLE users (
--     id TEXT PRIMARY KEY UNIQUE NOT NULL,
--     name VARCHAR(50) TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     password TEXT NOT NULL,
--     created_at TEXT NOT NULL
-- );  

CREATE TABLE users (
    -- id INTEGER PRIMARY KEY AUTOINCREMENT,        
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT VARCHAR(50) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT (datetime('now', '-3 hours'))
);

SELECT * FROM users;

PRAGMA table_info('users');

DROP TABLE users;

INSERT INTO users (id, name, email, password)
VALUES 
    ("u001", "Fulano", "fulano@email.com", "fulano123"),
    ("u002", "Ciclana", "ciclana@email.com", "ciclana99"),
    ("u003", "Beltrano", "beltrano@email.com", "beltrano00");

--products
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);  

SELECT * FROM products;

DROP TABLE products;

INSERT INTO products
VALUES 
    ("prod001", "Foguete de Brinquedo", 29.99, "Brinquedos", "Este foguete de brinquedo é altamente detalhado e vem com uma variedade de acessórios, incluindo adesivos de planetas e estrelas.", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img1.png?raw=true"),
    ("prod002", "Camiseta Sistema Solar", 29.99, "Camisetas", "Esta camiseta é feita de algodão macio e tem uma estampa do Sistema Solar na frente.", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img2.png?raw=true"),
    ("prod003", "3D Sistema Solar", 89.99, "Brinquedos", "Construa seu próprio satélite com este kit de montagem, inclui peças e instruções detalhadas, brilha no escuro!", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img3.png?raw=true"),
    ("prod010", "Poster 'Sistema Solar'", 29.99, "Decoração", "Decore sua sala de estudo ou quarto com este poster do Sistema Solar, mostra todos os planetas e suas órbitas.", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img10.png?raw=true"),
    ("prod040", "Chaveiro Millennium Falcon", 24.99, "Acessórios", "Um chaveiro oficial da nave Millennium Falcon.", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img40.png?raw=true"),
    ("prod053", "Camiseta Astronauta", 25.3, "Camisetas", "Mostre sua paixão pelo espaço com essa camiseta incrível. Com um design realista de um astronauta em cima de um planeta.", "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img53.png?raw=true");
    
-- comandos para modificar e excluir um item da tabela
UPDATE users 
SET email = "beltraninho@gmail.com"
WHERE id = "u003";

DELETE FROM users
WHERE id = "u001";

-- purchases
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL,
    products TEXT NOT NULL
);  

SELECT * FROM purchases;

DROP TABLE purchases;

INSERT INTO purchases (id, buyer, totalPrice, products)
VALUES ('pur001', 'u001', 89.97, '{"product": {"id": "prod001", "name": "Foguete de Brinquedo", "price": 29.99, "category": "Acessórios", "description": "Este foguete de brinquedo é altamente detalhado e vem com uma variedade de acessórios, incluindo adesivos de planetas e estrelas.", "imageUrl": "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img1.png?raw=true"}, "quantity": 2}, {"product": {"id": "prod002", "name": "Camiseta Sistema Solar", "price": 29.99, "category": "Camisetas", "description": "Esta camiseta é feita de algodão macio e tem uma estampa do Sistema Solar na frente.", "imageUrl": "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img2.png?raw=true"}, "quantity": 1}}');


SELECT AVG(price) FROM products;

SELECT * FROM products
WHERE name LIKE "cam%";

SELECT name, price FROM products ORDER BY price ASC;

SELECT * FROM products WHERE price > 10 AND price <= 26;
SELECT * FROM products WHERE price > 10 AND category = "Camisetas";
