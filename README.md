#  - Lidia Yamamura - 
### Veja a documentação: 
[**API labecommerce-backend**](https://documenter.getpostman.com/view/25826614/2s93RUvCdA)
<br>
<br>

# Projeto labecommerce
É o primeiro projeto do back-end, onde praticamos toda a base de criação de uma API vinculada a um banco de dados real.
<br>
<br>
## **Banco de dados**
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)

## **Conteúdos abordados:**
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

<br>

# **API labecommerce-backend**
- Documentação [**Postman**](https://documenter.getpostman.com/view/25826614/2s93RUvCdA) com todos os endpoints;
- **Endpoints:**
    - **Users:**
        - Create user
            - Cadastra uma nova pessoa.
        - Get all users        
            - Retorna todas as pessoas cadastradas. Pode ser enviado uma query, q fará uma busca do parâmetro no nome e id do usuário, retornando o/os usuários se existirem.
        - Edit user by id
            - Edita um usuário existente.
        - Delete user by id
            - Deleta um usuário existente.
    - **Products:**        
        - Create product
            Cadastra um novo produto.
        - Get all products
            - Retorna todos os produtos cadastrados.
        - Search product by name
            - Retorna o/s produto/s que contenham a query enviada.
        - Get products by id
            - Retorna um produto que contenha a path id enviada.
        - Edit product by id
            - Edita um produto existente.
        - Delete product by id
            - Deleta um produto existente.
    - **Purchases:**
        - Create purchase
            - Cadastra um novo pedido de compra.
        - Get all purchases
            - Retorna todas as compras.
        - Get purchase by id
            - Retorna os dados de uma compra, incluindo a lista de produtos da mesma e os dados do usuário.
        - Get user purchases by user id
            - Retorna os registros de compras de um determinado usuário, incluindo a lista de produtos da mesma e os dados do usuário.
        - Edit purchase by id
            - Edita/atualiza uma compra existente.
        - Delete purchase by id
            - Deleta um pedido existente.
        