import styles from './UserInfoCard.module.css';

const UserInfoCard = ({ setUserInfo, userInfo }) => {

  const onChange = (e, field) => {
    setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div className={styles.fieldCont}>
      <h1 className={styles.header}>Name</h1>
      <input required value={userInfo.name} onChange={(e) => onChange(e, 'name')} placeholder='...' type="text" />
      <h1 className={styles.header}>Email</h1>
      <input required type='email' value={userInfo.email} onChange={(e) => onChange(e, 'email')} placeholder='...' />
      <h1 className={styles.header}>Phone</h1>
      <input required type='tel' value={userInfo.phone} onChange={(e) => onChange(e, 'phone')} placeholder='...' />
      <h1 className={styles.header}>Address</h1>
      <input required value={userInfo.address} onChange={(e) => onChange(e, 'address')} placeholder='...' type="text" />
    </div>
  );
}

export default UserInfoCard;