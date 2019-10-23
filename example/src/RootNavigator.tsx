import * as React from 'react';
import { Appbar } from 'react-native-paper';
import ExampleList, { examples } from './ExampleList';
import {
  createNavigator,
  useNavigationBuilder,
  NavigationContainer,
  DefaultNavigatorOptions,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/core';
import { StackRouter, StackNavigationState } from '@react-navigation/routers';

type SimpleNavigationProp = NavigationProp<
  ParamListBase,
  string,
  StackNavigationState,
  SimpleNavigatorOptions
>;

type SimpleNavigatorOptions = {
  title?: string;
  headerShown?: boolean;
  header?: (props: {
    navigation: SimpleNavigationProp;
    title: string;
  }) => React.ReactNode;
};

function SimpleNavigator(
  props: DefaultNavigatorOptions<SimpleNavigatorOptions>
) {
  const { state, descriptors } = useNavigationBuilder(StackRouter, props);
  const route = state.routes[state.index];
  const { render, options, navigation } = descriptors[route.key];

  return (
    <>
      {options.headerShown !== false &&
        options.header &&
        options.header({ navigation, title: options.title || route.name })}
      {render()}
    </>
  );
}

const createSimpleNavigator = createNavigator<
  SimpleNavigatorOptions,
  typeof SimpleNavigator
>(SimpleNavigator);

const Stack = createSimpleNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, title }) => (
            <Appbar.Header>
              {navigation.isFirstRouteInParent() ? null : (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              )}
              <Appbar.Content title={title} />
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
    </NavigationContainer>
  );
}
