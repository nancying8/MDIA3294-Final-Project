// Import react, view from react
import { View } from 'react-native';
// Importing themed UI components from React Native Elements
import { Input } from '@rneui/themed';
// Importing Controller from react-hook-form for form management
import { Controller } from "react-hook-form"

// text input control
// log in section on username and passpword
// TextInputControl component to handle form input fields with validation and error messages
export default function TextInputControl({ control, errors, fieldname, placeholder, inputMode, secureEntry }) {

    return (
        <View>
            <Controller
                control={control}
                name={fieldname}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        inputMode={inputMode}
                        placeholder={placeholder}
                        secureTextEntry={secureEntry}
                        errorMessage={errors[fieldname] && errors[fieldname].message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}                
            />
        </View>
    );

}

