const capitalize = (value) => {
    let string = value?.replaceAll("_", " ");
    return (string?.toString()?.charAt(0)?.toUpperCase() + string?.toString()?.slice(1)).toString();
}

const booleanTypeArray = [
    "power_steering",
    "airbags",
    "sunroof",
    "matte_finish",
    "music_system"
]

const dbSchema = [
    "sales_id",
    "date_of_purchase",
    "customer_id",
    "fuel",
    "premium",
    "vehicle_segment",
    "selling_price",
    "power_steering",
    "airbags",
    "sunroof",
    "matte_finish",
    "music_system",
    "customer_gender",
    "customer_income_group",
    "customer_region",
    "customer_marital_status"
]

const searchSchema = [
    "sales_id",
    "customer_id"
]
const tableName = "car_sales";
const dbName = "bcg_db";
module.exports = {
    capitalize, booleanTypeArray, dbSchema, searchSchema, tableName, dbName
}