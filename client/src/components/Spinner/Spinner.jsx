import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}

export default Spinner;