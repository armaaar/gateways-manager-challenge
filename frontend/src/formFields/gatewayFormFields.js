export const GATEWAY_FORM_FIELDS = [
  {
    key: 'serialNumber',
    label: 'Serial Number',
    type: 'text',
    initValue: '',
    validator: (value) => {
      if (!value) return 'Serial Number must be provided';
      return null;
    },
  },
  {
    key: 'readableName',
    label: 'Readable Name',
    type: 'text',
    initValue: '',
  },
  {
    key: 'ipv4',
    label: 'IPv4',
    type: 'text',
    initValue: '',
    validator: (value) => {
      if (!value) return 'IPv4 must be provided';
      if (!(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/.test(value))) {
        return 'IPv4 is invalid';
      }
      return null;
    },
  },
];

export default GATEWAY_FORM_FIELDS;
