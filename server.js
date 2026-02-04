const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Mock database data
const jewelleryData = {
    'necklace': {
        'Gold Necklace': { goldRate: 5000, goldWeight: 10, makingChargePercent: 10, wastagePercent: 5, taxPercent: 18 },
        'Diamond Necklace': { goldRate: 6000, goldWeight: 8, makingChargePercent: 12, wastagePercent: 5, taxPercent: 18 }
    },
    'ring': {
        'Gold Ring': { goldRate: 5000, goldWeight: 5, makingChargePercent: 10, wastagePercent: 5, taxPercent: 18 },
        'Diamond Ring': { goldRate: 7000, goldWeight: 4, makingChargePercent: 15, wastagePercent: 5, taxPercent: 18 }
    },
    'bracelet': {
        'Gold Bracelet': { goldRate: 5000, goldWeight: 6, makingChargePercent: 10, wastagePercent: 5, taxPercent: 18 },
        'Diamond Bracelet': { goldRate: 8000, goldWeight: 3, makingChargePercent: 15, wastagePercent: 5, taxPercent: 18 }
    }
};

// Endpoint to calculate price
app.get('/calculate', (req, res) => {
    const { jewellery, subcategory } = req.query;

    if (jewelleryData[jewellery] && jewelleryData[jewellery][subcategory]) {
        const data = jewelleryData[jewellery][subcategory];
        const goldPrice = data.goldRate * data.goldWeight;
        const makingChargeAmount = (data.makingChargePercent / 100) * goldPrice;
        const wastageAmount = (data.wastagePercent / 100) * goldPrice;
        const taxAmount = (data.taxPercent / 100) * (goldPrice + makingChargeAmount + wastageAmount);
        const totalPrice = goldPrice + makingChargeAmount + wastageAmount + taxAmount;

        res.json({
            goldRate: data.goldRate,
            goldWeight: data.goldWeight,
            makingChargePercent: data.makingChargePercent,
            wastagePercent: data.wastagePercent,
            taxPercent: data.taxPercent,
            goldPrice: goldPrice,
            makingChargeAmount: makingChargeAmount,
            wastageAmount: wastageAmount,
            taxAmount: taxAmount,
            totalPrice: totalPrice
        });
    } else {
        res.status(400).json({ error: 'Invalid jewellery or subcategory' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/gold.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});