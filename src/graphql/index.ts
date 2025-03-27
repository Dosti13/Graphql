import { ApolloServer } from "@apollo/server"
import { User } from "./user";

async function creategraphqlserver() {
    const graphserver = new ApolloServer({ 
            typeDefs: `
             ${User.typeDefs}
            type Query {
            ${User.queries}
            }
            type Mutation{
              ${User.mutations} 
            }    
            `, 
            
            resolvers: {
                Query: {
                    ...User.resolver.queries
                } ,
                Mutation:{
                    ...User.resolver.mutations
                          }
                    
                
            }
        });
        
        await graphserver.start()
    return graphserver
}
export default creategraphqlserver