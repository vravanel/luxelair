/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n": types.LoginDocument,
    "\n\tquery GetMyProfile {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n": types.GetMyProfileDocument,
    "\nmutation SignOut {\n  signOut\n}\n": types.SignOutDocument,
    "\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n": types.CreateUserDocument,
    "\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n": types.SearchAdDocument,
    "\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  ": types.GetHousingTypesDocument,
    "\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n": types.GetEquipmentsDocument,
    "\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  ": types.GetMyProfilUpdateDocument,
    "\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  ": types.UpdateUserDocument,
    "\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n": types.GetMyProfilDocument,
    "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n": types.AdDocument,
    "\n    mutation CreateAd(\n      $title: String!\n      $location: String!\n      $price: Float!\n      $description: String\n      $selectedEquipmentValues: [String!]\n      $type: HousingTypeEnum\n    ) {\n      createAd(\n        title: $title\n        location: $location\n        price: $price\n        description: $description\n        selectedEquipmentValues: $selectedEquipmentValues\n        type: $type\n      ) {\n        description\n        location\n        price\n        selectedEquipmentValues\n        title\n      }\n    }\n  ": types.CreateAdDocument,
    "\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n": types.AdsDocument,
    "\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"): (typeof documents)["\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetMyProfile {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetMyProfile {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation SignOut {\n  signOut\n}\n"): (typeof documents)["\nmutation SignOut {\n  signOut\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"): (typeof documents)["\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  "): (typeof documents)["\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n"): (typeof documents)["\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  "): (typeof documents)["\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  "): (typeof documents)["\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateAd(\n      $title: String!\n      $location: String!\n      $price: Float!\n      $description: String\n      $selectedEquipmentValues: [String!]\n      $type: HousingTypeEnum\n    ) {\n      createAd(\n        title: $title\n        location: $location\n        price: $price\n        description: $description\n        selectedEquipmentValues: $selectedEquipmentValues\n        type: $type\n      ) {\n        description\n        location\n        price\n        selectedEquipmentValues\n        title\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateAd(\n      $title: String!\n      $location: String!\n      $price: Float!\n      $description: String\n      $selectedEquipmentValues: [String!]\n      $type: HousingTypeEnum\n    ) {\n      createAd(\n        title: $title\n        location: $location\n        price: $price\n        description: $description\n        selectedEquipmentValues: $selectedEquipmentValues\n        type: $type\n      ) {\n        description\n        location\n        price\n        selectedEquipmentValues\n        title\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n"): (typeof documents)["\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;