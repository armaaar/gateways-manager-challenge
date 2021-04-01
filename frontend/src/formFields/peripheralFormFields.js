export const PERIPHERAL_FORM_FIELDS = [
  {
    key: 'UID',
    label: 'UID',
    type: 'number',
    initValue: '',
    validator: (value) => {
      if (!value) return 'UID must be provided';
      return null;
    },
  },
  {
    key: 'vendor',
    label: 'Vendor',
    type: 'text',
    initValue: '',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    initValue: 'Offline',
    options: ['Online', 'Offline'],
  },
];

export default PERIPHERAL_FORM_FIELDS;
