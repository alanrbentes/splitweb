"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Cliente = require('../app/models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Aparelho = require('../app/models/Aparelho'); var _Aparelho2 = _interopRequireDefault(_Aparelho);
var _OrdemServico = require('../app/models/OrdemServico'); var _OrdemServico2 = _interopRequireDefault(_OrdemServico);

const models = [_User2.default, _Cliente2.default, _Aparelho2.default, _OrdemServico2.default];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new (0, _sequelize2.default)(_database2.default);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

exports. default = new Database();
