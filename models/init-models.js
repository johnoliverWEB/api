var DataTypes = require("sequelize").DataTypes;
var _CartDetail = require("./cart-detail");
var _Cart = require("./cart");
var _ComercialInfo = require("./comercial-info");
var _Contact = require("./contact");
var _Customer = require("./customer");
var _Fingerprint = require("./fingerprint");
var _ImageConfiguration = require("./image-configuration");
var _Language = require("./language");
var _OriginalImage = require("./original-image");
var _PaymentMethod = require("./payment-method");
var _ProductCategory = require("./product-category");
var _Product = require("./product");
var _RepaymentDetail = require("./repayment-detail");
var _Repayment = require("./repayment");
var _ResizeImage = require("./resize-image");
var _SaleDetail = require("./sale-detail");
var _SaleError = require("./sale-error");
var _Sale = require("./sale");
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
    var OriginalImage = _OriginalImage(sequelize, DataTypes);
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);
    var RepaymentDetail = _RepaymentDetail(sequelize, DataTypes);
    var Repayment = _Repayment(sequelize, DataTypes);
    var ResizeImage = _ResizeImage(sequelize, DataTypes);
    var SaleDetail = _SaleDetail(sequelize, DataTypes);
    var SaleError = _SaleError(sequelize, DataTypes);
    var Sale = _Sale(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);

    CartDetail.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(CartDetail, { as: "cart_details", foreignKey: "cartId"});
    SaleError.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(SaleError, { as: "sale_errors", foreignKey: "cartId"});
    Sale.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(Sale, { as: "sales", foreignKey: "cartId"});
    Cart.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Cart, { as: "carts", foreignKey: "customerId"});
    Fingerprint.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Fingerprint, { as: "fingerprints", foreignKey: "customerId"});
    Product.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Product, { as: "products", foreignKey: "customerId"});
    Repayment.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Repayment, { as: "repayments", foreignKey: "customerId"});
    SaleError.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(SaleError, { as: "sale_errors", foreignKey: "customerId"});
    Sale.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Sale, { as: "sales", foreignKey: "customerId"});
    Cart.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Cart, { as: "carts", foreignKey: "fingerprintId"});
    Contact.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Contact, { as: "contacts", foreignKey: "fingerprintId"});
    Product.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Product, { as: "products", foreignKey: "fingerprintId"});
    Repayment.belongsTo(PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    PaymentMethod.hasMany(Repayment, { as: "repayments", foreignKey: "paymentMethodId"});
    SaleError.belongsTo(PaymentMethod, { as: "paymentmethod", foreignKey: "paymentmethodsId"});
    PaymentMethod.hasMany(SaleError, { as: "sale_errors", foreignKey: "paymentmethodsId"});
    Sale.belongsTo(PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    PaymentMethod.hasMany(Sale, { as: "sales", foreignKey: "paymentMethodId"});
    CartDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(CartDetail, { as: "cart_details", foreignKey: "productId"});
    RepaymentDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(RepaymentDetail, { as: "repayment_details", foreignKey: "productId"});
    ResizeImage.belongsTo(Product, { as: "imageConfiguration", foreignKey: "imageConfigurationId"});
    Product.hasMany(ResizeImage, { as: "resize_images", foreignKey: "imageConfigurationId"});
    SaleDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(SaleDetail, { as: "sale_details", foreignKey: "productId"});
    RepaymentDetail.belongsTo(Sale, { as: "repayment", foreignKey: "repaymentId"});
    Sale.hasMany(RepaymentDetail, { as: "repayment_details", foreignKey: "repaymentId"});
    Repayment.belongsTo(Sale, { as: "sale", foreignKey: "saleId"});
    Sale.hasMany(Repayment, { as: "repayments", foreignKey: "saleId"});
    ResizeImage.belongsTo(Sale, { as: "originalImage", foreignKey: "originalImageId"});
    Sale.hasMany(ResizeImage, { as: "resize_images", foreignKey: "originalImageId"});
    SaleDetail.belongsTo(Sale, { as: "sale", foreignKey: "saleId"});
    Sale.hasMany(SaleDetail, { as: "sale_details", foreignKey: "saleId"});
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
        OriginalImage,
        PaymentMethod,
        ProductCategory,
        Product,
        RepaymentDetail,
        Repayment,
        ResizeImage,
        SaleDetail,
        SaleError,
        Sale,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
