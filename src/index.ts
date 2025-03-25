import express from "express" 
import { expressMiddleware } from "@apollo/server/express4"
// Import the types explicitly

import creategraphqlserver from "./graphql"

const PORT = 5000

const main = async () => {
    const app = express()
    
    const gqlserver = await creategraphqlserver()
  
    const apolloMiddleware = expressMiddleware(gqlserver, {
        context: async ({ req }) => ({ req })
    });
    
    // Use a workaround to fix the type conflict
    app.use(express.json())
    app.use("/graphql", (req, res, next) => {
        // Cast to any to bypass TypeScript errors
        return apolloMiddleware(req as any, res as any, next);
    });
    
    app.get("/", (req, res) => {
        res.json({"hello": "hi"})
    });

    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
}

main()