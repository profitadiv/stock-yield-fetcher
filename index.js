const bvmfFunction = require('bvmf').default;
const express = require('express');
const app = express();

app.use(express.json()); // Para lidar com requisições POST em formato JSON

app.post('/stock-info-lookup', async (req, res) => {
	  const ticker = req.body.ticker;
	  const stockInfo = await fetchStockInfo(ticker);
	  res.json(stockInfo);
});

app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
	  console.log('Server is listening on port 3000');
});

const fetchStockInfo = async (ticker) => {
	  try {
		      const result = await bvmfFunction({ bvmf: ticker });
		      console.log(`The dividend yield for ${ticker} is: ${result.stock[0].yield}%`);
		      return {
			            currentValue: result.stock[0].currentValue, // Retornando o preço
			            yield: result.stock[0].yield  // Retornando o "dividend yield"
			          };
		    } catch (error) {
			        console.error(`Failed to fetch the info for ${ticker}. Error: ${error.message}`);
			        return null; // Retornando null em caso de erro
			      }
};
