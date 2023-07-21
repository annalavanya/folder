const Delivery=require('./../../models').Delivery;
const shippingConfig=require('./../../models').shippingConfig;
const { where } = require('sequelize');
const {TE,to}=require('./../../global_functions');
const { body } = require('express-validator');
const { Op } = require("sequelize");


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: insertDelivery
Method insertDelivery which is used to insert  the Delivery Details through payload.
*/  
const insDelivery=async function(bodyData){
    let[err,data]=await to(Delivery.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insDelivery=insDelivery;


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: insertShippingConfig
Method insertShippingConfig which is used to insert  the ShippingConfig Details through payload.
*/  
const insShippingConfig=async function(bodyData){
    let[err,data]=await to(shippingConfig.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insShippingConfig=insShippingConfig;



/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: createDeliveryShipping
Method createDeliveryShipping which is used to create  the DeliveryShipping Details through payload.
*/ 

const createDeliveryShip= async function(bodyData){
    let[err,deliveryData]= await to(Delivery.findOrCreate({
        // include:{
        //     model:shippingConfig
        // },
        where:{
            name:bodyData.name
        },
        defaults:{
            id:bodyData.id,
            storeId:bodyData.storeId,
            name:bodyData.name,
            minimumSubtotal:bodyData.minimumSubtotal,
            shippingType:bodyData.shippingType,
            amountType:bodyData.amountType,
            isDeleted:bodyData.isDeleted,
            isActive:bodyData.isActive,
         }
    }))
    if(err) return TE(err.message);
    if(deliveryData) {
        let[err1,shippingData]=await to(shippingConfig.create({
            from:bodyData.from,
            to:bodyData.to,
            amount:bodyData.amount,
            deliveryId:bodyData.deliveryId
        }))
        if(err1) return TE(err1.message);
        if(shippingData) return{deliveryData,shippingData}
    }
}
module.exports.createDeliveryShip=createDeliveryShip;



/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: getDeliveryShipping
Method getDeliveryShipping which is used to get  the DeliveryShipping Details through payload.
*/
const getDeliveryShip=async function(bodyData){
    console.log("bodyData",bodyData.id);
    let[err,data]=await to(Delivery.findOne(
        {
            include:{
                model:shippingConfig
              },
            where:{
                id:bodyData.id
            }
        }
    ))
    if(err) return TE(err.message);
    if(data) return {data}
}
module.exports.getDeliveryShip=getDeliveryShip;


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: updateDeliveryShipping
Method updateDeliveryShipping which is used to update  the DeliveryShipping Details through payload.
*/

const updateDeliveryShip1=async function(bodyData){
    let[err,Deliverydata]=await to(Delivery.update({shippingType:bodyData.shippingType,amountType:bodyData.amountType},
        {
        where:{
           id:bodyData.id
        }}
       ));  
    if(err) return TE(err.message);   
    if(Deliverydata){
    let[err1,Shippingdata]=await to(shippingConfig.update({from:bodyData.from, to:bodyData.to},
        {
        where:{
            deliveryId:bodyData.id
        }}))
       if(err1)return TE(err1.message);
       if(Shippingdata)return {Deliverydata,Shippingdata}
    }
}

module.exports.updateDeliveryShip1=updateDeliveryShip1;


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: deleteDelivery
Method deleteDelivery which is used to delete  the Delivery Details through payload.
*/
const dltDelivery=async function(bodyData){
    let[err,data]=await to(Delivery.update({isDeleted:true},{
     where:{
        id:bodyData.id
     }}
    ));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.dltDelivery=dltDelivery;


/** 
Original Author:Anna Lavanya
Author: Anna Lavanya
Created On:19/06/2023
Modified On:19/06/2023
Function: getShipping
Method getShipping which is used to find the Shipping Details through payload.
*/

//SIngle data

// const getShip=async function(bodyData){
//     let stotal = 0,Amount =0 ;
//     let[err,data]=await to(shippingConfig.findOne(
//         {
//             include:{
//                 model:Delivery
                
//               },
//             where:{
//                 id:bodyData.id,

//             }
//         },
//     ))
//     if(err) return TE(err.message);
//     // console.log(data)
//     // console.log(data.shippingType);
//     // return{data} 
//     if(data) {
//       if(data.Delivery.shippingType==="SUBTOTAL") {
//         stotal=bodyData.subtotal;
//       }
//       if(data.Delivery.shippingType==="SUBTOTAL+TAX")
//       {
//         stotal=bodyData.subtotal+bodyData.tax
//       }
//     //   return{stotal};
//       if(stotal >data.Delivery.minimumSubtotal){
//         if((data.from < stotal ) && (stotal < data.to)){
            
//             Amount=data.amount;
//             console.log(Amount);
//             // return{Amount};
//         console.log(data.Delivery.amountType);
//         if(data.Delivery.amountType==="AMOUNT") {
//             let TotalAmount=Amount;
//             return{amount: TotalAmount}
//         }  
//         if(data.Delivery.amountType==="PERCENTAGE") {
//            let  TotalAmount=stotal * (Amount/100);
//             return{amount:TotalAmount}
//         }
//       }  
//     //   else{
//     //     return {message: 'Not found'}
//     //     }
//         } 
//      }
// }
// // }
// module.exports.getShip=getShip;




//Using for loop
// const getShip=async function(bodyData){
//     let stotal = 0,Amount =[] ,totalValue= 0;
//     let[err,DeliveryData]=await to(Delivery.findOne(
//         {
//             include:{
//                 model:shippingConfig
                
//               },
//             where:{
//                 id:bodyData.id,

//             }
//         },
//     ))
//     if(err) return TE(err.message);
//     // return{DeliveryData} 
//     if(DeliveryData) {
//       if(DeliveryData.shippingType==="SUBTOTAL") {
//         stotal=bodyData.subtotal;
//         // console.log("stotal",bodyData.subtotal);
//       }
//       if(DeliveryData.shippingType==="SUBTOTAL+TAX")
//       {
//         stotal=bodyData.subtotal+bodyData.tax
//         // console.log("bgdes",bodyData.subtotal);
//         // console.log("tax",bodyData.tax);
//         // console.log("stotal",stotal);
//       }
//     //   return {stotal}
//       if(stotal >DeliveryData.minimumSubtotal){
//         let values=DeliveryData.shippingConfigs;
//         for(let i=0;i< values.length;i++){
//          if((values[i].from < stotal ) && ( stotal< values[i].to)){
//             totalValue+=values[i].amount;
//             // console.log("The Amount is",totalValue);
//             Amount.push(values[i].amount);
//            }
//         }
//     }
//     console.log(Amount);
//         // return{Amount};
//           if(DeliveryData.amountType==="AMOUNT") {
//             let TotalAmount=Amount;
//             return{amount: TotalAmount}
//         }  
//         if(DeliveryData.amountType==="PERCENTAGE") {
//             // console.log("Percentage is running");
//             // console.log("The value of",stotal);
//             let Percentage=[];
//             for(let j=0;j<Amount.length;j++){
//                 let  TotalAmount=(Amount[j]/totalValue) * 100;
//                 Percentage.push(TotalAmount);
//                 // console.log(TotalAmount);
//             }
//             return{PercentageOfAmount:Percentage}
//         }

//     }
// }
//     //   else{
//     //     return {message: 'Not found'}
//     //   }
// module.exports.getShip=getShip;



//Using forEach
const getShip=async function(bodyData){
    let stotal = 0,Amount =[] ,totalValue= 0;
    let[err,DeliveryData]=await to(Delivery.findOne(
        {
            include:{
                model:shippingConfig 
              },
            where:{
                id:bodyData.id,

            }
        },
    ))
    if(err) return TE(err.message);
   
    console.log(DeliveryData);
    if(DeliveryData) {
      if(DeliveryData.shippingType==="SUBTOTAL") {
        stotal=bodyData.subtotal;
        console.log("stotal",bodyData.subtotal);
      }
      if(DeliveryData.shippingType==="SUBTOTAL+TAX")
      {
        stotal=bodyData.subtotal+bodyData.tax
        // console.log("bgdes",bodyData.subtotal);
        // console.log("tax",bodyData.tax);
        console.log("stotal",stotal);
      }
    //   return {stotal}
      if(stotal >DeliveryData.minimumSubtotal){
        console.log("DeliveryData.minimumSubtotal",DeliveryData.minimumSubtotal);
        let values=DeliveryData.shippingConfigs;
        // return {values}
        console.log("values",values);
        // console.log("subTotal",bodyData.subtotal);
        values.forEach(element => {
            if((element.from < stotal ) && ( stotal< element.to)){
            console.log("element.amount",element.amount);
            totalValue+=element.amount;
            // console.log("The Amount is",totalValue);
            Amount.push(element.amount);
            }
        });
    }
    console.log(Amount);
        // return{Amount};
          if(DeliveryData.amountType==="AMOUNT") {
            let TotalAmount=Amount;
            return{amount: TotalAmount}
        }  
        if(DeliveryData.amountType==="PERCENTAGE") {
            // console.log("Percentage is running");
            // console.log("The value of",stotal);
            let Percentage=[];
            for(let j=0;j<Amount.length;j++){
                let  TotalAmount=(Amount[j]/totalValue) * 100;
                Percentage.push(TotalAmount);
                console.log("TotalAmount",TotalAmount);
            }
            return{PercentageOfAmount:Percentage}
        }

    }
}
    //   else{
    //     return {message: 'Not found'}
    //   }
module.exports.getShip=getShip;


const getShip1=async function(bodyData){
    let stotal = 0,Amount =[] ,totalValue= 0;
    let[err,DeliveryData]=await to(Delivery.findOne(
        {
            include:{
                model:shippingConfig 
              },
            where:{
                id:bodyData.id,

            }
        },
    ))
    if(err) return TE(err.message);
   
  
    if(DeliveryData) {
      if(DeliveryData.shippingType==="SUBTOTAL") {
        stotal=bodyData.subtotal;
       
      }
      if(DeliveryData.shippingType==="SUBTOTAL+TAX")
      {
        stotal=bodyData.subtotal+bodyData.tax
        
      
      }
    
      if(stotal >DeliveryData.minimumSubtotal){
        console.log("DeliveryData.minimumSubtotal",DeliveryData.minimumSubtotal);
        let values=DeliveryData.shippingConfigs;
       
        
       
        values.forEach(element => {
            if((element.from < stotal ) && ( stotal< element.to)){
            console.log("element.amount",element.amount);
            totalValue+=element.amount;
            
            Amount.push(element.amount);
            }
        });
    }
    console.log(Amount);
        
          if(DeliveryData.amountType==="AMOUNT") {
            let TotalAmount=Amount;
            return{amount: TotalAmount}
        }  
        if(DeliveryData.amountType==="PERCENTAGE") {
           
            let Percentage=[];
            for(let j=0;j<Amount.length;j++){
                let  TotalAmount=(Amount[j]/totalValue) * 100;
                Percentage.push(TotalAmount);
                console.log("TotalAmount",TotalAmount);
            }
            return{PercentageOfAmount:Percentage}
        }

    }
}

module.exports.getShip1=getShip1;






























// const getShip=async function(bodyData){
//     let subtotal,tax,stotal;
//     console.log(bodyData)
//     let[err,data]=await to(Delivery.findOne(bodyData),{
//         where:{
//             id:bodyData.id,
//             subtotal:bodyData.subtotal,
//             tax:bodyData.tax
//         }
//     });
//     console.log(data)
//     if(data.shippingType==="SUBTOTAL"){
//         stotal=subtotal;
//     }
//     else{
//         stotal=subtotal+tax
//     }
//     console.log(stotal);
//     if(stotal >data.minimumSubtotal){
//     if(err)return TE(err.message);
//     if(data){
//         let[err1,shippingData]=await to(shippingConfig.findOne(amount),{
//             where:{
//                 id:bodyData.id
//             },
//             stotal:{ 
//             [Op.between]:["shippingData.from","shippingData.to"]
//         }
//         })
//        if(err1) return TE(err1.message);
//        if(shippingData){
//         let[err2,DeliveryData]=await to(Delivery.findOne(amountType),
//         {
//            where:{
//             id:shippingData.id
//            } 
//         })
//         if(err2) return TE(err2.message);
//         if(DeliveryData) return{DeliveryData}
//         if(amountType==="AMOUNT"){
//             return{amount}
//         }
//         else{
//             let Total=amount/100;
//             return {Total};
//         }
//        }
//     }
// }
// }
// module.exports.getShip=getShip;
