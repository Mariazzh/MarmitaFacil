# Projeto Marmita Fácil

Este projeto consiste em um sistema para gerenciamento de pedidos, com serviços de autenticação, inventário e frontend, utilizando Docker para facilitar o desenvolvimento e implantação.

---

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado e rodando na sua máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.
- Porta 27017 (MongoDB) e portas 3000, 3001, 3002, 3003 livres para serem usadas.

---

## Estrutura do Projeto

- `auth-service` - Serviço de autenticação (Node.js + Express)
- `order-service` - Serviço de pedidos (Node.js + Express + MongoDB)
- `inventory-service` - Serviço de inventário (Python + FastAPI + MongoDB)
- `marmitafacil-web` - Frontend React
- `mongo` - Banco de dados MongoDB

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

### 2. Construir e subir os containers Docker

No diretório raiz do projeto (onde está o arquivo `docker-compose.yml`), execute:

```bash
docker-compose up --build
```

Isso irá baixar as imagens necessárias, construir suas aplicações e subir todos os serviços.

### 3. Verifique se os containers estão rodando

```bash
docker ps
```

Você deve ver os containers para:

- MongoDB (porta 27017)
- auth-service (porta 3001)
- order-service (porta 3002)
- inventory-service (porta 3003)
- frontend (porta 3000)

---

## Testando o sistema

### Acesso ao frontend

Abra no navegador:

```
http://localhost:3000/
```

### Registro de usuário

1. Acesse a tela de registro no frontend.
2. Crie um usuário para poder fazer login.

### Login

Faça login com o usuário criado.

### Criar pedido

1. Acesse a página de criação de pedidos (`/pedidos`).
2. Preencha os dados e crie um pedido.
3. Verifique se o pedido foi criado com sucesso.

### Listar pedidos

1. Acesse a página de listagem de pedidos (`/listar-pedidos`).
2. Confira os pedidos cadastrados.

---

## Configurações adicionais

- O MongoDB está configurado para persistir dados no volume Docker `mongo_data`.
- As URLs e portas estão definidas no arquivo `docker-compose.yml`.
- Variáveis de ambiente podem ser configuradas dentro de cada serviço, conforme necessidade.

---

## Problemas comuns

- **Porta já está em uso:** Verifique se outra instância do MongoDB ou algum serviço está usando as portas 27017, 3000, 3001, 3002, 3003 e finalize-os.
- **Erro de CORS:** Todos os serviços backend já possuem CORS habilitado para aceitar requisições do frontend.
- **Container não inicia:** Verifique os logs do container com `docker logs <container_id>` para mais detalhes.

---

## Parar os containers

Para parar todos os containers, pressione `Ctrl + C` no terminal onde está rodando o Docker Compose, ou execute:

```bash
docker-compose down
```

---
