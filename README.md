# 📞 Sistema de Gerenciamento de Login de Ramais Telefônicos

Projeto desenvolvido como parte de um programa de estágio, com foco na criação de um sistema para gerenciamento de login em ramais. A proposta é baseada em um caso real, envolvendo a construção de APIs REST, integração com banco de dados e desenvolvimento de interface gráfica.

---

## 📁 Estrutura do Projeto

- **Frontend:** Interface gráfica para exibição dos ramais conectados, busca e configuração.
- **Backend:** Desenvolvido em Java com Spring Boot. Responsável por fornecer APIs REST para login e logout de ramais.
- **Banco de Dados:** MySQL para armazenamento de informações dos ramais disponíveis e usuários logados.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript, Bootstrap  
- **Backend:** Java, Spring Boot, Maven  
- **Banco de Dados:** MySQL

---

## 🛠️ Instalação
### 1. Clonar o repositório:
Utilize o comando git clone seguido do link copiado:
```bash
git clone https://github.com/marianaseidel/gerenciamento-login.git
```
### 2. Aguardar o processo de clonagem:
O Git irá baixar todos os arquivos do repositório e criará uma pasta com o nome do repositório no diretório onde você está.

### 3. Entrar no repositório clonado:
```bash
cd gerenciamento-login
```

Agora você pode ver os arquivos do repositório na sua máquina local!

### 4. Backend:
4.1. Navegue até a pasta do backend:
```bash
cd backend_projeto01_estagio
```
4.2. Instale as dependências:
```bash
mvn install
```
4.3. Execute a aplicação Spring Boot:
```bash
mvn spring-boot:run
```
💡 Dica: Se preferir usar uma IDE como IntelliJ IDEA ou Eclipse, basta abrir o projeto e rodar a classe principal ```ProjetoEstagioApplication``` como uma aplicação Java. Ela já está configurada para iniciar o servidor Spring Boot automaticamente!

### 5.Frontend:
5.1. Navegue até a pasta do frontend:
```bash
cd frontend_projeto01_estagio
```

5.2. Instale as dependências:
```bash
npm install
```

### 6. Banco de Dados:
6.1.Certifique-se de ter o MySQL instalado:
Para verificar, execute no terminal:
```bash
mysql --version
```

6.2. Acesse o MySQL e crie o banco de dados (caso ainda não exista):
```bash
mysql -u seu_usuario -p
```
```sql
CREATE DATABASE nome_do_banco;
```

6.3.Execute o script de criação de tabelas:
```bash
mysql -u seu_usuario -p nome_do_banco < scripts/criar_tabelas.sql
```
6.4. Verifique se as tabelas foram criadas:
```bash
mysql -u usuario -p
```
```sql
USE banco_de_dados;
SHOW TABLES;
```

## Como rodar
- Backend: Execute o comando *mvn spring-boot:run* ou rode a classe *ProjetoEstagioApplication* pela IDE.
- Frontend: Inicie com npm start ou npx serve (dependendo da estrutura do projeto).
