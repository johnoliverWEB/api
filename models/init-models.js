var DataTypes = require("sequelize").DataTypes;
var _CartDetail = require("./cart-detail");
var _Cart = require("./cart");
var _ComercialInfo = require("./comercial-info");
var _Contact = require("./contact");
var _Customer = require("./customer");
var _Fingerprint = require("./fingerprint");
var _ImageConfiguration = require("./image-configuration");
var _Language = require("./language");
var _PaymentMethod = require("./payment-method");
var _ProductCategory = require("./product-category");
var _Product = require("./product");
var _SaleError = require("./sale-error");
var _Slider = require("./slider");
var _Tax = require("./tax");

function initModels(sequelize) {
    var CartDetail = _CartDetail(sequelize, DataTypes);
    var Cart = _Cart(sequelize, DataTypes);
    var ComercialInfo = _ComercialInfo(sequelize, DataTypes);
    var Contact = _Contact(sequelize, DataTypes);
    var Customer = _Customer(sequelize, DataTypes);
    var Fingerprint = _Fingerprint(sequelize, DataTypes);
    var ImageConfiguration = _ImageConfiguration(sequelize, DataTypes);
    var Language = _Language(sequelize, DataTypes);
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);
    var SaleError = _SaleError(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);

    CartDetail.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(CartDetail, { as: "cart_details", foreignKey: "cartId"});
    SaleError.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(SaleError, { as: "sale_errors", foreignKey: "cartId"});
    Cart.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Cart, { as: "carts", foreignKey: "customerId"});
    Fingerprint.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Fingerprint, { as: "fingerprints", foreignKey: "customerId"});
    Product.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Product, { as: "products", foreignKey: "customerId"});
    SaleError.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(SaleError, { as: "sale_errors", foreignKey: "customerId"});
    Cart.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Cart, { as: "carts", foreignKey: "fingerprintId"});
    Contact.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Contact, { as: "contacts", foreignKey: "fingerprintId"});
    Product.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Product, { as: "products", foreignKey: "fingerprintId"});
    SaleError.belongsTo(PaymentMethod, { as: "paymentmethod", foreignKey: "paymentmethodsId"});
    PaymentMethod.hasMany(SaleError, { as: "sale_errors", foreignKey: "paymentmethodsId"});
    CartDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(CartDetail, { as: "cart_details", foreignKey: "productId"});
    CartDetail.belongsTo(Tax, { as: "tax", foreignKey: "taxId"});
    Tax.hasMany(CartDetail, { as: "cart_details", foreignKey: "taxId"});

    return {
        CartDetail,
        Cart,
        ComercialInfo,
        Contact,
        Customer,
        Fingerprint,
        ImageConfiguration,
        Language,
        PaymentMethod,
        ProductCategory,
        Product,
        SaleError,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
