const Delivery=require('./../../models').Delivery;
const shippingConfig=require('./../../models').shippingConfig;
const ShipController=require('./../../controllers/v1/ship.controller');


const mockRequest=()=>{
    const req={};
    req.body=jest.fn().mockReturnValue(req);
    req.params=jest.fn().mockReturnValue(req);
    return req;
}

const mockResponse=()=>{
    const res={};
    res.send=jest.fn().mockReturnValue(res);
    res.status=jest.fn().mockReturnValue(res);
    res.json=jest.fn().mockReturnValue(res);
    return res;
}

jest.setTimeout(100000);
describe('DeliveryandShipping', () => {
    test('CreateDelivery',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"2",
            "from":"1000",
            "to":"200",
            "isDeleted":"false",
            "amount":"850",
            "deliveryId":"1"
        };
        Delivery.create = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({"success": true}
            ));
   await ShipController.insertDelivery(req,res);
   expect(res.statusCode).toBe(422);
   await ShipController.insertDelivery(req,res);
   expect(res.statusCode).toBe(200);
    })


    test('CreateShippingConfig',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "storeId":"2",
            "name":"purse",
            "minimumSubtotal":"200",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "isDeleted":"false",
            "isActive":"true",
        };
        shippingConfig.create = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({"success": true}
            ));
   await ShipController.insertShippingConfig(req,res);
   expect(res.statusCode).toBe(422);
   await ShipController.insertShippingConfig(req,res);
   expect(res.statusCode).toBe(200);
    }) 

    test('CreateShippingConfigandDelivery_1',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "storeId":"2",
            "name":"purse",
            "minimumSubtotal":"200",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "isDeleted":"false",
            "isActive":"true",
            "from":"1000",
            "to":"200",
            "amount":"850",
            "deliveryId":"1"

        };
        Delivery.findOrCreate = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
   await ShipController.createDeliveryShipping(req,res);
   expect(res.statusCode).toBe(422);
    }) 

    test('CreateShippingConfigandDelivery_2',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "storeId":"2",
            "name":"purse",
            "minimumSubtotal":"200",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "isDeleted":"false",
            "isActive":"true",
            "from":"1000",
            "to":"200",
            "amount":"850",
            "deliveryId":"1"

        };
        Delivery.findOrCreate = jest.fn()
    .mockResolvedValueOnce({ "success": true})
    shippingConfig.create=jest.fn()
     .mockRejectedValueOnce(new Error("Error"))
    await ShipController.createDeliveryShipping(req,res);
    expect(res.statusCode).toBe(422);
    })

    test('CreateShippingConfigandDelivery_3',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "storeId":"2",
            "name":"purse",
            "minimumSubtotal":"200",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "isDeleted":"false",
            "isActive":"true",
            "from":"1000",
            "to":"200",
            "amount":"850",
            "deliveryId":"1"

        };
    Delivery.findOrCreate = jest.fn()
    .mockResolvedValueOnce({ "success": true})
    shippingConfig.create=jest.fn()
    .mockResolvedValueOnce({ "success": true})
    await ShipController.createDeliveryShipping(req,res);
    expect(res.statusCode).toBe(200);
    })

    test('getDeliveryandShipping_1',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.params= { "id":"2"};
        Delivery.findOne = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
    await ShipController.getDeliveryShipping(req,res);
    expect(res.statusCode).toBe(422);
    });
    
    test('getDeliveryandShipping_2',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.params= { "id":"2"};
        Delivery.findOne = jest.fn()
        .mockResolvedValueOnce({ "success": true})
    await ShipController.getDeliveryShipping(req,res);
    expect(res.statusCode).toBe(200);
    });


    test('UpdateDeliveryandShipping_1',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "from":"200",
            "to":"1000"

        };
    Delivery.update= jest.fn()
    .mockRejectedValueOnce(new Error("Error"))
   await ShipController.updateDeliveryShipping(req,res);
   expect(res.statusCode).toBe(422);
    }) 
    
    test('UpdateDeliveryandShipping_2',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "from":"200",
            "to":"1000"

        };
    Delivery.update= jest.fn()
    .mockResolvedValueOnce({ "success": true})
    shippingConfig.update=jest.fn()
    .mockRejectedValueOnce(new Error("Error"))
   await ShipController.updateDeliveryShipping(req,res);
   expect(res.statusCode).toBe(422);
    })  
    
    test('UpdateDeliveryandShipping_2',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {
            "id":"3",
            "shippingType":"SUBTOTAL+TAX",
            "amountType":"PERCENTAGE",
            "from":"200",
            "to":"1000"

        };
    Delivery.update= jest.fn()
    .mockResolvedValueOnce({ "success": true})
    shippingConfig.update=jest.fn()
    .mockResolvedValueOnce({ "success": true})
   await ShipController.updateDeliveryShipping(req,res);
   expect(res.statusCode).toBe(200);
    })      

    test('DeleteDelivery',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= { "id":"3"};
        Delivery.update = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({"success": true}));
    await ShipController.deleteDelivery(req,res);
    expect(res.statusCode).toBe(422);
    await ShipController.deleteDelivery(req,res);
    expect(res.statusCode).toBe(200);
    }); 
    
    // test('getShipping_1',async ()=>{
    //     let req = mockRequest();
    //     let res = mockResponse();
    //     req.body= {    
    //     "id":"2",
    //     "subtotal":400,
    //     "tax":50};
    //     shippingConfig.findOne = jest.fn()
    //     .mockRejectedValueOnce(new Error("Error"))
    // await ShipController.getShipping(req,res);
    // expect(res.statusCode).toBe(422);
    // });

    
    // test('getShipping_2',async ()=>{
    //     let req = mockRequest();
    //     let res = mockResponse();
    //     req.body= {    
    //     "id":"2",
    //     "subtotal":400,
    //     "tax":50};
    //     shippingConfig.findOne = jest.fn()
    //     .mockResolvedValueOnce(Promise.resolve({ "amount": 3825,from:300,to:1000,stotal :850,Delivery :{shippingType : 'SUBTOTAL',minimumSubtotal : 200,amountType:"PERCENTAGE"},
    //     "success": true }))
    // await ShipController.getShipping(req,res);
    // expect(res.statusCode).toBe(200);
    // });    

    // test('getShipping_3',async ()=>{
    //     let req = mockRequest();
    //     let res = mockResponse();
    //     req.body= {    
    //     "id":"1",
    //     "subtotal":400,
    //     "tax":50};
    //     shippingConfig.findOne = jest.fn()
    //     .mockResolvedValueOnce(Promise.resolve({ "amount": 350,from:100,to:800,stotal :350,Delivery :{shippingType : 'SUBTOTAL+TAX',minimumSubtotal :200,amountType:"AMOUNT"},
    //     "success": true }))
    // await ShipController.getShipping(req,res);
    // expect(res.statusCode).toBe(200);
    // }); 


       test('getShipping_1',async ()=>{
        let req = mockRequest();
        let res = mockResponse();
        req.body= {    
            "id":2,
            "subtotal":400,
            "tax":5
    };
    Delivery.findOne = jest.fn()
        .mockRejectedValueOnce(new Error("Error"))
        .mockResolvedValue( Promise.resolve(
            {
    
                "DeliveryData": {
                    "shippingType":"SUBTOTAL",
                    "minimumSubtotal":50,
                    "stotal":400,
                    "amountType":"AMOUNT"
                },
                "success": true,
                "stotal":400,
                "Amount":400,
                "TotalAmount":400
            }
            ))
    await ShipController.getShipping(req,res);
    expect(res.statusCode).toBe(422);
    await ShipController.getShipping(req,res);
    expect(res.statusCode).toBe(200);
   
});
//        test('getShipping_2',async ()=>{
//         let req = mockRequest();
//         let res = mockResponse();
//         req.body= {    
//             "id":1,
//             "subtotal":400,
//             "tax":5
//     };
//     Delivery.findOne = jest.fn()
       
//         .mockResolvedValue( Promise.resolve(
//             {
//                     "success": true,
//                     "DeliveryData":{
//                         shippingType:"SUBTOTAL+TAX",
//                         minimumSubtotal:50
//                     },
//                     stotal:415
    
                
//             }
//             ))
    
//     await ShipController.getShipping(req,res);
   
// });
       


});




    