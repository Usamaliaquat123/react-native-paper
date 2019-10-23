import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import ExampleList, { examples } from './ExampleList';

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : (
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
              />
            )}
            <Appbar.Content title={scene.descriptor.options.title} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={ExampleList}
        options={{ title: 'Examples' }}
      />
      {Object.keys(examples).map(id => (
        <Stack.Screen
          key={id}
          name={id}
          component={examples[id]}
          options={{ title: examples[id].title }}
        />
      ))}
    </Stack.Navigator>
  );
}
