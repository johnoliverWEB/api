var DataTypes = require("sequelize").DataTypes;
var _ComercialInfo = require("./comercial-info");
var _Customer = require("./customer");
var _ImagesConfiguration = require("./images-configuration");
var _Language = require("./language");
var _PaymentMethod = require("./payment-method");
var _ProductCategory = require("./product-category");
var _Slider = require("./slider");
var _Tax = require("./tax");

function initModels(sequelize) {
    var ComercialInfo = _ComercialInfo(sequelize, DataTypes);
    var Customer = _Customer(sequelize, DataTypes);
    var ImagesConfiguration = _ImagesConfiguration(sequelize, DataTypes);
    var Language = _Language(sequelize, DataTypes);
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);


    return {
        ComercialInfo,
        Customer,
        ImagesConfiguration,
        Language,
        PaymentMethod,
        ProductCategory,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
