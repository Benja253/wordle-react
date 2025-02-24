
const Notification = ({ notificationHTML, styles }) => {
  return (
    <div
      ref={notificationHTML}
      className={`${styles.notification} ${styles.hidden}`}
    >La palabra no existe</div>
  )
}

export default Notification