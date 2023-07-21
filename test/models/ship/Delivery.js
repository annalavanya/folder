module.exports=(sequelize,DataTypes)=>{
    const Delivery=sequelize.define('Delivery',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        storeId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        minimumSubtotal:{
            type:DataTypes.INTEGER,  
        },
        shippingType:{
            type:DataTypes.ENUM("SUBTOTAL","SUBTOTAL+TAX")
        },
        amountType:{
            type:DataTypes.ENUM("AMOUNT","PERCENTAGE")
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },

},  {
    tableName:'Delivery',schema:'ship',underscored:false,timestamps:true,freezeTableName:false
    })
    Delivery.association = function (models) {
        Delivery.hasMany(models.shippingConfig, { foreignKey: "deliveryId"});
     };

return Delivery;
}


