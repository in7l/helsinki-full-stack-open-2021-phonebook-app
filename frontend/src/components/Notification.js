function Notification({ message, isError = false }) {
  if (message === null) {
    return null;
  };

  const additionalClassName = isError ? 'error' : 'message';
  const classes = `notification ${additionalClassName}`;

  return (
    <div className={classes} >
      {message}
    </div>
  );
}

export default Notification;