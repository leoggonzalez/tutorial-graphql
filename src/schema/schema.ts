import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import axios from 'axios';

const CompanyType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: async function(parentValue, args) {
        const resp = await axios.get(
          `http://localhost:3000/companies/${parentValue.id}/users/`
        );
        return resp.data;
      },
    },
  }),
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: async function(parentValue) {
        const resp = await axios.get(
          `http://localhost:3000/companies/${parentValue.companyId}`
        );
        return resp.data;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async function(_, args) {
        const resp = await axios.get(`http://localhost:3000/users/${args.id}`);
        return resp.data;
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: async function(_, args) {
        const resp = await axios.get(
          `http://localhost:3000/companies/${args.id}`
        );
        return resp.data;
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: async function(parentValue, { firstName, age }) {
        const resp = await axios.post('http://localhost:3000/users/', {
          firstName,
          age,
        });
        return resp.data;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async function(_, { id }) {
        const resp = await axios.delete(`http://localhost:3000/users/${id}`);
        return resp.data;
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: async function(_, { id, firstName, age, companyId }) {
        const resp = await axios.patch(`http://localhost:3000/users/${id}`, {
          age,
          firstName,
          companyId,
        });
        return resp.data;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
