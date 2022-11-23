const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const url = process.env.DB

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);


const server = new ApolloServer({
  typeDefs,
  resolvers,
});
mongoose.connect(url)

server.listen(5000).then(({ url }) => console.log(`Server is on ${url}`));
