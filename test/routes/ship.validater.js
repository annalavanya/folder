const {check,body,param,query}=require('express-validator');
const  deliveryValidator={
    createDelivery:[
        body('id').isNumeric().notEmpty().withMessage('id is Invalid '),
        body('storeId').isNumeric().notEmpty().withMessage('storeId is Invalid '),
        body('name').isString().notEmpty().withMessage('name must be a string'),
        body('minimumSubtotal').isNumeric().withMessage('minimumSubtotal is Invalid'),
        body('isDeleted').isBoolean().withMessage("isDeleted column should be boolean"),
        body('isActive').isBoolean().withMessage("isSubscription column should be boolean"),
        
    ]}
module.exports.deliveryValidator=deliveryValidator;

const  shippingConfigValidator={
    createShippingConfig:[
        body('from').isNumeric().notEmpty().withMessage('from must be a number type'),
        body('to').isNumeric().notEmpty().withMessage('to must be a number type'),
        
    ]}
module.exports.shippingConfigValidator=shippingConfigValidator;