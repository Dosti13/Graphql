"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
const resolver_1 = require("./resolver");
const typeDefs_1 = require("./typeDefs");
exports.User = { mutations: mutation_1.mutations, queries: queries_1.queries, resolver: resolver_1.resolver, typeDefs: typeDefs_1.typeDefs };
