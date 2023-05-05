import React from 'react';
import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from 'constants/defaultValues';
import moment from 'moment';
import { DATE_FORMAT, DISPLAY_TEXT_TYPE } from 'utils/CONSTANTS';

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem('currentLanguage')
      ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('gogo_current_user') != null
        ? JSON.parse(localStorage.getItem('gogo_current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('gogo_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gogo_current_user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const momentDateFormat = (
  date,
  format = DATE_FORMAT.STANDARD_DISPLAY
) => {
  return moment(date).format(format);
};

export const getStatus = (status) => {
  switch (status) {
    case 'Pending':
      return 'pending';
    case 'On Going':
      return 'onGoing';
    case 'Done':
      return 'done';
    default:
      return 'pending';
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'onGoing':
      return 'On Going';
    case 'done':
      return 'Done';
    default:
      return 'Pending';
  }
};

export const getType = (type) => {
  switch (type) {
    case 'Part Time':
      return 'partTime';
    case 'Full Time':
      return 'fullTime';
    case 'Freelancer':
      return 'freelancer';
    default:
      return 'fullTime';
  }
};

export const getTypeLabel = (type) => {
  switch (type) {
    case 'partTime':
      return 'Part Time';
    case 'fullTime':
      return 'Full Time';
    case 'freelancer':
      return 'Freelancer';
    default:
      return 'Full Time';
  }
};

export const getYesNo = (detail) => {
  if (detail) {
    return 'Yes';
  }
  return 'No';
};

export function isEmpty(value) {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  );
}

const getValue = (value, type) => {
  let tempValue = value;
  if (value && Array.isArray(value) && value.length > 0) {
    tempValue = value.join(', ');
  } else if (type === DISPLAY_TEXT_TYPE.DATE) {
    tempValue = momentDateFormat(value);
  } else if (type === DISPLAY_TEXT_TYPE.YES_NO) {
    tempValue = getYesNo(value);
  }
  return tempValue;
};

export const displayRow = (label, value, type = '') => {
  if (!isEmpty(value)) {
    return <p className="mb-3">{`${label}: ${getValue(value, type)}`}</p>;
  }
  return <></>;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getGenderLabel = (gender) => {
  let value = 'Other';
  if (gender === 'M') {
    value = 'Male';
  } else if (gender === 'F') {
    value = 'Female';
  }

  return value;
};

export const getGenderPatientLabel = (gender) => {
  let value = 'Other';
  if (gender === 'male') {
    value = 'Male';
  } else if (gender === 'female') {
    value = 'Female';
  }

  return value;
};
