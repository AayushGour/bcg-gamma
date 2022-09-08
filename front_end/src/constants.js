import React from "react";
import { AiOutlineEdit, AiOutlineLineChart, AiOutlineTable } from "react-icons/ai";

export const leftSidebarMenuItems = [
    {
        id: 0,
        title: "Overview",
        icon: <AiOutlineTable />,
        route: "/"
    },
    {
        id: 1,
        title: "Sales",
        icon: <AiOutlineEdit />,
        route: "/sales"
    },
    {
        id: 2,
        title: "Statistics",
        icon: <AiOutlineLineChart />,
        route: "/statistics"
    },
    {
        id: 3,
        title: "Search",
        hidden: true,
        route: "/search"
    },
]
export const saleFormFields = [
    {
        columnId: 1,
        format: "text",
        name: "sales_id"
    },
    {
        columnId: 2,
        format: "date",
        name: "date_of_purchase",
        immutable: true
    },
    {
        columnId: 3,
        format: "text",
        name: "customer_id"
    },
    {
        columnId: 4,
        format: "text",
        name: "fuel"
    },
    {
        columnId: 5,
        format: "text",
        name: "premium"
    },
    {
        columnId: 6,
        format: "text",
        name: "vehicle_segment"
    },
    {
        columnId: 7,
        format: "number",
        name: "selling_price",
        maxValue: 100000
    },
    {
        columnId: 8,
        format: "boolean",
        name: "power_steering"
    },
    {
        columnId: 9,
        format: "boolean",
        name: "airbags"
    },
    {
        columnId: 10,
        format: "boolean",
        name: "sunroof"
    },
    {
        columnId: 11,
        format: "boolean",
        name: "matte_finish"
    },
    {
        columnId: 12,
        format: "boolean",
        name: "music_system"
    },
    {
        columnId: 13,
        format: "dropdown",
        name: "customer_gender",
        values: [{ title: "Male", value: "Male" }, { title: "Female", value: "Female" }]
    },
    {
        columnId: 14,
        format: "text",
        name: "customer_income_group"
    },
    {
        columnId: 15,
        format: "text",
        name: "customer_region"
    },
    {
        columnId: 16,
        format: "dropdown",
        name: "customer_marital_status",
        values: [{ title: "Single", value: "0" }, { title: "Married", value: "1" }]
    }
]

const booleanTypeArray = [
    "power_steering",
    "airbags",
    "sunroof",
    "matte_finish",
    "music_system"
]

// username = "postgres"
// password = "admin"
// docker build --no-cache -t bcg_db_image .
// docker run -dt --name bcg -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=postgres -e POSTGRES_DB=bcg_db -p 6666:5432 bcg_db_image
// docker exec -it bcg sh
// psql -U postgres -d bcg_db
// \COPY car_sales FROM data.csv DELIMITER ',' CSV HEADER;