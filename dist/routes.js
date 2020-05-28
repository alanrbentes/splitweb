"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _ClienteController = require('./app/controllers/ClienteController'); var _ClienteController2 = _interopRequireDefault(_ClienteController);
var _AparelhoController = require('./app/controllers/AparelhoController'); var _AparelhoController2 = _interopRequireDefault(_AparelhoController);
var _OrdemServicoController = require('./app/controllers/OrdemServicoController'); var _OrdemServicoController2 = _interopRequireDefault(_OrdemServicoController);

var _UserStore = require('./app/validators/UserStore'); var _UserStore2 = _interopRequireDefault(_UserStore);
var _UserUpdate = require('./app/validators/UserUpdate'); var _UserUpdate2 = _interopRequireDefault(_UserUpdate);

const router = new (0, _express.Router)();

router.post('/users', _UserStore2.default, _UserController2.default.store);
router.post('/session', _SessionController2.default.store);

// validação de token
router.use(_auth2.default);
router.put('/update', _UserUpdate2.default, _UserController2.default.update);

router.get('/cliente', _ClienteController2.default.list);
router.post('/cliente', _ClienteController2.default.store);
router.put('/cliente', _ClienteController2.default.update);
router.delete('/cliente/:id', _ClienteController2.default.delete);

router.get('/aparelho', _AparelhoController2.default.list);
router.post('/aparelho', _AparelhoController2.default.store);
router.put('/aparelho', _AparelhoController2.default.update);
router.delete('/aparelho/:id', _AparelhoController2.default.delete);

router.get('/ordem-servico', _OrdemServicoController2.default.list);
router.post('/ordem-servico', _OrdemServicoController2.default.store);
router.put('/ordem-servico', _OrdemServicoController2.default.update);
router.delete('/ordem-servico/:id', _OrdemServicoController2.default.delete);

exports. default = router;
