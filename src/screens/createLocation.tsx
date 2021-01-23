import * as Yup from 'yup';

import { StyleSheet, View } from 'react-native';

import { CreateLocationScreenRouteProp } from '../types';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import _ from 'lodash';
import { exo } from '../utils/api';
import { faMonument } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  field: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
  },
});

const LocSchema = Yup.object().shape({
  name: Yup.string().required('Location name required'),
});

type Props = {
  route: CreateLocationScreenRouteProp;
};

interface FormValues {
  name: string;
}

const CreateLocation = (props: Props) => {
  const postCreateLocation = async (values: FormValues) => {
    const coords = _.get(props.route, 'params.coords', [0, 0]);

    exo
      .post('/locations/location', {
        long: coords[0],
        lat: coords[1],
        name: values.name,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={postCreateLocation}
        initialErrors={{ name: 'err' }}
        validationSchema={LocSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => {
          return (
            <View>
              <IconTextField
                icon={faMonument}
                placeholder={'Location name'}
                value={values.name}
                onBlur={handleBlur('name')}
                style={styles.field}
                onChangeText={handleChange('name')}
                invalid={touched.name ? (errors.name ? true : false) : false}
              />
              <StyledButton
                type={'green'}
                text={'Add Location'}
                onPress={handleSubmit}
                style={styles.button}
                disabled={!touched || !isValid}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateLocation;
