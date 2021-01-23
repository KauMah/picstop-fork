import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  'Sign Up': undefined;
};

export type LocationStackParamList = {
  Map: undefined;
  NewLocation: undefined;
};

export type CreateLocationScreenRouteProp = RouteProp<
  LocationStackParamList,
  'NewLocation'
>;
export type Location = {
  __v: number;
  _id: string;
  createdAt: string;
  geoLocation: {
    coordinates: Array<number>;
    type: string;
  };
  name: string;
  isOfficial: boolean;
  updatedAt: string;
};

export type Post = {
  __v: number;
  _id: string;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  caption: string;
  likes: Array<string>;
  comments: Array<Object>;
  location: string;
};
