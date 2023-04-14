#  - Lidia Yamamura - 
### Veja a documentação: 
[**API labecommerce-backend**](https://documenter.getpostman.com/view/25826614/2s93RUvCdA)
<br>
<br>

# Projeto labecommerce
A API labecommerce-backend é uma aplicação para registro, alteração e deleção de usuários, produtos e compras. Ela oferece funcionalidades para gerenciar o ciclo completo de vendas de uma loja online, desde a criação de um usuário até a finalização de uma compra.

Os endpoints disponíveis na API permitem criar, listar, atualizar e excluir usuários, produtos e compras. Além disso, é possível obter informações detalhadas sobre cada compra realizada, incluindo o nome do comprador, o valor total da compra, a data de criação e entrega, o status de pagamento e a lista de produtos comprados.

A aplicação utiliza um banco de dados real para armazenar as informações de usuários, produtos e compras, garantindo a segurança e integridade dos dados. 
<br>
<br>
## **Banco de dados**
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)

## **Tecnologias Utilizadas:**
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
<br>     

## **Instalação:**

Para instalar a **API labecommerce-backend**, você precisará seguir os seguintes passos:

- Certifique-se de que o Node.js e o gerenciador de pacotes NPM estejam instalados em seu sistema.
- Baixe ou clone o repositório do projeto em sua máquina.
- Abra o terminal no diretório do projeto e execute o comando npm install para instalar todas as dependências necessárias.
- Em seguida, execute o comando npm run start para iniciar o servidor localmente. Ou execute o comando npm run dev para iniciar o servidor da API em modo de desenvolvimento.
- Agora você pode acessar a API usando o endpoint http://localhost:3000/.
- Para obter informações mais detalhadas sobre como usar os endpoints, consulte a documentação da [**API labecommerce-backend**](https://documenter.getpostman.com/view/25826614/2s93RUvCdA).


        
