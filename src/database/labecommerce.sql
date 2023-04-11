-- Active: 1680544226904@@127.0.0.1@3306

--users

-- CREATE TABLE users (

--     id TEXT PRIMARY KEY UNIQUE NOT NULL,

--     name VARCHAR(50) TEXT NOT NULL,

--     email TEXT UNIQUE NOT NULL,

--     password TEXT NOT NULL,

--     created_at TEXT NOT NULL

-- );

CREATE TABLE
    users (
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

--products

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

-- comandos para modificar e excluir um item da tabela

UPDATE users
SET
    email = "beltraninho@gmail.com"
WHERE id = "u003";

DELETE FROM users WHERE id = "u001";

--testes:

SELECT AVG(price) FROM products;

SELECT * FROM products WHERE name LIKE "cam%";

SELECT name, price FROM products ORDER BY price ASC;

SELECT * FROM products WHERE price > 10 AND price <= 26;

SELECT * FROM products WHERE price > 10 AND category = "Camisetas";

SELECT *
FROM products
WHERE
    category IN ('Camisetas', 'Brinquedos')
ORDER BY price ASC
LIMIT 3
OFFSET 2;

--Ex1

-- Get All Users

-- retorna todos os usuários cadastrados

SELECT * FROM users;

-- Get All Products

-- retorna todos os produtos cadastrados

SELECT * FROM products;

-- Search Product by name

-- crie um termo de busca, por exemplo "monitor"

-- retorna o resultado baseado no termo de busca

SELECT * FROM products WHERE name LIKE "%cam%";

-- Create User

-- crie um novo usuário

-- insere o item mockado na tabela users

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u004",
        "Deltrano",
        "deltrano@email.com",
        "deltrano00"
    );

-- Create Product

-- crie um novo produto

-- insere o item mockado na tabela products

INSERT INTO products
VALUES (
        "prod004",
        "Camiseta Estrelas Cadentes",
        34.99,
        "Camisetas",
        "Esta camiseta tem a estampa de estrelas cadentes e é feita de algodão macio.",
        "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img4.png?raw=true"
    );

--Ex2

-- Get Products by id

-- busca de produtos por id

SELECT * FROM products WHERE id = "prod001";

-- Delete User by id

-- deleção de user por id

DELETE FROM users WHERE id = "u001";

-- Delete Product by id

-- deleção de produto por id

DELETE FROM users WHERE id = "prod001";

-- Edit User by id

-- edição de user por id

UPDATE users
SET
    email = "beltraninho@gmail.com",
    password = "novasenha"
WHERE id = "u003";

-- Edit Product by id

-- edição de produto por id

UPDATE products
SET
    name = "New product",
    price = 50
WHERE id = "prod002";

--Ex3

-- Copie as queries do exercício 1 e refatore-as

-- Get All Users

-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM users ORDER BY email ASC;

-- Get All Products versão 1

-- retorna o resultado ordenado pela coluna price em ordem crescente

-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2

-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00

-- retorna os produtos com preços dentro do intervalo definido em ordem crescente

SELECT *
FROM products
WHERE price >= 10 AND price <= 30
ORDER BY price ASC;

--ex1
-- purchases
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

--ex2
-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.
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

-- b) Edite o status da data de entrega de um pedido
-- Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).
-- delivered_at = datetime('now', '-3 hours'),
-- delivered_at = datetime('now', 'localtime'),
UPDATE purchases
SET
    delivered_at = datetime('now', 'localtime'),
    paid = 1
WHERE id = "pur001";

-- ex3
-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.
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

--ex1
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT(1),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
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
('pur001', 'prod010', 7),
('pur001', 'prod040', 1);

SELECT *
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id;

UPDATE purchases
SET total_price = (
    SELECT SUM(products.price * purchases_products.quantity)
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
INNER JOIN users ON users.id = purchases.buyer_id;


