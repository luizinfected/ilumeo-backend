# Ilumeo - Sistema de Ponto

---

##  Tecnologias

- **Back-end:** Node.js + TypeORM + PostgreSQL  
- **Infraestrutura:** Docker + Render (back e banco de dados)

---

## Instalação Back-end

#### Usando Docker:

```bash
git clone git@github.com:luizinfected/ilumeo-backend.git
cd ilumeo-backend

docker build -t ilumeo-backend .
docker run -d -p 3333:3333 --env-file .env ilumeo-backend
```

A API ficará disponível em: [http://localhost:3333](http://localhost:3333)

#### Usando npm:

```bash
git clone git@github.com:luizinfected/ilumeo-backend.git
cd ilumeo-backend

npm install
npm run dev
```

Extras

- Um usuário de demonstração já está criado na base com dados de exemplo.
- Código de usuário: usuario123
- Está incluída também uma **collection do Postman** com todas as rotas para facilitar os testes (ver anexo no repositório ou e-mail).

---

## Produção

- **Back-end:** https://ilumeo-backend-ggxn.onrender.com