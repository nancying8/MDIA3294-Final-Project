import { View } from 'react-native';
import { Input } from '@rneui/themed';

import { Controller } from "react-hook-form"

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

