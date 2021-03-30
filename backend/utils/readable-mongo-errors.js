module.exports = (e) => {
  const errors = {};
  // If a unique value is duplicated
  if (e.code === 11000) {
    Object.keys(e.keyPattern).forEach((fieldName) => {
      errors[fieldName] = `${fieldName} should be Unique`;
    });
  } else {
    Object.entries(e.errors).forEach(([fieldName, errorObj]) => {
      errors[fieldName] = errorObj.message;
    });
  }
  return {errors};
};
