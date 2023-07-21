module.exports=(sequelize,DataTypes)=>{
    const shippingConfig=sequelize.define('shippingConfig',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        from:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        to:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }

},  {
    tableName:'shippingConfig',schema:'ship',underscored:false,timestamps:true,freezeTableName:false
    })
    shippingConfig.association = function (models) {
        shippingConfig.belongsTo(models.Delivery, { foreignKey: "deliveryId"});
     };

return shippingConfig;
}


