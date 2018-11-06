# Gas_Predictor


MongoDB connection String: mongodb+srv://tobafo19:tobafo19@teamnaija-y3vyh.mongodb.net/Gas_Predictor?retryWrites=true


View all clients and quotes information respectively:
GET: http://localhost:3000/clientsInfo/
GET: http://localhost:3000/quotes

View client information/quote by ID respectively:
GET: http://localhost:3000/clientsInfo/id
GET: http://localhost:3000/quotes/id

Add a client and quote respectively:
POST: http://localhost:3000/clientsInfo/
POST: http://localhost:3000/quotes

Update client information and quote respectively:
PUT: http://localhost:3000/clientsInfo/id change information in body
PUT:http://localhost:3000/quotes/id change information in body

Delete a client and quote respectively:
DELETE:http://localhost:3000/clientsInfo/id
DELETE: http://localhost:3000/quotes/id
