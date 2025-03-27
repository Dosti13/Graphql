"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
// Import the types explicitly
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
const PORT = 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const gqlserver = yield (0, graphql_1.default)();
    const apolloMiddleware = (0, express4_1.expressMiddleware)(gqlserver, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            // @ts-ignore
            const token = req.headers["token"];
            try {
                const user = user_1.default.decodeJWTToken(token);
                return { user };
            }
            catch (error) {
                return {};
            }
        }),
    });
    // Use a workaround to fix the type conflict
    app.use(express_1.default.json());
    app.use("/graphql", (req, res, next) => {
        // Cast to any to bypass TypeScript errors
        return apolloMiddleware(req, res, next);
    });
    app.get("/", (req, res) => {
        res.json({ "hello": "hi" });
    });
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
main();
