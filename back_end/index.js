const express = require('express');
const cors = require("cors");
const app = express();
PORT = 5000
const { Client, Pool } = require("pg");
const { capitalize, booleanTypeArray, dbSchema, searchSchema, tableName } = require('./constants');
const postgresClient = new Client({
    user: "postgres",
    password: "1234",
    // host: "tcp-mo1.mogenius.io",
    host: "localhost",
    database: "bcg_db",
    port: "6666"
    // port: "12141"
});

postgresClient.connect().then((e) => {
    console.log("Client Connected")
}).catch(e => { console.error(e) });

app.use(express.json());
app.use(cors());

app.get("/api/statistics", (req, res) => {
    try {
        let queries = [
            "select to_char(date_of_purchase,'Mon-YYYY') as month, fuel, COUNT(fuel) from car_sales group by 1,2",
            "select customer_gender as name, COUNT(customer_gender) from car_sales group by 1",
            "select customer_region as name, COUNT(customer_region) from car_sales group by 1"
        ]
        postgresClient.query(queries?.join("; "), null, async (error, data) => {
            let dataMap = data?.map((statsData, index) => {
                let rows = statsData?.rows;
                if (index === 0) {
                    let set = {}
                    let rowMap = rows?.map(elem => {
                        set[elem?.month] = !!set[elem?.month] ? { ...set[elem?.month], [elem?.fuel]: Number(elem?.count), total: Number(set[elem?.month].total) + Number(elem?.count) } : { [elem?.fuel]: Number(elem?.count), total: Number(elem?.count) };
                    })
                    return Object.entries(set)?.map(([key, value]) => {
                        return {
                            name: key,
                            ...value
                        }
                    }).sort((a, b) => new Date(a.name) - new Date(b.name));
                } else {
                    return rows.map(elem => { return { ...elem, count: Number(elem?.count) } });
                }
            })
            res.send({ monthlySales: dataMap[0], genderSales: dataMap[1], regionSales: dataMap[2] })
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error)
    }
})

app.get("/api/search", async (req, res) => {
    try {
        let searchText = req.query.search;
        postgresClient.query(`SELECT * FROM car_sales WHERE '${searchText}' IN (${searchSchema?.join(", ")})`, null, (error, data) => {
            if (error) {
                console.error(error); res.status(400).send(error);
            } else {
                res.send({ rows: data.rows, columns: data.fields }).status(200);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error)
    }
})
app.get("/api/getAllData", async (req, res) => {
    try {
        postgresClient.query("SELECT * FROM car_sales", null, (error, data) => {
            if (error) {
                console.error(error);
                res.status(400).send(error)
            } else {
                res.send({ rows: data.rows, columns: data.fields }).status(200);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error)
    }
})

app.post("/api/newSale", (req, res) => {
    try {
        let keysArray = Object.entries(req.body).map(([key, value]) => key);
        let valuesArray = Object.entries(req.body).map(([key, value]) => `'${value}'`);
        let query = `INSERT INTO ${tableName} (${keysArray?.join(",")}) VALUES (${valuesArray?.join(",")});`;
        postgresClient.query(query, null, (error, result) => {
            if (error) {
                console.error(error);
                res.status(400).send(error);
            } else {
                res.send(result).status(201);
            }
        })
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
})
app.put("/api/updateSale", async (req, res) => {
    try {
        let setValues = Object.entries(req.body).filter(([key, value]) => key !== "sales_id" && key !== "date_of_purchase").map(([key, value]) => `${key}='${!!value ? value : 0}'`)
        await Promise.all([setValues]);
        let query = `UPDATE ${tableName} SET ${setValues.join(", ")} WHERE sales_id=${req?.body?.sales_id} `;
        postgresClient.query(query, null, (error, result) => {
            if (error) {
                console.error(error);
                res.status(400).send(error);
            } else {
                res.send(result).status(201);
            }
        })
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
})

app.get("/api/getSaleData", (req, res) => {
    try {
        postgresClient.query(`SELECT * from car_sales WHERE sales_id=${req.query.salesId} LIMIT 1`, null, async (error, data) => {
            if (error) {
                console.error(error); res.status(400).send(error);
            } else {
                let row = data?.rows[0];
                let formattedData = {};
                let statistics = [];
                // creating hashmap of data
                let mainData = data?.fields?.map((field) => {
                    let format = field?.format;
                    if (booleanTypeArray?.includes(field?.name)) {
                        format = "boolean";
                    } else if (field?.name === "customer_marital_status") {
                        format = "dropdown";
                    }
                    formattedData[field.name] = row[field?.name]
                })
                let statData = booleanTypeArray?.map(elem => {
                    return {
                        name: capitalize(elem),
                        value: row[elem]
                    }
                });
                await Promise.all([mainData, statData]);
                res.send({ saleData: formattedData, featureData: statData }).status(200);
            }
        })
    } catch (error) {
        console.error(error); res.status(400).send(error)
    }
})

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
})