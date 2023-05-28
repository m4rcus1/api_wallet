const express = require("express");
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const app = express();
const generate = require('node-chartist');
const port = 8080;
var http = require("http");
// const { engine } = require("express-handlebars");
const expressHandlebars = require('express-handlebars')
// Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
// app.engine("handlebars", engine());

// Enable CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your desired origin or whitelist of origins
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.set("views", "./views");
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
const admin = require('firebase-admin');
const serviceAccount = require('./mywallet-94a61-firebase-adminsdk-pl3bi-083b6e55b9.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mywallet-94a61-default-rtdb.firebaseio.com' // Replace with your database URL
});
// Read data
const ref = admin.database().ref('/');
ref.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });

// Write data
const newData = {
  name: {
    a:'1',
    b:'2'
  },
  age: 25,
  email: 'john@example.com'
};

// ref.set(newData)
//   .then(() => {
//     console.log('Data written successfully.');
//   })
//   .catch((error) => {
//     console.error('Error writing data:', error);
//   });a
// ref.child('name/a').remove()
//   .then(() => {
//     console.log('Child node removed successfully.');
//   })
//   .catch((error) => {
//     console.error('Error removing child node:', error);
//   });
// ref.update(updatedData)
//   .then(() => {
//     console.log('Data updated successfully.');
//   })
//   .catch((error) => {
//     console.error('Error updating data:', error);
//   });
app.get('/',(req,res)=>{
  const ref = admin.database().ref('/');

  ref.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      console.log(data);

      // Send the data as a JSON response
      res.json(data);
      res.end();
    })
    .catch((error) => {
      console.error('Error reading data:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ error: 'Error reading data' });
    });
})
// app.get('/add',(req,res)=>{
//   res.render('add');
// })
app.get('/add', (req, res) => {
  res.render('add')
  // const { account, password } = req.query;
  // if (!account || !password) {
  //   return res.status(400).json({ error: 'Missing account or password in the request body' });
  // }
  // // Perform any necessary processing or validation with the received parameters

  // // Example response data

  // const responseData ={
  //   [account]: {
  //     role: 0,
  //     account: account,
  //     password: password,
  //   },
  // };

  // ref.set(responseData)
  // .then(() => {
  //   console.log('Data written successfully.');
  // })
  // .catch((error) => {
  //   console.error('Error writing data:', error);
  // });
  // res.json(responseData);
});
app.post('/add', (req, res) => {
  const { account, password } = req.body;
  
  // if (!account || !password) {
  //   return res.status(400).json({ error: 'Missing account or password in the request body' });
  // }

  // Example data to be added
  const newData = {
    [account]: {
      role: 0,
      account: account,
      password: password,
    },
  };

  // Update the database with the new data
  ref.update(newData)
    .then(() => {
      console.log('Data updated successfully.');
      res.json(newData);
    })
    .catch((error) => {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Failed to update data' });
    });
});


// app.post("/", (req, res) => {
//   // geturl('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=9I9TEYBJGPTSE73G')
//   //   .then(data => {
//   //     let x=[]
//   //     let y=[]

//   //     let xc=[]
//   //     let xh=[]
//   //     let xl=[]
//   //     let xv=[]
//   //     let data1=[]
//   //     var xValues = [50,60,70,80,90,100,110,120,130,140,150];
//   //     xValues[xValues.length]=100
     
//   //     let d=data[Object.keys(data)[1]]
//   //     for(let i=0; i<7; i++){
//   //         x[x.length]=parseFloat(d[Object.keys(d)[i]]['1. open'])
//   //         xc[xc.length]=parseFloat(d[Object.keys(d)[i]]['4. close'])
//   //         xh[xh.length]=parseFloat(d[Object.keys(d)[i]]["2. high"])
//   //         xl[xl.length]=parseFloat(d[Object.keys(d)[i]]["3. low"])
          
//   //         y[y.length]=Object.keys(d)[i]
//   //         data[data.length]=[Object.keys(d)[i],parseInt(d[Object.keys(d)[i]]['1. open']*10000)]
//   //     }
//   //     console.log(x)
//   //     console.log(y)
//   //     for(let i=0;i<y.length;i++){
//   //         y[i]=`'${y[i]}'`
//   //     }
//   //    let bar=`<script>
//   //     Highcharts.chart('chart1', {
//   //         title: {
//   //             text: 'Stock',
//   //         },
//   //         xAxis: {
//   //             categories: [${y}]
//   //         },
//   //         yAxis: {
//   //             title: {
//   //                 text: 'Price'
//   //             },
//   //             plotLines: [{
//   //                 value: 0,
//   //                 width: 6,
//   //                 color: '#999999'
//   //             }]
//   //         },
//   //         tooltip: {
//   //             valueSuffix: '$'
//   //         },
//   //         legend: {
//   //             layout: 'vertical',
//   //             align: 'right',
//   //             verticalAlign: 'middle',
//   //             borderWidth: 0
//   //         },
//   //         series: [{
//   //           name: 'Open price',
//   //             label:[${y}],
//   //             data: [${x}],
//   //             color: '#5EBA7D'
//   //         },{
//   //           name:'Close price',
//   //           label:[${y}],
//   //           data: [${xc}],
//   //           color: '#4d94ff'
//   //         },{
//   //           name:'Highest price',
//   //           label:[${y}],
//   //           data: [${xh}],
//   //           color: '#ffff33'
//   //         },
//   //         {
//   //           name:'Lowest price',
//   //           label:[${y}],
//   //           data: [${xl}],
//   //           color: '#ff0000'
//   //         }
//   //       ]
//   //     });
//   // ;</script>
//   // `
//   //     res.render('index',{bar:bar})
//   //   })
//   // Get the values of 'a' and 'b' from the query parameters
//   const { a, b } = req.query;

//   // Convert 'a' and 'b' to numbers
//   const numA = parseInt(a);
//   const numB = parseInt(b);

//   // Check if 'a' and 'b' are valid numbers
//   if (isNaN(numA) || isNaN(numB)) {
//     // Return an error response if 'a' or 'b' is not a valid number
//     return res.status(400).json({ error: 'Invalid input. Please provide valid numbers.' });
//   }

//   // Calculate the sum of 'a' and 'b'
//   const sum = numA + numB;

//   // Return the sum as JSON
//   return res.json({ sum });
// });

// app.get('/abc',(req,res)=>{
//   // Make a GET request to the API endpoint
//   const { a, b } = req.query;

//   // Convert 'a' and 'b' to numbers
//   const numA = parseInt(a);
//   const numB = parseInt(b);
//   const url=`http://localhost:8080?a=${a}&b=${b}`
//   const data = { name: 'John Doe', age: 25 };
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),

//   })
//     .then(response => response.json())
//     .then(result => {
//       // Process the response from the server
//       console.log(result);

//       res.render('index',{bar:JSON.stringify(result)})
//     })
//     .catch(error => {
//       // Handle any errors that occurred during the request
//       console.error('Error:', error);
//     });
// // res.render('index',{bar:'overload'})
// console.log(234)
// })
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
    "press Ctrl-C to terminate. "
  )
);
