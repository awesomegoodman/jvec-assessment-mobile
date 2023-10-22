import { ParamListBase } from '@react-navigation/native';

// Define navigation routes
export type RootStackParamList = {
    Homepage: undefined;
    Signup: undefined;
    ContactDetails: { contact: Contact };
    DeleteContact: { contactId: number };
    EditContact: { contact: Contact };
} & ParamListBase;

export type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number?: string;
};
