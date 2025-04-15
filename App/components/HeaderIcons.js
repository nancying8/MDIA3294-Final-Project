import React from 'react';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';

export default function HeaderIcons({ navigation }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          style={{ marginRight: 15 }}
          name="paw"
          type="font-awesome"
          color="#e76f51"
          onPress={() => navigation.navigate('Adoption')} // Navigate to Adoption
        />
      <Icon
        style={{ marginRight: 15 }}
        name="user"
        type="font-awesome"
        color="#e76f51"
        onPress={() => navigation.navigate('Profile')} // Navigate to Profile
      />
    </View>
  );
}

