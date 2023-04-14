-- Active: 1680544226904@@127.0.0.1@3306

---------- users
CREATE TABLE
    users (       
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT VARCHAR(50) NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now', '-3 hours'))
    );

SELECT * FROM users;

SELECT * FROM users ORDER BY id ASC;

PRAGMA table_info('users');

DROP TABLE users;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Fulano",
        "fulano@email.com",
        "fulano123"
    ), (
        "u002",
        "Ciclana",
        "ciclana@email.com",
        "ciclana99"
    ), (
        "u003",
        "Beltrano",
        "beltrano@email.com",
        "beltrano00"
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u004",
        "Deltrano",
        "deltrano@email.com",
        "deltrano00"
    );

UPDATE users
SET
    email = "beltraninho@gmail.com",
    password = "novasenha"
WHERE id = "u003";

UPDATE users
SET
    email = "beltraninho@gmail.com"
WHERE id = "u003";

DELETE FROM users WHERE id = "u001";

---------- products
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

SELECT * FROM products;

SELECT * FROM products ORDER BY id ASC LIMIT 1;

DELETE FROM products WHERE id = (SELECT id FROM products ORDER BY id ASC LIMIT 1);

DROP TABLE products;

INSERT INTO products
VALUES (
        "prod001",
        "Foguete de Brinquedo",
        29.99,
        "Brinquedos",
        "Este foguete de brinquedo é altamente detalhado e vem com uma variedade de acessórios, incluindo adesivos de planetas e estrelas.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img1.png?raw=true"
    ), (
        "prod002",
        "Camiseta Sistema Solar",
        29.99,
        "Camisetas",
        "Esta camiseta é feita de algodão macio e tem uma estampa do Sistema Solar na frente.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img2.png?raw=true"
    ), (
        "prod003",
        "3D Sistema Solar",
        89.99,
        "Brinquedos",
        "Construa seu próprio satélite com este kit de montagem, inclui peças e instruções detalhadas, brilha no escuro!",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img3.png?raw=true"
    ), (
        "prod010",
        "Poster 'Sistema Solar'",
        29.99,
        "Decoração",
        "Decore sua sala de estudo ou quarto com este poster do Sistema Solar, mostra todos os planetas e suas órbitas.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img10.png?raw=true"
    ), (
        "prod040",
        "Chaveiro Millennium Falcon",
        24.99,
        "Acessórios",
        "Um chaveiro oficial da nave Millennium Falcon.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img40.png?raw=true"
    ), (
        "prod053",
        "Camiseta Astronauta",
        25.3,
        "Camisetas",
        "Mostre sua paixão pelo espaço com essa camiseta incrível. Com um design realista de um astronauta em cima de um planeta.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img53.png?raw=true"
    );

INSERT INTO products
VALUES (
        "prod004",
        "Camiseta Estrelas Cadentes",
        34.99,
        "Camisetas",
        "Esta camiseta tem a estampa de estrelas cadentes e é feita de algodão macio.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img4.png?raw=true"
    );

SELECT AVG(price) FROM products;

SELECT * FROM products WHERE id = "prod001";

SELECT * FROM products WHERE name LIKE "cam%";

SELECT name, price FROM products ORDER BY price ASC;

SELECT *
FROM products
WHERE price >= 10 AND price <= 30
ORDER BY price ASC;

SELECT * FROM products WHERE price > 10 AND category = "Camisetas";

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT *
FROM products
WHERE
    category IN ('Camisetas', 'Brinquedos')
ORDER BY price ASC
LIMIT 3
OFFSET 2;

DELETE FROM products WHERE id = "prod001";

UPDATE products
SET
    name = "New product",
    price = 50
WHERE id = "prod002";

---------- purchases
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,        
        created_at TIMESTAMP DEFAULT (datetime('now', '-3 hours')),
        paid INTEGER NOT NULL DEFAULT (0),
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,        
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

SELECT * FROM purchases
ORDER BY buyer_id ASC;

DROP TABLE purchases;

INSERT INTO
    purchases (id, total_price, buyer_id)
VALUES 
    ("pur001", 100, "u001"),
    ("pur002", 130, "u001"),
    ("pur003", 200, "u002"),
    ("pur004", 140, "u003"),
    ("pur005", 180, "u003"),
    ("pur006", 500, "u004"),
    ("pur007", 160, "u004"),
    ("pur008", 40, "u001");

-- delivered_at = datetime('now', '-3 hours'),
-- delivered_at = datetime('now', 'localtime'),
UPDATE purchases
SET
    delivered_at = datetime('now', 'localtime'),
    paid = 1
WHERE id = "pur003";

SELECT
    users.id as userId,
    name,
    purchases.id as purchaseId,
    total_price as "Total price",
    CASE WHEN paid = 0 THEN 'not paid' ELSE 'paid' END AS "Paid Status",
    delivered_at as deliveredAt
FROM users
    INNER JOIN purchases ON purchases.buyer_id = users.id
WHERE users.id= "u001"
ORDER BY purchases.id DESC;

---------- purchases_products
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT(1),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE,
    PRIMARY KEY (purchase_id, product_id)
);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('pur001', 'prod001', 5),
('pur002', 'prod001', 3),
('pur003', 'prod002', 2),
('pur004', 'prod003', 4),
('pur005', 'prod010', 3),
('pur006', 'prod010', 7),
('pur007', 'prod040', 1);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('pur019', 'prod053', 7),
('pur019', 'prod011', 3);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('pur002', 'prod003', 3);

SELECT *
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id;

UPDATE purchases SET 
  total_price = (
    SELECT ROUND(SUM(products.price * purchases_products.quantity), 2)
    FROM purchases_products
    JOIN products ON products.id = purchases_products.product_id
    WHERE purchases_products.purchase_id = purchases.id
  )
  WHERE EXISTS (
    SELECT 1
    FROM purchases_products
    WHERE purchases_products.purchase_id = purchases.id
);

SELECT 
    purchases_products.purchase_id AS "Id da compra",
    purchases_products.product_id AS "Id do produto",
    products.name AS "Nome do produto",
    products.price AS "Preço unitário",
    purchases_products.quantity AS Quantidade,    
    purchases.total_price AS Total,
    CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END AS "Status do pagamento",
    purchases.delivered_at AS "Data de entrega",
    users.id AS "Id do comprador",
    users.name AS "Nome do comprador"
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id
INNER JOIN users ON users.id = purchases.buyer_id
ORDER BY purchases_products.purchase_id ASC;


