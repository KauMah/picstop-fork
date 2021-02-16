import { Client, Configuration } from 'rollbar-react-native';

const config = new Configuration('8c4f75e847de489894333c15db92e39b', {
  captureUncaught: false,
  captureUnhandledRejections: false,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: 1,
      },
    },
  },
});
export const rollbar = new Client(config);
