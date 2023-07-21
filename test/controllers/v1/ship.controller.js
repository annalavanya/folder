const {ReS,ReE,to}=require('./../../global_functions');
var express = require('express');
var router = express.Router();
const DeliveryService=require('./../../services/ship/ship.service');
const DeliveryValidator=require('./../../routes/ship.validater').deliveryValidator;
const ShippingConfigValidator=require('./../../routes/ship.validater').shippingConfigValidator;
const validator=require('./../../middleware/validate-schema');



/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: insertDelivery
Method insertDelivery which is used to insert  the Delivery Details through payload.
*/ 
const insertDelivery= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.insDelivery(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: insertShippingConfig
Method insertShippingConfig which is used to insert  the ShippingConfig Details through payload.
*/ 
const insertShippingConfig= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.insShippingConfig(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: createDeliveryShipping
Method createDeliveryShipping which is used to create  the DeliveryShipping Details through payload.
*/ 
const createDeliveryShipping= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.createDeliveryShip(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: getDeliveryShipping
Method getDeliveryShipping which is used to get  the DeliveryShipping Details through payload.
*/
const getDeliveryShipping= async function(req,res){
    let bodyData=req && req.params? req.params:null
    let[err,data]=await to(DeliveryService.getDeliveryShip(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: updateDeliveryShipping
Method updateDeliveryShipping which is used to update  the DeliveryShipping Details through payload.
*/
const updateDeliveryShipping= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.updateDeliveryShip1(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: deleteDelivery
Method deleteDelivery which is used to delete  the Delivery Details through payload.
*/
const deleteDelivery= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.dltDelivery(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: getShipping
Method getShipping which is used to find the Shipping Details through payload.
*/
const getShipping= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(DeliveryService.getShip1(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}









router.post('/Delivery',DeliveryValidator.createDelivery,validator.validate,insertDelivery);
router.post('/shippingConfig',ShippingConfigValidator.createShippingConfig,validator.validate,insertShippingConfig);
//task
router.post('/DeliveryShipping',createDeliveryShipping);
router.get('/Shippingdelivery/:id',getDeliveryShipping);
router.post('/shippingType',updateDeliveryShipping);
router.put('/DeliveryDelete',deleteDelivery);
router.post('/shipping',getShipping)
module.exports={router,insertDelivery,insertShippingConfig,createDeliveryShipping,getDeliveryShipping,updateDeliveryShipping,deleteDelivery,getShipping};
