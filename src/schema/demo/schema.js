export const Name = `
type Name {
  name: String!
}
`;
export const typeDef = `
  extend type Query {
    nameList(type: NameType): [Name]
  }
  enum NameType {
    MOBILE
    WEB
    LANDING
  }
  ${Name}
`;

export const resolvers = () =>
     ({
         Query: {
             nameList: (root, args, context) =>
                context.dataSources.demoApi.getName({ ...context, ...args }),
         }
     });
