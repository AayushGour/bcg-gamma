CREATE TABLE car_sales (
    sales_id INT PRIMARY KEY,
    date_of_purchase DATE,
    customer_id INT,
    fuel TEXT,
    premium INT,
    vehicle_segment TEXT,
    selling_price INT,
    power_steering BOOLEAN,
    airbags BOOLEAN,
    sunroof BOOLEAN,
    matte_finish BOOLEAN,
    music_system BOOLEAN,
    customer_gender TEXT,
    customer_income_group TEXT,
    customer_region TEXT,
    customer_marital_status BOOLEAN
);