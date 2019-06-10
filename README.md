## Documentation

## Build Setup

# Install dependencies
npm install

# Create database with the credentials
username: root
host: localhost
database: api
no password

# Execute tests
npm run test

# Start application - localhost:3001
npm run start

# Execute ESlint
npm run lint

## Directory architecture
```
    .
    ├── app                   # Dentro dessa pasta estão os arquivos da estrutura MVCS;
    │   ├── api               # Versões da API, Rotas, Controllers, Business...
    │   ├── base              # Arquivos base para o desenvolvimento como baseController, baseBusiness
    │   ├── constants         # Todas as constantes da aplicação se encontra aqui
    │   ├── helpers           # Pequenos blocos de condigo que são comun a aplicação          
    │   ├── middlewares       # Todas as middlewares são declaradas aqui
    │   └── utils             # Classes que são úteis, visando reaproveitamento
    ├── bin                   # Aqui fica o arquivo de inicialização da aplicação
    ├── config                # Configurações da aplicação porta, versões...
    ├── keys                  # Todas as chaves de acesso ou criptografia fica neste diretorio
    ├── modules               # Modulos auxiliares no desenvolvimento como realtime, db-adapters
    ├── test                  # Todos os testes da aplicação desde testes unitário a teste de integração
```

## Example of endpoint creation
Create directory v1 within api all endpoint of version 1 will be in here, Exmplo user:
created a directory called user within v1
Within the user create the following files:
* user_routes.js
* user_controller.js
* user_business.js

# user_routes.js
```javascript
  module.exports = function (router, userController) {

    router.get('/', (req, res, next) => userController.getUsers(req, res, next));

    return router;
  };
```

# user_controller.js
```javascript
const BaseController = require('../../../base/base_controller');
const HandleResponse = require('../../../utils/handle_response');
const UserValidator = require('./user_validator');
const UserBusiness = require('./user_business');

class UserController extends BaseController {
    constructor() {
        super();
        this.userValidator = new UserValidator();
        this.userBusiness  = new UserBusiness();
        this.handleResponse = new HandleResponse();
    }

    getUsers(req, res, next) {
        if(!this.userValidator.isValidParamsGetUser(req.body)) 
            return next(this.handleResponse.unprocessableEntity());

        this.userBusiness.getUsers()
        .then((result) => {
            res.json({ data: result });
        }).catch((error) => {
            next(error);
        });
    }

}

module.exports = UserController;
```

# user_business.js

```javascript
  'use strict';

const _ = require('lodash');
const HandleResponse = require('../../../utils/handle_response');
const BaseBusiness = require('../../../base/business');
const userDao = require('./dao');

class UserBusiness extends BaseBusiness {
    constructor() {
        super();
        this.userDao = userDao;
        this.handleResponse = new HandleResponse();
    }

    getUsers(data) {
      return new Promise((resolve, reject) => {
          
        this.userDao.mysql.getUsers()
        .then((dataUser) => {
            if (!dataUser) this.handleResponse.notFound('Não existe usuários');
            
            resolve(dataUser);
        });
      });
    }
}

module.exports = UserBusiness;
```

We use deesign patter DAO to access or change anything in banks