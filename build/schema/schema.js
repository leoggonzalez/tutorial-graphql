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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var axios_1 = __importDefault(require("axios"));
var CompanyType = new graphql_1.GraphQLObjectType({
    name: 'Company',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3000/companies/" + parentValue.id + "/users/")];
                            case 1:
                                resp = _a.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
    }); },
});
var UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        company: {
            type: CompanyType,
            resolve: function (parentValue) {
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3000/companies/" + parentValue.companyId)];
                            case 1:
                                resp = _a.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
    }); },
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3000/users/" + args.id)];
                            case 1:
                                resp = _a.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3000/companies/" + args.id)];
                            case 1:
                                resp = _a.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
    },
});
var RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                companyId: { type: graphql_1.GraphQLString },
            },
            resolve: function (parentValue, _a) {
                var firstName = _a.firstName, age = _a.age;
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, axios_1.default.post('http://localhost:3000/users/', {
                                    firstName: firstName,
                                    age: age,
                                })];
                            case 1:
                                resp = _b.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (_, _a) {
                var id = _a.id;
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, axios_1.default.delete("http://localhost:3000/users/" + id)];
                            case 1:
                                resp = _b.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                firstName: { type: graphql_1.GraphQLString },
                age: { type: graphql_1.GraphQLInt },
                companyId: { type: graphql_1.GraphQLString },
            },
            resolve: function (_, _a) {
                var id = _a.id, firstName = _a.firstName, age = _a.age, companyId = _a.companyId;
                return __awaiter(this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, axios_1.default.patch("http://localhost:3000/users/" + id, {
                                    age: age,
                                    firstName: firstName,
                                    companyId: companyId,
                                })];
                            case 1:
                                resp = _b.sent();
                                return [2 /*return*/, resp.data];
                        }
                    });
                });
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
