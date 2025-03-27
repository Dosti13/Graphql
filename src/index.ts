import express from "express" 
import { expressMiddleware } from "@apollo/server/express4"
// Import the types explicitly
import creategraphqlserver from "./graphql"
import UserService from "./services/user"

const PORT = 4000

const main = async () => {
    const app = express()
    
    const gqlserver = await creategraphqlserver()
  
    const apolloMiddleware = expressMiddleware(gqlserver, {
        context: async ({ req }) => {
            // @ts-ignore
            
            const token = req.headers["token"];
    
            try {
              const user = UserService.decodeJWTToken(token as string);
              return { user };
            } catch (error) {
              return {};
            }
          },
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