import { ApolloServer } from "@apollo/server"
import { User } from "./user";

async function creategraphqlserver() {
    const graphserver = new ApolloServer({ 
            typeDefs: `
            type Query {
                hello:String 
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