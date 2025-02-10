// db/index.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// demo.js
const fs = require('fs');
const csv = require('csv-parser');
const filePath = "./db/cocktails.csv"; 


// Function to check if data already exists
async function isDatabaseEmpty() {
    const count = await prisma.cocktail.count(); // Count rows in the Cocktail table
    return count === 0; // Return true if the database is empty
}

// Function to import CSV only if database is empty
async function importCSV() {
    const isEmpty = await isDatabaseEmpty();
    if (!isEmpty) {
        console.log("Database already has data. Skipping CSV import.");
        return;
    }

    console.log("Importing CSV data into the database...");

    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        console.log(data)
        })
        .on('end', async () => {
            try {
                for (const row of results) {
                    await prisma.cocktail.create({
                        data: {
                            title: row.title,
                            difficulty: row.difficulty,
                            portion: row.portion,
                            time: row.time,
                            description: row.description,
                            ingredients1: row.ingredients1,
                            ingredients2: row.ingredients2,
                            ingredients3: row.ingredients3,
                            ingredients4: row.ingredients4,
                            ingredients5: row.ingredients5,
                            ingredients6: row.ingredients6,
                            ingredients7: row.ingredients7,
                            ingredients8: row.ingredients8,
                            ingredients9: row.ingredients9,
                            ingredients10: row.ingredients10,
                            ingredients11: row.ingredients11,
                            ingredients12: row.ingredients12,
                            image: row.image,
                            Step1: row.Step1,
                            Step2: row.Step2,
                            Step3: row.Step3,
                            Step4: row.Step4,
                            Step5: row.Step5,
                            Step6: row.Step6

                        }
                    });
                }
                console.log("✅ CSV data imported successfully!");
            } catch (error) {
                console.error("❌ Error inserting data:", error);
            }
        });
}

// Call the function to import data only once
importCSV();

module.exports = prisma;
